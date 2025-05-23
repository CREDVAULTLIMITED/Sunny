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

/**
 * Get transaction history with optional filters
 * 
 * @param {Object} options - Filter options
 * @param {Date} [options.startDate] - Start date filter
 * @param {Date} [options.endDate] - End date filter
 * @param {string} [options.status] - Transaction status filter
 * @param {number} [options.limit] - Maximum number of transactions to return
 * @param {string} [options.sort] - Sort order (e.g., 'createdAt:desc')
 * @returns {Promise<Array>} Array of transactions
 */
export const getTransactionHistory = async (options = {}) => {
  // In a real implementation, this would fetch from a database
  // For now, return mock data that matches the dashboard's needs
  const mockTransactions = [
    {
      id: 'TXN-1',
      amount: 1000,
      status: 'COMPLETED',
      customerName: 'John Doe',
      date: new Date(),
      title: 'Payment for Services',
      metadata: {
        customerDetails: {
          name: 'John Doe'
        }
      }
    },
    {
      id: 'TXN-2',
      amount: 750,
      status: 'COMPLETED',
      customerName: 'Jane Smith',
      date: new Date(),
      title: 'Product Purchase',
      metadata: {
        customerDetails: {
          name: 'Jane Smith'
        }
      }
    },
    {
      id: 'TXN-3',
      amount: 2500,
      status: 'COMPLETED',
      customerName: 'Acme Corp',
      date: new Date(),
      title: 'Monthly Subscription',
      metadata: {
        customerDetails: {
          name: 'Acme Corp'
        }
      }
    },
    {
      id: 'TXN-4',
      amount: 325,
      status: 'PENDING',
      customerName: 'Bob Johnson',
      date: new Date(),
      title: 'Service Fee',
      metadata: {
        customerDetails: {
          name: 'Bob Johnson'
        }
      }
    }
  ];

  // Apply filters (simulated)
  let result = [...mockTransactions];
  
  // Filter by status
  if (options.status) {
    result = result.filter(tx => tx.status === options.status);
  }
  
  // Filter by date range
  if (options.startDate) {
    result = result.filter(tx => new Date(tx.date) >= new Date(options.startDate));
  }
  
  if (options.endDate) {
    result = result.filter(tx => new Date(tx.date) <= new Date(options.endDate));
  }
  
  // Sort (simplified implementation)
  if (options.sort) {
    const [field, direction] = options.sort.split(':');
    const multiplier = direction === 'desc' ? -1 : 1;
    
    result.sort((a, b) => {
      if (field === 'createdAt' || field === 'date') {
        return multiplier * (new Date(a.date) - new Date(b.date));
      }
      return 0;
    });
  }
  
  // Apply limit
  if (options.limit && options.limit > 0) {
    result = result.slice(0, options.limit);
  }
  
  return result;
};

