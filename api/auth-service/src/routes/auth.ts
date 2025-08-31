import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import { EnhancedAuthService } from '../services/EnhancedAuthService';
import { 
  SignInSchema, 
  SignUpSchema, 
  SocialAuthSchema,
  PasswordResetSchema,
  PasswordResetConfirmSchema,
  MFASetupSchema,
  UserAccountType,
  AuthProvider,
  MFAType
} from '@sunny/shared-types';

const router = express.Router();

// Security middleware
router.use(helmet());
router.use(cors({
  origin: [
    'https://sunnypayments.com',
    'https://app.sunnypayments.com',
    'https://business.sunnypayments.com',
    'https://institutions.sunnypayments.com',
    'https://admin.sunnypayments.com',
    'https://developers.sunnypayments.com',
    'http://localhost:3000' // Development
  ],
  credentials: true
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Initialize auth service
const authService = new EnhancedAuthService({
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  accessTokenExpiry: 900, // 15 minutes
  refreshTokenExpiry: 604800, // 7 days
  bcryptRounds: 12,
  maxLoginAttempts: 5,
  lockoutDuration: 1800, // 30 minutes
  mfaWindowSize: 2
});

/**
 * Helper to extract device info from request
 */
function getDeviceInfo(req: express.Request) {
  return {
    userAgent: req.get('User-Agent') || '',
    ip: req.ip || req.connection.remoteAddress || '',
    location: req.get('CF-IPCountry') || 'Unknown' // Cloudflare header
  };
}

/**
 * Helper to handle validation errors
 */
function handleValidationErrors(req: express.Request, res: express.Response, next: express.NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: errors.array()
      }
    });
  }
  next();
}

/**
 * POST /api/auth/signin
 * Sign in with email and password
 */
router.post('/signin', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('accountType').optional().isIn(Object.values(UserAccountType)),
  body('mfaCode').optional().isLength({ min: 6, max: 6 }),
  body('rememberMe').optional().isBoolean(),
  body('redirectUrl').optional().isURL()
], handleValidationErrors, async (req, res) => {
  try {
    const deviceInfo = getDeviceInfo(req);
    const result = await authService.signIn(req.body, deviceInfo);
    
    if (result.success && result.session) {
      // Set secure cookies
      res.cookie('sunny_access_token', result.session.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });
      
      res.cookie('sunny_refresh_token', result.session.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
    }
    
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Sign in endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/signup
 * Register new user
 */
router.post('/signup', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').isLength({ min: 1 }).trim(),
  body('lastName').isLength({ min: 1 }).trim(),
  body('phone').optional().isMobilePhone(),
  body('accountType').isIn(Object.values(UserAccountType)),
  body('businessName').optional().isLength({ min: 1 }),
  body('institutionName').optional().isLength({ min: 1 }),
  body('company').optional().isLength({ min: 1 }),
  body('agreeToTerms').equals('true'),
  body('agreeToPrivacy').equals('true'),
  body('marketingConsent').optional().isBoolean(),
  body('redirectUrl').optional().isURL()
], handleValidationErrors, async (req, res) => {
  try {
    const deviceInfo = getDeviceInfo(req);
    const result = await authService.signUp(req.body, deviceInfo);
    
    if (result.success && result.session) {
      // Set secure cookies
      res.cookie('sunny_access_token', result.session.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });
      
      res.cookie('sunny_refresh_token', result.session.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
    }
    
    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error('Sign up endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/social
 * Social authentication
 */
router.post('/social', authLimiter, [
  body('provider').isIn(Object.values(AuthProvider)),
  body('providerUserId').isLength({ min: 1 }),
  body('accessToken').isLength({ min: 1 }),
  body('accountType').optional().isIn(Object.values(UserAccountType)),
  body('redirectUrl').optional().isURL()
], handleValidationErrors, async (req, res) => {
  try {
    const deviceInfo = getDeviceInfo(req);
    const result = await authService.socialAuth(req.body, deviceInfo);
    
    if (result.success && result.session) {
      // Set secure cookies
      res.cookie('sunny_access_token', result.session.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });
      
      res.cookie('sunny_refresh_token', result.session.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
    }
    
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Social auth endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', generalLimiter, async (req, res) => {
  try {
    const refreshToken = req.cookies.sunny_refresh_token || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'MISSING_REFRESH_TOKEN',
          message: 'Refresh token is required'
        }
      });
    }
    
    const result = await authService.refreshSession(refreshToken);
    
    if (result.success && result.session) {
      // Set new cookies
      res.cookie('sunny_access_token', result.session.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });
      
      res.cookie('sunny_refresh_token', result.session.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
    }
    
    res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    console.error('Refresh endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/signout
 * Sign out current session
 */
router.post('/signout', generalLimiter, async (req, res) => {
  try {
    const accessToken = req.cookies.sunny_access_token || req.headers.authorization?.replace('Bearer ', '');
    
    if (accessToken) {
      const sessionData = await authService.getSessionManager().validateAccessToken(accessToken);
      if (sessionData) {
        await authService.signOut(sessionData.id);
      }
    }
    
    // Clear cookies
    res.clearCookie('sunny_access_token');
    res.clearCookie('sunny_refresh_token');
    
    res.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/signout-all
 * Sign out all sessions
 */
router.post('/signout-all', generalLimiter, async (req, res) => {
  try {
    const accessToken = req.cookies.sunny_access_token || req.headers.authorization?.replace('Bearer ', '');
    
    if (accessToken) {
      const sessionData = await authService.getSessionManager().validateAccessToken(accessToken);
      if (sessionData) {
        await authService.signOutAll(sessionData.userId);
      }
    }
    
    // Clear cookies
    res.clearCookie('sunny_access_token');
    res.clearCookie('sunny_refresh_token');
    
    res.json({ success: true, message: 'All sessions signed out successfully' });
  } catch (error) {
    console.error('Sign out all endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
router.post('/forgot-password', authLimiter, [
  body('email').isEmail().normalizeEmail()
], handleValidationErrors, async (req, res) => {
  try {
    const result = await authService.requestPasswordReset(req.body);
    res.json(result);
  } catch (error) {
    console.error('Forgot password endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/reset-password
 * Confirm password reset
 */
router.post('/reset-password', authLimiter, [
  body('token').isLength({ min: 1 }),
  body('password').isLength({ min: 8 })
], handleValidationErrors, async (req, res) => {
  try {
    const result = await authService.confirmPasswordReset(req.body);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Reset password endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/mfa/setup
 * Setup MFA
 */
router.post('/mfa/setup', generalLimiter, [
  body('method').isIn(Object.values(MFAType)),
  body('phoneNumber').optional().isMobilePhone()
], handleValidationErrors, async (req, res) => {
  try {
    // Extract user ID from token (requires auth middleware)
    const accessToken = req.cookies.sunny_access_token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    const sessionData = await authService.getSessionManager().validateAccessToken(accessToken);
    if (!sessionData) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }
    
    const result = await authService.setupMFA(sessionData.userId, req.body);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('MFA setup endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * POST /api/auth/mfa/verify-setup
 * Verify MFA setup
 */
router.post('/mfa/verify-setup', generalLimiter, [
  body('code').isLength({ min: 6, max: 8 }),
  body('method').isIn(Object.values(MFAType))
], handleValidationErrors, async (req, res) => {
  try {
    // Extract user ID from token
    const accessToken = req.cookies.sunny_access_token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    const sessionData = await authService.getSessionManager().validateAccessToken(accessToken);
    if (!sessionData) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }
    
    const result = await authService.verifyMFASetup(sessionData.userId, req.body.code, req.body.method);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('MFA verify setup endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', generalLimiter, async (req, res) => {
  try {
    const accessToken = req.cookies.sunny_access_token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    const sessionData = await authService.getSessionManager().validateAccessToken(accessToken);
    if (!sessionData) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }
    
    // Get user data
    const { User } = await import('../models/User');
    const user = await User.findById(sessionData.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }
    
    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Get user endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

/**
 * GET /api/auth/sessions
 * Get user's active sessions
 */
router.get('/sessions', generalLimiter, async (req, res) => {
  try {
    const accessToken = req.cookies.sunny_access_token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    const sessionData = await authService.getSessionManager().validateAccessToken(accessToken);
    if (!sessionData) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }
    
    const sessions = await authService.getSessionManager().getUserSessions(sessionData.userId);
    
    res.json({
      success: true,
      sessions: sessions.map(session => ({
        id: session.id,
        deviceInfo: session.deviceInfo,
        createdAt: session.createdAt,
        lastAccessAt: session.lastAccessAt,
        isCurrent: session.id === sessionData.id
      }))
    });
  } catch (error) {
    console.error('Get sessions endpoint error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  }
});

export default router;
