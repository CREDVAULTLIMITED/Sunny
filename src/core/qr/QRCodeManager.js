/**
 * QRCodeManager.js
 * 
 * Handles generation and processing of QR code payments
 */

import { QR_CODE_TYPES, PAYMENT_STATUS, ERROR_CODES } from '../constants.js';
import { logTransaction, logError } from '../transactionLogger.js';

class QRCodeManager {
  constructor() {
    // QR code data store (in a real app, this would be a database)
    this.qrCodes = new Map();
    
    // Transaction status cache
    this.transactionStatus = new Map();
  }

  /**
   * Generate a payment QR code
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} QR code data
   */
  async generatePaymentQR(paymentDetails) {
    try {
      // Validate payment details
      this._validatePaymentDetails(paymentDetails);
      
      // Determine QR code type
      const qrType = paymentDetails.qrType || QR_CODE_TYPES.DYNAMIC;
      
      // Generate QR code ID
      const qrId = `QR-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Create QR code data
      const qrData = {
        id: qrId,
        type: qrType,
        amount: qrType === QR_CODE_TYPES.DYNAMIC ? paymentDetails.amount : null,
        currency: qrType === QR_CODE_TYPES.DYNAMIC ? paymentDetails.currency : null,
        merchantId: paymentDetails.merchantId || paymentDetails.recipientId,
        transactionId: paymentDetails.transactionId,
        createdAt: new Date(),
        expiresAt: qrType === QR_CODE_TYPES.DYNAMIC ? 
          new Date(Date.now() + 30 * 60 * 1000) : null, // 30 minutes for dynamic QR
        metadata: paymentDetails.metadata || {}
      };
      
      // Generate QR code content
      const qrContent = this._generateQRContent(qrData);
      
      // Store QR code data
      this.qrCodes.set(qrId, {
        ...qrData,
        content: qrContent
      });
      
      // Log QR code generation
      logTransaction('QR_CODE_GENERATED', {
        qrId,
        type: qrType,
        merchantId: qrData.merchantId,
        amount: qrData.amount,
        currency: qrData.currency
      });
      
      // Return QR code data
      return {
        success: true,
        qrId,
        qrContent,
        qrType,
        amount: qrData.amount,
        currency: qrData.currency,
        expiresAt: qrData.expiresAt
      };
    } catch (error) {
      // Log error
      logError('QR_CODE_GENERATION_ERROR', error, paymentDetails);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.PAYMENT_METHOD_ERROR
      };
    }
  }

  /**
   * Process a payment from a QR code scan
   * 
   * @param {Object} scanDetails - QR code scan details
   * @returns {Promise<Object>} Processing result
   */
  async processPayment(scanDetails) {
    try {
      // Validate scan details
      if (!scanDetails.qrContent) {
        throw new Error('QR code content is required');
      }
      
      // Parse QR content
      const qrData = this._parseQRContent(scanDetails.qrContent);
      
      // Get QR code from store
      const storedQR = this.qrCodes.get(qrData.id);
      
      if (!storedQR) {
        throw new Error('Invalid or expired QR code');
      }
      
      // Check if QR code has expired (for dynamic QR codes)
      if (storedQR.type === QR_CODE_TYPES.DYNAMIC && 
          storedQR.expiresAt && new Date() > storedQR.expiresAt) {
        throw new Error('QR code has expired');
      }
      
      // Log payment initiation
      logTransaction('QR_PAYMENT_INITIATED', {
        qrId: qrData.id,
        type: storedQR.type,
        amount: storedQR.amount || scanDetails.amount,
        currency: storedQR.currency || scanDetails.currency,
        merchantId: storedQR.merchantId
      });
      
      // For dynamic QR codes, amount is fixed
      const amount = storedQR.type === QR_CODE_TYPES.DYNAMIC ? 
        storedQR.amount : scanDetails.amount;
      
      const currency = storedQR.type === QR_CODE_TYPES.DYNAMIC ? 
        storedQR.currency : scanDetails.currency;
      
      // Validate amount for static QR codes
      if (storedQR.type === QR_CODE_TYPES.STATIC && !amount) {
        throw new Error('Amount is required for static QR code payments');
      }
      
      // Validate currency for static QR codes
      if (storedQR.type === QR_CODE_TYPES.STATIC && !currency) {
        throw new Error('Currency is required for static QR code payments');
      }
      
      // Generate transaction ID
      const transactionId = storedQR.transactionId || 
        `QR-TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success (95% success rate for demo)
      const success = Math.random() < 0.95;
      
      if (success) {
        // Create transaction result
        const result = {
          success: true,
          message: 'QR code payment processed successfully',
          transactionId,
          processorReference: `QR-REF-${Math.floor(Math.random() * 1000000)}`,
          qrId: qrData.id,
          qrType: storedQR.type,
          merchantId: storedQR.merchantId,
          amount,
          currency,
          timestamp: new Date()
        };
        
        // Store transaction status
        this.transactionStatus.set(transactionId, {
          status: PAYMENT_STATUS.COMPLETED,
          timestamp: new Date(),
          details: result
        });
        
        // Log successful payment
        logTransaction('QR_PAYMENT_COMPLETED', result);
        
        return result;
      } else {
        // Simulate various error scenarios
        const errorCodes = [
          ERROR_CODES.PAYMENT_METHOD_ERROR,
          ERROR_CODES.INSUFFICIENT_FUNDS,
          ERROR_CODES.TIMEOUT_ERROR
        ];
        
        const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        const errorMessage = this._getErrorMessage(errorCode);
        
        // Create error result
        const result = {
          success: false,
          message: errorMessage,
          errorCode,
          transactionId,
          qrId: qrData.id,
          qrType: storedQR.type,
          retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
        };
        
        // Store transaction status
        this.transactionStatus.set(transactionId, {
          status: PAYMENT_STATUS.FAILED,
          timestamp: new Date(),
          details: result
        });
        
        // Log failed payment
        logError('QR_PAYMENT_FAILED', new Error(errorMessage), {
          qrId: qrData.id,
          errorCode
        });
        
        return result;
      }
    } catch (error) {
      // Log error
      logError('QR_PAYMENT_ERROR', error, scanDetails);
      
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
   * Check the status of a QR code transaction
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(transactionId) {
    try {
      // Check local cache
      if (this.transactionStatus.has(transactionId)) {
        return this.transactionStatus.get(transactionId);
      }
      
      // If not in cache, simulate a status check
      // In a real implementation, this would check a database
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate status (80% completed, 15% pending, 5% failed)
      const random = Math.random();
      let status;
      
      if (random < 0.8) {
        status = PAYMENT_STATUS.COMPLETED;
      } else if (random < 0.95) {
        status = PAYMENT_STATUS.PENDING;
      } else {
        status = PAYMENT_STATUS.FAILED;
      }
      
      const result = {
        status,
        timestamp: new Date(),
        details: {
          transactionId,
          processorReference: `QR-REF-${Math.floor(Math.random() * 1000000)}`
        }
      };
      
      // Update cache
      this.transactionStatus.set(transactionId, result);
      
      return result;
    } catch (error) {
      logError('QR_STATUS_CHECK_ERROR', error, { transactionId });
      
      return {
        status: PAYMENT_STATUS.PENDING,
        message: 'Unable to determine transaction status',
        error: error.message
      };
    }
  }

  /**
   * Validate payment details for QR code generation
   * 
   * @param {Object} paymentDetails - Payment details to validate
   * @private
   */
  _validatePaymentDetails(paymentDetails) {
    // Check recipient
    if (!paymentDetails.merchantId && !paymentDetails.recipientId) {
      throw new Error('Merchant ID or recipient ID is required');
    }
    
    // Check QR type
    const qrType = paymentDetails.qrType || QR_CODE_TYPES.DYNAMIC;
    
    // For dynamic QR codes, amount and currency are required
    if (qrType === QR_CODE_TYPES.DYNAMIC) {
      if (!paymentDetails.amount) {
        throw new Error('Amount is required for dynamic QR codes');
      }
      
      if (!paymentDetails.currency) {
        throw new Error('Currency is required for dynamic QR codes');
      }
    }
  }

  /**
   * Generate QR code content
   * 
   * @param {Object} qrData - QR code data
   * @returns {string} QR code content
   * @private
   */
  _generateQRContent(qrData) {
    // In a real implementation, this would generate a properly formatted QR code payload
    // For now, we'll create a simple JSON string with a prefix
    
    const payload = {
      v: 1, // version
      id: qrData.id,
      t: qrData.type,
      m: qrData.merchantId
    };
    
    // Add amount and currency for dynamic QR codes
    if (qrData.type === QR_CODE_TYPES.DYNAMIC) {
      payload.a = qrData.amount;
      payload.c = qrData.currency;
    }
    
    // Add transaction ID if available
    if (qrData.transactionId) {
      payload.tx = qrData.transactionId;
    }
    
    // Add timestamp
    payload.ts = Date.now();
    
    // In a real implementation, we would sign this payload for security
    // payload.sig = sign(payload, privateKey);
    
    // Return as a URL-safe string with Sunny prefix
    return `sunny://pay/${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
  }

  /**
   * Parse QR code content
   * 
   * @param {string} qrContent - QR code content
   * @returns {Object} Parsed QR data
   * @private
   */
  _parseQRContent(qrContent) {
    // Check if this is a Sunny QR code
    if (!qrContent.startsWith('sunny://pay/')) {
      throw new Error('Invalid QR code format');
    }
    
    try {
      // Extract payload
      const base64Payload = qrContent.replace('sunny://pay/', '');
      const jsonPayload = Buffer.from(base64Payload, 'base64').toString();
      const payload = JSON.parse(jsonPayload);
      
      // Validate payload
      if (!payload.id || !payload.t || !payload.m) {
        throw new Error('Invalid QR code data');
      }
      
      // In a real implementation, we would verify the signature
      // if (!verify(payload, payload.sig, publicKey)) {
      //   throw new Error('Invalid QR code signature');
      // }
      
      // Return parsed data
      return {
        id: payload.id,
        type: payload.t,
        merchantId: payload.m,
        amount: payload.a,
        currency: payload.c,
        transactionId: payload.tx,
        timestamp: payload.ts
      };
    } catch (error) {
      throw new Error(`Failed to parse QR code: ${error.message}`);
    }
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
      case ERROR_CODES.PAYMENT_METHOD_ERROR:
        return 'QR code payment failed';
        
      case ERROR_CODES.INSUFFICIENT_FUNDS:
        return 'Insufficient funds for payment';
        
      case ERROR_CODES.TIMEOUT_ERROR:
        return 'QR code payment request timed out';
        
      default:
        return 'An error occurred while processing QR code payment';
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

export default QRCodeManager;