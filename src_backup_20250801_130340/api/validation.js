/**
 * validation.js
 * Comprehensive validation functions for payment processing
 */

import { validateCardData, getCardType } from '../utils/validation.js';

/**
 * Validate card details with comprehensive rules
 */
export const validateCard = async (card, validationRules = {}) => {
  try {
    // Basic card data validation
    validateCardData(card);
    
    // Additional rule-based validation
    if (validationRules.number && !validationRules.number.pattern.test(card.number)) {
      return { isValid: false, error: 'Invalid card number format' };
    }
    
    if (validationRules.expiryMonth && !validationRules.expiryMonth.pattern.test(card.expiryMonth)) {
      return { isValid: false, error: 'Invalid expiry month format' };
    }
    
    if (validationRules.expiryYear && !validationRules.expiryYear.pattern.test(card.expiryYear)) {
      return { isValid: false, error: 'Invalid expiry year format' };
    }
    
    if (validationRules.cvv && !validationRules.cvv.pattern.test(card.cvv)) {
      return { isValid: false, error: 'Invalid CVV format' };
    }
    
    // Luhn check if required
    if (validationRules.number && validationRules.number.luhnCheck) {
      if (!validateLuhn(card.number)) {
        return { isValid: false, error: 'Card number failed Luhn check' };
      }
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

/**
 * Validate phone number for mobile money
 */
export const validatePhoneNumber = async (phoneNumber, options = {}) => {
  try {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return { isValid: false, error: 'Phone number is required' };
    }
    
    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Basic length check
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      return { isValid: false, error: 'Invalid phone number length' };
    }
    
    // Check supported countries if provided
    if (options.countries && options.countries.length > 0) {
      const countryPrefixes = {
        'KE': ['254'],
        'TZ': ['255'],
        'UG': ['256'],
        'RW': ['250']
      };
      
      let isValidCountry = false;
      for (const country of options.countries) {
        const prefixes = countryPrefixes[country] || [];
        if (prefixes.some(prefix => cleanNumber.startsWith(prefix))) {
          isValidCountry = true;
          break;
        }
      }
      
      if (!isValidCountry) {
        return { isValid: false, error: 'Phone number not supported in specified countries' };
      }
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

/**
 * Validate payment method
 */
export const validatePaymentMethod = async (paymentMethod, supportedMethods = []) => {
  try {
    if (!paymentMethod) {
      return { isValid: false, error: 'Payment method is required' };
    }
    
    if (supportedMethods.length > 0 && !supportedMethods.includes(paymentMethod)) {
      return { isValid: false, error: 'Payment method not supported' };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

/**
 * Validate payment data structure
 */
export const validatePaymentData = (paymentData) => {
  const errors = [];
  
  if (!paymentData) {
    errors.push('Payment data is required');
    return { isValid: false, errors };
  }
  
  // Check required fields
  const requiredFields = ['amount', 'currency', 'paymentMethod'];
  
  for (const field of requiredFields) {
    if (!paymentData[field]) {
      errors.push(`${field} is required`);
    }
  }
  
  // Validate amount
  if (paymentData.amount && (typeof paymentData.amount !== 'number' || paymentData.amount <= 0)) {
    errors.push('Amount must be a positive number');
  }
  
  // Validate currency format
  if (paymentData.currency && !/^[A-Z]{3}$/.test(paymentData.currency)) {
    errors.push('Currency must be a 3-letter ISO code');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Luhn algorithm for card number validation
 */
const validateLuhn = (number) => {
  if (!number) return false;
  
  const digits = number.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return (sum % 10) === 0;
};

/**
 * Validate cryptocurrency address
 */
export const validateCryptoAddress = (address, currency) => {
  if (!address) {
    return { isValid: false, error: 'Crypto address is required' };
  }
  
  const patterns = {
    BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
    ETH: /^0x[a-fA-F0-9]{40}$/,
    USDT: /^0x[a-fA-F0-9]{40}$/,
    USDC: /^0x[a-fA-F0-9]{40}$/
  };
  
  const pattern = patterns[currency];
  if (!pattern) {
    return { isValid: false, error: `Unsupported cryptocurrency: ${currency}` };
  }
  
  if (!pattern.test(address)) {
    return { isValid: false, error: `Invalid ${currency} address format` };
  }
  
  return { isValid: true };
};
