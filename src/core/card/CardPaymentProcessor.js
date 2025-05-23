/**
 * CardPaymentProcessor.js
 * 
 * Handles processing of card payments across different card networks
 * (Visa, Mastercard, Amex, etc.)
 */

import { CARD_NETWORKS, PAYMENT_STATUS, ERROR_CODES } from '../constants.js';
import { logTransaction, logError } from '../transactionLogger.js';

class CardPaymentProcessor {
  constructor() {
    // Transaction status cache
    this.transactionStatus = new Map();
    
    // Card network handlers
    this.networkHandlers = {
      [CARD_NETWORKS.VISA]: this._processVisaCard.bind(this),
      [CARD_NETWORKS.MASTERCARD]: this._processMastercardCard.bind(this),
      [CARD_NETWORKS.AMEX]: this._processAmexCard.bind(this),
      [CARD_NETWORKS.DISCOVER]: this._processDiscoverCard.bind(this),
      [CARD_NETWORKS.JCB]: this._processJCBCard.bind(this),
      [CARD_NETWORKS.UNIONPAY]: this._processUnionPayCard.bind(this)
    };
  }

  /**
   * Process a card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   */
  async processPayment(paymentDetails) {
    try {
      // Validate card details
      this._validateCardDetails(paymentDetails);
      
      // Extract card details
      const { cardDetails } = paymentDetails;
      
      // Determine card network
      const cardNetwork = this._determineCardNetwork(cardDetails.cardNumber);
      
      // Log payment initiation
      logTransaction('CARD_PAYMENT_INITIATED', {
        cardNetwork,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency
      });
      
      // Process based on card network
      let result;
      
      // Get network-specific handler
      const networkHandler = this.networkHandlers[cardNetwork];
      
      if (networkHandler) {
        result = await networkHandler(paymentDetails);
      } else {
        // Default processing for other card types
        result = await this._processGenericCard(paymentDetails, cardNetwork);
      }
      
      // Store transaction status
      if (result.transactionId) {
        this.transactionStatus.set(result.transactionId, {
          status: result.success ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.FAILED,
          timestamp: new Date(),
          details: result
        });
      }
      
      // Log result
      if (result.success) {
        logTransaction('CARD_PAYMENT_COMPLETED', {
          transactionId: result.transactionId,
          cardNetwork,
          cardLast4: this._getLast4Digits(cardDetails.cardNumber),
          amount: paymentDetails.amount,
          currency: paymentDetails.currency
        });
      } else {
        logError('CARD_PAYMENT_FAILED', new Error(result.message), {
          cardNetwork,
          cardLast4: this._getLast4Digits(cardDetails.cardNumber),
          errorCode: result.errorCode
        });
      }
      
      return result;
    } catch (error) {
      // Log error
      logError('CARD_PAYMENT_ERROR', error, {
        amount: paymentDetails.amount,
        currency: paymentDetails.currency
      });
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        retriable: this._isRetriableError(error)
      };
    }
  }

  /**
   * Tokenize a card for future use
   * 
   * @param {Object} cardDetails - Card details to tokenize
   * @returns {Promise<Object>} Tokenization result
   */
  async tokenizeCard(cardDetails) {
    try {
      // Validate card details
      this._validateCardDetailsForTokenization(cardDetails);
      
      // Determine card network
      const cardNetwork = this._determineCardNetwork(cardDetails.cardNumber);
      
      // Log tokenization attempt
      logTransaction('CARD_TOKENIZATION_INITIATED', {
        cardNetwork,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber)
      });
      
      // Simulate tokenization process
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate token
      const token = this._generateCardToken(cardDetails);
      
      // Log successful tokenization
      logTransaction('CARD_TOKENIZATION_COMPLETED', {
        cardNetwork,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        tokenLast4: token.substring(token.length - 4)
      });
      
      return {
        success: true,
        message: 'Card tokenized successfully',
        token,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        cardNetwork,
        expiryMonth: cardDetails.expiryMonth,
        expiryYear: cardDetails.expiryYear,
        cardholderName: cardDetails.cardholderName,
        createdAt: new Date()
      };
    } catch (error) {
      // Log error
      logError('CARD_TOKENIZATION_ERROR', error, {
        cardNetwork: this._determineCardNetwork(cardDetails.cardNumber),
        cardLast4: this._getLast4Digits(cardDetails.cardNumber)
      });
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR
      };
    }
  }

  /**
   * Process payment with a tokenized card
   * 
   * @param {Object} paymentDetails - Payment details with token
   * @returns {Promise<Object>} Processing result
   */
  async processTokenPayment(paymentDetails) {
    try {
      // Validate token details
      if (!paymentDetails.token) {
        throw new Error('Card token is required');
      }
      
      // Log token payment initiation
      logTransaction('TOKEN_PAYMENT_INITIATED', {
        tokenLast4: paymentDetails.token.substring(paymentDetails.token.length - 4),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency
      });
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate transaction ID
      const transactionId = `CARD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Simulate success (95% success rate for token payments)
      const success = Math.random() < 0.95;
      
      if (success) {
        return {
          success: true,
          message: 'Token payment processed successfully',
          transactionId,
          processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          tokenLast4: paymentDetails.token.substring(paymentDetails.token.length - 4),
          timestamp: new Date()
        };
      } else {
        // Simulate various error scenarios
        const errorCodes = [
          ERROR_CODES.CARD_DECLINED,
          ERROR_CODES.PAYMENT_METHOD_ERROR,
          ERROR_CODES.TIMEOUT_ERROR
        ];
        
        const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        const errorMessage = this._getErrorMessage(errorCode);
        
        return {
          success: false,
          message: errorMessage,
          errorCode,
          transactionId,
          retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
        };
      }
    } catch (error) {
      // Log error
      logError('TOKEN_PAYMENT_ERROR', error, paymentDetails);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        retriable: this._isRetriableError(error)
      };
    }
  }

  /**
   * Process a Visa card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processVisaCard(paymentDetails) {
    // In a real implementation, this would connect to a payment processor API
    
    const { cardDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate transaction ID
    const transactionId = `VISA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Visa payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.CARD_DECLINED,
        ERROR_CODES.INVALID_CARD,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process a Mastercard payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processMastercardCard(paymentDetails) {
    // In a real implementation, this would connect to a payment processor API
    
    const { cardDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Generate transaction ID
    const transactionId = `MC-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Mastercard payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.CARD_DECLINED,
        ERROR_CODES.INVALID_CARD,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process an Amex card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processAmexCard(paymentDetails) {
    // In a real implementation, this would connect to a payment processor API
    
    const { cardDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1300));
    
    // Generate transaction ID
    const transactionId = `AMEX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'American Express payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.CARD_DECLINED,
        ERROR_CODES.INVALID_CARD,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process a Discover card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processDiscoverCard(paymentDetails) {
    // Similar implementation to other card networks
    // Simulate API call and response
    await new Promise(resolve => setTimeout(resolve, 1250));
    
    // Generate transaction ID
    const transactionId = `DISC-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Discover card payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(paymentDetails.cardDetails.cardNumber),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        timestamp: new Date()
      };
    } else {
      return {
        success: false,
        message: 'Card declined',
        errorCode: ERROR_CODES.CARD_DECLINED,
        transactionId,
        cardLast4: this._getLast4Digits(paymentDetails.cardDetails.cardNumber),
        retriable: false
      };
    }
  }

  /**
   * Process a JCB card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processJCBCard(paymentDetails) {
    // Similar implementation to other card networks
    // Simulate API call and response
    await new Promise(resolve => setTimeout(resolve, 1350));
    
    // Generate transaction ID
    const transactionId = `JCB-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'JCB card payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(paymentDetails.cardDetails.cardNumber),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        timestamp: new Date()
      };
    } else {
      return {
        success: false,
        message: 'Card declined',
        errorCode: ERROR_CODES.CARD_DECLINED,
        transactionId,
        cardLast4: this._getLast4Digits(paymentDetails.cardDetails.cardNumber),
        retriable: false
      };
    }
  }

  /**
   * Process a UnionPay card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processUnionPayCard(paymentDetails) {
    // Similar implementation to other card networks
    // Simulate API call and response
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    // Generate transaction ID
    const transactionId = `UP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'UnionPay card payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(paymentDetails.cardDetails.cardNumber),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        timestamp: new Date()
      };
    } else {
      return {
        success: false,
        message: 'Card declined',
        errorCode: ERROR_CODES.CARD_DECLINED,
        transactionId,
        cardLast4: this._getLast4Digits(paymentDetails.cardDetails.cardNumber),
        retriable: false
      };
    }
  }

  /**
   * Process a generic card payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @param {string} cardNetwork - Card network
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processGenericCard(paymentDetails, cardNetwork) {
    // In a real implementation, this would connect to a payment processor API
    
    const { cardDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate transaction ID
    const transactionId = `CARD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (85% success rate for generic cards)
    const success = Math.random() < 0.85;
    
    if (success) {
      return {
        success: true,
        message: 'Card payment processed successfully',
        transactionId,
        processorReference: `AUTH-${Math.floor(Math.random() * 1000000)}`,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        cardNetwork,
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.CARD_DECLINED,
        ERROR_CODES.INVALID_CARD,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        cardLast4: this._getLast4Digits(cardDetails.cardNumber),
        cardNetwork,
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Validate card payment details
   * 
   * @param {Object} paymentDetails - Payment details to validate
   * @private
   */
  _validateCardDetails(paymentDetails) {
    if (!paymentDetails.cardDetails) {
      throw new Error('Card details are required');
    }
    
    const { cardDetails } = paymentDetails;
    
    if (!cardDetails.cardNumber) {
      throw new Error('Card number is required');
    }
    
    if (!this._isValidCardNumber(cardDetails.cardNumber)) {
      throw new Error('Invalid card number');
    }
    
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      throw new Error('Card expiry date is required');
    }
    
    if (!this._isValidExpiryDate(cardDetails.expiryMonth, cardDetails.expiryYear)) {
      throw new Error('Card has expired');
    }
    
    if (!cardDetails.cvv) {
      throw new Error('CVV is required');
    }
    
    if (!this._isValidCVV(cardDetails.cvv, this._determineCardNetwork(cardDetails.cardNumber))) {
      throw new Error('Invalid CVV');
    }
  }

  /**
   * Validate card details for tokenization
   * 
   * @param {Object} cardDetails - Card details to validate
   * @private
   */
  _validateCardDetailsForTokenization(cardDetails) {
    if (!cardDetails.cardNumber) {
      throw new Error('Card number is required');
    }
    
    if (!this._isValidCardNumber(cardDetails.cardNumber)) {
      throw new Error('Invalid card number');
    }
    
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      throw new Error('Card expiry date is required');
    }
    
    if (!this._isValidExpiryDate(cardDetails.expiryMonth, cardDetails.expiryYear)) {
      throw new Error('Card has expired');
    }
    
    if (!cardDetails.cardholderName) {
      throw new Error('Cardholder name is required');
    }
  }

  /**
   * Check if a card number is valid using Luhn algorithm
   * 
   * @param {string} cardNumber - Card number to validate
   * @returns {boolean} True if valid
   * @private
   */
  _isValidCardNumber(cardNumber) {
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
  }

  /**
   * Check if a card expiry date is valid
   * 
   * @param {string|number} month - Expiry month
   * @param {string|number} year - Expiry year
   * @returns {boolean} True if valid
   * @private
   */
  _isValidExpiryDate(month, year) {
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
  }

  /**
   * Check if a CVV is valid
   * 
   * @param {string|number} cvv - CVV to validate
   * @param {string} cardNetwork - Card network
   * @returns {boolean} True if valid
   * @private
   */
  _isValidCVV(cvv, cardNetwork) {
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
  }

  /**
   * Determine card network from card number
   * 
   * @param {string} cardNumber - Card number
   * @returns {string} Card network
   * @private
   */
  _determineCardNetwork(cardNumber) {
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
  }

  /**
   * Get the last 4 digits of a card number
   * 
   * @param {string} cardNumber - Card number
   * @returns {string} Last 4 digits
   * @private
   */
  _getLast4Digits(cardNumber) {
    // Remove spaces and dashes
    const normalizedNumber = cardNumber.replace(/[\s-]/g, '');
    
    return normalizedNumber.substring(normalizedNumber.length - 4);
  }

  /**
   * Generate a card token
   * 
   * @param {Object} cardDetails - Card details
   * @returns {string} Generated token
   * @private
   */
  _generateCardToken(cardDetails) {
    // In a real implementation, this would use a secure tokenization service
    
    // Generate a random token
    const randomPart = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now().toString(36);
    const last4 = this._getLast4Digits(cardDetails.cardNumber);
    
    return `card_${timestamp}_${randomPart}_${last4}`;
  }

  /**
   * Get error message for an error code
   * 
   * @param {string} errorCode - Error code
   * @returns {string} Error message
   * @private
   */
  _getErrorMessage(errorCode) {
    switch (errorCode) {
      case ERROR_CODES.CARD_DECLINED:
        return 'Card declined by issuer';
        
      case ERROR_CODES.INVALID_CARD:
        return 'Invalid card details';
        
      case ERROR_CODES.TIMEOUT_ERROR:
        return 'Payment processing timed out';
        
      default:
        return 'An error occurred while processing card payment';
    }
  }

  /**
   * Check if an error is retriable
   * 
   * @param {Error} error - Error object
   * @returns {boolean} True if retriable
   * @private
   */
  _isRetriableError(error) {
    // Network errors and timeouts are retriable
    if (error.code === ERROR_CODES.NETWORK_ERROR || 
        error.code === ERROR_CODES.TIMEOUT_ERROR) {
      return true;
    }
    
    return false;
  }
}

export default CardPaymentProcessor;