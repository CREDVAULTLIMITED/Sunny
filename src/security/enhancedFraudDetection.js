/**
 * Sunny Payment Gateway - Enhanced Fraud Detection with TinyLlama
 * 
 * Provides advanced fraud detection capabilities using AI
 */

import OllamaService from '../core/ai/OllamaService';
import { detectFraud as basicDetectFraud } from './fraudDetection';

// Initialize Ollama service
const ollamaService = new OllamaService();

/**
 * Enhanced fraud detection using TinyLlama
 * 
 * @param {Object} transactionData - Transaction data to analyze
 * @returns {Promise<Object>} Enhanced fraud detection result
 */
export async function enhancedDetectFraud(transactionData) {
  try {
    // Get basic rule-based fraud detection result
    const basicResult = await basicDetectFraud(transactionData);
    
    // Get AI-based fraud detection
    const aiResult = await ollamaService.analyzeFraud(transactionData);
    
    // Combine results (weighted approach)
    const combinedRiskScore = (basicResult.riskScore * 0.4) + (aiResult.riskScore * 0.6);
    const isFraudulent = combinedRiskScore > 75;
    
    // Determine reason based on highest risk factor
    let reason;
    if (aiResult.riskScore > basicResult.riskScore) {
      reason = aiResult.reason;
    } else {
      reason = basicResult.reason;
    }
    
    // If AI detected something the rules didn't, add it
    if (aiResult.isFraudulent && !basicResult.isFraudulent) {
      reason = `AI Detection: ${aiResult.reason}`;
    }
    
    // Return enhanced result
    return {
      isFraudulent,
      riskScore: combinedRiskScore,
      reason,
      aiConfidence: aiResult.riskScore / 100,
      ruleConfidence: basicResult.riskScore / 100,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Enhanced fraud detection error:', error);
    
    // Fallback to basic fraud detection
    const basicResult = await basicDetectFraud(transactionData);
    return {
      ...basicResult,
      aiError: error.message,
      usingFallback: true
    };
  }
}

/**
 * Learn from fraud detection outcomes to improve future detection
 * 
 * @param {Object} transactionData - Original transaction data
 * @param {Object} detectionResult - Fraud detection result
 * @param {boolean} actualOutcome - Whether the transaction was actually fraudulent
 * @returns {Promise<void>}
 */
export async function learnFromFraudOutcome(transactionData, detectionResult, actualOutcome) {
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
export async function researchFraudPatterns(fraudType) {
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

export default {
  enhancedDetectFraud,
  learnFromFraudOutcome,
  researchFraudPatterns
};