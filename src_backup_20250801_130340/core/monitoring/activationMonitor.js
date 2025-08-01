/**
 * Sunny Payments - Enterprise Activation Monitoring
 * Real-time monitoring, health checks, and alerting for activation system
 */

const EventEmitter = require('events');
const os = require('os');
const cluster = require('cluster');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const activationSecurity = require('./activationSecurity');

class ActivationMonitor extends EventEmitter {
    constructor() {
        super();
        this.metricsInterval = 60000; // 1 minute
        this.alertThresholds = {
            failedAttempts: 5,
            responseTime: 2000, // 2 seconds
            errorRate: 0.05 // 5%
        };
        this.metrics = {
            totalActivations: 0,
            failedActivations: 0,
            averageResponseTime: 0,
            activeInstances: 0,
            lastHealthCheck: null
        };
        this.initializeMonitoring();
    }

    async initializeMonitoring() {
        if (cluster.isPrimary) {
            this.#startMetricsCollection();
            this.#startHealthChecks();
            this.#initializeAlertSystem();
        }

        process.on('uncaughtException', this.#handleUncaughtException.bind(this));
        process.on('unhandledRejection', this.#handleUnhandledRejection.bind(this));
    }
    
    // Private method for starting health checks
    #startHealthChecks() {
        setInterval(async () => {
            try {
                const healthStatus = await this.#checkHealth();
                this.metrics.lastHealthCheck = healthStatus;
            } catch (error) {
                await this.#triggerAlert('HEALTH_CHECK_FAILED', { error: error.message });
            }
        }, this.metricsInterval);
    }

    // Private method for initializing alert system
    #initializeAlertSystem() {
        // Set up alert handlers
        this.on('alert', this.#handleAlert.bind(this));
    }

    // Private method for handling alerts
    async #handleAlert(alert) {
        console.error('Alert triggered:', alert);
        // Implement your alert handling logic here
    }

    // Private method for handling uncaught exceptions
    async #handleUncaughtException(error) {
        await this.#triggerAlert('UNCAUGHT_EXCEPTION', {
            error: error.message,
            stack: error.stack,
            systemState: await this.#captureSystemState()
        });
    }

    // Private method for handling unhandled rejections
    async #handleUnhandledRejection(error) {
        await this.#triggerAlert('UNHANDLED_REJECTION', {
            error: error.message,
            stack: error.stack,
            systemState: await this.#captureSystemState()
        });
    }

    // Private method for health checks
    async #checkHealth() {
        const health = {
            timestamp: new Date().toISOString(),
            status: 'healthy',
            metrics: this.metrics,
            system: await this.#captureSystemState()
        };

        try {
            await this.validateResourceAvailability();
        } catch (error) {
            health.status = 'degraded';
            health.error = error.message;
        }

        return health;
    }

    async recordActivationAttempt(params) {
        const startTime = Date.now();
        try {
            await this.validateActivation(params);
            this.metrics.totalActivations++;
            
            const responseTime = Date.now() - startTime;
            this.updateResponseTimeMetrics(responseTime);
            
            await this.logActivationSuccess(params, responseTime);
            
            return true;
        } catch (error) {
            this.metrics.failedActivations++;
            await this.handleActivationFailure(error, params);
            throw error;
        }
    }

    async validateActivation(params) {
        const validationStart = Date.now();
        
        // Comprehensive validation checks
        await Promise.all([
            activationSecurity.validateActivationRequest(params),
            this.validateResourceAvailability(),
            this.validateLicensing(params),
            this.validateCompliance(params)
        ]);

        const validationTime = Date.now() - validationStart;
        if (validationTime > this.alertThresholds.responseTime) {
            await this.triggerAlert('SLOW_VALIDATION', {
                validationTime,
                params
            });
        }
    }

    async validateResourceAvailability() {
        const systemInfo = {
            loadAvg: os.loadavg(),
            freeMemory: os.freemem(),
            cpuUsage: process.cpuUsage(),
            diskSpace: await this.checkDiskSpace()
        };

        // Check system resources
        if (systemInfo.loadAvg[0] > 0.8 || 
            systemInfo.freeMemory < 500 * 1024 * 1024) { // 500MB
            throw new Error('Insufficient system resources');
        }

        return true;
    }

    async validateLicensing(params) {
        // Implementation depends on licensing system
        return true;
    }

    async validateCompliance(params) {
        // Implement compliance checks based on region and requirements
        return true;
    }

    // Private method for checking thresholds
    #checkThresholds(metrics) {
        const cpuThreshold = 85; // 85% CPU usage
        const memoryThreshold = 90; // 90% memory usage
        
        if (metrics.systemMetrics.cpu.user > cpuThreshold || 
            metrics.systemMetrics.cpu.system > cpuThreshold) {
            this.#triggerAlert('HIGH_CPU_USAGE', metrics.systemMetrics);
        }
        
        const usedMemory = metrics.systemMetrics.memory.heapUsed / metrics.systemMetrics.memory.heapTotal * 100;
        if (usedMemory > memoryThreshold) {
            this.#triggerAlert('HIGH_MEMORY_USAGE', metrics.systemMetrics);
        }
    }

    async handleActivationFailure(error, params) {
        const alert = {
            timestamp: new Date().toISOString(),
            error: error.message,
            params: this.#sanitizeParams(params),
            systemState: await this.#captureSystemState()
        };

        await this.logActivationFailure(alert);
        
        if (this.#shouldTriggerAlert()) {
            await this.#triggerAlert('ACTIVATION_FAILURE', alert);
        }
    }

    // Private method for collecting metrics
    #startMetricsCollection() {
        setInterval(async () => {
            const metrics = await this.#collectMetrics();
            await this.#storeMetrics(metrics);
            this.#checkThresholds(metrics);
        }, this.metricsInterval);
    }

    // Private method for collecting metrics data
    async #collectMetrics() {
        return {
            ...this.metrics,
            timestamp: new Date().toISOString(),
            systemMetrics: {
                memory: process.memoryUsage(),
                cpu: process.cpuUsage(),
                uptime: process.uptime()
            }
        };
    }

    // Private method for storing metrics
    async #storeMetrics(metrics) {
        const metricsDir = path.join(process.env.SUNNY_METRICS_DIR || os.homedir(), '.sunny', 'metrics');
        await fs.promises.mkdir(metricsDir, { recursive: true, mode: 0o700 });
        
        const metricsFile = path.join(metricsDir, 
            `activation-metrics-${new Date().toISOString().split('T')[0]}.json`
        );

        await fs.promises.appendFile(
            metricsFile,
            JSON.stringify(metrics) + '\n',
            { mode: 0o600 }
        );
    }

    // Private method for checking alert conditions
    #shouldTriggerAlert() {
        const errorRate = this.metrics.failedActivations / this.metrics.totalActivations;
        return errorRate > this.alertThresholds.errorRate;
    }

    // Private method for triggering alerts
    async #triggerAlert(type, data) {
        this.emit('alert', { type, data });
        // Implement alert notification system (e.g., email, Slack, PagerDuty)
    }

    // Private method for sanitizing sensitive data
    #sanitizeParams(params) {
        const sanitized = { ...params };
        delete sanitized.apiKey;
        delete sanitized.deviceId;
        return sanitized;
    }

    // Private method for capturing system state
    async #captureSystemState() {
        return {
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            time: new Date().toISOString(),
            pid: process.pid
        };
    }
}

module.exports = new ActivationMonitor();
