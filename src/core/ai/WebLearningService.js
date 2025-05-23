/**
 * Sunny Payment Gateway - Web Learning Service
 * 
 * Advanced service for learning from internet sources, APIs, and transaction data
 * to enhance AI capabilities with real-time payment trend analysis, customer behavior learning,
 * and market intelligence gathering.
 */

import OllamaService from './OllamaService.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class WebLearningService {
  constructor(config = {}) {
    this.ollamaService = new OllamaService({
      modelName: config.modelName || 'tinyllama',
      webEnabled: true
    });
    
    // Cache for learned information
    this.knowledgeCache = {};
    
    // Customer behavior patterns database
    this.customerBehaviorDB = {};
    
    // Payment trends analysis
    this.paymentTrends = {
      global: {},
      regional: {},
      methods: {},
      lastUpdated: null
    };
    
    // Market intelligence data
    this.marketIntelligence = {
      competitors: {},
      innovations: [],
      regulations: {},
      lastUpdated: null
    };
    
    // API Configuration
    this.apiConfig = {
      enabled: config.apiEnabled !== false,
      endpoints: config.apiEndpoints || {
        marketData: process.env.MARKET_DATA_API || 'https://api.marketdata.com/v1',
        paymentTrends: process.env.PAYMENT_TRENDS_API || 'https://api.paymenttrends.com/v1',
        newsApi: process.env.NEWS_API || 'https://api.paymentnews.com/v1'
      },
      apiKeys: {
        marketData: config.marketDataApiKey || process.env.MARKET_DATA_API_KEY,
        paymentTrends: config.paymentTrendsApiKey || process.env.PAYMENT_TRENDS_API_KEY,
        newsApi: config.newsApiKey || process.env.NEWS_API_KEY
      },
      requestInterval: config.apiRequestInterval || 60000 // 1 minute minimum between API calls
    };
    
    // Cache expiration times (in milliseconds)
    this.cacheExpirationMs = {
      knowledge: config.knowledgeCacheExpiration || 24 * 60 * 60 * 1000, // 24 hours
      trends: config.trendsCacheExpiration || 6 * 60 * 60 * 1000, // 6 hours
      customerBehavior: config.customerBehaviorExpiration || 7 * 24 * 60 * 60 * 1000, // 7 days
      marketIntelligence: config.marketIntelligenceExpiration || 12 * 60 * 60 * 1000 // 12 hours
    };
    
    // Learning topics
    this.learningTopics = config.learningTopics || [
      'payment processing',
      'fraud detection',
      'financial security',
      'payment methods',
      'transaction routing',
      'fintech innovations',
      'payment regulations',
      'consumer payment preferences',
      'emerging payment technologies',
      'cross-border payments'
    ];
    
    // Model update settings
    this.modelUpdate = {
      automaticUpdates: config.automaticModelUpdates !== false,
      updateInterval: config.modelUpdateInterval || 1 * 24 * 60 * 60 * 1000, // 1 day
      lastUpdate: null,
      updateThreshold: config.modelUpdateThreshold || 0.1 // 10% change threshold
    };
    
    // API request timestamps to prevent rate limiting
    this.lastApiRequests = {};
    
    // Initialize event listeners for real-time updates
    this._initializeEventListeners();
  }
  
  /**
   * Initialize event listeners for real-time updates
   * 
   * @private
   */
  _initializeEventListeners() {
    // This would connect to event emitters in a real system
    // For this example, we'll just log that it was initialized
    console.log('WebLearningService event listeners initialized');
    
    // In a real system, you would set up event listeners like:
    // paymentEventEmitter.on('transaction-completed', this.analyzeTransaction.bind(this));
  }

  /**
   * Learn about a specific topic from the internet with enhanced context
   * 
   * @param {string} topic - Topic to learn about
   * @param {Object} options - Additional options for learning
   * @returns {Promise<Object>} - Learning results with insights
   */
  async learnAboutTopic(topic, options = {}) {
    try {
      const { forceRefresh, context, relevance } = options;
      
      // Check if we have recent information in cache (unless force refresh)
      if (!forceRefresh && this.knowledgeCache[topic]) {
        const cacheAge = Date.now() - new Date(this.knowledgeCache[topic].timestamp).getTime();
        if (cacheAge < this.cacheExpirationMs.knowledge) {
          return {
            topic,
            information: this.knowledgeCache[topic].information,
            insights: this.knowledgeCache[topic].insights,
            fromCache: true,
            timestamp: this.knowledgeCache[topic].timestamp,
            lastChecked: new Date().toISOString()
          };
        }
      }
      
      // Create an enhanced prompt with context if provided
      let enhancedPrompt = `What are the latest developments, best practices, and important information about "${topic}" in the context of payment processing and financial technology?`;
      
      if (context) {
        enhancedPrompt += `\n\nConsider this additional context: ${context}`;
      }
      
      // Add relevance instructions if specified
      if (relevance) {
        enhancedPrompt += `\n\nPlease focus on aspects most relevant to ${relevance}.`;
      }
      
      // Enhance with recent market intelligence if available
      if (this.marketIntelligence.lastUpdated) {
        enhancedPrompt += `\n\nAlso consider these recent market trends:`;
        
        if (this.marketIntelligence.innovations.length > 0) {
          const recentInnovations = this.marketIntelligence.innovations
            .slice(0, 3)
            .map(i => i.title)
            .join(", ");
          enhancedPrompt += `\n- Recent innovations: ${recentInnovations}`;
        }
        
        // Add regional regulations if relevant
        if (options.region && this.marketIntelligence.regulations[options.region]) {
          enhancedPrompt += `\n- Regional regulations for ${options.region}: ${this.marketIntelligence.regulations[options.region].summary}`;
        }
      }
      
      // Search the web for information
      const response = await this.ollamaService.answerQuestion(enhancedPrompt);
      
      // Extract insights using AI
      const insightsPrompt = `Based on this information about "${topic}" in payment processing:\n\n${response.answer}\n\nProvide 3-5 key strategic insights that would be valuable for a payment gateway provider.`;
      const insightsResponse = await this.ollamaService.answerQuestion(insightsPrompt);
      
      // Cache the result
      this.knowledgeCache[topic] = {
        information: response.answer,
        insights: insightsResponse.answer,
        timestamp: new Date().toISOString(),
        context: context || null,
        relevance: relevance || null
      };
      
      // Signal that new knowledge has been acquired, which might trigger model updates
      if (this.modelUpdate.automaticUpdates) {
        this._scheduleModelUpdate({
          source: 'topic-learning',
          topic,
          hasNewKnowledge: true
        });
      }
      
      return {
        topic,
        information: response.answer,
        insights: insightsResponse.answer,
        fromCache: false,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error learning about ${topic}:`, error);
      
      // Return cached version if available, even if expired
      if (this.knowledgeCache[topic]) {
        return {
          topic,
          information: this.knowledgeCache[topic].information,
          insights: this.knowledgeCache[topic].insights || null,
          fromCache: true,
          timestamp: this.knowledgeCache[topic].timestamp,
          error: error.message
        };
      }
      
      return {
        topic,
        error: error.message,
        information: `Failed to learn about ${topic}.`
      };
    }
  }

  /**
   * Learn about country-specific payment information
   * 
   * @param {string} country - Country code or name
   * @returns {Promise<Object>} - Country payment information
   */
  async learnAboutCountry(country) {
    const topic = `payment methods in ${country}`;
    
    try {
      const result = await this.learnAboutTopic(topic);
      
      return {
        country,
        paymentInfo: result.information,
        timestamp: result.timestamp
      };
    } catch (error) {
      console.error(`Error learning about ${country}:`, error);
      return {
        country,
        error: error.message
      };
    }
  }

  /**
   * Learn about new security threats
   * 
   * @returns {Promise<Object>} - Security threat information
   */
  async learnAboutSecurityThreats() {
    try {
      const result = await this.learnAboutTopic('payment security threats');
      
      return {
        threats: result.information,
        timestamp: result.timestamp
      };
    } catch (error) {
      console.error('Error learning about security threats:', error);
      return {
        error: error.message
      };
    }
  }

  /**
   * Run scheduled learning to update knowledge across all systems
   * 
   * @param {Object} options - Options for scheduled learning
   * @returns {Promise<Object>} - Comprehensive learning results
   */
  async runScheduledLearning(options = {}) {
    try {
      const results = {
        topics: {},
        marketIntelligence: {},
        paymentTrends: {},
        apiIntegrations: {},
        modelUpdates: {}
      };
      
      // Learn about each topic
      for (const topic of this.learningTopics) {
        results.topics[topic] = await this.learnAboutTopic(topic, { forceRefresh: options.forceRefresh });
      }
      
      // Update market intelligence
      if (options.includeMarketData !== false) {
        results.marketIntelligence = await this.gatherMarketIntelligence();
      }
      
      // Update payment trends analysis
      results.paymentTrends = await this.analyzePaymentTrends();
      
      // Collect API data if enabled
      if (this.apiConfig.enabled && options.includeApiData !== false) {
        results.apiIntegrations = await this.collectExternalApiData();
      }
      
      // Update AI model if needed
      if (this.modelUpdate.automaticUpdates) {
        results.modelUpdates = await this.updateAIModel({
          force: options.forceModelUpdate,
          source: 'scheduled-learning'
        });
      }
      
      return {
        success: true,
        results,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Scheduled learning error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  /**
   * Analyze customer behavior based on transaction data
   * 
   * @param {Object} customerData - Customer transaction and behavior data
   * @returns {Promise<Object>} - Customer behavior insights
   */
  async analyzeCustomerBehavior(customerData) {
    try {
      const { customerId, transactions, preferences } = customerData;
      
      if (!customerId) {
        throw new Error('Customer ID is required for behavior analysis');
      }
      
      // Initialize customer record if it doesn't exist
      if (!this.customerBehaviorDB[customerId]) {
        this.customerBehaviorDB[customerId] = {
          preferences: {},
          patterns: {},
          insights: {},
          firstSeen: new Date().toISOString(),
          lastUpdated: null
        };
      }
      
      // Update customer preferences if provided
      if (preferences) {
        this.customerBehaviorDB[customerId].preferences = {
          ...this.customerBehaviorDB[customerId].preferences,
          ...preferences,
          lastUpdated: new Date().toISOString()
        };
      }
      
      // Analyze transaction patterns if provided
      if (transactions && transactions.length > 0) {
        // Process transactions for patterns
        const patterns = this._extractTransactionPatterns(transactions);
        
        // Update the customer patterns
        this.customerBehaviorDB[customerId].patterns = {
          ...this.customerBehaviorDB[customerId].patterns,
          ...patterns,
          lastUpdated: new Date().toISOString()
        };
        
        // Generate AI insights about customer behavior
        const transactionSummary = this._formatTransactionSummary(transactions);
        const insightsPrompt = `
          Analyze this customer's payment behavior:
          
          ${transactionSummary}
          
          ${this.customerBehaviorDB[customerId].preferences ? 
            `Customer preferences: ${JSON.stringify(this.customerBehaviorDB[customerId].preferences)}` : 
            ''}
          
          Provide insights about:
          1. Preferred payment methods
          2. Transaction patterns (frequency, amounts, timing)
          3. Risk profile
          4. Personalization opportunities
          5. Recommended payment methods for future transactions
        `;
        
        const insightsResponse = await this.ollamaService.generateCompletion(insightsPrompt);
        
        // Update customer insights
        this.customerBehaviorDB[customerId].insights = {
          analysis: insightsResponse.response,
          recommendedMethods: this._extractRecommendedMethods(insightsResponse.response),
          riskProfile: this._extractRiskProfile(insightsResponse.response),
          timestamp: new Date().toISOString()
        };
      }
      
      // Update last updated timestamp
      this.customerBehaviorDB[customerId].lastUpdated = new Date().toISOString();
      
      return {
        customerId,
        insights: this.customerBehaviorDB[customerId].insights,
        patterns: this.customerBehaviorDB[customerId].patterns,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error analyzing customer behavior for ${customerData.customerId}:`, error);
      return {
        customerId: customerData.customerId,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  /**
   * Extract transaction patterns from a set of transactions
   * 
   * @private
   * @param {Array} transactions - Array of transaction data
   * @returns {Object} - Extracted patterns
   */
  _extractTransactionPatterns(transactions) {
    // Group transactions by payment method
    const methodCounts = {};
    const amountsByMethod = {};
    const timeOfDayDistribution = {
      morning: 0,   // 6am - 12pm
      afternoon: 0, // 12pm - 6pm
      evening: 0,   // 6pm - 12am
      night: 0      // 12am - 6am
    };
    
    // Transaction frequency
    const timestamps = transactions.map(t => new Date(t.timestamp || t.date).getTime()).sort();
    let avgTimeBetweenTransactions = 0;
    if (timestamps.length > 1) {
      let totalTime = 0;
      for (let i = 1; i < timestamps.length; i++) {
        totalTime += timestamps[i] - timestamps[i-1];
      }
      avgTimeBetweenTransactions = totalTime / (timestamps.length - 1);
    }
    
    // Process each transaction
    transactions.forEach(transaction => {
      const method = transaction.paymentMethod || transaction.method;
      const amount = parseFloat(transaction.amount) || 0;
      const date = new Date(transaction.timestamp || transaction.date);
      const hour = date.getHours();
      
      // Count methods
      methodCounts[method] = (methodCounts[method] || 0) + 1;
      
      // Track amounts by method
      if (!amountsByMethod[method]) {
        amountsByMethod[method] = {
          total: 0,
          count: 0,
          min: Infinity,
          max: -Infinity
        };
      }
      amountsByMethod[method].total += amount;
      amountsByMethod[method].count++;
      amountsByMethod[method].min = Math.min(amountsByMethod[method].min, amount);
      amountsByMethod[method].max = Math.max(amountsByMethod[method].max, amount);
      
      // Track time of day
      if (hour >= 6 && hour < 12) timeOfDayDistribution.morning++;
      else if (hour >= 12 && hour < 18) timeOfDayDistribution.afternoon++;
      else if (hour >= 18) timeOfDayDistribution.evening++;
      else timeOfDayDistribution.night++;
    });
    
    // Calculate preferred methods
    const total = transactions.length;
    const methodPreferences = Object.keys(methodCounts).map(method => ({
      method,
      count: methodCounts[method],
      percentage: (methodCounts[method] / total) * 100,
      avgAmount: amountsByMethod[method].total / amountsByMethod[method].count,
      minAmount: amountsByMethod[method].min,
      maxAmount: amountsByMethod[method].max
    })).sort((a, b) => b.count - a.count);
    
    // Calculate time of day preferences
    const timePreferences = Object.keys(timeOfDayDistribution).map(time => ({
      timeOfDay: time,
      count: timeOfDayDistribution[time],
      percentage: (timeOfDayDistribution[time] / total) * 100
    })).sort((a, b) => b.count - a.count);
    
    return {
      preferredMethods: methodPreferences,
      timeOfDayPreferences: timePreferences,
      transactionFrequency: {
        avgTimeBetweenTransactions,
        unit: 'milliseconds',
        humanReadable: this._formatTimeDuration(avgTimeBetweenTransactions)
      },
      totalTransactions: total,
      firstTransaction: new Date(timestamps[0]).toISOString(),
      lastTransaction: new Date(timestamps[timestamps.length - 1]).toISOString()
    };
  }
  
  /**
   * Format time duration in a human-readable format
   * 
   * @private
   * @param {number} milliseconds - Duration in milliseconds
   * @returns {string} - Formatted duration
   */
  _formatTimeDuration(milliseconds) {
    if (milliseconds < 60000) {
      return `${Math.round(milliseconds / 1000)} seconds`;
    } else if (milliseconds < 3600000) {
      return `${Math.round(milliseconds / 60000)} minutes`;
    } else if (milliseconds < 86400000) {
      return `${Math.round(milliseconds / 3600000)} hours`;
    } else {
      return `${Math.round(milliseconds / 86400000)} days`;
    }
  }
  
  /**
   * Format transaction summary for AI analysis
   * 
   * @private
   * @param {Array} transactions - Transaction data
   * @returns {string} - Formatted summary
   */
  _formatTransactionSummary(transactions) {
    let summary = `Transaction History (${transactions.length} transactions):\n\n`;
    
    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => {
      return new Date(a.timestamp || a.date) - new Date(b.timestamp || b.date);
    });
    
    // Group by month to reduce verbosity
    const monthGroups = {};
    
    sortedTransactions.forEach(t => {
      const date = new Date(t.timestamp || t.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthGroups[monthKey]) {
        monthGroups[monthKey] = {
          methods: {},
          totalAmount: 0,
          count: 0
        };
      }
      
      const method = t.paymentMethod || t.method;
      monthGroups[monthKey].methods[method] = (monthGroups[monthKey].methods[method] || 0) + 1;
      monthGroups[monthKey].totalAmount += parseFloat(t.amount) || 0;
      monthGroups[monthKey].count++;
    });
    
    // Format month summaries
    Object.keys(monthGroups).forEach(month => {
      const [year, monthNum] = month.split('-');
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthNames[parseInt(monthNum) - 1];
      
      summary += `${monthName} ${year}: ${monthGroups[month].count} transactions, total amount: ${monthGroups[month].totalAmount.toFixed(2)}\n`;
      
      // Add method breakdown
      const methods = Object.keys(monthGroups[month].methods);
      summary += `Methods used: ${methods.map(m => `${m} (${monthGroups[month].methods[m]})`).join(', ')}\n\n`;
    });
    
    // Include 5 most recent transactions for more detailed analysis
    if (sortedTransactions.length > 0) {
      summary += "\nRecent transactions:\n";
      const recentTransactions = sortedTransactions.slice(-5).reverse();
      
      recentTransactions.forEach(t => {
        const date = new Date(t.timestamp || t.date).toLocaleDateString();
        summary += `${date}: ${t.paymentMethod || t.method}, ${t.amount} ${t.currency || ''}, ${t.status || ''}\n`;
      });
    }
    
    return summary;
  }
  
  /**
   * Extract recommended payment methods from AI insights
   * 
   * @private
   * @param {string} insights - AI-generated insights
   * @returns {Array} - Recommended payment methods
   */
  _extractRecommendedMethods(insights) {
    const methodPatterns = [
      /recommended\s+(?:payment\s+)?methods?(?:\s+include)?(?:\s+are)?(?:\s+would\s+be)?:\s*([^.]+)/i,
      /suggest(?:ed)?\s+using\s+([^.]+)\s+for\s+future/i,
      /prefer(?:s|red)?\s+payment\s+methods?(?:\s+are)?(?:\s+is)?:\s*([^.]+)/i
    ];
    
    for (const pattern of methodPatterns) {
      const match = insights.match(pattern);
      if (match && match[1]) {
        // Extract methods from the matched text
        const methodsText = match[1].trim();
        // Split by commas or "and" and clean up
        return methodsText.split(/,|\sand\s/).map(m => m.trim()).filter(m => m.length > 0);
      }
    }
    
    // Default to empty array if no methods found
    return [];
  }
  
  /**
   * Extract risk profile information from AI insights
   * 
   * @private
   * @param {string} insights - AI-generated insights
   * @returns {Object} - Risk profile information
   */
  _extractRiskProfile(insights) {
    const riskPatterns = [
      /risk\s+profile(?:\s+is)?(?:\s+appears\s+to\s+be)?:\s*([^.]+)/i,
      /risk\s+assessment(?:\s+is)?(?:\s+indicates)?:\s*([^.]+)/i
    ];
    
    for (const pattern of riskPatterns) {
      const match = insights.match(pattern);
      if (match && match[1]) {
        const riskText = match[1].trim().toLowerCase();
        
        // Determine risk level
        let riskLevel = 'medium';
        if (riskText.includes('low') || riskText.includes('minimal')) riskLevel = 'low';
        else if (riskText.includes('high')) riskLevel = 'high';
        
        return {
          level: riskLevel,
          description: match[1].trim()
        };
      }
    }
    
    // Default to medium risk if not found
    return {
      level: 'medium',
      description: 'No specific risk profile identified'
    };
  }
  
  /**
   * Analyze real-time payment trends across all transactions
   * 
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} - Payment trend analysis
   */
  async analyzePaymentTrends(options = {}) {
    try {
      // Check if we need to refresh the trends data
      const needsRefresh = !this.paymentTrends.lastUpdated || 
        (Date.now() - new Date(this.paymentTrends.lastUpdated).getTime() > this.cacheExpirationMs.trends);
      
      if (!needsRefresh && !options.forceRefresh) {
        return {
          ...this.paymentTrends,
          fromCache: true
        };
      }
      
      // In a real implementation, this would analyze actual transaction data
      // Here we'll use API data and AI to simulate trend analysis
      
      // Get trend data from API if enabled
      let trendData = {};
      
      if (this.apiConfig.enabled) {
        try {
          // Respect rate limiting
          const now = Date.now();
          const lastRequest = this.lastApiRequests.paymentTrends || 0;
          
          if (now - lastRequest >= this.apiConfig.requestInterval) {
            const response = await axios({
              method: 'get',
              url: `${this.apiConfig.endpoints.paymentTrends}/trends`,
              headers: {
                'Authorization': `Bearer ${this.apiConfig.apiKeys.paymentTrends}`,
                'Content-Type': 'application/json'
              }
            });
            
            trendData = response.data;
            this.lastApiRequests.paymentTrends = now;
          }
        } catch (apiError) {
          console.error('Failed to fetch payment trends from API:', apiError);
          // Continue with AI-generated trends
        }
      }
      
      // Use AI to analyze trends
      const prompt = `
        Analyze current payment processing trends globally. 
        Consider factors like:
        1. Popular payment methods by region
        2. Emerging payment technologies
        3. Changes in consumer behavior
        4. Regional differences in payment preferences
        5. Security and fraud trends
        
        ${trendData ? `Consider this market data: ${JSON.stringify(trendData)}` : ''}
        
        Provide a structured analysis that a payment gateway provider could use to optimize routing.
      `;
      
      const aiAnalysis = await this.ollamaService.generateCompletion(prompt);
      
      // Update the trends data
      this.paymentTrends = {
        global: this._extractGlobalTrends(aiAnalysis.response),
        regional: this._extractRegionalTrends(aiAnalysis.response),
        methods
}

export default WebLearningService;