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
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Sunny Payment Gateway - Hardware Integration
 * 
 * Manages integration with payment hardware devices
 * Supports POS terminals, card readers, QR scanners, and biometric devices
 */
var HardwareIntegration = /*#__PURE__*/function () {
  function HardwareIntegration() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, HardwareIntegration);
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' ? 'https://hardware.sunnypayments.com/v1' : 'https://sandbox-hardware.sunnypayments.com/v1';
    this.merchantId = config.merchantId || process.env.SUNNY_MERCHANT_ID;
    this.apiKey = config.apiKey || process.env.SUNNY_API_KEY;
  }

  /**
   * Register a new hardware device
   * 
   * @param {Object} deviceData - Device information
   * @param {string} deviceData.deviceType - Type of device (pos, cardReader, qrScanner, biometric)
   * @param {string} deviceData.model - Device model
   * @param {string} deviceData.serialNumber - Device serial number
   * @param {string} deviceData.merchantId - Merchant ID
   * @param {string} deviceData.locationId - Location ID
   * @returns {Promise<Object>} Registration result
   */
  return _createClass(HardwareIntegration, [{
    key: "registerDevice",
    value: (function () {
      var _registerDevice = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(deviceData) {
        var deviceType, model, serialNumber, _deviceData$merchantI, merchantId, locationId, deviceId;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              deviceType = deviceData.deviceType, model = deviceData.model, serialNumber = deviceData.serialNumber, _deviceData$merchantI = deviceData.merchantId, merchantId = _deviceData$merchantI === void 0 ? this.merchantId : _deviceData$merchantI, locationId = deviceData.locationId;
              if (!(!deviceType || !model || !serialNumber || !merchantId)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device type, model, serial number, and merchant ID are required'
              });
            case 4:
              // Generate device ID
              deviceId = "DEV-".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()); // In a real implementation, this would register the device with the backend
              // For this example, we'll simulate a successful registration
              // Simulate processing delay
              _context.next = 7;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 7:
              return _context.abrupt("return", {
                success: true,
                deviceId: deviceId,
                deviceType: deviceType,
                model: model,
                serialNumber: serialNumber,
                merchantId: merchantId,
                locationId: locationId,
                status: 'ACTIVE',
                activationCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase(),
                registeredAt: new Date().toISOString()
              });
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error('Device registration error:', _context.t0);
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.DEVICE_REGISTRATION_ERROR,
                message: _context.t0.message || 'Failed to register device'
              });
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function registerDevice(_x) {
        return _registerDevice.apply(this, arguments);
      }
      return registerDevice;
    }()
    /**
     * Process a payment using a POS terminal
     * 
     * @param {Object} paymentData - Payment information
     * @param {string} paymentData.deviceId - POS device ID
     * @param {string} paymentData.amount - Amount to charge
     * @param {string} paymentData.currency - Currency code
     * @param {string} paymentData.paymentMethod - Payment method (card, contactless, qr)
     * @param {Object} paymentData.metadata - Additional payment metadata
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processPOSPayment",
    value: (function () {
      var _processPOSPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(paymentData) {
        var deviceId, amount, currency, _paymentData$paymentM, paymentMethod, _paymentData$metadata, metadata, transactionId, processorResponse;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              deviceId = paymentData.deviceId, amount = paymentData.amount, currency = paymentData.currency, _paymentData$paymentM = paymentData.paymentMethod, paymentMethod = _paymentData$paymentM === void 0 ? 'card' : _paymentData$paymentM, _paymentData$metadata = paymentData.metadata, metadata = _paymentData$metadata === void 0 ? {} : _paymentData$metadata;
              if (!(!deviceId || !amount || !currency)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device ID, amount, and currency are required'
              });
            case 4:
              // Generate transaction ID
              transactionId = (0, _uuid.v4)(); // In a real implementation, this would communicate with the POS device
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context2.next = 7;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              });
            case 7:
              // Generate response based on payment method
              processorResponse = {};
              _context2.t0 = paymentMethod;
              _context2.next = _context2.t0 === 'card' ? 11 : _context2.t0 === 'contactless' ? 13 : _context2.t0 === 'qr' ? 15 : 17;
              break;
            case 11:
              processorResponse = {
                cardType: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'][Math.floor(Math.random() * 4)],
                last4: "".concat(Math.floor(1000 + Math.random() * 9000)),
                authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase(),
                entryMode: ['CHIP', 'SWIPE', 'MANUAL'][Math.floor(Math.random() * 3)]
              };
              return _context2.abrupt("break", 18);
            case 13:
              processorResponse = {
                method: ['APPLE_PAY', 'GOOGLE_PAY', 'CONTACTLESS_CARD'][Math.floor(Math.random() * 3)],
                tokenId: "TKN".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()),
                authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase()
              };
              return _context2.abrupt("break", 18);
            case 15:
              processorResponse = {
                qrType: ['ALIPAY', 'WECHAT', 'MPESA', 'SUNNY_QR'][Math.floor(Math.random() * 4)],
                qrId: "QR".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase()),
                authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase()
              };
              return _context2.abrupt("break", 18);
            case 17:
              processorResponse = {
                authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase()
              };
            case 18:
              return _context2.abrupt("return", {
                success: true,
                transactionId: transactionId,
                deviceId: deviceId,
                amount: amount,
                currency: currency,
                paymentMethod: paymentMethod,
                status: 'COMPLETED',
                processorResponse: processorResponse,
                receiptNumber: "R".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                completedAt: new Date().toISOString()
              });
            case 21:
              _context2.prev = 21;
              _context2.t1 = _context2["catch"](0);
              console.error('POS payment error:', _context2.t1);
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.POS_PAYMENT_ERROR,
                message: _context2.t1.message || 'Failed to process POS payment'
              });
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 21]]);
      }));
      function processPOSPayment(_x2) {
        return _processPOSPayment.apply(this, arguments);
      }
      return processPOSPayment;
    }()
    /**
     * Process a payment using a mobile card reader
     * 
     * @param {Object} paymentData - Payment information
     * @param {string} paymentData.deviceId - Card reader device ID
     * @param {string} paymentData.amount - Amount to charge
     * @param {string} paymentData.currency - Currency code
     * @param {Object} paymentData.metadata - Additional payment metadata
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processCardReaderPayment",
    value: (function () {
      var _processCardReaderPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(paymentData) {
        var deviceId, amount, currency, _paymentData$metadata2, metadata, transactionId;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              deviceId = paymentData.deviceId, amount = paymentData.amount, currency = paymentData.currency, _paymentData$metadata2 = paymentData.metadata, metadata = _paymentData$metadata2 === void 0 ? {} : _paymentData$metadata2;
              if (!(!deviceId || !amount || !currency)) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device ID, amount, and currency are required'
              });
            case 4:
              // Generate transaction ID
              transactionId = (0, _uuid.v4)(); // In a real implementation, this would communicate with the card reader
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context3.next = 7;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 800);
              });
            case 7:
              return _context3.abrupt("return", {
                success: true,
                transactionId: transactionId,
                deviceId: deviceId,
                amount: amount,
                currency: currency,
                paymentMethod: 'card',
                status: 'COMPLETED',
                processorResponse: {
                  cardType: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'][Math.floor(Math.random() * 4)],
                  last4: "".concat(Math.floor(1000 + Math.random() * 9000)),
                  authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase(),
                  entryMode: ['CHIP', 'SWIPE', 'CONTACTLESS'][Math.floor(Math.random() * 3)]
                },
                receiptNumber: "R".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                completedAt: new Date().toISOString()
              });
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.error('Card reader payment error:', _context3.t0);
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.CARD_READER_ERROR,
                message: _context3.t0.message || 'Failed to process card reader payment'
              });
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 10]]);
      }));
      function processCardReaderPayment(_x3) {
        return _processCardReaderPayment.apply(this, arguments);
      }
      return processCardReaderPayment;
    }()
    /**
     * Process a payment using biometric authentication
     * 
     * @param {Object} paymentData - Payment information
     * @param {string} paymentData.deviceId - Biometric device ID
     * @param {string} paymentData.amount - Amount to charge
     * @param {string} paymentData.currency - Currency code
     * @param {string} paymentData.biometricType - Type of biometric (face, fingerprint, palm)
     * @param {string} paymentData.customerId - Customer ID
     * @param {Object} paymentData.metadata - Additional payment metadata
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processBiometricPayment",
    value: (function () {
      var _processBiometricPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(paymentData) {
        var deviceId, amount, currency, _paymentData$biometri, biometricType, customerId, _paymentData$metadata3, metadata, transactionId, verificationScore;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              deviceId = paymentData.deviceId, amount = paymentData.amount, currency = paymentData.currency, _paymentData$biometri = paymentData.biometricType, biometricType = _paymentData$biometri === void 0 ? 'face' : _paymentData$biometri, customerId = paymentData.customerId, _paymentData$metadata3 = paymentData.metadata, metadata = _paymentData$metadata3 === void 0 ? {} : _paymentData$metadata3;
              if (!(!deviceId || !amount || !currency || !customerId)) {
                _context4.next = 4;
                break;
              }
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device ID, amount, currency, and customer ID are required'
              });
            case 4:
              // Generate transaction ID
              transactionId = (0, _uuid.v4)(); // In a real implementation, this would communicate with the biometric device
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context4.next = 7;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1200);
              });
            case 7:
              // Simulate biometric verification
              verificationScore = 0.85 + Math.random() * 0.15; // 0.85 to 1.0
              if (!(verificationScore < 0.9)) {
                _context4.next = 10;
                break;
              }
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.BIOMETRIC_VERIFICATION_FAILED,
                message: 'Biometric verification failed',
                verificationScore: verificationScore
              });
            case 10:
              return _context4.abrupt("return", {
                success: true,
                transactionId: transactionId,
                deviceId: deviceId,
                amount: amount,
                currency: currency,
                paymentMethod: 'biometric',
                biometricType: biometricType,
                customerId: customerId,
                status: 'COMPLETED',
                verificationScore: verificationScore,
                processorResponse: {
                  authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase(),
                  verificationId: "BIO".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase())
                },
                receiptNumber: "R".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                completedAt: new Date().toISOString()
              });
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              console.error('Biometric payment error:', _context4.t0);
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.BIOMETRIC_PAYMENT_ERROR,
                message: _context4.t0.message || 'Failed to process biometric payment'
              });
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 13]]);
      }));
      function processBiometricPayment(_x4) {
        return _processBiometricPayment.apply(this, arguments);
      }
      return processBiometricPayment;
    }()
    /**
     * Process a payment using gesture recognition
     * 
     * @param {Object} paymentData - Payment information
     * @param {string} paymentData.deviceId - Gesture recognition device ID
     * @param {string} paymentData.amount - Amount to charge
     * @param {string} paymentData.currency - Currency code
     * @param {string} paymentData.gestureType - Type of gesture (palm, hand, custom)
     * @param {string} paymentData.customerId - Customer ID
     * @param {Object} paymentData.metadata - Additional payment metadata
     * @returns {Promise<Object>} Transaction result
     */
    )
  }, {
    key: "processGesturePayment",
    value: (function () {
      var _processGesturePayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(paymentData) {
        var deviceId, amount, currency, _paymentData$gestureT, gestureType, customerId, _paymentData$metadata4, metadata, transactionId, verificationScore;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              deviceId = paymentData.deviceId, amount = paymentData.amount, currency = paymentData.currency, _paymentData$gestureT = paymentData.gestureType, gestureType = _paymentData$gestureT === void 0 ? 'palm' : _paymentData$gestureT, customerId = paymentData.customerId, _paymentData$metadata4 = paymentData.metadata, metadata = _paymentData$metadata4 === void 0 ? {} : _paymentData$metadata4;
              if (!(!deviceId || !amount || !currency || !customerId)) {
                _context5.next = 4;
                break;
              }
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device ID, amount, currency, and customer ID are required'
              });
            case 4:
              // Generate transaction ID
              transactionId = (0, _uuid.v4)(); // In a real implementation, this would communicate with the gesture recognition device
              // For this example, we'll simulate a successful payment
              // Simulate processing delay
              _context5.next = 7;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1500);
              });
            case 7:
              // Simulate gesture verification
              verificationScore = 0.8 + Math.random() * 0.2; // 0.8 to 1.0
              if (!(verificationScore < 0.85)) {
                _context5.next = 10;
                break;
              }
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.GESTURE_VERIFICATION_FAILED,
                message: 'Gesture verification failed',
                verificationScore: verificationScore
              });
            case 10:
              return _context5.abrupt("return", {
                success: true,
                transactionId: transactionId,
                deviceId: deviceId,
                amount: amount,
                currency: currency,
                paymentMethod: 'gesture',
                gestureType: gestureType,
                customerId: customerId,
                status: 'COMPLETED',
                verificationScore: verificationScore,
                processorResponse: {
                  authCode: _crypto["default"].randomBytes(3).toString('hex').toUpperCase(),
                  verificationId: "GST".concat(_crypto["default"].randomBytes(8).toString('hex').toUpperCase())
                },
                receiptNumber: "R".concat(_crypto["default"].randomBytes(6).toString('hex').toUpperCase()),
                completedAt: new Date().toISOString()
              });
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              console.error('Gesture payment error:', _context5.t0);
              return _context5.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.GESTURE_PAYMENT_ERROR,
                message: _context5.t0.message || 'Failed to process gesture payment'
              });
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 13]]);
      }));
      function processGesturePayment(_x5) {
        return _processGesturePayment.apply(this, arguments);
      }
      return processGesturePayment;
    }()
    /**
     * Get device status and information
     * 
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Device status and information
     */
    )
  }, {
    key: "getDeviceStatus",
    value: (function () {
      var _getDeviceStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(deviceId) {
        var batteryLevel, isOnline, firmwareVersion, lastSeen;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              if (deviceId) {
                _context6.next = 3;
                break;
              }
              return _context6.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device ID is required'
              });
            case 3:
              _context6.next = 5;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 5:
              // Generate random device status
              batteryLevel = Math.floor(Math.random() * 100);
              isOnline = Math.random() > 0.1; // 90% chance of being online
              firmwareVersion = '1.2.3';
              lastSeen = new Date(Date.now() - Math.random() * 86400000).toISOString(); // Within last 24 hours
              return _context6.abrupt("return", {
                success: true,
                deviceId: deviceId,
                status: isOnline ? 'ONLINE' : 'OFFLINE',
                batteryLevel: "".concat(batteryLevel, "%"),
                firmwareVersion: firmwareVersion,
                lastSeen: lastSeen,
                lastTransaction: isOnline && Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 3600000).toISOString() : null,
                needsUpdate: Math.random() > 0.7,
                checkedAt: new Date().toISOString()
              });
            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              console.error('Get device status error:', _context6.t0);
              return _context6.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.DEVICE_STATUS_ERROR,
                message: _context6.t0.message || 'Failed to get device status'
              });
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 12]]);
      }));
      function getDeviceStatus(_x6) {
        return _getDeviceStatus.apply(this, arguments);
      }
      return getDeviceStatus;
    }()
    /**
     * Update device firmware
     * 
     * @param {string} deviceId - Device ID
     * @param {string} firmwareVersion - Target firmware version
     * @returns {Promise<Object>} Update result
     */
    )
  }, {
    key: "updateDeviceFirmware",
    value: (function () {
      var _updateDeviceFirmware = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(deviceId, firmwareVersion) {
        var updateSuccess;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              if (!(!deviceId || !firmwareVersion)) {
                _context7.next = 3;
                break;
              }
              return _context7.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Device ID and firmware version are required'
              });
            case 3:
              _context7.next = 5;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 5:
              // Simulate update success with 90% probability
              updateSuccess = Math.random() > 0.1;
              if (updateSuccess) {
                _context7.next = 8;
                break;
              }
              return _context7.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.FIRMWARE_UPDATE_FAILED,
                message: 'Firmware update failed',
                deviceId: deviceId,
                firmwareVersion: firmwareVersion
              });
            case 8:
              return _context7.abrupt("return", {
                success: true,
                deviceId: deviceId,
                previousVersion: '1.1.7',
                newVersion: firmwareVersion,
                updateStatus: 'COMPLETED',
                updatedAt: new Date().toISOString()
              });
            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              console.error('Firmware update error:', _context7.t0);
              return _context7.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.FIRMWARE_UPDATE_ERROR,
                message: _context7.t0.message || 'Failed to update firmware'
              });
            case 15:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 11]]);
      }));
      function updateDeviceFirmware(_x7, _x8) {
        return _updateDeviceFirmware.apply(this, arguments);
      }
      return updateDeviceFirmware;
    }())
  }]);
}();
var _default = exports["default"] = HardwareIntegration;