const inquirer = require('inquirer');
const chalk = require('chalk');
const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const webhookListener = require('../utils/webhookListener');
const apiPlayground = require('../utils/apiPlayground');

const developerCommands = {
  async generateApiKeys() {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'environment',
        message: 'Select environment:',
        choices: ['sandbox', 'production']
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter project name:',
        validate: input => input.length >= 3
      }
    ]);

    // Generate secure API keys
    const apiKey = `sk_${answers.environment}_${crypto.randomBytes(24).toString('hex')}`;
    const publicKey = `pk_${answers.environment}_${crypto.randomBytes(24).toString('hex')}`;
    
    console.log(chalk.green('\n✓ API Keys generated successfully'));
    console.log(chalk.yellow('\nSecret API Key (Keep this secure!):'));
    console.log(chalk.red(apiKey));
    console.log(chalk.yellow('\nPublic Key:'));
    console.log(chalk.blue(publicKey));
    
    // Save keys securely
    await this.saveKeysSecurely(answers.projectName, { apiKey, publicKey, environment: answers.environment });
  },

  async saveKeysSecurely(projectName, keys) {
    const configDir = path.join(process.env.HOME, '.sunny');
    const keysFile = path.join(configDir, 'api_keys.json');
    
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { mode: 0o700 });
    }

    let existingKeys = {};
    if (fs.existsSync(keysFile)) {
      existingKeys = JSON.parse(fs.readFileSync(keysFile, 'utf8'));
    }

    existingKeys[projectName] = keys;
    fs.writeFileSync(keysFile, JSON.stringify(existingKeys, null, 2), { mode: 0o600 });
  },

  async setupWebhooks() {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: 'What would you like to do?',
        choices: [
          'Start local webhook listener',
          'Configure remote endpoints',
          'Test webhook events',
          'View webhook logs'
        ]
      }
    ]);

    switch (answers.mode) {
      case 'Start local webhook listener':
        await this.startWebhookListener();
        break;
      case 'Configure remote endpoints':
        await this.configureWebhookEndpoints();
        break;
      case 'Test webhook events':
        await this.testWebhookEvents();
        break;
      case 'View webhook logs':
        await this.viewWebhookLogs();
        break;
    }
  },

  async startWebhookListener() {
    console.log(chalk.blue('\nStarting webhook listener...'));
    const url = await webhookListener.start();
    console.log(chalk.green(`\nListening for webhooks at: ${url}`));
    
    // Listen for webhook events
    webhookListener.on('payment.success', event => {
      console.log(chalk.green('\n✓ Payment successful:'), event);
    });

    webhookListener.on('payment.failed', event => {
      console.log(chalk.red('\n✗ Payment failed:'), event);
    });
  },

  async configureWebhookEndpoints() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'endpoint',
        message: 'Enter webhook endpoint URL:',
        validate: input => input.startsWith('https://')
      },
      {
        type: 'checkbox',
        name: 'events',
        message: 'Select events to monitor:',
        choices: [
          'payment.success',
          'payment.failed',
          'refund.processed',
          'dispute.created',
          'terminal.activated',
          'terminal.transaction'
        ]
      }
    ]);

    console.log(chalk.blue('\nSetting up webhooks...'));
    // Generate webhook secret
    const webhookSecret = crypto.randomBytes(32).toString('hex');
    
    // Save webhook configuration
    await this.saveWebhookConfig({
      url: answers.endpoint,
      events: answers.events,
      secret: webhookSecret
    });

    console.log(chalk.green('✓ Webhooks configured successfully'));
    console.log(chalk.yellow('\nWebhook Secret (Keep this secure!):'));
    console.log(chalk.red(webhookSecret));
  },

  async testWebhookEvents() {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'event',
        message: 'Select event to test:',
        choices: [
          'payment.success',
          'payment.failed',
          'refund.processed',
          'dispute.created'
        ]
      }
    ]);

    // Generate test data
    const testData = this.generateTestData(answers.event);
    await webhookListener.trigger(answers.event, testData);
  },

  async viewWebhookLogs() {
    // Implementation for viewing webhook logs
    console.log(chalk.yellow('Showing last 10 webhook events:'));
    // TODO: Implement webhook log retrieval and display
  },

  generateTestData(eventType) {
    // Generate appropriate test data based on event type
    const baseData = {
      id: `evt_${crypto.randomBytes(16).toString('hex')}`,
      created: Math.floor(Date.now() / 1000)
    };

    switch (eventType) {
      case 'payment.success':
        return {
          ...baseData,
          amount: 2000,
          currency: 'usd',
          status: 'succeeded'
        };
      case 'payment.failed':
        return {
          ...baseData,
          amount: 2000,
          currency: 'usd',
          status: 'failed',
          error: {
            type: 'card_error',
            message: 'Your card was declined'
          }
        };
      // Add other event types
      default:
        return baseData;
    }
  },

  async playWithApi() {
    await apiPlayground.start();
  },

  async validateSecurity() {
    console.log(chalk.blue('\nPerforming security validation...'));
    
    const checks = [
      { name: 'TLS Version', check: this.checkTlsVersion },
      { name: 'API Key Storage', check: this.checkApiKeyStorage },
      { name: 'Webhook SSL', check: this.checkWebhookSsl },
      { name: 'Dependencies', check: this.checkDependencies },
      { name: 'Environment', check: this.checkEnvironment },
      { name: 'File Permissions', check: this.checkFilePermissions }
    ];

    for (const check of checks) {
      process.stdout.write(`${chalk.yellow(check.name)}: `);
      const result = await check.check();
      
      if (result.passed) {
        console.log(chalk.green('✓ Passed'));
      } else {
        console.log(chalk.red(`✗ Failed - ${result.message}`));
        if (result.recommendation) {
          console.log(chalk.yellow(`  Recommendation: ${result.recommendation}`));
        }
      }
    }
  },

  async checkTlsVersion() {
    const { execSync } = require('child_process');
    try {
      const output = execSync('openssl version').toString();
      const version = output.split(' ')[1];
      return {
        passed: version >= '1.1.1',
        message: `OpenSSL version ${version} detected`,
        recommendation: version < '1.1.1' ? 'Upgrade OpenSSL to version 1.1.1 or higher' : null
      };
    } catch (error) {
      return {
        passed: false,
        message: 'Could not detect OpenSSL version',
        recommendation: 'Ensure OpenSSL is installed and accessible'
      };
    }
  },

  async checkApiKeyStorage() {
    const configDir = path.join(process.env.HOME, '.sunny');
    const keysFile = path.join(configDir, 'api_keys.json');

    try {
      const stats = fs.statSync(keysFile);
      const mode = stats.mode & 0o777;
      return {
        passed: mode === 0o600,
        message: mode === 0o600 ? 'API keys stored securely' : 'API keys file has incorrect permissions',
        recommendation: mode !== 0o600 ? 'Run: chmod 600 ~/.sunny/api_keys.json' : null
      };
    } catch (error) {
      return {
        passed: true,
        message: 'No API keys file found (this is okay if you haven\'t generated keys yet)'
      };
    }
  },

  async checkWebhookSsl() {
    const config = this.loadWebhookConfig();
    if (!config || !config.url) {
      return {
        passed: true,
        message: 'No webhooks configured'
      };
    }

    return {
      passed: config.url.startsWith('https://'),
      message: config.url.startsWith('https://') ? 
        'Webhooks using HTTPS' : 
        'Webhooks not using HTTPS',
      recommendation: 'Always use HTTPS for webhook endpoints'
    };
  },

  async checkDependencies() {
    const { execSync } = require('child_process');
    try {
      execSync('npm audit --json', { stdio: 'pipe' });
      return {
        passed: true,
        message: 'No known vulnerabilities found'
      };
    } catch (error) {
      const auditData = JSON.parse(error.stdout);
      return {
        passed: false,
        message: `Found ${auditData.metadata.vulnerabilities.high || 0} high and ${auditData.metadata.vulnerabilities.critical || 0} critical vulnerabilities`,
        recommendation: 'Run npm audit fix to resolve vulnerabilities'
      };
    }
  },

  async checkEnvironment() {
    const hasProductionFlag = process.env.NODE_ENV === 'production';
    return {
      passed: hasProductionFlag,
      message: hasProductionFlag ? 
        'Environment properly configured' : 
        'Not running in production mode',
      recommendation: !hasProductionFlag ? 
        'Set NODE_ENV=production for production environments' : null
    };
  },

  async checkFilePermissions() {
    // Check permissions on sensitive directories and files
    const items = [
      { path: path.join(process.env.HOME, '.sunny'), expectedMode: 0o700 },
      { path: path.join(process.env.HOME, '.sunny/api_keys.json'), expectedMode: 0o600 },
      { path: '.env', expectedMode: 0o600 }
    ];

    for (const item of items) {
      try {
        const stats = fs.statSync(item.path);
        const mode = stats.mode & 0o777;
        if (mode !== item.expectedMode) {
          return {
            passed: false,
            message: `Incorrect permissions on ${item.path}`,
            recommendation: `chmod ${item.expectedMode.toString(8)} ${item.path}`
          };
        }
      } catch (error) {
        // Skip if file doesn't exist
        continue;
      }
    }

    return {
      passed: true,
      message: 'File permissions are correctly set'
    };
  },

  loadWebhookConfig() {
    const configFile = path.join(process.env.HOME, '.sunny', 'webhook_config.json');
    try {
      return JSON.parse(fs.readFileSync(configFile, 'utf8'));
    } catch (error) {
      return null;
    }
  },

  async saveWebhookConfig(config) {
    const configDir = path.join(process.env.HOME, '.sunny');
    const configFile = path.join(configDir, 'webhook_config.json');
    
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { mode: 0o700 });
    }
    
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2), { mode: 0o600 });
  }
};

module.exports = developerCommands;
