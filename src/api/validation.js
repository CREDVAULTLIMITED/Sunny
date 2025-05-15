/**
 * validation.js
 * 
 * Validation functions for API requests
 */

import { PAYMENT_METHODS, CARD_NETWORKS, MOBILE_MONEY_PROVIDERS, CURRENCIES } from '../core/constants';

/**
 * Validate a payment request
 * 
 * @param {Object} paymentRequest - Payment request to validate
 * @param {boolean} isPaymentLink - Whether this is for a payment link (less strict validation)
 * @returns {Object} Validation result
 */
export const validatePaymentRequest = (paymentRequest, isPaymentLink = false) => {
  const errors = [];
  
  // Check required fields
  if (!paymentRequest) {
    return {
      valid: false,
      errors: ['Payment request is required']
    };
  }
  
  // Check payment method
  if (!paymentRequest.paymentMethod) {
    errors.push('Payment method is required');
  } else if (!Object.values(PAYMENT_METHODS).includes(paymentRequest.paymentMethod)) {
    errors.push(`Unsupported payment method: ${paymentRequest.paymentMethod}`);
  }
  
  // Check amount
  if (!paymentRequest.amount) {
    errors.push('Amount is required');
  } else if (isNaN(parseFloat(paymentRequest.amount)) || parseFloat(paymentRequest.amount) <= 0) {
    errors.push('Amount must be a positive number');
  }
  
  // Check currency
  if (!paymentRequest.currency) {
    errors.push('Currency is required');
  } else if (!Object.values(CURRENCIES).includes(paymentRequest.currency)) {
    errors.push(`Unsupported currency: ${paymentRequest.currency}`);
  }
  
  // Check recipient information
  if (!isPaymentLink && !paymentRequest.recipientId && !paymentRequest.merchantId) {
    errors.push('Recipient ID or merchant ID is required');
  }
  
  // Validate method-specific details
  if (paymentRequest.paymentMethod === PAYMENT_METHODS.CARD) {
    validateCardDetails(paymentRequest, errors);
  } else if (paymentRequest.paymentMethod === PAYMENT_METHODS.MOBILE_MONEY) {
    validateMobileMoneyDetails(paymentRequest, errors);
  } else if (paymentRequest.paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
    validateBankDetails(paymentRequest, errors);
  } else if (paymentRequest.paymentMethod === PAYMENT_METHODS.CRYPTO) {
    validateCryptoDetails(paymentRequest, errors);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validate card payment details
 * 
 * @param {Object} paymentRequest - Payment request
 * @param {Array} errors - Errors array to append to
 */
const validateCardDetails = (paymentRequest, errors) => {
  if (!paymentRequest.cardDetails) {
    errors.push('Card details are required');
    return;
  }
  
  const { cardDetails } = paymentRequest;
  
  // Check card number
  if (!cardDetails.cardNumber) {
    errors.push('Card number is required');
  } else if (!isValidCardNumber(cardDetails.cardNumber)) {
    errors.push('Invalid card number');
  }
  
  // Check expiry date
  if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
    errors.push('Card expiry date is required');
  } else if (!isValidExpiryDate(cardDetails.expiryMonth, cardDetails.expiryYear)) {
    errors.push('Card has expired');
  }
  
  // Check CVV
  if (!cardDetails.cvv) {
    errors.push('CVV is required');
  } else if (!isValidCVV(cardDetails.cvv, determineCardNetwork(cardDetails.cardNumber))) {
    errors.push('Invalid CVV');
  }
  
  // Check cardholder name
  if (!cardDetails.cardholderName) {
    errors.push('Cardholder name is required');
  }
};

/**
 * Validate mobile money payment details
 * 
 * @param {Object} paymentRequest - Payment request
 * @param {Array} errors - Errors array to append to
 */
const validateMobileMoneyDetails = (paymentRequest, errors) => {
  if (!paymentRequest.mobileMoneyDetails) {
    errors.push('Mobile money details are required');
    return;
  }
  
  const { mobileMoneyDetails } = paymentRequest;
  
  // Check provider
  if (!mobileMoneyDetails.provider) {
    errors.push('Mobile money provider is required');
  } else if (!Object.values(MOBILE_MONEY_PROVIDERS).includes(mobileMoneyDetails.provider)) {
    errors.push(`Unsupported mobile money provider: ${mobileMoneyDetails.provider}`);
  }
  
  // Check phone number
  if (!mobileMoneyDetails.phoneNumber) {
    errors.push('Phone number is required');
  } else if (!isValidPhoneNumber(mobileMoneyDetails.phoneNumber)) {
    errors.push('Invalid phone number format');
  }
};

/**
 * Validate bank transfer details
 * 
 * @param {Object} paymentRequest - Payment request
 * @param {Array} errors - Errors array to append to
 */
const validateBankDetails = (paymentRequest, errors) => {
  if (!paymentRequest.bankDetails) {
    errors.push('Bank details are required');
    return;
  }
  
  const { bankDetails } = paymentRequest;
  
  // Check account information based on transfer type
  if (bankDetails.iban) {
    // SEPA transfer
    if (!isValidIBAN(bankDetails.iban)) {
      errors.push('Invalid IBAN');
    }
    
    if (!bankDetails.bic && !bankDetails.swiftCode) {
      errors.push('BIC or SWIFT code is required for SEPA transfers');
    }
  } else if (bankDetails.accountNumber) {
    // ACH or wire transfer
    if (!bankDetails.routingNumber && !bankDetails.swiftCode) {
      errors.push('Routing number or SWIFT code is required');
    }
  } else if (bankDetails.upiId) {
    // UPI transfer
    if (!isValidUPIId(bankDetails.upiId)) {
      errors.push('Invalid UPI ID');
    }
  } else {
    errors.push('Valid bank account information is required');
  }
};

/**
 * Validate cryptocurrency payment details
 * 
 * @param {Object} paymentRequest - Payment request
 * @param {Array} errors - Errors array to append to
 */
const validateCryptoDetails = (paymentRequest, errors) => {
  if (!paymentRequest.cryptoDetails) {
    errors.push('Cryptocurrency details are required');
    return;
  }
  
  const { cryptoDetails } = paymentRequest;
  
  // Check crypto type
  if (!cryptoDetails.cryptoType) {
    errors.push('Cryptocurrency type is required');
  }
  
  // Check destination address
  if (!cryptoDetails.destinationAddress) {
    errors.push('Destination address is required');
  }
  
  // Check amount
  if (!cryptoDetails.cryptoAmount && !paymentRequest.amount) {
    errors.push('Either crypto amount or fiat amount is required');
  }
};

/**
 * Check if a card number is valid using Luhn algorithm
 * 
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} True if valid
 */
const isValidCardNumber = (cardNumber) => {
  // Remove spaces and dashes
  const normalizedNumber = cardNumber.replace(/[\s-]/g, '');
  
  // Check if it contains only digits
  if (!/^\d+$/.test(normalizedNumber)) {
    return false;
  }
  
  // Check length
  if (normalizedNumber.length < 13 || normalizedNumber.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through values starting from the rightmost digit
  for (let i = normalizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(normalizedNumber.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Check if a card expiry date is valid
 * 
 * @param {string|number} month - Expiry month
 * @param {string|number} year - Expiry year
 * @returns {boolean} True if valid
 */
const isValidExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
  const currentYear = currentDate.getFullYear();
  
  // Convert to numbers
  const expiryMonth = parseInt(month, 10);
  let expiryYear = parseInt(year, 10);
  
  // Handle 2-digit years
  if (expiryYear < 100) {
    expiryYear += 2000;
  }
  
  // Check if month is valid
  if (expiryMonth < 1 || expiryMonth > 12) {
    return false;
  }
  
  // Check if card has expired
  if (expiryYear < currentYear) {
    return false;
  }
  
  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return false;
  }
  
  return true;
};

/**
 * Check if a CVV is valid
 * 
 * @param {string|number} cvv - CVV to validate
 * @param {string} cardNetwork - Card network
 * @returns {boolean} True if valid
 */
const isValidCVV = (cvv, cardNetwork) => {
  // Convert to string
  const cvvString = cvv.toString();
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cvvString)) {
    return false;
  }
  
  // Check length based on card network
  if (cardNetwork === CARD_NETWORKS.AMEX) {
    return cvvString.length === 4;
  } else {
    return cvvString.length === 3;
  }
};

/**
 * Determine card network from card number
 * 
 * @param {string} cardNumber - Card number
 * @returns {string} Card network
 */
const determineCardNetwork = (cardNumber) => {
  // Remove spaces and dashes
  const normalizedNumber = cardNumber.replace(/[\s-]/g, '');
  
  // Visa: Starts with 4
  if (/^4/.test(normalizedNumber)) {
    return CARD_NETWORKS.VISA;
  }
  
  // Mastercard: Starts with 51-55 or 2221-2720
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(normalizedNumber)) {
    return CARD_NETWORKS.MASTERCARD;
  }
  
  // American Express: Starts with 34 or 37
  if (/^3[47]/.test(normalizedNumber)) {
    return CARD_NETWORKS.AMEX;
  }
  
  // Discover: Starts with 6011, 622126-622925, 644-649, or 65
  if (/^(6011|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])|64[4-9]|65)/.test(normalizedNumber)) {
    return CARD_NETWORKS.DISCOVER;
  }
  
  // JCB: Starts with 3528-3589
  if (/^35(2[89]|[3-8]\d)/.test(normalizedNumber)) {
    return CARD_NETWORKS.JCB;
  }
  
  // UnionPay: Starts with 62
  if (/^62/.test(normalizedNumber)) {
    return CARD_NETWORKS.UNIONPAY;
  }
  
  // Default to generic
  return 'UNKNOWN';
};

/**
 * Check if a phone number is valid
 * 
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} True if valid
 */
const isValidPhoneNumber = (phoneNumber) => {
  // Basic validation - in a real system this would be more sophisticated
  return /^[+]?[0-9]{10,15}$/.test(phoneNumber);
};

/**
 * Check if an IBAN is valid
 * 
 * @param {string} iban - IBAN to validate
 * @returns {boolean} True if valid
 */
const isValidIBAN = (iban) => {
  // Basic validation - in a real system this would be more sophisticated
  return /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(iban.replace(/\s/g, ''));
};

/**
 * Check if a UPI ID is valid
 * 
 * @param {string} upiId - UPI ID to validate
 * @returns {boolean} True if valid
 */
const isValidUPIId = (upiId) => {
  // Basic validation - in a real system this would be more sophisticated
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId);
};

export default {
  validatePaymentRequest
};