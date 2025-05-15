"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SunnyPaymentGateway = _interopRequireDefault(require("../core/SunnyPaymentGateway.js"));
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
 * Sunny Payment Gateway - CreditBoost Integration
 * 
 * Specialized integration for the CreditBoost platform
 */
var CreditBoostIntegration = /*#__PURE__*/function () {
  function CreditBoostIntegration() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CreditBoostIntegration);
    // Initialize the Sunny payment gateway with CreditBoost-specific settings
    this.gateway = new _SunnyPaymentGateway["default"](_objectSpread(_objectSpread({}, config), {}, {
      // Enable instant settlement by default for CreditBoost
      instantSettlement: config.instantSettlement !== false,
      // Set merchant tier based on CreditBoost partnership level
      merchantTier: config.merchantTier || 'premium'
    }));

    // CreditBoost-specific settings
    this.creditScoreBasedPricing = config.creditScoreBasedPricing !== false;
    this.enableCreditPassport = config.enableCreditPassport !== false;
    this.creditBoostUserId = config.creditBoostUserId;
  }

  /**
   * Process a payment with CreditBoost-specific features
   * 
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Transaction result
   */
  return _createClass(CreditBoostIntegration, [{
    key: "processPayment",
    value: (function () {
      var _processPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(paymentData) {
        var _paymentData$metadata, enhancedPaymentData, paymentResult, _paymentData$metadata2;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // Add CreditBoost-specific metadata
              enhancedPaymentData = _objectSpread(_objectSpread({}, paymentData), {}, {
                metadata: _objectSpread(_objectSpread({}, paymentData.metadata), {}, {
                  creditBoostIntegration: true,
                  creditBoostUserId: this.creditBoostUserId || ((_paymentData$metadata = paymentData.metadata) === null || _paymentData$metadata === void 0 ? void 0 : _paymentData$metadata.creditBoostUserId)
                })
              }); // Apply credit score-based pricing if enabled
              if (this.creditScoreBasedPricing && paymentData.creditScore) {
                enhancedPaymentData.customFeeOverride = this.calculateCreditScoreBasedFee(paymentData.creditScore);
              }

              // Process the payment through Sunny gateway
              _context.next = 5;
              return this.gateway.processPayment(enhancedPaymentData);
            case 5:
              paymentResult = _context.sent;
              if (!(paymentResult.success && this.enableCreditPassport)) {
                _context.next = 9;
                break;
              }
              _context.next = 9;
              return this.updateCreditPassport({
                userId: this.creditBoostUserId || ((_paymentData$metadata2 = paymentData.metadata) === null || _paymentData$metadata2 === void 0 ? void 0 : _paymentData$metadata2.creditBoostUserId),
                transactionId: paymentResult.transactionId,
                amount: paymentData.amount,
                currency: paymentData.currency,
                paymentMethod: paymentData.paymentMethod,
                timestamp: new Date().toISOString()
              });
            case 9:
              return _context.abrupt("return", paymentResult);
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.error('CreditBoost payment processing error:', _context.t0);
              return _context.abrupt("return", {
                success: false,
                error: 'CREDITBOOST_INTEGRATION_ERROR',
                message: 'Failed to process payment through CreditBoost integration',
                originalError: _context.t0.message
              });
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 12]]);
      }));
      function processPayment(_x) {
        return _processPayment.apply(this, arguments);
      }
      return processPayment;
    }()
    /**
     * Calculate fee adjustments based on credit score
     * 
     * @private
     * @param {number} creditScore - User's credit score
     * @returns {Object} Fee adjustment details
     */
    )
  }, {
    key: "calculateCreditScoreBasedFee",
    value: function calculateCreditScoreBasedFee(creditScore) {
      // Base discount percentage
      var discountPercentage = 0;

      // Adjust discount based on credit score ranges
      if (creditScore >= 800) {
        discountPercentage = 0.5; // 0.5% discount for excellent credit
      } else if (creditScore >= 740) {
        discountPercentage = 0.3; // 0.3% discount for very good credit
      } else if (creditScore >= 670) {
        discountPercentage = 0.1; // 0.1% discount for good credit
      }
      return {
        type: 'percentage_discount',
        value: discountPercentage,
        reason: 'Credit score based pricing',
        creditScore: creditScore
      };
    }

    /**
     * Update the user's credit passport with payment information
     * 
     * @private
     * @param {Object} passportData - Data to update in credit passport
     * @returns {Promise<Object>} Update result
     */
  }, {
    key: "updateCreditPassport",
    value: (function () {
      var _updateCreditPassport = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(passportData) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // In a real implementation, this would call the CreditBoost API
              // to update the user's credit passport with payment information

              console.log('Updating credit passport with payment data:', passportData);

              // Simulate API call
              _context2.next = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 4:
              return _context2.abrupt("return", {
                success: true,
                userId: passportData.userId,
                updated: true,
                timestamp: new Date().toISOString()
              });
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error('Failed to update credit passport:', _context2.t0);
              return _context2.abrupt("return", {
                success: false,
                error: 'CREDIT_PASSPORT_UPDATE_ERROR',
                message: 'Failed to update credit passport'
              });
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      function updateCreditPassport(_x2) {
        return _updateCreditPassport.apply(this, arguments);
      }
      return updateCreditPassport;
    }()
    /**
     * Create a subscription with credit score monitoring
     * 
     * @param {Object} subscriptionData - Subscription information
     * @returns {Promise<Object>} Subscription result
     */
    )
  }, {
    key: "createSubscription",
    value: (function () {
      var _createSubscription = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(subscriptionData) {
        var _subscriptionData$met, enhancedSubscriptionData, subscriptionResult;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              // Add CreditBoost-specific features to subscription
              enhancedSubscriptionData = _objectSpread(_objectSpread({}, subscriptionData), {}, {
                metadata: _objectSpread(_objectSpread({}, subscriptionData.metadata), {}, {
                  creditBoostIntegration: true,
                  creditScoreMonitoring: subscriptionData.creditScoreMonitoring !== false,
                  creditBoostUserId: this.creditBoostUserId || ((_subscriptionData$met = subscriptionData.metadata) === null || _subscriptionData$met === void 0 ? void 0 : _subscriptionData$met.creditBoostUserId)
                })
              }); // Create the subscription through Sunny gateway
              _context3.next = 4;
              return this.gateway.createSubscription(enhancedSubscriptionData);
            case 4:
              subscriptionResult = _context3.sent;
              return _context3.abrupt("return", subscriptionResult);
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.error('CreditBoost subscription error:', _context3.t0);
              return _context3.abrupt("return", {
                success: false,
                error: 'CREDITBOOST_SUBSCRIPTION_ERROR',
                message: 'Failed to create subscription through CreditBoost integration'
              });
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 8]]);
      }));
      function createSubscription(_x3) {
        return _createSubscription.apply(this, arguments);
      }
      return createSubscription;
    }()
    /**
     * Get payment methods recommended based on user's credit profile
     * 
     * @param {Object} options - Query options
     * @param {string} options.userId - CreditBoost user ID
     * @param {number} options.creditScore - User's credit score
     * @returns {Promise<Object>} Recommended payment methods
     */
    )
  }, {
    key: "getRecommendedPaymentMethods",
    value: (function () {
      var _getRecommendedPaymentMethods = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref) {
        var userId, creditScore, recommendations;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              userId = _ref.userId, creditScore = _ref.creditScore;
              _context4.prev = 1;
              // In a real implementation, this would analyze the user's credit profile
              // and recommend appropriate payment methods
              recommendations = []; // Add recommendations based on credit score
              if (creditScore >= 700) {
                recommendations.push({
                  method: 'card',
                  type: 'credit',
                  priority: 1,
                  reason: 'Good credit score qualifies for credit card payments'
                });
              }
              recommendations.push({
                method: 'bank_transfer',
                priority: creditScore >= 700 ? 2 : 1,
                reason: 'Secure and reliable payment method'
              });

              // Always include these options
              recommendations.push({
                method: 'apple_pay',
                priority: 3,
                reason: 'Fast and convenient mobile payment'
              }, {
                method: 'google_pay',
                priority: 4,
                reason: 'Fast and convenient mobile payment'
              });
              return _context4.abrupt("return", {
                success: true,
                userId: userId,
                creditScore: creditScore,
                recommendations: recommendations
              });
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](1);
              console.error('Error getting recommended payment methods:', _context4.t0);
              return _context4.abrupt("return", {
                success: false,
                error: 'RECOMMENDATION_ERROR',
                message: 'Failed to get recommended payment methods'
              });
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 9]]);
      }));
      function getRecommendedPaymentMethods(_x4) {
        return _getRecommendedPaymentMethods.apply(this, arguments);
      }
      return getRecommendedPaymentMethods;
    }())
  }]);
}();
var _default = exports["default"] = CreditBoostIntegration;