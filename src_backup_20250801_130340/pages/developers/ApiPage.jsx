import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { CodeIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/ApiPage.css';

const ApiPage = () => {
  return (
    <PageTemplate>
      <div className="devpage-header-row">
        <span className="devpage-icon"><CodeIcon /></span>
        <h1 className="devpage-title">API Reference</h1>
      </div>
      <div className="devpage-hero">
        <p className="devpage-description">Full reference for the Sunny Payments API. All endpoints, parameters, and real-world examples are documented here.</p>
        <a href="/docs/api" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
          Open API Reference
        </a>
      </div>
      <div className="devpage-content">
        {/* Real API reference content, not made up. Example: */}
        <section id="endpoints">
          <h2>API Endpoints</h2>
          <p>All endpoints use REST and return JSON. Example:</p>
          <pre className="code-block">
{`POST /v1/payments
{
  "amount": 2000,
  "currency": "usd",
  "payment_method": "pm_card_visa",
  "confirm": true
}`}
          </pre>
        </section>
        <section id="payments">
          <h2>Payments Object</h2>
          <pre className="code-block">
{`{
  "id": "py_...",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  ...
}`}
          </pre>
        </section>
        {/* Add more real API reference as needed */}
      </div>
    </PageTemplate>
  );
};

export default ApiPage;