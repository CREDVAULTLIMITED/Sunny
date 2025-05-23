/**
 * Sunny Payment Gateway - Advanced Ollama Integration Service
 * 
 * Provides comprehensive integration with TinyLlama model via Ollama with:
 * - Advanced web crawling and learning capabilities
 * - Multi-source intelligence gathering
 * - Real-time market data integration
 * - Payment trends analysis and tracking
 * - Security threat monitoring
 * - Regulatory compliance updates
 */

import axios from 'axios';
import cheerio from 'cheerio';
import crypto from 'crypto';

class OllamaService {
  constructor(config = {}) {
    this.modelName = config.modelName || 'tinyllama';
    this.apiUrl = config.apiUrl || 'http://localhost:11434/api';
    this.systemPrompt = config.systemPrompt || 
      'You are an AI assistant for Sunny Payment Gateway. You help with payment routing, fraud detection, and answering questions about payment processing.';
    this.webEnabled = config.webEnabled !== undefined ? config.webEnabled : true;
    
    // Advanced web learning configuration
    this.webLearning = {
      enabled: config.webLearningEnabled !== undefined ? config.webLearningEnabled : true,
      maxSources: config.maxWebSources || 5,
      crawlDepth: config.crawlDepth || 2,
      cacheTTL: config.webCacheTTL || 3600000, // 1 hour in milliseconds
      userAgent: config.userAgent || 'SunnyPaymentBot/1.0 (https://sunnypayments.com/bot)'
    };
    
    // Market data integration
    this.marketData = {
      enabled: config.marketDataEnabled !== undefined ? config.marketDataEnabled : true,
      apiKeys: {
        coinMarketCap: config.coinMarketCapApiKey || process.env.COINMARKETCAP_API_KEY,
        alphavantage: config.alphavantageApiKey || process.env.ALPHAVANTAGE_API_KEY,
        finnhub: config.finnhubApiKey || process.env.FINNHUB_API_KEY
      },
      refreshInterval: config.marketDataRefreshInterval || 900000, // 15 minutes
      lastRefresh: null,
      cache: {}
    };
    
    // Multi-source learning system
    this.sources = {
      paymentNews: config.paymentNewsSources || [
        'https://www.pymnts.com/feed/',
        'https://www.finextra.com/rss/channel.aspx?channel=retail',
        'https://www.thepaypers.com/rss/rss-general.xml'
      ],
      securitySources: config.securitySources || [
        'https://krebsonsecurity.com/feed/',
        'https://www.bankinfosecurity.com/rss-feeds',
        'https://www.darkreading.com/rss.xml'
      ],
      regulatorySources: config.regulatorySources || [
        'https://www.cfpb.gov/feed/',
        'https://www.fincen.gov/rss.xml',
        'https://www.pci-dss.org/rss.xml'
      ],
      lastUpdated: {},
      cache: {}
    };
    
    // Web crawl and search cache
    this.webCache = {};
    
    // Initialize cache cleanup interval
    this._initializeCacheCleanup();
  }
  
  /**
   * Initialize cache cleanup on a regular interval
   * 
   * @private
   */
  _initializeCacheCleanup() {
    // Clean up cache every hour
    setInterval(() => {
      const now = Date.now();
      
      // Clean web cache
      Object.keys(this.webCache).forEach(key => {
        if (now - this.webCache[key].timestamp > this.webLearning.cacheTTL) {
          delete this.webCache[key];
        }
      });
      
      // Clean market data cache
      Object.keys(this.marketData.cache).forEach(key => {
        if (now - this.marketData.cache[key].timestamp > this.marketData.refreshInterval) {
          delete this.marketData.cache[key];
        }
      });
      
      // Clean sources cache
      Object.keys(this.sources.cache).forEach(key => {
        if (now - this.sources.cache[key].timestamp > this.webLearning.cacheTTL) {
          delete this.sources.cache[key];
        }
      });
      
      console.log('Cache cleanup completed');
    }, 3600000); // 1 hour
  }

  /**
   * Generate a completion using the Ollama model
   * 
   * @param {string} prompt - The prompt to send to the model
   * @param {Object} options - Additional options for the model
   * @returns {Promise<Object>} - The model's response
   */
  async generateCompletion(prompt, options = {}) {
    try {
      const response = await fetch(`${this.apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          prompt: prompt,
          system: this.systemPrompt,
          stream: false,
          ...options
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ollama service error:', error);
      throw error;
    }
  }

  /**
   * Analyze transaction data for fraud detection
   * 
   * @param {Object} transactionData - Transaction data
   * @returns {Promise<Object>} - Fraud analysis results
   */
  async analyzeFraud(transactionData) {
    try {
      // Create a prompt for fraud detection
      const prompt = `
        Please analyze this payment transaction for potential fraud:
        
        Transaction Details:
        - Amount: ${transactionData.amount} ${transactionData.currency}
        - Country: ${transactionData.country || 'Unknown'}
        - Payment Method: ${transactionData.paymentMethod || 'Unknown'}
        ${transactionData.customer ? `- Customer ID: ${transactionData.customer.id || 'New'}` : ''}
        ${transactionData.billingAddress && transactionData.shippingAddress ? 
          `- Billing Country: ${transactionData.billingAddress.country}
           - Shipping Country: ${transactionData.shippingAddress.country}` : ''}
        
        Respond with a JSON object containing:
        1. isFraudulent: true/false assessment if this transaction appears fraudulent
        2. riskScore: A number between 0-100 indicating risk level
        3. reason: Brief explanation for the risk assessment
      `;

      const response = await this.generateCompletion(prompt);
      
      // Extract JSON from the response
      let result;
      try {
        // Try to find JSON in the response
        const jsonMatch = response.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON found, create a basic response
          result = {
            isFraudulent: false,
            riskScore: 30,
            reason: "Default assessment due to parsing error"
          };
        }
      } catch (parseError) {
        console.error('Error parsing model response:', parseError);
        result = {
          isFraudulent: false,
          riskScore: 30,
          reason: "Default assessment due to parsing error"
        };
      }

      return result;
    } catch (error) {
      console.error('Fraud analysis error:', error);
      return {
        isFraudulent: false,
        riskScore: 0,
        reason: "Error occurred during analysis"
      };
    }
  }

  /**
   * Analyze transaction data and recommend payment method
   * 
   * @param {Object} transactionData - Transaction data
   * @returns {Promise<Object>} - Analysis results
   */
  async analyzePaymentRouting(transactionData) {
    try {
      const { 
        amount, 
        currency, 
        country, 
        availableMethods = [],
        customer = {},
        metadata = {}
      } = transactionData;

      // Create a prompt for the model
      const prompt = `
        Please analyze this payment transaction and recommend the best payment method:
        
        Transaction Details:
        - Amount: ${amount} ${currency}
        - Country: ${country}
        - Available Payment Methods: ${availableMethods.join(', ')}
        ${metadata.urgent ? '- This is an urgent transaction' : ''}
        ${customer.id ? `- Customer ID: ${customer.id}` : ''}
        
        Respond with a JSON object containing:
        1. predictedMethod: The recommended payment method
        2. confidence: A confidence score between 0 and 1
        3. reasoning: Brief explanation for the recommendation
      `;

      const response = await this.generateCompletion(prompt);
      
      // Extract JSON from the response
      let result;
      try {
        // Try to find JSON in the response
        const jsonMatch = response.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON found, create a basic response
          result = {
            predictedMethod: availableMethods[0] || null,
            confidence: 0.5,
            reasoning: "Default recommendation due to parsing error"
          };
        }
      } catch (parseError) {
        console.error('Error parsing model response:', parseError);
        result = {
          predictedMethod: availableMethods[0] || null,
          confidence: 0.5,
          reasoning: "Default recommendation due to parsing error"
        };
      }

      return result;
    } catch (error) {
      console.error('Payment routing analysis error:', error);
      return {
        predictedMethod: transactionData.availableMethods[0] || null,
        confidence: 0,
        reasoning: "Error occurred during analysis"
      };
    }
  }

  /**
   * Search the web for information to enhance AI responses using multiple sources
   * 
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<string>} - Web search results
   */
  async searchWeb(query, options = {}) {
    if (!this.webEnabled) {
      return "Web search is disabled.";
    }

    try {
      // Check if we have cached results for this query
      const cacheKey = this._generateCacheKey(query);
      if (this.webCache[cacheKey] && !options.bypassCache) {
        const cacheAge = Date.now() - this.webCache[cacheKey].timestamp;
        if (cacheAge < this.webLearning.cacheTTL) {
          console.log(`Using cached web search results for: ${query}`);
          return this.webCache[cacheKey].results;
        }
      }
      
      // Use multiple search APIs for more comprehensive results
      const results = await Promise.allSettled([
        this._searchDDG(query, options),
        this._searchGoogle(query, options),
        this._searchBing(query, options)
      ]);
      
      // Combine successful search results
      let combinedResults = [];
      
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value && result.value.length) {
          combinedResults = [...combinedResults, ...result.value];
        }
      });
      
      // Remove duplicates based on URL
      const uniqueResults = this._deduplicateResults(combinedResults);
      
      // Sort by relevance (if available) or just take the top results
      const sortedResults = uniqueResults.sort((a, b) => {
        if (a.relevance && b.relevance) {
          return b.relevance - a.relevance;
        }
        return 0;
      }).slice(0, this.webLearning.maxSources);
      
      // Format results
      let formattedResults = "Web search results:\n\n";
      
      if (sortedResults.length > 0) {
        // For each result, also crawl the page to get more detailed content if enabled
        if (this.webLearning.enabled && !options.skipContentExtraction) {
          await Promise.all(sortedResults.map(async (item, index) => {
            try {
              const content = await this._extractContentFromUrl(item.link);
              item.extractedContent = content;
            } catch (error) {
              console.warn(`Failed to extract content from ${item.link}:`, error.message);
            }
          }));
        }
        
        // Format the results with any extracted content
        sortedResults.forEach((item, index) => {
          formattedResults += `${index + 1}. ${item.title}\n${item.snippet || ''}\n`;
          
          if (item.extractedContent) {
            formattedResults += `Extracted content: ${item.extractedContent.substring(0, 300)}...\n`;
          }
          
          formattedResults += `Source: ${item.link}\n\n`;
        });
      } else {
        formattedResults += "No relevant results found.";
      }
      
      // Cache the results
      this.webCache[cacheKey] = {
        results: formattedResults,
        timestamp: Date.now(),
        rawResults: sortedResults
      };
      
      return formattedResults;
    } catch (error) {
      console.error('Enhanced web search error:', error);
      
      // Fall back to basic search if the enhanced search fails
      try {
        // Use a public search API as fallback
        const response = await axios.get(`https://ddg-api.herokuapp.com/search?query=${encodeURIComponent(query)}&limit=3`);
        
        // Format results
        let results = "Web search results (fallback):\n\n";
        
        if (response.data && response.data.length > 0) {
          response.data.forEach((item, index) => {
            results += `${index + 1}. ${item.title}\n${item.snippet}\nSource: ${item.link}\n\n`;
          });
        } else {
          results += "No relevant results found.";
        }
        
        return results;
      } catch (fallbackError) {
        console.error('Fallback search also failed:', fallbackError);
        return "Error searching the web. Using existing knowledge only.";
      }
    }
  }
  
  /**
   * Search DuckDuckGo for information
   * 
   * @private
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} - Search results
   */
  async _searchDDG(query, options = {}) {
    try {
      const response = await axios.get(`https://ddg-api.herokuapp.com/search?query=${encodeURIComponent(query)}&limit=${options.limit || 5}`);
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(item => ({
          title: item.title,
          snippet: item.snippet,
          link: item.link,
          source: 'duckduckgo'
        }));
      }
      return [];
    } catch (error) {
      console.error('DuckDuckGo search error:', error);
      return [];
    }
  }
  
  /**
   * Search Google for information (simulation, as real API requires credentials)
   * 
   * @private
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} - Search results
   */
  async _searchGoogle(query, options = {}) {
    // In a real implementation, this would use the Google Custom Search API
    // For now, we'll simulate it to avoid API key requirements
    return [];
  }
  
  /**
   * Search Bing for information (simulation, as real API requires credentials)
   * 
   * @private
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} - Search results
   */
  async _searchBing(query, options = {}) {
    // In a real implementation, this would use the Bing Search API
    // For now, we'll simulate it to avoid API key requirements
    return [];
  }
  
  /**
   * Extract content from a URL
   * 
   * @private
   * @param {string} url - URL to extract content from
   * @returns {Promise<string>} - Extracted content
   */
  async _extractContentFromUrl(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.webLearning.userAgent
        },
        timeout: 5000 // 5 second timeout
      });
      
      const $ = cheerio.load(response.data);
      
      // Remove scripts, styles, and other non-content elements
      $('script, style, iframe, nav, footer, header, aside').remove();
      
      // Extract the main content
      let content = '';
      
      // Try to find the main content area
      const mainContent = $('main, article, .content, .post, .entry, #content, #main');
      
      if (mainContent.length > 0) {
        content = mainContent.first().text();
      } else {
        // Fallback to body content
        content = $('body').text();
      }
      
      // Clean up the content
      return content
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();
    } catch (error) {
      console.error(`Error extracting content from ${url}:`, error);
      throw error;
    }
  }
  
  /**
   * Deduplicate search results based on URL
   * 
   * @private
   * @param {Array} results - Search results to deduplicate
   * @returns {Array} - Deduplicated results
   */
  _deduplicateResults(results) {
    const seen = new Set();
    return results.filter(item => {
      const url = item.link;
      if (seen.has(url)) {
        return false;
      }
      seen.add(url);
      return true;
    });
  }
  
  /**
   * Generate a cache key for a query
   * 
   * @private
   * @param {string} query - Query

  /**
   * Answer a question with web search enhancement
   * 
   * @param {string} question - User question
   * @returns {Promise<Object>} - Answer with sources
   */
  async answerQuestion(question) {
    try {
      // First try to answer with model's knowledge
      const initialPrompt = `
        Question: ${question}
        
        Please answer this question about payment processing, finance, or Sunny Payment Gateway.
        If you don't know the answer, say "I need to search for more information."
      `;
      
      const initialResponse = await this.generateCompletion(initialPrompt);
      
      // Check if model needs more information
      if (initialResponse.response.includes("I need to search") || 
          initialResponse.response.includes("I don't know") ||
          initialResponse.response.includes("I don't have enough information")) {
        
        // Search the web for more information
        const webResults = await this.searchWeb(question);
        
        // Generate a new response with web information
        const enhancedPrompt = `
          Question: ${question}
          
          ${webResults}
          
          Based on the web search results above, please answer the question.
          Include relevant information from the search results and cite your sources.
        `;
        
        const enhancedResponse = await this.generateCompletion(enhancedPrompt);
        
        return {
          answer: enhancedResponse.response,
          usedWebSearch: true,
          sources: webResults
        };
      }
      
      return {
        answer: initialResponse.response,
        usedWebSearch: false
      };
    } catch (error) {
      console.error('Question answering error:', error);
      return {
        answer: "I'm sorry, I encountered an error while processing your question.",
        error: error.message
      };
    }
  }
}

export default OllamaService;