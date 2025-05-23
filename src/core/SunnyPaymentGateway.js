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
import { logTransaction, getTransactionById, logError } from './transactionLogger.js';
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
import { sanitizeInput } from '../security/dataSanitizer.js';
import { HSMService } from '../security/hsm/HSMService.js';
import { StripeService } from '../integrations/stripe/StripeService.js';

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
    
    // Initialize services
    this.stripeService = new StripeService({
      apiKey: config.stripeApiKey || process.env.STRIPE_API_KEY,
      environment: this.environment
    });
    
    // Initialize HSM service for secure key management
    this.hsmService = new HSMService({
      moduleId: config.hsmModuleId || process.env.HSM_MODULE_ID,
      region: config.hsmRegion || process.env.HSM_REGION || 'us-west-2',
      endpoint: config.hsmEndpoint || process.env.HSM_ENDPOINT
    });
    
    // Initialize 3D Secure configuration
    this.threeDSecureEnabled = config.threeDSecureEnabled || 
      (process.env.THREE_D_SECURE_ENABLED === 'true');
    this.threeDSecureVersion = config.threeDSecureVersion || 
      process.env.THREE_D_SECURE_VERSION || '2.0';
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
      // Sanitize input data to prevent injection attacks
      const sanitizedData = sanitizeInput(paymentData);
      
      // Validate payment data
      const validationResult = validatePaymentData(sanitizedData);
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
      // Enhanced error logging with structured data
      await logError({
        source: 'SunnyPaymentGateway.processPayment',
        error: error,
        severity: 'HIGH',
        data: {
          merchantId: this.merchantId,
          amount: paymentData?.amount,
          currency: paymentData?.currency,
          paymentMethod: paymentData?.paymentMethod,
          errorStack: error.stack
        }
      });
      
      // Log the failed transaction
      try {
        await logTransaction({
          transactionId: paymentData.transactionId || uuidv4(),
          merchantId: this.merchantId,
          amount: paymentData?.amount,
          currency: paymentData?.currency,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: paymentData?.paymentMethod,
          errorCode: error.code || ERROR_CODES.SYSTEM_ERROR,
          metadata: {
            errorMessage: error.message,
            errorType: error.name,
            processorError: error.processorError || null
          }
        });
      } catch (logError) {
        await logError({
          source: 'SunnyPaymentGateway.logTransaction',
          error: logError,
          severity: 'HIGH',
          data: { originalError: error.message }
        });
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
   * Process card payment
   * @private
   */
  async processCardPayment(paymentData, transactionId) {
    try {
      if (!paymentData.card && !paymentData.paymentMethodId && !paymentData.paymentToken) {
        throw new Error('Card details, payment method ID, or payment token is required');
      }

      // PCI Compliance: Use HSM for secure key operations if card data is provided
      if (paymentData.card) {
        // Validate card data before processing
        this._validateCardData(paymentData.card);
        
        // Generate a secure cryptographic key using HSM
        const encryptionKey = await this.hsmService.generateDataKey();
        
        // Encrypt sensitive card data with HSM-generated key
        const encryptedCardData = await this.hsmService.encryptData({
          plaintext: JSON.stringify({
            cardNumber: paymentData.card.number,
            cvv: paymentData.card.cvv
          }),
          keyId: encryptionKey.keyId
        });
        
        // Store encryption metadata for auditing (but not the actual card data)
        await logTransaction({
          transactionId,
          merchantId: this.merchantId,
          status: PAYMENT_STATUS.INITIATED,
          paymentMethod: PAYMENT_METHODS.CARD,
          metadata: {
            encryptionKeyId: encryptionKey.keyId,
            encryptionTimestamp: new Date().toISOString(),
            last4: paymentData.card.number.slice(-4),
            cardBrand: this._detectCardBrand(paymentData.card.number)
          }
        });
      }

      // Initialize payment intent parameters
      const paymentIntentParams = {
        amount: Math.round(parseFloat(paymentData.amount) * 100), // Convert to cents
        currency: paymentData.currency.toLowerCase(),
        capture_method: paymentData.captureMethod || 'automatic',
        description: paymentData.description || `Payment for merchant ${this.merchantId}`,
        metadata: {
          transactionId,
          merchantId: this.merchantId,
          ...paymentData.metadata
        },
        receipt_email: paymentData.customer?.email
      };
      
      // Handle 3D Secure if enabled
      if (this.threeDSecureEnabled) {
        paymentIntentParams.payment_method_options = {
          card: {
            request_three_d_secure: 'automatic'
          }
        };
      }
      
      // Create a payment method ID if not provided
      let paymentMethodId = paymentData.paymentMethodId;
      
      if (!paymentMethodId && !paymentData.paymentToken && paymentData.card) {
        // Create a payment method with Stripe
        const paymentMethodResult = await this.stripeService.createPaymentMethod({
          type: 'card',
          card: {
            number: paymentData.card.number,
            exp_month: parseInt(paymentData.card.expMonth),
            exp_year: parseInt(paymentData.card.expYear),
            cvc: paymentData.card.cvv
          },
          billing_details: {
            name: paymentData.card.cardholderName,
            email: paymentData.customer?.email,
            address: paymentData.customer?.address
          }
        });
        
        if (!paymentMethodResult.success) {
          throw new Error(`Failed to create payment method: ${paymentMethodResult.error}`);
        }
        
        paymentMethodId = paymentMethodResult.paymentMethodId;
      }
      
      // Handle payment tokens (e.g., from Apple Pay, Google Pay)
      if (paymentData.paymentToken && !paymentMethodId) {
        const tokenResult = await this.stripeService.createPaymentMethodFromToken({
          token: paymentData.paymentToken,
          type: paymentData.paymentTokenType || 'card'
        });
        
        if (!tokenResult.success) {
          throw new Error(`Failed to process payment token: ${tokenResult.error}`);
        }
        
        paymentMethodId = tokenResult.paymentMethodId;
      }
      
      // Create a payment intent with Stripe
      const paymentIntentResult = await this.stripeService.createPaymentIntent({
        ...paymentIntentParams,
        payment_method: paymentMethodId,
        confirm: true,
        return_url: paymentData.returnUrl || `${this.baseUrl}/payment-return?merchant=${this.merchantId}`
      });
      
      // Handle 3D Secure authentication if required
      if (paymentIntentResult.status === 'requires_action' && 
          paymentIntentResult.next_action?.type === 'use_stripe_sdk') {
        
        // Log the 3DS challenge
        await logTransaction({
          transactionId,
          merchantId: this.merchantId,
          status: PAYMENT_STATUS.PENDING_3DS,
          paymentMethod: PAYMENT_METHODS.CARD,
          metadata: {
            paymentIntentId: paymentIntentResult.id,
            requires3DS: true,
            timestamp: new Date().toISOString()
          }
        });
        
        return {
          success: false,
          requires3DS: true,
          clientSecret: paymentIntentResult.client_secret,
          returnUrl: paymentData.returnUrl,
          message: 'Additional authentication required',
          nextAction: paymentIntentResult.next_action
        };
      }
      
      // Determine the final outcome of the payment
      const isSuccessful = ['succeeded', 'requires_capture'].includes(paymentIntentResult.status);
      
      if (isSuccessful) {
        return {
          success: true,
          processorResponse: {
            paymentIntentId: paymentIntentResult.id,
            paymentMethodId: paymentMethodId,
            status: paymentIntentResult.status,
            chargeId: paymentIntentResult.latest_charge,
            last4: paymentIntentResult.payment_method_details?.card?.last4 || 
                   paymentData.card?.number.slice(-4),
            brand: paymentIntentResult.payment_method_details?.card?.brand || 
                   this._detectCardBrand(paymentData.card?.number),
            processorName: 'stripe'
          }
        };
      } else {
        const errorCode = this._mapStripeErrorToSunnyError(
          paymentIntentResult.last_payment_error?.code || 'payment_failed'
        );
        
        return {
          success: false,
          error: errorCode,
          message: paymentIntentResult.last_payment_error?.message || 'Payment processing failed',
          processorResponse: {
            paymentIntentId: paymentIntentResult.id,
            status: paymentIntentResult.status,
            processorName: 'stripe',
            errorCode: paymentIntentResult.last_payment_error?.code,
            declineCode: paymentIntentResult.last_payment_error?.decline_code
          }
        };
      }
    } catch (error) {
      // Enhanced error logging for card processing
      await logError({
        source: 'SunnyPaymentGateway.processCardPayment',
        error: error,
        severity: 'HIGH',
        data: {
          merchantId: this.merchantId,
          transactionId,
          amount: paymentData?.amount,
          currency: paymentData?.currency,
          last4: paymentData.card?.number?.slice(-4),
          errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR
        }
      });
      
      // Map Stripe errors to Sunny error codes
      const errorCode = error.stripeCode ? 
        this._mapStripeErrorToSunnyError(error.stripeCode) : 
        ERROR_CODES.PAYMENT_METHOD_ERROR;
      
      return {
        success: false,
        error: errorCode,
        message: error.message || 'Card payment processing failed',
        processorResponse: {
          processorName: 'stripe',
          errorCode: error.stripeCode,
          errorType: error.type
        }
      };
    }
  }

  /**
   * Validate card data
   * @private
   */
  _validateCardData(card) {
    if (!card.number || !card.expMonth || !card.expYear || !card.cvv) {
      throw new Error('Card number, expiration date, and CVV are required');
    }
    
    // Basic validation
    if (!/^\d{13,19}$/.test(card.number.replace(/\s/g, ''))) {
      throw new Error('Invalid card number format');
    }
    
    if (!/^\d{1,2}$/.test(card.expMonth) || parseInt(card.expMonth) < 1 || parseInt(card.expMonth) > 12) {
      throw new Error('Invalid expiration month');
    }
    
    if (!/^\d{2,4}$/.test(card.expYear)) {
      throw new Error('Invalid expiration year');
    }
    
    // Validate expiration date is in the future
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    const expYear = parseInt(card.expYear);
    const expMonth = parseInt(card.expMonth);
    const fullExpYear = expYear < 100 ? 2000 + expYear : expYear;
    
    if (fullExpYear < currentYear || (fullExpYear === currentYear && expMonth < currentMonth)) {
      throw new Error('Card has expired');
    }
    
    // Validate CVV
    if (!/^\d{3,4}$/.test(card.cvv)) {
      throw new Error('Invalid CVV format');
    }
    
    // Luhn algorithm for card number validation
    const cardNumber = card.number.replace(/\s/g, '');
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    if (sum % 10 !== 0) {
      throw new Error('Invalid card number (failed Luhn check)');
    }
  }

  /**
   * Detect card brand from number
   * @private
   */
  _detectCardBrand(cardNumber) {
    if (!cardNumber) return 'unknown';
    
    cardNumber = cardNumber.replace(/\s+/g, '');
    
    // Visa
    if (/^4/.test(cardNumber)) return 'visa';
    
    // Mastercard
    if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return 'mastercard';
    
    // American Express
    if (/^3[47]/.test(cardNumber)) return 'amex';
    
    // Discover
    if (/^6(?:011|5[0-9]{2})/.test(cardNumber)) return 'discover';
    
    // JCB
    if (/^35(?:2[89]|[3-8][0-9])/.test(cardNumber)) return 'jcb';
    
    // Diners Club
    if (/^3(?:0[0-5]|[68][0-9])/.test(cardNumber)) return 'diners';
    
    // UnionPay
    if (/^62/.test(cardNumber)) return 'unionpay';
    
    return 'unknown';
  }

  /**
   * Map Stripe error codes to Sunny error codes
   * @private
   */
  _mapStripeErrorToSunnyError(stripeErrorCode) {
    const errorMap = {
      'card_declined': ERROR_CODES.CARD_DECLINED,
      'incorrect_cvc': ERROR_CODES.INVALID_CVV,
      'expired_card': ERROR_CODES.EXPIRED_CARD,
      'processing_error': ERROR_CODES.PROCESSING_ERROR,
      'insufficient_funds': ERROR_CODES.INSUFFICIENT_FUNDS,
      'invalid_amount': ERROR_CODES.INVALID_AMOUNT,
      'invalid_currency': ERROR_CODES.INVALID_CURRENCY,
      'rate_limit': ERROR_CODES.RATE_LIMIT,
      'authentication_required': ERROR_CODES.AUTHENTICATION_REQUIRED
    };
    
    return errorMap[stripeErrorCode] || ERROR_CODES.PAYMENT_METHOD_ERROR;
  }

  /**
   * Process mobile money payment
   * @private
   */
  async processMobileMoney(paymentData, transactionId) {
    try {
      // Validate mobile money details
      if (!paymentData.mobileMoney) {
        throw new Error('Mobile money details are required');
      }
      
      const { mobileMoney } = paymentData;
      
      if (!mobileMoney.provider) {
        throw new Error('Mobile money provider is required');
      }
      
      if (!mobileMoney.phoneNumber) {
        throw new Error('Phone number is required');
      }
      
      // Validate phone number format (basic validation)
      if (!/^\+?[0-9]{10,15}$/.test(mobileMoney.phoneNumber)) {
        throw new Error('Invalid phone number format');
      }
      
      // Normalize phone number to E.164 format
      let phoneNumber = mobileMoney.phoneNumber;
      if (!phoneNumber.startsWith('+')) {
        // Add country code if missing (based on provider)
        const countryCodes = {
          'MPESA': '+254', // Kenya
          'AIRTEL': '+256', // Uganda
          'MTN': '+233',   // Ghana
          'ORANGE': '+225', // Côte d'Ivoire
          'VODACOM': '+255', // Tanzania
          'TIGO': '+255',    // Tanzania
          'ECOCASH': '+263'  // Zimbabwe
        };
        
        const countryCode = countryCodes[mobileMoney.provider];
        if (!countryCode) {
          throw new Error(`Unknown provider or missing country code for ${mobileMoney.provider}`);
        }
        
        // Remove leading zeros
        phoneNumber = phoneNumber.replace(/^0+/, '');
        
        // Add country code
        phoneNumber = countryCode + phoneNumber;
      }
      
      // Log transaction initiation
      await logTransaction({
        transactionId,
        merchantId: this.merchantId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: PAYMENT_METHODS.MOBILE_MONEY,
        metadata: {
          provider: mobileMoney.provider,
          phoneNumber: this._maskPhoneNumber(phoneNumber),
          initiationTimestamp: new Date().toISOString()
        }
      });
      
      // Generate a request ID for the provider
      const providerRequestId = `${mobileMoney.provider}-${transactionId}-${Date.now()}`;
      
      // Sign the request for security
      const requestSignature = await this._signMobileMoneyRequest({
        provider: mobileMoney.provider,
        phoneNumber,
        amount: paymentData.amount,
        currency: paymentData.currency,
        transactionId,
        merchantId: this.merchantId,
        requestId: providerRequestId,
        timestamp: new Date().toISOString()
      });
      
      // Initialize the request object
      const requestObj = {
        phoneNumber,
        amount: paymentData.amount,
        currency: paymentData.currency,
        transactionId,
        merchantId: this.merchantId,
        requestId: providerRequestId,
        callbackUrl: paymentData.callbackUrl || `${this.baseUrl}/mobile-money-callback`,
        description: paymentData.description || `Payment to ${this.merchantId}`,
        metadata: paymentData.metadata,
        signature: requestSignature
      };
      
      // Process based on provider
      let processorResult;
      
      switch (mobileMoney.provider) {
        case 'MPESA':
          processorResult = await this._processMpesaPayment(requestObj);
          break;
          
        case 'AIRTEL':
          processorResult = await this._processAirtelPayment(requestObj);
          break;
          
        case 'MTN':
          processorResult = await this._processMTNPayment(requestObj);
          break;
          
        case 'ORANGE':
          processorResult = await this._processOrangePayment(requestObj);
          break;
          
        case 'VODACOM':
          processorResult = await this._processVodacomPayment(requestObj);
          break;
          
        case 'TIGO':
          processorResult = await this._processTigoPayment(requestObj);
          break;
          
        case 'ECOCASH':
          processorResult = await this._processEcoCashPayment(requestObj);
          break;
          
        default:
          throw new Error(`Unsupported mobile money provider: ${mobileMoney.provider}`);
      }
      
      // Update transaction status
      const finalStatus = processorResult.status === 'COMPLETED' ? 
        PAYMENT_STATUS.COMPLETED : 
        (processorResult.status === 'PENDING' ? PAYMENT_STATUS.PENDING : PAYMENT_STATUS.FAILED);
      
      await logTransaction({
        transactionId,
        merchantId: this.merchantId,
        status: finalStatus,
        paymentMethod: PAYMENT_METHODS.MOBILE_MONEY,
        metadata: {
          provider: mobileMoney.provider,
          phoneNumber: this._maskPhoneNumber(phoneNumber),
          providerTransactionId: processorResult.providerTransactionId,
          providerResponseCode: processorResult.providerResponseCode,
          responseTimestamp: new Date().toISOString()
        }
      });
      
      if (processorResult.success) {
        return {
          success: true,
          status: processorResult.status,
          message: processorResult.message,
          processorResponse: {
            providerTransactionId: processorResult.providerTransactionId,
            processorName: mobileMoney.provider,
            status: processorResult.status,
            statusCheckUrl: processorResult.statusCheckUrl
          }
        };
      } else {
        return {
          success: false,
          error: processorResult.errorCode || ERROR_CODES.PAYMENT_METHOD_ERROR,
          message: processorResult.message || `${mobileMoney.provider} payment failed`,
          processorResponse: {
            processorName: mobileMoney.provider,
            errorCode: processorResult.providerResponseCode,
            errorType: processorResult.errorType
          }
        };
      }
    } catch (error) {
      // Enhanced error logging for mobile money processing
      await logError({
        source: 'SunnyPaymentGateway.processMobileMoney',
        error: error,
        severity: 'HIGH',
        data: {
          merchantId: this.merchantId,
          transactionId,
          amount: paymentData?.amount,
          currency: paymentData?.currency,
          provider: paymentData.mobileMoney?.provider,
          errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR
        }
      });
      
      return {
        success: false,
        error: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        message: error.message || 'Mobile money payment processing failed',
        processorResponse: {
          processorName: paymentData.mobileMoney?.provider || 'unknown',
          errorCode: error.providerCode,
          errorType: error.type
        }
      };
    }
  }

  /**
   * Process M-Pesa payment
   * @private
   */
  async _processMpesaPayment(requestObj) {
    try {
      // In production, this would call the actual M-Pesa API
      // For now, implement a secure connection to M-Pesa API
      
      // Import the M-Pesa processor dynamically
      const { default: MpesaService } = await import('../integrations/mobileMoney/MpesaService.js');
      
      // Initialize the service with production credentials
      const mpesaService = new MpesaService({
        consumerKey: process.env.MPESA_CONSUMER_KEY,
        consumerSecret: process.env.MPESA_CONSUMER_SECRET,
        passKey: process.env.MPESA_PASS_KEY,
        shortCode: process.env.MPESA_SHORT_CODE,
        environment: this.environment
      });
      
      // Determine STK push or C2B based on amount and configuration
      const useSTK = requestObj.amount <= 150000; // Limit for STK push (approx $1500)
      
      let mpesaResult;
      
      if (useSTK) {
        // Use STK push for smaller amounts
        mpesaResult = await mpesaService.initiateSTKPush({
          phoneNumber: requestObj.phoneNumber,
          amount: requestObj.amount,
          accountReference: requestObj.transactionId,
          transactionDesc: requestObj.description,
          callbackUrl: requestObj.callbackUrl
        });
      } else {
        // Use C2B for larger amounts
        mpesaResult = await mpesaService.initiateC2BPayment({
          phoneNumber: requestObj.phoneNumber,
          amount: requestObj.amount,
          accountReference: requestObj.transactionId,
          transactionDesc: requestObj.description,
          callbackUrl: requestObj.callbackUrl
        });
      }
      
      if (mpesaResult.success) {
        const checkoutId = mpesaResult.checkoutRequestID || mpesaResult.transactionId;
        
        return {
          success: true,
          status: 'PENDING', // Mobile money typically requires user confirmation
          message: useSTK ? 'STK push initiated successfully' : 'Payment request initiated successfully',
          providerTransactionId: checkoutId,
          providerResponseCode: mpesaResult.responseCode,
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          message: mpesaResult.errorMessage || 'Failed to process M-Pesa payment',
          errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
          providerResponseCode: mpesaResult.responseCode,
          errorType: mpesaResult.errorType || 'provider_error'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing M-Pesa payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Process Airtel Money payment
   * @private
   */
  async _processAirtelPayment(requestObj) {
    try {
      // In production, this would call the actual Airtel Money API
      // For now, implement a secure connection to Airtel API
      
      // Import the Airtel processor dynamically
      const { default: AirtelService } = await import('../integrations/mobileMoney/AirtelService.js');
      
      // Initialize the service with production credentials
      const airtelService = new AirtelService({
        clientId: process.env.AIRTEL_CLIENT_ID,
        clientSecret: process.env.AIRTEL_CLIENT_SECRET,
        environment: this.environment,
        country: this._getCountryFromPhoneNumber(requestObj.phoneNumber)
      });
      
      // Process payment
      const airtelResult = await airtelService.requestPayment({
        msisdn: requestObj.phoneNumber,
        amount: requestObj.amount,
        currency: requestObj.currency,
        reference: requestObj.transactionId,
        callbackUrl: requestObj.callbackUrl,
        description: requestObj.description
      });
      
      if (airtelResult.success) {
        return {
          success: true,
          status: 'PENDING',
          message: 'Airtel Money payment request initiated successfully',
          providerTransactionId: airtelResult.transactionId,
          providerResponseCode: airtelResult.responseCode,
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          message: airtelResult.errorMessage || 'Failed to process Airtel Money payment',
          errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
          providerResponseCode: airtelResult.responseCode,
          errorType: airtelResult.errorType || 'provider_error'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing Airtel Money payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Process MTN Mobile Money payment
   * @private
   */
  async _processMTNPayment(requestObj) {
    try {
      // Import the MTN Mobile Money service dynamically
      const { default: MTNService } = await import('../integrations/mobileMoney/MTNService.js');
      
      // Initialize the service with production credentials
      const mtnService = new MTNService({
        subscriptionKey: process.env.MTN_SUBSCRIPTION_KEY,
        apiKey: process.env.MTN_API_KEY,
        userId: process.env.MTN_USER_ID,
        apiUserId: process.env.MTN_API_USER_ID,
        environment: this.environment,
        providerCallbackHost: process.env.MTN_CALLBACK_HOST || this.baseUrl
      });
      
      // Generate X-Reference-Id for the transaction (UUID v4)
      const referenceId = uuidv4();
      
      // Get bearer token for API authentication
      const authToken = await mtnService.getAuthToken();
      
      if (!authToken.success) {
        throw new Error(`MTN authentication failed: ${authToken.error}`);
      }
      
      // Log successful authentication
      await logTransaction({
        transactionId: requestObj.transactionId,
        merchantId: this.merchantId,
        status: PAYMENT_STATUS.AUTHENTICATION_SUCCESS,
        paymentMethod: PAYMENT_METHODS.MOBILE_MONEY,
        metadata: {
          provider: 'MTN',
          referenceId,
          authTimestamp: new Date().toISOString()
        }
      });
      
      // Normalize the phone number to MSISDN format required by MTN
      // MTN requires numbers in format: e.g., 23355667788 without '+'
      const msisdn = requestObj.phoneNumber.startsWith('+') 
        ? requestObj.phoneNumber.substring(1) 
        : requestObj.phoneNumber;
      
      // Determine the payment flow based on amount and currency
      // For this implementation, we'll use the collectFromWallet API (collection API)
      const paymentRequest = {
        amount: requestObj.amount.toString(),
        currency: requestObj.currency,
        externalId: requestObj.transactionId,
        payer: {
          partyIdType: "MSISDN",  // MSISDN identifies the customer's mobile number
          partyId: msisdn
        },
        payerMessage: requestObj.description.substring(0, 50), // MTN limits to 50 chars
        payeeNote: `Payment to ${this.merchantId}`.substring(0, 50),
      };
      
      // Initiate the payment request
      const paymentInitiation = await mtnService.requestToPay(
        paymentRequest, 
        referenceId, 
        authToken.token
      );
      
      if (!paymentInitiation.success) {
        throw new Error(`MTN payment initiation failed: ${paymentInitiation.error}`);
      }
      
      // Log successful payment initiation
      await logTransaction({
        transactionId: requestObj.transactionId,
        merchantId: this.merchantId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: PAYMENT_METHODS.MOBILE_MONEY,
        metadata: {
          provider: 'MTN',
          referenceId,
          msisdn,
          initiationTimestamp: new Date().toISOString()
        }
      });
      
      // Implement proper transaction monitoring
      // At this point, we should poll for status or wait for callback
      
      // Immediately check status once to get initial status
      // In production, this would be handled by webhooks and background jobs
      const statusCheck = await mtnService.getTransactionStatus(
        referenceId, 
        authToken.token
      );
      
      // Store transaction details in database for status tracking
      // This would include the referenceId, which is needed for status checks
      
      // If status check successful, return appropriate response
      if (statusCheck.success) {
        let transactionStatus;
        
        // Map MTN status to our system status
        switch (statusCheck.status) {
          case 'SUCCESSFUL':
            transactionStatus = 'COMPLETED';
            break;
          case 'FAILED':
          case 'REJECTED':
            transactionStatus = 'FAILED';
            break;
          case 'PENDING':
          case 'ONGOING':
          default:
            transactionStatus = 'PENDING';
        }
        
        return {
          success: transactionStatus === 'COMPLETED',
          status: transactionStatus,
          message: statusCheck.message || 'MTN Mobile Money payment initiated',
          providerTransactionId: referenceId,
          providerResponseCode: statusCheck.code || '0',
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`,
          referenceForStatusCheck: referenceId
        };
      } else {
        // If we can't check status immediately, assume it's pending
        return {
          success: true,  // Consider initial request successful
          status: 'PENDING',
          message: 'MTN Mobile Money payment initiated - status pending',
          providerTransactionId: referenceId,
          providerResponseCode: '0',
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`,
          referenceForStatusCheck: referenceId
        };
      }
    } catch (error) {
      // Enhanced error logging for MTN processing
      await logError({
        source: 'SunnyPaymentGateway._processMTNPayment',
        error: error,
        severity: 'HIGH',
        data: {
          merchantId: this.merchantId,
          transactionId: requestObj.transactionId,
          amount: requestObj.amount,
          currency: requestObj.currency,
          errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR
        }
      });
      
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing MTN Mobile Money payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Process Orange Money payment
   * @private
   */
  async _processOrangePayment(requestObj) {
    try {
      // Import the Orange Money processor dynamically
      const { default: OrangeMoneyService } = await import('../integrations/mobileMoney/OrangeMoneyService.js');
      
      // Initialize the service with production credentials
      const orangeService = new OrangeMoneyService({
        merchantId: process.env.ORANGE_MERCHANT_ID,
        merchantKey: process.env.ORANGE_MERCHANT_KEY,
        environment: this.environment
      });
      
      // Process payment through Orange Money API
      const paymentRequest = {
        amount: requestObj.amount,
        currency: requestObj.currency,
        phoneNumber: requestObj.phoneNumber,
        reference: requestObj.transactionId,
        notificationUrl: requestObj.callbackUrl,
        description: requestObj.description
      };
      
      const orangeResult = await orangeService.initiatePayment(paymentRequest);
      
      if (orangeResult.success) {
        return {
          success: true,
          status: 'PENDING',
          message: 'Orange Money payment request initiated successfully',
          providerTransactionId: orangeResult.transactionId,
          providerResponseCode: orangeResult.responseCode,
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          message: orangeResult.errorMessage || 'Failed to process Orange Money payment',
          errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
          providerResponseCode: orangeResult.responseCode,
          errorType: orangeResult.errorType || 'provider_error'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing Orange Money payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Process Vodacom M-Pesa payment
   * @private
   */
  async _processVodacomPayment(requestObj) {
    try {
      // Import the Vodacom processor dynamically
      const { default: VodacomService } = await import('../integrations/mobileMoney/VodacomService.js');
      
      // Initialize the service with production credentials
      const vodacomService = new VodacomService({
        apiKey: process.env.VODACOM_API_KEY,
        publicKey: process.env.VODACOM_PUBLIC_KEY,
        serviceProviderCode: process.env.VODACOM_SERVICE_PROVIDER_CODE,
        environment: this.environment
      });
      
      // Process payment through Vodacom API
      const paymentRequest = {
        amount: requestObj.amount,
        customerMsisdn: requestObj.phoneNumber.replace('+', ''),
        serviceProviderCode: process.env.VODACOM_SERVICE_PROVIDER_CODE,
        thirdPartyReference: requestObj.transactionId,
        transactionReference: `${requestObj.transactionId}-${Date.now()}`,
        callbackUrl: requestObj.callbackUrl
      };
      
      const vodacomResult = await vodacomService.initiateC2BPayment(paymentRequest);
      
      if (vodacomResult.success) {
        return {
          success: true,
          status: 'PENDING',
          message: 'Vodacom M-Pesa payment request initiated successfully',
          providerTransactionId: vodacomResult.transactionId,
          providerResponseCode: vodacomResult.responseCode,
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          message: vodacomResult.errorMessage || 'Failed to process Vodacom M-Pesa payment',
          errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
          providerResponseCode: vodacomResult.responseCode,
          errorType: vodacomResult.errorType || 'provider_error'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing Vodacom M-Pesa payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Process Tigo Pesa payment
   * @private
   */
  async _processTigoPayment(requestObj) {
    try {
      // Import the Tigo processor dynamically
      const { default: TigoService } = await import('../integrations/mobileMoney/TigoService.js');
      
      // Initialize the service with production credentials
      const tigoService = new TigoService({
        username: process.env.TIGO_USERNAME,
        password: process.env.TIGO_PASSWORD,
        apiKey: process.env.TIGO_API_KEY,
        environment: this.environment,
        brandId: process.env.TIGO_BRAND_ID
      });
      
      // Process payment through Tigo API
      const paymentRequest = {
        amount: requestObj.amount,
        currency: requestObj.currency,
        msisdn: requestObj.phoneNumber.replace('+', ''),
        reference: requestObj.transactionId,
        callbackUrl: requestObj.callbackUrl,
        description: requestObj.description
      };
      
      // Set a timeout for the payment request
      const timeoutMs = 15000; // 15 seconds
      const tigoResultPromise = tigoService.initiatePayment(paymentRequest);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, timeoutMs);
      });
      
      // Race the payment request against the timeout
      const tigoResult = await Promise.race([tigoResultPromise, timeoutPromise])
        .catch(error => {
          // Handle timeout or other errors
          if (error.message === 'Request timed out') {
            return {
              success: false,
              status: 'TIMEOUT',
              errorMessage: 'Tigo payment request timed out',
              errorType: 'timeout',
              responseCode: 'TIMEOUT'
            };
          }
          throw error;
        });
      
      if (tigoResult.success) {
        return {
          success: true,
          status: 'PENDING',
          message: 'Tigo Pesa payment request initiated successfully',
          providerTransactionId: tigoResult.transactionId,
          providerResponseCode: tigoResult.responseCode,
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          message: tigoResult.errorMessage || 'Failed to process Tigo Pesa payment',
          errorCode: tigoResult.status === 'TIMEOUT' ? ERROR_CODES.TIMEOUT_ERROR : ERROR_CODES.PAYMENT_METHOD_ERROR,
          providerResponseCode: tigoResult.responseCode,
          errorType: tigoResult.errorType || 'provider_error'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing Tigo Pesa payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Process EcoCash payment
   * @private
   */
  async _processEcoCashPayment(requestObj) {
    try {
      // Import the EcoCash processor dynamically
      const { default: EcoCashService } = await import('../integrations/mobileMoney/EcoCashService.js');
      
      // Initialize the service with production credentials
      const ecoCashService = new EcoCashService({
        merchantCode: process.env.ECOCASH_MERCHANT_CODE,
        merchantPassword: process.env.ECOCASH_MERCHANT_PASSWORD,
        apiKey: process.env.ECOCASH_API_KEY,
        environment: this.environment
      });
      
      // Process payment through EcoCash API
      const paymentRequest = {
        amount: requestObj.amount,
        customerMobile: requestObj.phoneNumber.replace('+', ''),
        merchantReference: requestObj.transactionId,
        remarks: requestObj.description,
        callbackUrl: requestObj.callbackUrl
      };
      
      // Set a timeout for the payment request (similar to Tigo implementation)
      const timeoutMs = 15000; // 15 seconds
      const ecoCashResultPromise = ecoCashService.initiatePayment(paymentRequest);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, timeoutMs);
      });
      
      // Race the payment request against the timeout
      const ecoCashResult = await Promise.race([ecoCashResultPromise, timeoutPromise])
        .catch(error => {
          if (error.message === 'Request timed out') {
            return {
              success: false,
              status: 'TIMEOUT',
              errorMessage: 'EcoCash payment request timed out',
              errorType: 'timeout',
              responseCode: 'TIMEOUT'
            };
          }
          throw error;
        });
      
      if (ecoCashResult.success) {
        return {
          success: true,
          status: 'PENDING',
          message: 'EcoCash payment request initiated successfully',
          providerTransactionId: ecoCashResult.transactionId,
          providerResponseCode: ecoCashResult.responseCode,
          statusCheckUrl: `${this.baseUrl}/transaction-status/${requestObj.transactionId}`
        };
      } else {
        return {
          success: false,
          status: 'FAILED',
          message: ecoCashResult.errorMessage || 'Failed to process EcoCash payment',
          errorCode: ecoCashResult.status === 'TIMEOUT' ? ERROR_CODES.TIMEOUT_ERROR : ERROR_CODES.PAYMENT_METHOD_ERROR,
          providerResponseCode: ecoCashResult.responseCode,
          errorType: ecoCashResult.errorType || 'provider_error'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 'FAILED',
        message: error.message || 'Error processing EcoCash payment',
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR,
        providerResponseCode: error.providerCode || 'unknown',
        errorType: error.type || 'provider_error'
      };
    }
  }

  /**
   * Verify mobile money callback signature
   * @private
   */
  async verifyCallbackSignature(provider, signature, payload) {
    try {
      switch (provider) {
        case 'MPESA':
          return this._verifyMpesaSignature(signature, payload);
        case 'MTN':
          return this._verifyMTNSignature(signature, payload);
        case 'AIRTEL':
          return this._verifyAirtelSignature(signature, payload);
        case 'ORANGE':
          return this._verifyOrangeSignature(signature, payload);
        case 'VODACOM':
          return this._verifyVodacomSignature(signature, payload);
        case 'TIGO':
          return this._verifyTigoSignature(signature, payload);
        case 'ECOCASH':
          return this._verifyEcoCashSignature(signature, payload);
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      await logError({
        source: 'SunnyPaymentGateway.verifyCallbackSignature',
        error,
        severity: 'HIGH',
        data: {
          provider,
          errorMessage: error.message
        }
      });
      return false;
    }
  }

  /**
   * Verify M-Pesa callback signature
   * @private
   */
  _verifyMpesaSignature(signature, payload) {
    try {
      // In production, use the actual M-Pesa API signature verification logic
      // Example implementation using HMAC-SHA256
      const hmac = crypto.createHmac('sha256', process.env.MPESA_API_SECRET);
      const calculatedSignature = hmac
        .update(JSON.stringify(payload))
        .digest('base64');
      
      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(calculatedSignature)
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify MTN callback signature
   * @private
   */
  _verifyMTNSignature(signature, payload) {
    try {
      // MTN uses X-Reference-Id in their callbacks
      // We need to verify it exists in our records
      if (!payload.referenceId) {
        return false;
      }
      
      // Calculate the signature using HMAC-SHA256
      const data = `${payload.referenceId}${payload.status}${payload.amount}${payload.currency}`;
      const hmac = crypto.createHmac('sha256', process.env.MTN_API_KEY);
      const calculatedSignature = hmac.update(data).digest('hex');
      
      return signature === calculatedSignature;
    } catch (error) {
      return false;
    }
  }

  /**
   * Sign a mobile money request
   * @private
   */
  async _signMobileMoneyRequest(requestData) {
    try {
      // In production, this would use HSM for secure key operations
      // For demo purposes, we're using local signing
      
      // Create a canonical string from request data
      const canonicalString = this._createCanonicalString(requestData);
      
      // Sign using HMAC-SHA256
      const hmac = crypto.createHmac('sha256', this.apiSecret);
      return hmac.update(canonicalString).digest('hex');
    } catch (error) {
      await logError({
        source: 'SunnyPaymentGateway._signMobileMoneyRequest',
        error,
        severity: 'HIGH',
        data: {
          transactionId: requestData.transactionId,
          provider: requestData.provider
        }
      });
      
      throw new Error('Failed to sign request');
    }
  }

  /**
   * Create a canonical string for signing
   * @private
   */
  _createCanonicalString(data) {
    // Sort keys alphabetically for consistency
    const sortedKeys = Object.keys(data).sort();
    
    // Build canonical string
    return sortedKeys
      .map(key => {
        // Skip sensitive data
        if (key === 'signature' || key === 'apiSecret') {
          return '';
        }
        
        // Handle nested objects
        if (typeof data[key] === 'object' && data[key] !== null) {
          return `${key}=${JSON.stringify(data[key])}`;
        }
        
        return `${key}=${data[key]}`;
      })
      .filter(Boolean) // Remove empty strings
      .join('&');
  }

  /**
   * Mask phone number for logging
   * @private
   */
  _maskPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    
    // Keep country code and first digit, mask the middle, keep last 2 digits
    const parts = phoneNumber.match(/^(\+\d{2,4})(\d+
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