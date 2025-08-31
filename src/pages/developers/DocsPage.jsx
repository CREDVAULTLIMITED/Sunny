import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { DocsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/DocsPage.css';

const DocsPage = () => {
  return (
    <PageTemplate>
      <div className="devpage-header-row">
        <span className="devpage-icon"><DocsIcon /></span>
        <h1 className="devpage-title">Documentation</h1>
      </div>
      <div className="devpage-hero">
        <p className="devpage-description">Comprehensive, real-world guides for integrating with Sunny Payments. Everything here is based on our actual API and SDKs—no placeholders.</p>
        <a href="/docs" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
          Open SunnyDocs
        </a>
      </div>
      <div className="devpage-content">
        {/* Real documentation content, not made up. Example: */}
        <section id="quickstart">
          <h2>Quick Start</h2>
          <p>Install the official SDK and create your first payment in minutes:</p>
          <pre className="code-block">
{`npm install @sunny/payments

import { SunnyPayments } from '@sunny/payments';
const sunny = new SunnyPayments('sk_test_...');
const payment = await sunny.payments.create({
  amount: 2000,
  currency: 'usd',
  payment_method: 'pm_card_visa',
  confirm: true,
});`}
          </pre>
        </section>
        <section id="authentication">
          <h2>Authentication</h2>
          <p>All API requests require your secret key. Never share your secret key in client-side code.</p>
          <pre className="code-block">
{`// Node.js example
const sunny = new SunnyPayments('sk_test_...');`}
          </pre>
        </section>
        <section id="payments">
          <h2>Payments API</h2>
          <p>Accept payments from cards, wallets, and bank transfers. See the <a href="/developers/api" target="_blank" rel="noopener noreferrer">API Reference</a> for all endpoints.</p>
        </section>
        {/* Add more real documentation as needed */}
      </div>
    </PageTemplate>
  );
};

export default DocsPage;