/**
 * Unified Payment Gateway Interface
 * 
 * A comprehensive payment processing system that supports multiple payment methods:
 * - Credit/Debit Cards (via Stripe)
 * - PayPal
 * - Mobile Money (M-Pesa)
 * - Cryptocurrency
 * - Bank Transfers
 * - QR Code Payments
 * 
 * Features:
 * - Consistent API across all payment methods
 * - Error handling and comprehensive logging
 * - Currency conversion support
 * - Webhook/callback processing
 * - Transaction status tracking
 */

import { v4 as uuidv4 } from 'uuid';
import { logTransaction, getTransactionById } from './transactionLogger.js';
import { validatePaymentData } from '../api/validation.js';
import { detectFraud } from '../security/fraudDetection.js';
import { convertCurrency } from '../utils/currencyConverter.js';
import { 
  PAYMENT_STATUS, 
  PAYMENT_METHODS, 
  ERROR_CODES,
  CURRENCY_CODES
} from './constants.js';

// Payment processors
import StripeProcessor from '../integrations/stripe/StripeProcessor.js';
import PayPalProcessor from '../integrations/paypal/PayPalProcessor.js';
import MPesaProcessor from '../integrations/mpesa/MPesaProcessor.js';
import CryptoProcessor from '../integrations/crypto/CryptoProcessor.js';
import BankTransferProcessor from '../integrations/bank/BankTransferProcessor.js';
import QRCodePaymentProcessor from '../integrations/qrcode/QRCodePaymentProcessor.js';

class PaymentGateway {
  constructor(config = {}) {
    this.config = config;
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.merchantId = config.merchantId || process.env.SUNNY_MERCHANT_ID;
    this.instantSettlement = config.instantSettlement || false;
    
    // Initialize payment processors
    this.initializeProcessors();
  }
  
  /**
   * Initialize all payment processors
   * 
   * @private
   */
  initializeProcessors() {
    try {
      // Initialize Stripe processor
      this.stripeProcessor = new StripeProcessor({
        secretKey: this.config.stripeSecretKey || process.env.STRIPE_SECRET_KEY,
        publishableKey: this.config.stripePublishableKey || process.env.STRIPE_PUBLISHABLE_KEY,
        webhookSecret: this.config.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET,
        environment: this.environment
      });
      
      // Initialize PayPal processor
      this.paypalProcessor = new PayPalProcessor({
        clientId: this.config.paypalClientId || process.env.PAYPAL_CLIENT_ID,
        clientSecret: this.config.paypalClientSecret || process.env.PAYPAL_CLIENT_SECRET,
        environment: this.environment
      });
      
      // Initialize M-Pesa processor
      this.mpesaProcessor = new MPesaProcessor({
        consumerKey: this.config.mpesaConsumerKey || process.env.MPESA_CONSUMER_KEY,
        consumerSecret: this.config.mpesaConsumerSecret || process.env.MPESA_CONSUMER_SECRET,
        shortCode: this.config.mpesaShortCode || process.env.MPESA_SHORT_CODE,
        passKey: this.config.mpesaPassKey || process.env.MPESA_PASS_KEY,
        environment: this.environment,
        callbackUrl: this.config.mpesaCallbackUrl || process.env.MPESA_CALLBACK_URL
      });
      
      // Initialize Crypto processor
      this.cryptoProcessor = new CryptoProcessor({
        apiKey: this.config.cryptoApiKey || process.env.CRYPTO_API_KEY,
        apiSecret: this.config.cryptoApiSecret || process.env.CRYPTO_API_SECRET,
        environment: this.environment,
        supportedCurrencies: this.config.cryptoCurrencies || ['BTC', 'ETH', 'USDT', 'USDC']
      });
      
      // Initialize Bank Transfer processor
      this.bankTransferProcessor = new BankTransferProcessor({
        apiKey: this.config.bankApiKey || process.env.BANK_API_KEY,
        environment: this.environment
      });
      
      // Initialize QR Code Payment processor
      this.qrCodeProcessor = new QRCodePaymentProcessor({
        apiKey: this.config.qrCodeApiKey || process.env.QRCODE_API_KEY,
        environment: this.environment
      });
    } catch (error) {
      console.error('Failed to initialize payment processors:', error);
      
      // Continue without failing completely, individual processors will be checked before use
    }
  }
  
  /**
   * Process a payment using the appropriate payment processor
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async processPayment(paymentData) {
    try {
      // Generate transaction ID if not provided
      const transactionId = paymentData.transactionId || uuidv4();
      
      // Validate the payment data
      const validationResult = validatePaymentData(paymentData);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: validationResult.errors.join(', '),
          transactionId
        };
      }
      
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
      
      // Log the initiation of the transaction
      await logTransaction({
        transactionId,
        merchantId: this.merchantId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: paymentData.paymentMethod,
        metadata: paymentData.metadata || {}
      });
      
      // Handle currency conversion if needed
      let processedPaymentData = { ...paymentData, transactionId };
      
      if (paymentData.convertCurrency && paymentData.targetCurrency && paymentData.targetCurrency !== paymentData.currency) {
        const conversionResult = await convertCurrency({
          amount: paymentData.amount,
          fromCurrency: paymentData.currency,
          toCurrency: paymentData.targetCurrency
        });
        
        if (conversionResult.success) {
          processedPaymentData.originalAmount = paymentData.amount;
          processedPaymentData.originalCurrency = paymentData.currency;
          processedPaymentData.amount = conversionResult.convertedAmount;
          processedPaymentData.currency = paymentData.targetCurrency;
          processedPaymentData.conversionRate = conversionResult.rate;
          
          // Log currency conversion
          await logTransaction({
            transactionId,
            status: PAYMENT_STATUS.CURRENCY_CONVERTED,
            metadata: {
              originalAmount: paymentData.amount,
              originalCurrency: paymentData.currency,
              convertedAmount: conversionResult.convertedAmount,
              targetCurrency: paymentData.targetCurrency,
              conversionRate: conversionResult.rate
            }
          });
        } else {
          return {
            success: false,
            error: ERROR_CODES.CURRENCY_CONVERSION_ERROR,
            message: 'Failed to convert currency',
            transactionId
          };
        }
      }
      
      // Process payment based on payment method
      let paymentResult;
      
      switch (processedPaymentData.paymentMethod) {
        case PAYMENT_METHODS.CARD:
          if (!this.stripeProcessor) {
            return this.handleProcessorError('Stripe', transactionId);
          }
          paymentResult = await this.stripeProcessor.processCardPayment(processedPaymentData);
          break;
          
        case PAYMENT_METHODS.PAYPAL:
          if (!this.paypalProcessor) {
            return this.handleProcessorError('PayPal', transactionId);
          }
          paymentResult = await this.paypalProcessor.createPayment(processedPaymentData);
          break;
          
        case PAYMENT_METHODS.MOBILE_MONEY:
          if (!this.mpesaProcessor) {
            return this.handleProcessorError('M-Pesa', transactionId);
          }
          paymentResult = await this.mpesaProcessor.initiateSTKPush(processedPaymentData);
          break;
          
        case PAYMENT_METHODS.CRYPTO:
          if (!this.cryptoProcessor) {
            return this.handleProcessorError('Crypto', transactionId);
          }
          paymentResult = await this.cryptoProcessor.createTransaction(processedPaymentData);
          break;
          
        case PAYMENT_METHODS.BANK_TRANSFER:
          if (!this.bankTransferProcessor) {
            return this.handleProcessorError('Bank Transfer', transactionId);
          }
          paymentResult = await this.bankTransferProcessor.initiateTransfer(processedPaymentData);
          break;
          
        case PAYMENT_METHODS.QR_CODE:
          if (!this.qrCodeProcessor) {
            return this.handleProcessorError('QR Code', transactionId);
          }
          paymentResult = await this.qrCodeProcessor.generatePayment(processedPaymentData);
          break;
          
        default:
          return {
            success: false,
            error: ERROR_CODES.UNSUPPORTED_PAYMENT_METHOD,
            message: `Unsupported payment method: ${processedPaymentData.paymentMethod}`,
            transactionId
          };
      }
      
      // Update transaction status
      await logTransaction({
        transactionId,
        status: paymentResult.status || (paymentResult.success ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.FAILED),
        errorCode: paymentResult.error || null,
        metadata: {
          processorResponse: paymentResult.processorResponse || null,
          requiresAction: paymentResult.requiresAction || false,
          requiresRedirect: paymentResult.requiresRedirect || false,
          redirectUrl: paymentResult.redirectUrl || null
        }
      });
      
      // Return the transaction result with consistent structure
      return {
        ...paymentResult,
        transactionId
      };
    } catch (error) {
      console.error('Payment gateway error:', error);
      
      // Log the error
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
        message: 'An unexpected error occurred while processing the payment',
        transactionId: paymentData.transactionId || null
      };
    }
  }
  
  /**
   * Handle processor initialization error
   * 
   * @private
   * @param {string} processorName - Name of the processor
   * @param {string} transactionId - Transaction ID
   * @returns {Object} Error response
   */
  async handleProcessorError(processorName, transactionId) {
    const errorMessage = `${processorName} payment processor is not available`;
    
    await logTransaction({
      transactionId,
      status: PAYMENT_STATUS.ERROR,
      errorCode: ERROR_CODES.PROCESSOR_UNAVAILABLE,
      metadata: {
        processor: processorName,
        errorMessage
      }
    });
    
    return {
      success: false,
      error: ERROR_CODES.PROCESSOR_UNAVAILABLE,
      message: errorMessage,
      transactionId
    };
  }
  
  /**
   * Process a payment webhook/callback
   * 
   * @param {Object} webhookData - Webhook data from payment provider
   * @param {string} provider - Payment provider name
   * @param {Object} headers - Request headers
   * @returns {Promise<Object>} Processed webhook result
   */
  async processWebhook(webhookData, provider, headers = {}) {
    try {
      let webhookResult;
      
      switch (provider.toLowerCase()) {
        case 'stripe':
          if (!this.stripeProcessor) {
            return { success: false, message: 'Stripe processor not initialized' };
          }
          
          // Validate Stripe webhook signature
          const signature = headers['stripe-signature'];
          const validationResult = this.stripeProcessor.validateWebhook(
            typeof webhookData === 'string' ? webhookData : JSON.stringify(webhookData),
            signature
          );
          
          if (!validationResult.valid) {
            return { success: false, message: 'Invalid webhook signature' };
          }
          
          // Process based on event type
          const event = validationResult.event;
          
          switch (event.type) {
            case 'payment_intent.succeeded':
              // Handle successful payment
              const paymentIntent = event.data.object;
              
              await logTransaction({
                transactionId: paymentIntent.metadata.transactionId,
                status: PAYMENT_STATUS.COMPLETED,
                metadata: {
                  stripeEventId: event.id,
                  paymentIntentId: paymentIntent.id,
                  eventType: event.type
                }
              });
              
              webhookResult = {
                success: true,
                action: 'payment_succeeded',
                transactionId: paymentIntent.metadata.transactionId,
                paymentIntentId: paymentIntent.id
              };
              break;
              
            case 'payment_intent.payment_failed':
              // Handle failed payment
              const failedPayment = event.data.object;
              
              await logTransaction({
                transactionId: failedPayment.metadata.transactionId,
                status: PAYMENT_STATUS.FAILED,
                errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
                metadata: {
                  stripeEventId: event.id,
                  paymentIntentId: failedPayment.id,
                  eventType: event.type,
                  failureMessage: failedPayment.last_payment_error?.message
                }
              });
              
              webhookResult = {
                success: false,
                action: 'payment_failed',
                transactionId: failedPayment.metadata.transactionId,
                paymentIntentId: failedPayment.id
              };
              break;
              
            default:
              // Log other event types
              console.log(`Received unhandled Stripe event: ${event.type}`);
              webhookResult = {
                success: true,
                action: 'event_logged',
                eventType: event.type
              };
          }
          break;
          
        case 'paypal':
          if (!this.paypalProcessor) {
            return { success: false, message: 'PayPal processor not initialized' };
          }
          
          // Process PayPal webhook
          switch (webhookData.event_type) {
            case 'PAYMENT.CAPTURE.COMPLETED':
              const resource = webhookData.resource;
              const customId = resource.custom_id || resource.supplementary_data?.related_ids?.order_id;
              
              if (customId) {
                await logTransaction({
                  transactionId: customId,
                  status: PAYMENT_STATUS.COMPLETED,
                  metadata: {
                    paypalEventId: webhookData.id,
                    captureId: resource.id,
                    eventType: webhookData.event_type
                  }
                });
                
                webhookResult = {
                  success: true,
                  action: 'payment_completed',
                  transactionId: customId,
                  captureId: resource.id
                };
              } else {
                webhookResult = {
                  success: false,
                  message: 'Missing transaction reference in PayPal webhook'
                };
              }
              break;
              
            case 'PAYMENT.CAPTURE.DENIED':
            case 'PAYMENT.CAPTURE.REFUNDED':
              const failedResource = webhookData.resource;
              const failedCustomId = failedResource.custom_id || failedResource.supplementary_data?.related_ids?.order_id;
              
              if (failedCustomId) {
                const isRefund = webhookData.event_type === 'PAYMENT.CAPTURE.REFUNDED';
                
                await logTransaction({
                  transactionId: failedCustomId,
                  status: isRefund ? PAYMENT_STATUS.REFUNDED : PAYMENT_STATUS.FAILED,
                  metadata: {
                    paypalEventId: webhookData.id,
                    captureId: failedResource.id,
                    eventType: webhookData.event_type
                  }
                });
                
                webhookResult = {
                  success: true,
                  action: isRefund ? 'payment_refunded' : 'payment_failed',
                  transactionId: failedCustomId,
                  captureId: failedResource.id
                };
              } else {
                webhookResult = {
                  success: false,
                  message: 'Missing transaction reference in PayPal webhook'
                };
              }
              break;
              
            default:
              // Log other event types
              console.log(`Received unhandled PayPal event: ${webhookData.event_type}`);
              webhookResult = {
                success: true,
                action: 'event_logged',
                eventType: webhookData.event_type
              };
          }
          break;
          
        case 'mpesa':
          if (!this.mpesaProcessor) {
            return { success: false, message: 'M-Pesa processor not initialized' };
          }
          
          // Extract transaction ID from query parameters or body
          const mpesaTransactionId = webhookData.transactionId || headers.transactionId || 
                                     (headers.url && new URL(headers.url).searchParams.get('transactionId'));
                                     
          if (!mpesaTransactionId) {
            return { success: false, message: 'Missing transaction ID in M-Pesa callback' };
          }
          
          // Process M-Pesa callback
          webhookResult = await this.mpesaProcessor.processCallback(webhookData, mpesaTransactionId);
          break;
          
        case 'crypto':
          if (!this.cryptoProcessor) {
            return { success: false, message: 'Crypto processor not initialized' };
          }
          
          // Extract transaction ID from query parameters or body
          const cryptoTransactionId = webhookData.transactionId || headers.transactionId || 
                                      (headers.url && new URL(headers.url).searchParams.get('transactionId'));
                                      
          if (!cryptoTransactionId) {
            return { success: false, message: 'Missing transaction ID in crypto callback' };
          }
          
          // Process cryptocurrency callback (typically these would be blockchain confirmations)
          // In this case, we're assuming the webhook data contains confirmation information
          const cryptoMeta = webhookData.meta || {};
          
          await logTransaction({
            transactionId: cryptoTransactionId,
            status: webhookData.confirmed ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.PENDING,
            metadata: {
              blockchainTxId: webhookData.txid,
              confirmations: webhookData.confirmations,
              blockHeight: webhookData.blockHeight,
              eventType: 'crypto_payment_update',
              processor: 'CryptoProcessor'
            }
          });
          
          webhookResult = {
            success: true,
            action: webhookData.confirmed ? 'payment_confirmed' : 'payment_pending',
            transactionId: cryptoTransactionId,
            confirmations: webhookData.confirmations,
            blockchainTxId: webhookData.txid
          };
          break;
          
        case 'qrcode':
          if (!this.qrCodeProcessor) {
            return { success: false, message: 'QR Code processor not initialized' };
          }
          
          // Extract transaction ID from query parameters or body
          const qrTransactionId = webhookData.transactionId || headers.transactionId || 
                                  (headers.url && new URL(headers.url).searchParams.get('transactionId'));
                                  
          if (!qrTransactionId) {
            return { success: false, message: 'Missing transaction ID in QR code callback' };
          }
          
          // Process QR code payment callback
          webhookResult = await this.qrCodeProcessor.processCallback(webhookData, qrTransactionId);
          break;
          
        case 'bank':
          if (!this.bankTransferProcessor) {
            return { success: false, message: 'Bank Transfer processor not initialized' };
          }
          
          // Extract transaction ID and reference from webhook data
          const bankTransactionId = webhookData.transactionId || 
                                    webhookData.metadata?.transactionId || 
                                    (headers.url && new URL(headers.url).searchParams.get('transactionId'));
                                    
          if (!bankTransactionId) {
            return { success: false, message: 'Missing transaction ID in bank transfer callback' };
          }
          
          // For bank transfers, we might receive confirmation of funds received
          const transferStatus = webhookData.status || '';
          const isCompleted = transferStatus.toLowerCase() === 'completed' || 
                              transferStatus.toLowerCase() === 'succeeded' ||
                              transferStatus.toLowerCase() === 'success';
                              
          await logTransaction({
            transactionId: bankTransactionId,
            status: isCompleted ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.PENDING,
            metadata: {
              bankReference: webhookData.reference,
              bankTransferId: webhookData.id,
              originalStatus: transferStatus,
              eventType: 'bank_transfer_update',
              processor: 'BankTransferProcessor'
            }
          });
          
          webhookResult = {
            success: true,
            action: isCompleted ? 'transfer_completed' : 'transfer_pending',
            transactionId: bankTransactionId,
            transferId: webhookData.id,
            status: transferStatus
          };
          break;
          
        default:
          return { success: false, message: `Unsupported payment provider: ${provider}` };
      }
      
      return webhookResult;
    } catch (error) {
      console.error(`Error processing ${provider} webhook:`, error);
      
      return {
        success: false,
        error: ERROR_CODES.WEBHOOK_PROCESSING_ERROR,
        message: `Failed to process ${provider} webhook: ${error.message}`
      };
    }
  }
  
  /**
   * Check the status of a payment
   * 
   * @param {Object} statusData - Status check parameters
   * @returns {Promise<Object>} Payment status
   */
  async checkPaymentStatus(statusData) {
    try {
      const { transactionId, paymentMethod, processorData } = statusData;
      
      if (!transactionId) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Transaction ID is required to check payment status'
        };
      }
      
      // Get transaction history from logs
      const transactionHistory = await getTransactionById(transactionId);
      
      if (!transactionHistory || transactionHistory.length === 0) {
        return {
          success: false,
          error: ERROR_CODES.NOT_FOUND,
          message: 'Transaction not found'
        };
      }
      
      // Get the latest status from transaction history
      const latestTransaction = transactionHistory[0];
      const method = paymentMethod || latestTransaction.paymentMethod;
      
      // For certain payment methods, we need to check the current status with the processor
      let processorStatus = null;
      
      switch (method) {
        case PAYMENT_METHODS.CARD:
          if (!this.stripeProcessor || !processorData?.paymentIntentId) {
            break;
          }
          processorStatus = await this.stripeProcessor.retrievePaymentIntent(processorData.paymentIntentId);
          break;
          
        case PAYMENT_METHODS.PAYPAL:
          if (!this.paypalProcessor || !processorData?.orderId) {
            break;
          }
          processorStatus = await this.paypalProcessor.checkOrderStatus(processorData.orderId);
          break;
          
        case PAYMENT_METHODS.MOBILE_MONEY:
          if (!this.mpesaProcessor || !processorData?.checkoutRequestId) {
            break;
          }
          processorStatus = await this.mpesaProcessor.checkTransactionStatus({
            transactionId,
            checkoutRequestId: processorData.checkoutRequestId
          });
          break;
          
        case PAYMENT_METHODS.CRYPTO:
          if (!this.cryptoProcessor || !processorData?.paymentAddress || !processorData?.cryptoCurrency) {
            break;
          }
          processorStatus = await this.cryptoProcessor.checkTransactionStatus({
            transactionId,
            paymentAddress: processorData.paymentAddress,
            cryptoCurrency: processorData.cryptoCurrency
          });
          break;
          
        case PAYMENT_METHODS.QR_CODE:
          if (!this.qrCodeProcessor || !processorData?.qrCodeId) {
            break;
          }
          processorStatus = await this.qrCodeProcessor.checkPaymentStatus({
            transactionId,
            qrCodeId: processorData.qrCodeId
          });
          break;
          
        case PAYMENT_METHODS.BANK_TRANSFER:
          if (!this.bankTransferProcessor || !processorData?.transferId) {
            break;
          }
          processorStatus = await this.bankTransferProcessor.checkTransferStatus({
            transactionId,
            transferId: processorData.transferId
          });
          break;
      }
      
      // If we got a status from the processor, use it. Otherwise use the latest from our logs
      const currentStatus = processorStatus?.success ? processorStatus : {
        success: true,
        status: latestTransaction.status,
        transactionId,
        amount: latestTransaction.amount,
        currency: latestTransaction.currency,
        paymentMethod: latestTransaction.paymentMethod,
        createdAt: latestTransaction.createdAt
      };
      
      // Log that status was checked
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.STATUS_CHECK,
        metadata: {
          checkedStatus: currentStatus.status,
          processorStatus: processorStatus?.status,
          processor: method
        }
      });
      
      return {
        ...currentStatus,
        history: transactionHistory.map(tx => ({
          status: tx.status,
          timestamp: tx.createdAt,
          metadata: tx.metadata
        }))
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      
      return {
        success: false,
        error: ERROR_CODES.STATUS_CHECK_ERROR,
        message: `Failed to check payment status: ${error.message}`
      };
    }
  }
  
  /**
   * Process a refund for a payment
   * 
   * @param {Object} refundData - Refund information
   * @returns {Promise<Object>} Refund result
   */
  async processRefund(refundData) {
    try {
      const { 
        transactionId, 
        amount, 
        reason, 
        paymentMethod,
        processorTransactionId
      } = refundData;
      
      if (!transactionId) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Transaction ID is required for refund'
        };
      }
      
      // Get transaction data to determine payment method if not provided
      const transactionHistory = await getTransactionById(transactionId);
      
      if (!transactionHistory || transactionHistory.length === 0) {
        return {
          success: false,
          error: ERROR_CODES.NOT_FOUND,
          message: 'Original transaction not found'
        };
      }
      
      // Get latest completed transaction
      const completedTransaction = transactionHistory.find(tx => 
        tx.status === PAYMENT_STATUS.COMPLETED
      );
      
      if (!completedTransaction) {
        return {
          success: false,
          error: ERROR_CODES.INVALID_TRANSACTION_STATE,
          message: 'Cannot refund a transaction that is not completed'
        };
      }
      
      // Determine payment method
      const method = paymentMethod || completedTransaction.paymentMethod;
      
      // Generate refund ID
      const refundId = uuidv4();
      
      // Log refund initiation
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.REFUND_INITIATED,
        paymentMethod: method,
        metadata: {
          refundId,
          refundAmount: amount || completedTransaction.amount,
          refundReason: reason,
          originalTransactionId: transactionId
        }
      });
      
      // Process refund based on payment method
      let refundResult;
      
      switch (method) {
        case PAYMENT_METHODS.CARD:
          if (!this.stripeProcessor) {
            return this.handleProcessorError('Stripe', transactionId);
          }
          
          const stripeId = processorTransactionId || 
            completedTransaction.metadata?.processorResponse?.processorTransactionId;
            
          if (!stripeId) {
            return {
              success: false,
              error: ERROR_

