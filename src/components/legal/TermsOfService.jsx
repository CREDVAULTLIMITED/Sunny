import React from 'react';
import { Link } from 'react-router-dom';
import SunnyLogo from '../../assets/images/Sunny logo.svg.js';
import './Legal.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <img src={SunnyLogo} alt="Sunny Payments" height="60" />
        <h1>Terms of Service</h1>
      </div>
      
      <div className="legal-content">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to Sunny Payments. These Terms of Service ("Terms") govern your use of our website, services, APIs, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.</p>
        </section>
        
        <section>
          <h2>2. Definitions</h2>
          <ul>
            <li>"Sunny Payments," "we," "us," or "our" refers to Sunny Payments Inc.</li>
            <li>"User," "you," or "your" refers to individuals or entities using our Services.</li>
            <li>"Merchant" refers to businesses accepting payments through our platform.</li>
            <li>"Customer" refers to individuals making payments to Merchants.</li>
          </ul>
        </section>
        
        <section>
          <h2>3. Account Registration</h2>
          <p>To use our Services, you must register for an account. You agree to provide accurate information and keep it updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
        </section>
        
        <section>
          <h2>4. Payment Processing</h2>
          <h3>4.1 Services Overview</h3>
          <p>We provide payment processing services that enable Merchants to accept payments from Customers.</p>
          
          <h3>4.2 Fees</h3>
          <p>Merchants agree to pay the fees outlined in their agreement with Sunny Payments. Fees may include transaction fees, monthly fees, and other charges as specified.</p>
          
          <h3>4.3 Payouts</h3>
          <p>Funds will be transferred to Merchants according to the payout schedule agreed upon during registration.</p>
        </section>
        
        <section>
          <h2>5. Acceptable Use</h2>
          <p>You agree not to use our Services for:</p>
          <ul>
            <li>Illegal activities</li>
            <li>Fraudulent transactions</li>
            <li>Sale of prohibited items</li>
            <li>Intellectual property infringement</li>
            <li>Harassment or abuse</li>
            <li>Any activity that may damage our reputation or systems</li>
          </ul>
        </section>
        
        <section>
          <h2>6. Security</h2>
          <p>You agree to implement reasonable security measures to protect payment data and comply with our security requirements and applicable payment card industry standards.</p>
        </section>
        
        <section>
          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Sunny Payments shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
        </section>
        
        <section>
          <h2>8. Term and Termination</h2>
          <p>We reserve the right to suspend or terminate your access to our Services for any violation of these Terms or for any other reason at our discretion.</p>
        </section>
        
        <section>
          <h2>9. Changes to Terms</h2>
          <p>We may modify these Terms at any time. Continued use of our Services after changes constitutes acceptance of the modified Terms.</p>
        </section>
        
        <section>
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
        </section>
      </div>
      
      <div className="legal-footer">
        <Link to="/" className="btn btn-outline">Back to Home</Link>
        <button className="btn btn-primary">I Agree</button>
      </div>
    </div>
  );
};

export default TermsOfService;