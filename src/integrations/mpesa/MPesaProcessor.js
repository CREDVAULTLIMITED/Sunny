/**
 * M-Pesa Payment Processor for Sunny Payment Gateway
 * Handles mobile money payments via M-Pesa in Kenya and other supported countries
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';
import { logTransaction } from '../../core/transactionLogger.js';

class MPesaProcessor {
  constructor(config = {}) {
    // Initialize M-Pesa configuration
    this.consumerKey = config.consumerKey || process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = config.consumerSecret || process.env.MPESA_CONSUMER_SECRET;
    this.shortCode = config.shortCode || process.env.MPESA_SHORT_CODE;
    this.passKey = config.passKey || process.env.MPESA_PASS_KEY;
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.callbackUrl = config.callbackUrl || process.env.MPESA_CALLBACK_URL || 'https://api.sunnypayments.com/api/callbacks/mpesa';
    
    // Validate required configuration
    if (!this.consumerKey || !this.consumerSecret || !this.shortCode || !this.passKey) {
      throw new Error('Missing required M-Pesa configuration');
    }
    
    // Set API URL based on environment
    this.apiUrl = this.environment === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';
  }
  
  /**
   * Get M-Pesa OAuth token
   * 
   * @private
   * @returns {Promise<string>} OAuth token
   */
  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      
      const response = await axios({
        method: 'get',
        url: `${this.apiUrl}/oauth/v1/generate?grant_type=client_credentials`,
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      
      return response.data.access_token;
    } catch (error) {
      console.error('M-Pesa authentication error:', error.response?.data || error);
      throw new Error('Failed to authenticate with M-Pesa');
    }
  }
  
  /**
   * Generate timestamp in the format required by M-Pesa
   * 
   * @private
   * @returns {string} Timestamp in YYYYMMDDHHmmss format
   */
  generateTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  
  /**
   * Generate password for M-Pesa API
   * 
   * @private
   * @param {string} timestamp - Timestamp in YYYYMMDDHHmmss format
   * @returns {string} Base64 encoded password
   */
  generatePassword(timestamp) {
    const password = Buffer.from(`${this.shortCode}${this.passKey}${timestamp}`).toString('base64');
    return password;
  }
  
  /**
   * Process M-Pesa STK Push payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async initiateSTKPush(paymentData) {
    try {
      const { amount, phoneNumber, accountReference, description, transactionId } = paymentData;
      
      // Validate phone number format (should be in format 254XXXXXXXXX)
      if (!phoneNumber.match(/^254\d{9}$/)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid phone number format. Should be in format 254XXXXXXXXX'
        };
      }
      
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);
      
      // Log the initiation of STK Push
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: 'mobile_money',
        amount: amount,
        currency: 'KES', // M-Pesa primarily uses KES
        metadata: {
          phoneNumber,
          processor: 'MPesa',
          processStep: 'STK_PUSH_INITIATED'
        }
      });
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/mpesa/stkpush/v1/processrequest`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          BusinessShortCode: this.shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: Math.round(parseFloat(amount)),
          PartyA: phoneNumber,
          PartyB: this.shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: `${this.callbackUrl}?transactionId=${transactionId}`,
          AccountReference: accountReference || `Sunny-${transactionId.substring(0, 8)}`,
          TransactionDesc: description || 'Payment via Sunny Gateway'
        }
      });
      
      if (response.data.ResponseCode === '0') {
        // Update transaction log with checkout request ID
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.PROCESSING,
          paymentMethod: 'mobile_money',
          metadata: {
            checkoutRequestId: response.data.CheckoutRequestID,
            merchantRequestId: response.data.MerchantRequestID,
            processor: 'MPesa',
            processStep: 'STK_PUSH_SENT'
          }
        });
        
        return {
          success: true,
          status: PAYMENT_STATUS.PROCESSING,
          checkoutRequestId: response.data.CheckoutRequestID,
          merchantRequestId: response.data.MerchantRequestID,
          transactionId,
          processorResponse: {
            processorTransactionId: response.data.CheckoutRequestID,
            processorName: 'MPesa'
          },
          message: 'STK Push sent successfully. Awaiting customer confirmation.'
        };
      } else {
        // Log failed STK Push
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.FAILED,
          paymentMethod: 'mobile_money',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            responseCode: response.data.ResponseCode,
            responseDescription: response.data.ResponseDescription,
            processor: 'MPesa',
            processStep: 'STK_PUSH_FAILED'
          }
        });
        
        return {
          success: false,
          error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          message: `STK Push failed: ${response.data.ResponseDescription}`,
          responseCode: response.data.ResponseCode
        };
      }
    } catch (error) {
      console.error('M-Pesa STK Push error:', error.response?.data || error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId: paymentData.transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'mobile_money',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'MPesa',
            processStep: 'STK_PUSH_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log M-Pesa error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.errorMessage || error.message || 'M-Pesa STK Push failed'
      };
    }
  }
  
  /**
   * Check the status of an STK Push transaction
   * 
   * @param {Object} queryData - Query parameters
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(queryData) {
    try {
      const { checkoutRequestId, merchantRequestId, transactionId } = queryData;
      
      if (!checkoutRequestId || !this.shortCode) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Checkout request ID and short code are required'
        };
      }
      
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/mpesa/stkpushquery/v1/query`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          BusinessShortCode: this.shortCode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId
        }
      });
      
      // Log the status check
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.STATUS_CHECK,
        paymentMethod: 'mobile_money',
        metadata: {
          checkoutRequestId,
          responseCode: response.data.ResponseCode,
          resultCode: response.data.ResultCode,
          resultDesc: response.data.ResultDesc,
          processor: 'MPesa',
          processStep: 'STATUS_CHECK'
        }
      });
      
      // Interpret response codes
      if (response.data.ResponseCode === '0') {
        if (response.data.ResultCode === '0') {
          // Payment successful
          return {
            success: true,
            status: PAYMENT_STATUS.COMPLETED,
            message: response.data.ResultDesc,
            checkoutRequestId
          };
        } else {
          // Payment failed or pending
          const isPending = ['1', '1032', '1037'].includes(response.data.ResultCode);
          
          return {
            success: !isPending,
            status: isPending ? PAYMENT_STATUS.PENDING : PAYMENT_STATUS.FAILED,
            message: response.data.ResultDesc,
            checkoutRequestId,
            resultCode: response.data.ResultCode
          };
        }
      } else {
        return {
          success: false,
          error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          message: `Status check failed: ${response.data.ResponseDescription || response.data.ResultDesc}`,
          responseCode: response.data.ResponseCode
        };
      }
    } catch (error) {
      console.error('M-Pesa status check error:', error.response?.data || error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.errorMessage || error.message || 'M-Pesa status check failed'
      };
    }
  }
  
  /**
   * Process M-Pesa callback
   * 
   * @param {Object} callbackData - Callback data from M-Pesa
   * @param {string} transactionId - Original transaction ID
   * @returns {Promise<Object>} Processed result
   */
  async processCallback(callbackData, transactionId) {
    try {
      if (!callbackData || !callbackData.Body || !callbackData.Body.stkCallback) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid callback data format'
        };
      }
      
      const stkCallback = callbackData.Body.stkCallback;
      const isSuccessful = stkCallback.ResultCode === 0;
      
      // Extract transaction details
      let amount, phoneNumber, mpesaReceiptNumber, transactionDate;
      
      if (isSuccessful && stkCallback.CallbackMetadata && stkCallback.CallbackMetadata.Item) {
        const metadata = stkCallback.CallbackMetadata.Item;
        
        amount = metadata.find(item => item.Name === 'Amount')?.Value;
        phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value;
        mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        transactionDate = metadata.find(item => item.Name === 'TransactionDate')?.Value;
      }
      
      // Log the callback
      await logTransaction({
        transactionId,
        status: isSuccessful ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.FAILED,
        paymentMethod: 'mobile_money',
        errorCode: isSuccessful ? null : ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        metadata: {
          resultCode: stkCallback.ResultCode,
          resultDesc: stkCallback.ResultDesc,
          checkoutRequestId: stkCallback.CheckoutRequestID,
          merchantRequestId: stkCallback.MerchantRequestID,
          mpesaReceiptNumber,
          transactionDate,
          processor: 'MPesa',
          processStep: 'CALLBACK_RECEIVED'
        }
      });
      
      if (isSuccessful) {
        return {
          success: true,
          status: PAYMENT_STATUS.COMPLETED,
          message: stkCallback.ResultDesc,
          transactionId,
          checkoutRequestId: stkCallback.CheckoutRequestID,
          mpesaReceiptNumber,
          amount,
          phoneNumber,
          transactionDate
        };
      } else {
        return {
          success: false,
          status: PAYMENT_STATUS.FAILED,
          message: stkCallback.ResultDesc,
          transactionId,
          checkoutRequestId: stkCallback.CheckoutRequestID,
          resultCode: stkCallback.ResultCode
        };
      }
    } catch (error) {
      console.error('M-Pesa callback processing error:', error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'mobile_money',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'MPesa',
            processStep: 'CALLBACK_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log M-Pesa callback error:', logError);
      }
      
      return {

