"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Sunny Payment Gateway - Dashboard UI Component
 * 
 * A dashboard component for merchants to view payment analytics
 */
var DashboardUI = /*#__PURE__*/function () {
  /**
   * Create a new dashboard UI instance
   * 
   * @param {Object} config - Dashboard configuration
   * @param {string} config.containerId - ID of the container element
   * @param {string} config.merchantId - ID of the merchant
   * @param {string} config.apiKey - API key for data fetching
   * @param {string} config.locale - Locale for translations
   * @param {Object} config.theme - Custom theme overrides
   */
  function DashboardUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, DashboardUI);
    this.config = _objectSpread({
      containerId: 'sunny-dashboard',
      merchantId: '',
      apiKey: '',
      locale: 'en-US',
      theme: {}
    }, config);
    this.container = null;
    this.data = {
      summary: null,
      dailyData: null,
      customerInsights: null
    };
    this.dateRange = {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      // 30 days ago
      end: new Date()
    };
    this.currency = 'USD';
    this.isLoading = false;
  }

  /**
   * Mount the dashboard UI to the container
   */
  return _createClass(DashboardUI, [{
    key: "mount",
    value: (function () {
      var _mount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.container = document.getElementById(this.config.containerId);
              if (this.container) {
                _context.next = 4;
                break;
              }
              console.error("Container with ID \"".concat(this.config.containerId, "\" not found"));
              return _context.abrupt("return");
            case 4:
              // Set container styles
              this.container.style.fontFamily = "'Montserrat', sans-serif";
              this.container.style.color = '#000000';
              this.container.style.backgroundColor = '#F6F8F6';

              // Render the dashboard UI
              this.render();

              // Load data
              _context.next = 10;
              return this.loadData();
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function mount() {
        return _mount.apply(this, arguments);
      }
      return mount;
    }()
    /**
     * Render the dashboard UI
     */
    )
  }, {
    key: "render",
    value: function render() {
      if (!this.container) return;

      // Clear the container
      this.container.innerHTML = '';

      // Create the header
      var header = document.createElement('div');
      header.style.padding = '1.5rem';
      header.style.backgroundColor = '#FFFFFF';
      header.style.borderBottom = '1px solid #E2E8F0';
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';

      // Add logo
      var logo = document.createElement('img');
      logo.src = '/sunny/src/ui/assets/images/logo-no-bg.png';
      logo.alt = 'Sunny Payments';
      logo.style.height = '2rem';

      // Add title
      var title = document.createElement('h1');
      title.textContent = 'Payment Dashboard';
      title.style.fontSize = '1.5rem';
      title.style.fontWeight = '700';
      title.style.margin = '0';

      // Add date range selector
      var dateRangeSelector = this.createDateRangeSelector();
      header.appendChild(logo);
      header.appendChild(title);
      header.appendChild(dateRangeSelector);
      this.container.appendChild(header);

      // Create the main content
      var content = document.createElement('div');
      content.style.padding = '1.5rem';
      content.style.display = 'grid';
      content.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
      content.style.gap = '1.5rem';

      // Add summary cards
      var summaryCards = this.createSummaryCards();
      content.appendChild(summaryCards);
      this.container.appendChild(content);

      // Create the charts section
      var chartsSection = document.createElement('div');
      chartsSection.style.padding = '0 1.5rem 1.5rem';

      // Add transaction chart
      var transactionChart = this.createTransactionChart();
      chartsSection.appendChild(transactionChart);

      // Add payment methods chart
      var paymentMethodsChart = this.createPaymentMethodsChart();
      chartsSection.appendChild(paymentMethodsChart);
      this.container.appendChild(chartsSection);

      // Create the tables section
      var tablesSection = document.createElement('div');
      tablesSection.style.padding = '0 1.5rem 1.5rem';

      // Add recent transactions table
      var recentTransactionsTable = this.createRecentTransactionsTable();
      tablesSection.appendChild(recentTransactionsTable);
      this.container.appendChild(tablesSection);
    }

    /**
     * Load dashboard data
     */
  }, {
    key: "loadData",
    value: (function () {
      var _loadData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.isLoading = true;
              this.showLoadingState();
              _context2.prev = 2;
              _context2.next = 5;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              });
            case 5:
              // Mock data
              this.data.summary = {
                transactions: {
                  count: 1245,
                  volume: 8750000,
                  currency: this.currency,
                  average: 7028,
                  successful: 1198,
                  failed: 47,
                  successRate: 96.2
                },
                byPaymentMethod: [{
                  method: 'card',
                  count: 875,
                  volume: 6125000,
                  percentage: 70.0
                }, {
                  method: 'bank_transfer',
                  count: 156,
                  volume: 1365000,
                  percentage: 15.6
                }, {
                  method: 'mobile_money',
                  count: 98,
                  volume: 735000,
                  percentage: 8.4
                }, {
                  method: 'crypto',
                  count: 45,
                  volume: 315000,
                  percentage: 3.6
                }, {
                  method: 'apple_pay',
                  count: 42,
                  volume: 126000,
                  percentage: 1.4
                }, {
                  method: 'google_pay',
                  count: 29,
                  volume: 84000,
                  percentage: 1.0
                }],
                fees: {
                  total: 262500,
                  currency: this.currency
                }
              };
              this.data.dailyData = this.generateDailyData();
              this.data.customerInsights = {
                newCustomers: 342,
                returningCustomers: 687,
                totalCustomers: 1029,
                averageTransactionsPerCustomer: 1.8
              };
              this.updateDashboard();
              _context2.next = 15;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](2);
              console.error('Error loading dashboard data:', _context2.t0);
              this.showErrorState();
            case 15:
              _context2.prev = 15;
              this.isLoading = false;
              return _context2.finish(15);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 11, 15, 18]]);
      }));
      function loadData() {
        return _loadData.apply(this, arguments);
      }
      return loadData;
    }()
    /**
     * Show loading state
     */
    )
  }, {
    key: "showLoadingState",
    value: function showLoadingState() {
      var cards = this.container.querySelectorAll('.summary-card-value');
      cards.forEach(function (card) {
        card.textContent = 'Loading...';
      });
    }

    /**
     * Show error state
     */
  }, {
    key: "showErrorState",
    value: function showErrorState() {
      var cards = this.container.querySelectorAll('.summary-card-value');
      cards.forEach(function (card) {
        card.textContent = 'Error loading data';
        card.style.color = '#EF4444';
      });
    }

    /**
     * Update the dashboard with loaded data
     */
  }, {
    key: "updateDashboard",
    value: function updateDashboard() {
      if (!this.data.summary) return;

      // Update summary cards
      var volumeCard = this.container.querySelector('#summary-volume .summary-card-value');
      if (volumeCard) {
        volumeCard.textContent = new Intl.NumberFormat(this.config.locale, {
          style: 'currency',
          currency: this.data.summary.transactions.currency
        }).format(this.data.summary.transactions.volume / 100);
      }
      var countCard = this.container.querySelector('#summary-count .summary-card-value');
      if (countCard) {
        countCard.textContent = new Intl.NumberFormat(this.config.locale).format(this.data.summary.transactions.count);
      }
      var successRateCard = this.container.querySelector('#summary-success-rate .summary-card-value');
      if (successRateCard) {
        successRateCard.textContent = "".concat(this.data.summary.transactions.successRate, "%");
      }
      var feesCard = this.container.querySelector('#summary-fees .summary-card-value');
      if (feesCard) {
        feesCard.textContent = new Intl.NumberFormat(this.config.locale, {
          style: 'currency',
          currency: this.data.summary.fees.currency
        }).format(this.data.summary.fees.total / 100);
      }

      // Update charts
      // In a real implementation, this would update the charts with the loaded data
    }

    /**
     * Create date range selector
     * 
     * @returns {HTMLElement} Date range selector
     */
  }, {
    key: "createDateRangeSelector",
    value: function createDateRangeSelector() {
      var _this = this;
      var container = document.createElement('div');
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '0.5rem';
      var label = document.createElement('span');
      label.textContent = 'Date Range:';
      label.style.fontSize = '0.875rem';
      label.style.color = '#64748B';
      var select = document.createElement('select');
      select.style.padding = '0.5rem';
      select.style.border = '1px solid #E2E8F0';
      select.style.borderRadius = '0.25rem';
      select.style.backgroundColor = '#FFFFFF';
      var options = [{
        value: '7d',
        label: 'Last 7 days'
      }, {
        value: '30d',
        label: 'Last 30 days'
      }, {
        value: '90d',
        label: 'Last 90 days'
      }, {
        value: 'ytd',
        label: 'Year to date'
      }, {
        value: 'custom',
        label: 'Custom range'
      }];
      options.forEach(function (option) {
        var optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionElement.selected = option.value === '30d';
        select.appendChild(optionElement);
      });
      select.addEventListener('change', function (event) {
        _this.handleDateRangeChange(event.target.value);
      });
      container.appendChild(label);
      container.appendChild(select);
      return container;
    }

    /**
     * Create summary cards
     * 
     * @returns {HTMLElement} Summary cards container
     */
  }, {
    key: "createSummaryCards",
    value: function createSummaryCards() {
      var container = document.createElement('div');
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
      container.style.gap = '1rem';
      container.style.width = '100%';

      // Transaction volume
      var volumeCard = this.createSummaryCard({
        id: 'summary-volume',
        title: 'Transaction Volume',
        value: '...',
        icon: '💰',
        color: '#02A669'
      });

      // Transaction count
      var countCard = this.createSummaryCard({
        id: 'summary-count',
        title: 'Transaction Count',
        value: '...',
        icon: '🔢',
        color: '#0177A5'
      });

      // Success rate
      var successRateCard = this.createSummaryCard({
        id: 'summary-success-rate',
        title: 'Success Rate',
        value: '...',
        icon: '✅',
        color: '#05B19B'
      });

      // Fees
      var feesCard = this.createSummaryCard({
        id: 'summary-fees',
        title: 'Total Fees',
        value: '...',
        icon: '💸',
        color: '#64748B'
      });
      container.appendChild(volumeCard);
      container.appendChild(countCard);
      container.appendChild(successRateCard);
      container.appendChild(feesCard);
      return container;
    }

    /**
     * Create a summary card
     * 
     * @param {Object} options - Card options
     * @param {string} options.id - Card ID
     * @param {string} options.title - Card title
     * @param {string} options.value - Card value
     * @param {string} options.icon - Card icon
     * @param {string} options.color - Card color
     * @returns {HTMLElement} Summary card
     */
  }, {
    key: "createSummaryCard",
    value: function createSummaryCard(_ref) {
      var id = _ref.id,
        title = _ref.title,
        value = _ref.value,
        icon = _ref.icon,
        color = _ref.color;
      var card = document.createElement('div');
      card.id = id;
      card.className = 'summary-card';
      card.style.backgroundColor = '#FFFFFF';
      card.style.borderRadius = '0.5rem';
      card.style.padding = '1.5rem';
      card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      var cardHeader = document.createElement('div');
      cardHeader.style.display = 'flex';
      cardHeader.style.alignItems = 'center';
      cardHeader.style.justifyContent = 'space-between';
      cardHeader.style.marginBottom = '1rem';
      var cardTitle = document.createElement('div');
      cardTitle.textContent = title;
      cardTitle.style.fontSize = '0.875rem';
      cardTitle.style.color = '#64748B';
      var cardIcon = document.createElement('div');
      cardIcon.textContent = icon;
      cardIcon.style.fontSize = '1.5rem';
      cardHeader.appendChild(cardTitle);
      cardHeader.appendChild(cardIcon);
      var cardValue = document.createElement('div');
      cardValue.className = 'summary-card-value';
      cardValue.textContent = value;
      cardValue.style.fontSize = '1.5rem';
      cardValue.style.fontWeight = '700';
      cardValue.style.color = color;
      card.appendChild(cardHeader);
      card.appendChild(cardValue);
      return card;
    }

    /**
     * Create transaction chart
     * 
     * @returns {HTMLElement} Transaction chart container
     */
  }, {
    key: "createTransactionChart",
    value: function createTransactionChart() {
      var container = document.createElement('div');
      container.style.backgroundColor = '#FFFFFF';
      container.style.borderRadius = '0.5rem';
      container.style.padding = '1.5rem';
      container.style.marginBottom = '1.5rem';
      container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      var header = document.createElement('div');
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';
      header.style.marginBottom = '1rem';
      var title = document.createElement('h2');
      title.textContent = 'Transaction Volume';
      title.style.fontSize = '1.25rem';
      title.style.fontWeight = '600';
      title.style.margin = '0';
      header.appendChild(title);
      var chartPlaceholder = document.createElement('div');
      chartPlaceholder.style.height = '300px';
      chartPlaceholder.style.backgroundColor = '#F1F5F9';
      chartPlaceholder.style.borderRadius = '0.25rem';
      chartPlaceholder.style.display = 'flex';
      chartPlaceholder.style.alignItems = 'center';
      chartPlaceholder.style.justifyContent = 'center';
      var placeholderText = document.createElement('div');
      placeholderText.textContent = 'Transaction volume chart will be displayed here';
      placeholderText.style.color = '#64748B';
      chartPlaceholder.appendChild(placeholderText);
      container.appendChild(header);
      container.appendChild(chartPlaceholder);
      return container;
    }

    /**
     * Create payment methods chart
     * 
     * @returns {HTMLElement} Payment methods chart container
     */
  }, {
    key: "createPaymentMethodsChart",
    value: function createPaymentMethodsChart() {
      var container = document.createElement('div');
      container.style.backgroundColor = '#FFFFFF';
      container.style.borderRadius = '0.5rem';
      container.style.padding = '1.5rem';
      container.style.marginBottom = '1.5rem';
      container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      var header = document.createElement('div');
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';
      header.style.marginBottom = '1rem';
      var title = document.createElement('h2');
      title.textContent = 'Payment Methods';
      title.style.fontSize = '1.25rem';
      title.style.fontWeight = '600';
      title.style.margin = '0';
      header.appendChild(title);
      var chartPlaceholder = document.createElement('div');
      chartPlaceholder.style.height = '300px';
      chartPlaceholder.style.backgroundColor = '#F1F5F9';
      chartPlaceholder.style.borderRadius = '0.25rem';
      chartPlaceholder.style.display = 'flex';
      chartPlaceholder.style.alignItems = 'center';
      chartPlaceholder.style.justifyContent = 'center';
      var placeholderText = document.createElement('div');
      placeholderText.textContent = 'Payment methods chart will be displayed here';
      placeholderText.style.color = '#64748B';
      chartPlaceholder.appendChild(placeholderText);
      container.appendChild(header);
      container.appendChild(chartPlaceholder);
      return container;
    }

    /**
     * Create recent transactions table
     * 
     * @returns {HTMLElement} Recent transactions table container
     */
  }, {
    key: "createRecentTransactionsTable",
    value: function createRecentTransactionsTable() {
      var container = document.createElement('div');
      container.style.backgroundColor = '#FFFFFF';
      container.style.borderRadius = '0.5rem';
      container.style.padding = '1.5rem';
      container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      var header = document.createElement('div');
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';
      header.style.marginBottom = '1rem';
      var title = document.createElement('h2');
      title.textContent = 'Recent Transactions';
      title.style.fontSize = '1.25rem';
      title.style.fontWeight = '600';
      title.style.margin = '0';
      var viewAllLink = document.createElement('a');
      viewAllLink.textContent = 'View All';
      viewAllLink.href = '#';
      viewAllLink.style.color = '#02A669';
      viewAllLink.style.textDecoration = 'none';
      viewAllLink.style.fontWeight = '500';
      header.appendChild(title);
      header.appendChild(viewAllLink);
      var table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      var thead = document.createElement('thead');
      var headerRow = document.createElement('tr');
      var headers = ['Transaction ID', 'Date', 'Amount', 'Payment Method', 'Status'];
      headers.forEach(function (headerText) {
        var th = document.createElement('th');
        th.textContent = headerText;
        th.style.padding = '0.75rem';
        th.style.textAlign = 'left';
        th.style.borderBottom = '1px solid #E2E8F0';
        th.style.fontSize = '0.875rem';
        th.style.fontWeight = '600';
        th.style.color = '#64748B';
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
      var tbody = document.createElement('tbody');

      // Add placeholder rows
      for (var i = 0; i < 5; i++) {
        var row = document.createElement('tr');
        var idCell = document.createElement('td');
        idCell.textContent = "txn_".concat(Math.random().toString(36).substring(2, 10));
        idCell.style.padding = '0.75rem';
        idCell.style.borderBottom = '1px solid #E2E8F0';
        var dateCell = document.createElement('td');
        var date = new Date();
        date.setDate(date.getDate() - i);
        dateCell.textContent = date.toLocaleDateString(this.config.locale);
        dateCell.style.padding = '0.75rem';
        dateCell.style.borderBottom = '1px solid #E2E8F0';
        var amountCell = document.createElement('td');
        amountCell.textContent = new Intl.NumberFormat(this.config.locale, {
          style: 'currency',
          currency: this.currency
        }).format(Math.floor(Math.random() * 10000) / 100);
        amountCell.style.padding = '0.75rem';
        amountCell.style.borderBottom = '1px solid #E2E8F0';
        var methodCell = document.createElement('td');
        var methods = ['Card', 'Bank Transfer', 'Mobile Money', 'Crypto'];
        methodCell.textContent = methods[Math.floor(Math.random() * methods.length)];
        methodCell.style.padding = '0.75rem';
        methodCell.style.borderBottom = '1px solid #E2E8F0';
        var statusCell = document.createElement('td');
        var statuses = [{
          text: 'Completed',
          color: '#02A669'
        }, {
          text: 'Processing',
          color: '#F2C94C'
        }, {
          text: 'Failed',
          color: '#EF4444'
        }];
        var status = statuses[Math.floor(Math.random() * (i === 0 ? 1 : statuses.length))];
        var statusBadge = document.createElement('span');
        statusBadge.textContent = status.text;
        statusBadge.style.backgroundColor = "".concat(status.color, "20");
        statusBadge.style.color = status.color;
        statusBadge.style.padding = '0.25rem 0.5rem';
        statusBadge.style.borderRadius = '0.25rem';
        statusBadge.style.fontSize = '0.75rem';
        statusBadge.style.fontWeight = '500';
        statusCell.appendChild(statusBadge);
        statusCell.style.padding = '0.75rem';
        statusCell.style.borderBottom = '1px solid #E2E8F0';
        row.appendChild(idCell);
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(methodCell);
        row.appendChild(statusCell);
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
      container.appendChild(header);
      container.appendChild(table);
      return container;
    }

    /**
     * Handle date range change
     * 
     * @param {string} range - Selected date range
     */
  }, {
    key: "handleDateRangeChange",
    value: function handleDateRangeChange(range) {
      var now = new Date();
      var start = new Date();
      switch (range) {
        case '7d':
          start.setDate(now.getDate() - 7);
          break;
        case '30d':
          start.setDate(now.getDate() - 30);
          break;
        case '90d':
          start.setDate(now.getDate() - 90);
          break;
        case 'ytd':
          start = new Date(now.getFullYear(), 0, 1); // January 1st of current year
          break;
        case 'custom':
          // In a real implementation, this would show a date picker
          alert('Custom date range picker would be shown here');
          return;
      }
      this.dateRange = {
        start: start,
        end: now
      };
      this.loadData();
    }

    /**
     * Generate mock daily data
     * 
     * @returns {Array} Daily data
     */
  }, {
    key: "generateDailyData",
    value: function generateDailyData() {
      var days = [];
      var start = this.dateRange.start;
      var end = this.dateRange.end;
      for (var day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
        var date = day.toISOString().split('T')[0];

        // Generate some realistic-looking data with weekend dips
        var isWeekend = day.getDay() === 0 || day.getDay() === 6;
        var randomFactor = 0.7 + Math.random() * 0.6; // 0.7-1.3 random factor
        var baseVolume = isWeekend ? 25000 : 40000;
        days.push({
          date: date,
          transactions: Math.floor(isWeekend ? 35 * randomFactor : 55 * randomFactor),
          volume: Math.floor(baseVolume * randomFactor),
          successRate: 95 + Math.random() * 4.5
        });
      }
      return days;
    }
  }]);
}();
var _default = exports["default"] = DashboardUI;