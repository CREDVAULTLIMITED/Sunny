#!/usr/bin/env node

/**
 * Key Management Verification Script
 * Validates key management and rotation policies
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function verifyKeyManagement() {
    console.log('Verifying key management configuration...');
    
    try {
        // Check key rotation configuration
        const keyConfig = require('../../config/key-rotation.js');
        verifyKeyRotationConfig(keyConfig);

        // Check HSM configuration
        await verifyHSMConfig();

        // Verify key backup configuration
        verifyKeyBackupConfig(keyConfig);

        // Check key access controls
        await verifyKeyAccessControls();

        console.log('✅ Key management verification passed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Key management verification failed:', error.message);
        process.exit(1);
    }
}

function verifyKeyRotationConfig(config) {
    if (!config.automaticRotation) {
        throw new Error('Automatic key rotation must be enabled');
    }

    if (config.rotationPeriodDays > 90) {
        throw new Error('Keys must be rotated at least every 90 days');
    }

    if (!config.keyTypes.includes('master')) {
        throw new Error('Master key type must be configured');
    }

    if (!config.keyTypes.includes('encryption')) {
        throw new Error('Encryption key type must be configured');
    }

    if (!config.alertBeforeExpiry) {
        throw new Error('Key expiration alerts must be configured');
    }
}

async function verifyHSMConfig() {
    try {
        const hsmConfig = require('../../config/hsm.js');

        if (!hsmConfig.enabled) {
            throw new Error('Hardware Security Module (HSM) must be enabled');
        }

        if (!['aws-cloudhsm', 'azure-keyvault', 'google-cloudkms'].includes(hsmConfig.provider)) {
            throw new Error('Invalid HSM provider configured');
        }

        // Verify HSM connectivity
        await testHSMConnection(hsmConfig);
    } catch (error) {
        throw new Error(`HSM verification failed: ${error.message}`);
    }
}

function verifyKeyBackupConfig(config) {
    if (!config.backupKeys) {
        throw new Error('Key backup must be enabled');
    }

    if (config.keyStorage !== 'vault') {
        throw new Error('Keys must be stored in a secure vault');
    }

    // Check backup encryption
    try {
        const backupConfig = require('../../config/backup.js');
        if (!backupConfig.keyBackup || !backupConfig.keyBackup.encryption) {
            throw new Error('Key backup encryption must be enabled');
        }
    } catch (error) {
        throw new Error(`Key backup verification failed: ${error.message}`);
    }
}

async function verifyKeyAccessControls() {
    try {
        const accessConfig = require('../../config/access-control.js');

        if (!accessConfig.keyManagement) {
            throw new Error('Key management access controls not configured');
        }

        const requiredRoles = ['keyAdmin', 'keyRotation', 'keyBackup'];
        for (const role of requiredRoles) {
            if (!accessConfig.keyManagement.roles.includes(role)) {
                throw new Error(`Required key management role ${role} not configured`);
            }
        }

        // Verify key access logging
        if (!accessConfig.keyManagement.auditLogging) {
            throw new Error('Key access audit logging must be enabled');
        }
    } catch (error) {
        throw new Error(`Key access control verification failed: ${error.message}`);
    }
}

async function testHSMConnection(config) {
    // Mock HSM connection test for development
    if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Skipping HSM connection test in development mode');
        return;
    }

    try {
        switch (config.provider) {
            case 'aws-cloudhsm':
                await testAWSCloudHSM(config);
                break;
            case 'azure-keyvault':
                await testAzureKeyVault(config);
                break;
            case 'google-cloudkms':
                await testGoogleCloudKMS(config);
                break;
            default:
                throw new Error('Unsupported HSM provider');
        }
    } catch (error) {
        throw new Error(`HSM connection test failed: ${error.message}`);
    }
}

// Provider-specific HSM connection tests
async function testAWSCloudHSM(config) {
    // AWS CloudHSM connection test
    throw new Error('AWS CloudHSM connection test not implemented');
}

async function testAzureKeyVault(config) {
    // Azure Key Vault connection test
    throw new Error('Azure Key Vault connection test not implemented');
}

async function testGoogleCloudKMS(config) {
    // Google Cloud KMS connection test
    throw new Error('Google Cloud KMS connection test not implemented');
}

verifyKeyManagement();
