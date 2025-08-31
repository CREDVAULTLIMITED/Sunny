/**
 * Payment-related TypeScript types
 */

import { Decimal } from 'decimal.js';

// Base types
export type Currency = 'USD' | 'EUR' | 'GBP' | 'KES' | 'TZS' | 'UGX' | 'RWF' | 'NGN' | 'GHS' | 'ZAR';
export type PaymentMethod = 'card' | 'mobile_money' | 'bank_transfer' | 'crypto' | 'digital_wallet' | 'qr_code';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'expired';
export type ProcessorType = 'stripe' | 'mpesa' | 'flutterwave' | 'paystack' | 'sunny_direct' | 'crypto_processor';

// Customer information
export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  address?: Address;
  metadata?: Record<string, any>;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

// Payment method data
export interface CardData {
  number: string;
  expiryMonth: number;
  expiryYear: number;
  cvc: string;
  holderName: string;
}

export interface MobileMoneyData {
  provider: 'mpesa' | 'airtel' | 'mtn' | 'orange';
  phoneNumber: string;
  accountName?: string;
}

export interface BankTransferData {
  accountNumber: string;
  routingNumber?: string;
  bankCode?: string;
  bankName: string;
  accountHolderName: string;
  accountType?: 'checking' | 'savings';
}

export interface CryptoData {
  currency: 'BTC' | 'ETH' | 'USDT' | 'USDC';
  walletAddress: string;
  network?: string;
}

export type PaymentMethodData = CardData | MobileMoneyData | BankTransferData | CryptoData;

// Payment request/response
export interface PaymentRequest {
  merchantId: string;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  paymentMethodData: PaymentMethodData;
  customer: Customer;
  description?: string;
  reference?: string;
  metadata?: Record<string, any>;
  instantSettlement?: boolean;
  generateReceipt?: boolean;
  webhookUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string | null;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  processorType: ProcessorType | null;
  processorResponse?: ProcessorResponse;
  fees?: FeeDetails;
  settlementInfo?: SettlementInfo;
  error?: PaymentError;
  timestamp: string;
}

export interface ProcessorResponse {
  processorTransactionId: string;
  authorizationCode?: string;
  processorName: string;
  responseCode: string;
  responseMessage: string;
  rawResponse?: Record<string, any>;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Fee calculation
export interface FeeDetails {
  currency: Currency;
  baseFee: {
    percentage: number;
    fixed: number;
    currency: Currency;
  };
  discounts?: {
    percentage: number;
    fixed: number;
    reason: string;
  };
  regionalAdjustment?: {
    percentage: number;
    fixed: number;
    region: string;
  };
  finalRate: {
    percentage: number;
    fixed: number;
  };
  breakdown: {
    percentageFee: number;
    fixedFee: number;
    totalFee: number;
  };
  grossAmount: number;
  netAmount: number;
  feePercentage: number;
}

// Settlement
export interface SettlementInfo {
  type: 'instant' | 'scheduled' | 'manual';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  scheduledFor?: string;
  completedAt?: string;
  settlementId?: string;
  bankAccount?: BankAccount;
  fees?: FeeDetails;
}

export interface BankAccount {
  accountNumber: string;
  bankName: string;
  bankCode: string;
  accountHolderName: string;
  currency: Currency;
}

// Routing
export interface RoutingDecision {
  primaryProcessor: ProcessorType;
  backupProcessor: ProcessorType | null;
  routingReason: string;
  estimatedProcessingTime: number;
  estimatedFees: FeeDetails;
}

// Subscription
export interface SubscriptionRequest {
  merchantId: string;
  customerId: string;
  planId: string;
  paymentMethod: PaymentMethod;
  paymentMethodData: PaymentMethodData;
  startDate?: string;
  metadata?: Record<string, any>;
}

export interface SubscriptionResponse {
  success: boolean;
  subscriptionId: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  customerId: string;
  planId: string;
  startDate: string;
  nextBillingDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
  metadata?: Record<string, any>;
}

// Marketplace payments
export interface MarketplacePaymentRequest extends PaymentRequest {
  splits: PaymentSplit[];
  platformFee?: number;
  platformFeeType?: 'fixed' | 'percentage';
}

export interface PaymentSplit {
  destination: string;
  amount: number;
  currency: Currency;
  description?: string;
  metadata?: Record<string, any>;
}

// Refund
export interface RefundRequest {
  transactionId: string;
  amount?: number;
  reason?: string;
  metadata?: Record<string, any>;
}

export interface RefundResponse {
  success: boolean;
  refundId: string;
  transactionId: string;
  amount: number;
  currency: Currency;
  status: 'pending' | 'completed' | 'failed';
  reason?: string;
  timestamp: string;
}

// Webhook
export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  created: string;
  data: {
    object: PaymentResponse | SubscriptionResponse | RefundResponse;
  };
  livemode: boolean;
  pendingWebhooks: number;
  request?: {
    id: string;
    idempotencyKey?: string;
  };
}

export type WebhookEventType = 
  | 'payment.succeeded'
  | 'payment.failed'
  | 'payment.cancelled'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'refund.created'
  | 'refund.succeeded'
  | 'refund.failed'
  | 'settlement.completed'
  | 'settlement.failed';

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  metadata?: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}

// Pagination
export interface PaginationParams {
  limit?: number;
  offset?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

// Search and filtering
export interface PaymentFilters {
  status?: PaymentStatus[];
  paymentMethod?: PaymentMethod[];
  currency?: Currency[];
  amountRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: string;
    end: string;
  };
  merchantId?: string;
  customerId?: string;
}

export interface PaymentSearchRequest extends PaginationParams {
  filters?: PaymentFilters;
  sortBy?: 'created' | 'amount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

// Analytics
export interface PaymentAnalytics {
  totalVolume: number;
  totalCount: number;
  averageAmount: number;
  successRate: number;
  topPaymentMethods: Array<{
    method: PaymentMethod;
    volume: number;
    count: number;
    percentage: number;
  }>;
  topCurrencies: Array<{
    currency: Currency;
    volume: number;
    count: number;
    percentage: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    volume: number;
    count: number;
    successRate: number;
  }>;
}

// Configuration
export interface MerchantConfig {
  merchantId: string;
  businessName: string;
  businessType: string;
  country: string;
  currency: Currency;
  enabledPaymentMethods: PaymentMethod[];
  webhookUrl?: string;
  instantSettlement: boolean;
  autoGenerateReceipts: boolean;
  fraudDetectionLevel: 'low' | 'medium' | 'high';
  riskTolerance: number;
  metadata?: Record<string, any>;
}
