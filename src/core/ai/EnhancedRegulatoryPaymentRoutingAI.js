/**
 * Enhanced Regulatory Payment Routing AI for Sunny Payment Gateway
 * 
 * This AI extends the standard payment routing AI with regulatory compliance
 * optimization and tax efficiency features. It integrates with RegionalAnalytics
 * and RegulatoryComplianceEngine to make intelligent routing decisions that
 * minimize regulatory overhead and optimize tax efficiency.
 */

import EnhancedPaymentRoutingAI from './EnhancedPaymentRoutingAI.js';
import RegulatoryComplianceEngine from '../compliance/RegulatoryComplianceEngine.js';
import RegionalAnalytics from '../analytics/regionalAnalytics.js';
import { PAYMENT_METHODS } from '../constants.js';

class EnhancedRegulatoryPaymentRoutingAI extends EnhancedPaymentRoutingAI {
  constructor(config = {}) {
    // Call parent constructor
    super(config);
    
    // Initialize regulatory compliance engine
    this.regulatoryEngine = new RegulatoryComplianceEngine(config.regulatoryEngine || {});
    
    // Configure regulatory optimization
    this.enableRegulatoryOptimization = config.enableRegulatoryOptimization !== undefined ? 
      config.enableRegulatoryOptimization : true;
    
    // Configure tax optimization
    this.enableTaxOptimization = config.enableTaxOptimization !== undefined ? 
      config.enableTaxOptimization : true;
    
    // Weights for different optimization factors
    this.regulatoryWeight = config.regulatoryWeight || 0.3;
    this.taxWeight = config.taxWeight || 0.2;
    this.successRateWeight = config.successRateWeight || 0.3;
    this.costWeight = config.costWeight || 0.2;
    
    // Initialize decision tracking for explainability
    this.decisionHistory = [];
    this.maxDecisionHistory = config.maxDecisionHistory || 1000;
    
    // Regulatory analytics cache
    this.regulatoryScoreCache = {};
    this.regulatoryScoreTTL = config.regulatoryScoreTTL || 24 * 60 * 60 * 1000; // 24 hours
    
    console.log('Enhanced Regulatory Payment Routing AI initialized');
  }
  
  /**
   * Predict the optimal payment method including regulatory and tax considerations
   * 
   * @param {Object} transactionData - Transaction data
   * @returns {Promise<Object>} - Prediction result with regulatory optimization
   */
  async predictOptimalMethod(transactionData) {
    try {
      // Check if regulatory optimization is enabled
      if (!this.enableRegulatoryOptimization && !this.enableTaxOptimization) {
        // If not enabled, fall back to parent class implementation
        return await super.predictOptimalMethod(transactionData);
      }
      
      // Ensure transaction data has required fields
      const enhancedData = this._enhanceTransactionData(transactionData);
      
      // Get parent class prediction for comparison
      const baselinePrediction = await super.predictOptimalMethod(enhancedData);
      
      // Get available payment methods
      const availableMethods = enhancedData.availableMethods || 
        Object.values(PAYMENT_METHODS);
      
      // Calculate regulatory optimized route
      let regulatoryPrediction;
      
      try {
        regulatoryPrediction = await this.regulatoryEngine.calculateOptimalRoute(
          enhancedData,
          availableMethods
        );
      } catch (regulatoryError) {
        console.error('Error in regulatory optimization:', regulatoryError);
        // Fall back to baseline prediction on error
        regulatoryPrediction = {
          recommendedMethod: baselinePrediction.predictedMethod,
          optimized: false,
          reason: 'Regulatory optimization error: ' + regulatoryError.message
        };
      }
      
      // Determine final recommendation based on weighted approach
      const finalRecommendation = this._calculateFinalRecommendation(
        baselinePrediction,
        regulatoryPrediction,
        enhancedData
      );
      
      // Store decision for explainability
      this._storeDecision(
        finalRecommendation,
        baselinePrediction,
        regulatoryPrediction,
        enhancedData
      );
      
      return finalRecommendation;
    } catch (error) {
      console.error('Error in regulatory payment routing:', error);
      
      // Fall back to parent class implementation on error
      return await super.predictOptimalMethod(transactionData);
    }
  }
  
  /**
   * Enhance transaction data with additional information needed for routing
   * 
   * @private
   * @param {Object} transactionData - Original transaction data
   * @returns {Object} - Enhanced transaction data
   */
  _enhanceTransactionData(transactionData) {
    const enhancedData = { ...transactionData };
    
    // Ensure we have a source region
    if (!enhancedData.sourceRegion && enhancedData.country) {
      enhancedData.sourceRegion = enhancedData.country;
    }
    
    // Ensure we have a destination region
    if (!enhancedData.destinationRegion && enhancedData.recipientCountry) {
      enhancedData.destinationRegion = enhancedData.recipientCountry;
    } else if (!enhancedData.destinationRegion && enhancedData.recipientLocation) {
      enhancedData.destinationRegion = enhancedData.recipientLocation;
    } else if (!enhancedData.destinationRegion && enhancedData.sourceRegion) {
      // Default to same region if not specified
      enhancedData.destinationRegion = enhancedData.sourceRegion;
    }
    
    // Add cross-border flag
    enhancedData.isCrossBorder = 
      enhancedData.sourceRegion !== enhancedData.destinationRegion &&
      enhancedData.sourceRegion && 
      enhancedData.destinationRegion &&
      enhancedData.sourceRegion !== 'unknown' &&
      enhancedData.destinationRegion !== 'unknown';
    
    // Ensure we have available methods
    if (!enhancedData.availableMethods || enhancedData.availableMethods.length === 0) {
      enhancedData.availableMethods = Object.values(PAYMENT_METHODS);
    }
    
    return enhancedData;
  }
  
  /**
   * Calculate final recommendation combining baseline and regulatory predictions
   * 
   * @private
   * @param {Object} baselinePrediction - Prediction from parent class
   * @param {Object} regulatoryPrediction - Prediction from regulatory engine
   * @param {Object} transactionData - Transaction data
   * @returns {Object} - Final weighted recommendation
   */
  _calculateFinalRecommendation(baselinePrediction, regulatoryPrediction, transactionData) {
    // Initialize combined scores
    const combinedScores = {};
    const availableMethods = transactionData.availableMethods || Object.values(PAYMENT_METHODS);
    
    // Add all available methods to combined scores
    for (const method of availableMethods) {
      combinedScores[method] = 0;
    }
    
    // Add baseline prediction scores
    if (baselinePrediction.scores) {
      for (const method in baselinePrediction.scores) {
        const baselineScore = baselinePrediction.scores[method] || 0;
        combinedScores[method] += baselineScore * this.successRateWeight;
        
        // Add cost efficiency if available
        if (baselinePrediction.costScores && baselinePrediction.costScores[method] !== undefined) {
          const costScore = 1 - baselinePrediction.costScores[method];
          combinedScores[method] += costScore * this.costWeight;
        }
      }
    } else {
      // If no detailed scores, boost the predicted method
      combinedScores[baselinePrediction.predictedMethod] += 
        (this.successRateWeight + this.costWeight);
    }
    
    // Add regulatory prediction scores
    if (regulatoryPrediction.scores) {
      for (const method in regulatoryPrediction.scores) {
        const regScores = regulatoryPrediction.scores[method];
        
        // Add regulatory efficiency score
        if (regScores.regulatory !== undefined) {
          combinedScores[method] += regScores.regulatory * this.regulatoryWeight;
        }
        
        // Add tax efficiency score
        if (regScores.tax !== undefined) {
          combinedScores[method] += regScores.tax * this.taxWeight;
        }
      }
    } else if (regulatoryPrediction.optimized && regulatoryPrediction.recommendedMethod) {
      // If no detailed scores but we have a recommendation, boost it
      combinedScores[regulatoryPrediction.recommendedMethod] += 
        (this.regulatoryWeight + this.taxWeight);
    }
    
    // Consider user preferences if available
    const userPreferredMethod = transactionData.userPreferredMethod;
    if (userPreferredMethod && combinedScores[userPreferredMethod] !== undefined) {
      combinedScores[userPreferredMethod] *= 1.2; // 20% boost for user preference
    }

    // Find method with highest combined score
    let bestMethod = availableMethods[0];
    let bestScore = combinedScores[bestMethod] || 0;
    
    for (const method of availableMethods) {
      const score = combinedScores[method] || 0;
      if (score > bestScore) {
        bestScore = score;
        bestMethod = method;
      }
    }
    
    // Generate explanation for the decision
    const reasoning = this._generateReasoning(
      bestMethod,
      baselinePrediction,
      regulatoryPrediction,
      combinedScores
    );
    
    // Check if this was a regulatory override of baseline
    const baselineOverride = 
      bestMethod !== baselinePrediction.predictedMethod &&
      combinedScores[bestMethod] > combinedScores[baselinePrediction.predictedMethod];
    
    // Check if this was overriding user preference
    const userPreferenceOverride = 
      userPreferredMethod && 
      bestMethod !== userPreferredMethod;
    
    return {
      predictedMethod: bestMethod,
      scores: combinedScores,
      confidence: bestScore,
      reasoning,
      regulatoryFactors: {
        considered: this.enableRegulatoryOptimization,
        optimized: regulatoryPrediction.optimized || false,
        recommendation: regulatoryPrediction.recommendedMethod,
        efficiency: regulatoryPrediction.regulatoryEfficiency,
        taxEfficiency: regulatoryPrediction.taxEfficiency,
        regulatoryOverride: baselineOverride,
        userPreferenceOverride
      }
    };
  }
  
  /**
   * Generate reasoning for the final recommendation
   * 
   * @private
   * @param {string} bestMethod - Recommended payment method
   * @param {Object} baselinePrediction - Prediction from parent class
   * @param {Object} regulatoryPrediction - Prediction from regulatory engine
   * @param {Object} combinedScores - Combined scores for all methods
   * @returns {string} - Reasoning for recommendation
   */
  _generateReasoning(bestMethod, baselinePrediction, regulatoryPrediction, combinedScores) {
    // Start with method name
    let reasoning = `${bestMethod} is recommended based on `;
    
    // List contributing factors in order of impact
    const factors = [];
    
    // Check if baseline prediction was a strong factor
    if (baselinePrediction.predictedMethod === bestMethod) {
      factors.push({
        factor: "historical success rate",
        weight: this.successRateWeight,
        description: `high success probability (${Math.round((baselinePrediction.confidence || 0.7) * 100)}%)`
      });
      
      // Add cost if it was a factor
      if (baselinePrediction.costScores && baselinePrediction.costScores[bestMethod] !== undefined) {
        factors.push({
          factor: "cost efficiency",
          weight: this.costWeight,
          description: `competitive processing fees (${Math.round((1 - baselinePrediction.costScores[bestMethod]) * 100)}% efficiency)`
        });
      }
    }
    
    // Check if regulatory prediction was a strong factor
    if (regulatoryPrediction.recommendedMethod === bestMethod && regulatoryPrediction.optimized) {
      // Add regulatory efficiency
      factors.push({
        factor: "regulatory efficiency",
        weight: this.regulatoryWeight,
        description: `minimal regulatory overhead (${Math.round((regulatoryPrediction.regulatoryEfficiency || 0.7) * 100)}% efficiency)`
      });
      
      // Add tax efficiency
      factors.push({
        factor: "tax efficiency",
        weight: this.taxWeight,
        description: `tax optimization (${Math.round((regulatoryPrediction.taxEfficiency || 0.6) * 100)}% efficiency)`
      });
      
      // Add cross-border note if applicable
      if (regulatoryPrediction.isCrossBorder) {
        factors.push({
          factor: "cross-border optimization",
          weight: 0.1,
          description: "cross-border payment optimization"
        });
      }
    }
    
    // Sort factors by weight (descending)
    factors.sort((a, b) => b.weight - a.weight);
    
    // Convert factors to text
    if (factors.length > 0) {
      reasoning += factors.map(f => f.description).join(", ");
    } else {
      // Generic explanation if no specific factors stand out
      reasoning += "balanced performance across multiple factors";
    }
    
    return reasoning;
  }
  
  /**
   * Store decision history for explainability and auditing
   * 
   * @private
   * @param {Object} finalRecommendation - Final recommendation
   * @param {Object} baselinePrediction - Prediction from parent class
   * @param {Object} regulatoryPrediction - Prediction from regulatory engine
   * @param {Object} transactionData - Transaction data
   */
  _storeDecision(finalRecommendation, baselinePrediction, regulatoryPrediction, transactionData) {
    // Add decision to history
    this.decisionHistory.push({
      timestamp: new Date().toISOString(),
      transactionId: transactionData.id || `txn-${Date.now()}`,
      finalRecommendation: finalRecommendation.predictedMethod,
      baselineRecommendation: baselinePrediction.predictedMethod,
      regulatoryRecommendation: regulatoryPrediction.recommendedMethod,
      reasoning: finalRecommendation.reasoning,
      sourceRegion: transactionData.sourceRegion,
      destinationRegion: transactionData.destinationRegion,
      amount: transactionData.amount,
      currency: transactionData.currency,
      isCrossBorder: transactionData.isCrossBorder || false,
      regulatoryFactors: finalRecommendation.regulatoryFactors,
      baselineFactors: finalRecommendation.baselineFactors
    });
    
    // Trim decision history if exceeds max limit
    if (this.decisionHistory.length > this.maxDecisionHistory) {
      this.decisionHistory.shift(); // Remove oldest entry
    }
  }
}

export default EnhancedRegulatoryPaymentRoutingAI;

