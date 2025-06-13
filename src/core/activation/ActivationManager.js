const axios = require('axios');
const crypto = require('crypto');
const os = require('os');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const activationSecurity = require('../../security/activationSecurity');
const activationMonitor = require('../monitoring/activationMonitor');
const loggingService = require('../../services/loggingService');

/**
 * Enterprise-grade ActivationManager for Sunny Payments SDK
 * Provides secure activation, monitoring, and management across all supported platforms
 * 
 * Features:
 * - Multi-language support with secure template system
 * - Real-time monitoring and alerting
 * - Automatic failover and recovery
 * - Compliance logging and audit trails
 * - Resource usage optimization
 * - Secure configuration management
 * - Rate limiting and abuse prevention
 */
class ActivationManager extends EventEmitter {
  constructor() {
    super();
    
    // Core configuration
    this.configPath = path.join(os.homedir(), '.sunny', 'config.json');
    this.baseUrl = process.env.SUNNY_API_URL || 'https://api.sunnypayments.com';
    this.timeoutMs = parseInt(process.env.SUNNY_ACTIVATION_TIMEOUT) || 30000;
    this.retryAttempts = parseInt(process.env.SUNNY_RETRY_ATTEMPTS) || 3;
    
    // Advanced rate limiting with IP tracking
    this.rateLimit = {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxAttempts: parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS) || 10,
      maxConcurrent: parseInt(process.env.RATE_LIMIT_MAX_CONCURRENT) || 3,
      attempts: new Map(),
      ipTracking: new Map(),
      blacklist: new Set(),
      suspiciousIPs: new Map()
    };
    
    // Recovery system configuration
    this.recoveryConfig = {
      maxRecoveryAttempts: 5,
      backoffMultiplier: 1.5,
      initialBackoff: 1000,
      maxBackoff: 30000,
      persistentStorage: path.join(os.homedir(), '.sunny', 'recovery')
    };

    // Activation states
    this.activationStates = new Map();
    this.pendingActivations = new Map();
    
    // Initialize security and monitoring
    this.initializeEnterpriseFeatures();
    this.createConfigDir();
    
    // Define supported languages with enterprise features
    this.supportedLanguages = {
      'node': { extension: '.js', template: 'node' },
      'python': { extension: '.py', template: 'python' },
      'php': { extension: '.php', template: 'php' },
      'ruby': { extension: '.rb', template: 'ruby' },
      'java': { extension: '.java', template: 'java' },
      'go': { extension: '.go', template: 'go' },
      'dotnet': { extension: '.cs', template: 'dotnet' }
    };
  }

  createConfigDir() {
    const configDir = path.dirname(this.configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true, mode: 0o700 });
    }
  }

  /**
   * Activate Sunny Payments for specified account type and environment
   * @param {Object} params - Activation parameters
   * @param {string} params.accountType - Account type ('individual' or 'business')
   * @param {string} params.apiKey - API key for authentication
   * @param {string} params.language - Programming language for SDK setup
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Activation result
   */
  /**
   * Initialize enterprise security and monitoring features
   * @private
   */
  async initializeEnterpriseFeatures() {
    try {
      // Initialize security context
      await activationSecurity.initializeSecurityContext();
      
      // Start monitoring
      activationMonitor.on('alert', this.handleMonitoringAlert.bind(this));
      
      // Initialize recovery system
      this.initializeRecoverySystem();
      
      loggingService.info('Enterprise features initialized successfully');
    } catch (error) {
      loggingService.error('Failed to initialize enterprise features', error);
      throw new Error('Enterprise initialization failed');
    }
  }

  /**
   * Enterprise-grade activation process
   * @param {Object} params - Activation parameters
   * @param {string} params.accountType - Account type ('individual' or 'business')
   * @param {string} params.apiKey - API key for authentication
   * @param {string} params.language - Programming language for SDK
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Activation result
   */
  async activate({ accountType, apiKey, language }, options = {}) {
    const activationId = crypto.randomBytes(16).toString('hex');
    
    try {
      // Rate limiting check
      if (this.isRateLimited(apiKey)) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      // Validate inputs and security context
      await Promise.all([
        this.validateInputs({ accountType, apiKey, language }),
        activationSecurity.validateActivationRequest({ accountType, apiKey, language })
      ]);
      
      // Generate secure device ID
      const deviceId = await this.generateSecureDeviceId();
      
      // Record activation attempt
      await activationMonitor.recordActivationAttempt({
        activationId,
        accountType,
        language,
        deviceId
      });
      
      // Configure retry mechanism
      const retryConfig = {
        retries: this.retryAttempts,
        retryDelay: (attemptNum) => Math.min(1000 * Math.pow(2, attemptNum), 10000),
        onRetry: (error) => {
          loggingService.warn('Activation retry', { 
            activationId, 
            attempt: attemptNum + 1,
            error: error.message 
          });
        }
      };

      // Start activation process with monitoring
      this.pendingActivations.set(activationId, {
        startTime: Date.now(),
        status: 'in_progress'
      });

      // Attempt activation with retry logic and monitoring
      for (let attempt = 0; attempt <= retryConfig.retries; attempt++) {
        try {
          // Prepare activation payload with enhanced security
          const activationPayload = await this.prepareActivationPayload({
            accountType,
            apiKey,
            deviceId,
            language,
            activationId,
            environment: options.environment || 'sandbox',
            options
          });

          // Execute activation request with monitoring
          const startTime = Date.now();
          const response = await axios.post(
            `${this.baseUrl}/v1/activate`,
            activationPayload,
            { 
              timeout: this.timeoutMs,
              headers: await this.getSecureHeaders(activationId)
            }
          );

          // Monitor response time
          const responseTime = Date.now() - startTime;
          await activationMonitor.recordMetric('responseTime', responseTime);

          if (response.data.success) {
            // Prepare secure configuration
            const config = await this.prepareSecureConfig({
              apiKey,
              accountType,
              language,
              deviceId,
              activationId,
              environment: options.environment || 'sandbox',
              merchantId: response.data.merchantId,
              settings: response.data.settings
            });

            // Save configuration and setup language specifics atomically
            await this.atomicConfigurationUpdate(config, language);
            
            // Update activation status
            this.pendingActivations.set(activationId, {
              status: 'completed',
              completedAt: new Date().toISOString()
            });

            // Emit success event with secure payload
            this.emit('activation:success', { 
              activationId,
              accountType, 
              language,
              timestamp: new Date().toISOString()
            });

            // Return success response with enhanced security context
            return { 
              success: true, 
              data: this.sanitizeResponse(response.data),
              activationId
            };
          }
        } catch (err) {
          if (attempt === retryConfig.retries) throw err;
          await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay(attempt)));
        }
      }
    } catch (error) {
      this.emit('activation:error', { error: error.message });
      throw new Error(`Activation failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Validate activation inputs
   * @private
   */
  validateInputs({ accountType, apiKey, language }) {
    if (!accountType || !['individual', 'business'].includes(accountType)) {
      throw new Error('Invalid account type. Must be "individual" or "business"');
    }
    
    if (!apiKey || typeof apiKey !== 'string' || apiKey.length < 32) {
      throw new Error('Invalid API key format');
    }

    if (!language || !this.supportedLanguages[language]) {
      throw new Error(`Unsupported language. Supported: ${Object.keys(this.supportedLanguages).join(', ')}`);
    }
  }

  /**
   * Set up language-specific configurations and files
   * @private
   */
  async setupLanguageSpecifics(language, config) {
    const langConfig = this.supportedLanguages[language];
    const setupPath = path.join(process.cwd(), 'sunny-setup' + langConfig.extension);
    
    // Generate language-specific setup file from template
    const template = await this.getLanguageTemplate(langConfig.template);
    const setupCode = this.populateTemplate(template, config);
    
    await fs.promises.writeFile(setupPath, setupCode, { mode: 0o600 });
    return setupPath;
  }

  /**
   * Get SDK version information
   * @private
   */
  getSdkVersion() {
    try {
      const packagePath = path.join(__dirname, '../../../package.json');
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      return pkg.version;
    } catch (error) {
      return '0.0.1';
    }
  }

  /**
   * Get supported capabilities for specific language
   * @private
   */
  getLanguageCapabilities(language) {
    const commonCapabilities = ['payments', 'webhooks', 'encryption'];
    const langSpecific = {
      'node': ['async/await', 'esm', 'typescript'],
      'python': ['async/await', 'type-hints'],
      'php': ['composer', 'psr-4'],
      'ruby': ['gems', 'async'],
      'java': ['maven', 'gradle', 'spring'],
      'go': ['modules', 'goroutines'],
      'dotnet': ['nuget', 'async/await']
    };

    return [...commonCapabilities, ...(langSpecific[language] || [])];
  }

  /**
   * Get context-aware help for SDK usage
   * @param {string} topic - Help topic
   * @param {Object} options - Help options
   * @returns {Promise<Object>} Help content
   */
  async getHelp(topic, options = {}) {
    try {
      const config = await this.loadConfig();
      if (!config) {
        throw new Error('Sunny not activated. Please activate first.');
      }

      // Add context to help request
      const context = {
        language: config.language,
        accountType: config.accountType,
        environment: config.environment,
        sdkVersion: this.getSdkVersion(),
        platformInfo: this.getPlatformInfo(),
        topic
      };

      const response = await axios.get(`${this.baseUrl}/v1/help/${topic}`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'X-Account-Type': config.accountType,
          'X-Device-Id': config.deviceId,
          'X-SDK-Version': context.sdkVersion,
          'X-Platform-Info': JSON.stringify(context.platformInfo)
        },
        params: {
          language: context.language,
          format: options.format || 'markdown'
        }
      });

      // Cache help content for offline access
      await this.cacheHelpContent(topic, response.data);

      return {
        content: response.data,
        context,
        offline: false
      };
    } catch (error) {
      // Try to get cached help content if offline
      const cachedContent = await this.getCachedHelp(topic);
      if (cachedContent) {
        return {
          content: cachedContent,
          context: { topic },
          offline: true
        };
      }

      throw new Error(`Failed to get help: ${error.message}`);
    }
  }

  /**
   * Cache help content for offline access
   * @private
   */
  async cacheHelpContent(topic, content) {
    const cacheDir = path.join(os.homedir(), '.sunny', 'help-cache');
    const cacheFile = path.join(cacheDir, `${topic}.json`);

    try {
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true, mode: 0o700 });
      }

      await fs.promises.writeFile(
        cacheFile,
        JSON.stringify({
          content,
          timestamp: new Date().toISOString()
        }),
        { mode: 0o600 }
      );
    } catch (error) {
      console.warn(`Failed to cache help content: ${error.message}`);
    }
  }

  /**
   * Get cached help content
   * @private
   */
  async getCachedHelp(topic) {
    const cacheFile = path.join(os.homedir(), '.sunny', 'help-cache', `${topic}.json`);

    try {
      if (fs.existsSync(cacheFile)) {
        const cached = JSON.parse(await fs.promises.readFile(cacheFile, 'utf8'));
        const cacheAge = Date.now() - new Date(cached.timestamp).getTime();

        // Return cached content if less than 24 hours old
        if (cacheAge < 24 * 60 * 60 * 1000) {
          return cached.content;
        }
      }
    } catch (error) {
      console.warn(`Failed to read cached help: ${error.message}`);
    }

    return null;
  }

  /**
   * Save configuration securely
   * @private
   */
  async saveConfig(config) {
    try {
      // Encrypt sensitive data
      const sensitiveKeys = ['apiKey', 'merchantId'];
      const encryptedConfig = { ...config };
      
      for (const key of sensitiveKeys) {
        if (encryptedConfig[key]) {
          encryptedConfig[key] = this.encryptValue(encryptedConfig[key]);
        }
      }

      await fs.promises.writeFile(
        this.configPath, 
        JSON.stringify(encryptedConfig, null, 2), 
        { mode: 0o600 }
      );

      this.emit('config:updated', { timestamp: new Date().toISOString() });
    } catch (error) {
      throw new Error(`Failed to save config: ${error.message}`);
    }
  }

  /**
   * Load configuration securely
   * @private
   */
  async loadConfig() {
    try {
      if (!fs.existsSync(this.configPath)) {
        return null;
      }

      const config = JSON.parse(await fs.promises.readFile(this.configPath, 'utf8'));
      
      // Decrypt sensitive data
      const sensitiveKeys = ['apiKey', 'merchantId'];
      for (const key of sensitiveKeys) {
        if (config[key]) {
          config[key] = this.decryptValue(config[key]);
        }
      }

      // Validate config format
      this.validateConfig(config);
      
      return config;
    } catch (error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  /**
   * Generate unique device identifier
   * @private
   */
  generateDeviceId() {
    const platform = this.getPlatformInfo();
    const uniqueData = [
      platform.hostname,
      platform.platform,
      platform.release,
      platform.arch,
      crypto.randomBytes(16).toString('hex') // Add randomness
    ].join('-');

    return crypto
      .createHash('sha256')
      .update(uniqueData)
      .digest('hex');
  }

  /**
   * Get platform information
   * @private
   */
  getPlatformInfo() {
    return {
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      hostname: os.hostname(),
      nodeVersion: process.version,
      cpus: os.cpus().length,
      memory: os.totalmem(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: process.env.LANG || 'en_US.UTF-8'
    };
  }

  /**
   * Encrypt sensitive values
   * @private
   */
  encryptValue(value) {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(value, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}:${cipher.getAuthTag().toString('hex')}`;
  }

  /**
   * Decrypt sensitive values
   * @private
   */
  decryptValue(encryptedValue) {
    const [ivHex, encrypted, authTagHex] = encryptedValue.split(':');
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(encryptedValue, 'salt', 32);
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Validate configuration format
   * @private
   */
  validateConfig(config) {
    const requiredFields = ['apiKey', 'accountType', 'deviceId', 'environment'];
    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Invalid config: missing fields: ${missingFields.join(', ')}`);
    }
  }

  /**
   * Get language-specific template
   * @private
   */
  async getLanguageTemplate(template) {
    const templatePath = path.join(__dirname, '../templates', `${template}.template`);
    return fs.promises.readFile(templatePath, 'utf8');
  }

  /**
   * Populate template with configuration
   * @private
   */
  populateTemplate(template, config) {
    return template
      .replace(/\{\{apiKey\}\}/g, config.apiKey)
      .replace(/\{\{accountType\}\}/g, config.accountType)
      .replace(/\{\{environment\}\}/g, config.environment)
      .replace(/\{\{merchantId\}\}/g, config.merchantId)
      .replace(/\{\{activatedAt\}\}/g, config.activatedAt);
  }

  /**
   * Check if an activation attempt should be rate limited
   * @private
   */
  isRateLimited(key, ip) {
    const now = Date.now();
    const keyAttempts = this.rateLimit.attempts.get(key) || [];
    const ipAttempts = this.rateLimit.ipTracking.get(ip) || [];
    
    // Clean up old attempts
    const validKeyAttempts = keyAttempts.filter(time => 
      now - time < this.rateLimit.windowMs
    );
    const validIpAttempts = ipAttempts.filter(time => 
      now - time < this.rateLimit.windowMs
    );
    
    // Update attempts
    this.rateLimit.attempts.set(key, validKeyAttempts);
    this.rateLimit.ipTracking.set(ip, validIpAttempts);
    
    // Check blacklist
    if (this.rateLimit.blacklist.has(ip)) {
      return true;
    }
    
    // Check suspicious IP patterns
    const suspiciousActivity = this.rateLimit.suspiciousIPs.get(ip);
    if (suspiciousActivity && suspiciousActivity.count > 50) {
      this.rateLimit.blacklist.add(ip);
      return true;
    }
    
    // Check rate limits
    if (validKeyAttempts.length >= this.rateLimit.maxAttempts ||
        validIpAttempts.length >= this.rateLimit.maxAttempts) {
      this.handleSuspiciousActivity(ip);
      return true;
    }
    
    return false;
  }

  /**
   * Handle suspicious activation activity
   * @private
   */
  async handleSuspiciousActivity(ip) {
    const suspicious = this.rateLimit.suspiciousIPs.get(ip) || { count: 0, firstSeen: Date.now() };
    suspicious.count++;
    this.rateLimit.suspiciousIPs.set(ip, suspicious);
    
    if (suspicious.count > 20) {
      await this.logSecurityEvent({
        type: 'SUSPICIOUS_ACTIVITY',
        severity: 'high',
        ip,
        count: suspicious.count,
        firstSeen: suspicious.firstSeen
      });
    }
  }

  /**
   * Initialize the recovery system
   * @private
   */
  async initializeRecoverySystem() {
    try {
      await fs.promises.mkdir(this.recoveryConfig.persistentStorage, { 
        recursive: true, 
        mode: 0o700 
      });
      
      // Load any pending recoveries
      const pendingRecoveries = await this.loadPendingRecoveries();
      for (const recovery of pendingRecoveries) {
        await this.handlePendingRecovery(recovery);
      }
    } catch (error) {
      console.error('Failed to initialize recovery system:', error);
    }
  }

  /**
   * Handle activation failure with recovery
   * @private
   */
  async handleActivationFailure(error, params, attempt = 1) {
    // Calculate backoff time
    const backoff = Math.min(
      this.recoveryConfig.initialBackoff * Math.pow(this.recoveryConfig.backoffMultiplier, attempt),
      this.recoveryConfig.maxBackoff
    );
    
    // Save recovery state
    const recoveryId = crypto.randomBytes(16).toString('hex');
    const recoveryState = {
      id: recoveryId,
      params,
      attempt,
      error: error.message,
      nextAttempt: Date.now() + backoff,
      maxAttempts: this.recoveryConfig.maxRecoveryAttempts
    };
    
    await this.saveRecoveryState(recoveryState);
    
    // Schedule recovery attempt
    setTimeout(async () => {
      if (attempt < this.recoveryConfig.maxRecoveryAttempts) {
        try {
          await this.activate(params);
          await this.clearRecoveryState(recoveryId);
        } catch (retryError) {
          await this.handleActivationFailure(retryError, params, attempt + 1);
        }
      } else {
        await this.handleRecoveryFailure(recoveryState);
      }
    }, backoff);
  }

  /**
   * Save recovery state to persistent storage
   * @private
   */
  async saveRecoveryState(state) {
    const recoveryPath = path.join(
      this.recoveryConfig.persistentStorage,
      `recovery-${state.id}.json`
    );
    
    await fs.promises.writeFile(
      recoveryPath,
      JSON.stringify(state),
      { mode: 0o600 }
    );
  }

  /**
   * Load pending recovery states
   * @private
   */
  async loadPendingRecoveries() {
    const recoveryDir = this.recoveryConfig.persistentStorage;
    const files = await fs.promises.readdir(recoveryDir);
    const recoveries = [];
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const recoveryPath = path.join(recoveryDir, file);
      try {
        const content = await fs.promises.readFile(recoveryPath, 'utf8');
        recoveries.push(JSON.parse(content));
      } catch (error) {
        console.error(`Failed to load recovery state ${file}:`, error);
      }
    }
    
    return recoveries;
  }

  /**
   * Handle a pending recovery from persistent storage
   * @private
   */
  async handlePendingRecovery(recovery) {
    const now = Date.now();
    
    if (now >= recovery.nextAttempt) {
      try {
        await this.activate(recovery.params);
        await this.clearRecoveryState(recovery.id);
      } catch (error) {
        if (recovery.attempt < this.recoveryConfig.maxRecoveryAttempts) {
          await this.handleActivationFailure(error, recovery.params, recovery.attempt + 1);
        } else {
          await this.handleRecoveryFailure(recovery);
        }
      }
    } else {
      setTimeout(
        () => this.handlePendingRecovery(recovery),
        recovery.nextAttempt - now
      );
    }
  }

  /**
   * Handle final recovery failure
   * @private
   */
  async handleRecoveryFailure(recovery) {
    await this.logSecurityEvent({
      type: 'RECOVERY_FAILURE',
      severity: 'high',
      recovery,
      message: 'Maximum recovery attempts reached'
    });
    
    await this.clearRecoveryState(recovery.id);
    
    // Notify monitoring systems
    this.emit('recovery:failed', {
      recoveryId: recovery.id,
      attempts: recovery.attempt,
      error: recovery.error
    });
  }
}

module.exports = new ActivationManager();
