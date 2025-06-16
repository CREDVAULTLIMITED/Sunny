/**
 * Security Configuration
 * 
 * Security settings, encryption, and fraud detection for the Sunny Payment Gateway
 */

import config from './config';
import crypto from 'crypto';

if (!process.env.ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY environment variable must be set in production');
}

export const securityConfig = {
  encryption: {
    algorithm: 'AES-256-GCM',
    keyLength: 256,
    ivLength: 16,
    saltLength: 32,
    tagLength: 16,
    keyDerivation: 'PBKDF2',
    iterations: 100000
  },
  
  session: {
    name: 'sid',
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Always use secure cookies in production
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
      domain: '.sunnypayments.com',
      path: '/',
    },
    proxy: true // Trust the reverse proxy
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false
  },

  jwt: {
    algorithm: 'RS256',
    expiresIn: '1h',
    refreshTokenExpiry: '7d',
    issuer: 'sunnypayments.com',
    audience: 'sunnypayments.com'
  },

  tls: {
    minVersion: 'TLSv1.2',
    cipherPreferences: [
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES128-GCM-SHA256'
    ]
  },

  headers: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.sunnypayments.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        upgradeInsecureRequests: [],
        blockAllMixedContent: true
      }
    },
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  },

  // Fraud prevention settings
  fraud: {
    maxFailedAttempts: 5,
    blockDuration: 30 * 60 * 1000, // 30 minutes
    suspiciousIpThreshold: 10,
    velocityCheck: {
      windowMs: 3600000, // 1 hour
      maxTransactions: 10
    }
  }
};

export default securityConfig;

