/**
 * BankConnector.js
 * Handles direct communication with acquiring banks
 */

import { ISO8583Message } from '../protocols/ISO8583Message';
import { BankSocket } from '../protocols/BankSocket';
import { config } from '../../config/config';
import { logger } from '../../services/loggingService';

class BankConnector {
  constructor(network) {
    this.network = network;
    this.config = config.banks[network];
    this.socket = new BankSocket(this.config);
    this.messageBuilder = new ISO8583Message();
  }

  /**
   * Initialize connection with bank
   */
  async connect() {
    try {
      await this.socket.connect();
      await this.sendHandshake();
    } catch (error) {
      logger.error(`Failed to connect to ${this.network} bank:`, error);
      throw new Error(`Bank connection failed: ${error.message}`);
    }
  }

  /**
   * Process payment through bank network
   */
  async processPayment({ encryptedCard, amount, currency, merchantId, threeDSToken, metadata }) {
    try {
      // Ensure connection is active
      if (!this.socket.isConnected()) {
        await this.connect();
      }

      // Build ISO 8583 payment message
      const message = this.messageBuilder.buildPaymentMessage({
        processingCode: '000000', // Purchase
        amount,
        currency,
        merchantId,
        card: encryptedCard,
        threeDSToken,
        transactionId: metadata.transactionId
      });

      // Send to bank and wait for response
      const response = await this.socket.sendMessage(message);

      // Parse response
      return this.parseResponse(response);
    } catch (error) {
      logger.error(`Payment processing error with ${this.network}:`, error);
      throw new Error(`Bank processing failed: ${error.message}`);
    }
  }

  /**
   * Send handshake to establish session
   */
  async sendHandshake() {
    const handshake = this.messageBuilder.buildHandshakeMessage({
      merchantId: this.config.merchantId,
      terminalId: this.config.terminalId
    });

    const response = await this.socket.sendMessage(handshake);
    if (!response.isSuccess) {
      throw new Error('Bank handshake failed');
    }
  }

  /**
   * Parse bank response message
   */
  parseResponse(response) {
    const responseCode = response.getField(39); // Response code field
    
    return {
      success: responseCode === '00',
      transactionId: response.getField(37),
      authCode: response.getField(38),
      responseCode,
      responseMessage: this.getResponseMessage(responseCode),
      last4: response.getField(42).slice(-4),
      cardNetwork: this.network
    };
  }

  /**
   * Get human readable response message
   */
  getResponseMessage(code) {
    const messages = {
      '00': 'Approved',
      '01': 'Refer to card issuer',
      '02': 'Refer to card issuer, special condition',
      '03': 'Invalid merchant',
      '04': 'Pick-up card',
      '05': 'Do not honor',
      '06': 'Error',
      '07': 'Pick-up card, special condition',
      '12': 'Invalid transaction',
      '13': 'Invalid amount',
      '14': 'Invalid card number',
      '15': 'No such issuer',
      '51': 'Insufficient funds',
      '54': 'Expired card',
      '55': 'Invalid PIN',
      '57': 'Transaction not permitted to cardholder',
      '58': 'Transaction not permitted to terminal',
      '61': 'Exceeds withdrawal limit',
      '62': 'Restricted card',
      '65': 'Exceeds withdrawal frequency',
      '91': 'Issuer or switch inoperative',
      '96': 'System malfunction'
    };

    return messages[code] || 'Unknown response code';
  }

  /**
   * Close bank connection
   */
  async disconnect() {
    if (this.socket.isConnected()) {
      await this.socket.disconnect();
    }
  }
}

export default BankConnector;
