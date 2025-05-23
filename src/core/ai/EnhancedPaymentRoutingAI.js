/**
 * Sunny Payment Gateway - Enhanced Payment Routing AI
 * 
 * AI-driven payment routing and optimization engine using TinyLlama
 */

import PaymentRoutingAI from './PaymentRoutingAI.js';
import OllamaService from './OllamaService.js';

class EnhancedPaymentRoutingAI extends PaymentRoutingAI {
  constructor(config = {}) {
    // Call parent constructor
    super(config);
    
    // Initialize Ollama service
    this.ollamaService = new OllamaService({
      modelName: config.modelName || 'tinyllama',
      apiUrl: config.ollamaApiUrl || 'http://localhost:11434/api',
      systemPrompt: config.systemPrompt || 
        'You are a payment routing AI for Sunny Payment Gateway. Your job is to analyze transaction data and recommend the optimal payment method.'
    });
    
    // Use AI for predictions
    this.useAI = config.useAI !== undefined ? config.useAI : true;
    
    // Web learning for payment methods
    this.webLearningEnabled = config.webLearningEnabled !== undefined ? config.webLearningEnabled : true;
    
    // Cache for country-specific payment information
    this.countryInfoCache = {};
  }

  /**
   * Predict the optimal payment method for a transaction with AI enhancement
   * 
   * @param {Object} transactionData - Transaction data
   * @returns {Promise<Object>} Prediction result with scores for each method
   */
  async predictOptimalMethod(transactionData) {
    try {
      // If AI is enabled, use it for prediction
      if (this.useAI) {
        try {
          // Get country-specific payment information if needed
          if (this.webLearningEnabled && 
              transactionData.country && 
              !this.countryInfoCache[transactionData.country]) {
            await this._fetchCountryPaymentInfo(transactionData.country);
          }
          
          // Add country info to transaction data if available
          const enhancedData = { ...transactionData };
          if (this.countryInfoCache[transactionData.country]) {
            enhancedData.countryInfo = this.countryInfoCache[transactionData.country];
          }
          
          // Get AI prediction
          const aiResult = await this.ollamaService.analyzePaymentRouting(enhancedData);
          
          // Convert AI result to expected format
          if (aiResult.predictedMethod) {
            const scores = {};
            
            // Set the recommended method with the confidence score
            scores[aiResult.predictedMethod] = aiResult.confidence || 0.8;
            
            // Set lower scores for other methods
            transactionData.availableMethods.forEach(method => {
              if (method !== aiResult.predictedMethod) {
                scores[method] = Math.max(0, Math.min(1, (aiResult.confidence || 0.8) * 0.5));
              }
            });
            
            return {
              predictedMethod: aiResult.predictedMethod,
              scores,
              confidence: aiResult.confidence || 0.8,
              reasoning: aiResult.reasoning || "Recommended by AI model"
            };
          }
        } catch (aiError) {
          console.error('AI prediction error, falling back to rule-based:', aiError);
          // Fall back to rule-based approach
        }
      }
      
      // Fallback to parent class implementation (rule-based)
      return await super.predictOptimalMethod(transactionData);
    } catch (error) {
      console.error('Enhanced predict optimal method error:', error);
      
      // Fallback to parent class implementation
      return await super.predictOptimalMethod(transactionData);
    }
  }

  /**
   * Fetch country-specific payment information from the internet
   * 
   * @private
   * @param {string} country - Country code
   * @returns {Promise<void>}
   */
  async _fetchCountryPaymentInfo(country) {
    try {
      const prompt = `
        What are the most popular and efficient payment methods in ${country}?
        Please provide information about:
        1. The most commonly used payment methods
        2. Any country-specific payment systems
        3. Typical transaction fees
        4. Processing times
        
        Format your response as a concise summary.
      `;
      
      const response = await this.ollamaService.answerQuestion(prompt);
      
      // Cache the result
      this.countryInfoCache[country] = {
        info: response.answer,
        timestamp: new Date().toISOString()
      };
      
      console.log(`Fetched payment information for ${country}`);
    } catch (error) {
      console.error(`Error fetching country payment info for ${country}:`, error);
    }
  }

  /**
   * Get insights with AI enhancement
   * 
   * @param {Object} filters - Filters for insights
   * @returns {Promise<Object>} Enhanced insights data
   */
  async getInsights(filters = {}) {
    // Get basic insights from parent class
    const basicInsights = await super.getInsights(filters);
    
    try {
      // If AI is enabled, enhance insights
      if (this.useAI) {
        // Format transaction data for AI analysis
        const transactionSummary = this._formatTransactionSummary(
          this.transactionHistory.slice(-100), 
          filters
        );
        
        // Get AI analysis
        const prompt = `
          Analyze this payment transaction data and provide insights:
          
          ${transactionSummary}
          
          Please provide:
          1. Key trends you notice
          2. Recommendations for optimizing payment routing
          3. Any anomalies or patterns worth investigating
        `;
        
        const response = await this.ollamaService.generateCompletion(prompt);
        
        // Return enhanced insights
        return {
          ...basicInsights,
          aiAnalysis: response.response,
          enhanced: true
        };
      }
      
      return basicInsights;
    } catch (error) {
      console.error('Enhanced insights error:', error);
      return basicInsights;
    }
  }

  /**
   * Format transaction summary for AI analysis
   * 
   * @private
   * @param {Array} transactions - Transaction history
   * @param {Object} filters - Filters applied
   * @returns {string} Formatted transaction summary
   */
  _formatTransactionSummary(transactions, filters) {
    // Group transactions by method
    const methodGroups = {};
    
    transactions.forEach(t => {
      if (!methodGroups[t.methodUsed]) {
        methodGroups[t.methodUsed] = {
          total: 0,
          success: 0,
          amount: 0
        };
      }
      
      methodGroups[t.methodUsed].total++;
      if (t.success) methodGroups[t.methodUsed].success++;
      methodGroups[t.methodUsed].amount += t.transactionData.amount || 0;
    });
    
    // Format summary
    let summary = `Transaction Summary (${transactions.length} transactions):\n\n`;
    
    Object.keys(methodGroups).forEach(method => {
      const group = methodGroups[method];
      const successRate = group.total > 0 ? (group.success / group.total * 100).toFixed(1) : 0;
      
      summary += `${method}: ${group.total} transactions, ${successRate}% success rate, total amount: ${group.amount}\n`;
    });
    
    // Add filter information
    if (Object.keys(filters).length > 0) {
      summary += `\nFilters applied: ${JSON.stringify(filters)}\n`;
    }
    
    return summary;
  }
}

export default EnhancedPaymentRoutingAI;