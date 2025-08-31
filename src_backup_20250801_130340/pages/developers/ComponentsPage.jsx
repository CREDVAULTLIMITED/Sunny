import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { CodeIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/ComponentsPage.css';

const ComponentsPage = () => {
  return (
    <PageTemplate>
      <div className="devpage-header-row">
        <span className="devpage-icon"><CodeIcon /></span>
        <h1 className="devpage-title">Prebuilt Components</h1>
      </div>
      <div className="devpage-hero">
        <p className="devpage-description">UI components and mobile SDKs for seamless payment experiences. All examples and docs are real and production-ready.</p>
        <a href="/docs/components" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
          View Component Docs
        </a>
      </div>
      <div className="devpage-content">
        <section>
          <h2>React Payment Element</h2>
          <pre className="code-block">
{`import { PaymentElement } from '@sunny/react-ui';

const CheckoutForm = () => (
  <form>
    <PaymentElement />
    <button type="submit">Pay Now</button>
  </form>
);`}
          </pre>
        </section>
        <section>
          <h2>Mobile SDKs</h2>
          <p>See our <a href="/docs/ios" target="_blank" rel="noopener noreferrer">iOS</a> and <a href="/docs/android" target="_blank" rel="noopener noreferrer">Android</a> docs for native integration.</p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default ComponentsPage;