const os = require('os');
const SecurityLogger = require('./SecurityLogger');
const { monitoring: monitoringConfig } = require('../config/security');

class SecurityHealthCheck {
    constructor() {
        this.healthMetrics = {
            lastCheck: null,
            systemHealth: {},
            securityHealth: {},
            resourceUtilization: {},
            activeThreats: []
        };

        this.startMonitoring();
    }

    startMonitoring() {
        if (!monitoringConfig.enabled) return;

        setInterval(() => this.checkSystemHealth(), 60000);
        setInterval(() => this.checkSecurityHealth(), 300000);
        setInterval(() => this.checkResourceUtilization(), 30000);
    }

    async checkSystemHealth() {
        try {
            const metrics = {
                timestamp: new Date().toISOString(),
                uptime: os.uptime(),
                loadAverage: os.loadavg(),
                memory: {
                    total: os.totalmem(),
                    free: os.freemem(),
                    used: os.totalmem() - os.freemem()
                },
                cpu: os.cpus().map(cpu => ({
                    model: cpu.model,
                    speed: cpu.speed,
                    times: cpu.times
                }))
            };

            this.healthMetrics.systemHealth = metrics;
            this.healthMetrics.lastCheck = new Date().toISOString();

            await SecurityLogger.logPerformance(metrics);

            // Check thresholds
            this._checkResourceThresholds(metrics);
        } catch (error) {
            await SecurityLogger.logError({
                component: 'SecurityHealthCheck',
                method: 'checkSystemHealth',
                error
            });
        }
    }

    async checkSecurityHealth() {
        try {
            const metrics = {
                timestamp: new Date().toISOString(),
                securityServices: await this._checkSecurityServices(),
                certificateHealth: await this._checkCertificates(),
                keyRotationStatus: await this._checkKeyRotation(),
                activeThreats: await this._getActiveThreats()
            };

            this.healthMetrics.securityHealth = metrics;
            await SecurityLogger.logPerformance(metrics);

            // Update active threats
            this.healthMetrics.activeThreats = metrics.activeThreats;
        } catch (error) {
            await SecurityLogger.logError({
                component: 'SecurityHealthCheck',
                method: 'checkSecurityHealth',
                error
            });
        }
    }

    async checkResourceUtilization() {
        try {
            const metrics = {
                timestamp: new Date().toISOString(),
                cpu: this._getCPUUsage(),
                memory: this._getMemoryUsage(),
                network: await this._getNetworkUsage(),
                disk: await this._getDiskUsage()
            };

            this.healthMetrics.resourceUtilization = metrics;
            await SecurityLogger.logPerformance(metrics);

            // Check against thresholds
            this._checkResourceThresholds(metrics);
        } catch (error) {
            await SecurityLogger.logError({
                component: 'SecurityHealthCheck',
                method: 'checkResourceUtilization',
                error
            });
        }
    }

    _checkResourceThresholds(metrics) {
        const { resourceMonitoring } = monitoringConfig;

        if (!resourceMonitoring.enabled) return;

        // CPU Check
        if (metrics.cpu && metrics.cpu.usage > resourceMonitoring.cpuThreshold) {
            this._raiseResourceAlert('CPU', metrics.cpu.usage, resourceMonitoring.cpuThreshold);
        }

        // Memory Check
        if (metrics.memory) {
            const memoryUsagePercent = (metrics.memory.used / metrics.memory.total) * 100;
            if (memoryUsagePercent > resourceMonitoring.memoryThreshold) {
                this._raiseResourceAlert('Memory', memoryUsagePercent, resourceMonitoring.memoryThreshold);
            }
        }

        // Additional checks for disk and network can be added here
    }

    async _raiseResourceAlert(resource, current, threshold) {
        const alert = {
            type: 'resource_threshold',
            severity: 'high',
            resource,
            current,
            threshold,
            timestamp: new Date().toISOString()
        };

        await SecurityLogger.logAlert(alert);
    }

    // Helper methods for security checks
    async _checkSecurityServices() {
        // Implementation for checking security services status
        return {
            firewall: 'active',
            ids: 'active',
            encryption: 'active'
        };
    }

    async _checkCertificates() {
        // Implementation for checking certificate expiration
        return {
            status: 'valid',
            expiringCerts: []
        };
    }

    async _checkKeyRotation() {
        // Implementation for checking key rotation status
        return {
            lastRotation: new Date().toISOString(),
            nextScheduled: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
    }

    async _getActiveThreats() {
        // Implementation for getting active security threats
        return [];
    }

    // Resource usage helper methods
    _getCPUUsage() {
        const cpus = os.cpus();
        const usage = cpus.reduce((acc, cpu) => {
            const total = Object.values(cpu.times).reduce((a, b) => a + b);
            const idle = cpu.times.idle;
            return acc + ((total - idle) / total);
        }, 0) / cpus.length;

        return {
            usage: usage * 100,
            cores: cpus.length
        };
    }

    _getMemoryUsage() {
        const total = os.totalmem();
        const free = os.freemem();
        const used = total - free;

        return {
            total,
            free,
            used,
            usagePercent: (used / total) * 100
        };
    }

    async _getNetworkUsage() {
        // Implementation for getting network usage metrics
        return {
            bytesIn: 0,
            bytesOut: 0,
            connections: 0
        };
    }

    async _getDiskUsage() {
        // Implementation for getting disk usage metrics
        return {
            total: 0,
            used: 0,
            free: 0
        };
    }

    getHealthStatus() {
        return {
            timestamp: new Date().toISOString(),
            status: this._calculateOverallStatus(),
            metrics: this.healthMetrics
        };
    }

    _calculateOverallStatus() {
        // Implementation for calculating overall system health status
        return 'healthy';
    }
}

module.exports = new SecurityHealthCheck();
