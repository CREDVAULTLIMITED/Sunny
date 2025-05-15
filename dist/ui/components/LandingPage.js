"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Button = _interopRequireDefault(require("./Button.jsx"));
var _Card = _interopRequireDefault(require("./Card.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Landing page component for Sunny Payment Gateway
 */
var LandingPage = function LandingPage() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "landing-page"
  }, /*#__PURE__*/_react["default"].createElement("header", {
    className: "landing-header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "logo"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/images/logo.svg",
    alt: "Sunny Payments"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "logo-text"
  }, "Sunny")), /*#__PURE__*/_react["default"].createElement("nav", null, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#features"
  }, "Features")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#how-it-works"
  }, "How It Works")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#developers"
  }, "Developers")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#pricing"
  }, "Pricing")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#about"
  }, "About")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "header-buttons"
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/login"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "outline"
  }, "Login")), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/signup"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "primary"
  }, "Sign Up")))))), /*#__PURE__*/_react["default"].createElement("section", {
    className: "hero"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "hero-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "hero-text"
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "Global Payments Made ", /*#__PURE__*/_react["default"].createElement("span", null, "Simple")), /*#__PURE__*/_react["default"].createElement("p", null, "Accept payments from anywhere in the world with low fees, instant settlements, and enterprise-grade security."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hero-buttons"
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/signup"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "primary",
    size: "large"
  }, "Get Started")), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "#demo"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "outline",
    size: "large"
  }, "See Demo")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hero-image"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/images/hero-illustration.svg",
    alt: "Sunny Payments Checkout"
  }))))), /*#__PURE__*/_react["default"].createElement("section", {
    className: "features",
    id: "features"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Why Choose Sunny"), /*#__PURE__*/_react["default"].createElement("p", null, "A comprehensive payment solution designed to meet all your business needs")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "features-grid"
  }, features.map(function (feature, index) {
    return /*#__PURE__*/_react["default"].createElement(_Card["default"], {
      key: index,
      className: "feature-card"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "feature-icon"
    }, feature.icon), /*#__PURE__*/_react["default"].createElement("h3", null, feature.title), /*#__PURE__*/_react["default"].createElement("p", null, feature.description));
  })))), /*#__PURE__*/_react["default"].createElement("section", {
    className: "how-it-works",
    id: "how-it-works"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "How It Works"), /*#__PURE__*/_react["default"].createElement("p", null, "Get up and running with Sunny Payments in just a few simple steps")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "steps"
  }, steps.map(function (step, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "step",
      key: index
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "step-number"
    }, index + 1), /*#__PURE__*/_react["default"].createElement("h3", null, step.title), /*#__PURE__*/_react["default"].createElement("p", null, step.description));
  })))), /*#__PURE__*/_react["default"].createElement("section", {
    className: "developer",
    id: "developers"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Built for Developers"), /*#__PURE__*/_react["default"].createElement("p", null, "Powerful APIs and SDKs that make integration a breeze")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "developer-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "developer-text"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Simple Integration"), /*#__PURE__*/_react["default"].createElement("p", null, "Our SDKs are designed to get you up and running quickly with minimal code. Integrate payments into your application in minutes, not days."), /*#__PURE__*/_react["default"].createElement("p", null, "With comprehensive documentation and examples, you'll have everything you need to create a seamless payment experience."), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/docs"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "primary"
  }, "Read the Docs"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "developer-code"
  }, /*#__PURE__*/_react["default"].createElement("pre", null, /*#__PURE__*/_react["default"].createElement("code", null, "// Initialize Sunny with your API key\nimport { SunnyPayments } from '@sunny/payment-sdk';\n\nconst sunny = new SunnyPayments({\n  apiKey: 'your_api_key',\n  environment: 'sandbox'\n});\n\n// Process a payment\nconst paymentResult = await sunny.processPayment({\n  amount: 1000,\n  currency: 'USD',\n  paymentMethod: 'card',\n  card: {\n    number: '4242424242424242',\n    expMonth: 12,\n    expYear: 2025,\n    cvc: '123'\n  }\n});")))))), /*#__PURE__*/_react["default"].createElement("section", {
    className: "cta",
    id: "demo"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Ready to Get Started?"), /*#__PURE__*/_react["default"].createElement("p", null, "Join thousands of businesses using Sunny Payment Gateway to process payments globally."), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/signup"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "secondary",
    size: "large"
  }, "Create Free Account")))), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-about"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-logo"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/images/logo-white.svg",
    alt: "Sunny Payments"
  })), /*#__PURE__*/_react["default"].createElement("p", null, "A comprehensive, global payment processing solution designed to meet all modern payment needs with enterprise-grade security and scalability.")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-links"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Company"), /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/about"
  }, "About Us")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/careers"
  }, "Careers")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/blog"
  }, "Blog")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/contact"
  }, "Contact")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-links"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Products"), /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/payments"
  }, "Payments")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/subscriptions"
  }, "Subscriptions")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/marketplace"
  }, "Marketplace")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/connect"
  }, "Connect")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-links"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Resources"), /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/docs"
  }, "Documentation")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/api"
  }, "API Reference")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/support"
  }, "Support")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/status"
  }, "Status"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "\xA9 ", new Date().getFullYear(), " Sunny Payment Gateway. All rights reserved.")))));
};

// Feature data
var features = [{
  title: 'Global Coverage',
  description: 'Accept payments from any country in 135+ currencies with support for local payment methods.',
  icon: /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
  }))
}, {
  title: 'Low Fees',
  description: 'Flat, low transaction fees with no hidden charges for currency conversion, settlement, or refunds.',
  icon: /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
  }))
}, {
  title: 'Instant Payouts',
  description: 'Funds settle immediately or within minutes to bank or mobile money accounts—even on weekends.',
  icon: /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
  }))
}, {
  title: 'Enterprise Security',
  description: 'PCI DSS Level 1 compliant with advanced fraud detection and end-to-end encryption.',
  icon: /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
  }))
}, {
  title: 'Developer Tools',
  description: 'Clean, powerful APIs and SDKs for easy integration into websites, mobile apps, and marketplaces.',
  icon: /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
  }))
}, {
  title: 'Best-in-Class UX',
  description: 'Seamless checkout experience with localized languages and UI based on the customer\'s region.',
  icon: /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
  }))
}];

// Steps data
var steps = [{
  title: 'Create Account',
  description: 'Sign up for a free Sunny account and complete verification'
}, {
  title: 'Integrate',
  description: 'Add our SDK to your website or mobile app with just a few lines of code'
}, {
  title: 'Accept Payments',
  description: 'Start accepting payments from customers around the world'
}, {
  title: 'Get Paid',
  description: 'Receive funds in your bank account instantly or on a schedule'
}];
var _default = exports["default"] = LandingPage;