/**
 * Sunny Payment Gateway - Core Engine
 * Main payment processing service
 */

import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { createConnection } from 'typeorm';
import { Container } from 'typedi';

import { logger } from './utils/logger';
import { config } from './config/config';
import { PaymentOrchestrator } from './orchestrator/PaymentOrchestrator';
import { ProcessorRegistry } from './processors/ProcessorRegistry';
import { SecurityManager } from './security/SecurityManager';
import { SettlementEngine } from './settlement/SettlementEngine';
import { errorHandler } from './middleware/errorHandler';
import { validationMiddleware } from './middleware/validation';
import { paymentRoutes } from './routes/payments';
import { processorRoutes } from './routes/processors';
import { settlementRoutes } from './routes/settlement';
import { healthRoutes } from './routes/health';

class CoreEngine {
  private app: express.Application;
  private port: number;
  private paymentOrchestrator: PaymentOrchestrator;
  private processorRegistry: ProcessorRegistry;
  private securityManager: SecurityManager;
  private settlementEngine: SettlementEngine;

  constructor() {
    this.app = express();
    this.port = config.port || 8081;
    this.setupMiddleware();
    this.initializeServices();
    this.setupRoutes();
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
      }
    }));

    // CORS
    this.app.use(cors({
      origin: config.cors.allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use((req, res, next) => {
      const correlationId = req.headers['x-correlation-id'] || 
        `core-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      req.headers['x-correlation-id'] = correlationId;
      
      logger.info(`${req.method} ${req.path}`, {
        correlationId,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
      });
      next();
    });

    // Validation middleware
    this.app.use(validationMiddleware);
  }

  private async initializeServices(): Promise<void> {
    try {
      // Initialize database connection
      await this.initializeDatabase();

      // Initialize core services
      this.securityManager = Container.get(SecurityManager);
      this.processorRegistry = Container.get(ProcessorRegistry);
      this.settlementEngine = Container.get(SettlementEngine);
      this.paymentOrchestrator = Container.get(PaymentOrchestrator);

      // Initialize payment processors
      await this.processorRegistry.initializeProcessors();

      // Initialize settlement engine
      await this.settlementEngine.initialize();

      logger.info('✅ Core Engine services initialized successfully');
    } catch (error) {
      logger.error('❌ Failed to initialize Core Engine services:', error);
      throw error;
    }
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await createConnection({
        type: 'postgres',
        host: config.database.postgres.host,
        port: config.database.postgres.port,
        username: config.database.postgres.username,
        password: config.database.postgres.password,
        database: config.database.postgres.database,
        entities: [__dirname + '/entities/*.ts'],
        migrations: [__dirname + '/migrations/*.ts'],
        synchronize: config.environment === 'development',
        logging: config.environment === 'development',
        ssl: config.database.postgres.ssl ? {
          rejectUnauthorized: false
        } : false
      });

      logger.info('✅ Database connection established');
    } catch (error) {
      logger.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  private setupRoutes(): void {
    // Health check routes
    this.app.use('/health', healthRoutes);

    // Core payment processing routes
    this.app.use('/payments', paymentRoutes);
    this.app.use('/processors', processorRoutes);
    this.app.use('/settlement', settlementRoutes);

    // Root route
    this.app.get('/', (req, res) => {
      res.json({
        service: 'Sunny Core Engine',
        version: '1.0.0',
        status: 'active',
        capabilities: [
          'payment-processing',
          'instant-settlement',
          'fraud-detection',
          'multi-processor-support',
          'real-time-routing'
        ],
        processors: this.processorRegistry.getAvailableProcessors(),
        timestamp: new Date().toISOString()
      });
    });
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Endpoint ${req.method} ${req.originalUrl} not found`,
        service: 'core-engine',
        timestamp: new Date().toISOString()
      });
    });

    // Global error handler
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      this.app.listen(this.port, () => {
        logger.info(`🚀 Sunny Core Engine started on port ${this.port}`, {
          environment: config.environment,
          version: '1.0.0',
          processors: this.processorRegistry.getAvailableProcessors().length,
          health: `http://localhost:${this.port}/health`
        });
      });

      // Graceful shutdown
      process.on('SIGTERM', this.shutdown.bind(this));
      process.on('SIGINT', this.shutdown.bind(this));
    } catch (error) {
      logger.error('❌ Failed to start Core Engine:', error);
      throw error;
    }
  }

  private async shutdown(): Promise<void> {
    logger.info('🛑 Shutting down Sunny Core Engine...');
    
    try {
      // Cleanup services
      await this.settlementEngine.shutdown();
      await this.processorRegistry.shutdown();
      
      logger.info('✅ Core Engine shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Start the Core Engine
const coreEngine = new CoreEngine();
coreEngine.start().catch((error) => {
  logger.error('❌ Failed to start Core Engine:', error);
  process.exit(1);
});

export default coreEngine;
