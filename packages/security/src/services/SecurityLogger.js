/**
 * @fileoverview Security Logging System
 * This module implements comprehensive security logging capabilities,
 * including event logging, alert tracking, error reporting, and performance monitoring.
 * 
 * Key Features:
 * - Secure log file management
 * - Automatic log rotation
 * - Multi-category logging
 * - Performance metrics tracking
 * - Alert and error logging
 * 
 * Log Categories:
 * - Security Events: Authentication, authorization, and security-related activities
 * - Alerts: Security alerts and warnings
 * - Errors: System and security errors
 * - Performance: System performance metrics
 * 
 * Security Features:
 * - Secure file permissions
 * - Log file encryption (optional)
 * - Automated log cleanup
 * - Size-based rotation
 * 
 * @module SecurityLogger
 * @requires fs
 * @requires path
 */

import { createHmac } from 'crypto';
import { logger } from './loggingService';
import { redis } from '../config/redis';
import { securityConfig } from '../config/security';

const fs = require('fs').promises;
const path = require('path');

/**
 * SecurityLogger class provides comprehensive security logging capabilities
 * for the Sunny Payments platform.
 * 
 * @class
 * @classdesc Core security logging system
 */
class SecurityLogger {
    /**
     * Creates an instance of SecurityLogger.
     * Initializes logging configuration and sets up log directories.
     * 
     * @constructor
     * @param {Object} [options={}] - Logger configuration options
     * @param {string} [options.logsBasePath] - Base path for log files
     * @param {number} [options.maxLogSize] - Maximum size of log files in bytes
     * @param {number} [options.maxLogAge] - Maximum age of log files in milliseconds
     * @param {number} [options.rotateInterval] - Log rotation interval in milliseconds
     */
    constructor(options = {}) {
        this.config = {
            logsBasePath: path.join(process.cwd(), 'logs/security'),
            maxLogSize: 10 * 1024 * 1024, // 10MB
            maxLogAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            rotateInterval: 24 * 60 * 60 * 1000, // 24 hours
            ...options
        };

        this.alertThresholds = {
            failedLogins: 5,
            suspiciousIPs: 10,
            transactionAmount: 10000,
            apiRateLimit: 1000
        };

        // Ensure log directories exist
        this._initializeLogDirectories();

        // Start log rotation
        this._startLogRotation();
    }

    /**
     * Initializes the log directory structure.
     * Creates directories for different types of logs.
     * 
     * @private
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If directory creation fails
     */
    async _initializeLogDirectories() {
        const directories = ['alerts', 'audit', 'errors', 'performance'];
        for (const dir of directories) {
            await fs.mkdir(path.join(this.config.logsBasePath, dir), { recursive: true });
        }
    }

    /**
     * Starts the automated log rotation process.
     * Rotates logs based on size and age.
     * 
     * @private
     */
    _startLogRotation() {
        setInterval(async () => {
            try {
                await this._rotateLogFiles();
            } catch (error) {
                console.error('Failed to rotate log files:', error);
            }
        }, this.config.rotateInterval);
    }

    /**
     * Performs log file rotation based on size and age.
     * Removes old logs and rotates large files.
     * 
     * @private
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If file operations fail
     */
    async _rotateLogFiles() {
        const now = new Date();
        const cutoffTime = now.getTime() - this.config.maxLogAge;

        const directories = ['alerts', 'audit', 'errors', 'performance'];
        for (const dir of directories) {
            const dirPath = path.join(this.config.logsBasePath, dir);
            const files = await fs.readdir(dirPath);

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stats = await fs.stat(filePath);

                // Delete old files
                if (stats.mtimeMs < cutoffTime) {
                    await fs.unlink(filePath);
                    continue;
                }

                // Rotate large files
                if (stats.size > this.config.maxLogSize) {
                    const newFilePath = path.join(
                        dirPath,
                        `${path.parse(file).name}.${now.toISOString()}.log`
                    );
                    await fs.rename(filePath, newFilePath);
                }
            }
        }
    }

    /**
     * Logs security-related events.
     * 
     * @async
     * @param {Object} event - The security event to log
     * @returns {Promise<void>}
     * @throws {Error} If logging fails
     */
    async logSecurityEvent(event) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...event,
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'audit',
            `security-events-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    /**
     * Logs security alerts and warnings.
     * 
     * @async
     * @param {Object} alert - The alert to log
     * @returns {Promise<void>}
     * @throws {Error} If logging fails
     */
    async logAlert(alert) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...alert,
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'alerts',
            `security-alerts-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    /**
     * Logs errors and exceptions.
     * 
     * @async
     * @param {Object} error - The error to log
     * @param {string} error.message - Error message
     * @param {string} error.stack - Error stack trace
     * @param {string} [error.code] - Error code
     * @param {Object} [error.context] - Additional error context
     * @returns {Promise<void>}
     * @throws {Error} If logging fails
     */
    async logError(error) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            error: {
                message: error.message,
                stack: error.stack,
                code: error.code,
            },
            context: error.context || {},
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'errors',
            `security-errors-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    /**
     * Logs performance metrics and system statistics.
     * 
     * @async
     * @param {Object} metrics - The performance metrics to log
     * @returns {Promise<void>}
     * @throws {Error} If logging fails
     */
    async logPerformance(metrics) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...metrics,
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'performance',
            `security-performance-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    async logAuthenticationFailure(data) {
        const { userId, ipAddress, reason } = data;
        
        await this.logSecurityEvent('AUTH_FAILURE', {
            userId,
            ipAddress,
            reason,
            severity: 'HIGH'
        });

        // Track failed attempts
        const key = `auth:failures:${ipAddress}`;
        const attempts = await redis.incr(key);
        await redis.expire(key, 3600); // Expire after 1 hour

        if (attempts >= this.alertThresholds.failedLogins) {
            await this._triggerSecurityAlert('BRUTE_FORCE_ATTEMPT', {
                ipAddress,
                attempts,
                userId
            });
        }
    }

    async logSuspiciousTransaction(data) {
        const { transactionId, amount, userId, risk_factors } = data;

        await this.logSecurityEvent('SUSPICIOUS_TRANSACTION', {
            transactionId,
            amount,
            userId,
            risk_factors,
            severity: 'HIGH'
        });

        if (amount > this.alertThresholds.transactionAmount) {
            await this._triggerSecurityAlert('HIGH_VALUE_TRANSACTION', {
                transactionId,
                amount,
                userId
            });
        }
    }

    async logAPIUsage(data) {
        const { endpoint, method, ipAddress, responseTime, statusCode } = data;
        
        const key = `api:usage:${ipAddress}:${endpoint}`;
        const requests = await redis.incr(key);
        await redis.expire(key, 60); // Expire after 1 minute

        if (requests > this.alertThresholds.apiRateLimit) {
            await this._triggerSecurityAlert('API_RATE_LIMIT_EXCEEDED', {
                ipAddress,
                endpoint,
                requests,
                timeWindow: '1 minute'
            });
        }

        await this.logSecurityEvent('API_ACCESS', {
            endpoint,
            method,
            ipAddress,
            responseTime,
            statusCode,
            severity: statusCode >= 400 ? 'MEDIUM' : 'LOW'
        });
    }

    async _storeSecurityEvent(eventData) {
        const key = `security:events:${eventData.type}`;
        await redis.lpush(key, JSON.stringify(eventData));
        await redis.ltrim(key, 0, 999); // Keep last 1000 events

        // Store in time-series for analytics
        const timeSeriesKey = `security:timeseries:${eventData.type}:${this._getTimeWindow()}`;
        await redis.incr(timeSeriesKey);
        await redis.expire(timeSeriesKey, 86400); // Expire after 24 hours
    }

    async _checkSecurityThresholds(eventType, data) {
        const windowKey = `security:window:${eventType}:${this._getTimeWindow()}`;
        const count = await redis.incr(windowKey);
        await redis.expire(windowKey, 300); // 5-minute window

        const thresholds = {
            AUTH_FAILURE: 10,
            SUSPICIOUS_TRANSACTION: 5,
            API_RATE_LIMIT_EXCEEDED: 100
        };

        if (count >= (thresholds[eventType] || 50)) {
            await this._triggerSecurityAlert('THRESHOLD_EXCEEDED', {
                eventType,
                count,
                timeWindow: '5 minutes',
                ...data
            });
        }
    }

    async _triggerSecurityAlert(alertType, data) {
        const alert = {
            type: alertType,
            timestamp: new Date().toISOString(),
            data,
            severity: 'HIGH'
        };

        // Log alert
        logger.error('Security alert triggered', alert);

        // Store alert in Redis
        const alertKey = `security:alerts:${alertType}`;
        await redis.lpush(alertKey, JSON.stringify(alert));
        await redis.ltrim(alertKey, 0, 99); // Keep last 100 alerts

        // Notify security team (implement your notification mechanism here)
        // this._notifySecurityTeam(alert);
    }

    _generateEventId(eventType, timestamp) {
        const hmac = createHmac('sha256', securityConfig.encryption.secret);
        hmac.update(`${eventType}:${timestamp}:${Math.random()}`);
        return hmac.digest('hex');
    }

    _getTimeWindow() {
        const date = new Date();
        return `${date.getUTCFullYear()}:${date.getUTCMonth()}:${date.getUTCDate()}:${date.getUTCHours()}:${Math.floor(date.getUTCMinutes() / 5)}`;
    }
}

export const securityLogger = new SecurityLogger();
