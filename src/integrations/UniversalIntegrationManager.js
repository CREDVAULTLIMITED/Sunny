/**
 * Universal Integration Manager
 * 
 * Allows businesses to connect ANY app or platform to Sunny Payment Gateway
 * Supports webhooks, APIs, plugins, and custom connectors
 */

import axios from 'axios';
import crypto from 'crypto';
import EventEmitter from 'events';
import { logger } from '../utils/logger';

class UniversalIntegrationManager extends EventEmitter {
  constructor() {
    super();
    this.integrations = new Map();
    this.connectors = new Map();
    this.webhookEndpoints = new Map();
    this.apiClients = new Map();
    
    // Load built-in integrations
    this.loadBuiltInIntegrations();
  }

  /**
   * Register a new integration
   */
  async registerIntegration(config) {
    const {
      id,
      name,
      type, // 'webhook', 'api', 'plugin', 'custom'
      platform, // 'shopify', 'woocommerce', 'custom', etc.
      authentication,
      endpoints,
      events,
      settings
    } = config;

    const integration = {
      id,
      name,
      type,
      platform,
      authentication,
      endpoints: endpoints || {},
      events: events || [],
      settings: settings || {},
      status: 'inactive',
      createdAt: new Date(),
      lastSync: null
    };

    this.integrations.set(id, integration);
    
    // Initialize connector based on type
    await this.initializeConnector(integration);
    
    logger.info(`Integration registered: ${name} (${id})`);
    this.emit('integration:registered', integration);
    
    return integration;
  }

  /**
   * Initialize connector for integration
   */
  async initializeConnector(integration) {
    const { type, id, authentication, endpoints } = integration;
    
    switch (type) {
      case 'webhook':
        await this.setupWebhookConnector(integration);
        break;
      case 'api':
        await this.setupApiConnector(integration);
        break;
      case 'plugin':
        await this.setupPluginConnector(integration);
        break;
      case 'custom':
        await this.setupCustomConnector(integration);
        break;
      default:
        throw new Error(`Unknown integration type: ${type}`);
    }
  }

  /**
   * Setup webhook-based connector
   */
  async setupWebhookConnector(integration) {
    const { id, endpoints, authentication } = integration;
    
    const connector = {
      type: 'webhook',
      async send(event, data) {
        for (const endpoint of endpoints.outgoing || []) {
          try {
            const payload = {
              event,
              data,
              timestamp: new Date().toISOString(),
              signature: this.generateSignature(data, authentication.secret)
            };
            
            const response = await axios.post(endpoint.url, payload, {
              headers: {
                'Content-Type': 'application/json',
                'X-Sunny-Signature': payload.signature,
                'Authorization': `Bearer ${authentication.token}`,
                ...endpoint.headers
              },
              timeout: endpoint.timeout || 30000
            });
            
            logger.info(`Webhook sent to ${endpoint.url}: ${response.status}`);
          } catch (error) {
            logger.error(`Webhook failed for ${endpoint.url}:`, error.message);
            this.emit('webhook:failed', { integration: id, endpoint, error });
          }
        }
      },
      
      generateSignature(data, secret) {
        return crypto
          .createHmac('sha256', secret)
          .update(JSON.stringify(data))
          .digest('hex');
      }
    };
    
    this.connectors.set(id, connector);
  }

  /**
   * Setup API-based connector
   */
  async setupApiConnector(integration) {
    const { id, endpoints, authentication } = integration;
    
    const apiClient = axios.create({
      baseURL: endpoints.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Sunny-Payment-Gateway/1.0'
      }
    });
    
    // Setup authentication
    if (authentication.type === 'bearer') {
      apiClient.defaults.headers.Authorization = `Bearer ${authentication.token}`;
    } else if (authentication.type === 'api_key') {
      apiClient.defaults.headers[authentication.header || 'X-API-Key'] = authentication.key;
    } else if (authentication.type === 'oauth2') {
      await this.setupOAuth2(apiClient, authentication);
    }
    
    const connector = {
      type: 'api',
      client: apiClient,
      
      async call(method, path, data = null, options = {}) {
        try {
          const response = await apiClient.request({
            method,
            url: path,
            data,
            ...options
          });
          
          return response.data;
        } catch (error) {
          logger.error(`API call failed for ${id}:`, error.message);
          throw error;
        }
      },
      
      async syncData() {
        // Implementation depends on the specific API
        if (endpoints.sync) {
          return await this.call('GET', endpoints.sync.path);
        }
      }
    };
    
    this.connectors.set(id, connector);
    this.apiClients.set(id, apiClient);
  }

  /**
   * Setup plugin-based connector
   */
  async setupPluginConnector(integration) {
    const { id, platform, settings } = integration;
    
    // Load platform-specific plugin
    let PluginClass;
    try {
      PluginClass = require(`./plugins/${platform}Plugin`);
    } catch (error) {
      PluginClass = require('./plugins/GenericPlugin');
    }
    
    const plugin = new PluginClass(settings);
    await plugin.initialize();
    
    const connector = {
      type: 'plugin',
      plugin,
      
      async execute(action, params) {
        return await plugin[action](params);
      }
    };
    
    this.connectors.set(id, connector);
  }

  /**
   * Setup custom connector
   */
  async setupCustomConnector(integration) {
    const { id, settings } = integration;
    
    const connector = {
      type: 'custom',
      settings,
      
      async execute(action, params) {
        // Custom logic based on settings
        if (settings.customHandler) {
          return await settings.customHandler(action, params);
        }
        
        throw new Error('No custom handler defined');
      }
    };
    
    this.connectors.set(id, connector);
  }

  /**
   * Activate integration
   */
  async activateIntegration(integrationId) {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error(`Integration not found: ${integrationId}`);
    }
    
    try {
      // Test connection
      await this.testConnection(integrationId);
      
      integration.status = 'active';
      integration.activatedAt = new Date();
      
      logger.info(`Integration activated: ${integration.name}`);
      this.emit('integration:activated', integration);
      
      return integration;
    } catch (error) {
      logger.error(`Failed to activate integration ${integrationId}:`, error.message);
      throw error;
    }
  }

  /**
   * Test integration connection
   */
  async testConnection(integrationId) {
    const integration = this.integrations.get(integrationId);
    const connector = this.connectors.get(integrationId);
    
    if (!integration || !connector) {
      throw new Error(`Integration or connector not found: ${integrationId}`);
    }
    
    switch (connector.type) {
      case 'webhook':
        return await this.testWebhookConnection(integration);
      case 'api':
        return await this.testApiConnection(integration);
      case 'plugin':
        return await connector.plugin.testConnection();
      case 'custom':
        return await connector.execute('testConnection');
      default:
        throw new Error(`Cannot test connection for type: ${connector.type}`);
    }
  }

  /**
   * Send payment event to all active integrations
   */
  async broadcastPaymentEvent(event, paymentData) {
    const activeIntegrations = Array.from(this.integrations.values())
      .filter(i => i.status === 'active' && i.events.includes(event));
    
    const promises = activeIntegrations.map(async (integration) => {
      try {
        const connector = this.connectors.get(integration.id);
        
        if (connector.type === 'webhook') {
          await connector.send(event, paymentData);
        } else if (connector.type === 'api') {
          await this.sendApiEvent(connector, event, paymentData);
        } else if (connector.type === 'plugin') {
          await connector.execute('handlePaymentEvent', { event, data: paymentData });
        }
        
        logger.info(`Event ${event} sent to ${integration.name}`);
      } catch (error) {
        logger.error(`Failed to send ${event} to ${integration.name}:`, error.message);
      }
    });
    
    await Promise.allSettled(promises);
  }

  /**
   * Get integration by ID
   */
  getIntegration(id) {
    return this.integrations.get(id);
  }

  /**
   * List all integrations
   */
  listIntegrations(filter = {}) {
    const integrations = Array.from(this.integrations.values());
    
    if (filter.status) {
      return integrations.filter(i => i.status === filter.status);
    }
    
    if (filter.platform) {
      return integrations.filter(i => i.platform === filter.platform);
    }
    
    return integrations;
  }

  /**
   * Remove integration
   */
  async removeIntegration(id) {
    const integration = this.integrations.get(id);
    if (!integration) {
      throw new Error(`Integration not found: ${id}`);
    }
    
    // Cleanup
    this.integrations.delete(id);
    this.connectors.delete(id);
    this.apiClients.delete(id);
    
    logger.info(`Integration removed: ${integration.name}`);
    this.emit('integration:removed', integration);
  }

  /**
   * Load built-in integrations
   */
  loadBuiltInIntegrations() {
    const builtInIntegrations = [
      {
        id: 'shopify',
        name: 'Shopify',
        type: 'api',
        platform: 'shopify',
        description: 'Connect with Shopify stores',
        requiredFields: ['shop_domain', 'access_token']
      },
      {
        id: 'woocommerce',
        name: 'WooCommerce',
        type: 'api',
        platform: 'woocommerce',
        description: 'Connect with WooCommerce sites',
        requiredFields: ['site_url', 'consumer_key', 'consumer_secret']
      },
      {
        id: 'zapier',
        name: 'Zapier',
        type: 'webhook',
        platform: 'zapier',
        description: 'Connect with 5000+ apps via Zapier',
        requiredFields: ['webhook_url']
      },
      {
        id: 'slack',
        name: 'Slack',
        type: 'webhook',
        platform: 'slack',
        description: 'Send payment notifications to Slack',
        requiredFields: ['webhook_url']
      },
      {
        id: 'custom_api',
        name: 'Custom API',
        type: 'api',
        platform: 'custom',
        description: 'Connect with any REST API',
        requiredFields: ['base_url', 'auth_method']
      },
      {
        id: 'custom_webhook',
        name: 'Custom Webhook',
        type: 'webhook',
        platform: 'custom',
        description: 'Send data to any webhook endpoint',
        requiredFields: ['webhook_url']
      }
    ];
    
    // Store available integrations (not active, just templates)
    this.availableIntegrations = builtInIntegrations;
  }

  /**
   * Get available integrations
   */
  getAvailableIntegrations() {
    return this.availableIntegrations;
  }

  /**
   * Create integration from template
   */
  async createFromTemplate(templateId, config) {
    const template = this.availableIntegrations.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }
    
    // Validate required fields
    for (const field of template.requiredFields) {
      if (!config[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    const integrationConfig = {
      id: `${templateId}_${Date.now()}`,
      name: config.name || template.name,
      type: template.type,
      platform: template.platform,
      ...config
    };
    
    return await this.registerIntegration(integrationConfig);
  }
}

export default new UniversalIntegrationManager();
