const winston = require('winston');
const path = require('path');
require('dotenv').config();

const logDir = process.env.LOG_DIR || path.join(__dirname, '../../logs');
const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console logging
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // File logging for errors
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    // File logging for all levels
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log')
    }),
    // Database-specific logging
    new winston.transports.File({
      filename: path.join(logDir, 'database.log'),
      level: 'debug'
    })
  ]
});

// Handle uncaught exceptions
logger.exceptions.handle(
  new winston.transports.File({
    filename: path.join(logDir, 'exceptions.log')
  })
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled promise rejection:', error);
});

module.exports = logger;
