import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { BillingIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const InvoicingPage = () => (
  <PageTemplate>
    <div className="page-container fade-in invoicing-bg">
      <div className="icon-title-row">
        <BillingIcon className="stripe-style-icon" />
        <h1 className="page-title">Smart Invoicing</h1>
      </div>

      <section className="product-hero">
        <div className="container">
          <p>Create, send, and manage professional invoices with automated payment collection</p>
          <div className="product-hero-buttons">
            <a href="#features" className="btn btn-primary">Explore Features</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>

      <section id="features" className="product-features">
        <div className="container">
          <h2>Invoicing Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3>Custom Invoices</h3>
              <p>Create branded invoices with your logo and custom fields</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3>Automated Reminders</h3>
              <p>Send automatic payment reminders to reduce late payments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              </div>
              <h3>Multiple Payment Methods</h3>
              <p>Accept credit cards, bank transfers, and digital wallets</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h3>Payment Tracking</h3>
              <p>Real-time updates when invoices are viewed and paid</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <div className="container">
          <div className="demo-container">
            <div className="demo-content">
              <h2>Professional Invoice Templates</h2>
              <p>Choose from a variety of professional templates or create your own custom design. Add your logo, customize colors, and include all the details your customers need.</p>
              <a href="/demo" className="btn btn-primary">See Templates</a>
            </div>
            <div className="demo-image">
              <img src="https://via.placeholder.com/600x400" alt="Invoice Templates" />
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <h2>Invoicing Plans</h2>
          <p>Choose the plan that fits your business needs</p>
          <div className="pricing-options">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Basic</h3>
                <p>For small businesses</p>
                <div className="price">$19</div>
                <div className="price-period">per month</div>
              </div>
              <ul className="pricing-features">
                <li>Up to 50 invoices per month</li>
                <li>2 invoice templates</li>
                <li>Email support</li>
                <li>Payment tracking</li>
              </ul>
              <div className="pricing-cta">
                <a href="/signup" className="btn btn-outline">Get Started</a>
              </div>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-header">
                <h3>Business</h3>
                <p>For growing businesses</p>
                <div className="price">$49</div>
                <div className="price-period">per month</div>
              </div>
              <ul className="pricing-features">
                <li>Unlimited invoices</li>
                <li>All invoice templates</li>
                <li>Automated reminders</li>
                <li>Custom branding</li>
                <li>Priority support</li>
              </ul>
              <div className="pricing-cta">
                <a href="/signup" className="btn btn-primary">Get Started</a>
              </div>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <p>For large businesses</p>
                <div className="price">Custom</div>
                <div className="price-period">contact sales</div>
              </div>
              <ul className="pricing-features">
                <li>Unlimited invoices</li>
                <li>Custom invoice templates</li>
                <li>Advanced automation</li>
                <li>Dedicated account manager</li>
                <li>API access</li>
                <li>Enterprise integrations</li>
              </ul>
              <div className="pricing-cta">
                <a href="/contact" className="btn btn-outline">Contact Sales</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="integration-section">
        <div className="container">
          <h2>Integrations</h2>
          <p>Connect with your accounting and business tools</p>
          <div className="integration-logos">
            <img src="/assets/logos/quickbooks.svg" alt="QuickBooks" className="integration-logo" />
            <img src="/assets/logos/xero.svg" alt="Xero" className="integration-logo" />
            <img src="/assets/logos/freshbooks.svg" alt="FreshBooks" className="integration-logo" />
            <img src="/assets/logos/zoho.svg" alt="Zoho" className="integration-logo" />
            <img src="/assets/logos/sage.svg" alt="Sage" className="integration-logo" />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to simplify your invoicing?</h2>
          <p>Join thousands of businesses using Sunny Invoicing</p>
          <div className="cta-buttons">
            <a href="/signup" className="btn btn-light">Create Account</a>
            <a href="/contact" className="btn btn-outline-light">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default InvoicingPage;