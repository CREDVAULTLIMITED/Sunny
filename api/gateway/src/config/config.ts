/**
 * API Gateway Configuration
 */

import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();

interface ServiceConfig {
  coreEngine: string;
  kenyaService: string;
  authService: string;
  analyticsService: string;
  notificationService: string;
  fraudDetection: string;
  aiService: string;
  complianceService: string;
}

interface CorsConfig {
  allowedOrigins: string[];
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
}

interface SecurityConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  apiKeyHeader: string;
  encryptionKey: string;
}

interface DatabaseConfig {
  redis: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };
}

interface Config {
  environment: string;
  port: number;
  services: ServiceConfig;
  cors: CorsConfig;
  rateLimit: RateLimitConfig;
  security: SecurityConfig;
  database: DatabaseConfig;
  logging: {
    level: string;
    format: string;
  };
}

export const config: Config = {
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8080', 10),

  services: {
    coreEngine: process.env.CORE_ENGINE_URL || 'http://localhost:8081',
    kenyaService: process.env.KENYA_SERVICE_URL || 'http://localhost:8082',
    authService: process.env.AUTH_SERVICE_URL || 'http://localhost:8083',
    analyticsService: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:8084',
    notificationService: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8085',
    fraudDetection: process.env.FRAUD_DETECTION_URL || 'http://localhost:8086',
    aiService: process.env.AI_SERVICE_URL || 'http://localhost:8087',
    complianceService: process.env.COMPLIANCE_SERVICE_URL || 'http://localhost:8088'
  },

  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
      'https://sunnypayments.com',
      'https://app.sunnypayments.com',
      'https://business.sunnypayments.com',
      'https://institutions.sunnypayments.com',
      'https://admin.sunnypayments.com',
      'https://developers.sunnypayments.com'
    ]
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    skipSuccessfulRequests: process.env.RATE_LIMIT_SKIP_SUCCESSFUL === 'true'
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || 'sunny-payment-gateway-jwt-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    apiKeyHeader: process.env.API_KEY_HEADER || 'X-API-Key',
    encryptionKey: process.env.ENCRYPTION_KEY || 'sunny-encryption-key-32-characters'
  },

  database: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0', 10)
    }
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined'
  }
};

// Validate required environment variables in production
if (config.environment === 'production') {
  const requiredEnvVars = [
    'JWT_SECRET',
    'ENCRYPTION_KEY',
    'CORE_ENGINE_URL',
    'KENYA_SERVICE_URL',
    'AUTH_SERVICE_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Validate JWT secret strength
  if (config.security.jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long in production');
  }

  // Validate encryption key length
  if (config.security.encryptionKey.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be exactly 32 characters long');
  }
}

