/**
 * Payment Processor Configuration
 * 
 * Configuration settings for all payment processors supported by the Sunny Payment Gateway
 */

import dotenv from 'dotenv';
import config from './config.js';

// Load environment variables from .env file
dotenv.config();

const environment = config.app.environment;
const isProduction = environment === 'production';

// Define payment processor configurations
const processors = {
  // Stripe payment processor configuration
  stripe: {
    enabled: process.env.STRIPE_ENABLED !== 'false',
    apiVersion: process.env.STRIPE_API_VERSION || '2023-10-16',
    secretKey: isProduction 
      ? process.env.STRIPE_SECRET_KEY 
      : (process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_test_key'),
    publishableKey: isProduction
      ? process.env.STRIPE_PUBLISHABLE_KEY
      : (process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_test_key'),
    webhookSecret: isProduction
      ? process.env.STRIPE_WEBHOOK_SECRET
      : (process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_stripe_webhook_secret'),
    // Payment method specific settings
    paymentMethods: {
      card: {
        enabled: true,
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'],
        requiresCVC: true,
        requires3DS: process.env.STRIPE_REQUIRE_3DS !== 'false'
      },
      achDebit: {
        enabled: process.env.STRIPE_ENABLE_ACH === 'true',
        supportedCurrencies: ['USD']
      },
      sepaDebit: {
        enabled: process.env.STRIPE_ENABLE_SEPA === 'true',
        supportedCurrencies: ['EUR']
      }
    }
  },
  
  // PayPal payment processor configuration
  paypal: {
    enabled: process.env.PAYPAL_ENABLED !== 'false',
    environment: isProduction ? 'production' : 'sandbox',
    clientId: isProduction
      ? process.env.PAYPAL_CLIENT_ID
      : (process.env.PAYPAL_CLIENT_ID || 'your_paypal_client_id'),
    clientSecret: isProduction
      ? process.env.PAYPAL_CLIENT_SECRET
      : (process.env.PAYPAL_CLIENT_SECRET || 'your_paypal_client_secret'),
    merchantId: process.env.PAYPAL_MERCHANT_ID,
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'MXN'],
    // Payment method specific settings
    paymentMethods: {
      paypal: {
        enabled: true
      },
      venmo: {
        enabled: process.env.PAYPAL_ENABLE_VENMO === 'true',
        supportedCurrencies: ['USD']
      },
      card: {
        enabled: process.env.PAYPAL_ENABLE_CARDS === 'true'
      }
    }
  },
  
  // M-Pesa mobile money processor configuration
  mpesa: {
    enabled: process.env.MPESA_ENABLED !== 'false',
    environment: isProduction ? 'production' : 'sandbox',
    consumerKey: isProduction
      ? process.env.MPESA_CONSUMER_KEY
      : (process.env.MPESA_CONSUMER_KEY || 'your_mpesa_consumer_key'),
    consumerSecret: isProduction
      ? process.env.MPESA_CONSUMER_SECRET
      : (process.env.MPESA_CONSUMER_SECRET || 'your_mpesa_consumer_secret'),
    shortCode: isProduction
      ? process.env.MPESA_SHORT_CODE
      : (process.env.MPESA_SHORT_CODE || '174379'),
    passKey: isProduction
      ? process.env.MPESA_PASS_KEY
      : (process.env.MPESA_PASS_KEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'),
    callbackUrl: `${config.app.baseUrl}/api/callbacks/mpesa`,
    timeoutInSeconds: parseInt(process.env.MPESA_TIMEOUT_SECONDS, 10) || 60,
    supportedCurrencies: ['KES'],
    // M-Pesa specific settings
    transactionType: process.env.MPESA_TRANSACTION_TYPE || 'CustomerPayBillOnline',
    supportedCountries: ['KE']
  },
  
  // Crypto payment processor configuration
  crypto: {
    enabled: process.env.CRYPTO_ENABLED !== 'false',
    environment: isProduction ? 'production' : 'sandbox',
    apiKey: isProduction
      ? process.env.CRYPTO_API_KEY
      : (process.env.CRYPTO_API_KEY || 'your_crypto_api_key'),
    apiSecret: isProduction
      ? process.env.CRYPTO_API_SECRET
      : (process.env.CRYPTO_API_SECRET || 'your_crypto_api_secret'),
    callbackUrl: `${config.app.baseUrl}/api/callbacks/crypto`,
    // Supported cryptocurrencies
    supportedCurrencies: ['BTC', 'ETH', 'USDT', 'USDC'],
    // Required confirmations for different cryptocurrencies
    requiredConfirmations: {
      BTC: parseInt(process.env.CRYPTO_BTC_CONFIRMATIONS, 10) || 3,
      ETH: parseInt(process.env.CRYPTO_ETH_CONFIRMATIONS, 10) || 12,
      USDT: parseInt(process.env.CRYPTO_USDT_CONFIRMATIONS, 10) || 12,
      USDC: parseInt(process.env.CRYPTO_USDC_CONFIRMATIONS, 10) || 12
    },
    // Exchange rate sources
    exchangeRateSource: process.env.CRYPTO_EXCHANGE_RATE_SOURCE || 'coinbase',
    // Auto-conversion to fiat settings
    autoConvertToFiat: process.env.CRYPTO_AUTO_CONVERT_TO_FIAT === 'true',
    preferredFiatCurrency: process.env.CRYPTO_PREFERRED_FIAT || 'USD'
  },
  
  // QR code payment processor configuration
  qrcode: {
    enabled: process.env.QRCODE_ENABLED !== 'false',
    environment: isProduction ? 'production' : 'sandbox',
    apiKey: isProduction
      ? process.env.QRCODE_API_KEY
      : (process.env.QRCODE_API_KEY || 'your_qrcode_api_key'),
    apiSecret: isProduction
      ? process.env.QRCODE_API_SECRET
      : (process.env.QRCODE_API_SECRET || 'your_qrcode_api_secret'),
    callbackUrl: `${config.app.baseUrl}/api/callbacks/qrcode`,
    // Supported QR payment types
    supportedTypes: ['alipay', 'wechat', 'upi', 'crypto', 'bank_app', 'merchant_presented', 'customer_presented'],
    // QR code expiration in minutes
    expirationMinutes: parseInt(process.env.QRCODE_EXPIRATION_MINUTES, 10) || 30,
    // Currency support for different QR code types
    currencySupport:

