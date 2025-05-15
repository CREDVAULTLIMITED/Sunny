import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import Card from './Card.jsx';
import GlobalCoverageSection from './GlobalCoverageSection.jsx';
import '../styles/global-coverage.css';

/**
 * Landing page component for Sunny Payment Gateway
 */
const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/images/logo.svg" alt="Sunny Payments" />
              <span className="logo-text">Sunny</span>
            </div>
            <nav>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#developers">Developers</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </nav>
            <div className="header-buttons">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Global Payments Made <span>Simple</span></h1>
              <p>Accept payments from anywhere in the world with low fees, instant settlements, and enterprise-grade security.</p>
              <div className="hero-buttons">
                <Link to="/signup">
                  <Button variant="primary" size="large">Get Started</Button>
                </Link>
                <Link to="#demo">
                  <Button variant="outline" size="large">See Demo</Button>
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/hero-illustration.svg" alt="Sunny Payments Checkout" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Coverage Section with Unified Payment Fabric */}
      <GlobalCoverageSection />

      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Sunny</h2>
            <p>A comprehensive payment solution designed to meet all your business needs</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Get up and running with Sunny Payments in just a few simple steps</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="developer" id="developers">
        <div className="container">
          <div className="section-title">
            <h2>Built for Developers</h2>
            <p>Powerful APIs and SDKs that make integration a breeze</p>
          </div>
          <div className="developer-content">
            <div className="developer-text">
              <h3>Simple Integration</h3>
              <p>Our SDKs are designed to get you up and running quickly with minimal code. Integrate payments into your application in minutes, not days.</p>
              <p>With comprehensive documentation and examples, you'll have everything you need to create a seamless payment experience.</p>
              <Link to="/docs">
                <Button variant="primary">Read the Docs</Button>
              </Link>
            </div>
            <div className="developer-code">
              <pre>
                <code>
                  {`// Initialize Sunny with your API key
import { SunnyPayments } from '@sunny/payment-sdk';

const sunny = new SunnyPayments({
  apiKey: 'your_api_key',
  environment: 'sandbox'
});

// Process a payment
const paymentResult = await sunny.processPayment({
  amount: 1000,
  currency: 'USD',
  paymentMethod: 'card',
  card: {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2025,
    cvc: '123'
  }
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="cta" id="demo">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of businesses using Sunny Payment Gateway to process payments globally.</p>
          <Link to="/signup">
            <Button variant="secondary" size="large">Create Free Account</Button>
          </Link>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo">
                <img src="/images/logo-white.svg" alt="Sunny Payments" />
              </div>
              <p>A comprehensive, global payment processing solution designed to meet all modern payment needs with enterprise-grade security and scalability.</p>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Products</h4>
              <ul>
                <li><Link to="/payments">Payments</Link></li>
                <li><Link to="/subscriptions">Subscriptions</Link></li>
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li><Link to="/connect">Connect</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/api">API Reference</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/status">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Sunny Payment Gateway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const features = [
  {
    title: 'Global Coverage',
    description: 'Accept payments from any country in 135+ currencies with support for local payment methods.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    )
  },
  {
    title: 'Low Fees',
    description: 'Flat, low transaction fees with no hidden charges for currency conversion, settlement, or refunds.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
      </svg>
    )
  },
  {
    title: 'Instant Payouts',
    description: 'Funds settle immediately or within minutes to bank or mobile money accounts—even on weekends.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
      </svg>
    )
  },
  {
    title: 'Enterprise Security',
    description: 'PCI DSS Level 1 compliant with advanced fraud detection and end-to-end encryption.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
    )
  },
  {
    title: 'Developer Tools',
    description: 'Clean, powerful APIs and SDKs for easy integration into websites, mobile apps, and marketplaces.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    )
  },
  {
    title: 'Best-in-Class UX',
    description: 'Seamless checkout experience with localized languages and UI based on the customer\'s region.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    )
  }
];

// Steps data
const steps = [
  {
    title: 'Create Account',
    description: 'Sign up for a free Sunny account and complete verification'
  },
  {
    title: 'Integrate',
    description: 'Add our SDK to your website or mobile app with just a few lines of code'
  },
  {
    title: 'Accept Payments',
    description: 'Start accepting payments from customers around the world'
  },
  {
    title: 'Get Paid',
    description: 'Receive funds in your bank account instantly or on a schedule'
  }
];

export default LandingPage;