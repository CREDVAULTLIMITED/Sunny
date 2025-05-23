/**
 * UPI Payment Processor for Sunny Payment Gateway
 * Handles UPI (Unified Payments Interface) transactions in India
 * 
 * Features:
 * - UPI Collect API (pull payments)
 * - UPI Push payments
 * - VPA validation and processing
 * - Transaction status verification
 * - Callback/webhook handling
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';
import { logTransaction } from '../../core/transactionLogger.js';

// UPI Transaction Types
const UPI_TRANSACTION_TYPES = {
  COLLECT: 'COLLECT', // Pull payment from customer
  PAY: 'PAY',         // Push payment to recipient
  REVERSAL: 'REVERSAL', // Refund or reversal
  STATUS: 'STATUS'    // Check transaction status
};

class UPIProcessor {
  constructor(config = {}) {
    // Initialize UPI configuration
    this.apiKey = config.apiKey || process.env.UPI_API_KEY;
    this.apiSecret = config.apiSecret || process.env.UPI_API_SECRET;
    this.merchantId = config.merchantId || process.env.UPI_MERCHANT_ID;
    this.merchantVpa = config.merchantVpa || process.env.UPI_MERCHANT_VPA; // Merchant's VPA e.g., merchant@bank
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.callbackUrl = config.callbackUrl || process.env.UPI_CALLBACK_URL || 'https://api.sunnypayments.com/api/callbacks/upi';
    
    // Validate required configuration
    if (!this.apiKey || !this.apiSecret || !this.merchantId || !this.merchantVpa) {
      throw new Error('Missing required UPI configuration');
    }
    
    // Set API URL based on environment
    this.apiUrl = this.environment === 'production'
      ? 'https://api.upipayments.com/v1'
      : 'https://sandbox.upipayments.com/v1';
    
    // Set default expiration time for collect requests (in minutes)
    this.expirationMinutes = config.expirationMinutes || 15;
    
    // Set default PSP (Payment Service Provider)
    this.defaultPsp = config.defaultPsp || 'DEFAULT';
  }
  
  /**
   * Generate authentication headers for API requests
   * 
   * @private
   * @param {string} method - HTTP method (GET, POST, etc.)
   * @param {string} endpoint - API endpoint
   * @param {string} [contentHash] - Optional hash of request body
   * @returns {Object} Headers with authentication
   */
  getAuthHeaders(method, endpoint, contentHash = '') {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const payload = `${timestamp}${method}${endpoint}${contentHash}`;
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(payload)
      .digest('hex');
    
    return {
      'X-Api-Key': this.apiKey,
      'X-Api-Timestamp': timestamp,
      'X-Api-Signature': signature,
      'X-Merchant-Id': this.merchantId,
      'Content-Type': 'application/json'
    };
  }
  
  /**
   * Validate a Virtual Payment Address (VPA)
   * 
   * @private
   * @param {string} vpa - Virtual Payment Address to validate
   * @returns {boolean} Whether the VPA is valid
   */
  isValidVpa(vpa) {
    // Basic VPA validation (format: username@psp)
    const vpaRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    return vpaRegex.test(vpa);
  }
  
  /**
   * Get VPA details for validation
   * 
   * @param {string} vpa - Virtual Payment Address
   * @returns {Promise<Object>} VPA details
   */
  async validateVpa(vpa) {
    try {
      if (!this.isValidVpa(vpa)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid VPA format. Should be username@psp'
        };
      }
      
      const endpoint = '/vpa/validate';
      const headers = this.getAuthHeaders('POST', endpoint);
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}${endpoint}`,
        headers,
        data: { vpa }
      });
      
      if (response.data.valid) {
        return {
          success: true,
          vpa,
          accountHolder: response.data.accountHolder,
          bankName: response.data.bankName,
          pspName: response.data.pspName
        };
      } else {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: response.data.message || 'Invalid VPA'
        };
      }
    } catch (error) {
      console.error('VPA validation error:', error.response?.data || error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.message || error.message || 'Failed to validate VPA'
      };
    }
  }
  
  /**
   * Initiate a UPI collect request (pulling money from customer)
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async initiateCollectRequest(paymentData) {
    try {
      const { 
        amount, 
        vpa, 
        transactionId = uuidv4(), 
        description, 
        customerName,
        mobileNumber,
        expirationMinutes = this.expirationMinutes,
        reference = `sunny-${transactionId.substring(0, 8)}`
      } = paymentData;
      
      // Validate VPA format
      if (!this.isValidVpa(vpa)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid VPA format. Should be username@psp'
        };
      }
      
      // Log the initiation of UPI collect request
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: 'upi',
        amount: amount,
        currency: 'INR', // UPI only supports INR
        metadata: {
          vpa,
          transactionType: UPI_TRANSACTION_TYPES.COLLECT,
          processor: 'UPIProcessor',
          processStep: 'COLLECT_INITIATED'
        }
      });
      
      // Calculate expiration time
      const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000).toISOString();
      
      const endpoint = '/collect';
      const requestBody = {
        amount: parseFloat(amount).toFixed(2),
        currency: 'INR',
        vpa,
        payerName: customerName,
        payerVpa: vpa,
        mobileNumber,
        transactionId,
        merchantId: this.merchantId,
        merchantVpa: this.merchantVpa,
        purpose: description || 'Payment via Sunny Gateway',
        reference,
        expiresAt,
        callbackUrl: `${this.callbackUrl}?transactionId=${transactionId}`
      };
      
      const contentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(requestBody))
        .digest('hex');
      
      const headers = this.getAuthHeaders('POST', endpoint, contentHash);
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}${endpoint}`,
        headers,
        data: requestBody
      });
      
      if (response.data.success) {
        // Update transaction log
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.PENDING,
          paymentMethod: 'upi',
          metadata: {
            upiTransactionId: response.data.upiTransactionId,
            requestId: response.data.requestId,
            processor: 'UPIProcessor',
            processStep: 'COLLECT_REQUEST_SENT'
          }
        });
        
        return {
          success: true,
          status: PAYMENT_STATUS.PENDING,
          transactionId,
          upiTransactionId: response.data.upiTransactionId,
          requestId: response.data.requestId,
          vpa,
          amount,
          currency: 'INR',
          expiresAt,
          deepLink: response.data.deepLink, // App deep link for payment
          qrCode: response.data.qrCode,     // QR code for payment
          processorResponse: {
            processorTransactionId: response.data.upiTransactionId,
            processorName: 'UPIProcessor'
          },
          message: 'UPI collect request sent successfully'
        };
      } else {
        // Log failed request
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.FAILED,
          paymentMethod: 'upi',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: response.data.message,
            processor: 'UPIProcessor',
            processStep: 'COLLECT_REQUEST_FAILED'
          }
        });
        
        return {
          success: false,
          error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          message: response.data.message || 'Failed to initiate UPI collect request'
        };
      }
    } catch (error) {
      console.error('UPI collect request error:', error.response?.data || error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId: paymentData.transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'upi',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'UPIProcessor',
            processStep: 'COLLECT_REQUEST_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log UPI error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.message || error.message || 'UPI collect request failed'
      };
    }
  }
  
  /**
   * Initiate a UPI push payment (sending money to recipient)
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async initiatePushPayment(paymentData) {
    try {
      const { 
        amount, 
        recipientVpa, 
        transactionId = uuidv4(), 
        description, 
        recipientName,
        reference = `sunny-${transactionId.substring(0, 8)}`
      } = paymentData;
      
      // Validate recipient VPA format
      if (!this.isValidVpa(recipientVpa)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid recipient VPA format. Should be username@psp'
        };
      }
      
      // Log the initiation of UPI push payment
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: 'upi',
        amount: amount,
        currency: 'INR', // UPI only supports INR
        metadata: {
          recipientVpa,
          transactionType: UPI_TRANSACTION_TYPES.PAY,
          processor: 'UPIProcessor',
          processStep: 'PUSH_PAYMENT_INITIATED'
        }
      });
      
      const endpoint = '/pay';
      const requestBody = {
        amount: parseFloat(amount).toFixed(2),
        currency: 'INR',
        recipientVpa,
        recipientName,
        transactionId,
        merchantId: this.merchantId,
        merchantVpa: this.merchantVpa,
        purpose: description || 'Payment via Sunny Gateway',
        reference,
        callbackUrl: `${this.callbackUrl}?transactionId=${transactionId}`
      };
      
      const contentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(requestBody))
        .digest('hex');
      
      const headers = this.getAuthHeaders('POST', endpoint, contentHash);
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}${endpoint}`,
        headers,
        data: requestBody
      });
      
      if (response.data.success) {
        // Map status from API response
        const statusMapping = {
          'SUCCESS': PAYMENT_STATUS.COMPLETED,
          'PENDING': PAYMENT_STATUS.PROCESSING,
          'FAILED': PAYMENT_STATUS.FAILED
        };
        
        const paymentStatus = statusMapping[response.data.status] || PAYMENT_STATUS.PROCESSING;
        
        // Update transaction log
        await logTransaction({
          transactionId,
          status: paymentStatus,
          paymentMethod: 'upi',
          metadata: {
            upiTransactionId: response.data.upiTransactionId,
            bankReferenceNumber: response.data.bankReferenceNumber,
            processor: 'UPIProcessor',
            processStep: 'PUSH_PAYMENT_SENT'
          }
        });
        
        return {
          success: true,
          status: paymentStatus,
          transactionId,
          upiTransactionId: response.data.upiTransactionId,
          bankReferenceNumber: response.data.bankReferenceNumber,
          recipientVpa,
          amount,
          currency: 'INR',
          processorResponse: {
            processorTransactionId: response.data.upiTransactionId,
            processorName: 'UPIProcessor'
          },
          message: `UPI push payment ${paymentStatus.toLowerCase()}`
        };
      } else {
        // Log failed payment
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.FAILED,
          paymentMethod: 'upi',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: response.data.message,
            processor: 'UPIProcessor',
            processStep: '

