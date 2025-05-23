/**
 * P2PTransferManager.js
 * 
 * Handles person-to-person transfers between users
 */

import { PAYMENT_STATUS, ERROR_CODES, IDENTITY_TYPES } from '../constants.js';
import { logTransaction, logError } from '../transactionLogger.js';
import IdentityManager from '../identity/IdentityManager.js';

class P2PTransferManager {
  constructor() {
    // Initialize identity manager
    this.identityManager = new IdentityManager();
    
    // Transaction status cache
    this.transactionStatus = new Map();
    
    // Money requests store (in a real app, this would be a database)
    this.moneyRequests = new Map();
  }

  /**
   * Process a P2P transfer
   * 
   * @param {Object} transferDetails - Transfer details
   * @returns {Promise<Object>} Processing result
   */
  async processPayment(transferDetails) {
    try {
      // Validate transfer details
      this._validateTransferDetails(transferDetails);
      
      // Extract transfer details
      const { senderId, recipientId, amount, currency } = transferDetails;
      
      // Resolve sender identity
      const sender = await this.identityManager.resolveIdentity(senderId);
      if (!sender) {
        throw new Error(`Sender identity ${senderId} could not be resolved`);
      }
      
      // Resolve recipient identity
      const recipient = await this.identityManager.resolveIdentity(recipientId);
      if (!recipient) {
        throw new Error(`Recipient identity ${recipientId} could not be resolved`);
      }
      
      // Log transfer initiation
      logTransaction('P2P_TRANSFER_INITIATED', {
        senderId: sender.sunnyId,
        recipientId: recipient.sunnyId,
        amount,
        currency
      });
      
      // Generate transaction ID
      const transactionId = `P2P-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate success (95% success rate for P2P transfers)
      const success = Math.random() < 0.95;
      
      if (success) {
        // Create transaction result
        const result = {
          success: true,
          message: 'P2P transfer completed successfully',
          transactionId,
          processorReference: `P2P-REF-${Math.floor(Math.random() * 1000000)}`,
          senderId: sender.sunnyId,
          recipientId: recipient.sunnyId,
          senderName: sender.displayName,
          recipientName: recipient.displayName,
          amount,
          currency,
          timestamp: new Date(),
          fee: 0, // P2P transfers often have no fee
          note: transferDetails.note
        };
        
        // Store transaction status
        this.transactionStatus.set(transactionId, {
          status: PAYMENT_STATUS.COMPLETED,
          timestamp: new Date(),
          details: result
        });
        
        // Log successful transfer
        logTransaction('P2P_TRANSFER_COMPLETED', result);
        
        return result;
      } else {
        // Simulate various error scenarios
        const errorCodes = [
          ERROR_CODES.INSUFFICIENT_FUNDS,
          ERROR_CODES.PAYMENT_METHOD_ERROR,
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
          senderId: sender.sunnyId,
          recipientId: recipient.sunnyId,
          amount,
          currency,
          retriable: errorCode === ERROR_CODES.TIMEOUT_ERROR
        };
        
        // Store transaction status
        this.transactionStatus.set(transactionId, {
          status: PAYMENT_STATUS.FAILED,
          timestamp: new Date(),
          details: result
        });
        
        // Log failed transfer
        logError('P2P_TRANSFER_FAILED', new Error(errorMessage), {
          senderId: sender.sunnyId,
          recipientId: recipient.sunnyId,
          errorCode
        });
        
        return result;
      }
    } catch (error) {
      // Log error
      logError('P2P_TRANSFER_ERROR', error, transferDetails);
      
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
   * Create a money request
   * 
   * @param {Object} requestDetails - Money request details
   * @returns {Promise<Object>} Request result
   */
  async createMoneyRequest(requestDetails) {
    try {
      // Validate request details
      this._validateRequestDetails(requestDetails);
      
      // Extract request details
      const { requesterId, requesteeId, amount, currency } = requestDetails;
      
      // Resolve requester identity
      const requester = await this.identityManager.resolveIdentity(requesterId);
      if (!requester) {
        throw new Error(`Requester identity ${requesterId} could not be resolved`);
      }
      
      // Resolve requestee identity
      const requestee = await this.identityManager.resolveIdentity(requesteeId);
      if (!requestee) {
        throw new Error(`Requestee identity ${requesteeId} could not be resolved`);
      }
      
      // Log request creation
      logTransaction('MONEY_REQUEST_CREATED', {
        requesterId: requester.sunnyId,
        requesteeId: requestee.sunnyId,
        amount,
        currency
      });
      
      // Generate request ID
      const requestId = `REQ-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Calculate expiry time (default 7 days)
      const expiryDays = requestDetails.expiryDays || 7;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiryDays);
      
      // Create request object
      const request = {
        requestId,
        requesterId: requester.sunnyId,
        requesterName: requester.displayName,
        requesteeId: requestee.sunnyId,
        requesteeName: requestee.displayName,
        amount,
        currency,
        note: requestDetails.note,
        status: 'PENDING',
        createdAt: new Date(),
        expiresAt,
        splitDetails: requestDetails.splitDetails
      };
      
      // Store request
      this.moneyRequests.set(requestId, request);
      
      // Return request details
      return {
        success: true,
        message: 'Money request created successfully',
        requestId,
        requesterId: requester.sunnyId,
        requesterName: requester.displayName,
        requesteeId: requestee.sunnyId,
        requesteeName: requestee.displayName,
        amount,
        currency,
        note: requestDetails.note,
        status: 'PENDING',
        createdAt: request.createdAt,
        expiresAt: request.expiresAt,
        splitDetails: request.splitDetails,
        paymentLink: `https://pay.sunnypayments.com/request/${requestId}`
      };
    } catch (error) {
      // Log error
      logError('MONEY_REQUEST_ERROR', error, requestDetails);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Respond to a money request
   * 
   * @param {Object} responseDetails - Response details
   * @returns {Promise<Object>} Response result
   */
  async respondToMoneyRequest(responseDetails) {
    try {
      // Validate response details
      if (!responseDetails.requestId) {
        throw new Error('Request ID is required');
      }
      
      if (!responseDetails.action) {
        throw new Error('Action is required');
      }
      
      if (!['ACCEPT', 'DECLINE', 'CANCEL'].includes(responseDetails.action)) {
        throw new Error('Invalid action');
      }
      
      // Get request from store
      const request = this.moneyRequests.get(responseDetails.requestId);
      
      if (!request) {
        throw new Error('Money request not found');
      }
      
      // Check if request has expired
      if (request.expiresAt < new Date()) {
        throw new Error('Money request has expired');
      }
      
      // Check if request is still pending
      if (request.status !== 'PENDING') {
        throw new Error(`Money request is already ${request.status}`);
      }
      
      // Process based on action
      switch (responseDetails.action) {
        case 'ACCEPT':
          return await this._acceptMoneyRequest(request, responseDetails);
          
        case 'DECLINE':
          return this._declineMoneyRequest(request, responseDetails);
          
        case 'CANCEL':
          return this._cancelMoneyRequest(request, responseDetails);
          
        default:
          throw new Error('Invalid action');
      }
    } catch (error) {
      // Log error
      logError('MONEY_REQUEST_RESPONSE_ERROR', error, responseDetails);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Get money requests for a user
   * 
   * @param {string} userId - User ID
   * @param {Object} filters - Optional filters
   * @returns {Promise<Object>} Money requests
   */
  async getMoneyRequests(userId, filters = {}) {
    try {
      // Resolve user identity
      const user = await this.identityManager.resolveIdentity(userId);
      if (!user) {
        throw new Error(`User identity ${userId} could not be resolved`);
      }
      
      // Get all requests
      const allRequests = Array.from(this.moneyRequests.values());
      
      // Filter requests for this user
      let userRequests = allRequests.filter(request => 
        request.requesterId === user.sunnyId || request.requesteeId === user.sunnyId
      );
      
      // Apply status filter if provided
      if (filters.status) {
        userRequests = userRequests.filter(request => request.status === filters.status);
      }
      
      // Apply date filters if provided
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        userRequests = userRequests.filter(request => request.createdAt >= startDate);
      }
      
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        userRequests = userRequests.filter(request => request.createdAt <= endDate);
      }
      
      // Sort by date (newest first)
      userRequests.sort((a, b) => b.createdAt - a.createdAt);
      
      // Return requests
      return {
        success: true,
        requests: userRequests.map(request => ({
          ...request,
          isOutgoing: request.requesterId === user.sunnyId,
          isIncoming: request.requesteeId === user.sunnyId
        }))
      };
    } catch (error) {
      // Log error
      logError('GET_MONEY_REQUESTS_ERROR', error, { userId, filters });
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Create a bill split request
   * 
   * @param {Object} splitDetails - Bill split details
   * @returns {Promise<Object>} Split result
   */
  async createBillSplit(splitDetails) {
    try {
      // Validate split details
      this._validateSplitDetails(splitDetails);
      
      // Extract split details
      const { requesterId, participants, totalAmount, currency, title } = splitDetails;
      
      // Resolve requester identity
      const requester = await this.identityManager.resolveIdentity(requesterId);
      if (!requester) {
        throw new Error(`Requester identity ${requesterId} could not be resolved`);
      }
      
      // Validate participants
      if (!participants || !Array.isArray(participants) || participants.length === 0) {
        throw new Error('At least one participant is required');
      }
      
      // Resolve participant identities
      const resolvedParticipants = [];
      for (const participant of participants) {
        const identity = await this.identityManager.resolveIdentity(participant.id);
        if (!identity) {
          throw new Error(`Participant identity ${participant.id} could not be resolved`);
        }
        
        resolvedParticipants.push({
          id: identity.sunnyId,
          name: identity.displayName,
          amount: participant.amount,
          status: 'PENDING'
        });
      }
      
      // Log split creation
      logTransaction('BILL_SPLIT_CREATED', {
        requesterId: requester.sunnyId,
        participantCount: resolvedParticipants.length,
        totalAmount,
        currency
      });
      
      // Generate split ID
      const splitId = `SPLIT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Calculate expiry time (default 30 days)
      const expiryDays = splitDetails.expiryDays || 30;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiryDays);
      
      // Create individual money requests for each participant
      const participantRequests = [];
      
      for (const participant of resolvedParticipants) {
        // Create money request
        const requestResult = await this.createMoneyRequest({
          requesterId: requester.sunnyId,
          requesteeId: participant.id,
          amount: participant.amount,
          currency,
          note: `${title}: Your share of ${participant.amount} ${currency}`,
          expiryDays,
          splitDetails: {
            splitId,
            totalAmount,
            participantCount: resolvedParticipants.length
          }
        });
        
        if (requestResult.success) {
          participantRequests.push({
            participantId: participant.id,
            participantName: participant.name,
            amount: participant.amount,
            requestId: requestResult.requestId,
            status: 'PENDING'
          });
        }
      }
      
      // Create split object
      const split = {
        splitId,
        title,
        requesterId: requester.sunnyId,
        requesterName: requester.displayName,
        totalAmount,
        currency,
        participants: resolvedParticipants,
        requests: participantRequests,
        status: 'PENDING',
        createdAt: new Date(),
        expiresAt,
        note: splitDetails.note
      };
      
      // Store split (in a real app, this would be in a database)
      // For now, we'll store it as a special type of money request
      this.moneyRequests.set(splitId, {
        ...split,
        type: 'SPLIT'
      });
      
      // Return split details
      return {
        success: true,
        message: 'Bill split created successfully',
        splitId,
        title,
        requesterId: requester.sunnyId,
        requesterName: requester.displayName,
        totalAmount,
        currency,
        participants: resolvedParticipants,
        requests: participantRequests,
        status: 'PENDING',
        createdAt: split.createdAt,
        expiresAt: split.expiresAt,
        note: split.note,
        shareLink: `https://pay.sunnypayments.com/split/${splitId}`
      };
    } catch (error) {
      // Log error
      logError('BILL_SPLIT_ERROR', error, splitDetails);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.GENERAL_ERROR
      };
    }
  }

  /**
   * Accept a money request
   * 
   * @param {Object} request - Money request
   * @param {Object} responseDetails - Response details
   * @returns {Promise<Object>} Processing result
   * @private
   */
  async _acceptMoneyRequest(request, responseDetails) {
    // Validate that the responder is the requestee
    if (responseDetails.responderId !== request.requesteeId) {
      throw new Error('Only the requestee can accept a money request');
    }
    
    // Process the payment
    const paymentResult = await this.processPayment({
      senderId: request.requesteeId,
      recipientId: request.requesterId,
      amount: request.amount,
      currency: request.currency,
      note: `Payment for request: ${request.note || 'No note'}`,
      requestId: request.requestId
    });
    
    if (paymentResult.success) {
      // Update request status
      request.status = 'COMPLETED';
      request.completedAt = new Date();
      request.transactionId = paymentResult.transactionId;
      
      // Update in store
      this.moneyRequests.set(request.requestId, request);
      
      // Log request completion
      logTransaction('MONEY_REQUEST_COMPLETED', {
        requestId: request.requestId,
        transactionId: paymentResult.transactionId
      });
      
      // Return success result
      return {
        success: true,
        message: 'Money request accepted and payment completed',
        requestId: request.requestId,
        status: 'COMPLETED',
        transactionId: paymentResult.transactionId,
        amount: request.amount,
        currency: request.currency,
        completedAt: request.completedAt
      };
    } else {
      // Payment failed
      return {
        success: false,
        message: `Failed to process payment: ${paymentResult.message}`,
        errorCode: paymentResult.errorCode,
        requestId: request.requestId,
        status: 'PENDING',
        retriable: paymentResult.retriable
      };
    }
  }

  /**
   * Decline a money request
   * 
   * @param {Object} request - Money request
   * @param {Object} responseDetails - Response details
   * @returns {Object} Processing result
   * @private
   */
  _declineMoneyRequest(request, responseDetails) {
    // Validate that the responder is the requestee
    if (responseDetails.responderId !== request.requesteeId) {
      throw new Error('Only the requestee can decline a money request');
    }
    
    // Update request status
    request.status = 'DECLINED';
    request.declinedAt = new Date();
    request.declineReason = responseDetails.reason;
    
    // Update in store
    this.moneyRequests.set(request.requestId, request);
    
    // Log request decline
    logTransaction('MONEY_REQUEST_DECLINED', {
      requestId: request.requestId,
      reason: responseDetails.reason
    });
    
    // Return success result
    return {
      success: true,
      message: 'Money request declined',
      requestId: request.requestId,
      status: 'DECLINED',
      declinedAt: request.declinedAt,
      reason: request.declineReason
    };
  }

  /**
   * Cancel a money request
   * 
   * @param {Object} request - Money request
   * @param {Object} responseDetails - Response details
   * @returns {Object} Processing result
   * @private
   */
  _cancelMoneyRequest(request, responseDetails) {
    // Validate that the responder is the requester
    if (responseDetails.responderId !== request.requesterId) {
      throw new Error('Only the requester can cancel a money request');
    }
    
    // Update request status
    request.status = 'CANCELLED';
    request.cancelledAt = new Date();
    request.cancelReason = responseDetails.reason;
    
    // Update in store
    this.moneyRequests.set(request.requestId, request);
    
    // Log request cancellation
    logTransaction('MONEY_REQUEST_CANCELLED', {
      requestId: request.requestId,
      reason: responseDetails.reason
    });
    
    // Return success result
    return {
      success: true,
      message: 'Money request cancelled',
      requestId: request.requestId,
      status: 'CANCELLED',
      cancelledAt: request.cancelledAt,
      reason: request.cancelReason
    };
  }

  /**
   * Validate P2P transfer details
   * 
   * @param {Object} transferDetails - Transfer details to validate
   * @private
   */
  _validateTransferDetails(transferDetails) {
    if (!transferDetails.senderId) {
      throw new Error('Sender ID is required');
    }
    
    if (!transferDetails.recipientId) {
      throw new Error('Recipient ID is required');
    }
    
    if (transferDetails.senderId === transferDetails.recipientId) {
      throw new Error('Sender and recipient cannot be the same');
    }
    
    if (!transferDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (isNaN(parseFloat(transferDetails.amount)) || parseFloat(transferDetails.amount) <= 0) {
      throw new Error('Amount must be a positive number');
    }
    
    if (!transferDetails.currency) {
      throw new Error('Currency is required');
    }
  }

  /**
   * Validate money request details
   * 
   * @param {Object} requestDetails - Request details to validate
   * @private
   */
  _validateRequestDetails(requestDetails) {
    if (!requestDetails.requesterId) {
      throw new Error('Requester ID is required');
    }
    
    if (!requestDetails.requesteeId) {
      throw new Error('Requestee ID is required');
    }
    
    if (requestDetails.requesterId === requestDetails.requesteeId) {
      throw new Error('Requester and requestee cannot be the same');
    }
    
    if (!requestDetails.amount) {
      throw new Error('Amount is required');
    }
    
    if (isNaN(parseFloat(requestDetails.amount)) || parseFloat(requestDetails.amount) <= 0) {
      throw new Error('Amount must be a positive number');
    }
    
    if (!requestDetails.currency) {
      throw new Error('Currency is required');
    }
    
    if (requestDetails.expiryDays && 
        (isNaN(parseInt(requestDetails.expiryDays)) || parseInt(requestDetails.expiryDays) <= 0)) {
      throw new Error('Expiry days must be a positive number');
    }
  }

  /**
   * Validate bill split details
   * 
   * @param {Object} splitDetails - Split details to validate
   * @private
   */
  _validateSplitDetails(splitDetails) {
    if (!splitDetails.requesterId) {
      throw new Error('Requester ID is required');
    }
    
    if (!splitDetails.totalAmount) {
      throw new Error('Total amount is required');
    }
    
    if (isNaN(parseFloat(splitDetails.totalAmount)) || parseFloat(splitDetails.totalAmount) <= 0) {
      throw new Error('Total amount must be a positive number');
    }
    
    if (!splitDetails.currency) {
      throw new Error('Currency is required');
    }
    
    if (!splitDetails.participants || !Array.isArray(splitDetails.participants) || 
        splitDetails.participants.length === 0) {
      throw new Error('At least one participant is required');
    }
    
    // Validate each participant
    for (const participant of splitDetails.participants) {
      if (!participant.id) {
        throw new Error('Participant ID is required');
      }
      
      if (participant.id === splitDetails.requesterId) {
        throw new Error('Requester cannot be a participant');
      }
      
      if (!participant.amount) {
        throw new Error('Participant amount is required');
      }
      
      if (isNaN(parseFloat(participant.amount)) || parseFloat(participant.amount) <= 0) {
        throw new Error('Participant amount must be a positive number');
      }
    }
    
    // Validate that the sum of participant amounts equals the total amount
    const participantSum = splitDetails.participants.reduce(
      (sum, participant) => sum + parseFloat(participant.amount), 0
    );
    
    if (Math.abs(participantSum - parseFloat(splitDetails.totalAmount)) > 0.01) {
      throw new Error('Sum of participant amounts must equal the total amount');
    }
    
    if (splitDetails.expiryDays && 
        (isNaN(parseInt(splitDetails.expiryDays)) || parseInt(splitDetails.expiryDays) <= 0)) {
      throw new Error('Expiry days must be a positive number');
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
      case ERROR_CODES.INSUFFICIENT_FUNDS:
        return 'Insufficient funds for transfer';
        
      case ERROR_CODES.PAYMENT_METHOD_ERROR:
        return 'P2P transfer failed';
        
      case ERROR_CODES.TIMEOUT_ERROR:
        return 'P2P transfer request timed out';
        
      default:
        return 'An error occurred while processing P2P transfer';
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

export default P2PTransferManager;