/**
 * Sunny Payment Gateway - Core Module
 * 
 * A comprehensive payment processing system with global coverage
 * Handles multiple payment methods, currencies, and provides instant settlement
 */

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { encryptData, decryptData } from '../security/encryption.js';
import { validatePaymentData } from '../api/validation.js';
import { detectFraud } from '../security/fraudDetection.js';
import { logTransaction, getTransactionById } from './transactionLogger.js';
import { 
  PAYMENT_STATUS, 
  PAYMENT_METHODS, 
  TRANSACTION_TYPES,
  ERROR_CODES,
  CURRENCY_CODES,
  COUNTRY_CODES
} from './constants.js';
import { getLocaleSettings } from '../localization/localeManager.js';
import { calculateFees } from './feeCalculator.js';
import { processInstantSettlement } from './instantSettlement.js';

class SunnyPaymentGateway {
  constructor(config = {}) {
    this.merchantId = config.merchantId || process.env.SUNNY_MERCHANT_ID;
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;
    this.apiSecret = config.apiSecret || process.env.SUNNY_API_SECRET;
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' 
      ? 'https://api.sunnypayments.com/v2'
      : 'https://sandbox.sunnypayments.com/v2';
    this.instantSettlement = config.instantSettlement || false;
    this.locale = config.locale || 'en-US';
    
    // Validate required configuration
    if (!this.merchantId || !this.apiKey || !this.apiSecret) {
      throw new Error('Missing required Sunny Payment Gateway configuration');
    }
  }

  /**
   * Process a payment transaction with support for all payment methods globally
   * 
   * @param {Object} paymentData - Payment information
   * @param {string} paymentData.amount - Amount to charge
   * @param {string} paymentData.currency - Currency code (e.g., USD, EUR)
   * @param {string} paymentData.paymentMethod - Payment method (card, bank_transfer, mobile_money, etc)
   * @param {Object} paymentData.customer - Customer information
   * @param {Object} paymentData.metadata - Additional transaction metadata
   * @param {boolean} paymentData.instantSettlement - Whether to process instant settlement
   * @returns {Promise<Object>} Transaction result
   */
  async processPayment(paymentData) {
    try {
      // Validate payment data
      const validationResult = validatePaymentData(paymentData);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: validationResult.errors.join(', '),
          transactionId: null
        };
      }

      // Generate transaction ID
      const transactionId = uuidv4();
      
      // Check for fraud
      const fraudCheck = await detectFraud({
        ...paymentData,
        transactionId,
        merchantId: this.merchantId
      });
      
      if (fraudCheck.isFraudulent) {
        await logTransaction({
          transactionId,
          merchantId: this.merchantId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          status: PAYMENT_STATUS.REJECTED,
          paymentMethod: paymentData.paymentMethod,
          errorCode: ERROR_CODES.FRAUD_DETECTED,
          metadata: {
            fraudReason: fraudCheck.reason,
            riskScore: fraudCheck.riskScore
          }
        });
        
        return {
          success: false,
          error: ERROR_CODES.FRAUD_DETECTED,
          message: 'Transaction flagged as potentially fraudulent',
          transactionId
        };
      }
      
      // Calculate fees with transparent breakdown
      const feeDetails = calculateFees({
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        country: paymentData.customer?.country || 'US',
        merchantTier: this.merchantTier || 'standard'
      });

      // Process payment based on payment method
      let paymentResult;
      switch (paymentData.paymentMethod) {
        case PAYMENT_METHODS.CARD:
          paymentResult = await this.processCardPayment(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.BANK_TRANSFER:
          paymentResult = await this.processBankTransfer(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.MOBILE_MONEY:
          paymentResult = await this.processMobileMoney(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.CRYPTO:
          paymentResult = await this.processCryptoPayment(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.UPI:
          paymentResult = await this.processUPIPayment(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.ALIPAY:
          paymentResult = await this.processAlipayPayment(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.WECHAT:
          paymentResult = await this.processWeChatPayment(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.APPLE_PAY:
          paymentResult = await this.processApplePayment(paymentData, transactionId);
          break;
        case PAYMENT_METHODS.GOOGLE_PAY:
          paymentResult = await this.processGooglePayment(paymentData, transactionId);
          break;
        default:
          paymentResult = {
            success: false,
            error: ERROR_CODES.UNSUPPORTED_PAYMENT_METHOD,
            message: 'Unsupported payment method'
          };
      }

      // Process instant settlement if requested
      if (paymentResult.success && (paymentData.instantSettlement || this.instantSettlement)) {
        const settlementResult = await processInstantSettlement({
          transactionId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          merchantId: this.merchantId,
          paymentMethod: paymentData.paymentMethod,
          destinationAccount: paymentData.destinationAccount || this.defaultSettlementAccount
        });
        
        paymentResult.settlement = settlementResult;
      }

      // Log transaction
      await logTransaction({
        transactionId,
        merchantId: this.merchantId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: paymentResult.success ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.FAILED,
        paymentMethod: paymentData.paymentMethod,
        errorCode: paymentResult.error || null,
        fees: feeDetails,
        metadata: {
          ...paymentData.metadata,
          processorResponse: paymentResult.processorResponse
        }
      });

      return {
        ...paymentResult,
        transactionId,
        fees: feeDetails
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      
      // Log the failed transaction
      try {
        await logTransaction({
          transactionId: paymentData.transactionId || uuidv4(),
          merchantId: this.merchantId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: paymentData.paymentMethod,
          errorCode: ERROR_CODES.SYSTEM_ERROR,
          metadata: {
            errorMessage: error.message
          }
        });
      } catch (logError) {
        console.error('Failed to log transaction error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.SYSTEM_ERROR,
        message: 'An unexpected error occurred while processing payment',
        transactionId: paymentData.transactionId || null
      };
    }
  }

  // Implementation of various payment methods...
  // Only showing a few for brevity

  /**
   * Process card payment with SUNNY's direct bank processing
   * @private
   */
  async processCardPayment(paymentData, transactionId) {
    try {
      // SUNNY DIRECT PROCESSING - We connect directly to banks!
      const DirectCardProcessor = require('./processors/DirectCardProcessor');
      const cardProcessor = new DirectCardProcessor({
        merchantId: this.merchantId,
        environment: this.environment
      });
      
      // Validate card using Luhn algorithm and other checks
      const cardValidation = await cardProcessor.validateCard(paymentData.card);
      if (!cardValidation.isValid) {
        return {
          success: false,
          error: 'INVALID_CARD',
          message: cardValidation.error
        };
      }

      // Detect card network (Visa, Mastercard, Amex, etc.)
      const cardNetwork = cardProcessor.detectCardNetwork(paymentData.card.number);
      
      // Process directly with acquiring bank
      const processingResult = await cardProcessor.processWithBank({
        card: paymentData.card,
        amount: paymentData.amount,
        currency: paymentData.currency,
        transactionId,
        merchantId: this.merchantId,
        cardNetwork,
        customer: paymentData.customer
      });

      if (processingResult.success) {
        return {
          success: true,
          processorResponse: {
            authorizationCode: processingResult.authCode,
            processorTransactionId: processingResult.bankTransactionId,
            processorName: 'SunnyDirect',
            acquiringBank: processingResult.acquiringBank,
            cardNetwork: cardNetwork.toUpperCase(),
            amount: paymentData.amount,
            currency: paymentData.currency.toUpperCase(),
            last4: paymentData.card.number.slice(-4),
            avs_result: processingResult.avsResult,
            cvv_result: processingResult.cvvResult
          }
        };
      } else {
        return {
          success: false,
          error: processingResult.errorCode || 'PAYMENT_DECLINED',
          message: processingResult.message || 'Payment was declined by the issuing bank'
        };
      }
    } catch (error) {
      console.error('Sunny payment processing error:', error);
      return {
        success: false,
        error: 'PAYMENT_PROCESSOR_ERROR',
        message: 'Unable to process payment at this time. Please try again.'
      };
    }
  }

  /**
   * Process mobile money payment
   * @private
   */
  async processMobileMoney(paymentData, transactionId) {
    // In a real implementation, this would initiate a mobile money payment
    // For this example, we'll simulate a successful payment
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      processorResponse: {
        mobileMoneyId: `MM_${crypto.randomBytes(8).toString('hex')}`,
        providerReference: crypto.randomBytes(10).toString('hex').toUpperCase(),
        processorName: 'SunnyMobileProcessor'
      }
    };
  }

  /**
   * Create a subscription for recurring billing
   * 
   * @param {Object} subscriptionData - Subscription information
   * @returns {Promise<Object>} Subscription result
   */
  async createSubscription(subscriptionData) {
    try {
      const { customerId, planId, paymentMethod, startDate, metadata } = subscriptionData;
      
      if (!customerId || !planId || !paymentMethod) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Customer ID, plan ID, and payment method are required'
        };
      }
      
      const subscriptionId = uuidv4();
      
      // In a real implementation, store the subscription in a database
      // For this example, we'll just return the subscription details
      
      return {
        success: true,
        subscriptionId,
        customerId,
        planId,
        status: 'active',
        startDate: startDate || new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error('Subscription creation error:', error);
      return {
        success: false,
        error: ERROR_CODES.SUBSCRIPTION_ERROR,
        message: 'Failed to create subscription'
      };
    }
  }

  /**
   * Process marketplace payments with split functionality
   * 
   * @param {Object} paymentData - Payment information
   * @param {Array} paymentData.splits - Array of split recipients and amounts
   * @returns {Promise<Object>} Transaction result
   */
  async processMarketplacePayment(paymentData) {
    try {
      if (!paymentData.splits || !Array.isArray(paymentData.splits) || paymentData.splits.length === 0) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Valid splits array is required for marketplace payments'
        };
      }
      
      // Process the main payment first
      const paymentResult = await this.processPayment({
        ...paymentData,
        metadata: {
          ...paymentData.metadata,
          isMarketplace: true
        }
      });
      
      if (!paymentResult.success) {
        return paymentResult;
      }
      
      // Process the splits
      const splitResults = await Promise.all(paymentData.splits.map(async (split) => {
        // In a real implementation, this would transfer funds to each recipient
        return {
          destination: split.destination,
          amount: split.amount,
          currency: split.currency,
          status: 'transferred'
        };
      }));
      
      return {
        ...paymentResult,
        splits: splitResults
      };
    } catch (error) {
      console.error('Marketplace payment error:', error);
      return {
        success: false,
        error: ERROR_CODES.MARKETPLACE_ERROR,
        message: 'Failed to process marketplace payment'
      };
    }
  }
}

export default SunnyPaymentGateway;