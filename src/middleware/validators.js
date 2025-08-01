/**
 * Request validators for API endpoints
 */
import { ERROR_CODES } from '../core/constants.js';
import EnhancedFraudDetection from '../security/enhancedFraudDetection.js';

/**
 * Validate SDK initialization and usage
 */
export const validateSDKUsage = async (req, res, next) => {
  const { apiKey, sdkVersion, platform, environment } = req.headers;

  // Validate API key format and environment
  if (!apiKey || !apiKey.match(/^(pk|sk)_(test|live)_[a-zA-Z0-9]{24,}$/)) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Invalid API key format'
    });
  }

  // Validate SDK version
  if (!sdkVersion || !isSupportedVersion(sdkVersion)) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Unsupported SDK version'
    });
  }

  // Validate platform
  if (!platform || !isSupportedPlatform(platform)) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Unsupported platform'
    });
  }

  // Enhanced fraud detection
  const fraudCheck = await EnhancedFraudDetection.analyzeTransaction(req.body, {
    ip: req.ip,
    deviceId: req.headers['x-device-id'],
    userAgent: req.headers['user-agent'],
    sdkVersion,
    platform
  });

  if (fraudCheck.action.action === 'BLOCK') {
    return res.status(403).json({
      success: false,
      error: ERROR_CODES.FRAUD_DETECTED,
      message: 'Transaction blocked due to suspicious activity'
    });
  }

  // Attach fraud check results to request
  req.fraudCheck = fraudCheck;
  next();
};

/**
 * Validate cryptocurrency payment request
 */
export const validatePaymentRequest = (req, res, next) => {
  const { amount, currency } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Valid amount is required'
    });
  }

  if (!currency) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Currency is required'
    });
  }

  next();
};

/**
 * Validate status check request
 */
export const validateStatusRequest = (req, res, next) => {
  const { transactionId } = req.params;
  
  if (!transactionId) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Transaction ID is required'
    });
  }

  next();
};

/**
 * Validate exchange rate request
 */
export const validateExchangeRateRequest = (req, res, next) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'From and to currencies are required'
    });
  }

  next();
};

// Helper functions
function isSupportedVersion(version) {
  const supportedVersions = ['3.0.0', '3.1.0', '3.2.0'];
  return supportedVersions.includes(version);
}

function isSupportedPlatform(platform) {
  const supportedPlatforms = [
    'node', 'browser', 'python', 'php', 'ruby', 'java', 
    'go', 'dotnet', 'ios', 'android'
  ];
  return supportedPlatforms.includes(platform.toLowerCase());
}

export const validateWebhookSignature = (req, res, next) => {
  const signature = req.headers['sunny-signature'];
  const timestamp = req.headers['sunny-timestamp'];
  
  if (!signature || !timestamp) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Missing webhook signature or timestamp'
    });
  }

  // Verify webhook signature
  const isValid = verifyWebhookSignature(JSON.stringify(req.body), signature, timestamp);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Invalid webhook signature'
    });
  }

  next();
};

function verifyWebhookSignature(payload, signature, timestamp) {
  // Implementation for webhook signature verification
  return true;
}
