/**
 * SecurityManager.js
 * 
 * Enterprise-grade security management system for Sunny Payment Gateway
 * Designed for banking and financial services with focus on:
 * - HSM (Hardware Security Module) integration
 * - Strong encryption for sensitive data
 * - Comprehensive key management
 * - Authentication and authorization
 * - Audit logging
 * - Compliance monitoring
 * 
 * This implementation follows industry best practices and is designed
 * to meet PCI DSS, SOC 2, ISO 27001, and banking regulatory requirements.
 */

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';
import fs from 'fs/promises';
import path from 'path';
import KeyManagement from './KeyManagement.js';
import { logSecurityEvent } from '../transactionLogger.js';
import config from '../../config/config.js';

// Constants
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const PBKDF2_ITERATIONS = 100000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = 'sha512';
const KEY_ROTATION_INTERVAL = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_AUTH_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Authentication and authorization levels
const AUTH_LEVELS = {
  NONE: 0,
  BASIC: 1,
  STANDARD: 2,
  ELEVATED: 3, 
  ADMIN: 4,
  SYSTEM: 5
};

// Security operations that require different auth levels
const OPERATION_AUTH_LEVELS = {
  VIEW_PUBLIC_DATA: AUTH_LEVELS.BASIC,
  VIEW_TRANSACTION_HISTORY: AUTH_LEVELS.STANDARD,
  PROCESS_PAYMENT: AUTH_LEVELS.STANDARD,
  REFUND_TRANSACTION: AUTH_LEVELS.ELEVATED,
  UPDATE_USER_PERMISSIONS: AUTH_LEVELS.ADMIN,
  ACCESS_ENCRYPTION_KEYS: AUTH_LEVELS.SYSTEM,
  MODIFY_SECURITY_SETTINGS: AUTH_LEVELS.SYSTEM
};

class SecurityManager extends EventEmitter {
  constructor(options = {}) {
    super();
    
    this.options = {
      environment: options.environment || process.env.NODE_ENV || 'development',
      useHsm: options.useHsm || false,
      hsmProvider: options.hsmProvider || 'simulator',
      hsmConfig: options.hsmConfig || {},
      keyStorePath: options.keyStorePath || path.join(process.cwd(), 'secure-keys'),
      auditLogPath: options.auditLogPath || path.join(process.cwd(), 'logs', 'security-audit'),
      enableComplianceMonitoring: options.enableComplianceMonitoring !== false,
      mfaRequired: options.mfaRequired !== false,
      ...options
    };
    
    // Key management system
    this.keyManager = new KeyManagement({
      useHsm: this.options.useHsm,
      hsmProvider: this.options.hsmProvider,
      hsmConfig: this.options.hsmConfig,
      keyStorePath: this.options.keyStorePath
    });
    
    // Authentication tracking
    this.activeSessions = new Map();
    this.failedAttempts = new Map();
    this.lockedAccounts = new Map();
    
    // Compliance monitoring
    this.complianceRules = new Map();
    this.complianceViolations = [];
    
    // Set up key rotation schedule
    if (this.options.environment === 'production') {
      this.keyRotationInterval = setInterval(() => {
        this._rotateKeys().catch(err => {
          this.emit('error', new Error(`Key rotation failed: ${err.message}`));
          logSecurityEvent('KEY_ROTATION_FAILED', { error: err.message });
        });
      }, KEY_ROTATION_INTERVAL);
    }
    
    // Initialize compliance monitoring
    if (this.options.enableComplianceMonitoring) {
      this._initializeComplianceMonitoring();
    }
  }
  
  /**
   * Initialize the security manager
   * This sets up the HSM connection, prepares initial keys, and ensures
   * the security subsystem is ready for operation
   */
  async initialize() {
    try {
      // Ensure log directories exist
      await fs.mkdir(this.options.auditLogPath, { recursive: true });
      
      // Initialize key manager
      await this.keyManager.initialize();
      
      // Generate initial keys if they don't exist
      const keyTypes = ['data', 'auth', 'hmac', 'transaction'];
      for (const keyType of keyTypes) {
        const hasKey = await this.keyManager.hasActiveKey(keyType);
        if (!hasKey) {
          await this.keyManager.generateKey(keyType);
          logSecurityEvent('INITIAL_KEY_GENERATED', { keyType });
        }
      }
      
      // Set up HSM connection if enabled
      if (this.options.useHsm) {
        await this._initializeHSM();
      }
      
      logSecurityEvent('SECURITY_MANAGER_INITIALIZED', {
        environment: this.options.environment,
        useHsm: this.options.useHsm, 
        hsmProvider: this.options.hsmProvider
      });
      
      return true;
    } catch (error) {
      logSecurityEvent('SECURITY_MANAGER_INIT_FAILED', { error: error.message });
      throw new Error(`Failed to initialize SecurityManager: ${error.message}`);
    }
  }
  
  /**
   * Set up connection to Hardware Security Module
   * @private
   */
  async _initializeHSM() {
    try {
      // In a real implementation, this would connect to actual HSM hardware
      // or cloud HSM service like AWS CloudHSM, Azure Key Vault, or Google Cloud KMS
      
      // For demonstration, we'll log the attempt and simulate the connection
      logSecurityEvent('HSM_CONNECTION_ATTEMPT', { 
        provider: this.options.hsmProvider,
        mode: 'initialize'
      });
      
      // Simulate HSM connection based on provider
      switch (this.options.hsmProvider) {
        case 'aws':
          // AWS CloudHSM connection would be implemented here
          await this._connectToAwsHSM();
          break;
        case 'azure':
          // Azure Key Vault connection would be implemented here
          await this._connectToAzureHSM();
          break;
        case 'google':
          // Google Cloud KMS connection would be implemented here
          await this._connectToGoogleHSM();
          break;
        case 'thales':
          // Thales HSM connection would be implemented here
          await this._connectToThalesHSM();
          break;
        case 'simulator':
        default:
          // Use a simulated HSM for development/testing
          await this._connectToSimulatedHSM();
          break;
      }
      
      // Verify HSM connection and capabilities
      await this._verifyHSMConnection();
      
      logSecurityEvent('HSM_CONNECTION_ESTABLISHED', { provider: this.options.hsmProvider });
      return true;
    } catch (error) {
      logSecurityEvent('HSM_CONNECTION_FAILED', { 
        provider: this.options.hsmProvider,
        error: error.message 
      });
      throw new Error(`HSM connection failed: ${error.message}`);
    }
  }
  
  /**
   * Simulate connection to different HSM providers
   * In a production environment, these would be replaced with actual
   * SDK connections to the respective HSM services
   * @private
   */
  async _connectToAwsHSM() {
    // Simulate AWS CloudHSM connection
    await new Promise(resolve => setTimeout(resolve, 500));
    // In production: Use AWS SDK to connect to CloudHSM cluster
  }
  
  async _connectToAzureHSM() {
    // Simulate Azure Key Vault connection
    await new Promise(resolve => setTimeout(resolve, 500));
    // In production: Use Azure SDK to connect to Key Vault
  }
  
  async _connectToGoogleHSM() {
    // Simulate Google Cloud KMS connection
    await new Promise(resolve => setTimeout(resolve, 500));
    // In production: Use Google Cloud SDK to connect to KMS
  }
  
  async _connectToThalesHSM() {
    // Simulate Thales HSM connection
    await new Promise(resolve => setTimeout(resolve, 500));
    // In production: Use Thales PKCS#11 interface to connect to physical HSM
  }
  
  async _connectToSimulatedHSM() {
    // Simulate an HSM for development and testing
    await new Promise(resolve => setTimeout(resolve, 300));
    // In production: This would be replaced with an actual HSM connection
  }
  
  async _verifyHSMConnection() {
    // Verify HSM connection by performing a test operation
    // This would be used to confirm the HSM is accessible and properly configured
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 200));
      return true;
    } catch (error) {
      throw new Error(`HSM verification failed: ${error.message}`);
    }
  }
  
  /**
   * Encrypt sensitive data using strong encryption
   * 
   * @param {string|Buffer} data - Data to encrypt
   * @param {Object} options - Encryption options
   * @param {string} options.purpose - Purpose of encryption (e.g., 'pii', 'payment', 'auth')
   * @param {string} options.keyId - Specific key ID to use (optional)
   * @param {Object} options.associatedData - Additional authenticated data (optional)
   * @returns {Promise<Object>} Encrypted data object with initialization vector and authentication tag
   */
  async encrypt(data, options = {}) {
    try {
      const purpose = options.purpose || 'data';
      const keyId = options.keyId || await this.keyManager.getActiveKeyId(purpose);
      
      // Retrieve the encryption key
      const encryptionKey = await this.keyManager.getKey(keyId);
      
      if (!encryptionKey) {
        throw new Error(`No active encryption key found for purpose: ${purpose}`);
      }
      
      // Generate initialization vector
      const iv = crypto.randomBytes(16);
      
      // Create cipher
      const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, encryptionKey, iv);
      
      // Set associated authenticated data if provided
      if (options.associatedData) {
        const aadBuffer = Buffer.isBuffer(options.associatedData) 
          ? options.associatedData 
          : Buffer.from(JSON.stringify(options.associatedData));
        cipher.setAAD(aadBuffer);
      }
      
      // Convert data to buffer if it's not already
      const dataBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
      
      // Encrypt the data
      const encryptedData = Buffer.concat([
        cipher.update(dataBuffer),
        cipher.final()
      ]);
      
      // Get the authentication tag
      const authTag = cipher.getAuthTag();
      
      // Log the encryption operation (without the actual data)
      logSecurityEvent('DATA_ENCRYPTED', {
        keyId,
        purpose,
        hasAssociatedData: !!options.associatedData
      });
      
      return {
        encryptedData: encryptedData.toString('base64'),
        iv: iv.toString('base64'),
        authTag: authTag.toString('base64'),
        keyId,
        algorithm: ENCRYPTION_ALGORITHM
      };
    } catch (error) {
      logSecurityEvent('ENCRYPTION_FAILED', { 
        error: error.message,
        purpose: options.purpose || 'data'
      });
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }
  
  /**
   * Decrypt previously encrypted data
   * 
   * @param {Object} encryptedPackage - Package containing encrypted data and metadata
   * @param {Object} options - Decryption options
   * @param {Object} options.associatedData - Additional authenticated data (must match encryption)
   * @returns {Promise<Buffer>} Decrypted data as a buffer
   */
  async decrypt(encryptedPackage, options = {}) {
    try {
      const { encryptedData, iv, authTag, keyId, algorithm } = encryptedPackage;
      
      // Verify we have all required components
      if (!encryptedData || !iv || !authTag || !keyId) {
        throw new Error('Incomplete encrypted package');
      }
      
      // Retrieve the decryption key
      const decryptionKey = await this.keyManager.getKey(keyId);
      
      if (!decryptionKey) {
        throw new Error(`Decryption key not found: ${keyId}`);
      }
      
      // Create decipher
      const decipher = crypto.createDecipheriv(
        algorithm || ENCRYPTION_ALGORITHM,
        decryptionKey,
        Buffer.from(iv, 'base64')
      );
      
      // Set authentication tag
      decipher.setAuthTag(Buffer.from(authTag, 'base64'));
      
      // Set associated authenticated data if provided
      if (options.associatedData) {
        const aadBuffer = Buffer.isBuffer(options.associatedData) 
          ? options.associatedData 
          : Buffer.from(JSON.stringify(options.associatedData));
        decipher.setAAD(aadBuffer);
      }
      
      // Decrypt the data
      const decryptedData = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, 'base64')),
        decipher.final()
      ]);
      
      // Log the decryption operation
      logSecurityEvent('DATA_DECRYPTED', { keyId });
      
      return decryptedData;
    } catch (error) {
      logSecurityEvent('DECRYPTION_FAILED', { error: error.message });
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
  
  /**
   * Create a secure hash of data
   * 
   * @param {string|Buffer} data - Data to hash
   * @param {Object} options - Hashing options
   * @returns {Promise<string>} Hex-encoded hash
   */
  async createHash(data, options = {}) {
    const algorithm = options.algorithm || 'sha256';
    const encoding = options.encoding || 'hex';
    
    try {
      // Create hash
      const hash = crypto.createHash(algorithm);
      
      // Update with data
      hash.update(Buffer.isBuffer(data) ? data : Buffer.from(data));
      
      // Return digest
      return hash.digest(encoding);
    } catch (error) {
      logSecurityEvent('HASH_CREATION_FAILED', { error: error.message });
      throw new Error(`Hash creation failed: ${error.message}`);
    }
  }
  
  /**
   * Create an HMAC signature
   

