import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { BillingIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const BillingPage = () => (
  <PageTemplate>
    <div className="page-container fade-in billing-bg">
      <div className="icon-title-row">
        <BillingIcon className="stripe-style-icon" />
        <h1 className="page-title">Subscription Billing</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Flexible recurring billing for subscription-based businesses</p>
          <div className="product-hero-buttons">
            <a href="#features" className="btn btn-primary">Explore Features</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>
      <section id="features" className="product-features">
        <div className="container">
          <h2>Powerful Billing Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3>Flexible Billing Cycles</h3>
              <p>Bill customers monthly, quarterly, annually, or on custom schedules</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3>Usage-Based Billing</h3>
              <p>Charge customers based on their consumption with metered billing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Customer Management</h3>
              <p>Organize customers, track payment history, and manage subscriptions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              </div>
              <h3>Smart Retries</h3>
              <p>Reduce failed payments with intelligent retry logic and dunning management</p>
            </div>
          </div>
        </div>
      </section>
      <section className="demo-section">
        <div className="container">
          <div className="demo-container">
            <div className="demo-content">
              <h2>Powerful Dashboard</h2>
              <p>Get a complete view of your subscription business with real-time metrics and analytics. Track MRR, churn, customer lifetime value, and more.</p>
              <a href="/demo" className="btn btn-primary">Request Demo</a>
            </div>
            <div className="demo-image">
              <img src="https://via.placeholder.com/600x400" alt="Billing Dashboard" />
            </div>
          </div>
        </div>
      </section>
      <section className="pricing-section">
        <div className="container">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that's right for your business</p>
          <div className="pricing-options">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Starter</h3>
                <p>For small businesses</p>
                <div className="price">$49</div>
                <div className="price-period">per month</div>
              </div>
              <ul className="pricing-features">
                <li>Up to 100 customers</li>
                <li>Monthly billing cycles</li>
                <li>Basic reporting</li>
                <li>Email support</li>
              </ul>
              <div className="pricing-cta">
                <a href="/signup" className="btn btn-outline">Get Started</a>
              </div>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-header">
                <h3>Professional</h3>
                <p>For growing businesses</p>
                <div className="price">$149</div>
                <div className="price-period">per month</div>
              </div>
              <ul className="pricing-features">
                <li>Up to 1,000 customers</li>
                <li>All billing cycles</li>
                <li>Advanced reporting</li>
                <li>Priority support</li>
                <li>Custom invoice templates</li>
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
                <li>Unlimited customers</li>
                <li>All billing features</li>
                <li>Custom reporting</li>
                <li>Dedicated account manager</li>
                <li>SLA support</li>
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
          <h2>Seamless Integrations</h2>
          <p>Connect with your favorite tools and platforms</p>
          <div className="integration-logos">
            <img src="/assets/logos/salesforce.svg" alt="Salesforce" className="integration-logo" />
            <img src="/assets/logos/quickbooks.svg" alt="QuickBooks" className="integration-logo" />
            <img src="/assets/logos/xero.svg" alt="Xero" className="integration-logo" />
            <img src="/assets/logos/zapier.svg" alt="Zapier" className="integration-logo" />
            <img src="/assets/logos/slack.svg" alt="Slack" className="integration-logo" />
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <h2>Ready to streamline your billing?</h2>
          <p>Join thousands of businesses using Sunny Billing</p>
          <div className="cta-buttons">
            <a href="/signup" className="btn btn-light">Create Account</a>
            <a href="/contact" className="btn btn-outline-light">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default BillingPage;