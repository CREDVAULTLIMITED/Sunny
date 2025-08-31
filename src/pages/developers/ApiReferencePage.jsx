import React, { useState } from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { DocsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/ApiReferencePage.css';

const ApiReferencePage = () => {
  const [activeSection, setActiveSection] = useState('payments');
  const [activeLang, setActiveLang] = useState('curl');

  const sampleCode = {
    curl: `curl https://api.sunny.com/v1/payments \\
  -X POST \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -d amount=2000 \\
  -d currency="USD" \\
  -d payment_method="card" \\
  -d confirm=true`,
    node: `const payment = await sunny.payments.create({
  amount: 2000,
  currency: 'USD',
  payment_method: 'card',
  confirm: true
});`,
    python: `payment = sunny.payments.create(
  amount=2000,
  currency='USD',
  payment_method='card',
  confirm=True
)`
  };

  return (
    <PageTemplate>
      <div className="devpage-header-row">
        <span className="devpage-icon"><DocsIcon /></span>
        <h1 className="devpage-title">API Reference</h1>
      </div>
      <div className="devpage-hero">
        <p className="devpage-description">Complete, real-world reference for the Sunny Payments API. All endpoints, parameters, and examples are based on our production API.</p>
        <a href="/docs/api" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
          Open API Reference
        </a>
      </div>
      <div className="devpage-content">
        {/* Example: show a real endpoint and code sample */}
        <section>
          <h2>POST /v1/payments</h2>
          <pre className="code-block">
{`curl https://api.sunny.com/v1/payments \
  -X POST \
  -H "Authorization: Bearer YOUR_SECRET_KEY" \
  -d amount=2000 \
  -d currency="USD" \
  -d payment_method="card" \
  -d confirm=true`}
          </pre>
        </section>
        <section>
          <h2>Response Example</h2>
          <pre className="code-block">
{`{
  "id": "py_1234567890",
  "object": "payment",
  "amount": 2000,
  "currency": "USD",
  "status": "succeeded",
  "payment_method": "card",
  "created": 1709913600
}`}
          </pre>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ApiReferencePage;
