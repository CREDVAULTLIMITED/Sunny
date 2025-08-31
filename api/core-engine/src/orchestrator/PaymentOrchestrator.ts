/**
 * Payment Orchestrator - Core payment processing logic
 */

import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import Decimal from 'decimal.js';

import { logger } from '../utils/logger';
import { ProcessorRegistry } from '../processors/ProcessorRegistry';
import { SecurityManager } from '../security/SecurityManager';
import { SettlementEngine } from '../settlement/SettlementEngine';
import { FraudDetectionService } from '../services/FraudDetectionService';
import { PaymentRepository } from '../repositories/PaymentRepository';
import { 
  PaymentRequest, 
  PaymentResponse, 
  PaymentStatus, 
  ProcessorType,
  RoutingDecision 
} from '../types/payment.types';

@Service()
export class PaymentOrchestrator {
  constructor(
    private processorRegistry: ProcessorRegistry,
    private securityManager: SecurityManager,
    private settlementEngine: SettlementEngine,
    private fraudDetection: FraudDetectionService,
    private paymentRepository: PaymentRepository
  ) {}

  /**
   * Process a payment request with full orchestration
   */
  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    logger.info('🔄 Starting payment processing', {
      correlationId,
      amount: request.amount,
      currency: request.currency,
      paymentMethod: request.paymentMethod,
      merchantId: request.merchantId
    });

    try {
      // 1. Validate and sanitize request
      const validatedRequest = await this.validateRequest(request, correlationId);

      // 2. Perform fraud detection
      const fraudResult = await this.fraudDetection.analyzeTransaction(validatedRequest);
      if (fraudResult.isBlocked) {
        return this.createFailureResponse(
          correlationId,
          'FRAUD_DETECTED',
          `Transaction blocked: ${fraudResult.reason}`,
          validatedRequest
        );
      }

      // 3. Determine optimal routing
      const routingDecision = await this.determineRouting(validatedRequest, fraudResult);

      // 4. Execute payment processing
      const processingResult = await this.executePayment(validatedRequest, routingDecision, correlationId);

      // 5. Handle post-processing
      await this.handlePostProcessing(processingResult, validatedRequest, correlationId);

      // 6. Return response
      const processingTime = Date.now() - startTime;
      logger.info('✅ Payment processing completed', {
        correlationId,
        transactionId: processingResult.transactionId,
        status: processingResult.status,
        processingTime: `${processingTime}ms`
      });

      return processingResult;

    } catch (error) {
      const processingTime = Date.now() - startTime;
      logger.error('❌ Payment processing failed', {
        correlationId,
        error: error.message,
        processingTime: `${processingTime}ms`
      });

      return this.createFailureResponse(
        correlationId,
        'PROCESSING_ERROR',
        error.message,
        request
      );
    }
  }

  /**
   * Validate and sanitize payment request
   */
  private async validateRequest(request: PaymentRequest, correlationId: string): Promise<PaymentRequest> {
    // Validate amount
    const amount = new Decimal(request.amount);
    if (amount.lte(0)) {
      throw new Error('Amount must be greater than zero');
    }

    if (amount.gt(1000000)) { // $10,000 limit for single transaction
      throw new Error('Amount exceeds maximum transaction limit');
    }

    // Validate currency
    if (!this.isValidCurrency(request.currency)) {
      throw new Error(`Unsupported currency: ${request.currency}`);
    }

    // Validate payment method
    if (!this.isValidPaymentMethod(request.paymentMethod)) {
      throw new Error(`Unsupported payment method: ${request.paymentMethod}`);
    }

    // Sanitize customer data
    const sanitizedCustomer = await this.securityManager.sanitizeCustomerData(request.customer);

    // Encrypt sensitive data
    const encryptedPaymentMethod = await this.securityManager.encryptPaymentMethodData(
      request.paymentMethodData
    );

    return {
      ...request,
      amount: amount.toNumber(),
      customer: sanitizedCustomer,
      paymentMethodData: encryptedPaymentMethod,
      metadata: {
        ...request.metadata,
        correlationId,
        validatedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Determine optimal payment routing
   */
  private async determineRouting(
    request: PaymentRequest, 
    fraudResult: any
  ): Promise<RoutingDecision> {
    const availableProcessors = this.processorRegistry.getProcessorsForMethod(request.paymentMethod);
    
    if (availableProcessors.length === 0) {
      throw new Error(`No processors available for payment method: ${request.paymentMethod}`);
    }

    // AI-powered routing logic
    const routingFactors = {
      amount: request.amount,
      currency: request.currency,
      paymentMethod: request.paymentMethod,
      merchantId: request.merchantId,
      customerLocation: request.customer.country,
      fraudScore: fraudResult.riskScore,
      timeOfDay: new Date().getHours(),
      processorPerformance: await this.getProcessorPerformanceMetrics(),
      costOptimization: request.metadata?.optimizeForCost || false
    };

    // Select primary processor
    const primaryProcessor = await this.selectOptimalProcessor(availableProcessors, routingFactors);
    
    // Select backup processor
    const backupProcessors = availableProcessors.filter(p => p.type !== primaryProcessor.type);
    const backupProcessor = backupProcessors.length > 0 ? backupProcessors[0] : null;

    return {
      primaryProcessor: primaryProcessor.type,
      backupProcessor: backupProcessor?.type || null,
      routingReason: this.generateRoutingReason(routingFactors, primaryProcessor),
      estimatedProcessingTime: primaryProcessor.avgProcessingTime,
      estimatedFees: await this.calculateProcessorFees(primaryProcessor, request.amount, request.currency)
    };
  }

  /**
   * Execute payment with selected processor
   */
  private async executePayment(
    request: PaymentRequest,
    routing: RoutingDecision,
    correlationId: string
  ): Promise<PaymentResponse> {
    const transactionId = uuidv4();
    
    // Save initial payment record
    await this.paymentRepository.create({
      transactionId,
      merchantId: request.merchantId,
      amount: request.amount,
      currency: request.currency,
      paymentMethod: request.paymentMethod,
      status: PaymentStatus.PROCESSING,
      processorType: routing.primaryProcessor,
      correlationId,
      createdAt: new Date()
    });

    try {
      // Get primary processor
      const processor = this.processorRegistry.getProcessor(routing.primaryProcessor);
      
      // Process payment
      const processorResult = await processor.processPayment({
        ...request,
        transactionId,
        correlationId
      });

      // Update payment record
      await this.paymentRepository.update(transactionId, {
        status: processorResult.success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED,
        processorResponse: processorResult,
        completedAt: new Date()
      });

      if (processorResult.success) {
        return {
          success: true,
          transactionId,
          status: PaymentStatus.COMPLETED,
          amount: request.amount,
          currency: request.currency,
          paymentMethod: request.paymentMethod,
          processorType: routing.primaryProcessor,
          processorResponse: processorResult,
          fees: routing.estimatedFees,
          settlementInfo: await this.initiateSettlement(request, transactionId),
          timestamp: new Date().toISOString()
        };
      } else {
        // Try backup processor if available
        if (routing.backupProcessor) {
          logger.warn('Primary processor failed, trying backup', {
            correlationId,
            primaryProcessor: routing.primaryProcessor,
            backupProcessor: routing.backupProcessor
          });

          return await this.tryBackupProcessor(request, routing, transactionId, correlationId);
        }

        throw new Error(processorResult.errorMessage || 'Payment processing failed');
      }

    } catch (error) {
      // Update payment record with error
      await this.paymentRepository.update(transactionId, {
        status: PaymentStatus.FAILED,
        errorMessage: error.message,
        failedAt: new Date()
      });

      throw error;
    }
  }

  /**
   * Try backup processor
   */
  private async tryBackupProcessor(
    request: PaymentRequest,
    routing: RoutingDecision,
    transactionId: string,
    correlationId: string
  ): Promise<PaymentResponse> {
    try {
      const backupProcessor = this.processorRegistry.getProcessor(routing.backupProcessor!);
      
      const processorResult = await backupProcessor.processPayment({
        ...request,
        transactionId,
        correlationId
      });

      await this.paymentRepository.update(transactionId, {
        status: processorResult.success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED,
        processorType: routing.backupProcessor!,
        processorResponse: processorResult,
        completedAt: new Date()
      });

      if (processorResult.success) {
        return {
          success: true,
          transactionId,
          status: PaymentStatus.COMPLETED,
          amount: request.amount,
          currency: request.currency,
          paymentMethod: request.paymentMethod,
          processorType: routing.backupProcessor!,
          processorResponse: processorResult,
          fees: routing.estimatedFees,
          settlementInfo: await this.initiateSettlement(request, transactionId),
          timestamp: new Date().toISOString()
        };
      }

      throw new Error(processorResult.errorMessage || 'Backup processor also failed');
    } catch (error) {
      throw new Error(`Both primary and backup processors failed: ${error.message}`);
    }
  }

  /**
   * Handle post-processing tasks
   */
  private async handlePostProcessing(
    result: PaymentResponse,
    request: PaymentRequest,
    correlationId: string
  ): Promise<void> {
    try {
      // Send webhooks
      await this.sendWebhookNotifications(result, request);

      // Update analytics
      await this.updateAnalytics(result, request);

      // Generate receipts if requested
      if (request.generateReceipt) {
        await this.generateReceipt(result, request);
      }

      // Update fraud detection models
      await this.fraudDetection.updateModels(result, request);

    } catch (error) {
      logger.error('Post-processing error (non-critical):', {
        correlationId,
        error: error.message
      });
      // Don't fail the payment for post-processing errors
    }
  }

  /**
   * Initiate settlement process
   */
  private async initiateSettlement(request: PaymentRequest, transactionId: string): Promise<any> {
    if (request.instantSettlement) {
      return await this.settlementEngine.processInstantSettlement({
        transactionId,
        merchantId: request.merchantId,
        amount: request.amount,
        currency: request.currency
      });
    }

    return {
      type: 'scheduled',
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Next day
    };
  }

  /**
   * Helper methods
   */
  private isValidCurrency(currency: string): boolean {
    const supportedCurrencies = ['USD', 'EUR', 'GBP', 'KES', 'TZS', 'UGX', 'RWF'];
    return supportedCurrencies.includes(currency);
  }

  private isValidPaymentMethod(method: string): boolean {
    const supportedMethods = ['card', 'mobile_money', 'bank_transfer', 'crypto', 'digital_wallet'];
    return supportedMethods.includes(method);
  }

  private async selectOptimalProcessor(processors: any[], factors: any): Promise<any> {
    // AI-powered processor selection logic
    // For now, simple selection based on success rate and cost
    return processors.reduce((best, current) => {
      const currentScore = (current.successRate * 0.7) + ((1 - current.costRating) * 0.3);
      const bestScore = (best.successRate * 0.7) + ((1 - best.costRating) * 0.3);
      return currentScore > bestScore ? current : best;
    });
  }

  private async getProcessorPerformanceMetrics(): Promise<any> {
    // Get real-time processor performance data
    return this.processorRegistry.getPerformanceMetrics();
  }

  private async calculateProcessorFees(processor: any, amount: number, currency: string): Promise<any> {
    return processor.calculateFees(amount, currency);
  }

  private generateRoutingReason(factors: any, processor: any): string {
    return `Selected ${processor.type} based on success rate (${processor.successRate}%) and cost optimization`;
  }

  private createFailureResponse(
    correlationId: string,
    errorCode: string,
    message: string,
    request: PaymentRequest
  ): PaymentResponse {
    return {
      success: false,
      transactionId: null,
      status: PaymentStatus.FAILED,
      amount: request.amount,
      currency: request.currency,
      paymentMethod: request.paymentMethod,
      processorType: null,
      error: {
        code: errorCode,
        message
      },
      timestamp: new Date().toISOString()
    };
  }

  private async sendWebhookNotifications(result: PaymentResponse, request: PaymentRequest): Promise<void> {
    // Implementation for webhook notifications
  }

  private async updateAnalytics(result: PaymentResponse, request: PaymentRequest): Promise<void> {
    // Implementation for analytics updates
  }

  private async generateReceipt(result: PaymentResponse, request: PaymentRequest): Promise<void> {
    // Implementation for receipt generation
  }
}
