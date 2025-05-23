/**
 * Sunny Payment Gateway - Payment Processors Integration Tests
 * 
 * Tests all payment processors with real or simulated transactions:
 * - Stripe (Credit/Debit Cards)
 * - PayPal
 * - M-Pesa (Mobile Money)
 * - Cryptocurrency
 * - Bank Transfer
 * - QR Code Payments
 */

import SunnyPaymentGateway from '../../core/SunnyPaymentGateway.js';
import StripeProcessor from '../../integrations/stripe/StripeProcessor.js';
import PayPalProcessor from '../../integrations/paypal/PayPalProcessor.js';
import MPesaProcessor from '../../integrations/mpesa/MPesaProcessor.js';
import CryptoProcessor from '../../integrations/crypto/CryptoProcessor.js';
import BankTransferProcessor from '../../integrations/bank/BankTransferProcessor.js';
import QRCodePaymentProcessor from '../../integrations/qrcode/QRCodePaymentProcessor.js';
import { v4 as uuidv4 } from 'uuid';

// Test data
import testCards from '../test-data/test-cards.js';
import testBankAccounts from '../test-data/test-bank-accounts.js';
import testCryptoAddresses from '../test-data/test-crypto-addresses.js';
import testPhoneNumbers from '../test-data/test-phone-numbers.js';

/**
 * Run payment processor tests
 * 
 * @param {Object} config - Test configuration
 * @returns {Promise<Object>} - Test results
 */
export async function runPaymentProcessorTests(config) {
  console.log('🔄 Running Payment Processor Tests...');
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    errors: []
  };
  
  // Initialize gateway for testing
  const gateway = new SunnyPaymentGateway({
    environment: config.environment,
    merchantId: 'test-merchant-id',
    apiKey: 'test-api-key',
    apiSecret: 'test-api-secret'
  });
  
  // Run individual processor tests
  await testStripeProcessor(gateway, config, results);
  await testPayPalProcessor(gateway, config, results);
  await testMPesaProcessor(gateway, config, results);
  await testCryptoProcessor(gateway, config, results);
  await testBankTransferProcessor(gateway, config, results);
  await testQRCodeProcessor(gateway, config, results);
  
  console.log(`✅ Payment Processor Tests: ${results.passed}/${results.total} passed`);
  
  return results;
}

/**
 * Test Stripe (card) processor
 * 
 * @param {Object} gateway - Payment gateway
 * @param {Object} config - Test configuration
 * @param {Object} results - Test results
 */
async function testStripeProcessor(gateway, config, results) {
  console.log('Testing Stripe Processor...');
  
  // Skip real charges if not explicitly enabled
  if (!config.useRealProcessors) {
    const testCard = testCards.visa.success;
    
    // Test with mocked successful card payment
    try {
      results.total++;
      
      const paymentData = {
        amount: 10.00,
        currency: 'USD',
        paymentMethod: 'card',
        transactionId: `test-${uuidv4()}`,
        card: {
          number: testCard.number,
          expMonth: testCard.expMonth,
          expYear: testCard.expYear,
          cvv: testCard.cvv
        },
        customer: {
          name: 'Test Customer',
          email: 'test@example.com'
        },
        billingAddress: {
          country: 'US'
        },
        metadata: {
          test: true
        }
      };
      
      // Process payment with mocked Stripe processor
      const mockStripeProcessor = new StripeProcessor({
        secretKey: 'sk_test_mock',
        mockMode: true
      });
      
      const result = await mockStripeProcessor.processCardPayment(paymentData);
      
      if (result.success) {
        console.log('✅ Stripe mock payment successful');
        results.passed++;
      } else {
        console.error('❌ Stripe mock payment failed:', result.message);
        results.failed++;
        results.errors.push({
          name: 'StripeProcessorTest',
          message: `Mock payment failed: ${result.message}`
        });
      }
    } catch (error) {
      console.error('❌ Stripe test error:', error);
      results.failed++;
      results.errors.push({
        name: 'StripeProcessorTest',
        message: error.message,
        stack: error.stack
      });
    }
    
    console.log('Skipping real Stripe charges (useRealProcessors=false)');
    results.skipped += 2; // Skip success and failure tests
    results.total += 2;
    return;
  }
  
  // Test with real successful card payment
  const successCard = testCards.visa.success;
  try {
    results.total++;
    
    const paymentData = {
      amount: 1.00, // Minimal amount for testing
      currency: 'USD',
      paymentMethod: 'card',
      transactionId: `test-${uuidv4()}`,
      card: {
        number: successCard.number,
        expMonth: successCard.expMonth,
        expYear: successCard.expYear,
        cvv: successCard.cvv
      },
      customer: {
        name: 'Test Customer',
        email: 'test@example.com'
      },
      metadata: {
        test: true
      }
    };
    
    const result = await gateway.processPayment(paymentData);
    
    if (result.success) {
      console.log('✅ Stripe real payment successful');
      results.passed++;
    } else {
      console.error('❌ Stripe real payment failed:', result.message);
      results.failed++;
      results.errors.push({
        name: 'StripeProcessorTest',
        message: `Real payment failed: ${result.message}`
      });
    }
  } catch (error) {
    console.error('❌ Stripe real payment error:', error);
    results.failed++;
    results.errors.push({
      name: 'StripeProcessorTest',
      message: error.message,
      stack: error.stack
    });
  }
  
  // Test with failing card
  const failCard = testCards.visa.fail;
  try {
    results.total++;
    
    const paymentData = {
      amount: 1.00,
      currency: 'USD',
      paymentMethod: 'card',
      transactionId: `test-${uuidv4()}`,
      card: {
        number: failCard.number,
        expMonth: failCard.expMonth,
        expYear: failCard.expYear,
        cvv: failCard.cvv
      },
      customer: {
        name: 'Test Customer',
        email: 'test@example.com'
      },
      metadata: {
        test: true
      }
    };
    
    const result = await gateway.processPayment(paymentData);
    
    if (!result.success) {
      console.log('✅ Stripe failure test passed (payment correctly failed)');
      results.passed++;
    } else {
      console.error('❌ Stripe failure test failed (payment unexpectedly succeeded)');
      results.failed++;
      results.errors.push({
        name: 'StripeProcessorTest',
        message: 'Failure test failed: payment succeeded when it should have failed'
      });
    }
  } catch (error) {
    // In this case, an error might be expected
    console.log('✅ Stripe failure test passed (expected error)');
    results.passed++;
  }
}

/**
 * Test PayPal processor
 * 
 * @param {Object} gateway - Payment gateway
 * @param {Object} config - Test configuration
 * @param {Object} results - Test results
 */
async function testPayPalProcessor(gateway, config, results) {
  console.log('Testing PayPal Processor...');
  
  // Skip real PayPal transactions if not explicitly enabled
  if (!config.useRealProcessors) {
    // Test with mocked PayPal payment
    try {
      results.total++;
      
      const paymentData = {
        amount: 15.00,
        currency: 'USD',
        paymentMethod: 'paypal',
        transactionId: `test-${uuidv4()}`,
        returnUrl: 'https://sunnypayments.com/return',
        cancelUrl: 'https://sunnypayments.com/cancel',
        customer: {
          name: 'Test Customer',
          email: 'test@example.com'
        },
        metadata: {
          test: true
        }
      };
      
      // Process payment with mocked PayPal processor
      const mockPayPalProcessor = new PayPalProcessor({
        clientId: 'test_client_id',
        clientSecret: 'test_client_secret',
        mockMode

