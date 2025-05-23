/**
 * Pix Payment Processor for Sunny Payment Gateway
 * Handles Brazilian instant payments via Pix through Banco Central do Brasil
 * 
 * Features:
 * - Static and dynamic QR code generation following EMVCo format
 * - Instant transfer handling
 * - Webhook/callback processing
 * - Transaction status verification
 * - ISO 20022 message format support
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';
import { logTransaction } from '../../core/transactionLogger.js';

// Pix Transaction Types
const PIX_TRANSACTION_TYPES = {
  STATIC_QR: 'STATIC_QR',   // Static QR code (no amount, no expiry)
  DYNAMIC_QR: 'DYNAMIC_QR', // Dynamic QR code with payment info
  COB: 'COB',               // Charge creation (cobrança)
  TRANSFER: 'TRANSFER',     // Direct transfer
  DEVOLUTION: 'DEVOLUTION'  // Refund/devolution
};

class PixProcessor {
  constructor(config = {}) {
    // Initialize Pix configuration
    this.clientId = config.clientId || process.env.PIX_CLIENT_ID;
    this.clientSecret = config.clientSecret || process.env.PIX_CLIENT_SECRET;
    this.certificatePath = config.certificatePath || process.env.PIX_CERTIFICATE_PATH;
    this.pixKey = config.pixKey || process.env.PIX_KEY; // Pix key (CPF, CNPJ, email, phone or random)
    this.pixKeyType = config.pixKeyType || process.env.PIX_KEY_TYPE || 'RANDOM'; // CPF, CNPJ, EMAIL, PHONE, RANDOM
    this.merchantName = config.merchantName || process.env.PIX_MERCHANT_NAME;
    this.merchantCity = config.merchantCity || process.env.PIX_MERCHANT_CITY;
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.callbackUrl = config.callbackUrl || process.env.PIX_CALLBACK_URL || 'https://api.sunnypayments.com/api/callbacks/pix';
    
    // Validate required configuration
    if (!this.clientId || !this.clientSecret || !this.pixKey) {
      throw new Error('Missing required Pix configuration');
    }
    
    // Set API URL based on environment
    this.apiUrl = this.environment === 'production'
      ? 'https://api.pix.bcb.gov.br/v2'
      : 'https://api.pix.sandbox.bcb.gov.br/v2';
    
    // Certificate for secure connection to BCB
    this.certificate = config.certificate || null;
    
    // QR code expiration time in minutes (default: 60 minutes)
    this.expirationMinutes = config.expirationMinutes || 60;
  }
  
  /**
   * Get OAuth2 access token for Pix API
   * 
   * @private
   * @returns {Promise<string>} Access token
   */
  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl.replace('/v2', '')}/oauth/token`,
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials&scope=pix.write pix.read',
        httpsAgent: this.certificate ? this.createHttpsAgent() : undefined
      });
      
      return response.data.access_token;
    } catch (error) {
      console.error('Pix authentication error:', error.response?.data || error);
      throw new Error('Failed to authenticate with Pix API');
    }
  }
  
  /**
   * Create HTTPS agent with client certificate
   * 
   * @private
   * @returns {https.Agent} HTTPS agent with certificate
   */
  createHttpsAgent() {
    if (!this.certificate) {
      throw new Error('Certificate not loaded for Pix API');
    }
    
    const https = require('https');
    return new https.Agent({
      cert: this.certificate,
      rejectUnauthorized: this.environment === 'production'
    });
  }
  
  /**
   * Generate a static Pix QR code
   * 
   * @param {Object} qrData - QR code information
   * @returns {Promise<Object>} Generated QR code
   */
  async generateStaticQrCode(qrData) {
    try {
      const { 
        transactionId = uuidv4(),
        description,
        merchantName = this.merchantName,
        merchantCity = this.merchantCity
      } = qrData;
      
      // Log the QR code generation attempt
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: 'pix',
        metadata: {
          transactionType: PIX_TRANSACTION_TYPES.STATIC_QR,
          processor: 'PixProcessor',
          processStep: 'STATIC_QR_INITIATED'
        }
      });
      
      // Generate EMVCo format QR code payload
      // Format follows EMV® QR Code Specification for Payment Systems
      const payload = this.generateEMVCoPayload({
        pixKey: this.pixKey,
        pixKeyType: this.pixKeyType,
        merchantName,
        merchantCity,
        description,
        reference: transactionId,
        amount: null, // Static QR has no amount
        isStatic: true
      });
      
      // Create the QR code
      const accessToken = await this.getAccessToken();
      
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/qrcodes/static`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          pixKey: this.pixKey,
          pixKeyType: this.pixKeyType,
          merchantName,
          merchantCity,
          description: description || 'Payment via Sunny Gateway',
          transactionId,
          emv: payload
        },
        httpsAgent: this.certificate ? this.createHttpsAgent() : undefined
      });
      
      // Log successful QR code generation
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.PENDING,
        paymentMethod: 'pix',
        metadata: {
          qrCodeId: response.data.id,
          qrCodePayload: payload,
          processor: 'PixProcessor',
          processStep: 'STATIC_QR_GENERATED'
        }
      });
      
      return {
        success: true,
        status: PAYMENT_STATUS.PENDING,
        transactionId,
        qrCodeId: response.data.id,
        qrCodeImage: response.data.qrCodeImage,
        qrCodePayload: payload,
        pixKey: this.pixKey,
        processorResponse: {
          processorTransactionId: response.data.id,
          processorName: 'PixProcessor'
        },
        message: 'Static Pix QR code generated successfully'
      };
    } catch (error) {
      console.error('Pix static QR generation error:', error.response?.data || error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId: qrData.transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'pix',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'PixProcessor',
            processStep: 'STATIC_QR_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log Pix error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.message || error.message || 'Failed to generate static Pix QR code'
      };
    }
  }
  
  /**
   * Generate a dynamic Pix QR code with payment information
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Generated QR code with payment details
   */
  async generateDynamicQrCode(paymentData) {
    try {
      const { 
        amount, 
        transactionId = uuidv4(), 
        description,
        expirationMinutes = this.expirationMinutes,
        merchantName = this.merchantName,
        merchantCity = this.merchantCity
      } = paymentData;
      
      // Log the QR code generation attempt
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: 'pix',
        amount,
        currency: 'BRL', // Pix only supports BRL
        metadata: {
          transactionType: PIX_TRANSACTION_TYPES.DYNAMIC_QR,
          processor: 'PixProcessor',
          processStep: 'DYNAMIC_QR_INITIATED'
        }
      });
      
      // Calculate expiration time
      const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000).toISOString();
      
      // Generate EMVCo format QR code payload
      const payload = this.generateEMVCoPayload({
        pixKey: this.pixKey,
        pixKeyType: this.pixKeyType,
        merchantName,
        merchantCity,
        description,
        reference: transactionId,
        amount,
        isStatic: false
      });
      
      // Create the charge (cobrança) in BCB
      const accessToken = await this.getAccessToken();
      
      const cobResponse = await axios({
        method: 'post',
        url: `${this.apiUrl}/cob`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          calendario: {
            expiracao: expirationMinutes * 60 // Convert to seconds
          },
          valor: {
            original: parseFloat(amount).toFixed(2)
          },
          chave: this.pixKey,
          solicitacaoPagador: description || 'Payment via Sunny Gateway',
          infoAdicionais: [
            {
              nome: 'transactionId',
              valor: transactionId
            }
          ]
        },
        httpsAgent: this.certificate ? this.createHttpsAgent() : undefined
      });
      
      // Get QR code for the created charge
      const qrResponse = await axios({
        method: 'get',
        url: `${this.apiUrl}/cob/${cobResponse.data.txid}/qrcode`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        httpsAgent: this.certificate ? this.createHttpsAgent() : undefined
      });
      
      // Log successful QR code generation
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.PENDING,
        paymentMethod: 'pix',
        amount,
        currency: 'BRL',
        metadata: {
          txid: cobResponse.data.txid,
          qrCodeUrl: qrResponse.data.imagemQrcode,
          qrCodePayload: qrResponse.data.qrcode,
          expiresAt,
          processor: 'PixProcessor',
          processStep: 'DYNAMIC_QR_GENERATED'
        }
      });
      
      return {
        success: true,
        status: PAYMENT_STATUS.PENDING,
        transactionId,
        pixTxid: cobResponse.data.txid,
        qrCodeUrl: qrResponse.data.imagemQrcode,
        qrCodePayload: qrResponse.data.qrcode,
        pixKey: this.pixKey,
        amount,
        currency: 'BRL',
        expiresAt,
        processorResponse: {
          processorTransactionId: cobResponse.data.txid,
          processorName: 'PixProcessor'
        },
        message: 'Dynamic Pix QR code generated successfully'
      };
    } catch (error) {
      console.error('Pix dynamic QR generation error:', error.response?.data || error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId: paymentData.transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'pix',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'PixProcessor',
            processStep: 'DYNAMIC_QR_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log Pix error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: error.response?.data?.message || error.message || 'Failed to generate dynamic Pix QR code'
      };
    }
  }
  
  /**
   * Generate EMVCo format payload for QR code
   * 
   * @private
   * @param {Object} payloadData - Payload data
   * @returns {string} EMVCo format payload
   */
  generateEMVCoPayload(payloadData) {
    const {
      pixKey,
      pixKeyType,
      merchantName,
      merchantCity,
      description,
      reference,
      amount,
      isStatic
    } = payloadData;
    
    // EMVCo QR Code format fields
    const payload = [
      '00' + '02' + '01',                         // Payload Format Indicator
      '01' + '11' + 'BR.GOV.BCB.PIX',             // Pix GUI identifier
      '26' + pixKey.length.toString().padStart(2, '0') + pixKey, // Merchant Account Info (Pix Key)
      '52' + '04' + '0000',                       // MCC (Merchant Category Code)
      '53' + '03' + '986',                        // Currency (BRL = 986)
      '58' + merchantCity.length.toString().padStart(2, '0') + merchantCity,   // Country
      '59' + merchantName.length.toString().padStart(2, '0') + merchantName,   // Merchant Name
      '60' + '07

