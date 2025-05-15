"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _uuid = require("uuid");
var _constants = require("./constants.js");
var _SunnyPaymentGateway = _interopRequireDefault(require("./SunnyPaymentGateway.js"));
var _MobileMoneyProcessor = _interopRequireDefault(require("./mobileMoney/MobileMoneyProcessor.js"));
var _QRCodeManager = _interopRequireDefault(require("./qr/QRCodeManager.js"));
var _P2PTransferManager = _interopRequireDefault(require("./p2p/P2PTransferManager.js"));
var _HardwareIntegration = _interopRequireDefault(require("./hardware/HardwareIntegration.js"));
var _OfflineProcessor = _interopRequireDefault(require("./offline/OfflineProcessor.js"));
var _IdentityManager = _interopRequireDefault(require("./identity/IdentityManager.js"));
var _excluded = ["methods"],
  _excluded2 = ["recipients"],
  _excluded3 = ["frequency", "startDate", "endDate", "maxPayments"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - Payment Orchestrator
 * 
 * Central orchestration engine for all payment flows
 * Handles routing, authentication, settlement, and failure management
 */
var PaymentOrchestrator = /*#__PURE__*/function () {
  function PaymentOrchestrator() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PaymentOrchestrator);
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.merchantId = config.merchantId || process.env.SUNNY_MERCHANT_ID;
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;

    // Initialize all payment processors
    this.paymentGateway = new _SunnyPaymentGateway["default"](config);
    this.mobileMoneyProcessor = new _MobileMoneyProcessor["default"](config);
    this.qrCodeManager = new _QRCodeManager["default"](config);
    this.p2pTransferManager = new _P2PTransferManager["default"](config);
    this.hardwareIntegration = new _HardwareIntegration["default"](config);
    this.offlineProcessor = new _OfflineProcessor["default"](config);
    this.identityManager = new _IdentityManager["default"](config);

    // Smart routing configuration
    this.routingPreferences = config.routingPreferences || {
      prioritizeCost: false,
      prioritizeSpeed: true,
      preferredProviders: [],
      fallbackOrder: []
    };
  }

  /**
   * Process a payment with smart routing
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  return _createClass(PaymentOrchestrator, [{
    key: "processPayment",
    value: (function () {
      var _processPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(paymentData) {
        var requestId, recipientId, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // Generate request ID for tracking
              requestId = (0, _uuid.v4)(); // Validate payment data
              if (!(!paymentData.amount || !paymentData.currency)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Amount and currency are required',
                requestId: requestId
              });
            case 4:
              if (paymentData.paymentMethod) {
                _context.next = 8;
                break;
              }
              _context.next = 7;
              return this.determineOptimalPaymentMethod(paymentData);
            case 7:
              paymentData.paymentMethod = _context.sent;
            case 8:
              if (!(paymentData.recipientAlias && paymentData.aliasType)) {
                _context.next = 17;
                break;
              }
              _context.next = 11;
              return this.resolveRecipient(paymentData.recipientAlias, paymentData.aliasType);
            case 11:
              recipientId = _context.sent;
              if (!recipientId) {
                _context.next = 16;
                break;
              }
              paymentData.recipientId = recipientId;
              _context.next = 17;
              break;
            case 16:
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.RECIPIENT_NOT_FOUND,
                message: 'Recipient not found',
                requestId: requestId
              });
            case 17:
              _context.next = 19;
              return this.routePayment(paymentData);
            case 19:
              result = _context.sent;
              // Add request ID to result
              result.requestId = requestId;
              return _context.abrupt("return", result);
            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              console.error('Payment orchestration error:', _context.t0);
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.ORCHESTRATION_ERROR,
                message: _context.t0.message || 'Failed to orchestrate payment',
                requestId: (0, _uuid.v4)()
              });
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 24]]);
      }));
      function processPayment(_x) {
        return _processPayment.apply(this, arguments);
      }
      return processPayment;
    }()
    /**
     * Route payment to appropriate processor
     * 
     * @private
     * @param {Object} paymentData - Payment information
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "routePayment",
    value: (function () {
      var _routePayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(paymentData) {
        var paymentMethod;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              paymentMethod = paymentData.paymentMethod; // Route based on payment method
              _context2.t0 = paymentMethod;
              _context2.next = _context2.t0 === 'card' ? 4 : _context2.t0 === 'bank_transfer' ? 4 : _context2.t0 === 'crypto' ? 4 : _context2.t0 === 'apple_pay' ? 4 : _context2.t0 === 'google_pay' ? 4 : _context2.t0 === 'upi' ? 4 : _context2.t0 === 'alipay' ? 4 : _context2.t0 === 'wechat' ? 4 : _context2.t0 === 'mpesa' ? 7 : _context2.t0 === 'airtel' ? 7 : _context2.t0 === 'mtn' ? 7 : _context2.t0 === 'orange' ? 7 : _context2.t0 === 'qr_code' ? 10 : _context2.t0 === 'p2p' ? 19 : _context2.t0 === 'pos' ? 22 : _context2.t0 === 'card_reader' ? 25 : _context2.t0 === 'biometric' ? 28 : _context2.t0 === 'gesture' ? 31 : _context2.t0 === 'ussd' ? 34 : _context2.t0 === 'sms' ? 37 : _context2.t0 === 'offline_qr' ? 40 : 43;
              break;
            case 4:
              _context2.next = 6;
              return this.paymentGateway.processPayment(paymentData);
            case 6:
              return _context2.abrupt("return", _context2.sent);
            case 7:
              _context2.next = 9;
              return this.mobileMoneyProcessor.processPayment(_objectSpread(_objectSpread({}, paymentData), {}, {
                provider: paymentMethod
              }));
            case 9:
              return _context2.abrupt("return", _context2.sent);
            case 10:
              if (!(paymentData.qrType === 'static')) {
                _context2.next = 16;
                break;
              }
              _context2.next = 13;
              return this.qrCodeManager.generateStaticQR(paymentData);
            case 13:
              return _context2.abrupt("return", _context2.sent);
            case 16:
              _context2.next = 18;
              return this.qrCodeManager.generateDynamicQR(paymentData);
            case 18:
              return _context2.abrupt("return", _context2.sent);
            case 19:
              _context2.next = 21;
              return this.p2pTransferManager.sendMoney(paymentData);
            case 21:
              return _context2.abrupt("return", _context2.sent);
            case 22:
              _context2.next = 24;
              return this.hardwareIntegration.processPOSPayment(paymentData);
            case 24:
              return _context2.abrupt("return", _context2.sent);
            case 25:
              _context2.next = 27;
              return this.hardwareIntegration.processCardReaderPayment(paymentData);
            case 27:
              return _context2.abrupt("return", _context2.sent);
            case 28:
              _context2.next = 30;
              return this.hardwareIntegration.processBiometricPayment(paymentData);
            case 30:
              return _context2.abrupt("return", _context2.sent);
            case 31:
              _context2.next = 33;
              return this.hardwareIntegration.processGesturePayment(paymentData);
            case 33:
              return _context2.abrupt("return", _context2.sent);
            case 34:
              _context2.next = 36;
              return this.offlineProcessor.processUSSDPayment(paymentData);
            case 36:
              return _context2.abrupt("return", _context2.sent);
            case 37:
              _context2.next = 39;
              return this.offlineProcessor.processSMSPayment(paymentData);
            case 39:
              return _context2.abrupt("return", _context2.sent);
            case 40:
              _context2.next = 42;
              return this.offlineProcessor.processOfflineQR(paymentData);
            case 42:
              return _context2.abrupt("return", _context2.sent);
            case 43:
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.UNSUPPORTED_PAYMENT_METHOD,
                message: "Unsupported payment method: ".concat(paymentMethod)
              });
            case 44:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function routePayment(_x2) {
        return _routePayment.apply(this, arguments);
      }
      return routePayment;
    }()
    /**
     * Determine the optimal payment method based on context
     * 
     * @private
     * @param {Object} paymentData - Payment information
     * @returns {Promise<string>} Optimal payment method
     */
    )
  }, {
    key: "determineOptimalPaymentMethod",
    value: (function () {
      var _determineOptimalPaymentMethod = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(paymentData) {
        var amount, currency, _paymentData$country, country, _paymentData$customer, customer, _paymentData$metadata, metadata, isOffline, mobileMoneyCountries;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // In a real implementation, this would use various factors to determine the best payment method
              // For this example, we'll use a simple algorithm
              amount = paymentData.amount, currency = paymentData.currency, _paymentData$country = paymentData.country, country = _paymentData$country === void 0 ? 'US' : _paymentData$country, _paymentData$customer = paymentData.customer, customer = _paymentData$customer === void 0 ? {} : _paymentData$customer, _paymentData$metadata = paymentData.metadata, metadata = _paymentData$metadata === void 0 ? {} : _paymentData$metadata; // Check for network connectivity
              isOffline = metadata.isOffline || false;
              if (!isOffline) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", 'offline_qr');
            case 4:
              // Check for mobile money prevalence in certain countries
              mobileMoneyCountries = ['KE', 'GH', 'TZ', 'UG', 'RW'];
              if (!mobileMoneyCountries.includes(country)) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", 'mpesa');
            case 7:
              if (!(country === 'IN')) {
                _context3.next = 9;
                break;
              }
              return _context3.abrupt("return", 'upi');
            case 9:
              if (!(country === 'CN')) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return", 'alipay');
            case 11:
              return _context3.abrupt("return", 'card');
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function determineOptimalPaymentMethod(_x3) {
        return _determineOptimalPaymentMethod.apply(this, arguments);
      }
      return determineOptimalPaymentMethod;
    }()
    /**
     * Resolve recipient ID from alias
     * 
     * @private
     * @param {string} alias - Recipient alias
     * @param {string} aliasType - Type of alias
     * @returns {Promise<string|null>} Recipient ID or null if not found
     */
    )
  }, {
    key: "resolveRecipient",
    value: (function () {
      var _resolveRecipient = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(alias, aliasType) {
        var identity;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.identityManager.resolveAlias(aliasType, alias);
            case 2:
              identity = _context4.sent;
              return _context4.abrupt("return", identity ? identity.sunnyId : null);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function resolveRecipient(_x4, _x5) {
        return _resolveRecipient.apply(this, arguments);
      }
      return resolveRecipient;
    }()
    /**
     * Process a multi-method payment (try multiple methods in sequence)
     * 
     * @param {Object} paymentData - Payment information
     * @param {Array<string>} paymentData.methods - Payment methods to try in order
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processMultiMethodPayment",
    value: (function () {
      var _processMultiMethodPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(paymentData) {
        var methods, basePaymentData, lastError, _iterator, _step, method, result;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              methods = paymentData.methods, basePaymentData = _objectWithoutProperties(paymentData, _excluded);
              if (!(!methods || !Array.isArray(methods) || methods.length === 0)) {
                _context5.next = 4;
                break;
              }
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'At least one payment method is required'
              });
            case 4:
              // Try each method in sequence
              lastError = null;
              _iterator = _createForOfIteratorHelper(methods);
              _context5.prev = 6;
              _iterator.s();
            case 8:
              if ((_step = _iterator.n()).done) {
                _context5.next = 24;
                break;
              }
              method = _step.value;
              _context5.prev = 10;
              _context5.next = 13;
              return this.processPayment(_objectSpread(_objectSpread({}, basePaymentData), {}, {
                paymentMethod: method
              }));
            case 13:
              result = _context5.sent;
              if (!result.success) {
                _context5.next = 16;
                break;
              }
              return _context5.abrupt("return", _objectSpread(_objectSpread({}, result), {}, {
                methodUsed: method,
                attemptedMethods: [method]
              }));
            case 16:
              lastError = result;
              _context5.next = 22;
              break;
            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](10);
              lastError = {
                success: false,
                error: _constants.ERROR_CODES.PAYMENT_METHOD_ERROR,
                message: "Error with payment method ".concat(method, ": ").concat(_context5.t0.message)
              };
            case 22:
              _context5.next = 8;
              break;
            case 24:
              _context5.next = 29;
              break;
            case 26:
              _context5.prev = 26;
              _context5.t1 = _context5["catch"](6);
              _iterator.e(_context5.t1);
            case 29:
              _context5.prev = 29;
              _iterator.f();
              return _context5.finish(29);
            case 32:
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.ALL_PAYMENT_METHODS_FAILED,
                message: 'All payment methods failed',
                lastError: lastError,
                attemptedMethods: methods
              });
            case 35:
              _context5.prev = 35;
              _context5.t2 = _context5["catch"](0);
              console.error('Multi-method payment error:', _context5.t2);
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.ORCHESTRATION_ERROR,
                message: _context5.t2.message || 'Failed to process multi-method payment'
              });
            case 39:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 35], [6, 26, 29, 32], [10, 19]]);
      }));
      function processMultiMethodPayment(_x6) {
        return _processMultiMethodPayment.apply(this, arguments);
      }
      return processMultiMethodPayment;
    }()
    /**
     * Process a split payment (multiple recipients)
     * 
     * @param {Object} splitPaymentData - Split payment information
     * @param {Array<Object>} splitPaymentData.recipients - Recipients and amounts
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processSplitPayment",
    value: (function () {
      var _processSplitPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(splitPaymentData) {
        var _this = this;
        var recipients, basePaymentData, mainPayment, splitResults;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              recipients = splitPaymentData.recipients, basePaymentData = _objectWithoutProperties(splitPaymentData, _excluded2);
              if (!(!recipients || !Array.isArray(recipients) || recipients.length === 0)) {
                _context7.next = 4;
                break;
              }
              return _context7.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'At least one recipient is required'
              });
            case 4:
              _context7.next = 6;
              return this.processPayment(basePaymentData);
            case 6:
              mainPayment = _context7.sent;
              if (mainPayment.success) {
                _context7.next = 9;
                break;
              }
              return _context7.abrupt("return", mainPayment);
            case 9:
              _context7.next = 11;
              return Promise.all(recipients.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(recipient) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _this.processPayment(_objectSpread(_objectSpread({}, basePaymentData), {}, {
                          amount: recipient.amount,
                          recipientId: recipient.recipientId,
                          recipientAlias: recipient.recipientAlias,
                          aliasType: recipient.aliasType,
                          description: "Split payment: ".concat(recipient.description || 'No description')
                        }));
                      case 3:
                        result = _context6.sent;
                        return _context6.abrupt("return", _objectSpread(_objectSpread({}, result), {}, {
                          recipientId: recipient.recipientId,
                          recipientAlias: recipient.recipientAlias,
                          amount: recipient.amount
                        }));
                      case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6["catch"](0);
                        return _context6.abrupt("return", {
                          success: false,
                          error: _constants.ERROR_CODES.SPLIT_PAYMENT_ERROR,
                          message: "Error processing split for recipient: ".concat(_context6.t0.message),
                          recipientId: recipient.recipientId,
                          recipientAlias: recipient.recipientAlias,
                          amount: recipient.amount
                        });
                      case 10:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6, null, [[0, 7]]);
                }));
                return function (_x8) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 11:
              splitResults = _context7.sent;
              return _context7.abrupt("return", {
                success: true,
                mainPayment: mainPayment,
                splits: splitResults,
                successfulSplits: splitResults.filter(function (r) {
                  return r.success;
                }).length,
                failedSplits: splitResults.filter(function (r) {
                  return !r.success;
                }).length,
                totalSplits: splitResults.length
              });
            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](0);
              console.error('Split payment error:', _context7.t0);
              return _context7.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.SPLIT_PAYMENT_ERROR,
                message: _context7.t0.message || 'Failed to process split payment'
              });
            case 19:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 15]]);
      }));
      function processSplitPayment(_x7) {
        return _processSplitPayment.apply(this, arguments);
      }
      return processSplitPayment;
    }()
    /**
     * Process a recurring payment
     * 
     * @param {Object} recurringPaymentData - Recurring payment information
     * @param {string} recurringPaymentData.frequency - Payment frequency (daily, weekly, monthly, yearly)
     * @param {string} recurringPaymentData.startDate - Start date (ISO format)
     * @param {string} recurringPaymentData.endDate - End date (ISO format, optional)
     * @param {number} recurringPaymentData.maxPayments - Maximum number of payments (optional)
     * @returns {Promise<Object>} Subscription result
     */
    )
  }, {
    key: "processRecurringPayment",
    value: (function () {
      var _processRecurringPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(recurringPaymentData) {
        var frequency, startDate, endDate, maxPayments, basePaymentData, subscriptionId, initialPayment;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              frequency = recurringPaymentData.frequency, startDate = recurringPaymentData.startDate, endDate = recurringPaymentData.endDate, maxPayments = recurringPaymentData.maxPayments, basePaymentData = _objectWithoutProperties(recurringPaymentData, _excluded3);
              if (!(!frequency || !startDate)) {
                _context8.next = 4;
                break;
              }
              return _context8.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Frequency and start date are required'
              });
            case 4:
              // Create subscription
              subscriptionId = (0, _uuid.v4)(); // Process initial payment if requested
              initialPayment = null;
              if (!recurringPaymentData.processInitialPayment) {
                _context8.next = 12;
                break;
              }
              _context8.next = 9;
              return this.processPayment(basePaymentData);
            case 9:
              initialPayment = _context8.sent;
              if (initialPayment.success) {
                _context8.next = 12;
                break;
              }
              return _context8.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INITIAL_PAYMENT_FAILED,
                message: 'Initial payment failed',
                initialPaymentError: initialPayment
              });
            case 12:
              return _context8.abrupt("return", {
                success: true,
                subscriptionId: subscriptionId,
                frequency: frequency,
                startDate: startDate,
                endDate: endDate,
                maxPayments: maxPayments,
                initialPayment: initialPayment,
                status: 'ACTIVE',
                nextPaymentDate: this.calculateNextPaymentDate(startDate, frequency),
                createdAt: new Date().toISOString()
              });
            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8["catch"](0);
              console.error('Recurring payment error:', _context8.t0);
              return _context8.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.RECURRING_PAYMENT_ERROR,
                message: _context8.t0.message || 'Failed to process recurring payment'
              });
            case 19:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 15]]);
      }));
      function processRecurringPayment(_x9) {
        return _processRecurringPayment.apply(this, arguments);
      }
      return processRecurringPayment;
    }()
    /**
     * Calculate next payment date based on frequency
     * 
     * @private
     * @param {string} startDate - Start date (ISO format)
     * @param {string} frequency - Payment frequency
     * @returns {string} Next payment date (ISO format)
     */
    )
  }, {
    key: "calculateNextPaymentDate",
    value: function calculateNextPaymentDate(startDate, frequency) {
      var date = new Date(startDate);
      switch (frequency) {
        case 'daily':
          date.setDate(date.getDate() + 1);
          break;
        case 'weekly':
          date.setDate(date.getDate() + 7);
          break;
        case 'monthly':
          date.setMonth(date.getMonth() + 1);
          break;
        case 'yearly':
          date.setFullYear(date.getFullYear() + 1);
          break;
      }
      return date.toISOString();
    }
  }]);
}();
var _default = exports["default"] = PaymentOrchestrator;