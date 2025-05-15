"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.validatePaymentData = validatePaymentData;
var _constants = require("../core/constants.js");
/**
 * Sunny Payment Gateway - Validation Module
 * 
 * Provides validation functions for payment data
 */

/**
 * Validate payment data
 * 
 * @param {Object} paymentData - Payment data to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
function validatePaymentData(paymentData) {
  var errors = [];

  // Check required fields
  if (!paymentData) {
    return {
      isValid: false,
      errors: ['Payment data is required']
    };
  }

  // Validate amount
  if (!paymentData.amount) {
    errors.push('Amount is required');
  } else if (typeof paymentData.amount !== 'number' || paymentData.amount <= 0) {
    errors.push('Amount must be a positive number');
  }

  // Validate currency
  if (!paymentData.currency) {
    errors.push('Currency is required');
  } else if (!_constants.CURRENCY_CODES.includes(paymentData.currency)) {
    errors.push("Currency ".concat(paymentData.currency, " is not supported"));
  }

  // Validate payment method
  if (!paymentData.paymentMethod) {
    errors.push('Payment method is required');
  } else if (!Object.values(_constants.PAYMENT_METHODS).includes(paymentData.paymentMethod)) {
    errors.push("Payment method ".concat(paymentData.paymentMethod, " is not supported"));
  }

  // Validate payment method specific data
  switch (paymentData.paymentMethod) {
    case _constants.PAYMENT_METHODS.CARD:
      validateCardData(paymentData.card, errors);
      break;
    case _constants.PAYMENT_METHODS.BANK_TRANSFER:
      validateBankTransferData(paymentData.bankAccount, errors);
      break;
    case _constants.PAYMENT_METHODS.MOBILE_MONEY:
      validateMobileMoneyData(paymentData, errors);
      break;
    // Add validation for other payment methods as needed
  }

  // Validate customer data
  if (!paymentData.customer) {
    errors.push('Customer information is required');
  } else {
    if (!paymentData.customer.name) {
      errors.push('Customer name is required');
    }
    if (!paymentData.customer.email) {
      errors.push('Customer email is required');
    } else if (!isValidEmail(paymentData.customer.email)) {
      errors.push('Customer email is invalid');
    }
  }
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Validate card payment data
 * 
 * @private
 * @param {Object} cardData - Card data to validate
 * @param {Array} errors - Array to add errors to
 */
function validateCardData(cardData, errors) {
  if (!cardData) {
    errors.push('Card data is required for card payments');
    return;
  }
  if (!cardData.number) {
    errors.push('Card number is required');
  } else if (!isValidCardNumber(cardData.number)) {
    errors.push('Card number is invalid');
  }
  if (!cardData.expMonth) {
    errors.push('Card expiration month is required');
  } else if (!isValidMonth(cardData.expMonth)) {
    errors.push('Card expiration month is invalid');
  }
  if (!cardData.expYear) {
    errors.push('Card expiration year is required');
  } else if (!isValidExpiryYear(cardData.expYear)) {
    errors.push('Card expiration year is invalid');
  }
  if (!cardData.cvc) {
    errors.push('Card CVC is required');
  } else if (!isValidCVC(cardData.cvc)) {
    errors.push('Card CVC is invalid');
  }
}

/**
 * Validate bank transfer data
 * 
 * @private
 * @param {Object} bankData - Bank account data to validate
 * @param {Array} errors - Array to add errors to
 */
function validateBankTransferData(bankData, errors) {
  if (!bankData) {
    errors.push('Bank account data is required for bank transfers');
    return;
  }
  if (!bankData.accountNumber) {
    errors.push('Bank account number is required');
  }
  if (!bankData.routingNumber) {
    errors.push('Bank routing number is required');
  }
  if (!bankData.accountType) {
    errors.push('Bank account type is required');
  }
}

/**
 * Validate mobile money data
 * 
 * @private
 * @param {Object} paymentData - Payment data to validate
 * @param {Array} errors - Array to add errors to
 */
function validateMobileMoneyData(paymentData, errors) {
  if (!paymentData.phoneNumber) {
    errors.push('Phone number is required for mobile money payments');
  } else if (!isValidPhoneNumber(paymentData.phoneNumber)) {
    errors.push('Phone number is invalid');
  }
  if (!paymentData.mobileProvider) {
    errors.push('Mobile provider is required for mobile money payments');
  }
}

/**
 * Check if email is valid
 * 
 * @private
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
function isValidEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Check if card number is valid using Luhn algorithm
 * 
 * @private
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} Whether card number is valid
 */
function isValidCardNumber(cardNumber) {
  // Remove spaces and dashes
  var digits = cardNumber.replace(/[\s-]/g, '');

  // Check if contains only digits
  if (!/^\d+$/.test(digits)) {
    return false;
  }

  // Check length
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  // Luhn algorithm
  var sum = 0;
  var shouldDouble = false;
  for (var i = digits.length - 1; i >= 0; i--) {
    var digit = parseInt(digits.charAt(i));
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
}

/**
 * Check if month is valid
 * 
 * @private
 * @param {number|string} month - Month to validate
 * @returns {boolean} Whether month is valid
 */
function isValidMonth(month) {
  var monthNum = parseInt(month, 10);
  return !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12;
}

/**
 * Check if expiry year is valid
 * 
 * @private
 * @param {number|string} year - Year to validate
 * @returns {boolean} Whether year is valid
 */
function isValidExpiryYear(year) {
  var yearNum = parseInt(year, 10);
  var currentYear = new Date().getFullYear();
  return !isNaN(yearNum) && yearNum >= currentYear && yearNum <= currentYear + 20;
}

/**
 * Check if CVC is valid
 * 
 * @private
 * @param {string} cvc - CVC to validate
 * @returns {boolean} Whether CVC is valid
 */
function isValidCVC(cvc) {
  return /^\d{3,4}$/.test(cvc);
}

/**
 * Check if phone number is valid
 * 
 * @private
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} Whether phone number is valid
 */
function isValidPhoneNumber(phoneNumber) {
  // Basic validation - in a real system, this would be more sophisticated
  return /^\+?[0-9]{10,15}$/.test(phoneNumber.replace(/[\s-]/g, ''));
}
var _default = exports["default"] = {
  validatePaymentData: validatePaymentData
};