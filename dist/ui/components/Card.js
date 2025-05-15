"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _excluded = ["children", "variant", "padding", "shadow", "border", "className"],
  _excluded2 = ["children", "className"],
  _excluded3 = ["children", "className"],
  _excluded4 = ["children", "className"],
  _excluded5 = ["children", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * Modern card component with multiple variants
 */
var Card = function Card(_ref) {
  var children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'default' : _ref$variant,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 'medium' : _ref$padding,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? 'medium' : _ref$shadow,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? false : _ref$border,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    props = _objectWithoutProperties(_ref, _excluded);
  // Base classes
  var baseClasses = 'rounded-xl overflow-hidden';

  // Variant classes
  var variantClasses = {
    "default": 'bg-white',
    primary: 'bg-indigo-50',
    secondary: 'bg-gray-50',
    success: 'bg-green-50',
    danger: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
    dark: 'bg-gray-800 text-white'
  };

  // Padding classes
  var paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-5',
    large: 'p-8'
  };

  // Shadow classes
  var shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow',
    large: 'shadow-lg'
  };

  // Border classes
  var borderClasses = border ? 'border border-gray-200' : '';

  // Combine all classes
  var cardClasses = "\n    ".concat(baseClasses, "\n    ").concat(variantClasses[variant] || variantClasses["default"], "\n    ").concat(paddingClasses[padding] || paddingClasses.medium, "\n    ").concat(shadowClasses[shadow] || shadowClasses.medium, "\n    ").concat(borderClasses, "\n    ").concat(className, "\n  ").trim();
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: cardClasses
  }, props), children);
};

/**
 * Card Header component
 */
var CardHeader = function CardHeader(_ref2) {
  var children = _ref2.children,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var headerClasses = "mb-4 pb-4 border-b border-gray-200 ".concat(className);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: headerClasses
  }, props), children);
};

/**
 * Card Title component
 */
var CardTitle = function CardTitle(_ref3) {
  var children = _ref3.children,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? '' : _ref3$className,
    props = _objectWithoutProperties(_ref3, _excluded3);
  var titleClasses = "text-xl font-semibold ".concat(className);
  return /*#__PURE__*/_react["default"].createElement("h3", _extends({
    className: titleClasses
  }, props), children);
};

/**
 * Card Body component
 */
var CardBody = function CardBody(_ref4) {
  var children = _ref4.children,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? '' : _ref4$className,
    props = _objectWithoutProperties(_ref4, _excluded4);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: className
  }, props), children);
};

/**
 * Card Footer component
 */
var CardFooter = function CardFooter(_ref5) {
  var children = _ref5.children,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? '' : _ref5$className,
    props = _objectWithoutProperties(_ref5, _excluded5);
  var footerClasses = "mt-4 pt-4 border-t border-gray-200 ".concat(className);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: footerClasses
  }, props), children);
};

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;
var _default = exports["default"] = Card;