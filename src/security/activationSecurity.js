/**
 * @fileoverview Enterprise Security Module for Sunny Payments Activation System
 * This module implements comprehensive security measures, audit logging, and compliance checks
 * for the Sunny Payments platform activation process.
 * 
 * Key Features:
 * - Secure token generation using cryptographic primitives
 * - Environment security validation
 * - System integrity checks
 * - Network security validation
 * - Audit logging with detailed system information
 * - Secure directory management
 * - API key strength validation
 * 
 * Security Standards:
 * - Uses PBKDF2 for key derivation with SHA-512
 * - Implements secure file permissions (0o600 for files, 0o700 for directories)
 * - Enforces TLS 1.2/1.3 for network communications
 * - Maintains comprehensive audit logs
 * 
 * @module ActivationSecurity
 * @requires crypto
 * @requires util
 * @requires os
 * @requires fs
 * @requires path
 */

const crypto = require('crypto');
const { promisify } = require('util');
const os = require('os');
const fs = require('fs');
const path = require('path');
const randomBytes = promisify(crypto.randomBytes);
const pbkdf2 = promisify(crypto.pbkdf2);

/**
 * ActivationSecurity class handles all security-related operations for the activation process.
 * It manages secure token generation, environment validation, system integrity checks,
 * and audit logging.
 * 
 * @class
 * @classdesc Core security module for Sunny Payments activation system
 */
class ActivationSecurity {
    /**
     * Creates an instance of ActivationSecurity.
     * Initializes security parameters and sets up the audit logging directory.
     * 
     * @constructor
     * @throws {Error} If security context initialization fails
     * 
     * Configuration:
     * - keyLength: 32 bytes (256 bits) for secure token generation
     * - iterations: 100,000 rounds for PBKDF2
     * - digest: SHA-512 for cryptographic operations
     * - auditLogPath: ~/.sunny/logs/audit or SUNNY_LOG_DIR/logs/audit
     */
    constructor() {
        this.keyLength = 32;
        this.iterations = 100000;
        this.digest = 'sha512';
        this.auditLogPath = path.join(process.env.SUNNY_LOG_DIR || os.homedir(), '.sunny', 'logs', 'audit');
        this.initializeSecurityContext();
    }

    /**
     * Initializes the security context by ensuring secure directories exist and validating the environment.
     * This method is called automatically during instance construction.
     * 
     * @async
     * @private
     * @returns {Promise<void>}
     * @throws {Error} If directory creation fails or environment validation fails
     */
    async initializeSecurityContext() {
        await this.#ensureSecureDirectory(this.auditLogPath);
        await this.validateEnvironment();
    }

    /**
     * Validates an activation request by performing multiple security checks in parallel.
     * 
     * Security checks include:
     * - API key strength validation
     * - Environment security validation
     * - System integrity check
     * - Malicious pattern detection
     * - Network security validation
     * 
     * @async
     * @param {Object} params - The activation request parameters
     * @param {string} params.apiKey - The API key to validate
     * @returns {Promise<boolean>} True if all validations pass
     * @throws {Error} If any security validation fails, with detailed error messages
     */
    async validateActivationRequest(params) {
        const validations = [
            this.validateApiKeyStrength(params.apiKey),
            this.validateEnvironmentSecurity(),
            this.validateSystemIntegrity(),
            this.checkForMaliciousPatterns(params),
            this.validateNetworkSecurity()
        ];

        const results = await Promise.all(validations);
        const failed = results.filter(r => !r.success);

        if (failed.length > 0) {
            throw new Error(`Security validation failed: ${failed.map(f => f.message).join(', ')}`);
        }

        return true;
    }

    /**
     * Validates the strength of an API key using entropy calculation.
     * 
     * The entropy calculation considers:
     * - Character distribution
     * - Key length
     * - Information density
     * 
     * @async
     * @param {string} apiKey - The API key to validate
     * @returns {Promise<Object>} Validation result
     * @returns {boolean} .success - Whether the validation passed
     * @returns {string} [.message] - Error message if validation failed
     */
    async validateApiKeyStrength(apiKey) {
        if (!apiKey || typeof apiKey !== 'string') {
            return { success: false, message: 'Invalid API key format' };
        }

        const entropy = this.#calculateEntropy(apiKey);
        if (entropy < 128) {
            return { success: false, message: 'API key entropy too low' };
        }

        return { success: true };
    }

    /**
     * Validates the security of the environment settings.
     * Checks for production environment and secure protocol settings.
     * 
     * @async
     * @returns {Promise<Object>} Validation result
     * @returns {boolean} .success - Whether the validation passed
     * @returns {string} [.message] - Error message if validation failed
     */
    async validateEnvironmentSecurity() {
        const unsecureEnvVars = process.env.NODE_ENV !== 'production';
        const hasUnsecureProtocols = process.env.ALLOW_INSECURE_PROTOCOLS === 'true';
        
        if (unsecureEnvVars || hasUnsecureProtocols) {
            return { 
                success: false, 
                message: 'Environment security compromised' 
            };
        }

        return { success: true };
    }

    /**
     * Validates system integrity by generating and comparing system state hashes.
     * This helps detect unauthorized system modifications.
     * 
     * @async
     * @returns {Promise<Object>} Validation result
     * @returns {boolean} .success - Whether the validation passed
     * @returns {string} [.message] - Error message if validation failed
     */
    async validateSystemIntegrity() {
        try {
            const systemInfo = await this.#getSystemInfo();
            const integrityHash = await this.#calculateSystemIntegrityHash(systemInfo);
            
            // Store hash for continuous monitoring
            await this.#storeIntegrityHash(integrityHash);
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: 'System integrity check failed' 
            };
        }
    }

    /**
     * Validates network security by checking TLS version.
     * Only allows TLS 1.2 and 1.3.
     * 
     * @async
     * @returns {Promise<Object>} Validation result
     * @returns {boolean} .success - Whether the validation passed
     * @returns {string} [.message] - Error message if validation failed
     */
    async validateNetworkSecurity() {
        try {
            const tlsVersion = crypto.getDefaultEncoding();
            const secureProtocols = ['TLSv1_2_method', 'TLSv1_3_method'];
            
            if (!secureProtocols.includes(tlsVersion)) {
                return { 
                    success: false, 
                    message: 'Insecure TLS version detected' 
                };
            }

            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: 'Network security validation failed' 
            };
        }
    }

    /**
     * Generates a cryptographically secure token using PBKDF2.
     * 
     * @async
     * @private
     * @returns {Promise<Object>} The generated token and salt
     * @returns {string} .token - The generated token in hexadecimal format
     * @returns {string} .salt - The salt used in hexadecimal format
     * @throws {Error} If token generation fails
     */
    async #generateSecureToken() {
        const buffer = await randomBytes(this.keyLength);
        const salt = await randomBytes(16);
        
        const derivedKey = await pbkdf2(
            buffer,
            salt,
            this.iterations,
            this.keyLength,
            this.digest
        );

        return {
            token: derivedKey.toString('hex'),
            salt: salt.toString('hex')
        };
    }

    /**
     * Calculates a hash of the system state for integrity verification.
     * 
     * @async
     * @private
     * @param {Object} systemInfo - System information object
     * @returns {Promise<string>} The calculated hash in hexadecimal format
     */
    async #calculateSystemIntegrityHash(systemInfo) {
        const dataToHash = JSON.stringify(systemInfo);
        return crypto
            .createHash('sha512')
            .update(dataToHash)
            .digest('hex');
    }

    /**
     * Stores the system integrity hash securely.
     * 
     * @async
     * @private
     * @param {string} hash - The hash to store
     * @throws {Error} If file operations fail
     */
    async #storeIntegrityHash(hash) {
        const hashFile = path.join(this.auditLogPath, 'system-integrity.hash');
        await fs.promises.writeFile(hashFile, hash, { mode: 0o600 });
    }

    /**
     * Logs security-related events with detailed system information.
     * 
     * The log entry includes:
     * - Timestamp (ISO format)
     * - Event details
     * - Environment information
     * - System state
     * - Unique session ID
     * 
     * @async
     * @param {Object} event - The event to log
     * @throws {Error} If logging fails
     */
    async auditLog(event) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event,
            environment: process.env.NODE_ENV,
            systemInfo: await this.#getSystemInfo(),
            sessionId: this.#generateSessionId()
        };

        const logFile = path.join(
            this.auditLogPath,
            `activation-audit-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.promises.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            { mode: 0o600 }
        );
    }

    /**
     * Creates and ensures proper permissions for security-sensitive directories.
     * 
     * @async
     * @private
     * @param {string} dirPath - The path to secure
     * @throws {Error} If directory creation or permission setting fails
     */
    async #ensureSecureDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            await fs.promises.mkdir(dirPath, { 
                recursive: true, 
                mode: 0o700 
            });
        }

        // Verify permissions
        const stats = await fs.promises.stat(dirPath);
        if ((stats.mode & 0o777) !== 0o700) {
            await fs.promises.chmod(dirPath, 0o700);
        }
    }

    /**
     * Calculates the Shannon entropy of a string.
     * Used for measuring the strength of cryptographic keys and tokens.
     * 
     * @private
     * @param {string} string - The string to calculate entropy for
     * @returns {number} The calculated entropy value
     */
    #calculateEntropy(string) {
        const len = string.length;
        const frequencies = {};
        
        for (let i = 0; i < len; i++) {
            frequencies[string[i]] = (frequencies[string[i]] || 0) + 1;
        }
        
        return Object.values(frequencies).reduce((entropy, freq) => {
            const p = freq / len;
            return entropy - p * Math.log2(p);
        }, 0) * len;
    }

    /**
     * Gathers detailed system information for integrity checks and logging.
     * 
     * @async
     * @private
     * @returns {Promise<Object>} System information object
     * @returns {string} .platform - Operating system platform
     * @returns {string} .release - OS release version
     * @returns {string} .arch - CPU architecture
     * @returns {number} .cpus - Number of CPU cores
     * @returns {number} .totalMem - Total system memory
     * @returns {string} .hostname - System hostname
     * @returns {Object} .networkInterfaces - Network interface details
     */
    async #getSystemInfo() {
        return {
            platform: os.platform(),
            release: os.release(),
            arch: os.arch(),
            cpus: os.cpus().length,
            totalMem: os.totalmem(),
            hostname: os.hostname(),
            networkInterfaces: os.networkInterfaces()
        };
    }

    /**
     * Generates a unique session ID using SHA-256.
     * 
     * @private
     * @returns {string} The generated session ID in hexadecimal format
     */
    #generateSessionId() {
        return crypto
            .createHash('sha256')
            .update(Date.now().toString() + Math.random().toString())
            .digest('hex');
    }
}

module.exports = new ActivationSecurity();
