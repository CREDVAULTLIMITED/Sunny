/**
 * Sunny Payment Gateway - Offline Processor
 * 
 * Handles offline payment processing capabilities
 */

import { v4 as uuidv4 } from 'uuid';
import { encryptData, decryptData, hashData } from '../../security/encryption.js';

class OfflineProcessor {
  constructor(config = {}) {
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;
    
    // In a real implementation, this would connect to a database
    // For this example, we'll use an in-memory store
    this.pendingTransactions = new Map();
    this.processedTransactions = new Map();
  }

  /**
   * Process USSD payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async processUSSDPayment(paymentData) {
    try {
      const { amount, currency, customer, metadata = {} } = paymentData;
      
      // Generate transaction ID
      const transactionId = uuidv4();
      
      // Generate USSD code
      const ussdCode = this.generateUSSDCode(amount, currency, transactionId);
      
      // Store pending transaction
      const pendingTransaction = {
        id: transactionId,
        amount,
        currency,
        customer,
        metadata,
        ussdCode,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes expiry
      };
      
      this.pendingTransactions.set(transactionId, pendingTransaction);
      
      return {
        success: true,
        transactionId,
        ussdCode,
        instructions: `Dial ${ussdCode} on your phone to complete the payment of ${amount} ${currency}`,
        expiresAt: pendingTransaction.expiresAt
      };
    } catch (error) {
      console.error('Process USSD payment error:', error);
      return {
        success: false,
        error: 'USSD_PROCESSING_ERROR',
        message: error.message || 'Failed to process USSD payment'
      };
    }
  }

  /**
   * Process SMS payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async processSMSPayment(paymentData) {
    try {
      const { amount, currency, customer, metadata = {} } = paymentData;
      
      // Generate transaction ID
      const transactionId = uuidv4();
      
      // Generate SMS code
      const smsCode = this.generateSMSCode(transactionId);
      
      // Generate SMS message
      const smsMessage = `Send ${smsCode} to 12345 to pay ${amount} ${currency}`;
      
      // Store pending transaction
      const pendingTransaction = {
        id: transactionId,
        amount,
        currency,
        customer,
        metadata,
        smsCode,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes expiry
      };
      
      this.pendingTransactions.set(transactionId, pendingTransaction);
      
      return {
        success: true,
        transactionId,
        smsCode,
        smsMessage,
        instructions: smsMessage,
        expiresAt: pendingTransaction.expiresAt
      };
    } catch (error) {
      console.error('Process SMS payment error:', error);
      return {
        success: false,
        error: 'SMS_PROCESSING_ERROR',
        message: error.message || 'Failed to process SMS payment'
      };
    }
  }

  /**
   * Process offline QR code payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result with QR code data
   */
  async processOfflineQR(paymentData) {
    try {
      const { amount, currency, customer, metadata = {} } = paymentData;
      
      // Generate transaction ID
      const transactionId = uuidv4();
      
      // Create payload for QR code
      const qrPayload = {
        id: transactionId,
        amount,
        currency,
        merchant: metadata.merchantId || 'UNKNOWN',
        timestamp: Date.now()
      };
      
      // Sign payload
      const signature = this.signPayload(qrPayload);
      
      // Create final QR data
      const qrData = {
        ...qrPayload,
        signature
      };
      
      // Encode QR data
      const qrContent = encryptData(qrData);
      
      // Store pending transaction
      const pendingTransaction = {
        id: transactionId,
        amount,
        currency,
        customer,
        metadata,
        qrContent,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour expiry
      };
      
      this.pendingTransactions.set(transactionId, pendingTransaction);
      
      return {
        success: true,
        transactionId,
        qrContent,
        instructions: 'Scan this QR code with your mobile app to complete the payment offline',
        expiresAt: pendingTransaction.expiresAt
      };
    } catch (error) {
      console.error('Process offline QR error:', error);
      return {
        success: false,
        error: 'OFFLINE_QR_ERROR',
        message: error.message || 'Failed to process offline QR payment'
      };
    }
  }

  /**
   * Sync offline transactions
   * 
   * @param {Array<Object>} offlineTransactions - Offline transactions to sync
   * @returns {Promise<Object>} Sync result
   */
  async syncOfflineTransactions(offlineTransactions) {
    try {
      if (!Array.isArray(offlineTransactions) || offlineTransactions.length === 0) {
        return {
          success: false,
          error: 'INVALID_TRANSACTIONS',
          message: 'No valid transactions to sync'
        };
      }
      
      const results = {
        success: true,
        total: offlineTransactions.length,
        processed: 0,
        failed: 0,
        transactions: []
      };
      
      // Process each transaction
      for (const transaction of offlineTransactions) {
        try {
          // Verify transaction
          const isValid = this.verifyOfflineTransaction(transaction);
          
          if (!isValid) {
            results.failed++;
            results.transactions.push({
              id: transaction.id,
              success: false,
              error: 'INVALID_TRANSACTION',
              message: 'Transaction verification failed'
            });
            continue;
          }
          
          // Check for duplicates
          if (this.processedTransactions.has(transaction.id)) {
            results.processed++;
            results.transactions.push({
              id: transaction.id,
              success: true,
              status: 'already_processed',
              message: 'Transaction already processed'
            });
            continue;
          }
          
          // Process transaction
          this.processedTransactions.set(transaction.id, {
            ...transaction,
            syncedAt: new Date().toISOString()
          });
          
          results.processed++;
          results.transactions.push({
            id: transaction.id,
            success: true,
            status: 'processed',
            message: 'Transaction processed successfully'
          });
        } catch (error) {
          console.error('Sync transaction error:', error);
          results.failed++;
          results.transactions.push({
            id: transaction.id || 'unknown',
            success: false,
            error: 'PROCESSING_ERROR',
            message: error.message || 'Failed to process transaction'
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Sync offline transactions error:', error);
      return {
        success: false,
        error: 'SYNC_ERROR',
        message: error.message || 'Failed to sync offline transactions'
      };
    }
  }

  /**
   * Verify offline transaction
   * 
   * @private
   * @param {Object} transaction - Transaction to verify
   * @returns {boolean} Whether the transaction is valid
   */
  verifyOfflineTransaction(transaction) {
    try {
      // Check required fields
      if (!transaction.id || !transaction.amount || !transaction.currency || !transaction.signature) {
        return false;
      }
      
      // Verify signature
      const payload = {
        id: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        merchant: transaction.merchant,
        timestamp: transaction.timestamp
      };
      
      const expectedSignature = this.signPayload(payload);
      
      return transaction.signature === expectedSignature;
    } catch (error) {
      console.error('Verify offline transaction error:', error);
      return false;
    }
  }

  /**
   * Generate USSD code
   * 
   * @private
   * @param {number} amount - Payment amount
   * @param {string} currency - Payment currency
   * @param {string} transactionId - Transaction ID
   * @returns {string} USSD code
   */
  generateUSSDCode(amount, currency, transactionId) {
    // In a real implementation, this would generate a valid USSD code
    // For this example, we'll create a simple code
    const shortId = transactionId.substring(0, 8);
    return `*123*${amount}*${shortId}#`;
  }

  /**
   * Generate SMS code
   * 
   * @private
   * @param {string} transactionId - Transaction ID
   * @returns {string} SMS code
   */
  generateSMSCode(transactionId) {
    // Generate a short, memorable code
    return `PAY${transactionId.substring(0, 6).toUpperCase()}`;
  }

  /**
   * Sign payload for offline verification
   * 
   * @private
   * @param {Object} payload - Payload to sign
   * @returns {string} Signature
   */
  signPayload(payload) {
    // In a real implementation, this would use a proper signing algorithm
    // For this example, we'll use a simple hash
    const payloadString = JSON.stringify(payload);
    return hashData(payloadString, this.apiKey || 'sunny-default-key');
  }

  /**
   * Check transaction status
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(transactionId) {
    try {
      // Check if transaction is processed
      if (this.processedTransactions.has(transactionId)) {
        const transaction = this.processedTransactions.get(transactionId);
        return {
          success: true,
          transactionId,
          status: 'completed',
          amount: transaction.amount,
          currency: transaction.currency,
          processedAt: transaction.syncedAt
        };
      }
      
      // Check if transaction is pending
      if (this.pendingTransactions.has(transactionId)) {
        const transaction = this.pendingTransactions.get(transactionId);
        
        // Check if expired
        if (new Date() > new Date(transaction.expiresAt)) {
          return {
            success: true,
            transactionId,
            status: 'expired',
            amount: transaction.amount,
            currency: transaction.currency,
            expiresAt: transaction.expiresAt
          };
        }
        
        return {
          success: true,
          transactionId,
          status: 'pending',
          amount: transaction.amount,
          currency: transaction.currency,
          expiresAt: transaction.expiresAt
        };
      }
      
      // Transaction not found
      return {
        success: false,
        error: 'TRANSACTION_NOT_FOUND',
        message: 'Transaction not found'
      };
    } catch (error) {
      console.error('Check transaction status error:', error);
      return {
        success: false,
        error: 'STATUS_CHECK_ERROR',
        message: error.message || 'Failed to check transaction status'
      };
    }
  }
}

export default OfflineProcessor;