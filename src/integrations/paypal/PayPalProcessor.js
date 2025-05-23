/**
 * PayPal Payment Processor for Sunny Payment Gateway
 * Handles PayPal payments, including PayPal Checkout and Express Checkout
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';

class PayPalProcessor {
  constructor(config = {}) {
    // Initialize PayPal configuration
    this.clientId = config.clientId || process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = config.clientSecret || process.env.PAYPAL_CLIENT_SECRET;
    this.environment = config.environment || process.env.PAYPAL_ENVIRONMENT || 'sandbox';
    
    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal client ID and client secret are required');
    }
    
    this.apiUrl = this.environment === 'production'
      ? 'https://api.paypal.com'
      : 'https://api.sandbox.paypal.com';
  }
  
  /**
   * Get access token for PayPal API
   * 
   * @private
   * @returns {Promise<string>} Access token
   */
  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/v1/oauth2/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        },
        data: 'grant_type=client_credentials'
      });
      
      return response.data.access_token;
    } catch (error) {
      console.error('Failed to get PayPal access token:', error);
      throw new Error('PayPal authentication failed');
    }
  }
  
  /**
   * Create a PayPal payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async createPayment(paymentData) {
    try {
      const { amount, currency, description, returnUrl, cancelUrl, transactionId } = paymentData;
      
      const accessToken = await this.getAccessToken();
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/v2/checkout/orders`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: {
          intent: 'CAPTURE',
          purchase_units: [
            {
              reference_id: transactionId,
              description: description || 'Payment via Sunny Gateway',
              amount: {
                currency_code: currency.toUpperCase(),
                value: amount.toString()
              },
              custom_id: transactionId
            }
          ],
          application_context: {
            brand_name: 'Sunny Payments',
            landing_page: 'BILLING',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: returnUrl || 'https://dashboard.sunnypayments.com/return',
            cancel_url: cancelUrl || 'https://dashboard.sunnypayments.com/cancel'
          }
        }
      });
      
      const paymentLinks = response.data.links.reduce((acc, link) => {
        acc[link.rel] = link.href;
        return acc;
      }, {});
      
      return {
        success: true,
        status: PAYMENT_STATUS.PENDING,
        paymentId: response.data.id,
        approvalUrl: paymentLinks.approve,
        processorResponse: {
          processorTransactionId: response.data.id,
          processorName: 'PayPal'
        },
        requiresRedirect: true,
        redirectUrl: paymentLinks.approve
      };
    } catch (error) {
      console.error('PayPal payment creation error:', error.response?.data || error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.message || error.message || 'PayPal payment creation failed'
      };
    }
  }
  
  /**
   * Capture a previously approved PayPal payment
   * 
   * @param {string} orderId - PayPal order ID
   * @returns {Promise<Object>} Transaction result
   */
  async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/v2/checkout/orders/${orderId}/capture`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (response.data.status === 'COMPLETED') {
        return {
          success: true,
          status: PAYMENT_STATUS.COMPLETED,
          paymentId: response.data.id,
          processorResponse: {
            processorTransactionId: response.data.id,
            captureId: response.data.purchase_units[0].payments.captures[0].id,
            processorName: 'PayPal'
          }
        };
      } else {
        return {
          success: false,
          status: response.data.status,
          message: `Payment capture failed with status: ${response.data.status}`,
          error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR
        };
      }
    } catch (error) {
      console.error('PayPal payment capture error:', error.response?.data || error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.message || error.message || 'PayPal payment capture failed'
      };
    }
  }
  
  /**
   * Process a refund with PayPal
   * 
   * @param {Object} refundData - Refund information
   * @returns {Promise<Object>} Refund result
   */
  async processRefund(refundData) {
    try {
      const { captureId, amount, reason } = refundData;
      
      const accessToken = await this.getAccessToken();
      
      const requestData = {};
      
      if (amount) {
        requestData.amount = {
          value: amount.toString(),
          currency_code: refundData.currency.toUpperCase()
        };
      }
      
      if (reason) {
        requestData.note_to_payer = reason;
      }
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/v2/payments

/**
 * PayPal Payment Processor Integration
 * Handles actual payment processing through PayPal
 */

import axios from 'axios';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants';

class PayPalProcessor {
  constructor(config = {}) {
    this.clientId = config.clientId || process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = config.clientSecret || process.env.PAYPAL_CLIENT_SECRET;
    this.environment = config.environment || process.env.PAYPAL_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production'
      ? 'https://api.paypal.com/v1'
      : 'https://api.sandbox.paypal.com/v1';
    
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Missing PayPal credentials');
    }
  }

  /**
   * Get access token from PayPal
   * @private
   * @returns {Promise<string>} Access token
   */
  async _getAccessToken() {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await axios({
        method: 'post',
        url: `${this.baseUrl}/oauth2/token`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials'
      });

      return response.data.access_token;
    } catch (error) {
      console.error('PayPal authentication error:', error);
      throw new Error('Failed to authenticate with PayPal');
    }
  }

  /**
   * Process a payment through PayPal
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async processPayment(paymentData) {
    try {
      const accessToken = await this._getAccessToken();
      
      // Create order
      const orderResponse = await axios({
        method: 'post',
        url: `${this.baseUrl}/checkout/orders`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: paymentData.currency,
              value: paymentData.amount
            },
            description: paymentData.description || 'Payment via Sunny Gateway',
            custom_id: paymentData.transactionId
          }]
        }
      });

      // For a real implementation, you would return the order ID and approval URL
      // The client would redirect the user to approve the payment
      // Then you would capture the payment after approval
      
      return {
        success: true,
        requiresRedirect: true,
        orderId: orderResponse.data.id,
        approvalUrl: orderResponse.data.links.find(link => link.rel === 'approve').href,
        processorResponse: {
          processorTransactionId: orderResponse.data.id,
          processorName: 'PayPal'
        }
      };
    } catch (error) {
      console.error('PayPal payment processing error:', error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_METHOD_ERROR,
        message: error.response?.data?.message || error.message || 'Payment processing failed'
      };
    }
  }

  /**
   * Capture an approved PayPal payment
   * @param {string} orderId - PayPal order ID
   * @returns {Promise<Object>} Capture result
   */
  async capturePayment(orderId) {
    try {
      const accessToken = await this._getAccessToken();
      
      const captureResponse = await axios({
        method: 'post',
        url: `${this.baseUrl}/checkout/orders/${orderId}/capture`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (captureResponse.data.status === 'COMPLETED') {
        return {
          success: true,
          captureId: captureResponse.data.purchase_units[0].payments.captures[0].id,
          processorResponse: {
            processorTransactionId: orderId,
            processorCaptureId: captureResponse.data.purchase_units[0].payments.captures[0].id,
            processorName: 'PayPal'
          }
        };
      } else {
        return {
          success: false,
          error: ERROR_CODES.PAYMENT_METHOD_ERROR,
          message: `Payment capture failed with status: ${captureResponse.data.status}`
        };
      }
    } catch (error) {
      console.error('PayPal capture error:', error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_METHOD_ERROR,
        message: error.response?.data?.message || error.message || 'Payment capture failed'
      };
    }
  }
}

export default PayPalProcessor;