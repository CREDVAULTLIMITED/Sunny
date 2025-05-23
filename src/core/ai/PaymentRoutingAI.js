/**
 * Sunny Payment Gateway - Payment Routing AI
 * 
 * AI-driven payment routing and optimization engine
 */

class PaymentRoutingAI {
  constructor(config = {}) {
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;
    
    // Initialize model weights
    this.modelWeights = {
      countryFactors: {},
      methodSuccessRates: {},
      costFactors: {},
      timeFactors: {},
      userPreferences: {}
    };
    
    // Transaction history for learning
    this.transactionHistory = [];
    
    // Maximum history size to prevent memory issues
    this.maxHistorySize = config.maxHistorySize || 10000;
    
    // Learning rate for model updates
    this.learningRate = config.learningRate || 0.01;
    
    // Load initial model if available
    this.loadModel();
  }

  /**
   * Predict the optimal payment method for a transaction
   * 
   * @param {Object} transactionData - Transaction data
   * @returns {Promise<Object>} Prediction result with scores for each method
   */
  async predictOptimalMethod(transactionData) {
    try {
      const {
        amount,
        currency,
        country,
        customer = {},
        availableMethods = [],
        metadata = {}
      } = transactionData;
      
      // If no available methods, return empty result
      if (!availableMethods.length) {
        return { 
          predictedMethod: null,
          scores: {},
          confidence: 0
        };
      }
      
      // Calculate scores for each available method
      const scores = {};
      let highestScore = 0;
      let predictedMethod = availableMethods[0];
      
      for (const method of availableMethods) {
        // Calculate base score
        let score = 0.5; // Start with neutral score
        
        // Apply country factors
        const countryFactor = this.modelWeights.countryFactors[`${country}:${method}`] || 0;
        score += countryFactor;
        
        // Apply success rate factor
        const successRateFactor = this.modelWeights.methodSuccessRates[method] || 0;
        score += successRateFactor;
        
        // Apply cost factor (higher for larger amounts)
        const costFactor = this.modelWeights.costFactors[method] || 0;
        score += costFactor * (1 - Math.min(amount / 10000, 1)); // Normalize amount
        
        // Apply time factor (for urgent transactions)
        const urgency = metadata.urgent ? 1 : 0;
        const timeFactor = this.modelWeights.timeFactors[method] || 0;
        score += timeFactor * urgency;
        
        // Apply user preferences if customer has history
        if (customer.id) {
          const userPreference = this.modelWeights.userPreferences[`${customer.id}:${method}`] || 0;
          score += userPreference;
        }
        
        // Store score
        scores[method] = Math.max(0, Math.min(1, score)); // Clamp between 0 and 1
        
        // Update highest score
        if (scores[method] > highestScore) {
          highestScore = scores[method];
          predictedMethod = method;
        }
      }
      
      // Calculate confidence as difference between top score and average of others
      const otherScores = Object.values(scores).filter(s => s !== highestScore);
      const avgOtherScore = otherScores.length ? otherScores.reduce((a, b) => a + b, 0) / otherScores.length : 0;
      const confidence = Math.min(1, Math.max(0, highestScore - avgOtherScore));
      
      return {
        predictedMethod,
        scores,
        confidence
      };
    } catch (error) {
      console.error('Predict optimal method error:', error);
      
      // Fallback to first available method
      return {
        predictedMethod: transactionData.availableMethods[0] || null,
        scores: {},
        confidence: 0
      };
    }
  }

  /**
   * Learn from transaction result
   * 
   * @param {Object} transactionData - Transaction data
   * @param {string} methodUsed - Payment method used
   * @param {boolean} success - Whether the transaction was successful
   * @param {Object} performance - Performance metrics (time, cost, etc.)
   * @returns {Promise<void>}
   */
  async learnFromTransaction(transactionData, methodUsed, success, performance = {}) {
    try {
      const {
        amount,
        currency,
        country,
        customer = {},
        metadata = {}
      } = transactionData;
      
      // Add to transaction history with enhanced metrics
      this.transactionHistory.push({
        timestamp: new Date().toISOString(),
        transactionData,
        methodUsed,
        success,
        performance: {
          ...performance,
          amountInBaseCurrency: amount, // Would be converted in production
          processingTime: performance.processingTime || null,
          errorCode: performance.errorCode || null
        }
      });
      
      // Trim history if needed
      if (this.transactionHistory.length > this.maxHistorySize) {
        this.transactionHistory = this.transactionHistory.slice(-this.maxHistorySize);
      }
      
      // Calculate success factor (-1 to 1)
      const successFactor = success ? 1 : -1;
      
      // Update country factor with decay for old data
      const countryKey = `${country}:${methodUsed}`;
      const oldCountryFactor = this.modelWeights.countryFactors[countryKey] || 0;
      this.modelWeights.countryFactors[countryKey] = 
        (oldCountryFactor * 0.95) + // Apply 5% decay to old data
        (this.learningRate * successFactor);
      
      // Update success rate factor with volume-based weighting
      const oldSuccessRate = this.modelWeights.methodSuccessRates[methodUsed] || 0;
      const methodTransactions = this.transactionHistory.filter(t => t.methodUsed === methodUsed).length;
      const volumeWeight = Math.min(methodTransactions / 100, 1); // Scale with volume up to 100 transactions
      this.modelWeights.methodSuccessRates[methodUsed] = 
        (oldSuccessRate * (1 - this.learningRate * volumeWeight)) +
        (successFactor * this.learningRate * volumeWeight);
      
      // Update cost factor if available
      if (performance.cost !== undefined) {
        const costEfficiency = 1 - Math.min(performance.cost / amount, 1); // Higher is better
        const oldCostFactor = this.modelWeights.costFactors[methodUsed] || 0;
        this.modelWeights.costFactors[methodUsed] = 
          (oldCostFactor * 0.9) + // Apply 10% decay to old cost data
          (this.learningRate * costEfficiency);
      }
      
      // Update time factor if available
      if (performance.processingTime !== undefined) {
        const timeEfficiency = Math.max(0, 1 - performance.processingTime / 5000); // Normalize to 0-1
        const oldTimeFactor = this.modelWeights.timeFactors[methodUsed] || 0;
        this.modelWeights.timeFactors[methodUsed] = 
          (oldTimeFactor * 0.95) + // Apply 5% decay to old timing data
          (this.learningRate * timeEfficiency);
      }
      
      // Update user preference with higher weight for recurring customers
      if (customer.id) {
        const userKey = `${customer.id}:${methodUsed}`;
        const oldPreference = this.modelWeights.userPreferences[userKey] || 0;
        const customerTransactions = this.transactionHistory.filter(t => 
          t.transactionData.customer?.id === customer.id
        ).length;
        const customerWeight = Math.min(customerTransactions / 10, 1); // Scale with customer history up to 10 transactions
        
        this.modelWeights.userPreferences[userKey] = 
          (oldPreference * (1 - this.learningRate * customerWeight)) +
          (successFactor * this.learningRate * customerWeight * 1.5); // 50% higher weight for user preferences
      }
      
      // Save updated model
      this.saveModel();
    } catch (error) {
      console.error('Learn from transaction error:', error);
      // Log error but don't throw to avoid disrupting payment flow
    }
  }

  /**
   * Get insights from transaction history
   * 
   * @param {Object} filters - Filters for insights
   * @returns {Promise<Object>} Insights data
   */
  async getInsights(filters = {}) {
    try {
      const {
        startDate,
        endDate,
        country,
        currency,
        method
      } = filters;
      
      // Filter transactions based on criteria
      let filteredTransactions = [...this.transactionHistory];
      
      if (startDate) {
        filteredTransactions = filteredTransactions.filter(t => 
          new Date(t.timestamp) >= new Date(startDate)
        );
      }
      
      if (endDate) {
        filteredTransactions = filteredTransactions.filter(t => 
          new Date(t.timestamp) <= new Date(endDate)
        );
      }
      
      if (country) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.transactionData.country === country
        );
      }
      
      if (currency) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.transactionData.currency === currency
        );
      }
      
      if (method) {
        filteredTransactions = filteredTransactions.filter(t => 
          t.methodUsed === method
        );
      }
      
      // Calculate success rates by method
      const methodStats = {};
      
      filteredTransactions.forEach(t => {
        if (!methodStats[t.methodUsed]) {
          methodStats[t.methodUsed] = {
            total: 0,
            success: 0,
            avgAmount: 0,
            totalAmount: 0,
            avgProcessingTime: 0
          };
        }
        
        methodStats[t.methodUsed].total++;
        
        if (t.success) {
          methodStats[t.methodUsed].success++;
        }
        
        methodStats[t.methodUsed].totalAmount += t.transactionData.amount || 0;
        
        if (t.performance.processingTime) {
          methodStats[t.methodUsed].avgProcessingTime = 
            (methodStats[t.methodUsed].avgProcessingTime * (methodStats[t.methodUsed].total - 1) + 
            t.performance.processingTime) / methodStats[t.methodUsed].total;
        }
      });
      
      // Calculate averages
      Object.keys(methodStats).forEach(method => {
        methodStats[method].successRate = methodStats[method].success / methodStats[method].total;
        methodStats[method].avgAmount = methodStats[method].totalAmount / methodStats[method].total;
      });
      
      // Calculate country preferences
      const countryPreferences = {};
      
      Object.keys(this.modelWeights.countryFactors).forEach(key => {
        const [country, method] = key.split(':');
        
        if (!countryPreferences[country]) {
          countryPreferences[country] = {};
        }
        
        countryPreferences[country][method] = this.modelWeights.countryFactors[key];
      });
      
      return {
        methodStats,
        countryPreferences,
        totalTransactions: filteredTransactions.length,
        successfulTransactions: filteredTransactions.filter(t => t.success).length,
        overallSuccessRate: filteredTransactions.length > 0 
          ? filteredTransactions.filter(t => t.success).length / filteredTransactions.length 
          : 0
      };
    } catch (error) {
      console.error('Get insights error:', error);
      return {
        methodStats: {},
        countryPreferences: {},
        totalTransactions: 0,
        successfulTransactions: 0,
        overallSuccessRate: 0
      };
    }
  }

  /**
   * Save model to persistent storage
   * 
   * @private
   */
  saveModel() {
    try {
      // In a real implementation, this would save to a database or file
      // For this example, we'll just log that the model was saved
      console.log('Model saved:', new Date().toISOString());
    } catch (error) {
      console.error('Save model error:', error);
    }
  }

  /**
   * Load model from persistent storage
   * 
   * @private
   */
  loadModel() {
    try {
      // In a real implementation, this would load from a database or file
      // For this example, we'll initialize with some reasonable defaults
      
      // Default country preferences
      this.modelWeights.countryFactors = {
        'US:card': 0.2,
        'US:bank_transfer': 0.1,
        'IN:upi': 0.3,
        'IN:card': 0.1,
        'KE:mobile_money': 0.3,
        'KE:card': 0.05,
        'GB:card': 0.2,
        'GB:bank_transfer': 0.15,
        'CN:alipay': 0.3,
        'CN:wechat': 0.25
      };
      
      // Default method success rates
      this.modelWeights.methodSuccessRates = {
        'card': 0.15,
        'bank_transfer': 0.1,
        'mobile_money': 0.12,
        'crypto': 0.05,
        'upi': 0.15,
        'alipay': 0.15,
        'wechat': 0.15
      };
      
      // Default cost factors
      this.modelWeights.costFactors = {
        'card': -0.05, // Cards typically have higher fees
        'bank_transfer': 0.1,
        'mobile_money': 0.05,
        'crypto': -0.1, // Crypto can have high network fees
        'upi': 0.15,
        'alipay': 0.05,
        'wechat': 0.05
      };
      
      // Default time factors
      this.modelWeights.timeFactors = {
        'card': 0.1, // Cards are typically fast
        'bank_transfer': -0.1, // Bank transfers can be slow
        'mobile_money': 0.05,
        'crypto': -0.05, // Crypto can be slow due to confirmations
        'upi': 0.15, // UPI is very fast
        'alipay': 0.1,
        'wechat': 0.1
      };
      
      console.log('Model loaded with defaults');
    } catch (error) {
      console.error('Load model error:', error);
    }
  }
}

export default PaymentRoutingAI;