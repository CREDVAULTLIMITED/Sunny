import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { SecurityIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/EnterprisePage.css';

const EnterprisePage = () => (
  <PageTemplate>
    <div className="page-container fade-in enterprise-bg">
      <div className="icon-title-row">
        <SecurityIcon className="stripe-style-icon" />
        <h1 className="page-title">Enterprise Payment Solutions</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Scalable, secure payment infrastructure for global enterprises</p>
          <div className="product-hero-buttons">
            <a href="#features" className="btn btn-primary">Explore Features</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>
      
      <section className="features-section" id="features">
        <h2>Enterprise Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Global Scale</h3>
            <p>Process millions of transactions across 150+ countries</p>
          </div>
          <div className="feature-card">
            <h3>Custom Contracts</h3>
            <p>Tailored pricing and terms for high-volume businesses</p>
          </div>
          <div className="feature-card">
            <h3>Dedicated Support</h3>
            <p>24/7 priority support with dedicated account manager</p>
          </div>
          <div className="feature-card">
            <h3>Advanced Security</h3>
            <p>Enterprise-grade security with custom fraud rules</p>
          </div>
        </div>
      </section>
      
      <section className="case-studies-section">
        <h2>Enterprise Success Stories</h2>
        <div className="case-study">
          <div className="case-study-content">
            <h3>Global Retail Chain</h3>
            <p>Unified payment processing across 28 countries with seamless integration</p>
            <ul>
              <li>Consolidated 12 payment providers into one platform</li>
              <li>Reduced payment processing costs by 18%</li>
              <li>Improved authorization rates by 7%</li>
              <li>Simplified compliance across multiple regions</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="metrics-section">
        <h2>Enterprise Dashboard</h2>
        <div className="dashboard-preview">
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Real-time Analytics</h3>
              <p>Monitor transaction volumes and revenue across all channels</p>
            </div>
            <div className="metric-card">
              <h3>Custom Reports</h3>
              <p>Generate detailed reports with advanced filtering</p>
            </div>
            <div className="metric-card">
              <h3>User Management</h3>
              <p>Granular access controls and permission settings</p>
            </div>
            <div className="metric-card">
              <h3>Audit Logs</h3>
              <p>Comprehensive activity tracking for compliance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default EnterprisePage;