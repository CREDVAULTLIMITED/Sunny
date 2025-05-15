/**
 * Sunny Payment Gateway - Ollama Integration Service
 * 
 * Provides integration with TinyLlama model via Ollama
 */

class OllamaService {
  constructor(config = {}) {
    this.modelName = config.modelName || 'tinyllama';
    this.apiUrl = config.apiUrl || 'http://localhost:11434/api';
    this.systemPrompt = config.systemPrompt || 
      'You are an AI assistant for Sunny Payment Gateway. You help with payment routing, fraud detection, and answering questions about payment processing.';
    this.webEnabled = config.webEnabled !== undefined ? config.webEnabled : true;
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
   * Search the web for information to enhance AI responses
   * 
   * @param {string} query - Search query
   * @returns {Promise<string>} - Web search results
   */
  async searchWeb(query) {
    if (!this.webEnabled) {
      return "Web search is disabled.";
    }

    try {
      // Use a public search API (in a real implementation, you'd use a proper API)
      const response = await fetch(`https://ddg-api.herokuapp.com/search?query=${encodeURIComponent(query)}&limit=3`);
      
      if (!response.ok) {
        throw new Error(`Web search API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format results
      let results = "Web search results:\n\n";
      
      if (data && data.length > 0) {
        data.forEach((item, index) => {
          results += `${index + 1}. ${item.title}\n${item.snippet}\nSource: ${item.link}\n\n`;
        });
      } else {
        results += "No relevant results found.";
      }
      
      return results;
    } catch (error) {
      console.error('Web search error:', error);
      return "Error searching the web. Using existing knowledge only.";
    }
  }

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