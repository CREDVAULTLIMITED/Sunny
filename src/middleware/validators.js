/**
 * Request validators for API endpoints
 */
import { ERROR_CODES } from '../core/constants.js';

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
  const { address, currency } = req.query;

  if (!transactionId) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Transaction ID is required'
    });
  }

  if (!address) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Payment address is required'
    });
  }

  if (!currency) {
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.VALIDATION_ERROR,
      message: 'Cryptocurrency type is required'
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
