/**
 * Currency Configuration
 * 
 * Currency settings, exchange rates, and conversion rules for the Sunny Payment Gateway
 */

import config from './config.js';

// List of supported currencies with their properties
const currencies = {
  // Major currencies
  USD: {
    name: 'US Dollar',
    symbol: '$',
    code: 'USD',
    decimals: 2,
    countries: ['US', 'EC', 'SV', 'MH', 'FM', 'PW', 'PA', 'ZW'],
    isDefault: true
  },
  EUR: {
    name: 'Euro',
    symbol: '€',
    code: 'EUR',
    decimals: 2,
    countries: ['DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'AT', 'FI', 'IE', 'LU', 'GR', 'SK', 'SI', 'LT', 'LV', 'EE', 'CY', 'MT'],
    isEuropean: true
  },
  GBP: {
    name: 'British Pound',
    symbol: '£',
    code: 'GBP',
    decimals: 2,
    countries: ['GB']
  },
  CAD: {
    name: 'Canadian Dollar',
    symbol: 'C$',
    code: 'CAD',
    decimals: 2,
    countries: ['CA']
  },
  AUD: {
    name: 'Australian Dollar',
    symbol: 'A$',
    code: 'AUD',
    decimals: 2,
    countries: ['AU']
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: '¥',
    code: 'JPY',
    decimals: 0, // JPY has no cents
    countries: ['JP']
  },
  
  // Asian currencies
  CNY: {
    name: 'Chinese Yuan',
    symbol: '¥',
    code: 'CNY',
    decimals: 2,
    countries: ['CN']
  },
  HKD: {
    name: 'Hong Kong Dollar',
    symbol: 'HK$',
    code: 'HKD',
    decimals: 2,
    countries: ['HK']
  },
  SGD: {
    name: 'Singapore Dollar',
    symbol: 'S$',
    code: 'SGD',
    decimals: 2,
    countries: ['SG']
  },
  INR: {
    name: 'Indian Rupee',
    symbol: '₹',
    code: 'INR',
    decimals: 2,
    countries: ['IN']
  },
  
  // African currencies
  KES: {
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    code: 'KES',
    decimals: 2,
    countries: ['KE'],
    supportsMobileMoney: true // Has M-Pesa support
  },
  NGN: {
    name: 'Nigerian Naira',
    symbol: '₦',
    code: 'NGN',
    decimals: 2,
    countries: ['NG']
  },
  ZAR: {
    name: 'South African Rand',
    symbol: 'R',
    code: 'ZAR',
    decimals: 2,
    countries: ['ZA']
  },
  
  // Crypto currencies
  BTC: {
    name: 'Bitcoin',
    symbol: '₿',
    code: 'BTC',
    decimals: 8,
    isCrypto: true,
    countries: [] // Global
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'Ξ',
    code: 'ETH',
    decimals: 18,
    isCrypto: true,
    countries: [] // Global
  },
  USDT: {
    name: 'Tether',
    symbol: '₮',
    code: 'USDT',
    decimals: 6,
    isCrypto: true,
    isStablecoin: true,
    countries: [] // Global
  },
  USDC: {
    name: 'USD Coin',
    symbol: '$',
    code: 'USDC',
    decimals: 6,
    isCrypto: true,
    isStablecoin: true,
    countries: [] // Global
  }
  
  // Add more currencies as needed
};

// Exchange rate provider settings
const exchangeRateProviders = {
  // Default exchange rate provider
  default: {
    name: process.env.EXCHANGE_RATE_PROVIDER || 'openexchangerates',
    apiKey: process.env.EXCHANGE_RATE_API_KEY,
    updateInterval: parseInt(process.env.EXCHANGE_RATE_UPDATE_INTERVAL, 10) || 3600000, // 1 hour in ms
    baseUrl: process.env.EXCHANGE_RATE_API_URL || 'https://openexchangerates.org/api',
    baseCurrency: process.env.EXCHANGE_RATE_BASE_CURRENCY || 'USD'
  },
  
  // Cryptocurrency exchange rate provider
  crypto: {
    name: process.env.CRYPTO_EXCHANGE_RATE_PROVIDER || 'coinbase',
    apiKey: process.env.CRYPTO_EXCHANGE_RATE_API_KEY,
    updateInterval: parseInt(process.env.CRYPTO_EXCHANGE_RATE_UPDATE_INTERVAL, 10) || 300000, // 5 minutes in ms
    baseUrl: process.env.CRYPTO_EXCHANGE_RATE_API_URL || 'https://api.coinbase.com/v2'
  }
};

// Currency conversion settings
const conversionSettings = {
  // Enable currency conversion
  enabled: config.features.enableCurrencyConversion !== false,
  
  // Default markup percentage for currency conversion
  defaultMarkupPercentage: parseFloat(process.env.DEFAULT_CONVERSION_MARKUP) || 2.5,
  
  // Markup percentage for specific currency pairs (from->to)
  pairMarkupPercentage: {
    'USD-EUR': 2.0,
    'EUR-USD': 2.0,
    'USD-GBP': 2.2,
    'GBP-USD': 2.2
    // Add more pairs as needed
  },
  
  // Minimum allowed markup percentage
  minMarkupPercentage: 0.5,
  
  // Maximum allowed markup percentage
  maxMarkupPercentage: 5.0,
  
  // Cached exchange rates validity time (in ms)
  cacheValidityTime: 3600000 // 1 hour
};

// Currency formatting settings for display
const formatting = {
  // Default format options
  default: {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  
  // Currency-specific format overrides
  overrides: {
    'JPY': {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    },
    'BTC': {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    },
    'ETH': {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }
  }
};

// Payment method specific currency restrictions
const paymentMethodRestrictions = {
  // Stripe supports a wide range of currencies
  card: Object.keys(currencies).filter(code => !currencies[code].isCrypto),
  
  // PayPal supported currencies
  paypal: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'MXN', 'BRL', 'SGD', 'HKD', 'PHP', 'THB', 'TWD'],
  
  // Mobile money supported currencies
  mobileMoney: {
    mpesa: ['KES'] // M-Pesa primarily uses KES
  },
  
  // Bank transfer supported currencies by method
  bankTransfer: {
    ach: ['USD'],
    sepa: ['EUR'],
    wire: Object.keys(currencies).filter(code => !currencies[code].isCrypto),
    uk: ['GBP']
  },
  
  // Cryptocurrency specific restrictions
  crypto: Object.keys(currencies).filter(code => currencies[code].isCrypto)
};

// Function to format currency based on locale and currency code
const formatCurrency = (amount, currencyCode, locale = 'en-US') => {
  const currencyInfo = currencies[currencyCode] || currencies.USD;
  const decimals = currencyInfo.decimals;
  
  const formatOptions = {
    ...formatting.default,
    currency: currencyCode,
    ...(formatting.overrides[currencyCode] || {})
  };
  
  // Special case for cryptocurrencies with variable decimal display
  if (currencyInfo.isCrypto) {
    // For smaller amounts, show more decimals
    if (amount < 0.01) {
      formatOptions.minimumFractionDigits = 6;
      formatOptions.maximumFractionDigits = 8;
    } else if (amount < 1) {
      formatOptions.minimumFractionDigits = 4;
      formatOptions.maximumFractionDigits = 6;
    }
  }
  
  return new Intl.NumberFormat(locale, formatOptions).format(amount);
};

// Function to convert currency amount
const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Get conversion rate
  const rate = rates[`${fromCurrency}-${toCurrency}`];
  if (!rate) {
    throw new Error(`No exchange rate available for ${fromCurrency} to ${toCurrency}`);
  }
  
  // Get markup percentage
  let markup = conversionSettings.defaultMarkupPercentage;
  const pairKey = `${fromCurrency}-${toCurrency}`;
  if (conversionSettings.pairMarkupPercentage[pairKey]) {
    markup = conversionSettings.pairMarkupPercentage[pairKey];
  }
  
  // Apply markup
  const markupMultiplier = 1 + (markup / 100);
  const adjustedRate = rate * markupMultiplier;
  
  // Calculate converted amount
  const converted = amount * adjustedRate;
  
  // Format to the correct number of decimal places
  const decimals = currencies[toCurrency]?.decimals || 2;
  return parseFloat(converted.toFixed(decimals));
};

// Export the currency configuration
export default {
  currencies,
  exchangeRateProviders,
  conversionSettings,
  formatting,
  paymentMethodRestrictions,
  formatCurrency,
  convertCurrency,
  // Helper function to get supported currencies for a payment method
  getSupportedCurrencies: (paymentMethod, subMethod = null) => {
    if (subMethod && paymentMethodRestrictions[paymentMethod] && 
        paymentMethodRestrictions[paymentMethod][subMethod]) {
      return paymentMethodRestrictions[paymentMethod][subMethod];
    }
    
    return paymentMethodRestrictions[paymentMethod] || Object.keys(currencies);
  },
  // Helper function to get currency information
  getCurrencyInfo: (currencyCode) => {
    return currencies[currencyCode] || currencies.USD;
  }
};

