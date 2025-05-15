/**
 * Sunny Payment Gateway - Encryption Module
 * 
 * Provides encryption and decryption utilities for sensitive data
 */

import crypto from 'crypto';

// Encryption algorithm and settings
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const AUTH_TAG_LENGTH = 16;

// Get encryption key from environment or generate a secure one for development
const getEncryptionKey = () => {
  const envKey = process.env.SUNNY_ENCRYPTION_KEY;
  if (envKey && Buffer.from(envKey, 'hex').length === KEY_LENGTH) {
    return Buffer.from(envKey, 'hex');
  }
  
  // For development only - in production, always use an environment variable
  console.warn('Warning: Using default encryption key. Set SUNNY_ENCRYPTION_KEY environment variable in production.');
  return Buffer.from('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'hex').slice(0, KEY_LENGTH);
};

/**
 * Encrypt sensitive data
 * 
 * @param {Object|string} data - Data to encrypt
 * @returns {string} Encrypted data as hex string
 */
export function encryptData(data) {
  try {
    // Convert data to string if it's an object
    const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
    
    // Generate random initialization vector
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Get encryption key
    const key = getEncryptionKey();
    
    // Create cipher
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    // Encrypt data
    let encrypted = cipher.update(dataString, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get authentication tag
    const authTag = cipher.getAuthTag();
    
    // Combine IV, encrypted data, and auth tag
    const result = iv.toString('hex') + ':' + encrypted + ':' + authTag.toString('hex');
    
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt encrypted data
 * 
 * @param {string} encryptedData - Encrypted data as hex string
 * @returns {Object|string} Decrypted data
 */
export function decryptData(encryptedData) {
  try {
    // Split encrypted data into IV, data, and auth tag
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const authTag = Buffer.from(parts[2], 'hex');
    
    // Get encryption key
    const key = getEncryptionKey();
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt data
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
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
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Generate a secure hash of data
 * 
 * @param {string} data - Data to hash
 * @param {string} salt - Optional salt
 * @returns {string} Hashed data
 */
export function hashData(data, salt = '') {
  const hash = crypto.createHash('sha256');
  hash.update(data + salt);
  return hash.digest('hex');
}

/**
 * Generate a random token
 * 
 * @param {number} length - Length of token in bytes
 * @returns {string} Random token as hex string
 */
export function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

export default {
  encryptData,
  decryptData,
  hashData,
  generateToken
};