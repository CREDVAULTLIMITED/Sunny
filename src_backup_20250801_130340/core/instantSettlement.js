/**
 * Sunny Payment Gateway - Instant Settlement
 * 
 * Handles immediate fund settlement to merchant accounts
 */

import { v4 as uuidv4 } from 'uuid';
import { SETTLEMENT_TYPES, PAYMENT_METHODS, ERROR_CODES } from './constants.js';

// Settlement speed by payment method (in seconds)
const SETTLEMENT_SPEEDS = {
  card: 60,          // 1 minute
  bank_transfer: 30, // 30 seconds
  mobile_money: 15,  // 15 seconds
  crypto: 5,         // 5 seconds
  upi: 10,           // 10 seconds
  alipay: 30,        // 30 seconds
  wechat: 30,        // 30 seconds
  default: 60        // 1 minute default
};

// Settlement availability by region (24/7 or business hours)
const SETTLEMENT_AVAILABILITY = {
  US: '24/7',
  CA: '24/7',
  GB: '24/7',
  EU: '24/7',
  IN: '24/7',
  NG: '24/7',
  KE: '24/7',
  JP: 'business_hours',
  CN: 'business_hours',
  BR: '24/7',
  MX: '24/7',
  default: '24/7'
};

/**
 * Process instant settlement to merchant account
 * 
 * @param {Object} options - Settlement options
 * @param {string} options.transactionId - Original transaction ID
 * @param {number} options.amount - Amount to settle
 * @param {string} options.currency - Currency code
 * @param {string} options.merchantId - Merchant ID
 * @param {string} options.paymentMethod - Payment method used
 * @param {Object} options.destinationAccount - Destination account details
 * @returns {Promise<Object>} Settlement result
 */
export async function processInstantSettlement({
  transactionId,
  amount,
  currency,
  merchantId,
  paymentMethod,
  destinationAccount
}) {
  try {
    // Validate required parameters
    if (!transactionId || !amount || !currency || !merchantId || !destinationAccount) {
      throw new Error('Missing required parameters for instant settlement');
    }
    
    // Generate settlement ID
    const settlementId = uuidv4();
    
    // Get settlement speed for this payment method
    const settlementSpeed = SETTLEMENT_SPEEDS[paymentMethod] || SETTLEMENT_SPEEDS.default;
    
    // In a real implementation, this would initiate a real-time payment to the merchant's account
    // For this example, we'll simulate the settlement process
    
    // Simulate processing delay based on payment method
    await new Promise(resolve => setTimeout(resolve, settlementSpeed * 10)); // Scaled down for simulation
    
    // Calculate settlement fee (if any)
    const settlementFee = calculateSettlementFee({
      amount,
      currency,
      paymentMethod,
      merchantId
    });
    
    // Calculate net settlement amount
    const netSettlementAmount = amount - settlementFee.fee;
    
    // Record settlement timestamp
    const settlementTimestamp = new Date().toISOString();
    
    return {
      success: true,
      settlementId,
      originalTransactionId: transactionId,
      amount: netSettlementAmount,
      currency,
      fee: settlementFee,
      status: 'completed',
      type: SETTLEMENT_TYPES.INSTANT,
      timestamp: settlementTimestamp,
      destinationAccountType: destinationAccount.type,
      destinationAccountLast4: destinationAccount.last4 || 'xxxx',
      estimatedArrivalTime: settlementTimestamp // For instant settlement, arrival time is now
    };
  } catch (error) {
    console.error('Instant settlement error:', error);
    return {
      success: false,
      error: ERROR_CODES.SETTLEMENT_ERROR,
      message: error.message || 'Failed to process instant settlement'
    };
  }
}

/**
 * Calculate settlement fee for instant settlements
 * 
 * @param {Object} options - Fee calculation options
 * @param {number} options.amount - Settlement amount
 * @param {string} options.currency - Currency code
 * @param {string} options.paymentMethod - Payment method
 * @param {string} options.merchantId - Merchant ID
 * @returns {Object} Settlement fee details
 */
function calculateSettlementFee({ amount, currency, paymentMethod, merchantId }) {
  // Base fee is 1% for instant settlement
  let feePercentage = 1.0;
  
  // Adjust based on payment method
  switch (paymentMethod) {
    case PAYMENT_METHODS.BANK_TRANSFER:
      feePercentage = 0.5; // Lower fee for bank transfers
      break;
    case PAYMENT_METHODS.MOBILE_MONEY:
      feePercentage = 0.8; // Medium fee for mobile money
      break;
    case PAYMENT_METHODS.CRYPTO:
      feePercentage = 0.2; // Very low fee for crypto
      break;
    default:
      feePercentage = 1.0; // Standard fee for other methods
  }
  
  // Calculate fee amount
  const feeAmount = Math.round((amount * feePercentage) / 100);
  
  return {
    fee: feeAmount,
    percentage: feePercentage,
    currency
  };
}

/**
 * Check if instant settlement is available for a specific region and time
 * 
 * @param {string} countryCode - Country code
 * @param {Date} settlementTime - Time of settlement request
 * @returns {boolean} Whether instant settlement is available
 */
export function isInstantSettlementAvailable(countryCode, settlementTime = new Date()) {
  // Get availability for this region
  const availability = SETTLEMENT_AVAILABILITY[countryCode] || SETTLEMENT_AVAILABILITY.default;
  
  // If 24/7, always available
  if (availability === '24/7') {
    return true;
  }
  
  // For business hours, check if current time is within business hours
  // Business hours defined as 9 AM to 5 PM local time, Monday to Friday
  const day = settlementTime.getDay();
  const hour = settlementTime.getHours();
  
  // Check if weekend (0 = Sunday, 6 = Saturday)
  if (day === 0 || day === 6) {
    return false;
  }
  
  // Check if within business hours
  return hour >= 9 && hour < 17;
}