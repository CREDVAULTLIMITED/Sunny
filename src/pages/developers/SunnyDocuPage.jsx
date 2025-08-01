import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { DocsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/DocsPage.css';

const SunnyDocuPage = () => (
  <PageTemplate>
    <div className="page-container fade-in sunnydocu-bg">
      <div className="icon-title-row">
        <DocsIcon className="stripe-style-icon" />
        <h1 className="page-title">SunnyDocu: Developer Documentation</h1>
      </div>
      <section className="product-hero">
        <div className="container">
          <p>Comprehensive, actionable documentation for integrating and building with Sunny Payments.</p>
          <div className="product-hero-buttons">
            <a href="#quickstart" className="btn btn-primary">Get Started</a>
            <a href="#api" className="btn btn-outline">API Reference</a>
          </div>
        </div>
      </section>
      <section id="quickstart" className="sunnydocu-section">
        <div className="container">
          <h2>Quickstart</h2>
          <ol className="quickstart-list">
            <li>Sign up for a Sunny Payments account and get your API keys from the dashboard.</li>
            <li>Install the Sunny SDK for your language:
              <pre>npm install sunny-payments</pre>
            </li>
            <li>Initialize the SDK and make your first payment request:
              <pre>{`import Sunny from 'sunny-payments';
const sunny = new Sunny('YOUR_API_KEY');
const payment = await sunny.payments.create({
  amount: 1000,
  currency: 'usd',
  source: 'tok_visa',
  description: 'Test payment',
});`}</pre>
            </li>
            <li>Check the response and handle success or errors in your app.</li>
          </ol>
        </div>
      </section>
      <section id="api" className="sunnydocu-section">
        <div className="container">
          <h2>API Reference</h2>
          <ul className="api-list">
            <li><a href="/developers/api">REST API Overview</a></li>
            <li><a href="/developers/api-reference">Endpoints & Parameters</a></li>
            <li><a href="/developers/sdks">SDKs & Libraries</a></li>
            <li><a href="/developers/components">UI Components</a></li>
            <li><a href="/developers/docs#webhooks">Webhooks</a></li>
          </ul>
        </div>
      </section>
      <section className="sunnydocu-section">
        <div className="container">
          <h2>Best Practices</h2>
          <ul>
            <li>Use test mode and test cards before going live.</li>
            <li>Secure your API keys and never expose them in client-side code.</li>
            <li>Implement webhooks for real-time payment updates.</li>
            <li>Follow PCI DSS guidelines for handling payment data.</li>
            <li>Monitor your dashboard for failed payments and disputes.</li>
          </ul>
        </div>
      </section>
      <section className="sunnydocu-section">
        <div className="container">
          <h2>Support & Resources</h2>
          <ul>
            <li><a href="/resources/guides">Integration Guides</a></li>
            <li><a href="/resources/support">Developer Support</a></li>
            <li><a href="/resources/blog">Engineering Blog</a></li>
            <li><a href="/resources/customers">Customer Stories</a></li>
          </ul>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default SunnyDocuPage;
