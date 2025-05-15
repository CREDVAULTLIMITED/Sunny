/**
 * SunnySDK.js
 * 
 * Main SDK for integrating with Sunny Payment Gateway
 */

class SunnySDK {
  /**
   * Initialize the SDK
   * 
   * @param {Object} config - SDK configuration
   * @param {string} config.apiKey - API key
   * @param {string} config.environment - Environment (sandbox or production)
   * @param {string} config.merchantId - Merchant ID
   * @param {Object} config.options - Additional options
   */
  constructor(config = {}) {
    // Validate config
    if (!config.apiKey) {
      throw new Error('API key is required');
    }
    
    // Set config
    this.apiKey = config.apiKey;
    this.environment = config.environment || 'sandbox';
    this.merchantId = config.merchantId;
    this.options = config.options || {};
    
    // Set API URL based on environment
    this.apiUrl = this.environment === 'production' 
      ? 'https://api.sunnypayments.com/v1'
      : 'https://sandbox-api.sunnypayments.com/v1';
    
    // Initialize state
    this.initialized = true;
    this.version = '1.0.0';
  }

  /**
   * Create a payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Payment result
   */
  async createPayment(paymentDetails) {
    this._validateInitialized();
    
    // Validate payment details
    if (!paymentDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (!paymentDetails.currency) {
      throw new Error('Currency is required');
    }
    
    if (!paymentDetails.paymentMethod) {
      throw new Error('Payment method is required');
    }
    
    // Add merchant ID if not provided
    if (!paymentDetails.merchantId && this.merchantId) {
      paymentDetails.merchantId = this.merchantId;
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/payments', 'POST', paymentDetails);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to create payment');
    }
  }

  /**
   * Get transaction status
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   */
  async getTransactionStatus(transactionId) {
    this._validateInitialized();
    
    if (!transactionId) {
      throw new Error('Transaction ID is required');
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest(`/transactions/${transactionId}`, 'GET');
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to get transaction status');
    }
  }

  /**
   * Generate a payment link
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Payment link data
   */
  async generatePaymentLink(paymentDetails) {
    this._validateInitialized();
    
    // Validate payment details
    if (!paymentDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (!paymentDetails.currency) {
      throw new Error('Currency is required');
    }
    
    // Add merchant ID if not provided
    if (!paymentDetails.merchantId && this.merchantId) {
      paymentDetails.merchantId = this.merchantId;
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/payment-links', 'POST', paymentDetails);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to generate payment link');
    }
  }

  /**
   * Tokenize a payment method
   * 
   * @param {Object} paymentMethod - Payment method details
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} Tokenization result
   */
  async tokenizePaymentMethod(paymentMethod, customerId) {
    this._validateInitialized();
    
    if (!paymentMethod) {
      throw new Error('Payment method is required');
    }
    
    if (!customerId) {
      throw new Error('Customer ID is required');
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/tokens', 'POST', {
        paymentMethod,
        customerId
      });
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to tokenize payment method');
    }
  }

  /**
   * Process a payment with a tokenized payment method
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Payment result
   */
  async createTokenPayment(paymentDetails) {
    this._validateInitialized();
    
    // Validate payment details
    if (!paymentDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (!paymentDetails.currency) {
      throw new Error('Currency is required');
    }
    
    if (!paymentDetails.token) {
      throw new Error('Token is required');
    }
    
    // Add merchant ID if not provided
    if (!paymentDetails.merchantId && this.merchantId) {
      paymentDetails.merchantId = this.merchantId;
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/token-payments', 'POST', paymentDetails);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to create token payment');
    }
  }

  /**
   * Create a customer
   * 
   * @param {Object} customerData - Customer data
   * @returns {Promise<Object>} Customer data
   */
  async createCustomer(customerData) {
    this._validateInitialized();
    
    if (!customerData.email) {
      throw new Error('Customer email is required');
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/customers', 'POST', customerData);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to create customer');
    }
  }

  /**
   * Create a P2P transfer
   * 
   * @param {Object} transferDetails - Transfer details
   * @returns {Promise<Object>} Transfer result
   */
  async createP2PTransfer(transferDetails) {
    this._validateInitialized();
    
    // Validate transfer details
    if (!transferDetails.senderId) {
      throw new Error('Sender ID is required');
    }
    
    if (!transferDetails.recipientId) {
      throw new Error('Recipient ID is required');
    }
    
    if (!transferDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (!transferDetails.currency) {
      throw new Error('Currency is required');
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/p2p-transfers', 'POST', transferDetails);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to create P2P transfer');
    }
  }

  /**
   * Create a money request
   * 
   * @param {Object} requestDetails - Money request details
   * @returns {Promise<Object>} Request result
   */
  async createMoneyRequest(requestDetails) {
    this._validateInitialized();
    
    // Validate request details
    if (!requestDetails.requesterId) {
      throw new Error('Requester ID is required');
    }
    
    if (!requestDetails.requesteeId) {
      throw new Error('Requestee ID is required');
    }
    
    if (!requestDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (!requestDetails.currency) {
      throw new Error('Currency is required');
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/money-requests', 'POST', requestDetails);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to create money request');
    }
  }

  /**
   * Generate a QR code for payment
   * 
   * @param {Object} qrDetails - QR code details
   * @returns {Promise<Object>} QR code data
   */
  async generateQRCode(qrDetails) {
    this._validateInitialized();
    
    // Validate QR details
    if (!qrDetails.amount && qrDetails.type !== 'STATIC') {
      throw new Error('Amount is required for dynamic QR codes');
    }
    
    if (!qrDetails.currency && qrDetails.type !== 'STATIC') {
      throw new Error('Currency is required for dynamic QR codes');
    }
    
    // Add merchant ID if not provided
    if (!qrDetails.merchantId && this.merchantId) {
      qrDetails.merchantId = this.merchantId;
    }
    
    // Make API request
    try {
      const response = await this._makeApiRequest('/qr-codes', 'POST', qrDetails);
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to generate QR code');
    }
  }

  /**
   * Get SDK version
   * 
   * @returns {string} SDK version
   */
  getVersion() {
    return this.version;
  }

  /**
   * Make an API request
   * 
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method
   * @param {Object} data - Request data
   * @returns {Promise<Object>} Response data
   * @private
   */
  async _makeApiRequest(endpoint, method, data = null) {
    // In a real implementation, this would make an actual HTTP request
    // For now, we'll simulate API responses
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate API response based on endpoint and method
    switch (`${method} ${endpoint}`) {
      case 'POST /payments':
        return this._simulatePaymentResponse(data);
        
      case 'GET /transactions/TXN-1234':
        return {
          success: true,
          status: 'COMPLETED',
          transactionId: 'TXN-1234',
          amount: '100.00',
          currency: 'USD',
          timestamp: new Date().toISOString(),
          paymentMethod: 'CARD'
        };
        
      case 'POST /payment-links':
        return {
          success: true,
          paymentLink: `https://pay.sunnypayments.com/${Math.random().toString(36).substring(2, 15)}`,
          qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
      case 'POST /tokens':
        return {
          success: true,
          token: `tok_${Math.random().toString(36).substring(2, 15)}`,
          last4: data.paymentMethod.cardNumber ? data.paymentMethod.cardNumber.slice(-4) : '1234',
          expiryMonth: data.paymentMethod.expiryMonth || '12',
          expiryYear: data.paymentMethod.expiryYear || '2025',
          cardType: 'visa'
        };
        
      case 'POST /token-payments':
        return {
          success: true,
          transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          amount: data.amount,
          currency: data.currency,
          timestamp: new Date().toISOString(),
          status: 'COMPLETED'
        };
        
      case 'POST /customers':
        return {
          success: true,
          customerId: `cust_${Math.random().toString(36).substring(2, 15)}`,
          email: data.email,
          name: data.name,
          createdAt: new Date().toISOString()
        };
        
      case 'POST /p2p-transfers':
        return {
          success: true,
          transactionId: `P2P-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          senderId: data.senderId,
          recipientId: data.recipientId,
          amount: data.amount,
          currency: data.currency,
          timestamp: new Date().toISOString(),
          status: 'COMPLETED'
        };
        
      case 'POST /money-requests':
        return {
          success: true,
          requestId: `REQ-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          requesterId: data.requesterId,
          requesteeId: data.requesteeId,
          amount: data.amount,
          currency: data.currency,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
        
      case 'POST /qr-codes':
        return {
          success: true,
          qrId: `QR-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          qrContent: `sunny://pay/${Buffer.from(JSON.stringify({
            m: data.merchantId,
            a: data.amount,
            c: data.currency,
            t: data.type || 'DYNAMIC'
          })).toString('base64')}`,
          qrImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
          expiresAt: data.type === 'STATIC' ? null : new Date(Date.now() + 30 * 60 * 1000).toISOString()
        };
        
      default:
        throw new Error(`Unsupported API endpoint: ${method} ${endpoint}`);
    }
  }

  /**
   * Simulate a payment response
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Object} Simulated response
   * @private
   */
  _simulatePaymentResponse(paymentDetails) {
    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'Payment processed successfully',
        transactionId,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        paymentMethod: paymentDetails.paymentMethod,
        status: 'COMPLETED',
        timestamp: new Date().toISOString()
      };
    } else {
      // Simulate various error scenarios
      const errorMessages = [
        'Payment declined by issuer',
        'Insufficient funds',
        'Payment processing failed'
      ];
      
      const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      
      return {
        success: false,
        message: errorMessage,
        transactionId,
        errorCode: 'PAYMENT_FAILED'
      };
    }
  }

  /**
   * Validate that the SDK is initialized
   * 
   * @private
   */
  _validateInitialized() {
    if (!this.initialized) {
      throw new Error('SDK not initialized');
    }
  }

  /**
   * Handle API error
   * 
   * @param {Error} error - Error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   * @private
   */
  _handleError(error, defaultMessage) {
    // Format error message
    const message = error.message || defaultMessage;
    
    // Create error object
    const formattedError = new Error(message);
    formattedError.originalError = error;
    
    return formattedError;
  }
}

export default SunnySDK;