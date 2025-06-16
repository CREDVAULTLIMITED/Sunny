import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import './InvoicingPage.css';

const InvoicingPage = () => {
  return (
    <PageTemplate>
      <div className="invoicing-page">
        <section className="hero-section">
          <div className="container">
            <h1>Smart Invoicing</h1>
            <p className="hero-subtitle">Generate and manage professional invoices automatically</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/docs/invoicing" className="btn-secondary">View Documentation</Link>
            </div>
          </div>
        </section>

        <section className="features-grid-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-column">
                <h2>Invoice Management</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Automated Generation</h3>
                    <p>Create and send invoices automatically</p>
                    <Link to="/features/auto-invoicing">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Custom Templates</h3>
                    <p>Design branded invoice templates</p>
                    <Link to="/features/invoice-templates">Learn More →</Link>
                  </div>
                </div>
              </div>

              <div className="feature-column">
                <h2>Payment Collection</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Payment Links</h3>
                    <p>Add secure payment links to invoices</p>
                    <Link to="/features/invoice-payments">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Reminders & Follow-up</h3>
                    <p>Automated payment reminders and late notices</p>
                    <Link to="/features/payment-reminders">Learn More →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="integration-section">
          <div className="container">
            <h2>Business Ready</h2>
            <div className="integration-grid">
              <div className="integration-item">
                <h3>Accounting Sync</h3>
                <p>Connect with popular accounting software</p>
              </div>
              <div className="integration-item">
                <h3>Tax Compliance</h3>
                <p>Automatic tax calculations and reports</p>
              </div>
              <div className="integration-item">
                <h3>Multi-Currency</h3>
                <p>Invoice in any currency</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default InvoicingPage;