import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import './BillingPage.css';

const BillingPage = () => {
  return (
    <PageTemplate>
      <div className="billing-page">
        <section className="hero-section">
          <div className="container">
            <h1>Subscription Billing</h1>
            <p className="hero-subtitle">Flexible subscription management for growing businesses</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/docs/billing" className="btn-secondary">View Documentation</Link>
            </div>
          </div>
        </section>

        <section className="features-grid-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-column">
                <h2>Billing Models</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Fixed Subscriptions</h3>
                    <p>Charge fixed amounts on a recurring basis</p>
                    <Link to="/features/fixed-billing">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Usage-Based Billing</h3>
                    <p>Bill customers based on their consumption</p>
                    <Link to="/features/usage-billing">Learn More →</Link>
                  </div>
                </div>
              </div>

              <div className="feature-column">
                <h2>Customer Management</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Smart Dunning</h3>
                    <p>Reduce churn with automated retry logic</p>
                    <Link to="/features/dunning">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Customer Portal</h3>
                    <p>Self-service subscription management</p>
                    <Link to="/features/customer-portal">Learn More →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="integration-section">
          <div className="container">
            <h2>Built for Scale</h2>
            <div className="integration-grid">
              <div className="integration-item">
                <h3>Automated Workflows</h3>
                <p>Streamline billing operations</p>
              </div>
              <div className="integration-item">
                <h3>Analytics</h3>
                <p>Track revenue and subscriber metrics</p>
              </div>
              <div className="integration-item">
                <h3>Integrations</h3>
                <p>Connect with your tech stack</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default BillingPage;