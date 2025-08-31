/**
 * Sunny Payment Gateway - Core Service
 * TypeScript implementation of the payment processing logic
 */

import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import {
  PaymentData,
  PaymentResult,
  PaymentStatus,
  PaymentMethods,
  ErrorCodes,
  CardData,
  BankTransferData,
  MobileMoneyData,
  ProcessorResponse,
  FeeDetails,
  MarketplacePayment,
  SubscriptionData,
  SubscriptionResult
} from '@/lib/types/payment';

export interface PaymentGatewayConfig {
  merchantId: string;
  apiKey: string;
  apiSecret: string;
  environment: 'sandbox' | 'production';
  instantSettlement?: boolean;
  locale?: string;
  baseUrl?: string;
}

export class SunnyPaymentGateway {
  private config: PaymentGatewayConfig;
  private baseUrl: string;

  constructor(config: PaymentGatewayConfig) {
    this.config = {
      ...config,
      instantSettlement: config.instantSettlement ?? false,
      locale: config.locale ?? 'en-US'
    };

    this.baseUrl = config.baseUrl ?? (
      this.config.environment === 'production'
        ? 'https://api.sunnypayments.com/v2'
        : 'https://sandbox.sunnypayments.com/v2'
    );

    // Validate required configuration
    if (!this.config.merchantId || !this.config.apiKey || !this.config.apiSecret) {
      throw new Error('Missing required Sunny Payment Gateway configuration');
    }
  }

  /**
   * Process a payment transaction
   */
  async processPayment(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      // Validate payment data
      const validationResult = this.validatePaymentData(paymentData);
      if (!validationResult.isValid) {
        return {
          success: false,
          transactionId: '',
          status: PaymentStatus.FAILED,
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentMethod: paymentData.paymentMethod,
          error: ErrorCodes.VALIDATION_ERROR,
          message: validationResult.errors.join(', ')
        };
      }

      // Generate transaction ID
      const transactionId = uuidv4();

      // Check for fraud
      const fraudCheck = await this.detectFraud({
        ...paymentData,
        transactionId,
        merchantId: this.config.merchantId
      });

      if (fraudCheck.isFraudulent) {
        return {
          success: false,
          transactionId,
          status: PaymentStatus.REJECTED,
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentMethod: paymentData.paymentMethod,
          error: ErrorCodes.FRAUD_DETECTED,
          message: 'Transaction flagged as potentially fraudulent'
        };
      }

      // Calculate fees
      const feeDetails = this.calculateFees({
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        country: paymentData.customer?.country ?? 'US'
      });

      // Process payment based on method
      let paymentResult: Partial<PaymentResult>;
      
      switch (paymentData.paymentMethod) {
        case PaymentMethods.CARD:
          paymentResult = await this.processCardPayment(paymentData, transactionId);
          break;
        case PaymentMethods.BANK_TRANSFER:
          paymentResult = await this.processBankTransfer(paymentData, transactionId);
          break;
        case PaymentMethods.MOBILE_MONEY:
          paymentResult = await this.processMobileMoney(paymentData, transactionId);
          break;
        case PaymentMethods.CRYPTO:
          paymentResult = await this.processCryptoPayment(paymentData, transactionId);
          break;
        default:
          paymentResult = {
            success: false,
            error: ErrorCodes.UNSUPPORTED_PAYMENT_METHOD,
            message: 'Unsupported payment method'
          };
      }

      // Process instant settlement if requested
      if (paymentResult.success && paymentData.instantSettlement) {
        const settlementResult = await this.processInstantSettlement({
          transactionId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          merchantId: this.config.merchantId,
          paymentMethod: paymentData.paymentMethod
        });
        
        paymentResult.settlement = settlementResult;
      }

      return {
        success: paymentResult.success ?? false,
        transactionId,
        status: paymentResult.success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED,
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        fees: feeDetails,
        error: paymentResult.error,
        message: paymentResult.message,
        processorResponse: paymentResult.processorResponse,
        settlement: paymentResult.settlement
      };

    } catch (error) {
      console.error('Payment processing error:', error);
      
      return {
        success: false,
        transactionId: '',
        status: PaymentStatus.ERROR,
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        error: ErrorCodes.SYSTEM_ERROR,
        message: 'An unexpected error occurred while processing payment'
      };
    }
  }

  /**
   * Validate payment data
   */
  private validatePaymentData(paymentData: PaymentData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!paymentData.currency || paymentData.currency.length !== 3) {
      errors.push('Valid currency code is required');
    }

    if (!paymentData.paymentMethod) {
      errors.push('Payment method is required');
    }

    if (!paymentData.customer?.name) {
      errors.push('Customer name is required');
    }

    if (!paymentData.customer?.email || !this.isValidEmail(paymentData.customer.email)) {
      errors.push('Valid customer email is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Detect fraud
   */
  private async detectFraud(data: any): Promise<{ isFraudulent: boolean; reason?: string; riskScore?: number }> {
    // Simulate fraud detection
    // In a real implementation, this would use ML models and external services
    
    const riskScore = Math.random() * 100;
    
    // Simple fraud rules
    if (data.amount > 10000) {
      return { isFraudulent: true, reason: 'High amount transaction', riskScore };
    }
    
    if (riskScore > 90) {
      return { isFraudulent: true, reason: 'High risk score', riskScore };
    }

    return { isFraudulent: false, riskScore };
  }

  /**
   * Calculate fees
   */
  private calculateFees(params: {
    amount: number;
    currency: string;
    paymentMethod: string;
    country: string;
  }): FeeDetails {
    const { amount, currency, paymentMethod } = params;
    
    let processingFeeRate = 0.029; // 2.9%
    let fixedFee = 30; // $0.30 in cents
    
    // Adjust rates based on payment method
    switch (paymentMethod) {
      case PaymentMethods.BANK_TRANSFER:
        processingFeeRate = 0.008; // 0.8%
        fixedFee = 0;
        break;
      case PaymentMethods.MOBILE_MONEY:
        processingFeeRate = 0.025; // 2.5%
        fixedFee = 20;
        break;
      case PaymentMethods.CRYPTO:
        processingFeeRate = 0.015; // 1.5%
        fixedFee = 0;
        break;
    }

    const processingFee = Math.round(amount * processingFeeRate) + fixedFee;
    const conversionFee = currency !== 'USD' ? Math.round(amount * 0.01) : 0; // 1% for currency conversion
    const totalFees = processingFee + conversionFee;

    return {
      processingFee,
      conversionFee,
      totalFees,
      currency
    };
  }

  /**
   * Process card payment
   */
  private async processCardPayment(paymentData: PaymentData, transactionId: string): Promise<Partial<PaymentResult>> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real implementation, this would communicate with payment processors
    const authorizationCode = this.generateRandomString(6).toUpperCase();
    const processorTransactionId = `CARD_${this.generateRandomString(8)}`;

    return {
      success: true,
      processorResponse: {
        authorizationCode,
        processorTransactionId,
        processorName: 'SunnyCardProcessor'
      }
    };
  }

  /**
   * Process bank transfer
   */
  private async processBankTransfer(paymentData: PaymentData, transactionId: string): Promise<Partial<PaymentResult>> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const processorTransactionId = `BANK_${this.generateRandomString(8)}`;

    return {
      success: true,
      processorResponse: {
        processorTransactionId,
        processorName: 'SunnyBankProcessor'
      }
    };
  }

  /**
   * Process mobile money payment
   */
  private async processMobileMoney(paymentData: PaymentData, transactionId: string): Promise<Partial<PaymentResult>> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mobileMoneyId = `MM_${this.generateRandomString(8)}`;
    const providerReference = this.generateRandomString(10).toUpperCase();

    return {
      success: true,
      processorResponse: {
        mobileMoneyId,
        providerReference,
        processorTransactionId: mobileMoneyId,
        processorName: 'SunnyMobileProcessor'
      }
    };
  }

  /**
   * Process crypto payment
   */
  private async processCryptoPayment(paymentData: PaymentData, transactionId: string): Promise<Partial<PaymentResult>> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const processorTransactionId = `CRYPTO_${this.generateRandomString(8)}`;

    return {
      success: true,
      processorResponse: {
        processorTransactionId,
        processorName: 'SunnyCryptoProcessor'
      }
    };
  }

  /**
   * Process instant settlement
   */
  private async processInstantSettlement(params: {
    transactionId: string;
    amount: number;
    currency: string;
    merchantId: string;
    paymentMethod: string;
  }) {
    // Simulate settlement processing
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const settlementId = `SETTLE_${this.generateRandomString(8)}`;
    
    return {
      settlementId,
      status: 'completed' as const,
      estimatedArrival: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
      actualArrival: new Date().toISOString()
    };
  }

  /**
   * Create subscription
   */
  async createSubscription(subscriptionData: SubscriptionData): Promise<SubscriptionResult> {
    try {
      const { customerId, planId, paymentMethod, startDate, metadata } = subscriptionData;
      
      if (!customerId || !planId || !paymentMethod) {
        return {
          success: false,
          subscriptionId: '',
          customerId: '',
          planId: '',
          status: 'inactive',
          startDate: '',
          nextBillingDate: '',
          error: 'Customer ID, plan ID, and payment method are required'
        };
      }
      
      const subscriptionId = uuidv4();
      const start = startDate ? new Date(startDate) : new Date();
      const nextBilling = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later
      
      return {
        success: true,
        subscriptionId,
        customerId,
        planId,
        status: 'active',
        startDate: start.toISOString(),
        nextBillingDate: nextBilling.toISOString()
      };
    } catch (error) {
      console.error('Subscription creation error:', error);
      return {
        success: false,
        subscriptionId: '',
        customerId: '',
        planId: '',
        status: 'inactive',
        startDate: '',
        nextBillingDate: '',
        error: 'Failed to create subscription'
      };
    }
  }

  /**
   * Process marketplace payment
   */
  async processMarketplacePayment(paymentData: MarketplacePayment): Promise<PaymentResult> {
    try {
      if (!paymentData.splits || paymentData.splits.length === 0) {
        return {
          success: false,
          transactionId: '',
          status: PaymentStatus.FAILED,
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentMethod: paymentData.paymentMethod,
          error: ErrorCodes.VALIDATION_ERROR,
          message: 'Valid splits array is required for marketplace payments'
        };
      }
      
      // Process the main payment first
      const paymentResult = await this.processPayment({
        ...paymentData,
        metadata: {
          ...paymentData.metadata,
          isMarketplace: true
        }
      });
      
      if (!paymentResult.success) {
        return paymentResult;
      }
      
      // Process the splits (in a real implementation, this would transfer funds)
      const splitResults = paymentData.splits.map(split => ({
        destination: split.destination,
        amount: split.amount,
        currency: split.currency,
        status: 'transferred' as const
      }));
      
      return {
        ...paymentResult,
        metadata: {
          ...paymentResult.metadata,
          splits: splitResults
        }
      };
    } catch (error) {
      console.error('Marketplace payment error:', error);
      return {
        success: false,
        transactionId: '',
        status: PaymentStatus.ERROR,
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        error: ErrorCodes.MARKETPLACE_ERROR,
        message: 'Failed to process marketplace payment'
      };
    }
  }

  /**
   * Utility methods
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private generateRandomString(length: number): string {
    return CryptoJS.lib.WordArray.random(length).toString().substring(0, length);
  }
}

export default SunnyPaymentGateway;
