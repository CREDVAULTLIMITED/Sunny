"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _DashboardLayout = _interopRequireDefault(require("./DashboardLayout.jsx"));
var _Card = _interopRequireDefault(require("../components/Card.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Dashboard component
 */
var Dashboard = function Dashboard() {
  // Sample data for dashboard
  var stats = [{
    name: 'Total Transactions',
    value: '2,543',
    change: '+12.5%',
    trend: 'up'
  }, {
    name: 'Total Volume',
    value: '$128,420',
    change: '+8.2%',
    trend: 'up'
  }, {
    name: 'Success Rate',
    value: '98.7%',
    change: '+0.5%',
    trend: 'up'
  }, {
    name: 'Average Transaction',
    value: '$50.50',
    change: '-2.3%',
    trend: 'down'
  }];
  var recentTransactions = [{
    id: 'TRX-001',
    date: '2023-06-15 14:32',
    amount: '$125.00',
    status: 'completed',
    method: 'card',
    customer: 'John Doe'
  }, {
    id: 'TRX-002',
    date: '2023-06-15 13:21',
    amount: '$75.50',
    status: 'completed',
    method: 'mobile_money',
    customer: 'Jane Smith'
  }, {
    id: 'TRX-003',
    date: '2023-06-15 12:05',
    amount: '$250.00',
    status: 'pending',
    method: 'bank_transfer',
    customer: 'Robert Johnson'
  }, {
    id: 'TRX-004',
    date: '2023-06-15 11:47',
    amount: '$42.75',
    status: 'completed',
    method: 'qr_code',
    customer: 'Emily Davis'
  }, {
    id: 'TRX-005',
    date: '2023-06-15 10:30',
    amount: '$180.25',
    status: 'failed',
    method: 'card',
    customer: 'Michael Wilson'
  }];
  var paymentMethods = [{
    method: 'Card',
    percentage: 45
  }, {
    method: 'Mobile Money',
    percentage: 30
  }, {
    method: 'Bank Transfer',
    percentage: 15
  }, {
    method: 'QR Code',
    percentage: 10
  }];
  return /*#__PURE__*/_react["default"].createElement(_DashboardLayout["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "pb-5 border-b border-gray-200"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
  }, "Dashboard")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
  }, stats.map(function (stat) {
    return /*#__PURE__*/_react["default"].createElement(_Card["default"], {
      key: stat.name,
      padding: "medium",
      className: "overflow-hidden"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm font-medium text-gray-500 truncate"
    }, stat.name), /*#__PURE__*/_react["default"].createElement("p", {
      className: "mt-1 text-xl font-semibold text-gray-900"
    }, stat.value)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
    }, stat.change))));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"], null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, "Transaction Volume")), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500"
  }, "Transaction volume chart goes here")))), /*#__PURE__*/_react["default"].createElement(_Card["default"], null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, "Payment Methods")), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, paymentMethods.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: item.method
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-medium text-gray-700"
    }, item.method), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-medium text-gray-700"
    }, item.percentage, "%")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-2 w-full bg-gray-200 rounded-full h-2"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-indigo-600 h-2 rounded-full",
      style: {
        width: "".concat(item.percentage, "%")
      }
    })));
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"], null, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Title, null, "Recent Transactions"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "text-sm font-medium text-indigo-600 hover:text-indigo-500"
  }, "View all")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "min-w-full divide-y divide-gray-200"
  }, /*#__PURE__*/_react["default"].createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Transaction ID"), /*#__PURE__*/_react["default"].createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Date"), /*#__PURE__*/_react["default"].createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Customer"), /*#__PURE__*/_react["default"].createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Method"), /*#__PURE__*/_react["default"].createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Amount"), /*#__PURE__*/_react["default"].createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  }, "Status"))), /*#__PURE__*/_react["default"].createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, recentTransactions.map(function (transaction) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: transaction.id
    }, /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
    }, transaction.id), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    }, transaction.date), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    }, transaction.customer), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
    }, transaction.method === 'card' && 'Card', transaction.method === 'mobile_money' && 'Mobile Money', transaction.method === 'bank_transfer' && 'Bank Transfer', transaction.method === 'qr_code' && 'QR Code')), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    }, transaction.amount), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(transaction.status === 'completed' ? 'bg-green-100 text-green-800' : transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')
    }, transaction.status === 'completed' && 'Completed', transaction.status === 'pending' && 'Pending', transaction.status === 'failed' && 'Failed')));
  })))))));
};
var _default = exports["default"] = Dashboard;