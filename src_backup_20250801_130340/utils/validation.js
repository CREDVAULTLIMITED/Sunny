/**
 * Card validation utilities
 */

export const validateCardData = (cardData) => {
  if (!cardData) {
    throw new Error('Card data is required');
  }

  const {
    number,
    expirationMonth,
    expirationYear,
    cvc,
    name
  } = cardData;

  // Validate card number using Luhn algorithm
  if (!validateCardNumber(number)) {
    throw new Error('Invalid card number');
  }

  // Validate expiration date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (!expirationMonth || !expirationYear) {
    throw new Error('Expiration date is required');
  }

  const expMonth = parseInt(expirationMonth, 10);
  const expYear = parseInt(expirationYear, 10);

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    throw new Error('Card has expired');
  }

  // Validate CVC
  if (!cvc || !/^\d{3,4}$/.test(cvc)) {
    throw new Error('Invalid CVC');
  }

  // Validate cardholder name
  if (!name || name.trim().length === 0) {
    throw new Error('Cardholder name is required');
  }
};

/**
 * Validate card number using Luhn algorithm
 */
const validateCardNumber = (number) => {
  if (!number || typeof number !== 'string') {
    return false;
  }

  // Remove any non-digit characters
  const digits = number.replace(/\D/g, '');

  if (digits.length < 12 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost side
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (sum % 10) === 0;
};

/**
 * Get card type from number
 */
export const getCardType = (number) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    dinersclub: /^3(?:0[0-5]|[68])/,
    jcb: /^35/
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) {
      return type;
    }
  }

  return 'unknown';
};
