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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - QR Code Manager
 * 
 * Handles generation and processing of QR codes for payments
 * Supports static and dynamic QR codes across multiple payment methods
 */
var QRCodeManager = /*#__PURE__*/function () {
  function QRCodeManager() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, QRCodeManager);
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' ? 'https://qr.sunnypayments.com/v1' : 'https://sandbox-qr.sunnypayments.com/v1';
    this.merchantId = config.merchantId || process.env.SUNNY_MERCHANT_ID;
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;
    this.defaultCurrency = config.defaultCurrency || 'USD';
    this.defaultExpiryMinutes = config.defaultExpiryMinutes || 30;
  }

  /**
   * Generate a static QR code for a merchant or user
   * 
   * @param {Object} options - QR code options
   * @param {string} options.accountId - Merchant or user account ID
   * @param {string} options.accountType - Type of account ('merchant' or 'user')
   * @param {string} options.username - Sunny username (optional)
   * @param {Array<string>} options.supportedMethods - Supported payment methods
   * @returns {Promise<Object>} Generated QR code details
   */
  return _createClass(QRCodeManager, [{
    key: "generateStaticQR",
    value: (function () {
      var _generateStaticQR = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(options) {
        var accountId, accountType, username, _options$supportedMet, supportedMethods, qrId, payload, payloadStr;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              accountId = options.accountId, accountType = options.accountType, username = options.username, _options$supportedMet = options.supportedMethods, supportedMethods = _options$supportedMet === void 0 ? [] : _options$supportedMet;
              if (accountId) {
                _context.next = 4;
                break;
              }
              throw new Error('Account ID is required');
            case 4:
              if (['merchant', 'user'].includes(accountType)) {
                _context.next = 6;
                break;
              }
              throw new Error('Account type must be either "merchant" or "user"');
            case 6:
              // Generate QR code ID
              qrId = "SQR".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()); // Create QR code payload
              payload = {
                v: 1,
                // Version
                id: qrId,
                t: accountType === 'merchant' ? 'M' : 'P',
                // Type: M for merchant, P for personal
                aid: accountId,
                sun: username ? username.replace('@', '') : undefined,
                // Sunny username without @
                pm: supportedMethods.length > 0 ? supportedMethods.join(',') : undefined // Supported payment methods
              }; // Convert payload to string
              payloadStr = Object.entries(payload).filter(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                  _ = _ref2[0],
                  value = _ref2[1];
                return value !== undefined;
              }).map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  key = _ref4[0],
                  value = _ref4[1];
                return "".concat(key, "=").concat(value);
              }).join('&'); // In a real implementation, this would generate an actual QR code image
              // For this example, we'll just return the payload and a mock image URL
              return _context.abrupt("return", {
                success: true,
                qrId: qrId,
                payload: payloadStr,
                qrImageUrl: "".concat(this.baseUrl, "/qr/").concat(qrId, ".png"),
                qrType: 'static',
                accountId: accountId,
                accountType: accountType,
                createdAt: new Date().toISOString()
              });
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.error('Static QR generation error:', _context.t0);
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.QR_GENERATION_ERROR,
                message: _context.t0.message || 'Failed to generate static QR code'
              });
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 12]]);
      }));
      function generateStaticQR(_x) {
        return _generateStaticQR.apply(this, arguments);
      }
      return generateStaticQR;
    }()
    /**
     * Generate a dynamic QR code for a specific payment
     * 
     * @param {Object} paymentData - Payment details
     * @param {string} paymentData.merchantId - Merchant ID
     * @param {string} paymentData.amount - Payment amount
     * @param {string} paymentData.currency - Currency code
     * @param {string} paymentData.orderId - Order ID (optional)
     * @param {number} paymentData.expiryMinutes - QR code expiry in minutes
     * @param {Array<string>} paymentData.allowedMethods - Allowed payment methods
     * @returns {Promise<Object>} Generated QR code details
     */
    )
  }, {
    key: "generateDynamicQR",
    value: (function () {
      var _generateDynamicQR = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(paymentData) {
        var _paymentData$merchant, merchantId, amount, _paymentData$currency, currency, _paymentData$orderId, orderId, _paymentData$expiryMi, expiryMinutes, _paymentData$allowedM, allowedMethods, qrId, expiryTime, payload, payloadStr;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _paymentData$merchant = paymentData.merchantId, merchantId = _paymentData$merchant === void 0 ? this.merchantId : _paymentData$merchant, amount = paymentData.amount, _paymentData$currency = paymentData.currency, currency = _paymentData$currency === void 0 ? this.defaultCurrency : _paymentData$currency, _paymentData$orderId = paymentData.orderId, orderId = _paymentData$orderId === void 0 ? "ORD".concat(Date.now()) : _paymentData$orderId, _paymentData$expiryMi = paymentData.expiryMinutes, expiryMinutes = _paymentData$expiryMi === void 0 ? this.defaultExpiryMinutes : _paymentData$expiryMi, _paymentData$allowedM = paymentData.allowedMethods, allowedMethods = _paymentData$allowedM === void 0 ? [] : _paymentData$allowedM;
              if (merchantId) {
                _context2.next = 4;
                break;
              }
              throw new Error('Merchant ID is required');
            case 4:
              if (amount) {
                _context2.next = 6;
                break;
              }
              throw new Error('Amount is required');
            case 6:
              // Generate QR code ID
              qrId = "DQR".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()); // Calculate expiry time
              expiryTime = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString(); // Create QR code payload
              payload = {
                v: 1,
                // Version
                id: qrId,
                t: 'D',
                // Type: D for dynamic
                mid: merchantId,
                amt: amount,
                cur: currency,
                oid: orderId,
                exp: expiryTime,
                pm: allowedMethods.length > 0 ? allowedMethods.join(',') : undefined // Allowed payment methods
              }; // Convert payload to string
              payloadStr = Object.entries(payload).filter(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                  _ = _ref6[0],
                  value = _ref6[1];
                return value !== undefined;
              }).map(function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 2),
                  key = _ref8[0],
                  value = _ref8[1];
                return "".concat(key, "=").concat(value);
              }).join('&'); // In a real implementation, this would generate an actual QR code image
              // For this example, we'll just return the payload and a mock image URL
              return _context2.abrupt("return", {
                success: true,
                qrId: qrId,
                payload: payloadStr,
                qrImageUrl: "".concat(this.baseUrl, "/qr/").concat(qrId, ".png"),
                qrType: 'dynamic',
                merchantId: merchantId,
                amount: amount,
                currency: currency,
                orderId: orderId,
                expiryTime: expiryTime,
                createdAt: new Date().toISOString()
              });
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error('Dynamic QR generation error:', _context2.t0);
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.QR_GENERATION_ERROR,
                message: _context2.t0.message || 'Failed to generate dynamic QR code'
              });
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 13]]);
      }));
      function generateDynamicQR(_x2) {
        return _generateDynamicQR.apply(this, arguments);
      }
      return generateDynamicQR;
    }()
    /**
     * Process a scanned QR code
     * 
     * @param {Object} scanData - Scanned QR code data
     * @param {string} scanData.payload - QR code payload
     * @param {Object} scanData.payerInfo - Information about the payer
     * @param {string} scanData.paymentMethod - Payment method to use
     * @returns {Promise<Object>} Processing result
     */
    )
  }, {
    key: "processScannedQR",
    value: (function () {
      var _processScannedQR = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(scanData) {
        var payload, payerInfo, paymentMethod, payloadParams, qrType;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              payload = scanData.payload, payerInfo = scanData.payerInfo, paymentMethod = scanData.paymentMethod;
              if (payload) {
                _context3.next = 4;
                break;
              }
              throw new Error('QR code payload is required');
            case 4:
              if (payerInfo) {
                _context3.next = 6;
                break;
              }
              throw new Error('Payer information is required');
            case 6:
              if (paymentMethod) {
                _context3.next = 8;
                break;
              }
              throw new Error('Payment method is required');
            case 8:
              // Parse the QR code payload
              payloadParams = new URLSearchParams(payload);
              qrType = payloadParams.get('t'); // Process based on QR code type
              if (!(qrType === 'M' || qrType === 'P')) {
                _context3.next = 14;
                break;
              }
              return _context3.abrupt("return", this.processStaticQR(payloadParams, payerInfo, paymentMethod));
            case 14:
              if (!(qrType === 'D')) {
                _context3.next = 18;
                break;
              }
              return _context3.abrupt("return", this.processDynamicQR(payloadParams, payerInfo, paymentMethod));
            case 18:
              throw new Error('Invalid QR code type');
            case 19:
              _context3.next = 25;
              break;
            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](0);
              console.error('QR code processing error:', _context3.t0);
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.QR_PROCESSING_ERROR,
                message: _context3.t0.message || 'Failed to process QR code'
              });
            case 25:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 21]]);
      }));
      function processScannedQR(_x3) {
        return _processScannedQR.apply(this, arguments);
      }
      return processScannedQR;
    }()
    /**
     * Process a static QR code
     * 
     * @private
     * @param {URLSearchParams} params - QR code parameters
     * @param {Object} payerInfo - Information about the payer
     * @param {string} paymentMethod - Payment method to use
     * @returns {Promise<Object>} Processing result
     */
    )
  }, {
    key: "processStaticQR",
    value: (function () {
      var _processStaticQR = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params, payerInfo, paymentMethod) {
        var qrId, accountId, accountType, username;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // Extract parameters
              qrId = params.get('id');
              accountId = params.get('aid');
              accountType = params.get('t') === 'M' ? 'merchant' : 'user';
              username = params.get('sun') ? "@".concat(params.get('sun')) : undefined; // In a real implementation, this would initiate a payment flow
              // For this example, we'll just return the parsed information
              return _context4.abrupt("return", {
                success: true,
                qrId: qrId,
                qrType: 'static',
                accountId: accountId,
                accountType: accountType,
                username: username,
                payerInfo: payerInfo,
                paymentMethod: paymentMethod,
                nextAction: 'COLLECT_AMOUNT',
                // Next action is to collect payment amount
                processedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function processStaticQR(_x4, _x5, _x6) {
        return _processStaticQR.apply(this, arguments);
      }
      return processStaticQR;
    }()
    /**
     * Process a dynamic QR code
     * 
     * @private
     * @param {URLSearchParams} params - QR code parameters
     * @param {Object} payerInfo - Information about the payer
     * @param {string} paymentMethod - Payment method to use
     * @returns {Promise<Object>} Processing result
     */
    )
  }, {
    key: "processDynamicQR",
    value: (function () {
      var _processDynamicQR = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(params, payerInfo, paymentMethod) {
        var qrId, merchantId, amount, currency, orderId, expiryTime, allowedMethods;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              // Extract parameters
              qrId = params.get('id');
              merchantId = params.get('mid');
              amount = params.get('amt');
              currency = params.get('cur');
              orderId = params.get('oid');
              expiryTime = params.get('exp'); // Check if QR code has expired
              if (!(new Date(expiryTime) < new Date())) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.QR_EXPIRED,
                message: 'QR code has expired'
              });
            case 8:
              // Check if payment method is allowed
              allowedMethods = params.get('pm') ? params.get('pm').split(',') : [];
              if (!(allowedMethods.length > 0 && !allowedMethods.includes(paymentMethod))) {
                _context5.next = 11;
                break;
              }
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.PAYMENT_METHOD_NOT_ALLOWED,
                message: 'Payment method not allowed for this QR code'
              });
            case 11:
              return _context5.abrupt("return", {
                success: true,
                qrId: qrId,
                qrType: 'dynamic',
                merchantId: merchantId,
                amount: amount,
                currency: currency,
                orderId: orderId,
                payerInfo: payerInfo,
                paymentMethod: paymentMethod,
                nextAction: 'CONFIRM_PAYMENT',
                // Next action is to confirm payment
                processedAt: new Date().toISOString()
              });
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function processDynamicQR(_x7, _x8, _x9) {
        return _processDynamicQR.apply(this, arguments);
      }
      return processDynamicQR;
    }()
    /**
     * Verify a QR code signature
     * 
     * @private
     * @param {string} payload - QR code payload
     * @param {string} signature - QR code signature
     * @returns {boolean} Whether the signature is valid
     */
    )
  }, {
    key: "verifySignature",
    value: function verifySignature(payload, signature) {
      // In a real implementation, this would verify the signature using a public key
      // For this example, we'll just return true
      return true;
    }
  }]);
}();
var _default = exports["default"] = QRCodeManager;