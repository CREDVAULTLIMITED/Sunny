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
 * Sunny Payment Gateway - P2P Transfer Manager
 * 
 * Handles peer-to-peer transfers between Sunny users
 * Supports transfers via phone number, email, username, and QR code
 */
var P2PTransferManager = /*#__PURE__*/function () {
  function P2PTransferManager() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, P2PTransferManager);
    this.environment = config.environment || process.env.SUNNY_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' ? 'https://p2p.sunnypayments.com/v1' : 'https://sandbox-p2p.sunnypayments.com/v1';
  }

  /**
   * Send money to another Sunny user
   * 
   * @param {Object} transferData - Transfer information
   * @param {string} transferData.senderId - Sender's Sunny ID
   * @param {string} transferData.recipientAlias - Recipient's alias (phone, email, username)
   * @param {string} transferData.aliasType - Type of alias (phoneNumber, email, username)
   * @param {string} transferData.amount - Amount to send
   * @param {string} transferData.currency - Currency code
   * @param {string} transferData.note - Optional note for the recipient
   * @param {string} transferData.senderWalletId - Optional sender wallet ID
   * @returns {Promise<Object>} Transfer result
   */
  return _createClass(P2PTransferManager, [{
    key: "sendMoney",
    value: (function () {
      var _sendMoney = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(transferData) {
        var senderId, recipientAlias, aliasType, amount, currency, _transferData$note, note, _transferData$senderW, senderWalletId, transferId, recipientId, hasSufficientBalance;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              senderId = transferData.senderId, recipientAlias = transferData.recipientAlias, aliasType = transferData.aliasType, amount = transferData.amount, currency = transferData.currency, _transferData$note = transferData.note, note = _transferData$note === void 0 ? '' : _transferData$note, _transferData$senderW = transferData.senderWalletId, senderWalletId = _transferData$senderW === void 0 ? 'default' : _transferData$senderW;
              if (!(!senderId || !recipientAlias || !aliasType || !amount || !currency)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Sender ID, recipient alias, alias type, amount, and currency are required'
              });
            case 4:
              // Generate transfer ID
              transferId = (0, _uuid.v4)(); // Resolve recipient alias to Sunny ID
              _context.next = 7;
              return this.resolveRecipientId(recipientAlias, aliasType);
            case 7:
              recipientId = _context.sent;
              if (recipientId) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.RECIPIENT_NOT_FOUND,
                message: 'Recipient not found'
              });
            case 10:
              _context.next = 12;
              return this.checkBalance(senderId, senderWalletId, amount, currency);
            case 12:
              hasSufficientBalance = _context.sent;
              if (hasSufficientBalance) {
                _context.next = 15;
                break;
              }
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INSUFFICIENT_FUNDS,
                message: 'Insufficient funds'
              });
            case 15:
              _context.next = 17;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 17:
              return _context.abrupt("return", {
                success: true,
                transferId: transferId,
                senderId: senderId,
                recipientId: recipientId,
                recipientAlias: recipientAlias,
                aliasType: aliasType,
                amount: amount,
                currency: currency,
                note: note,
                status: 'COMPLETED',
                fee: '0.00',
                // P2P transfers could be free or have a small fee
                completedAt: new Date().toISOString()
              });
            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              console.error('P2P transfer error:', _context.t0);
              return _context.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.P2P_TRANSFER_ERROR,
                message: _context.t0.message || 'Failed to process P2P transfer'
              });
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 20]]);
      }));
      function sendMoney(_x) {
        return _sendMoney.apply(this, arguments);
      }
      return sendMoney;
    }()
    /**
     * Request money from another Sunny user
     * 
     * @param {Object} requestData - Money request information
     * @param {string} requestData.requesterId - Requester's Sunny ID
     * @param {string} requestData.payerAlias - Payer's alias (phone, email, username)
     * @param {string} requestData.aliasType - Type of alias (phoneNumber, email, username)
     * @param {string} requestData.amount - Amount to request
     * @param {string} requestData.currency - Currency code
     * @param {string} requestData.note - Optional note for the payer
     * @param {string} requestData.expiryHours - Hours until request expires
     * @returns {Promise<Object>} Request result
     */
    )
  }, {
    key: "requestMoney",
    value: (function () {
      var _requestMoney = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(requestData) {
        var requesterId, payerAlias, aliasType, amount, currency, _requestData$note, note, _requestData$expiryHo, expiryHours, requestId, payerId, expiryTime;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              requesterId = requestData.requesterId, payerAlias = requestData.payerAlias, aliasType = requestData.aliasType, amount = requestData.amount, currency = requestData.currency, _requestData$note = requestData.note, note = _requestData$note === void 0 ? '' : _requestData$note, _requestData$expiryHo = requestData.expiryHours, expiryHours = _requestData$expiryHo === void 0 ? 72 : _requestData$expiryHo;
              if (!(!requesterId || !payerAlias || !aliasType || !amount || !currency)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Requester ID, payer alias, alias type, amount, and currency are required'
              });
            case 4:
              // Generate request ID
              requestId = (0, _uuid.v4)(); // Resolve payer alias to Sunny ID
              _context2.next = 7;
              return this.resolveRecipientId(payerAlias, aliasType);
            case 7:
              payerId = _context2.sent;
              if (payerId) {
                _context2.next = 10;
                break;
              }
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.PAYER_NOT_FOUND,
                message: 'Payer not found'
              });
            case 10:
              // Calculate expiry time
              expiryTime = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(); // In a real implementation, this would store the request and notify the payer
              // For this example, we'll simulate a successful request creation
              // Simulate processing delay
              _context2.next = 13;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 200);
              });
            case 13:
              return _context2.abrupt("return", {
                success: true,
                requestId: requestId,
                requesterId: requesterId,
                payerId: payerId,
                payerAlias: payerAlias,
                aliasType: aliasType,
                amount: amount,
                currency: currency,
                note: note,
                status: 'PENDING',
                expiryTime: expiryTime,
                createdAt: new Date().toISOString()
              });
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              console.error('Money request error:', _context2.t0);
              return _context2.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.MONEY_REQUEST_ERROR,
                message: _context2.t0.message || 'Failed to create money request'
              });
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 16]]);
      }));
      function requestMoney(_x2) {
        return _requestMoney.apply(this, arguments);
      }
      return requestMoney;
    }()
    /**
     * Pay a money request
     * 
     * @param {Object} paymentData - Payment information
     * @param {string} paymentData.requestId - Request ID to pay
     * @param {string} paymentData.payerId - Payer's Sunny ID
     * @param {string} paymentData.payerWalletId - Optional payer wallet ID
     * @returns {Promise<Object>} Payment result
     */
    )
  }, {
    key: "payMoneyRequest",
    value: (function () {
      var _payMoneyRequest = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(paymentData) {
        var requestId, payerId, _paymentData$payerWal, payerWalletId, requestDetails, hasSufficientBalance, transferId;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              requestId = paymentData.requestId, payerId = paymentData.payerId, _paymentData$payerWal = paymentData.payerWalletId, payerWalletId = _paymentData$payerWal === void 0 ? 'default' : _paymentData$payerWal;
              if (!(!requestId || !payerId)) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Request ID and payer ID are required'
              });
            case 4:
              // In a real implementation, this would fetch the request details
              // For this example, we'll simulate a request
              requestDetails = {
                requestId: requestId,
                requesterId: (0, _uuid.v4)(),
                payerId: payerId,
                amount: '100.00',
                currency: 'USD',
                status: 'PENDING'
              }; // Check if request exists and is pending
              if (!(requestDetails.status !== 'PENDING')) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INVALID_REQUEST_STATE,
                message: 'Request is not in a payable state'
              });
            case 7:
              _context3.next = 9;
              return this.checkBalance(payerId, payerWalletId, requestDetails.amount, requestDetails.currency);
            case 9:
              hasSufficientBalance = _context3.sent;
              if (hasSufficientBalance) {
                _context3.next = 12;
                break;
              }
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.INSUFFICIENT_FUNDS,
                message: 'Insufficient funds'
              });
            case 12:
              _context3.next = 14;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 14:
              // Generate transfer ID
              transferId = (0, _uuid.v4)();
              return _context3.abrupt("return", {
                success: true,
                requestId: requestId,
                transferId: transferId,
                payerId: payerId,
                requesterId: requestDetails.requesterId,
                amount: requestDetails.amount,
                currency: requestDetails.currency,
                status: 'COMPLETED',
                fee: '0.00',
                completedAt: new Date().toISOString()
              });
            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              console.error('Pay money request error:', _context3.t0);
              return _context3.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.PAYMENT_ERROR,
                message: _context3.t0.message || 'Failed to pay money request'
              });
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 18]]);
      }));
      function payMoneyRequest(_x3) {
        return _payMoneyRequest.apply(this, arguments);
      }
      return payMoneyRequest;
    }()
    /**
     * Split a bill among multiple users
     * 
     * @param {Object} splitData - Bill split information
     * @param {string} splitData.organizerId - Organizer's Sunny ID
     * @param {string} splitData.title - Title of the bill
     * @param {string} splitData.totalAmount - Total bill amount
     * @param {string} splitData.currency - Currency code
     * @param {Array<Object>} splitData.participants - List of participants
     * @param {boolean} splitData.equal - Whether to split equally
     * @returns {Promise<Object>} Bill split result
     */
    )
  }, {
    key: "splitBill",
    value: (function () {
      var _splitBill = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(splitData) {
        var organizerId, title, totalAmount, currency, participants, _splitData$equal, equal, splitId, processedParticipants, individualAmount;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              organizerId = splitData.organizerId, title = splitData.title, totalAmount = splitData.totalAmount, currency = splitData.currency, participants = splitData.participants, _splitData$equal = splitData.equal, equal = _splitData$equal === void 0 ? true : _splitData$equal;
              if (!(!organizerId || !title || !totalAmount || !currency || !participants || !Array.isArray(participants))) {
                _context4.next = 4;
                break;
              }
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'Organizer ID, title, total amount, currency, and participants are required'
              });
            case 4:
              if (!(participants.length < 2)) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.VALIDATION_ERROR,
                message: 'At least 2 participants are required for bill splitting'
              });
            case 6:
              // Generate split ID
              splitId = (0, _uuid.v4)(); // Calculate individual amounts if equal split
              processedParticipants = [];
              if (equal) {
                individualAmount = (parseFloat(totalAmount) / participants.length).toFixed(2);
                processedParticipants = participants.map(function (participant) {
                  return _objectSpread(_objectSpread({}, participant), {}, {
                    amount: individualAmount,
                    status: participant.id === organizerId ? 'PAID' : 'PENDING'
                  });
                });
              } else {
                // Use provided amounts
                processedParticipants = participants.map(function (participant) {
                  return _objectSpread(_objectSpread({}, participant), {}, {
                    status: participant.id === organizerId ? 'PAID' : 'PENDING'
                  });
                });
              }

              // In a real implementation, this would store the bill split and notify participants
              // For this example, we'll simulate a successful bill split creation

              // Simulate processing delay
              _context4.next = 11;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 11:
              return _context4.abrupt("return", {
                success: true,
                splitId: splitId,
                organizerId: organizerId,
                title: title,
                totalAmount: totalAmount,
                currency: currency,
                participants: processedParticipants,
                status: 'ACTIVE',
                createdAt: new Date().toISOString()
              });
            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              console.error('Bill split error:', _context4.t0);
              return _context4.abrupt("return", {
                success: false,
                error: _constants.ERROR_CODES.BILL_SPLIT_ERROR,
                message: _context4.t0.message || 'Failed to create bill split'
              });
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 14]]);
      }));
      function splitBill(_x4) {
        return _splitBill.apply(this, arguments);
      }
      return splitBill;
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
    key: "resolveRecipientId",
    value: (function () {
      var _resolveRecipientId = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(alias, aliasType) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 2:
              if (!(Math.random() < 0.1)) {
                _context5.next = 4;
                break;
              }
              return _context5.abrupt("return", null);
            case 4:
              return _context5.abrupt("return", (0, _uuid.v4)());
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function resolveRecipientId(_x5, _x6) {
        return _resolveRecipientId.apply(this, arguments);
      }
      return resolveRecipientId;
    }()
    /**
     * Check if user has sufficient balance
     * 
     * @private
     * @param {string} userId - User ID
     * @param {string} walletId - Wallet ID
     * @param {string} amount - Amount to check
     * @param {string} currency - Currency code
     * @returns {Promise<boolean>} Whether user has sufficient balance
     */
    )
  }, {
    key: "checkBalance",
    value: (function () {
      var _checkBalance = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userId, walletId, amount, currency) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 2:
              return _context6.abrupt("return", Math.random() < 0.95);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function checkBalance(_x7, _x8, _x9, _x0) {
        return _checkBalance.apply(this, arguments);
      }
      return checkBalance;
    }())
  }]);
}();
var _default = exports["default"] = P2PTransferManager;