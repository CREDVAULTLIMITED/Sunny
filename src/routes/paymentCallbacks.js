const express = require('express');
const bodyParser = require('body-parser');
const UPIProcessor = require('../integrations/upi/UPIProcessor.js');
const PixProcessor = require('../integrations/pix/PixProcessor.js');
const MPesaProcessor = require('../integrations/mpesa/MPesaProcessor.js');
const QRCodePaymentProcessor = require('../integrations/qrcode/QRCodePaymentProcessor.js');
const EMVProcessor = require('../integrations/emv/EMVProcessor.js');
const CryptoProcessor = require('../integrations/crypto/CryptoProcessor.js');
const { logTransaction } = require('../core/transactionLogger.js');

const router = express.Router();

// Use raw body parser for webhook verification if needed
router.use(bodyParser.json());

// Instantiate processors
const upiProcessor = new UPIProcessor();
const pixProcessor = new PixProcessor();
const mpesaProcessor = new MPesaProcessor();
const qrCodeProcessor = new QRCodePaymentProcessor();
const emvProcessor = new EMVProcessor();
const cryptoProcessor = new CryptoProcessor();

/**
 * UPI webhook callback endpoint
 */
router.post('/upi', async (req, res) => {
  try {
    const callbackData = req.body;
    const transactionId = req.query.transactionId || callbackData.transactionId;
    const result = await upiProcessor.processCallback(callbackData, transactionId);
    if (result.success) {
      res.status(200).send('UPI callback processed');
    } else {
      res.status(400).send('UPI callback processing failed');
    }
  } catch (error) {
    console.error('UPI callback error:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * Pix webhook callback endpoint
 */
router.post('/pix', async (req, res) => {
  try {
    const callbackData = req.body;
    const transactionId = req.query.transactionId || callbackData.transactionId;
    const result = await pixProcessor.processCallback(callbackData, transactionId);
    if (result.success) {
      res.status(200).send('Pix callback processed');
    } else {
      res.status(400).send('Pix callback processing failed');
    }
  } catch (error) {
    console.error('Pix callback error:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * M-Pesa webhook callback endpoint
 */
router.post('/mpesa', async (req, res) => {
  try {
    const callbackData = req.body;
    const transactionId = req.query.transactionId || callbackData.transactionId;
    const result = await mpesaProcessor.processCallback(callbackData, transactionId);
    if (result.success) {
      res.status(200).send('M-Pesa callback processed');
    } else {
      res.status(400).send('M-Pesa callback processing failed');
    }
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * QR Code payment webhook callback endpoint
 */
router.post('/qrcode', async (req, res) => {
  try {
    const callbackData = req.body;
    const transactionId = req.query.transactionId || callbackData.transactionId;
    const result = await qrCodeProcessor.processCallback(callbackData, transactionId);
    if (result.success) {
      res.status(200).send('QR Code callback processed');
    } else {
      res.status(400).send('QR Code callback processing failed');
    }
  } catch (error) {
    console.error('QR Code callback error:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * EMV/Card payment webhook callback endpoint
 */
router.post('/emv', async (req, res) => {
  try {
    const callbackData = req.body;
    const transactionId = req.query.transactionId || callbackData.transactionId;
    const result = await emvProcessor.processCallback(callbackData, transactionId);
    if (result.success) {
      res.status(200).send('EMV callback processed');
    } else {
      res.status(400).send('EMV callback processing failed');
    }
  } catch (error) {
    console.error('EMV callback error:', error);
    res.status(500).send('Internal server error');
  }
});

/**
 * Cryptocurrency payment webhook callback endpoint
 */
router.post('/crypto', async (req, res) => {
  try {
    const callbackData = req.body;
    const transactionId = req.query.transactionId || callbackData.transactionId;
    const result = await cryptoProcessor.processCallback(callbackData, transactionId);
    if (result.success) {
      res.status(200).send('Crypto callback processed');
    } else {
      res.status(400).send('Crypto callback processing failed');
    }
  } catch (error) {
    console.error('Crypto callback error:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;