import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { DocsIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/GuidesPage.css';

const GuidesPage = () => (
  <PageTemplate>
    <div className="page-container fade-in guides-bg">
      <div className="icon-title-row">
        <DocsIcon className="stripe-style-icon" />
        <h1 className="page-title">Implementation Guides</h1>
      </div>
      <section className="resources-hero">
        <div className="container">
          <p>Step-by-step tutorials and best practices for integrating Sunny Payments</p>
        </div>
      </section>
      
      <section className="guides-categories">
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon"></div>
            <h3>Getting Started</h3>
            <p>Basic setup and first integration</p>
            <button onClick={() => window.location.href='/guides/getting-started'} className="btn btn-outline">View Guides</button>
          </div>
          <div className="category-card">
            <div className="category-icon"></div>
            <h3>Payment Methods</h3>
            <p>Implementing different payment options</p>
            <button onClick={() => window.location.href='/guides/payment-methods'} className="btn btn-outline">View Guides</button>
          </div>
          <div className="category-card">
            <div className="category-icon"></div>
            <h3>Subscriptions</h3>
            <p>Setting up recurring billing</p>
            <button onClick={() => window.location.href='/guides/subscriptions'} className="btn btn-outline">View Guides</button>
          </div>
          <div className="category-card">
            <div className="category-icon"></div>
            <h3>Security</h3>
            <p>Best practices for secure payments</p>
            <button onClick={() => window.location.href='/guides/security'} className="btn btn-outline">View Guides</button>
          </div>
        </div>
      </section>
      
      <section className="featured-guides">
        <h2>Featured Guides</h2>
        <div className="guides-list">
          <div className="guide-item">
            <div className="guide-content">
              <span className="guide-category">Getting Started</span>
              <h3>Accept Your First Payment</h3>
              <p>Learn how to integrate Sunny Payments and process your first transaction in under 10 minutes.</p>
              <div className="guide-meta">
                <span className="reading-time">10 min read</span>
                <span className="difficulty">Beginner</span>
              </div>
              <button onClick={() => window.location.href='/guides/getting-started/first-payment'} className="btn btn-outline">Read Guide</button>
            </div>
            <div className="guide-image"></div>
          </div>
          
          <div className="guide-item">
            <div className="guide-content">
              <span className="guide-category">Subscriptions</span>
              <h3>Building a SaaS Billing System</h3>
              <p>A comprehensive guide to implementing subscription billing for your SaaS product.</p>
              <div className="guide-meta">
                <span className="reading-time">25 min read</span>
                <span className="difficulty">Intermediate</span>
              </div>
              <button onClick={() => window.location.href='/guides/subscriptions/saas-billing'} className="btn btn-outline">Read Guide</button>
            </div>
            <div className="guide-image"></div>
          </div>
          
          <div className="guide-item">
            <div className="guide-content">
              <span className="guide-category">Security</span>
              <h3>Preventing Payment Fraud</h3>
              <p>Learn how to use Sunny's fraud prevention tools to protect your business.</p>
              <div className="guide-meta">
                <span className="reading-time">15 min read</span>
                <span className="difficulty">Advanced</span>
              </div>
              <button onClick={() => window.location.href='/guides/security/fraud-prevention'} className="btn btn-outline">Read Guide</button>
            </div>
            <div className="guide-image"></div>
          </div>
        </div>
      </section>
      
      <section className="best-practices">
        <h2>Best Practices</h2>
        <div className="practices-grid">
          <div className="practice-card">
            <h3>Optimize Checkout Flow</h3>
            <ul>
              <li>Minimize form fields</li>
              <li>Use address autocomplete</li>
              <li>Save payment methods for returning customers</li>
              <li>Implement mobile-friendly design</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h3>Improve Security</h3>
            <ul>
              <li>Use Sunny.js to avoid handling card data</li>
              <li>Implement 3D Secure for high-risk transactions</li>
              <li>Monitor transactions for suspicious activity</li>
              <li>Keep your API keys secure</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h3>Reduce Payment Failures</h3>
            <ul>
              <li>Implement smart retries for failed payments</li>
              <li>Use card updater services</li>
              <li>Send pre-dunning emails before charging</li>
              <li>Provide clear error messages</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h3>Global Expansion</h3>
            <ul>
              <li>Support local payment methods</li>
              <li>Display prices in local currencies</li>
              <li>Adapt checkout for regional preferences</li>
              <li>Comply with local regulations</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="troubleshooting">
        <h2>Troubleshooting</h2>
        <div className="troubleshooting-list">
          <div className="troubleshooting-item">
            <h3>Common Payment Errors</h3>
            <div className="error-table">
              <table>
                <thead>
                  <tr>
                    <th>Error Code</th>
                    <th>Description</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>card_declined</td>
                    <td>The card was declined</td>
                    <td>Ask customer to try another payment method</td>
                  </tr>
                  <tr>
                    <td>insufficient_funds</td>
                    <td>The card has insufficient funds</td>
                    <td>Suggest another payment method or smaller payment</td>
                  </tr>
                  <tr>
                    <td>expired_card</td>
                    <td>The card has expired</td>
                    <td>Ask customer to update card information</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default GuidesPage;