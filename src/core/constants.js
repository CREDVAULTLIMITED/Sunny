/**
 * constants.js
 * 
 * Core constants used throughout the payment system
 */

// Payment methods supported by the system
export const PAYMENT_METHODS = {
  MOBILE_MONEY: 'MOBILE_MONEY',
  CARD: 'CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  QR_CODE: 'QR_CODE',
  CRYPTO: 'CRYPTO',
  P2P: 'P2P',
  CASH: 'CASH',
  OFFLINE: 'OFFLINE'
};

// Mobile money providers
export const MOBILE_MONEY_PROVIDERS = {
  MPESA: 'MPESA',
  AIRTEL: 'AIRTEL',
  MTN: 'MTN',
  ORANGE: 'ORANGE',
  VODACOM: 'VODACOM',
  TIGO: 'TIGO'
};

// Card networks
export const CARD_NETWORKS = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  AMEX: 'AMEX',
  DISCOVER: 'DISCOVER',
  JCB: 'JCB',
  UNIONPAY: 'UNIONPAY'
};

// Cryptocurrency types
export const CRYPTO_TYPES = {
  BTC: 'BTC',
  ETH: 'ETH',
  USDC: 'USDC',
  USDT: 'USDT',
  XRP: 'XRP'
};

// Transaction status codes
export const PAYMENT_STATUS = {
  INITIATED: 'INITIATED',
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

// Settlement status codes
export const SETTLEMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

// Error codes
export const ERROR_CODES = {
  // General errors
  GENERAL_ERROR: 'ERR_GENERAL',
  VALIDATION_ERROR: 'ERR_VALIDATION',
  AUTHENTICATION_ERROR: 'ERR_AUTH',
  AUTHORIZATION_ERROR: 'ERR_AUTHZ',
  
  // Transaction errors
  TRANSACTION_NOT_FOUND: 'ERR_TXN_NOT_FOUND',
  INSUFFICIENT_FUNDS: 'ERR_INSUFFICIENT_FUNDS',
  DUPLICATE_TRANSACTION: 'ERR_DUPLICATE_TXN',
  TRANSACTION_EXPIRED: 'ERR_TXN_EXPIRED',
  
  // Payment method errors
  PAYMENT_METHOD_ERROR: 'ERR_PAYMENT_METHOD',
  CARD_DECLINED: 'ERR_CARD_DECLINED',
  INVALID_CARD: 'ERR_INVALID_CARD',
  MOBILE_MONEY_ERROR: 'ERR_MOBILE_MONEY',
  BANK_TRANSFER_ERROR: 'ERR_BANK_TRANSFER',
  CRYPTO_ERROR: 'ERR_CRYPTO',
  
  // Identity errors
  IDENTITY_ERROR: 'ERR_IDENTITY',
  IDENTITY_NOT_FOUND: 'ERR_IDENTITY_NOT_FOUND',
  
  // Network errors
  NETWORK_ERROR: 'ERR_NETWORK',
  TIMEOUT_ERROR: 'ERR_TIMEOUT',
  
  // Settlement errors
  SETTLEMENT_ERROR: 'ERR_SETTLEMENT'
};

// Identity types
export const IDENTITY_TYPES = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  USERNAME: 'USERNAME',
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  CRYPTO_ADDRESS: 'CRYPTO_ADDRESS',
  NATIONAL_ID: 'NATIONAL_ID'
};

// Supported currencies
export const CURRENCIES = {
  // Fiat currencies
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  KES: 'KES', // Kenyan Shilling
  NGN: 'NGN', // Nigerian Naira
  ZAR: 'ZAR', // South African Rand
  GHS: 'GHS', // Ghanaian Cedi
  UGX: 'UGX', // Ugandan Shilling
  TZS: 'TZS', // Tanzanian Shilling
  RWF: 'RWF', // Rwandan Franc
  INR: 'INR', // Indian Rupee
  
  // Cryptocurrencies
  BTC: 'BTC',
  ETH: 'ETH',
  USDC: 'USDC',
  USDT: 'USDT'
};

// Fee types
export const FEE_TYPES = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED: 'FIXED',
  MIXED: 'MIXED'
};

// Transaction types
export const TRANSACTION_TYPES = {
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  TRANSFER: 'TRANSFER',
  WITHDRAWAL: 'WITHDRAWAL',
  DEPOSIT: 'DEPOSIT'
};

// Routing strategies
export const ROUTING_STRATEGIES = {
  CHEAPEST: 'CHEAPEST',
  FASTEST: 'FASTEST',
  MOST_RELIABLE: 'MOST_RELIABLE',
  USER_PREFERRED: 'USER_PREFERRED'
};

// QR code types
export const QR_CODE_TYPES = {
  STATIC: 'STATIC',
  DYNAMIC: 'DYNAMIC'
};

// Hardware types
export const HARDWARE_TYPES = {
  POS_TERMINAL: 'POS_TERMINAL',
  CARD_READER: 'CARD_READER',
  QR_SCANNER: 'QR_SCANNER',
  BIOMETRIC: 'BIOMETRIC'
};

// Biometric types
export const BIOMETRIC_TYPES = {
  FACE: 'FACE',
  FINGERPRINT: 'FINGERPRINT',
  PALM: 'PALM',
  VOICE: 'VOICE'
};

// Offline payment types
export const OFFLINE_PAYMENT_TYPES = {
  USSD: 'USSD',
  SMS: 'SMS',
  OFFLINE_QR: 'OFFLINE_QR'
};