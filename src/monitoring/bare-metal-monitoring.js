// Bare Metal Monitoring Configuration
// This module configures monitoring for physical hardware deployment

const os = require('os');
const path = require('path');
const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;

// Custom metrics for bare metal monitoring
const hsm_health = new prometheus.Gauge({
    name: 'hsm_health_status',
    help: 'Health status of physical HSM devices',
    labelNames: ['hsm_id', 'vendor']
});

const power_supply_status = new prometheus.Gauge({
    name: 'power_supply_status',
    help: 'Status of power supply units',
    labelNames: ['psu_id']
});

const temperature = new prometheus.Gauge({
    name: 'server_temperature_celsius',
    help: 'Server temperature in Celsius',
    labelNames: ['sensor_id', 'location']
});

const raid_status = new prometheus.Gauge({
    name: 'raid_array_status',
    help: 'Status of RAID arrays',
    labelNames: ['array_id', 'type']
});

const network_throughput = new prometheus.Gauge({
    name: 'network_interface_throughput_bytes',
    help: 'Network interface throughput in bytes/sec',
    labelNames: ['interface', 'direction']
});

// Security monitoring metrics
const security_alerts = new prometheus.Counter({
    name: 'security_alerts_total',
    help: 'Total number of security alerts',
    labelNames: ['severity', 'type']
});

const audit_events = new prometheus.Counter({
    name: 'audit_events_total',
    help: 'Total number of audit events',
    labelNames: ['operation', 'status']
});

const hsm_operations = new prometheus.Counter({
    name: 'hsm_operations_total',
    help: 'Total number of HSM operations',
    labelNames: ['operation', 'status', 'hsm_id']
});

// Physical security monitoring
const physical_security = new prometheus.Gauge({
    name: 'physical_security_status',
    help: 'Status of physical security systems',
    labelNames: ['system', 'location']
});

const environmental_metrics = new prometheus.Gauge({
    name: 'environmental_metrics',
    help: 'Environmental metrics for the server room',
    labelNames: ['type', 'sensor_id']
});

// Start collecting default metrics
collectDefaultMetrics({
    timestamps: true,
    prefix: 'sunny_'
});

class BareMetalMonitoring {
    constructor(config) {
        this.config = config;
        this.monitoringInterval = 10000; // 10 seconds
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        // Initialize hardware monitoring
        await this.setupHardwareMonitoring();
        
        // Start monitoring loops
        this.startMonitoringLoops();
        
        this.initialized = true;
    }

    async setupHardwareMonitoring() {
        // Initialize IPMI monitoring if available
        try {
            const ipmitool = require('ipmitool');
            this.ipmi = new ipmitool();
            await this.ipmi.connect(this.config.ipmi);
        } catch (error) {
            console.warn('IPMI monitoring not available:', error.message);
        }

        // Initialize RAID monitoring
        try {
            const mdadm = require('mdadm');
            this.raid = new mdadm();
            await this.raid.initialize();
        } catch (error) {
            console.warn('RAID monitoring not available:', error.message);
        }
    }

    startMonitoringLoops() {
        // Monitor HSM health
        setInterval(async () => {
            try {
                const hsmStatus = await this.checkHsmHealth();
                Object.entries(hsmStatus).forEach(([id, status]) => {
                    hsm_health.set({ hsm_id: id, vendor: status.vendor }, status.healthy ? 1 : 0);
                });
            } catch (error) {
                console.error('HSM health check failed:', error);
            }
        }, this.monitoringInterval);

        // Monitor power supplies
        setInterval(async () => {
            try {
                if (this.ipmi) {
                    const psuStatus = await this.ipmi.getPowerSupplyStatus();
                    psuStatus.forEach(psu => {
                        power_supply_status.set({ psu_id: psu.id }, psu.healthy ? 1 : 0);
                    });
                }
            } catch (error) {
                console.error('Power supply monitoring failed:', error);
            }
        }, this.monitoringInterval);

        // Monitor temperature
        setInterval(async () => {
            try {
                if (this.ipmi) {
                    const temps = await this.ipmi.getTemperatures();
                    temps.forEach(temp => {
                        temperature.set(
                            { sensor_id: temp.sensor, location: temp.location },
                            temp.celsius
                        );
                    });
                }
            } catch (error) {
                console.error('Temperature monitoring failed:', error);
            }
        }, this.monitoringInterval);

        // Monitor RAID status
        setInterval(async () => {
            try {
                if (this.raid) {
                    const raidStatus = await this.raid.getArrayStatus();
                    raidStatus.forEach(array => {
                        raid_status.set(
                            { array_id: array.id, type: array.level },
                            array.healthy ? 1 : 0
                        );
                    });
                }
            } catch (error) {
                console.error('RAID monitoring failed:', error);
            }
        }, this.monitoringInterval);

        // Monitor network interfaces
        setInterval(() => {
            try {
                const interfaces = os.networkInterfaces();
                Object.entries(interfaces).forEach(([name, data]) => {
                    const stats = this.getInterfaceStats(name);
                    if (stats) {
                        network_throughput.set(
                            { interface: name, direction: 'rx' },
                            stats.rxBytes
                        );
                        network_throughput.set(
                            { interface: name, direction: 'tx' },
                            stats.txBytes
                        );
                    }
                });
            } catch (error) {
                console.error('Network monitoring failed:', error);
            }
        }, this.monitoringInterval);

        // Monitor access control and environmental conditions
        setInterval(async () => {
            try {
                if (this.config.accessControl?.enabled) {
                    const accessStatus = await this.checkAccessControlStatus();
                    physical_security.set(
                        { system: 'access_control', location: 'data_center' },
                        accessStatus.operational ? 1 : 0
                    );

                    // Check for unauthorized access attempts
                    const accessEvents = await this.getRecentAccessEvents();
                    accessEvents.forEach(event => {
                        if (event.type === 'unauthorized_attempt') {
                            security_alerts.inc({ 
                                severity: 'critical',
                                type: 'physical_security'
                            });
                            this.triggerSecurityAlert(
                                `Unauthorized access attempt at ${event.location}`
                            );
                        }
                    });
                }

                if (this.config.environmental?.enabled) {
                    const metrics = await this.getEnvironmentalMetrics();
                    
                    // Temperature monitoring
                    environmental_metrics.set(
                        { type: 'temperature', sensor_id: 'main' },
                        metrics.temperature
                    );

                    // Humidity monitoring
                    environmental_metrics.set(
                        { type: 'humidity', sensor_id: 'main' },
                        metrics.humidity
                    );

                    // Check for environmental alerts
                    if (metrics.temperature > this.config.environmental.maxTemp ||
                        metrics.humidity > this.config.environmental.maxHumidity) {
                        security_alerts.inc({
                            severity: 'high',
                            type: 'environmental'
                        });
                        this.triggerSecurityAlert(
                            `Environmental conditions outside acceptable range`
                        );
                    }
                }
            } catch (error) {
                console.error('Physical security monitoring failed:', error);
            }
        }, this.monitoringInterval);
    }

    async checkHsmHealth() {
        // Implement HSM health check based on vendor
        const results = {};
        try {
            const hsms = this.config.hsm.devices || [];
            for (const hsm of hsms) {
                const health = await this.checkSingleHsm(hsm);
                results[hsm.id] = {
                    vendor: hsm.vendor,
                    healthy: health
                };
            }
        } catch (error) {
            console.error('HSM health check failed:', error);
        }
        return results;
    }

    async checkSingleHsm(hsm) {
        // Implement vendor-specific health check
        switch (hsm.vendor.toLowerCase()) {
            case 'thales':
                return await this.checkThalesHsm(hsm);
            case 'utimaco':
                return await this.checkUtimacoHsm(hsm);
            case 'safenet':
                return await this.checkSafenetHsm(hsm);
            default:
                throw new Error(`Unsupported HSM vendor: ${hsm.vendor}`);
        }
    }

    getInterfaceStats(interfaceName) {
        try {
            const stats = fs.readFileSync(`/sys/class/net/${interfaceName}/statistics/rx_bytes`);
            const txStats = fs.readFileSync(`/sys/class/net/${interfaceName}/statistics/tx_bytes`);
            return {
                rxBytes: parseInt(stats.toString()),
                txBytes: parseInt(txStats.toString())
            };
        } catch (error) {
            return null;
        }
    }

    async checkAccessControlStatus() {
        // Placeholder for access control status check
        return { operational: true };
    }

    async getRecentAccessEvents() {
        // Placeholder for fetching recent access control events
        return [];
    }

    async getEnvironmentalMetrics() {
        // Placeholder for fetching environmental metrics
        return {
            temperature: 22.5,
            humidity: 45
        };
    }
}

class SecurityMonitor {
    constructor() {
        this.alertThresholds = {
            failed_auth: 5,
            hsm_errors: 3,
            network_anomalies: 10
        };
    }

    async monitorSecurityEvents() {
        // Monitor authentication attempts
        const authLogs = await this.tailSecureLog('/var/log/auth.log');
        authLogs.on('line', (line) => {
            if (line.includes('authentication failure')) {
                security_alerts.inc({ severity: 'high', type: 'auth_failure' });
                this.checkFailedAuthThreshold();
            }
        });

        // Monitor HSM audit logs
        const hsmLogs = await this.tailSecureLog('/var/log/sunny/hsm/audit.log');
        hsmLogs.on('line', (line) => {
            const event = this.parseHsmAuditLog(line);
            if (event) {
                hsm_operations.inc({
                    operation: event.operation,
                    status: event.status,
                    hsm_id: event.hsm_id
                });
                
                if (event.status === 'error') {
                    security_alerts.inc({ severity: 'critical', type: 'hsm_error' });
                }
            }
        });
    }

    async monitorAuditEvents() {
        const auditLog = await this.tailSecureLog('/var/log/sunny/audit/audit.log');
        auditLog.on('line', (line) => {
            const event = this.parseAuditLog(line);
            if (event) {
                audit_events.inc({
                    operation: event.operation,
                    status: event.status
                });
            }
        });
    }

    parseHsmAuditLog(line) {
        try {
            const event = JSON.parse(line);
            return {
                operation: event.operation,
                status: event.status,
                hsm_id: event.hsm_id,
                timestamp: event.timestamp
            };
        } catch (error) {
            console.error('Failed to parse HSM audit log:', error);
            return null;
        }
    }

    async checkFailedAuthThreshold() {
        const failedCount = await security_alerts.get({
            severity: 'high',
            type: 'auth_failure'
        });
        
        if (failedCount > this.alertThresholds.failed_auth) {
            this.triggerSecurityAlert('Excessive authentication failures detected');
        }
    }

    async triggerSecurityAlert(message) {
        // Log alert
        console.error(`SECURITY ALERT: ${message}`);
        
        // Send alert via configured channels (e.g., email, SMS)
        await this.notifySecurityTeam(message);
        
        // Record alert in secure audit log
        await fs.appendFile('/var/log/sunny/audit/security-alerts.log',
            JSON.stringify({
                timestamp: new Date().toISOString(),
                message,
                severity: 'high'
            }) + '\n'
        );
    }
}

module.exports = BareMetalMonitoring;
