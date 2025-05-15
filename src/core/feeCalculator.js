/**
 * feeCalculator.js
 * 
 * Calculates transaction fees based on payment method, amount, currency, and other factors
 */

import { PAYMENT_METHODS, FEE_TYPES, CURRENCIES, MOBILE_MONEY_PROVIDERS } from './constants';

// Fee configuration (in a real system, this would come from a database)
const feeConfig = {
  // Card payment fees
  [PAYMENT_METHODS.CARD]: {
    default: {
      type: FEE_TYPES.MIXED,
      percentage: 2.9,
      fixed: 0.30,
      currency: CURRENCIES.USD
    },
    // Different rates for different regions/cards
    [CURRENCIES.EUR]: {
      type: FEE_TYPES.MIXED,
      percentage: 1.9,
      fixed: 0.25,
      currency: CURRENCIES.EUR
    }
  },
  
  // Mobile money fees
  [PAYMENT_METHODS.MOBILE_MONEY]: {
    default: {
      type: FEE_TYPES.PERCENTAGE,
      percentage: 1.5,
      fixed: 0,
      currency: CURRENCIES.USD
    },
    // Provider-specific fees
    [MOBILE_MONEY_PROVIDERS.MPESA]: {
      type: FEE_TYPES.MIXED,
      percentage: 1.0,
      fixed: 10,
      currency: CURRENCIES.KES
    },
    [MOBILE_MONEY_PROVIDERS.MTN]: {
      type: FEE_TYPES.MIXED,
      percentage: 0.9,
      fixed: 100,
      currency: CURRENCIES.UGX
    }
  },
  
  // Bank transfer fees
  [PAYMENT_METHODS.BANK_TRANSFER]: {
    default: {
      type: FEE_TYPES.FIXED,
      percentage: 0,
      fixed: 1.00,
      currency: CURRENCIES.USD
    }
  },
  
  // Crypto payment fees
  [PAYMENT_METHODS.CRYPTO]: {
    default: {
      type: FEE_TYPES.PERCENTAGE,
      percentage: 1.0,
      fixed: 0,
      currency: CURRENCIES.USD
    }
  },
  
  // QR code payment fees
  [PAYMENT_METHODS.QR_CODE]: {
    default: {
      type: FEE_TYPES.PERCENTAGE,
      percentage: 1.0,
      fixed: 0,
      currency: CURRENCIES.USD
    }
  },
  
  // P2P transfer fees
  [PAYMENT_METHODS.P2P]: {
    default: {
      type: FEE_TYPES.FIXED,
      percentage: 0,
      fixed: 0.50,
      currency: CURRENCIES.USD
    }
  }
};

// Exchange rates for fee calculation (in a real system, this would be fetched from an API)
const exchangeRates = {
  [CURRENCIES.USD]: 1.0,
  [CURRENCIES.EUR]: 0.85,
  [CURRENCIES.GBP]: 0.75,
  [CURRENCIES.KES]: 130.0,
  [CURRENCIES.NGN]: 750.0,
  [CURRENCIES.ZAR]: 18.0,
  [CURRENCIES.GHS]: 12.0,
  [CURRENCIES.UGX]: 3700.0,
  [CURRENCIES.TZS]: 2500.0,
  [CURRENCIES.RWF]: 1200.0,
  [CURRENCIES.INR]: 83.0
};

/**
 * Calculate fees for a transaction
 * 
 * @param {Object} paymentDetails - Payment details
 * @returns {Object} Fee details
 */
export const calculateFees = (paymentDetails) => {
  const { paymentMethod, amount, currency } = paymentDetails;
  
  // Get the fee configuration for this payment method
  let feeStructure = feeConfig[paymentMethod]?.default;
  
  // Check for currency-specific fee structure
  if (feeConfig[paymentMethod]?.[currency]) {
    feeStructure = feeConfig[paymentMethod][currency];
  }
  
  // Check for provider-specific fee structure (for mobile money)
  if (paymentMethod === PAYMENT_METHODS.MOBILE_MONEY && 
      paymentDetails.mobileMoneyDetails?.provider &&
      feeConfig[paymentMethod][paymentDetails.mobileMoneyDetails.provider]) {
    feeStructure = feeConfig[paymentMethod][paymentDetails.mobileMoneyDetails.provider];
  }
  
  // If no fee structure found, use a default
  if (!feeStructure) {
    feeStructure = {
      type: FEE_TYPES.PERCENTAGE,
      percentage: 2.5,
      fixed: 0,
      currency: CURRENCIES.USD
    };
  }
  
  // Calculate fee based on type
  let fee = 0;
  
  switch (feeStructure.type) {
    case FEE_TYPES.PERCENTAGE:
      fee = (parseFloat(amount) * feeStructure.percentage) / 100;
      break;
      
    case FEE_TYPES.FIXED:
      fee = feeStructure.fixed;
      // Convert fee currency if needed
      if (currency !== feeStructure.currency) {
        fee = convertCurrency(fee, feeStructure.currency, currency);
      }
      break;
      
    case FEE_TYPES.MIXED:
      const percentageFee = (parseFloat(amount) * feeStructure.percentage) / 100;
      let fixedFee = feeStructure.fixed;
      
      // Convert fixed fee currency if needed
      if (currency !== feeStructure.currency) {
        fixedFee = convertCurrency(fixedFee, feeStructure.currency, currency);
      }
      
      fee = percentageFee + fixedFee;
      break;
      
    default:
      fee = 0;
  }
  
  // Apply volume discounts
  fee = applyVolumeDiscounts(fee, amount, paymentDetails);
  
  // Round to 2 decimal places
  fee = Math.round(fee * 100) / 100;
  
  return {
    fee,
    currency,
    feeType: feeStructure.type,
    percentage: feeStructure.percentage,
    fixed: feeStructure.fixed,
    fixedFeeCurrency: feeStructure.currency
  };
};

/**
 * Convert amount from one currency to another
 * 
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @returns {number} Converted amount
 */
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // If same currency, no conversion needed
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Get exchange rates
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromRate;
  const amountInTargetCurrency = amountInUSD * toRate;
  
  return amountInTargetCurrency;
};

/**
 * Apply volume discounts to fees
 * 
 * @param {number} fee - Calculated fee
 * @param {number} amount - Transaction amount
 * @param {Object} paymentDetails - Payment details
 * @returns {number} Fee with discounts applied
 */
const applyVolumeDiscounts = (fee, amount, paymentDetails) => {
  // Volume discount tiers (in a real system, this would be more sophisticated)
  if (amount >= 10000) {
    return fee * 0.7; // 30% discount for large transactions
  } else if (amount >= 5000) {
    return fee * 0.8; // 20% discount for medium-large transactions
  } else if (amount >= 1000) {
    return fee * 0.9; // 10% discount for medium transactions
  }
  
  return fee;
};

export default {
  calculateFees
};