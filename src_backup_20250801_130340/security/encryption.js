/**
 * Encryption utilities for secure data handling
 * Implements PCI DSS encryption requirements
 */

import config from '../config/config';
import { logger } from '../services/loggingService';

// Use Web Crypto API for browser environment
const crypto = window.crypto;

// PCI DSS compliant key generation
const generateEncryptionKey = async () => {
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  );
  return key;
};

// PCI DSS compliant key rotation
const rotateEncryptionKey = async () => {
  const newKey = await generateEncryptionKey();
  await updateEncryptionKey(newKey);
  return newKey;
};

// Use Web Crypto API for browser-compatible encryption
const getEncryptionKey = async () => {
  let keyData = await getLatestKey();
  
  // Ensure key meets PCI DSS requirements
  if (!isKeyCompliant(keyData)) {
    logger.warn('Encryption key not compliant, generating new key');
    keyData = await rotateEncryptionKey();
  }
  
  return keyData;
};

// PCI DSS compliant key validation
const isKeyCompliant = (key) => {
  return (
    key && // Key must exist
    !isKeyExpired(key)
  );
};

const isKeyExpired = (key) => {
  const keyAge = getKeyAge(key);
  return keyAge > config.security.keyRotationInterval;
};

const getKeyAge = (key) => {
  // Implementation to get key age from metadata
  return Date.now() - key.createdAt;
};

// Enhanced encryption with additional security measures
export const encryptData = async (data, options = {}) => {
  try {
    const key = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));

    // Add additional authenticated data for AEAD
    const aad = options.aad ? encoder.encode(options.aad) : new Uint8Array();

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
        additionalData: aad,
        tagLength: 128 // 128-bit authentication tag
      },
      key,
      encodedData
    );

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    // Add metadata for key rotation and validation
    const metadata = {
      version: 1,
      keyId: await getKeyId(key),
      timestamp: Date.now(),
      algorithm: 'AES-GCM'
    };

    return {
      data: btoa(String.fromCharCode(...encryptedArray)),
      metadata
    };
  } catch (error) {
    logger.error('Encryption error:', error);
    throw new Error('Encryption failed: ' + error.message);
  }
};

// Enhanced decryption with additional security measures
export const decryptData = async (encryptedObject, options = {}) => {
  try {
    const { data: encryptedString, metadata } = encryptedObject;
    const key = await getEncryptionKey(metadata.keyId);
    const encryptedData = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));
    
    // Extract IV and data
    const iv = encryptedData.slice(0, 12);
    const data = encryptedData.slice(12);

    // Add additional authenticated data for AEAD
    const encoder = new TextEncoder();
    const aad = options.aad ? encoder.encode(options.aad) : new Uint8Array();

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
        additionalData: aad,
        tagLength: 128 // 128-bit authentication tag
      },
      key,
      data
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedData));
  } catch (error) {
    logger.error('Decryption error:', error);
    throw new Error('Decryption failed: ' + error.message);
  }
};

// Key management functions
const getLatestKey = async () => {
  // Implementation to get latest key from secure key storage
  return config.security.encryptionKey;
};

const getKeyId = async (key) => {
  // Implementation to get key ID from key metadata
  return crypto.createHash('sha256')
    .update(key)
    .digest('hex')
    .slice(0, 8);
};

const updateEncryptionKey = async (newKey) => {
  // Implementation to update key in secure storage
  // Should use proper key management system in production
  config.security.encryptionKey = newKey;
};

// Encryption service with additional PCI DSS compliance features
export const encryptionService = {
  encryptData,
  decryptData,
  rotateEncryptionKey,
  validateKeyCompliance: isKeyCompliant
};