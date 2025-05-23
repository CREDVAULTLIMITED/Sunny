/**
 * Security Configuration
 * 
 * Security settings, encryption, and fraud detection for the Sunny Payment Gateway
 */

import crypto from 'crypto';
import config from './config.js';

const environment = config.app.environment;
const isProduction = environment === 'production';

// Encryption settings
const encryption = {
  // Encryption algorithm settings
  algorithm: 'aes-256-gcm',
  // Encryption key (pulled from main config)
  key: config.security.encryptionKey,
  // Initialization vector length
  ivLength: 16,
  // Authentication tag length
  authTagLength: 16,
  // Key derivation settings
  keyDerivation: {
    // Number of iterations for PBKDF2
    iterations: isProduction ? 100000 : 10000,
    // Key length in bytes
    keyLength: 32,
    // Digest algorithm
    digest: 'sha512'
  },
  // Fields that should always be encrypted when stored
  sensitiveFields: [
    'cardNumber',
    'cvv',
    'accountNumber',
    'routingNumber',
    'iban',
    'bic',
    'sortCode',
    'swiftCode',
    'privateKey',
    'apiSecret'
  ]
};

// Authentication settings
const authentication = {
  // JWT settings (pulled from main config)
  jwt: {
    secret: config.security.jwtSecret,
    expiresIn: config.security.jwtExpiresIn,
    algorithm: 'HS256',
    issuer: 'sunny-payments'
  },
  // API Key settings
  apiKey: {
    // Length of generated API keys
    length: 32,
    // Prefix for API keys to identify them
    prefix: 'sunny_',
    // Rate limit settings for API key authentication
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000 // limit each API key to 1000 requests per windowMs
    }
  },
  // Password policy
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
    preventReuse: 5 // Prevent reuse of last 5 passwords
  }
};

// Fraud detection settings
const fraudDetection = {
  enabled: isProduction 
    ? true
    : (process.env.ENABLE_FRAUD_DETECTION !== 'false'),
  // Velocity checks (for rate of transactions)
  velocityChecks: {
    enabled: isProduction ? true : (process.env.ENABLE_VELOCITY_CHECKS !== 'false'),
    // Maximum number of transactions allowed within time windows
    thresholds: {
      // Per minute limits
      perMinute: {
        cardTransactions: parseInt(process.env.FRAUD_MAX_CARD_PER_MINUTE, 10) || 5,
        totalTransactions: parseInt(process.env.FRAUD_MAX_TOTAL_PER_MINUTE, 10) || 10
      },
      // Per hour limits
      perHour: {
        cardTransactions: parseInt(process.env.FRAUD_MAX_CARD_PER_HOUR, 10) || 20,
        totalTransactions: parseInt(process.env.FRAUD_MAX_TOTAL_PER_HOUR, 10) || 40
      },
      // Per day limits
      perDay: {
        cardTransactions: parseInt(process.env.FRAUD_MAX_CARD_PER_DAY, 10) || 50,
        totalTransactions: parseInt(process.env.FRAUD_MAX_TOTAL_PER_DAY, 10) || 100
      }
    }
  },
  // Amount limits for different payment methods
  amountLimits: {
    card: {
      min: parseFloat(process.env.FRAUD_CARD_MIN_AMOUNT) || 0.5,
      max: parseFloat(process.env.FRAUD_CARD_MAX_AMOUNT) || 25000
    },
    bankTransfer: {
      min: parseFloat(process.env.FRAUD_BANK_MIN_AMOUNT) || 1,
      max: parseFloat(process.env.FRAUD_BANK_MAX_AMOUNT) || 1000000
    },
    crypto: {
      min: parseFloat(process.env.FRAUD_CRYPTO_MIN_AMOUNT) || 1,
      max: parseFloat(process.env.FRAUD_CRYPTO_MAX_AMOUNT) || 100000
    },
    mobileMoney: {
      min: parseFloat(process.env.FRAUD_MOBILE_MIN_AMOUNT) || 1,
      max: parseFloat(process.env.FRAUD_MOBILE_MAX_AMOUNT) || 10000
    }
  },
  // Geolocation checks
  geoChecks: {
    enabled: isProduction ? true : (process.env.ENABLE_GEO_CHECKS !== 'false'),
    // High-risk countries (ISO country codes)
    highRiskCountries: process.env.HIGH_RISK_COUNTRIES 
      ? process.env.HIGH_RISK_COUNTRIES.split(',') 
      : [],
    // Block transactions from sanctioned countries
    blockSanctionedCountries: isProduction ? true : (process.env.BLOCK_SANCTIONED_COUNTRIES !== 'false'),
    // Require additional verification for cross-border transactions
    requireVerificationForCrossBorder: isProduction ? true : (process.env.VERIFY_CROSS_BORDER !== 'false')
  },
  // Device fingerprinting settings
  deviceFingerprinting: {
    enabled: isProduction ? true : (process.env.ENABLE_DEVICE_FINGERPRINTING !== 'false'),
    // Track unusual devices
    trackUnusualDevices: true,
    // Require additional verification for new devices
    requireVerificationForNewDevices: isProduction
  },
  // Machine learning based fraud detection
  machineLearning: {
    enabled: process.env.ENABLE_ML_FRAUD_DETECTION === 'true',
    // Threshold for flagging suspicious transactions (0-1)
    suspiciousThreshold: parseFloat(process.env.ML_SUSPICIOUS_THRESHOLD) || 0.7,
    // Threshold for blocking transactions (0-1)
    blockThreshold: parseFloat(process.env.ML_BLOCK_THRESHOLD) || 0.9
  }
};

// CORS settings
const cors = {
  // CORS settings (pulled from main config)
  origin: config.security.cors.origin,
  methods: config.security.cors.methods,
  allowedHeaders: config.security.cors.allowedHeaders,
  // Additional CORS settings
  exposedHeaders: ['X-Rate-Limit', 'X-Rate-Limit-Remaining'],
  credentials: true,
  maxAge: 86400 // 24 hours in seconds
};

// Generate cryptographically secure random strings
const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Hash sensitive data (like passwords)
const hashData = (data, salt = null) => {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(
      data,
      actualSalt,
      encryption.keyDerivation.iterations,
      encryption.keyDerivation.keyLength,
      encryption.keyDerivation.digest
    )
    .toString('hex');

  return {
    hash,
    salt: actualSalt
  };
};

/**
 * Military-grade security configuration
 */

// AES-256 Configuration
const encryptionConfig = {
  algorithm: 'aes-256-gcm',
  keySize: 32, // 256 bits
  ivSize: 16,
  tagSize: 16,
  keyRotationDays: 90,
  saltSize: 32
};

// TLS Configuration
const tlsConfig = {
  minVersion: 'TLSv1.3',
  cipherSuites: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256'
  ],
  certPinning: true,
  ocspStapling: true
};

// HSM Configuration
const hsmConfig = {
  provider: process.env.HSM_PROVIDER || 'aws',
  region: process.env.HSM_REGION || 'us-west-2',
  keyIdentifier: process.env.HSM_KEY_ID,
  backupEnabled: true
};

// Zero Trust Configuration
const zeroTrustConfig = {
  sessionTimeout: 3600, // 1 hour
  requireDeviceAttestation: true,
  continuousValidation: true,
  riskBasedAuth: true
};

// MFA Configuration
const mfaConfig = {
  requiredLevel: 2,
  allowedMethods: ['totp', 'hardware-token', 'biometric'],
  totpDigits: 6,
  totpWindow: 1,
  backupCodesCount: 10
};

// IDS Configuration
const idsConfig = {
  engine: 'suricata',
  updateInterval: 3600,
  customRules: true,
  alertPriority: {
    high: 1,
    medium: 2,
    low: 3
  }
};

// Network Segmentation
const networkConfig = {
  zones: {
    dmz: {
      allowed: ['web', 'api'],
      restricted: true
    },
    processing: {
      allowed: ['payment'],
      restricted: true
    },
    storage: {
      allowed: ['database'],
      restricted: true
    }
  }
};

// Audit Configuration
const auditConfig = {
  retention: 365, // days
  encryptLogs: true,
  realTimeAnalysis: true,
  alertThresholds: {
    failedLogins: 5,
    unusualAccess: true,
    dataExfiltration: true
  }
};

// Add new utility functions
const securityUtils = {
  generateKey: () => crypto.randomBytes(encryptionConfig.keySize),
  generateIV: () => crypto.randomBytes(encryptionConfig.ivSize),
  generateSalt: () => crypto.randomBytes(encryptionConfig.saltSize),
  
  async encrypt(data, key, iv) {
    const cipher = crypto.createCipheriv(encryptionConfig.algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return { encrypted, tag };
  },
  
  async decrypt(encrypted, key, iv, tag) {
    const decipher = crypto.createDecipheriv(encryptionConfig.algorithm, key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
};

// Export security configuration
export default {
  encryption,
  authentication,
  fraudDetection,
  cors,
  generateSecureToken,
  hashData,
  encryptionConfig,
  tlsConfig,
  hsmConfig,
  zeroTrustConfig,
  mfaConfig,
  idsConfig,
  networkConfig,
  auditConfig,
  ...securityUtils,
  // Helper to determine if we're in production
  isProduction
};

