/**
 * Authentication Middleware for API Gateway
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { RedisClient } from '../utils/redis';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    merchantId?: string;
    permissions: string[];
  };
  apiKey?: {
    id: string;
    merchantId: string;
    permissions: string[];
    rateLimit: number;
  };
}

class AuthMiddleware {
  private redis: RedisClient;

  constructor() {
    this.redis = new RedisClient();
  }

  /**
   * Main authentication middleware
   */
  public authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      const apiKey = req.headers[config.security.apiKeyHeader.toLowerCase()] as string;

      // Check for Bearer token
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        await this.validateJWTToken(token, req, res, next);
        return;
      }

      // Check for API Key
      if (apiKey) {
        await this.validateApiKey(apiKey, req, res, next);
        return;
      }

      // No authentication provided
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required. Provide either Bearer token or API key.',
        code: 'AUTH_REQUIRED'
      });
    } catch (error) {
      logger.error('Authentication error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Authentication service error',
        code: 'AUTH_SERVICE_ERROR'
      });
    }
  };

  /**
   * Validate JWT token
   */
  private async validateJWTToken(token: string, req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // Check if token is blacklisted
      const isBlacklisted = await this.redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Token has been revoked',
          code: 'TOKEN_REVOKED'
        });
        return;
      }

      // Verify JWT token
      const decoded = jwt.verify(token, config.security.jwtSecret) as any;

      // Check if user session is still valid
      const sessionKey = `session:${decoded.userId}:${decoded.sessionId}`;
      const sessionData = await this.redis.get(sessionKey);
      
      if (!sessionData) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Session expired or invalid',
          code: 'SESSION_EXPIRED'
        });
        return;
      }

      // Attach user info to request
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        merchantId: decoded.merchantId,
        permissions: decoded.permissions || []
      };

      // Update session activity
      await this.redis.setex(sessionKey, 86400, JSON.stringify({
        ...JSON.parse(sessionData),
        lastActivity: new Date().toISOString()
      }));

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid token',
          code: 'INVALID_TOKEN'
        });
      } else if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
      } else {
        logger.error('JWT validation error:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Token validation error',
          code: 'TOKEN_VALIDATION_ERROR'
        });
      }
    }
  }

  /**
   * Validate API Key
   */
  private async validateApiKey(apiKey: string, req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // Get API key data from Redis
      const apiKeyData = await this.redis.get(`apikey:${apiKey}`);
      
      if (!apiKeyData) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid API key',
          code: 'INVALID_API_KEY'
        });
        return;
      }

      const parsedData = JSON.parse(apiKeyData);

      // Check if API key is active
      if (!parsedData.active) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'API key is disabled',
          code: 'API_KEY_DISABLED'
        });
        return;
      }

      // Check expiration
      if (parsedData.expiresAt && new Date(parsedData.expiresAt) < new Date()) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'API key has expired',
          code: 'API_KEY_EXPIRED'
        });
        return;
      }

      // Check rate limiting
      const rateLimitKey = `ratelimit:apikey:${apiKey}`;
      const currentUsage = await this.redis.get(rateLimitKey);
      const usage = currentUsage ? parseInt(currentUsage) : 0;

      if (usage >= parsedData.rateLimit) {
        res.status(429).json({
          error: 'Too Many Requests',
          message: 'API key rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: 3600 // 1 hour
        });
        return;
      }

      // Increment usage counter
      await this.redis.setex(rateLimitKey, 3600, (usage + 1).toString());

      // Attach API key info to request
      req.apiKey = {
        id: parsedData.id,
        merchantId: parsedData.merchantId,
        permissions: parsedData.permissions || [],
        rateLimit: parsedData.rateLimit
      };

      // Update last used timestamp
      await this.redis.set(`apikey:${apiKey}`, JSON.stringify({
        ...parsedData,
        lastUsed: new Date().toISOString()
      }));

      next();
    } catch (error) {
      logger.error('API key validation error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'API key validation error',
        code: 'API_KEY_VALIDATION_ERROR'
      });
    }
  }

  /**
   * Role-based authorization middleware
   */
  public authorize = (requiredRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      const userRole = req.user?.role;
      const apiKeyPermissions = req.apiKey?.permissions || [];

      // Check user role
      if (userRole && requiredRoles.includes(userRole)) {
        next();
        return;
      }

      // Check API key permissions
      const hasPermission = requiredRoles.some(role => apiKeyPermissions.includes(role));
      if (hasPermission) {
        next();
        return;
      }

      res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: requiredRoles
      });
    };
  };

  /**
   * Permission-based authorization middleware
   */
  public requirePermission = (permission: string) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      const userPermissions = req.user?.permissions || [];
      const apiKeyPermissions = req.apiKey?.permissions || [];

      const hasPermission = userPermissions.includes(permission) || 
                           apiKeyPermissions.includes(permission);

      if (hasPermission) {
        next();
        return;
      }

      res.status(403).json({
        error: 'Forbidden',
        message: `Permission required: ${permission}`,
        code: 'PERMISSION_REQUIRED',
        required: permission
      });
    };
  };

  /**
   * Merchant-specific authorization
   */
  public requireMerchantAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userMerchantId = req.user?.merchantId;
    const apiKeyMerchantId = req.apiKey?.merchantId;
    const requestedMerchantId = req.params.merchantId || req.body.merchantId;

    // Super admin can access any merchant
    if (req.user?.role === 'super_admin') {
      next();
      return;
    }

    // Check if user/API key belongs to the requested merchant
    if (userMerchantId === requestedMerchantId || apiKeyMerchantId === requestedMerchantId) {
      next();
      return;
    }

    res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied to merchant data',
      code: 'MERCHANT_ACCESS_DENIED'
    });
  };
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware, AuthenticatedRequest };
export const { authenticate, authorize, requirePermission, requireMerchantAccess } = authMiddleware;
