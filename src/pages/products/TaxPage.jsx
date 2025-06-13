import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import { SecurityIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const TaxPage = () => (
  <PageTemplate>
    <div className="page-container fade-in tax-bg">
      <div className="icon-title-row">
        <SecurityIcon className="stripe-style-icon" />
        <h1 className="page-title">Automated Tax Compliance</h1>
      </div>

      <section className="product-hero">
        <div className="container">
          <p>Simplify tax calculation, collection, and reporting for your business</p>
          <div className="product-hero-buttons">
            <a href="#features" className="btn btn-primary">Explore Features</a>
            <Link to="/contact" className="btn btn-outline">Contact Sales</Link>
          </div>
        </div>
      </section>

      <section id="features" className="product-features">
        <div className="container">
          <h2>Global Tax Coverage</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>
              </div>
              <h4>Sales Tax</h4>
              <p>United States state and local sales taxes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
              </div>
              <h4>VAT</h4>
              <p>Value-added tax in EU and other countries</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" /><path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" /><line x1="12" y1="22" x2="12" y2="13" /><path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" /></svg>
              </div>
              <h4>GST</h4>
              <p>Goods and services tax in Australia, Canada, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 15h0M2 9.5h20" /></svg>
              </div>
              <h4>Digital Services Tax</h4>
              <p>Special taxes on digital services and products</p>
            </div>
          </div>
        </div>
      </section>

      <section className="automation-features-section">
        <div className="container">
          <h2>Automation Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>Location Detection</h4>
              <p>Precise tax jurisdiction identification using address validation</p>
            </div>
            <div className="feature-card">
              <h4>Product Classification</h4>
              <p>Automatic categorization of products and services for tax purposes</p>
            </div>
            <div className="feature-card">
              <h4>Customer Type</h4>
              <p>Different tax rules for businesses vs. consumers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="integration-section">
        <div className="container">
          <h2>Integration Options</h2>
          <p>Connect with e-commerce, billing, and accounting platforms</p>
          <div className="integration-logos">
            <div className="integration-logo">Shopify</div>
            <div className="integration-logo">WooCommerce</div>
            <div className="integration-logo">Magento</div>
            <div className="integration-logo">BigCommerce</div>
            <div className="integration-logo">QuickBooks</div>
            <div className="integration-logo">Xero</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Stay compliant with Sunny Tax</h2>
          <p>Automate tax compliance across 100+ countries</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-light">Create Account</Link>
            <Link to="/contact" className="btn btn-outline-light">Contact Sales</Link>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default TaxPage;