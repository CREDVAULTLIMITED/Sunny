import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import { PaymentsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/products.css';

const PaymentsPage = () => {
  const navigate = useNavigate();
  return (
    <PageTemplate>
      <div className="page-container fade-in payments-bg">
        <div className="icon-title-row">
          <PaymentsIcon className="stripe-style-icon" />
          <h1 className="page-title">Payments</h1>
        </div>

        <section className="product-hero">
          <div className="container">
            <p>Unified, global payments to grow your revenue. Accept payments online and in-person with a seamless integration that scales with your business across 150+ countries.</p>
            <div className="product-hero-buttons">
              <a href="/signup" className="btn btn-primary">Start accepting payments</a>
              <a href="#features" className="btn btn-outline">Explore Features</a>
            </div>
          </div>
        </section>

        <section id="features" className="product-features">
          <div className="container">
            <h2>Convert more customers</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </div>
                <h3>Smart Authentication</h3>
                <p>Dynamically apply 3D Secure when needed to balance security and conversion.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3>Customer Recognition</h3>
                <p>Identify returning customers for a faster checkout experience.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                </div>
                <h3>Saved Payment Methods</h3>
                <p>Allow customers to save their payment details for future purchases.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="alternating-section">
          <div className="container">
            <div className="alternating-content">
              <h2>Global reach, local experience</h2>
              <p>Expand your business globally with support for 135+ currencies and all major payment methods.</p>
              <ul>
                <li>Accept credit and debit cards from around the world</li>
                <li>Support for local payment methods like iDEAL, Sofort, and Alipay</li>
                <li>Automatic currency conversion</li>
                <li>Localized checkout experiences</li>
              </ul>
              <button onClick={() => navigate('/products/global-payments')} className="btn btn-primary">Learn more about global payments</button>
            </div>
            <div className="alternating-image">
              <img src="https://via.placeholder.com/500x300" alt="Global payments map" />
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="container">
            <h2>Trusted by businesses worldwide</h2>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-value">11.9%</div><div className="stat-label">Average increase in revenue</div></div>
              <div className="stat-card"><div className="stat-value">150+</div><div className="stat-label">Countries supported</div></div>
              <div className="stat-card"><div className="stat-value">99.99%</div><div className="stat-label">Uptime</div></div>
              <div className="stat-card"><div className="stat-value">24/7</div><div className="stat-label">Support</div></div>
            </div>
          </div>
        </section>

        <section className="code-section">
          <div className="container">
            <h2>Integration made simple</h2>
            <p>Just a few lines of code to start accepting payments.</p>
            <div className="code-container">
              <div className="code-header">
                <div className="code-dots"><span></span><span></span><span></span></div>
                <span className="code-label">Integration Example</span>
              </div>
              <pre className="code-content"><code>{`// Import the Sunny Payments library\nimport { SunnyPayments } from '@sunny/payments';\n// Initialize with your API key\nconst sunny = new SunnyPayments('sk_test_...');\n// Create a payment\nasync function createPayment() {\n  try {\n    const payment = await sunny.payments.create({\n      amount: 2000,\n      currency: 'usd',\n      payment_method: 'card',\n      confirm: true,\n    });\n    console.log(payment.id);\n    return payment;\n  } catch (error) {\n    console.error('Error creating payment:', error);\n  }\n}`}</code></pre>
            </div>
          </div>
        </section>

        <section className="partners-section">
          <div className="container">
            <h2>Accept all major payment methods</h2>
            <p>Give your customers the flexibility to pay how they want.</p>
            <div className="partners-grid">
              <img src="/assets/logos/visa.svg" alt="Visa" className="partner-logo" />
              <img src="/assets/logos/mastercard.svg" alt="Mastercard" className="partner-logo" />
              <img src="/assets/logos/amex.svg" alt="American Express" className="partner-logo" />
              <img src="/assets/logos/paypal.svg" alt="PayPal" className="partner-logo" />
              <img src="/assets/logos/apple-pay.svg" alt="Apple Pay" className="partner-logo" />
              <img src="/assets/logos/google-pay.svg" alt="Google Pay" className="partner-logo" />
            </div>
          </div>
        </section>

        <section className="cloud-scale-section">
          <div className="container">
            <h2>Built to scale with your business</h2>
            <p>Our cloud infrastructure handles payments at any scale, from startups to enterprises.</p>
            <div className="cloud-features">
              <div className="cloud-feature">
                <div className="cloud-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3>Handles peak traffic</h3>
                <p>Our infrastructure automatically scales to handle traffic spikes during sales and promotions.</p>
              </div>
              <div className="cloud-feature">
                <div className="cloud-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                </div>
                <h3>Global infrastructure</h3>
                <p>Distributed data centers ensure fast processing times for customers anywhere in the world.</p>
              </div>
              <div className="cloud-feature">
                <div className="cloud-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3>Enterprise-grade security</h3>
                <p>PCI Level 1 compliant with end-to-end encryption and advanced fraud protection.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to get started?</h2>
            <p>Join thousands of businesses already using Sunny Payments.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-light">Create account</Link>
              <Link to="/demo" className="btn btn-outline-light">Contact sales</Link>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PaymentsPage;