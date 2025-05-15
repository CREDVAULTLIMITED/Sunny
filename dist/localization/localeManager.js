"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.detectLocale = detectLocale;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.getLocaleSettings = getLocaleSettings;
exports.translate = translate;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Sunny Payment Gateway - Locale Manager
 * 
 * Manages localization settings for the payment gateway
 */

// Default locale settings
var DEFAULT_LOCALE = 'en-US';

// Supported locales with their settings
var LOCALES = {
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
      total: 'Total'
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
      total: 'Total'
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
      total: 'Total'
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
      total: 'Total'
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
      total: 'Gesamt'
      // Add more translations as needed
    }
  }
  // Add more locales as needed
};

/**
 * Get locale settings for a specific locale
 * 
 * @param {string} locale - Locale code (e.g., 'en-US', 'fr-FR')
 * @returns {Object} Locale settings
 */
function getLocaleSettings() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LOCALE;
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
function formatCurrency(amount, currency) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LOCALE;
  var localeSettings = getLocaleSettings(locale);

  // Convert amount to decimal if it's in smallest currency unit
  // For example, convert 1000 cents to 10.00 dollars
  var decimalAmount = amount / 100;

  // Format the number according to locale
  var formattedNumber = decimalAmount.toFixed(2).replace('.', localeSettings.decimalSeparator).replace(/\B(?=(\d{3})+(?!\d))/g, localeSettings.thousandsSeparator);

  // Add currency symbol
  if (currency === localeSettings.currencyCode) {
    return "".concat(localeSettings.currencySymbol).concat(formattedNumber);
  } else {
    return "".concat(formattedNumber, " ").concat(currency);
  }
}

/**
 * Format date according to locale
 * 
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale code
 * @returns {string} Formatted date
 */
function formatDate(date) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOCALE;
  var localeSettings = getLocaleSettings(locale);
  var dateObj = typeof date === 'string' ? new Date(date) : date;

  // Format date according to locale
  var formattedDate = localeSettings.dateFormat.replace('YYYY', dateObj.getFullYear()).replace('MM', String(dateObj.getMonth() + 1).padStart(2, '0')).replace('DD', String(dateObj.getDate()).padStart(2, '0'));
  return formattedDate;
}

/**
 * Get translation for a key in the specified locale
 * 
 * @param {string} key - Translation key
 * @param {string} locale - Locale code
 * @returns {string} Translated text
 */
function translate(key) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOCALE;
  var localeSettings = getLocaleSettings(locale);
  return localeSettings.translations[key] || key;
}

/**
 * Detect user's locale from browser or headers
 * 
 * @param {Object} request - HTTP request object
 * @returns {string} Detected locale
 */
function detectLocale(request) {
  // Try to get locale from Accept-Language header
  if (request && request.headers && request.headers['accept-language']) {
    var acceptLanguage = request.headers['accept-language'];
    var languages = acceptLanguage.split(',').map(function (lang) {
      return lang.split(';')[0].trim();
    });

    // Find the first supported locale
    var _iterator = _createForOfIteratorHelper(languages),
      _step;
    try {
      var _loop = function _loop() {
          var lang = _step.value;
          if (LOCALES[lang]) {
            return {
              v: lang
            };
          }

          // Try to match language without region
          var langPrefix = lang.split('-')[0];
          var matchingLocale = Object.keys(LOCALES).find(function (locale) {
            return locale.startsWith(langPrefix);
          });
          if (matchingLocale) {
            return {
              v: matchingLocale
            };
          }
        },
        _ret;
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  // Default to en-US if no match found
  return DEFAULT_LOCALE;
}
var _default = exports["default"] = {
  getLocaleSettings: getLocaleSettings,
  formatCurrency: formatCurrency,
  formatDate: formatDate,
  translate: translate,
  detectLocale: detectLocale
};