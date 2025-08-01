/**
 * API Request Signing
 * Implements HMAC-based request signing for secure API communication
 */

import crypto from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);

class RequestSigner {
  constructor() {
    this.algorithm = 'sha256';
    this.encoding = 'hex';
  }

  /**
   * Generate signature for a request
   * @param {Object} params - Request parameters to sign
   * @param {string} apiKey - API key for the merchant
   * @param {string} timestamp - Request timestamp
   * @returns {string} Signature
   */
  async generateSignature(params, apiKey, timestamp) {
    try {
      // Sort parameters alphabetically
      const sortedParams = Object.keys(params)
        .sort()
        .reduce((acc, key) => {
          acc[key] = params[key];
          return acc;
        }, {});

      // Create string to sign
      const stringToSign = [
        timestamp,
        apiKey,
        JSON.stringify(sortedParams)
      ].join('');

      // Generate key using scrypt for additional security
      const signingKey = await scrypt(apiKey, process.env.SIGNING_SALT || 'sunny', 32);

      // Create HMAC
      const hmac = crypto.createHmac(this.algorithm, signingKey);
      hmac.update(stringToSign);
      
      return hmac.digest(this.encoding);
    } catch (error) {
      console.error('Signature generation error:', error);
      throw new Error('Failed to generate request signature');
    }
  }

  /**
   * Verify request signature
   * @param {Object} params - Request parameters
   * @param {string} apiKey - API key for the merchant
   * @param {string} timestamp - Request timestamp
   * @param {string} signature - Signature to verify
   * @returns {Promise<boolean>} Whether signature is valid
   */
  async verifySignature(params, apiKey, timestamp, signature) {
    try {
      const calculatedSignature = await this.generateSignature(params, apiKey, timestamp);
      return crypto.timingSafeEqual(
        Buffer.from(signature, this.encoding),
        Buffer.from(calculatedSignature, this.encoding)
      );
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }

  /**
   * Middleware to verify signed requests
   */
  verifySignatureMiddleware = async (req, res, next) => {
    try {
      const apiKey = req.headers['x-api-key'];
      const timestamp = req.headers['x-timestamp'];
      const signature = req.headers['x-signature'];

      if (!apiKey || !timestamp || !signature) {
        return res.status(401).json({
          success: false,
          error: 'MISSING_SECURITY_HEADERS',
          message: 'Required security headers are missing'
        });
      }

      // Check timestamp freshness (within 5 minutes)
      const timestampAge = Date.now() - parseInt(timestamp);
      if (timestampAge > 5 * 60 * 1000) {
        return res.status(401).json({
          success: false,
          error: 'REQUEST_EXPIRED',
          message: 'Request has expired'
        });
      }

      // Get request body or query parameters
      const params = req.method === 'GET' ? req.query : req.body;

      // Verify signature
      const isValid = await this.verifySignature(params, apiKey, timestamp, signature);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: 'INVALID_SIGNATURE',
          message: 'Request signature is invalid'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Generate API credentials for a merchant
   * @returns {Promise<Object>} API credentials
   */
  async generateApiCredentials() {
    const apiKey = crypto.randomBytes(32).toString('hex');
    const signingKey = crypto.randomBytes(32).toString('hex');
    
    return {
      apiKey,
      signingKey,
      createdAt: new Date().toISOString()
    };
  }
}

const requestSigner = new RequestSigner();
export default requestSigner;
