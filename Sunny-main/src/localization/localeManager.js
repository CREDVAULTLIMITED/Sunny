/**
 * Sunny Payment Gateway - Locale Manager
 * 
 * Handles localization and internationalization for the payment gateway
 */

// Supported locales with their display names
const SUPPORTED_LOCALES = {
  'en-US': 'English (United States)',
  'en-GB': 'English (United Kingdom)',
  'es-ES': 'Español (España)',
  'es-MX': 'Español (México)',
  'fr-FR': 'Français (France)',
  'fr-CA': 'Français (Canada)',
  'de-DE': 'Deutsch (Deutschland)',
  'it-IT': 'Italiano (Italia)',
  'pt-BR': 'Português (Brasil)',
  'nl-NL': 'Nederlands (Nederland)',
  'sv-SE': 'Svenska (Sverige)',
  'no-NO': 'Norsk (Norge)',
  'da-DK': 'Dansk (Danmark)',
  'fi-FI': 'Suomi (Suomi)',
  'ja-JP': '日本語 (日本)',
  'zh-CN': '中文 (中国)',
  'zh-TW': '中文 (台灣)',
  'ko-KR': '한국어 (대한민국)',
  'ru-RU': 'Русский (Россия)',
  'pl-PL': 'Polski (Polska)',
  'tr-TR': 'Türkçe (Türkiye)',
  'ar-SA': 'العربية (المملكة العربية السعودية)',
  'hi-IN': 'हिन्दी (भारत)',
  'th-TH': 'ไทย (ประเทศไทย)',
  'id-ID': 'Bahasa Indonesia (Indonesia)',
  'vi-VN': 'Tiếng Việt (Việt Nam)',
  'sw-KE': 'Kiswahili (Kenya)'
};

// Currency formatting by locale
const CURRENCY_FORMATS = {
  'en-US': { style: 'currency', currencyDisplay: 'symbol' },
  'en-GB': { style: 'currency', currencyDisplay: 'symbol' },
  'ja-JP': { style: 'currency', currencyDisplay: 'symbol' },
  'zh-CN': { style: 'currency', currencyDisplay: 'symbol' },
  'default': { style: 'currency', currencyDisplay: 'symbol' }
};

// Date formatting by locale
const DATE_FORMATS = {
  'en-US': { month: 'short', day: 'numeric', year: 'numeric' },
  'en-GB': { day: 'numeric', month: 'short', year: 'numeric' },
  'de-DE': { day: 'numeric', month: 'numeric', year: 'numeric' },
  'ja-JP': { year: 'numeric', month: 'numeric', day: 'numeric' },
  'default': { year: 'numeric', month: 'numeric', day: 'numeric' }
};

// Payment method display names by locale
const PAYMENT_METHOD_NAMES = {
  'en-US': {
    card: 'Credit or Debit Card',
    bank_transfer: 'Bank Transfer',
    mobile_money: 'Mobile Money',
    crypto: 'Cryptocurrency',
    apple_pay: 'Apple Pay',
    google_pay: 'Google Pay'
  },
  'es-ES': {
    card: 'Tarjeta de Crédito o Débito',
    bank_transfer: 'Transferencia Bancaria',
    mobile_money: 'Dinero Móvil',
    crypto: 'Criptomoneda',
    apple_pay: 'Apple Pay',
    google_pay: 'Google Pay'
  },
  'fr-FR': {
    card: 'Carte de Crédit ou Débit',
    bank_transfer: 'Virement Bancaire',
    mobile_money: 'Argent Mobile',
    crypto: 'Cryptomonnaie',
    apple_pay: 'Apple Pay',
    google_pay: 'Google Pay'
  },
  'default': {
    card: 'Card',
    bank_transfer: 'Bank Transfer',
    mobile_money: 'Mobile Money',
    crypto: 'Crypto',
    apple_pay: 'Apple Pay',
    google_pay: 'Google Pay'
  }
};

/**
 * Get locale settings for a specific locale or detect from browser
 * 
 * @param {Object} options - Locale options
 * @param {string} options.locale - Specific locale to use
 * @param {boolean} options.autoDetect - Whether to auto-detect locale
 * @param {string} options.fallbackLocale - Fallback locale if detection fails
 * @returns {Object} Locale settings
 */
export function getLocaleSettings({ locale, autoDetect = false, fallbackLocale = 'en-US' }) {
  let selectedLocale = locale;
  
  // Auto-detect locale if requested
  if (autoDetect && typeof navigator !== 'undefined') {
    const browserLocale = navigator.language;
    if (SUPPORTED_LOCALES[browserLocale]) {
      selectedLocale = browserLocale;
    }
  }
  
  // Use fallback if locale not supported
  if (!selectedLocale || !SUPPORTED_LOCALES[selectedLocale]) {
    selectedLocale = fallbackLocale;
  }
  
  // Get currency format for this locale
  const currencyFormat = CURRENCY_FORMATS[selectedLocale] || CURRENCY_FORMATS.default;
  
  // Get date format for this locale
  const dateFormat = DATE_FORMATS[selectedLocale] || DATE_FORMATS.default;
  
  // Get payment method names for this locale
  const paymentMethodNames = PAYMENT_METHOD_NAMES[selectedLocale] || PAYMENT_METHOD_NAMES.default;
  
  return {
    locale: selectedLocale,
    displayName: SUPPORTED_LOCALES[selectedLocale],
    currencyFormat,
    dateFormat,
    paymentMethodNames,
    direction: isRTL(selectedLocale) ? 'rtl' : 'ltr'
  };
}

/**
 * Format currency amount according to locale
 * 
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @param {string} locale - Locale to use for formatting
 * @returns {string} Formatted currency amount
 */
export function formatCurrency(amount, currency, locale = 'en-US') {
  const localeSettings = getLocaleSettings({ locale });
  
  // Convert from smallest currency unit to standard unit
  // e.g., cents to dollars, pence to pounds
  const standardAmount = amount / 100;
  
  try {
    return new Intl.NumberFormat(locale, {
      ...localeSettings.currencyFormat,
      currency
    }).format(standardAmount);
  } catch (error) {
    // Fallback to basic formatting
    return `${currency} ${standardAmount.toFixed(2)}`;
  }
}

/**
 * Format date according to locale
 * 
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale to use for formatting
 * @returns {string} Formatted date
 */
export function formatDate(date, locale = 'en-US') {
  const localeSettings = getLocaleSettings({ locale });
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    return new Intl.DateTimeFormat(locale, localeSettings.dateFormat).format(dateObj);
  } catch (error) {
    // Fallback to ISO format
    return dateObj.toISOString().split('T')[0];
  }
}

/**
 * Get payment method display name for a locale
 * 
 * @param {string} paymentMethod - Payment method code
 * @param {string} locale - Locale to use
 * @returns {string} Localized payment method name
 */
export function getPaymentMethodName(paymentMethod, locale = 'en-US') {
  const localeSettings = getLocaleSettings({ locale });
  return localeSettings.paymentMethodNames[paymentMethod] || paymentMethod;
}

/**
 * Check if a locale is right-to-left
 * 
 * @param {string} locale - Locale to check
 * @returns {boolean} Whether the locale is RTL
 */
function isRTL(locale) {
  const rtlLocales = ['ar-SA', 'he-IL', 'fa-IR', 'ur-PK'];
  return rtlLocales.includes(locale);
}

/**
 * Get all supported locales
 * 
 * @returns {Object} Map of locale codes to display names
 */
export function getSupportedLocales() {
  return { ...SUPPORTED_LOCALES };
}