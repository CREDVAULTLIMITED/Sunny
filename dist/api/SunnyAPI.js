"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - API Client
 * 
 * Provides a client for interacting with the Sunny API
 */
var SunnyAPI = /*#__PURE__*/function () {
  /**
   * Create a new Sunny API client
   * 
   * @param {Object} config - API configuration
   * @param {string} config.apiKey - Your API key
   * @param {string} config.apiSecret - Your API secret
   * @param {string} config.environment - 'sandbox' or 'production'
   * @param {number} config.timeout - Request timeout in milliseconds
   */
  function SunnyAPI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SunnyAPI);
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.environment = config.environment || 'sandbox';
    this.timeout = config.timeout || 30000;

    // Set base URL based on environment
    this.baseUrl = this.environment === 'production' ? 'https://api.sunnypayments.com/v2' : 'https://sandbox.sunnypayments.com/v2';

    // Create axios instance
    this.client = _axios["default"].create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Authorization': "Bearer ".concat(this.apiKey),
        'Content-Type': 'application/json',
        'User-Agent': 'Sunny/NodeJS/1.0.0'
      }
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(function (request) {
      // Remove sensitive data from logs
      var sanitizedRequest = _objectSpread({}, request);
      if (sanitizedRequest.headers && sanitizedRequest.headers.Authorization) {
        sanitizedRequest.headers.Authorization = 'Bearer [REDACTED]';
      }
      if (sanitizedRequest.data && sanitizedRequest.data.card) {
        sanitizedRequest.data.card = _objectSpread(_objectSpread({}, sanitizedRequest.data.card), {}, {
          number: '[REDACTED]',
          cvc: '[REDACTED]'
        });
      }
      console.log('API Request:', {
        method: sanitizedRequest.method,
        url: sanitizedRequest.url,
        headers: sanitizedRequest.headers,
        data: sanitizedRequest.data
      });
      return request;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(function (response) {
      console.log('API Response:', {
        status: response.status,
        data: response.data
      });
      return response;
    }, function (error) {
      console.error('API Error:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : null
      });
      return Promise.reject(error);
    });
  }

  /**
   * Create a payment
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Payment result
   */
  return _createClass(SunnyAPI, [{
    key: "createPayment",
    value: (function () {
      var _createPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(paymentData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.client.post('/payments', paymentData);
            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.data);
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              this._handleApiError(_context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 7]]);
      }));
      function createPayment(_x) {
        return _createPayment.apply(this, arguments);
      }
      return createPayment;
    }()
    /**
     * Retrieve a payment
     * 
     * @param {string} paymentId - Payment ID
     * @returns {Promise<Object>} Payment details
     */
    )
  }, {
    key: "getPayment",
    value: (function () {
      var _getPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(paymentId) {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.client.get("/payments/".concat(paymentId));
            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", response.data);
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              this._handleApiError(_context2.t0);
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 7]]);
      }));
      function getPayment(_x2) {
        return _getPayment.apply(this, arguments);
      }
      return getPayment;
    }()
    /**
     * List payments
     * 
     * @param {Object} options - Query options
     * @param {number} options.limit - Number of payments to return
     * @param {string} options.startingAfter - Cursor for pagination
     * @param {string} options.endingBefore - Cursor for pagination
     * @returns {Promise<Object>} List of payments
     */
    )
  }, {
    key: "listPayments",
    value: (function () {
      var _listPayments = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var options,
          response,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _context3.prev = 1;
              _context3.next = 4;
              return this.client.get('/payments', {
                params: options
              });
            case 4:
              response = _context3.sent;
              return _context3.abrupt("return", response.data);
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              this._handleApiError(_context3.t0);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 8]]);
      }));
      function listPayments() {
        return _listPayments.apply(this, arguments);
      }
      return listPayments;
    }()
    /**
     * Create a refund
     * 
     * @param {Object} refundData - Refund information
     * @returns {Promise<Object>} Refund result
     */
    )
  }, {
    key: "createRefund",
    value: (function () {
      var _createRefund = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(refundData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this.client.post('/refunds', refundData);
            case 3:
              response = _context4.sent;
              return _context4.abrupt("return", response.data);
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              this._handleApiError(_context4.t0);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 7]]);
      }));
      function createRefund(_x3) {
        return _createRefund.apply(this, arguments);
      }
      return createRefund;
    }()
    /**
     * Create a customer
     * 
     * @param {Object} customerData - Customer information
     * @returns {Promise<Object>} Customer result
     */
    )
  }, {
    key: "createCustomer",
    value: (function () {
      var _createCustomer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(customerData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return this.client.post('/customers', customerData);
            case 3:
              response = _context5.sent;
              return _context5.abrupt("return", response.data);
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              this._handleApiError(_context5.t0);
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function createCustomer(_x4) {
        return _createCustomer.apply(this, arguments);
      }
      return createCustomer;
    }()
    /**
     * Create a subscription
     * 
     * @param {Object} subscriptionData - Subscription information
     * @returns {Promise<Object>} Subscription result
     */
    )
  }, {
    key: "createSubscription",
    value: (function () {
      var _createSubscription = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(subscriptionData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return this.client.post('/subscriptions', subscriptionData);
            case 3:
              response = _context6.sent;
              return _context6.abrupt("return", response.data);
            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              this._handleApiError(_context6.t0);
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 7]]);
      }));
      function createSubscription(_x5) {
        return _createSubscription.apply(this, arguments);
      }
      return createSubscription;
    }()
    /**
     * Create a payment link
     * 
     * @param {Object} paymentLinkData - Payment link information
     * @returns {Promise<Object>} Payment link result
     */
    )
  }, {
    key: "createPaymentLink",
    value: (function () {
      var _createPaymentLink = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(paymentLinkData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return this.client.post('/payment_links', paymentLinkData);
            case 3:
              response = _context7.sent;
              return _context7.abrupt("return", response.data);
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              this._handleApiError(_context7.t0);
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 7]]);
      }));
      function createPaymentLink(_x6) {
        return _createPaymentLink.apply(this, arguments);
      }
      return createPaymentLink;
    }()
    /**
     * Create a marketplace payment
     * 
     * @param {Object} marketplaceData - Marketplace payment information
     * @returns {Promise<Object>} Marketplace payment result
     */
    )
  }, {
    key: "createMarketplacePayment",
    value: (function () {
      var _createMarketplacePayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(marketplaceData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return this.client.post('/marketplace/payments', marketplaceData);
            case 3:
              response = _context8.sent;
              return _context8.abrupt("return", response.data);
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              this._handleApiError(_context8.t0);
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 7]]);
      }));
      function createMarketplacePayment(_x7) {
        return _createMarketplacePayment.apply(this, arguments);
      }
      return createMarketplacePayment;
    }()
    /**
     * Register a webhook
     * 
     * @param {Object} webhookData - Webhook information
     * @returns {Promise<Object>} Webhook result
     */
    )
  }, {
    key: "registerWebhook",
    value: (function () {
      var _registerWebhook = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(webhookData) {
        var response;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return this.client.post('/webhooks', webhookData);
            case 3:
              response = _context9.sent;
              return _context9.abrupt("return", response.data);
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              this._handleApiError(_context9.t0);
            case 10:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 7]]);
      }));
      function registerWebhook(_x8) {
        return _registerWebhook.apply(this, arguments);
      }
      return registerWebhook;
    }()
    /**
     * Get account balance
     * 
     * @returns {Promise<Object>} Balance information
     */
    )
  }, {
    key: "getBalance",
    value: (function () {
      var _getBalance = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0() {
        var response;
        return _regeneratorRuntime().wrap(function _callee0$(_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              _context0.prev = 0;
              _context0.next = 3;
              return this.client.get('/balance');
            case 3:
              response = _context0.sent;
              return _context0.abrupt("return", response.data);
            case 7:
              _context0.prev = 7;
              _context0.t0 = _context0["catch"](0);
              this._handleApiError(_context0.t0);
            case 10:
            case "end":
              return _context0.stop();
          }
        }, _callee0, this, [[0, 7]]);
      }));
      function getBalance() {
        return _getBalance.apply(this, arguments);
      }
      return getBalance;
    }()
    /**
     * Verify a webhook signature
     * 
     * @param {string|Object} payload - Webhook payload
     * @param {string} signature - Signature from Sunny-Signature header
     * @returns {boolean} Whether the signature is valid
     */
    )
  }, {
    key: "verifyWebhook",
    value: function verifyWebhook(payload, signature) {
      var payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
      var expectedSignature = _crypto["default"].createHmac('sha256', this.apiSecret).update(payloadString).digest('hex');
      return signature === expectedSignature;
    }

    /**
     * Handle API errors
     * 
     * @private
     * @param {Error} error - API error
     * @throws {Error} Enhanced error with details
     */
  }, {
    key: "_handleApiError",
    value: function _handleApiError(error) {
      if (error.response) {
        var _error$response$data$, _error$response$data$2, _error$response$data$3, _error$response$data$4;
        // The request was made and the server responded with an error status
        var apiError = new Error(((_error$response$data$ = error.response.data.error) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.message) || 'API error');
        apiError.status = error.response.status;
        apiError.code = (_error$response$data$2 = error.response.data.error) === null || _error$response$data$2 === void 0 ? void 0 : _error$response$data$2.code;
        apiError.type = (_error$response$data$3 = error.response.data.error) === null || _error$response$data$3 === void 0 ? void 0 : _error$response$data$3.type;
        apiError.param = (_error$response$data$4 = error.response.data.error) === null || _error$response$data$4 === void 0 ? void 0 : _error$response$data$4.param;
        throw apiError;
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from API');
      } else {
        // Something happened in setting up the request
        throw new Error("Error setting up request: ".concat(error.message));
      }
    }
  }]);
}();
var _default = exports["default"] = SunnyAPI;