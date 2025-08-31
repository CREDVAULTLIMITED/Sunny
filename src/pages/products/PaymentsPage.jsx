import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import './PaymentsPage.css';

const PaymentsPage = () => {
  return (
    <PageTemplate>
      <div className="payments-page">
        <section className="hero-section">
          <div className="container">
            <h1>Online Payments</h1>
            <p className="hero-subtitle">Accept payments worldwide with a simple integration</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/docs/payments" className="btn-secondary">View Documentation</Link>
            </div>
          </div>
        </section>

        <section className="features-grid-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-column">
                <h2>Payment Methods</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Cards & Digital Wallets</h3>
                    <p>Accept major credit cards, Apple Pay, Google Pay, and more</p>
                    <Link to="/features/payment-methods">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Bank Payments</h3>
                    <p>Direct debits, bank transfers, and real-time payments</p>
                    <Link to="/features/bank-payments">Learn More →</Link>
                  </div>
                </div>
              </div>

              <div className="feature-column">
                <h2>Global Coverage</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Multi-Currency</h3>
                    <p>Accept payments in 135+ currencies with automatic conversion</p>
                    <Link to="/features/currencies">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Local Payment Methods</h3>
                    <p>Support preferred payment methods in each market</p>
                    <Link to="/features/local-payments">Learn More →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="integration-section">
          <div className="container">
            <h2>Easy Integration</h2>
            <div className="integration-grid">
              <div className="integration-item">
                <h3>Quick Setup</h3>
                <p>Start accepting payments in minutes with our SDKs</p>
              </div>
              <div className="integration-item">
                <h3>Secure Processing</h3>
                <p>PCI compliant infrastructure and fraud prevention</p>
              </div>
              <div className="integration-item">
                <h3>Developer Tools</h3>
                <p>Comprehensive APIs and testing environment</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PaymentsPage;