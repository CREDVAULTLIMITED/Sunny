/**
 * Sunny Payment Gateway - Payment Orchestrator Extensions
 * 
 * Additional methods for the PaymentOrchestrator class
 */

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