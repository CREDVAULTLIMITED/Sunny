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
   * Get transactions with pagination and filtering
   * 
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status
   * @param {string} params.type - Filter by transaction type
   * @param {string} params.startDate - Filter by start date (ISO string)
   * @param {string} params.endDate - Filter by end date (ISO string)
   * @returns {Promise<Object>} Transactions data with pagination info
   */
  async getTransactions(params = {}) {
    this._validateInitialized();
    
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 10,
      ...(params.status && params.status !== 'all' && { status: params.status }),
      ...(params.type && params.type !== 'all' && { type: params.type }),
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate })
    }).toString();
    
    try {
      const response = await this._makeApiRequest(`/transactions?${queryParams}`, 'GET');
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch transactions');
    }
  }

  /**
   * Get detailed information for a specific transaction
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction details
   */
  async getTransactionDetails(transactionId) {
    this._validateInitialized();
    
    if (!transactionId) {
      throw new Error('Transaction ID is required');
    }
    
    try {
      const response = await this._makeApiRequest(`/transactions/${transactionId}`, 'GET');
      return response;
    } catch (error) {
      throw this._handleError(error, 'Failed to fetch transaction details');
    }
  }

  /**
   * Export transactions as CSV
   * 
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status
   * @param {string} params.type - Filter by transaction type
   * @param {string} params.startDate - Filter by start date (ISO string)
   * @param {string} params.endDate - Filter by end date (ISO string)
   * @returns {Promise<Blob>} CSV data as blob
   */
  async exportTransactions(params = {}) {
    this._validateInitialized();
    
    const queryParams = new URLSearchParams({
      format: 'csv',
      ...(params.status && params.status !== 'all' && { status: params.status }),
      ...(params.type && params.type !== 'all' && { type: params.type }),
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate })
    }).toString();
    
    try {
      // For CSV export, we need to handle the response as a blob
      const blob = await this._makeApiRequest(`/transactions/export?${queryParams}`, 'GET', null, true);
      return blob;
    } catch (error) {
      throw this._handleError(error, 'Failed to export transactions');
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
   * @param {boolean} [asBlob=false] - Whether to return response as Blob
   * @returns {Promise<Object|Blob>} Response data
   * @private
   */
  async _makeApiRequest(endpoint, method, data = null, asBlob = false) {
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) })
    };

    try {
      // For sandbox mode, check if we should use simulated responses
      if (this.environment === 'sandbox' && !this.options.useRealSandboxApi) {
        return await this._simulateResponse(endpoint, method, data, asBlob);
      }

      // Make real API request
      const response = await fetch(`${this.apiUrl}${endpoint}`, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }
      
      if (asBlob) {
        return await response.blob();
      }
      
      return await response.json();
    } catch (error) {
      throw this._handleError(error, `API request failed: ${method} ${endpoint}`);
    }
  }

  /**
   * Simulate API response for sandbox mode
   * 
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method
   * @param {Object} data - Request data
   * @param {boolean} asBlob - Whether to return response as blob
   * @returns {Promise<Object|Blob>} Simulated response
   * @private
   */
  async _simulateResponse(endpoint, method, data, asBlob) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.warn('Using simulated API response for', method, endpoint);
    
    // Handle specific endpoints
    switch (`${method} ${endpoint}`) {
      case 'POST /payments':
        return this._simulatePaymentResponse(data);
        
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
        
      // Handle transaction endpoints in a centralized way
      default:
        if (endpoint.startsWith('/transactions')) {
          return this._simulateTransactionResponse(endpoint, method, data, asBlob);
        }
        
        throw new Error(`Unsupported API endpoint: ${method} ${endpoint}`);
    }
  }
  
  /**
   * Simulate transaction responses
   * 
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method 
   * @param {Object} data - Request data
   * @param {boolean} asBlob - Whether to return response as blob
   * @returns {Promise<Object|Blob>} Simulated response
   * @private
   */
  _simulateTransactionResponse(endpoint, method, data, asBlob) {
    // Parse query parameters for list endpoints
    let page = 1;
    let limit = 10;
    let status = null;
    let type = null;
    
    if (endpoint.includes('?')) {
      const [, queryString] = endpoint.split('?');
      const params = new URLSearchParams(queryString);
      page = parseInt(params.get('page') || '1');
      limit = parseInt(params.get('limit') || '10');
      status = params.get('status');
      type = params.get('type');
    }
    
    // Handle transaction export endpoint
    if (endpoint.startsWith('/transactions/export') && asBlob) {
      const csvHeader = 'id,reference,date,amount,currency,paymentMethod,status,type\n';
      const csvRows = Array(20).fill(0).map((_, i) => {
        const id = `TXN-${i + 1}`;
        const reference = `REF-${Date.now()}-${i}`;
        const date = new Date(Date.now() - i * 86400000).toISOString();
        const amount = (Math.random() * 1000).toFixed(2);
        const currency = ['USD', 'EUR', 'GBP'][Math.floor(Math.random() * 3)];
        const paymentMethod = ['card', 'bank_transfer', 'crypto'][Math.floor(Math.random() * 3)];
        const txnStatus = ['completed', 'pending', 'failed'][Math.floor(Math.random() * 3)];
        const txnType = ['payment', 'refund', 'chargeback'][Math.floor(Math.random() * 3)];
        return `${id},${reference},${date},${amount},${currency},${paymentMethod},${txnStatus},${txnType}`;
      }).join('\n');
      
      return new Blob([csvHeader + csvRows], { type: 'text/csv' });
    }
    
    // Handle transaction details endpoint
    if (endpoint.match(/\/transactions\/[A-Za-z0-9-]+$/)) {
      const transactionId = endpoint.split('/').pop();
      return {
        id: transactionId,
        reference: `REF-${Date.now()}`,
        date: new Date().toISOString(),
        amount: (Math.random() * 1000).toFixed(2),
        currency: 'USD',
        paymentMethod: 'card',
        status: 'completed',
        type: 'payment',
        customer: {
          id: 'cust_123456',
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        metadata: {
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0',
          notes: 'Example transaction'
        }
      };
    }
    
    // Handle transactions list endpoint
    const transactions = Array(limit).fill(0).map((_, i) => {
      const txnStatus = ['completed', 'pending', 'failed'][Math.floor(Math.random() * 3)];
      const txnType = ['payment', 'refund', 'chargeback'][Math.floor(Math.random() * 3)];
      
      // Apply filters if provided
      if ((status && txnStatus !== status) || (type && txnType !== type)) {
        return null;
      }
      
      const id = `TXN-${(page - 1) * limit + i + 1}`;
      return {
        id,
        reference: `REF-${Date.now()}-${i}`,
        date: new Date(Date.now() - i * 86400000).toISOString(),
        amount: (Math.random() * 1000).toFixed(2),
        currency: ['USD', 'EUR', 'GBP'][Math.floor(Math.random() * 3)],
        paymentMethod: ['card', 'bank_transfer', 'crypto'][Math.floor(Math.random() * 3)],
        status: txnStatus,
        type: txnType
      };
    }).filter(Boolean);
    
    return {
      transactions,
      totalCount: 100,
      totalPages: Math.ceil(100 / limit),
      currentPage: page,
      limit
    };
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