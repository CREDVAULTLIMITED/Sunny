/**
 * Direct Payment Gateway Implementation
 * Handles direct payment processing with banks
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DirectCardProcessor = require('./core/processors/DirectCardProcessor');
const { logger } = require('./services/loggingService');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize payment processor
const cardProcessor = new DirectCardProcessor();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // CORS support
app.use(express.json()); // JSON body parsing
app.use(express.urlencoded({ extended: true })); // Form data parsing

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Process a card payment
app.post('/api/payments', async (req, res) => {
  try {
    const { amount, currency, card, customer, returnUrl } = req.body;
    
    // Validate required fields
    if (!amount || !currency || !card) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields',
        requiredFields: ['amount', 'currency', 'card']
      });
    }

    // Generate transaction ID
    const transactionId = `txn_${uuidv4().replace(/-/g, '')}`;
    
    // Process payment directly with bank
    const paymentRequest = {
      amount: parseFloat(amount),
      currency: currency.toUpperCase(),
      card,
      merchantId: process.env.MERCHANT_ID,
      threeDSecureReturnUrl: returnUrl,
      metadata: {
        transactionId,
        customerName: customer?.name || 'Guest',
        customerEmail: customer?.email || 'anonymous'
      }
    };
    
    const result = await cardProcessor.process(paymentRequest);

    if (result.success) {
      return res.json({
        success: true,
        transactionId: transactionId,
        status: result.status,
        authorizationCode: result.authorizationCode,
        processorResponse: {
          last4: result.last4,
          cardNetwork: result.cardNetwork,
          processorTransactionId: result.transactionId
        }
      });
    }
    
    // Handle payment status
    if (result.status === 'requires_action') {
      return res.json({
        success: false,
        requiresAction: true,
        clientSecret: result.client_secret,
        nextAction: result.next_action,
        transactionId
      });
    } else {
      return res.json({
        success: false,
        status: result.status,
        message: `Payment failed with status: ${result.status}`,
        transactionId
      });
    }
  } catch (error) {
    logger.error('Payment processing error:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Payment processing failed',
      message: error.message 
    });
  }
});

// Get payment status
app.get('/api/payments/:id', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    
    return res.json({
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      paymentMethod: paymentIntent.payment_method_types[0],
      metadata: paymentIntent.metadata
    });
  } catch (error) {
    logger.error('Error retrieving payment:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve payment',
      message: error.message 
    });
  }
});

// Process a refund
app.post('/api/refunds', async (req, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Payment intent ID is required' 
      });
    }
    
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(parseFloat(amount) * 100) : undefined,
      reason: reason || 'requested_by_customer'
    });
    
    return res.json({
      success: true,
      refundId: refund.id,
      status: refund.status,
      amount: refund.amount / 100,
      currency: refund.currency
    });
  } catch (error) {
    logger.error('Refund processing error:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Refund processing failed',
      message: error.message 
    });
  }
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Payment Gateway server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;