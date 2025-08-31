import { logger } from './loggingService';
import { redis } from '../config/redis';
import { infrastructureConfig } from '../config/infrastructure';
import { healthCheckService } from './HealthCheckService';

class MonitoringService {
  constructor() {
    this.metricsInterval = null;
    this.alertThresholds = infrastructureConfig.monitoring.alerting.thresholds;
    this.metricKeys = {
      transactions: 'metrics:transactions',
      errors: 'metrics:errors',
      latency: 'metrics:latency',
      cpu: 'metrics:cpu',
      memory: 'metrics:memory'
    };

    // Initialize counters
    this.transactionCount = 0;
    this.failedTransactions = 0;
    this.responseTimes = [];
    this.activeUserSessions = new Set();
    this.failedLogins = 0;
    this.suspiciousActivities = [];
    this.fraudAttempts = 0;
  }

  async startMonitoring() {
    try {
      // Clear existing monitoring
      if (this.metricsInterval) {
        clearInterval(this.metricsInterval);
      }

      // Start metrics collection
      this.metricsInterval = setInterval(
        () => this.collectMetrics(),
        infrastructureConfig.monitoring.metrics.resolution * 1000
      );

      logger.info('Production monitoring started', {
        resolution: infrastructureConfig.monitoring.metrics.resolution,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Failed to start monitoring', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async stopMonitoring() {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }
    logger.info('Production monitoring stopped');
  }

  async collectMetrics() {
    try {
      const timestamp = Date.now();
      const metrics = {
        system: await this.collectSystemMetrics(),
        application: await this.collectApplicationMetrics(),
        business: await this.collectBusinessMetrics(),
        security: await this.collectSecurityMetrics()
      };

      // Store metrics in Redis with TTL
      const retention = infrastructureConfig.monitoring.metrics.retention * 24 * 60 * 60; // Convert days to seconds
      await this.storeMetrics(metrics, timestamp, retention);

      // Check for anomalies and alert if necessary
      await this.checkAnomalies(metrics);

      return metrics;
    } catch (error) {
      logger.error('Failed to collect metrics', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async collectSystemMetrics() {
    const metrics = {
      timestamp: Date.now(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      uptime: process.uptime()
    };

    // Add load average if available
    try {
      metrics.loadAverage = process.loadavg();
    } catch (error) {
      logger.warn('Could not collect load average metrics');
    }

    return metrics;
  }

  async collectApplicationMetrics() {
    try {
      const healthStatus = await healthCheckService.performHealthCheck();
      
      return {
        timestamp: Date.now(),
        status: healthStatus.status,
        responseTime: await this.getAverageResponseTime(),
        errorRate: await this.getErrorRate(),
        activeConnections: await this.getActiveConnections(),
        queueSize: await this.getQueueSize(),
        processId: process.pid,
        nodeVersion: process.version,
        platform: process.platform
      };
    } catch (error) {
      logger.error('Failed to collect application metrics', {
        error: error.message,
        stack: error.stack
      });
      return null;
    }
  }

  async collectBusinessMetrics() {
    try {
      const [volume, successRate] = await Promise.all([
        this.getTransactionVolume(),
        this.getTransactionSuccessRate()
      ]);

      return {
        timestamp: Date.now(),
        transactions: {
          count: this.transactionCount,
          volume,
          successRate
        },
        activeUsers: await this.getActiveUsers(),
        conversionRate: await this.getConversionRate()
      };
    } catch (error) {
      logger.error('Failed to collect business metrics', {
        error: error.message,
        stack: error.stack
      });
      return null;
    }
  }

  async collectSecurityMetrics() {
    try {
      const [failedLogins, suspiciousActivities, fraudAttempts] = await Promise.all([
        this.getFailedLoginAttempts(),
        this.getSuspiciousActivities(),
        this.getFraudAttempts()
      ]);

      // Get rate limits from Redis
      const rateLimits = await Promise.all([
        redis.get('rate_limit:api'),
        redis.get('rate_limit:auth')
      ]);

      return {
        timestamp: Date.now(),
        failedLogins,
        suspiciousActivities,
        fraudAttempts,
        rateLimiting: {
          api: parseInt(rateLimits[0] || 0),
          auth: parseInt(rateLimits[1] || 0)
        }
      };
    } catch (error) {
      logger.error('Failed to collect security metrics', {
        error: error.message,
        stack: error.stack
      });
      return null;
    }
  }

  async storeMetrics(metrics, timestamp, retention) {
    const multi = redis.multi();

    // Store detailed metrics with timestamp
    multi.hset(
      `metrics:${timestamp}`,
      'data',
      JSON.stringify(metrics)
    );
    multi.expire(`metrics:${timestamp}`, retention);

    // Update current metrics
    multi.set('metrics:current', JSON.stringify({
      timestamp,
      metrics
    }));

    // Store aggregated metrics for trending
    Object.entries(metrics).forEach(([category, data]) => {
      const key = `metrics:trend:${category}`;
      multi.lpush(key, JSON.stringify({ timestamp, data }));
      multi.ltrim(key, 0, 999); // Keep last 1000 entries
    });

    await multi.exec();
  }

  async checkAnomalies(metrics) {
    try {
      const anomalies = [];

      // Check system metrics
      if (metrics.system) {
        const { memory, cpu, loadAverage } = metrics.system;
        
        // Memory check
        const memoryUsage = (memory.heapUsed / memory.heapTotal) * 100;
        if (memoryUsage > this.alertThresholds.memoryUtilization) {
          anomalies.push({
            type: 'memory',
            level: 'warning',
            message: `High memory usage: ${memoryUsage.toFixed(2)}%`
          });
        }

        // CPU check
        if (loadAverage && loadAverage[0] > this.alertThresholds.cpuLoad) {
          anomalies.push({
            type: 'cpu',
            level: 'warning',
            message: `High CPU load: ${loadAverage[0].toFixed(2)}`
          });
        }
      }

      // Check application metrics
      if (metrics.application) {
        if (metrics.application.errorRate > this.alertThresholds.errorRate) {
          anomalies.push({
            type: 'error_rate',
            level: 'critical',
            message: `High error rate: ${metrics.application.errorRate.toFixed(2)}%`
          });
        }

        if (metrics.application.responseTime > this.alertThresholds.responseTime) {
          anomalies.push({
            type: 'latency',
            level: 'warning',
            message: `High response time: ${metrics.application.responseTime}ms`
          });
        }

        if (metrics.application.queueSize > this.alertThresholds.queueSize) {
          anomalies.push({
            type: 'queue',
            level: 'warning',
            message: `Large queue size: ${metrics.application.queueSize} items`
          });
        }
      }

      // Check business metrics
      if (metrics.business) {
        const { transactions } = metrics.business;
        
        if (transactions.successRate < this.alertThresholds.transactionSuccess) {
          anomalies.push({
            type: 'transaction_success',
            level: 'critical',
            message: `Low transaction success rate: ${transactions.successRate.toFixed(2)}%`
          });
        }

        // Check for unusual transaction volume spikes
        const previousVolume = await redis.get(`${this.metricKeys.transactions}:previous_volume`);
        if (previousVolume) {
          const volumeChange = ((transactions.volume - parseFloat(previousVolume)) / parseFloat(previousVolume)) * 100;
          if (Math.abs(volumeChange) > this.alertThresholds.volumeChange) {
            anomalies.push({
              type: 'transaction_volume',
              level: 'warning',
              message: `Unusual transaction volume change: ${volumeChange.toFixed(2)}%`
            });
          }
        }
        await redis.set(`${this.metricKeys.transactions}:previous_volume`, transactions.volume);
      }

      // Check security metrics
      if (metrics.security) {
        if (metrics.security.fraudAttempts > this.alertThresholds.fraudAttempts) {
          anomalies.push({
            type: 'security',
            level: 'critical',
            message: `High number of fraud attempts: ${metrics.security.fraudAttempts}`
          });
        }

        if (metrics.security.failedLogins > this.alertThresholds.failedLogins) {
          anomalies.push({
            type: 'security',
            level: 'warning',
            message: `High number of failed logins: ${metrics.security.failedLogins}`
          });
        }

        if (metrics.security.suspiciousActivities > this.alertThresholds.suspiciousActivities) {
          anomalies.push({
            type: 'security',
            level: 'warning',
            message: `High number of suspicious activities: ${metrics.security.suspiciousActivities}`
          });
        }
      }

      // Send alerts for anomalies
      if (anomalies.length > 0) {
        await this.sendAlerts(anomalies);
      }

      return anomalies;
    } catch (error) {
      logger.error('Failed to check anomalies', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async sendAlerts(anomalies) {
    try {
      const alerts = anomalies.map(anomaly => ({
        timestamp: new Date().toISOString(),
        ...anomaly
      }));

      // Log alerts
      logger.warn('System anomalies detected', { alerts });

      // Store alerts in Redis for tracking
      const alertKey = `alerts:${Date.now()}`;
      await redis.setex(alertKey, 86400, JSON.stringify(alerts)); // Store for 24 hours

      // Group alerts by level for different notification strategies
      const criticalAlerts = alerts.filter(a => a.level === 'critical');
      const warningAlerts = alerts.filter(a => a.level === 'warning');

      // Format alert messages
      const formatAlertMessage = (alert) => {
        return `
🚨 ${alert.level.toUpperCase()} ALERT 🚨
Type: ${alert.type}
Message: ${alert.message}
Timestamp: ${alert.timestamp}
`;
      };

      // Get alert endpoints from config
      const endpoints = infrastructureConfig.monitoring.alerting.endpoints || [];

      for (const endpointStr of endpoints) {
        try {
          const endpoint = parseAlertEndpoint(endpointStr);

          // Send critical alerts
          if (criticalAlerts.length > 0) {
            const criticalMessage = criticalAlerts.map(formatAlertMessage).join('\n');

            switch (endpoint.type) {
              case 'email':
                await sendEmailAlert(
                  endpoint.target,
                  `🚨 CRITICAL: ${criticalAlerts.length} System Alerts`,
                  criticalMessage
                );
                break;

              case 'sms':
                await sendSMSAlert(
                  endpoint.target,
                  `CRITICAL: ${criticalAlerts.length} alerts\n${criticalAlerts.map(a => a.message).join('\n')}`
                );
                break;

              case 'slack':
                await sendSlackAlert(
                  endpoint.channel,
                  criticalMessage
                );
                break;

              case 'pagerduty':
                for (const alert of criticalAlerts) {
                  await createPagerDutyIncident(
                    `CRITICAL: ${alert.type}`,
                    { message: alert.message, timestamp: alert.timestamp },
                    'critical'
                  );
                }
                break;
            }
          }

          // Send warning alerts
          if (warningAlerts.length > 0 && endpoint.type !== 'pagerduty') {
            // Don't send warnings to PagerDuty to avoid alert fatigue
            const warningMessage = warningAlerts.map(formatAlertMessage).join('\n');

            switch (endpoint.type) {
              case 'email':
                await sendEmailAlert(
                  endpoint.target,
                  `⚠️ WARNING: ${warningAlerts.length} System Alerts`,
                  warningMessage
                );
                break;

              case 'slack':
                await sendSlackAlert(
                  endpoint.channel,
                  warningMessage
                );
                break;

              // Don't send warning alerts via SMS to avoid alert fatigue
            }
          }
        } catch (endpointError) {
          logger.error('Failed to send alert to endpoint', {
            endpoint: endpointStr,
            error: endpointError.message
          });
          // Continue with other endpoints even if one fails
        }
      }

    } catch (error) {
      logger.error('Failed to send alerts', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // Helper methods for metrics collection
  async getAverageResponseTime() {
    if (this.responseTimes.length === 0) return 0;
    const sum = this.responseTimes.reduce((a, b) => a + b, 0);
    return sum / this.responseTimes.length;
  }

  async getErrorRate() {
    if (this.transactionCount === 0) return 0;
    return (this.failedTransactions / this.transactionCount) * 100;
  }

  async getActiveConnections() {
    // Get active connections from Redis
    const activeConnections = await redis.scard('active_connections');
    return activeConnections || 0;
  }

  async getQueueSize() {
    // Get queue size from Redis
    const queueSize = await redis.llen('payment_queue');
    return queueSize || 0;
  }

  async getTransactionCount() {
    return this.transactionCount;
  }

  async getTransactionVolume() {
    // Get total transaction volume from Redis
    const volume = await redis.get(`${this.metricKeys.transactions}:volume`);
    return parseFloat(volume) || 0;
  }

  async getTransactionSuccessRate() {
    if (this.transactionCount === 0) return 100;
    return ((this.transactionCount - this.failedTransactions) / this.transactionCount) * 100;
  }

  async getActiveUsers() {
    return this.activeUserSessions.size;
  }

  async getConversionRate() {
    // Get completed transactions vs initiated transactions
    const initiated = await redis.get(`${this.metricKeys.transactions}:initiated`);
    const completed = await redis.get(`${this.metricKeys.transactions}:completed`);
    if (!initiated || initiated === '0') return 0;
    return (parseInt(completed || 0) / parseInt(initiated)) * 100;
  }

  async getFailedLoginAttempts() {
    return this.failedLogins;
  }

  async getSuspiciousActivities() {
    return this.suspiciousActivities.length;
  }

  async getFraudAttempts() {
    return this.fraudAttempts;
  }

  // Methods to update metrics

  recordTransaction(amount, success = true) {
    this.transactionCount++;
    if (!success) this.failedTransactions++;
    
    // Store transaction volume
    redis.incrby(`${this.metricKeys.transactions}:volume`, amount);
  }

  recordResponseTime(duration) {
    this.responseTimes.push(duration);
    // Keep only last 1000 response times for memory efficiency
    if (this.responseTimes.length > 1000) {
      this.responseTimes.shift();
    }
  }

  recordUserSession(userId) {
    this.activeUserSessions.add(userId);
  }

  removeUserSession(userId) {
    this.activeUserSessions.delete(userId);
  }

  recordFailedLogin() {
    this.failedLogins++;
  }

  recordSuspiciousActivity(activity) {
    this.suspiciousActivities.push({
      timestamp: Date.now(),
      ...activity
    });
    // Keep only last 1000 suspicious activities
    if (this.suspiciousActivities.length > 1000) {
      this.suspiciousActivities.shift();
    }
  }

  recordFraudAttempt() {
    this.fraudAttempts++;
  }
}

export const monitoringService = new MonitoringService();