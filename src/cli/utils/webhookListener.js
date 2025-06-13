const express = require('express');
const chalk = require('chalk');
const crypto = require('crypto');
const ngrok = require('ngrok');
const ora = require('ora');
const boxen = require('boxen');
const fs = require('fs');
const path = require('path');

class WebhookListener {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.events = new Map();
    this.webhookLogs = [];
    this.maxLogSize = 100;
    this.setupMiddleware();
  }

  setupMiddleware() {
    this.app.use((req, res, next) => {
      const signature = req.headers['sunny-signature'];
      const timestamp = req.headers['sunny-timestamp'];
      const rawBody = req.body;

      // Log webhook request
      this.logWebhook({
        timestamp: new Date(),
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: rawBody
      });

      if (!signature || !timestamp) {
        return res.status(400).json({
          error: {
            type: 'invalid_request_error',
            message: 'Missing signature or timestamp header'
          }
        });
      }

      if (!this.verifySignature(JSON.stringify(rawBody), signature, timestamp)) {
        return res.status(400).json({
          error: {
            type: 'invalid_request_error',
            message: 'Invalid signature'
          }
        });
      }

      next();
    });

    // Add error handler
    this.app.use((error, req, res, next) => {
      console.error(chalk.red('Error handling webhook:'), error);
      res.status(500).json({
        error: {
          type: 'api_error',
          message: 'Internal server error processing webhook'
        }
      });
    });
  }

  verifySignature(payload, signature, timestamp) {
    try {
      const webhookSecret = process.env.SUNNY_WEBHOOK_SECRET || 'test_secret';
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(`${timestamp}.${payload}`)
        .digest('hex');
      
      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );
    } catch (error) {
      console.error(chalk.red('Error verifying signature:'), error);
      return false;
    }
  }

  async start(port = 3033) {
    const spinner = ora('Starting webhook listener...').start();

    try {
      this.server = this.app.listen(port);
      const url = await ngrok.connect({
        addr: port,
        proto: 'http', // Force HTTP protocol
        onStatusChange: status => {
          if (status === 'connected') {
            spinner.succeed('Webhook listener started');
          }
        }
      });

      this.setupEventHandlers();

      console.log(boxen(
        chalk.blue('Webhook listener is running!\n\n') +
        chalk.green(`Local URL: http://localhost:${port}\n`) +
        chalk.green(`Public URL: ${url}\n\n`) +
        chalk.yellow('Forward this URL to your Sunny Dashboard webhook settings\n') +
        chalk.gray('Press Ctrl+C to stop'),
        { padding: 1, margin: 1, borderColor: 'blue', title: 'SUNNY WEBHOOK LISTENER' }
      ));

      return url;
    } catch (error) {
      spinner.fail('Failed to start webhook listener');
      console.error(chalk.red('Error:'), error.message);
      throw error;
    }
  }

  setupEventHandlers() {
    this.app.post('*', (req, res) => {
      const event = req.body;
      console.log(boxen(
        chalk.blue('Webhook received!\n\n') +
        chalk.yellow(`Event: ${event.type}\n`) +
        chalk.white(JSON.stringify(event.data, null, 2)),
        { padding: 1, borderColor: 'blue' }
      ));

      // Notify any registered listeners
      if (this.events.has(event.type)) {
        this.events.get(event.type).forEach(handler => {
          try {
            handler(event);
          } catch (error) {
            console.error(chalk.red(`Error in event handler for ${event.type}:`), error);
          }
        });
      }

      res.json({ received: true });
    });
  }

  on(eventType, handler) {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, new Set());
    }
    this.events.get(eventType).add(handler);
  }

  stop() {
    if (this.server) {
      this.server.close();
      ngrok.kill();
    }
  }

  async trigger(eventType, data) {
    const spinner = ora('Triggering test webhook...').start();
    
    try {
      // Create webhook event
      const event = {
        id: `evt_${crypto.randomBytes(16).toString('hex')}`,
        type: eventType,
        created: Math.floor(Date.now() / 1000),
        data
      };

      // Add signature
      const timestamp = Date.now().toString();
      const signature = this.generateTestSignature(event, timestamp);

      // Send to local listener
      const response = await fetch('http://localhost:3033', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Sunny-Signature': signature,
          'Sunny-Timestamp': timestamp
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      spinner.succeed('Test webhook triggered successfully');
      console.log(boxen(
        chalk.green('Event details:\n\n') +
        chalk.white(JSON.stringify(event, null, 2)),
        { padding: 1, borderColor: 'green' }
      ));
    } catch (error) {
      spinner.fail('Failed to trigger webhook');
      console.error(chalk.red('Error:'), error.message);
    }
  }

  generateTestSignature(event, timestamp) {
    const webhookSecret = process.env.SUNNY_WEBHOOK_SECRET || 'test_secret';
    return crypto
      .createHmac('sha256', webhookSecret)
      .update(`${timestamp}.${JSON.stringify(event)}`)
      .digest('hex');
  }

  logWebhook(data) {
    this.webhookLogs.unshift(data);
    if (this.webhookLogs.length > this.maxLogSize) {
      this.webhookLogs.pop();
    }

    // Save logs to file
    const logsDir = path.join(process.env.HOME, '.sunny', 'webhook_logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true, mode: 0o700 });
    }

    const logFile = path.join(logsDir, 'webhook_events.log');
    fs.appendFileSync(
      logFile,
      JSON.stringify({ ...data, timestamp: new Date().toISOString() }) + '\n',
      { mode: 0o600 }
    );
  }

  getLogs(limit = 10) {
    return this.webhookLogs.slice(0, limit);
  }

  clearLogs() {
    this.webhookLogs = [];
    // Optionally clear log file too
    const logFile = path.join(process.env.HOME, '.sunny', 'webhook_logs', 'webhook_events.log');
    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }
  }
}

module.exports = new WebhookListener();
