/**
 * constants.js
 * Payment system constants and configurations
 */

export const PAYMENT_METHODS = {
  CARD: 'CARD',
  MOBILE_MONEY: 'MOBILE_MONEY',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CRYPTO: 'CRYPTO',
  QR: 'QR'
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
  EXPIRED: 'EXPIRED'
};

export const CARD_NETWORKS = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMEX: 'amex',
  UNIONPAY: 'unionpay',
  VERVE: 'verve'
};

export const MOBILE_MONEY_PROVIDERS = {
  MPESA: {
    name: 'M-Pesa',
    countries: ['KE', 'TZ'],
    currencies: ['KES', 'TZS'],
    prefixes: ['254', '255'],
    apiVersion: '2.0'
  },
  AIRTEL: {
    name: 'Airtel Money',
    countries: ['KE', 'UG', 'TZ', 'RW'],
    currencies: ['KES', 'UGX', 'TZS', 'RWF'],
    prefixes: ['254', '256', '255', '250'],
    apiVersion: '1.0'
  },
  MTN: {
    name: 'MTN Mobile Money',
    countries: ['UG', 'RW'],
    currencies: ['UGX', 'RWF'],
    prefixes: ['256', '250'],
    apiVersion: '1.0'
  }
};

export const CRYPTO_CURRENCIES = {
  BTC: {
    name: 'Bitcoin',
    network: 'bitcoin',
    confirmations: 2
  },
  ETH: {
    name: 'Ethereum',
    network: 'ethereum',
    confirmations: 12
  },
  USDT: {
    name: 'Tether',
    network: 'ethereum',
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    confirmations: 12
  }
};

export const SUPPORTED_CURRENCIES = [
  // Fiat Currencies
  'USD', 'EUR', 'GBP',
  'KES', 'TZS', 'UGX', 'RWF', // East African
  'NGN', 'GHS', 'ZAR', // Other African
  
  // Crypto Currencies
  'BTC', 'ETH', 'USDT'
];

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PROVIDER_ERROR: 'PROVIDER_ERROR',
  TIMEOUT: 'TIMEOUT',
  FRAUD_DETECTED: 'FRAUD_DETECTED',
  INVALID_CARD: 'INVALID_CARD',
  DECLINED: 'DECLINED'
};

export const WEBHOOK_EVENTS = {
  PAYMENT_INITIATED: 'payment.initiated',
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  REFUND_INITIATED: 'refund.initiated',
  REFUND_SUCCEEDED: 'refund.succeeded',
  DISPUTE_CREATED: 'dispute.created',
  DISPUTE_UPDATED: 'dispute.updated'
};

export const API_VERSIONS = {
  CURRENT: 'v1',
  SUPPORTED: ['v1', 'v2-beta']
};
