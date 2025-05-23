/**
 * Sunny Payment Gateway - Payment Orchestrator Extensions
 * 
 * Additional methods for the PaymentOrchestrator class
 */

// Routing strategy constants
export const ROUTING_STRATEGIES = {
  CHEAPEST: 'cheapest',
  FASTEST: 'fastest',
  RELIABLE: 'reliable',
  USER_CHOICE: 'user_choice'
};

/**
 * Process a multi-method payment (try multiple methods in sequence)
 * 
 * @param {Object} paymentData - Payment information
 * @param {Array<string>} paymentData.methods - Payment methods to try in order
 * @returns {Promise<Object>} Transaction result
 */
export async function processMultiMethodPayment(paymentData) {
  try {
    const { methods, ...basePaymentData } = paymentData;
    
    if (!methods || !Array.isArray(methods) || methods.length === 0) {
      return {
        success: false,
        error: this.ERROR_CODES.VALIDATION_ERROR,
        message: 'At least one payment method is required'
      };
    }
    
    // Try each method in sequence
    let lastError = null;
    const attemptedMethods = [];
    
    for (const method of methods) {
      try {
        attemptedMethods.push(method);
        
        const result = await this.processPayment({
          ...basePaymentData,
          paymentMethod: method
        });
        
        if (result.success) {
          return {
            ...result,
            methodUsed: method,
            attemptedMethods
          };
        }
        
        lastError = result;
      } catch (error) {
        lastError = {
          success: false,
          error: this.ERROR_CODES.PAYMENT_METHOD_ERROR,
          message: `Error with payment method ${method}: ${error.message}`
        };
      }
    }
    
    // If we get here, all methods failed
    return {
      success: false,
      error: this.ERROR_CODES.ALL_PAYMENT_METHODS_FAILED,
      message: 'All payment methods failed',
      lastError,
      attemptedMethods
    };
  } catch (error) {
    console.error('Multi-method payment error:', error);
    return {
      success: false,
      error: this.ERROR_CODES.ORCHESTRATION_ERROR,
      message: error.message || 'Failed to process multi-method payment'
    };
  }
}

/**
 * Process a split payment (multiple recipients)
 * 
 * @param {Object} splitPaymentData - Split payment information
 * @param {Array<Object>} splitPaymentData.recipients - Recipients and amounts
 * @returns {Promise<Object>} Transaction result
 */
export async function processSplitPayment(splitPaymentData) {
  try {
    const { recipients, ...basePaymentData } = splitPaymentData;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return {
        success: false,
        error: this.ERROR_CODES.VALIDATION_ERROR,
        message: 'At least one recipient is required'
      };
    }
    
    // Process the main payment first
    const mainPayment = await this.processPayment(basePaymentData);
    
    if (!mainPayment.success) {
      return mainPayment;
    }
    
    // Process each split
    const splitResults = await Promise.all(recipients.map(async (recipient) => {
      try {
        const result = await this.processPayment({
          ...basePaymentData,
          amount: recipient.amount,
          recipientId: recipient.recipientId,
          recipientAlias: recipient.recipientAlias,
          aliasType: recipient.aliasType,
          description: `Split payment: ${recipient.description || 'No description'}`
        });
        
        return {
          ...result,
          recipientId: recipient.recipientId,
          recipientAlias: recipient.recipientAlias,
          amount: recipient.amount
        };
      } catch (error) {
        return {
          success: false,
          error: this.ERROR_CODES.SPLIT_PAYMENT_ERROR,
          message: `Error processing split for recipient: ${error.message}`,
          recipientId: recipient.recipientId,
          recipientAlias: recipient.recipientAlias,
          amount: recipient.amount
        };
      }
    }));
    
    return {
      success: true,
      mainPayment,
      splits: splitResults,
      successfulSplits: splitResults.filter(r => r.success).length,
      failedSplits: splitResults.filter(r => !r.success).length,
      totalSplits: splitResults.length
    };
  } catch (error) {
    console.error('Split payment error:', error);
    return {
      success: false,
      error: this.ERROR_CODES.SPLIT_PAYMENT_ERROR,
      message: error.message || 'Failed to process split payment'
    };
  }
}

/**
 * Process payment with smart routing
 * 
 * @param {Object} paymentData - Payment information
 * @param {string} [paymentData.routingStrategy] - Routing strategy to use
 * @param {string} [paymentData.userPreferredMethod] - User's preferred payment method
 * @returns {Promise<Object>} Transaction result
 */
export async function processPaymentWithSmartRouting(paymentData) {
  try {
    const { routingStrategy = ROUTING_STRATEGIES.RELIABLE, userPreferredMethod, ...basePaymentData } = paymentData;
    
    // Get available payment methods for this transaction
    const availableMethods = await this.getAvailablePaymentMethods(basePaymentData);
    
    if (!availableMethods || availableMethods.length === 0) {
      return {
        success: false,
        error: this.ERROR_CODES.NO_AVAILABLE_METHODS,
        message: 'No available payment methods for this transaction'
      };
    }
    
    // Get AI routing recommendation
    const routingRecommendation = await this.routingAI.predictOptimalMethod({
      ...basePaymentData,
      availableMethods,
      userPreferredMethod
    });

    // Analyze each route
    const routes = await Promise.all(
      availableMethods.map(method => this.analyzePaymentRoute(method, basePaymentData))
    );
    
    // Filter valid routes (within limits)
    const validRoutes = routes.filter(route => 
      route.limits.min <= basePaymentData.amount && 
      basePaymentData.amount <= route.limits.max
    );
    
    if (validRoutes.length === 0) {
      return {
        success: false,
        error: this.ERROR_CODES.NO_VALID_ROUTES,
        message: 'No valid payment routes for this transaction amount'
      };
    }
    
    // Select the best route based on strategy and AI recommendation
    let selectedRoute;
    
    switch(routingStrategy) {
      case ROUTING_STRATEGIES.CHEAPEST:
        selectedRoute = validRoutes.sort((a, b) => a.cost.total - b.cost.total)[0];
        break;
      case ROUTING_STRATEGIES.FASTEST:
        selectedRoute = validRoutes.sort((a, b) => a.speed.estimated - b.speed.estimated)[0];
        break;
      case ROUTING_STRATEGIES.USER_CHOICE:
        // Try user's preferred method first, then AI recommendation, then fallback to most reliable
        selectedRoute = validRoutes.find(r => r.method === userPreferredMethod) || 
                       validRoutes.find(r => r.method === routingRecommendation.predictedMethod) ||
                       validRoutes.sort((a, b) => b.reliability.score - a.reliability.score)[0];
        break;
      default: // RELIABLE
        // Combine reliability score with AI recommendation
        selectedRoute = validRoutes
          .map(route => ({
            ...route,
            combinedScore: (route.reliability.score * 0.6) + 
                          ((routingRecommendation.scores[route.method] || 0) * 0.4)
          }))
          .sort((a, b) => b.combinedScore - a.combinedScore)[0];
    }
    
    // Process the payment with the selected method
    const result = await this.processPayment({
      ...basePaymentData,
      paymentMethod: selectedRoute.method
    });

    // Learn from the transaction result
    await this.routingAI.learnFromTransaction(
      basePaymentData,
      selectedRoute.method,
      result.success,
      {
        cost: selectedRoute.cost.total,
        processingTime: selectedRoute.speed.estimated,
        errorCode: result.error
      }
    );
    
    return {
      ...result,
      routingStrategy,
      selectedMethod: selectedRoute.method,
      routingAnalysis: {
        strategy: routingStrategy,
        aiRecommendation: routingRecommendation.predictedMethod,
        confidence: routingRecommendation.confidence,
        availableMethods,
        selectedRoute,
        allRoutes: routes
      }
    };
  } catch (error) {
    console.error('Smart routing payment error:', error);
    return {
      success: false,
      error: this.ERROR_CODES.ROUTING_ERROR,
      message: error.message || 'Failed to process payment with smart routing'
    };
  }
}

/**
 * Analyze a payment route for a specific method
 * 
 * @private
 * @param {string} method - Payment method to analyze
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Route analysis
 */
export async function analyzePaymentRoute(method, paymentData) {
  try {
    // Get cost estimates
    const cost = await this.calculateFees({ 
      ...paymentData, 
      paymentMethod: method 
    });
    
    // Get processing speed estimates
    const speed = await this.getProcessingSpeed(method, paymentData);
    
    // Get reliability score
    const reliability = this.getReliabilityScore(method, paymentData);
    
    // Get method limits
    const limits = await this.getMethodLimits(method, paymentData);
    
    return {
      method,
      cost,
      speed,
      reliability,
      limits
    };
  } catch (error) {
    console.error(`Error analyzing route for method ${method}:`, error);
    return {
      method,
      error: error.message,
      cost: { total: Infinity },
      speed: { estimated: Infinity },
      reliability: { score: 0 },
      limits: { min: 0, max: 0 }
    };
  }
}

/**
 * Calculate fees for a payment method
 * 
 * @private
 * @param {Object} paymentData - Payment information with method
 * @returns {Promise<Object>} Fee breakdown
 */
export async function calculateFees(paymentData) {
  const { paymentMethod, amount, currency } = paymentData;
  
  // Default fee structure
  let fees = {
    base: 0,
    percentage: 0,
    additional: 0,
    total: 0
  };
  
  // Get method-specific fees
  const methodConfig = this.getPaymentMethodConfig(paymentMethod);
  
  if (methodConfig && methodConfig.fees) {
    fees.base = methodConfig.fees.base || 0;
    fees.percentage = amount * (methodConfig.fees.percentage || 0) / 100;
    fees.additional = methodConfig.fees.additional || 0;
  }
  
  // Calculate total fees
  fees.total = fees.base + fees.percentage + fees.additional;
  
  return fees;
}

/**
 * Get processing speed estimate for a payment method
 * 
 * @private
 * @param {string} method - Payment method
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Processing speed information
 */
export async function getProcessingSpeed(method, paymentData) {
  // Get method configuration
  const methodConfig = this.getPaymentMethodConfig(method);
  
  // Default speed info
  const speedInfo = {
    estimated: methodConfig?.processingTime || 3600, // Default 1 hour in seconds
    unit: 'seconds',
    range: {
      min: methodConfig?.processingTimeRange?.min || methodConfig?.processingTime || 1800,
      max: methodConfig?.processingTimeRange?.max || methodConfig?.processingTime * 2 || 7200
    }
  };
  
  // Use historical data to refine estimate if available
  const historyInsights = this.analyzeTransactionHistory({
    paymentMethod: method,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
  });
  
  if (historyInsights.methodStats[method]?.avgProcessingTime) {
    speedInfo.estimated = historyInsights.methodStats[method].avgProcessingTime;
  }
  
  return speedInfo;
}

/**
 * Get reliability score for a payment method
 * 
 * @private
 * @param {string} method - Payment method
 * @param {Object} paymentData - Payment information
 * @returns {Object} Reliability information
 */
export function getReliabilityScore(method, paymentData) {
  // Default reliability info
  const reliabilityInfo = {
    score: 0.5, // Default middle score
    factors: {
      successRate: 0.5,
      uptime: 0.95,
      errorRate: 0.05
    }
  };
  
  // Use historical data to calculate reliability if available
  const historyInsights = this.analyzeTransactionHistory({
    paymentMethod: method,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
  });
  
  if (historyInsights.methodStats[method]) {
    const stats = historyInsights.methodStats[method];
    reliabilityInfo.factors.successRate = stats.successRate || 0.5;
    reliabilityInfo.score = stats.successRate || 0.5;
  }
  
  return reliabilityInfo;
}

/**
 * Get limits for a payment method
 * 
 * @private
 * @param {string} method - Payment method
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Object>} Method limits
 */
export async function getMethodLimits(method, paymentData) {
  // Get method configuration
  const methodConfig = this.getPaymentMethodConfig(method);
  
  // Default limits
  const limits = {
    min: methodConfig?.limits?.min || 0,
    max: methodConfig?.limits?.max || 1000000,
    daily: methodConfig?.limits?.daily || null,
    monthly: methodConfig?.limits?.monthly || null
  };
  
  return limits;
}

/**
 * Get available payment methods for a transaction
 * 
 * @private
 * @param {Object} paymentData - Payment information
 * @returns {Promise<Array<string>>} Available payment methods
 */
export async function getAvailablePaymentMethods(paymentData) {
  // Start with all supported methods
  let availableMethods = this.getSupportedPaymentMethods();
  
  // Filter by country
  if (paymentData.country) {
    availableMethods = availableMethods.filter(method => {
      const config = this.getPaymentMethodConfig(method);
      return !config.supportedCountries || config.supportedCountries.includes(paymentData.country);
    });
  }
  
  // Filter by currency
  if (paymentData.currency) {
    availableMethods = availableMethods.filter(method => {
      const config = this.getPaymentMethodConfig(method);
      return !config.supportedCurrencies || config.supportedCurrencies.includes(paymentData.currency);
    });
  }
  
  // Filter by amount
  if (paymentData.amount) {
    availableMethods = availableMethods.filter(method => {
      const config = this.getPaymentMethodConfig(method);
      const min = config.limits?.min || 0;
      const max = config.limits?.max || Infinity;
      return paymentData.amount >= min && paymentData.amount <= max;
    });
  }
  
  return availableMethods;
}

/**
 * Get payment method configuration
 * 
 * @private
 * @param {string} method - Payment method
 * @returns {Object} Method configuration
 */
export function getPaymentMethodConfig(method) {
  // This would typically come from a configuration store
  // For now, return mock configurations
  const configs = {
    'credit_card': {
      fees: { base: 0.30, percentage: 2.9, additional: 0 },
      processingTime: 10, // seconds
      limits: { min: 0.5, max: 25000 },
      supportedCountries: ['US', 'CA', 'GB', 'AU', 'EU'],
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    'debit_card': {
      fees: { base: 0.30, percentage: 1.5, additional: 0 },
      processingTime: 10, // seconds
      limits: { min: 0.5, max: 10000 },
      supportedCountries: ['US', 'CA', 'GB', 'AU', 'EU'],
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    'bank_transfer': {
      fees: { base: 1.00, percentage: 0.8, additional: 0 },
      processingTime: 86400, // 24 hours in seconds
      limits: { min: 5, max: 50000 },
      supportedCountries: ['US', 'CA', 'GB', 'EU'],
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD']
    },
    'paypal': {
      fees: { base: 0.30, percentage: 3.9, additional: 0 },
      processingTime: 30, // seconds
      limits: { min: 1, max: 10000 },
      supportedCountries: ['US', 'CA', 'GB', 'AU', 'EU', 'MX'],
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'MXN']
    },
    'crypto': {
      fees: { base: 0, percentage: 1.0, additional: 0 },
      processingTime: 3600, // 1 hour in seconds
      limits: { min: 5, max: 100000 },
      supportedCountries: ['*'], // All countries
      supportedCurrencies: ['USD', 'EUR', 'GBP']
    }
  };
  
  return configs[method] || {};
}

/**
 * Get supported payment methods
 * 
 * @private
 * @returns {Array<string>} Supported payment methods
 */
export function getSupportedPaymentMethods() {
  return ['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'crypto'];
}

/**
 * Get routing insights and analytics
 * 
 * @param {Object} filters - Filters for insights
 * @returns {Promise<Object>} Routing insights
 */
export async function getRoutingInsights(filters = {}) {
  try {
    // Get AI insights
    const aiInsights = await this.routingAI.getInsights(filters);
    
    // Get transaction history insights
    const historyInsights = this.analyzeTransactionHistory(filters);
    
    return {
      success: true,
      aiInsights,
      historyInsights
    };
  } catch (error) {
    console.error('Get routing insights error:', error);
    return {
      success: false,
      error: this.ERROR_CODES.ANALYTICS_ERROR,
      message: error.message || 'Failed to get routing insights'
    };
  }
}

/**
 * Analyze transaction history
 * 
 * @private
 * @param {Object} filters - Filters for analysis
 * @returns {Object} Analysis results
 */
export function analyzeTransactionHistory(filters = {}) {
  const {
    startDate,
    endDate,
    country,
    currency,
    paymentMethod
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
      t.paymentData.country === country
    );
  }
  
  if (currency) {
    filteredTransactions = filteredTransactions.filter(t => 
      t.paymentData.currency === currency
    );
  }
  
  if (paymentMethod) {
    filteredTransactions = filteredTransactions.filter(t => 
      t.paymentData.paymentMethod === paymentMethod
    );
  }
  
  // Calculate success rates by method
  const methodStats = {};
  
  filteredTransactions.forEach(t => {
    const method = t.paymentData.paymentMethod;
    
    if (!methodStats[method]) {
      methodStats[method] = {
        total: 0,
        success: 0,
        avgProcessingTime: 0,
        totalAmount: 0
      };
    }
    
    methodStats[method].total++;
    
    if (t.result.success) {
      methodStats[method].success++;
    }
    
    if (t.result.processingTime) {
      methodStats[method].avgProcessingTime = 
        (methodStats[method].avgProcessingTime * (methodStats[method].total - 1) + 
        t.result.processingTime) / methodStats[method].total;
    }
    
    methodStats[method].totalAmount += t.paymentData.amount || 0;
  });
  
  // Calculate success rates
  Object.keys(methodStats).forEach(method => {
    methodStats[method].successRate = methodStats[method].total > 0
      ? methodStats[method].success / methodStats[method].total
      : 0;
    
    methodStats[method].avgAmount = methodStats[method].total > 0
      ? methodStats[method].totalAmount / methodStats[method].total
      : 0;
  });
  
  return {
    totalTransactions: filteredTransactions.length,
    successfulTransactions: filteredTransactions.filter(t => t.result.success).length,
    methodStats,
    averageProcessingTime: filteredTransactions.length > 0
      ? filteredTransactions.reduce((sum, t) => sum + (t.result.processingTime || 0), 0) / filteredTransactions.length
      : 0
  };
}
