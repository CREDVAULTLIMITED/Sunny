"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
var _uuid = require("uuid");
var _constants = require("../constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - Mobile Money Processor
 * 
 * Handles mobile money payments across multiple providers
 * Supports M-Pesa, Airtel Money, MTN Mobile Money, and others
 */
var MobileMoneyProcessor = /*#__PURE__*/function () {
  function MobileMoneyProcessor() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MobileMoneyProcessor);
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' ? 'https://mobilemoney.sunnypayments.com/v1' : 'https://sandbox-mobilemoney.sunnypayments.com/v1';

    // Provider-specific configurations
    this.providerConfigs = {
      mpesa: {
        apiKey: config.mpesaApiKey || process.env.SUNNY_MPESA_API_KEY,
        apiSecret: config.mpesaApiSecret || process.env.SUNNY_MPESA_API_SECRET,
        shortCode: config.mpesaShortCode || process.env.SUNNY_MPESA_SHORT_CODE,
        passkey: config.mpesaPasskey || process.env.SUNNY_MPESA_PASSKEY
      },
      airtel: {
        apiKey: config.airtelApiKey || process.env.SUNNY_AIRTEL_API_KEY,
        apiSecret: config.airtelApiSecret || process.env.SUNNY_AIRTEL_API_SECRET,
        merchantId: config.airtelMerchantId || process.env.SUNNY_AIRTEL_MERCHANT_ID
      },
      mtn: {
        apiKey: config.mtnApiKey || process.env.SUNNY_MTN_API_KEY,
        apiSecret: config.mtnApiSecret || process.env.SUNNY_MTN_API_SECRET,
        merchantId: config.mtnMerchantId || process.env.SUNNY_MTN_MERCHANT_ID
      },
      orange: {
        apiKey: config.orangeApiKey || process.env.SUNNY_ORANGE_API_KEY,
        apiSecret: config.orangeApiSecret || process.env.SUNNY_ORANGE_API_SECRET,
        merchantId: config.orangeMerchantId || process.env.SUNNY_ORANGE_MERCHANT_ID
      }
    };
  }

  /**
   * Process a mobile money payment
   * 
   * @param {Object} paymentData - Payment information
   * @param {string} paymentData.provider - Mobile money provider (mpesa, airtel, mtn, orange)
   * @param {string} paymentData.phoneNumber - Customer phone number
   * @param {string} paymentData.amount - Amount to charge
   * @param {string} paymentData.currency - Currency code
   * @param {string} paymentData.reference - Payment reference
   * @param {Object} paymentData.metadata - Additional payment metadata
   * @returns {Promise<Object>} Transaction result
   */
  return _createClass(MobileMoneyProcessor, [{
    key: "processPayment",
    value: (function () {
      var _processPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(paymentData) {
        var provider, phoneNumber, amount, currency, reference, metadata, normalizedPhone;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              provider = paymentData.provider, phoneNumber = paymentData.phoneNumber, amount = paymentData.amount, currency = paymentData.currency, reference = paymentData.reference, metadata = paymentData.metadata;
              if (!(!provider || !phoneNumber || !amount || !currency)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Provider, phone number, amount, and currency are required'
              });
            case 4:
              // Normalize phone number
              normalizedPhone = this.normalizePhoneNumber(phoneNumber, provider); // Process payment based on provider
              _context.t0 = provider.toLowerCase();
              _context.next = _context.t0 === 'mpesa' ? 8 : _context.t0 === 'airtel' ? 11 : _context.t0 === 'mtn' ? 14 : _context.t0 === 'orange' ? 17 : 20;
              break;
            case 8:
              _context.next = 10;
              return this.processMpesaPayment(_objectSpread(_objectSpread({}, paymentData), {}, {
                phoneNumber: normalizedPhone
              }));
            case 10:
              return _context.abrupt("return", _context.sent);
            case 11:
              _context.next = 13;
              return this.processAirtelPayment(_objectSpread(_objectSpread({}, paymentData), {}, {
                phoneNumber: normalizedPhone
              }));
            case 13:
              return _context.abrupt("return", _context.sent);
            case 14:
              _context.next = 16;
              return this.processMtnPayment(_objectSpread(_objectSpread({}, paymentData), {}, {
                phoneNumber: normalizedPhone
              }));
            case 16:
              return _context.abrupt("return", _context.sent);
            case 17:
              _context.next = 19;
              return this.processOrangePayment(_objectSpread(_objectSpread({}, paymentData), {}, {
                phoneNumber: normalizedPhone
              }));
            case 19:
              return _context.abrupt("return", _context.sent);
            case 20:
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.UNSUPPORTED_PROVIDER,
                message: "Unsupported mobile money provider: ".concat(provider)
              });
            case 21:
              _context.next = 27;
              break;
            case 23:
              _context.prev = 23;
              _context.t1 = _context["catch"](0);
              console.error('Mobile money payment error:', _context.t1);
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.MOBILE_MONEY_ERROR,
                message: _context.t1.message || 'Failed to process mobile money payment'
              });
            case 27:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 23]]);
      }));
      function processPayment(_x) {
        return _processPayment.apply(this, arguments);
      }
      return processPayment;
    }()
    /**
     * Initiate an STK push request
     * 
     * @param {Object} pushData - STK push information
     * @param {string} pushData.provider - Mobile money provider
     * @param {string} pushData.phoneNumber - Customer phone number
     * @param {string} pushData.amount - Amount to charge
     * @param {string} pushData.currency - Currency code
     * @param {string} pushData.reference - Payment reference
     * @param {string} pushData.description - Transaction description
     * @returns {Promise<Object>} STK push result
     */
    )
  }, {
    key: "initiateSTKPush",
    value: (function () {
      var _initiateSTKPush = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(pushData) {
        var provider, phoneNumber, amount, currency, reference, description, normalizedPhone, requestId;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              provider = pushData.provider, phoneNumber = pushData.phoneNumber, amount = pushData.amount, currency = pushData.currency, reference = pushData.reference, description = pushData.description;
              if (!(!provider || !phoneNumber || !amount || !currency)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Provider, phone number, amount, and currency are required'
              });
            case 4:
              // Normalize phone number
              normalizedPhone = this.normalizePhoneNumber(phoneNumber, provider); // Generate request ID
              requestId = (0, _uuid.v4)(); // Process STK push based on provider
              _context2.t0 = provider.toLowerCase();
              _context2.next = _context2.t0 === 'mpesa' ? 9 : _context2.t0 === 'airtel' ? 12 : _context2.t0 === 'mtn' ? 15 : 18;
              break;
            case 9:
              _context2.next = 11;
              return this.mpesaSTKPush({
                phoneNumber: normalizedPhone,
                amount: amount,
                currency: currency,
                reference: reference || "SUN".concat(requestId.substring(0, 8)),
                description: description || 'Sunny Payment',
                requestId: requestId
              });
            case 11:
              return _context2.abrupt("return", _context2.sent);
            case 12:
              _context2.next = 14;
              return this.airtelSTKPush({
                phoneNumber: normalizedPhone,
                amount: amount,
                currency: currency,
                reference: reference || "SUN".concat(requestId.substring(0, 8)),
                description: description || 'Sunny Payment',
                requestId: requestId
              });
            case 14:
              return _context2.abrupt("return", _context2.sent);
            case 15:
              _context2.next = 17;
              return this.mtnSTKPush({
                phoneNumber: normalizedPhone,
                amount: amount,
                currency: currency,
                reference: reference || "SUN".concat(requestId.substring(0, 8)),
                description: description || 'Sunny Payment',
                requestId: requestId
              });
            case 17:
              return _context2.abrupt("return", _context2.sent);
            case 18:
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.UNSUPPORTED_PROVIDER,
                message: "STK push not supported for provider: ".concat(provider)
              });
            case 19:
              _context2.next = 25;
              break;
            case 21:
              _context2.prev = 21;
              _context2.t1 = _context2["catch"](0);
              console.error('STK push error:', _context2.t1);
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.STK_PUSH_ERROR,
                message: _context2.t1.message || 'Failed to initiate STK push'
              });
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 21]]);
      }));
      function initiateSTKPush(_x2) {
        return _initiateSTKPush.apply(this, arguments);
      }
      return initiateSTKPush;
    }()
    /**
     * Check the status of a mobile money transaction
     * 
     * @param {Object} statusData - Status check information
     * @param {string} statusData.provider - Mobile money provider
     * @param {string} statusData.transactionId - Transaction ID to check
     * @returns {Promise<Object>} Transaction status
     */
    )
  }, {
    key: "checkTransactionStatus",
    value: (function () {
      var _checkTransactionStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(statusData) {
        var provider, transactionId;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              provider = statusData.provider, transactionId = statusData.transactionId;
              if (!(!provider || !transactionId)) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Provider and transaction ID are required'
              });
            case 4:
              _context3.t0 = provider.toLowerCase();
              _context3.next = _context3.t0 === 'mpesa' ? 7 : _context3.t0 === 'airtel' ? 10 : _context3.t0 === 'mtn' ? 13 : _context3.t0 === 'orange' ? 16 : 19;
              break;
            case 7:
              _context3.next = 9;
              return this.checkMpesaStatus(transactionId);
            case 9:
              return _context3.abrupt("return", _context3.sent);
            case 10:
              _context3.next = 12;
              return this.checkAirtelStatus(transactionId);
            case 12:
              return _context3.abrupt("return", _context3.sent);
            case 13:
              _context3.next = 15;
              return this.checkMtnStatus(transactionId);
            case 15:
              return _context3.abrupt("return", _context3.sent);
            case 16:
              _context3.next = 18;
              return this.checkOrangeStatus(transactionId);
            case 18:
              return _context3.abrupt("return", _context3.sent);
            case 19:
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.UNSUPPORTED_PROVIDER,
                message: "Unsupported mobile money provider: ".concat(provider)
              });
            case 20:
              _context3.next = 26;
              break;
            case 22:
              _context3.prev = 22;
              _context3.t1 = _context3["catch"](0);
              console.error('Transaction status check error:', _context3.t1);
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.STATUS_CHECK_ERROR,
                message: _context3.t1.message || 'Failed to check transaction status'
              });
            case 26:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 22]]);
      }));
      function checkTransactionStatus(_x3) {
        return _checkTransactionStatus.apply(this, arguments);
      }
      return checkTransactionStatus;
    }()
    /**
     * Process M-Pesa payment
     * 
     * @private
     * @param {Object} paymentData - Payment information
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processMpesaPayment",
    value: (function () {
      var _processMpesaPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(paymentData) {
        var phoneNumber, amount, currency, reference, metadata, transactionId;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              phoneNumber = paymentData.phoneNumber, amount = paymentData.amount, currency = paymentData.currency, reference = paymentData.reference, metadata = paymentData.metadata; // In a real implementation, this would make an API call to M-Pesa
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context4.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 3:
              // Generate transaction ID
              transactionId = "MPESA".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase());
              return _context4.abrupt("return", {
                success: true,
                provider: 'mpesa',
                transactionId: transactionId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'COMPLETED',
                processorResponse: {
                  receiptNumber: "M".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                  processorTransactionId: transactionId,
                  processorName: 'M-Pesa'
                },
                completedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function processMpesaPayment(_x4) {
        return _processMpesaPayment.apply(this, arguments);
      }
      return processMpesaPayment;
    }()
    /**
     * Process Airtel Money payment
     * 
     * @private
     * @param {Object} paymentData - Payment information
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processAirtelPayment",
    value: (function () {
      var _processAirtelPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(paymentData) {
        var phoneNumber, amount, currency, reference, metadata, transactionId;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              phoneNumber = paymentData.phoneNumber, amount = paymentData.amount, currency = paymentData.currency, reference = paymentData.reference, metadata = paymentData.metadata; // In a real implementation, this would make an API call to Airtel Money
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context5.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 3:
              // Generate transaction ID
              transactionId = "AIRTEL".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase());
              return _context5.abrupt("return", {
                success: true,
                provider: 'airtel',
                transactionId: transactionId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'COMPLETED',
                processorResponse: {
                  receiptNumber: "A".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                  processorTransactionId: transactionId,
                  processorName: 'Airtel Money'
                },
                completedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function processAirtelPayment(_x5) {
        return _processAirtelPayment.apply(this, arguments);
      }
      return processAirtelPayment;
    }()
    /**
     * Process MTN Mobile Money payment
     * 
     * @private
     * @param {Object} paymentData - Payment information
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processMtnPayment",
    value: (function () {
      var _processMtnPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(paymentData) {
        var phoneNumber, amount, currency, reference, metadata, transactionId;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              phoneNumber = paymentData.phoneNumber, amount = paymentData.amount, currency = paymentData.currency, reference = paymentData.reference, metadata = paymentData.metadata; // In a real implementation, this would make an API call to MTN Mobile Money
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context6.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 3:
              // Generate transaction ID
              transactionId = "MTN".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase());
              return _context6.abrupt("return", {
                success: true,
                provider: 'mtn',
                transactionId: transactionId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'COMPLETED',
                processorResponse: {
                  receiptNumber: "M".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                  processorTransactionId: transactionId,
                  processorName: 'MTN Mobile Money'
                },
                completedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function processMtnPayment(_x6) {
        return _processMtnPayment.apply(this, arguments);
      }
      return processMtnPayment;
    }()
    /**
     * Process Orange Money payment
     * 
     * @private
     * @param {Object} paymentData - Payment information
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processOrangePayment",
    value: (function () {
      var _processOrangePayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(paymentData) {
        var phoneNumber, amount, currency, reference, metadata, transactionId;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              phoneNumber = paymentData.phoneNumber, amount = paymentData.amount, currency = paymentData.currency, reference = paymentData.reference, metadata = paymentData.metadata; // In a real implementation, this would make an API call to Orange Money
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context7.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 3:
              // Generate transaction ID
              transactionId = "ORANGE".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase());
              return _context7.abrupt("return", {
                success: true,
                provider: 'orange',
                transactionId: transactionId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'COMPLETED',
                processorResponse: {
                  receiptNumber: "O".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                  processorTransactionId: transactionId,
                  processorName: 'Orange Money'
                },
                completedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function processOrangePayment(_x7) {
        return _processOrangePayment.apply(this, arguments);
      }
      return processOrangePayment;
    }()
    /**
     * Initiate M-Pesa STK push
     * 
     * @private
     * @param {Object} pushData - STK push information
     * @returns {Promise<Object>} STK push result
     */
    )
  }, {
    key: "mpesaSTKPush",
    value: (function () {
      var _mpesaSTKPush = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(pushData) {
        var phoneNumber, amount, currency, reference, description, requestId;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              phoneNumber = pushData.phoneNumber, amount = pushData.amount, currency = pushData.currency, reference = pushData.reference, description = pushData.description, requestId = pushData.requestId; // In a real implementation, this would make an API call to M-Pesa STK push
              // For this example, we'll simulate a successful STK push
              // Simulate processing delay
              _context8.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 3:
              return _context8.abrupt("return", {
                success: true,
                provider: 'mpesa',
                requestId: requestId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'INITIATED',
                checkoutRequestId: "WS".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()),
                message: 'STK push sent successfully. Please enter your PIN on your phone.',
                initiatedAt: new Date().toISOString()
              });
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function mpesaSTKPush(_x8) {
        return _mpesaSTKPush.apply(this, arguments);
      }
      return mpesaSTKPush;
    }()
    /**
     * Initiate Airtel Money STK push
     * 
     * @private
     * @param {Object} pushData - STK push information
     * @returns {Promise<Object>} STK push result
     */
    )
  }, {
    key: "airtelSTKPush",
    value: (function () {
      var _airtelSTKPush = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(pushData) {
        var phoneNumber, amount, currency, reference, description, requestId;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              phoneNumber = pushData.phoneNumber, amount = pushData.amount, currency = pushData.currency, reference = pushData.reference, description = pushData.description, requestId = pushData.requestId; // In a real implementation, this would make an API call to Airtel Money STK push
              // For this example, we'll simulate a successful STK push
              // Simulate processing delay
              _context9.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 3:
              return _context9.abrupt("return", {
                success: true,
                provider: 'airtel',
                requestId: requestId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'INITIATED',
                checkoutRequestId: "AS".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()),
                message: 'STK push sent successfully. Please enter your PIN on your phone.',
                initiatedAt: new Date().toISOString()
              });
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function airtelSTKPush(_x9) {
        return _airtelSTKPush.apply(this, arguments);
      }
      return airtelSTKPush;
    }()
    /**
     * Initiate MTN Mobile Money STK push
     * 
     * @private
     * @param {Object} pushData - STK push information
     * @returns {Promise<Object>} STK push result
     */
    )
  }, {
    key: "mtnSTKPush",
    value: (function () {
      var _mtnSTKPush = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(pushData) {
        var phoneNumber, amount, currency, reference, description, requestId;
        return _regeneratorRuntime().wrap(function _callee0$(_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              phoneNumber = pushData.phoneNumber, amount = pushData.amount, currency = pushData.currency, reference = pushData.reference, description = pushData.description, requestId = pushData.requestId; // In a real implementation, this would make an API call to MTN Mobile Money STK push
              // For this example, we'll simulate a successful STK push
              // Simulate processing delay
              _context0.next = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 3:
              return _context0.abrupt("return", {
                success: true,
                provider: 'mtn',
                requestId: requestId,
                phoneNumber: phoneNumber,
                amount: amount,
                currency: currency,
                reference: reference,
                status: 'INITIATED',
                checkoutRequestId: "MS".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()),
                message: 'STK push sent successfully. Please enter your PIN on your phone.',
                initiatedAt: new Date().toISOString()
              });
            case 4:
            case "end":
              return _context0.stop();
          }
        }, _callee0);
      }));
      function mtnSTKPush(_x0) {
        return _mtnSTKPush.apply(this, arguments);
      }
      return mtnSTKPush;
    }()
    /**
     * Check M-Pesa transaction status
     * 
     * @private
     * @param {string} transactionId - Transaction ID to check
     * @returns {Promise<Object>} Transaction status
     */
    )
  }, {
    key: "checkMpesaStatus",
    value: (function () {
      var _checkMpesaStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(transactionId) {
        var statusOptions, status;
        return _regeneratorRuntime().wrap(function _callee1$(_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              _context1.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 2:
              // Simulate different statuses with 80% success rate
              statusOptions = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'FAILED', 'CANCELLED'];
              status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
              return _context1.abrupt("return", {
                success: true,
                provider: 'mpesa',
                transactionId: transactionId,
                status: status,
                receiptNumber: status === 'COMPLETED' ? "M".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()) : null,
                reason: status === 'FAILED' ? 'Insufficient funds' : status === 'CANCELLED' ? 'User cancelled' : null,
                checkedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context1.stop();
          }
        }, _callee1);
      }));
      function checkMpesaStatus(_x1) {
        return _checkMpesaStatus.apply(this, arguments);
      }
      return checkMpesaStatus;
    }()
    /**
     * Check Airtel Money transaction status
     * 
     * @private
     * @param {string} transactionId - Transaction ID to check
     * @returns {Promise<Object>} Transaction status
     */
    )
  }, {
    key: "checkAirtelStatus",
    value: (function () {
      var _checkAirtelStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(transactionId) {
        var statusOptions, status;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 2:
              // Simulate different statuses with 80% success rate
              statusOptions = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'FAILED', 'CANCELLED'];
              status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
              return _context10.abrupt("return", {
                success: true,
                provider: 'airtel',
                transactionId: transactionId,
                status: status,
                receiptNumber: status === 'COMPLETED' ? "A".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()) : null,
                reason: status === 'FAILED' ? 'Insufficient funds' : status === 'CANCELLED' ? 'User cancelled' : null,
                checkedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function checkAirtelStatus(_x10) {
        return _checkAirtelStatus.apply(this, arguments);
      }
      return checkAirtelStatus;
    }()
    /**
     * Check MTN Mobile Money transaction status
     * 
     * @private
     * @param {string} transactionId - Transaction ID to check
     * @returns {Promise<Object>} Transaction status
     */
    )
  }, {
    key: "checkMtnStatus",
    value: (function () {
      var _checkMtnStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(transactionId) {
        var statusOptions, status;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 2:
              // Simulate different statuses with 80% success rate
              statusOptions = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'FAILED', 'CANCELLED'];
              status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
              return _context11.abrupt("return", {
                success: true,
                provider: 'mtn',
                transactionId: transactionId,
                status: status,
                receiptNumber: status === 'COMPLETED' ? "M".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()) : null,
                reason: status === 'FAILED' ? 'Insufficient funds' : status === 'CANCELLED' ? 'User cancelled' : null,
                checkedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function checkMtnStatus(_x11) {
        return _checkMtnStatus.apply(this, arguments);
      }
      return checkMtnStatus;
    }()
    /**
     * Check Orange Money transaction status
     * 
     * @private
     * @param {string} transactionId - Transaction ID to check
     * @returns {Promise<Object>} Transaction status
     */
    )
  }, {
    key: "checkOrangeStatus",
    value: (function () {
      var _checkOrangeStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(transactionId) {
        var statusOptions, status;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 2:
              // Simulate different statuses with 80% success rate
              statusOptions = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'FAILED', 'CANCELLED'];
              status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
              return _context12.abrupt("return", {
                success: true,
                provider: 'orange',
                transactionId: transactionId,
                status: status,
                receiptNumber: status === 'COMPLETED' ? "O".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()) : null,
                reason: status === 'FAILED' ? 'Insufficient funds' : status === 'CANCELLED' ? 'User cancelled' : null,
                checkedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function checkOrangeStatus(_x12) {
        return _checkOrangeStatus.apply(this, arguments);
      }
      return checkOrangeStatus;
    }()
    /**
     * Normalize phone number to international format
     * 
     * @private
     * @param {string} phoneNumber - Phone number to normalize
     * @param {string} provider - Mobile money provider
     * @returns {string} Normalized phone number
     */
    )
  }, {
    key: "normalizePhoneNumber",
    value: function normalizePhoneNumber(phoneNumber, provider) {
      // Remove any non-digit characters
      var normalized = phoneNumber.replace(/\D/g, '');

      // Add country code if missing
      if (provider.toLowerCase() === 'mpesa' && normalized.length === 9 && !normalized.startsWith('254')) {
        normalized = "254".concat(normalized);
      } else if (provider.toLowerCase() === 'mpesa' && normalized.startsWith('0')) {
        normalized = "254".concat(normalized.substring(1));
      } else if (provider.toLowerCase() === 'airtel' && normalized.length === 9 && !normalized.startsWith('256')) {
        normalized = "256".concat(normalized);
      } else if (provider.toLowerCase() === 'airtel' && normalized.startsWith('0')) {
        normalized = "256".concat(normalized.substring(1));
      } else if (provider.toLowerCase() === 'mtn' && normalized.length === 9 && !normalized.startsWith('233')) {
        normalized = "233".concat(normalized);
      } else if (provider.toLowerCase() === 'mtn' && normalized.startsWith('0')) {
        normalized = "233".concat(normalized.substring(1));
      }
      return normalized;
    }
  }]);
}();
var _default = exports["default"] = MobileMoneyProcessor;