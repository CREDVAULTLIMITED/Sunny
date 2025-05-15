"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Card = _interopRequireDefault(require("../components/Card.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Payment summary component
 */
var PaymentSummary = function PaymentSummary(_ref) {
  var amount = _ref.amount,
    currency = _ref.currency,
    description = _ref.description,
    paymentStatus = _ref.paymentStatus;
  // Format currency
  var formatCurrency = function formatCurrency(value, currencyCode) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(value);
  };
  return /*#__PURE__*/_react["default"].createElement(_Card["default"], null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, "Payment Summary")), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-gray-600"
  }, "Amount"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, formatCurrency(amount, currency))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-gray-600"
  }, "Processing Fee"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, formatCurrency(0, currency))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "border-t border-gray-200 pt-4 mt-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-lg font-semibold"
  }, "Total"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-lg font-semibold"
  }, formatCurrency(amount, currency)))), description && /*#__PURE__*/_react["default"].createElement("div", {
    className: "border-t border-gray-200 pt-4 mt-4"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-sm font-medium text-gray-700 mb-2"
  }, "Description"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600"
  }, description)))), paymentStatus && /*#__PURE__*/_react["default"].createElement(_Card["default"].Footer, {
    className: "\n          ".concat(paymentStatus.success ? 'bg-green-50' : 'bg-red-50', "\n          ").concat(paymentStatus.success ? 'border-green-100' : 'border-red-100', "\n        ")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, paymentStatus.success ? /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-green-500 mr-2",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  })) : /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-red-500 mr-2",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
    clipRule: "evenodd"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-sm font-medium ".concat(paymentStatus.success ? 'text-green-700' : 'text-red-700')
  }, paymentStatus.message)), paymentStatus.success && paymentStatus.data && paymentStatus.data.transactionId && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-2 text-sm text-green-700"
  }, "Transaction ID: ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-mono"
  }, paymentStatus.data.transactionId))));
};
var _default = exports["default"] = PaymentSummary;