/**
 * AI-Enhanced Payment Middleware
 * Integrates AI capabilities into the payment processing pipeline
 */

const AIIntegrationService = require('../services/AIIntegrationService');

async function aiEnhancedPaymentMiddleware(req, res, next) {
    try {
        // Skip AI processing if the service isn't initialized
        if (!AIIntegrationService.initialized) {
            console.warn('AI service not initialized, skipping AI enhancements');
            return next();
        }

        const paymentRequest = req.body;

        // Parallel processing of AI enhancements
        const [fraudAnalysis, paymentRecommendation, routingStrategy] = await Promise.all([
            AIIntegrationService.analyzeFraudRisk(paymentRequest),
            AIIntegrationService.recommendPaymentMethod({
                location: paymentRequest.location,
                amount: paymentRequest.amount,
                currency: paymentRequest.currency,
                previousPaymentMethods: req.user?.previousPaymentMethods || [],
                deviceType: req.headers['user-agent']
            }),
            AIIntegrationService.optimizeRoutingStrategy(paymentRequest)
        ]);

        // Enhance the request with AI insights
        req.aiEnhancements = {
            fraudAnalysis,
            paymentRecommendation,
            routingStrategy,
            timestamp: new Date().toISOString()
        };

        // Block high-risk transactions
        if (fraudAnalysis.riskScore > 0.8 && fraudAnalysis.confidence > 0.7) {
            return res.status(403).json({
                error: 'High risk transaction detected',
                details: fraudAnalysis.explanation
            });
        }

        // Modify routing if AI suggests a better path
        if (routingStrategy.confidence > 0.8) {
            req.body.routingStrategy = routingStrategy.route;
        }

        // Add payment method recommendations to response
        res.locals.paymentRecommendations = paymentRecommendation.recommendedMethods;

        next();
    } catch (error) {
        console.error('AI payment middleware error:', error);
        // Continue without AI enhancements on error
        next();
    }
}

module.exports = aiEnhancedPaymentMiddleware;
