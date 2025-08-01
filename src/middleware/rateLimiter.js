/**
 * Rate Limiting Middleware
 * Implements rate limiting using Redis for distributed environments
 */

import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

class RateLimiter {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
    
    // Create general API rate limiter
    this.apiLimiter = new RateLimiterRedis({
      storeClient: this.redis,
      keyPrefix: 'rate_limit_api',
      points: process.env.API_RATE_LIMIT || 100, // Number of requests
      duration: process.env.API_RATE_WINDOW_MS || 900, // Per 15 minutes
    });

    // Stricter rate limiter for sensitive endpoints
    this.sensitiveEndpointLimiter = new RateLimiterRedis({
      storeClient: this.redis,
      keyPrefix: 'rate_limit_sensitive',
      points: 20, // 20 requests
      duration: 900, // Per 15 minutes
    });

    // Payment endpoint specific limiter
    this.paymentEndpointLimiter = new RateLimiterRedis({
      storeClient: this.redis,
      keyPrefix: 'rate_limit_payment',
      points: 30, // 30 payment requests
      duration: 900, // Per 15 minutes
    });
  }

  // Middleware for general API endpoints
  apiLimiterMiddleware = async (req, res, next) => {
    try {
      const key = this.generateRateLimitKey(req);
      await this.apiLimiter.consume(key);
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        res.status(429).json({
          success: false,
          error: 'TOO_MANY_REQUESTS',
          message: 'Too many requests, please try again later',
          retryAfter: error.msBeforeNext / 1000
        });
      }
    }
  };

  // Middleware for sensitive endpoints (auth, user data, etc)
  sensitiveEndpointLimiterMiddleware = async (req, res, next) => {
    try {
      const key = this.generateRateLimitKey(req);
      await this.sensitiveEndpointLimiter.consume(key);
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        res.status(429).json({
          success: false,
          error: 'TOO_MANY_REQUESTS',
          message: 'Too many sensitive operations, please try again later',
          retryAfter: error.msBeforeNext / 1000
        });
      }
    }
  };

  // Middleware specifically for payment endpoints
  paymentEndpointLimiterMiddleware = async (req, res, next) => {
    try {
      const key = this.generateRateLimitKey(req);
      await this.paymentEndpointLimiter.consume(key);
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        res.status(429).json({
          success: false,
          error: 'TOO_MANY_PAYMENT_REQUESTS',
          message: 'Too many payment requests, please try again later',
          retryAfter: error.msBeforeNext / 1000
        });
      }
    }
  };

  // Generate rate limit key based on user ID or IP
  generateRateLimitKey(req) {
    // Prefer user ID if authenticated
    if (req.user && req.user.id) {
      return `${req.user.id}`;
    }
    
    // Fallback to IP address
    return req.ip || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           'unknown';
  }

  // Method to get remaining points
  async getRemainingPoints(key) {
    try {
      const res = await this.apiLimiter.get(key);
      return res ? res.remainingPoints : null;
    } catch (error) {
      console.error('Error getting remaining points:', error);
      return null;
    }
  }
}

const rateLimiter = new RateLimiter();
export default rateLimiter;
