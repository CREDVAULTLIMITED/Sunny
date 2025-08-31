/**
 * BankSocket.js
 * Handles secure socket communication with banks
 */

import { logger } from '../../services/loggingService';

// Browser-compatible implementation
class BankSocket {
  constructor(bankConfig) {
    this.config = bankConfig;
    this.connected = false;
    this.messageQueue = [];
    this.responseHandlers = new Map();
  }

  /**
   * Connect to bank's payment network
   */
  async connect() {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.wsEndpoint);
        
        this.ws.onopen = () => {
          logger.info(`Secure connection established with ${this.config.name}`);
          this.connected = true;
          this.startHeartbeat();
          resolve(true);
        };

        this.ws.onerror = (error) => {
          logger.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onmessage = (event) => {
          this.handleIncomingData(event.data);
        };

        this.ws.onclose = () => {
          logger.info('WebSocket closed');
          this.connected = false;
          this.handleDisconnect();
        };

      } catch (error) {
        logger.error('Failed to create WebSocket:', error);
        reject(error);
      }
    });
  }

  /**
   * Send message to bank
   */
  async sendMessage(message) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error('Not connected to bank'));
        return;
      }

      try {
        const messageId = this.generateMessageId();
        const wrappedMessage = {
          id: messageId,
          data: message,
          timestamp: Date.now()
        };

        const timeout = setTimeout(() => {
          this.responseHandlers.delete(messageId);
          reject(new Error('Message timeout'));
        }, this.config.messageTimeout || 30000);

        this.responseHandlers.set(messageId, { resolve, reject, timeout });
        this.ws.send(JSON.stringify(wrappedMessage));
        logger.debug(`Sent message to ${this.config.name}:`, message);

      } catch (error) {
        logger.error('Error sending message:', error);
        reject(error);
      }
    });
  }

  /**
   * Handle incoming data from bank
   */
  handleIncomingData(data) {
    try {
      const message = JSON.parse(data);
      logger.debug(`Received message from ${this.config.name}:`, message);

      const messageId = message.id;
      const handler = this.responseHandlers.get(messageId);

      if (handler) {
        clearTimeout(handler.timeout);
        this.responseHandlers.delete(messageId);
        handler.resolve(message.data);
      } else {
        logger.warn('Received response for unknown message:', messageId);
      }

    } catch (error) {
      logger.error('Error processing incoming data:', error);
    }
  }

  /**
   * Generate unique message ID
   */
  generateMessageId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Start heartbeat to keep connection alive
   */
  startHeartbeat() {
    const interval = this.config.heartbeatInterval || 30000;
    
    this.heartbeatInterval = setInterval(async () => {
      try {
        if (this.connected) {
          await this.sendHeartbeat();
        }
      } catch (error) {
        logger.error('Heartbeat failed:', error);
      }
    }, interval);
  }

  /**
   * Send heartbeat message
   */
  async sendHeartbeat() {
    const heartbeat = { type: 'heartbeat', timestamp: Date.now() };
    return this.sendMessage(JSON.stringify(heartbeat));
  }

  /**
   * Handle disconnection
   */
  handleDisconnect() {
    this.connected = false;
    clearInterval(this.heartbeatInterval);
    this.rejectAllPending(new Error('Connection closed'));
    this.attemptReconnect();
  }

  /**
   * Attempt to reconnect to bank
   */
  async attemptReconnect() {
    const maxAttempts = this.config.maxReconnectAttempts || 3;
    const delay = this.config.reconnectDelay || 5000;
    let attempts = 0;

    const tryReconnect = async () => {
      try {
        attempts++;
        logger.info(`Reconnection attempt ${attempts}/${maxAttempts}`);
        await this.connect();
        return true;
      } catch (error) {
        logger.error(`Reconnection attempt ${attempts} failed:`, error);
        return false;
      }
    };

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delay));
      if (await tryReconnect()) break;
    }

    if (attempts >= maxAttempts) {
      logger.error('Max reconnection attempts reached');
      this.rejectAllPending(new Error('Failed to reconnect'));
    }
  }

  /**
   * Reject all pending messages
   */
  rejectAllPending(error) {
    this.responseHandlers.forEach(handler => {
      clearTimeout(handler.timeout);
      handler.reject(error);
    });
    this.responseHandlers.clear();
  }

  /**
   * Check if socket is connected
   */
  isConnected() {
    return this.connected;
  }

  /**
   * Disconnect from bank
   */
  async disconnect() {
    return new Promise((resolve) => {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
      }

      if (this.ws) {
        this.ws.close();
        this.ws.onclose = () => {
          this.connected = false;
          resolve();
        };
      } else {
        resolve();
      }
    });
  }
}

export default BankSocket;
