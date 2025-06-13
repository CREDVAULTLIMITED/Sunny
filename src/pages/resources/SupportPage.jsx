import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { SupportIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/SupportPage.css';

const SupportPage = () => (
  <PageTemplate>
    <div className="page-container fade-in support-bg">
      <div className="icon-title-row">
        <SupportIcon className="stripe-style-icon" />
        <h1 className="page-title">Support</h1>
      </div>
      <section className="resources-hero">
        <div className="container">
          <p>Get help with your Sunny Payments integration</p>
        </div>
      </section>
      <section className="support-options">
        <div className="options-grid">
          <div className="option-card">
            <div className="option-icon"></div>
            <h3>Help Center</h3>
            <p>Browse our knowledge base for answers to common questions</p>
            <button onClick={() => window.location.href='/support/help-center'} className="btn btn-outline">Visit Help Center</button>
          </div>
          <div className="option-card">
            <div className="option-icon"></div>
            <h3>Developer Support</h3>
            <p>Technical assistance for API and integration issues</p>
            <button onClick={() => window.location.href='/support/developer'} className="btn btn-outline">Contact Developer Support</button>
          </div>
          <div className="option-card">
            <div className="option-icon"></div>
            <h3>Account Support</h3>
            <p>Help with your account, billing, and payments</p>
            <button onClick={() => window.location.href='/support/account'} className="btn btn-outline">Contact Account Support</button>
          </div>
          <div className="option-card">
            <div className="option-icon"></div>
            <h3>Community Forum</h3>
            <p>Connect with other developers and share solutions</p>
            <button onClick={() => window.location.href='/support/community'} className="btn btn-outline">Join Community</button>
          </div>
        </div>
      </section>
      
      <section className="contact-form-section">
        <h2>Contact Support</h2>
        <div className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your email address" />
          </div>
          <div className="form-group">
            <label>Account ID</label>
            <input type="text" placeholder="Your Sunny account ID" />
          </div>
          <div className="form-group">
            <label>Issue Type</label>
            <select>
              <option>Select an issue type</option>
              <option>API Integration</option>
              <option>Payment Processing</option>
              <option>Account Access</option>
              <option>Billing Question</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Please describe your issue in detail"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Support Request</button>
        </div>
      </section>
      
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>How do I get an API key?</h3>
            <p>You can generate API keys in your Sunny Dashboard under Developer Settings.</p>
          </div>
          <div className="faq-item">
            <h3>What are the support hours?</h3>
            <p>Our support team is available 24/7 for urgent issues. Standard support hours are Monday to Friday, 9am to 6pm EST.</p>
          </div>
          <div className="faq-item">
            <h3>How quickly will I receive a response?</h3>
            <p>For standard support, we aim to respond within 24 hours. Premium and enterprise customers receive priority support with faster response times.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a phone number for support?</h3>
            <p>Phone support is available for enterprise customers. Please contact your account manager for details.</p>
          </div>
        </div>
      </section>
      
      <section className="resources-section">
        <h2>Additional Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Documentation</h3>
            <p>Comprehensive guides and API reference</p>
            <a href="/developers/docs" className="resource-link">View Documentation</a>
          </div>
          <div className="resource-card">
            <h3>API Status</h3>
            <p>Check the current status of our API</p>
            <a href="/status" className="resource-link">View Status Page</a>
          </div>
          <div className="resource-card">
            <h3>Implementation Guides</h3>
            <p>Step-by-step tutorials for common use cases</p>
            <a href="/resources/guides" className="resource-link">View Guides</a>
          </div>
          <div className="resource-card">
            <h3>Release Notes</h3>
            <p>Latest updates and changes to our API</p>
            <a href="/developers/changelog" className="resource-link">View Changelog</a>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default SupportPage;