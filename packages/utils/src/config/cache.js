const Redis = require('ioredis');
const config = require('./config');

// Initialize Redis client with SSL
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  tls: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true,
    ca: process.env.REDIS_CA_CERT
  } : undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

// Cache configuration
const CACHE_CONFIG = {
  // Static content (CDN fallback)
  static: {
    ttl: 7 * 24 * 60 * 60, // 7 days
    maxSize: '1gb'
  },
  // API responses
  api: {
    ttl: 5 * 60, // 5 minutes
    maxSize: '500mb'
  },
  // Payment method configurations
  paymentConfig: {
    ttl: 60 * 60, // 1 hour
    maxSize: '100mb'
  },
  // User sessions
  session: {
    ttl: 24 * 60 * 60, // 24 hours
    maxSize: '200mb'
  },
  // Rate limiting
  rateLimit: {
    ttl: 60, // 1 minute
    maxSize: '100mb'
  }
};

// Cache middleware
const cacheMiddleware = (type) => async (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const config = CACHE_CONFIG[type];
  if (!config) {
    return next();
  }

  const key = `cache:${type}:${req.originalUrl}`;
  
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Store original send function
    const originalSend = res.send;
    
    // Override send function to cache response
    res.send = function(body) {
      redis.set(key, JSON.stringify(body), 'EX', config.ttl);
      originalSend.call(this, body);
    };

    next();
  } catch (error) {
    console.error('Cache error:', error);
    next();
  }
};

// Cache invalidation functions
const invalidateCache = async (pattern) => {
  const keys = await redis.keys(`cache:${pattern}`);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

// Memory usage monitoring
setInterval(async () => {
  const info = await redis.info('memory');
  const usedMemory = parseInt(info.match(/used_memory:(\d+)/)[1]);
  const maxMemory = parseInt(info.match(/maxmemory:(\d+)/)[1]);
  
  if (usedMemory > maxMemory * 0.8) {
    console.warn(`Redis cache memory usage high: ${Math.round(usedMemory/maxMemory*100)}%`);
  }
}, 60000);

module.exports = {
  cacheMiddleware,
  invalidateCache,
  redis
};
