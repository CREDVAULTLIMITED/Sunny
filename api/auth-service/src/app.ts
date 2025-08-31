import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import DatabaseManager from '@sunny/database';
import authRoutes from './routes/auth';

const app = express();
const server = createServer(app);

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "ws:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://sunnypayments.com',
      'https://www.sunnypayments.com',
      'https://app.sunnypayments.com',
      'https://business.sunnypayments.com',
      'https://institutions.sunnypayments.com',
      'https://admin.sunnypayments.com',
      'https://developers.sunnypayments.com',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow development domains
    if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connections
    const mongoHealth = DatabaseManager.healthStates.mongodb;
    const postgresHealth = DatabaseManager.healthStates.postgres;
    const redisHealth = DatabaseManager.healthStates.redis;
    
    const healthy = mongoHealth && postgresHealth && redisHealth;
    
    res.status(healthy ? 200 : 503).json({
      status: healthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        mongodb: mongoHealth ? 'healthy' : 'unhealthy',
        postgres: postgresHealth ? 'healthy' : 'unhealthy',
        redis: redisHealth ? 'healthy' : 'unhealthy'
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Metrics endpoint (for monitoring)
app.get('/metrics', async (req, res) => {
  try {
    // Basic metrics
    const metrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve metrics',
      timestamp: new Date().toISOString()
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    service: 'Sunny Payment Gateway - Authentication Service',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      auth: {
        'POST /api/auth/signin': 'Sign in with email and password',
        'POST /api/auth/signup': 'Register new user account',
        'POST /api/auth/social': 'Social authentication',
        'POST /api/auth/refresh': 'Refresh access token',
        'POST /api/auth/signout': 'Sign out current session',
        'POST /api/auth/signout-all': 'Sign out all sessions',
        'POST /api/auth/forgot-password': 'Request password reset',
        'POST /api/auth/reset-password': 'Confirm password reset',
        'POST /api/auth/mfa/setup': 'Setup multi-factor authentication',
        'POST /api/auth/mfa/verify-setup': 'Verify MFA setup',
        'GET /api/auth/me': 'Get current user information',
        'GET /api/auth/sessions': 'Get user active sessions'
      },
      system: {
        'GET /health': 'Service health check',
        'GET /metrics': 'Service metrics',
        'GET /api': 'API documentation'
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
      path: req.originalUrl
    }
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: isDevelopment ? err.message : 'An unexpected error occurred',
      ...(isDevelopment && { stack: err.stack })
    }
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  
  server.close(async () => {
    try {
      await DatabaseManager.closeAll();
      console.log('Database connections closed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.log('Forcing shutdown');
    process.exit(1);
  }, 30000);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  
  server.close(async () => {
    try {
      await DatabaseManager.closeAll();
      console.log('Database connections closed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });
});

export { app, server };
export default app;
