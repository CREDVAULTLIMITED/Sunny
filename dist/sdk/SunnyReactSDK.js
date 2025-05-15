"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSunny = exports["default"] = exports.SunnyProvider = exports.QRCodeDisplay = exports.PaymentButton = exports.MobileMoneyForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SunnySDK = _interopRequireDefault(require("./SunnySDK.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /**
 * Sunny Payment Gateway - React SDK
 * 
 * React components and hooks for integrating with Sunny Payment Gateway
 */
// Create Sunny context
var SunnyContext = /*#__PURE__*/(0, _react.createContext)(null);

/**
 * Sunny Provider component
 * Provides Sunny SDK instance to all child components
 */
var SunnyProvider = exports.SunnyProvider = function SunnyProvider(_ref) {
  var apiKey = _ref.apiKey,
    merchantId = _ref.merchantId,
    environment = _ref.environment,
    options = _ref.options,
    children = _ref.children;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    sdk = _useState2[0],
    setSdk = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  (0, _react.useEffect)(function () {
    try {
      // Initialize SDK
      var sunnySDK = new _SunnySDK["default"]({
        apiKey: apiKey,
        merchantId: merchantId,
        environment: environment,
        options: options
      });
      setSdk(sunnySDK);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [apiKey, merchantId, environment]);
  return /*#__PURE__*/_react["default"].createElement(SunnyContext.Provider, {
    value: {
      sdk: sdk,
      loading: loading,
      error: error
    }
  }, children);
};

/**
 * Hook to use Sunny SDK in React components
 */
var useSunny = exports.useSunny = function useSunny() {
  var context = (0, _react.useContext)(SunnyContext);
  if (!context) {
    throw new Error('useSunny must be used within a SunnyProvider');
  }
  return context;
};

/**
 * Payment Button component
 */
var PaymentButton = exports.PaymentButton = function PaymentButton(_ref2) {
  var amount = _ref2.amount,
    currency = _ref2.currency,
    paymentMethod = _ref2.paymentMethod,
    onSuccess = _ref2.onSuccess,
    onError = _ref2.onError,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    _ref2$style = _ref2.style,
    style = _ref2$style === void 0 ? {} : _ref2$style,
    _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? 'Pay Now' : _ref2$children;
  var _useSunny = useSunny(),
    sdk = _useSunny.sdk,
    loading = _useSunny.loading,
    sdkError = _useSunny.error;
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    processing = _useState8[0],
    setProcessing = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    error = _useState0[0],
    setError = _useState0[1];
  var handleClick = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(loading || processing || disabled)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            setProcessing(true);
            setError(null);
            _context.prev = 4;
            _context.next = 7;
            return sdk.createPayment({
              amount: amount,
              currency: currency,
              paymentMethod: paymentMethod
            });
          case 7:
            result = _context.sent;
            if (result.success) {
              onSuccess && onSuccess(result);
            } else {
              setError(result.message || 'Payment failed');
              onError && onError(result);
            }
            _context.next = 15;
            break;
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            setError(_context.t0.message || 'Payment failed');
            onError && onError(_context.t0);
          case 15:
            _context.prev = 15;
            setProcessing(false);
            return _context.finish(15);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[4, 11, 15, 18]]);
    }));
    return function handleClick() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClick,
    disabled: loading || processing || disabled || !!sdkError,
    className: className,
    style: style
  }, processing ? 'Processing...' : children), error && /*#__PURE__*/_react["default"].createElement("div", {
    className: "sunny-error"
  }, error), sdkError && /*#__PURE__*/_react["default"].createElement("div", {
    className: "sunny-error"
  }, sdkError.message));
};

/**
 * QR Code component
 */
var QRCodeDisplay = exports.QRCodeDisplay = function QRCodeDisplay(_ref4) {
  var amount = _ref4.amount,
    currency = _ref4.currency,
    _ref4$qrType = _ref4.qrType,
    qrType = _ref4$qrType === void 0 ? 'dynamic' : _ref4$qrType,
    onGenerated = _ref4.onGenerated,
    onError = _ref4.onError,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? '' : _ref4$className,
    _ref4$style = _ref4.style,
    style = _ref4$style === void 0 ? {} : _ref4$style;
  var _useSunny2 = useSunny(),
    sdk = _useSunny2.sdk,
    loading = _useSunny2.loading,
    sdkError = _useSunny2.error;
  var _useState1 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    qrData = _useState10[0],
    setQrData = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    generating = _useState12[0],
    setGenerating = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    error = _useState14[0],
    setError = _useState14[1];
  (0, _react.useEffect)(function () {
    var generateQR = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(loading || !sdk)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              setGenerating(true);
              setError(null);
              _context2.prev = 4;
              _context2.next = 7;
              return sdk.createQRCode({
                amount: amount,
                currency: currency,
                qrType: qrType
              });
            case 7:
              result = _context2.sent;
              if (result.success) {
                setQrData(result);
                onGenerated && onGenerated(result);
              } else {
                setError(result.message || 'Failed to generate QR code');
                onError && onError(result);
              }
              _context2.next = 15;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](4);
              setError(_context2.t0.message || 'Failed to generate QR code');
              onError && onError(_context2.t0);
            case 15:
              _context2.prev = 15;
              setGenerating(false);
              return _context2.finish(15);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 11, 15, 18]]);
      }));
      return function generateQR() {
        return _ref5.apply(this, arguments);
      };
    }();
    generateQR();
  }, [sdk, loading, amount, currency, qrType]);
  if (loading || generating) {
    return /*#__PURE__*/_react["default"].createElement("div", null, "Generating QR code...");
  }
  if (error || sdkError) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "sunny-error"
    }, error || sdkError.message);
  }
  if (!qrData) {
    return /*#__PURE__*/_react["default"].createElement("div", null, "No QR code data available");
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: qrData.qrImageUrl,
    alt: "Payment QR Code"
  }), qrType === 'dynamic' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "sunny-qr-amount"
  }, amount, " ", currency));
};

/**
 * Mobile Money Payment Form
 */
var MobileMoneyForm = exports.MobileMoneyForm = function MobileMoneyForm(_ref6) {
  var amount = _ref6.amount,
    currency = _ref6.currency,
    _ref6$provider = _ref6.provider,
    provider = _ref6$provider === void 0 ? 'mpesa' : _ref6$provider,
    onSuccess = _ref6.onSuccess,
    onError = _ref6.onError,
    _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? '' : _ref6$className,
    _ref6$style = _ref6.style,
    style = _ref6$style === void 0 ? {} : _ref6$style;
  var _useSunny3 = useSunny(),
    sdk = _useSunny3.sdk,
    loading = _useSunny3.loading,
    sdkError = _useSunny3.error;
  var _useState15 = (0, _react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    phoneNumber = _useState16[0],
    setPhoneNumber = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    processing = _useState18[0],
    setProcessing = _useState18[1];
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    error = _useState20[0],
    setError = _useState20[1];
  var handleSubmit = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
      var result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            e.preventDefault();
            if (!(loading || processing)) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return");
          case 3:
            setProcessing(true);
            setError(null);
            _context3.prev = 5;
            _context3.next = 8;
            return sdk.processMobileMoney({
              amount: amount,
              currency: currency,
              provider: provider,
              phoneNumber: phoneNumber
            });
          case 8:
            result = _context3.sent;
            if (result.success) {
              onSuccess && onSuccess(result);
            } else {
              setError(result.message || 'Payment failed');
              onError && onError(result);
            }
            _context3.next = 16;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](5);
            setError(_context3.t0.message || 'Payment failed');
            onError && onError(_context3.t0);
          case 16:
            _context3.prev = 16;
            setProcessing(false);
            return _context3.finish(16);
          case 19:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[5, 12, 16, 19]]);
    }));
    return function handleSubmit(_x) {
      return _ref7.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: className,
    style: style
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "phoneNumber"
  }, "Phone Number"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "phoneNumber",
    type: "tel",
    value: phoneNumber,
    onChange: function onChange(e) {
      return setPhoneNumber(e.target.value);
    },
    placeholder: "Enter phone number",
    required: true
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    disabled: loading || processing || !phoneNumber
  }, processing ? 'Processing...' : "Pay ".concat(amount, " ").concat(currency))), error && /*#__PURE__*/_react["default"].createElement("div", {
    className: "sunny-error"
  }, error), sdkError && /*#__PURE__*/_react["default"].createElement("div", {
    className: "sunny-error"
  }, sdkError.message));
};

// Export all components
var _default = exports["default"] = {
  SunnyProvider: SunnyProvider,
  useSunny: useSunny,
  PaymentButton: PaymentButton,
  QRCodeDisplay: QRCodeDisplay,
  MobileMoneyForm: MobileMoneyForm
};