/**
 * transactionLogger.js
 * 
 * Handles logging of transactions and errors for audit and debugging purposes
 */

// In a production environment, this would connect to a proper logging service
// like CloudWatch, Datadog, or a database logging system

/**
 * Log a transaction event
 * 
 * @param {string} eventType - Type of transaction event
 * @param {Object} data - Transaction data to log
 */
export const logTransaction = (eventType, data) => {
  // Remove sensitive data before logging
  const sanitizedData = sanitizeData(data);
  
  // In production, this would send to a proper logging service
  console.log(`[${new Date().toISOString()}] [${eventType}]`, JSON.stringify(sanitizedData));
  
  // In a real implementation, we would:
  // 1. Store in database for audit trail
  // 2. Send to monitoring system for alerts
  // 3. Track metrics for analytics
};

/**
 * Log an error event
 * 
 * @param {string} eventType - Type of error event
 * @param {Error} error - Error object
 * @param {Object} context - Additional context data
 */
export const logError = (eventType, error, context = {}) => {
  // Remove sensitive data before logging
  const sanitizedContext = sanitizeData(context);
  
  // Format error for logging
  const errorData = {
    message: error.message,
    stack: error.stack,
    code: error.code,
    context: sanitizedContext
  };
  
  // In production, this would send to a proper logging service
  console.error(`[${new Date().toISOString()}] [${eventType}]`, JSON.stringify(errorData));
  
  // In a real implementation, we would:
  // 1. Store in database for audit trail
  // 2. Send to monitoring system for alerts
  // 3. Track error rates for reliability metrics
};

/**
 * Remove sensitive data from objects before logging
 * 
 * @param {Object} data - Data to sanitize
 * @returns {Object} Sanitized data
 */
const sanitizeData = (data) => {
  if (!data) return data;
  
  // Create a deep copy to avoid modifying the original
  const sanitized = JSON.parse(JSON.stringify(data));
  
  // List of sensitive fields to redact
  const sensitiveFields = [
    'cardNumber', 'cvv', 'expiryDate', 'pin', 'password', 'secret',
    'token', 'accessToken', 'refreshToken', 'privateKey', 'ssn',
    'nationalId', 'passportNumber'
  ];
  
  // Function to recursively sanitize objects
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    
    Object.keys(obj).forEach(key => {
      // Check if this is a sensitive field
      if (sensitiveFields.includes(key)) {
        // Redact the value but keep the first and last characters
        const value = obj[key];
        if (typeof value === 'string' && value.length > 4) {
          obj[key] = `${value.substring(0, 2)}****${value.substring(value.length - 2)}`;
        } else {
          obj[key] = '****';
        }
      } 
      // If it's an object or array, recursively sanitize
      else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    });
  };
  
  sanitizeObject(sanitized);
  return sanitized;
};

export default {
  logTransaction,
  logError
};