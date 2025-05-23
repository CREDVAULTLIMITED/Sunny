/**
 * Regulatory Compliance Engine for Sunny Payment Gateway
 * 
 * This engine optimizes payment routing based on regulatory requirements,
 * minimizes compliance overhead, and implements tax efficiency strategies.
 * It works in conjunction with RegionalAnalytics to make intelligent routing decisions.
 */

import RegionalAnalytics from '../analytics/regionalAnalytics.js';
import { PAYMENT_METHODS } from '../constants.js';
import OllamaService from '../ai/OllamaService.js';

class RegulatoryComplianceEngine {
  constructor(config = {}) {
    // Initialize RegionalAnalytics
    this.regionalAnalytics = new RegionalAnalytics(config.regionalAnalytics || {});
    
    // Initialize Ollama service for compliance reasoning
    this.ollamaService = new OllamaService({
      modelName: config.modelName || 'tinyllama',
      apiUrl: config.apiUrl || 'http://localhost:11434/api',
      systemPrompt: config.systemPrompt || 
        'You are a regulatory compliance assistant for Sunny Payment Gateway. Your job is to analyze compliance requirements and optimize payment routing for regulatory efficiency.'
    });
    
    // Compliance thresholds
    this.minComplianceScore = config.minComplianceScore || 0.7;
    this.highComplianceThreshold = config.highComplianceThreshold || 0.9;
    
    // Tax optimization settings
    this.enableTaxOptimization = config.enableTaxOptimization !== undefined ? 
      config.enableTaxOptimization : true;
    this.taxOptimizationWeight = config.taxOptimizationWeight || 0.3; // 0-1 weight in routing decisions
    
    // Regulatory optimization settings
    this.enableRegulatoryOptimization = config.enableRegulatoryOptimization !== undefined ? 
      config.enableRegulatoryOptimization : true;
    this.regulatoryOptimizationWeight = config.regulatoryOptimizationWeight || 0.4; // 0-1 weight in routing decisions
    
    // Compliance data stores
    this.complianceScores = {};
    this.taxEfficiencyScores = {};
    this.optimalRoutingPaths = {};
    this.regulatoryOverheadEstimates = {};
    
    // Regulatory change monitoring
    this.knownRegulations = {};
    this.regulatoryChangeDetection = {
      enabled: config.detectRegulatoryChanges !== undefined ? 
        config.detectRegulatoryChanges : true,
      checkInterval: config.regulatoryCheckInterval || 24 * 60 * 60 * 1000, // 24 hours
      lastChecked: {}
    };
    
    // Documentation requirements tracking
    this.documentationRequirements = {};
    
    // Initialize engine
    this._initializeEngine();
  }
  
  /**
   * Initialize the compliance engine
   * 
   * @private
   */
  async _initializeEngine() {
    console.log('Initializing Regulatory Compliance Engine...');
    
    // Pre-load common regulatory frameworks
    this._preloadCommonRegulations();
  }
  
  /**
   * Preload common regulatory frameworks
   * 
   * @private
   */
  async _preloadCommonRegulations() {
    const commonFrameworks = [
      'KYC/AML requirements', 
      'data protection regulations', 
      'payment services directives',
      'cross-border payment regulations',
      'cryptocurrency regulations'
    ];
    
    for (const framework of commonFrameworks) {
      try {
        // Don't await to avoid blocking initialization
        this._fetchRegulatoryFramework(framework);
      } catch (error) {
        console.error(`Error preloading ${framework}:`, error);
      }
    }
  }
  
  /**
   * Fetch information about a regulatory framework
   * 
   * @private
   * @param {string} framework - Name of the regulatory framework
   * @returns {Promise<Object>} - Framework information
   */
  async _fetchRegulatoryFramework(framework) {
    try {
      const prompt = `
        Please provide a structured overview of ${framework} as they apply to payment processing,
        with particular focus on:
        
        1. Key compliance requirements
        2. Regional variations (particularly across African countries)
        3. Documentation requirements
        4. Reporting obligations
        5. Penalties for non-compliance
        6. Implementation challenges
        7. Optimization strategies
        
        Format your response as structured data that can be parsed programmatically.
      `;
      
      const response = await this.ollamaService.generateCompletion(prompt);
      
      // Store the framework information
      this.knownRegulations[framework] = {
        framework,
        information: response.response,
        timestamp: Date.now()
      };
      
      return this.knownRegulations[framework];
    } catch (error) {
      console.error(`Error fetching regulatory framework ${framework}:`, error);
      throw error;
    }
  }
  
  /**
   * Calculate the optimal payment route based on regulatory efficiency
   * 
   * @param {Object} transactionData - Transaction data including source/destination
   * @param {Array} availableMethods - Available payment methods
   * @returns {Promise<Object>} - Optimized routing recommendation
   */
  async calculateOptimalRoute(transactionData, availableMethods) {
    try {
      // Skip optimization if disabled
      if (!this.enableRegulatoryOptimization) {
        return {
          recommendedMethod: availableMethods[0],
          reason: 'Regulatory optimization disabled',
          optimized: false,
          scores: {}
        };
      }
      
      const sourceRegion = transactionData.sourceRegion || transactionData.country || 'unknown';
      const destinationRegion = transactionData.destinationRegion || transactionData.recipientCountry || sourceRegion;
      const isCrossBorder = sourceRegion !== destinationRegion && sourceRegion !== 'unknown' && destinationRegion !== 'unknown';
      
      // Store for method scores
      const methodScores = {};
      
      // Calculate regulatory efficiency for each method
      for (const method of availableMethods) {
        let regulatoryScore;
        let taxScore;
        
        if (isCrossBorder) {
          // Calculate cross-border efficiency
          const crossBorderResult = await this.regionalAnalytics.calculateCrossBorderEfficiency(
            sourceRegion, 
            destinationRegion, 
            method
          );
          
          regulatoryScore = crossBorderResult.efficiencyScore || 0.5;
          taxScore = crossBorderResult.taxEfficiencyScore || 0.5;
          
          // Store compliance information
          this._storeComplianceInfo(sourceRegion, destinationRegion, method, crossBorderResult);
        } else {
          // Calculate single-region efficiency
          const regulatoryResult = await this.regionalAnalytics.calculateRegulatoryEfficiency(
            sourceRegion,
            method
          );
          
          regulatoryScore = regulatoryResult.efficiencyScore || 0.5;
          taxScore = regulatoryResult.taxEfficiencyScore || 0.5;
          
          // Store compliance information
          this._storeComplianceInfo(sourceRegion, null, method, regulatoryResult);
        }
        
        // Calculate combined score with appropriate weights
        const combinedScore = (
          (regulatoryScore * this.regulatoryOptimizationWeight) +
          (taxScore * this.taxOptimizationWeight) +
          // Use complement of weights for standard success rate
          ((1 - this.regulatoryOptimizationWeight - this.taxOptimizationWeight) * 0.7)
        );
        
        methodScores[method] = {
          combined: combinedScore,
          regulatory: regulatoryScore,
          tax: taxScore,
          isCrossBorder
        };
      }
      
      // Find method with highest score
      let bestMethod = availableMethods[0];
      let bestScore = methodScores[bestMethod]?.combined || 0;
      
      for (const method of availableMethods) {
        const score = methodScores[method]?.combined || 0;
        if (score > bestScore) {
          bestScore = score;
          bestMethod = method;
        }
      }
      
      // Generate explanation
      const explanation = await this._generateRouteExplanation(
        bestMethod,
        methodScores[bestMethod],
        sourceRegion,
        destinationRegion,
        isCrossBorder
      );
      
      return {
        recommendedMethod: bestMethod,
        reason: explanation,
        optimized: true,
        scores: methodScores,
        regulatoryEfficiency: methodScores[bestMethod]?.regulatory || 0,
        taxEfficiency: methodScores[bestMethod]?.tax || 0,
        isCrossBorder
      };
    } catch (error) {
      console.error('Error calculating optimal regulatory route:', error);
      
      // Fallback to first available method
      return {
        recommendedMethod: availableMethods[0],
        reason: 'Error in regulatory optimization',
        optimized: false,
        error: error.message
      };
    }
  }
  
  /**
   * Store compliance information for future reference
   * 
   * @private
   * @param {string} sourceRegion - Source region
   * @param {string} destinationRegion - Destination region (null for single-region)
   * @param {string} method - Payment method
   * @param {Object} complianceData - Compliance data from analysis
   */
  _storeComplianceInfo(sourceRegion, destinationRegion, method, complianceData) {
    const key = destinationRegion ? 
      `${sourceRegion}_to_${destinationRegion}_${method}` : 
      `${sourceRegion}_${method}`;
      
    this.complianceScores[key] = {
      sourceRegion,
      destinationRegion,
      method,
      efficiencyScore: complianceData.efficiencyScore || 0.5,
      taxEfficiencyScore: complianceData.taxEfficiencyScore || 0.5,
      complianceRequirements: complianceData.complianceRequirements || [],
      documentationRequirements: complianceData.documentationRequirements || [],
      regulatoryOverhead: complianceData.regulatoryCosts || null,
      timestamp: Date.now()
    };
    
    // Store documentation requirements separately for easy access
    const docKey = destinationRegion ? 
      `${sourceRegion}_to_${destinationRegion}` : 
      sourceRegion;
      
    if (!this.documentationRequirements[docKey]) {
      this.documentationRequirements[docKey] = {};
    }
    
    this.documentationRequirements[docKey][method] = 
      complianceData.documentationRequirements || [];
  }
  
  /**
   * Generate human-readable explanation for route recommendation
   * 
   * @private
   * @param {string} method - Recommended payment method
   * @param {Object} scores - Scoring details
   * @param {string} sourceRegion - Source region
   * @param {string} destinationRegion - Destination region
   * @param {boolean} isCrossBorder - Whether this is a cross-border transaction
   * @returns {Promise<string>} - Explanation for recommendation
   */
  async _generateRouteExplanation(method, scores, sourceRegion, destinationRegion, isCrossBorder) {
    // Generate basic explanation based on scores
    if (!scores) {
      return "Recommended based on availability";
    }
    
    let explanation = `${method} provides `;
    
    // Add regulatory component if significant
    if (scores.regulatory > 0.7) {
      explanation += `strong regulatory efficiency (${Math.round(scores.regulatory * 100)}%)`;
    } else if (scores.regulatory > 0.5) {
      explanation += `moderate regulatory efficiency (${Math.round(scores.regulatory * 100)}%)`;
    } else {
      explanation += `acceptable regulatory compliance`;
    }
    
    // Add tax component
    if (scores.tax > 0.7) {
      explanation += ` with excellent tax efficiency (${Math.round(scores.tax * 100)}%)`;
    } else if (scores.tax > 0.5) {
      explanation += ` with good tax efficiency (${Math.round(scores.tax * 100)}%)`;
    } else {
      explanation += ` with standard tax handling`;
    }
    
    // Add cross-border note if applicable
    if (isCrossBorder) {
      explanation += ` for cross-border transactions from ${sourceRegion} to ${destinationRegion}`;
    }
    
    return explanation;
  }
  
  /**
   * Get documentation requirements for a transaction
   * 
   * @param {Object} transactionData - Transaction data
   * @param {string} paymentMethod - Payment method
   * @returns {Promise<Object>} - Documentation requirements
   */
  async getDocumentationRequirements(transactionData, paymentMethod) {
    try {
      const sourceRegion = transactionData.sourceRegion || transactionData.country || 'unknown';
      const destinationRegion = transactionData.destinationRegion || transactionData.recipientCountry || sourceRegion;
      const isCrossBorder = sourceRegion !== destinationRegion && sourceRegion !== 'unknown' && destinationRegion !== 'unknown';
      
      const docKey = isCrossBorder ? 
        `${sourceRegion}_to_${destinationRegion}` : 
        sourceRegion;
        
      // Check if we already have the documentation requirements
      if (this.documentationRequirements[docKey] && 
          this.documentationRequirements[docKey][paymentMethod]) {
        return {
          requirements: this.documentationRequirements[docKey][paymentMethod],
          source: 'cache',
          timestamp: Date.now()
        };
      }
      
      // If not, get efficiency data which will populate the requirements
      if (isCrossBorder) {
        await this.regionalAnalytics.calculateCrossBorderEfficiency(
          sourceRegion, 
          destinationRegion, 
          paymentMethod
        );
      } else {
        await this.regionalAnalytics.calculateRegulatoryEfficiency(
          sourceRegion,
          paymentMethod
        );
      }
      
      // Now check again
      if (this.documentationRequirements[docKey] && 
          this.documentationRequirements[docKey][paymentMethod]) {
        return {
          requirements: this.documentationRequirements[docKey][paymentMethod],
          source: 'fresh_calculation',
          timestamp: Date.now()
        };
      }
      
      // If still not available, generate generic requirements
      return this._generateGenericDocumentationRequirements(
        sourceRegion, 
        destinationRegion, 
        paymentMethod, 
        isCrossBorder
      );
    } catch (error) {
      console.error('Error getting documentation requirements:', error);
      
      // Return generic requirements on error
      return this._generateGenericDocumentationRequirements(
        transactionData.sourceRegion || transactionData.country || 'unknown',
        transactionData.destinationRegion || transactionData.recipientCountry,

