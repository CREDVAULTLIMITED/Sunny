/**
 * MobileMoneyProcessor.js
 * 
 * Handles processing of mobile money payments across different providers
 * (M-Pesa, Airtel Money, MTN Mobile Money, etc.)
 */

import { MOBILE_MONEY_PROVIDERS, PAYMENT_STATUS, ERROR_CODES } from '../constants.js';
import { logTransaction, logError } from '../transactionLogger.js';

class MobileMoneyProcessor {
  constructor() {
    // Initialize provider-specific handlers
    this.providers = {
      [MOBILE_MONEY_PROVIDERS.MPESA]: this._processMpesa.bind(this),
      [MOBILE_MONEY_PROVIDERS.AIRTEL]: this._processAirtel.bind(this),
      [MOBILE_MONEY_PROVIDERS.MTN]: this._processMTN.bind(this),
      [MOBILE_MONEY_PROVIDERS.ORANGE]: this._processOrange.bind(this),
      [MOBILE_MONEY_PROVIDERS.VODACOM]: this._processVodacom.bind(this),
      [MOBILE_MONEY_PROVIDERS.TIGO]: this._processTigo.bind(this)
    };
    
    // Transaction status cache
    this.transactionStatus = new Map();
  }

  /**
   * Process a mobile money payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   */
  async processPayment(paymentDetails) {
    try {
      // Validate mobile money details
      this._validateMobileMoneyDetails(paymentDetails);
      
      // Extract mobile money details
      const { mobileMoneyDetails } = paymentDetails;
      const provider = mobileMoneyDetails.provider;
      
      // Log payment initiation
      logTransaction('MOBILE_MONEY_INITIATED', {
        provider,
        phoneNumber: mobileMoneyDetails.phoneNumber,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency
      });
      
      // Get provider-specific handler
      const providerHandler = this.providers[provider];
      
      if (!providerHandler) {
        throw new Error(`Unsupported mobile money provider: ${provider}`);
      }
      
      // Process with provider-specific handler
      const result = await providerHandler(paymentDetails);
      
      // Store transaction status
      if (result.transactionId) {
        this.transactionStatus.set(result.transactionId, {
          status: result.success ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.FAILED,
          timestamp: new Date(),
          details: result
        });
      }
      
      // Log result
      if (result.success) {
        logTransaction('MOBILE_MONEY_COMPLETED', result);
      } else {
        logError('MOBILE_MONEY_FAILED', new Error(result.message), result);
      }
      
      return result;
    } catch (error) {
      // Log error
      logError('MOBILE_MONEY_ERROR', error, paymentDetails);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.MOBILE_MONEY_ERROR,
        retriable: this._isRetriableError(error)
      };
    }
  }

  /**
   * Check the status of a mobile money transaction
   * 
   * @param {string} transactionId - Transaction ID
   * @param {string} provider - Mobile money provider
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(transactionId, provider) {
    try {
      // Check local cache first
      if (this.transactionStatus.has(transactionId)) {
        return this.transactionStatus.get(transactionId);
      }
      
      // If not in cache, check with provider
      let status;
      
      switch (provider) {
        case MOBILE_MONEY_PROVIDERS.MPESA:
          status = await this._checkMpesaStatus(transactionId);
          break;
          
        case MOBILE_MONEY_PROVIDERS.AIRTEL:
          status = await this._checkAirtelStatus(transactionId);
          break;
          
        case MOBILE_MONEY_PROVIDERS.MTN:
          status = await this._checkMTNStatus(transactionId);
          break;
          
        default:
          // For other providers, simulate a status check
          status = {
            status: Math.random() > 0.2 ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.PENDING,
            timestamp: new Date(),
            details: {
              transactionId,
              provider
            }
          };
      }
      
      // Update cache
      this.transactionStatus.set(transactionId, status);
      
      return status;
    } catch (error) {
      logError('MOBILE_MONEY_STATUS_CHECK_ERROR', error, { transactionId, provider });
      
      return {
        status: PAYMENT_STATUS.PENDING,
        message: 'Unable to determine transaction status',
        error: error.message
      };
    }
  }

  /**
   * Initiate an STK push request (for supported providers)
   * 
   * @param {Object} pushDetails - STK push details
   * @returns {Promise<Object>} Push result
   */
  async initiateSTKPush(pushDetails) {
    try {
      // Validate push details
      if (!pushDetails.phoneNumber) {
        throw new Error('Phone number is required');
      }
      
      if (!pushDetails.amount) {
        throw new Error('Amount is required');
      }
      
      if (!pushDetails.provider) {
        throw new Error('Provider is required');
      }
      
      // Normalize phone number
      const phoneNumber = this._normalizePhoneNumber(pushDetails.phoneNumber);
      
      // Process based on provider
      let result;
      
      switch (pushDetails.provider) {
        case MOBILE_MONEY_PROVIDERS.MPESA:
          result = await this._initiateMpesaSTKPush({
            ...pushDetails,
            phoneNumber
          });
          break;
          
        case MOBILE_MONEY_PROVIDERS.AIRTEL:
          result = await this._initiateAirtelSTKPush({
            ...pushDetails,
            phoneNumber
          });
          break;
          
        default:
          throw new Error(`STK push not supported for provider: ${pushDetails.provider}`);
      }
      
      // Log result
      logTransaction('STK_PUSH_INITIATED', {
        provider: pushDetails.provider,
        phoneNumber,
        amount: pushDetails.amount,
        pushId: result.pushId
      });
      
      return result;
    } catch (error) {
      logError('STK_PUSH_ERROR', error, pushDetails);
      
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.MOBILE_MONEY_ERROR
      };
    }
  }

  /**
   * Process M-Pesa payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processMpesa(paymentDetails) {
    // In a real implementation, this would connect to the M-Pesa API
    
    const { mobileMoneyDetails, amount, currency } = paymentDetails;
    
    // Normalize phone number
    const phoneNumber = this._normalizePhoneNumber(mobileMoneyDetails.phoneNumber);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate transaction ID
    const transactionId = `MPESA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'M-Pesa payment processed successfully',
        transactionId,
        processorReference: `MP-${Math.floor(Math.random() * 1000000)}`,
        phoneNumber,
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.PAYMENT_METHOD_ERROR,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        phoneNumber,
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process Airtel Money payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processAirtel(paymentDetails) {
    // In a real implementation, this would connect to the Airtel Money API
    
    const { mobileMoneyDetails, amount, currency } = paymentDetails;
    
    // Normalize phone number
    const phoneNumber = this._normalizePhoneNumber(mobileMoneyDetails.phoneNumber);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate transaction ID
    const transactionId = `AIRTEL-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Airtel Money payment processed successfully',
        transactionId,
        processorReference: `AM-${Math.floor(Math.random() * 1000000)}`,
        phoneNumber,
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.PAYMENT_METHOD_ERROR,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        phoneNumber,
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process MTN Mobile Money payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processMTN(paymentDetails) {
    // In a real implementation, this would connect to the MTN Mobile Money API
    
    const { mobileMoneyDetails, amount, currency } = paymentDetails;
    
    // Normalize phone number
    const phoneNumber = this._normalizePhoneNumber(mobileMoneyDetails.phoneNumber);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1300));
    
    // Generate transaction ID
    const transactionId = `MTN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'MTN Mobile Money payment processed successfully',
        transactionId,
        processorReference: `MTN-${Math.floor(Math.random() * 1000000)}`,
        phoneNumber,
        amount,
        currency,
        timestamp: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.PAYMENT_METHOD_ERROR,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        phoneNumber,
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process Orange Money payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processOrange(paymentDetails) {
    // Similar implementation to other providers
    // Simulate API call and response
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    // Generate transaction ID
    const transactionId = `ORANGE-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Orange Money payment processed successfully',
        transactionId,
        processorReference: `OM-${Math.floor(Math.random() * 1000000)}`,
        phoneNumber: paymentDetails.mobileMoneyDetails.phoneNumber,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        timestamp: new Date()
      };
    } else {
      return {
        success: false,
        message: 'Payment processing failed',
        errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
        transactionId,
        retriable: false
      };
    }
  }

  /**
   * Process Vodacom M-Pesa payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processVodacom(paymentDetails) {
    // Similar implementation to other providers
    // Simulate API call and response
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate transaction ID
    const transactionId = `VODACOM-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Vodacom M-Pesa payment processed successfully',
        transactionId,
        processorReference: `VM-${Math.floor(Math.random() * 1000000)}`,
        phoneNumber: paymentDetails.mobileMoneyDetails.phoneNumber,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        timestamp: new Date()
      };
    } else {
      return {
        success: false,
        message: 'Payment processing failed',
        errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
        transactionId,
        retriable: false
      };
    }
  }

  /**
   * Process Tigo Pesa payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processTigo(paymentDetails) {
    // Similar implementation to other providers
    // Simulate API call and response
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Generate transaction ID
    const transactionId = `TIGO-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Tigo Pesa payment processed successfully',
        transactionId,
        processorReference: `TP-${Math.floor(Math.random() * 1000000)}`,
        phoneNumber: paymentDetails.mobileMoneyDetails.phoneNumber,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        timestamp: new Date()
      };
    } else {
      return {
        success: false,
        message: 'Payment processing failed',
        errorCode: ERROR_CODES.PAYMENT_METHOD_ERROR,
        transactionId,
        retriable: false
      };
    }
  }

  /**
   * Check M-Pesa transaction status
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   * @private
   */
  async _checkMpesaStatus(transactionId) {
    // In a real implementation, this would connect to the M-Pesa API
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
    
    return {
      status,
      timestamp: new Date(),
      details: {
        transactionId,
        provider: MOBILE_MONEY_PROVIDERS.MPESA,
        processorReference: `MP-${Math.floor(Math.random() * 1000000)}`
      }
    };
  }

  /**
   * Check Airtel Money transaction status
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   * @private
   */
  async _checkAirtelStatus(transactionId) {
    // In a real implementation, this would connect to the Airtel Money API
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
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
    
    return {
      status,
      timestamp: new Date(),
      details: {
        transactionId,
        provider: MOBILE_MONEY_PROVIDERS.AIRTEL,
        processorReference: `AM-${Math.floor(Math.random() * 1000000)}`
      }
    };
  }

  /**
   * Check MTN Mobile Money transaction status
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   * @private
   */
  async _checkMTNStatus(transactionId) {
    // In a real implementation, this would connect to the MTN Mobile Money API
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 750));
    
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
    
    return {
      status,
      timestamp: new Date(),
      details: {
        transactionId,
        provider: MOBILE_MONEY_PROVIDERS.MTN,
        processorReference: `MTN-${Math.floor(Math.random() * 1000000)}`
      }
    };
  }

  /**
   * Initiate M-Pesa STK push
   * 
   * @param {Object} pushDetails - STK push details
   * @returns {Promise<Object>} Push result
   * @private
   */
  async _initiateMpesaSTKPush(pushDetails) {
    // In a real implementation, this would connect to the M-Pesa API
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate push ID
    const pushId = `MPESA-PUSH-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate for demo)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'STK push initiated successfully',
        pushId,
        phoneNumber: pushDetails.phoneNumber,
        amount: pushDetails.amount,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiry
      };
    } else {
      return {
        success: false,
        message: 'Failed to initiate STK push',
        errorCode: ERROR_CODES.MOBILE_MONEY_ERROR,
        phoneNumber: pushDetails.phoneNumber
      };
    }
  }

  /**
   * Initiate Airtel Money STK push
   * 
   * @param {Object} pushDetails - STK push details
   * @returns {Promise<Object>} Push result
   * @private
   */
  async _initiateAirtelSTKPush(pushDetails) {
    // In a real implementation, this would connect to the Airtel Money API
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Generate push ID
    const pushId = `AIRTEL-PUSH-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate for demo)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'STK push initiated successfully',
        pushId,
        phoneNumber: pushDetails.phoneNumber,
        amount: pushDetails.amount,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiry
      };
    } else {
      return {
        success: false,
        message: 'Failed to initiate STK push',
        errorCode: ERROR_CODES.MOBILE_MONEY_ERROR,
        phoneNumber: pushDetails.phoneNumber
      };
    }
  }

  /**
   * Validate mobile money payment details
   * 
   * @param {Object} paymentDetails - Payment details to validate
   * @private
   */
  _validateMobileMoneyDetails(paymentDetails) {
    if (!paymentDetails.mobileMoneyDetails) {
      throw new Error('Mobile money details are required');
    }
    
    const { mobileMoneyDetails } = paymentDetails;
    
    if (!mobileMoneyDetails.provider) {
      throw new Error('Mobile money provider is required');
    }
    
    if (!Object.values(MOBILE_MONEY_PROVIDERS).includes(mobileMoneyDetails.provider)) {
      throw new Error(`Unsupported mobile money provider: ${mobileMoneyDetails.provider}`);
    }
    
    if (!mobileMoneyDetails.phoneNumber) {
      throw new Error('Phone number is required');
    }
    
    // Validate phone number format (basic validation)
    if (!this._isValidPhoneNumber(mobileMoneyDetails.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }
  }

  /**
   * Check if a phone number is valid
   * 
   * @param {string} phoneNumber - Phone number to validate
   * @returns {boolean} True if valid
   * @private
   */
  _isValidPhoneNumber(phoneNumber) {
    // Basic validation - in a real system this would be more sophisticated
    return /^[+]?[0-9]{10,15}$/.test(phoneNumber);
  }

  /**
   * Normalize a phone number to E.164 format
   * 
   * @param {string} phoneNumber - Phone number to normalize
   * @returns {string} Normalized phone number
   * @private
   */
  _normalizePhoneNumber(phoneNumber) {
    // Remove spaces, dashes, and other formatting characters
    let normalized = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
    
    // Ensure it has international prefix
    if (!normalized.startsWith('+')) {
      // For demo purposes, assume Kenya if no country code
      if (normalized.startsWith('0')) {
        normalized = '+254' + normalized.substring(1);
      } else {
        normalized = '+' + normalized;
      }
    }
    
    return normalized;
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
      case ERROR_CODES.INSUFFICIENT_FUNDS:
        return 'Insufficient funds in mobile money account';
        
      case ERROR_CODES.PAYMENT_METHOD_ERROR:
        return 'Mobile money payment failed';
        
      case ERROR_CODES.TIMEOUT_ERROR:
        return 'Mobile money request timed out';
        
      default:
        return 'An error occurred while processing mobile money payment';
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

export default MobileMoneyProcessor;