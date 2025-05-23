/**
 * KeyManagement.js
 * 
 * Enterprise-grade key management system for Sunny Payment Gateway
 * Implements secure cryptographic key operations including:
 * - Key generation and secure storage
 * - Key rotation and versioning
 * - HSM (Hardware Security Module) integration
 * - Key backup and recovery
 * - Usage tracking and auditing
 * - Support for various key types (encryption, signing, hmac, etc.)
 * 
 * This implementation follows financial industry best practices and
 * is designed to meet PCI DSS, NIST, and other regulatory requirements.
 */

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';
import { logSecurityEvent } from '../transactionLogger.js';

// Constants
const KEY_STATUS = {
  ACTIVE: 'active',
  ROTATING: 'rotating',
  DEACTIVATED: 'deactivated',
  COMPROMISED: 'compromised',
  ARCHIVED: 'archived'
};

// Key purpose definitions
const KEY_PURPOSES = {
  DATA: 'data',             // For general data encryption
  PII: 'pii',               // For personally identifiable information
  PAYMENT: 'payment',       // For payment card data
  AUTH: 'auth',             // For authentication data
  HMAC: 'hmac',             // For message authentication
  SIGNING: 'signing',       // For digital signatures
  MASTER: 'master',         // Master key for encrypting other keys
  TRANSACTION: 'transaction' // For transaction data
};

// Key strength recommendations
const KEY_STRENGTHS = {
  AES: 256,           // AES key size in bits
  RSA: 4096,          // RSA key size in bits
  ECC: 'secp384r1',   // ECC curve
  HMAC: 'sha512'      // HMAC algorithm
};

// Default key rotation periods (in days)
const DEFAULT_ROTATION_PERIODS = {
  [KEY_PURPOSES.DATA]: 90,
  [KEY_PURPOSES.PII]: 90,
  [KEY_PURPOSES.PAYMENT]: 30,
  [KEY_PURPOSES.AUTH]: 90,
  [KEY_PURPOSES.HMAC]: 180,
  [KEY_PURPOSES.SIGNING]: 365,
  [KEY_PURPOSES.MASTER]: 730,
  [KEY_PURPOSES.TRANSACTION]: 90
};

class KeyManagement extends EventEmitter {
  constructor(options = {}) {
    super();
    
    this.options = {
      useHsm: options.useHsm || false,
      hsmProvider: options.hsmProvider || 'simulator',
      hsmConfig: options.hsmConfig || {},
      keyStorePath: options.keyStorePath || path.join(process.cwd(), 'secure-keys'),
      autoRotation: options.autoRotation !== false,
      backupPath: options.backupPath || path.join(process.cwd(), 'key-backups'),
      ...options
    };
    
    // Key metadata storage
    this.keyMetadata = new Map();
    
    // Key cache for active keys (in-memory only for active session)
    this.keyCache = new Map();
    
    // Key usage tracking
    this.keyUsage = new Map();
    
    // If using HSM, initialize connection later
    this.hsmClient = null;
  }
  
  /**
   * Initialize the key management system
   * Creates necessary directories and loads existing key metadata
   */
  async initialize() {
    try {
      // Create key store directory if it doesn't exist
      await fs.mkdir(this.options.keyStorePath, { recursive: true });
      
      // Create backup directory if it doesn't exist
      await fs.mkdir(this.options.backupPath, { recursive: true });
      
      // Initialize HSM connection if enabled
      if (this.options.useHsm) {
        await this._initializeHSM();
      }
      
      // Load existing key metadata
      await this._loadKeyMetadata();
      
      logSecurityEvent('KEY_MANAGEMENT_INITIALIZED', {
        useHsm: this.options.useHsm,
        hsmProvider: this.options.useHsm ? this.options.hsmProvider : 'none'
      });
      
      return true;
    } catch (error) {
      logSecurityEvent('KEY_MANAGEMENT_INIT_FAILED', { error: error.message });
      throw new Error(`Failed to initialize key management: ${error.message}`);
    }
  }
  
  /**
   * Initialize connection to Hardware Security Module
   * @private
   */
  async _initializeHSM() {
    // This would be replaced with actual HSM client initialization
    // using vendor-specific SDKs like AWS CloudHSM, Azure Key Vault, etc.
    
    // For demonstration purposes, we'll simulate the HSM connection
    this.hsmClient = {
      isConnected: true,
      provider: this.options.hsmProvider,
      generateKey: async (keyType, keySize) => {
        // Simulate HSM key generation
        return crypto.randomBytes(keySize / 8);
      },
      encrypt: async (data, keyId) => {
        // Simulate HSM encryption
        const key = await this.getKey(keyId);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        const authTag = cipher.getAuthTag();
        return { encrypted, iv, authTag };
      },
      decrypt: async (data, iv, authTag, keyId) => {
        // Simulate HSM decryption
        const key = await this.getKey(keyId);
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        return Buffer.concat([decipher.update(data), decipher.final()]);
      },
      sign: async (data, keyId) => {
        // Simulate HSM signature
        const key = await this.getKey(keyId);
        const hmac = crypto.createHmac('sha512', key);
        hmac.update(data);
        return hmac.digest();
      },
      verify: async (data, signature, keyId) => {
        // Simulate HSM signature verification
        const key = await this.getKey(keyId);
        const hmac = crypto.createHmac('sha512', key);
        hmac.update(data);
        const expected = hmac.digest();
        return crypto.timingSafeEqual(expected, signature);
      }
    };
    
    logSecurityEvent('HSM_CLIENT_INITIALIZED', {
      provider: this.options.hsmProvider
    });
    
    return true;
  }
  
  /**
   * Load key metadata from storage
   * @private
   */
  async _loadKeyMetadata() {
    try {
      // Check if metadata file exists
      const metadataPath = path.join(this.options.keyStorePath, 'key-metadata.json');
      
      try {
        const data = await fs.readFile(metadataPath, 'utf8');
        const metadata = JSON.parse(data);
        
        // Convert to Map structure
        this.keyMetadata.clear();
        for (const [keyId, keyInfo] of Object.entries(metadata)) {
          this.keyMetadata.set(keyId, keyInfo);
        }
        
        logSecurityEvent('KEY_METADATA_LOADED', { 
          keyCount: this.keyMetadata.size 
        });
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
        // If file doesn't exist, create empty metadata
        await this._saveKeyMetadata();
        logSecurityEvent('KEY_METADATA_CREATED', { 
          message: 'No existing metadata found, created new metadata file' 
        });
      }
      
      // Check for keys that need rotation
      await this._checkKeyRotation();
      
      return true;
    } catch (error) {
      logSecurityEvent('KEY_METADATA_LOAD_FAILED', { error: error.message });
      throw new Error(`Failed to load key metadata: ${error.message}`);
    }
  }
  
  /**
   * Save key metadata to storage
   * @private
   */
  async _saveKeyMetadata() {
    try {
      // Convert Map to object for serialization
      const metadata = {};
      for (const [keyId, keyInfo] of this.keyMetadata.entries()) {
        metadata[keyId] = keyInfo;
      }
      
      // Write to file
      const metadataPath = path.join(this.options.keyStorePath, 'key-metadata.json');
      await fs.writeFile(
        metadataPath, 
        JSON.stringify(metadata, null, 2),
        { encoding: 'utf8', mode: 0o600 } // Restrictive permissions
      );
      
      logSecurityEvent('KEY_METADATA_SAVED', { 
        keyCount: this.keyMetadata.size 
      });
      
      return true;
    } catch (error) {
      logSecurityEvent('KEY_METADATA_SAVE_FAILED', { error: error.message });
      throw new Error(`Failed to save key metadata: ${error.message}`);
    }
  }
  
  /**
   * Check for keys that need rotation based on their age
   * @private
   */
  async _checkKeyRotation() {
    if (!this.options.autoRotation) {
      return;
    }
    
    const now = Date.now();
    const keysToRotate = [];
    
    for (const [keyId, keyInfo] of this.keyMetadata.entries()) {
      if (keyInfo.status !== KEY_STATUS.ACTIVE) {
        continue;
      }
      
      const rotationPeriod = keyInfo.rotationPeriod || 
        DEFAULT_ROTATION_PERIODS[keyInfo.purpose] || 
        DEFAULT_ROTATION_PERIODS.DATA;
      
      const rotationDate = new Date(keyInfo.created);
      rotationDate.setDate(rotationDate.getDate() + rotationPeriod);
      
      if (rotationDate.getTime() < now) {
        keysToRotate.push(keyId);
      }
    }
    
    if (keysToRotate.length > 0) {
      logSecurityEvent('KEYS_NEED_ROTATION', { 
        count: keysToRotate.length,
        keyIds: keysToRotate
      });
      
      // Schedule rotation for identified keys
      for (const keyId of keysToRotate) {
        const keyInfo = this.keyMetadata.get(keyId);
        this.emit('key-rotation-needed', { keyId, purpose: keyInfo.purpose });
      }
    }
    
    return keysToRotate;
  }
  
  /**
   * Generate a new cryptographic key
   * 
   * @param {string} purpose - Purpose of the key (e.g., 'data', 'pii', 'payment')
   * @param {Object} options - Key generation options
   * @returns {Promise<string>} Generated key ID
   */
  async generateKey(purpose, options = {}) {
    try {
      const keyId = options.keyId || uuidv4();
      const keyType = options.type || 'aes';
      const keySize = options.size || KEY_STRENGTHS.AES;
      const rotationPeriod = options.rotationPeriod || DEFAULT_ROTATION_PERIODS[purpose] || 90;
      
      let keyMaterial;
      
      // Generate key material (in HSM or locally)
      if (this.options.useHsm && this.hsmClient) {
        // Generate key in HSM
        keyMaterial = await this.hsmClient.generateKey(keyType, keySize);
      } else {
        // Generate key locally
        keyMaterial = crypto.randomBytes(keySize / 8);
      }
      
      // Store key metadata
      const keyInfo = {
        id: keyId,
        purpose: purpose,
        type: keyType,
        size: keySize,
        created: Date.now(),
        lastRotated: null,
        rotationPeriod: rotationPeriod,
        status: KEY_STATUS.ACTIVE,
        version: 1,
        useCount: 0,
        inHsm: this.options.useHsm
      };
      
      this.keyMetadata.set(keyId, keyInfo);
      
      // Save key material
      await this._saveKey(keyId, keyMaterial);
      
      // Update key metadata file
      await this._saveKeyMetadata();
      
      // Create a backup immediately
      await this._backupKey(keyId, keyMaterial);
      
      logSecurityEvent('KEY_GENERATED', {
        keyId,
        purpose,
        type: keyType,
        inHsm: this.options.useHsm
      });
      
      return keyId;
    } catch (error) {
      logSecurityEvent('KEY_GENERATION_FAILED', { 
        purpose, 
        error: error.message 
      });
      throw new Error(`Failed to generate key: ${error.message}`);
    }
  }
  
  /**
   * Save a key to secure storage
   * 
   * @param {string} keyId - ID of the key
   * @param {Buffer} keyMaterial - Key data
   * @private
   */
  async _saveKey(keyId, keyMaterial) {
    try {
      let storedMaterial = keyMaterial;
      
      // If we have a master key, encrypt this key
      const masterKeyId = await this.getActiveKeyId(KEY_PURPOSES.MASTER);
      if (masterKeyId && masterKeyId !== keyId) { // Prevent circular encryption
        storedMaterial = await this._encryptWithMasterKey(keyMaterial, masterKeyId);
      }
      
      // Store the key with tight permissions
      const keyPath = path.join(this.options.keyStorePath, `${keyId}.key`);
      await fs.writeFile(keyPath, storedMaterial, { mode: 0o600 });
      
      // Add to in-memory cache for active keys
      this.keyCache.set(keyId, keyMaterial);
      
      return true;
    } catch (error) {
      throw new Error(`Failed to save key ${keyId}: ${error.message}`);
    }
  }
  
  /**
   * Encrypt key material with a master key
   * 
   * @param {Buffer} keyMaterial - Key data to encrypt
   * @param {string} masterKeyId - ID of the master key
   * @returns {Promise<Buffer>} Encrypted key material
   * @private
   */
  async _encryptWithMasterKey(keyMaterial, masterKeyId) {
    try {
      const masterKey = await this.getKey(masterKeyId);
      
      if (!masterKey) {
        throw new Error(`Master key ${masterKeyId} not found`);
      }
      
      // Generate IV
      const iv = crypto.randomBytes(16);
      
      // Encrypt the key
      const cipher = crypto.createCipheriv('aes-256-gcm', masterKey, iv);
      const encrypted = Buffer.concat([cipher.update(keyMaterial),

