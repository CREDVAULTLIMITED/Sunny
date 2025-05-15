/**
 * IdentityManager.js
 * 
 * Manages user identities and resolves different identity types (phone, email, username, etc.)
 */

import { IDENTITY_TYPES, ERROR_CODES } from '../constants';
import { logError } from '../transactionLogger';

class IdentityManager {
  constructor() {
    // In a real implementation, this would connect to a database
    // For now, we'll use an in-memory store for demonstration
    this.identities = new Map();
    this.aliases = new Map();
    
    // Initialize with some sample data
    this._initializeSampleData();
  }

  /**
   * Resolve an identity from any identifier (phone, email, username, etc.)
   * 
   * @param {string} identifier - The identifier to resolve
   * @returns {Promise<Object|null>} Resolved identity or null if not found
   */
  async resolveIdentity(identifier) {
    try {
      // Clean and normalize the identifier
      const normalizedIdentifier = this._normalizeIdentifier(identifier);
      
      // Check if this is a direct Sunny ID
      if (this.identities.has(normalizedIdentifier)) {
        return this.identities.get(normalizedIdentifier);
      }
      
      // Check if this is an alias
      if (this.aliases.has(normalizedIdentifier)) {
        const sunnyId = this.aliases.get(normalizedIdentifier);
        return this.identities.get(sunnyId);
      }
      
      // Check if this is a username with @ prefix
      if (identifier.startsWith('@')) {
        const username = identifier.substring(1); // Remove @ prefix
        const sunnyId = this.aliases.get(`username:${username.toLowerCase()}`);
        if (sunnyId) {
          return this.identities.get(sunnyId);
        }
      }
      
      // Determine identifier type and try to resolve
      const identifierType = this._determineIdentifierType(normalizedIdentifier);
      if (identifierType) {
        const key = `${identifierType.toLowerCase()}:${normalizedIdentifier}`;
        const sunnyId = this.aliases.get(key);
        if (sunnyId) {
          return this.identities.get(sunnyId);
        }
      }
      
      // Identity not found
      return null;
    } catch (error) {
      logError('IDENTITY_RESOLUTION_ERROR', error, { identifier });
      throw new Error(`Failed to resolve identity: ${error.message}`);
    }
  }

  /**
   * Register a new identity
   * 
   * @param {Object} identityData - Identity data
   * @returns {Promise<Object>} Created identity
   */
  async registerIdentity(identityData) {
    try {
      // Validate required fields
      if (!identityData.primaryIdentifier) {
        throw new Error('Primary identifier is required');
      }
      
      // Generate Sunny ID if not provided
      const sunnyId = identityData.sunnyId || this._generateSunnyId();
      
      // Check if identity already exists
      if (this.identities.has(sunnyId)) {
        throw new Error('Identity already exists');
      }
      
      // Create identity object
      const identity = {
        sunnyId,
        primaryIdentifier: identityData.primaryIdentifier,
        type: identityData.type || IDENTITY_TYPES.USERNAME,
        displayName: identityData.displayName || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: identityData.verified || false,
        aliases: identityData.aliases || []
      };
      
      // Store identity
      this.identities.set(sunnyId, identity);
      
      // Register aliases
      if (identity.aliases && Array.isArray(identity.aliases)) {
        for (const alias of identity.aliases) {
          this._registerAlias(alias.type, alias.value, sunnyId);
        }
      }
      
      // Register primary identifier as alias
      this._registerAlias(identity.type, identity.primaryIdentifier, sunnyId);
      
      return identity;
    } catch (error) {
      logError('IDENTITY_REGISTRATION_ERROR', error, { identityData });
      throw new Error(`Failed to register identity: ${error.message}`);
    }
  }

  /**
   * Add an alias to an existing identity
   * 
   * @param {string} sunnyId - Sunny ID
   * @param {string} aliasType - Type of alias (PHONE, EMAIL, etc.)
   * @param {string} aliasValue - Value of the alias
   * @returns {Promise<Object>} Updated identity
   */
  async addAlias(sunnyId, aliasType, aliasValue) {
    try {
      // Check if identity exists
      if (!this.identities.has(sunnyId)) {
        throw new Error('Identity not found');
      }
      
      // Get identity
      const identity = this.identities.get(sunnyId);
      
      // Normalize alias value
      const normalizedValue = this._normalizeIdentifier(aliasValue);
      
      // Check if alias already exists
      const aliasKey = `${aliasType.toLowerCase()}:${normalizedValue}`;
      if (this.aliases.has(aliasKey)) {
        throw new Error('Alias already registered to another identity');
      }
      
      // Register alias
      this._registerAlias(aliasType, normalizedValue, sunnyId);
      
      // Update identity aliases
      if (!identity.aliases) {
        identity.aliases = [];
      }
      
      identity.aliases.push({
        type: aliasType,
        value: normalizedValue,
        verified: false,
        addedAt: new Date()
      });
      
      // Update identity
      identity.updatedAt = new Date();
      this.identities.set(sunnyId, identity);
      
      return identity;
    } catch (error) {
      logError('ADD_ALIAS_ERROR', error, { sunnyId, aliasType, aliasValue });
      throw new Error(`Failed to add alias: ${error.message}`);
    }
  }

  /**
   * Verify an alias
   * 
   * @param {string} sunnyId - Sunny ID
   * @param {string} aliasType - Type of alias
   * @param {string} aliasValue - Value of the alias
   * @returns {Promise<Object>} Updated identity
   */
  async verifyAlias(sunnyId, aliasType, aliasValue) {
    try {
      // Check if identity exists
      if (!this.identities.has(sunnyId)) {
        throw new Error('Identity not found');
      }
      
      // Get identity
      const identity = this.identities.get(sunnyId);
      
      // Normalize alias value
      const normalizedValue = this._normalizeIdentifier(aliasValue);
      
      // Find alias in identity
      if (!identity.aliases) {
        throw new Error('Identity has no aliases');
      }
      
      const aliasIndex = identity.aliases.findIndex(
        alias => alias.type === aliasType && alias.value === normalizedValue
      );
      
      if (aliasIndex === -1) {
        throw new Error('Alias not found for this identity');
      }
      
      // Update alias verification status
      identity.aliases[aliasIndex].verified = true;
      identity.aliases[aliasIndex].verifiedAt = new Date();
      
      // Update identity
      identity.updatedAt = new Date();
      this.identities.set(sunnyId, identity);
      
      return identity;
    } catch (error) {
      logError('VERIFY_ALIAS_ERROR', error, { sunnyId, aliasType, aliasValue });
      throw new Error(`Failed to verify alias: ${error.message}`);
    }
  }

  /**
   * Get identity by Sunny ID
   * 
   * @param {string} sunnyId - Sunny ID
   * @returns {Promise<Object|null>} Identity or null if not found
   */
  async getIdentity(sunnyId) {
    return this.identities.get(sunnyId) || null;
  }

  /**
   * Register an alias in the alias map
   * 
   * @param {string} aliasType - Type of alias
   * @param {string} aliasValue - Value of the alias
   * @param {string} sunnyId - Sunny ID
   * @private
   */
  _registerAlias(aliasType, aliasValue, sunnyId) {
    const normalizedValue = this._normalizeIdentifier(aliasValue);
    const aliasKey = `${aliasType.toLowerCase()}:${normalizedValue}`;
    
    // Store alias mapping
    this.aliases.set(aliasKey, sunnyId);
    
    // For usernames, also store with @ prefix for easy lookup
    if (aliasType === IDENTITY_TYPES.USERNAME) {
      this.aliases.set(`@${normalizedValue}`, sunnyId);
    }
  }

  /**
   * Normalize an identifier (lowercase, remove spaces, etc.)
   * 
   * @param {string} identifier - Identifier to normalize
   * @returns {string} Normalized identifier
   * @private
   */
  _normalizeIdentifier(identifier) {
    if (!identifier) return '';
    
    // Remove spaces, dashes, and other formatting characters
    let normalized = identifier.toString().replace(/[\s\-\(\)\.]/g, '');
    
    // For phone numbers, ensure they're in E.164 format if possible
    if (this._isPhoneNumber(normalized)) {
      // Very basic normalization - in a real system this would be more sophisticated
      if (normalized.startsWith('+')) {
        // Already in international format
      } else if (normalized.startsWith('0')) {
        // Assume Kenya for demo purposes
        normalized = '+254' + normalized.substring(1);
      }
    }
    
    // For emails and usernames, convert to lowercase
    if (this._isEmail(normalized) || !this._isPhoneNumber(normalized)) {
      normalized = normalized.toLowerCase();
    }
    
    // Remove @ prefix from usernames if present
    if (normalized.startsWith('@')) {
      normalized = normalized.substring(1);
    }
    
    return normalized;
  }

  /**
   * Determine the type of an identifier
   * 
   * @param {string} identifier - Identifier to check
   * @returns {string|null} Identifier type or null if unknown
   * @private
   */
  _determineIdentifierType(identifier) {
    if (this._isPhoneNumber(identifier)) {
      return IDENTITY_TYPES.PHONE;
    }
    
    if (this._isEmail(identifier)) {
      return IDENTITY_TYPES.EMAIL;
    }
    
    if (this._isBankAccount(identifier)) {
      return IDENTITY_TYPES.BANK_ACCOUNT;
    }
    
    if (this._isCryptoAddress(identifier)) {
      return IDENTITY_TYPES.CRYPTO_ADDRESS;
    }
    
    // Default to username
    return IDENTITY_TYPES.USERNAME;
  }

  /**
   * Check if an identifier is a phone number
   * 
   * @param {string} identifier - Identifier to check
   * @returns {boolean} True if phone number
   * @private
   */
  _isPhoneNumber(identifier) {
    // Basic check - in a real system this would be more sophisticated
    return /^[+]?[0-9]{10,15}$/.test(identifier);
  }

  /**
   * Check if an identifier is an email
   * 
   * @param {string} identifier - Identifier to check
   * @returns {boolean} True if email
   * @private
   */
  _isEmail(identifier) {
    // Basic check - in a real system this would be more sophisticated
    return /^[^@]+@[^@]+\.[^@]+$/.test(identifier);
  }

  /**
   * Check if an identifier is a bank account
   * 
   * @param {string} identifier - Identifier to check
   * @returns {boolean} True if bank account
   * @private
   */
  _isBankAccount(identifier) {
    // Basic check - in a real system this would be more sophisticated
    return /^[0-9]{8,20}$/.test(identifier);
  }

  /**
   * Check if an identifier is a crypto address
   * 
   * @param {string} identifier - Identifier to check
   * @returns {boolean} True if crypto address
   * @private
   */
  _isCryptoAddress(identifier) {
    // Basic check - in a real system this would be more sophisticated
    return /^(0x[a-fA-F0-9]{40}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(identifier);
  }

  /**
   * Generate a unique Sunny ID
   * 
   * @returns {string} Generated Sunny ID
   * @private
   */
  _generateSunnyId() {
    // In a real system, this would use a more sophisticated ID generation method
    return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }

  /**
   * Initialize sample data for demonstration
   * 
   * @private
   */
  _initializeSampleData() {
    // Sample user 1
    const user1 = {
      sunnyId: 'user_1001',
      primaryIdentifier: 'john',
      type: IDENTITY_TYPES.USERNAME,
      displayName: 'John Smith',
      verified: true,
      aliases: [
        { type: IDENTITY_TYPES.PHONE, value: '+254712345678', verified: true },
        { type: IDENTITY_TYPES.EMAIL, value: 'john@example.com', verified: true },
        { type: IDENTITY_TYPES.BANK_ACCOUNT, value: '12345678901', verified: true }
      ]
    };
    
    // Sample user 2
    const user2 = {
      sunnyId: 'user_1002',
      primaryIdentifier: 'sarah',
      type: IDENTITY_TYPES.USERNAME,
      displayName: 'Sarah Johnson',
      verified: true,
      aliases: [
        { type: IDENTITY_TYPES.PHONE, value: '+254723456789', verified: true },
        { type: IDENTITY_TYPES.EMAIL, value: 'sarah@example.com', verified: true },
        { type: IDENTITY_TYPES.CRYPTO_ADDRESS, value: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', verified: true }
      ]
    };
    
    // Sample user 3
    const user3 = {
      sunnyId: 'user_1003',
      primaryIdentifier: 'merchant',
      type: IDENTITY_TYPES.USERNAME,
      displayName: 'Sample Merchant',
      verified: true,
      aliases: [
        { type: IDENTITY_TYPES.PHONE, value: '+254734567890', verified: true },
        { type: IDENTITY_TYPES.EMAIL, value: 'merchant@example.com', verified: true },
        { type: IDENTITY_TYPES.BANK_ACCOUNT, value: '98765432109', verified: true }
      ]
    };
    
    // Register sample users
    this.registerIdentity(user1);
    this.registerIdentity(user2);
    this.registerIdentity(user3);
  }
}

export default IdentityManager;