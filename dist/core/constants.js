"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.WEBHOOK_EVENTS = exports.TRANSACTION_TYPES = exports.SUBSCRIPTION_INTERVALS = exports.SETTLEMENT_TYPES = exports.QR_CODE_TYPES = exports.PAYMENT_STATUS = exports.PAYMENT_METHODS = exports.GESTURE_TYPES = exports.FEE_TYPES = exports.ERROR_CODES = exports.CURRENCY_CODES = exports.COUNTRY_CODES = exports.BIOMETRIC_TYPES = exports.ALIAS_TYPES = void 0;
/**
 * Sunny Payment Gateway - Constants
 * 
 * Defines constants used throughout the application
 */

// Payment status constants
var PAYMENT_STATUS = exports.PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REJECTED: 'rejected',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
  EXPIRED: 'expired',
  CANCELED: 'canceled',
  ERROR: 'error'
};

// Payment method constants
var PAYMENT_METHODS = exports.PAYMENT_METHODS = {
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_MONEY: 'mobile_money',
  CRYPTO: 'crypto',
  UPI: 'upi',
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
  PAYPAL: 'paypal',
  QR_CODE: 'qr_code',
  CASH: 'cash',
  OFFLINE: 'offline'
};

// Transaction type constants
var TRANSACTION_TYPES = exports.TRANSACTION_TYPES = {
  PAYMENT: 'payment',
  REFUND: 'refund',
  PAYOUT: 'payout',
  TRANSFER: 'transfer',
  SUBSCRIPTION: 'subscription',
  AUTHORIZATION: 'authorization',
  CAPTURE: 'capture',
  VOID: 'void'
};

// Error code constants
var ERROR_CODES = exports.ERROR_CODES = {
  VALIDATION_ERROR: 'validation_error',
  AUTHENTICATION_ERROR: 'authentication_error',
  AUTHORIZATION_ERROR: 'authorization_error',
  INSUFFICIENT_FUNDS: 'insufficient_funds',
  CARD_DECLINED: 'card_declined',
  EXPIRED_CARD: 'expired_card',
  INVALID_CARD: 'invalid_card',
  PROCESSOR_ERROR: 'processor_error',
  RATE_LIMIT_ERROR: 'rate_limit_error',
  SYSTEM_ERROR: 'system_error',
  NETWORK_ERROR: 'network_error',
  FRAUD_DETECTED: 'fraud_detected',
  UNSUPPORTED_PAYMENT_METHOD: 'unsupported_payment_method',
  INVALID_AMOUNT: 'invalid_amount',
  INVALID_CURRENCY: 'invalid_currency',
  DUPLICATE_TRANSACTION: 'duplicate_transaction',
  SUBSCRIPTION_ERROR: 'subscription_error',
  MARKETPLACE_ERROR: 'marketplace_error'
};

// Currency code constants (ISO 4217)
var CURRENCY_CODES = exports.CURRENCY_CODES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'KES', 'NGN', 'ZAR', 'GHS', 'UGX', 'TZS', 'RWF', 'BIF', 'ETB', 'XOF', 'XAF', 'EGP', 'MAD', 'TND', 'BRL', 'MXN', 'ARS', 'CLP', 'COP', 'PEN', 'SGD', 'HKD', 'TWD', 'KRW', 'THB', 'VND', 'IDR', 'MYR', 'PHP', 'PKR', 'BDT', 'RUB', 'TRY', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'ILS', 'NZD'];

// Country code constants (ISO 3166-1 alpha-2)
var COUNTRY_CODES = exports.COUNTRY_CODES = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'CN', 'IN', 'BR', 'MX', 'RU', 'ZA', 'NG', 'KE', 'GH', 'UG', 'TZ', 'RW', 'ET', 'EG', 'MA', 'SN', 'CI', 'CM', 'SG', 'HK', 'KR', 'TH', 'VN', 'ID', 'MY', 'PH', 'PK', 'BD', 'TR', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'SE', 'NO', 'DK', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'IL', 'NZ', 'AR', 'CL', 'CO', 'PE', 'VE'];

// Fee type constants
var FEE_TYPES = exports.FEE_TYPES = {
  TRANSACTION_FEE: 'transaction_fee',
  CURRENCY_CONVERSION_FEE: 'currency_conversion_fee',
  SUBSCRIPTION_FEE: 'subscription_fee',
  REFUND_FEE: 'refund_fee',
  CHARGEBACK_FEE: 'chargeback_fee',
  PAYOUT_FEE: 'payout_fee',
  CROSS_BORDER_FEE: 'cross_border_fee'
};

// Settlement type constants
var SETTLEMENT_TYPES = exports.SETTLEMENT_TYPES = {
  STANDARD: 'standard',
  INSTANT: 'instant',
  NEXT_DAY: 'next_day',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
};

// Subscription interval constants
var SUBSCRIPTION_INTERVALS = exports.SUBSCRIPTION_INTERVALS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};

// Webhook event constants
var WEBHOOK_EVENTS = exports.WEBHOOK_EVENTS = {
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  PAYMENT_DISPUTED: 'payment.disputed',
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  SUBSCRIPTION_CANCELED: 'subscription.canceled',
  SUBSCRIPTION_PAYMENT_SUCCEEDED: 'subscription.payment.succeeded',
  SUBSCRIPTION_PAYMENT_FAILED: 'subscription.payment.failed',
  PAYOUT_CREATED: 'payout.created',
  PAYOUT_PAID: 'payout.paid',
  PAYOUT_FAILED: 'payout.failed'
};

// Biometric type constants
var BIOMETRIC_TYPES = exports.BIOMETRIC_TYPES = {
  FINGERPRINT: 'fingerprint',
  FACE: 'face',
  VOICE: 'voice',
  IRIS: 'iris'
};

// Gesture type constants
var GESTURE_TYPES = exports.GESTURE_TYPES = {
  TAP: 'tap',
  SWIPE: 'swipe',
  PINCH: 'pinch',
  ROTATE: 'rotate'
};

// QR code type constants
var QR_CODE_TYPES = exports.QR_CODE_TYPES = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
  MERCHANT_PRESENTED: 'merchant_presented',
  CUSTOMER_PRESENTED: 'customer_presented'
};

// Alias type constants
var ALIAS_TYPES = exports.ALIAS_TYPES = {
  PHONE_NUMBER: 'phone_number',
  EMAIL: 'email',
  USERNAME: 'username',
  CUSTOM: 'custom'
};
var _default = exports["default"] = {
  PAYMENT_STATUS: PAYMENT_STATUS,
  PAYMENT_METHODS: PAYMENT_METHODS,
  TRANSACTION_TYPES: TRANSACTION_TYPES,
  ERROR_CODES: ERROR_CODES,
  CURRENCY_CODES: CURRENCY_CODES,
  COUNTRY_CODES: COUNTRY_CODES,
  FEE_TYPES: FEE_TYPES,
  SETTLEMENT_TYPES: SETTLEMENT_TYPES,
  SUBSCRIPTION_INTERVALS: SUBSCRIPTION_INTERVALS,
  WEBHOOK_EVENTS: WEBHOOK_EVENTS,
  BIOMETRIC_TYPES: BIOMETRIC_TYPES,
  GESTURE_TYPES: GESTURE_TYPES,
  QR_CODE_TYPES: QR_CODE_TYPES,
  ALIAS_TYPES: ALIAS_TYPES
};