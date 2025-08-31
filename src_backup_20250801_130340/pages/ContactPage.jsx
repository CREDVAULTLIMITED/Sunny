import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import '../styles/pages/contact.css';

const ContactPage = () => {
  return (
    <PageTemplate 
      title="Contact Sales" 
      description="Get in touch with our team to learn how Sunny Payments can help your business"
    >
      <section className="contact-form-section">
        <div className="contact-container">
          <div className="contact-form-card">
            <h2>Tell us about your business</h2>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Your first name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Your last name" />
                </div>
              </div>
              <div className="form-group">
                <label>Work Email</label>
                <input type="email" placeholder="your@company.com" />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Your company name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Size</label>
                  <select>
                    <option>Select company size</option>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select>
                    <option>Select country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>How can we help?</label>
                <textarea placeholder="Tell us about your payment needs and how we can help"></textarea>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" />
                  <span>I agree to receive communications from Sunny Payments</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Contact Sales</button>
            </form>
          </div>
          <div className="contact-info">
            <div className="info-card">
              <h3>Sales Inquiries</h3>
              <p>Our sales team is ready to help you find the right payment solution for your business.</p>
              <div className="contact-method">
                <div className="contact-icon email-icon"></div>
                <span>sales@sunnypayments.com</span>
              </div>
              <div className="contact-method">
                <div className="contact-icon phone-icon"></div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="info-card">
              <h3>Support</h3>
              <p>Need help with your existing account? Our support team is available 24/7.</p>
              <a href="/support" className="btn btn-outline">Visit Support Center</a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="offices-section">
        <h2>Our Global Offices</h2>
        <div className="offices-grid">
          <div className="office-card">
            <h3>San Francisco</h3>
            <p>123 Market Street<br />San Francisco, CA 94105<br />United States</p>
          </div>
          <div className="office-card">
            <h3>London</h3>
            <p>456 Oxford Street<br />London, W1C 1AB<br />United Kingdom</p>
          </div>
          <div className="office-card">
            <h3>Singapore</h3>
            <p>789 Marina Bay<br />Singapore, 018956<br />Singapore</p>
          </div>
          <div className="office-card">
            <h3>Sydney</h3>
            <p>101 George Street<br />Sydney, NSW 2000<br />Australia</p>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default ContactPage;