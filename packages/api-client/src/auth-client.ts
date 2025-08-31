import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  SignInRequest,
  SignUpRequest,
  SocialAuthRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  MFASetupRequest,
  AuthResponse,
  Session,
  User,
  MFAType
} from '@sunny/shared-types';

export interface AuthClientConfig {
  baseURL: string;
  timeout?: number;
  withCredentials?: boolean;
}

export interface AuthClientEvents {
  onTokenRefresh?: (session: Session) => void;
  onAuthError?: (error: any) => void;
  onSessionExpired?: () => void;
}

export class AuthClient {
  private client: AxiosInstance;
  private refreshPromise: Promise<Session> | null = null;
  private events: AuthClientEvents;

  constructor(config: AuthClientConfig, events: AuthClientEvents = {}) {
    this.events = events;
    
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      withCredentials: config.withCredentials !== false,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any default headers or tokens here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for handling token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            await this.refreshToken();
            
            // Retry the original request
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, session expired
            this.events.onSessionExpired?.();
            return Promise.reject(refreshError);
          }
        }

        this.events.onAuthError?.(error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Sign in with email and password
   */
  async signIn(data: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/signin', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Sign up new user
   */
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/signup', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Social authentication
   */
  async socialAuth(data: SocialAuthRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/social', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<Session> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();
    
    try {
      const session = await this.refreshPromise;
      this.refreshPromise = null;
      return session;
    } catch (error) {
      this.refreshPromise = null;
      throw error;
    }
  }

  private async performTokenRefresh(): Promise<Session> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/refresh');
      
      if (response.data.success && response.data.session) {
        this.events.onTokenRefresh?.(response.data.session);
        return response.data.session;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Sign out current session
   */
  async signOut(): Promise<void> {
    try {
      await this.client.post('/auth/signout');
    } catch (error) {
      // Don't throw error for sign out, just log it
      console.warn('Sign out request failed:', error);
    }
  }

  /**
   * Sign out all sessions
   */
  async signOutAll(): Promise<void> {
    try {
      await this.client.post('/auth/signout-all');
    } catch (error) {
      console.warn('Sign out all request failed:', error);
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(data: PasswordResetConfirmRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Setup MFA
   */
  async setupMFA(data: MFASetupRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/mfa/setup', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Verify MFA setup
   */
  async verifyMFASetup(code: string, method: MFAType): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/mfa/verify-setup', {
        code,
        method
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<{ success: boolean; user?: User; error?: any }> {
    try {
      const response = await this.client.get<{ success: boolean; user: User }>('/auth/me');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get user's active sessions
   */
  async getSessions(): Promise<{ success: boolean; sessions?: any[]; error?: any }> {
    try {
      const response = await this.client.get<{ success: boolean; sessions: any[] }>('/auth/sessions');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Terminate a specific session
   */
  async terminateSession(sessionId: string): Promise<{ success: boolean; error?: any }> {
    try {
      const response = await this.client.delete<{ success: boolean }>(`/auth/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const result = await this.getCurrentUser();
      return result.success && !!result.user;
    } catch {
      return false;
    }
  }

  /**
   * Validate email format and availability
   */
  async validateEmail(email: string): Promise<{ available: boolean; valid: boolean; suggestions?: string[] }> {
    try {
      const response = await this.client.post<{ available: boolean; valid: boolean; suggestions?: string[] }>('/auth/validate-email', { email });
      return response.data;
    } catch (error) {
      return { available: false, valid: false };
    }
  }

  /**
   * Get account recovery options
   */
  async getRecoveryOptions(email: string): Promise<{ methods: string[]; masked: { email?: string; phone?: string } }> {
    try {
      const response = await this.client.post<{ methods: string[]; masked: any }>('/auth/recovery-options', { email });
      return response.data;
    } catch (error) {
      return { methods: [], masked: {} };
    }
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/send-email-verification');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<{ success: boolean; user?: User; error?: any }> {
    try {
      const response = await this.client.patch<{ success: boolean; user: User }>('/auth/profile', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Enable/disable MFA
   */
  async toggleMFA(enabled: boolean, code?: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/mfa/toggle', {
        enabled,
        code
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get MFA backup codes
   */
  async getMFABackupCodes(): Promise<{ success: boolean; codes?: string[]; error?: any }> {
    try {
      const response = await this.client.get<{ success: boolean; codes: string[] }>('/auth/mfa/backup-codes');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Generate new MFA backup codes
   */
  async regenerateMFABackupCodes(): Promise<{ success: boolean; codes?: string[]; error?: any }> {
    try {
      const response = await this.client.post<{ success: boolean; codes: string[] }>('/auth/mfa/regenerate-backup-codes');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete user account
   */
  async deleteAccount(password: string, confirmation: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/delete-account', {
        password,
        confirmation
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Export user data (GDPR compliance)
   */
  async exportUserData(): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const response = await this.client.get<{ success: boolean; data: any }>('/auth/export-data');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle API errors consistently
   */
  private handleError(error: any): AuthResponse {
    if (error.response?.data) {
      return error.response.data;
    }

    if (error.request) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error occurred. Please check your connection and try again.'
        }
      };
    }

    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred'
      }
    };
  }

  /**
   * Set custom headers for requests
   */
  setHeader(name: string, value: string): void {
    this.client.defaults.headers.common[name] = value;
  }

  /**
   * Remove custom header
   */
  removeHeader(name: string): void {
    delete this.client.defaults.headers.common[name];
  }

  /**
   * Update base URL
   */
  setBaseURL(baseURL: string): void {
    this.client.defaults.baseURL = baseURL;
  }

  /**
   * Get current base URL
   */
  getBaseURL(): string | undefined {
    return this.client.defaults.baseURL;
  }

  /**
   * Update event handlers
   */
  updateEvents(events: Partial<AuthClientEvents>): void {
    this.events = { ...this.events, ...events };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; timestamp: string; services?: any }> {
    try {
      const response = await this.client.get<any>('/health');
      return response.data;
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Create singleton instance
let authClientInstance: AuthClient | null = null;

export function createAuthClient(config: AuthClientConfig, events?: AuthClientEvents): AuthClient {
  authClientInstance = new AuthClient(config, events);
  return authClientInstance;
}

export function getAuthClient(): AuthClient {
  if (!authClientInstance) {
    throw new Error('Auth client not initialized. Call createAuthClient() first.');
  }
  return authClientInstance;
}

export default AuthClient;
