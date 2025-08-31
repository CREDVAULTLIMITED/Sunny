/**
 * Sunny Payment Gateway - Kenya Service
 * Comprehensive Kenya-specific payment and compliance service
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
import { KRAService } from './services/KRAService';
import { MPesaService } from './services/MPesaService';
import { TaxCalculationService } from './services/TaxCalculationService';
import { ComplianceService } from './services/ComplianceService';
import { BankingService } from './services/BankingService';
import { ReceiptService } from './services/ReceiptService';
import { errorHandler } from './middleware/errorHandler';
import { validationMiddleware } from './middleware/validation';
import { kraRoutes } from './routes/kra';
import { mpesaRoutes } from './routes/mpesa';
import { taxRoutes } from './routes/tax';
import { bankingRoutes } from './routes/banking';
import { complianceRoutes } from './routes/compliance';
import { healthRoutes } from './routes/health';

class KenyaService {
  private app: express.Application;
  private port: number;
  private kraService: KRAService;
  private mpesaService: MPesaService;
  private taxService: TaxCalculationService;
  private complianceService: ComplianceService;
  private bankingService: BankingService;
  private receiptService: ReceiptService;

  constructor() {
    this.app = express();
    this.port = config.port || 8082;
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
        `kenya-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
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

      // Initialize Kenya-specific services
      this.kraService = Container.get(KRAService);
      this.mpesaService = Container.get(MPesaService);
      this.taxService = Container.get(TaxCalculationService);
      this.complianceService = Container.get(ComplianceService);
      this.bankingService = Container.get(BankingService);
      this.receiptService = Container.get(ReceiptService);

      // Initialize services
      await this.kraService.initialize();
      await this.mpesaService.initialize();
      await this.bankingService.initialize();

      logger.info('✅ Kenya Service initialized successfully');
    } catch (error) {
      logger.error('❌ Failed to initialize Kenya Service:', error);
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

    // Kenya-specific routes
    this.app.use('/kenya/kra', kraRoutes);
    this.app.use('/kenya/mpesa', mpesaRoutes);
    this.app.use('/kenya/tax', taxRoutes);
    this.app.use('/kenya/banking', bankingRoutes);
    this.app.use('/kenya/compliance', complianceRoutes);

    // Root route
    this.app.get('/', (req, res) => {
      res.json({
        service: 'Sunny Kenya Service',
        version: '1.0.0',
        status: 'active',
        capabilities: [
          'kra-integration',
          'etims-invoicing',
          'itax-reporting',
          'mpesa-processing',
          'tax-calculation',
          'vat-automation',
          'withholding-tax',
          'digital-service-tax',
          'banking-integration',
          'compliance-monitoring',
          'receipt-generation'
        ],
        integrations: {
          kra: {
            etims: this.kraService.isETIMSConnected(),
            itax: this.kraService.isITaxConnected(),
            pinValidation: true
          },
          mpesa: {
            stkPush: this.mpesaService.isSTKEnabled(),
            c2b: this.mpesaService.isC2BEnabled(),
            b2c: this.mpesaService.isB2CEnabled()
          },
          banks: this.bankingService.getConnectedBanks(),
          compliance: {
            cbk: true,
            dataProtection: true,
            amlCft: true
          }
        },
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
        service: 'kenya-service',
        timestamp: new Date().toISOString()
      });
    });

    // Global error handler
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      this.app.listen(this.port, () => {
        logger.info(`🇰🇪 Sunny Kenya Service started on port ${this.port}`, {
          environment: config.environment,
          version: '1.0.0',
          capabilities: [
            'KRA Integration',
            'M-Pesa Processing',
            'Tax Compliance',
            'Banking Integration'
          ],
          health: `http://localhost:${this.port}/health`
        });
      });

      // Graceful shutdown
      process.on('SIGTERM', this.shutdown.bind(this));
      process.on('SIGINT', this.shutdown.bind(this));
    } catch (error) {
      logger.error('❌ Failed to start Kenya Service:', error);
      throw error;
    }
  }

  private async shutdown(): Promise<void> {
    logger.info('🛑 Shutting down Sunny Kenya Service...');
    
    try {
      // Cleanup services
      await this.mpesaService.disconnect();
      await this.kraService.disconnect();
      await this.bankingService.disconnect();
      
      logger.info('✅ Kenya Service shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Start the Kenya Service
const kenyaService = new KenyaService();
kenyaService.start().catch((error) => {
  logger.error('❌ Failed to start Kenya Service:', error);
  process.exit(1);
});

export default kenyaService;
