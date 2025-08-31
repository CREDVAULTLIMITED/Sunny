/**
 * ISO8583Message.js
 * Handles creation and parsing of ISO 8583 messages for bank communication
 */

class ISO8583Message {
  constructor() {
    this.fields = new Map();
    this.mti = ''; // Message Type Indicator
  }

  /**
   * Build payment message in ISO 8583 format
   */
  buildPaymentMessage({ processingCode, amount, currency, merchantId, card, threeDSToken, transactionId }) {
    // Create authorization request (0100)
    this.mti = '0100';
    
    // Set mandatory fields
    this.setField(2, card.number);  // Primary Account Number
    this.setField(3, processingCode);  // Processing Code
    this.setField(4, this.formatAmount(amount));  // Transaction Amount
    this.setField(7, this.getTransmissionDateTime());  // Transmission Date and Time
    this.setField(11, this.getSystemTraceNumber());  // System Trace Audit Number
    this.setField(12, this.getLocalTime());  // Local Transaction Time
    this.setField(13, this.getLocalDate());  // Local Transaction Date
    this.setField(14, card.expiryDate);  // Card Expiration Date
    this.setField(18, this.getMerchantType());  // Merchant Type
    this.setField(22, this.getPOSEntryMode());  // Point of Service Entry Mode
    this.setField(25, this.getPOSConditionCode());  // Point of Service Condition Code
    this.setField(32, this.getAcquirerID());  // Acquiring Institution ID
    this.setField(37, transactionId);  // Retrieval Reference Number
    this.setField(41, this.config.terminalId);  // Card Acceptor Terminal ID
    this.setField(42, merchantId);  // Card Acceptor ID Code
    this.setField(43, this.getMerchantLocation());  // Card Acceptor Name/Location
    this.setField(49, currency);  // Transaction Currency Code

    // Add 3DS data if present
    if (threeDSToken) {
      this.setField(48, this.build3DSData(threeDSToken));  // Additional Data
    }

    return this.buildMessage();
  }

  /**
   * Build handshake message
   */
  buildHandshakeMessage({ merchantId, terminalId }) {
    // Create network management request (0800)
    this.mti = '0800';
    
    this.setField(11, this.getSystemTraceNumber());  // System Trace Audit Number
    this.setField(41, terminalId);  // Terminal ID
    this.setField(42, merchantId);  // Merchant ID
    
    return this.buildMessage();
  }

  /**
   * Format amount to ISO 8583 standard
   */
  formatAmount(amount) {
    return amount.toFixed(2).replace('.', '').padStart(12, '0');
  }

  /**
   * Get current transmission date time
   */
  getTransmissionDateTime() {
    const now = new Date();
    return now.toISOString().replace(/[-T:.Z]/g, '').slice(0, 10);
  }

  /**
   * Generate system trace number
   */
  getSystemTraceNumber() {
    return Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  }

  /**
   * Get local transaction time
   */
  getLocalTime() {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/:/g, '');
  }

  /**
   * Get local transaction date
   */
  getLocalDate() {
    return new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '');
  }

  /**
   * Get merchant type
   */
  getMerchantType() {
    return '5999'; // Default general merchant
  }

  /**
   * Get POS entry mode
   */
  getPOSEntryMode() {
    return '012'; // Chip with CVV
  }

  /**
   * Get POS condition code
   */
  getPOSConditionCode() {
    return '00'; // Normal transaction
  }

  /**
   * Get acquiring institution ID
   */
  getAcquirerID() {
    return this.config.acquirerID;
  }

  /**
   * Get merchant location
   */
  getMerchantLocation() {
    return this.config.merchantLocation.padEnd(40, ' ');
  }

  /**
   * Build 3DS data field
   */
  build3DSData(threeDSToken) {
    // Format: Length (3) + Type (2) + Data
    const data = `3DS${threeDSToken}`;
    return data.length.toString().padStart(3, '0') + data;
  }

  /**
   * Set field value
   */
  setField(fieldNumber, value) {
    this.fields.set(fieldNumber, value);
  }

  /**
   * Get field value
   */
  getField(fieldNumber) {
    return this.fields.get(fieldNumber);
  }

  /**
   * Build complete ISO 8583 message
   */
  buildMessage() {
    // Implement actual message building with proper bitmap
    let message = this.mti;
    
    // Create primary bitmap
    const bitmap = new Array(64).fill('0');
    
    // Set bits for used fields
    this.fields.forEach((value, key) => {
      if (key <= 64) {
        bitmap[key - 1] = '1';
      }
    });

    // Add bitmap to message
    message += this.bitmapToHex(bitmap);

    // Add fields in ascending order
    const sortedFields = Array.from(this.fields.keys()).sort((a, b) => a - b);
    
    sortedFields.forEach(field => {
      const value = this.fields.get(field);
      message += this.formatField(field, value);
    });

    return message;
  }

  /**
   * Convert bitmap array to hex string
   */
  bitmapToHex(bitmap) {
    let hex = '';
    for (let i = 0; i < bitmap.length; i += 4) {
      const chunk = bitmap.slice(i, i + 4).join('');
      hex += parseInt(chunk, 2).toString(16).toUpperCase();
    }
    return hex;
  }

  /**
   * Format field according to ISO 8583 specifications
   */
  formatField(fieldNumber, value) {
    // Add proper field formatting based on ISO 8583 specifications
    const fieldFormat = this.getFieldFormat(fieldNumber);
    return this.formatValueByType(value, fieldFormat);
  }

  /**
   * Get field format specifications
   */
  getFieldFormat(fieldNumber) {
    // Define field formats according to ISO 8583
    const formats = {
      2: { type: 'n', length: 19, lengthType: 'llvar' },
      3: { type: 'n', length: 6, lengthType: 'fixed' },
      4: { type: 'n', length: 12, lengthType: 'fixed' },
      // Add other field formats
    };
    return formats[fieldNumber] || { type: 'ans', length: 999, lengthType: 'lllvar' };
  }

  /**
   * Format value according to field type
   */
  formatValueByType(value, format) {
    let formattedValue = value.toString();

    switch (format.lengthType) {
      case 'fixed':
        formattedValue = formattedValue.padStart(format.length, '0');
        break;
      case 'llvar':
        formattedValue = formattedValue.length.toString().padStart(2, '0') + formattedValue;
        break;
      case 'lllvar':
        formattedValue = formattedValue.length.toString().padStart(3, '0') + formattedValue;
        break;
      default:
        throw new Error(`Unsupported length type: ${format.lengthType}`);
    }

    return formattedValue;
  }
}

export default ISO8583Message;
