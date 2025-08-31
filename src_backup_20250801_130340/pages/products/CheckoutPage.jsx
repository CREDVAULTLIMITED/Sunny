import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { PaymentsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const CheckoutPage = () => (
  <PageTemplate>
    <div className="page-container fade-in checkout-bg">
      <div className="icon-title-row">
        <PaymentsIcon className="stripe-style-icon" />
        <h1 className="page-title">Checkout</h1>
      </div>

      <section className="product-hero">
        <div className="container">
          <p>A pre-built payment form optimized for conversion, designed to get you up and running as quickly as possible.</p>
          <div className="product-hero-buttons">
            <a href="/signup" className="btn btn-primary">Start now</a>
            <a href="#demo" className="btn btn-outline">See Demo</a>
          </div>
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="container">
          <h2>Live Demo</h2>
          <div className="demo-container">
            <div className="checkout-demo">
              <div className="checkout-header">
                <div className="checkout-logo">
                  <div className="checkout-logo-icon"></div>
                  <span>ACME Store</span>
                </div>
                <div className="checkout-steps">
                  <div className="checkout-step active">
                    <div className="checkout-step-number">1</div>
                    <span>Payment</span>
                  </div>
                  <div className="checkout-step">
                    <div className="checkout-step-number">2</div>
                    <span>Confirmation</span>
                  </div>
                </div>
              </div>
              <div className="checkout-body">
                <div className="checkout-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Card information</label>
                    <div className="card-element">
                      <div className="card-element-placeholder"></div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Name on card</label>
                    <input type="text" className="form-control" placeholder="J. Smith" />
                  </div>
                  <div className="form-group">
                    <label>Billing address</label>
                    <input type="text" className="form-control" placeholder="123 Main St" />
                  </div>
                </div>
              </div>
              <div className="checkout-footer">
                <div className="checkout-total">
                  Total: <span className="checkout-total-amount">$49.99</span>
                </div>
                <button className="checkout-button">Pay now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="devices-section">
        <div className="container">
          <h2>Optimized for any device</h2>
          <div className="devices-container">
            <div className="device device-desktop">
              <div className="device-desktop-screen"></div>
            </div>
            <div className="device device-mobile">
              <div className="device-mobile-screen"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="customization-section">
        <div className="container">
          <h2>Customization Options</h2>
          <div className="customization-options">
            <div className="customization-card">
              <div className="customization-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h3>Branding</h3>
              <p>Match your brand colors, add your logo, and customize the look and feel of your checkout.</p>
            </div>
            <div className="customization-card">
              <div className="customization-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3>Layout Options</h3>
              <p>Choose from multiple layouts including single page, multi-step, and accordion styles.</p>
            </div>
            <div className="customization-card">
              <div className="customization-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Customer Information</h3>
              <p>Collect only the information you need with customizable fields and validation rules.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to upgrade your checkout?</h2>
          <p>Start using Sunny Checkout today</p>
          <div className="cta-buttons">
            <a href="/signup" className="btn btn-light">Create Account</a>
            <a href="/contact" className="btn btn-outline-light">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default CheckoutPage;