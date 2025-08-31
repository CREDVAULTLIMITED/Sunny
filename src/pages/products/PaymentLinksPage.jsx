import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import './PaymentLinksPage.css';

const PaymentLinksPage = () => {
  return (
    <PageTemplate>
      <div className="payment-links-page">
        <section className="hero-section">
          <div className="container">
            <h1>Payment Links</h1>
            <p className="hero-subtitle">Create and share payment links in seconds - no code required</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/docs/payment-links" className="btn-secondary">View Documentation</Link>
            </div>
          </div>
        </section>

        <section className="features-grid-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-column">
                <h2>Quick Setup</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Instant Creation</h3>
                    <p>Generate payment links for any amount in seconds</p>
                    <Link to="/features/instant-links">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>No Code Required</h3>
                    <p>Share links via email, SMS, or social media</p>
                    <Link to="/features/sharing">Learn More →</Link>
                  </div>
                </div>
              </div>

              <div className="feature-column">
                <h2>Customization</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Branded Checkout</h3>
                    <p>Customize the checkout page with your brand</p>
                    <Link to="/features/branding">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Smart Links</h3>
                    <p>Set expiry dates, usage limits, and recurring payments</p>
                    <Link to="/features/link-settings">Learn More →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="integration-section">
          <div className="container">
            <h2>Use Cases</h2>
            <div className="integration-grid">
              <div className="integration-item">
                <h3>Invoicing</h3>
                <p>Add payment links to your invoices</p>
              </div>
              <div className="integration-item">
                <h3>Social Media</h3>
                <p>Sell directly through social platforms</p>
              </div>
              <div className="integration-item">
                <h3>Support</h3>
                <p>Request payments via chat or email</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PaymentLinksPage;