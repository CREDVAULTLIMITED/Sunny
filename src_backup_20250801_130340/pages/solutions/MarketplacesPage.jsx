import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { FinanceIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/MarketplacesPage.css';

const MarketplacesPage = () => (
  <PageTemplate>
    <div className="page-container fade-in marketplaces-bg">
      <div className="icon-title-row">
        <FinanceIcon className="stripe-style-icon" />
        <h1 className="page-title">Marketplace Payment Solutions</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Connect buyers and sellers with seamless payment experiences</p>
          <div className="product-hero-buttons">
            <a href="#features" className="btn btn-primary">Explore Features</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>
      
      <section className="features-section" id="features">
        <h2>Marketplace Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Split Payments</h3>
            <p>Automatically distribute funds between platform and sellers</p>
          </div>
          <div className="feature-card">
            <h3>Seller Onboarding</h3>
            <p>Streamlined verification and account creation</p>
          </div>
          <div className="feature-card">
            <h3>Multi-party Escrow</h3>
            <p>Hold funds securely until delivery conditions are met</p>
          </div>
          <div className="feature-card">
            <h3>Payout Management</h3>
            <p>Schedule and automate payouts to sellers worldwide</p>
          </div>
        </div>
      </section>
      
      <section className="case-studies-section">
        <h2>Marketplace Success Stories</h2>
        <div className="case-study">
          <div className="case-study-content">
            <h3>ServiceConnect Platform</h3>
            <p>Connecting service providers with customers across 12 countries</p>
            <ul>
              <li>Onboarded 10,000+ service providers in 6 months</li>
              <li>Reduced payment disputes by 40%</li>
              <li>Automated commission calculations and payouts</li>
              <li>Supports multiple currencies and payment methods</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mobile-section">
        <h2>Mobile Marketplace Experience</h2>
        <div className="mobile-showcase">
          <div className="mobile-device">
            <div className="mobile-screen">
              <div className="mobile-checkout-demo"></div>
            </div>
          </div>
          <div className="mobile-features">
            <h3>In-app Payments</h3>
            <p>Seamless checkout without leaving your app</p>
            <h3>Seller Dashboard</h3>
            <p>Mobile-optimized earnings tracking for sellers</p>
            <h3>Instant Notifications</h3>
            <p>Real-time updates on transactions and payouts</p>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default MarketplacesPage;