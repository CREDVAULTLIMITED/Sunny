/**
 * SunnyAI Service
 * 
 * Main service for interacting with the SunnyAI model through Ollama.
 * Implements configuration settings, backup procedures, learning capabilities,
 * and monitoring features.
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const tar = require('tar');
const crypto = require('crypto');
const EventEmitter = require('events');
const config = require('./config');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Initialize configuration with environment
const ENV = process.env.NODE_ENV || 'development';
const CONFIG = config.initialize(ENV);

class SunnyAIService extends EventEmitter {
  constructor() {
    super();
    this.config = CONFIG;
    this.client = axios.create({
      baseURL: this.config.model.endpoint,
      timeout: this.config.api.timeout,
    });
    this.rateLimiter = {
      requestCount: 0,
      lastResetTime: Date.now(),
      burstCount: 0,
    };
    this.caches = {
      responses: new Map(),
      webData: new Map(),
    };
    this.metrics = {
      requestCount: 0,
      successCount: 0,
      errorCount: 0,
      totalResponseTime: 0,
      averageResponseTime: 0,
    };
    this.isInitialized = false;
    this.learningQueue = [];
    this.backupSchedules = {};
    this.updateSchedules = {};
    this.monitoringSchedules = {};
  }

  /**
   * Initialize the service
   */
  async initialize() {
    try {
      if (this.isInitialized) {
        return;
      }

      this.log('info', 'Initializing SunnyAI Service');
      
      // Create necessary directories
      await this.createDirectories();
      
      // Check model availability
      await this.checkModelAvailability();
      
      // Set up scheduled tasks
      this.setupScheduledTasks();
      
      // Initialize learning capabilities
      if (this.config.learning.enabled) {
        await this.initializeLearning();
      }
      
      // Initialize monitoring
      if (this.config.monitoring.enabled) {
        this.initializeMonitoring();
      }
      
      this.isInitialized = true;
      this.emit('initialized');
      this.log('info', 'SunnyAI Service initialized successfully');
      
      return true;
    } catch (error) {
      this.log('error', `Initialization failed: ${error.message}`);
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Create necessary directories for operation
   */
  async createDirectories() {
    const dirs = [
      path.dirname(this.config.backup.modelBackupPath),
      path.dirname(this.config.backup.learningDataBackupPath),
      path.dirname(this.config.update.updateLog),
      path.dirname(this.config.monitoring.metricsPath),
      path.dirname(this.config.monitoring.logPath),
      path.dirname(this.config.security.auditLogPath),
      this.config.learning.learningModes.webLearning.cachePath,
    ];

    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
        this.log('debug', `Created directory: ${dir}`);
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
    }
  }

  /**
   * Check if the SunnyAI model is available in Ollama
   */
  async checkModelAvailability() {
    try {
      const response = await this.client.get('/api/tags');
      const models = response.data.models || [];
      
      const modelExists = models.some(model => 
        model.name === this.config.model.name
      );
      
      if (!modelExists) {
        this.log('warn', `Model ${this.config.model.name} not found in Ollama`);
        throw new Error(`Model ${this.config.model.name} not available`);
      }
      
      this.log('info', `Model ${this.config.model.name} is available`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        this.log('error', 'Ollama API not found. Is Ollama running?');
        throw new Error('Ollama API not available');
      }
      throw error;
    }
  }

  /**
   * Set up scheduled tasks based on configuration
   */
  setupScheduledTasks() {
    // Backup schedules
    if (this.config.backup.enabled) {
      this.backupSchedules.model = setInterval(() => {
        this.backupModel().catch(err => 
          this.log('error', `Model backup failed: ${err.message}`)
        );
      }, this.config.backup.modelBackupInterval);
      
      this.backupSchedules.learningData = setInterval(() => {
        this.backupLearningData().catch(err => 
          this.log('error', `Learning data backup failed: ${err.message}`)
        );
      }, this.config.backup.learningDataBackupInterval);
    }
    
    // Update schedules
    if (this.config.update.enabled) {
      this.updateSchedules.checkForUpdates = setInterval(() => {
        this.checkForUpdates().catch(err => 
          this.log('error', `Update check failed: ${err.message}`)
        );
      }, this.config.update.checkForUpdatesInterval);
    }
    
    // Learning schedules
    if (this.config.learning.enabled) {
      const { webLearning, transactionLearning, regulatoryLearning } = 
        this.config.learning.learningModes;
      
      if (webLearning.enabled) {
        this.learningSchedules.webLearning = setInterval(() => {
          this.performWebLearning().catch(err => 
            this.log('error', `Web learning failed: ${err.message}`)
          );
        }, webLearning.interval);
      }
      
      if (transactionLearning.enabled) {
        this.learningSchedules.transactionLearning = setInterval(() => {
          this.learnFromTransactions().catch(err => 
            this.log('error', `Transaction learning failed: ${err.message}`)
          );
        }, transactionLearning.interval);
      }
      
      if (regulatoryLearning.enabled) {
        this.learningSchedules.regulatoryLearning = setInterval(() => {
          this.learnFromRegulations().catch(err => 
            this.log('error', `Regulatory learning failed: ${err.message}`)
          );
        }, regulatoryLearning.interval);
      }
    }
    
    // Monitoring schedules
    if (this.config.monitoring.enabled) {
      this.monitoringSchedules.collectMetrics = setInterval(() => {
        this.collectAndStoreMetrics().catch(err => 
          this.log('error', `Metrics collection failed: ${err.message}`)
        );
      }, this.config.monitoring.metricsInterval);
    }
  }

  /**
   * Initialize learning capabilities
   */
  async initializeLearning() {
    // Load cached learning data if it exists
    try {
      const cachePath = path.join(
        this.config.learning.learningModes.webLearning.cachePath,
        'cache-index.json'
      );
      
      const cacheExists = await fs.access(cachePath)
        .then(() => true)
        .catch(() => false);
      
      if (cacheExists) {
        const cacheData = await fs.readFile(cachePath, 'utf8');
        const parsedCache = JSON.parse(cacheData);
        
        // Load cache entries
        for (const [key, value] of Object.entries(parsedCache)) {
          if (Date.now() < value.expiry) {
            this.caches.webData.set(key, value);
          }
        }
        
        this.log('info', `Loaded ${this.caches.webData.size} cached learning items`);
      }
    } catch (error) {
      this.log('warn', `Failed to load learning cache: ${error.message}`);
    }
  }

  /**
   * Initialize monitoring
   */
  initializeMonitoring() {
    this.log('info', 'Initializing monitoring');
    // Reset metrics on startup
    this.resetMetrics();
  }

  /**
   * Generate a completion using the SunnyAI model
   * @param {string} prompt - The prompt to send to the model
   * @param {Object} options - Additional options for the completion
   * @returns {Promise<Object>} - The completion response
   */
  async generateCompletion(prompt, options = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    const startTime = Date.now();
    
    try {
      // Check rate limits
      this.checkRateLimit();
      
      // Validate and sanitize input
      const sanitizedPrompt = this.validateAndSanitizeInput(prompt);
      
      // Check caches if enabled
      if (this.config.monitoring.performanceOptimization.enableResponseCaching) {
        const cacheKey = this.generateCacheKey(sanitizedPrompt, options);
        const cachedResponse = this.caches.responses.get(cacheKey);
        
        if (cachedResponse && 
            Date.now() - cachedResponse.timestamp < 
            this.config.monitoring.performanceOptimization.responseCacheTTL) {
          this.log('debug', 'Using cached response');
          this.updateMetrics(Date.now() - startTime, true);
          return { ...cachedResponse.data, cached: true };
        }
      }
      
      // Prepare request parameters
      const requestParams = {
        model: this.config.model.name,
        prompt: sanitizedPrompt,
        options: {
          temperature: options.temperature || this.config.model.parameters.temperature,
          top_k: options.top_k || this.config.model.parameters.top_k,
          top_p: options.top_p || this.config.model.parameters.top_p,
          num_predict: options.max_tokens || this.config.model.parameters.max_tokens,
        },
      };
      
      // Make request to Ollama API
      const response = await this.client.post('/api/generate', requestParams);
      
      // Process response
      const result = response.data;
      
      // Cache the response if caching is enabled
      if (this.config.monitoring.performanceOptimization.enableResponseCaching) {
        const cacheKey = this.generateCacheKey(sanitizedPrompt, options);
        this.caches.responses.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }
      
      // Log for security audit if enabled
      if (this.config.security.auditLogging) {
        this.auditLog('completion', { prompt: sanitizedPrompt });
      }
      
      // Update metrics
      this.updateMetrics(Date.now() - startTime, true);
      
      return result;
    } catch (error) {
      // Handle errors
      this.log('error', `Completion error: ${error.message}`);
      this.updateMetrics(Date.now() - startTime, false);
      
      // Retry logic
      if (options.retry !== false && 
          (!options.retryCount || options.retryCount < this.config.api.retryAttempts)) {
        const retryCount = (options.retryCount || 0) + 1;
        this.log('info', `Retrying completion (${retryCount}/${this.config.api.retryAttempts})`);
        
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.generateCompletion(prompt, {
              ...options,
              retryCount,
            }));
          }, this.config.api.retryDelay);
        });
      }
      
      throw error;
    }
  }

  /**
   * Validate and sanitize input according to security settings
   * @param {string} input - The input to validate and sanitize
   * @returns {string} - The validated and sanitized input
   */
  validateAndSanitizeInput(input) {
    if (!this.config.security.inputValidation) {
      return input;
    }
    
    // Check input length
    if (input.length > this.config.security.maxInputLength) {
      input = input.substring(0, this.config.security.maxInputLength);
      this.log('warn', 'Input truncated due to length');
    }
    
    // Check for sensitive data if enabled
    if (this.config.security.sensitiveDataDetection) {
      const sensitivePatterns = {
        CREDIT_CARD: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
        SSN: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
        PASSWORD: /password[=:]\s*['"]?\S+['"]?/gi,
        API_KEY: /api[_-]?key[=:]\s*['"]?\S+['"]?/gi,
        ACCOUNT_NUMBER: /account[_-]?number[=:]\s*['"]?\d+['"]?/gi,
      };
      
      for (const category of this.config.security.sensitiveDataCategories) {
        if (sensitivePatterns[category]) {
          input = input.replace(sensitivePatterns[category], `[REDACTED_${category}]`);
        }
      }
    }
    
    return input;
  }

  /**
   * Generate a cache key for a prompt and options
   * @param {string} prompt - The prompt
   * @param {Object} options - The options
   * @returns {string} - The cache key
   */
  generateCacheKey(prompt, options) {
    const relevantOptions = {
      temperature: options.temperature || this.config.model.parameters.temperature,
      top_k: options.top_k || this.config.model.parameters.top_k,
      top_p: options.top_p || this.config.model.parameters.top_p,
      max_tokens: options.max_tokens || this.config.model.parameters.max_tokens,
    };
    
    const hashInput = `${prompt}|${JSON.stringify(relevantOptions)}`;
    return crypto.createHash('md5').update(hashInput).digest('hex');
  }

  /**
   * Check rate limits before making a request
   */
  checkRateLimit() {
    const now = Date.now();
    const minute = 60 * 1000;
    
    // Reset rate limit counter if a minute has passed
    if (now - this.rateLimiter.lastResetTime > minute) {
      this.rateLimiter.requestCount = 0;
      this.rateLimiter.burstCount = 0;
      this.rateLimiter.lastResetTime = now;
    }
    
    // Check if rate limit is exceeded
    if (this.rateLimiter.requestCount >= this.config.api.rateLimit.requestsPerMinute) {
      throw new Error('Rate limit exceeded');
    }
    
    // Check burst limit
    if (this.rateLimiter.burstCount >= this.config.api.rateLimit.burstLimit) {
      throw new Error('Burst limit exceeded');
    }
    
    // Increment counters
    this.rateLimiter.requestCount++;
    this.rateLimiter.burstCount++;
    
    // Reset burst counter after a short delay
    setTimeout(() => {
      this.rateLimiter.burstCount--;
    }, 1000);
  }
  
  /**
   * Update metrics with request information
   * @param {number} responseTime - Response time in milliseconds
   * @param {boolean} success - Whether the request was successful
   */
  updateMetrics(responseTime, success) {
    this.metrics.requestCount++;
    
    if (success) {
      this.metrics.successCount++;
    } else {
      this.metrics.errorCount++;
    }
    
    this.metrics.totalResponseTime += responseTime;
    this.metrics.averageResponseTime = 
      this.metrics.totalResponseTime / this.metrics.requestCount;
    
    // Check alert thresholds
    if (this.config.monitoring.enabled) {
      const { alertThresholds } = this.config.monitoring;
      
      if (responseTime > alertThresholds.responseTime) {
        this.emit('alert', {
          type: 'response_time',
          message: `Response time exceeded threshold: ${responseTime}ms`,
          value: responseTime,
          threshold: alertThresholds.responseTime,
        });
      }
      
      const errorRate = this.metrics.errorCount / this.metrics.requestCount;
      if (errorRate > alertThresholds.errorRate) {
        this.emit('alert', {
          type: 'error_rate',
          message: `Error rate exceeded threshold: ${(errorRate * 100).toFixed(2)}%`,
          value: errorRate,
          threshold: alertThresholds.errorRate,
        });
      }
    }
  }
  
  /**
   * Reset metrics
   */
  resetMetrics() {
    this.metrics = {
      requestCount: 0,
      successCount: 0,
      errorCount: 0,
      totalResponseTime: 0,
      averageResponseTime: 0,
    };
    this.log('debug', 'Metrics reset');
  }
  
  /**
   * Collect and store metrics
   */
  async collectAndStoreMetrics() {
    const timestamp = new Date().toISOString();
    const metricsData = {
      timestamp,
      ...this.metrics,
      responseTimeMs: this.metrics.averageResponseTime,
      errorRate: this.metrics.requestCount > 0 
        ? this.metrics.errorCount / this.metrics.requestCount 
        : 0,
    };
    
    // Add resource usage metrics
    try {
      const memoryUsage = process.memoryUsage();
      metricsData.memory = {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      };
      
      // Get CPU usage (simplified approach)
      const startUsage = process.cpuUsage();
      await new Promise(resolve => setTimeout(resolve, 100));
      const endUsage = process.cpuUsage(startUsage);
      const totalUsage = endUsage.user + endUsage.system;
      
      metricsData.cpu = {
        user: endUsage.user,
        system: endUsage.system,
        total: totalUsage,
      };
    } catch (error) {
      this.log('warn', `Failed to collect resource metrics: ${error.message}`);
    }
    
    // Store metrics
    try {
      const metricsFilePath = path.join(
        this.config.monitoring.metricsPath,
        `metrics-${new Date().toISOString().slice(0, 10)}.json`
      );
      
      // Check if file exists
      let existingMetrics = [];
      try {
        const fileExists = await fs.access(metricsFilePath)
          .then(() => true)
          .catch(() => false);
        
        if (fileExists) {
          const fileContent = await fs.readFile(metricsFilePath, 'utf8');
          existingMetrics = JSON.parse(fileContent);
        }
      } catch (error) {
        this.log('warn', `Failed to read existing metrics: ${error.message}`);
      }
      
      // Append new metrics
      existingMetrics.push(metricsData);
      
      // Write metrics file
      await fs.writeFile(
        metricsFilePath,
        JSON.stringify(existingMetrics, null, 2),
        'utf8'
      );
      
      this.log('debug', 'Metrics stored');
    } catch (error) {
      this.log('error', `Failed to store metrics: ${error.message}`);
    }
  }
  
  /**
   * Back up the SunnyAI model
   */
  async backupModel() {
    try {
      this.log('info', 'Starting model backup');
      
      // Create backup directory if it doesn't exist
      const backupDir = path.dirname(this.config.backup.modelBackupPath);
      await fs.mkdir(backupDir, { recursive: true });
      
      // Create backup filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = `sunnyai-model-${timestamp}.tar.gz`;
      const backupPath = path.join(backupDir, backupFileName);
      
      // Find Ollama model directory
      const ollamaDir = process.env.OLLAMA_MODELS || path.join(
        process.env.HOME || process.env.USERPROFILE,
        '.ollama/models'
      );
      
      // Check if model exists
      const modelPath = path.join(ollamaDir, this.config.model.name);
      const modelExists = await fs.access(modelPath)
        .then(() => true)
        .catch(() => false);
      
      if (!modelExists) {
        throw new Error(`Model path not found: ${modelPath}`);
      }
      
      // Create tar.gz archive
      await execAsync(`tar -czf "${backupPath}" -C "${ollamaDir}" "${this.config.model.name}"`);
      
      this.log('info', `Model backup created: ${backupPath}`);
      
      // Clean up old backups
      await this.cleanupOldBackups(backupDir, 'sunnyai-model-', this.config.backup.modelVersionsToKeep);
      
      // Emit backup event
      this.emit('backup', {
        type: 'model',
        path: backupPath,
        timestamp: new Date().toISOString(),
      });
      
      return backupPath;
    } catch (error) {
      this.log('error', `Model backup failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Back up learning data
   */
  async backupLearningData() {
    try {
      this.log('info', 'Starting learning data backup');
      
      // Create backup directory if it doesn't exist
      const backupDir = path.dirname(this.config.backup.learningDataBackupPath);
      await fs.mkdir(backupDir, { recursive: true });
      
      // Create backup filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = `sunnyai-learning-data-${timestamp}.tar.gz`;
      const backupPath = path.join(backupDir, backupFileName);
      
      // Prepare learning data for backup
      const learningDataPath = path.join(
        this.config.learning.learningModes.webLearning.cachePath
      );
      
      // Ensure learning data directory exists
      await fs.mkdir(learningDataPath, { recursive: true });
      
      // Save current cache to file
      const cacheIndexPath = path.join(learningDataPath, 'cache-index.json');
      const cacheData = Object.fromEntries(this.caches.webData.entries());
      await fs.writeFile(cacheIndexPath, JSON.stringify(cacheData, null, 2), 'utf8');
      
      // Create tar.gz archive
      await execAsync(`tar -czf "${backupPath}" -C "${path.dirname(learningDataPath)}" "${path.basename(learningDataPath)}"`);
      
      this.log('info', `Learning data backup created: ${backupPath}`);
      
      // Clean up old backups
      await this.cleanupOldBackups(backupDir, 'sunnyai-learning-data-', this.config.backup.modelVersionsToKeep);
      
      // Emit backup event
      this.emit('backup', {
        type: 'learning_data',
        path: backupPath,
        timestamp: new Date().toISOString(),
      });
      
      return backupPath;
    } catch (error) {
      this.log('error', `Learning data backup failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Clean up old backups, keeping only the specified number of most recent versions
   * @param {string} directory - Directory containing backups
   * @param {string} prefix - Filename prefix for backups
   * @param {number} versionsToKeep - Number of versions to keep
   */
  async cleanupOldBackups(directory, prefix, versionsToKeep) {
    try {
      // List files in directory
      const files = await fs.readdir(directory);
      
      // Filter files by prefix and sort by creation time (newest first)
      const backupFiles = files
        .filter(file => file.startsWith(prefix))
        .map(file => ({
          name: file,
          path: path.join(directory, file),
        }));
      
      // Get file stats
      for (const file of backupFiles) {
        const stats = await fs.stat(file.path);
        file.createdAt = stats.mtime.getTime();
      }
      
      // Sort by creation time (newest first)
      backupFiles.sort((a, b) => b.createdAt - a.createdAt);
      
      // Remove old backups
      const filesToRemove = backupFiles.slice(versionsToKeep);
      for (const file of filesToRemove) {
        await fs.unlink(file.path);
        this.log('debug', `Removed old backup: ${file.name}`);
      }
      
      return filesToRemove.length;
    } catch (error) {
      this.log('warn', `Failed to clean up old backups: ${error.message}`);
      return 0;
    }
  }
  
  /**
   * Check for updates to the SunnyAI model
   */
  async checkForUpdates() {
    try {
      this.log('info', 'Checking for model updates');
      
      // Skip update check if using custom URL in development
      if (ENV === 'development' && !process.env.ENABLE_DEV_UPDATES) {
        this.log('debug', 'Update check skipped in development mode');
        return null;
      }
      
      // Request updates from server
      const response = await axios.get(this.config.update.modelUpdateUrl, {
        params: {
          modelName: this.config.model.name,
          currentVersion: this.config.model.version,
          baseModel: this.config.model.baseModel,
        },
        timeout: 10000,
      });
      
      if (!response.data || !response.data.hasUpdate) {
        this.log('info', 'No updates available');
        return null;
      }
      
      const update = response.data;
      
      this.log('info', `Update available: ${update.version}`);
      
      // Log update details
      await this.appendToUpdateLog({
        timestamp: new Date().toISOString(),
        event: 'update_found',
        version: update.version,
        changes: update.changes,
      });
      
      // Emit update event
      this.emit('update_available', update);
      
      // Auto-install if enabled
      if (this.config.update.autoInstallUpdates) {
        this.log('info', 'Auto-installing update');
        await this.installUpdate(update);
      }
      
      return update;
    } catch (error) {
      this.log('error', `Update check failed: ${error.message}`);
      return null;
    }
  }
  
  /**
   * Install an update to the SunnyAI model
   * @param {Object} update - Update information
   */
  async installUpdate(update) {
    try {
      this.log('info', `Installing update: ${update.version}`);
      
      // Backup current model before update
      await this.backupModel();
      
      // Download update
      const updateFile = await this.downloadUpdate(update);
      
      // Verify checksum if available
      if (update.checksum && this.config.update.validateChecksums) {
        const isValid = await this.verifyChecksum(updateFile, update.checksum);
        if (!isValid) {
          throw new Error('Update checksum verification failed');
        }
      }
      
      // Apply update (this would be implemented based on update format)
      // For simplicity, we'll assume the update is a new Modelfile
      // In a real implementation, this would be more complex
      
      // Update log
      await this.appendToUpdateLog({
        timestamp: new Date().toISOString(),
        event: 'update_installed',
        version: update.version,
        success: true,
      });
      
      // Emit event
      this.emit('update_installed', {
        version: update.version,
        timestamp: new Date().toISOString(),
      });
      
      return true;
    } catch (error) {
      this.log('error', `Update installation failed: ${error.message}`);
      
      // Log failure
      await this.appendToUpdateLog({
        timestamp: new Date().toISOString

