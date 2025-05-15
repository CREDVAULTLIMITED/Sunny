"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Sunny Payment Gateway - Checkout UI Component
 * 
 * A customizable checkout component that matches CreditBoost's design system
 */
var CheckoutUI = /*#__PURE__*/function () {
  /**
   * Create a new checkout UI instance
   * 
   * @param {Object} config - Checkout configuration
   * @param {string} config.containerId - ID of the container element
   * @param {string} config.merchantName - Name of the merchant
   * @param {number} config.amount - Amount to charge
   * @param {string} config.currency - Currency code
   * @param {Array} config.paymentMethods - Available payment methods
   * @param {string} config.locale - Locale for translations
   * @param {Object} config.theme - Custom theme overrides
   * @param {Function} config.onPaymentComplete - Callback when payment is complete
   */
  function CheckoutUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CheckoutUI);
    this.config = _objectSpread({
      containerId: 'sunny-checkout',
      merchantName: '',
      amount: 0,
      currency: 'USD',
      paymentMethods: ['card', 'bank_transfer', 'mobile_money'],
      locale: 'en-US',
      theme: {},
      onPaymentComplete: function onPaymentComplete() {}
    }, config);
    this.container = null;
    this.selectedPaymentMethod = null;
    this.formData = {};
    this.isSubmitting = false;
    this.errors = {};
  }

  /**
   * Mount the checkout UI to the container
   */
  return _createClass(CheckoutUI, [{
    key: "mount",
    value: function mount() {
      this.container = document.getElementById(this.config.containerId);
      if (!this.container) {
        console.error("Container with ID \"".concat(this.config.containerId, "\" not found"));
        return;
      }

      // Set container styles
      this.container.style.fontFamily = "'Montserrat', sans-serif";
      this.container.style.color = '#000000';
      this.container.style.backgroundColor = '#FFFFFF';
      this.container.style.borderRadius = '0.5rem';
      this.container.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      this.container.style.overflow = 'hidden';

      // Render the checkout UI
      this.render();
    }

    /**
     * Render the checkout UI
     */
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      if (!this.container) return;

      // Clear the container
      this.container.innerHTML = '';

      // Create the header
      var header = document.createElement('div');
      header.style.padding = '1.5rem';
      header.style.borderBottom = '1px solid #E2E8F0';
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';

      // Add logo
      var logo = document.createElement('img');
      logo.src = '/sunny/src/ui/assets/images/logo-no-bg.png';
      logo.alt = 'Sunny Payments';
      logo.style.height = '2rem';

      // Add merchant name
      var merchantName = document.createElement('div');
      merchantName.textContent = this.config.merchantName;
      merchantName.style.fontWeight = '600';
      merchantName.style.fontSize = '1.125rem';
      header.appendChild(logo);
      header.appendChild(merchantName);
      this.container.appendChild(header);

      // Create the body
      var body = document.createElement('div');
      body.style.padding = '1.5rem';

      // Add amount
      var amountContainer = document.createElement('div');
      amountContainer.style.marginBottom = '1.5rem';
      amountContainer.style.textAlign = 'center';
      var amountLabel = document.createElement('div');
      amountLabel.textContent = 'Amount';
      amountLabel.style.fontSize = '0.875rem';
      amountLabel.style.color = '#64748B';
      amountLabel.style.marginBottom = '0.5rem';
      var amount = document.createElement('div');
      amount.textContent = new Intl.NumberFormat(this.config.locale, {
        style: 'currency',
        currency: this.config.currency
      }).format(this.config.amount / 100);
      amount.style.fontSize = '2rem';
      amount.style.fontWeight = '700';
      amount.style.color = '#02A669';
      amountContainer.appendChild(amountLabel);
      amountContainer.appendChild(amount);
      body.appendChild(amountContainer);

      // Add payment method selector
      var paymentMethodSelector = this.createPaymentMethodSelector();
      body.appendChild(paymentMethodSelector);

      // Add payment form
      var paymentForm = this.createPaymentForm();
      body.appendChild(paymentForm);
      this.container.appendChild(body);

      // Create the footer
      var footer = document.createElement('div');
      footer.style.padding = '1.5rem';
      footer.style.borderTop = '1px solid #E2E8F0';
      footer.style.backgroundColor = '#F6F8F6';

      // Add pay button
      var payButton = document.createElement('button');
      payButton.textContent = "Pay ".concat(new Intl.NumberFormat(this.config.locale, {
        style: 'currency',
        currency: this.config.currency
      }).format(this.config.amount / 100));
      payButton.style.backgroundColor = '#02A669';
      payButton.style.color = '#FFFFFF';
      payButton.style.border = 'none';
      payButton.style.borderRadius = '0.25rem';
      payButton.style.padding = '0.75rem 1rem';
      payButton.style.fontSize = '1rem';
      payButton.style.fontWeight = '600';
      payButton.style.width = '100%';
      payButton.style.cursor = 'pointer';
      payButton.style.transition = 'background-color 0.2s ease-in-out';
      payButton.addEventListener('mouseover', function () {
        payButton.style.backgroundColor = '#05B19B';
      });
      payButton.addEventListener('mouseout', function () {
        payButton.style.backgroundColor = '#02A669';
      });
      payButton.addEventListener('click', function () {
        _this.handleSubmit();
      });
      footer.appendChild(payButton);
      this.container.appendChild(footer);

      // Set the default payment method
      if (this.config.paymentMethods.length > 0) {
        this.selectPaymentMethod(this.config.paymentMethods[0]);
      }
    }

    /**
     * Create the payment method selector
     * 
     * @returns {HTMLElement} Payment method selector
     */
  }, {
    key: "createPaymentMethodSelector",
    value: function createPaymentMethodSelector() {
      var _this2 = this;
      var container = document.createElement('div');
      container.style.marginBottom = '1.5rem';
      var label = document.createElement('div');
      label.textContent = 'Payment Method';
      label.style.fontSize = '0.875rem';
      label.style.color = '#64748B';
      label.style.marginBottom = '0.5rem';
      container.appendChild(label);
      var methods = document.createElement('div');
      methods.style.display = 'flex';
      methods.style.gap = '0.5rem';
      methods.style.flexWrap = 'wrap';

      // Create a button for each payment method
      this.config.paymentMethods.forEach(function (method) {
        var button = document.createElement('button');
        button.textContent = _this2.getPaymentMethodName(method);
        button.dataset.method = method;
        button.style.backgroundColor = '#F1F5F9';
        button.style.color = '#64748B';
        button.style.border = 'none';
        button.style.borderRadius = '0.25rem';
        button.style.padding = '0.5rem 1rem';
        button.style.fontSize = '0.875rem';
        button.style.fontWeight = '500';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.2s ease-in-out';
        button.addEventListener('click', function () {
          _this2.selectPaymentMethod(method);
        });
        methods.appendChild(button);
      });
      container.appendChild(methods);
      return container;
    }

    /**
     * Create the payment form
     * 
     * @returns {HTMLElement} Payment form
     */
  }, {
    key: "createPaymentForm",
    value: function createPaymentForm() {
      var container = document.createElement('div');
      container.id = 'sunny-payment-form';
      return container;
    }

    /**
     * Select a payment method
     * 
     * @param {string} method - Payment method to select
     */
  }, {
    key: "selectPaymentMethod",
    value: function selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;

      // Update the UI to show the selected method
      var buttons = this.container.querySelectorAll('[data-method]');
      buttons.forEach(function (button) {
        if (button.dataset.method === method) {
          button.style.backgroundColor = '#02A669';
          button.style.color = '#FFFFFF';
        } else {
          button.style.backgroundColor = '#F1F5F9';
          button.style.color = '#64748B';
        }
      });

      // Update the payment form
      this.updatePaymentForm(method);
    }

    /**
     * Update the payment form based on the selected method
     * 
     * @param {string} method - Selected payment method
     */
  }, {
    key: "updatePaymentForm",
    value: function updatePaymentForm(method) {
      var formContainer = document.getElementById('sunny-payment-form');
      if (!formContainer) return;

      // Clear the form
      formContainer.innerHTML = '';

      // Create the form based on the selected method
      switch (method) {
        case 'card':
          this.createCardForm(formContainer);
          break;
        case 'bank_transfer':
          this.createBankTransferForm(formContainer);
          break;
        case 'mobile_money':
          this.createMobileMoneyForm(formContainer);
          break;
        default:
          // Generic form
          var message = document.createElement('div');
          message.textContent = "Please provide your ".concat(this.getPaymentMethodName(method), " details");
          message.style.padding = '1rem';
          message.style.backgroundColor = '#F1F5F9';
          message.style.borderRadius = '0.25rem';
          message.style.textAlign = 'center';
          formContainer.appendChild(message);
      }
    }

    /**
     * Get the display name for a payment method
     * 
     * @param {string} method - Payment method code
     * @returns {string} Display name
     */
  }, {
    key: "getPaymentMethodName",
    value: function getPaymentMethodName(method) {
      var names = {
        card: 'Credit or Debit Card',
        bank_transfer: 'Bank Transfer',
        mobile_money: 'Mobile Money',
        crypto: 'Cryptocurrency',
        apple_pay: 'Apple Pay',
        google_pay: 'Google Pay',
        alipay: 'Alipay',
        wechat: 'WeChat Pay',
        upi: 'UPI'
      };
      return names[method] || method;
    }

    /**
     * Create a card payment form
     * 
     * @param {HTMLElement} container - Form container
     */
  }, {
    key: "createCardForm",
    value: function createCardForm(container) {
      // Card number
      var cardNumberGroup = document.createElement('div');
      cardNumberGroup.style.marginBottom = '1rem';
      var cardNumberLabel = document.createElement('label');
      cardNumberLabel.textContent = 'Card Number';
      cardNumberLabel.style.display = 'block';
      cardNumberLabel.style.fontSize = '0.875rem';
      cardNumberLabel.style.marginBottom = '0.25rem';
      var cardNumberInput = document.createElement('input');
      cardNumberInput.type = 'text';
      cardNumberInput.placeholder = '1234 5678 9012 3456';
      cardNumberInput.style.width = '100%';
      cardNumberInput.style.padding = '0.5rem';
      cardNumberInput.style.border = '1px solid #E2E8F0';
      cardNumberInput.style.borderRadius = '0.25rem';
      cardNumberInput.style.fontSize = '1rem';
      cardNumberGroup.appendChild(cardNumberLabel);
      cardNumberGroup.appendChild(cardNumberInput);
      container.appendChild(cardNumberGroup);

      // Expiry and CVC
      var row = document.createElement('div');
      row.style.display = 'flex';
      row.style.gap = '1rem';

      // Expiry
      var expiryGroup = document.createElement('div');
      expiryGroup.style.flex = '1';
      var expiryLabel = document.createElement('label');
      expiryLabel.textContent = 'Expiry Date';
      expiryLabel.style.display = 'block';
      expiryLabel.style.fontSize = '0.875rem';
      expiryLabel.style.marginBottom = '0.25rem';
      var expiryInput = document.createElement('input');
      expiryInput.type = 'text';
      expiryInput.placeholder = 'MM/YY';
      expiryInput.style.width = '100%';
      expiryInput.style.padding = '0.5rem';
      expiryInput.style.border = '1px solid #E2E8F0';
      expiryInput.style.borderRadius = '0.25rem';
      expiryInput.style.fontSize = '1rem';
      expiryGroup.appendChild(expiryLabel);
      expiryGroup.appendChild(expiryInput);

      // CVC
      var cvcGroup = document.createElement('div');
      cvcGroup.style.flex = '1';
      var cvcLabel = document.createElement('label');
      cvcLabel.textContent = 'CVC';
      cvcLabel.style.display = 'block';
      cvcLabel.style.fontSize = '0.875rem';
      cvcLabel.style.marginBottom = '0.25rem';
      var cvcInput = document.createElement('input');
      cvcInput.type = 'text';
      cvcInput.placeholder = '123';
      cvcInput.style.width = '100%';
      cvcInput.style.padding = '0.5rem';
      cvcInput.style.border = '1px solid #E2E8F0';
      cvcInput.style.borderRadius = '0.25rem';
      cvcInput.style.fontSize = '1rem';
      cvcGroup.appendChild(cvcLabel);
      cvcGroup.appendChild(cvcInput);
      row.appendChild(expiryGroup);
      row.appendChild(cvcGroup);
      container.appendChild(row);

      // Name on card
      var nameGroup = document.createElement('div');
      nameGroup.style.marginTop = '1rem';
      var nameLabel = document.createElement('label');
      nameLabel.textContent = 'Name on Card';
      nameLabel.style.display = 'block';
      nameLabel.style.fontSize = '0.875rem';
      nameLabel.style.marginBottom = '0.25rem';
      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = 'John Doe';
      nameInput.style.width = '100%';
      nameInput.style.padding = '0.5rem';
      nameInput.style.border = '1px solid #E2E8F0';
      nameInput.style.borderRadius = '0.25rem';
      nameInput.style.fontSize = '1rem';
      nameGroup.appendChild(nameLabel);
      nameGroup.appendChild(nameInput);
      container.appendChild(nameGroup);
    }

    /**
     * Create a bank transfer form
     * 
     * @param {HTMLElement} container - Form container
     */
  }, {
    key: "createBankTransferForm",
    value: function createBankTransferForm(container) {
      // Bank name
      var bankNameGroup = document.createElement('div');
      bankNameGroup.style.marginBottom = '1rem';
      var bankNameLabel = document.createElement('label');
      bankNameLabel.textContent = 'Bank Name';
      bankNameLabel.style.display = 'block';
      bankNameLabel.style.fontSize = '0.875rem';
      bankNameLabel.style.marginBottom = '0.25rem';
      var bankNameInput = document.createElement('input');
      bankNameInput.type = 'text';
      bankNameInput.placeholder = 'Enter your bank name';
      bankNameInput.style.width = '100%';
      bankNameInput.style.padding = '0.5rem';
      bankNameInput.style.border = '1px solid #E2E8F0';
      bankNameInput.style.borderRadius = '0.25rem';
      bankNameInput.style.fontSize = '1rem';
      bankNameGroup.appendChild(bankNameLabel);
      bankNameGroup.appendChild(bankNameInput);
      container.appendChild(bankNameGroup);

      // Account number
      var accountNumberGroup = document.createElement('div');
      accountNumberGroup.style.marginBottom = '1rem';
      var accountNumberLabel = document.createElement('label');
      accountNumberLabel.textContent = 'Account Number';
      accountNumberLabel.style.display = 'block';
      accountNumberLabel.style.fontSize = '0.875rem';
      accountNumberLabel.style.marginBottom = '0.25rem';
      var accountNumberInput = document.createElement('input');
      accountNumberInput.type = 'text';
      accountNumberInput.placeholder = 'Enter your account number';
      accountNumberInput.style.width = '100%';
      accountNumberInput.style.padding = '0.5rem';
      accountNumberInput.style.border = '1px solid #E2E8F0';
      accountNumberInput.style.borderRadius = '0.25rem';
      accountNumberInput.style.fontSize = '1rem';
      accountNumberGroup.appendChild(accountNumberLabel);
      accountNumberGroup.appendChild(accountNumberInput);
      container.appendChild(accountNumberGroup);

      // Routing number
      var routingNumberGroup = document.createElement('div');
      var routingNumberLabel = document.createElement('label');
      routingNumberLabel.textContent = 'Routing Number';
      routingNumberLabel.style.display = 'block';
      routingNumberLabel.style.fontSize = '0.875rem';
      routingNumberLabel.style.marginBottom = '0.25rem';
      var routingNumberInput = document.createElement('input');
      routingNumberInput.type = 'text';
      routingNumberInput.placeholder = 'Enter your routing number';
      routingNumberInput.style.width = '100%';
      routingNumberInput.style.padding = '0.5rem';
      routingNumberInput.style.border = '1px solid #E2E8F0';
      routingNumberInput.style.borderRadius = '0.25rem';
      routingNumberInput.style.fontSize = '1rem';
      routingNumberGroup.appendChild(routingNumberLabel);
      routingNumberGroup.appendChild(routingNumberInput);
      container.appendChild(routingNumberGroup);
    }

    /**
     * Create a mobile money form
     * 
     * @param {HTMLElement} container - Form container
     */
  }, {
    key: "createMobileMoneyForm",
    value: function createMobileMoneyForm(container) {
      // Provider
      var providerGroup = document.createElement('div');
      providerGroup.style.marginBottom = '1rem';
      var providerLabel = document.createElement('label');
      providerLabel.textContent = 'Provider';
      providerLabel.style.display = 'block';
      providerLabel.style.fontSize = '0.875rem';
      providerLabel.style.marginBottom = '0.25rem';
      var providerSelect = document.createElement('select');
      providerSelect.style.width = '100%';
      providerSelect.style.padding = '0.5rem';
      providerSelect.style.border = '1px solid #E2E8F0';
      providerSelect.style.borderRadius = '0.25rem';
      providerSelect.style.fontSize = '1rem';
      var providers = [{
        value: 'mpesa',
        label: 'M-Pesa'
      }, {
        value: 'mtn',
        label: 'MTN Mobile Money'
      }, {
        value: 'airtel',
        label: 'Airtel Money'
      }, {
        value: 'orange',
        label: 'Orange Money'
      }];
      providers.forEach(function (provider) {
        var option = document.createElement('option');
        option.value = provider.value;
        option.textContent = provider.label;
        providerSelect.appendChild(option);
      });
      providerGroup.appendChild(providerLabel);
      providerGroup.appendChild(providerSelect);
      container.appendChild(providerGroup);

      // Phone number
      var phoneGroup = document.createElement('div');
      var phoneLabel = document.createElement('label');
      phoneLabel.textContent = 'Phone Number';
      phoneLabel.style.display = 'block';
      phoneLabel.style.fontSize = '0.875rem';
      phoneLabel.style.marginBottom = '0.25rem';
      var phoneInput = document.createElement('input');
      phoneInput.type = 'tel';
      phoneInput.placeholder = 'Enter your phone number';
      phoneInput.style.width = '100%';
      phoneInput.style.padding = '0.5rem';
      phoneInput.style.border = '1px solid #E2E8F0';
      phoneInput.style.borderRadius = '0.25rem';
      phoneInput.style.fontSize = '1rem';
      phoneGroup.appendChild(phoneLabel);
      phoneGroup.appendChild(phoneInput);
      container.appendChild(phoneGroup);
    }

    /**
     * Handle form submission
     */
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this3 = this;
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      // Get the pay button
      var payButton = this.container.querySelector('button:last-child');
      if (payButton) {
        payButton.textContent = 'Processing...';
        payButton.disabled = true;
        payButton.style.backgroundColor = '#64748B';
      }

      // Simulate payment processing
      setTimeout(function () {
        _this3.isSubmitting = false;

        // Call the onPaymentComplete callback
        if (typeof _this3.config.onPaymentComplete === 'function') {
          _this3.config.onPaymentComplete({
            success: true,
            paymentMethod: _this3.selectedPaymentMethod,
            transactionId: "txn_".concat(Math.random().toString(36).substring(2, 15)),
            amount: _this3.config.amount,
            currency: _this3.config.currency
          });
        }

        // Show success message
        _this3.showSuccessMessage();
      }, 2000);
    }

    /**
     * Show a success message
     */
  }, {
    key: "showSuccessMessage",
    value: function showSuccessMessage() {
      var _this4 = this;
      // Clear the container
      this.container.innerHTML = '';

      // Create success message
      var successContainer = document.createElement('div');
      successContainer.style.padding = '2rem';
      successContainer.style.textAlign = 'center';
      var icon = document.createElement('div');
      icon.innerHTML = '✓';
      icon.style.backgroundColor = '#02A669';
      icon.style.color = '#FFFFFF';
      icon.style.width = '4rem';
      icon.style.height = '4rem';
      icon.style.borderRadius = '50%';
      icon.style.display = 'flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
      icon.style.fontSize = '2rem';
      icon.style.margin = '0 auto 1.5rem';
      var title = document.createElement('h2');
      title.textContent = 'Payment Successful';
      title.style.fontSize = '1.5rem';
      title.style.fontWeight = '700';
      title.style.marginBottom = '1rem';
      var message = document.createElement('p');
      message.textContent = "Your payment of ".concat(new Intl.NumberFormat(this.config.locale, {
        style: 'currency',
        currency: this.config.currency
      }).format(this.config.amount / 100), " has been processed successfully.");
      message.style.color = '#64748B';
      message.style.marginBottom = '2rem';
      var button = document.createElement('button');
      button.textContent = 'Done';
      button.style.backgroundColor = '#02A669';
      button.style.color = '#FFFFFF';
      button.style.border = 'none';
      button.style.borderRadius = '0.25rem';
      button.style.padding = '0.75rem 1.5rem';
      button.style.fontSize = '1rem';
      button.style.fontWeight = '600';
      button.style.cursor = 'pointer';
      button.addEventListener('click', function () {
        // Reset the checkout UI
        _this4.render();
      });
      successContainer.appendChild(icon);
      successContainer.appendChild(title);
      successContainer.appendChild(message);
      successContainer.appendChild(button);
      this.container.appendChild(successContainer);
    }
  }]);
}();
var _default = exports["default"] = CheckoutUI;