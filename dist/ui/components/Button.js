"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _excluded = ["children", "variant", "size", "fullWidth", "disabled", "loading", "icon", "iconPosition", "onClick", "className", "type"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * Modern button component with multiple variants
 */
var Button = function Button(_ref) {
  var children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$fullWidth = _ref.fullWidth,
    fullWidth = _ref$fullWidth === void 0 ? false : _ref$fullWidth,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon,
    _ref$iconPosition = _ref.iconPosition,
    iconPosition = _ref$iconPosition === void 0 ? 'left' : _ref$iconPosition,
    onClick = _ref.onClick,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'button' : _ref$type,
    props = _objectWithoutProperties(_ref, _excluded);
  // Base classes
  var baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Size classes
  var sizeClasses = {
    small: 'py-2 px-3 text-xs',
    medium: 'py-2.5 px-5 text-sm',
    large: 'py-3 px-6 text-base'
  };

  // Variant classes
  var variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    info: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    light: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 focus:ring-gray-500',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-700',
    link: 'bg-transparent hover:underline text-indigo-600 hover:text-indigo-800 p-0 focus:ring-0'
  };

  // Width classes
  var widthClasses = fullWidth ? 'w-full' : '';

  // Disabled classes
  var disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';

  // Combine all classes
  var buttonClasses = "\n    ".concat(baseClasses, "\n    ").concat(sizeClasses[size] || sizeClasses.medium, "\n    ").concat(variantClasses[variant] || variantClasses.primary, "\n    ").concat(widthClasses, "\n    ").concat(disabledClasses, "\n    ").concat(className, "\n    flex items-center justify-center\n  ").trim();
  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    type: type,
    className: buttonClasses,
    disabled: disabled || loading,
    onClick: onClick
  }, props), loading && /*#__PURE__*/_react["default"].createElement("svg", {
    className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), icon && iconPosition === 'left' && !loading && /*#__PURE__*/_react["default"].createElement("span", {
    className: "mr-2"
  }, icon), children, icon && iconPosition === 'right' && !loading && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ml-2"
  }, icon));
};
var _default = exports["default"] = Button;