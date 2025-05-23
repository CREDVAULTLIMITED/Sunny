/**
 * Stripe Payment Processor for Sunny Payment Gateway
 * Handles credit/debit card payments through Stripe with full PCI DSS compliance
 */

import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import { PAYMENT_STATUS, ERROR_CODES } from '../../core/constants.js';
import { logTransaction } from '../../core/transactionLogger.js';
import { secureLog } from '../../utils/secureLogger.js';
import { isProduction } from '../../utils/environmentUtils.js';

/**
 * PCI DSS compliant Stripe Payment Processor
 * Handles card payments without directly handling card data
 */
class StripeProcessor {
  constructor(config = {}) {
    // Determine environment and set appropriate configuration
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.isProduction = this.environment === 'production';
    
    // Initialize Stripe with appropriate keys based on environment
    this.secretKey = config.secretKey || process.env.STRIPE_SECRET_KEY;
    this.publishableKey = config.publishableKey || process.env.STRIPE_PUBLISHABLE_KEY;
    this.webhookSecret = config.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET;
    this.accountId = config.accountId || process.env.STRIPE_ACCOUNT_ID;
    
    // Validate key structure to prevent mixing production and test keys
    this.validateKeyConfiguration();
    
    // Stripe API version - fixing to ensure compatibility
    this.apiVersion = config.apiVersion || '2023-10-16';
    
    // Initialize Stripe client with proper configuration
    this.stripeClient = new Stripe(this.secretKey, {
      apiVersion: this.apiVersion,
      maxNetworkRetries: this.isProduction ? 3 : 1, // Auto-retry in production
      timeout: this.isProduction ? 30000 : 10000 // Longer timeouts in production
    });
    
    // Set up idempotency key prefix for preventing double charges
    this.idempotencyKeyPrefix = config.idempotencyKeyPrefix || 'sunny_';
    
    // Log initialization without sensitive data
    secureLog('info', 'StripeProcessor', 'Initialized', {
      environment: this.environment,
      isProduction: this.isProduction,
      apiVersion: this.apiVersion,
      hasSecretKey: !!this.secretKey,
      hasWebhookSecret: !!this.webhookSecret
    });
  }
  
  /**
   * Process a payment
   * 
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentDetails) {
    try {
      // Generate idempotency key
      const idempotencyKey = `${this.idempotencyKeyPrefix}${uuidv4()}`;
      
      // Create payment intent parameters
      const params = {
        amount: Math.round(parseFloat(paymentDetails.amount) * 100), // amount in cents
        currency: paymentDetails.currency.toLowerCase(),
        payment_method_types: ['card'],
        description: paymentDetails.description || 'Payment via Sunny Gateway',
        metadata: {
          transactionId: paymentDetails.transactionId || uuidv4(),
          customerName: paymentDetails.customerName || 'Guest',
          customerEmail: paymentDetails.customerEmail || 'anonymous'
        }
      };
      
      // Create payment intent
      const paymentIntent = await this.stripeClient.paymentIntents.create(params, {
        idempotencyKey
      });
      
      // Confirm payment intent if client secret is not required
      if (paymentIntent.status === 'requires_confirmation') {
        await this.stripeClient.paymentIntents.confirm(paymentIntent.id);
      }
      
      // Log transaction
      logTransaction('STRIPE_PAYMENT', {
        transactionId: params.metadata.transactionId,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        status: paymentIntent.status
      });
      
      // Return result
      return {
        success: paymentIntent.status === 'succeeded',
        message: paymentIntent.status,
        processorReference: paymentIntent.id,
        status: paymentIntent.status
      };
    } catch (error) {
      // Log error securely
      secureLog('error', 'StripeProcessor', 'Payment failed', {
        error: error.message,
        stack: error.stack
      });
      
      return {
        success: false,
        message: error.message,
        errorCode: ERROR_CODES.PAYMENT_FAILED
      };
    }
  }
  
  /**
   * Handle Stripe webhook events
   * 
   * @param {Object} event - Stripe event object
   * @returns {Promise<void>}
   */
  async handleWebhook(event) {
    // Implement webhook event handling logic here
    secureLog('info', 'StripeProcessor', 'Received webhook event', {
      eventType: event.type,
      eventId: event.id
    });
    
    // Example: handle payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      logTransaction('STRIPE_PAYMENT_SUCCEEDED', {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency
      });
    }
  }
  
  /**
   * Get Stripe publishable key
   * 
   * @returns {string} Publishable key
   */
  getPublishableKey() {
    return this.publishableKey;
  }
}

export default StripeProcessor;

    if (isTestKey && isLiveKey) {
      throw new Error('Stripe secret key cannot be both test and live key');
    }

    if (this.isProduction && isTestKey) {
      throw new Error('Test keys cannot be used in production environment');
    }

    if (!this.isProduction && isLiveKey) {
      throw new Error('Live keys cannot be used in non-production environment');
    }
    
