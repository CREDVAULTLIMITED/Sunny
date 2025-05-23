/**
 * Sunny Payment Gateway - AI Learning Integration Tests
 * 
 * These tests verify the AI learning capabilities including:
 * - Real-time learning from transactions across payment methods
 * - Web learning functionality
 * - Market data integration
 * - Customer behavior analysis
 * - Payment routing optimization
 */

import { jest } from '@jest/globals';
import SunnyAssistant from '../../core/ai/SunnyAssistant';
import OllamaService from '../../core/ai/OllamaService';
import WebLearningService from '../../core/ai/WebLearningService';
import EnhancedPaymentRoutingAI from '../../core/ai/EnhancedPaymentRoutingAI';

// Mock dependencies to avoid actual API calls
jest.mock('../../core/ai/OllamaService');
jest.mock('../../core/ai/WebLearningService');
jest.mock('../../core/ai/EnhancedPaymentRoutingAI');

// Sample test data
const testCustomer = {
  id: 'cust-123',
  name: 'Test Customer',
  email: 'test@example.com',
  country: 'US',
  transactions: [
    {
      amount: 100.00,
      currency: 'USD',
      method: 'card',
      success: true,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      amount: 25.50,
      currency: 'USD',
      method: 'mobile_money',
      success: true,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      amount: 75.00,
      currency: 'USD',
      method: 'card',
      success: false,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      amount: 50.00,
      currency: 'USD',
      method: 'crypto',
      success: true,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

// Sample card transaction test data
const cardTransactionData = {
  id: 'tx-card-123',
  amount: 150.00,
  currency: 'USD',
  country: 'US',
  paymentMethod: 'card',
  cardNetwork: 'visa',
  customer: { id: testCustomer.id, country: 'US' },
  billingAddress: {
    country: 'US',
    zipCode: '12345'
  },
  ipCountry: 'US'
};

// Sample mobile money transaction test data
const mobileMoneyTransactionData = {
  id: 'tx-mm-456',
  amount: 75.00,
  currency: 'KES',
  country: 'KE',
  paymentMethod: 'mobile_money',
  provider: 'mpesa',
  phoneNumber: '+254712345678',
  customer: { id: testCustomer.id, country: 'KE' },
  ipCountry: 'KE'
};

// Sample crypto transaction test data
const cryptoTransactionData = {
  id: 'tx-crypto-789',
  amount: 200.00,
  currency: 'USD',
  cryptoCurrency: 'BTC',
  paymentMethod: 'crypto',
  network: 'bitcoin',
  address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  customer: { id: testCustomer.id, country: 'US' },
  ipCountry: 'US'
};

// Sample bank transfer transaction test data
const bankTransferTransactionData = {
  id: 'tx-bank-321',
  amount: 500.00,
  currency: 'EUR',
  country: 'DE',
  paymentMethod: 'bank_transfer',
  accountDetails: {
    iban: 'DE89370400440532013000'
  },
  customer: { id: testCustomer.id, country: 'DE' },
  ipCountry: 'DE'
};

// Sample successful transaction result
const successfulResult = {
  success: true,
  paymentMethod: 'card',
  processingTime: 1250, // in ms
  fee: 3.75,
  transactionId: 'tx-success-123'
};

// Sample failed transaction result
const failedResult = {
  success: false,
  paymentMethod: 'card',
  processingTime: 3500, // in ms
  error: 'insufficient_funds',
  transactionId: 'tx-failed-456'
};

describe('AI Learning Integration Tests', () => {
  let sunnyAssistant;
  
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create a fresh SunnyAssistant instance for each test
    sunnyAssistant = new SunnyAssistant({
      modelName: 'test-model',
      apiUrl: 'http://test-api-url',
      webEnabled: true,
      realTimeLearning: true
    });
    
    // Setup common mock behavior
    OllamaService.mockImplementation(() => ({
      answerQuestion: jest.fn().mockResolvedValue({
        answer: 'Test answer',
        usedWebSearch: true,
        sources: ['Test source']
      }),
      generateCompletion: jest.fn().mockResolvedValue({
        response: 'Test completion response'
      })
    }));
    
    WebLearningService.mockImplementation(() => ({
      learnAboutTopic: jest.fn().mockResolvedValue({
        success: true,
        information: 'Test information about the topic',
        sources: ['Test source']
      }),
      analyzeCustomerBehavior: jest.fn().mockResolvedValue({
        insights: {
          recommendedMethods: ['card', 'mobile_money'],
          analysis: 'Customer prefers card payments for larger amounts'
        },
        patterns: {
          spending: 'moderate',
          frequency: 'weekly'
        }
      }),
      trackPaymentTrends: jest.fn().mockResolvedValue({
        success: true,
        trends: {
          fastestGrowing: 'crypto',
          mostReliable: 'card'
        }
      }),
      runScheduledLearning: jest.fn().mockResolvedValue({
        success: true,
        learningResults: {
          topics: ['payment security', 'fraud trends', 'market changes']
        }
      })
    }));
    
    EnhancedPaymentRoutingAI.mockImplementation(() => ({
      predictOptimalMethod: jest.fn().mockResolvedValue({
        predictedMethod: 'card',
        confidence: 0.85,
        scores: {
          card: 0.85,
          mobile_money: 0.65,
          crypto: 0.45,
          bank_transfer: 0.35
        },
        reasoning: 'Based on transaction amount and customer location'
      }),
      learnFromTransaction: jest.fn().mockResolvedValue({
        success: true,
        modelUpdated: true
      }),
      loadModel: jest.fn().mockResolvedValue({
        success: true
      })
    }));
  });
  
  // Test real-time learning from transactions
  describe('Real-time transaction learning', () => {
    test('Should learn from successful card transactions', async () => {
      // Arrange
      const transaction = { ...cardTransactionData };
      const result = { ...successfulResult };
      
      // Act
      const learningResult = await sunnyAssistant.learnFromTransaction(transaction, result);
      
      // Assert
      expect(learningResult.success).toBe(true);
      expect(sunnyAssistant.paymentRoutingAI.learnFromTransaction).toHaveBeenCalledWith(
        transaction,
        result.paymentMethod,
        result.success,
        {
          cost: result.fee,
          processingTime: result.processingTime
        }
      );
      
      // Verify customer profile was updated
      expect(sunnyAssistant.customerInsights.profiles[testCustomer.id]).toBeDefined();
      expect(sunnyAssistant.customerInsights.profiles[testCustomer.id].transactions).toContainEqual(
        expect.objectContaining({
          amount: transaction.amount,
          currency: transaction.currency,
          method: result.paymentMethod,
          success: result.success
        })
      );
      
      // Verify payment optimization data was updated
      expect(sunnyAssistant.paymentOptimization.successRates[result.paymentMethod]).toBeDefined();
      expect(sunnyAssistant.paymentOptimization.successRates[result.paymentMethod].successes).toBeGreaterThan(0);
    });
    
    test('Should learn from failed card transactions', async () => {
      // Arrange
      const transaction = { ...cardTransactionData };
      const result = { ...failedResult };
      
      // Act
      const learningResult = await sunnyAssistant.learnFromTransaction(transaction, result);
      
      // Assert
      expect(learningResult.success).toBe(true);
      expect(sunnyAssistant.paymentRoutingAI.learnFromTransaction).toHaveBeenCalledWith(
        transaction,
        result.paymentMethod,
        result.success,
        {
          cost: result.fee || 0,
          processingTime: result.processingTime
        }
      );
      
      // Verify success rate calculation
      expect(sunnyAssistant.paymentOptimization.successRates[result.paymentMethod]).toBeDefined();
      expect(sunnyAssistant.paymentOptimization.successRates[result.paymentMethod].successes).toBe(0);
      expect(sunnyAssistant.paymentOptimization.successRates[result.paymentMethod].attempts).toBe(1);
      expect(sunnyAssistant.paymentOptimization.successRates[result.paymentMethod].rate).toBe(0);
    });
    
    test('Should learn from mobile money transactions', async () => {
      // Arrange
      const transaction = { ...mobileMoneyTransactionData };
      const result = { 
        success: true,
        paymentMethod: 'mobile_money',
        processingTime: 2350,
        fee: 1.50,
        transactionId: 'tx-mpesa-123'
      };
      
      // Act
      const learningResult = await sunnyAssistant.learnFromTransaction(transaction, result);
      
      // Assert
      expect(learningResult.success).toBe(true);
      expect(sunnyAssistant.paymentRoutingAI.learnFromTransaction).toHaveBeenCalledWith(
        transaction,
        'mobile_money',
        true,
        expect.any(Object)
      );
      
      // Verify payment optimization data includes mobile money
      expect(sunnyAssistant.paymentOptimization.successRates['mobile_money']).toBeDefined();
      expect(sunnyAssistant.paymentOptimization.successRates['mobile_money'].successes).toBe(1);
    });
    
    test('Should learn from cryptocurrency transactions', async () => {
      // Arrange
      const transaction = { ...cryptoTransactionData };
      const result = { 
        success: true,
        paymentMethod: 'crypto',
        processingTime: 8750, // Longer processing time for crypto
        fee: 2.25,
        transactionId: 'tx-crypto-123'
      };
      
      // Act
      const learningResult = await sunnyAssistant.learnFromTransaction(transaction, result);
      
      // Assert
      expect(learningResult.success).toBe(true);
      expect(sunnyAssistant.paymentRoutingAI.learnFromTransaction).toHaveBeenCalledWith(
        transaction,
        'crypto',
        true,
        expect.any(Object)
      );
      
      // Verify payment optimization data includes crypto
      expect(sunnyAssistant.paymentOptimization.successRates['crypto']).toBeDefined();
    });
    
    test('Should learn from bank transfer transactions', async () => {
      // Arrange
      const transaction = { ...bankTransferTransactionData };
      const result = { 
        success: true,
        paymentMethod: 'bank_transfer',
        processingTime: 15000, // Longer processing time for bank transfers
        fee: 1.00,
        transactionId: 'tx-bank-123'
      };
      
      // Act
      const learningResult = await sunnyAssistant.learnFromTransaction(transaction, result);
      
      // Assert
      expect(learningResult.success).toBe(true);
      expect(sunnyAssistant.paymentRoutingAI.learnFromTransaction).toHaveBeenCalledWith(
        transaction,
        'bank_transfer',
        true,
        expect.any(Object)
      );
      
      // Verify payment optimization data includes bank transfer
      expect(sunnyAssistant.paymentOptimization.successRates['bank_transfer']).toBeDefined();
    });
    
    test('Should track performance metrics across multiple payment methods', async () => {
      // Process multiple transactions of different types
      await sunnyAssistant.learnFromTransaction(cardTransactionData, successfulResult);
      await sunnyAssistant.learnFromTransaction(mobileMoneyTransactionData, { 
        success: true, 
        paymentMethod: 'mobile_money',
        processingTime: 2350,
        fee: 1.50
      });
      await sunnyAssistant.learnFromTransaction(cryptoTransactionData, { 
        success: true,
        paymentMethod: 'crypto',
        processingTime: 8750,
        fee: 2.25
      });
      
      // Verify success rates are calculated
      expect(Object.keys(sunnyAssistant.paymentOptimization.successRates).length).toBe(3);
      
      // Verify cost efficiency is tracked
      expect(Object.keys(sunnyAssistant.paymentOptimization.costEfficiency).length).toBe(3);
      expect(sunnyAssistant.paymentOptimization.costEfficiency['card']).toBeDefined();
      expect(sunnyAssistant.paymentOptimization.costEfficiency['mobile_money']).toBeDefined();
      expect(sunnyAssistant.paymentOptimization.costEfficiency['crypto']).toBeDefined();
    });
  });
  
  // Test web learning capabilities
  describe('Web learning integration', () => {
    test('Should fetch and learn from web sources', async () => {
      // Act
      const threatInfo = await sunnyAssistant._updateSec

