/**
 * Sunny Payment Gateway - CreditBoost Integration
 * 
 * Specialized integration for the CreditBoost platform
 */

import SunnyPaymentGateway from '../core/SunnyPaymentGateway.js';

class CreditBoostIntegration {
  constructor(config = {}) {
    // Initialize the Sunny payment gateway with CreditBoost-specific settings
    this.gateway = new SunnyPaymentGateway({
      ...config,
      // Enable instant settlement by default for CreditBoost
      instantSettlement: config.instantSettlement !== false,
      // Set merchant tier based on CreditBoost partnership level
      merchantTier: config.merchantTier || 'premium'
    });
    
    // CreditBoost-specific settings
    this.creditScoreBasedPricing = config.creditScoreBasedPricing !== false;
    this.enableCreditPassport = config.enableCreditPassport !== false;
    this.creditBoostUserId = config.creditBoostUserId;
  }
  
  /**
   * Process a payment with CreditBoost-specific features
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  async processPayment(paymentData) {
    try {
      // Add CreditBoost-specific metadata
      const enhancedPaymentData = {
        ...paymentData,
        metadata: {
          ...paymentData.metadata,
          creditBoostIntegration: true,
          creditBoostUserId: this.creditBoostUserId || paymentData.metadata?.creditBoostUserId
        }
      };
      
      // Apply credit score-based pricing if enabled
      if (this.creditScoreBasedPricing && paymentData.creditScore) {
        enhancedPaymentData.customFeeOverride = this.calculateCreditScoreBasedFee(paymentData.creditScore);
      }
      
      // Process the payment through Sunny gateway
      const paymentResult = await this.gateway.processPayment(enhancedPaymentData);
      
      // If payment successful and credit passport enabled, update credit passport
      if (paymentResult.success && this.enableCreditPassport) {
        await this.updateCreditPassport({
          userId: this.creditBoostUserId || paymentData.metadata?.creditBoostUserId,
          transactionId: paymentResult.transactionId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentMethod: paymentData.paymentMethod,
          timestamp: new Date().toISOString()
        });
      }
      
      return paymentResult;
    } catch (error) {
      console.error('CreditBoost payment processing error:', error);
      return {
        success: false,
        error: 'CREDITBOOST_INTEGRATION_ERROR',
        message: 'Failed to process payment through CreditBoost integration',
        originalError: error.message
      };
    }
  }
  
  /**
   * Calculate fee adjustments based on credit score
   * 
   * @private
   * @param {number} creditScore - User's credit score
   * @returns {Object} Fee adjustment details
   */
  calculateCreditScoreBasedFee(creditScore) {
    // Base discount percentage
    let discountPercentage = 0;
    
    // Adjust discount based on credit score ranges
    if (creditScore >= 800) {
      discountPercentage = 0.5; // 0.5% discount for excellent credit
    } else if (creditScore >= 740) {
      discountPercentage = 0.3; // 0.3% discount for very good credit
    } else if (creditScore >= 670) {
      discountPercentage = 0.1; // 0.1% discount for good credit
    }
    
    return {
      type: 'percentage_discount',
      value: discountPercentage,
      reason: 'Credit score based pricing',
      creditScore
    };
  }
  
  /**
   * Update the user's credit passport with payment information
   * 
   * @private
   * @param {Object} passportData - Data to update in credit passport
   * @returns {Promise<Object>} Update result
   */
  async updateCreditPassport(passportData) {
    try {
      // In a real implementation, this would call the CreditBoost API
      // to update the user's credit passport with payment information
      
      console.log('Updating credit passport with payment data:', passportData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        success: true,
        userId: passportData.userId,
        updated: true,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to update credit passport:', error);
      return {
        success: false,
        error: 'CREDIT_PASSPORT_UPDATE_ERROR',
        message: 'Failed to update credit passport'
      };
    }
  }
  
  /**
   * Create a subscription with credit score monitoring
   * 
   * @param {Object} subscriptionData - Subscription information
   * @returns {Promise<Object>} Subscription result
   */
  async createSubscription(subscriptionData) {
    try {
      // Add CreditBoost-specific features to subscription
      const enhancedSubscriptionData = {
        ...subscriptionData,
        metadata: {
          ...subscriptionData.metadata,
          creditBoostIntegration: true,
          creditScoreMonitoring: subscriptionData.creditScoreMonitoring !== false,
          creditBoostUserId: this.creditBoostUserId || subscriptionData.metadata?.creditBoostUserId
        }
      };
      
      // Create the subscription through Sunny gateway
      const subscriptionResult = await this.gateway.createSubscription(enhancedSubscriptionData);
      
      return subscriptionResult;
    } catch (error) {
      console.error('CreditBoost subscription error:', error);
      return {
        success: false,
        error: 'CREDITBOOST_SUBSCRIPTION_ERROR',
        message: 'Failed to create subscription through CreditBoost integration'
      };
    }
  }
  
  /**
   * Get payment methods recommended based on user's credit profile
   * 
   * @param {Object} options - Query options
   * @param {string} options.userId - CreditBoost user ID
   * @param {number} options.creditScore - User's credit score
   * @returns {Promise<Object>} Recommended payment methods
   */
  async getRecommendedPaymentMethods({ userId, creditScore }) {
    try {
      // In a real implementation, this would analyze the user's credit profile
      // and recommend appropriate payment methods
      
      const recommendations = [];
      
      // Add recommendations based on credit score
      if (creditScore >= 700) {
        recommendations.push({
          method: 'card',
          type: 'credit',
          priority: 1,
          reason: 'Good credit score qualifies for credit card payments'
        });
      }
      
      recommendations.push({
        method: 'bank_transfer',
        priority: creditScore >= 700 ? 2 : 1,
        reason: 'Secure and reliable payment method'
      });
      
      // Always include these options
      recommendations.push(
        {
          method: 'apple_pay',
          priority: 3,
          reason: 'Fast and convenient mobile payment'
        },
        {
          method: 'google_pay',
          priority: 4,
          reason: 'Fast and convenient mobile payment'
        }
      );
      
      return {
        success: true,
        userId,
        creditScore,
        recommendations
      };
    } catch (error) {
      console.error('Error getting recommended payment methods:', error);
      return {
        success: false,
        error: 'RECOMMENDATION_ERROR',
        message: 'Failed to get recommended payment methods'
      };
    }
  }
}

export default CreditBoostIntegration;