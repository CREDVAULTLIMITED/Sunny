/**
 * Sunny Payment Gateway - Constants
 * 
 * Defines constants used throughout the payment gateway
 */

// Payment status codes
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REJECTED: 'rejected',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
  CANCELED: 'canceled',
  ERROR: 'error'
};

// Payment methods - expanded to include global payment options
export const PAYMENT_METHODS = {
  // Card payments
  CARD: 'card',
  
  // Bank transfers
  BANK_TRANSFER: 'bank_transfer',
  ACH: 'ach',
  SEPA: 'sepa',
  WIRE: 'wire',
  
  // Mobile money
  MOBILE_MONEY: 'mobile_money',
  MPESA: 'mpesa',
  MTN: 'mtn',
  AIRTEL: 'airtel',
  ORANGE: 'orange',
  
  // Digital wallets
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
  SAMSUNG_PAY: 'samsung_pay',
  
  // Regional payment methods
  UPI: 'upi',
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  PAYTM: 'paytm',
  PIX: 'pix',
  BOLETO: 'boleto',
  OXXO: 'oxxo',
  IDEAL: 'ideal',
  SOFORT: 'sofort',
  GIROPAY: 'giropay',
  BANCONTACT: 'bancontact',
  
  // Cryptocurrency
  CRYPTO: 'crypto',
  
  // Buy now pay later
  KLARNA: 'klarna',
  AFTERPAY: 'afterpay',
  AFFIRM: 'affirm',
  
  // Other
  CASH: 'cash',
  INVOICE: 'invoice'
};

// Transaction types
export const TRANSACTION_TYPES = {
  PAYMENT: 'payment',
  REFUND: 'refund',
  PAYOUT: 'payout',
  TRANSFER: 'transfer',
  FEE: 'fee',
  ADJUSTMENT: 'adjustment',
  SUBSCRIPTION: 'subscription',
  INSTALLMENT: 'installment',
  MARKETPLACE_SPLIT: 'marketplace_split',
  DONATION: 'donation'
};

// Error codes
export const ERROR_CODES = {
  // Validation errors
  VALIDATION_ERROR: 'validation_error',
  INVALID_AMOUNT: 'invalid_amount',
  INVALID_CURRENCY: 'invalid_currency',
  INVALID_PAYMENT_METHOD: 'invalid_payment_method',
  INVALID_CARD: 'invalid_card',
  INVALID_BANK_ACCOUNT: 'invalid_bank_account',
  INVALID_MOBILE_NUMBER: 'invalid_mobile_number',
  INVALID_CRYPTO_ADDRESS: 'invalid_crypto_address',
  INVALID_REFUND_AMOUNT: 'invalid_refund_amount',
  
  // Processing errors
  PROCESSING_ERROR: 'processing_error',
  INSUFFICIENT_FUNDS: 'insufficient_funds',
  CARD_DECLINED: 'card_declined',
  EXPIRED_CARD: 'expired_card',
  INCORRECT_CVV: 'incorrect_cvv',
  BANK_ACCOUNT_ERROR: 'bank_account_error',
  MOBILE_MONEY_ERROR: 'mobile_money_error',
  CRYPTO_ERROR: 'crypto_error',
  
  // System errors
  SYSTEM_ERROR: 'system_error',
  NETWORK_ERROR: 'network_error',
  TIMEOUT_ERROR: 'timeout_error',
  
  // Security errors
  FRAUD_DETECTED: 'fraud_detected',
  SECURITY_VIOLATION: 'security_violation',
  INVALID_SIGNATURE: 'invalid_signature',
  
  // Transaction errors
  TRANSACTION_NOT_FOUND: 'transaction_not_found',
  DUPLICATE_TRANSACTION: 'duplicate_transaction',
  INVALID_TRANSACTION_STATE: 'invalid_transaction_state',
  
  // API errors
  AUTHENTICATION_ERROR: 'authentication_error',
  AUTHORIZATION_ERROR: 'authorization_error',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  
  // Feature errors
  UNSUPPORTED_PAYMENT_METHOD: 'unsupported_payment_method',
  UNSUPPORTED_CURRENCY: 'unsupported_currency',
  UNSUPPORTED_COUNTRY: 'unsupported_country',
  
  // Other errors
  VERIFICATION_ERROR: 'verification_error',
  REFUND_ERROR: 'refund_error',
  TOKENIZATION_ERROR: 'tokenization_error',
  PAYMENT_LINK_ERROR: 'payment_link_error',
  BALANCE_CHECK_ERROR: 'balance_check_error',
  SUBSCRIPTION_ERROR: 'subscription_error',
  MARKETPLACE_ERROR: 'marketplace_error',
  SETTLEMENT_ERROR: 'settlement_error',
  LOCALIZATION_ERROR: 'localization_error',
  ANALYTICS_ERROR: 'analytics_error'
};

// Currency codes - expanded to include more global currencies
export const CURRENCY_CODES = [
  // Major currencies
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY', 'HKD', 'SGD',
  
  // European currencies
  'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'ISK',
  
  // Asian currencies
  'INR', 'IDR', 'MYR', 'PHP', 'THB', 'VND', 'KRW', 'TWD',
  
  // African currencies
  'ZAR', 'NGN', 'KES', 'UGX', 'TZS', 'RWF', 'GHS', 'EGP', 'MAD',
  
  // Latin American currencies
  'BRL', 'MXN', 'ARS', 'CLP', 'COP', 'PEN', 'UYU',
  
  // Middle Eastern currencies
  'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR',
  
  // Cryptocurrencies
  'BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'USDT', 'USDC', 'DAI'
];

// Country codes - expanded to include more countries
export const COUNTRY_CODES = [
  // North America
  'US', 'CA', 'MX',
  
  // Europe
  'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'PT', 'IE', 'AT', 'CH', 'SE', 
  'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'GR', 'HR',
  
  // Asia Pacific
  'AU', 'NZ', 'JP', 'CN', 'HK', 'SG', 'IN', 'ID', 'MY', 'PH', 'TH', 'VN', 'KR', 'TW',
  
  // Middle East
  'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'IL',
  
  // Africa
  'ZA', 'NG', 'KE', 'UG', 'TZ', 'RW', 'GH', 'EG', 'MA',
  
  // Latin America
  'BR', 'AR', 'CL', 'CO', 'PE', 'UY'
];

// Fee types
export const FEE_TYPES = {
  TRANSACTION: 'transaction',
  REFUND: 'refund',
  CHARGEBACK: 'chargeback',
  PAYOUT: 'payout',
  CURRENCY_CONVERSION: 'currency_conversion',
  SUBSCRIPTION: 'subscription',
  MARKETPLACE: 'marketplace'
};

// Settlement types
export const SETTLEMENT_TYPES = {
  STANDARD: 'standard',
  INSTANT: 'instant',
  NEXT_DAY: 'next_day',
  WEEKLY: 'weekly'
};

// Subscription intervals
export const SUBSCRIPTION_INTERVALS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};

// Webhook event types - expanded
export const WEBHOOK_EVENTS = {
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  PAYMENT_DISPUTED: 'payment.disputed',
  PAYOUT_CREATED: 'payout.created',
  PAYOUT_PAID: 'payout.paid',
  PAYOUT_FAILED: 'payout.failed',
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  SUBSCRIPTION_CANCELED: 'subscription.canceled',
  SUBSCRIPTION_PAYMENT_SUCCEEDED: 'subscription.payment.succeeded',
  SUBSCRIPTION_PAYMENT_FAILED: 'subscription.payment.failed',
  MARKETPLACE_PAYOUT_SUCCEEDED: 'marketplace.payout.succeeded',
  MARKETPLACE_PAYOUT_FAILED: 'marketplace.payout.failed',
  ACCOUNT_UPDATED: 'account.updated'
};