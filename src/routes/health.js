/**
 * Health Check and Monitoring Routes
 * Essential for production deployment and monitoring
 */

const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const router = express.Router();

// Basic health check
router.get('/health', async (req, res) => {
  try {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0'
    };
    
    res.status(200).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Detailed system status
router.get('/status', async (req, res) => {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {}
  };

  try {
    // Check database connection
    if (mongoose.connection.readyState === 1) {
      status.services.database = {
        status: 'connected',
        host: process.env.DB_HOST,
        name: process.env.DB_NAME
      };
    } else {
      status.services.database = {
        status: 'disconnected',
        error: 'Database connection not established'
      };
      status.status = 'degraded';
    }

    // Check Redis connection (if configured)
    if (process.env.REDIS_URL) {
      try {
        const redisClient = redis.createClient({ url: process.env.REDIS_URL });
        await redisClient.ping();
        status.services.redis = { status: 'connected' };
        await redisClient.quit();
      } catch (redisError) {
        status.services.redis = {
          status: 'disconnected',
          error: redisError.message
        };
        status.status = 'degraded';
      }
    }

    // Check external services
    status.services.stripe = {
      configured: !!process.env.STRIPE_SECRET_KEY,
      environment: process.env.STRIPE_SECRET_KEY ? 
        (process.env.STRIPE_SECRET_KEY.startsWith('sk_live_') ? 'production' : 'test') : 'not-configured'
    };

    status.services.paypal = {
      configured: !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)
    };

    res.status(status.status === 'ok' ? 200 : 503).json(status);
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Status check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Readiness probe (for Kubernetes)
router.get('/ready', async (req, res) => {
  try {
    // Check if all critical services are ready
    const ready = {
      database: mongoose.connection.readyState === 1,
      environment: !!process.env.ENCRYPTION_KEY,
      security: !!process.env.JWT_SECRET
    };

    const isReady = Object.values(ready).every(Boolean);
    
    res.status(isReady ? 200 : 503).json({
      ready: isReady,
      checks: ready,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      ready: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Liveness probe (for Kubernetes)
router.get('/live', (req, res) => {
  res.status(200).json({
    alive: true,
    timestamp: new Date().toISOString(),
    pid: process.pid,
    uptime: process.uptime()
  });
});

// System metrics
router.get('/metrics', (req, res) => {
  const metrics = {
    timestamp: new Date().toISOString(),
    process: {
      pid: process.pid,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    }
  };

  res.status(200).json(metrics);
});

module.exports = router;

