"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Dashboard layout component
 */
var DashboardLayout = function DashboardLayout(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarOpen = _useState2[0],
    setSidebarOpen = _useState2[1];
  var toggleSidebar = function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  };
  var navigation = [{
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    current: true
  }, {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: TransactionIcon,
    current: false
  }, {
    name: 'Payments',
    href: '/dashboard/payments',
    icon: PaymentIcon,
    current: false
  }, {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: CustomerIcon,
    current: false
  }, {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: SettingsIcon,
    current: false
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-screen flex overflow-hidden bg-gray-100"
  }, sidebarOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-40 flex md:hidden",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-gray-600 bg-opacity-75",
    "aria-hidden": "true",
    onClick: toggleSidebar
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-0 right-0 -mr-12 pt-2"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
    onClick: toggleSidebar
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, "Close sidebar"), /*#__PURE__*/_react["default"].createElement(XIcon, {
    className: "h-6 w-6 text-white"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 flex items-center px-4"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    className: "h-8 w-auto",
    src: "/logo-white.svg",
    alt: "Sunny"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-5 flex-1 h-0 overflow-y-auto"
  }, /*#__PURE__*/_react["default"].createElement("nav", {
    className: "px-2 space-y-1"
  }, navigation.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      key: item.name,
      to: item.href,
      className: "\n                      group flex items-center px-2 py-2 text-base font-medium rounded-md\n                      ".concat(item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600', "\n                    ")
    }, /*#__PURE__*/_react["default"].createElement(item.icon, {
      className: "mr-4 h-6 w-6 text-indigo-300"
    }), item.name);
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 w-14",
    "aria-hidden": "true"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hidden md:flex md:flex-shrink-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col w-64"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col h-0 flex-1 bg-indigo-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center h-16 flex-shrink-0 px-4 bg-indigo-800"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    className: "h-8 w-auto",
    src: "/logo-white.svg",
    alt: "Sunny"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 flex flex-col overflow-y-auto"
  }, /*#__PURE__*/_react["default"].createElement("nav", {
    className: "flex-1 px-2 py-4 space-y-1"
  }, navigation.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      key: item.name,
      to: item.href,
      className: "\n                      group flex items-center px-2 py-2 text-sm font-medium rounded-md\n                      ".concat(item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600', "\n                    ")
    }, /*#__PURE__*/_react["default"].createElement(item.icon, {
      className: "mr-3 h-6 w-6 text-indigo-300"
    }), item.name);
  })))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col w-0 flex-1 overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative z-10 flex-shrink-0 flex h-16 bg-white shadow"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden",
    onClick: toggleSidebar
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, "Open sidebar"), /*#__PURE__*/_react["default"].createElement(MenuIcon, {
    className: "h-6 w-6"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 px-4 flex justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 flex"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full flex md:ml-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative w-full text-gray-400 focus-within:text-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 left-0 flex items-center pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement(SearchIcon, {
    className: "h-5 w-5"
  })), /*#__PURE__*/_react["default"].createElement("input", {
    className: "block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm",
    placeholder: "Search",
    type: "search"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ml-4 flex items-center md:ml-6"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, "View notifications"), /*#__PURE__*/_react["default"].createElement(BellIcon, {
    className: "h-6 w-6"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ml-3 relative"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    className: "max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, "Open user menu"), /*#__PURE__*/_react["default"].createElement("img", {
    className: "h-8 w-8 rounded-full",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    alt: ""
  }))))))), /*#__PURE__*/_react["default"].createElement("main", {
    className: "flex-1 relative overflow-y-auto focus:outline-none"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "py-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
  }, children)))));
};

// Icon components
function HomeIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  }));
}
function TransactionIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
  }));
}
function PaymentIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
  }));
}
function CustomerIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
  }));
}
function SettingsIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  }));
}
function MenuIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }));
}
function XIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }));
}
function BellIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  }));
}
function SearchIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }));
}
var _default = exports["default"] = DashboardLayout;