/**
 * Configuration Validator
 * Validates all required environment variables and configurations
 */

const requiredEnvVars = {
  // Payment Processors
  stripe: {
    STRIPE_SECRET_KEY: 'string',
    STRIPE_PUBLISHABLE_KEY: 'string',
    STRIPE_WEBHOOK_SECRET: 'string',
    STRIPE_API_VERSION: 'string',
    STRIPE_ENABLED: 'boolean'
  },
  paypal: {
    PAYPAL_CLIENT_ID: 'string',
    PAYPAL_CLIENT_SECRET: 'string',
    PAYPAL_ENABLED: 'boolean'
  },
  // Security
  security: {
    JWT_SECRET: 'string',
    ENCRYPTION_KEY: 'string',
    API_RATE_LIMIT: 'number',
    API_RATE_WINDOW_MS: 'number'
  },
  // Database
  database: {
    MONGODB_URI: 'string',
    REDIS_URL: 'string'
  }
};

class ConfigValidator {
  static validate() {
    const errors = [];
    
    for (const [, vars] of Object.entries(requiredEnvVars)) {
      for (const [key, type] of Object.entries(vars)) {
        const value = process.env[key];
        
        if (value === undefined) {
          errors.push(`Missing required environment variable: ${key}`);
          continue;
        }

        switch (type) {
          case 'boolean':
            if (!['true', 'false'].includes(value.toLowerCase())) {
              errors.push(`${key} must be a boolean`);
            }
            break;
          case 'number':
            if (isNaN(Number(value))) {
              errors.push(`${key} must be a number`);
            }
            break;
          case 'string':
            if (typeof value !== 'string' || !value.trim()) {
              errors.push(`${key} must be a non-empty string`);
            }
            break;
          default:
            errors.push(`Unknown type '${type}' for ${key}`);
            break;
        }
      }
    }

    if (errors.length > 0) {
      throw new Error('Configuration validation failed:\n' + errors.join('\n'));
    }

    return true;
  }

  static validateStripeConfig() {
    if (process.env.STRIPE_ENABLED === 'true') {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key || !key.startsWith('sk_')) {
        throw new Error('Invalid Stripe secret key format');
      }
    }
  }

  static validatePayPalConfig() {
    if (process.env.PAYPAL_ENABLED === 'true') {
      const env = process.env.PAYPAL_ENVIRONMENT;
      if (!['sandbox', 'production'].includes(env)) {
        throw new Error('PayPal environment must be either "sandbox" or "production"');
      }
    }
  }

  static validateSecurityConfig() {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret && jwtSecret.length < 32) {
      throw new Error('JWT_SECRET should be at least 32 characters long');
    }

    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (encryptionKey && encryptionKey.length < 32) {
      throw new Error('ENCRYPTION_KEY should be at least 32 characters long');
    }
  }
}

export default ConfigValidator;
