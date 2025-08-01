import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import { FinanceIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const TerminalPage = () => (
  <PageTemplate>
    <div className="page-container fade-in terminal-bg">
      <div className="icon-title-row">
        <FinanceIcon className="stripe-style-icon" />
        <h1 className="page-title">Terminal</h1>
      </div>

      <section className="product-hero">
        <div className="container">
          <p>Complete POS solutions for every business. Choose the right payment solution for your needs.</p>
          <div className="product-hero-buttons">
            <a href="#solutions" className="btn btn-primary">View Solutions</a>
            <a href="/contact" className="btn btn-outline">Contact Sales</a>
          </div>
        </div>
      </section>

      <section id="solutions" className="product-features">
        <div className="container">
          <h2>POS Solutions for Every Business</h2>
          <div className="feature-grid">
            {/* Traditional POS */}
            <div className="solution-card">
              <h3>Enterprise POS</h3>
              <p>Full-featured point of sale system for large businesses</p>
              <div className="solution-features">
                <ul>
                  <li>Sunny Terminal with receipt printer</li>
                  <li>Multi-terminal support</li>
                  <li>Advanced inventory management</li>
                  <li>Staff management & reporting</li>
                  <li>24/7 premium support</li>
                </ul>
              </div>
              <div className="solution-price">Starting at $299/terminal</div>
            </div>

            {/* Cloud POS */}
            <div className="solution-card">
              <h3>Cloud POS</h3>
              <p>Web-based point of sale for modern businesses</p>
              <div className="solution-features">
                <ul>
                  <li>Access from any device</li>
                  <li>Real-time sync across locations</li>
                  <li>Integrated e-commerce</li>
                  <li>Analytics dashboard</li>
                  <li>Automatic updates</li>
                </ul>
              </div>
              <div className="solution-price">Starting at $49/month</div>
            </div>

            {/* Mobile POS */}
            <div className="solution-card">
              <h3>Mobile POS</h3>
              <p>Accept payments anywhere with your smartphone</p>
              <div className="solution-features">
                <ul>
                  <li>Sunny Reader device</li>
                  <li>Mobile app included</li>
                  <li>Card & contactless payments</li>
                  <li>Digital receipts</li>
                  <li>Offline mode support</li>
                </ul>
              </div>
              <div className="solution-price">Starting at $49</div>
            </div>

            {/* SoftPOS */}
            <div className="solution-card">
              <h3>SoftPOS</h3>
              <p>Turn your phone into a payment terminal</p>
              <div className="solution-features">
                <ul>
                  <li>No hardware needed</li>
                  <li>NFC payments</li>
                  <li>QR code payments</li>
                  <li>Mobile money integration</li>
                  <li>Instant setup</li>
                </ul>
              </div>
              <div className="solution-price">Free app + 1.5% per transaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Enterprise-Grade Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Payment Methods</h3>
              <ul>
                <li>Cards (EMV, contactless)</li>
                <li>Mobile wallets</li>
                <li>QR payments</li>
                <li>Cryptocurrency</li>
                <li>Mobile money (M-Pesa, etc.)</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Security</h3>
              <ul>
                <li>PCI DSS compliant</li>
                <li>End-to-end encryption</li>
                <li>Fraud prevention</li>
                <li>Real-time monitoring</li>
                <li>Secure authentication</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Integration</h3>
              <ul>
                <li>Open APIs</li>
                <li>SDK support</li>
                <li>Accounting software sync</li>
                <li>E-commerce platforms</li>
                <li>Custom solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to transform your business?</h2>
          <p>Get started with Sunny POS today</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-light">Create Account</Link>
            <Link to="/contact" className="btn btn-outline-light">Contact Sales</Link>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default TerminalPage;