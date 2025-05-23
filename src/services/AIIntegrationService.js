/**
 * AI Integration Service
 * Connects EnhancedSunnyAI with the payment gateway system
 */

const EnhancedSunnyAI = require('../../core/ai/EnhancedSunnyAI');
const path = require('path');

class AIIntegrationService {
    constructor() {
        this.ai = new EnhancedSunnyAI();
        this.initialized = false;
    }

    async initialize() {
        try {
            await this.ai.initialize();
            this.initialized = true;
            this.startPeriodicTraining();
            console.log('AI Integration Service initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AI Integration Service:', error);
            throw error;
        }
    }

    startPeriodicTraining() {
        // Train the model every 24 hours
        setInterval(async () => {
            try {
                await this.ai.trainOnNewData();
                console.log('Periodic training completed successfully');
            } catch (error) {
                console.error('Periodic training failed:', error);
            }
        }, 24 * 60 * 60 * 1000);
    }

    async analyzeFraudRisk(transaction) {
        if (!this.initialized) {
            throw new Error('AI Integration Service not initialized');
        }

        const query = {
            type: 'fraud_analysis',
            data: {
                amount: transaction.amount,
                currency: transaction.currency,
                merchant: transaction.merchantId,
                customer: transaction.customerId,
                location: transaction.location,
                deviceInfo: transaction.deviceInfo,
                timestamp: transaction.timestamp
            }
        };

        const result = await this.ai.processQuery(
            JSON.stringify(query),
            { context: 'fraud_detection' }
        );

        return {
            riskScore: this.calculateRiskScore(result),
            explanation: result.response,
            confidence: result.confidence
        };
    }

    async recommendPaymentMethod(customerData) {
        if (!this.initialized) {
            throw new Error('AI Integration Service not initialized');
        }

        const query = {
            type: 'payment_recommendation',
            data: {
                location: customerData.location,
                amount: customerData.amount,
                currency: customerData.currency,
                previousMethods: customerData.previousPaymentMethods,
                deviceType: customerData.deviceType
            }
        };

        const result = await this.ai.processQuery(
            JSON.stringify(query),
            { context: 'payment_recommendation' }
        );

        return {
            recommendedMethods: this.parseRecommendations(result.response),
            confidence: result.confidence
        };
    }

    async optimizeRoutingStrategy(paymentRequest) {
        if (!this.initialized) {
            throw new Error('AI Integration Service not initialized');
        }

        const query = {
            type: 'routing_optimization',
            data: {
                amount: paymentRequest.amount,
                currency: paymentRequest.currency,
                paymentMethod: paymentRequest.method,
                merchantCategory: paymentRequest.merchantCategory,
                location: paymentRequest.location,
                time: new Date().toISOString()
            }
        };

        const result = await this.ai.processQuery(
            JSON.stringify(query),
            { context: 'routing_optimization' }
        );

        return {
            route: this.parseRoutingStrategy(result.response),
            confidence: result.confidence
        };
    }

    calculateRiskScore(result) {
        try {
            const response = JSON.parse(result.response);
            return response.riskScore || 0.5;
        } catch (error) {
            console.error('Error parsing risk score:', error);
            return 0.5; // Default medium risk
        }
    }

    parseRecommendations(response) {
        try {
            const parsed = JSON.parse(response);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (error) {
            console.error('Error parsing recommendations:', error);
            return [];
        }
    }

    parseRoutingStrategy(response) {
        try {
            return JSON.parse(response);
        } catch (error) {
            console.error('Error parsing routing strategy:', error);
            return null;
        }
    }

    async shutdown() {
        if (this.initialized) {
            await this.ai.shutdown();
            this.initialized = false;
            console.log('AI Integration Service shut down successfully');
        }
    }
}

module.exports = new AIIntegrationService();
