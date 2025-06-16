/**
 * EnhancedFraudDetection.js
 * Advanced fraud detection system with ML-based analysis
 */

import { loadModel, predictRisk } from '../ai/core/ModelManager';
import { validateTransaction } from '../utils/validation';
import { getIPLocation } from '../utils/geoip';
import config from '../config/config';

class EnhancedFraudDetection {
    constructor() {
        this.riskModel = null;
        this.blacklist = new Set();
        this.transactionHistory = new Map();
        this.ruleEngine = new FraudRuleEngine();
        this.behaviorAnalyzer = new BehaviorAnalyzer();
    }

    async initialize() {
        console.log('🔒 Initializing Enhanced Fraud Detection...');
        this.riskModel = await loadModel('fraud-detection-v2');
        await this.behaviorAnalyzer.initialize();
        await this.loadBlacklist();
        console.log('✅ Fraud Detection System Ready');
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

        // Quick checks
        await this.performQuickChecks(transaction);

        // Get location data
        const locationInfo = await getIPLocation(ipAddress);

        // Behavioral analysis
        const behaviorScore = await this.behaviorAnalyzer.analyze({
            userId,
            deviceInfo,
            ipAddress,
            locationInfo,
            timestamp
        });

        // ML-based risk prediction
        const riskScore = await this.predictRisk({
            ...transaction,
            locationInfo,
            behaviorScore
        });

        // Rule-based checks
        const ruleViolations = await this.ruleEngine.evaluate(transaction);

        // Velocity checks
        const velocityIssues = await this.checkVelocity(userId, merchantId, amount);

        // Compile final risk assessment
        const riskAssessment = this.assessRisk({
            riskScore,
            behaviorScore,
            ruleViolations,
            velocityIssues,
            locationInfo
        });

        // Update history
        await this.updateTransactionHistory(transaction, riskAssessment);

        return {
            isHighRisk: riskAssessment.isHighRisk,
            riskLevel: riskAssessment.riskLevel,
            riskFactors: riskAssessment.riskFactors,
            recommendedAction: riskAssessment.recommendedAction,
            requiresManualReview: riskAssessment.requiresManualReview
        };
    }

    async performQuickChecks(transaction) {
        const { userId, ipAddress, merchantId } = transaction;

        if (this.blacklist.has(userId) || this.blacklist.has(ipAddress)) {
            throw new Error('Transaction blocked: Blacklisted entity');
        }

        if (!await validateTransaction(transaction)) {
            throw new Error('Transaction validation failed');
        }

        await this.verifyMerchantStatus(merchantId);
    }

    async predictRisk(data) {
        try {
            return await predictRisk(this.riskModel, data);
        } catch (error) {
            console.error('Risk prediction failed:', error);
            return await this.ruleEngine.getFallbackRiskScore(data);
        }
    }

    async checkVelocity(userId, merchantId, amount) {
        const timeWindows = [
            { minutes: 5, limit: 5 },    // 5 transactions in 5 minutes
            { minutes: 60, limit: 20 },  // 20 transactions in 1 hour
            { hours: 24, limit: 50 }     // 50 transactions in 24 hours
        ];

        const issues = [];
        const now = Date.now();

        for (const window of timeWindows) {
            const transactions = await this.getRecentTransactions(userId, window);
            const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
            
            if (transactions.length >= window.limit) {
                issues.push({
                    type: 'VELOCITY_COUNT',
                    window,
                    count: transactions.length
                });
            }

            if (totalAmount + amount > config.security.maxAmountPerWindow) {
                issues.push({
                    type: 'VELOCITY_AMOUNT',
                    window,
                    amount: totalAmount + amount
                });
            }
        }

        return issues;
    }

    assessRisk({ riskScore, behaviorScore, ruleViolations, velocityIssues, locationInfo }) {
        const riskFactors = [];
        let totalRiskScore = riskScore;

        totalRiskScore += behaviorScore * config.security.behaviorScoreWeight;

        if (ruleViolations.length > 0) {
            totalRiskScore += config.security.ruleViolationPenalty * ruleViolations.length;
            riskFactors.push(...ruleViolations.map(v => v.reason));
        }

        if (velocityIssues.length > 0) {
            totalRiskScore += config.security.velocityPenalty * velocityIssues.length;
            riskFactors.push('Unusual transaction velocity detected');
        }

        if (locationInfo.riskLevel === 'high') {
            totalRiskScore += config.security.highRiskLocationPenalty;
            riskFactors.push('High-risk location');
        }

        const riskLevel = this.calculateRiskLevel(totalRiskScore);

        return {
            isHighRisk: riskLevel === 'high',
            riskLevel,
            riskFactors,
            riskScore: totalRiskScore,
            recommendedAction: this.getRecommendedAction(riskLevel),
            requiresManualReview: riskLevel === 'high' || riskFactors.length > 2
        };
    }

    calculateRiskLevel(score) {
        if (score >= config.security.highRiskThreshold) return 'high';
        if (score >= config.security.mediumRiskThreshold) return 'medium';
        return 'low';
    }

    getRecommendedAction(riskLevel) {
        switch (riskLevel) {
            case 'high':
                return 'block';
            case 'medium':
                return 'review';
            default:
                return 'allow';
        }
    }
}

class FraudRuleEngine {
    async evaluate(transaction) {
        const rules = await this.loadRules();
        return rules
            .map(rule => rule(transaction))
            .filter(result => result !== null);
    }

    async loadRules() {
        // Implementation would load rules from configuration
        return [];
    }

    async getFallbackRiskScore(data) {
        // Simplified risk scoring when ML model fails
        let score = 0.5; // Base score
        
        // Add risk factors
        if (data.amount > 10000) score += 0.2;
        if (data.locationInfo?.riskLevel === 'high') score += 0.2;
        if (data.deviceInfo?.isAnonymous) score += 0.1;
        
        return Math.min(score, 1.0);
    }
}

class BehaviorAnalyzer {
    async initialize() {
        // Load behavior patterns and analysis rules
    }

    async analyze({userId, deviceInfo, ipAddress, locationInfo, timestamp}) {
        // Implementation would analyze user behavior patterns
        return 0.1; // Default low risk score
    }
}

export default new EnhancedFraudDetection();
