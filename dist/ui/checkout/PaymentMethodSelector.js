"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Payment method selector component
 */
var PaymentMethodSelector = function PaymentMethodSelector(_ref) {
  var selectedMethod = _ref.selectedMethod,
    onChange = _ref.onChange;
  var paymentMethods = [{
    id: 'card',
    name: 'Credit/Debit Card',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-6 w-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    }))
  }, {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-6 w-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    }))
  }, {
    id: 'qr_code',
    name: 'QR Code',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-6 w-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
    }))
  }, {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-6 w-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    }))
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, paymentMethods.map(function (method) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: method.id,
      className: "\n            flex items-center p-4 border rounded-lg cursor-pointer transition-all\n            ".concat(selectedMethod === method.id ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50', "\n          "),
      onClick: function onClick() {
        return onChange(method.id);
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "\n            flex items-center justify-center w-10 h-10 rounded-full mr-3\n            ".concat(selectedMethod === method.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600', "\n          ")
    }, method.icon), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-medium text-gray-800"
    }, method.name)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "ml-auto"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "\n              w-5 h-5 rounded-full border-2 flex items-center justify-center\n              ".concat(selectedMethod === method.id ? 'border-indigo-500' : 'border-gray-300', "\n            ")
    }, selectedMethod === method.id && /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-3 h-3 rounded-full bg-indigo-500"
    }))));
  }));
};
var _default = exports["default"] = PaymentMethodSelector;