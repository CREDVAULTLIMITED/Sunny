/**
 * Encryption utilities for secure data handling
 */

// Use require to make webpack's module resolution work with polyfills
const crypto = require('crypto-browserify');

// Buffer is required for Node.js compatibility in browsers
// eslint-disable-next-line no-unused-vars
const Buffer = require('buffer/').Buffer;

// Safely access environment variables in both Node.js and browser environments
const getEnvironmentVariable = (key, defaultValue) => {
  // Create a safe environment object that works in both Node.js and browser
  const safeEnv = {};
  
  // Only access process.env if it exists and is accessible
  try {
    if (typeof window.process !== 'undefined' && window.process && window.process.env) {
      Object.assign(safeEnv, window.process.env);
    }
  } catch (error) {
    console.warn('Unable to access process.env, using defaults');
  }
  
  // Return the environment variable or the default value
  return safeEnv[key] || defaultValue;
};

// Generate a secure random key if none is provided
const generateRandomKey = () => {
  try {
    return crypto.randomBytes(32).toString('hex');
  } catch (error) {
    console.warn('Secure random generation failed, using fallback');
    // Fallback for environments where randomBytes might not work
    return Array.from(new Array(32))
      .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'))
      .join('');
  }
};

// Get encryption key from environment or generate one
// We wrap this in a function to defer execution and handle potential errors
const getEncryptionKey = () => {
  try {
    return getEnvironmentVariable('ENCRYPTION_KEY', generateRandomKey());
  } catch (error) {
    console.warn('Failed to get encryption key from environment, using generated key');
    return generateRandomKey();
  }
};

const ENCRYPTION_KEY = getEncryptionKey();

// Initialization vector length
const IV_LENGTH = 16;

/**
 * Encrypt sensitive data
 * @param {Object|string} data - Data to encrypt
 * @returns {string} Encrypted data as base64 string
 */
export function encryptData(data) {
  try {
    // Convert object to string if needed
    const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
    
    // Generate random initialization vector
    let iv;
    try {
      iv = crypto.randomBytes(IV_LENGTH);
    } catch (error) {
      // Fallback for environments where randomBytes might not work properly
      console.warn('Secure IV generation failed, using fallback');
      iv = Buffer.from(Array.from(new Array(IV_LENGTH))
        .map(() => Math.floor(Math.random() * 256)));
    }
    
    // Create cipher using AES-256-GCM
    const cipher = crypto.createCipheriv(
      'aes-256-gcm', 
      Buffer.from(ENCRYPTION_KEY, 'hex'), 
      iv
    );
    
    // Encrypt the data
    let encrypted = cipher.update(dataString, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    // Get the authentication tag
    const authTag = cipher.getAuthTag();
    
    // Combine IV, encrypted data, and auth tag
    const result = Buffer.concat([
      iv,
      authTag,
      Buffer.from(encrypted, 'base64')
    ]).toString('base64');
    
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error(`Failed to encrypt data: ${error.message}`);
  }
}

/**
 * Decrypt encrypted data
 * @param {string} encryptedData - Encrypted data as base64 string
 * @returns {Object|string} Decrypted data
 */
export function decryptData(encryptedData) {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(encryptedData, 'base64');
    
    // Extract IV, auth tag, and encrypted data
    const iv = buffer.slice(0, IV_LENGTH);
    const authTag = buffer.slice(IV_LENGTH, IV_LENGTH + 16);
    const encrypted = buffer.slice(IV_LENGTH + 16).toString('base64');
    
    // Create decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    // Set auth tag
    decipher.setAuthTag(authTag);
    
    // Decrypt the data
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    // Try to parse as JSON if possible
    try {
      return JSON.parse(decrypted);
    } catch (e) {
      // Return as string if not valid JSON
      return decrypted;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error(`Failed to decrypt data: ${error.message}`);
  }
}

/**
 * Hash sensitive data (one-way)
 * @param {string} data - Data to hash
 * @returns {string} Hashed data
 */
export function hashData(data) {
  return crypto
    .createHash('sha256')
    .update(String(data))
    .digest('hex');
}

/**
 * Generate a secure random token
 * @param {number} length - Length of token in bytes
 * @returns {string} Random token as hex string
 */
export function generateSecureToken(length = 32) {
  try {
    return crypto.randomBytes(length).toString('hex');
  } catch (error) {
    console.warn('Secure token generation failed, using fallback');
    // Fallback for environments where randomBytes might not work
    return Array.from(new Array(length))
      .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'))
      .join('');
  }
}

// Create a named constant for the export object
const encryptionService = {
  encryptData,
  decryptData,
  hashData,
  generateSecureToken
};

export default encryptionService;