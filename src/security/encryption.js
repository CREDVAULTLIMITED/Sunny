/**
 * Encryption utilities for secure data handling
 */

import config from '../config/config';
import { logger } from '../services/loggingService';

// Use Web Crypto API for browser-compatible encryption
const getEncryptionKey = async () => {
  const encoder = new TextEncoder();
  let keyData = config.security.encryptionKey;
  
  // If key is hex string, convert to bytes
  if (keyData.length === 64) { // hex string of 32 bytes
    keyData = Buffer.from(keyData, 'hex').toString();
  }
  
  // Ensure key is exactly 32 bytes
  if (keyData.length < 32) {
    keyData = keyData.padEnd(32, '0');
  } else if (keyData.length > 32) {
    keyData = keyData.slice(0, 32);
  }
  
  const encodedKey = encoder.encode(keyData);
  return await crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
};

export const encryptData = async (data) => {
  try {
    const key = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encodedData
    );

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode(...encryptedArray));
  } catch (error) {
    logger.error('Encryption error:', error);
    throw new Error('Encryption failed: ' + error.message);
  }
};

export const decryptData = async (encryptedString) => {
  try {
    const key = await getEncryptionKey();
    const encryptedData = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));
    
    // Extract IV and data
    const iv = encryptedData.slice(0, 12);
    const data = encryptedData.slice(12);

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
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

export const encryptionService = {
  encryptData,
  decryptData
};