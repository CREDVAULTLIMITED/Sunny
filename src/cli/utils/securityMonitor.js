/**
 * @fileoverview Security Monitoring System for Sunny Payments
 * This module implements comprehensive security monitoring and validation capabilities,
 * including environment checks, encryption validation, and security reporting.
 * 
 * Key Features:
 * - TLS version validation
 * - File permission checks
 * - Dependency vulnerability scanning
 * - Secure storage verification
 * - Automated security reporting
 * - AES-256-GCM encryption
 * 
 * Security Standards:
 * - Enforces TLS 1.2/1.3
 * - Implements secure file permissions (0o700)
 * - Uses AES-256-GCM for data encryption
 * - Generates cryptographically secure random values
 * 
 * @module SecurityMonitor
 * @requires crypto
 * @requires https
 * @requires fs
 * @requires path
 * @requires child_process
 */

const crypto = require('crypto');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * SecurityMonitor class handles security validation, encryption, and monitoring
 * in the Sunny Payments CLI environment.
 * 
 * @class
 * @classdesc Core security monitoring system for CLI operations
 */
class SecurityMonitor {
    /**
     * Creates an instance of SecurityMonitor.
     * Sets up the security logs directory in the user's home folder.
     * 
     * @constructor
     */
    constructor() {
        this.securityLogDir = path.join(process.env.HOME, '.sunny', 'security_logs');
    }

    /**
     * Initializes the security monitoring system.
     * Creates necessary directories with secure permissions.
     * 
     * @returns {void}
     * @throws {Error} If directory creation fails
     */
    initialize() {
        if (!fs.existsSync(this.securityLogDir)) {
            fs.mkdirSync(this.securityLogDir, { recursive: true, mode: 0o700 });
        }
    }

    /**
     * Validates the security of the environment by running multiple security checks.
     * 
     * Checks performed:
     * - TLS version validation
     * - File permission verification
     * - Dependency vulnerability scanning
     * - Secure storage validation
     * 
     * @async
     * @returns {Promise<Object>} The security validation report
     * @throws {Error} If validation checks fail
     */
    async validateEnvironment() {
        const checks = [
            this.checkTlsVersion(),
            this.checkFilePermissions(),
            this.checkDependencyVulnerabilities(),
            this.checkSecureStorage()
        ];

        const results = await Promise.all(checks);
        return this.generateSecurityReport(results);
    }

    /**
     * Checks the TLS version used for HTTPS connections.
     * Ensures that only secure TLS versions (1.2 or 1.3) are used.
     * 
     * @async
     * @returns {Promise<Object>} The TLS check result
     * @returns {string} .name - Name of the check ("TLS Version")
     * @returns {boolean} .passed - Whether the check passed
     * @returns {string} .message - Detailed message about the TLS version
     */
    checkTlsVersion() {
        return new Promise((resolve) => {
            const options = {
                host: 'api.sunnypayments.com',
                port: 443,
                method: 'HEAD'
            };

            const req = https.request(options, (res) => {
                const protocol = res.socket.getProtocol();
                resolve({
                    name: 'TLS Version',
                    passed: protocol === 'TLSv1.3' || protocol === 'TLSv1.2',
                    message: `Using ${protocol}`
                });
            });

            req.on('error', () => {
                resolve({
                    name: 'TLS Version',
                    passed: false,
                    message: 'Could not verify TLS version'
                });
            });

            req.end();
        });
    }

    /**
     * Verifies secure file permissions for configuration directory.
     * Ensures that sensitive files are only accessible by the owner.
     * 
     * @returns {Promise<Object>} The file permissions check result
     * @returns {string} .name - Name of the check ("File Permissions")
     * @returns {boolean} .passed - Whether permissions are secure
     * @returns {string} .message - Details about the file permissions
     */
    checkFilePermissions() {
        const configDir = path.join(process.env.HOME, '.sunny');
        try {
            const stats = fs.statSync(configDir);
            const mode = stats.mode & 0o777;
            return Promise.resolve({
                name: 'File Permissions',
                passed: mode === 0o700,
                message: `Config directory permissions: ${mode.toString(8)}`
            });
        } catch (error) {
            return Promise.resolve({
                name: 'File Permissions',
                passed: false,
                message: 'Could not verify file permissions'
            });
        }
    }

    /**
     * Scans for known vulnerabilities in project dependencies.
     * Uses npm audit to check for security issues.
     * 
     * @async
     * @returns {Promise<Object>} The vulnerability check result
     * @returns {string} .name - Name of the check ("Dependencies")
     * @returns {boolean} .passed - Whether no critical vulnerabilities were found
     * @returns {string} .message - Details about found vulnerabilities
     */
    async checkDependencyVulnerabilities() {
        try {
            execSync('npm audit --json', { stdio: 'pipe' });
            return {
                name: 'Dependencies',
                passed: true,
                message: 'No critical vulnerabilities found'
            };
        } catch (error) {
            const auditData = JSON.parse(error.stdout);
            const criticalVulns = auditData.metadata.vulnerabilities.critical || 0;
            return {
                name: 'Dependencies',
                passed: criticalVulns === 0,
                message: `Found ${criticalVulns} critical vulnerabilities`
            };
        }
    }

    /**
     * Verifies the encryption system by testing encryption and decryption.
     * Uses AES-256-GCM for secure data storage.
     * 
     * @returns {Promise<Object>} The encryption system check result
     * @returns {string} .name - Name of the check ("Secure Storage")
     * @returns {boolean} .passed - Whether encryption is working correctly
     * @returns {string} .message - Status of the encryption system
     */
    checkSecureStorage() {
        try {
            const testData = crypto.randomBytes(32).toString('hex');
            const encryptedData = this.encryptData(testData);
            const decryptedData = this.decryptData(encryptedData);
            
            return Promise.resolve({
                name: 'Secure Storage',
                passed: testData === decryptedData,
                message: 'Encryption/decryption working correctly'
            });
        } catch (error) {
            return Promise.resolve({
                name: 'Secure Storage',
                passed: false,
                message: 'Encryption system not working properly'
            });
        }
    }

    /**
     * Encrypts data using AES-256-GCM with a random key and IV.
     * 
     * @param {string} data - The data to encrypt
     * @returns {Object} The encrypted data package
     * @returns {string} .encrypted - The encrypted data in hex format
     * @returns {string} .iv - The initialization vector in hex format
     * @returns {string} .authTag - The authentication tag in hex format
     * @returns {string} .key - The encryption key in hex format
     */
    encryptData(data) {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();
        
        return {
            encrypted: encrypted.toString('hex'),
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex'),
            key: key.toString('hex')
        };
    }

    /**
     * Decrypts data that was encrypted with AES-256-GCM.
     * 
     * @param {Object} encryptedData - The encrypted data package
     * @param {string} encryptedData.key - The encryption key in hex format
     * @param {string} encryptedData.iv - The initialization vector in hex format
     * @param {string} encryptedData.authTag - The authentication tag in hex format
     * @param {string} encryptedData.encrypted - The encrypted data in hex format
     * @returns {string} The decrypted data
     * @throws {Error} If decryption fails or data is tampered
     */
    decryptData(encryptedData) {
        const key = Buffer.from(encryptedData.key, 'hex');
        const iv = Buffer.from(encryptedData.iv, 'hex');
        const authTag = Buffer.from(encryptedData.authTag, 'hex');
        const encrypted = Buffer.from(encryptedData.encrypted, 'hex');
        
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        return Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ]).toString('utf8');
    }

    /**
     * Generates a comprehensive security report from check results.
     * 
     * @param {Array<Object>} results - Results from security checks
     * @param {string} results[].name - Name of the security check
     * @param {boolean} results[].passed - Whether the check passed
     * @param {string} results[].message - Detailed message about the check
     * @returns {Object} The generated security report
     * @returns {string} .timestamp - ISO timestamp of the report
     * @returns {Array<Object>} .results - The check results
     * @returns {string} .overallStatus - Overall status (PASSED/FAILED)
     */
    generateSecurityReport(results) {
        const reportTime = new Date().toISOString();
        const reportPath = path.join(
            this.securityLogDir,
            `security_report_${reportTime.replace(/[:.]/g, '-')}.json`
        );

        const report = {
            timestamp: reportTime,
            results,
            overallStatus: results.every(r => r.passed) ? 'PASSED' : 'FAILED'
        };

        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), { mode: 0o600 });
        return report;
    }
}

module.exports = new SecurityMonitor();
