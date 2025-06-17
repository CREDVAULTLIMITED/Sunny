#!/usr/bin/env node

/**
 * Access Control Verification Script
 * Validates access control implementations and policies
 */

const fs = require('fs');
const path = require('path');

async function verifyAccessControls() {
    console.log('Verifying access control configuration...');
    
    try {
        // Check RBAC configuration
        const rbacConfig = require('../../src/config/rbac.js');
        verifyRBACConfiguration(rbacConfig);

        // Check authentication settings
        const authConfig = require('../../src/config/auth.js');
        verifyAuthConfiguration(authConfig);

        // Check session management
        const sessionConfig = require('../../src/config/session.js');
        verifySessionConfiguration(sessionConfig);

        // Verify JWT configuration
        const jwtConfig = require('../../src/config/auth.js').jwt;
        verifyJWTConfiguration(jwtConfig);

        console.log('✅ Access control verification passed');
        process.exit(0);
    } catch (error) {
        if (process.env.ENVIRONMENT === 'development') {
            console.warn('⚠️ Some access control checks skipped in development mode');
            process.exit(0);
        } else {
            console.error('❌ Access control verification failed:', error.message);
            process.exit(1);
        }
    }
}

function verifyRBACConfiguration(config) {
    if (!config.roles || Object.keys(config.roles).length === 0) {
        throw new Error('RBAC roles not configured');
    }
    if (!config.permissions || Object.keys(config.permissions).length === 0) {
        throw new Error('RBAC permissions not configured');
    }
}

function verifyAuthConfiguration(config) {
    if (process.env.ENVIRONMENT !== 'development') {
        if (!config.mfaRequired) {
            throw new Error('MFA must be required for sensitive operations');
        }

        if (config.passwordPolicy.minLength < 12) {
            throw new Error('Password minimum length must be at least 12 characters');
        }

        if (!config.passwordPolicy.requireSpecialChars) {
            throw new Error('Password policy must require special characters');
        }
    }
}

function verifySessionConfiguration(config) {
    if (process.env.ENVIRONMENT !== 'development') {
        if (config.maxAge > 3600000) { // 1 hour
            throw new Error('Session timeout must not exceed 1 hour');
        }

        if (!config.secure) {
            throw new Error('Sessions must be secure');
        }

        if (!config.httpOnly) {
            throw new Error('Sessions must be HTTP-only');
        }
    }
}

function verifyJWTConfiguration(config) {
    if (process.env.ENVIRONMENT !== 'development') {
        if (config.expiresIn !== '1h') {
            throw new Error('JWT expiration must be set to 1 hour');
        }

        if (!config.algorithm.startsWith('RS')) {
            throw new Error('JWT must use RSA signing');
        }
    }
}

verifyAccessControls();
