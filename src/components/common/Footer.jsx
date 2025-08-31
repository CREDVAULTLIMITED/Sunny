import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span>Sunny</span>
            </div>
            <p>Empowering businesses worldwide with seamless payment solutions</p>
          </div>
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Products</h4>
              <ul>
                <li><Link to="/products/payments">Payments</Link></li>
                <li><Link to="/products/checkout">Checkout</Link></li>
                <li><Link to="/products/billing">Billing</Link></li>
                <li><Link to="/products/invoicing">Invoicing</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4>Developers</h4>
              <ul>
                <li><Link to="/developers/docs">Documentation</Link></li>
                <li><Link to="/developers/api">API Reference</Link></li>
                <li><Link to="/developers/sdks">SDKs</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/support">Support</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/resources/blog">Blog</Link></li>
                <li><Link to="/ai" className="ai-link">AI</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} Sunny Payments</p>
            <div className="footer-legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;