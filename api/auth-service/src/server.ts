import 'dotenv/config';
import { app, server } from './app';
import DatabaseManager from '@sunny/database';

// Configuration
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Initialize and start server
async function startServer() {
  try {
    console.log('🚀 Starting Sunny Authentication Service...');
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Initialize database connections
    console.log('📊 Initializing database connections...');
    await DatabaseManager.initialize();
    console.log('✅ Database connections established');
    
    // Start HTTP server
    server.listen(PORT, HOST, () => {
      console.log(`🎯 Auth Service running on ${HOST}:${PORT}`);
      console.log(`📋 Health check: http://${HOST}:${PORT}/health`);
      console.log(`📚 API docs: http://${HOST}:${PORT}/api`);
      console.log('🔐 Authentication endpoints ready');
    });
    
    // Handle server startup errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      
      const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
      
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    
  } catch (error) {
    console.error('❌ Failed to start auth service:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();
