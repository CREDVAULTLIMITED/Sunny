import { redis } from '../config/redis';
import { logger } from './loggingService';
import { infrastructureConfig } from '../config/infrastructure';
import { fraudDetectionService } from '../security/enhancedFraudDetection';
import { encryptionService } from '../security/encryption';
import { securityHealthCheck } from './SecurityHealthCheck';
import mongoose from 'mongoose';

class HealthCheckService {
  async performHealthCheck() {
    try {
      const checks = await Promise.all([
        this.checkDatabase(),
        this.checkRedis(),
        this.checkPaymentProcessors(),
        this.checkSecurity(),
        this.checkInfrastructure(),
        this.checkPerformanceMetrics()
      ]);

      const status = checks.every(check => check.status === 'healthy') ? 'healthy' : 'degraded';

      const healthStatus = {
        status,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version,
        environment: process.env.NODE_ENV,
        uptime: process.uptime(),
        checks: checks.reduce((acc, check) => ({ ...acc, [check.name]: check }), {})
      };

      // Cache health status
      await redis.setex('health:status', 60, JSON.stringify(healthStatus));

      // Log if system is not healthy
      if (status !== 'healthy') {
        logger.warn('System health check returned degraded status', {
          healthStatus,
          timestamp: new Date().toISOString()
        });
      }

      return healthStatus;
    } catch (error) {
      logger.error('Health check failed', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async checkDatabase() {
    try {
      const startTime = Date.now();
      await mongoose.connection.db.admin().ping();
      const responseTime = Date.now() - startTime;

      const status = {
        name: 'database',
        status: 'healthy',
        responseTime,
        details: {
          connection: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
          host: mongoose.connection.host,
          version: await mongoose.connection.db.admin().serverInfo()
        }
      };

      if (responseTime > 1000) {
        status.status = 'degraded';
        status.warning = 'High database latency detected';
      }

      return status;
    } catch (error) {
      return {
        name: 'database',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkRedis() {
    try {
      const startTime = Date.now();
      const testKey = `health:test:${Date.now()}`;
      await redis.set(testKey, 'test');
      await redis.get(testKey);
      await redis.del(testKey);
      const responseTime = Date.now() - startTime;

      const status = {
        name: 'redis',
        status: 'healthy',
        responseTime,
        details: {
          connected: redis.status === 'ready',
          usedMemory: await redis.info('memory')
        }
      };

      if (responseTime > 100) {
        status.status = 'degraded';
        status.warning = 'High Redis latency detected';
      }

      return status;
    } catch (error) {
      return {
        name: 'redis',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkPaymentProcessors() {
    try {
      const processors = ['stripe', 'paypal', 'mpesa', 'crypto'];
      const results = await Promise.all(
        processors.map(async (processor) => {
          try {
            const status = await this.checkProcessor(processor);
            return { [processor]: status };
          } catch (error) {
            return {
              [processor]: {
                status: 'unhealthy',
                error: error.message
              }
            };
          }
        })
      );

      const allHealthy = results.every(result => 
        Object.values(result)[0].status === 'healthy'
      );

      return {
        name: 'payment_processors',
        status: allHealthy ? 'healthy' : 'degraded',
        details: Object.assign({}, ...results)
      };
    } catch (error) {
      return {
        name: 'payment_processors',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkProcessor(processor) {
    // Implement specific checks for each payment processor
    // This is a placeholder for actual implementation
    return {
      status: 'healthy',
      lastTransaction: new Date().toISOString()
    };
  }

  async checkSecurity() {
    try {
      const securityStatus = await securityHealthCheck.performHealthCheck();
      const fraudDetectionStatus = await fraudDetectionService.checkStatus();
      const encryptionStatus = await encryptionService.validateKeys();

      const allHealthy = [
        securityStatus.status === 'healthy',
        fraudDetectionStatus.status === 'healthy',
        encryptionStatus.status === 'healthy'
      ].every(Boolean);

      return {
        name: 'security',
        status: allHealthy ? 'healthy' : 'degraded',
        details: {
          security: securityStatus,
          fraudDetection: fraudDetectionStatus,
          encryption: encryptionStatus
        }
      };
    } catch (error) {
      return {
        name: 'security',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkInfrastructure() {
    try {
      const config = infrastructureConfig;
      const loadBalancerHealth = await this.checkLoadBalancer();
      const autoScalingHealth = await this.checkAutoScaling();
      const networkHealth = await this.checkNetwork();

      const allHealthy = [
        loadBalancerHealth.status === 'healthy',
        autoScalingHealth.status === 'healthy',
        networkHealth.status === 'healthy'
      ].every(Boolean);

      return {
        name: 'infrastructure',
        status: allHealthy ? 'healthy' : 'degraded',
        details: {
          loadBalancer: loadBalancerHealth,
          autoScaling: autoScalingHealth,
          network: networkHealth
        }
      };
    } catch (error) {
      return {
        name: 'infrastructure',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkPerformanceMetrics() {
    try {
      const metrics = {
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        requests: await this.getRequestMetrics(),
        latency: await this.getLatencyMetrics()
      };

      const status = this.evaluateMetrics(metrics);

      return {
        name: 'performance',
        status: status.healthy ? 'healthy' : 'degraded',
        metrics,
        warnings: status.warnings
      };
    } catch (error) {
      return {
        name: 'performance',
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkLoadBalancer() {
    // Implement load balancer health check
    return { status: 'healthy' };
  }

  async checkAutoScaling() {
    // Implement auto scaling health check
    return { status: 'healthy' };
  }

  async checkNetwork() {
    // Implement network health check
    return { status: 'healthy' };
  }

  async getRequestMetrics() {
    // Implement request metrics collection
    return {};
  }

  async getLatencyMetrics() {
    // Implement latency metrics collection
    return {};
  }

  evaluateMetrics(metrics) {
    const warnings = [];
    let healthy = true;

    // Memory usage check
    const memoryUsagePercent = (metrics.memory.heapUsed / metrics.memory.heapTotal) * 100;
    if (memoryUsagePercent > 85) {
      warnings.push('High memory usage detected');
      healthy = false;
    }

    // Add more metric evaluations as needed

    return { healthy, warnings };
  }
}

export const healthCheckService = new HealthCheckService();