/**
 * BankSocket.js
 * Handles secure socket communication with banks
 */

const tls = require('tls');
const net = require('net');
const { logger } = require('../../services/loggingService');
const { bankConfig } = require('../../config/banks');

class BankConnection {
  constructor(network) {
    this.config = bankConfig[network];
    this.socket = null;
    this.isConnected = false;
    this.messageQueue = [];
    this.handlers = new Map();
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  /**
   * Connect to bank server
   */
  async connect() {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          host: this.config.host,
          port: this.config.port,
          cert: Buffer.from(this.config.clientCert, 'base64'),
          key: Buffer.from(this.config.clientKey, 'base64'),
          ca: Buffer.from(this.config.serverCert, 'base64'),
          rejectUnauthorized: true,
          requestCert: true
        };

        this.socket = tls.connect(options, () => {
          if (this.socket.authorized) {
            logger.info(`Connected to ${this.config.name}`);
            this.isConnected = true;
            this.setupMessageHandling();
            this.startHeartbeat();
            resolve(true);
          } else {
            reject(new Error(`TLS Authorization failed: ${this.socket.authorizationError}`));
          }
        });

        this.socket.on('error', (error) => {
          logger.error(`Socket error for ${this.config.name}:`, error);
          this.handleError(error);
        });

        this.socket.on('close', () => {
          logger.info(`Connection closed for ${this.config.name}`);
          this.handleDisconnect();
        });

        this.socket.on('timeout', () => {
          logger.warn(`Connection timeout for ${this.config.name}`);
          this.handleTimeout();
        });

      } catch (error) {
        logger.error(`Failed to connect to ${this.config.name}:`, error);
        reject(error);
      }
    });
  }

  /**
   * Set up message handling
   */
  setupMessageHandling() {
    let buffer = Buffer.alloc(0);
    
    this.socket.on('data', (data) => {
      buffer = Buffer.concat([buffer, data]);
      
      // Process complete messages
      while (buffer.length >= 2) {
        // First 2 bytes contain message length
        const messageLength = buffer.readUInt16BE(0);
        
        if (buffer.length >= messageLength + 2) {
          const message = buffer.slice(2, messageLength + 2);
          buffer = buffer.slice(messageLength + 2);
          
          this.handleMessage(message);
        } else {
          break;
        }
      }
    });
  }

  /**
   * Handle incoming message
   */
  handleMessage(message) {
    try {
      const messageStr = message.toString();
      const { messageId, data } = JSON.parse(messageStr);

      const handler = this.handlers.get(messageId);
      if (handler) {
        clearTimeout(handler.timeout);
        this.handlers.delete(messageId);
        handler.resolve(data);
      } else {
        logger.warn(`No handler found for message: ${messageId}`);
      }
    } catch (error) {
      logger.error('Error processing message:', error);
    }
  }

  /**
   * Send message to bank
   */
  async sendMessage(data) {
    if (!this.isConnected) {
      throw new Error('Not connected to bank');
    }

    return new Promise((resolve, reject) => {
      try {
        const messageId = this.generateMessageId();
        const message = {
          messageId,
          timestamp: Date.now(),
          data
        };

        const messageStr = JSON.stringify(message);
        const messageBuffer = Buffer.from(messageStr);
        
        // Add length prefix
        const length = Buffer.alloc(2);
        length.writeUInt16BE(messageBuffer.length);
        
        const fullMessage = Buffer.concat([length, messageBuffer]);

        // Set up response handler with timeout
        const timeout = setTimeout(() => {
          this.handlers.delete(messageId);
          reject(new Error('Message timeout'));
        }, this.config.messageTimeout || 30000);

        this.handlers.set(messageId, { resolve, reject, timeout });

        this.socket.write(fullMessage);
        logger.debug(`Sent message to ${this.config.name}:`, message);

      } catch (error) {
        logger.error('Error sending message:', error);
        reject(error);
      }
    });
  }

  /**
   * Generate unique message ID
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Start heartbeat to keep connection alive
   */
  startHeartbeat() {
    const interval = this.config.heartbeatInterval || 30000;

    this.heartbeatInterval = setInterval(async () => {
      if (this.isConnected) {
        try {
          await this.sendHeartbeat();
        } catch (error) {
          logger.error('Heartbeat failed:', error);
        }
      }
    }, interval);
  }

  /**
   * Send heartbeat message
   */
  async sendHeartbeat() {
    const heartbeat = {
      type: 'heartbeat',
      timestamp: Date.now()
    };

    return this.sendMessage(heartbeat);
  }

  /**
   * Handle connection error
   */
  handleError(error) {
    this.isConnected = false;
    this.rejectAllPending(error);
    this.attemptReconnect();
  }

  /**
   * Handle disconnection
   */
  handleDisconnect() {
    this.isConnected = false;
    this.cleanup();
    this.attemptReconnect();
  }

  /**
   * Handle connection timeout
   */
  handleTimeout() {
    this.isConnected = false;
    this.rejectAllPending(new Error('Connection timeout'));
    this.cleanup();
    this.attemptReconnect();
  }

  /**
   * Attempt to reconnect
   */
  async attemptReconnect() {
    if (this.retryCount >= this.maxRetries) {
      logger.error(`Max reconnection attempts reached for ${this.config.name}`);
      return;
    }

    this.retryCount++;
    const delay = Math.pow(2, this.retryCount) * 1000; // Exponential backoff

    logger.info(`Attempting reconnection to ${this.config.name} in ${delay}ms (attempt ${this.retryCount}/${this.maxRetries})`);

    setTimeout(async () => {
      try {
        await this.connect();
        this.retryCount = 0;
      } catch (error) {
        logger.error(`Reconnection attempt failed for ${this.config.name}:`, error);
      }
    }, delay);
  }

  /**
   * Reject all pending messages
   */
  rejectAllPending(error) {
    this.handlers.forEach(handler => {
      clearTimeout(handler.timeout);
      handler.reject(error);
    });
    this.handlers.clear();
  }

  /**
   * Clean up resources
   */
  cleanup() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }

    this.handlers.clear();
    this.isConnected = false;
  }

  /**
   * Close connection
   */
  async disconnect() {
    this.cleanup();
    logger.info(`Disconnected from ${this.config.name}`);
  }
}

module.exports = BankConnection;
