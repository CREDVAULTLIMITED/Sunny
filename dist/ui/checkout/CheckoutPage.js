"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SunnyReactSDK = require("../../sdk/SunnyReactSDK.js");
var _Card = _interopRequireDefault(require("../components/Card.jsx"));
var _Button = _interopRequireDefault(require("../components/Button.jsx"));
var _Input = _interopRequireDefault(require("../components/Input.jsx"));
var _PaymentMethodSelector = _interopRequireDefault(require("./PaymentMethodSelector.jsx"));
var _CardPaymentForm = _interopRequireDefault(require("./CardPaymentForm.jsx"));
var _MobileMoneyForm = _interopRequireDefault(require("./MobileMoneyForm.jsx"));
var _QRCodePayment = _interopRequireDefault(require("./QRCodePayment.jsx"));
var _PaymentSummary = _interopRequireDefault(require("./PaymentSummary.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Modern checkout page component
 */
var CheckoutPage = function CheckoutPage(_ref) {
  var apiKey = _ref.apiKey,
    merchantId = _ref.merchantId,
    _ref$environment = _ref.environment,
    environment = _ref$environment === void 0 ? 'sandbox' : _ref$environment,
    _ref$amount = _ref.amount,
    amount = _ref$amount === void 0 ? '100.00' : _ref$amount,
    _ref$currency = _ref.currency,
    currency = _ref$currency === void 0 ? 'USD' : _ref$currency,
    _ref$description = _ref.description,
    description = _ref$description === void 0 ? 'Payment for products' : _ref$description,
    _ref$customerEmail = _ref.customerEmail,
    customerEmail = _ref$customerEmail === void 0 ? '' : _ref$customerEmail,
    _ref$customerName = _ref.customerName,
    customerName = _ref$customerName === void 0 ? '' : _ref$customerName,
    onSuccess = _ref.onSuccess,
    onError = _ref.onError;
  var _useState = (0, _react.useState)('card'),
    _useState2 = _slicedToArray(_useState, 2),
    paymentMethod = _useState2[0],
    setPaymentMethod = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    paymentStatus = _useState4[0],
    setPaymentStatus = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0, _react.useState)({
      name: customerName || '',
      email: customerEmail || '',
      phone: ''
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    customer = _useState8[0],
    setCustomer = _useState8[1];
  var handleCustomerInfoChange = function handleCustomerInfoChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    setCustomer(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
  };
  var handlePaymentMethodChange = function handlePaymentMethodChange(method) {
    setPaymentMethod(method);
    setPaymentStatus(null);
  };
  var handlePaymentSuccess = function handlePaymentSuccess(result) {
    setPaymentStatus({
      success: true,
      message: 'Payment successful!',
      data: result
    });
    setLoading(false);
    if (onSuccess) onSuccess(result);
  };
  var handlePaymentError = function handlePaymentError(error) {
    setPaymentStatus({
      success: false,
      message: error.message || 'Payment failed',
      data: error
    });
    setLoading(false);
    if (onError) onError(error);
  };
  return /*#__PURE__*/_react["default"].createElement(_SunnyReactSDK.SunnyProvider, {
    apiKey: apiKey,
    merchantId: merchantId,
    environment: environment
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-4xl mx-auto p-4"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold text-gray-800 mb-8"
  }, "Checkout"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, "Customer Information")), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/_react["default"].createElement(_Input["default"], {
    label: "Name",
    name: "name",
    value: customer.name,
    onChange: handleCustomerInfoChange,
    placeholder: "John Doe",
    required: true
  }), /*#__PURE__*/_react["default"].createElement(_Input["default"], {
    label: "Email",
    name: "email",
    type: "email",
    value: customer.email,
    onChange: handleCustomerInfoChange,
    placeholder: "john@example.com",
    required: true
  })), /*#__PURE__*/_react["default"].createElement(_Input["default"], {
    label: "Phone Number",
    name: "phone",
    value: customer.phone,
    onChange: handleCustomerInfoChange,
    placeholder: "+1234567890"
  }))), /*#__PURE__*/_react["default"].createElement(_Card["default"], null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, "Payment Method")), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(_PaymentMethodSelector["default"], {
    selectedMethod: paymentMethod,
    onChange: handlePaymentMethodChange
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6"
  }, paymentMethod === 'card' && /*#__PURE__*/_react["default"].createElement(_CardPaymentForm["default"], {
    amount: amount,
    currency: currency,
    onSuccess: handlePaymentSuccess,
    onError: handlePaymentError,
    setLoading: setLoading,
    customer: customer
  }), paymentMethod === 'mobile_money' && /*#__PURE__*/_react["default"].createElement(_MobileMoneyForm["default"], {
    amount: amount,
    currency: currency,
    onSuccess: handlePaymentSuccess,
    onError: handlePaymentError,
    setLoading: setLoading,
    customer: customer
  }), paymentMethod === 'qr_code' && /*#__PURE__*/_react["default"].createElement(_QRCodePayment["default"], {
    amount: amount,
    currency: currency,
    onSuccess: handlePaymentSuccess,
    onError: handlePaymentError
  }))))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_PaymentSummary["default"], {
    amount: amount,
    currency: currency,
    description: description,
    paymentStatus: paymentStatus
  })))));
};
var _default = exports["default"] = CheckoutPage;