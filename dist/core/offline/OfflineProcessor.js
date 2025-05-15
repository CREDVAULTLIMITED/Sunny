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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - Offline Processor
 * 
 * Handles offline payment processing and synchronization
 * Supports USSD, SMS, and offline QR code payments
 */
var OfflineProcessor = /*#__PURE__*/function () {
  function OfflineProcessor() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, OfflineProcessor);
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' ? 'https://offline.sunnypayments.com/v1' : 'https://sandbox-offline.sunnypayments.com/v1';
    this.merchantId = config.merchantId || process.env.SUNNY_MERCHANT_ID;
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;
    this.maxOfflineTransactionAge = config.maxOfflineTransactionAge || 72; // hours
  }

  /**
   * Process a USSD payment
   * 
   * @param {Object} ussdData - USSD payment information
   * @param {string} ussdData.sessionId - USSD session ID
   * @param {string} ussdData.phoneNumber - Customer phone number
   * @param {string} ussdData.input - USSD input string
   * @param {string} ussdData.network - Mobile network operator
   * @returns {Promise<Object>} USSD response
   */
  return _createClass(OfflineProcessor, [{
    key: "processUSSDPayment",
    value: (function () {
      var _processUSSDPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(ussdData) {
        var sessionId, phoneNumber, input, network, inputParts, action;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              sessionId = ussdData.sessionId, phoneNumber = ussdData.phoneNumber, input = ussdData.input, network = ussdData.network;
              if (!(!sessionId || !phoneNumber || !input)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Session ID, phone number, and input are required',
                responseType: 'END',
                responseString: 'Error: Invalid request. Please try again.'
              });
            case 4:
              // Parse USSD input to determine action
              inputParts = input.split('*');
              action = inputParts[0]; // Process based on action
              _context.t0 = action;
              _context.next = _context.t0 === '1' ? 9 : _context.t0 === '2' ? 10 : _context.t0 === '3' ? 11 : _context.t0 === '4' ? 12 : 13;
              break;
            case 9:
              return _context.abrupt("return", this.handleUSSDBalanceCheck(sessionId, phoneNumber, network));
            case 10:
              return _context.abrupt("return", this.handleUSSDSendMoney(sessionId, phoneNumber, inputParts, network));
            case 11:
              return _context.abrupt("return", this.handleUSSDPayMerchant(sessionId, phoneNumber, inputParts, network));
            case 12:
              return _context.abrupt("return", this.handleUSSDBuyAirtime(sessionId, phoneNumber, inputParts, network));
            case 13:
              return _context.abrupt("return", this.getUSSDMainMenu(sessionId, phoneNumber));
            case 14:
              _context.next = 20;
              break;
            case 16:
              _context.prev = 16;
              _context.t1 = _context["catch"](0);
              console.error('USSD processing error:', _context.t1);
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.USSD_PROCESSING_ERROR,
                message: _context.t1.message || 'Failed to process USSD request',
                responseType: 'END',
                responseString: 'Sorry, an error occurred. Please try again later.'
              });
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 16]]);
      }));
      function processUSSDPayment(_x) {
        return _processUSSDPayment.apply(this, arguments);
      }
      return processUSSDPayment;
    }()
    /**
     * Process an SMS payment
     * 
     * @param {Object} smsData - SMS payment information
     * @param {string} smsData.phoneNumber - Sender phone number
     * @param {string} smsData.message - SMS message content
     * @param {string} smsData.timestamp - Message timestamp
     * @returns {Promise<Object>} SMS processing result
     */
    )
  }, {
    key: "processSMSPayment",
    value: (function () {
      var _processSMSPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(smsData) {
        var phoneNumber, message, timestamp, messageParts, command;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              phoneNumber = smsData.phoneNumber, message = smsData.message, timestamp = smsData.timestamp;
              if (!(!phoneNumber || !message)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Phone number and message are required',
                responseMessage: 'Error: Invalid request. Please check format and try again.'
              });
            case 4:
              // Parse SMS message to determine action
              messageParts = message.trim().split(' ');
              command = messageParts[0].toUpperCase(); // Process based on command
              _context2.t0 = command;
              _context2.next = _context2.t0 === 'PAY' ? 9 : _context2.t0 === 'SEND' ? 10 : _context2.t0 === 'BALANCE' ? 11 : _context2.t0 === 'HELP' ? 12 : 13;
              break;
            case 9:
              return _context2.abrupt("return", this.handleSMSPayment(phoneNumber, messageParts));
            case 10:
              return _context2.abrupt("return", this.handleSMSTransfer(phoneNumber, messageParts));
            case 11:
              return _context2.abrupt("return", this.handleSMSBalanceCheck(phoneNumber));
            case 12:
              return _context2.abrupt("return", this.getSMSHelpMenu(phoneNumber));
            case 13:
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INVALID_SMS_COMMAND,
                message: 'Invalid SMS command',
                responseMessage: 'Unknown command. Available commands: PAY, SEND, BALANCE, HELP'
              });
            case 14:
              _context2.next = 20;
              break;
            case 16:
              _context2.prev = 16;
              _context2.t1 = _context2["catch"](0);
              console.error('SMS processing error:', _context2.t1);
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.SMS_PROCESSING_ERROR,
                message: _context2.t1.message || 'Failed to process SMS request',
                responseMessage: 'Sorry, an error occurred. Please try again later.'
              });
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 16]]);
      }));
      function processSMSPayment(_x2) {
        return _processSMSPayment.apply(this, arguments);
      }
      return processSMSPayment;
    }()
    /**
     * Process an offline QR code payment
     * 
     * @param {Object} qrData - Offline QR payment information
     * @param {string} qrData.qrPayload - QR code payload
     * @param {string} qrData.deviceId - Device ID that scanned the QR code
     * @param {string} qrData.timestamp - Scan timestamp
     * @param {Object} qrData.paymentDetails - Payment details
     * @returns {Promise<Object>} Offline QR processing result
     */
    )
  }, {
    key: "processOfflineQR",
    value: (function () {
      var _processOfflineQR = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(qrData) {
        var qrPayload, deviceId, timestamp, paymentDetails, payloadParts, _payloadParts, merchantId, amount, currency, offlineTransactionId;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              qrPayload = qrData.qrPayload, deviceId = qrData.deviceId, timestamp = qrData.timestamp, paymentDetails = qrData.paymentDetails;
              if (!(!qrPayload || !deviceId || !paymentDetails)) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'QR payload, device ID, and payment details are required'
              });
            case 4:
              // Parse QR payload
              payloadParts = qrPayload.split('|');
              if (!(payloadParts.length < 3)) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INVALID_QR_PAYLOAD,
                message: 'Invalid QR payload format'
              });
            case 7:
              _payloadParts = _slicedToArray(payloadParts, 3), merchantId = _payloadParts[0], amount = _payloadParts[1], currency = _payloadParts[2]; // Generate offline transaction ID
              offlineTransactionId = "OFF-".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()); // In a real implementation, this would store the transaction for later synchronization
              // For this example, we'll simulate a successful offline transaction
              return _context3.abrupt("return", {
                success: true,
                offlineTransactionId: offlineTransactionId,
                merchantId: merchantId,
                amount: amount,
                currency: currency,
                deviceId: deviceId,
                status: 'PENDING_SYNC',
                syncRequired: true,
                expiresAt: new Date(Date.now() + this.maxOfflineTransactionAge * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString()
              });
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              console.error('Offline QR processing error:', _context3.t0);
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.OFFLINE_QR_ERROR,
                message: _context3.t0.message || 'Failed to process offline QR payment'
              });
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 12]]);
      }));
      function processOfflineQR(_x3) {
        return _processOfflineQR.apply(this, arguments);
      }
      return processOfflineQR;
    }()
    /**
     * Synchronize offline transactions
     * 
     * @param {Array<Object>} offlineTransactions - List of offline transactions to synchronize
     * @returns {Promise<Object>} Synchronization result
     */
    )
  }, {
    key: "synchronizeTransactions",
    value: (function () {
      var _synchronizeTransactions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(offlineTransactions) {
        var _this = this;
        var results;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              if (!(!Array.isArray(offlineTransactions) || offlineTransactions.length === 0)) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Valid offline transactions array is required'
              });
            case 3:
              _context4.next = 5;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              });
            case 5:
              // Process each transaction
              results = offlineTransactions.map(function (transaction) {
                // Check if transaction is too old
                var transactionDate = new Date(transaction.createdAt);
                var ageHours = (Date.now() - transactionDate.getTime()) / (1000 * 60 * 60);
                if (ageHours > _this.maxOfflineTransactionAge) {
                  return {
                    offlineTransactionId: transaction.offlineTransactionId,
                    success: false,
                    status: 'EXPIRED',
                    error: _constants.ERROR_CODES.TRANSACTION_EXPIRED,
                    message: 'Transaction has expired'
                  };
                }

                // Simulate 95% success rate for valid transactions
                var isSuccess = Math.random() < 0.95;
                if (isSuccess) {
                  // Generate online transaction ID
                  var transactionId = (0, _uuid.v4)();
                  return {
                    offlineTransactionId: transaction.offlineTransactionId,
                    transactionId: transactionId,
                    success: true,
                    status: 'COMPLETED',
                    syncedAt: new Date().toISOString()
                  };
                } else {
                  return {
                    offlineTransactionId: transaction.offlineTransactionId,
                    success: false,
                    status: 'FAILED',
                    error: _constants.ERROR_CODES.SYNC_FAILED,
                    message: 'Failed to synchronize transaction'
                  };
                }
              });
              return _context4.abrupt("return", {
                success: true,
                totalTransactions: offlineTransactions.length,
                successfulTransactions: results.filter(function (r) {
                  return r.success;
                }).length,
                failedTransactions: results.filter(function (r) {
                  return !r.success;
                }).length,
                results: results,
                syncedAt: new Date().toISOString()
              });
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              console.error('Transaction synchronization error:', _context4.t0);
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.SYNC_ERROR,
                message: _context4.t0.message || 'Failed to synchronize transactions'
              });
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function synchronizeTransactions(_x4) {
        return _synchronizeTransactions.apply(this, arguments);
      }
      return synchronizeTransactions;
    }()
    /**
     * Generate an offline payment token
     * 
     * @param {Object} tokenData - Token generation information
     * @param {string} tokenData.merchantId - Merchant ID
     * @param {string} tokenData.amount - Payment amount
     * @param {string} tokenData.currency - Currency code
     * @param {number} tokenData.validityHours - Token validity in hours
     * @returns {Promise<Object>} Generated token
     */
    )
  }, {
    key: "generateOfflineToken",
    value: (function () {
      var _generateOfflineToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(tokenData) {
        var _tokenData$merchantId, merchantId, amount, currency, _tokenData$validityHo, validityHours, tokenId, expiryTime, payload, signature, qrPayload, shortCode;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _tokenData$merchantId = tokenData.merchantId, merchantId = _tokenData$merchantId === void 0 ? this.merchantId : _tokenData$merchantId, amount = tokenData.amount, currency = tokenData.currency, _tokenData$validityHo = tokenData.validityHours, validityHours = _tokenData$validityHo === void 0 ? 24 : _tokenData$validityHo;
              if (!(!merchantId || !amount || !currency)) {
                _context5.next = 4;
                break;
              }
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Merchant ID, amount, and currency are required'
              });
            case 4:
              // Generate token
              tokenId = _crypto["default"].randomBytes(4).toString('hex').toUpperCase(); // Calculate expiry time
              expiryTime = new Date(Date.now() + validityHours * 60 * 60 * 1000).toISOString(); // Create token payload
              payload = "".concat(merchantId, "|").concat(amount, "|").concat(currency, "|").concat(tokenId, "|").concat(expiryTime); // In a real implementation, this would sign the payload with a private key
              // For this example, we'll just create a simple signature
              signature = _crypto["default"].createHash('sha256').update(payload).digest('hex').substring(0, 8); // Create QR payload
              qrPayload = "".concat(payload, "|").concat(signature); // Create SMS/USSD code
              shortCode = "".concat(tokenId, "-").concat(signature.substring(0, 4));
              return _context5.abrupt("return", {
                success: true,
                tokenId: tokenId,
                merchantId: merchantId,
                amount: amount,
                currency: currency,
                qrPayload: qrPayload,
                shortCode: shortCode,
                expiryTime: expiryTime,
                createdAt: new Date().toISOString()
              });
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              console.error('Offline token generation error:', _context5.t0);
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.TOKEN_GENERATION_ERROR,
                message: _context5.t0.message || 'Failed to generate offline token'
              });
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 13]]);
      }));
      function generateOfflineToken(_x5) {
        return _generateOfflineToken.apply(this, arguments);
      }
      return generateOfflineToken;
    }()
    /**
     * Verify an offline payment token
     * 
     * @param {Object} verificationData - Token verification information
     * @param {string} verificationData.token - Token to verify
     * @param {string} verificationData.merchantId - Merchant ID
     * @returns {Promise<Object>} Verification result
     */
    )
  }, {
    key: "verifyOfflineToken",
    value: (function () {
      var _verifyOfflineToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(verificationData) {
        var token, _verificationData$mer, merchantId, isValid, amount, currency, expiryTime;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              token = verificationData.token, _verificationData$mer = verificationData.merchantId, merchantId = _verificationData$mer === void 0 ? this.merchantId : _verificationData$mer;
              if (!(!token || !merchantId)) {
                _context6.next = 4;
                break;
              }
              return _context6.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Token and merchant ID are required'
              });
            case 4:
              _context6.next = 6;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 6:
              // Simulate 90% success rate
              isValid = Math.random() < 0.9;
              if (isValid) {
                _context6.next = 9;
                break;
              }
              return _context6.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INVALID_TOKEN,
                message: 'Invalid or expired token'
              });
            case 9:
              // Generate fake token data
              amount = "".concat(Math.floor(Math.random() * 1000), ".").concat(Math.floor(Math.random() * 100).toString().padStart(2, '0'));
              currency = ['USD', 'EUR', 'KES', 'NGN', 'GHS'][Math.floor(Math.random() * 5)];
              expiryTime = new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString();
              return _context6.abrupt("return", {
                success: true,
                tokenId: token.split('-')[0],
                merchantId: merchantId,
                amount: amount,
                currency: currency,
                isValid: true,
                expiryTime: expiryTime,
                verifiedAt: new Date().toISOString()
              });
            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              console.error('Token verification error:', _context6.t0);
              return _context6.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.TOKEN_VERIFICATION_ERROR,
                message: _context6.t0.message || 'Failed to verify token'
              });
            case 19:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 15]]);
      }));
      function verifyOfflineToken(_x6) {
        return _verifyOfflineToken.apply(this, arguments);
      }
      return verifyOfflineToken;
    }()
    /**
     * Get USSD main menu
     * 
     * @private
     * @param {string} sessionId - USSD session ID
     * @param {string} phoneNumber - Customer phone number
     * @returns {Object} USSD menu response
     */
    )
  }, {
    key: "getUSSDMainMenu",
    value: function getUSSDMainMenu(sessionId, phoneNumber) {
      return {
        success: true,
        responseType: 'CON',
        responseString: 'Welcome to Sunny Payments\n1. Check Balance\n2. Send Money\n3. Pay Merchant\n4. Buy Airtime',
        sessionId: sessionId,
        phoneNumber: phoneNumber
      };
    }

    /**
     * Handle USSD balance check
     * 
     * @private
     * @param {string} sessionId - USSD session ID
     * @param {string} phoneNumber - Customer phone number
     * @param {string} network - Mobile network operator
     * @returns {Object} USSD balance response
     */
  }, {
    key: "handleUSSDBalanceCheck",
    value: (function () {
      var _handleUSSDBalanceCheck = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(sessionId, phoneNumber, network) {
        var balance, currency;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 2:
              balance = "".concat(Math.floor(Math.random() * 10000), ".").concat(Math.floor(Math.random() * 100).toString().padStart(2, '0'));
              currency = ['USD', 'EUR', 'KES', 'NGN', 'GHS'][Math.floor(Math.random() * 5)];
              return _context7.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: "Your balance is ".concat(currency, " ").concat(balance),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function handleUSSDBalanceCheck(_x7, _x8, _x9) {
        return _handleUSSDBalanceCheck.apply(this, arguments);
      }
      return handleUSSDBalanceCheck;
    }()
    /**
     * Handle USSD send money
     * 
     * @private
     * @param {string} sessionId - USSD session ID
     * @param {string} phoneNumber - Customer phone number
     * @param {Array<string>} inputParts - USSD input parts
     * @param {string} network - Mobile network operator
     * @returns {Object} USSD send money response
     */
    )
  }, {
    key: "handleUSSDSendMoney",
    value: (function () {
      var _handleUSSDSendMoney = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(sessionId, phoneNumber, inputParts, network) {
        var recipient, amount, _recipient, _amount, confirmation, transactionId;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!(inputParts.length === 1)) {
                _context8.next = 4;
                break;
              }
              return _context8.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: 'Enter recipient phone number:',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 4:
              if (!(inputParts.length === 2)) {
                _context8.next = 8;
                break;
              }
              return _context8.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: 'Enter amount to send:',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 8:
              if (!(inputParts.length === 3)) {
                _context8.next = 14;
                break;
              }
              // Third stage - confirm transaction
              recipient = inputParts[1];
              amount = inputParts[2];
              return _context8.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: "Send ".concat(amount, " to ").concat(recipient, "?\n1. Confirm\n2. Cancel"),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 14:
              if (!(inputParts.length === 4)) {
                _context8.next = 26;
                break;
              }
              // Final stage - process transaction
              _recipient = inputParts[1];
              _amount = inputParts[2];
              confirmation = inputParts[3];
              if (!(confirmation === '1')) {
                _context8.next = 25;
                break;
              }
              _context8.next = 21;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 21:
              // Generate transaction ID
              transactionId = "USSD".concat(_crypto["default"].randomBytes(4).toString('hex').toUpperCase());
              return _context8.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: "Money sent successfully to ".concat(_recipient, ". Transaction ID: ").concat(transactionId),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 25:
              return _context8.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: 'Transaction cancelled',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 26:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function handleUSSDSendMoney(_x0, _x1, _x10, _x11) {
        return _handleUSSDSendMoney.apply(this, arguments);
      }
      return handleUSSDSendMoney;
    }()
    /**
     * Handle USSD pay merchant
     * 
     * @private
     * @param {string} sessionId - USSD session ID
     * @param {string} phoneNumber - Customer phone number
     * @param {Array<string>} inputParts - USSD input parts
     * @param {string} network - Mobile network operator
     * @returns {Object} USSD pay merchant response
     */
    )
  }, {
    key: "handleUSSDPayMerchant",
    value: (function () {
      var _handleUSSDPayMerchant = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(sessionId, phoneNumber, inputParts, network) {
        var merchantCode, amount, _merchantCode, _amount2, confirmation, transactionId;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (!(inputParts.length === 1)) {
                _context9.next = 4;
                break;
              }
              return _context9.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: 'Enter merchant code:',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 4:
              if (!(inputParts.length === 2)) {
                _context9.next = 8;
                break;
              }
              return _context9.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: 'Enter amount to pay:',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 8:
              if (!(inputParts.length === 3)) {
                _context9.next = 14;
                break;
              }
              // Third stage - confirm transaction
              merchantCode = inputParts[1];
              amount = inputParts[2];
              return _context9.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: "Pay ".concat(amount, " to merchant ").concat(merchantCode, "?\n1. Confirm\n2. Cancel"),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 14:
              if (!(inputParts.length === 4)) {
                _context9.next = 26;
                break;
              }
              // Final stage - process transaction
              _merchantCode = inputParts[1];
              _amount2 = inputParts[2];
              confirmation = inputParts[3];
              if (!(confirmation === '1')) {
                _context9.next = 25;
                break;
              }
              _context9.next = 21;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 21:
              // Generate transaction ID
              transactionId = "USSD".concat(_crypto["default"].randomBytes(4).toString('hex').toUpperCase());
              return _context9.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: "Payment successful to merchant ".concat(_merchantCode, ". Transaction ID: ").concat(transactionId),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 25:
              return _context9.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: 'Transaction cancelled',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 26:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function handleUSSDPayMerchant(_x12, _x13, _x14, _x15) {
        return _handleUSSDPayMerchant.apply(this, arguments);
      }
      return handleUSSDPayMerchant;
    }()
    /**
     * Handle USSD buy airtime
     * 
     * @private
     * @param {string} sessionId - USSD session ID
     * @param {string} phoneNumber - Customer phone number
     * @param {Array<string>} inputParts - USSD input parts
     * @param {string} network - Mobile network operator
     * @returns {Object} USSD buy airtime response
     */
    )
  }, {
    key: "handleUSSDBuyAirtime",
    value: (function () {
      var _handleUSSDBuyAirtime = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(sessionId, phoneNumber, inputParts, network) {
        var recipient, _recipient2, amount, _recipient3, _amount3, confirmation, transactionId;
        return _regeneratorRuntime().wrap(function _callee0$(_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              if (!(inputParts.length === 1)) {
                _context0.next = 4;
                break;
              }
              return _context0.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: 'Enter phone number (or press # for self):',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 4:
              if (!(inputParts.length === 2)) {
                _context0.next = 9;
                break;
              }
              // Second stage - ask for amount
              recipient = inputParts[1] === '#' ? phoneNumber : inputParts[1];
              return _context0.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: 'Enter airtime amount:',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 9:
              if (!(inputParts.length === 3)) {
                _context0.next = 15;
                break;
              }
              // Third stage - confirm transaction
              _recipient2 = inputParts[1] === '#' ? phoneNumber : inputParts[1];
              amount = inputParts[2];
              return _context0.abrupt("return", {
                success: true,
                responseType: 'CON',
                responseString: "Buy ".concat(amount, " airtime for ").concat(_recipient2, "?\n1. Confirm\n2. Cancel"),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 15:
              if (!(inputParts.length === 4)) {
                _context0.next = 27;
                break;
              }
              // Final stage - process transaction
              _recipient3 = inputParts[1] === '#' ? phoneNumber : inputParts[1];
              _amount3 = inputParts[2];
              confirmation = inputParts[3];
              if (!(confirmation === '1')) {
                _context0.next = 26;
                break;
              }
              _context0.next = 22;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 22:
              // Generate transaction ID
              transactionId = "USSD".concat(_crypto["default"].randomBytes(4).toString('hex').toUpperCase());
              return _context0.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: "Airtime purchased successfully for ".concat(_recipient3, ". Transaction ID: ").concat(transactionId),
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 26:
              return _context0.abrupt("return", {
                success: true,
                responseType: 'END',
                responseString: 'Transaction cancelled',
                sessionId: sessionId,
                phoneNumber: phoneNumber
              });
            case 27:
            case "end":
              return _context0.stop();
          }
        }, _callee0);
      }));
      function handleUSSDBuyAirtime(_x16, _x17, _x18, _x19) {
        return _handleUSSDBuyAirtime.apply(this, arguments);
      }
      return handleUSSDBuyAirtime;
    }()
    /**
     * Handle SMS payment
     * 
     * @private
     * @param {string} phoneNumber - Sender phone number
     * @param {Array<string>} messageParts - SMS message parts
     * @returns {Object} SMS payment response
     */
    )
  }, {
    key: "handleSMSPayment",
    value: (function () {
      var _handleSMSPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(phoneNumber, messageParts) {
        var merchantCode, amount, transactionId;
        return _regeneratorRuntime().wrap(function _callee1$(_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              if (!(messageParts.length < 3)) {
                _context1.next = 2;
                break;
              }
              return _context1.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INVALID_SMS_FORMAT,
                message: 'Invalid SMS format',
                responseMessage: 'Invalid format. Use: PAY <merchant_code> <amount>'
              });
            case 2:
              merchantCode = messageParts[1];
              amount = messageParts[2]; // In a real implementation, this would process the payment
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context1.next = 6;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 6:
              // Generate transaction ID
              transactionId = "SMS".concat(_crypto["default"].randomBytes(4).toString('hex').toUpperCase());
              return _context1.abrupt("return", {
                success: true,
                transactionId: transactionId,
                merchantCode: merchantCode,
                amount: amount,
                phoneNumber: phoneNumber,
                status: 'COMPLETED',
                responseMessage: "Payment of ".concat(amount, " to merchant ").concat(merchantCode, " successful. Transaction ID: ").concat(transactionId),
                processedAt: new Date().toISOString()
              });
            case 8:
            case "end":
              return _context1.stop();
          }
        }, _callee1);
      }));
      function handleSMSPayment(_x20, _x21) {
        return _handleSMSPayment.apply(this, arguments);
      }
      return handleSMSPayment;
    }()
    /**
     * Handle SMS transfer
     * 
     * @private
     * @param {string} phoneNumber - Sender phone number
     * @param {Array<string>} messageParts - SMS message parts
     * @returns {Object} SMS transfer response
     */
    )
  }, {
    key: "handleSMSTransfer",
    value: (function () {
      var _handleSMSTransfer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(phoneNumber, messageParts) {
        var recipient, amount, transactionId;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (!(messageParts.length < 3)) {
                _context10.next = 2;
                break;
              }
              return _context10.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INVALID_SMS_FORMAT,
                message: 'Invalid SMS format',
                responseMessage: 'Invalid format. Use: SEND <recipient_phone> <amount>'
              });
            case 2:
              recipient = messageParts[1];
              amount = messageParts[2]; // In a real implementation, this would process the transfer
              // For this example, we'll simulate a successful transfer
              // Simulate processing delay
              _context10.next = 6;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 6:
              // Generate transaction ID
              transactionId = "SMS".concat(_crypto["default"].randomBytes(4).toString('hex').toUpperCase());
              return _context10.abrupt("return", {
                success: true,
                transactionId: transactionId,
                recipient: recipient,
                amount: amount,
                phoneNumber: phoneNumber,
                status: 'COMPLETED',
                responseMessage: "Transfer of ".concat(amount, " to ").concat(recipient, " successful. Transaction ID: ").concat(transactionId),
                processedAt: new Date().toISOString()
              });
            case 8:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function handleSMSTransfer(_x22, _x23) {
        return _handleSMSTransfer.apply(this, arguments);
      }
      return handleSMSTransfer;
    }()
    /**
     * Handle SMS balance check
     * 
     * @private
     * @param {string} phoneNumber - Sender phone number
     * @returns {Object} SMS balance response
     */
    )
  }, {
    key: "handleSMSBalanceCheck",
    value: (function () {
      var _handleSMSBalanceCheck = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(phoneNumber) {
        var balance, currency;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 2:
              balance = "".concat(Math.floor(Math.random() * 10000), ".").concat(Math.floor(Math.random() * 100).toString().padStart(2, '0'));
              currency = ['USD', 'EUR', 'KES', 'NGN', 'GHS'][Math.floor(Math.random() * 5)];
              return _context11.abrupt("return", {
                success: true,
                phoneNumber: phoneNumber,
                balance: balance,
                currency: currency,
                responseMessage: "Your Sunny balance is ".concat(currency, " ").concat(balance),
                checkedAt: new Date().toISOString()
              });
            case 5:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function handleSMSBalanceCheck(_x24) {
        return _handleSMSBalanceCheck.apply(this, arguments);
      }
      return handleSMSBalanceCheck;
    }()
    /**
     * Get SMS help menu
     * 
     * @private
     * @param {string} phoneNumber - Sender phone number
     * @returns {Object} SMS help response
     */
    )
  }, {
    key: "getSMSHelpMenu",
    value: function getSMSHelpMenu(phoneNumber) {
      return {
        success: true,
        phoneNumber: phoneNumber,
        responseMessage: 'Sunny SMS commands:\n' + 'PAY <merchant_code> <amount> - Pay a merchant\n' + 'SEND <phone> <amount> - Send money\n' + 'BALANCE - Check your balance\n' + 'HELP - Show this menu'
      };
    }
  }]);
}();
var _default = exports["default"] = OfflineProcessor;