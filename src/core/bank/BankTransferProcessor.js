/**
 * BankTransferProcessor.js
 * 
 * Handles processing of bank transfers and UPI-style payments
 */

import { PAYMENT_STATUS, ERROR_CODES } from '../constants';
import { logTransaction, logError } from '../transactionLogger';

class BankTransferProcessor {
  constructor() {
    // Transaction status cache
    this.transactionStatus = new Map();
  }

  /**
   * Process a bank transfer payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   */
  async processPayment(paymentDetails) {
    try {
      // Validate bank details
      this._validateBankDetails(paymentDetails);
      
      // Extract bank details
      const { bankDetails } = paymentDetails;
      
      // Determine transfer type
      const transferType = this._determineTransferType(bankDetails);
      
      // Log payment initiation
      logTransaction('BANK_TRANSFER_INITIATED', {
        transferType,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        bankName: bankDetails.bankName,
        accountType: bankDetails.accountType
      });
      
      // Process based on transfer type
      let result;
      
      switch (transferType) {
        case 'ACH':
          result = await this._processACHTransfer(paymentDetails);
          break;
          
        case 'WIRE':
          result = await this._processWireTransfer(paymentDetails);
          break;
          
        case 'SEPA':
          result = await this._processSEPATransfer(paymentDetails);
          break;
          
        case 'UPI':
          result = await this._processUPITransfer(paymentDetails);
          break;
          
        case 'INSTANT':
          result = await this._processInstantTransfer(paymentDetails);
          break;
          
        default:
          result = await this._processGenericTransfer(paymentDetails);
      }
      
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
        logTransaction('BANK_TRANSFER_COMPLETED', {
          transactionId: result.transactionId,
          transferType,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency
        });
      } else {
        logError('BANK_TRANSFER_FAILED', new Error(result.message), {
          transferType,
          errorCode: result.errorCode
        });
      }
      
      return result;
    } catch (error) {
      // Log error
      logError('BANK_TRANSFER_ERROR', error, {
        amount: paymentDetails.amount,
        currency: paymentDetails.currency
      });
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.BANK_TRANSFER_ERROR,
        retriable: this._isRetriableError(error)
      };
    }
  }

  /**
   * Check the status of a bank transfer
   * 
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(transactionId) {
    try {
      // Check local cache first
      if (this.transactionStatus.has(transactionId)) {
        return this.transactionStatus.get(transactionId);
      }
      
      // If not in cache, simulate a status check
      // In a real implementation, this would connect to the bank's API
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate status (70% completed, 25% pending, 5% failed)
      const random = Math.random();
      let status;
      
      if (random < 0.7) {
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
          processorReference: `BANK-REF-${Math.floor(Math.random() * 1000000)}`
        }
      };
      
      // Update cache
      this.transactionStatus.set(transactionId, result);
      
      return result;
    } catch (error) {
      logError('BANK_TRANSFER_STATUS_CHECK_ERROR', error, { transactionId });
      
      return {
        status: PAYMENT_STATUS.PENDING,
        message: 'Unable to determine transaction status',
        error: error.message
      };
    }
  }

  /**
   * Process an ACH transfer
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processACHTransfer(paymentDetails) {
    // In a real implementation, this would connect to an ACH processor
    
    const { bankDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate transaction ID
    const transactionId = `ACH-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate for demo)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'ACH transfer initiated successfully',
        transactionId,
        processorReference: `ACH-${Math.floor(Math.random() * 1000000)}`,
        accountLast4: bankDetails.accountNumber.slice(-4),
        amount,
        currency,
        timestamp: new Date(),
        estimatedSettlementDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.BANK_TRANSFER_ERROR,
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        accountLast4: bankDetails.accountNumber.slice(-4),
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process a wire transfer
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processWireTransfer(paymentDetails) {
    // In a real implementation, this would connect to a wire transfer processor
    
    const { bankDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate transaction ID
    const transactionId = `WIRE-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate for demo)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'Wire transfer initiated successfully',
        transactionId,
        processorReference: `WIRE-${Math.floor(Math.random() * 1000000)}`,
        accountLast4: bankDetails.accountNumber.slice(-4),
        amount,
        currency,
        timestamp: new Date(),
        estimatedSettlementDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.BANK_TRANSFER_ERROR,
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        accountLast4: bankDetails.accountNumber.slice(-4),
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process a SEPA transfer
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processSEPATransfer(paymentDetails) {
    // In a real implementation, this would connect to a SEPA processor
    
    const { bankDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1300));
    
    // Generate transaction ID
    const transactionId = `SEPA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate for demo)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'SEPA transfer initiated successfully',
        transactionId,
        processorReference: `SEPA-${Math.floor(Math.random() * 1000000)}`,
        ibanLast4: bankDetails.iban.slice(-4),
        amount,
        currency,
        timestamp: new Date(),
        estimatedSettlementDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.BANK_TRANSFER_ERROR,
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        ibanLast4: bankDetails.iban.slice(-4),
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process a UPI transfer
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processUPITransfer(paymentDetails) {
    // In a real implementation, this would connect to a UPI processor
    
    const { bankDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate transaction ID
    const transactionId = `UPI-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (98% success rate for UPI)
    const success = Math.random() < 0.98;
    
    if (success) {
      return {
        success: true,
        message: 'UPI transfer completed successfully',
        transactionId,
        processorReference: `UPI-${Math.floor(Math.random() * 1000000)}`,
        upiId: bankDetails.upiId,
        amount,
        currency,
        timestamp: new Date(),
        // UPI is instant
        settlementDate: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.BANK_TRANSFER_ERROR,
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        upiId: bankDetails.upiId,
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process an instant transfer
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processInstantTransfer(paymentDetails) {
    // In a real implementation, this would connect to an instant transfer processor
    
    const { bankDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate transaction ID
    const transactionId = `INST-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (95% success rate for demo)
    const success = Math.random() < 0.95;
    
    if (success) {
      return {
        success: true,
        message: 'Instant transfer completed successfully',
        transactionId,
        processorReference: `INST-${Math.floor(Math.random() * 1000000)}`,
        accountLast4: bankDetails.accountNumber ? bankDetails.accountNumber.slice(-4) : 'N/A',
        amount,
        currency,
        timestamp: new Date(),
        // Instant transfer is immediate
        settlementDate: new Date()
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.BANK_TRANSFER_ERROR,
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        accountLast4: bankDetails.accountNumber ? bankDetails.accountNumber.slice(-4) : 'N/A',
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Process a generic bank transfer
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _processGenericTransfer(paymentDetails) {
    // In a real implementation, this would connect to a bank transfer processor
    
    const { bankDetails, amount, currency } = paymentDetails;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Generate transaction ID
    const transactionId = `BANK-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() < 0.9;
    
    if (success) {
      return {
        success: true,
        message: 'Bank transfer initiated successfully',
        transactionId,
        processorReference: `BANK-${Math.floor(Math.random() * 1000000)}`,
        accountLast4: bankDetails.accountNumber ? bankDetails.accountNumber.slice(-4) : 'N/A',
        amount,
        currency,
        timestamp: new Date(),
        estimatedSettlementDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
      };
    } else {
      // Simulate various error scenarios
      const errorCodes = [
        ERROR_CODES.BANK_TRANSFER_ERROR,
        ERROR_CODES.INSUFFICIENT_FUNDS,
        ERROR_CODES.TIMEOUT_ERROR
      ];
      
      const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
      const errorMessage = this._getErrorMessage(errorCode);
      
      return {
        success: false,
        message: errorMessage,
        errorCode,
        transactionId,
        accountLast4: bankDetails.accountNumber ? bankDetails.accountNumber.slice(-4) : 'N/A',
        retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
      };
    }
  }

  /**
   * Validate bank transfer details
   * 
   * @param {Object} paymentDetails - Payment details to validate
   * @private
   */
  _validateBankDetails(paymentDetails) {
    if (!paymentDetails.bankDetails) {
      throw new Error('Bank details are required');
    }
    
    const { bankDetails } = paymentDetails;
    
    // Determine transfer type
    const transferType = this._determineTransferType(bankDetails);
    
    // Validate based on transfer type
    switch (transferType) {
      case 'ACH':
        if (!bankDetails.routingNumber) {
          throw new Error('Routing number is required for ACH transfers');
        }
        if (!bankDetails.accountNumber) {
          throw new Error('Account number is required for ACH transfers');
        }
        break;
        
      case 'WIRE':
        if (!bankDetails.swiftCode && !bankDetails.routingNumber) {
          throw new Error('SWIFT code or routing number is required for wire transfers');
        }
        if (!bankDetails.accountNumber) {
          throw new Error('Account number is required for wire transfers');
        }
        break;
        
      case 'SEPA':
        if (!bankDetails.iban) {
          throw new Error('IBAN is required for SEPA transfers');
        }
        if (!bankDetails.bic && !bankDetails.swiftCode) {
          throw new Error('BIC or SWIFT code is required for SEPA transfers');
        }
        break;
        
      case 'UPI':
        if (!bankDetails.upiId) {
          throw new Error('UPI ID is required for UPI transfers');
        }
        break;
        
      case 'INSTANT':
        if (!bankDetails.accountId && !bankDetails.accountNumber) {
          throw new Error('Account ID or number is required for instant transfers');
        }
        break;
        
      default:
        if (!bankDetails.accountNumber && !bankDetails.iban && !bankDetails.upiId) {
          throw new Error('Valid account information is required');
        }
    }
  }

  /**
   * Determine the type of bank transfer
   * 
   * @param {Object} bankDetails - Bank details
   * @returns {string} Transfer type
   * @private
   */
  _determineTransferType(bankDetails) {
    // Check for UPI
    if (bankDetails.upiId) {
      return 'UPI';
    }
    
    // Check for SEPA
    if (bankDetails.iban) {
      return 'SEPA';
    }
    
    // Check for ACH
    if (bankDetails.routingNumber && bankDetails.accountNumber && 
        (bankDetails.country === 'US' || !bankDetails.country)) {
      return 'ACH';
    }
    
    // Check for wire transfer
    if (bankDetails.swiftCode || 
        (bankDetails.routingNumber && bankDetails.accountNumber && bankDetails.country !== 'US')) {
      return 'WIRE';
    }
    
    // Check for instant transfer
    if (bankDetails.instantTransfer || bankDetails.accountId) {
      return 'INSTANT';
    }
    
    // Default to generic
    return 'GENERIC';
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
      case ERROR_CODES.BANK_TRANSFER_ERROR:
        return 'Bank transfer failed';
        
      case ERROR_CODES.INSUFFICIENT_FUNDS:
        return 'Insufficient funds in account';
        
      case ERROR_CODES.TIMEOUT_ERROR:
        return 'Bank transfer request timed out';
        
      default:
        return 'An error occurred while processing bank transfer';
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

export default BankTransferProcessor;