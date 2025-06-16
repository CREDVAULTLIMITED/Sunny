#!/usr/bin/env node
import SecretsManager from '../src/core/security/SecretsManager.js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import dotenv from 'dotenv';
import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupProductionSecrets() {
  console.log(chalk.cyan('=== Sunny Payments - Production Secrets Setup ===\n'));

  // Initialize secrets manager
  await SecretsManager.initialize();
  
  // Generate secure random values for system secrets
  const systemSecrets = {
    'ENCRYPTION_KEY': crypto.randomBytes(32).toString('hex'),
    'JWT_SECRET': crypto.randomBytes(64).toString('hex'),
    'REFRESH_TOKEN_SECRET': crypto.randomBytes(64).toString('hex'),
    'SESSION_SECRET': crypto.randomBytes(32).toString('hex')
  };

  console.log(chalk.yellow('\nSetting up system secrets...'));
  for (const [key, value] of Object.entries(systemSecrets)) {
    await SecretsManager.encrypt(key, value);
    console.log(chalk.green(`✓ ${key} generated and encrypted`));
  }

  // PayPal Configuration
  console.log(chalk.yellow('\nPayPal Configuration'));
  const paypalClientId = await question('Enter PayPal Client ID: ');
  const paypalClientSecret = await question('Enter PayPal Client Secret: ');
  const paypalWebhookId = await question('Enter PayPal Webhook ID: ');

  await SecretsManager.encrypt('PAYPAL_CLIENT_ID', paypalClientId);
  await SecretsManager.encrypt('PAYPAL_CLIENT_SECRET', paypalClientSecret);
  await SecretsManager.encrypt('PAYPAL_WEBHOOK_ID', paypalWebhookId);

  // M-Pesa Configuration
  console.log(chalk.yellow('\nM-Pesa Configuration'));
  const mpesaConsumerKey = await question('Enter M-Pesa Consumer Key: ');
  const mpesaConsumerSecret = await question('Enter M-Pesa Consumer Secret: ');
  const mpesaShortcode = await question('Enter M-Pesa Shortcode: ');
  const mpesaPasskey = await question('Enter M-Pesa Passkey: ');

  await SecretsManager.encrypt('MPESA_CONSUMER_KEY', mpesaConsumerKey);
  await SecretsManager.encrypt('MPESA_CONSUMER_SECRET', mpesaConsumerSecret);
  await SecretsManager.encrypt('MPESA_SHORTCODE', mpesaShortcode);
  await SecretsManager.encrypt('MPESA_PASSKEY', mpesaPasskey);

  // Stripe Configuration
  console.log(chalk.yellow('\nStripe Configuration'));
  const stripeSecretKey = await question('Enter Stripe Live Secret Key (sk_live_...): ');
  await SecretsManager.encrypt('STRIPE_SECRET_KEY', stripeSecretKey);

  // Crypto Configuration
  console.log(chalk.yellow('\nCrypto Configuration'));
  const cryptoRpcUrl = await question('Enter Mainnet RPC URL: ');
  const cryptoWebhookSecret = await question('Enter Crypto Webhook Secret: ');

  await SecretsManager.encrypt('CRYPTO_RPC_URL', cryptoRpcUrl);
  await SecretsManager.encrypt('CRYPTO_WEBHOOK_SECRET', cryptoWebhookSecret);

  // Generate production .env file
  console.log(chalk.yellow('\nGenerating production .env file...'));
  const envContent = `# Production Environment Configuration
# Generated on ${new Date().toISOString()}
# DO NOT EDIT MANUALLY - Use secrets manager instead

NODE_ENV=production
SUNNY_ENVIRONMENT=production

# API Configuration
PORT=46617
HOST=api.sunnypayments.com

# Payment Gateway Mode
GATEWAY_MODE=production

# Database Configuration
DB_NAME=sunny_payments_production
DB_HOST=prod-mongo-cluster.sunnypayments.com
DB_PORT=27017
DB_SSL=true

# Redis Configuration
REDIS_HOST=prod-redis.sunnypayments.com
REDIS_PORT=6379
REDIS_SSL=true

# PayPal Configuration
PAYPAL_ENVIRONMENT=production

# M-Pesa Configuration
MPESA_ENVIRONMENT=production

# Crypto Configuration
BTC_NETWORK=mainnet
ETH_NETWORK=mainnet
USDC_NETWORK=mainnet

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
PASSWORD_HASH_ROUNDS=12
REQUIRE_2FA=true

# Logging
LOG_LEVEL=info
ENABLE_AUDIT_LOGS=true

# Monitoring
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_ERROR_TRACKING=true
`;

  await promisify(fs.writeFile)(path.join(process.cwd(), '.env.production'), envContent);
  console.log(chalk.green('✓ Production .env file generated'));

  console.log(chalk.cyan('\n=== Setup Complete ==='));
  console.log(chalk.yellow('\nIMPORTANT: Keep your .master.key file secure and backed up!'));
  console.log(chalk.yellow('Store it separately from your application and never commit it to version control.'));

  const secrets = await SecretsManager.listSecrets();
  console.log(chalk.cyan('\nConfigured Secrets:'));
  for (const secret of secrets) {
    console.log(chalk.green(`✓ ${secret}`));
  }

  rl.close();
}

setupProductionSecrets().catch(console.error);
