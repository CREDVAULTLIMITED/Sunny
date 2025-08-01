/**
 * Sunny Payment Gateway - API Client
 * 
 * Provides a client for interacting with the Sunny API
 */

import axios from 'axios';
import crypto from 'crypto';

class SunnyAPI {
  /**
   * Create a new Sunny API client
   * 
   * @param {Object} config - API configuration
   * @param {string} config.apiKey - Your API key
   * @param {string} config.apiSecret - Your API secret
   * @param {string} config.environment - 'sandbox' or 'production'
   * @param {number} config.timeout - Request timeout in milliseconds
   */
  constructor(config = {}) {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.environment = config.environment || 'sandbox';
    this.timeout = config.timeout || 30000;
    
    // Set base URL based on environment
    this.baseUrl = this.environment === 'production'
      ? 'https://api.sunnypayments.com/v2'
      : 'https://sandbox.sunnypayments.com/v2';
    
    // Create axios instance
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Sunny/NodeJS/1.0.0'
      }
    });
    
    // Add request interceptor for logging
    this.client.interceptors.request.use(request => {
      // Remove sensitive data from logs
      const sanitizedRequest = { ...request };
      if (sanitizedRequest.headers && sanitizedRequest.headers.Authorization) {
        sanitizedRequest.headers.Authorization = 'Bearer [REDACTED]';
      }
      if (sanitizedRequest.data && sanitizedRequest.data.card) {
        sanitizedRequest.data.card = { ...sanitizedRequest.data.card, number: '[REDACTED]', cvc: '[REDACTED]' };
      }
      
      console.log('API Request:', {
        method: sanitizedRequest.method,
        url: sanitizedRequest.url,
        headers: sanitizedRequest.headers,
        data: sanitizedRequest.data
      });
      
      return request;
    });
    
    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => {
        console.log('API Response:', {
          status: response.status,
          data: response.data
        });
        return response;
      },
      error => {
        console.error('API Error:', {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : null
        });
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Create a payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Payment result
   */
  async createPayment(paymentData) {
    try {
      const response = await this.client.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Retrieve a payment
   * 
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object>} Payment details
   */
  async getPayment(paymentId) {
    try {
      const response = await this.client.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * List payments
   * 
   * @param {Object} options - Query options
   * @param {number} options.limit - Number of payments to return
   * @param {string} options.startingAfter - Cursor for pagination
   * @param {string} options.endingBefore - Cursor for pagination
   * @returns {Promise<Object>} List of payments
   */
  async listPayments(options = {}) {
    try {
      const response = await this.client.get('/payments', { params: options });
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Create a refund
   * 
   * @param {Object} refundData - Refund information
   * @returns {Promise<Object>} Refund result
   */
  async createRefund(refundData) {
    try {
      const response = await this.client.post('/refunds', refundData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Create a customer
   * 
   * @param {Object} customerData - Customer information
   * @returns {Promise<Object>} Customer result
   */
  async createCustomer(customerData) {
    try {
      const response = await this.client.post('/customers', customerData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Create a subscription
   * 
   * @param {Object} subscriptionData - Subscription information
   * @returns {Promise<Object>} Subscription result
   */
  async createSubscription(subscriptionData) {
    try {
      const response = await this.client.post('/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Register a network
   * 
   * @param {Object} networkData - Network information
   * @returns {Promise<Object>} Registration result
   */
  async registerNetwork(networkData) {
    try {
      const response = await this.client.post('/networks/register', networkData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }

  /**
   * Create a payment link
   * 
   * @param {Object} paymentLinkData - Payment link information
   * @returns {Promise<Object>} Payment link result
   */
  async createPaymentLink(paymentLinkData) {
    try {
      const response = await this.client.post('/payment_links', paymentLinkData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Create a marketplace payment
   * 
   * @param {Object} marketplaceData - Marketplace payment information
   * @returns {Promise<Object>} Marketplace payment result
   */
  async createMarketplacePayment(marketplaceData) {
    try {
      const response = await this.client.post('/marketplace/payments', marketplaceData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Register a webhook
   * 
   * @param {Object} webhookData - Webhook information
   * @returns {Promise<Object>} Webhook result
   */
  async registerWebhook(webhookData) {
    try {
      const response = await this.client.post('/webhooks', webhookData);
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Get account balance
   * 
   * @returns {Promise<Object>} Balance information
   */
  async getBalance() {
    try {
      const response = await this.client.get('/balance');
      return response.data;
    } catch (error) {
      this._handleApiError(error);
    }
  }
  
  /**
   * Verify a webhook signature
   * 
   * @param {string|Object} payload - Webhook payload
   * @param {string} signature - Signature from Sunny-Signature header
   * @returns {boolean} Whether the signature is valid
   */
  verifyWebhook(payload, signature) {
    const payloadString = typeof payload === 'string' 
      ? payload 
      : JSON.stringify(payload);
    
    const expectedSignature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(payloadString)
      .digest('hex');
    
    return signature === expectedSignature;
  }
  
  /**
   * Handle API errors
   * 
   * @private
   * @param {Error} error - API error
   * @throws {Error} Enhanced error with details
   */
  _handleApiError(error) {
    if (error.response) {
      // The request was made and the server responded with an error status
      const apiError = new Error(error.response.data.error?.message || 'API error');
      apiError.status = error.response.status;
      apiError.code = error.response.data.error?.code;
      apiError.type = error.response.data.error?.type;
      apiError.param = error.response.data.error?.param;
      throw apiError;
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from API');
    } else {
      // Something happened in setting up the request
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}

export default SunnyAPI;