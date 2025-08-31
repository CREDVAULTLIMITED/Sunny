/**
 * Rate Limiting Middleware for API Gateway
 */

import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RedisClient } from '../utils/redis';
import { config } from '../config/config';
import { logger } from '../utils/logger';

interface RateLimitRequest extends Request {
  user?: {
    id: string;
    role: string;
    merchantId?: string;
  };
  apiKey?: {
    id: string;
    merchantId: string;
    rateLimit: number;
  };
  clientId?: string;
}

class RateLimitMiddleware {
  private redis: RedisClient;
  private globalLimiter: RateLimiterRedis;
  private userLimiter: RateLimiterRedis;
  private apiKeyLimiter: RateLimiterRedis;
  private ipLimiter: RateLimiterRedis;

  constructor() {
    this.redis = new RedisClient();
    this.setupLimiters();
  }

  private setupLimiters(): void {
    const redisClient = this.redis.getClient();

    // Global rate limiter - applies to all requests
    this.globalLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'rl_global',
      points: config.rateLimit.maxRequests, // Number of requests
      duration: Math.floor(config.rateLimit.windowMs / 1000), // Per window in seconds
      blockDuration: 60, // Block for 60 seconds if limit exceeded
    });

    // User-based rate limiter - higher limits for authenticated users
    this.userLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'rl_user',
      points: 1000, // 1000 requests per window
      duration: 900, // 15 minutes
      blockDuration: 300, // Block for 5 minutes
    });

    // API Key rate limiter - configurable per API key
    this.apiKeyLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'rl_apikey',
      points: 5000, // Default 5000 requests per window
      duration: 3600, // 1 hour
      blockDuration: 3600, // Block for 1 hour
    });

    // IP-based rate limiter - prevents abuse from single IPs
    this.ipLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'rl_ip',
      points: 200, // 200 requests per window
      duration: 900, // 15 minutes
      blockDuration: 1800, // Block for 30 minutes
    });
  }

  /**
   * Main rate limiting middleware
   */
  public rateLimit = async (req: RateLimitRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientIp = this.getClientIp(req);
      const userId = req.user?.id;
      const apiKeyId = req.apiKey?.id;

      // Skip rate limiting for health checks
      if (req.path === '/v2/health' || req.path === '/health') {
        next();
        return;
      }

      // Apply different rate limits based on authentication type
      if (apiKeyId) {
        await this.applyApiKeyRateLimit(req, res, next);
      } else if (userId) {
        await this.applyUserRateLimit(req, res, next);
      } else {
        await this.applyIpRateLimit(req, res, next);
      }

      // Always apply global rate limit
      await this.applyGlobalRateLimit(req, res, next);

    } catch (error) {
      logger.error('Rate limiting error:', error);
      // Don't block requests if rate limiting fails
      next();
    }
  };

  /**
   * Apply rate limit for API keys
   */
  private async applyApiKeyRateLimit(req: RateLimitRequest, res: Response, next: NextFunction): Promise<void> {
    const apiKeyId = req.apiKey!.id;
    const customLimit = req.apiKey!.rateLimit || 5000;

    // Create custom limiter for this API key if needed
    const limiter = new RateLimiterRedis({
      storeClient: this.redis.getClient(),
      keyPrefix: `rl_apikey_${apiKeyId}`,
      points: customLimit,
      duration: 3600, // 1 hour
      blockDuration: 3600,
    });

    try {
      const result = await limiter.consume(apiKeyId);
      
      // Add rate limit headers
      res.set({
        'X-RateLimit-Limit': customLimit.toString(),
        'X-RateLimit-Remaining': result.remainingPoints.toString(),
        'X-RateLimit-Reset': new Date(Date.now() + result.msBeforeNext).toISOString(),
      });

      next();
    } catch (rateLimitResult) {
      const secs = Math.round(rateLimitResult.msBeforeNext / 1000) || 1;
      
      res.set({
        'X-RateLimit-Limit': customLimit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + rateLimitResult.msBeforeNext).toISOString(),
        'Retry-After': secs.toString(),
      });

      logger.warn(`API key rate limit exceeded: ${apiKeyId}`, {
        apiKeyId,
        limit: customLimit,
        retryAfter: secs
      });

      res.status(429).json({
        error: 'Too Many Requests',
        message: 'API key rate limit exceeded',
        code: 'API_KEY_RATE_LIMIT_EXCEEDED',
        retryAfter: secs,
        limit: customLimit
      });
    }
  }

  /**
   * Apply rate limit for authenticated users
   */
  private async applyUserRateLimit(req: RateLimitRequest, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Higher limits for admin users
    const points = userRole === 'admin' || userRole === 'super_admin' ? 2000 : 1000;

    try {
      const result = await this.userLimiter.consume(userId, 1);
      
      res.set({
        'X-RateLimit-User-Limit': points.toString(),
        'X-RateLimit-User-Remaining': result.remainingPoints.toString(),
        'X-RateLimit-User-Reset': new Date(Date.now() + result.msBeforeNext).toISOString(),
      });

      next();
    } catch (rateLimitResult) {
      const secs = Math.round(rateLimitResult.msBeforeNext / 1000) || 1;
      
      res.set({
        'X-RateLimit-User-Limit': points.toString(),
        'X-RateLimit-User-Remaining': '0',
        'X-RateLimit-User-Reset': new Date(Date.now() + rateLimitResult.msBeforeNext).toISOString(),
        'Retry-After': secs.toString(),
      });

      logger.warn(`User rate limit exceeded: ${userId}`, {
        userId,
        userRole,
        limit: points,
        retryAfter: secs
      });

      res.status(429).json({
        error: 'Too Many Requests',
        message: 'User rate limit exceeded',
        code: 'USER_RATE_LIMIT_EXCEEDED',
        retryAfter: secs,
        limit: points
      });
    }
  }

  /**
   * Apply rate limit for IP addresses
   */
  private async applyIpRateLimit(req: RateLimitRequest, res: Response, next: NextFunction): Promise<void> {
    const clientIp = this.getClientIp(req);

    try {
      const result = await this.ipLimiter.consume(clientIp);
      
      res.set({
        'X-RateLimit-IP-Limit': '200',
        'X-RateLimit-IP-Remaining': result.remainingPoints.toString(),
        'X-RateLimit-IP-Reset': new Date(Date.now() + result.msBeforeNext).toISOString(),
      });

      next();
    } catch (rateLimitResult) {
      const secs = Math.round(rateLimitResult.msBeforeNext / 1000) || 1;
      
      res.set({
        'X-RateLimit-IP-Limit': '200',
        'X-RateLimit-IP-Remaining': '0',
        'X-RateLimit-IP-Reset': new Date(Date.now() + rateLimitResult.msBeforeNext).toISOString(),
        'Retry-After': secs.toString(),
      });

      logger.warn(`IP rate limit exceeded: ${clientIp}`, {
        clientIp,
        limit: 200,
        retryAfter: secs
      });

      res.status(429).json({
        error: 'Too Many Requests',
        message: 'IP rate limit exceeded',
        code: 'IP_RATE_LIMIT_EXCEEDED',
        retryAfter: secs,
        limit: 200
      });
    }
  }

  /**
   * Apply global rate limit
   */
  private async applyGlobalRateLimit(req: RateLimitRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.globalLimiter.consume('global');
      
      res.set({
        'X-RateLimit-Global-Limit': config.rateLimit.maxRequests.toString(),
        'X-RateLimit-Global-Remaining': result.remainingPoints.toString(),
        'X-RateLimit-Global-Reset': new Date(Date.now() + result.msBeforeNext).toISOString(),
      });

      next();
    } catch (rateLimitResult) {
      const secs = Math.round(rateLimitResult.msBeforeNext / 1000) || 1;
      
      res.set({
        'X-RateLimit-Global-Limit': config.rateLimit.maxRequests.toString(),
        'X-RateLimit-Global-Remaining': '0',
        'X-RateLimit-Global-Reset': new Date(Date.now() + rateLimitResult.msBeforeNext).toISOString(),
        'Retry-After': secs.toString(),
      });

      logger.warn('Global rate limit exceeded', {
        limit: config.rateLimit.maxRequests,
        retryAfter: secs
      });

      res.status(429).json({
        error: 'Too Many Requests',
        message: 'Global rate limit exceeded',
        code: 'GLOBAL_RATE_LIMIT_EXCEEDED',
        retryAfter: secs,
        limit: config.rateLimit.maxRequests
      });
    }
  }

  /**
   * Get client IP address
   */
  private getClientIp(req: Request): string {
    return (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();
  }

  /**
   * Reset rate limit for a specific key
   */
  public async resetRateLimit(type: 'user' | 'apikey' | 'ip', identifier: string): Promise<void> {
    const limiter = type === 'user' ? this.userLimiter : 
                   type === 'apikey' ? this.apiKeyLimiter : 
                   this.ipLimiter;
    
    await limiter.delete(identifier);
    logger.info(`Rate limit reset for ${type}: ${identifier}`);
  }

  /**
   * Get rate limit status for a specific key
   */
  public async getRateLimitStatus(type: 'user' | 'apikey' | 'ip', identifier: string): Promise<any> {
    const limiter = type === 'user' ? this.userLimiter : 
                   type === 'apikey' ? this.apiKeyLimiter : 
                   this.ipLimiter;
    
    try {
      const result = await limiter.get(identifier);
      return {
        remainingPoints: result?.remainingPoints || 0,
        msBeforeNext: result?.msBeforeNext || 0,
        totalHits: result?.totalHits || 0
      };
    } catch (error) {
      return null;
    }
  }
}

const rateLimitMiddleware = new RateLimitMiddleware();

export { rateLimitMiddleware };
export const { rateLimit, resetRateLimit, getRateLimitStatus } = rateLimitMiddleware;
