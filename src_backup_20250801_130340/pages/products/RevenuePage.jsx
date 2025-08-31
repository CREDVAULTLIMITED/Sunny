import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import './RevenuePage.css';

const RevenuePage = () => {
  return (
    <PageTemplate>
      <div className="revenue-page">
        <section className="hero-section">
          <div className="container">
            <h1>Revenue Recognition & Financial Reporting</h1>
            <p className="hero-subtitle">Automated revenue recognition and compliance reporting for modern businesses</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/docs/revenue" className="btn-secondary">View Documentation</Link>
            </div>
          </div>
        </section>

        <section className="features-grid-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-column">
                <h2>Revenue Management</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Automated Recognition</h3>
                    <p>Automatically recognize revenue based on delivery, milestones, or time periods</p>
                    <Link to="/features/revenue-recognition">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Multi-Element Allocation</h3>
                    <p>Handle complex revenue allocation across bundled products and services</p>
                    <Link to="/features/revenue-allocation">Learn More →</Link>
                  </div>
                </div>
              </div>

              <div className="feature-column">
                <h2>Compliance & Reporting</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <h3>Compliance Frameworks</h3>
                    <p>Built-in support for ASC 606, IFRS 15, and other standards</p>
                    <Link to="/features/compliance">Learn More →</Link>
                  </div>
                  <div className="feature-card">
                    <h3>Financial Reports</h3>
                    <p>Generate accurate financial statements and compliance reports</p>
                    <Link to="/features/reporting">Learn More →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="integration-section">
          <div className="container">
            <h2>Seamless Integration</h2>
            <div className="integration-grid">
              <div className="integration-item">
                <h3>Accounting Software</h3>
                <p>Connect with QuickBooks, Xero, and other major platforms</p>
              </div>
              <div className="integration-item">
                <h3>Payment Systems</h3>
                <p>Integrate with your existing payment and billing infrastructure</p>
              </div>
              <div className="integration-item">
                <h3>ERP Systems</h3>
                <p>Sync with enterprise resource planning systems</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default RevenuePage;
