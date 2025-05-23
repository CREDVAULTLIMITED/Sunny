/**
 * SunnyAI Configuration
 * 
 * Central configuration for the SunnyAI service integration with the Sunny Payment Gateway.
 * This file manages settings for model configuration, API connections, backup procedures,
 * update mechanisms, learning capabilities, and security settings.
 */

// Base model configuration
const MODEL_CONFIG = {
  name: 'sunnyai', // The custom model name we created
  baseModel: 'tinyllama', // The underlying base model
  version: '1.0.0', // Version tracking for the model
  endpoint: 'http://localhost:11434', // Default Ollama endpoint
  parameters: {
    temperature: 0.7, // Controls randomness: lower is more deterministic
    top_k: 40, // Limits token selection to top K options
    top_p: 0.9, // Nucleus sampling threshold
    max_tokens: 2048, // Maximum tokens in response
    context_window: 4096, // Context window size
    system_prompt: null, // Will be loaded from Modelfile automatically
  },
};

// API connection settings
const API_CONFIG = {
  timeout: 30000, // Timeout for API calls in ms
  retryAttempts: 3, // Number of retry attempts
  retryDelay: 1000, // Delay between retries in ms
  concurrentRequests: 5, // Maximum concurrent requests
  rateLimit: {
    requestsPerMinute: 60, // Rate limiting
    burstLimit: 10, // Burst request limit
  },
  healthCheckInterval: 60000, // Health check interval in ms
};

// Backup procedures
const BACKUP_CONFIG = {
  enabled: true, // Enable automatic backups
  modelBackupInterval: 604800000, // One week in ms
  modelBackupPath: '../backups/models/', // Path for model backups
  modelVersionsToKeep: 3, // Number of backup versions to keep
  learningDataBackupInterval: 86400000, // One day in ms
  learningDataBackupPath: '../backups/learning-data/', // Path for learning data backups
  backupFormat: 'tar.gz', // Backup compression format
  automaticRestore: true, // Automatically restore on failure
};

// Update mechanisms
const UPDATE_CONFIG = {
  enabled: true, // Enable automatic updates
  checkForUpdatesInterval: 86400000, // One day in ms
  autoInstallUpdates: false, // Require manual approval for updates
  modelUpdateUrl: 'https://api.sunny-payments.com/ai/model-updates',
  updateTypes: ['security', 'performance', 'features'], // Types of updates to include
  validateChecksums: true, // Validate checksums before installing updates
  updateLog: '../logs/updates.log', // Log file for update activities
  rollbackOnFailure: true, // Roll back to previous version on failure
};

// Learning capabilities
const LEARNING_CONFIG = {
  enabled: true, // Enable learning capabilities
  learningModes: {
    webLearning: {
      enabled: true, // Enable web-based learning
      interval: 3600000, // One hour in ms
      topicsRefreshInterval: 86400000, // Refresh topics every day
      maxSourcesPerTopic: 10, // Maximum sources per topic
      userAgent: 'SunnyAI Learning Service/1.0', // User agent for web requests
      cacheTTL: 604800000, // Cache time-to-live (one week)
      cachePath: '../cache/web-learning/', // Path for caching web content
      priorityTopics: [
        'payment processing',
        'financial security',
        'fraud detection',
        'payment regulations',
        'global payment methods',
      ],
      blockedDomains: [], // Domains to avoid when learning
    },
    transactionLearning: {
      enabled: true, // Enable learning from transactions
      sampleSize: 1000, // Number of transactions to sample
      interval: 43200000, // Twice a day in ms
      anonymization: true, // Anonymize transaction data
      featureExtraction: true, // Extract features from transactions
      minConfidenceThreshold: 0.8, // Minimum confidence for learning
    },
    feedbackLearning: {
      enabled: true, // Enable learning from user feedback
      minFeedbackSamples: 50, // Minimum feedback samples before applying
      reviewInterval: 604800000, // Review feedback once a week
      humanReviewRequired: true, // Require human review before applying
    },
    regulatoryLearning: {
      enabled: true, // Enable learning from regulatory changes
      sources: [
        'https://api.regulatory-updates.com/finance',
        'https://banking-regulations.org/api/changes',
      ],
      interval: 86400000, // Once a day in ms
      alertOnChanges: true, // Alert on regulatory changes
    },
  },
  learningLimits: {
    maxDailyWebQueries: 1000, // Maximum daily web queries
    maxModelUpdatesPerMonth: 4, // Maximum model updates per month
    storageLimit: 1073741824, // 1GB storage limit for learning data
  },
};

// Performance monitoring
const MONITORING_CONFIG = {
  enabled: true, // Enable performance monitoring
  metricsInterval: 60000, // Collect metrics every minute
  metricsPath: '../logs/metrics/', // Path for metrics
  logLevel: 'info', // Log level
  logPath: '../logs/ai-service/', // Path for logs
  alertThresholds: {
    responseTime: 2000, // Alert if response time exceeds 2s
    errorRate: 0.05, // Alert if error rate exceeds 5%
    modelLoadCpuUsage: 0.9, // Alert if CPU usage exceeds 90%
    modelLoadMemoryUsage: 0.9, // Alert if memory usage exceeds 90%
  },
  performanceOptimization: {
    enableModelCaching: true, // Cache model in memory
    enableResponseCaching: true, // Cache common responses
    responseCacheTTL: 3600000, // Cache responses for one hour
    adaptiveResourceAllocation: true, // Adapt resource allocation based on load
  },
};

// Security settings
const SECURITY_CONFIG = {
  enabled: true, // Enable security features
  inputValidation: true, // Validate inputs
  outputSanitization: true, // Sanitize outputs
  sensitiveDataDetection: true, // Detect sensitive data
  sensitiveDataCategories: [
    'CREDIT_CARD',
    'SSN',
    'PASSWORD',
    'API_KEY',
    'ACCOUNT_NUMBER',
  ],
  maxInputLength: 4096, // Maximum input length
  authenticationRequired: true, // Require authentication for AI endpoints
  encryptWebLearningData: true, // Encrypt web learning data
  encryptionKey: process.env.AI_ENCRYPTION_KEY || 'defaultDevelopmentKey', // Encryption key (should be set in env)
  ipAllowlist: [], // Empty array means no IP restrictions
  auditLogging: true, // Enable audit logging
  auditLogPath: '../logs/audit/', // Path for audit logs
};

// Integration points
const INTEGRATION_CONFIG = {
  paymentRoutingIntegration: {
    enabled: true, // Enable payment routing integration
    confidenceThreshold: 0.8, // Minimum confidence threshold
    fallbackStrategy: 'rule-based', // Fallback strategy
    optimizationMetric: 'success_rate', // Metric to optimize
  },
  fraudDetectionIntegration: {
    enabled: true, // Enable fraud detection integration
    sensitivityLevel: 0.7, // Sensitivity level (0-1)
    realTimeScoring: true, // Enable real-time scoring
    manualReviewThreshold: 0.4, // Manual review threshold
    autoDeclineThreshold: 0.9, // Auto-decline threshold
  },
  assistantIntegration: {
    enabled: true, // Enable assistant integration
    availableInPublicCheckout: true, // Make assistant available in public checkout
    availableInDashboard: true, // Make assistant available in dashboard
    knowledgeBasePath: '../knowledge-base/', // Path to knowledge base
    predefinedResponses: '../data/assistant-responses.json', // Predefined responses
  },
  dashboardIntegration: {
    enabled: true, // Enable dashboard integration
    showAiInsights: true, // Show AI insights in dashboard
    aiRecommendationsEnabled: true, // Enable AI recommendations
    predictiveAnalyticsEnabled: true, // Enable predictive analytics
  },
};

// Export configurations
module.exports = {
  MODEL_CONFIG,
  API_CONFIG,
  BACKUP_CONFIG,
  UPDATE_CONFIG,
  LEARNING_CONFIG,
  MONITORING_CONFIG,
  SECURITY_CONFIG,
  INTEGRATION_CONFIG,
  
  // Helper functions
  getFullConfig: () => ({
    model: MODEL_CONFIG,
    api: API_CONFIG,
    backup: BACKUP_CONFIG,
    update: UPDATE_CONFIG,
    learning: LEARNING_CONFIG,
    monitoring: MONITORING_CONFIG,
    security: SECURITY_CONFIG,
    integration: INTEGRATION_CONFIG,
  }),
  
  // Initialize with environment-specific overrides
  initialize: (env = 'development') => {
    // Apply environment-specific configurations
    if (env === 'production') {
      SECURITY_CONFIG.authenticationRequired = true;
      API_CONFIG.rateLimit.requestsPerMinute = 30;
      BACKUP_CONFIG.modelBackupInterval = 86400000; // Daily backups in production
      MODEL_CONFIG.parameters.temperature = 0.6; // More conservative in production
    } else if (env === 'testing') {
      LEARNING_CONFIG.enabled = false;
      UPDATE_CONFIG.enabled = false;
      MONITORING_CONFIG.logLevel = 'debug';
      SECURITY_CONFIG.authenticationRequired = false;
    }
    
    // Log initialization
    console.log(`SunnyAI initialized in ${env} environment`);
    
    return module.exports.getFullConfig();
  }
};

