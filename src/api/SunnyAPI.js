/**
 * SunnyAPI.js
 * 
 * Main API interface for the Sunny Payment Gateway
 * Provides a unified interface for all payment operations
 */

import PaymentOrchestrator from '../core/PaymentOrchestrator';
import IdentityManager from '../core/identity/IdentityManager';
import { PAYMENT_METHODS, PAYMENT_STATUS, ERROR_CODES } from '../core/constants';
import { logTransaction, logError } from '../core/transactionLogger';
import { validatePaymentRequest } from './validation';

class SunnyAPI {
  constructor() {
    // Initialize core components
    this.paymentOrchestrator = new PaymentOrchestrator();
    this.identityManager = new IdentityManager();
    
    // API version
    this.version = '1.0.0';
  }

  /**
   * Process a payment
   * 
   * @param {Object} paymentRequest - Payment request
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentRequest) {
    try {
      // Validate payment request
      const validationResult = validatePaymentRequest(paymentRequest);
      if (!validationResult.valid) {
        return {
          success: false,
          message: `Validation error: ${validationResult.errors.join(', ')}`,
          errorCode: ERROR_CODES.VALIDATION_ERROR
        };
      }
      
      // Log API request
      logTransaction('API_PAYMENT_REQUEST', {
        paymentMethod: paymentRequest.paymentMethod,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        merchantId: paymentRequest.merchantId
      });
      
      // Process payment using orchestrator
      const result = await this.paymentOrchestrator.processPayment(paymentRequest);
      
      // Return result
      return result;
    } catch (error) {
      // Log error
      logError('API_PAYMENT_ERROR', error, paymentRequest);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Get transaction status
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   */
  async getTransactionStatus(transactionId) {
    try {
      if (!transactionId) {
        throw new Error('Transaction ID is required');
      }
      
      // Get status from orchestrator
      const status = await this.paymentOrchestrator.getTransactionStatus(transactionId);
      
      return status;
    } catch (error) {
      // Log error
      logError('API_STATUS_ERROR', error, { transactionId });
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Generate a payment link or QR code
   * 
   * @param {Object} paymentRequest - Payment request
   * @returns {Promise<Object>} Payment link or QR code data
   */
  async generatePaymentLink(paymentRequest) {
    try {
      // Validate payment request
      const validationResult = validatePaymentRequest(paymentRequest, true);
      if (!validationResult.valid) {
        return {
          success: false,
          message: `Validation error: ${validationResult.errors.join(', ')}`,
          errorCode: ERROR_CODES.VALIDATION_ERROR
        };
      }
      
      // Log API request
      logTransaction('API_PAYMENT_LINK_REQUEST', {
        paymentMethod: paymentRequest.paymentMethod,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        merchantId: paymentRequest.merchantId
      });
      
      // Generate payment link using orchestrator
      const result = await this.paymentOrchestrator.generatePaymentLink(paymentRequest);
      
      // Return result
      return result;
    } catch (error) {
      // Log error
      logError('API_PAYMENT_LINK_ERROR', error, paymentRequest);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Resolve a user identity
   * 
   * @param {string} identifier - User identifier (phone, email, username, etc.)
   * @returns {Promise<Object>} Resolved identity
   */
  async resolveIdentity(identifier) {
    try {
      if (!identifier) {
        throw new Error('Identifier is required');
      }
      
      // Resolve identity
      const identity = await this.identityManager.resolveIdentity(identifier);
      
      if (!identity) {
        return {
          success: false,
          message: 'Identity not found',
          errorCode: ERROR_CODES.IDENTITY_NOT_FOUND
        };
      }
      
      // Return sanitized identity (remove sensitive data)
      return {
        success: true,
        identity: {
          sunnyId: identity.sunnyId,
          displayName: identity.displayName,
          type: identity.type,
          verified: identity.verified
        }
      };
    } catch (error) {
      // Log error
      logError('API_IDENTITY_ERROR', error, { identifier });
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.IDENTITY_ERROR
      };
    }
  }

  /**
   * Register a new user identity
   * 
   * @param {Object} identityData - Identity data
   * @returns {Promise<Object>} Created identity
   */
  async registerIdentity(identityData) {
    try {
      // Validate identity data
      if (!identityData.primaryIdentifier) {
        throw new Error('Primary identifier is required');
      }
      
      // Register identity
      const identity = await this.identityManager.registerIdentity(identityData);
      
      // Return sanitized identity (remove sensitive data)
      return {
        success: true,
        message: 'Identity registered successfully',
        identity: {
          sunnyId: identity.sunnyId,
          displayName: identity.displayName,
          type: identity.type,
          verified: identity.verified
        }
      };
    } catch (error) {
      // Log error
      logError('API_IDENTITY_REGISTRATION_ERROR', error, identityData);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.IDENTITY_ERROR
      };
    }
  }

  /**
   * Process a P2P transfer
   * 
   * @param {Object} transferRequest - Transfer request
   * @returns {Promise<Object>} Transfer result
   */
  async processP2PTransfer(transferRequest) {
    try {
      // Validate transfer request
      if (!transferRequest.senderId) {
        throw new Error('Sender ID is required');
      }
      
      if (!transferRequest.recipientId) {
        throw new Error('Recipient ID is required');
      }
      
      if (!transferRequest.amount) {
        throw new Error('Amount is required');
      }
      
      if (!transferRequest.currency) {
        throw new Error('Currency is required');
      }
      
      // Log API request
      logTransaction('API_P2P_TRANSFER_REQUEST', {
        senderId: transferRequest.senderId,
        recipientId: transferRequest.recipientId,
        amount: transferRequest.amount,
        currency: transferRequest.currency
      });
      
      // Create payment request for orchestrator
      const paymentRequest = {
        paymentMethod: PAYMENT_METHODS.P2P,
        amount: transferRequest.amount,
        currency: transferRequest.currency,
        senderId: transferRequest.senderId,
        recipientId: transferRequest.recipientId,
        note: transferRequest.note,
        metadata: transferRequest.metadata
      };
      
      // Process payment using orchestrator
      const result = await this.paymentOrchestrator.processPayment(paymentRequest);
      
      // Return result
      return result;
    } catch (error) {
      // Log error
      logError('API_P2P_TRANSFER_ERROR', error, transferRequest);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Create a money request
   * 
   * @param {Object} requestData - Money request data
   * @returns {Promise<Object>} Request result
   */
  async createMoneyRequest(requestData) {
    try {
      // Validate request data
      if (!requestData.requesterId) {
        throw new Error('Requester ID is required');
      }
      
      if (!requestData.requesteeId) {
        throw new Error('Requestee ID is required');
      }
      
      if (!requestData.amount) {
        throw new Error('Amount is required');
      }
      
      if (!requestData.currency) {
        throw new Error('Currency is required');
      }
      
      // Log API request
      logTransaction('API_MONEY_REQUEST', {
        requesterId: requestData.requesterId,
        requesteeId: requestData.requesteeId,
        amount: requestData.amount,
        currency: requestData.currency
      });
      
      // Create money request using P2P manager
      const result = await this.paymentOrchestrator.p2pTransferManager.createMoneyRequest(requestData);
      
      // Return result
      return result;
    } catch (error) {
      // Log error
      logError('API_MONEY_REQUEST_ERROR', error, requestData);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Generate a cryptocurrency deposit address
   * 
   * @param {Object} addressRequest - Address generation request
   * @returns {Promise<Object>} Generated address
   */
  async generateCryptoAddress(addressRequest) {
    try {
      // Validate request
      if (!addressRequest.cryptoType) {
        throw new Error('Cryptocurrency type is required');
      }
      
      if (!addressRequest.userId) {
        throw new Error('User ID is required');
      }
      
      // Log API request
      logTransaction('API_CRYPTO_ADDRESS_REQUEST', {
        cryptoType: addressRequest.cryptoType,
        userId: addressRequest.userId
      });
      
      // Generate address using crypto processor
      const result = await this.paymentOrchestrator.cryptoProcessor.generateDepositAddress(addressRequest);
      
      // Return result
      return result;
    } catch (error) {
      // Log error
      logError('API_CRYPTO_ADDRESS_ERROR', error, addressRequest);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CRYPTO_ERROR
      };
    }
  }

  /**
   * Tokenize a payment method for future use
   * 
   * @param {Object} tokenizationRequest - Tokenization request
   * @returns {Promise<Object>} Tokenization result
   */
  async tokenizePaymentMethod(tokenizationRequest) {
    try {
      // Validate request
      if (!tokenizationRequest.paymentMethod) {
        throw new Error('Payment method is required');
      }
      
      if (!tokenizationRequest.userId) {
        throw new Error('User ID is required');
      }
      
      // Log API request
      logTransaction('API_TOKENIZATION_REQUEST', {
        paymentMethod: tokenizationRequest.paymentMethod,
        userId: tokenizationRequest.userId
      });
      
      let result;
      
      // Process based on payment method
      switch (tokenizationRequest.paymentMethod) {
        case PAYMENT_METHODS.CARD:
          if (!tokenizationRequest.cardDetails) {
            throw new Error('Card details are required');
          }
          
          result = await this.paymentOrchestrator.cardPaymentProcessor.tokenizeCard(tokenizationRequest.cardDetails);
          break;
          
        case PAYMENT_METHODS.BANK_TRANSFER:
          if (!tokenizationRequest.bankDetails) {
            throw new Error('Bank details are required');
          }
          
          // In a real implementation, this would tokenize bank details
          result = {
            success: true,
            message: 'Bank details tokenized successfully',
            token: `bank_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
            accountLast4: tokenizationRequest.bankDetails.accountNumber.slice(-4),
            bankName: tokenizationRequest.bankDetails.bankName,
            createdAt: new Date()
          };
          break;
          
        default:
          throw new Error(`Tokenization not supported for payment method: ${tokenizationRequest.paymentMethod}`);
      }
      
      // Add user ID to result
      result.userId = tokenizationRequest.userId;
      
      // Return result
      return result;
    } catch (error) {
      // Log error
      logError('API_TOKENIZATION_ERROR', error, tokenizationRequest);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Get API version information
   * 
   * @returns {Object} API version info
   */
  getVersion() {
    return {
      version: this.version,
      name: 'Sunny Payment Gateway API',
      supportedPaymentMethods: Object.values(PAYMENT_METHODS)
    };
  }
}

export default SunnyAPI;