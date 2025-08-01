#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.production') });

const SECURITY_CONFIG = {
  ssl: {
    minimumVersion: 'TLSv1.2',
    preferServerCiphers: true,
    ciphers: [
      'ECDHE-ECDSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-ECDSA-CHACHA20-POLY1305',
      'ECDHE-RSA-CHACHA20-POLY1305',
      'ECDHE-ECDSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES128-GCM-SHA256'
    ].join(':'),
    dhParamSize: 2048
  },
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': generateCSP()
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },
  cors: {
    allowedOrigins: process.env.CORS_ORIGIN?.split(',') || [],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }
};

function generateCSP() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'none'",
    "object-src 'none'",
    "child-src 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests"
  ].join('; ');
}

async function updateSecurityConfig() {
  console.log(chalk.cyan('=== Updating Security Configuration ===\n'));

  try {
    // Generate DH parameters
    console.log('Generating DH parameters...');
    const dhParamPath = path.join(__dirname, '..', 'config', 'dhparam.pem');
    if (!fs.existsSync(dhParamPath)) {
      execSync(`openssl dhparam -out ${dhParamPath} ${SECURITY_CONFIG.ssl.dhParamSize}`);
    }
    console.log(chalk.green('✓ DH parameters generated'));

    // Update SSL configuration
    console.log('Updating SSL configuration...');
    const sslConfig = {
      ...SECURITY_CONFIG.ssl,
      cert: process.env.SSL_CERT_PATH,
      key: process.env.SSL_KEY_PATH,
      dhParam: dhParamPath
    };

    fs.writeFileSync(
      path.join(__dirname, '..', 'config', 'ssl.json'),
      JSON.stringify(sslConfig, null, 2)
    );
    console.log(chalk.green('✓ SSL configuration updated'));

    // Update security headers
    console.log('Updating security headers...');
    fs.writeFileSync(
      path.join(__dirname, '..', 'config', 'security-headers.json'),
      JSON.stringify(SECURITY_CONFIG.headers, null, 2)
    );
    console.log(chalk.green('✓ Security headers updated'));

    // Update CORS configuration
    console.log('Updating CORS configuration...');
    fs.writeFileSync(
      path.join(__dirname, '..', 'config', 'cors.json'),
      JSON.stringify(SECURITY_CONFIG.cors, null, 2)
    );
    console.log(chalk.green('✓ CORS configuration updated'));

    // Update rate limiting
    console.log('Updating rate limiting configuration...');
    fs.writeFileSync(
      path.join(__dirname, '..', 'config', 'rate-limit.json'),
      JSON.stringify(SECURITY_CONFIG.rateLimit, null, 2)
    );
    console.log(chalk.green('✓ Rate limiting configuration updated'));

    // Verify configurations
    console.log('\nVerifying security configurations...');
    const configFiles = [
      'ssl.json',
      'security-headers.json',
      'cors.json',
      'rate-limit.json'
    ];

    for (const file of configFiles) {
      const configPath = path.join(__dirname, '..', 'config', file);
      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file ${file} not found`);
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (!config || Object.keys(config).length === 0) {
        throw new Error(`Invalid configuration in ${file}`);
      }
    }

    console.log(chalk.green('✓ All security configurations verified'));

    // Apply file permissions
    console.log('\nApplying secure file permissions...');
    const secureFiles = [
      path.join(__dirname, '..', '.env'),
      path.join(__dirname, '..', '.env.production'),
      path.join(__dirname, '..', 'config', 'ssl.json'),
      dhParamPath
    ];

    for (const file of secureFiles) {
      if (fs.existsSync(file)) {
        fs.chmodSync(file, 0o600);
      }
    }
    console.log(chalk.green('✓ Secure file permissions applied'));

    console.log(chalk.green.bold('\n✨ Security configuration update completed successfully!'));

  } catch (error) {
    console.error(chalk.red('\n❌ Security configuration update failed!'));
    console.error(chalk.red(`Error: ${error.message}`));
    throw error;
  }
}

// Execute security configuration update
updateSecurityConfig().catch(error => {
  console.error('Failed to update security configuration:', error);
  process.exit(1);
});