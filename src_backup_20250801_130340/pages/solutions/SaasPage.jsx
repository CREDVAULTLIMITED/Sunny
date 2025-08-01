import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { BillingIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/SaasPage.css';

const SaasPage = () => (
  <PageTemplate>
    <div className="page-container fade-in saas-bg">
      <div className="icon-title-row">
        <BillingIcon className="stripe-style-icon" />
        <h1 className="page-title">Built for Subscription Businesses</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Streamline recurring billing with flexible subscription management tools</p>
          <div className="product-hero-buttons">
            <a href="#billing-models" className="btn btn-primary">Explore Billing Models</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>
      
      <section className="billing-models-section" id="billing-models">
        <h2>Billing Models</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Fixed Recurring</h3>
            <p>Charge the same amount on a regular schedule</p>
          </div>
          <div className="feature-card">
            <h3>Usage-Based</h3>
            <p>Bill customers based on their consumption</p>
          </div>
          <div className="feature-card">
            <h3>Tiered Pricing</h3>
            <p>Different rates based on usage levels</p>
          </div>
          <div className="feature-card">
            <h3>Hybrid Models</h3>
            <p>Combine fixed fees with usage-based charges</p>
          </div>
        </div>
      </section>
      
      <section className="customer-lifecycle-section">
        <h2>Customer Lifecycle</h2>
        <div className="lifecycle-diagram">
          <div className="lifecycle-stage">
            <h3>Acquisition</h3>
            <p>Frictionless signup and trial management</p>
          </div>
          <div className="lifecycle-stage">
            <h3>Conversion</h3>
            <p>Smooth transition from trial to paid</p>
          </div>
          <div className="lifecycle-stage">
            <h3>Retention</h3>
            <p>Reduce churn with smart dunning</p>
          </div>
          <div className="lifecycle-stage">
            <h3>Expansion</h3>
            <p>Upsell and cross-sell opportunities</p>
          </div>
        </div>
      </section>
      
      <section className="metrics-section">
        <h2>Metrics Dashboard</h2>
        <div className="dashboard-preview">
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>MRR</h3>
              <p>Track monthly recurring revenue</p>
            </div>
            <div className="metric-card">
              <h3>Churn Rate</h3>
              <p>Monitor customer retention</p>
            </div>
            <div className="metric-card">
              <h3>LTV</h3>
              <p>Calculate customer lifetime value</p>
            </div>
            <div className="metric-card">
              <h3>CAC</h3>
              <p>Measure customer acquisition cost</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default SaasPage;