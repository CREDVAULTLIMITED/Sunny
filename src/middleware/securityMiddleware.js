import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validate } from 'express-validator';
import { createClient } from 'redis';
import xss from 'xss';
import sanitizeHtml from 'sanitize-html';
import { expressBrute } from 'express-brute';
import RedisStore from 'express-brute-redis';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../services/loggingService';
import { securityConfig } from '../config/security';

const store = new RedisStore({
  client: createClient({ url: process.env.REDIS_URL })
});

const bruteforce = new expressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour
  failCallback: async (req, res, next, nextValidRequestDate) => {
    await logger.logSecurityEvent('BRUTE_FORCE_ATTEMPT', {
      ip: req.ip,
      path: req.path,
      nextValidRequest: nextValidRequestDate
    });
    res.status(429).json({
      error: 'Too many attempts',
      nextValidRequest: nextValidRequestDate
    });
  }
});

export const securityMiddleware = {
  // Basic security headers
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-site" },
    dnsPrefetchControl: true,
    frameguard: { action: 'deny' },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: false,
    referrerPolicy: { policy: 'same-origin' },
    xssFilter: true
  }),

  // Rate limiting
  rateLimiter: rateLimit({
    windowMs: securityConfig.rateLimit.windowMs,
    max: securityConfig.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: async (req, res) => {
      await logger.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        ip: req.ip,
        path: req.path
      });
      res.status(429).json({
        error: 'Too many requests'
      });
    }
  }),

  // Request validation
  validateRequest: (schema) => {
    return async (req, res, next) => {
      try {
        const validationRules = schema(req);
        await Promise.all(validationRules.map(validation => validation.run(req)));
        
        const errors = validate(req);
        if (errors.isEmpty()) {
          return next();
        }

        await logger.logSecurityEvent('VALIDATION_FAILED', {
          ip: req.ip,
          path: req.path,
          errors: errors.array()
        });

        return res.status(400).json({
          errors: errors.array()
        });
      } catch (error) {
        next(error);
      }
    };
  },

  // Content sanitization
  sanitizeInput: (req, res, next) => {
    try {
      if (req.body) {
        Object.keys(req.body).forEach(key => {
          if (typeof req.body[key] === 'string') {
            req.body[key] = sanitizeHtml(xss(req.body[key]), securityConfig.sanitization);
          }
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  // Request tracing
  requestTracing: (req, res, next) => {
    const traceId = req.headers['x-trace-id'] || uuidv4();
    req.traceId = traceId;
    res.setHeader('X-Trace-ID', traceId);

    // Log request start
    logger.info('Request received', {
      traceId,
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    // Log request end
    res.on('finish', () => {
      logger.info('Request completed', {
        traceId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime: Date.now() - req._startTime
      });
    });

    next();
  },

  // Brute force protection
  bruteforce: bruteforce.prevent,

  // Error handling
  errorHandler: async (err, req, res, next) => {
    const errorId = uuidv4();

    await logger.logSecurityEvent('ERROR', {
      errorId,
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      traceId: req.traceId
    });

    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message,
      errorId
    });
  }
};

// Apply all security middleware
export const applySecurityMiddleware = (app) => {
  app.use(securityMiddleware.helmet);
  app.use(securityMiddleware.requestTracing);
  app.use(securityMiddleware.rateLimiter);
  app.use(securityMiddleware.sanitizeInput);
  
  // Add security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Error handling should be last
  app.use(securityMiddleware.errorHandler);
};