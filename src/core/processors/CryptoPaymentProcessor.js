/**
 * CryptoPaymentProcessor.js
 * Handles cryptocurrency payments and wallet operations
 */

import { formatAddress, formatCryptoAmount, convertAmount } from '../../utils/formatters';
import { CRYPTO_CURRENCIES, PAYMENT_STATUS } from '../constants';
import config from '../../config/config';
import Web3 from 'web3';
import { CoinbasePro } from 'coinbase-pro-node';
import { BinanceConnector } from '@binance/connector';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import BlockchainMonitor from '../monitoring/BlockchainMonitor';
import WalletManager from './WalletManager';

class CryptoPaymentProcessor {
  constructor() {
    this.supportedCurrencies = CRYPTO_CURRENCIES;
    this.exchangeRateSource = config.crypto.exchangeRateSource || 'coinbase';
    this.autoConvertToFiat = config.crypto.autoConvertToFiat;
    this.preferredFiatCurrency = config.crypto.preferredFiatCurrency;
    this.requiredConfirmations = config.crypto.requiredConfirmations;

    // Initialize blockchain providers
    this.initializeProviders();
    
    // Initialize exchange rate providers
    this.initializeExchangeProviders();

    // Initialize blockchain monitor
    BlockchainMonitor.initialize();
    
    // Set up event listeners
    BlockchainMonitor.on('payment_confirmed', this.handlePaymentConfirmation.bind(this));
    BlockchainMonitor.on('payment_amount_mismatch', this.handleAmountMismatch.bind(this));
    BlockchainMonitor.on('payment_expired', this.handleExpiredPayment.bind(this));
    BlockchainMonitor.on('monitoring_error', this.handleMonitoringError.bind(this));
  }

  /**
   * Initialize blockchain providers for each supported cryptocurrency
   */
  async initializeProviders() {
    // Initialize Ethereum provider
    this.ethProvider = new ethers.providers.JsonRpcProvider(config.crypto.ethereumNodeUrl);
    
    // Initialize Bitcoin provider
    this.btcProvider = new Web3(new Web3.providers.HttpProvider(config.crypto.bitcoinNodeUrl));
    
    // Initialize USDT and USDC providers (they run on Ethereum)
    this.usdtContract = new ethers.Contract(
      config.crypto.usdtContractAddress,
      ['function transfer(address to, uint256 value)', 'function balanceOf(address) view returns (uint256)'],
      this.ethProvider
    );
    
    this.usdcContract = new ethers.Contract(
      config.crypto.usdcContractAddress,
      ['function transfer(address to, uint256 value)', 'function balanceOf(address) view returns (uint256)'],
      this.ethProvider
    );
  }

  /**
   * Initialize exchange rate providers
   */
  async initializeExchangeProviders() {
    // Initialize Coinbase Pro client
    this.coinbaseClient = new CoinbasePro({
      apiKey: config.crypto.coinbase.apiKey,
      apiSecret: config.crypto.coinbase.apiSecret,
      passphrase: config.crypto.coinbase.passphrase,
      useSandbox: !config.isProduction
    });

    // Initialize Binance client as backup
    this.binanceClient = new BinanceConnector({
      apiKey: config.crypto.binance.apiKey,
      apiSecret: config.crypto.binance.apiSecret,
      baseURL: config.isProduction ? 'https://api.binance.com' : 'https://testnet.binance.vision'
    });
  }

  /**
   * Process a cryptocurrency payment
   */
  async process(paymentRequest) {
    try {
      // 1. Validate cryptocurrency and amount
      await this.validateCryptoPayment(paymentRequest);

      // 2. Generate payment address
      const paymentAddress = await this.generatePaymentAddress(paymentRequest.currency);

      // 3. Calculate amounts and exchange rates
      const rates = await this.getExchangeRates(paymentRequest.currency);
      const cryptoAmount = this.calculateCryptoAmount(paymentRequest.amount, paymentRequest.currency, rates);

      // 4. Create QR code payment data
      const qrData = await this.generateQRCodeData({
        address: paymentAddress,
        amount: cryptoAmount,
        currency: paymentRequest.currency
      });

      // 5. Initialize payment tracking
      const paymentTracker = await this.initializePaymentTracking({
        expectedAmount: cryptoAmount,
        receivingAddress: paymentAddress,
        currency: paymentRequest.currency,
        exchangeRate: rates[paymentRequest.currency],
        merchantId: paymentRequest.merchantId,
        metadata: paymentRequest.metadata
      });

      // Return initial payment response
      return {
        success: true,
        status: PAYMENT_STATUS.PENDING,
        transactionId: paymentTracker.id,
        paymentAddress,
        cryptoAmount,
        qrCode: qrData,
        exchangeRate: rates[paymentRequest.currency],
        expiresAt: paymentTracker.expiresAt,
        requiredConfirmations: this.requiredConfirmations[paymentRequest.currency]
      };
    } catch (error) {
      throw this.handleProcessingError(error);
    }
  }

  /**
   * Validate cryptocurrency payment request
   */
  async validateCryptoPayment(request) {
    const { currency, amount } = request;

    // Check if currency is supported
    if (!this.supportedCurrencies[currency]) {
      throw new Error(`Unsupported cryptocurrency: ${currency}`);
    }

    // Validate amount is above minimum
    const minAmount = config.crypto.minimumAmount[currency];
    if (amount < minAmount) {
      throw new Error(`Amount below minimum for ${currency}: ${minAmount}`);
    }

    // Additional validation can be added here
    return true;
  }

  /**
   * Generate new payment address for receiving crypto
   */
  async generatePaymentAddress(currency, userId) {
    try {
      // Get or create user's wallet for this currency
      let wallet;
      try {
        wallet = await WalletManager.getWallet(userId, currency);
      } catch (error) {
        if (error.message === 'Wallet not found') {
          wallet = await WalletManager.createWallet(userId, currency);
        } else {
          throw error;
        }
      }
      return wallet.address;
    } catch (error) {
      console.error('Error generating payment address:', error);
      throw new Error('Failed to generate payment address');
    }
  }

  /**
   * Get current exchange rates from configured source
   */
  async getExchangeRates(cryptoCurrency) {
    try {
      // Try primary source (Coinbase)
      const product = `${cryptoCurrency}-USD`;
      const ticker = await this.coinbaseClient.rest.product.getProductTicker(product);
      return {
        [cryptoCurrency]: parseFloat(ticker.price)
      };
    } catch (error) {
      // Fallback to Binance
      try {
        const symbol = `${cryptoCurrency}USDT`;
        const ticker = await this.binanceClient.getSymbolPriceTicker({ symbol });
        return {
          [cryptoCurrency]: parseFloat(ticker.price)
        };
      } catch (fallbackError) {
        throw new Error(`Failed to fetch exchange rates: ${error.message}`);
      }
    }
  }

  /**
   * Calculate crypto amount based on fiat amount and current rates
   */
  calculateCryptoAmount(fiatAmount, cryptoCurrency, rates) {
    const rate = rates[cryptoCurrency];
    if (!rate) {
      throw new Error(`Exchange rate not available for ${cryptoCurrency}`);
    }

    // Use BigNumber for precise calculations
    return new BigNumber(fiatAmount)
      .dividedBy(new BigNumber(rate))
      .toFixed(this.getCurrencyDecimals(cryptoCurrency));
  }

  /**
   * Get decimals for currency
   */
  getCurrencyDecimals(currency) {
    const decimals = {
      BTC: 8,
      ETH: 18,
      USDT: 6,
      USDC: 6
    };
    return decimals[currency] || 8;
  }

  /**
   * Generate QR code payment data
   */
  async generateQRCodeData(paymentInfo) {
    // Generate QR code data in appropriate format for each currency
    // For example: bitcoin:address?amount=xxx for BTC
    const { address, amount, currency } = paymentInfo;
    
    switch(currency) {
      case 'BTC':
        return `bitcoin:${address}?amount=${amount}`;
      case 'ETH':
        return `ethereum:${address}?value=${amount}`;
      default:
        return `${currency.toLowerCase()}:${address}?amount=${amount}`;
    }
  }

  /**
   * Initialize payment tracking in the system
   */
  async initializePaymentTracking(paymentInfo) {
    // Store payment details and start monitoring blockchain
    const { expectedAmount, receivingAddress, currency, exchangeRate, merchantId, metadata } = paymentInfo;

    return {
      id: this.generateTransactionId(),
      expectedAmount,
      receivingAddress,
      currency,
      exchangeRate,
      merchantId,
      metadata,
      status: PAYMENT_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      expiresAt: this.calculateExpiryTime(),
      requiredConfirmations: this.requiredConfirmations[currency]
    };
  }

  /**
   * Handle errors during payment processing
   */
  handleProcessingError(error) {
    // Log the error and return standardized error response
    console.error('Crypto payment processing error:', error);

    return {
      success: false,
      error: error.message || 'Cryptocurrency payment processing failed',
      errorCode: error.code || 'CRYPTO_PROCESSING_ERROR'
    };
  }

  /**
   * Generate unique transaction ID
   */
  generateTransactionId() {
    return `crypto_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Calculate payment expiry time
   */
  calculateExpiryTime() {
    // Default expiry of 1 hour from now
    return new Date(Date.now() + 60 * 60 * 1000).toISOString();
  }

  /**
   * Get blockchain provider for specified currency
   */
  getWalletProvider(currency) {
    switch (currency) {
      case 'ETH':
        return {
          generateAddress: async () => {
            const wallet = ethers.Wallet.createRandom().connect(this.ethProvider);
            return wallet.address;
          },
          getBalance: async (address) => {
            const balance = await this.ethProvider.getBalance(address);
            return ethers.utils.formatEther(balance);
          },
          transfer: async ({ fromAddress, toAddress, amount, privateKey }) => {
            const wallet = new ethers.Wallet(privateKey, this.ethProvider);
            const tx = await wallet.sendTransaction({
              to: toAddress,
              value: ethers.utils.parseEther(amount)
            });
            return tx;
          }
        };
      
      case 'BTC':
        return {
          generateAddress: async () => {
            const account = await this.btcProvider.eth.accounts.create();
            return account.address;
          },
          getBalance: async (address) => {
            const balance = await this.btcProvider.eth.getBalance(address);
            return this.btcProvider.utils.fromWei(balance, 'ether');
          },
          transfer: async ({ fromAddress, toAddress, amount, privateKey }) => {
            const account = this.btcProvider.eth.accounts.privateKeyToAccount(privateKey);
            const tx = await account.signTransaction({
              from: fromAddress,
              to: toAddress,
              value: this.btcProvider.utils.toWei(amount, 'ether'),
              gas: await this.btcProvider.eth.estimateGas({ from: fromAddress, to: toAddress }),
              gasPrice: await this.btcProvider.eth.getGasPrice()
            });
            return this.btcProvider.eth.sendSignedTransaction(tx.rawTransaction);
          }
        };

      case 'USDT':
        return {
          generateAddress: async () => {
            const wallet = ethers.Wallet.createRandom().connect(this.ethProvider);
            return wallet.address;
          },
          getBalance: async (address) => {
            const balance = await this.usdtContract.balanceOf(address);
            return ethers.utils.formatUnits(balance, 6); // USDT uses 6 decimals
          },
          transfer: async ({ fromAddress, toAddress, amount, privateKey }) => {
            const wallet = new ethers.Wallet(privateKey, this.ethProvider);
            const contract = this.usdtContract.connect(wallet);
            const tx = await contract.transfer(
              toAddress,
              ethers.utils.parseUnits(amount, 6)
            );
            return tx;
          }
        };

      case 'USDC':
        return {
          generateAddress: async () => {
            const wallet = ethers.Wallet.createRandom().connect(this.ethProvider);
            return wallet.address;
          },
          getBalance: async (address) => {
            const balance = await this.usdcContract.balanceOf(address);
            return ethers.utils.formatUnits(balance, 6); // USDC uses 6 decimals
          },
          transfer: async ({ fromAddress, toAddress, amount, privateKey }) => {
            const wallet = new ethers.Wallet(privateKey, this.ethProvider);
            const contract = this.usdcContract.connect(wallet);
            const tx = await contract.transfer(
              toAddress,
              ethers.utils.parseUnits(amount, 6)
            );
            return tx;
          }
        };

      default:
        throw new Error(`Unsupported cryptocurrency: ${currency}`);
    }
  }

  /**
   * Handle successful payment confirmation
   */
  async handlePaymentConfirmation(paymentData) {
    const { transactionId, blockchainTxId, confirmations, amount } = paymentData;

    // Update payment status
    const payment = await this.updatePaymentStatus(transactionId, {
      status: PAYMENT_STATUS.SUCCESS,
      blockchainTxId,
      confirmations,
      amount,
      completedAt: new Date().toISOString()
    });

    // If auto-convert is enabled, initiate conversion to fiat
    if (this.autoConvertToFiat && payment) {
      await this.convertToFiat(payment);
    }

    // Notify merchant
    this.notifyMerchant(payment.merchantId, {
      type: 'payment_confirmed',
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency
    });
  }

  /**
   * Handle payment amount mismatch
   */
  async handleAmountMismatch(paymentData) {
    const { transactionId, expected, received } = paymentData;
    
    // Update payment status
    await this.updatePaymentStatus(transactionId, {
      status: PAYMENT_STATUS.AMOUNT_MISMATCH,
      expectedAmount: expected,
      receivedAmount: received,
      updatedAt: new Date().toISOString()
    });

    // Notify merchant
    this.notifyMerchant(payment.merchantId, {
      type: 'payment_amount_mismatch',
      paymentId: transactionId,
      expected,
      received
    });
  }

  /**
   * Handle expired payment
   */
  async handleExpiredPayment(paymentData) {
    const { transactionId } = paymentData;
    
    // Update payment status
    await this.updatePaymentStatus(transactionId, {
      status: PAYMENT_STATUS.EXPIRED,
      updatedAt: new Date().toISOString()
    });

    // Notify merchant
    this.notifyMerchant(payment.merchantId, {
      type: 'payment_expired',
      paymentId: transactionId
    });
  }

  /**
   * Handle monitoring errors
   */
  async handleMonitoringError(errorData) {
    const { transactionId, error } = errorData;
    
    console.error(`Monitoring error for transaction ${transactionId}:`, error);

    // Update payment status if needed
    await this.updatePaymentStatus(transactionId, {
      status: PAYMENT_STATUS.ERROR,
      error: error.message,
      updatedAt: new Date().toISOString()
    });

    // Notify merchant about the error
    this.notifyMerchant(payment.merchantId, {
      type: 'payment_error',
      paymentId: transactionId,
      error: error.message
    });
  }

  /**
   * Update payment status in database
   */
  async updatePaymentStatus(transactionId, updates) {
    // In a real implementation, this would update the payment record in your database
    // For now, we'll emit an event that can be handled by the payment orchestrator
    this.emit('payment_status_updated', {
      transactionId,
      ...updates
    });
  }

  /**
   * Convert cryptocurrency to fiat
   */
  async convertToFiat(payment) {
    try {
      // Get current exchange rate
      const rates = await this.getExchangeRates(payment.currency);
      const rate = rates[payment.currency];

      // Calculate fiat amount
      const fiatAmount = new BigNumber(payment.amount)
        .multipliedBy(rate)
        .toFixed(2);

      // Initiate conversion through exchange
      const conversion = await this.coinbaseClient.rest.transfer.createTransfer({
        amount: payment.amount,
        currency: payment.currency,
        toAccount: config.crypto.fiatAccount,
        type: 'convert'
      });

      // Update payment record with conversion details
      await this.updatePaymentStatus(payment.id, {
        fiatAmount,
        fiatCurrency: this.preferredFiatCurrency,
        conversionId: conversion.id,
        conversionRate: rate,
        convertedAt: new Date().toISOString()
      });

    } catch (error) {
      console.error(`Error converting payment ${payment.id} to fiat:`, error);
      // Continue without failing the payment process
    }
  }

  /**
   * Notify merchant about payment events
   */
  async notifyMerchant(merchantId, notification) {
    try {
      // In a real implementation, this would send webhooks or notifications
      // to the merchant's callback URL
      this.emit('merchant_notification', {
        merchantId,
        ...notification,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error notifying merchant ${merchantId}:`, error);
    }
  }
}

export default CryptoPaymentProcessor;
