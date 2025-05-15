import React from 'react';
import { Link } from 'react-router-dom';
import SunnyLogo from '../../assets/images/Sunny logo.svg';
import './Legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <img src={SunnyLogo} alt="Sunny Payments" height="60" />
        <h1>Privacy Policy</h1>
      </div>
      
      <div className="legal-content">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>This Privacy Policy describes how Sunny Payments ("we," "us," or "our") collects, uses, and shares information about you when you use our website, services, APIs, and applications (collectively, the "Services").</p>
        </section>
        
        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <ul>
            <li>Contact information (name, email, phone number, address)</li>
            <li>Business information (company name, tax ID)</li>
            <li>Financial information (bank account details, payment card information)</li>
            <li>Transaction data (payment amounts, dates, recipients)</li>
            <li>Authentication information (passwords, security questions)</li>
          </ul>
          
          <h3>2.2 Automatically Collected Information</h3>
          <ul>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>
        
        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process payments and transfers</li>
            <li>Provide and improve our Services</li>
            <li>Communicate with you about your account</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
            <li>Analyze usage patterns to enhance user experience</li>
          </ul>
        </section>
        
        <section>
          <h2>4. Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Payment processors and financial institutions to facilitate transactions</li>
            <li>Service providers who perform services on our behalf</li>
            <li>Legal authorities when required by law</li>
            <li>Other parties with your consent</li>
          </ul>
        </section>
        
        <section>
          <h2>5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>
        
        <section>
          <h2>6. Data Retention</h2>
          <p>We retain your information for as long as necessary to provide our Services and comply with legal obligations.</p>
        </section>
        
        <section>
          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have rights to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your information</li>
            <li>Object to certain processing activities</li>
            <li>Export your data</li>
          </ul>
        </section>
        
        <section>
          <h2>8. International Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your own, which may have different data protection laws.</p>
        </section>
        
        <section>
          <h2>9. Children's Privacy</h2>
          <p>Our Services are not intended for children under 18. We do not knowingly collect information from children.</p>
        </section>
        
        <section>
          <h2>10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify you of significant changes through our website or by email.</p>
        </section>
        
        <section>
          <h2>11. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <ul>
            <li>Email: privacy@sunnypayments.com</li>
            <li>Address: [Company Address]</li>
          </ul>
        </section>
      </div>
      
      <div className="legal-footer">
        <Link to="/" className="btn btn-outline">Back to Home</Link>
        <button className="btn btn-primary">I Agree</button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;