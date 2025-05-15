"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptData = decryptData;
exports["default"] = void 0;
exports.encryptData = encryptData;
exports.generateToken = generateToken;
exports.hashData = hashData;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } /**
 * Sunny Payment Gateway - Encryption Module
 * 
 * Provides encryption and decryption utilities for sensitive data
 */
// Encryption algorithm and settings
var ALGORITHM = 'aes-256-gcm';
var IV_LENGTH = 16;
var KEY_LENGTH = 32;
var AUTH_TAG_LENGTH = 16;

// Get encryption key from environment or generate a secure one for development
var getEncryptionKey = function getEncryptionKey() {
  var envKey = process.env.SUNNY_ENCRYPTION_KEY;
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
function encryptData(data) {
  try {
    // Convert data to string if it's an object
    var dataString = _typeof(data) === 'object' ? JSON.stringify(data) : String(data);

    // Generate random initialization vector
    var iv = _crypto["default"].randomBytes(IV_LENGTH);

    // Get encryption key
    var key = getEncryptionKey();

    // Create cipher
    var cipher = _crypto["default"].createCipheriv(ALGORITHM, key, iv);

    // Encrypt data
    var encrypted = cipher.update(dataString, 'utf8', 'hex');
    encrypted += cipher["final"]('hex');

    // Get authentication tag
    var authTag = cipher.getAuthTag();

    // Combine IV, encrypted data, and auth tag
    var result = iv.toString('hex') + ':' + encrypted + ':' + authTag.toString('hex');
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
function decryptData(encryptedData) {
  try {
    // Split encrypted data into IV, data, and auth tag
    var parts = encryptedData.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }
    var iv = Buffer.from(parts[0], 'hex');
    var encrypted = parts[1];
    var authTag = Buffer.from(parts[2], 'hex');

    // Get encryption key
    var key = getEncryptionKey();

    // Create decipher
    var decipher = _crypto["default"].createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    // Decrypt data
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher["final"]('utf8');

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
function hashData(data) {
  var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var hash = _crypto["default"].createHash('sha256');
  hash.update(data + salt);
  return hash.digest('hex');
}

/**
 * Generate a random token
 * 
 * @param {number} length - Length of token in bytes
 * @returns {string} Random token as hex string
 */
function generateToken() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  return _crypto["default"].randomBytes(length).toString('hex');
}
var _default = exports["default"] = {
  encryptData: encryptData,
  decryptData: decryptData,
  hashData: hashData,
  generateToken: generateToken
};