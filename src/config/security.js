/**
 * Security Configuration
 * 
 * Security settings, encryption, and fraud detection for the Sunny Payment Gateway
 */

import config from './config';

export const securityConfig = {
  encryption: {
    algorithm: 'AES-GCM',
    keyLength: 256,
    ivLength: 16,
    saltLength: 16,
    tagLength: 16
  },
  
  session: {
    name: 'sess_id',
    secret: crypto.randomBytes(32).toString('hex'),
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
      domain: config.env === 'production' ? '.yourdomain.com' : undefined,
    }
  },

  headers: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.yourdomain.com'],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      }
    },
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
  },

  auth: {
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventPasswordReuse: 5,
      maxLoginAttempts: 5,
      lockoutDuration: 30 * 60 * 1000, // 30 minutes
    },
    jwt: {
      accessTokenExpiry: '15m',
      refreshTokenExpiry: '7d',
      algorithm: 'HS512',
      issuer: 'sunny-payments',
      audience: 'sunny-api',
    }
  },

  sanitization: {
    allowedHtmlTags: [], // Strict no-HTML policy
    allowedAttributes: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
  },

  monitoring: {
    failedLoginThreshold: 5,
    bruteForceWindow: 300000, // 5 minutes
    suspiciousIpThreshold: 10,
    alertEmailAddress: 'security@yourdomain.com',
  }
};

export default securityConfig;

