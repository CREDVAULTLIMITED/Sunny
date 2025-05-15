import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import SunnyLogo from '../../assets/images/Sunny logo.svg';
import { clearAuth } from '../auth/AuthUtils';

const HomePage = () => {
  // Clear authentication when visiting homepage
  useEffect(() => {
    clearAuth();
  }, []);
  
  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="container">
          <nav className="main-nav">
            <div className="logo">
              <img src={SunnyLogo} alt="Sunny Payments" />
              <span>Sunny</span>
            </div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#solutions">Solutions</a>
              <a href="#pricing">Pricing</a>
              <a href="#developers">Developers</a>
            </div>
            <div className="nav-buttons">
              <a href="/login" className="btn btn-text">Log in</a>
              <a href="/signup" className="btn btn-primary">Sign up</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Modern payment solutions for the digital economy</h1>
              <p>Streamline your payment processes with our secure, reliable, and easy-to-integrate payment platform.</p>
              <div className="hero-actions">
                <a href="/signup" className="btn btn-primary btn-large">Get started</a>
                <a href="#demo" className="btn btn-outline btn-large">See demo</a>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">99.99%</span>
                  <span className="stat-label">Uptime</span>
                </div>
                <div className="stat">
                  <span className="stat-value">150+</span>
                  <span className="stat-label">Countries</span>
                </div>
                <div className="stat">
                  <span className="stat-value">10M+</span>
                  <span className="stat-label">Transactions</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="payment-cards">
                <div className="payment-card">
                  <div className="card-header">
                    <div className="card-logo"></div>
                    <div className="card-chip"></div>
                  </div>
                  <div className="card-number">•••• •••• •••• 4242</div>
                  <div className="card-footer">
                    <div className="card-name">J. SMITH</div>
                    <div className="card-expiry">05/25</div>
                  </div>
                </div>
                <div className="payment-card card-alt">
                  <div className="card-header">
                    <div className="card-logo"></div>
                    <div className="card-chip"></div>
                  </div>
                  <div className="card-number">•••• •••• •••• 8888</div>
                  <div className="card-footer">
                    <div className="card-name">A. JOHNSON</div>
                    <div className="card-expiry">12/24</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to accept payments worldwide</h2>
            <p>A complete payments platform engineered for growth and scale</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <h3>Global Payments</h3>
              <p>Accept payments in 135+ currencies with local payment methods and optimized checkout flows.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3>Advanced Security</h3>
              <p>Enterprise-grade security with PCI compliance, fraud prevention, and data encryption.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V9h2v8zm4 0h-2v-6h2v6zm-8 0H6v-4h2v4z"/>
                </svg>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Comprehensive dashboard with insights, transaction monitoring, and financial reporting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>
              <h3>Developer-First API</h3>
              <p>Flexible, well-documented APIs with SDKs for all major platforms and languages.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions" id="solutions">
        <div className="container">
          <div className="section-header">
            <h2>Solutions for every business</h2>
            <p>Whether you're a startup or enterprise, we have the right solution for you</p>
          </div>
          <div className="solutions-grid">
            <div className="solution-card">
              <h3>E-commerce</h3>
              <p>Optimize your online checkout experience with our seamless payment integration.</p>
              <a href="#ecommerce" className="learn-more">Learn more</a>
            </div>
            <div className="solution-card">
              <h3>SaaS & Subscriptions</h3>
              <p>Manage recurring billing and reduce churn with our subscription management tools.</p>
              <a href="#saas" className="learn-more">Learn more</a>
            </div>
            <div className="solution-card">
              <h3>Marketplaces</h3>
              <p>Split payments, manage multiple sellers, and handle complex payment flows.</p>
              <a href="#marketplaces" className="learn-more">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="testimonial-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Sunny Payments has transformed how we handle transactions. Their platform is intuitive, reliable, and the support team is exceptional."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>CTO, TechStart Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Join thousands of businesses using Sunny Payments to power their payment infrastructure.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">Create account</Link>
              <a href="#contact" className="btn btn-outline btn-large">Contact sales</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <img src={SunnyLogo} alt="Sunny Payments" />
                <span>Sunny</span>
              </div>
              <p>Modern payment infrastructure for businesses of all sizes.</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Product</h4>
                <ul>
                  <li><a href="#payments">Payments</a></li>
                  <li><a href="#billing">Billing</a></li>
                  <li><a href="#connect">Connect</a></li>
                  <li><a href="#terminal">Terminal</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#customers">Customers</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#blog">Blog</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#docs">Documentation</a></li>
                  <li><a href="#support">Support</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <p>© {new Date().getFullYear()} Sunny Payments. All rights reserved.</p>
              <div className="footer-legal-links">
                <Link to="/terms" style={{color: "#94a3b8", marginRight: "20px", fontSize: "14px"}}>Terms of Service</Link>
                <Link to="/privacy" style={{color: "#94a3b8", fontSize: "14px"}}>Privacy Policy</Link>
              </div>
            </div>
            <div className="footer-social">
              <a href="#twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="#github" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;