import React from 'react';
import '../../styles/pages/dashboard-components.css';

const DashboardAcceptPayments = () => {
  // This page is for onboarding, integration guides, and gateway status
  return (
    <div className="dashboard-accept-payments">
      <div className="page-header">
        <h1>Accept Payments</h1>
      </div>
      <div className="accept-payments-content">
        <section className="integration-guides">
          <h2>Integration Guides</h2>
          <ul>
            <li><a href="/dashboard/developers">API Keys &amp; SDKs</a></li>
            <li><a href="/dashboard/developers">API Documentation</a></li>
            <li><a href="/dashboard/developers">Webhooks Setup</a></li>
          </ul>
        </section>
        <section className="onboarding-checklist">
          <h2>Onboarding Checklist</h2>
          <ol>
            <li>Get your API keys</li>
            <li>Integrate the Sunny SDK</li>
            <li>Test your first payment</li>
            <li>Go live!</li>
          </ol>
        </section>
        <section className="test-gateway-shell">
          <h2>Test Gateway Shell</h2>
          <div className="shell-placeholder">[Developer payment gateway shell goes here]</div>
        </section>
        <section className="gateway-status">
          <h2>Gateway Status</h2>
          <div className="status-indicator status-live">Live</div>
        </section>
      </div>
    </div>
  );
};

export default DashboardAcceptPayments;
