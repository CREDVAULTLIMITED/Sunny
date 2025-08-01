/**
 * MobileMoneyProcessor.js
 * Handles mobile money transactions (M-Pesa, Airtel Money, etc.)
 */

import { validatePhoneNumber } from '../../api/validation';
import { MOBILE_MONEY_PROVIDERS, PAYMENT_STATUS } from '../constants';

class MobileMoneyProcessor {
  constructor() {
    this.providers = MOBILE_MONEY_PROVIDERS;
    this.timeoutSeconds = 120; // 2 minutes timeout for USSD push
  }

  /**
   * Process a mobile money payment
   */
  async process(paymentRequest) {
    try {
      // 1. Validate phone number
      const validationResult = await this.validatePhoneNumber(paymentRequest.phoneNumber);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      // 2. Detect provider
      const provider = this.detectProvider(paymentRequest.phoneNumber);
      if (!provider) {
        throw new Error('Unsupported mobile money provider');
      }

      // 3. Initialize payment
      const initResult = await this.initializePayment(paymentRequest, provider);

      // 4. Send USSD push
      const pushResult = await this.sendUSSDPush(initResult.pushData);

      // 5. Wait for callback
      const finalResult = await this.waitForCallback(pushResult.transactionId);

      return this.formatResponse(finalResult);
    } catch (error) {
      throw this.handleProcessingError(error);
    }
  }

  /**
   * Validate phone number format and country code
   */
  async validatePhoneNumber(phoneNumber) {
    return validatePhoneNumber(phoneNumber, {
      countries: ['KE', 'TZ', 'UG', 'RW'], // Supported countries
      providers: Object.keys(this.providers)
    });
  }

  /**
   * Detect mobile money provider from phone number
   */
  detectProvider(phoneNumber) {
    // Remove any spaces or special characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    // Check against provider prefixes
    for (const [provider, config] of Object.entries(this.providers)) {
      if (config.prefixes.some(prefix => cleanNumber.startsWith(prefix))) {
        return provider;
      }
    }

    return null;
  }

  /**
   * Initialize payment with mobile money provider
   */
  async initializePayment(request, provider) {
    const providerAPI = this.getProviderAPI(provider);

    const initRequest = {
      phoneNumber: request.phoneNumber,
      amount: request.amount,
      currency: request.currency,
      merchantName: request.merchantName,
      merchantId: request.merchantId,
      callbackUrl: this.generateCallbackUrl(request)
    };

    return providerAPI.initializePayment(initRequest);
  }

  /**
   * Send USSD push notification to user's phone
   */
  async sendUSSDPush(pushData) {
    const provider = this.providers[pushData.provider];
    
    return provider.sendPush({
      phoneNumber: pushData.phoneNumber,
      amount: pushData.amount,
      merchantName: pushData.merchantName,
      pushType: 'STK_PUSH'
    });
  }

  /**
   * Wait for callback from mobile money provider
   */
  async waitForCallback(transactionId) {
    let attempts = 0;
    const maxAttempts = 24; // 2 minutes with 5-second intervals
    
    while (attempts < maxAttempts) {
      const status = await this.checkTransactionStatus(transactionId);
      
      if (status.isComplete) {
        return status;
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }

    throw new Error('Transaction timeout');
  }

  /**
   * Check transaction status
   */
  async checkTransactionStatus(transactionId) {
    const transaction = await TransactionManager.get(transactionId);
    
    return {
      isComplete: transaction.status !== 'pending',
      success: transaction.status === 'success',
      transactionId: transaction.id,
      status: transaction.status,
      providerReference: transaction.providerReference
    };
  }

  /**
   * Format the response for API
   */
  formatResponse(result) {
    return {
      success: result.success,
      transactionId: result.transactionId,
      status: result.status,
      providerReference: result.providerReference,
      phoneNumber: result.phoneNumber,
      provider: result.provider
    };
  }
}

export default MobileMoneyProcessor;
