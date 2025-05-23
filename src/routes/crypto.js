/**
 * Cryptocurrency payment routes
 */

import express from 'express';
import { CryptoProcessor } from '../integrations/crypto/CryptoProcessor.js';
import { validatePaymentRequest, validateStatusRequest } from '../middleware/validators.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const cryptoProcessor = new CryptoProcessor();

/**
 * Create a new cryptocurrency payment
 */
router.post('/payment', 
  authenticate,
  validatePaymentRequest,
  async (req, res) => {
    try {
      const paymentData = {
        amount: req.body.amount,
        currency: req.body.currency,
        cryptoCurrency: req.body.cryptoCurrency,
        transactionId: req.body.transactionId,
        customer: req.body.customer,
        metadata: req.body.metadata
      };

      const result = await cryptoProcessor.createTransaction(paymentData);
      res.json(result);
    } catch (error) {
      console.error('Crypto payment error:', error);
      res.status(500).json({
        success: false,
        error: 'PAYMENT_PROCESSOR_ERROR',
        message: 'Failed to process cryptocurrency payment'
      });
    }
  }
);

/**
 * Get cryptocurrency payment status
 */
router.get('/payment/:transactionId/status',
  authenticate,
  validateStatusRequest,
  async (req, res) => {
    try {
      const statusData = {
        transactionId: req.params.transactionId,
        paymentAddress: req.query.address,
        cryptoCurrency: req.query.currency
      };

      const status = await cryptoProcessor.checkTransactionStatus(statusData);
      res.json(status);
    } catch (error) {
      console.error('Status check error:', error);
      res.status(500).json({
        success: false,
        error: 'STATUS_CHECK_ERROR',
        message: 'Failed to check transaction status'
      });
    }
  }
);

/**
 * Get current exchange rates
 */
router.get('/exchange-rates',
  authenticate,
  async (req, res) => {
    try {
      const rates = await cryptoProcessor.getExchangeRates();
      res.json(rates);
    } catch (error) {
      console.error('Exchange rate error:', error);
      res.status(500).json({
        success: false,
        error: 'EXCHANGE_RATE_ERROR',
        message: 'Failed to fetch exchange rates'
      });
    }
  }
);

/**
 * Handle cryptocurrency payment callbacks
 */
router.post('/callback',
  async (req, res) => {
    try {
      const result = await cryptoProcessor.processCallback(req.body);
      res.json(result);
    } catch (error) {
      console.error('Callback processing error:', error);
      res.status(500).json({
        success: false,
        error: 'CALLBACK_PROCESSING_ERROR',
        message: 'Failed to process callback'
      });
    }
  }
);

export default router;
