/**
 * CardVault.js
 * 
 * PCI-DSS compliant secure card data storage and tokenization system.
 * This system securely stores payment card data using the Hardware Security Module (HSM)
 * for encryption operations, and implements tokenization to minimize the exposure of
 * sensitive card data throughout the payment ecosystem.
 * 
 * Features:
 * - Secure card data storage using HSM encryption
 * - Tokenization for secure card representation
 * - Access controls and comprehensive audit logging
 * - Automatic key rotation
 * - Data minimization following PCI-DSS requirements
 * - Secure retrieval methods
 */

import crypto from 'crypto';
import { logSecurity, logError, logTransaction } from '../transactionLogger.js';
import HSMInterface from '../hsm/HSMInterface.js';
import { ERROR_CODES, ACCESS_LEVELS, CARD_DATA_ACCESS_TYPES } from '../constants.js';

class CardVault {
  constructor(config = {}) {
    // Configuration with secure defaults
    this.config = {
      tokenPrefix: config.tokenPrefix || 'tkn_',
      tokenExpiryDays: config.tokenExpiryDays || 365, // Default to 1 year
      keyRotationDays: config.keyRotationDays || 90, // 90-day key rotation
      requiredAccessLevel: config.requiredAccessLevel || ACCESS_LEVELS.CARD_VAULT_ACCESS,
      maxCardDataRetentionDays: config.maxCardDataRetentionDays || 730, // 2 years max retention
      dataEncryptionKeyId: config.dataEncryptionKeyId || null,
      hmacKeyId: config.hmacKeyId || null,
      allowPartialCard: config.allowPartialCard !== undefined ? config.allowPartialCard : true,
      defaultCardStorageMethod: config.defaultCardStorageMethod || 'TOKENIZED',
      ...config
    };

    // Initialize HSM connection
    this.hsm = new HSMInterface(config.hsmConfig || {});
    
    // Card data store - in production, this would be a secure database
    // Here we just use in-memory Map for demonstration
    this.cardStore = new Map();
    
    // Token mapping store
    this.tokenStore = new Map();
    
    // Access control logs - track all access attempts
    this.accessLogs = [];
    
    // Token counter for sequential uniqueness
    this.tokenCounter = 0;
    
    // Key rotation tracker
    this.lastKeyRotation = null;
    
    // Track initialization state
    this.initialized = false;
  }

  /**
   * Initialize the CardVault system
   * Sets up encryption keys, validates HSM connection, and schedules key rotation
   * 
   * @param {Object} options - Initialization options
   * @returns {Promise<boolean>} - Success status
   */
  async initialize(options = {}) {
    try {
      // Connect to HSM
      await this.hsm.initialize();
      
      // Log initialization
      await logSecurity('CARD_VAULT_INIT_STARTED', {
        timestamp: Date.now()
      });
      
      // Generate or retrieve encryption keys
      if (!this.config.dataEncryptionKeyId) {
        // Generate new data encryption key
        this.config.dataEncryptionKeyId = await this.hsm.generateKey('AES', {
          algorithm: 'AES-256-GCM',
          rotationInterval: this.config.keyRotationDays * 24 * 60 * 60 * 1000, // days to ms
          purpose: 'CARD_DATA_ENCRYPTION'
        });
      }
      
      if (!this.config.hmacKeyId) {
        // Generate new HMAC key
        this.config.hmacKeyId = await this.hsm.generateKey('HMAC', {
          algorithm: 'SHA-256',
          rotationInterval: this.config.keyRotationDays * 24 * 60 * 60 * 1000, // days to ms
          purpose: 'CARD_DATA_AUTHENTICATION'
        });
      }
      
      // Set up key rotation schedule
      this._scheduleKeyRotation();
      
      // Set initialized flag
      this.initialized = true;
      
      // Log successful initialization
      await logSecurity('CARD_VAULT_INIT_COMPLETED', {
        timestamp: Date.now(),
        dataEncryptionKeyId: this.config.dataEncryptionKeyId,
        hmacKeyId: this.config.hmacKeyId
      });
      
      return true;
    } catch (error) {
      await logError('CARD_VAULT_INIT_FAILED', error);
      return false;
    }
  }

  /**
   * Store a payment card securely
   * 
   * @param {Object} cardData - Card data to store
   * @param {Object} options - Storage options
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Storage result with token
   */
  async storeCard(cardData, options = {}, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.STORE);
      
      // Log access attempt
      await this._logAccess(CARD_DATA_ACCESS_TYPES.STORE, accessContext, true);
      
      // Validate card data
      this._validateCardData(cardData);
      
      // Generate token
      const token = this._generateToken(cardData);
      
      // Determine storage method
      const storageMethod = options.storageMethod || this.config.defaultCardStorageMethod;
      
      // Prepare card data for storage
      const preparedCardData = this._prepareCardData(cardData, storageMethod);
      
      // Encrypt sensitive card data
      const encryptedCardData = await this._encryptCardData(preparedCardData);
      
      // Calculate HMAC for data integrity
      const hmac = await this._generateHMAC(preparedCardData);
      
      // Create card vault record
      const cardRecord = {
        token,
        encryptedData: encryptedCardData,
        hmac,
        cardBrand: cardData.cardBrand || this._determineCardBrand(cardData.cardNumber),
        cardLast4: cardData.cardNumber.slice(-4),
        storageMethod,
        expiryDate: cardData.expiryMonth && cardData.expiryYear ? 
          `${cardData.expiryMonth}/${cardData.expiryYear}` : null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        expiresAt: Date.now() + (this.config.tokenExpiryDays * 24 * 60 * 60 * 1000),
        dataEncryptionKeyId: this.config.dataEncryptionKeyId,
        // Additional metadata
        ...options.metadata
      };
      
      // Save card record in store
      this.cardStore.set(token, cardRecord);
      
      // Create token mapping for lookup by card number
      const cardNumberFingerprint = this._generateFingerprint(cardData.cardNumber);
      this.tokenStore.set(cardNumberFingerprint, token);
      
      // Log successful storage
      await logTransaction('CARD_STORED', {
        token,
        cardBrand: cardRecord.cardBrand,
        storageMethod,
        userId: accessContext.userId
      });
      
      // Return token and public card information
      return {
        success: true,
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4,
        expiryDate: cardRecord.expiryDate,
        tokenExpiryDate: new Date(cardRecord.expiresAt).toISOString()
      };
    } catch (error) {
      // Log access failure
      await this._logAccess(CARD_DATA_ACCESS_TYPES.STORE, accessContext, false, error.message);
      
      // Log error
      await logError('CARD_STORAGE_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CARD_STORAGE_ERROR
      };
    }
  }

  /**
   * Retrieve card data using token
   * 
   * @param {string} token - Card token
   * @param {Object} options - Retrieval options
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Card data retrieval result
   */
  async retrieveCard(token, options = {}, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context - this requires higher privileges
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.RETRIEVE);
      
      // Check token format
      if (!this._isValidToken(token)) {
        throw new Error('Invalid token format');
      }
      
      // Check if token exists
      if (!this.cardStore.has(token)) {
        throw new Error('Token not found');
      }
      
      // Get card record
      const cardRecord = this.cardStore.get(token);
      
      // Check if token has expired
      if (cardRecord.expiresAt < Date.now()) {
        await this._logAccess(CARD_DATA_ACCESS_TYPES.RETRIEVE, accessContext, false, 'Token expired');
        throw new Error('Token has expired');
      }
      
      // Log access attempt
      await this._logAccess(CARD_DATA_ACCESS_TYPES.RETRIEVE, accessContext, true, null, {
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4
      });
      
      // Decrypt card data
      const decryptedCardData = await this._decryptCardData(cardRecord.encryptedData, cardRecord.dataEncryptionKeyId);
      
      // Verify HMAC for data integrity
      const calculatedHMAC = await this._generateHMAC(decryptedCardData);
      if (calculatedHMAC !== cardRecord.hmac) {
        throw new Error('Card data integrity check failed');
      }
      
      // Apply data minimization based on options
      const cardData = this._applyDataMinimization(decryptedCardData, options);
      
      // Update last accessed timestamp
      cardRecord.lastAccessed = Date.now();
      this.cardStore.set(token, cardRecord);
      
      // Log successful retrieval
      await logTransaction('CARD_RETRIEVED', {
        token,
        userId: accessContext.userId,
        dataMinimized: options.dataMinimization !== false
      });
      
      // Return card data
      return {
        success: true,
        token,
        cardData,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4,
        expiryDate: cardRecord.expiryDate
      };
    } catch (error) {
      // Log access failure
      await this._logAccess(CARD_DATA_ACCESS_TYPES.RETRIEVE, accessContext, false, error.message);
      
      // Log error
      await logError('CARD_RETRIEVAL_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CARD_RETRIEVAL_ERROR
      };
    }
  }

  /**
   * Delete card data
   * 
   * @param {string} token - Card token
   * @param {Object} options - Deletion options
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Deletion result
   */
  async deleteCard(token, options = {}, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.DELETE);
      
      // Check token format
      if (!this._isValidToken(token)) {
        throw new Error('Invalid token format');
      }
      
      // Check if token exists
      if (!this.cardStore.has(token)) {
        throw new Error('Token not found');
      }
      
      // Get card record
      const cardRecord = this.cardStore.get(token);
      
      // Log access attempt
      await this._logAccess(CARD_DATA_ACCESS_TYPES.DELETE, accessContext, true, null, {
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4
      });
      
      // Get fingerprint to remove from token store
      const decryptedCardData = await this._decryptCardData(cardRecord.encryptedData, cardRecord.dataEncryptionKeyId);
      const cardNumberFingerprint = this._generateFingerprint(decryptedCardData.cardNumber);
      
      // Remove from token store
      this.tokenStore.delete(cardNumberFingerprint);
      
      // Remove from card store
      this.cardStore.delete(token);
      
      // Log successful deletion
      await logTransaction('CARD_DELETED', {
        token,
        userId: accessContext.userId
      });
      
      // Return success
      return {
        success: true,
        message: 'Card data deleted successfully'
      };
    } catch (error) {
      // Log access failure
      await this._logAccess(CARD_DATA_ACCESS_TYPES.DELETE, accessContext, false, error.message);
      
      // Log error
      await logError('CARD_DELETION_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CARD_DELETION_ERROR
      };
    }
  }

  /**
   * Find existing token for a card number
   * 
   * @param {string} cardNumber - Card number to look up
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Lookup result
   */
  async findExistingCard(cardNumber, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.FIND);
      
      // Log access attempt
      await this._logAccess(CARD_DATA_ACCESS_TYPES.FIND, accessContext, true);
      
      // Generate fingerprint
      const cardNumberFingerprint = this._generateFingerprint(cardNumber);
      
      // Check if we have a token for this card
      if (!this.tokenStore.has(cardNumberFingerprint)) {
        return {
          success: true,
          exists: false
        };
      }
      
      // Get token
      const token = this.tokenStore.get(cardNumberFingerprint);
      
      // Get card record
      const cardRecord = this.cardStore.get(token);
      
      // Check if token has expired
      if (cardRecord.expiresAt < Date.now()) {
        return {
          success: true,
          exists: false
        };
      }
      
      // Return token info
      return {
        success: true,
        exists: true,
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4,
        expiryDate: cardRecord.expiryDate
      };
    } catch (error) {
      // Log access failure
      await this._logAccess(CARD_DATA_ACCESS_TYPES.FIND, accessContext, false, error.message);
      
      // Log error
      await logError('CARD_LOOKUP_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CARD_LOOKUP_ERROR
      };
    }
  }

  /**
   * Update a card's expiry date
   * 
   * @param {string} token - Card token
   * @param {Object} updateData - Data to update (expiryMonth, expiryYear)
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Update result
   */
  async updateCardExpiry(token, updateData, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.UPDATE);
      
      // Check token format
      if (!this._isValidToken(token)) {
        throw new Error('Invalid token format');
      }
      
      // Check if token exists
      if (!this.cardStore.has(token)) {
        throw new Error('Token not found');
      }
      
      // Get card record
      const cardRecord = this.cardStore.get(token);
      
      // Check if token has expired
      if (cardRecord.expiresAt < Date.now()) {
        await this._logAccess(CARD_DATA_ACCESS_TYPES.UPDATE, accessContext, false, 'Token expired');
        throw new Error('Token has expired');
      }
      
      // Log access attempt
      await this._logAccess(CARD_DATA_ACCESS_TYPES.UPDATE, accessContext, true, null, {
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4
      });
      
      // Validate expiry data
      if (!updateData.expiryMonth || !updateData.expiryYear) {
        throw new Error('Expiry month and year are required');
      }
      
      // Decrypt card data
      const decryptedCardData = await this._decryptCardData(cardRecord.encryptedData, cardRecord.dataEncryptionKeyId);
      
      // Update expiry data
      decryptedCardData.expiryMonth = updateData.expiryMonth;
      decryptedCardData.expiryYear = updateData.expiryYear;
      
      // Re-encrypt card data
      const encryptedCardData = await this._encryptCardData(decryptedCardData);
      
      // Re-calculate HMAC
      const hmac = await this._generateHMAC(decryptedCardData);
      
      // Update card record
      cardRecord.encryptedData = encryptedCardData;
      cardRecord.hmac = hmac;
      cardRecord.expiryDate = `${updateData.expiryMonth}/${updateData.expiryYear}`;
      cardRecord.updatedAt = Date.now();
      
      // Save updated record
      this.cardStore.set(token, cardRecord);
      
      // Log successful update
      await logTransaction('CARD_UPDATED', {
        token,
        userId: accessContext.userId
      });
      
      // Return success
      return {
        success: true,
        message: 'Card expiry updated successfully',
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4,
        expiryDate: cardRecord.expiryDate
      };
    } catch (error) {
      // Log access failure
      await this._logAccess(CARD_DATA_ACCESS_TYPES.UPDATE, accessContext, false, error.message);
      
      // Log error
      await logError('CARD_UPDATE_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CARD_UPDATE_ERROR
      };
    }
  }

  /**
   * Extend token expiry date
   * 
   * @param {string} token - Card token
   * @param {Object} options - Extension options
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Extension result
   */
  async extendTokenExpiry(token, options = {}, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.UPDATE);
      
      // Check token format
      if (!this._isValidToken(token)) {
        throw new Error('Invalid token format');
      }
      
      // Check if token exists
      if (!this.cardStore.has(token)) {
        throw new Error('Token not found');
      }
      
      // Get card record
      const cardRecord = this.cardStore.get(token);
      
      // Log access attempt
      await this._logAccess(CARD_DATA_ACCESS_TYPES.UPDATE, accessContext, true, null, {
        token,
        cardBrand: cardRecord.cardBrand,
        cardLast4: cardRecord.cardLast4
      });
      
      // Calculate extension duration
      const extensionDays = options.days || this.config.tokenExpiryDays;
      const newExpiryDate = Date.now() + (extensionDays * 24 * 60 * 60 * 1000);
      
      // Update expiry date
      cardRecord.expiresAt = newExpiryDate;
      cardRecord.updatedAt = Date.now();
      
      // Save updated record
      this.cardStore.set(token, cardRecord);
      
      // Log successful extension
      await logTransaction('TOKEN_EXPIRY_EXTENDED', {
        token,
        userId: accessContext.userId,
        extensionDays
      });
      
      // Return success
      return {
        success: true,
        message: 'Token expiry extended successfully',
        token,
        newExpiryDate: new Date(newExpiryDate).toISOString()
      };
    } catch (error) {
      // Log access failure
      await this._logAccess(CARD_DATA_ACCESS_TYPES.UPDATE, accessContext, false, error.message);
      
      // Log error
      await logError('TOKEN_EXTENSION_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.CARD_UPDATE_ERROR
      };
    }
  }

  /**
   * Perform key rotation for improved security
   * 
   * @param {Object} options - Key rotation options
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Key rotation result
   */
  async rotateKeys(options = {}, accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context - this requires admin privileges
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.ADMIN);
      
      // Log key rotation initiation
      await logSecurity('KEY_ROTATION_INITIATED', {
        timestamp: Date.now(),
        userId: accessContext.userId
      });
      
      // Generate new encryption key
      const newDataEncryptionKeyId = await this.hsm.generateKey('AES', {
        algorithm: 'AES-256-GCM',
        rotationInterval: this.config.keyRotationDays * 24 * 60 * 60 * 1000, // days to ms
        purpose: 'CARD_DATA_ENCRYPTION'
      });
      
      // Generate new HMAC key
      const newHmacKeyId = await this.hsm.generateKey('HMAC', {
        algorithm: 'SHA-256',
        rotationInterval: this.config.keyRotationDays * 24 * 60 * 60 * 1000, // days to ms
        purpose: 'CARD_DATA_AUTHENTICATION'
      });
      
      // Track old key IDs
      const oldDataEncryptionKeyId = this.config.dataEncryptionKeyId;
      const oldHmacKeyId = this.config.hmacKeyId;
      
      // Update config with new keys
      this.config.dataEncryptionKeyId = newDataEncryptionKeyId;
      this.config.hmacKeyId = newHmacKeyId;
      
      // Re-encrypt all card data with new keys
      let reencryptedCount = 0;
      let failedCount = 0;
      
      for (const [token, cardRecord] of this.cardStore.entries()) {
        try {
          // Decrypt with old key
          const decryptedCardData = await this._decryptCardData(
            cardRecord.encryptedData,
            cardRecord.dataEncryptionKeyId || oldDataEncryptionKeyId
          );
          
          // Re-encrypt with new key
          const newEncryptedData = await this._encryptCardData(decryptedCardData);
          
          // Re-calculate HMAC with new key
          const newHmac = await this._generateHMAC(decryptedCardData);
          
          // Update card record
          cardRecord.encryptedData = newEncryptedData;
          cardRecord.hmac = newHmac;
          cardRecord.dataEncryptionKeyId = newDataEncryptionKeyId;
          cardRecord.updatedAt = Date.now();
          
          // Save updated record
          this.cardStore.set(token, cardRecord);
          
          reencryptedCount++;
        } catch (error) {
          failedCount++;
          await logError('CARD_REENCRYPTION_FAILED', error, { token });
        }
      }
      
      // Update last rotation timestamp
      this.lastKeyRotation = Date.now();
      
      // Log key rotation completion
      await logSecurity('KEY_ROTATION_COMPLETED', {
        timestamp: Date.now(),
        userId: accessContext.userId,
        reencryptedCount,
        failedCount,
        oldDataEncryptionKeyId,
        newDataEncryptionKeyId
      });
      
      // Return success
      return {
        success: true,
        message: 'Key rotation completed successfully',
        reencryptedCount,
        failedCount,
        rotationTimestamp: new Date(this.lastKeyRotation).toISOString()
      };
    } catch (error) {
      // Log key rotation failure
      await logError('KEY_ROTATION_FAILED', error);
      
      // Return error response
      return {
        success: false,
        message: error.message,
        errorCode: error.code || ERROR_CODES.KEY_ROTATION_ERROR
      };
    }
  }

  /**
   * Get vault statistics
   * 
   * @param {Object} accessContext - Access control context
   * @returns {Promise<Object>} - Stats result
   */
  async getVaultStats(accessContext = {}) {
    try {
      this._validateInitialization();
      
      // Validate access context - this requires admin privileges
      this._validateAccessContext(accessContext, CARD_DATA_ACCESS_TYPES.ADMIN);
      
      // Calculate stats
      const totalCards = this.cardStore.size;
      const expiredCards = Array.from(this.cardStore.values())
        .filter(record => record.expiresAt < Date.now()).length;
      const activeCards = totalCards - expiredCards;
      
      const stats = {
        totalCards,
        activeCards,
        expiredCards,
