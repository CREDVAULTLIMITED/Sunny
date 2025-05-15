/**
 * Sunny Payment Gateway - AI Assistant
 * 
 * Provides an intelligent assistant powered by TinyLlama that can learn from the internet
 */

import OllamaService from './OllamaService';

class SunnyAssistant {
  constructor(config = {}) {
    this.ollamaService = new OllamaService({
      modelName: config.modelName || 'tinyllama',
      apiUrl: config.apiUrl || 'http://localhost:11434/api',
      systemPrompt: config.systemPrompt || 
        'You are Sunny AI, an assistant for Sunny Payment Gateway. You help with payment processing, answer questions about finance, and provide support for users.',
      webEnabled: config.webEnabled !== undefined ? config.webEnabled : true
    });
    
    // Store conversation history
    this.conversationHistory = [];
    this.maxHistoryLength = config.maxHistoryLength || 10;
  }

  /**
   * Ask a question and get an answer, with internet search if needed
   * 
   * @param {string} question - User's question
   * @param {Object} context - Additional context (user info, transaction data, etc.)
   * @returns {Promise<Object>} - Answer with metadata
   */
  async ask(question, context = {}) {
    try {
      // Add context to the conversation history
      this.conversationHistory.push({
        role: 'user',
        content: question,
        timestamp: new Date().toISOString()
      });
      
      // Trim history if needed
      if (this.conversationHistory.length > this.maxHistoryLength * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength * 2);
      }
      
      // Format conversation history for context
      const historyText = this.conversationHistory
        .slice(-this.maxHistoryLength * 2)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n');
      
      // Get answer with web search capability
      const response = await this.ollamaService.answerQuestion(question);
      
      // Add response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toISOString()
      });
      
      return {
        answer: response.answer,
        usedWebSearch: response.usedWebSearch,
        sources: response.sources,
        conversationId: this._generateConversationId()
      };
    } catch (error) {
      console.error('Assistant error:', error);
      return {
        answer: "I'm sorry, I encountered an error while processing your question.",
        error: error.message
      };
    }
  }

  /**
   * Get documentation on a specific topic
   * 
   * @param {string} topic - Topic to get documentation for
   * @returns {Promise<Object>} - Documentation content
   */
  async getDocumentation(topic) {
    try {
      const prompt = `
        Please provide comprehensive documentation about "${topic}" in the context of payment processing and Sunny Payment Gateway.
        Include code examples where appropriate.
        Format your response in markdown.
      `;
      
      const response = await this.ollamaService.generateCompletion(prompt);
      
      return {
        content: response.response,
        topic
      };
    } catch (error) {
      console.error('Documentation error:', error);
      return {
        content: `Error generating documentation for ${topic}.`,
        error: error.message
      };
    }
  }

  /**
   * Analyze code for security issues
   * 
   * @param {string} code - Code to analyze
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Security analysis
   */
  async analyzeCodeSecurity(code, language) {
    try {
      const prompt = `
        Please analyze this ${language} code for security vulnerabilities, especially related to payment processing:
        
        \`\`\`${language}
        ${code}
        \`\`\`
        
        Identify any security issues, potential vulnerabilities, or best practices that aren't being followed.
        Format your response as a list of findings with severity levels and recommendations.
      `;
      
      const response = await this.ollamaService.generateCompletion(prompt);
      
      return {
        analysis: response.response,
        language
      };
    } catch (error) {
      console.error('Code security analysis error:', error);
      return {
        analysis: "Error analyzing code security.",
        error: error.message
      };
    }
  }

  /**
   * Generate a unique conversation ID
   * 
   * @private
   * @returns {string} - Unique conversation ID
   */
  _generateConversationId() {
    return `conv-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}

export default SunnyAssistant;