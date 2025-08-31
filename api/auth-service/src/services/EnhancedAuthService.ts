import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { User, type IUser } from '../models/User';
import { SessionManager, type DeviceInfo } from '../models/Session';
import BiometricAuthenticator from '../auth/BiometricAuthenticator';
import AccessControlValidator from '../auth/AccessControl';
import DatabaseManager from '@sunny/database';
import { 
  UserAccountType, 
  AuthProvider, 
  MFAType, 
  VerificationStatus,
  type SignInRequest,
  type SignUpRequest,
  type SocialAuthRequest,
  type AuthResponse,
  type PasswordResetRequest,
  type PasswordResetConfirmRequest,
  type MFASetupRequest,
  type Session
} from '@sunny/shared-types';

export interface AuthServiceConfig {
  jwtSecret: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  bcryptRounds: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  mfaWindowSize: number;
}

export class EnhancedAuthService {
  private sessionManager: SessionManager;
  private config: AuthServiceConfig;
  private redis: any;

  constructor(config: AuthServiceConfig) {
    this.config = config;
    
    // Initialize Redis connection
    const dbCache = DatabaseManager.getCacheDatabase();
    this.redis = dbCache.connection;
    
    // Initialize session manager
    this.sessionManager = new SessionManager({
      accessTokenExpiry: config.accessTokenExpiry,
      refreshTokenExpiry: config.refreshTokenExpiry,
      jwtSecret: config.jwtSecret,
      redisClient: this.redis
    });
  }

  /**
   * Sign in with email and password
   */
  async signIn(request: SignInRequest, deviceInfo: DeviceInfo): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await User.findByEmail(request.email);
      if (!user) {
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password'
          }
        };
      }

      // Check if account is locked
      if (user.isAccountLocked()) {
        return {
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: 'Account is temporarily locked due to multiple failed login attempts'
          }
        };
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(request.password);
      if (!isPasswordValid) {
        await user.incrementLoginAttempts();
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password'
          }
        };
      }

      // Reset login attempts on successful password verification
      await user.resetLoginAttempts();

      // Check if MFA is required
      if (user.mfaEnabled && !request.mfaCode) {
        return {
          success: false,
          requiresMFA: true,
          mfaMethods: user.mfaMethods,
          error: {
            code: 'MFA_REQUIRED',
            message: 'Multi-factor authentication is required'
          }
        };
      }

      // Verify MFA if provided
      if (user.mfaEnabled && request.mfaCode) {
        const mfaValid = await this.verifyMFA(user, request.mfaCode);
        if (!mfaValid) {
          return {
            success: false,
            error: {
              code: 'INVALID_MFA',
              message: 'Invalid MFA code'
            }
          };
        }
      }

      // Check account type match if specified
      if (request.accountType && user.accountType !== request.accountType) {
        return {
          success: false,
          error: {
            code: 'ACCOUNT_TYPE_MISMATCH',
            message: `This account is registered as ${user.accountType}, not ${request.accountType}`
          }
        };
      }

      // Create session
      const session = await this.sessionManager.createSession(user, deviceInfo);

      // Log successful login
      await this.logAuthEvent('LOGIN_SUCCESS', user._id.toString(), deviceInfo);

      return {
        success: true,
        user: user.toJSON() as any,
        session,
        redirectUrl: this.getRedirectUrl(user.accountType, request.redirectUrl)
      };

    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred'
        }
      };
    }
  }

  /**
   * Sign up new user
   */
  async signUp(request: SignUpRequest, deviceInfo: DeviceInfo): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(request.email);
      if (existingUser) {
        return {
          success: false,
          error: {
            code: 'EMAIL_EXISTS',
            message: 'An account with this email already exists',
            field: 'email'
          }
        };
      }

      // Prepare user data
      const userData: any = {
        email: request.email,
        passwordHash: request.password, // Will be hashed by pre-save hook
        firstName: request.firstName,
        lastName: request.lastName,
        phone: request.phone,
        accountType: request.accountType,
        agreedToTerms: request.agreeToTerms,
        agreedToPrivacy: request.agreeToPrivacy,
        marketingConsent: request.marketingConsent || false,
        termsVersion: '1.0',
        privacyVersion: '1.0'
      };

      // Add account type specific data
      switch (request.accountType) {
        case UserAccountType.BUSINESS:
          if (request.businessName) {
            userData.businessDetails = {
              businessName: request.businessName,
              businessType: request.businessType
            };
          }
          break;
        
        case UserAccountType.INSTITUTION:
          if (request.institutionName) {
            userData.institutionDetails = {
              institutionName: request.institutionName,
              institutionType: request.institutionType
            };
          }
          break;
        
        case UserAccountType.DEVELOPER:
          if (request.company) {
            userData.developerDetails = {
              company: request.company
            };
          }
          break;
      }

      // Create user
      const user = new User(userData);
      await user.save();

      // Create session
      const session = await this.sessionManager.createSession(user, deviceInfo);

      // Send verification email (async)
      this.sendVerificationEmail(user).catch(err => 
        console.error('Failed to send verification email:', err)
      );

      // Log successful registration
      await this.logAuthEvent('REGISTER_SUCCESS', user._id.toString(), deviceInfo);

      return {
        success: true,
        user: user.toJSON() as any,
        session,
        redirectUrl: this.getRedirectUrl(user.accountType, request.redirectUrl)
      };

    } catch (error) {
      console.error('Sign up error:', error);
      
      if (error.code === 11000) {
        return {
          success: false,
          error: {
            code: 'EMAIL_EXISTS',
            message: 'An account with this email already exists',
            field: 'email'
          }
        };
      }

      return {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred'
        }
      };
    }
  }

  /**
   * Social authentication
   */
  async socialAuth(request: SocialAuthRequest, deviceInfo: DeviceInfo): Promise<AuthResponse> {
    try {
      // Verify social provider token (implementation depends on provider)
      const socialUserData = await this.verifySocialToken(request);
      if (!socialUserData) {
        return {
          success: false,
          error: {
            code: 'INVALID_SOCIAL_TOKEN',
            message: 'Invalid social authentication token'
          }
        };
      }

      // Check if user exists with this social provider
      let user = await User.findBySocialProvider(request.provider, request.providerUserId);
      
      if (!user) {
        // Check if user exists with this email
        user = await User.findByEmail(socialUserData.email);
        
        if (user) {
          // Add social provider to existing user
          await user.addSocialProvider({
            provider: request.provider,
            providerId: request.providerUserId,
            email: socialUserData.email
          });
        } else {
          // Create new user with social provider
          const userData: any = {
            email: socialUserData.email,
            firstName: socialUserData.firstName || socialUserData.name?.split(' ')[0] || 'User',
            lastName: socialUserData.lastName || socialUserData.name?.split(' ').slice(1).join(' ') || '',
            accountType: request.accountType || UserAccountType.INDIVIDUAL,
            emailVerified: true, // Social providers verify email
            agreedToTerms: true,
            agreedToPrivacy: true,
            socialProviders: [{
              provider: request.provider,
              providerId: request.providerUserId,
              email: socialUserData.email,
              verifiedAt: new Date()
            }]
          };

          user = new User(userData);
          await user.save();
        }
      }

      // Create session
      const session = await this.sessionManager.createSession(user, deviceInfo);

      // Log successful social login
      await this.logAuthEvent('SOCIAL_LOGIN_SUCCESS', user._id.toString(), deviceInfo, {
        provider: request.provider
      });

      return {
        success: true,
        user: user.toJSON() as any,
        session,
        redirectUrl: this.getRedirectUrl(user.accountType)
      };

    } catch (error) {
      console.error('Social auth error:', error);
      return {
        success: false,
        error: {
          code: 'SOCIAL_AUTH_FAILED',
          message: 'Social authentication failed'
        }
      };
    }
  }

  /**
   * Refresh session
   */
  async refreshSession(refreshToken: string): Promise<AuthResponse> {
    try {
      const session = await this.sessionManager.refreshSession(refreshToken);
      
      if (!session) {
        return {
          success: false,
          error: {
            code: 'INVALID_REFRESH_TOKEN',
            message: 'Invalid or expired refresh token'
          }
        };
      }

      // Get user data
      const user = await User.findById(session.userId);
      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        };
      }

      session.user = user.toJSON() as any;

      return {
        success: true,
        user: user.toJSON() as any,
        session
      };

    } catch (error) {
      console.error('Refresh session error:', error);
      return {
        success: false,
        error: {
          code: 'REFRESH_FAILED',
          message: 'Failed to refresh session'
        }
      };
    }
  }

  /**
   * Sign out
   */
  async signOut(sessionId: string): Promise<void> {
    try {
      await this.sessionManager.destroySession(sessionId);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  /**
   * Sign out all sessions
   */
  async signOutAll(userId: string): Promise<void> {
    try {
      await this.sessionManager.destroyAllUserSessions(userId);
    } catch (error) {
      console.error('Sign out all error:', error);
    }
  }

  /**
   * Setup MFA
   */
  async setupMFA(userId: string, request: MFASetupRequest): Promise<AuthResponse> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        };
      }

      let setupData: any = {};

      switch (request.method) {
        case MFAType.TOTP:
          const secret = speakeasy.generateSecret({
            name: `Sunny Payments (${user.email})`,
            issuer: 'Sunny Payments'
          });
          
          const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url!);
          
          // Store secret temporarily (user needs to verify)
          await this.redis.setex(
            `mfa_setup:${userId}`,
            300, // 5 minutes
            JSON.stringify({ secret: secret.base32 })
          );
          
          setupData = {
            secret: secret.base32,
            qrCode: qrCodeDataURL,
            manualEntryKey: secret.base32
          };
          break;

        case MFAType.SMS:
          if (!request.phoneNumber) {
            return {
              success: false,
              error: {
                code: 'PHONE_REQUIRED',
                message: 'Phone number is required for SMS MFA'
              }
            };
          }
          
          // Send SMS verification code
          const smsCode = Math.floor(100000 + Math.random() * 900000).toString();
          await this.sendSMSCode(request.phoneNumber, smsCode);
          
          await this.redis.setex(
            `mfa_setup:${userId}`,
            300,
            JSON.stringify({ phoneNumber: request.phoneNumber, code: smsCode })
          );
          
          setupData = {
            phoneNumber: request.phoneNumber,
            message: 'Verification code sent to your phone'
          };
          break;

        case MFAType.EMAIL:
          const emailCode = Math.floor(100000 + Math.random() * 900000).toString();
          await this.sendEmailCode(user.email, emailCode);
          
          await this.redis.setex(
            `mfa_setup:${userId}`,
            300,
            JSON.stringify({ code: emailCode })
          );
          
          setupData = {
            message: 'Verification code sent to your email'
          };
          break;
      }

      return {
        success: true,
        setupData
      };

    } catch (error) {
      console.error('MFA setup error:', error);
      return {
        success: false,
        error: {
          code: 'MFA_SETUP_FAILED',
          message: 'Failed to setup MFA'
        }
      };
    }
  }

  /**
   * Verify MFA setup
   */
  async verifyMFASetup(userId: string, code: string, method: MFAType): Promise<AuthResponse> {
    try {
      const setupData = await this.redis.get(`mfa_setup:${userId}`);
      if (!setupData) {
        return {
          success: false,
          error: {
            code: 'SETUP_EXPIRED',
            message: 'MFA setup session expired'
          }
        };
      }

      const data = JSON.parse(setupData);
      let isValid = false;

      switch (method) {
        case MFAType.TOTP:
          isValid = speakeasy.totp.verify({
            secret: data.secret,
            encoding: 'base32',
            token: code,
            window: this.config.mfaWindowSize
          });
          break;

        case MFAType.SMS:
        case MFAType.EMAIL:
          isValid = data.code === code;
          break;
      }

      if (!isValid) {
        return {
          success: false,
          error: {
            code: 'INVALID_CODE',
            message: 'Invalid verification code'
          }
        };
      }

      // Update user with MFA settings
      const user = await User.findById(userId);
      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        };
      }

      const mfaSecrets: any = user.mfaSecrets || {};
      
      switch (method) {
        case MFAType.TOTP:
          mfaSecrets.totp = data.secret;
          break;
        case MFAType.SMS:
          mfaSecrets.phoneNumber = data.phoneNumber;
          break;
      }

      // Generate backup codes
      const backupCodes = Array.from({ length: 10 }, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      mfaSecrets.backupCodes = backupCodes;

      await user.updateOne({
        $set: {
          mfaEnabled: true,
          mfaMethods: [method],
          mfaSecrets
        }
      });

      // Clean up setup data
      await this.redis.del(`mfa_setup:${userId}`);

      return {
        success: true,
        backupCodes
      };

    } catch (error) {
      console.error('MFA verify setup error:', error);
      return {
        success: false,
        error: {
          code: 'MFA_VERIFY_FAILED',
          message: 'Failed to verify MFA setup'
        }
      };
    }
  }

  /**
   * Password reset request
   */
  async requestPasswordReset(request: PasswordResetRequest): Promise<AuthResponse> {
    try {
      const user = await User.findByEmail(request.email);
      if (!user) {
        // Don't reveal if email exists or not
        return {
          success: true,
          message: 'If an account with this email exists, a password reset link has been sent'
        };
      }

      // Generate reset token
      const resetToken = require('crypto').randomBytes(32).toString('hex');
      const resetExpiry = new Date(Date.now() + 3600000); // 1 hour

      // Store reset token
      await this.redis.setex(
        `password_reset:${resetToken}`,
        3600, // 1 hour
        user._id.toString()
      );

      // Send password reset email
      await this.sendPasswordResetEmail(user.email, resetToken);

      return {
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent'
      };

    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        error: {
          code: 'RESET_REQUEST_FAILED',
          message: 'Failed to process password reset request'
        }
      };
    }
  }

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(request: PasswordResetConfirmRequest): Promise<AuthResponse> {
    try {
      // Verify reset token
      const userId = await this.redis.get(`password_reset:${request.token}`);
      if (!userId) {
        return {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired reset token'
          }
        };
      }

      const user = await User.findById(userId);
      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        };
      }

      // Update password
      await user.updateOne({
        $set: {
          passwordHash: request.password // Will be hashed by pre-save hook
        }
      });

      // Clean up reset token
      await this.redis.del(`password_reset:${request.token}`);

      // Invalidate all existing sessions
      await this.sessionManager.destroyAllUserSessions(userId);

      // Log password reset
      await this.logAuthEvent('PASSWORD_RESET', userId);

      return {
        success: true,
        message: 'Password reset successfully'
      };

    } catch (error) {
      console.error('Password reset confirm error:', error);
      return {
        success: false,
        error: {
          code: 'RESET_CONFIRM_FAILED',
          message: 'Failed to reset password'
        }
      };
    }
  }

  /**
   * Verify MFA code
   */
  private async verifyMFA(user: IUser, code: string): Promise<boolean> {
    try {
      const mfaSecrets = user.mfaSecrets;
      if (!mfaSecrets) return false;

      // Check backup codes first
      if (mfaSecrets.backupCodes && mfaSecrets.backupCodes.includes(code)) {
        // Remove used backup code
        await user.updateOne({
          $pull: { 'mfaSecrets.backupCodes': code }
        });
        return true;
      }

      // Check TOTP
      if (user.mfaMethods.includes(MFAType.TOTP) && mfaSecrets.totp) {
        return speakeasy.totp.verify({
          secret: mfaSecrets.totp,
          encoding: 'base32',
          token: code,
          window: this.config.mfaWindowSize
        });
      }

      // Check SMS/Email (would need to implement code storage)
      // Implementation depends on how you store temporary codes

      return false;
    } catch (error) {
      console.error('MFA verification error:', error);
      return false;
    }
  }

  /**
   * Get redirect URL based on account type
   */
  private getRedirectUrl(accountType: UserAccountType, customRedirect?: string): string {
    if (customRedirect) {
      // Validate custom redirect URL is from trusted domain
      try {
        const url = new URL(customRedirect);
        const trustedDomains = [
          'sunnypayments.com',
          'app.sunnypayments.com',
          'business.sunnypayments.com',
          'institutions.sunnypayments.com',
          'admin.sunnypayments.com',
          'developers.sunnypayments.com'
        ];

        if (trustedDomains.some(domain => 
          url.hostname === domain || url.hostname.endsWith(`.${domain}`)
        )) {
          return customRedirect;
        }
      } catch {
        // Invalid URL, fall back to default
      }
    }

    // Default destinations
    const destinations = {
      [UserAccountType.INDIVIDUAL]: 'https://app.sunnypayments.com',
      [UserAccountType.BUSINESS]: 'https://business.sunnypayments.com',
      [UserAccountType.INSTITUTION]: 'https://institutions.sunnypayments.com',
      [UserAccountType.DEVELOPER]: 'https://developers.sunnypayments.com',
      [UserAccountType.ADMIN]: 'https://admin.sunnypayments.com'
    };

    return destinations[accountType];
  }

  /**
   * Verify social provider token (placeholder)
   */
  private async verifySocialToken(request: SocialAuthRequest): Promise<any> {
    // Implementation would vary by provider
    // This is a placeholder that would integrate with Google, Apple, etc. APIs
    return {
      id: request.providerUserId,
      email: 'user@example.com', // Would come from provider
      name: 'User Name',
      firstName: 'User',
      lastName: 'Name'
    };
  }

  /**
   * Send verification email (placeholder)
   */
  private async sendVerificationEmail(user: IUser): Promise<void> {
    // Implementation would integrate with email service
    console.log(`Sending verification email to ${user.email}`);
  }

  /**
   * Send SMS code (placeholder)
   */
  private async sendSMSCode(phoneNumber: string, code: string): Promise<void> {
    // Implementation would integrate with SMS service
    console.log(`Sending SMS code ${code} to ${phoneNumber}`);
  }

  /**
   * Send email code (placeholder)
   */
  private async sendEmailCode(email: string, code: string): Promise<void> {
    // Implementation would integrate with email service
    console.log(`Sending email code ${code} to ${email}`);
  }

  /**
   * Send password reset email (placeholder)
   */
  private async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    // Implementation would integrate with email service
    console.log(`Sending password reset email to ${email} with token ${token}`);
  }

  /**
   * Log authentication events
   */
  private async logAuthEvent(
    event: string, 
    userId?: string, 
    deviceInfo?: DeviceInfo, 
    metadata?: any
  ): Promise<void> {
    try {
      const logData = {
        event,
        userId,
        deviceInfo,
        metadata,
        timestamp: new Date()
      };

      // Store in audit log (could be MongoDB or dedicated logging service)
      await this.redis.lpush('auth_audit_log', JSON.stringify(logData));
      await this.redis.ltrim('auth_audit_log', 0, 9999); // Keep last 10k events
    } catch (error) {
      console.error('Failed to log auth event:', error);
    }
  }

  /**
   * Get session manager instance
   */
  getSessionManager(): SessionManager {
    return this.sessionManager;
  }
}

export default EnhancedAuthService;
