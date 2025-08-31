/**
 * Sunny Payment Gateway - Authentication Middleware
 * 
 * Middleware for protecting routes and validating JWT tokens
 */

import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { config } from '../config/config';
import { logger } from '../services/loggingService';

export const limiter = rateLimit({
  windowMs: config.security.rateLimitWindowMs,
  max: config.security.rateLimitMax,
  message: 'Too many requests from this IP, please try again later.',
});

/**
 * Middleware to protect routes that require authentication
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Authentication required');
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    req.token = token;

    logger.info('User authenticated', {
      userId: decoded.id,
      path: req.path,
      method: req.method,
    });

    next();
  } catch (error) {
    logger.error('Authentication failed', {
      error: error.message,
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    res.status(401).json({
      error: 'Please authenticate.',
      details: error.message,
    });
  }
};

/**
 * Middleware to restrict access to specific roles
 */
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      logger.warn('Unauthorized access attempt', {
        userId: req.user.id,
        requiredRoles: roles,
        userRole: req.user.role,
        path: req.path,
      });

      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
