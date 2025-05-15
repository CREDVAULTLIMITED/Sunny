"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _excluded = ["type", "label", "placeholder", "value", "onChange", "error", "helper", "disabled", "required", "icon", "iconPosition", "className", "inputClassName"],
  _excluded2 = ["label", "placeholder", "value", "onChange", "error", "helper", "disabled", "required", "rows", "className", "textareaClassName"],
  _excluded3 = ["label", "options", "value", "onChange", "error", "helper", "disabled", "required", "placeholder", "className", "selectClassName"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * Modern input component with multiple variants
 */
var Input = function Input(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    label = _ref.label,
    placeholder = _ref.placeholder,
    value = _ref.value,
    onChange = _ref.onChange,
    error = _ref.error,
    helper = _ref.helper,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon,
    _ref$iconPosition = _ref.iconPosition,
    iconPosition = _ref$iconPosition === void 0 ? 'left' : _ref$iconPosition,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$inputClassName = _ref.inputClassName,
    inputClassName = _ref$inputClassName === void 0 ? '' : _ref$inputClassName,
    props = _objectWithoutProperties(_ref, _excluded);
  // Base classes
  var baseClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';

  // Error classes
  var errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : '';

  // Disabled classes
  var disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';

  // Icon classes
  var iconClasses = icon ? iconPosition === 'left' ? 'pl-10' : 'pr-10' : '';

  // Combine all classes
  var inputClasses = "\n    ".concat(baseClasses, "\n    ").concat(errorClasses, "\n    ").concat(disabledClasses, "\n    ").concat(iconClasses, "\n    ").concat(inputClassName, "\n  ").trim();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4 ".concat(className)
  }, label && /*#__PURE__*/_react["default"].createElement("label", {
    className: "mb-2 block text-sm font-medium text-gray-700"
  }, label, required && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ml-1 text-red-500"
  }, "*")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, icon && iconPosition === 'left' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
  }, icon), /*#__PURE__*/_react["default"].createElement("input", _extends({
    type: type,
    className: inputClasses,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required
  }, props)), icon && iconPosition === 'right' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
  }, icon)), error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, error), helper && !error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-1 text-sm text-gray-500"
  }, helper));
};

/**
 * Textarea component
 */
var Textarea = function Textarea(_ref2) {
  var label = _ref2.label,
    placeholder = _ref2.placeholder,
    value = _ref2.value,
    onChange = _ref2.onChange,
    error = _ref2.error,
    helper = _ref2.helper,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$required = _ref2.required,
    required = _ref2$required === void 0 ? false : _ref2$required,
    _ref2$rows = _ref2.rows,
    rows = _ref2$rows === void 0 ? 4 : _ref2$rows,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    _ref2$textareaClassNa = _ref2.textareaClassName,
    textareaClassName = _ref2$textareaClassNa === void 0 ? '' : _ref2$textareaClassNa,
    props = _objectWithoutProperties(_ref2, _excluded2);
  // Base classes
  var baseClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';

  // Error classes
  var errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : '';

  // Disabled classes
  var disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';

  // Combine all classes
  var textareaClasses = "\n    ".concat(baseClasses, "\n    ").concat(errorClasses, "\n    ").concat(disabledClasses, "\n    ").concat(textareaClassName, "\n  ").trim();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4 ".concat(className)
  }, label && /*#__PURE__*/_react["default"].createElement("label", {
    className: "mb-2 block text-sm font-medium text-gray-700"
  }, label, required && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ml-1 text-red-500"
  }, "*")), /*#__PURE__*/_react["default"].createElement("textarea", _extends({
    className: textareaClasses,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required,
    rows: rows
  }, props)), error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, error), helper && !error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-1 text-sm text-gray-500"
  }, helper));
};

/**
 * Select component
 */
var Select = function Select(_ref3) {
  var label = _ref3.label,
    _ref3$options = _ref3.options,
    options = _ref3$options === void 0 ? [] : _ref3$options,
    value = _ref3.value,
    onChange = _ref3.onChange,
    error = _ref3.error,
    helper = _ref3.helper,
    _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    _ref3$required = _ref3.required,
    required = _ref3$required === void 0 ? false : _ref3$required,
    _ref3$placeholder = _ref3.placeholder,
    placeholder = _ref3$placeholder === void 0 ? 'Select an option' : _ref3$placeholder,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? '' : _ref3$className,
    _ref3$selectClassName = _ref3.selectClassName,
    selectClassName = _ref3$selectClassName === void 0 ? '' : _ref3$selectClassName,
    props = _objectWithoutProperties(_ref3, _excluded3);
  // Base classes
  var baseClasses = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';

  // Error classes
  var errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : '';

  // Disabled classes
  var disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';

  // Combine all classes
  var selectClasses = "\n    ".concat(baseClasses, "\n    ").concat(errorClasses, "\n    ").concat(disabledClasses, "\n    ").concat(selectClassName, "\n  ").trim();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4 ".concat(className)
  }, label && /*#__PURE__*/_react["default"].createElement("label", {
    className: "mb-2 block text-sm font-medium text-gray-700"
  }, label, required && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ml-1 text-red-500"
  }, "*")), /*#__PURE__*/_react["default"].createElement("select", _extends({
    className: selectClasses,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required
  }, props), /*#__PURE__*/_react["default"].createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: option.value,
      value: option.value
    }, option.label);
  })), error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-1 text-sm text-red-600"
  }, error), helper && !error && /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-1 text-sm text-gray-500"
  }, helper));
};

// Export all components
Input.Textarea = Textarea;
Input.Select = Select;
var _default = exports["default"] = Input;