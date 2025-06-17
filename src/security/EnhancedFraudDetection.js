/**
 * Enhanced Fraud Detection with AI
 */

import OllamaService from '../core/ai/OllamaService.js';
import { detectFraud as basicDetectFraud } from './fraudDetection.js';
import { getRiskRules } from '../config/security';
import { loadModel } from '../core/ai/ModelManager';
import crypto from 'crypto';
import geoip from 'geoip-lite';
import { logger } from '../services/loggingService';
import { securityConfig } from '../config/security';
import { redis } from '../config/redis';

class EnhancedFraudDetection {
    constructor() {
        this.model = null;
        this.ruleEngine = null;
        this.behaviorAnalyzer = null;
        this.locationCache = new Map();
        this.suspiciousPatterns = new Set();
        this.initialize();
    }

    async initialize() {
        console.log('🔒 Initializing Enhanced Fraud Detection...');
        
        // Load AI model
        this.model = await loadModel('fraud-detection-v2');
        
        // Initialize behavior analyzer
        this.behaviorAnalyzer = new BehaviorAnalyzer();
        await this.behaviorAnalyzer.initialize();
        
        // Load rule engine
        this.ruleEngine = new FraudRuleEngine(getRiskRules());
        
        console.log('✅ Enhanced Fraud Detection Ready');
    }

    async analyzeTransaction(transaction) {
        const {
            userId,
            merchantId,
            amount,
            currency,
            paymentMethod,
            deviceInfo,
            ipAddress,
            timestamp
        } = transaction;

        // 1. AI-based risk analysis
        const aiRiskScore = await this.model.predict({
            ...transaction,
            historicalData: await this.getHistoricalData(userId)
        });

        // 2. Get location data and check for anomalies
        const locationInfo = await this.getLocationInfo(ipAddress);
        const locationRisk = await this.assessLocationRisk(locationInfo, transaction);

        // 3. Behavioral analysis
        const behaviorScore = await this.behaviorAnalyzer.analyze({
            userId,
            deviceInfo,
            ipAddress,
            locationInfo,
            timestamp
        });

        // 4. Rule-based validation
        const ruleViolations = await this.ruleEngine.evaluate(transaction);

        // 5. Velocity checks
        const velocityIssues = await this.checkTransactionVelocity(userId, merchantId, amount);

        // 6. Device fingerprint analysis
        const deviceRisk = await this.analyzeDeviceFingerprint(deviceInfo);

        // 7. Calculate final risk assessment
        const riskAssessment = this.calculateRiskAssessment({
            aiRiskScore,
            locationRisk,
            behaviorScore,
            ruleViolations,
            velocityIssues,
            deviceRisk
        });

        // 8. Generate security recommendations
        const recommendations = this.generateSecurityRecommendations(riskAssessment);

        // 9. Update risk profile
        await this.updateRiskProfile(userId, riskAssessment);

        return {
            isHighRisk: riskAssessment.score > securityConfig.riskThreshold,
            riskScore: riskAssessment.score,
            requiresAction: recommendations.requiresAction,
            recommendedAction: recommendations.action,
            reason: riskAssessment.primaryReason,
            details: {
                locationRisk,
                behaviorScore,
                ruleViolations,
                velocityIssues,
                deviceRisk
            }
        };
    }

    calculateRiskAssessment(factors) {
        const weights = {
            aiRiskScore: 0.3,
            locationRisk: 0.2,
            behaviorScore: 0.2,
            ruleViolations: 0.15,
            velocityIssues: 0.1,
            deviceRisk: 0.05
        };

        let score = 0;
        let primaryReason = null;
        let maxWeight = 0;

        // Calculate weighted score
        for (const [factor, weight] of Object.entries(weights)) {
            const factorScore = factors[factor].score || 0;
            score += factorScore * weight;

            // Track primary risk factor
            if (factorScore * weight > maxWeight) {
                maxWeight = factorScore * weight;
                primaryReason = factors[factor].reason;
            }
        }

        return {
            score,
            primaryReason,
            details: factors
        };
    }

    async getHistoricalData(userId) {
        const key = `txHistory:${userId}`;
        const history = await redis.lrange(key, 0, 99);
        return history.map(JSON.parse);
    }

    async updateRiskProfile(userId, assessment) {
        const key = `riskProfile:${userId}`;
        await redis.hset(key, {
            lastCheck: Date.now(),
            riskScore: assessment.score,
            primaryReason: assessment.primaryReason,
            details: JSON.stringify(assessment.details)
        });
    }
}

// Export singleton instance
export default new EnhancedFraudDetection();
