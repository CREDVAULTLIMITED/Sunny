/**
 * DirectCardProcessor.js
 * Handles direct credit/debit card processing with acquiring banks
 */

import BankConnector from '../connectors/BankConnector';
import ThreeDSecureProvider from '../security/ThreeDSecureProvider';
import config from '../../config/config';
import { PAYMENT_STATUS, CARD_NETWORKS } from '../constants';

class DirectCardProcessor {
  constructor() {
    this.bankConnector = new BankConnector(config.bank);
    this.threeDSecure = new ThreeDSecureProvider(config.security);
  }

  /**
   * Process a card payment directly with the acquiring bank
   */
  async process(paymentRequest) {
    try {
      // 1. Validate card details
      const validationResult = await this.validateCardDetails(paymentRequest.card);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      // 2. Encrypt sensitive data with bank-specific encryption
      const encryptedCard = await this.encryptCardData(paymentRequest.card);

      // 3. Determine card network and select appropriate bank connector
      const cardNetwork = this.detectCardNetwork(paymentRequest.card.number);
      const bankConnector = this.bankConnectors[cardNetwork];
      if (!bankConnector) {
        throw new Error(`Unsupported card network: ${cardNetwork}`);
      }

      // 4. Perform 3D Secure if required
      if (this.threeDSecureEnabled && this.requires3DS(paymentRequest)) {
        const threeDSResult = await this.handle3DSecure(paymentRequest);
        if (!threeDSResult.success) {
          throw new Error('3D Secure authentication failed');
        }
        paymentRequest.threeDSAuthToken = threeDSResult.authToken;
      }

      // 5. Process payment with bank
      const bankResponse = await bankConnector.processPayment({
        encryptedCard,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        merchantId: paymentRequest.merchantId,
        threeDSToken: paymentRequest.threeDSAuthToken,
        metadata: paymentRequest.metadata
      });

      // 6. Handle bank response
      return this.handleBankResponse(bankResponse);
    } catch (error) {
      console.error('Direct card payment processing error:', error);
      throw this.handleProcessingError(error);
    }
  }

  /**
   * Validate card details
   */
  async validateCardDetails(card) {
    const validationRules = {
      number: {
        pattern: /^[0-9]{13,19}$/,
        luhnCheck: true
      },
      expiryMonth: {
        pattern: /^(0[1-9]|1[0-2])$/
      },
      expiryYear: {
        pattern: /^20[2-9][0-9]$/
      },
      cvv: {
        pattern: /^[0-9]{3,4}$/
      }
    };

    return this.validateCard(card, validationRules);
  }

  /**
   * Local card validation implementation
   */
  validateCard(card, rules) {
    if (!card || !rules) {
      return { isValid: false, error: 'Invalid input' };
    }

    // Check required fields
    for (const field of ['number', 'expiryMonth', 'expiryYear', 'cvv']) {
      if (!card[field]) {
        return { isValid: false, error: `Missing ${field}` };
      }

      const rule = rules[field];
      if (rule.pattern && !rule.pattern.test(card[field])) {
        return { isValid: false, error: `Invalid ${field} format` };
      }
    }

    // Luhn check for card number
    if (rules.number.luhnCheck && !this.luhnCheck(card.number)) {
      return { isValid: false, error: 'Invalid card number' };
    }

    return { isValid: true };
  }

  /**
   * Luhn algorithm check for card number validation
   */
  luhnCheck(cardNumber) {
    const digits = cardNumber.toString().split('').map(Number);
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  /**
   * Local card data encryption implementation
   */
  encryptCardData(card) {
    // Basic encryption - in production, use a proper encryption library
    return {
      ...card,
      number: `encrypted:${card.number}`,
      cvv: `encrypted:${card.cvv}`
    };
  }

  /**
   * Check if 3D Secure is required
   */
  requires3DS(request) {
    // Implement risk-based authentication
    const amount = parseFloat(request.amount);
    const currency = request.currency.toUpperCase();
    const cardNetwork = this.detectCardNetwork(request.card.number);

    // Always require 3DS for high value transactions
    if (amount >= 500) return true;

    // Network specific rules
    const networkRules = {
      visa: { requireAbove: 100 },
      mastercard: { requireAbove: 150 },
      amex: { requireAbove: 200 }
    };

    const rule = networkRules[cardNetwork];
    return rule ? amount > rule.requireAbove : false;
  }

  /**
   * Handle 3D Secure authentication
   */
  async handle3DSecure(request) {
    return this.threeDSecure.authenticate({
      card: request.card,
      amount: request.amount,
      currency: request.currency,
      returnUrl: request.threeDSecureReturnUrl,
      merchantId: request.merchantId
    });
  }

  /**
   * Handle bank response
   */
  handleBankResponse(response) {
    if (response.success) {
      return {
        success: true,
        transactionId: response.transactionId,
        status: PAYMENT_STATUS.SUCCESS,
        authorizationCode: response.authCode,
        last4: response.last4,
        cardNetwork: response.cardNetwork,
        processorResponse: response
      };
    } else {
      throw new Error(response.error || 'Payment processing failed');
    }
  }

  /**
   * Handle processing errors
   */
  handleProcessingError(error) {
    return {
      success: false,
      error: error.message || 'Card payment processing failed',
      errorCode: error.code || 'CARD_PROCESSING_ERROR'
    };
  }

  /**
   * Detect card network from card number
   */
  detectCardNetwork(cardNumber) {
    // Implement BIN range checks
    const firstDigit = cardNumber.charAt(0);
    const firstTwo = cardNumber.substring(0, 2);

    if (firstDigit === '4') return CARD_NETWORKS.VISA;
    if (['51', '52', '53', '54', '55'].includes(firstTwo)) return CARD_NETWORKS.MASTERCARD;
    if (['34', '37'].includes(firstTwo)) return CARD_NETWORKS.AMEX;
    
    return 'unknown';
  }
}

export default DirectCardProcessor;
