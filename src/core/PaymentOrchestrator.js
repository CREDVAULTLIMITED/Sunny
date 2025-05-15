/**
 * PaymentOrchestrator.js
 * 
 * Core payment orchestration engine that routes payments to appropriate processors,
 * handles transaction lifecycle, and manages the payment flow.
 */

import { v4 as uuidv4 } from 'uuid';
import { PAYMENT_METHODS, PAYMENT_STATUS, ERROR_CODES } from './constants';
import MobileMoneyProcessor from './mobileMoney/MobileMoneyProcessor';
import CardPaymentProcessor from './card/CardPaymentProcessor';
import BankTransferProcessor from './bank/BankTransferProcessor';
import QRCodeManager from './qr/QRCodeManager';
import CryptoProcessor from './crypto/CryptoProcessor';
import P2PTransferManager from './p2p/P2PTransferManager';
import IdentityManager from './identity/IdentityManager';
import { logTransaction, logError } from './transactionLogger';
import { calculateFees } from './feeCalculator';
import { instantSettlement } from './instantSettlement';

class PaymentOrchestrator {
  constructor() {
    // Initialize payment processors
    this.mobileMoneyProcessor = new MobileMoneyProcessor();
    this.cardPaymentProcessor = new CardPaymentProcessor();
    this.bankTransferProcessor = new BankTransferProcessor();
    this.qrCodeManager = new QRCodeManager();
    this.cryptoProcessor = new CryptoProcessor();
    this.p2pTransferManager = new P2PTransferManager();
    this.identityManager = new IdentityManager();
    
    // Map payment methods to their processors
    this.processors = {
      [PAYMENT_METHODS.MOBILE_MONEY]: this.mobileMoneyProcessor,
      [PAYMENT_METHODS.CARD]: this.cardPaymentProcessor,
      [PAYMENT_METHODS.BANK_TRANSFER]: this.bankTransferProcessor,
      [PAYMENT_METHODS.QR_CODE]: this.qrCodeManager,
      [PAYMENT_METHODS.CRYPTO]: this.cryptoProcessor,
      [PAYMENT_METHODS.P2P]: this.p2pTransferManager,
    };
    
    // Transaction store (in a real app, this would be a database)
    this.transactions = new Map();
    
    // Retry configuration
    this.maxRetries = 3;
    this.retryDelayMs = 2000;
  }

  /**
   * Process a payment using the appropriate payment processor
   * 
   * @param {Object} paymentDetails - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async processPayment(paymentDetails) {
    try {
      // Validate payment details
      this._validatePaymentDetails(paymentDetails);
      
      // Generate transaction ID
      const transactionId = this._generateTransactionId();
      
      // Create transaction record
      const transaction = {
        id: transactionId,
        status: PAYMENT_STATUS.INITIATED,
        timestamp: new Date(),
        details: paymentDetails,
        attempts: 0,
        logs: [`Transaction initiated at ${new Date().toISOString()}`]
      };
      
      // Store transaction
      this.transactions.set(transactionId, transaction);
      
      // Log transaction initiation
      logTransaction('PAYMENT_INITIATED', transaction);
      
      // Calculate fees
      const fees = calculateFees(paymentDetails);
      transaction.fees = fees;
      
      // Resolve recipient identity if using an alias
      if (paymentDetails.recipientId) {
        const resolvedIdentity = await this.identityManager.resolveIdentity(paymentDetails.recipientId);
        if (!resolvedIdentity) {
          throw new Error(`Recipient identity ${paymentDetails.recipientId} could not be resolved`);
        }
        transaction.resolvedRecipient = resolvedIdentity;
      }
      
      // Determine payment method
      const paymentMethod = paymentDetails.paymentMethod;
      
      // Get appropriate processor
      const processor = this.processors[paymentMethod];
      if (!processor) {
        throw new Error(`Unsupported payment method: ${paymentMethod}`);
      }
      
      // Update transaction status
      transaction.status = PAYMENT_STATUS.PROCESSING;
      transaction.logs.push(`Processing payment via ${paymentMethod} at ${new Date().toISOString()}`);
      
      // Process payment with appropriate processor
      const result = await this._processWithRetry(processor, paymentDetails, transaction);
      
      // Handle settlement if payment was successful
      if (result.success) {
        await this._handleSettlement(transaction, result);
      }
      
      // Return transaction result
      return {
        transactionId,
        success: result.success,
        status: transaction.status,
        message: result.message,
        paymentMethod,
        timestamp: transaction.timestamp,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        fees: transaction.fees,
        settlementInfo: transaction.settlementInfo
      };
    } catch (error) {
      // Log error
      logError('PAYMENT_ERROR', error, paymentDetails);
      
      // Return error response
      return {
        success: false,
        status: PAYMENT_STATUS.FAILED,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Get transaction status by ID
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Object} Transaction status
   */
  getTransactionStatus(transactionId) {
    const transaction = this.transactions.get(transactionId);
    
    if (!transaction) {
      return {
        success: false,
        message: 'Transaction not found',
        errorCode: ERROR_CODES.TRANSACTION_NOT_FOUND
      };
    }
    
    return {
      transactionId,
      status: transaction.status,
      timestamp: transaction.timestamp,
      lastUpdated: transaction.lastUpdated || transaction.timestamp,
      paymentMethod: transaction.details.paymentMethod,
      amount: transaction.details.amount,
      currency: transaction.details.currency,
      fees: transaction.fees
    };
  }

  /**
   * Generate a payment link or QR code for a specific amount
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Payment link or QR code data
   */
  async generatePaymentLink(paymentDetails) {
    try {
      // Validate payment details
      this._validatePaymentDetails(paymentDetails);
      
      // Generate transaction ID
      const transactionId = this._generateTransactionId();
      
      // Create transaction record
      const transaction = {
        id: transactionId,
        status: PAYMENT_STATUS.PENDING,
        timestamp: new Date(),
        details: paymentDetails,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours expiry
      };
      
      // Store transaction
      this.transactions.set(transactionId, transaction);
      
      // Generate QR code data
      const qrData = await this.qrCodeManager.generatePaymentQR({
        ...paymentDetails,
        transactionId
      });
      
      // Generate payment link
      const paymentLink = `https://pay.sunnypayments.com/${transactionId}`;
      
      return {
        transactionId,
        paymentLink,
        qrData,
        expiresAt: transaction.expiresAt
      };
    } catch (error) {
      logError('PAYMENT_LINK_ERROR', error, paymentDetails);
      
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Process a payment with retry logic
   * 
   * @param {Object} processor - Payment processor
   * @param {Object} paymentDetails - Payment details
   * @param {Object} transaction - Transaction record
   * @returns {Promise<Object>} Processing result
   */
  async _processWithRetry(processor, paymentDetails, transaction) {
    let attempts = 0;
    let lastError = null;
    
    while (attempts < this.maxRetries) {
      attempts++;
      transaction.attempts = attempts;
      transaction.logs.push(`Attempt ${attempts} at ${new Date().toISOString()}`);
      
      try {
        // Process payment
        const result = await processor.processPayment(paymentDetails);
        
        // Update transaction status
        if (result.success) {
          transaction.status = PAYMENT_STATUS.COMPLETED;
          transaction.logs.push(`Payment completed at ${new Date().toISOString()}`);
          transaction.lastUpdated = new Date();
          transaction.processorReference = result.processorReference;
          
          // Log successful transaction
          logTransaction('PAYMENT_COMPLETED', transaction);
          
          return result;
        } else {
          lastError = new Error(result.message);
          lastError.code = result.errorCode;
          
          // If error is not retriable, break immediately
          if (result.retriable === false) {
            break;
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
        }
      } catch (error) {
        lastError = error;
        
        // Log retry attempt
        logError('PAYMENT_RETRY', error, { attempt: attempts, transactionId: transaction.id });
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
      }
    }
    
    // All retries failed
    transaction.status = PAYMENT_STATUS.FAILED;
    transaction.logs.push(`Payment failed after ${attempts} attempts at ${new Date().toISOString()}`);
    transaction.lastUpdated = new Date();
    transaction.error = lastError ? lastError.message : 'Unknown error';
    transaction.errorCode = lastError ? lastError.code : ERROR_CODES.GENERAL_ERROR;
    
    // Log failed transaction
    logError('PAYMENT_FAILED', lastError, transaction);
    
    return {
      success: false,
      message: lastError ? lastError.message : 'Payment processing failed after multiple attempts',
      errorCode: lastError ? lastError.code : ERROR_CODES.GENERAL_ERROR
    };
  }

  /**
   * Handle settlement for successful payments
   * 
   * @param {Object} transaction - Transaction record
   * @param {Object} result - Processing result
   */
  async _handleSettlement(transaction, result) {
    try {
      // Attempt instant settlement
      const settlementResult = await instantSettlement({
        transactionId: transaction.id,
        amount: transaction.details.amount,
        currency: transaction.details.currency,
        fees: transaction.fees,
        recipient: transaction.resolvedRecipient || transaction.details.recipientId,
        paymentMethod: transaction.details.paymentMethod,
        processorReference: result.processorReference
      });
      
      // Update transaction with settlement info
      transaction.settlementInfo = settlementResult;
      transaction.logs.push(`Settlement processed at ${new Date().toISOString()}: ${settlementResult.status}`);
      
      // Log settlement
      logTransaction('PAYMENT_SETTLED', {
        transactionId: transaction.id,
        settlementInfo: settlementResult
      });
    } catch (error) {
      // Log settlement error but don't fail the transaction
      logError('SETTLEMENT_ERROR', error, { transactionId: transaction.id });
      
      transaction.settlementInfo = {
        status: 'PENDING',
        message: 'Settlement queued for processing',
        error: error.message
      };
      
      transaction.logs.push(`Settlement error at ${new Date().toISOString()}: ${error.message}`);
    }
  }

  /**
   * Validate payment details
   * 
   * @param {Object} paymentDetails - Payment details to validate
   */
  _validatePaymentDetails(paymentDetails) {
    // Check required fields
    if (!paymentDetails) {
      throw new Error('Payment details are required');
    }
    
    if (!paymentDetails.amount || isNaN(parseFloat(paymentDetails.amount))) {
      throw new Error('Valid payment amount is required');
    }
    
    if (!paymentDetails.currency) {
      throw new Error('Currency is required');
    }
    
    if (!paymentDetails.paymentMethod) {
      throw new Error('Payment method is required');
    }
    
    // Check if payment method is supported
    if (!Object.values(PAYMENT_METHODS).includes(paymentDetails.paymentMethod)) {
      throw new Error(`Unsupported payment method: ${paymentDetails.paymentMethod}`);
    }
    
    // Check recipient information
    if (!paymentDetails.recipientId && !paymentDetails.recipientAccount) {
      throw new Error('Recipient information is required');
    }
    
    // Validate method-specific details
    switch (paymentDetails.paymentMethod) {
      case PAYMENT_METHODS.MOBILE_MONEY:
        if (!paymentDetails.mobileMoneyDetails) {
          throw new Error('Mobile money details are required');
        }
        break;
        
      case PAYMENT_METHODS.CARD:
        if (!paymentDetails.cardDetails) {
          throw new Error('Card details are required');
        }
        break;
        
      case PAYMENT_METHODS.BANK_TRANSFER:
        if (!paymentDetails.bankDetails) {
          throw new Error('Bank details are required');
        }
        break;
        
      case PAYMENT_METHODS.CRYPTO:
        if (!paymentDetails.cryptoDetails) {
          throw new Error('Cryptocurrency details are required');
        }
        break;
    }
  }

  /**
   * Generate a unique transaction ID
   * 
   * @returns {string} Transaction ID
   */
  _generateTransactionId() {
    return `TXN-${uuidv4()}`;
  }
}

export default PaymentOrchestrator;