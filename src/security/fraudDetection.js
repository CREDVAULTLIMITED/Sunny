/**
 * Fraud detection system for payment transactions
 */

import { hashData } from './encryption.js';

// Risk thresholds
const RISK_THRESHOLD_HIGH = 0.8;
const RISK_THRESHOLD_MEDIUM = 0.5;
const RISK_THRESHOLD_LOW = 0.2;

// Risk factors
const RISK_FACTORS = {
  AMOUNT_THRESHOLD: 'amount_threshold',
  VELOCITY: 'velocity',
  LOCATION_MISMATCH: 'location_mismatch',
  UNUSUAL_TIME: 'unusual_time',
  MULTIPLE_CARDS: 'multiple_cards',
  FAILED_ATTEMPTS: 'failed_attempts',
  BIN_CHECK: 'bin_check',
  IP_REPUTATION: 'ip_reputation'
};

// In-memory cache for velocity checks (in production, use Redis)
const transactionCache = {
  byIp: {},
  byCard: {},
  byCustomer: {},
  byEmail: {},
  failedAttempts: {}
};

/**
 * Detect potential fraud in a transaction
 * @param {Object} transactionData - Transaction data to check
 * @returns {Promise<Object>} Fraud detection result
 */
export async function detectFraud(transactionData) {
  try {
    // Initialize risk score
    let riskScore = 0;
    const riskFactors = [];
    
    // Check transaction amount
    if (checkHighAmount(transactionData)) {
      riskScore += 0.3;
      riskFactors.push(RISK_FACTORS.AMOUNT_THRESHOLD);
    }
    
    // Check transaction velocity
    const velocityResult = checkVelocity(transactionData);
    if (velocityResult.isRisky) {
      riskScore += velocityResult.riskFactor;
      riskFactors.push(RISK_FACTORS.VELOCITY);
    }
    
    // Check location mismatch
    if (transactionData.ipAddress && transactionData.card && transactionData.card.country) {
      const locationResult = await checkLocationMismatch(transactionData);
      if (locationResult.isRisky) {
        riskScore += locationResult.riskFactor;
        riskFactors.push(RISK_FACTORS.LOCATION_MISMATCH);
      }
    }
    
    // Check for unusual transaction time
    if (checkUnusualTime(transactionData)) {
      riskScore += 0.2;
      riskFactors.push(RISK_FACTORS.UNUSUAL_TIME);
    }
    
    // Check for multiple cards from same customer
    if (transactionData.customerId && transactionData.card) {
      const multipleCardsResult = checkMultipleCards(transactionData);
      if (multipleCardsResult.isRisky) {
        riskScore += multipleCardsResult.riskFactor;
        riskFactors.push(RISK_FACTORS.MULTIPLE_CARDS);
      }
    }
    
    // Check for failed attempts
    const failedAttemptsResult = checkFailedAttempts(transactionData);
    if (failedAttemptsResult.isRisky) {
      riskScore += failedAttemptsResult.riskFactor;
      riskFactors.push(RISK_FACTORS.FAILED_ATTEMPTS);
    }
    
    // Determine fraud status based on risk score
    const isFraudulent = riskScore >= RISK_THRESHOLD_HIGH;
    const requiresReview = riskScore >= RISK_THRESHOLD_MEDIUM && riskScore < RISK_THRESHOLD_HIGH;
    
    return {
      isFraudulent,
      requiresReview,
      riskScore,
      riskFactors,
      reason: isFraudulent ? 'High risk transaction detected' : null
    };
  } catch (error) {
    console.error('Fraud detection error:', error);
    
    // Default to allowing the transaction if fraud detection fails
    return {
      isFraudulent: false,
      requiresReview: true,
      riskScore: 0.5,
      riskFactors: ['error_in_fraud_detection'],
      reason: 'Error in fraud detection system'
    };
  }
}

/**
 * Check if transaction amount is unusually high
 * @param {Object} transactionData - Transaction data
 * @returns {boolean} True if amount is high risk
 */
function checkHighAmount(transactionData) {
  const amount = parseFloat(transactionData.amount);
  
  // Define thresholds by currency
  const thresholds = {
    USD: 1000,
    EUR: 900,
    GBP: 800,
    // Add more currencies as needed
    DEFAULT: 500
  };
  
  const threshold = thresholds[transactionData.currency] || thresholds.DEFAULT;
  
  return amount > threshold;
}

/**
 * Check transaction velocity (multiple transactions in short time)
 * @param {Object} transactionData - Transaction data
 * @returns {Object} Velocity check result
 */
function checkVelocity(transactionData) {
  const now = Date.now();
  const timeWindow = 3600000; // 1 hour in milliseconds
  let isRisky = false;
  let riskFactor = 0;
  
  // Check IP address velocity
  if (transactionData.ipAddress) {
    const ipHash = hashData(transactionData.ipAddress);
    transactionCache.byIp[ipHash] = transactionCache.byIp[ipHash] || [];
    
    // Clean old entries
    transactionCache.byIp[ipHash] = transactionCache.byIp[ipHash].filter(
      time => now - time < timeWindow
    );
    
    // Add current transaction
    transactionCache.byIp[ipHash].push(now);
    
    // Check if too many transactions from this IP
    if (transactionCache.byIp[ipHash].length > 5) {
      isRisky = true;
      riskFactor += 0.3;
    }
  }
  
  // Check card velocity
  if (transactionData.card && transactionData.card.number) {
    const cardHash = hashData(transactionData.card.number);
    transactionCache.byCard[cardHash] = transactionCache.byCard[cardHash] || [];
    
    // Clean old entries
    transactionCache.byCard[cardHash] = transactionCache.byCard[cardHash].filter(
      time => now - time < timeWindow
    );
    
    // Add current transaction
    transactionCache.byCard[cardHash].push(now);
    
    // Check if too many transactions with this card
    if (transactionCache.byCard[cardHash].length > 3) {
      isRisky = true;
      riskFactor += 0.4;
    }
  }
  
  return { isRisky, riskFactor };
}

/**
 * Check for location mismatch between IP and card country
 * @param {Object} transactionData - Transaction data
 * @returns {Promise<Object>} Location check result
 */
async function checkLocationMismatch(transactionData) {
  // In a real implementation, this would use a geolocation service
  // For this example, we'll simulate a check
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 50));
  
  // Randomly determine if there's a mismatch (for demo purposes)
  const isRisky = Math.random() > 0.8;
  
  return {
    isRisky,
    riskFactor: isRisky ? 0.5 : 0
  };
}

/**
 * Check if transaction is happening at an unusual time
 * @param {Object} transactionData - Transaction data
 * @returns {boolean} True if time is unusual
 */
function checkUnusualTime(transactionData) {
  const hour = new Date().getHours();
  
  // Consider transactions between 1am and 5am as potentially risky
  return hour >= 1 && hour <= 5;
}

/**
 * Check if customer is using multiple cards in short time
 * @param {Object} transactionData - Transaction data
 * @returns {Object} Multiple cards check result
 */
function checkMultipleCards(transactionData) {
  const customerId = transactionData.customerId;
  const cardHash = transactionData.card ? hashData(transactionData.card.number) : null;
  
  if (!customerId || !cardHash) {
    return { isRisky: false, riskFactor: 0 };
  }
  
  // Initialize customer's cards set
  if (!transactionCache.byCustomer[customerId]) {
    transactionCache.byCustomer[customerId] = {
      cards: new Set(),
      lastTransaction: Date.now()
    };
  }
  
  const customerData = transactionCache.byCustomer[customerId];
  const now = Date.now();
  const timeWindow = 86400000; // 24 hours
  
  // Reset if outside time window
  if (now - customerData.lastTransaction > timeWindow) {
    customerData.cards = new Set();
  }
  
  // Add current card
  customerData.cards.add(cardHash);
  customerData.lastTransaction = now;
  
  // Check if customer used too many cards
  const isRisky = customerData.cards.size > 3;
  
  return {
    isRisky,
    riskFactor: isRisky ? 0.6 : 0
  };
}

/**
 * Check for multiple failed attempts
 * @param {Object} transactionData - Transaction data
 * @returns {Object} Failed attempts check result
 */
function checkFailedAttempts(transactionData) {
  const identifiers = [];
  
  // Collect identifiers
  if (transactionData.ipAddress) {
    identifiers.push(`ip:${hashData(transactionData.ipAddress)}`);
  }
  
  if (transactionData.card && transactionData.card.number) {
    identifiers.push(`card:${hashData(transactionData.card.number)}`);
  }
  
  if (transactionData.customerId) {
    identifiers.push(`customer:${transactionData.customerId}`);
  }
  
  if (transactionData.email) {
    identifiers.push(`email:${hashData(transactionData.email)}`);
  }
  
  // Check for failed attempts
  let maxFailedAttempts = 0;
  
  identifiers.forEach(id => {
    const failedAttempts = transactionCache.failedAttempts[id] || 0;
    maxFailedAttempts = Math.max(maxFailedAttempts, failedAttempts);
  });
  
  const isRisky = maxFailedAttempts >= 3;
  
  return {
    isRisky,
    riskFactor: isRisky ? 0.7 : 0
  };
}

/**
 * Record a failed transaction attempt
 * @param {Object} transactionData - Transaction data
 */
export function recordFailedAttempt(transactionData) {
  const identifiers = [];
  
  // Collect identifiers
  if (transactionData.ipAddress) {
    identifiers.push(`ip:${hashData(transactionData.ipAddress)}`);
  }
  
  if (transactionData.card && transactionData.card.number) {
    identifiers.push(`card:${hashData(transactionData.card.number)}`);
  }
  
  if (transactionData.customerId) {
    identifiers.push(`customer:${transactionData.customerId}`);
  }
  
  if (transactionData.email) {
    identifiers.push(`email:${hashData(transactionData.email)}`);
  }
  
  // Increment failed attempts
  identifiers.forEach(id => {
    transactionCache.failedAttempts[id] = (transactionCache.failedAttempts[id] || 0) + 1;
  });
}

export default {
  detectFraud,
  recordFailedAttempt
};