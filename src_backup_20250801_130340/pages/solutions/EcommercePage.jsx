import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { PaymentsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/EcommercePage.css';

const EcommercePage = () => (
  <PageTemplate>
    <div className="page-container fade-in ecommerce-bg">
      <div className="icon-title-row">
        <PaymentsIcon className="stripe-style-icon" />
        <h1 className="page-title">Complete Payment Solution for Online Stores</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Boost conversion rates and expand globally with our e-commerce payment solutions</p>
          <div className="product-hero-buttons">
            <a href="#integrations" className="btn btn-primary">Explore Integrations</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>
      
      <div className="icon-top-left">
        <PaymentsIcon />
      </div>
      <section className="integrations-section" id="integrations">
        <h2>Platform Integrations</h2>
        <div className="platform-logos">
          <div className="platform-logo">Shopify</div>
          <div className="platform-logo">WooCommerce</div>
          <div className="platform-logo">Magento</div>
          <div className="platform-logo">BigCommerce</div>
        </div>
      </section>
      
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Cart Abandonment Recovery</h3>
            <p>Automated emails to recover lost sales</p>
          </div>
          <div className="feature-card">
            <h3>Optimized Checkout</h3>
            <p>One-click payments and smart fields</p>
          </div>
          <div className="feature-card">
            <h3>Fraud Protection</h3>
            <p>Advanced AI to prevent fraudulent transactions</p>
          </div>
        </div>
      </section>
      
      <section className="mobile-section">
        <h2>Mobile Experience</h2>
        <div className="mobile-showcase">
          <div className="mobile-device">
            <div className="mobile-screen">
              <div className="mobile-checkout-demo"></div>
            </div>
          </div>
          <div className="mobile-features">
            <h3>Responsive Design</h3>
            <p>Optimized for all screen sizes</p>
            <h3>Mobile Wallets</h3>
            <p>Support for Apple Pay and Google Pay</p>
            <h3>SMS Notifications</h3>
            <p>Order updates via text message</p>
          </div>
        </div>
      </section>
      
      <section className="case-studies-section">
        <h2>Success Stories</h2>
        <div className="case-study">
          <div className="case-study-content">
            <h3>FashionBoutique.com</h3>
            <p>Increased checkout conversion by 25% after implementing Sunny Payments</p>
            <ul>
              <li>Reduced cart abandonment by 30%</li>
              <li>Expanded to 15 new markets</li>
              <li>Saved 20 hours per week on payment reconciliation</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default EcommercePage;