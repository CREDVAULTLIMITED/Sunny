import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/common/PageTemplate';
import './AILandingPage.css';

const AILandingPage = () => {
  return (
    <PageTemplate
      title="AI-Powered Innovation"
      description="Discover how Sunny leverages cutting-edge artificial intelligence to revolutionize payment processing and financial services."
    >
      <div className="ai-landing">
        {/* Hero Section */}
        <section className="ai-hero">
          <div className="container">
            <div className="ai-hero-content">
              <div className="ai-hero-text">
                <h1>The Future of <span className="gradient-text">AI-Powered</span> Payments</h1>
                <p className="ai-hero-description">
                  At Sunny, we're not just processing payments—we're reimagining the entire financial ecosystem 
                  through the power of artificial intelligence. Our commitment to innovation drives us to create 
                  smarter, faster, and more secure payment solutions.
                </p>
                <div className="ai-features-preview">
                  <div className="feature-badge">
                    <div className="badge-icon">🤖</div>
                    <span>Intelligent Fraud Detection</span>
                  </div>
                  <div className="feature-badge">
                    <div className="badge-icon">⚡</div>
                    <span>Real-time Processing</span>
                  </div>
                  <div className="feature-badge">
                    <div className="badge-icon">🧠</div>
                    <span>Predictive Analytics</span>
                  </div>
                </div>
              </div>
              <div className="ai-hero-visual">
                <div className="ai-brain-animation">
                  <div className="brain-node node-1"></div>
                  <div className="brain-node node-2"></div>
                  <div className="brain-node node-3"></div>
                  <div className="brain-connection conn-1"></div>
                  <div className="brain-connection conn-2"></div>
                  <div className="brain-connection conn-3"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Commitment */}
        <section className="innovation-commitment">
          <div className="container">
            <div className="section-header">
              <h2>Our Commitment to AI Innovation</h2>
              <p>Pioneering the next generation of intelligent financial technology</p>
            </div>
            <div className="commitment-grid">
              <div className="commitment-card">
                <div className="card-icon">🔬</div>
                <h3>Research & Development</h3>
                <p>
                  Our dedicated AI research team continuously explores cutting-edge machine learning 
                  techniques to enhance payment security, reduce processing times, and improve user experiences.
                </p>
              </div>
              <div className="commitment-card">
                <div className="card-icon">🛡️</div>
                <h3>Privacy-First Approach</h3>
                <p>
                  We implement privacy-preserving AI technologies that protect sensitive financial data 
                  while delivering personalized and intelligent payment solutions.
                </p>
              </div>
              <div className="commitment-card">
                <div className="card-icon">🌍</div>
                <h3>Global Impact</h3>
                <p>
                  Our AI innovations are designed to democratize financial services worldwide, 
                  breaking down barriers and creating opportunities in emerging markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Applications */}
        <section className="ai-applications">
          <div className="container">
            <div className="section-header">
              <h2>AI in Action</h2>
              <p>See how artificial intelligence powers every aspect of our platform</p>
            </div>
            <div className="applications-grid">
              <div className="application-item">
                <div className="app-visual">
                  <div className="pulse-indicator"></div>
                </div>
                <div className="app-content">
                  <h3>Fraud Detection</h3>
                  <p>AI models analyze transaction patterns in real-time to identify and prevent fraudulent activities before they impact your business.</p>
                </div>
              </div>
              <div className="application-item">
                <div className="app-visual">
                  <div className="data-flow"></div>
                </div>
                <div className="app-content">
                  <h3>Smart Routing</h3>
                  <p>Intelligent payment routing optimizes transaction success rates by automatically selecting the best payment processors and methods.</p>
                </div>
              </div>
              <div className="application-item">
                <div className="app-visual">
                  <div className="prediction-chart"></div>
                </div>
                <div className="app-content">
                  <h3>Predictive Analytics</h3>
                  <p>Machine learning algorithms provide insights into customer behavior, helping you optimize pricing and improve conversion rates.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Helios */}
        <section className="meet-helios">
          <div className="container">
            <div className="helios-intro">
              <div className="helios-avatar">
                <div className="avatar-glow"></div>
                <div className="avatar-core">H</div>
              </div>
              <div className="helios-content">
                <h2>Meet Helios</h2>
                <p className="helios-tagline">Your AI-powered financial assistant</p>
                <p className="helios-description">
                  Helios is our advanced AI assistant, designed to help businesses navigate the complexities 
                  of modern payment processing. From code generation to payment optimization, Helios combines 
                  the power of large language models with deep domain expertise in financial technology.
                </p>
                <div className="helios-capabilities">
                  <div className="capability">
                    <span className="capability-icon">💻</span>
                    <span>Code Generation & Development Support</span>
                  </div>
                  <div className="capability">
                    <span className="capability-icon">📊</span>
                    <span>Payment Analytics & Insights</span>
                  </div>
                  <div className="capability">
                    <span className="capability-icon">🔍</span>
                    <span>Real-time Information & Research</span>
                  </div>
                  <div className="capability">
                    <span className="capability-icon">⚙️</span>
                    <span>Integration & Technical Assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="ai-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Experience the Future?</h2>
              <p>Join thousands of businesses already leveraging AI-powered payment solutions</p>
              <div className="cta-buttons">
                <Link to="/ai/chat" className="btn btn-primary btn-large">
                  Try Helios
                  <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/contact" className="btn btn-outline btn-large">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Innovation Statement */}
        <section className="innovation-footer">
          <div className="container">
            <div className="innovation-statement">
              <p>
                "At Sunny, we believe that artificial intelligence isn't just a tool—it's the foundation 
                of financial innovation. Every line of code, every algorithm, and every model we build 
                is designed to create a more inclusive, efficient, and secure financial future for everyone."
              </p>
              <div className="statement-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Samuel Mbugua</h4>
                  <p>Founder & ML Engineer, Sunny</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default AILandingPage;

