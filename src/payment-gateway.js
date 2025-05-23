/**
 * Real Payment Gateway Implementation
 * This is a minimal but functional payment gateway with Stripe integration
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_test_key');

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // CORS support
app.use(express.json()); // JSON body parsing

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Process a payment with Stripe
app.post('/api/payments', async (req, res) => {
  try {
    const { amount, currency, paymentMethod, card, customer } = req.body;
    
    // Validate required fields
    if (!amount || !currency) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Generate transaction ID
    const transactionId = `txn_${uuidv4().replace(/-/g, '')}`;
    
    // Create a payment method if card details are provided
    let paymentMethodId = paymentMethod;
    
    if (!paymentMethodId && card) {
      const paymentMethodResult = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: card.number,
          exp_month: parseInt(card.expMonth),
          exp_year: parseInt(card.expYear),
          cvc: card.cvv
        }
      });
      
      paymentMethodId = paymentMethodResult.id;
    }
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100), // Stripe requires amount in cents
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirm: true,
      description: req.body.description || 'Payment via Sunny Gateway',
      metadata: {
        transactionId,
        customerName: customer?.name || 'Guest',
        customerEmail: customer?.email || 'anonymous'
      },
      return_url: req.body.returnUrl || 'https://example.com/return'
    });
    
    // Handle payment intent status
    if (paymentIntent.status === 'succeeded') {
      return res.json({
        success: true,
        transactionId,
        status: 'completed',
        processorResponse: {
          processorTransactionId: paymentIntent.id,
          authorizationCode: paymentIntent.latest_charge,
          processorName: 'Stripe'
        }
      });
    } else if (paymentIntent.status === 'requires_action') {
      return res.json({
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
        transactionId
      });
    } else {
      return res.json({
        success: false,
        status: paymentIntent.status,
        message: `Payment failed with status: ${paymentIntent.status}`,
        transactionId
      });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    
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
    console.error('Error retrieving payment:', error);
    
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
    console.error('Refund processing error:', error);
    
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