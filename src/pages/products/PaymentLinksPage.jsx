import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { CodeIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const PaymentLinksPage = () => (
  <PageTemplate>
    <div className="page-container fade-in paymentlinks-bg">
      <div className="icon-title-row">
        <CodeIcon className="stripe-style-icon" />
        <h1 className="page-title">Payment Links</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Accept payments without code—share links anywhere. Instantly generate payment links for any product or service.</p>
          <div className="product-hero-buttons">
            <a href="#generator" className="btn btn-primary">Create Payment Link</a>
            <a href="#use-cases" className="btn btn-outline">See Use Cases</a>
          </div>
        </div>
      </section>
      <section id="generator" className="demo-section">
        <div className="container">
          <h2>Link Generator</h2>
          <div className="link-generator">
            <div className="form-group">
              <label>Amount</label>
              <input type="text" placeholder="$100.00" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" placeholder="Product or service description" />
            </div>
            <button className="btn btn-primary">Generate Payment Link</button>
            <div className="generated-link">
              <p>https://pay.sunny.com/p/sample-payment-link</p>
              <button className="btn btn-outline">Copy Link</button>
            </div>
          </div>
        </div>
      </section>
      <section id="use-cases" className="product-features">
        <div className="container">
          <h2>Use Cases</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="22" height="16" rx="2" ry="2" />
                  <path d="M1 7h22" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <h3>Invoicing</h3>
              <p>Send payment links via email to clients for quick and easy payments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <h3>Social Media</h3>
              <p>Share payment links on social platforms to monetize your content</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                </svg>
              </div>
              <h3>QR Codes</h3>
              <p>Generate QR codes for in-person payments at events or retail locations</p>
            </div>
          </div>
        </div>
      </section>
      <section className="analytics-section">
        <div className="container">
          <h2>Analytics Dashboard</h2>
          <div className="dashboard-preview">
            <div className="chart-placeholder" style={{height: "300px", background: "linear-gradient(135deg, #f0f4ff, #e6f0ff)"}} />
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Conversion Rate</h3>
                <p className="stat">68%</p>
                <p>Industry average: 49%</p>
              </div>
              <div className="stat-card">
                <h3>Average Time to Pay</h3>
                <p className="stat">1.2 days</p>
                <p>Industry average: 3.4 days</p>
              </div>
              <div className="stat-card">
                <h3>Link Clicks</h3>
                <p className="stat">2,450</p>
                <p>Last 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <h2>Ready to get started with Payment Links?</h2>
          <p>Create your first payment link in minutes</p>
          <div className="cta-buttons">
            <a href="/signup" className="btn btn-light">Create Account</a>
            <a href="/contact" className="btn btn-outline-light">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default PaymentLinksPage;