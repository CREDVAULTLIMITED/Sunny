/**
 * Payment Gateway Integration Tests
 */

import request from 'supertest';
import app from '../src/app';
import { SunnyPaymentGateway } from '../src/core/SunnyPaymentGateway';
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../src/core/constants';

describe('Payment Gateway Integration Tests', () => {
  let gateway;
  let testApiKey;

  beforeAll(async () => {
    gateway = new SunnyPaymentGateway({
      environment: 'test',
      merchantId: 'test_merchant'
    });

    // Generate test credentials
    // Generate test credentials
    const credentials = await gateway.generateApiCredentials();
    testApiKey = credentials.apiKey;
  });

  describe('Card Payments', () => {
    it('should process a successful card payment', async () => {
      const paymentData = {
        amount: '100.00',
        currency: 'USD',
        paymentMethod: PAYMENT_METHODS.CARD,
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2025,
          cvc: '123'
        },
        customer: {
          email: 'test@example.com'
        }
      };

      const response = await request(app)
        .post('/api/v1/payments')
        .set('X-API-Key', testApiKey)
        .set('Content-Type', 'application/json')
        .send(paymentData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.status).toBe(PAYMENT_STATUS.COMPLETED);
      expect(response.body.transactionId).toBeTruthy();
    });

    it('should handle invalid card details', async () => {
      const paymentData = {
        amount: '100.00',
        currency: 'USD',
        paymentMethod: PAYMENT_METHODS.CARD,
        card: {
          number: '4242424242424241', // Invalid number
          expMonth: 12,
          expYear: 2025,
          cvc: '123'
        }
      };

      const response = await request(app)
        .post('/api/v1/payments')
        .set('X-API-Key', testApiKey)
        .set('Content-Type', 'application/json')
        .send(paymentData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('INVALID_CARD');
    });
  });

  describe('Bank Transfers', () => {
    it('should initiate a bank transfer', async () => {
      const transferData = {
        amount: '500.00',
        currency: 'USD',
        paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
        bankAccount: {
          accountNumber: '000123456789',
          routingNumber: '110000000',
          accountType: 'checking'
        }
      };

      const response = await request(app)
        .post('/api/v1/payments')
        .set('X-API-Key', testApiKey)
        .set('Content-Type', 'application/json')
        .send(transferData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.status).toBe(PAYMENT_STATUS.PENDING);
    });
  });

  describe('Refunds', () => {
    it('should process a refund', async () => {
      // First create a payment
      const paymentData = {
        amount: '100.00',
        currency: 'USD',
        paymentMethod: PAYMENT_METHODS.CARD,
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2025,
          cvc: '123'
        }
      };

      const paymentResponse = await request(app)
        .post('/api/v1/payments')
        .set('X-API-Key', testApiKey)
        .set('Content-Type', 'application/json')
        .send(paymentData);

      // Then process refund
      const refundResponse = await request(app)
        .post('/api/v1/refunds')
        .set('X-API-Key', testApiKey)
        .set('Content-Type', 'application/json')
        .send({
          paymentId: paymentResponse.body.transactionId,
          amount: '100.00',
          reason: 'customer_requested'
        });

      expect(refundResponse.status).toBe(200);
      expect(refundResponse.body.success).toBe(true);
      expect(refundResponse.body.status).toBe('refunded');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const paymentData = {
        amount: '10.00',
        currency: 'USD',
        paymentMethod: PAYMENT_METHODS.CARD,
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2025,
          cvc: '123'
        }
      };

      // Make multiple requests quickly
      const requests = Array(50).fill().map(() => 
        request(app)
          .post('/api/v1/payments')
          .set('X-API-Key', testApiKey)
          .set('Content-Type', 'application/json')
          .send(paymentData)
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.some(r => r.status === 429);
      expect(rateLimited).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing required fields', async () => {
      const paymentData = {
        // Missing amount
        currency: 'USD',
        paymentMethod: PAYMENT_METHODS.CARD,
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2025,
          cvc: '123'
        }
      };

      const response = await request(app)
        .post('/api/v1/payments')
        .set('X-API-Key', testApiKey)
        .set('Content-Type', 'application/json')
        .send(paymentData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('VALIDATION_ERROR');
    });

    it('should handle invalid API keys', async () => {
      const response = await request(app)
        .post('/api/v1/payments')
        .set('X-API-Key', 'invalid_key')
        .set('Content-Type', 'application/json')
        .send({});

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('INVALID_API_KEY');
    });
  });
});
