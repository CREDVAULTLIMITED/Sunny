/**
 * Validation Configuration
 * 
 * Payment validation rules and schemas for the Sunny Payment Gateway
 */

import config from './config.js';
import processors from './processors.js';

// Country validation rules
const countries = {
  // Format regex by country (validates postal codes, phone numbers, etc.)
  formats: {
    // Phone number validation patterns
    phoneNumber: {
      US: /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/, // +1 followed by area code and number
      UK: /^\+44[1-9]\d{9}$/, // +44 followed by mobile or landline
      AU: /^\+61[2-478]\d{8}$/, // +61 followed by mobile or landline
      CA: /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/, // Same as US
      IN: /^\+91[6-9]\d{9}$/, // +91 followed by mobile number
      KE: /^\+254[17]\d{8}$/, // +254 followed by mobile number for M-Pesa
      // Default international format
      default: /^\+[1-9]\d{1,14}$/ // Basic international format
    },
    // Postal/ZIP code validation patterns
    postalCode: {
      US: /^\d{5}(-\d{4})?$/, // 12345 or 12345-6789
      UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, // UK postcode
      CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // Canadian postal code
      AU: /^\d{4}$/, // Australian postcode
      // Add other countries as needed
      default: /^[A-Z0-9]{3,10}$/ // Basic alphanumeric
    }
  },
  // Sanctioned countries (blocks payments)
  sanctioned: [
    // List countries under sanctions for compliance
    'CU', // Cuba
    'IR', // Iran
    'KP', // North Korea
    'SY', // Syria
    // Add others as needed
  ],
  // High-risk countries (may require additional verification)
  highRisk: [
    // Countries designated as high-risk for financial transactions
    ...config.fraudDetection?.geoChecks?.highRiskCountries || []
  ],
  // Supported countries for all services
  supported: [
    // Major supported regions
    'US', 'CA', // North America
    'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'PT', 'CH', 'AT', 'SE', 'DK', 'NO', 'FI', 'IE', 'LU', // Europe
    'AU', 'NZ', 'JP', 'SG', 'HK', 'KR', // Asia Pacific
    'BR', 'MX', 'AR', 'CL', 'CO', // Latin America
    'ZA', 'KE', 'NG', 'EG', 'MA', // Africa
    'AE', 'SA', 'IL', 'TR' // Middle East
    // Add more as service expands
  ]
};

// Payment method validation rules
const paymentMethods = {
  // Card validation settings
  card: {
    allowedNetworks: ['visa', 'mastercard', 'amex', 'discover', 'jcb', 'diners', 'unionpay'],
    validation: {
      // Luhn algorithm check for card numbers
      requireLuhnCheck: true,
      // Minimum and maximum card number length
      cardNumberLength: {
        min: 13,
        max: 19
      },
      // CVV/CVC length requirements
      cvvLength: {
        amex: 4,
        default: 3
      },
      // Expiry date validation
      expiryDate: {
        // Minimum months in the future
        minFutureMonths: 1,
        // Maximum years in the future
        maxFutureYears: 20
      }
    },
    // Requirements by currency and amount
    requirements: {
      // 3DS requirements by currency, can be customized
      threeDSecure: {
        ...Object.fromEntries(
          Object.entries(processors.stripe.paymentMethods.card.supportedCurrencies)
            .map(([currency]) => [
              currency, 
              { 
                required: processors.stripe.paymentMethods.card.requires3DS,
                thresholdAmount: 50 // Amount above which 3DS is required
              }
            ])
        ),
        // Default for all other currencies
        default: {
          required: processors.stripe.paymentMethods.card.requires3DS,
          thresholdAmount: 50
        }
      }
    }
  },
  // Bank transfer validation
  bankTransfer: {
    validation: {
      // ACH validation
      ach: {
        routingNumberRegex: /^\d{9}$/,
        accountNumberRegex: /^\d{4,17}$/
      },
      // SEPA validation
      sepa: {
        ibanRegex: /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}[A-Z0-9]{0,16}$/,
        bicRegex: /^[A-Z]{6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$/
      },
      // UK bank account validation
      uk: {
        sortCodeRegex: /^\d{2}-\d{2}-\d{2}$|^\d{6}$/,
        accountNumberRegex: /^\d{8}$/
      },
      // Wire transfer validation
      wire: {
        swiftCodeRegex: /^[A-Z]{6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$/
      }
    },
    // Minimum and maximum amounts by transfer type
    amountLimits: {
      ach: {
        min: 1.00,
        max: 1000000.00
      },
      sepa: {
        min: 0.01,
        max: 1000000.00
      },
      wire: {
        min: 100.00,
        max: 10000000.00
      },
      default: {
        min: 1.00,
        max: 1000000.00
      }
    }
  },
  // Mobile money validation
  mobileMoney: {
    // M-Pesa validation
    mpesa: {
      phoneNumberRegex: /^\+254[17]\d{8}$/,
      accountReferenceRegex: /^[A-Za-z0-9]{1,12}$/,
      amountLimits: {
        min: 1.00,
        max: 150000.00 // 150,000 KES limit
      }
    },
    // Other mobile money providers can be added here
  },
  // Cryptocurrency validation
  crypto: {
    // Address format validation by currency
    addressFormat: {
      BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      USDT: /^0x[a-fA-F0-9]{40}$/, // ERC-20 USDT
      USDC: /^0x[a-fA-F0-9]{40}$/, // ERC-20 USDC
      default: /^[a-zA-Z0-9]{30,90}$/ // Generic crypto address format
    },
    // Transaction hash validation
    transactionHash: {
      BTC: /^[a-fA-F0-9]{64}$/,
      ETH: /^0x[a-fA-F0-9]{64}$/,
      default: /^[a-fA-F0-9]{64}$/
    },
    // Minimum amount validation (to ensure economic viability)
    minimumAmount: {
      BTC: 0.00001, // ~$0.50 at $50,000/BTC
      ETH: 0.0001, // ~$0.20 at $2,000/ETH
      USDT: 1,
      USDC: 1,
      default: 0.00001
    },
    // Required confirmations for payment processing
    requiredConfirmations: {
      BTC: 3,
      ETH: 12,
      USDT: 12, // Same as ETH for ERC-20
      USDC: 12, // Same as ETH for ERC-20
      default: 6
    }
  },
  // QR code payment validation
  qrcode: {
    // Supported QR code formats
    formats: ['png', 'svg', 'pdf', 'base64'],
    // Maximum size in pixels
    maxSize: 2000,
    // Minimum size in pixels
    minSize: 100,
    // Default size in pixels
    defaultSize: 300,
    // Maximum QR code content length
    maxContentLength: 1024,
    // Expiration time in minutes
    expirationMinutes: 30,
    // Validation by payment type
    paymentTypes: {
      // Alipay validation
      alipay: {
        format: /^[a-zA-Z0-9]+$/,
        maxLength: 128
      },
      // WeChat validation
      wechat: {
        format: /^[a-zA-Z0-9]+$/,
        maxLength: 128
      },
      // UPI validation
      upi: {
        format: /^[a-zA-Z0-9]+$/,
        maxLength: 128
      },
      // Crypto QR validation
      crypto: {
        format: /^[a-zA-Z0-9:?=&]+$/,
        maxLength: 256
      }
    }
  },
  // General payment validation
  general: {
    // Currency code format
    currencyCode: /^[A-Z]{3}$/,
    // Amount format (positive number with up to 8 decimal places)
    amount: /^(?:\d{1,10}|\d{1,10}\.\d{1,8})$/,
    // Amount range (in smallest acceptable unit)
    amountRange: {
      min: 0.01,
      max: 10000000.00 // 10 million
    },
    // Transaction ID format (UUID v4)
    transactionId: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    // Custom transaction ID format
    customTransactionId: /^[a-zA-Z0-9_-]{1,64}$/,
    // Reference number validation
    referenceNumber: {
      format: /^[a-zA-Z0-9_-]{1,64}$/,
      minLength: 3,
      maxLength: 64
    },
    // Description validation
    description: {
      maxLength: 255,
      minLength: 3,
      format: /^[a-zA-Z0-9\s.,\-_'":;!?()[\]{}@#$%^&*+=|\\\/~`<>]*$/,
      // Filter out potentially malicious content
      disallowedTerms: ['<script', 'javascript:', 'data:text', 'eval(', 'document.cookie']
    },
    // Metadata validation
    metadata: {
      maxKeys: 20,
      maxKeyLength: 40,
      maxValueLength: 500,
      // Total metadata size limit in bytes
      maxSizeBytes: 16384 // 16KB
    }
  },
  // Customer information validation
  customer: {
    // Name validation
    name: {
      format: /^[a-zA-Z\s.,'\-]{2,100}$/,
      minLength: 2,
      maxLength: 100
    },
    // Email validation
    email: {
      format: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      maxLength: 254
    },
    // Phone validation (uses country-specific formats if available)
    phone: {
      // Default international format if country-specific not available
      format: /^\+[1-9]\d{1,14}$/,
      minLength: 8,
      maxLength: 16
    },
    // Address validation
    address: {
      // Street address
      street: {
        format: /^[a-zA-Z0-9\s.,'\-/]{5,100}$/,
        minLength: 5,
        maxLength: 100
      },
      // City
      city: {
        format: /^[a-zA-Z\s.,'\-]{2,50}$/,
        minLength: 2,
        maxLength: 50
      },
      // State/Province/Region
      state: {
        format: /^[a-zA-Z\s.,'\-]{2,50}$/,
        minLength: 2,
        maxLength: 50
      },
      // Postal/ZIP code (uses country-specific formats if available)
      postalCode: {
        // Default format if country-specific not available
        format: /^[a-zA-Z0-9\s-]{3,10}$/,
        minLength: 3,
        maxLength: 10
      },
      // Country code (ISO 3166-1 alpha-2)
      country: {
        format: /^[A-Z]{2}$/,
        // Only allow countries we support
        allowedValues: countries.supported
      }
    }
  }
};

// Export validation configuration
export default {
  countries,
  paymentMethods,
  // Helper functions
  
  /**
   * Validate a payment amount
   * 
   * @param {number|string} amount - Payment amount
   * @param {string} currency - Currency code
   * @param {string} paymentMethod - Payment method
   * @returns {Object} Validation result
   */
  validateAmount: (amount, currency, paymentMethod) => {
    const numericAmount = parseFloat(amount);
    
    // Check if amount is a valid number
    if (isNaN(numericAmount)) {
      return {
        isValid: false,
        message: 'Invalid amount format'
      };
    }
    
    // Check amount against general limits
    if (numericAmount < paymentMethods.general.amountRange.min ||
        numericAmount > paymentMethods.general.amountRange.max) {
      return {
        isValid: false,
        message: `Amount must be between ${paymentMethods.general.amountRange.min} and ${paymentMethods.general.amountRange.max}`
      };
    }
    
    // Check against payment method specific limits if available
    if (paymentMethod && paymentMethods[paymentMethod]?.amountLimits) {
      const limits = paymentMethods[paymentMethod].amountLimits;
      const methodLimits = limits[currency.toLowerCase()] || limits.default;
      
      if (methodLimits && (numericAmount < methodLimits.min || numericAmount > methodLimits.max)) {
        return {
          isValid: false,
          message: `For ${paymentMethod} payments, amount must be between ${methodLimits.min} and ${methodLimits.max} ${currency}`
        };
      }
    }
    
    return {
      isValid: true
    };
  },
  
  /**
   * Validate customer information
   * 
   * @param {Object} customerData - Customer information
   * @returns {Object} Validation result
   */
  validateCustomer: (customerData) => {
    const errors = [];
    
    // Validate customer name if provided
    if (customerData.name !== undefined) {
      if (!paymentMethods.customer.name.format.test(customerData.name)) {
        errors.push('Invalid customer name format');
      }
      
      if (customerData.name.length < paymentMethods.customer.name.minLength ||
          customerData.name.length > paymentMethods.customer.name.maxLength) {
        errors.push(`Customer name must be between ${paymentMethods.customer.name.minLength} and ${paymentMethods.customer.name.maxLength} characters`);
      }
    }
    
    // Validate customer email if provided
    if (customerData.email !== undefined) {
      if (!paymentMethods.customer.email.format.test(customerData.email)) {
        errors.push('Invalid email format');
      }
      
      if (customerData.email.length > paymentMethods.customer.email.maxLength) {
        errors.push(`Email must be no more than ${paymentMethods.customer.email.maxLength} characters`);
      }
    }
    
    // Validate phone number if provided
    if (customerData.phone !== undefined) {
      // Get country-specific phone format if available
      const phoneRegex = customerData.country && countries.formats.phoneNumber[customerData.country]
        ? countries.formats.phoneNumber[customerData.country]
        : paymentMethods.customer.phone.format;
      
      if (!phoneRegex.test(customerData.phone)) {
        errors.push('Invalid phone number format');
      }
    }
    
    // Validate address if provided
    if (customerData.address) {
      // Validate each address component
      const address = customerData.address;
      
      if (address.country && !paymentMethods.customer.address.country.format.test(address.country)) {
        errors.push('Invalid country code format');
      }
      
      if (address.country && !paymentMethods.customer.address.country.allowedValues.includes(address.country)) {
        errors.push('Country is not supported');
      }
      
      // Only validate remaining address fields if country is supported
      if (!errors.find(err => err.includes('Country'))) {
        if (address.street && !paymentMethods.customer.address.street.format.test(address.street)) {
          errors.push('Invalid street address format');
        }
        
        if (address.city && !paymentMethods.customer.address.city.format.test(address.city)) {
          errors.push('Invalid city format');
        }
        
        if (address.state && !paymentMethods.customer.address.state.format.test(address.state)) {
          errors.push('Invalid state/region format');
        }
        
        if (address.postalCode) {
          // Get country-specific postal code format if available
          const postalRegex = address.country && countries.formats.postalCode[address.country]
            ? countries.formats.postalCode[address.country]
            : paymentMethods.customer.address.postalCode.format;
          
          if (!postalRegex.test(address.postalCode)) {
            errors.push('Invalid postal/ZIP code format');
          }
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  /**
   * Validate metadata
   * 
   * @param {Object} metadata - Metadata object
   * @returns {Object} Validation result
   */
  validateMetadata: (metadata) => {
    if (!metadata || typeof metadata !== 'object') {
      return { isValid: true }; // Empty or undefined metadata is valid
    }
    
    const keys = Object.keys(metadata);
    const errors = [];
    
    // Check number of keys
    if (keys.length > paymentMethods.general.metadata.maxKeys) {
      errors.push(`Metadata cannot have more than ${paymentMethods.general.metadata.maxKeys} keys`);
    }
    
    // Check key and value lengths
    for (const key of keys) {
      if (key.length > paymentMethods.general.metadata.maxKeyLength) {
        errors.push(`Metadata key '${key}' exceeds maximum length of ${paymentMethods.general.metadata.maxKeyLength} characters`);
      }
      
      const value = metadata[key];
      const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
      
      if (valueStr.length > paymentMethods.general.metadata.maxValueLength) {
        errors.push(`Metadata value for key '${key}' exceeds maximum length of ${paymentMethods.general.metadata.maxValueLength} characters`);
      }
    }
    
    // Check total size
    const metadataStr = JSON.stringify(metadata);
    if (metadataStr.length > paymentMethods.general.metadata.maxSizeBytes) {
      errors.push(`Total metadata size exceeds maximum of ${paymentMethods.general.metadata.maxSizeBytes} bytes`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

