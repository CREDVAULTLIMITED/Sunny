/**
 * ISO8583MessageBuilder.js
 * Builds and parses ISO 8583 messages for bank communication
 */

class ISO8583MessageBuilder {
  constructor() {
    this.fields = new Map();
    this.mti = '';
  }

  /**
   * Build payment authorization request
   */
  buildAuthorizationRequest({
    amount,
    currency,
    card,
    merchantId,
    terminalId,
    threeDSData,
    metadata
  }) {
    // MTI 0100 for authorization request
    this.mti = '0100';

    // Set mandatory fields
    this.setField(2, card.number);  // Primary Account Number
    this.setField(3, '000000');  // Processing Code (000000 = Goods and Services)
    this.setField(4, this.formatAmount(amount));  // Transaction Amount
    this.setField(7, this.getTransmissionDateTime());  // Transmission Date and Time
    this.setField(11, this.getSystemTraceNumber());  // System Trace Number
    this.setField(12, this.getLocalTime());  // Local Transaction Time
    this.setField(13, this.getLocalDate());  // Local Transaction Date
    this.setField(14, `${card.expiryMonth}${card.expiryYear}`);  // Expiration Date
    this.setField(22, this.getPOSEntryMode());  // POS Entry Mode
    this.setField(24, '100');  // Function Code (100 = Authorization)
    this.setField(25, '00');  // POS Condition Code
    this.setField(41, terminalId);  // Terminal ID
    this.setField(42, merchantId);  // Merchant ID
    this.setField(49, this.getCurrencyCode(currency));  // Currency Code

    // Add 3DS data if available
    if (threeDSData) {
      this.setField(48, this.format3DSData(threeDSData));  // Additional Data - Private
    }

    // Add CVV2
    if (card.cvv) {
      this.setField(126, this.formatCVV2(card.cvv));  // Private Use Fields
    }

    return this.buildMessage();
  }

  /**
   * Build refund request
   */
  buildRefundRequest({
    amount,
    currency,
    originalTransaction,
    merchantId,
    terminalId
  }) {
    // MTI 0200 for financial request
    this.mti = '0200';

    this.setField(2, originalTransaction.cardNumber);  // Primary Account Number
    this.setField(3, '200000');  // Processing Code (200000 = Refund)
    this.setField(4, this.formatAmount(amount));  // Transaction Amount
    this.setField(7, this.getTransmissionDateTime());  // Transmission Date and Time
    this.setField(11, this.getSystemTraceNumber());  // System Trace Number
    this.setField(12, this.getLocalTime());  // Local Transaction Time
    this.setField(13, this.getLocalDate());  // Local Transaction Date
    this.setField(22, '021');  // POS Entry Mode (021 = Card Not Present)
    this.setField(37, originalTransaction.authCode);  // Retrieval Reference Number
    this.setField(41, terminalId);  // Terminal ID
    this.setField(42, merchantId);  // Merchant ID
    this.setField(49, this.getCurrencyCode(currency));  // Currency Code

    return this.buildMessage();
  }

  /**
   * Format amount to ISO 8583 standard
   */
  formatAmount(amount) {
    return amount.toFixed(2).replace('.', '').padStart(12, '0');
  }

  /**
   * Get transmission date time
   */
  getTransmissionDateTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return `${month}${day}${hour}${minute}${second}`;
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
    const now = new Date();
    return now.toTimeString().slice(0, 8).replace(/:/g, '');
  }

  /**
   * Get local transaction date
   */
  getLocalDate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${month}${day}`;
  }

  /**
   * Get POS entry mode
   */
  getPOSEntryMode() {
    return '021';  // Card Not Present Transaction
  }

  /**
   * Get currency code
   */
  getCurrencyCode(currency) {
    const codes = {
      USD: '840',
      EUR: '978',
      GBP: '826',
      JPY: '392',
      AUD: '036',
      CAD: '124'
    };
    return codes[currency] || '999';
  }

  /**
   * Format 3DS data
   */
  format3DSData(threeDSData) {
    const data = [
      threeDSData.authStatus,
      threeDSData.eci,
      threeDSData.cavv,
      threeDSData.xid
    ].join('|');
    
    return data.length.toString().padStart(3, '0') + data;
  }

  /**
   * Format CVV2 data
   */
  formatCVV2(cvv) {
    return `02${cvv}`;  // 02 indicates CVV2 present
  }

  /**
   * Set field value
   */
  setField(fieldNumber, value) {
    this.fields.set(fieldNumber, value);
  }

  /**
   * Build complete ISO 8583 message
   */
  buildMessage() {
    let message = this.mti;
    
    // Create bitmap
    const bitmap = new Array(64).fill('0');
    
    // Set bits for used fields
    this.fields.forEach((value, key) => {
      if (key <= 64) {
        bitmap[key - 1] = '1';
      }
    });

    // Add bitmap
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
   * Convert bitmap to hex
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
    const format = this.getFieldFormat(fieldNumber);
    
    if (format.lengthType === 'fixed') {
      return value.toString().padStart(format.length, '0');
    } else if (format.lengthType === 'llvar') {
      const paddedValue = value.toString();
      return paddedValue.length.toString().padStart(2, '0') + paddedValue;
    } else if (format.lengthType === 'lllvar') {
      const paddedValue = value.toString();
      return paddedValue.length.toString().padStart(3, '0') + paddedValue;
    }
    
    return value.toString();
  }

  /**
   * Get field format specifications
   */
  getFieldFormat(fieldNumber) {
    const formats = {
      2: { type: 'n', length: 19, lengthType: 'llvar' },
      3: { type: 'n', length: 6, lengthType: 'fixed' },
      4: { type: 'n', length: 12, lengthType: 'fixed' },
      7: { type: 'n', length: 10, lengthType: 'fixed' },
      11: { type: 'n', length: 6, lengthType: 'fixed' },
      12: { type: 'n', length: 6, lengthType: 'fixed' },
      13: { type: 'n', length: 4, lengthType: 'fixed' },
      14: { type: 'n', length: 4, lengthType: 'fixed' },
      22: { type: 'n', length: 3, lengthType: 'fixed' },
      24: { type: 'n', length: 3, lengthType: 'fixed' },
      25: { type: 'n', length: 2, lengthType: 'fixed' },
      37: { type: 'an', length: 12, lengthType: 'fixed' },
      41: { type: 'ans', length: 8, lengthType: 'fixed' },
      42: { type: 'ans', length: 15, lengthType: 'fixed' },
      48: { type: 'ans', length: 999, lengthType: 'lllvar' },
      49: { type: 'n', length: 3, lengthType: 'fixed' },
      126: { type: 'ans', length: 999, lengthType: 'lllvar' }
    };

    return formats[fieldNumber] || { type: 'ans', length: 999, lengthType: 'lllvar' };
  }

  /**
   * Parse ISO 8583 response message
   */
  parseResponse(message) {
    const mti = message.substring(0, 4);
    const bitmapHex = message.substring(4, 20);
    let currentPosition = 20;
    const bitmap = this.hexToBitmap(bitmapHex);
    const fields = new Map();

    bitmap.forEach((bit, index) => {
      if (bit === '1') {
        const fieldNumber = index + 1;
        const format = this.getFieldFormat(fieldNumber);
        let length;
        let value;

        if (format.lengthType === 'fixed') {
          length = format.length;
          value = message.substring(currentPosition, currentPosition + length);
        } else if (format.lengthType === 'llvar') {
          length = parseInt(message.substring(currentPosition, currentPosition + 2));
          value = message.substring(currentPosition + 2, currentPosition + 2 + length);
        } else if (format.lengthType === 'lllvar') {
          length = parseInt(message.substring(currentPosition, currentPosition + 3));
          value = message.substring(currentPosition + 3, currentPosition + 3 + length);
        }

        fields.set(fieldNumber, value);
        currentPosition += length;
      }
    });

    return {
      mti,
      fields
    };
  }

  /**
   * Convert hex to bitmap array
   */
  hexToBitmap(hex) {
    return hex.split('').map(char => {
      const binary = parseInt(char, 16).toString(2).padStart(4, '0');
      return binary.split('');
    }).flat();
  }
}

module.exports = ISO8583MessageBuilder;
