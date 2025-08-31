/**
 * Sunny Payment Gateway - Enhanced Fraud Detection with TinyLlama
 * 
 * Provides advanced fraud detection capabilities using AI
 */

import OllamaService from '../core/ai/OllamaService.js';
import { detectFraud as basicDetectFraud } from './fraudDetection.js';
import { getRiskRules } from '../config/security';
import crypto from 'crypto';
import geoip from 'geoip-lite';
import { logger } from '../services/loggingService';
import { securityConfig } from '../config/security';
import { redis } from '../config/redis';

// Initialize Ollama service
const ollamaService = new OllamaService();

// Risk patterns for different payment methods
const RISK_PATTERNS = {
  CARD: {
    velocityThreshold: 5, // transactions per minute
    amountThreshold: 10000, // suspicious amount threshold
    locationMismatch: true, // check IP vs card country
    binValidation: true // validate BIN data
  },
  MOBILE_MONEY: {
    velocityThreshold: 3,
    amountThreshold: 5000,
    numberValidation: true,
    providerValidation: true
  },
  CRYPTO: {
    addressValidation: true,
    chainAnalysis: true,
    mixerDetection: true
  }
};

class FraudDetectionService {
  constructor() {
    this.suspiciousPatterns = new Set([
      'sql injection',
      'xss attempt',
      'command injection',
      'path traversal'
    ]);
    
    this.highRiskCountries = new Set([
      // High-risk countries based on compliance requirements
    ]);
  }

  /**
   * Enhanced fraud detection using TinyLlama
   * 
   * @param {Object} transactionData - Transaction data to analyze
   * @returns {Promise<Object>} Enhanced fraud detection result
   */
  async enhancedDetectFraud(transactionData) {
    try {
      // Get basic rule-based fraud detection result
      const basicResult = await basicDetectFraud(transactionData);
      
      // Get AI-based fraud detection
      const aiResult = await ollamaService.analyzeFraud(transactionData);
      
      // Real-time behavioral analysis
      const behaviorResult = await this.analyzeBehavioralPatterns(transactionData);
      
      // Device fingerprinting result
      const deviceResult = await this.analyzeDeviceFingerprint(transactionData.deviceData);
      
      // Velocity checking
      const velocityResult = await this.checkTransactionVelocity(transactionData);

      // Calculate combined risk score with weighted factors
      const riskScore = this.calculateRiskScore({
        basicScore: basicResult.riskScore,
        aiScore: aiResult.riskScore,
        behaviorScore: behaviorResult.riskScore,
        deviceScore: deviceResult.riskScore,
        velocityScore: velocityResult.riskScore
      });

      // Determine if transaction is fraudulent based on risk score and rules
      const isFraudulent = this.evaluateFraudStatus(riskScore, transactionData);

      return {
        isFraudulent,
        riskScore,
        details: {
          ai: aiResult,
          behavior: behaviorResult,
          device: deviceResult,
          velocity: velocityResult,
          basic: basicResult
        },
        recommendations: this.generateRecommendations(riskScore, transactionData),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Fraud detection error', {
        error: error.message,
        transactionId: transactionData.id,
        timestamp: new Date().toISOString()
      });
      // Default to stricter rules on error
      return {
        isFraudulent: true,
        riskScore: 100,
        reason: 'Error in fraud detection system - defaulting to reject',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Analyze behavioral patterns
   */
  async analyzeBehavioralPatterns(transactionData) {
    const patterns = {
      typingSpeed: analyzeTypingSpeed(transactionData.behaviorData),
      navigationPattern: analyzeNavigationPattern(transactionData.behaviorData),
      copyPaste: detectCopyPaste(transactionData.behaviorData),
      timeOnPage: analyzeTimeOnPage(transactionData.behaviorData)
    };

    return {
      riskScore: calculateBehaviorRiskScore(patterns),
      patterns
    };
  }

  /**
   * Analyze device fingerprint
   */
  async analyzeDeviceFingerprint(deviceData) {
    return {
      riskScore: calculateDeviceRiskScore(deviceData),
      isSpoofed: detectDeviceSpoofing(deviceData),
      isEmulator: detectEmulator(deviceData),
      isProxy: detectProxy(deviceData),
      isVPN: detectVPN(deviceData)
    };
  }

  /**
   * Check transaction velocity
   */
  async checkTransactionVelocity(transactionData) {
    const { userId, merchantId, paymentMethod } = transactionData;
    const threshold = RISK_PATTERNS[paymentMethod]?.velocityThreshold || 5;

    const recentTransactions = await getRecentTransactions(userId, merchantId);
    const velocity = calculateTransactionVelocity(recentTransactions);

    return {
      riskScore: velocity > threshold ? 100 : (velocity / threshold) * 100,
      velocity,
      threshold,
      recentTransactions: recentTransactions.length
    };
  }

  /**
   * Calculate final risk score
   */
  calculateRiskScore(scores) {
    const weights = {
      basicScore: 0.2,
      aiScore: 0.3,
      behaviorScore: 0.2,
      deviceScore: 0.15,
      velocityScore: 0.15
    };

    return Object.entries(weights).reduce((total, [key, weight]) => {
      return total + (scores[key] * weight);
    }, 0);
  }

  /**
   * Generate recommendations based on risk analysis
   */
  generateRecommendations(riskScore, transactionData) {
    const recommendations = [];

    if (riskScore > 80) {
      recommendations.push('Block transaction');
      recommendations.push('Flag account for review');
    } else if (riskScore > 60) {
      recommendations.push('Request additional authentication');
      recommendations.push('Apply transaction limits');
    } else if (riskScore > 40) {
      recommendations.push('Monitor account activity');
    }

    return recommendations;
  }

  // Export additional utilities for testing and monitoring
  static utilities = {
    analyzeBehavioralPatterns,
    analyzeDeviceFingerprint,
    checkTransactionVelocity,
    calculateRiskScore,
    generateRecommendations
  };

  /**
   * Learn from fraud detection outcomes to improve future detection
   * 
   * @param {Object} transactionData - Original transaction data
   * @param {Object} detectionResult - Fraud detection result
   * @param {boolean} actualOutcome - Whether the transaction was actually fraudulent
   * @returns {Promise<void>}
   */
  async learnFromFraudOutcome(transactionData, detectionResult, actualOutcome) {
    try {
      // Store the outcome for future reference
      // In a real implementation, this would save to a database
      console.log('Learning from fraud outcome:', {
        transactionId: transactionData.id,
        predictedFraud: detectionResult.isFraudulent,
        actualFraud: actualOutcome,
        timestamp: new Date().toISOString()
      });
      
      // This data would be used to improve future fraud detection
      // by being included in the context for the AI model
    } catch (error) {
      console.error('Learn from fraud outcome error:', error);
    }
  }

  /**
   * Get internet-enhanced information about new fraud patterns
   * 
   * @param {string} fraudType - Type of fraud to research
   * @returns {Promise<Object>} Information about fraud patterns
   */
  async researchFraudPatterns(fraudType) {
    try {
      const prompt = `
        Research the latest information about "${fraudType}" fraud in payment processing.
        Provide details on:
        1. How this fraud typically works
        2. Warning signs to look for
        3. Best practices to prevent it
        4. How it might affect our payment gateway
      `;
      
      const response = await ollamaService.answerQuestion(prompt);
      
      return {
        fraudType,
        information: response.answer,
        sources: response.sources,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Fraud research error:', error);
      return {
        fraudType,
        error: error.message,
        information: "Error researching fraud patterns."
      };
    }
  }

  async detectTransactionFraud(transaction) {
    try {
      const riskScore = await this._calculateRiskScore(transaction);
      const deviceFingerprint = await this._generateDeviceFingerprint(transaction);
      const locationCheck = await this._validateLocation(transaction);
      const velocityCheck = await this._checkVelocity(transaction);
      const patternMatch = await this._checkFraudPatterns(transaction);

      const fraudChecks = {
        riskScore,
        deviceFingerprint,
        locationCheck,
        velocityCheck,
        patternMatch
      };

      if (this._isFraudulent(fraudChecks)) {
        await this._handleFraudulentTransaction(transaction, fraudChecks);
        return true;
      }

      await this._updateTransactionHistory(transaction);
      return false;
    } catch (error) {
      logger.error('Fraud detection error', {
        error: error.message,
        transactionId: transaction.id,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  async _calculateRiskScore(transaction) {
    const factors = {
      amount: this._scoreAmount(transaction.amount),
      location: this._scoreLocation(transaction.ipAddress),
      timeOfDay: this._scoreTimeOfDay(transaction.timestamp),
      userHistory: await this._scoreUserHistory(transaction.userId),
      deviceTrust: await this._scoreDeviceTrust(transaction.deviceId)
    };

    return Object.values(factors).reduce((sum, score) => sum + score, 0) / 5;
  }

  async _generateDeviceFingerprint(transaction) {
    const components = [
      transaction.userAgent,
      transaction.ipAddress,
      transaction.screenResolution,
      transaction.timezone,
      transaction.language
    ];

    return crypto
      .createHash('sha256')
      .update(components.join('|'))
      .digest('hex');
  }

  async _validateLocation(transaction) {
    const geo = geoip.lookup(transaction.ipAddress);
    if (!geo) return { valid: false, reason: 'Location not found' };

    const vpnCheck = await this._checkVPNUsage(transaction.ipAddress);
    if (vpnCheck.isVPN) {
      return { valid: false, reason: 'VPN detected' };
    }

    if (this.highRiskCountries.has(geo.country)) {
      return { valid: false, reason: 'High-risk country' };
    }

    return { valid: true };
  }

  async _checkVelocity(transaction) {
    const key = `velocity:${transaction.userId}`;
    const window = 3600; // 1 hour in seconds
    const maxTransactions = 10;

    const multi = redis.multi();
    multi.zadd(key, Date.now(), transaction.id);
    multi.zremrangebyscore(key, '-inf', Date.now() - window * 1000);
    multi.zcard(key);
    multi.expire(key, window);

    const results = await multi.exec();
    const transactionCount = results[2][1];

    return {
      exceeded: transactionCount > maxTransactions,
      count: transactionCount,
      threshold: maxTransactions
    };
  }

  async _checkFraudPatterns(transaction) {
    const patterns = [];
    
    if (this._isAnomalousAmount(transaction.amount)) {
      patterns.push('anomalous_amount');
    }

    if (await this._isCardTestingAttempt(transaction)) {
      patterns.push('card_testing');
    }

    if (await this._isMultipleFailedAttempts(transaction)) {
      patterns.push('multiple_failures');
    }

    return {
      hasPattern: patterns.length > 0,
      patterns
    };
  }

  async _handleFraudulentTransaction(transaction, fraudChecks) {
    await this._blockTransaction(transaction.id);
    
    await this._alertSecurityTeam({
      transactionId: transaction.id,
      userId: transaction.userId,
      fraudChecks,
      timestamp: new Date().toISOString()
    });

    await this._updateRiskProfile(transaction.userId, fraudChecks);

    logger.warn('Fraudulent transaction detected', {
      transactionId: transaction.id,
      userId: transaction.userId,
      fraudChecks,
      timestamp: new Date().toISOString()
    });
  }

  async _blockTransaction(transactionId) {
    await redis.set(`blocked:${transactionId}`, '1', 'EX', 86400); // Block for 24 hours
  }

  async _alertSecurityTeam(data) {
    // Implement your security alerting mechanism here (email, SMS, Slack, etc.)
    logger.error('SECURITY ALERT: Fraudulent transaction detected', data);
  }

  _isFraudulent(checks) {
    return (
      checks.riskScore > 0.7 ||
      !checks.locationCheck.valid ||
      checks.velocityCheck.exceeded ||
      checks.patternMatch.hasPattern
    );
  }

  async _checkVPNUsage(ipAddress) {
    // Implement VPN detection logic here
    return { isVPN: false }; // Placeholder
  }

  _isAnomalousAmount(amount) {
    // Implement amount anomaly detection
    return amount > 10000; // Example threshold
  }

  async _isCardTestingAttempt(transaction) {
    const key = `cardTest:${transaction.userId}`;
    const attempts = await redis.incr(key);
    await redis.expire(key, 3600); // Expire after 1 hour
    return attempts > 5;
  }

  async _isMultipleFailedAttempts(transaction) {
    const key = `failedAttempts:${transaction.userId}`;
    const attempts = await redis.get(key) || 0;
    return attempts > 3;
  }

  async _updateTransactionHistory(transaction) {
    const key = `txHistory:${transaction.userId}`;
    await redis.lpush(key, JSON.stringify({
      id: transaction.id,
      amount: transaction.amount,
      timestamp: Date.now()
    }));
    await redis.ltrim(key, 0, 99); // Keep last 100 transactions
  }

  async _updateRiskProfile(userId, fraudChecks) {
    const key = `riskProfile:${userId}`;
    await redis.hset(key, {
      lastFraudCheck: Date.now(),
      riskScore: fraudChecks.riskScore,
      fraudPatterns: JSON.stringify(fraudChecks.patternMatch.patterns)
    });
  }
}

export const fraudDetectionService = new FraudDetectionService();

export default {
  enhancedDetectFraud,
  learnFromFraudOutcome,
  researchFraudPatterns
};