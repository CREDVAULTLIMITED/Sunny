#!/usr/bin/env node

/**
 * Data Protection Verification Script
 * Validates data protection measures and encryption
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

async function verifyDataProtection() {
    console.log('Verifying data protection measures...');
    
    try {
        // Check encryption at rest
        const storageConfig = require('../../config/storage.js');
        verifyStorageEncryption(storageConfig);

        // Check data masking
        const maskingConfig = require('../../config/data-masking.js');
        verifyDataMasking(maskingConfig);

        // Check key rotation
        const keyConfig = require('../../config/key-management.js');
        verifyKeyManagement(keyConfig);

        // Check backup encryption
        const backupConfig = require('../../config/backup.js');
        verifyBackupEncryption(backupConfig);

        console.log('✅ Data protection verification passed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Data protection verification failed:', error.message);
        process.exit(1);
    }
}

function verifyStorageEncryption(config) {
    if (!config.encrypted) {
        throw new Error('Storage encryption must be enabled');
    }
    if (config.algorithm !== 'aes-256-gcm') {
        throw new Error('Must use AES-256-GCM for storage encryption');
    }
}

function verifyDataMasking(config) {
    const requiredFields = ['creditCard', 'ssn', 'bankAccount'];
    for (const field of requiredFields) {
        if (!config.maskedFields.includes(field)) {
            throw new Error(`${field} must be masked`);
        }
    }
}

function verifyKeyManagement(config) {
    if (!config.autoRotation) {
        throw new Error('Automatic key rotation must be enabled');
    }
    if (config.keyLifetime > 90 * 24 * 60 * 60 * 1000) { // 90 days
        throw new Error('Keys must be rotated at least every 90 days');
    }
}

function verifyBackupEncryption(config) {
    if (!config.encryptBackups) {
        throw new Error('Backup encryption must be enabled');
    }
    if (!config.separateBackupKey) {
        throw new Error('Must use separate encryption keys for backups');
    }
}

verifyDataProtection();
