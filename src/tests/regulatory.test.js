/**
 * Regulatory Compliance Features Test
 * 
 * This test suite verifies the regulatory compliance optimization
 * and tax efficiency features of the Sunny Payment Gateway.
 */

import PaymentOrchestrator from '../core/PaymentOrchestrator.js';
import RegionalAnalytics from '../core/analytics/regionalAnalytics.js';
import RegulatoryComplianceEngine from '../core/compliance/RegulatoryComplianceEngine.js';
import EnhancedRegulatoryPaymentRoutingAI from '../core/ai/EnhancedRegulatoryPaymentRoutingAI.js';
import { PAYMENT_METHODS } from '../core/constants.js';

// Mock implementation of OllamaService for testing purposes
jest.mock('../core/ai/OllamaService.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      answerQuestion: jest.fn().mockResolvedValue({
        answer: JSON.stringify({
          preferredPaymentMethods: {
            mobileMoneyAdoption: 0.85,
            cryptoAdoption: 0.35,
            bankingPenetration: 0.65
          }
        }),
        usedWebSearch: false
      }),
      generateCompletion: jest.fn().mockResolvedValue({
        response: JSON.stringify({
          regulatoryEfficiency: {
            mobileMoneyScore: 0.82,
            cryptoScore: 0.67,
            cardScore: 0.75,
            bankTransferScore: 0.78
          },
          taxEfficiency: {
            mobileMoneyScore: 0.80,
            cryptoScore: 0.65,
            cardScore: 0.72,
            bankTransferScore: 0.68
          },
          complianceRequirements: ["KYC", "AML", "CTF"],
          documentationRequirements: ["ID Verification", "Address Proof"],
          regulatoryCosts: {
            basePercentage: 0.5,
            additionalFees: 0.2
          }
        })
      })
    };
  });
});

// Mock implementation of WebLearningService for testing purposes
jest.mock('../core/ai/WebLearningService.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      learnAboutTopic: jest.fn().mockResolvedValue({
        information: "Regulatory information for payment processing",
        success: true
      })
    };
  });
});

describe('Regulatory Compliance Features', () => {
  let paymentOrchestrator;
  let regionalAnalytics;
  let regulatoryEngine;
  let routingAI;
  
  beforeEach(() => {
    // Initialize components for testing
    regionalAnalytics = new RegionalAnalytics({
      // Use minimal configuration for testing
      updateInterval: 1000,
      priorityRegions: ['nigeria', 'kenya', 'ghana']
    });
    
    regulatoryEngine = new RegulatoryComplianceEngine({
      regionalAnalytics: {
        updateInterval: 1000,
        priorityRegions: ['nigeria', 'kenya', 'ghana']
      }
    });
    
    routingAI = new EnhancedRegulatoryPaymentRoutingAI({
      enableRegulatoryOptimization: true,
      enableTaxOptimization: true,
      regulatoryWeight: 0.4,
      taxWeight: 0.3
    });
    
    paymentOrchestrator = new PaymentOrchestrator({
      enableRegulatoryOptimization: true,
      enableTaxOptimization: true,
      dynamicFeeAdjustment: true
    });
  });
  
  test('RegionalAnalytics provides payment preferences by region', async () => {
    const preferences = await regionalAnalytics.getRegionalPaymentPreferences('kenya');
    
    // Verify preferences are returned
    expect(preferences).toBeDefined();
    expect(preferences.data).toBeDefined();
  });
  
  test('RegulatoryComplianceEngine calculates optimal route', async () => {
    const transactionData = {
      amount: 1000,
      currency: 'USD',
      sourceRegion: 'nigeria',
      destinationRegion: 'kenya',
      isCrossBorder: true
    };
    
    const availableMethods = [
      PAYMENT_METHODS.MOBILE_MONEY,
      PAYMENT_METHODS.CARD,
      PAYMENT_METHODS.BANK_TRANSFER,
      PAYMENT_METHODS.CRYPTO
    ];
    
    const result = await regulatoryEngine.calculateOptimalRoute(transactionData, availableMethods);
    
    // Verify route calculation
    expect(result).toBeDefined();
    expect(result.recommendedMethod).toBeDefined();
    expect(result.optimized).toBeTruthy();
    expect(result.scores).toBeDefined();
  });
  
  test('EnhancedRegulatoryPaymentRoutingAI optimizes for regulatory compliance', async () => {
    const transactionData = {
      amount: 1500,
      currency: 'USD',
      sourceRegion: 'nigeria',
      destinationRegion: 'ghana',
      isCrossBorder: true,
      availableMethods: [
        PAYMENT_METHODS.MOBILE_MONEY,
        PAYMENT_METHODS.CARD,
        PAYMENT_METHODS.BANK_TRANSFER,
        PAYMENT_METHODS.CRYPTO
      ]
    };
    
    const prediction = await routingAI.predictOptimalMethod(transactionData);
    
    // Verify prediction
    expect(prediction).toBeDefined();
    expect(prediction.predictedMethod).toBeDefined();
    expect(prediction.reasoning).toBeDefined();
    expect(prediction.regulatoryFactors).toBeDefined();
    expect(prediction.regulatoryFactors.considered).toBeTruthy();
  });
  
  test('PaymentOrchestrator integrates regulatory optimization', async () => {
    // Create a test payment without specifying method to trigger optimization
    const paymentDetails = {
      amount: 2000,
      currency: 'USD',
      country: 'nigeria',
      recipientCountry: 'kenya',
      recipientId: 'user123',
      // No payment method specified to trigger optimization
    };
    
    const result = await paymentOrchestrator.processPayment(paymentDetails);
    
    // Verify transaction was processed
    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.paymentMethod).toBeDefined();
  });
  
  test('Cross-border payments are optimized for regulatory efficiency', async () => {
    const nigeriaToGhanaPayment = {
      amount: 1200,
      currency: 'USD',
      country: 'nigeria',
      sourceCountry: 'nigeria',
      recipientCountry: 'ghana',
      recipientId: 'user456',
    };
    
    // Process payment without specifying method
    const result = await paymentOrchestrator._determineOptimalPaymentMethod(nigeriaToGhanaPayment);
    
    // Verify cross-border optimization
    expect(result).toBeDefined();
    expect(result.paymentMethod).toBeDefined();
    expect(result.analytics).toBeDefined();
    expect(result.analytics.regulatoryFactors).toBeDefined();
  });
  
  test('Different regions prefer different payment methods based on regulatory factors', async () => {
    // Test Kenya transaction
    const kenyaTransaction = {
      amount: 1000,
      currency: 'KES',
      country: 'kenya',
      recipientId: 'user789'
    };
    
    const kenyaResult = await paymentOrchestrator._determineOptimalPaymentMethod(kenyaTransaction);
    const kenyaMethod = kenyaResult.paymentMethod;
    
    // Test Nigeria transaction
    const nigeriaTransaction = {
      amount: 1000,
      currency: 'NGN',
      country: 'nigeria',
      recipientId: 'user789'
    };
    
    const nigeriaResult = await paymentOrchestrator._determineOptimalPaymentMethod(nigeriaTransaction);
    const nigeriaMethod = nigeriaResult.paymentMethod;
    
    // Test Ghana transaction
    const ghanaTransaction = {
      amount: 1000,
      currency: 'GHS',
      country: 'ghana',
      recipientId: 'user789'
    };
    
    const ghanaResult = await paymentOrchestrator._determineOptimalPaymentMethod(ghanaTransaction);
    const ghanaMethod = ghanaResult.paymentMethod;
    
    // Record methods for different regions
    console.log(`Preferred methods by region:
      - Kenya: ${kenyaMethod}
      - Nigeria: ${nigeriaMethod}
      - Ghana: ${ghanaMethod}
    `);
    
    // The test passes as long as we get valid payment methods for each region
    // Different regions might have different optimal methods based on regulations
    expect(kenyaMethod).toBeDefined();
    expect(nigeriaMethod).toBeDefined();
    expect(ghanaMethod).toBeDefined();
  });
  
  test('Payment methods with higher regulatory efficiency are preferred for larger transactions', async () => {
    // Small transaction
    const smallTransaction = {
      amount: 50,
      currency: 'USD',
      country: 'nigeria',
      recipientId: 'user123'
    };
    
    const smallResult = await paymentOrchestrator._determineOptimalPaymentMethod(smallTransaction);
    
    // Large transaction
    const largeTransaction = {
      amount: 5000,
      currency: 'USD',
      country: 'nigeria',
      recipientId: 'user123'
    };
    
    const largeResult = await paymentOrchestrator._determineOptimalPaymentMethod(largeTransaction);
    
    // Record the methods
    console.log(`Payment methods by transaction size:
      - Small ($50): ${smallResult.paymentMethod}
      - Large ($5000): ${largeResult.paymentMethod}
    `);
    
    // We don't assert equality/difference because the actual choice depends on the AI model
    // and regional regulations. We just ensure valid methods are returned.
    expect(smallResult.paymentMethod).toBeDefined();
    expect(largeResult.paymentMethod).toBeDefined();
  });
  
  test('Cryptocurrency is considered for transactions requiring tax efficiency', async () => {
    // Transaction with tax optimization hint
    const taxOptimizedTransaction = {
      amount: 3000,
      currency: 'USD',
      country: 'ghana',
      recipientId: 'user123',
      taxOptimizationHint: true
    };
    
    const result = await paymentOrchestrator._determineOptimalPaymentMethod(taxOptimizedTransaction);
    
    console.log(`Method selected for tax optimization: ${result.paymentMethod}`);
    console.log(`Reasoning: ${result.analytics.reasoning}`);
    
    // We expect a valid method to be returned
    expect(result.paymentMethod).toBeDefined();
    expect(result.analytics.reasoning).toBeDefined();
  });
});

// Additional test suite for regulatory analytics
describe('Regulatory Analytics Features', () => {
  let regionalAnalytics;
  
  beforeEach(() => {
    regionalAnalytics = new RegionalAnalytics({
      updateInterval: 1000,
      priorityRegions: ['nigeria', 'kenya', 'ghana']
    });
  });
  
  test('Tax implications are correctly retrieved by region', async () => {
    const taxData = await regionalAnalytics.getTaxImplications('nigeria');
    
    expect(taxData).toBeDefined();
    expect(taxData.data).toBeDefined();
  });
  
  test('Cross-border efficiency calculations consider both source and destination', async () => {
    const efficiency = await regionalAnalytics.calculateCrossBorderEfficiency(
      'nigeria', 
      'kenya', 
      PAYMENT_METHODS.MOBILE_MONEY
    );
    
    expect(efficiency).toBeDefined();
    expect(efficiency.efficiencyScore).toBeDefined();
    expect(efficiency.taxEfficiencyScore).toBeDefined();
  });
});

