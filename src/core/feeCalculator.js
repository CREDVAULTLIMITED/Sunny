/**
 * Sunny Payment Gateway - Fee Calculator
 * 
 * Transparent fee calculation for all payment methods and regions
 */

import { FEE_TYPES } from './constants.js';

// Base fee structure by payment method
const BASE_FEE_STRUCTURE = {
  card: {
    percentage: 2.9,
    fixed: 30, // cents
  },
  bank_transfer: {
    percentage: 0.8,
    fixed: 25,
  },
  mobile_money: {
    percentage: 2.5,
    fixed: 15,
  },
  crypto: {
    percentage: 1.0,
    fixed: 0,
  },
  upi: {
    percentage: 1.8,
    fixed: 10,
  },
  alipay: {
    percentage: 2.5,
    fixed: 20,
  },
  wechat: {
    percentage: 2.5,
    fixed: 20,
  },
  apple_pay: {
    percentage: 2.9,
    fixed: 30,
  },
  google_pay: {
    percentage: 2.9,
    fixed: 30,
  },
  default: {
    percentage: 3.0,
    fixed: 30,
  }
};

// Merchant tier discounts
const MERCHANT_TIER_DISCOUNTS = {
  standard: {
    percentage: 0,
    fixed: 0,
  },
  premium: {
    percentage: 0.3,
    fixed: 5,
  },
  enterprise: {
    percentage: 0.5,
    fixed: 10,
  }
};

// Regional adjustments
const REGIONAL_ADJUSTMENTS = {
  US: { percentage: 0, fixed: 0 },
  CA: { percentage: 0.1, fixed: 0 },
  GB: { percentage: 0.1, fixed: 0 },
  EU: { percentage: 0.2, fixed: 0 },
  IN: { percentage: -0.5, fixed: -5 }, // Lower fees in India
  NG: { percentage: -0.3, fixed: -5 }, // Lower fees in Nigeria
  KE: { percentage: -0.3, fixed: -5 }, // Lower fees in Kenya
  BR: { percentage: 0.3, fixed: 5 },   // Higher fees in Brazil
  JP: { percentage: 0.2, fixed: 5 },   // Higher fees in Japan
};

// EU countries for regional grouping
const EU_COUNTRIES = [
  'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'PT', 'IE', 'AT', 
  'FI', 'SE', 'DK', 'PL', 'CZ', 'HU', 'RO', 'BG', 'GR', 'HR'
];

/**
 * Calculate fees for a transaction with transparent breakdown
 * 
 * @param {Object} options - Fee calculation options
 * @param {number} options.amount - Transaction amount in smallest currency unit
 * @param {string} options.currency - Currency code
 * @param {string} options.paymentMethod - Payment method
 * @param {string} options.country - Country code
 * @param {string} options.merchantTier - Merchant tier (standard, premium, enterprise)
 * @returns {Object} Fee breakdown
 */
export function calculateFees({ amount, currency, paymentMethod, country, merchantTier = 'standard' }) {
  // Get base fee structure for the payment method
  const baseFee = BASE_FEE_STRUCTURE[paymentMethod] || BASE_FEE_STRUCTURE.default;
  
  // Get merchant tier discount
  const tierDiscount = MERCHANT_TIER_DISCOUNTS[merchantTier] || MERCHANT_TIER_DISCOUNTS.standard;
  
  // Get regional adjustment
  let regionalAdjustment;
  if (EU_COUNTRIES.includes(country)) {
    regionalAdjustment = REGIONAL_ADJUSTMENTS.EU || { percentage: 0, fixed: 0 };
  } else {
    regionalAdjustment = REGIONAL_ADJUSTMENTS[country] || { percentage: 0, fixed: 0 };
  }
  
  // Calculate final fee rates
  const finalPercentage = Math.max(0, baseFee.percentage - tierDiscount.percentage + regionalAdjustment.percentage);
  const finalFixed = Math.max(0, baseFee.fixed - tierDiscount.fixed + regionalAdjustment.fixed);
  
  // Calculate fee amounts
  const percentageFee = Math.round((amount * finalPercentage) / 100);
  const fixedFee = finalFixed;
  const totalFee = percentageFee + fixedFee;
  
  // Calculate net amount
  const netAmount = amount - totalFee;
  
  return {
    currency,
    baseFee: {
      percentage: baseFee.percentage,
      fixed: baseFee.fixed,
      currency
    },
    discounts: {
      percentage: tierDiscount.percentage,
      fixed: tierDiscount.fixed,
      reason: `${merchantTier} tier discount`
    },
    regionalAdjustment: {
      percentage: regionalAdjustment.percentage,
      fixed: regionalAdjustment.fixed,
      region: EU_COUNTRIES.includes(country) ? 'EU' : country
    },
    finalRate: {
      percentage: finalPercentage,
      fixed: finalFixed
    },
    breakdown: {
      percentageFee,
      fixedFee,
      totalFee
    },
    grossAmount: amount,
    netAmount,
    feePercentage: (totalFee / amount) * 100
  };
}

/**
 * Calculate currency conversion fee
 * 
 * @param {Object} options - Conversion options
 * @param {number} options.amount - Amount to convert
 * @param {string} options.fromCurrency - Source currency
 * @param {string} options.toCurrency - Target currency
 * @param {string} options.merchantTier - Merchant tier
 * @returns {Object} Conversion fee details
 */
export function calculateConversionFee({ amount, fromCurrency, toCurrency, merchantTier = 'standard' }) {
  // Base conversion fee is 2% for standard tier
  let conversionPercentage = 2.0;
  
  // Apply tier discounts
  if (merchantTier === 'premium') {
    conversionPercentage = 1.5;
  } else if (merchantTier === 'enterprise') {
    conversionPercentage = 1.0;
  }
  
  const conversionFee = Math.round((amount * conversionPercentage) / 100);
  
  return {
    fromCurrency,
    toCurrency,
    amount,
    conversionPercentage,
    conversionFee,
    netAmount: amount - conversionFee,
    feeType: FEE_TYPES.CURRENCY_CONVERSION
  };
}

/**
 * Calculate refund fee
 * 
 * @param {Object} options - Refund options
 * @param {number} options.amount - Refund amount
 * @param {string} options.currency - Currency code
 * @param {string} options.paymentMethod - Original payment method
 * @param {string} options.merchantTier - Merchant tier
 * @returns {Object} Refund fee details
 */
export function calculateRefundFee({ amount, currency, paymentMethod, merchantTier = 'standard' }) {
  // No percentage fee on refunds, only fixed fee
  let fixedFee = 0;
  
  // Only charge refund fee for card payments
  if (paymentMethod === 'card') {
    fixedFee = 30; // 30 cents
    
    // Apply tier discounts
    if (merchantTier === 'premium') {
      fixedFee = 20;
    } else if (merchantTier === 'enterprise') {
      fixedFee = 0; // No refund fee for enterprise
    }
  }
  
  return {
    currency,
    refundAmount: amount,
    fixedFee,
    netRefund: amount - fixedFee,
    feeType: FEE_TYPES.REFUND
  };
}