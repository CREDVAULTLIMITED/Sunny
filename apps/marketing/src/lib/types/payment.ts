/**
 * Payment Types for Sunny Payment Gateway
 */

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank_transfer' | 'mobile_money' | 'crypto' | 'wallet';
  icon?: string;
  enabled: boolean;
}

export interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: string;
  customer: CustomerData;
  metadata?: Record<string, any>;
  instantSettlement?: boolean;
  description?: string;
}

export interface CustomerData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  address?: AddressData;
}

export interface AddressData {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}

export interface CardData {
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
  name: string;
}

export interface BankTransferData {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType?: 'checking' | 'savings';
}

export interface MobileMoneyData {
  provider: 'mpesa' | 'mtn' | 'airtel' | 'orange';
  phoneNumber: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  paymentMethod: string;
  fees?: FeeDetails;
  error?: string;
  message?: string;
  processorResponse?: ProcessorResponse;
  settlement?: SettlementResult;
  metadata?: Record<string, any>;
}

export interface ProcessorResponse {
  authorizationCode?: string;
  processorTransactionId: string;
  processorName: string;
  mobileMoneyId?: string;
  providerReference?: string;
}

export interface SettlementResult {
  settlementId: string;
  status: 'pending' | 'completed' | 'failed';
  estimatedArrival?: string;
  actualArrival?: string;
}

export interface FeeDetails {
  processingFee: number;
  conversionFee?: number;
  settlementFee?: number;
  totalFees: number;
  currency: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  REJECTED = 'rejected',
  ERROR = 'error'
}

export enum PaymentMethods {
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  MOBILE_MONEY = 'mobile_money',
  CRYPTO = 'crypto',
  UPI = 'upi',
  ALIPAY = 'alipay',
  WECHAT = 'wechat',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay'
}

export enum TransactionTypes {
  PAYMENT = 'payment',
  REFUND = 'refund',
  TRANSFER = 'transfer',
  WITHDRAWAL = 'withdrawal'
}

export enum ErrorCodes {
  VALIDATION_ERROR = 'validation_error',
  FRAUD_DETECTED = 'fraud_detected',
  INSUFFICIENT_FUNDS = 'insufficient_funds',
  CARD_DECLINED = 'card_declined',
  EXPIRED_CARD = 'expired_card',
  INVALID_CVC = 'invalid_cvc',
  PROCESSING_ERROR = 'processing_error',
  NETWORK_ERROR = 'network_error',
  SYSTEM_ERROR = 'system_error',
  UNSUPPORTED_PAYMENT_METHOD = 'unsupported_payment_method',
  SUBSCRIPTION_ERROR = 'subscription_error',
  MARKETPLACE_ERROR = 'marketplace_error'
}

export interface CheckoutConfig {
  merchantName: string;
  amount: number;
  currency: string;
  paymentMethods: PaymentMethod[];
  locale?: string;
  theme?: CheckoutTheme;
  onPaymentComplete?: (result: PaymentResult) => void;
  onError?: (error: string) => void;
}

export interface CheckoutTheme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  fontFamily?: string;
}

export interface MarketplacePayment extends PaymentData {
  splits: PaymentSplit[];
}

export interface PaymentSplit {
  destination: string;
  amount: number;
  currency: string;
  description?: string;
}

export interface SubscriptionData {
  customerId: string;
  planId: string;
  paymentMethod: string;
  startDate?: string;
  metadata?: Record<string, any>;
}

export interface SubscriptionResult {
  success: boolean;
  subscriptionId: string;
  customerId: string;
  planId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  startDate: string;
  nextBillingDate: string;
  error?: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, any>;
  created: string;
}

export interface APIError {
  code: string;
  message: string;
  type: string;
  param?: string;
}
