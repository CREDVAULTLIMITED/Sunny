/**
 * Sunny Payment Gateway API Server
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./src/routes/auth');

// Load environment variables
dotenv.config();

// Validate configuration
const { validateConfigOrThrow } = require('./src/config/validateConfig');
try {
  validateConfigOrThrow();
  console.log('Configuration validated successfully, server ready for transactions');
} catch (error) {
  console.error(error.message);
  // If running in production, exit on critical config errors
  if (process.env.NODE_ENV === 'production') {
    console.error('Exiting due to critical configuration errors. Fix these issues before restarting.');
    process.exit(1);
  } else {
    console.warn('Running with configuration errors. Transaction processing may fail.');
  }
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sunny_payments_dev';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS support
app.use(morgan('combined')); // Request logging
app.use(express.json()); // JSON body parsing
app.use(express.urlencoded({ extended: true })); // Form data parsing

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Mount auth routes at /api/v2/auth
app.use('/api/v2/auth', authRoutes);

// Mount payment callbacks route
const paymentCallbacksRoutes = require('./src/routes/paymentCallbacks.js');
app.use('/api/v2/payment-callbacks', paymentCallbacksRoutes);

// Add some dummy routes for testing
app.get('/api/v2/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running', timestamp: new Date() });
});

// Payment processing endpoint
app.post('/api/payments', async (req, res) => {
  try {
    const { amount, currency, paymentMethod, card, customer } = req.body;
    
    // Validate required fields
    if (!amount || !currency || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    // Import payment gateway
    const SunnyPaymentGateway = require('./src/core/SunnyPaymentGateway');
    
    // Initialize payment gateway
    const gateway = new SunnyPaymentGateway({
      merchantId: process.env.SUNNY_MERCHANT_ID,
      apiKey: process.env.SUNNY_API_KEY,
      apiSecret: process.env.SUNNY_API_SECRET,
      environment: process.env.SUNNY_ENVIRONMENT || 'sandbox'
    });
    
    // Process payment
    const result = await gateway.processPayment({
      amount,
      currency,
      paymentMethod,
      card,
      customer,
      metadata: req.body.metadata
    });
    
    // Return result
    res.json(result);
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment processing failed',
      message: error.message 
    });
  }
});

// API error handling middleware
app.use('/api', (err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Catch-all handler for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Server error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Sunny Payment Gateway server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});