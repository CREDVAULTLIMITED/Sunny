/**
 * AI-powered payment routing system
 */

import { loadModel } from './ModelManager';
import config from '../config/config';

class AIPaymentRouter {
    constructor() {
        this.model = null;
        this.routingHistory = new Map();
        this.successRates = new Map();
    }

    async initialize() {
        this.model = await loadModel('payment-routing-v1');
        console.log('✅ AI Payment Router initialized');
    }

    /**
     * Get optimal payment route based on multiple factors
     */
    async getOptimalRoute(paymentData) {
        const {
            amount,
            currency,
            country,
            paymentMethod,
            customerRiskScore,
            merchantId
        } = paymentData;

        // Collect routing factors
        const factors = {
            amount,
            currency,
            country,
            paymentMethod,
            customerRiskScore,
            merchantHistory: await this.getMerchantHistory(merchantId),
            timeOfDay: new Date().getHours(),
            dayOfWeek: new Date().getDay(),
            processorStatus: await this.getProcessorStatus(),
            recentSuccessRates: this.getRecentSuccessRates()
        };

        // Get AI prediction
        const prediction = await this.model.predict(factors);

        // Calculate optimal route
        const route = this.calculateRoute(prediction, factors);

        // Update routing history
        await this.updateRoutingHistory(paymentData, route);

        return route;
    }

    /**
     * Calculate final route based on AI prediction and business rules
     */
    calculateRoute(prediction, factors) {
        const route = {
            processor: prediction.recommendedProcessor,
            backupProcessor: prediction.backupProcessor,
            strategyType: prediction.strategyType,
            expectedSuccessRate: prediction.confidenceScore,
            routingReason: prediction.reason
        };

        // Apply business rules
        if (factors.amount > config.routing.highValueThreshold) {
            route.requiresManualReview = true;
        }

        if (factors.customerRiskScore > config.routing.riskThreshold) {
            route.requiresEnhancedVerification = true;
        }

        return route;
    }

    /**
     * Get merchant's payment processing history
     */
    async getMerchantHistory(merchantId) {
        // This would fetch from your database in production
        return this.routingHistory.get(merchantId) || [];
    }

    /**
     * Get current status of all payment processors
     */
    async getProcessorStatus() {
        // This would check actual processor status in production
        return {
            card: { status: 'up', latency: 150 },
            bankTransfer: { status: 'up', latency: 200 },
            crypto: { status: 'up', latency: 100 }
        };
    }

    /**
     * Get recent success rates for different payment methods
     */
    getRecentSuccessRates() {
        return this.successRates;
    }

    /**
     * Update routing history with new transaction
     */
    async updateRoutingHistory(paymentData, route) {
        const { merchantId } = paymentData;
        const history = this.routingHistory.get(merchantId) || [];
        
        history.push({
            timestamp: new Date(),
            route,
            paymentData: { ...paymentData, sensitiveData: undefined }
        });

        // Keep last 100 entries
        if (history.length > 100) {
            history.shift();
        }

        this.routingHistory.set(merchantId, history);
    }

    /**
     * Update success rates based on transaction result
     */
    updateSuccessRate(paymentMethod, isSuccess) {
        const current = this.successRates.get(paymentMethod) || { 
            success: 0, 
            total: 0 
        };

        current.total++;
        if (isSuccess) {
            current.success++;
        }

        this.successRates.set(paymentMethod, current);
    }
}

export default new AIPaymentRouter();
