"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateFees = calculateFees;
exports["default"] = void 0;
var _constants = require("./constants.js");
var _BASE_FEE_RATES;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - Fee Calculator
 * 
 * Calculates transaction fees with transparent breakdown
 */
// Base fee rates by payment method (percentage)
var BASE_FEE_RATES = (_BASE_FEE_RATES = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_BASE_FEE_RATES, _constants.PAYMENT_METHODS.CARD, 2.9), _constants.PAYMENT_METHODS.BANK_TRANSFER, 1.0), _constants.PAYMENT_METHODS.MOBILE_MONEY, 2.5), _constants.PAYMENT_METHODS.CRYPTO, 1.5), _constants.PAYMENT_METHODS.UPI, 1.8), _constants.PAYMENT_METHODS.ALIPAY, 2.7), _constants.PAYMENT_METHODS.WECHAT, 2.7), _constants.PAYMENT_METHODS.APPLE_PAY, 2.9), _constants.PAYMENT_METHODS.GOOGLE_PAY, 2.9), _constants.PAYMENT_METHODS.PAYPAL, 3.5), _defineProperty(_defineProperty(_defineProperty(_BASE_FEE_RATES, _constants.PAYMENT_METHODS.QR_CODE, 1.8), _constants.PAYMENT_METHODS.CASH, 0.5), _constants.PAYMENT_METHODS.OFFLINE, 1.0));

// Fixed fee by currency (in smallest currency unit)
var FIXED_FEES = {
  'USD': 30,
  // 30 cents
  'EUR': 25,
  // 25 cents
  'GBP': 20,
  // 20 pence
  'JPY': 40,
  // 40 yen
  'INR': 20,
  // 20 paise
  'KES': 30,
  // 30 cents
  'NGN': 100,
  // 100 kobo
  'ZAR': 50,
  // 50 cents
  'GHS': 50,
  // 50 pesewas
  // Default for other currencies
  'DEFAULT': 30
};

// Cross-border fee additional percentage
var CROSS_BORDER_FEE = 1.0;

// Merchant tier discounts (percentage points off base rate)
var MERCHANT_TIER_DISCOUNTS = {
  'standard': 0.0,
  'premium': 0.3,
  'enterprise': 0.5,
  'partner': 0.7
};

// Volume-based discounts
var VOLUME_DISCOUNTS = [{
  threshold: 100000,
  discount: 0.1
}, {
  threshold: 500000,
  discount: 0.2
}, {
  threshold: 1000000,
  discount: 0.3
}, {
  threshold: 5000000,
  discount: 0.5
}];

/**
 * Calculate fees for a transaction
 * 
 * @param {Object} options - Fee calculation options
 * @param {number} options.amount - Transaction amount
 * @param {string} options.currency - Currency code
 * @param {string} options.paymentMethod - Payment method
 * @param {string} options.country - Country code
 * @param {string} options.merchantTier - Merchant tier
 * @param {boolean} options.isCrossBorder - Whether transaction is cross-border
 * @param {number} options.monthlyVolume - Monthly transaction volume
 * @returns {Object} Fee details
 */
function calculateFees(options) {
  var amount = options.amount,
    currency = options.currency,
    _options$paymentMetho = options.paymentMethod,
    paymentMethod = _options$paymentMetho === void 0 ? _constants.PAYMENT_METHODS.CARD : _options$paymentMetho,
    _options$country = options.country,
    country = _options$country === void 0 ? 'US' : _options$country,
    _options$merchantTier = options.merchantTier,
    merchantTier = _options$merchantTier === void 0 ? 'standard' : _options$merchantTier,
    _options$isCrossBorde = options.isCrossBorder,
    isCrossBorder = _options$isCrossBorde === void 0 ? false : _options$isCrossBorde,
    _options$monthlyVolum = options.monthlyVolume,
    monthlyVolume = _options$monthlyVolum === void 0 ? 0 : _options$monthlyVolum;

  // Get base fee rate for payment method
  var baseFeeRate = BASE_FEE_RATES[paymentMethod] || BASE_FEE_RATES[_constants.PAYMENT_METHODS.CARD];

  // Apply merchant tier discount
  var tierDiscount = MERCHANT_TIER_DISCOUNTS[merchantTier] || 0;
  var adjustedFeeRate = Math.max(0, baseFeeRate - tierDiscount);

  // Apply volume-based discount
  var volumeDiscount = 0;
  var _iterator = _createForOfIteratorHelper(VOLUME_DISCOUNTS),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tier = _step.value;
      if (monthlyVolume >= tier.threshold) {
        volumeDiscount = tier.discount;
      } else {
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  adjustedFeeRate = Math.max(0, adjustedFeeRate - volumeDiscount);

  // Calculate percentage fee
  var percentageFee = Math.round(amount * adjustedFeeRate / 100);

  // Get fixed fee for currency
  var fixedFee = FIXED_FEES[currency] || FIXED_FEES.DEFAULT;

  // Calculate cross-border fee if applicable
  var crossBorderFee = 0;
  if (isCrossBorder) {
    crossBorderFee = Math.round(amount * CROSS_BORDER_FEE / 100);
  }

  // Calculate total fee
  var totalFee = percentageFee + fixedFee + crossBorderFee;

  // Calculate net amount
  var netAmount = amount - totalFee;

  // Return fee details
  return {
    total: totalFee,
    percentage: percentageFee,
    fixed: fixedFee,
    crossBorder: crossBorderFee,
    rate: {
      base: baseFeeRate,
      adjusted: adjustedFeeRate,
      tierDiscount: tierDiscount,
      volumeDiscount: volumeDiscount
    },
    currency: currency,
    netAmount: netAmount
  };
}
var _default = exports["default"] = {
  calculateFees: calculateFees
};