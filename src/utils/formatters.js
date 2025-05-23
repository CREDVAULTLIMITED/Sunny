/**
 * Format crypto amounts with appropriate decimal places
 */
export const formatCryptoAmount = (amount, cryptoType) => {
  const decimals = {
    BTC: 8,
    ETH: 18,
    USDT: 6,
    USDC: 6
  };

  const decimalPlaces = decimals[cryptoType] || 8;
  const formattedAmount = parseFloat(amount).toFixed(decimalPlaces);

  // Remove trailing zeros after decimal point
  return formattedAmount.replace(/\.?0+$/, '');
};

/**
 * Convert between fiat and crypto amounts
 */
export const convertAmount = (amount, fromCurrency, toCurrency, exchangeRates) => {
  if (!exchangeRates || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    throw new Error('Exchange rates not available');
  }

  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];

  const convertedAmount = (amount * fromRate) / toRate;
  return formatCryptoAmount(convertedAmount, toCurrency);
};

/**
 * Format blockchain address for display
 */
export const formatAddress = (address, numChars = 6) => {
  if (!address || address.length < (numChars * 2)) {
    return address;
  }

  const start = address.substring(0, numChars);
  const end = address.substring(address.length - numChars);
  return `${start}...${end}`;
};

/**
 * Calculate estimated confirmation time based on crypto type
 */
export const getEstimatedConfirmationTime = (cryptoType) => {
  const times = {
    BTC: 30, // ~30 minutes
    ETH: 5,  // ~5 minutes
    USDT: 5, // Follows ETH
    USDC: 5  // Follows ETH
  };

  return times[cryptoType] || 10;
};
