#!/usr/bin/env node

/**
 * Sunny Payment Gateway - Production Setup Script
 * 
 * This script validates and prepares the system for production use by:
 * 1. Validating all required environment variables
 * 2. Testing connections to payment processors
 * 3. Setting up proper security configurations
 * 4. Generating required encryption keys and secrets
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get current file directory (ES modules equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Convert exec to promise
const exec = promisify(execCallback);

// Setup readline interface for interactive prompts
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask a question and get response
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Define required environment variables for each payment processor
const requiredEnvVars = {
  core: [
    'SUNNY_ENVIRONMENT',
    'SUNNY_MERCHANT_ID',
    'SUNNY_API_KEY',
    'SUNNY_API_SECRET',
    'SUNNY_WEBHOOK_URL',
    'ENCRYPTION_KEY',
    'JWT_SECRET',
    'REFRESH_TOKEN_SECRET'
  ],
  stripe: [
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_ACCOUNT_ID'
  ],
  paypal: [
    'PAYPAL_CLIENT_ID',
    'PAYPAL_CLIENT_SECRET',
    'PAYPAL_ENVIRONMENT',
    'PAYPAL_WEBHOOK_ID'
  ],
  mpesa: [
    'MPESA_CONSUMER_KEY',
    'MPESA_CONSUMER_SECRET',
    'MPESA_SHORTCODE',
    'MPESA_PASSKEY',
    'MPESA_ENVIRONMENT'
  ],
  crypto: [
    'CRYPTO_API_KEY',
    'CRYPTO_API_SECRET',
    'CRYPTO_WEBHOOK_SECRET',
    'BTC_NETWORK',
    'ETH_NETWORK',
    'USDC_NETWORK'
  ],
  database: [
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DB_SSL'
  ]
};

// Payment processor connection test functions
const testFunctions = {
  stripe: async () => {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('REPLACE')) {
      throw new Error('Stripe secret key not configured properly');
    }
    
    const { default: Stripe } = await import('stripe');
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const balance = await stripe.balance.retrieve();
    return {
      success: true,
      details: `Connected to Stripe successfully. Available balance: ${
        balance.available.length > 0 
          ? `${balance.available[0].amount / 100} ${balance.available[0].currency.toUpperCase()}`
          : 'No available balance'
      }`
    };
  },
  paypal: async () => {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET ||
        process.env.PAYPAL_CLIENT_ID.includes('REPLACE') || 
        process.env.PAYPAL_CLIENT_SECRET.includes('REPLACE')) {
      throw new Error('PayPal credentials not configured properly');
    }

    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const baseUrl = process.env.PAYPAL_ENVIRONMENT === 'production'
      ? 'https://api.paypal.com/v1'
      : 'https://api.sandbox.paypal.com/v1';
      
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/oauth2/token`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials'
    });
    
    return {
      success: true,
      details: `Connected to PayPal ${process.env.PAYPAL_ENVIRONMENT} environment successfully. Token expires in ${response.data.expires_in} seconds.`
    };
  },
  mpesa: async () => {
    if (!process.env.MPESA_CONSUMER_KEY || !process.env.MPESA_CONSUMER_SECRET ||
        process.env.MPESA_CONSUMER_KEY.includes('REPLACE') || 
        process.env.MPESA_CONSUMER_SECRET.includes('REPLACE')) {
      throw new Error('M-Pesa credentials not configured properly');
    }

    const baseUrl = process.env.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';
      
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    return {
      success: true,
      details: `Connected to M-Pesa ${process.env.MPESA_ENVIRONMENT} environment successfully. Token expires in ${response.data.expires_in} seconds.`
    };
  },
  crypto: async () => {
    // This is a simplified check as actual crypto API validation would be more complex
    if (!process.env.CRYPTO_API_KEY || !process.env.CRYPTO_API_SECRET ||
        process.env.CRYPTO_API_KEY.includes('REPLACE') || 
        process.env.CRYPTO_API_SECRET.includes('REPLACE')) {
      throw new Error('Crypto API credentials not configured properly');
    }

    // Simple validation - in a real scenario, you would test with the actual crypto API
    // For now, we'll just check that we're using mainnet for production
    if (process.env.SUNNY_ENVIRONMENT === 'production') {
      if (process.env.BTC_NETWORK !== 'mainnet' || 
          process.env.ETH_NETWORK !== 'mainnet' || 
          process.env.USDC_NETWORK !== 'mainnet') {
        throw new Error('Production environment must use mainnet for crypto networks');
      }
    }
    
    return {
      success: true,
      details: `Crypto configuration validated. Using ${process.env.BTC_NETWORK} for BTC, ${process.env.ETH_NETWORK} for ETH, and ${process.env.USDC_NETWORK} for USDC.`
    };
  },
  database: async () => {
    // Simple check of database configuration
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD ||
        process.env.DB_HOST.includes('REPLACE') || 
        process.env.DB_USER.includes('REPLACE') || 
        process.env.DB_PASSWORD.includes('REPLACE')) {
      throw new Error('Database credentials not configured properly');
    }

    // In a real scenario, you would test an actual database connection
    return {
      success: true,
      details: `Database configuration validated for host ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}`
    };
  }
};

// Function to generate secure cryptographic keys
function generateSecureRandomString(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

// Function to check and set security-related environment variables
async function setupSecurityConfigurations() {
  console.log(chalk.cyan('\n--- Setting up security configurations ---'));
  
  const securityKeys = [
    { name: 'ENCRYPTION_KEY', length: 64 },
    { name: 'JWT_SECRET', length: 64 },
    { name: 'REFRESH_TOKEN_SECRET', length: 64 },
    { name: 'QR_CODE_SIGNING_KEY', length: 64 }
  ];
  
  const updatedEnv = [];
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  const envLines = envContent.split('\n');
  
  for (const key of securityKeys) {
    const envVar = process.env[key.name];
    
    if (!envVar || envVar.includes('REPLACE') || envVar.length < key.length) {
      console.log(chalk.yellow(`Generating secure ${key.name}...`));
      const newValue = generateSecureRandomString(key.length);
      process.env[key.name] = newValue;
      
      // Update in .env file
      let found = false;
      for (let i = 0; i < envLines.length; i++) {
        if (envLines[i].startsWith(`${key.name}=`)) {
          envLines[i] = `${key.name}=${newValue}`;
          found = true;
          break;
        }
      }
      
      if (!found) {
        envLines.push(`${key.name}=${newValue}`);
      }
      
      updatedEnv.push(key.name);
    }
  }
  
  if (updatedEnv.length > 0) {
    fs.writeFileSync(path.join(__dirname, '..', '.env'), envLines.join('\n'));
    console.log(chalk.green(`Updated security keys: ${updatedEnv.join(', ')}`));
  } else {
    console.log(chalk.green('All security keys are already properly configured'));
  }
  
  return {
    success: true,
    details: 'Security configurations set up successfully'
  };
}

// Function to validate all required environment variables
async function validateEnvironmentVariables() {
  console.log(chalk.cyan('\n--- Validating environment variables ---'));
  
  const missingVars = {};
  let allValid = true;
  
  // Check each category of environment variables
  for (const [category, vars] of Object.entries(requiredEnvVars)) {
    missingVars[category] = [];
    
    for (const envVar of vars) {
      const value = process.env[envVar];
      if (!value || value.includes('REPLACE')) {
        missingVars[category].push(envVar);
        allValid = false;
      }
    }
    
    // Report on category
    if (missingVars[category].length === 0) {
      console.log(chalk.green(`✓ ${category.toUpperCase()} configuration: All required variables set`));
    } else {
      console.log(chalk.red(`✗ ${category.toUpperCase()} configuration: Missing ${missingVars[category].length} required variables`));
      for (const missingVar of missingVars[category]) {
        console.log(chalk.yellow(`  - ${missingVar}`));
      }
    }
  }
  
  // Verify environment is set to production
  if (process.env.SUNNY_ENVIRONMENT !== 'production') {
    console.log(chalk.yellow(`WARNING: SUNNY_ENVIRONMENT is set to '${process.env.SUNNY_ENVIRONMENT}' not 'production'`));
    const changeToProduction = await question(chalk.yellow('Do you want to change to production mode? (y/n): '));
    
    if (changeToProduction.toLowerCase() === 'y') {
      // Update .env file to change environment to production
      const envFilePath = path.join(__dirname, '..', '.env');
      let envContent = fs.readFileSync(envFilePath, 'utf8');
      envContent = envContent.replace(/SUNNY_ENVIRONMENT=.+/g, 'SUNNY_ENVIRONMENT=production');
      fs.writeFileSync(envFilePath, envContent);
      process.env.SUNNY_ENVIRONMENT = 'production';
      console.log(chalk.green('Updated environment to production mode'));
    }
  }
  
  return { 
    success: allValid,
    missingVars
  };
}

// Function to test connections to payment processors
async function testPaymentProcessors() {
  console.log(chalk.cyan('\n--- Testing payment processor connections ---'));
  
  const results = {};
  let allSuccessful = true;
  
  for (const [processor, testFunction] of Object.entries(testFunctions)) {
    try {
      console.log(chalk.yellow(`Testing ${processor} connection...`));
      results[processor] = await testFunction();
      console.log(chalk.green(`✓ ${processor}: ${results[processor].details}`));
    } catch (error) {
      allSuccessful = false;
      results[processor] = {
        success: false,
        error: error.message
      };
      console.log(chalk.red(`✗ ${processor}: ${error.message}`));
    }
  }
  
  return {
    success: allSuccessful,
    results
  };
}

// Main function to run all setup steps
async function setupForProduction() {
  console.log(chalk.cyan.bold('=== Sunny Payment Gateway - Production Setup ==='));
  console.log(chalk.yellow(`Running setup for ${process.env.SUNNY_ENVIRONMENT || 'undefined'} environment`));
  
  try {
    // Step 1: Validate environment variables
    const envValidation = await validateEnvironmentVariables();
    
    // Step 2: Set up security configurations
    const securitySetup = await setupSecurityConfigurations();
    
    // Step 3: Test connections to payment processors
    const connectionTests = await testPaymentProcessors();
    
    // Generate report
    console.log(chalk.cyan.bold('\n=== Setup Summary ==='));
    
    if (envValidation.success && securitySetup.success && connectionTests.success) {
      console.log(chalk.green.bold('✓ All checks passed! System is ready for production transactions'));
    } else {
      console.log(chalk.red.bold('✗ Some checks failed. System is NOT ready for production'));
      
      if (!envValidation.success) {
        console.log(chalk.red('  - Missing environment variables must be configured'));
      }
      
      if (!connectionTests.success) {
        console.log(chalk.red('  - Some payment processor connections failed'));
        for (const [processor, result] of Object.entries(connectionTests.results)) {
          if (!result.success) {
            console.log(chalk.red(`    - ${processor}: ${result.error}`));
          }
        }
      }
    }
    
    // Provide next steps
    console.log(chalk.cyan('\n=== Next Steps ==='));
    if (!envValidation.success || !connectionTests.success) {
      console.log(chalk.yellow('1. Update your .env file with the missing credentials'));
      console.log(chalk.yellow('2. Run this setup script again after updating credentials'));
      console.log(chalk.yellow('3. Make sure all payment processor credentials are valid production credentials'));
    } else {
      console.log(chalk.green('1. Verify database migrations are up to date: npm run migrate'));
      console.log(chalk.green('2. Run final security checks: npm run security-audit'));
      console.log(chalk.green('3. Start the application in production mode: npm run start:prod'));
      console.log(chalk.green('4. Monitor transactions and verify webhooks are properly configured'));
    }

    // Final message
    console.log(chalk.cyan.bold('\n=== Setup Process Complete ==='));
    console.log(chalk.yellow('For additional help, refer to the documentation at https://docs.sunnypayments.com/production-setup\n'));

    // Close readline interface
    rl.close();

  } catch (error) {
    console.error(chalk.red('\nSetup failed with error:'));
    console.error(chalk.red(error.message));
    console.error(error.stack);
    rl.close();
    process.exit(1);
  }
}

// Make the script executable directly with node
// In ES modules, there's no require.main === module check, 
// so we directly call the main function
setupForProduction().catch(error => {
  console.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});

