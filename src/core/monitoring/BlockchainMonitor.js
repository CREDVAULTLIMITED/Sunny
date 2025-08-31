/**
 * BlockchainMonitor.js
 * Monitors blockchain transactions and updates payment status
 */

import { EventEmitter } from 'events';
import config from '../../config/config';
import { PAYMENT_STATUS } from '../constants';

class BlockchainMonitor extends EventEmitter {
  constructor() {
    super();
    this.providers = {};
    this.trackedTransactions = new Map();
    this.monitoringInterval = 30000; // 30 seconds
    this.intervalHandles = {};
  }

  /**
   * Initialize blockchain providers
   */
  async initialize() {
    // Initialize providers for each supported cryptocurrency
    const supportedCurrencies = ['BTC', 'ETH', 'USDT', 'USDC'];
    
    for (const currency of supportedCurrencies) {
      this.providers[currency] = await this.initializeProvider(currency);
    }
  }

  /**
   * Start tracking a new payment
   */
  async trackPayment(paymentInfo) {
    const { transactionId, receivingAddress, expectedAmount, currency } = paymentInfo;
    
    this.trackedTransactions.set(transactionId, {
      ...paymentInfo,
      lastChecked: Date.now(),
      confirmations: 0
    });

    // Start monitoring if not already monitoring this currency
    if (!this.intervalHandles[currency]) {
      this.startMonitoring(currency);
    }

    return true;
  }

  /**
   * Stop tracking a payment
   */
  stopTracking(transactionId) {
    this.trackedTransactions.delete(transactionId);
  }

  /**
   * Start monitoring blockchain for specified currency
   */
  startMonitoring(currency) {
    this.intervalHandles[currency] = setInterval(
      () => this.checkTransactions(currency),
      this.monitoringInterval
    );
  }

  /**
   * Stop monitoring blockchain for specified currency
   */
  stopMonitoring(currency) {
    if (this.intervalHandles[currency]) {
      clearInterval(this.intervalHandles[currency]);
      delete this.intervalHandles[currency];
    }
  }

  /**
   * Check transactions for a specific currency
   */
  async checkTransactions(currency) {
    const provider = this.providers[currency];
    
    for (const [txId, payment] of this.trackedTransactions.entries()) {
      if (payment.currency !== currency) continue;

      try {
        const status = await provider.getTransactionStatus(payment.receivingAddress);
        
        if (status.received) {
          // Update confirmation count
          payment.confirmations = status.confirmations;
          
          // Check if required confirmations are met
          if (status.confirmations >= config.crypto.requiredConfirmations[currency]) {
            // Verify amount
            if (this.verifyAmount(status.amount, payment.expectedAmount)) {
              this.emit('payment_confirmed', {
                transactionId: txId,
                blockchainTxId: status.transactionId,
                confirmations: status.confirmations,
                amount: status.amount
              });
              this.stopTracking(txId);
            } else {
              this.emit('payment_amount_mismatch', {
                transactionId: txId,
                expected: payment.expectedAmount,
                received: status.amount
              });
            }
          }
        }

        // Check for expired transactions
        if (this.isExpired(payment)) {
          this.emit('payment_expired', { transactionId: txId });
          this.stopTracking(txId);
        }
      } catch (error) {
        console.error(`Error checking transaction ${txId}:`, error);
        this.emit('monitoring_error', { transactionId: txId, error });
      }
    }
  }

  /**
   * Initialize blockchain provider for specified currency
   */
  async initializeProvider(currency) {
    // This would integrate with actual blockchain nodes or providers
    // For now, return a mock provider
    return {
      getTransactionStatus: async (address) => {
        // Mock implementation
        return {
          received: Math.random() > 0.5,
          confirmations: Math.floor(Math.random() * 12),
          amount: Math.random() * 1000,
          transactionId: `${currency}_${Date.now()}`
        };
      }
    };
  }

  /**
   * Verify received amount matches expected amount
   */
  verifyAmount(received, expected) {
    // Allow for small differences due to blockchain fees
    const tolerance = 0.001; // 0.1% tolerance
    const difference = Math.abs(received - expected);
    return difference <= (expected * tolerance);
  }

  /**
   * Check if payment has expired
   */
  isExpired(payment) {
    const now = Date.now();
    const expiryTime = new Date(payment.expiresAt).getTime();
    return now > expiryTime;
  }

  /**
   * Clean up resources
   */
  cleanup() {
    Object.keys(this.intervalHandles).forEach(currency => {
      this.stopMonitoring(currency);
    });
    this.trackedTransactions.clear();
  }
}

export default new BlockchainMonitor();
