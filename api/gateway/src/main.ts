/**
 * Sunny Payment Gateway - API Gateway
 * Main entry point for the API Gateway service
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { logger } from './utils/logger';
import { config } from './config/config';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { validationMiddleware } from './middleware/validation';
import { errorHandler } from './middleware/errorHandler';
import { healthRoutes } from './routes/health';
import { authRoutes } from './routes/auth';
import { paymentRoutes } from './routes/payments';
import { kenyaRoutes } from './routes/kenya';
import { analyticsRoutes } from './routes/analytics';
import { webhookRoutes } from './routes/webhooks';

class APIGateway {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = config.port || 8080;
    this.setupMiddleware();
    this.setupSwagger();
    this.setupRoutes();
    this.setupProxyRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    }));

    // CORS configuration
    this.app.use(cors({
      origin: config.cors.allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Rate limiting
    this.app.use(rateLimitMiddleware);

    // Request logging
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
      });
      next();
    });
  }

  private setupSwagger(): void {
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Sunny Payment Gateway API',
          version: '2.0.0',
          description: 'Comprehensive payment processing API with Kenya-first approach',
          contact: {
            name: 'Sunny Payments Support',
            email: 'api-support@sunnypayments.com',
            url: 'https://developers.sunnypayments.com'
          },
          license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
          }
        },
        servers: [
          {
            url: config.environment === 'production' 
              ? 'https://api.sunnypayments.com/v2'
              : 'https://sandbox.sunnypayments.com/v2',
            description: config.environment === 'production' ? 'Production' : 'Sandbox'
          }
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            },
            apiKeyAuth: {
              type: 'apiKey',
              in: 'header',
              name: 'X-API-Key'
            }
          }
        },
        security: [
          { bearerAuth: [] },
          { apiKeyAuth: [] }
        ]
      },
      apis: ['./src/routes/*.ts', './src/handlers/*.ts']
    };

    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Sunny Payments API Documentation'
    }));
  }

  private setupRoutes(): void {
    const apiV2 = express.Router();

    // Health check routes (no auth required)
    apiV2.use('/health', healthRoutes);

    // Authentication routes
    apiV2.use('/auth', authRoutes);

    // Protected routes (require authentication)
    apiV2.use('/payments', authMiddleware, validationMiddleware, paymentRoutes);
    apiV2.use('/kenya', authMiddleware, validationMiddleware, kenyaRoutes);
    apiV2.use('/analytics', authMiddleware, analyticsRoutes);
    apiV2.use('/webhooks', authMiddleware, webhookRoutes);

    this.app.use('/v2', apiV2);

    // Root route
    this.app.get('/', (req, res) => {
      res.json({
        name: 'Sunny Payment Gateway API',
        version: '2.0.0',
        status: 'active',
        documentation: '/docs',
        health: '/v2/health',
        timestamp: new Date().toISOString()
      });
    });
  }

  private setupProxyRoutes(): void {
    // Proxy routes to microservices
    const services = {
      '/v2/payments': {
        target: config.services.coreEngine,
        changeOrigin: true,
        pathRewrite: { '^/v2/payments': '/payments' }
      },
      '/v2/kenya': {
        target: config.services.kenyaService,
        changeOrigin: true,
        pathRewrite: { '^/v2/kenya': '/kenya' }
      },
      '/v2/analytics': {
        target: config.services.analyticsService,
        changeOrigin: true,
        pathRewrite: { '^/v2/analytics': '/analytics' }
      },
      '/v2/notifications': {
        target: config.services.notificationService,
        changeOrigin: true,
        pathRewrite: { '^/v2/notifications': '/notifications' }
      },
      '/v2/fraud': {
        target: config.services.fraudDetection,
        changeOrigin: true,
        pathRewrite: { '^/v2/fraud': '/fraud' }
      },
      '/v2/ai': {
        target: config.services.aiService,
        changeOrigin: true,
        pathRewrite: { '^/v2/ai': '/ai' }
      },
      '/v2/compliance': {
        target: config.services.complianceService,
        changeOrigin: true,
        pathRewrite: { '^/v2/compliance': '/compliance' }
      }
    };

    // Setup proxy middleware for each service
    Object.entries(services).forEach(([path, options]) => {
      this.app.use(path, createProxyMiddleware({
        ...options,
        onError: (err, req, res) => {
          logger.error(`Proxy error for ${path}:`, err);
          res.status(503).json({
            error: 'Service Unavailable',
            message: 'The requested service is temporarily unavailable',
            service: path,
            timestamp: new Date().toISOString()
          });
        },
        onProxyReq: (proxyReq, req) => {
          // Add correlation ID for request tracking
          const correlationId = req.headers['x-correlation-id'] || 
            `sunny-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          proxyReq.setHeader('X-Correlation-ID', correlationId);
          
          // Forward authentication headers
          if (req.headers.authorization) {
            proxyReq.setHeader('Authorization', req.headers.authorization);
          }
        },
        onProxyRes: (proxyRes, req, res) => {
          // Add CORS headers to proxied responses
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS';
          proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Length, X-Requested-With';
        }
      }));
    });
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Endpoint ${req.method} ${req.originalUrl} not found`,
        timestamp: new Date().toISOString(),
        documentation: '/docs'
      });
    });

    // Global error handler
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Sunny API Gateway started on port ${this.port}`, {
        environment: config.environment,
        version: '2.0.0',
        documentation: `http://localhost:${this.port}/docs`,
        health: `http://localhost:${this.port}/v2/health`
      });
    });

    // Graceful shutdown
    process.on('SIGTERM', this.shutdown.bind(this));
    process.on('SIGINT', this.shutdown.bind(this));
  }

  private shutdown(): void {
    logger.info('🛑 Shutting down Sunny API Gateway...');
    process.exit(0);
  }
}

// Start the API Gateway
const gateway = new APIGateway();
gateway.start();

export default gateway;

