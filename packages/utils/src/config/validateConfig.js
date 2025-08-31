/**
 * Configuration Validator
 * 
 * Validates required environment variables for payment processing
 * Ensures all necessary credentials are properly set before starting the server
 */

/**
 * Define configuration requirements by provider and importance level
 * Levels:
 * - critical: System cannot operate without these
 * - required: Specific payment methods won't work without these
 * - optional: Non-essential but recommended
 */
const CONFIG_REQUIREMENTS = {
  // Core Sunny credentials
  core: {
    SUNNY_ENVIRONMENT: { level: 'critical', description: 'Environment setting (production/sandbox)' },
    SUNNY_MERCHANT_ID: { level: 'critical', description: 'Your Sunny merchant ID' },
    SUNNY_API_KEY: { level: 'critical', description: 'Your Sunny API key' },
    SUNNY_API_SECRET: { level: 'critical', description: 'Your Sunny API secret' },
    SUNNY_WEBHOOK_URL: { level: 'required', description: 'Webhook URL for payment notifications' },
  },
  
  // Stripe integration
  stripe: {
    STRIPE_SECRET_KEY: { level: 'required', description: 'Stripe secret key' },
    STRIPE_PUBLISHABLE_KEY: { level: 'required', description: 'Stripe publishable key' },
    STRIPE_WEBHOOK_SECRET: { level: 'required', description: 'Stripe webhook secret' },
    STRIPE_ACCOUNT_ID: { level: 'optional', description: 'Stripe account ID' },
  },
  
  // PayPal integration
  paypal: {
    PAYPAL_CLIENT_ID: { level: 'required', description: 'PayPal client ID' },
    PAYPAL_CLIENT_SECRET: { level: 'required', description: 'PayPal client secret' },
    PAYPAL_ENVIRONMENT: { level: 'required', description: 'PayPal environment (production/sandbox)' },
    PAYPAL_WEBHOOK_ID: { level: 'required', description: 'PayPal webhook ID' },
  },
  
  // Mobile Money integration
  mobileMoney: {
    // M-Pesa
    MPESA_CONSUMER_KEY: { level: 'required', description: 'M-Pesa consumer key' },
    MPESA_CONSUMER_SECRET: { level: 'required', description: 'M-Pesa consumer secret' },
    MPESA_SHORTCODE: { level: 'required', description: 'M-Pesa shortcode' },
    MPESA_PASSKEY: { level: 'required', description: 'M-Pesa passkey' },
    MPESA_ENVIRONMENT: { level: 'required', description: 'M-Pesa environment (production/sandbox)' },
    
    // Airtel Money
    AIRTEL_MONEY_CLIENT_ID: { level: 'required', description: 'Airtel Money client ID' },
    AIRTEL_MONEY_CLIENT_SECRET: { level: 'required', description: 'Airtel Money client secret' },
    AIRTEL_MONEY_API_URL: { level: 'required', description: 'Airtel Money API URL' },
    
    // MTN Mobile Money
    MTN_MONEY_API_KEY: { level: 'required', description: 'MTN Money API key' },
    MTN_MONEY_API_USER: { level: 'required', description: 'MTN Money API user' },
    MTN_MONEY_SUBSCRIPTION_KEY: { level: 'required', description: 'MTN Money subscription key' },
  },
  
  // Cryptocurrency integration
  crypto: {
    CRYPTO_API_KEY: { level: 'required', description: 'Cryptocurrency payment processor API key' },
    CRYPTO_API_SECRET: { level: 'required', description: 'Cryptocurrency payment processor API secret' },
    CRYPTO_WEBHOOK_SECRET: { level: 'required', description: 'Cryptocurrency webhook secret' },
    BTC_NETWORK: { level: 'required', description: 'Bitcoin network (mainnet/testnet)' },
    ETH_NETWORK: { level: 'required', description: 'Ethereum network (mainnet/testnet)' },
    USDC_NETWORK: { level: 'required', description: 'USDC network (mainnet/testnet)' },
  },
  
  // Database configuration
  database: {
    DB_HOST: { level: 'critical', description: 'Database host' },
    DB_PORT: { level: 'critical', description: 'Database port' },
    DB_NAME: { level: 'critical', description: 'Database name' },
    DB_USER: { level: 'critical', description: 'Database user' },
    DB_PASSWORD: { level: 'critical', description: 'Database password' },
    DB_SSL: { level: 'required', description: 'Database SSL enabled' },
  },
  
  // Security
  security: {
    ENCRYPTION_KEY: { level: 'critical', description: 'Encryption key for sensitive data' },
    JWT_SECRET: { level: 'critical', description: 'JWT secret for authentication' },
    JWT_EXPIRY: { level: 'required', description: 'JWT expiry time in seconds' },
    REFRESH_TOKEN_SECRET: { level: 'required', description: 'Refresh token secret' },
    REFRESH_TOKEN_EXPIRY: { level: 'required', description: 'Refresh token expiry time in seconds' },
    PASSWORD_SALT_ROUNDS: { level: 'required', description: 'Password salt rounds for bcrypt' },
  },
};

/**
 * Validate configuration values
 * @param {Object} envVars - Environment variables
 * @returns {Object} Validation result with errors and warnings
 */
function validateConfig(envVars = process.env) {
  const result = {
    isValid: true,
    criticalErrors: [],
    requiredErrors: [],
    warnings: [],
    ready: {
      core: true,
      stripe: true,
      paypal: true,
      mobileMoney: true,
      crypto: true,
      database: true,
      security: true,
    },
    paymentMethodsReady: []
  };
  
  // Validate all configuration categories
  Object.entries(CONFIG_REQUIREMENTS).forEach(([category, requirements]) => {
    let categoryValid = true;
    
    // Check each requirement in this category
    Object.entries(requirements).forEach(([key, config]) => {
      const value = envVars[key];
      
      // Check for placeholder values (common pattern in the provided .env)
      const isPlaceholder = value && (
        value.includes('<REPLACE_WITH_') || 
        value.includes('YOUR_') ||
        value === 'placeholder'
      );
      
      // Check if value is missing or is a placeholder
      if (!value || isPlaceholder) {
        // Handle based on importance level
        if (config.level === 'critical') {
          result.criticalErrors.push({
            key,
            message: `Missing critical configuration: ${key} - ${config.description}`,
            category
          });
          result.isValid = false;
          categoryValid = false;
        } else if (config.level === 'required') {
          result.requiredErrors.push({
            key,
            message: `Missing required configuration: ${key} - ${config.description}`,
            category
          });
          categoryValid = false;
        } else {
          result.warnings.push({
            key,
            message: `Missing optional configuration: ${key} - ${config.description}`,
            category
          });
        }
      }
    });
    
    // Update category readiness status
    result.ready[category] = categoryValid;
  });
  
  // Determine which payment methods are ready
  if (result.ready.core && result.ready.security && result.ready.database) {
    if (result.ready.stripe) {
      result.paymentMethodsReady.push('card');
    }
    
    if (result.ready.paypal) {
      result.paymentMethodsReady.push('paypal');
    }
    
    if (result.ready.mobileMoney) {
      result.paymentMethodsReady.push('mobile_money');
    }
    
    if (result.ready.crypto) {
      result.paymentMethodsReady.push('crypto');
    }
  }
  
  return result;
}

/**
 * Format validation result as a string for display
 * @param {Object} validationResult - Result from validateConfig()
 * @returns {String} Formatted result
 */
function formatValidationResult(validationResult) {
  let output = '\n=== SUNNY PAYMENT GATEWAY CONFIGURATION VALIDATION ===\n\n';
  
  // Overall status
  if (validationResult.isValid) {
    output += '✅ SYSTEM READY FOR TRANSACTIONS\n\n';
  } else {
    output += '❌ SYSTEM NOT READY FOR TRANSACTIONS\n\n';
    output += 'Critical issues must be resolved before processing payments.\n\n';
  }
  
  // Payment methods ready
  output += '=== PAYMENT METHODS READY ===\n';
  if (validationResult.paymentMethodsReady.length === 0) {
    output += 'None\n';
  } else {
    validationResult.paymentMethodsReady.forEach(method => {
      output += `✅ ${method.toUpperCase()}\n`;
    });
  }
  output += '\n';
  
  // Critical errors
  if (validationResult.criticalErrors.length > 0) {
    output += '=== CRITICAL ERRORS ===\n';
    validationResult.criticalErrors.forEach(error => {
      output += `❌ ${error.message}\n`;
    });
    output += '\n';
  }
  
  // Required errors
  if (validationResult.requiredErrors.length > 0) {
    output += '=== REQUIRED CONFIGURATIONS MISSING ===\n';
    output += 'These are required for specific payment methods:\n';
    validationResult.requiredErrors.forEach(error => {
      output += `⚠️ ${error.message}\n`;
    });
    output += '\n';
  }
  
  // Warnings
  if (validationResult.warnings.length > 0) {
    output += '=== RECOMMENDATIONS ===\n';
    validationResult.warnings.forEach(warning => {
      output += `ℹ️ ${warning.message}\n`;
    });
    output += '\n';
  }
  
  // Category status
  output += '=== COMPONENT STATUS ===\n';
  Object.entries(validationResult.ready).forEach(([category, isReady]) => {
    output += `${isReady ? '✅' : '❌'} ${category.toUpperCase()}\n`;
  });
  
  return output;
}

/**
 * Check if specific payment method is ready based on configuration
 * @param {String} paymentMethod - Payment method to check
 * @param {Object} envVars - Environment variables
 * @returns {Boolean} True if ready
 */
function isPaymentMethodReady(paymentMethod, envVars = process.env) {
  const validationResult = validateConfig(envVars);
  return validationResult.paymentMethodsReady.includes(paymentMethod);
}

/**
 * Validate all configuration and throw error if critical issues found
 * @throws {Error} When critical configuration is missing
 */
function validateConfigOrThrow() {
  const result = validateConfig();
  const formattedResult = formatValidationResult(result);
  
  console.log(formattedResult);
  
  if (!result.isValid) {
    throw new Error('Critical configuration missing. Cannot process payments.');
  }
  
  return result;
}

module.exports = {
  validateConfig,
  formatValidationResult,
  isPaymentMethodReady,
  validateConfigOrThrow,
  CONFIG_REQUIREMENTS
};

