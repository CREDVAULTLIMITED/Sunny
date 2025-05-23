const express = require('express');
const router = express.Router();
const aiEnhancedPayment = require('../middleware/aiEnhancedPayment');
const { validatePayment } = require('../middleware/validation');
const PaymentController = require('../controllers/PaymentController');

// Apply AI enhancement middleware to all payment routes
router.use(aiEnhancedPayment);

// Payment routes
router.post('/process', validatePayment, PaymentController.processPayment);
router.post('/verify', PaymentController.verifyPayment);
router.post('/refund', PaymentController.processRefund);

// Add AI-specific routes
router.get('/recommendations', async (req, res) => {
    try {
        const recommendations = await AIIntegrationService.recommendPaymentMethod({
            location: req.query.location,
            amount: req.query.amount,
            currency: req.query.currency,
            previousPaymentMethods: req.user?.previousPaymentMethods || [],
            deviceType: req.headers['user-agent']
        });
        
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get recommendations' });
    }
});

router.get('/risk-analysis', async (req, res) => {
    try {
        const riskAnalysis = await AIIntegrationService.analyzeFraudRisk({
            ...req.query,
            deviceInfo: req.headers['user-agent'],
            timestamp: new Date().toISOString()
        });
        
        res.json(riskAnalysis);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze risk' });
    }
});

module.exports = router;