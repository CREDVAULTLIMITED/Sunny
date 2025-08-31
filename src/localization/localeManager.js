/**
 * Sunny Payment Gateway - Locale Manager
 * 
 * Manages localization settings for the payment gateway
 */

// Default locale settings
const DEFAULT_LOCALE = 'en-US';

// Supported locales with their settings
const LOCALES = {
  'en-US': {
    currencySymbol: '$',
    currencyCode: 'USD',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mm A',
    translations: {
      payNow: 'Pay Now',
      cancel: 'Cancel',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvc: 'CVC',
      nameOnCard: 'Name on Card',
      paymentSuccessful: 'Payment Successful',
      paymentFailed: 'Payment Failed',
      tryAgain: 'Try Again',
      processing: 'Processing...',
      amount: 'Amount',
      fee: 'Fee',
      total: 'Total',
      // Add more translations as needed
    }
  },
  'en-GB': {
    currencySymbol: '£',
    currencyCode: 'GBP',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    translations: {
      payNow: 'Pay Now',
      cancel: 'Cancel',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvc: 'CVC',
      nameOnCard: 'Name on Card',
      paymentSuccessful: 'Payment Successful',
      paymentFailed: 'Payment Failed',
      tryAgain: 'Try Again',
      processing: 'Processing...',
      amount: 'Amount',
      fee: 'Fee',
      total: 'Total',
      // Add more translations as needed
    }
  },
  'fr-FR': {
    currencySymbol: '€',
    currencyCode: 'EUR',
    thousandsSeparator: ' ',
    decimalSeparator: ',',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    translations: {
      payNow: 'Payer Maintenant',
      cancel: 'Annuler',
      cardNumber: 'Numéro de Carte',
      expiryDate: 'Date d\'Expiration',
      cvc: 'CVC',
      nameOnCard: 'Nom sur la Carte',
      paymentSuccessful: 'Paiement Réussi',
      paymentFailed: 'Paiement Échoué',
      tryAgain: 'Réessayer',
      processing: 'Traitement en cours...',
      amount: 'Montant',
      fee: 'Frais',
      total: 'Total',
      // Add more translations as needed
    }
  },
  'es-ES': {
    currencySymbol: '€',
    currencyCode: 'EUR',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    translations: {
      payNow: 'Pagar Ahora',
      cancel: 'Cancelar',
      cardNumber: 'Número de Tarjeta',
      expiryDate: 'Fecha de Caducidad',
      cvc: 'CVC',
      nameOnCard: 'Nombre en la Tarjeta',
      paymentSuccessful: 'Pago Exitoso',
      paymentFailed: 'Pago Fallido',
      tryAgain: 'Intentar de Nuevo',
      processing: 'Procesando...',
      amount: 'Importe',
      fee: 'Comisión',
      total: 'Total',
      // Add more translations as needed
    }
  },
  'de-DE': {
    currencySymbol: '€',
    currencyCode: 'EUR',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    translations: {
      payNow: 'Jetzt Bezahlen',
      cancel: 'Abbrechen',
      cardNumber: 'Kartennummer',
      expiryDate: 'Ablaufdatum',
      cvc: 'CVC',
      nameOnCard: 'Name auf der Karte',
      paymentSuccessful: 'Zahlung Erfolgreich',
      paymentFailed: 'Zahlung Fehlgeschlagen',
      tryAgain: 'Erneut Versuchen',
      processing: 'Verarbeitung...',
      amount: 'Betrag',
      fee: 'Gebühr',
      total: 'Gesamt',
      // Add more translations as needed
    }
  },
  // Add more locales as needed
};

/**
 * Get locale settings for a specific locale
 * 
 * @param {string} locale - Locale code (e.g., 'en-US', 'fr-FR')
 * @returns {Object} Locale settings
 */
export function getLocaleSettings(locale = DEFAULT_LOCALE) {
  return LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
}

/**
 * Format currency amount according to locale
 * 
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @param {string} locale - Locale code
 * @returns {string} Formatted currency amount
 */
export function formatCurrency(amount, currency, locale = DEFAULT_LOCALE) {
  const localeSettings = getLocaleSettings(locale);
  
  // Convert amount to decimal if it's in smallest currency unit
  // For example, convert 1000 cents to 10.00 dollars
  const decimalAmount = amount / 100;
  
  // Format the number according to locale
  const formattedNumber = decimalAmount.toFixed(2)
    .replace('.', localeSettings.decimalSeparator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, localeSettings.thousandsSeparator);
  
  // Add currency symbol
  if (currency === localeSettings.currencyCode) {
    return `${localeSettings.currencySymbol}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${currency}`;
  }
}

/**
 * Format date according to locale
 * 
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale code
 * @returns {string} Formatted date
 */
export function formatDate(date, locale = DEFAULT_LOCALE) {
  const localeSettings = getLocaleSettings(locale);
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Format date according to locale
  let formattedDate = localeSettings.dateFormat
    .replace('YYYY', dateObj.getFullYear())
    .replace('MM', String(dateObj.getMonth() + 1).padStart(2, '0'))
    .replace('DD', String(dateObj.getDate()).padStart(2, '0'));
  
  return formattedDate;
}

/**
 * Get translation for a key in the specified locale
 * 
 * @param {string} key - Translation key
 * @param {string} locale - Locale code
 * @returns {string} Translated text
 */
export function translate(key, locale = DEFAULT_LOCALE) {
  const localeSettings = getLocaleSettings(locale);
  return localeSettings.translations[key] || key;
}

/**
 * Detect user's locale from browser or headers
 * 
 * @param {Object} request - HTTP request object
 * @returns {string} Detected locale
 */
export function detectLocale(request) {
  // Try to get locale from Accept-Language header
  if (request && request.headers && request.headers['accept-language']) {
    const acceptLanguage = request.headers['accept-language'];
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    
    // Find the first supported locale
    for (const lang of languages) {
      if (LOCALES[lang]) {
        return lang;
      }
      
      // Try to match language without region
      const langPrefix = lang.split('-')[0];
      const matchingLocale = Object.keys(LOCALES).find(locale => locale.startsWith(langPrefix));
      if (matchingLocale) {
        return matchingLocale;
      }
    }
  }
  
  // Default to en-US if no match found
  return DEFAULT_LOCALE;
}

export default {
  getLocaleSettings,
  formatCurrency,
  formatDate,
  translate,
  detectLocale
};