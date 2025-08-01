// Browser-compatible logging service
class BrowserLogger {
  constructor() {
    this.logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'error';
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
  }

  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      ...meta
    };
  }

  error(message, meta) {
    if (this.shouldLog('error')) {
      const formattedMessage = this.formatMessage('error', message, meta);
      console.error(formattedMessage);
      this.persistLog(formattedMessage);
    }
  }

  warn(message, meta) {
    if (this.shouldLog('warn')) {
      const formattedMessage = this.formatMessage('warn', message, meta);
      console.warn(formattedMessage);
      this.persistLog(formattedMessage);
    }
  }

  info(message, meta) {
    if (this.shouldLog('info')) {
      const formattedMessage = this.formatMessage('info', message, meta);
      console.info(formattedMessage);
      this.persistLog(formattedMessage);
    }
  }

  debug(message, meta) {
    if (this.shouldLog('debug')) {
      const formattedMessage = this.formatMessage('debug', message, meta);
      console.debug(formattedMessage);
      this.persistLog(formattedMessage);
    }
  }

  persistLog(logEntry) {
    try {
      // Store logs in localStorage with a size limit
      const MAX_LOGS = 1000;
      const logs = JSON.parse(localStorage.getItem('appLogs') || '[]');
      logs.push(logEntry);
      
      // Keep only the last MAX_LOGS entries
      if (logs.length > MAX_LOGS) {
        logs.splice(0, logs.length - MAX_LOGS);
      }
      
      localStorage.setItem('appLogs', JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to persist log:', error);
    }
  }

  getLogs() {
    try {
      return JSON.parse(localStorage.getItem('appLogs') || '[]');
    } catch (error) {
      console.error('Failed to retrieve logs:', error);
      return [];
    }
  }

  clearLogs() {
    try {
      localStorage.removeItem('appLogs');
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }
}

const logger = new BrowserLogger();

export { logger };
export default logger;
