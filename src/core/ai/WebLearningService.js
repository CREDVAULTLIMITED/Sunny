/**
 * Sunny Payment Gateway - Web Learning Service
 * 
 * Service for learning from internet sources to enhance AI capabilities
 */

import OllamaService from './OllamaService';

class WebLearningService {
  constructor(config = {}) {
    this.ollamaService = new OllamaService({
      modelName: config.modelName || 'tinyllama',
      webEnabled: true
    });
    
    // Cache for learned information
    this.knowledgeCache = {};
    
    // Cache expiration time (default: 24 hours)
    this.cacheExpirationMs = config.cacheExpirationMs || 24 * 60 * 60 * 1000;
    
    // Learning topics
    this.learningTopics = config.learningTopics || [
      'payment processing',
      'fraud detection',
      'financial security',
      'payment methods',
      'transaction routing'
    ];
  }

  /**
   * Learn about a specific topic from the internet
   * 
   * @param {string} topic - Topic to learn about
   * @returns {Promise<Object>} - Learning results
   */
  async learnAboutTopic(topic) {
    try {
      // Check if we have recent information in cache
      if (this.knowledgeCache[topic]) {
        const cacheAge = Date.now() - new Date(this.knowledgeCache[topic].timestamp).getTime();
        if (cacheAge < this.cacheExpirationMs) {
          return {
            topic,
            information: this.knowledgeCache[topic].information,
            fromCache: true,
            timestamp: this.knowledgeCache[topic].timestamp
          };
        }
      }
      
      // Search the web for information
      const response = await this.ollamaService.answerQuestion(
        `What are the latest developments, best practices, and important information about "${topic}" in the context of payment processing and financial technology?`
      );
      
      // Cache the result
      this.knowledgeCache[topic] = {
        information: response.answer,
        timestamp: new Date().toISOString()
      };
      
      return {
        topic,
        information: response.answer,
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
   * Run scheduled learning to update knowledge
   * 
   * @returns {Promise<Object>} - Learning results
   */
  async runScheduledLearning() {
    try {
      const results = {};
      
      // Learn about each topic
      for (const topic of this.learningTopics) {
        results[topic] = await this.learnAboutTopic(topic);
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
        error: error.message
      };
    }
  }
}

export default WebLearningService;