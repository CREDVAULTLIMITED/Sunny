/**
 * Logging Service
 * Centralized logging functionality for the application
 */

// Configure the log level based on environment
const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';
const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

// Helper function to get current timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Format log messages
const formatLogMessage = (level, message, data = {}) => {
  const timestamp = getTimestamp();
  let formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  // Add contextual data if available
  if (Object.keys(data).length > 0) {
    try {
      formattedMessage += ` - ${JSON.stringify(data)}`;
    } catch (error) {
      formattedMessage += ` - [Error serializing log data: ${error.message}]`;
    }
  }
  
  return formattedMessage;
};

// In production, this would send logs to a proper logging service
const sendToRemoteLogging = (level, message, data) => {
  // This is a placeholder for a real remote logging service
  // In a production environment, this would send logs to a service like Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production' && LOG_LEVELS[level] >= LOG_LEVELS.error) {
    // Example: send to remote logging service
    console.log(`[REMOTE] ${formatLogMessage(level, message, data)}`);
  }
};

// Create the logging service object 
const loggingService = {
  /**
   * Log debug message
   * @param {string} message - Log message
   * @param {Object} data - Additional context data
   */
  debug: (message, data) => {
    if (LOG_LEVELS[LOG_LEVEL] <= LOG_LEVELS.debug) {
      console.debug(formatLogMessage('debug', message, data));
    }
  },
  
  /**
   * Log info message
   * @param {string} message - Log message
   * @param {Object} data - Additional context data
   */
  info: (message, data) => {
    if (LOG_LEVELS[LOG_LEVEL] <= LOG_LEVELS.info) {
      console.info(formatLogMessage('info', message, data));
    }
  },
  
  /**
   * Log warning message
   * @param {string} message - Log message
   * @param {Object} data - Additional context data
   */
  warn: (message, data) => {
    if (LOG_LEVELS[LOG_LEVEL] <= LOG_LEVELS.warn) {
      console.warn(formatLogMessage('warn', message, data));
      sendToRemoteLogging('warn', message, data);
    }
  },
  
  /**
   * Log error message
   * @param {string} message - Log message
   * @param {Error|Object} error - Error object or additional context data
   */
  error: (message, error) => {
    if (LOG_LEVELS[LOG_LEVEL] <= LOG_LEVELS.error) {
      let errorData = {};
      
      if (error instanceof Error) {
        errorData = {
          message: error.message,
          stack: error.stack,
          name: error.name
        };
      } else if (error) {
        errorData = error;
      }
      
      console.error(formatLogMessage('error', message, errorData));
      sendToRemoteLogging('error', message, errorData);
    }
  }
};

// Export both as named and default export
export { loggingService };
export default loggingService;
