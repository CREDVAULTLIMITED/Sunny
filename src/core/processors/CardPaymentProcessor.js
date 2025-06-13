/**
 * CardPaymentProcessor.js
 * Handles credit/debit card payment processing
 */

import { encryptCardData } from '../security/encryption';
import { validateCard } from '../api/validation';
import { CARD_NETWORKS, PAYMENT_STATUS } from './constants';

class CardPaymentProcessor {
  constructor() {
    this.supportedNetworks = CARD_NETWORKS;
    this.threeDSecureEnabled = true;
  }

  /**
   * Process a card payment
   */
  async process(paymentRequest) {
    try {
      // 1. Validate card details
      const validationResult = await this.validateCardDetails(paymentRequest.card);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      // 2. Encrypt sensitive data
      const encryptedCard = await this.encryptCardData(paymentRequest.card);

      // 3. Perform 3D Secure if enabled
      if (this.threeDSecureEnabled && this.requires3DS(paymentRequest)) {
        const threeDSResult = await this.handle3DSecure(paymentRequest);
        if (!threeDSResult.success) {
          throw new Error('3D Secure authentication failed');
        }
      }

      // 4. Process payment with payment processor
      const processorResult = await this.processWithAcquirer(encryptedCard, paymentRequest);

      // 5. Handle result
      return this.handleProcessorResponse(processorResult);
    } catch (error) {
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

    return validateCard(card, validationRules);
  }

  /**
   * Encrypt card data for transmission
   */
  async encryptCardData(card) {
    const sensitiveFields = ['number', 'cvv'];
    return encryptCardData(card, sensitiveFields);
  }

  /**
   * Check if 3D Secure is required
   */
  requires3DS(request) {
    const amount = request.amount;
    const currency = request.currency;
    const cardNetwork = this.detectCardNetwork(request.card.number);

    // Apply 3DS rules based on amount, currency, and card network
    return this.get3DSRules(amount, currency, cardNetwork);
  }

  /**
   * Handle 3D Secure authentication
   */
  async handle3DSecure(request) {
    // Initialize 3DS provider
    const threeDSProvider = this.get3DSProvider();

    // Start authentication
    const authResult = await threeDSProvider.authenticate({
      card: request.card,
      amount: request.amount,
      currency: request.currency,
      returnUrl: request.threeDSecureReturnUrl
    });

    return authResult;
  }

  /**
   * Process payment with acquiring bank
   */
  async processWithAcquirer(encryptedCard, request) {
    // Select acquiring bank based on card network and merchant preferences
    const acquirer = this.selectAcquirer(request);

    // Send payment request to acquirer
    return acquirer.processPayment({
      card: encryptedCard,
      amount: request.amount,
      currency: request.currency,
      merchantId: request.merchantId,
      metadata: request.metadata
    });
  }

  /**
   * Handle processor response
   */
  handleProcessorResponse(response) {
    if (response.success) {
      return {
        success: true,
        transactionId: response.transactionId,
        status: PAYMENT_STATUS.SUCCESS,
        authorizationCode: response.authCode,
        last4: response.last4,
        cardNetwork: response.cardNetwork
      };
    } else {
      throw new Error(response.error || 'Payment processing failed');
    }
  }

  /**
   * Detect card network from card number
   */
  detectCardNetwork(cardNumber) {
    // Implement card network detection logic
    if (cardNumber.startsWith('4')) return 'visa';
    if (cardNumber.startsWith('5')) return 'mastercard';
    if (cardNumber.startsWith('3')) return 'amex';
    return 'unknown';
  }
}

export default CardPaymentProcessor;
