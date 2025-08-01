#!/usr/bin/env node

/**
 * Database Security Verification Script
 * Validates MongoDB security configuration and encryption
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function verifyDatabaseSecurity() {
    console.log('Verifying database security configuration...');
    
    try {
        // Check MongoDB configuration
        await verifyMongoDBConfig();

        // Check encryption settings
        await verifyDatabaseEncryption();

        // Verify authentication
        await verifyDatabaseAuthentication();

        // Check backup encryption
        await verifyBackupEncryption();

        console.log('✅ Database security verification passed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database security verification failed:', error.message);
        process.exit(1);
    }
}

async function verifyMongoDBConfig() {
    try {
        const config = require('../../config/mongodb.js');

        if (!config.ssl) {
            throw new Error('MongoDB SSL/TLS must be enabled');
        }

        if (!config.authSource) {
            throw new Error('MongoDB authentication source not configured');
        }

        if (!config.replicaSet) {
            throw new Error('MongoDB must use replica set for production');
        }
    } catch (error) {
        throw new Error(`MongoDB configuration error: ${error.message}`);
    }
}

async function verifyDatabaseEncryption() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true
        });

        const adminDb = client.db('admin');
        const serverStatus = await adminDb.command({ serverStatus: 1 });

        if (!serverStatus.security || !serverStatus.security.SSLServerSubject) {
            throw new Error('MongoDB SSL/TLS not properly configured');
        }

        if (!serverStatus.security.authentication || !serverStatus.security.authorization) {
            throw new Error('MongoDB authentication/authorization not enabled');
        }

        await client.close();
    } catch (error) {
        throw new Error(`Database encryption verification failed: ${error.message}`);
    }
}

async function verifyDatabaseAuthentication() {
    try {
        const users = await listDatabaseUsers();
        
        if (!users.some(user => user.roles.some(role => role.role === 'userAdmin'))) {
            throw new Error('No user administrator configured');
        }

        if (!users.some(user => user.roles.some(role => role.role === 'backup'))) {
            throw new Error('No backup user configured');
        }

        if (users.some(user => user.roles.some(role => role.role === 'root'))) {
            throw new Error('Root user should not be used in production');
        }
    } catch (error) {
        throw new Error(`Authentication verification failed: ${error.message}`);
    }
}

async function verifyBackupEncryption() {
    try {
        const backupConfig = require('../../config/backup.js');

        if (!backupConfig.encryption || !backupConfig.encryption.enabled) {
            throw new Error('Backup encryption must be enabled');
        }

        if (backupConfig.encryption.algorithm !== 'aes-256-gcm') {
            throw new Error('Backup encryption must use AES-256-GCM');
        }

        if (!backupConfig.compression || !backupConfig.compression.enabled) {
            throw new Error('Backup compression should be enabled');
        }
    } catch (error) {
        throw new Error(`Backup encryption verification failed: ${error.message}`);
    }
}

async function listDatabaseUsers() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true
        });

        const adminDb = client.db('admin');
        const users = await adminDb.command({ usersInfo: 1 });

        await client.close();
        return users.users;
    } catch (error) {
        throw new Error(`Failed to list database users: ${error.message}`);
    }
}

verifyDatabaseSecurity();
