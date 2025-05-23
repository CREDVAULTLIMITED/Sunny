/**
 * Cryptocurrency Payment Processor for Sunny Payment Gateway
 * 
 * Handles cryptocurrency payments with support for multiple currencies:
 * - Bitcoin (BTC)
 * - Ethereum (ETH)
 * - USD Tether (USDT)
 * - USD Coin (USDC)
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';
import { logTransaction } from '../../core/transactionLogger.js';

// Default confirmation requirements for different cryptocurrencies
const DEFAULT_CONFIRMATIONS = {
  BTC: 3,
  ETH: 12,
  USDT: 12,
  USDC: 12
};

// Cryptocurrency networks and their properties
const NETWORKS = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 8,
    isToken: false,
    network: 'bitcoin'
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    isToken: false,
    network: 'ethereum'
  },
  USDT: {
    name: 'USD Tether',
    symbol: 'USDT',
    decimals: 6,
    isToken: true,
    tokenType: 'ERC20',
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    network: 'ethereum'
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    isToken: true,
    tokenType: 'ERC20',
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    network: 'ethereum'
  }
};

class CryptoProcessor {
  constructor(config = {}) {
    // Initialize cryptocurrency configuration
    this.apiKey = config.apiKey || process.env.CRYPTO_API_KEY;
    this.apiSecret = config.apiSecret || process.env.CRYPTO_API_SECRET;
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.callbackUrl = config.callbackUrl || process.env.CRYPTO_CALLBACK_URL;
    this.supportedCurrencies = config.supportedCurrencies || ['BTC', 'ETH', 'USDT', 'USDC'];
    this.requiredConfirmations = config.requiredConfirmations || DEFAULT_CONFIRMATIONS;
    this.exchangeRateSource = config.exchangeRateSource || process.env.CRYPTO_EXCHANGE_RATE_SOURCE || 'coinbase';
    
    // Validate required configuration
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Missing required cryptocurrency payment processor configuration');
    }
    
    // Set API URL based on environment
    this.apiUrl = this.environment === 'production'
      ? 'https://api.cryptoprocessor.com/v1'
      : 'https://sandbox.cryptoprocessor.com/v1';

    // Initialize transaction monitoring cache
    this.transactionCache = new Map();
  }

  /**
   * Get current exchange rates for cryptocurrencies
   * @returns {Promise<Object>} Exchange rates for supported currencies
   */
  async getExchangeRates() {
    try {
      const response = await axios({
        method: 'get',
        url: `${this.apiUrl}/exchange-rates`,
        headers: this.getAuthHeaders()
      });

      return {
        success: true,
        rates: response.data.rates,
        timestamp: new Date(),
        source: this.exchangeRateSource
      };
    } catch (error) {
      console.error('Exchange rate fetch error:', error);
      return {
        success: false,
        error: ERROR_CODES.EXCHANGE_RATE_ERROR,
        message: 'Failed to fetch exchange rates'
      };
    }
  }

  /**
   * Generate a new cryptocurrency payment address
   * @param {Object} addressData Address generation parameters
   * @returns {Promise<Object>} Generated address details
   */
  async generateAddress(addressData) {
    try {
      const { currency, transactionId, metadata } = addressData;
      
      if (!this.supportedCurrencies.includes(currency)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: `Unsupported cryptocurrency: ${currency}`
        };
      }

      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/addresses`,
        headers: this.getAuthHeaders(),
        data: {
          currency,
          label: `payment-${transactionId}`,
          callbackUrl: `${this.callbackUrl}?transactionId=${transactionId}`,
          metadata: {
            transactionId,
            ...metadata
          }
        }
      });

      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.ADDRESS_GENERATED,
        paymentMethod: 'crypto',
        metadata: {
          currency,
          address: response.data.address,
          processor: 'CryptoProcessor',
          processorAddressId: response.data.id
        }
      });

      return {
        success: true,
        currency,
        address: response.data.address,
        addressId: response.data.id,
        qrCodeUrl: response.data.qrCodeUrl
      };
    } catch (error) {
      console.error('Address generation error:', error);
      return {
        success: false,
        error: ERROR_CODES.ADDRESS_GENERATION_ERROR,
        message: 'Failed to generate cryptocurrency address'
      };
    }
  }

  /**
   * Create a cryptocurrency payment transaction
   * @param {Object} paymentData Payment details
   * @returns {Promise<Object>} Transaction details
   */
  async createTransaction(paymentData) {
    try {
      const { 
        amount, 
        currency, 
        cryptoCurrency, 
        transactionId, 
        customer,
        metadata 
      } = paymentData;
      
      const targetCrypto = cryptoCurrency || 'BTC';
      
      if (!this.supportedCurrencies.includes(targetCrypto)) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: `Unsupported cryptocurrency: ${targetCrypto}`
        };
      }

      const cryptoDetails = NETWORKS[targetCrypto];
      let cryptoAmount = amount;
      let conversionResult = null;

      if (currency !== targetCrypto) {
        conversionResult = await this.convertAmount({
          amount,
          fromCurrency: currency,
          toCurrency: targetCrypto
        });

        if (!conversionResult.success) {
          return conversionResult;
        }

        cryptoAmount = conversionResult.convertedAmount;
      }

      const addressResult = await this.generateAddress({
        currency: targetCrypto,
        transactionId,
        metadata: {
          customerEmail: customer?.email,
          customerName: customer?.name,
          originalAmount: amount,
          originalCurrency: currency
        }
      });

      if (!addressResult.success) {
        return addressResult;
      }

      const formattedAmount = parseFloat(cryptoAmount).toFixed(cryptoDetails.decimals);

      const paymentRequest = {
        success: true,
        status: PAYMENT_STATUS.PENDING,
        transactionId,
        cryptoCurrency: targetCrypto,
        paymentAddress: addressResult.address,
        amount: formattedAmount,
        originalAmount: amount,
        originalCurrency: currency,
        requiredConfirmations: this.requiredConfirmations[targetCrypto],
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        qrCodeUrl: addressResult.qrCodeUrl,
        conversionRate: conversionResult ? conversionResult.exchangeRate : 1,
        network: cryptoDetails.network,
        isToken: cryptoDetails.isToken,
        paymentInstructions: `Please send exactly ${formattedAmount} ${targetCrypto} to the address ${addressResult.address}`
      };

      if (cryptoDetails.isToken) {
        paymentRequest.contractAddress = cryptoDetails.contractAddress;
        paymentRequest.tokenType = cryptoDetails.tokenType;
      }

      await logTransaction({
        transactionId,
        status: PAYMENT_STATUS.PENDING,
        paymentMethod: 'crypto',
        amount: cryptoAmount,
        currency: targetCrypto,
        originalAmount: amount,
        originalCurrency: currency,
        metadata: {
          paymentAddress: addressResult.address,
          requiredConfirmations: this.requiredConfirmations[targetCrypto],
          expiresAt: paymentRequest.expiresAt,
          processor: 'CryptoProcessor',
          processorAddressId: addressResult.addressId
        }
      });

      // Start monitoring the transaction
      this.monitorTransaction(paymentRequest);

      return paymentRequest;
    } catch (error) {
      console.error('Transaction creation error:', error);
      
      await logTransaction({
        transactionId: paymentData.transactionId,
        status: PAYMENT_STATUS.ERROR,
        paymentMethod: 'crypto',
        errorCode: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        metadata: {
          errorMessage: error.message,
          processor: 'CryptoProcessor',
          processStep: 'TRANSACTION_CREATION'
        }
      });

      return {
        success: false,
        error: ERROR_CODES.PAYMENT_PROCESSOR_ERROR,
        message: 'Failed to create cryptocurrency transaction'
      };
    }
  }

  /**
   * Check transaction status
   * @param {Object} statusData Status check parameters
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(statusData) {
    try {
      const { transactionId, paymentAddress, cryptoCurrency } = statusData;

      if (!transactionId || !paymentAddress) {
        return {
          success: false,
          error: ERROR_CODES.VALIDATION_ERROR,
          message: 'Transaction ID and payment address are required'
        };
      }

      const response = await axios({
        method: 'get',
        url: `${this.apiUrl}/addresses/${paymentAddress}/transactions`,
        headers: this.getAuthHeaders()
      });

      const transactions = response.data.transactions;

      if (!transactions || transactions.length === 0) {
        return {
          success: false,
          status: PAYMENT_STATUS.PENDING,
          message: 'No transactions found',
          transactionId
        };
      }

      const latestTransaction = transactions[0];
      const requiredConfirmations = this.requiredConfirmations[cryptoCurrency] || 3;
      const currentConfirmations = latestTransaction.confirmations;
      const isConfirmed = currentConfirmations >= requiredConfirmations;

      await logTransaction({
        transactionId,
        status: isConfirmed ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.PENDING,
        paymentMethod: 'crypto',
        metadata: {
          blockchainTxId: latestTransaction.txid,
          confirmations: currentConfirmations,
          requiredConfirmations,
          processor: 'CryptoProcessor',
          processStep: 'STATUS_CHECK'
        }
      });

      return {
        success: true,
        status: isConfirmed ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.PENDING,
        transactionId,
        blockchainTxId: latestTransaction.txid,
        confirmations: currentConfirmations,
        requiredConfirmations,
        amount: latestTransaction.amount,
        timestamp: latestTransaction.timestamp
      };
    } catch (error) {
      console.error('Status check error:', error);
      return {
        success: false,
        error: ERROR_CODES.STATUS_CHECK_ERROR,
        message: 'Failed to check transaction status'
      };
    }
  }

  /**
   * Process webhook callback for cryptocurrency payments
   * @param {Object} callbackData Callback data from the crypto processor
   * @returns {Promise<Object>} Processing result
   */
  async processCallback(callbackData) {
    try {
      const { transactionId, status, txid, confirmations } = callbackData;

      // Verify callback authenticity
      if (!this.verifyCallback(callbackData)) {
        throw new Error('Invalid callback signature');
      }

      // Map processor status to internal status
      const mappedStatus = this.mapTransactionStatus(status, confirmations);

      await logTransaction({
        transactionId,
        status: mappedStatus,
        paymentMethod: 'crypto',
        metadata: {
          blockchainTxId: txid,
          confirmations,
          originalStatus: status,
          processor: 'CryptoProcessor',
          processStep: 'CALLBACK_PROCESSING'
        }
      });

      return {
        success: true,
        status: mappedStatus,
        transactionId,
        blockchainTxId: txid,
        confirmations
      };
    } catch (error) {
      console.error('Callback processing error:', error);
      return {
        success: false,
        error: ERROR_CODES.CALLBACK_PROCESSING_ERROR,
        message: 'Failed to process cryptocurrency callback'
      };
    }
  }

  /**
   * Start monitoring a transaction for updates
   * @param {Object} transaction Transaction to monitor
   * @private
   */
  async monitorTransaction(transaction) {
    const checkInterval = 60000; // Check every minute
    const expiresAt = new Date(transaction.expiresAt);

    const monitor = setInterval(async () => {
      const status = await this.checkTransactionStatus({
        transactionId: transaction.transactionId,
        paymentAddress: transaction.paymentAddress,
        cryptoCurrency: transaction.cryptoCurrency
      });

      if (status.success && status.status === PAYMENT_STATUS.COMPLETED) {
        clearInterval(monitor);
        this.transactionCache.delete(transaction.transactionId);
      } else if (new Date() > expiresAt) {
        clearInterval(monitor);
        this.transactionCache.delete(transaction.transactionId);
        await logTransaction({
          transactionId: transaction.transactionId,
          status: PAYMENT_STATUS.EXPIRED,
          paymentMethod: 'crypto',
          metadata: {
            processor: 'CryptoProcessor',
            processStep: 'TRANSACTION_EXPIRED'
          }
        });
      }
    }, checkInterval);

    this.transactionCache.set(transaction.transactionId, monitor);
  }

  /**
   * Get authentication headers for API requests
   * @returns {Object} Headers with authentication
   * @private
   */
  getAuthHeaders() {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(timestamp + this.apiKey)
      .digest('hex');

    return {
      'X-Api-Key': this.apiKey,
      'X-Timestamp': timestamp,
      'X-Signature': signature
    };
  }

  /**
   * Verify callback signature
   * @param {Object} callbackData Callback data to verify
   * @returns {boolean} True if signature is valid
   * @private
   */
  verifyCallback(callbackData) {
    const { signature, timestamp, ...data } = callbackData;
    const expectedSignature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(timestamp + JSON.stringify(data))
      .digest('hex');

    return signature === expectedSignature;
  }

  /**
   * Map external transaction status to internal status
   * @param {string} externalStatus External status from processor
   * @param {number} confirmations Number of confirmations
   * @returns {string} Internal status
   * @private
   */
  mapTransactionStatus(externalStatus, confirmations) {
    switch (externalStatus.toLowerCase()) {
      case 'completed':
      case 'confirmed':
        return PAYMENT_STATUS.COMPLETED;
      case 'pending':
      case 'unconfirmed':
        return PAYMENT_STATUS.PENDING;
      case 'failed':
      case 'rejected':
        return PAYMENT_STATUS.FAILED;
      case 'expired':
        return PAYMENT_STATUS.EXPIRED;
      default:
        return PAYMENT_STATUS.PENDING;
    }
  }
}

export default CryptoProcessor;

