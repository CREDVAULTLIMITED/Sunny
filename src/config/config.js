/**
 * Main Configuration File
 * 
 * Environment-specific settings and global configuration for the Sunny Payment Gateway
 */

import dotenv from 'dotenv';
import joi from 'joi';

// Load environment variables from .env file
dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
});

// Set NODE_ENV if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// Construct DATABASE_URL from individual parameters if provided
if (!process.env.DATABASE_URL && process.env.DB_HOST) {
  process.env.DATABASE_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

const envVarsSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
  PORT: joi.number().default(3000),
  DATABASE_URL: process.env.NODE_ENV === 'development' 
    ? joi.string().default('sqlite://./dev.db')
    : joi.string().required(),
  JWT_SECRET: process.env.NODE_ENV === 'development'
    ? joi.string().default('dev-jwt-secret-key')
    : joi.string().required(),
  JWT_EXPIRES_IN: joi.string().default('1d'),
  CORS_ORIGIN: joi.string().default('*'),
  RATE_LIMIT_WINDOW_MS: joi.number().default(900000),
  RATE_LIMIT_MAX: joi.number().default(100),
  ENCRYPTION_KEY: process.env.NODE_ENV === 'development'
    ? joi.string().default('dev-encryption-key-32-chars-long-123')
    : joi.string().required(),
  REDIS_URL: process.env.NODE_ENV === 'development'
    ? joi.string().default('redis://localhost:6379')
    : joi.string().required(),
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Determine current environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Base configuration shared across all environments
const baseConfig = {
  app: {
    name: 'Sunny Payment Gateway',
    version: '1.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    apiVersion: process.env.API_VERSION || 'v1',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    environment: NODE_ENV
  },
  merchant: {
    id: process.env.SUNNY_MERCHANT_ID || 'sunny_default_merchant',
    name: process.env.MERCHANT_NAME || 'Sunny Payments',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@sunnypayments.com',
    supportPhone: process.env.SUPPORT_PHONE || '+1-555-SUNNY-00'
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableFileLogging: process.env.ENABLE_FILE_LOGGING === 'true',
    logDirectory: process.env.LOG_DIRECTORY || './logs',
    errorLogFileName: 'error.log',
    combinedLogFileName: 'combined.log',
    enableConsoleLogging: process.env.ENABLE_CONSOLE_LOGGING !== 'false'
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-for-jwt-should-be-very-long',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    encryptionKey: process.env.ENCRYPTION_KEY || 'your-encryption-key-must-be-at-least-32-chars',
    enableRateLimit: process.env.ENABLE_RATE_LIMIT !== 'false',
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100 // limit each IP to 100 requests per windowMs
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key']
    }
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'sunny_payments',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'secure_password',
    ssl: process.env.DB_SSL === 'true',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10
  },
  webhooks: {
    secret: process.env.WEBHOOK_SECRET || 'your-webhook-secret-should-be-strong',
    retryCount: parseInt(process.env.WEBHOOK_RETRY_COUNT, 10) || 3,
    baseUrl: process.env.WEBHOOK_BASE_URL || 'https://api.sunnypayments.com/webhooks'
  },
  features: {
    enableInstantSettlement: process.env.ENABLE_INSTANT_SETTLEMENT === 'true',
    enableAutomaticRefunds: process.env.ENABLE_AUTOMATIC_REFUNDS === 'true',
    enableCurrencyConversion: process.env.ENABLE_CURRENCY_CONVERSION !== 'false',
    enableFraudDetection: process.env.ENABLE_FRAUD_DETECTION !== 'false',
    enableRecurringPayments: process.env.ENABLE_RECURRING_PAYMENTS !== 'false'
  },
  redis: {
    url: envVars.REDIS_URL,
  }
};

// Environment-specific configurations
const environmentConfigs = {
  development: {
    app: {
      baseUrl: 'http://localhost:3000'
    },
    logging: {
      level: 'debug',
      enableConsoleLogging: true
    },
    webhooks: {
      baseUrl: 'http://localhost:3000/api/webhooks'
    }
  },
  test: {
    app: {
      baseUrl: 'http://localhost:3000'
    },
    database: {
      database: 'sunny_payments_test'
    },
    logging: {
      level: 'debug',
      enableFileLogging: false,
      enableConsoleLogging: true
    }
  },
  staging: {
    app: {
      baseUrl: 'https://staging.sunnypayments.com'
    },
    logging: {
      level: 'info',
      enableFileLogging: true
    },
    webhooks: {
      baseUrl: 'https://staging.sunnypayments.com/api/webhooks'
    }
  },
  production: {
    app: {
      baseUrl: 'https://api.sunnypayments.com'
    },
    logging: {
      level: 'warn',
      enableFileLogging: true
    },
    security: {
      // In production, we require these values to be set in environment variables
      jwtSecret: process.env.JWT_SECRET,
      encryptionKey: process.env.ENCRYPTION_KEY,
      cors: {
        origin: process.env.CORS_ORIGIN || 'https://dashboard.sunnypayments.com'
      }
    },
    webhooks: {
      baseUrl: 'https://api.sunnypayments.com/api/webhooks'
    }
  }
};

// Merge base config with environment-specific config
const envConfig = environmentConfigs[NODE_ENV] || environmentConfigs.development;
const config = {
  ...baseConfig,
  ...envConfig,
  // Merge nested objects
  app: { ...baseConfig.app, ...envConfig.app },
  logging: { ...baseConfig.logging, ...envConfig.logging },
  security: { ...baseConfig.security, ...envConfig.security },
  database: { ...baseConfig.database, ...envConfig.database },
  webhooks: { ...baseConfig.webhooks, ...envConfig.webhooks }
};

// Validate critical configuration values
if (NODE_ENV === 'production') {
  const missingEnvVars = [];
  
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key-for-jwt-should-be-very-long') {
    missingEnvVars.push('JWT_SECRET');
  }
  
  if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY === 'your-encryption-key-must-be-at-least-32-chars') {
    missingEnvVars.push('ENCRYPTION_KEY');
  }
  
  if (!process.env.DB_PASSWORD || process.env.DB_PASSWORD === 'secure_password') {
    missingEnvVars.push('DB_PASSWORD');
  }
  
  if (missingEnvVars.length > 0) {
    console.error(`CRITICAL: Missing required environment variables for production: ${missingEnvVars.join(', ')}`);
    if (process.env.ENFORCE_SECURE_CONFIG === 'true') {
      process.exit(1);
    }
  }
}

/**
 * Application configuration
 */

const appConfig = {
  // Bank configuration
  bank: {
    defaultTimeout: 30000,
    maxRetries: 3,
    heartbeatInterval: 30000,
    messageTimeout: 10000,
    maxReconnectAttempts: 3,
    reconnectDelay: 5000
  },

  // Security configuration
  security: {
    encryptionKey: process.env.ENCRYPTION_KEY || 'your-encryption-key',
    threeDSecureEnabled: true,
    threeDSecureTimeout: 5000,
    maxFailedAttempts: 3
  },

  // API endpoints
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.sunny.com',
    version: 'v1',
    timeout: 5000
  },

  // Bank endpoints
  bankEndpoints: {
    sandbox: 'wss://sandbox.bank-api.sunny.com',
    production: 'wss://bank-api.sunny.com'
  },

  // Payment processing
  processing: {
    maxAmount: 999999.99,
    minAmount: 0.01,
    supportedCurrencies: ['USD', 'EUR', 'GBP'],
    defaultCurrency: 'USD'
  }
};

const finalConfig = { ...config, ...appConfig };
export default finalConfig;

