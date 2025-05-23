/**
 * QR Code Payment Processor for Sunny Payment Gateway
 * 
 * Handles QR code-based payments with support for multiple payment types:
 * - Mobile payment apps (e.g., Alipay, WeChat Pay)
 * - Bank apps with QR scanning
 * - Cryptocurrency wallet QR scans
 * - Merchant-presented QR codes (EMVCo MPM compliant)
 * - Customer-presented QR codes (EMVCo CPM compliant)
 * 
 * Features:
 * - QR code generation for different payment methods
 * - Dynamic and static QR codes
 * - EMVCo compliant QR code format
 * - Payment verification and status checking
 * - Webhook processing for payment callbacks
 * - Comprehensive logging
 * 
 * EMVCo Compliance:
 * - MPM (Merchant Presented Mode) support
 * - CPM (Consumer Presented Mode) support
 * - EMV tag encoding/decoding
 * - Currency code and amount handling per EMV specs
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';
import { logTransaction } from '../../core/transactionLogger.js';

// Supported QR payment types
const QR_PAYMENT_TYPES = {
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  UPI: 'upi',
  CRYPTO: 'crypto',
  BANK_APP: 'bank_app',
  MERCHANT_PRESENTED: 'merchant_presented',
  CUSTOMER_PRESENTED: 'customer_presented',
  EMV_MPM: 'emv_mpm', // EMVCo Merchant Presented Mode
  EMV_CPM: 'emv_cpm'  // EMVCo Consumer Presented Mode
};

// EMV QR Code format versions
const EMV_QR_VERSION = {
  MPM: '01', // MPM format version
  CPM: '02'  // CPM format version
};

// EMV Tags by ID (based on EMVCo QR Code Specification)
const EMV_TAGS = {
  PAYLOAD_FORMAT_INDICATOR: '00',
  POINT_OF_INITIATION_METHOD: '01',
  MERCHANT_ACCOUNT_INFO: '02',  // through 51
  MERCHANT_CATEGORY_CODE: '52',
  TRANSACTION_CURRENCY: '53',
  TRANSACTION_AMOUNT: '54',
  TIP_OR_CONVENIENCE_INDICATOR: '55',
  VALUE_OF_CONVENIENCE_FEE_FIXED: '56',
  VALUE_OF_CONVENIENCE_FEE_PERCENTAGE: '57',
  COUNTRY_CODE: '58',
  MERCHANT_NAME: '59',
  MERCHANT_CITY: '60',
  POSTAL_CODE: '61',
  ADDITIONAL_DATA_FIELD_TEMPLATE: '62',
  CRC: '63',
  MERCHANT_INFORMATION_LANGUAGE_TEMPLATE: '64',
  RFU_FOR_EMVCO: '65',  // through 79
  UNRESERVED_TEMPLATES: '80'   // through 99
};

// EMV Additional Data Field Tags
const EMV_ADDITIONAL_DATA_TAGS = {
  BILL_NUMBER: '01',
  MOBILE_NUMBER: '02',
  STORE_LABEL: '03',
  LOYALTY_NUMBER: '04',
  REFERENCE_LABEL: '05',
  CUSTOMER_LABEL: '06',
  TERMINAL_LABEL: '07',
  PURPOSE_OF_TRANSACTION: '08',
  ADDITIONAL_CONSUMER_DATA_REQUEST: '09',
  MERCHANT_TAX_ID: '10',
  MERCHANT_CHANNEL: '11',
  RFU_FOR_EMVCO: '12' // through 49
};

// EMV Point of Initiation Method values
const EMV_POI_METHOD = {
  STATIC: '11',
  DYNAMIC: '12'
};

class QRCodePaymentProcessor {
  constructor(config = {}) {
    // Initialize QR code payment configuration
    this.apiKey = config.apiKey || process.env.QRCODE_API_KEY;
    this.apiSecret = config.apiSecret || process.env.QRCODE_API_SECRET;
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.callbackUrl = config.callbackUrl || process.env.QRCODE_CALLBACK_URL || 'https://api.sunnypayments.com/api/callbacks/qrcode';
    this.supportedTypes = config.supportedTypes || Object.values(QR_PAYMENT_TYPES);
    
    // EMV QR code configuration
    this.merchantId = config.merchantId || process.env.QRCODE_MERCHANT_ID;
    this.merchantName = config.merchantName || process.env.QRCODE_MERCHANT_NAME;
    this.merchantCity = config.merchantCity || process.env.QRCODE_MERCHANT_CITY;
    this.merchantCategory = config.merchantCategory || process.env.QRCODE_MERCHANT_CATEGORY || '0000';
    this.countryCode = config.countryCode || process.env.QRCODE_COUNTRY_CODE || 'US';
    this.postalCode = config.postalCode || process.env.QRCODE_POSTAL_CODE;
    
    // Validate required configuration
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Missing required QR code payment processor configuration');
    }
    
    // Set API URL based on environment
    this.apiUrl = this.environment === 'production'
      ? 'https://api.qrpayments.com/v1'
      : 'https://sandbox.qrpayments.com/v1';
    
    // QR code expiration time in minutes (default: 30 minutes)
    this.expirationMinutes = config.expirationMinutes || 30;
  }
  
  /**
   * Get authentication headers for API requests
   * 
   * @private
   * @returns {Object} Headers with authentication
   */
  getAuthHeaders() {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const payload = `${timestamp}GET/v1`;
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(payload)
      .digest('hex');
    
    return {
      'X-API-Key': this.apiKey,
      'X-API-Signature': signature,
      'X-API-Timestamp': timestamp,
      'Content-Type': 'application/json'
    };
  }
  
  /**
   * Encode EMV QR code data with tag-length-value format
   * 
   * @private
   * @param {string} tag - EMV tag
   * @param {string} value - Value for the tag
   * @returns {string} TLV encoded string
   */
  encodeTLV(tag, value) {
    // If value is empty or null, skip this tag
    if (value === null || value === undefined || value === '') {
      return '';
    }
    
    // Format: Tag + Length (2 digits) + Value
    const length = value.length.toString().padStart(2, '0');
    return tag + length + value;
  }
  
  /**
   * Generate EMV QR code in Merchant Presented Mode (MPM)
   * 
   * @private
   * @param {Object} paymentData - Payment data
   * @param {boolean} isStatic - Whether this is a static QR code
   * @returns {string} EMV QR code data
   */
  generateEMVMPMQrCode(paymentData, isStatic = false) {
    const {
      amount,
      currency,
      merchantAccountInfo,
      transactionId,
      description
    } = paymentData;
    
    // Default merchant info uses transaction ID as reference
    const defaultMerchantInfo = this.encodeTLV(
      EMV_ADDITIONAL_DATA_TAGS.REFERENCE_LABEL, 
      transactionId
    );
    
    // Default additional data field includes bill number and reference
    const additionalDataField = this.encodeTLV(
      EMV_ADDITIONAL_DATA_TAGS.BILL_NUMBER, 
      transactionId
    ) + this.encodeTLV(
      EMV_ADDITIONAL_DATA_TAGS.PURPOSE_OF_TRANSACTION, 
      description || 'Payment via Sunny Gateway'
    );
    
    // Format currency code (numeric ISO 4217)
    const currencyCode = this.getISO4217NumericCode(currency || 'USD');
    
    // Build EMV QR code data with mandatory and optional tags
    const qrData = [
      // Mandatory fields
      this.encodeTLV(EMV_TAGS.PAYLOAD_FORMAT_INDICATOR, EMV_QR_VERSION.MPM),
      this.encodeTLV(EMV_TAGS.POINT_OF_INITIATION_METHOD, isStatic ? EMV_POI_METHOD.STATIC : EMV_POI_METHOD.DYNAMIC),
      
      // Merchant account information (can contain payment network specific data)
      this.encodeTLV(EMV_TAGS.MERCHANT_ACCOUNT_INFO, merchantAccountInfo || defaultMerchantInfo),
      
      // Merchant category code (MCC)
      this.encodeTLV(EMV_TAGS.MERCHANT_CATEGORY_CODE, this.merchantCategory),
      
      // Transaction currency (ISO 4217 numeric code)
      this.encodeTLV(EMV_TAGS.TRANSACTION_CURRENCY, currencyCode),
      
      // Transaction amount (only for dynamic QR, omitted for static)
      !isStatic && amount ? this.encodeTLV(EMV_TAGS.TRANSACTION_AMOUNT, amount.toString()) : '',
      
      // Country code (ISO 3166-1 alpha 2)
      this.encodeTLV(EMV_TAGS.COUNTRY_CODE, this.countryCode),
      
      // Merchant name and city
      this.encodeTLV(EMV_TAGS.MERCHANT_NAME, this.merchantName),
      this.encodeTLV(EMV_TAGS.MERCHANT_CITY, this.merchantCity),
      
      // Optional postal code
      this.postalCode ? this.encodeTLV(EMV_TAGS.POSTAL_CODE, this.postalCode) : '',
      
      // Additional data field
      this.encodeTLV(EMV_TAGS.ADDITIONAL_DATA_FIELD_TEMPLATE, additionalDataField)
    ].filter(Boolean).join('');
    
    // Calculate and append CRC
    const crc = this.calculateCRC16(qrData + EMV_TAGS.CRC + '04');
    return qrData + this.encodeTLV(EMV_TAGS.CRC, crc);
  }
  
  /**
   * Get ISO 4217 numeric currency code
   * 
   * @private
   * @param {string} currency - Currency code (alpha)
   * @returns {string} ISO 4217 numeric code
   */
  getISO4217NumericCode(currency) {
    // Simplified mapping of common currency codes
    const currencyMap = {
      'USD': '840',
      'EUR': '978',
      'GBP': '826',
      'JPY': '392',
      'CNY': '156',
      'INR': '356',
      'BRL': '986',
      'KES': '404',
      'NGN': '566',
      'ZAR': '710'
    };
    
    return currencyMap[currency] || '840'; // Default to USD if unknown
  }
  
  /**
   * Calculate CRC-16 checksum for EMV QR code
   * 
   * @private
   * @param {string} data - Data to calculate CRC for
   * @returns {string} CRC-16 checksum in uppercase hex
   */
  calculateCRC16(data) {
    // Implementation of CRC-16-CCITT (0x1021)
    const polynomial = 0x1021;
    let crc = 0xFFFF;
    
    // Convert string to byte array
    const bytes = Buffer.from(data, 'utf8');
    
    for (let i = 0; i < bytes.length; i++) {
      crc ^= (bytes[i] << 8);
      for (let
    try {
      const { 
        amount, 
        currency, 
        qrType, 
        transactionId, 
        customer, 
        metadata,
        description
      } = paymentData;
      
      // Validate QR payment type
      const paymentType = qrType || QR_PAYMENT_TYPES.MERCHANT_PRESENTED;
      if (!this.supportedTypes.includes(paymentType)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: `Unsupported QR code payment type: ${paymentType}`
        };
      }
      
      // Log the initiation of QR payment
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.INITIATED,
        paymentMethod: 'qr_code',
        amount,
        currency,
        metadata: {
          qrType: paymentType,
          processor: 'QRCodeProcessor',
          processStep: 'QR_GENERATION_INITIATED'
        }
      });
      
      // Calculate expiration time
      const expiresAt = new Date(Date.now() + this.expirationMinutes * 60 * 1000).toISOString();
      
      // Create QR code payment request
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/qrcodes`,
        headers: this.getAuthHeaders(),
        data: {
          amount,
          currency,
          paymentType,
          transactionId,
          description: description || `Payment via Sunny Gateway`,
          expiresAt,
          callbackUrl: `${this.callbackUrl}?transactionId=${transactionId}`,
          customer: {
            name: customer?.name,
            email: customer?.email,
            phone: customer?.phone
          },
          metadata: {
            transactionId,
            ...metadata
          }
        }
      });
      
      // Log QR code generation
      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.PENDING,
        paymentMethod: 'qr_code',
        metadata: {
          qrType: paymentType,
          qrCodeId: response.data.id,
          qrCodeUrl: response.data.qrCodeUrl,
          expiresAt,
          processor: 'QRCodeProcessor',
          processStep: 'QR_CODE_GENERATED'
        }
      });
      
      return {
        success: true,
        status: PAYMENT_STATUS.PENDING,
        transactionId,
        qrCodeId: response.data.id,
        qrCodeUrl: response.data.qrCodeUrl,
        qrCodeImage: response.data.qrCodeImage,
        qrCodeData: response.data.qrCodeData,
        paymentType,
        amount,
        currency,
        expiresAt,
        processorResponse: {
          processorTransactionId: response.data.id,
          processorName: 'QRCodeProcessor'
        },
        paymentInstructions: this.getPaymentInstructions(paymentType)
      };
    } catch (error) {
      console.error('QR code payment generation error:', error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId: paymentData.transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'qr_code',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'QRCodeProcessor',
            processStep: 'QR_GENERATION_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log QR code error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: 'Failed to generate QR code payment'
      };
    }
  }
  
  /**
   * Get payment instructions based on QR code type
   * 
   * @private
   * @param {string} qrType - QR code payment type
   * @returns {string} Payment instructions
   */
  getPaymentInstructions(qrType) {
    switch (qrType) {
      case QR_PAYMENT_TYPES.ALIPAY:
        return 'Open your Alipay app, tap "Scan" and scan this QR code to complete payment.';
      case QR_PAYMENT_TYPES.WECHAT:
        return 'Open your WeChat app, tap "+" → "Scan QR Code" and scan this QR code to complete payment.';
      case QR_PAYMENT_TYPES.UPI:
        return 'Open any UPI app (Google Pay, PhonePe, etc.), tap "Scan" and scan this QR code to complete payment.';
      case QR_PAYMENT_TYPES.CRYPTO:
        return 'Open your cryptocurrency wallet app, scan this QR code to complete payment. Ensure you send the exact amount specified.';
      case QR_PAYMENT_TYPES.BANK_APP:
        return 'Open your bank app, navigate to the QR payment section, and scan this QR code to complete payment.';
      case QR_PAYMENT_TYPES.MERCHANT_PRESENTED:
        return 'Scan this QR code with your payment app to complete the transaction.';
      case QR_PAYMENT_TYPES.CUSTOMER_PRESENTED:
        return 'Show this QR code to the merchant who will scan it to complete the transaction.';
      default:
        return 'Scan this QR code with your payment app to complete the transaction.';
    }
  }
  
  /**
   * Check the status of a QR code payment
   * 
   * @param {Object} statusData - Status check parameters
   * @returns {Promise<Object>} Transaction status
   */
  async checkPaymentStatus(statusData) {
    try {
      const { transactionId, qrCodeId } = statusData;
      
      if (!qrCodeId) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'QR code ID is required'
        };
      }
      
      // Query payment status
      const response = await axios({
        method: 'get',
        url: `${this.apiUrl}/qrcodes/${qrCodeId}/status`,
        headers: this.getAuthHeaders()
      });
      
      const paymentStatus = response.data.status;
      let mappedStatus;
      
      // Map API status to our standard status
      switch (paymentStatus) {
        case 'COMPLETED':
        case 'PAID':
        case 'SUCCESS':
          mappedStatus = PAYMENT_STATUS.COMPLETED;
          break;
        case 'PENDING':
        case 'WAITING':
        case 'CREATED':
          mappedStatus = PAYMENT_STATUS.PENDING;
          break;
        case 'EXPIRED':
          mappedStatus = PAYMENT_STATUS.EXPIRED;
          break;
        case 'FAILED':
        case 'REJECTED':
          mappedStatus = PAYMENT_STATUS.FAILED;
          break;
        default:
          mappedStatus = PAYMENT_STATUS.UNKNOWN;
      }
      
      // Log status check
      await logTransaction({
        transactionId,
        status: mappedStatus,
        paymentMethod: 'qr_code',
        metadata: {
          qrCodeId,
          originalStatus: paymentStatus,
          paymentDetails: response.data.paymentDetails || {},
          processor: 'QRCodeProcessor',
          processStep: 'STATUS_CHECK'
        }
      });
      
      return {
        success: true,
        status: mappedStatus,
        transactionId,
        qrCodeId,
        originalStatus: paymentStatus,
        amount: response.data.amount,
        currency: response.data.currency,
        paymentType: response.data.paymentType,
        paidAt: response.data.paidAt,
        paymentDetails: response.data.paymentDetails || {}
      };
    } catch (error) {
      console.error('QR code payment status check error:', error);
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: 'Failed to check QR code payment status'
      };
    }
  }
  
  /**
   * Process a QR code payment callback
   * 
   * @param {Object} callbackData - Callback data
   * @param {string} transactionId - Original transaction ID
   * @returns {Promise<Object>} Processed result
   */
  async processCallback(callbackData, transactionId) {
    try {
      if (!callbackData || !callbackData.qrCodeId) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid callback data'
        };
      }
      
      const paymentStatus = callbackData.status;
      let mappedStatus;
      
      // Map API status to our standard status
      switch (paymentStatus) {
        case 'COMPLETED':
        case 'PAID':
        case 'SUCCESS':
          mappedStatus = PAYMENT_STATUS.COMPLETED;
          break;
        case 'PENDING':
        case 'WAITING':
        case 'CREATED':
          mappedStatus = PAYMENT_STATUS.PENDING;
          break;
        case 'EXPIRED':
          mappedStatus = PAYMENT_STATUS.EXPIRED;
          break;
        case 'FAILED':
        case 'REJECTED':
          mappedStatus = PAYMENT_STATUS.FAILED;
          break;
        default:
          mappedStatus = PAYMENT_STATUS.UNKNOWN;
      }
      
      // Log the callback
      await logTransaction({
        transactionId,
        status: mappedStatus,
        paymentMethod: 'qr_code',
        metadata: {
          qrCodeId: callbackData.qrCodeId,
          originalStatus: paymentStatus,
          paymentDetails: callbackData.paymentDetails || {},
          paidAmount: callbackData.amount,
          paidCurrency: callbackData.currency,
          processor: 'QRCodeProcessor',
          processStep: 'CALLBACK_RECEIVED'
        }
      });
      
      return {
        success: mappedStatus === PAYMENT_STATUS.COMPLETED,
        status: mappedStatus,
        transactionId,
        qrCodeId: callbackData.qrCodeId,
        amount: callbackData.amount,
        currency: callbackData.currency,
        paymentType: callbackData.paymentType,
        originalStatus: paymentStatus,
        paidAt: callbackData.paidAt,
        message: callbackData.message || `Payment ${mappedStatus.toLowerCase()}`
      };
    } catch (error) {
      console.error('QR code callback processing error:', error);
      
      // Log the error
      try {
        await logTransaction({
          transactionId,
          status: PAYMENT_STATUS.ERROR,
          paymentMethod: 'qr_code',
          errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
          metadata: {
            errorMessage: error.message,
            processor: 'QRCodeProcessor',
            processStep: 'CALLBACK_ERROR'
          }
        });
      } catch (logError) {
        console.error('Failed to log QR code callback error:', logError);
      }
      
      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: 'Failed to process QR code payment callback'
      };
    }
  }
  
  /**
   * Cancel a QR code payment
   * 
   * @param {Object} cancelData - Cancellation parameters
   * @returns {Promise<Object>} Cancellation result
   */
  async cancelPayment(cancelData) {
    try {

