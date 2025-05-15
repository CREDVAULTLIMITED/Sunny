import React from 'react';
import UnifiedPaymentFabric from '../UnifiedPaymentFabric';
import '../landing/unified-payment-fabric.css';

const UnifiedPaymentFabricSection = () => {
  return (
    <section className="unified-payment-fabric-section">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Global payments infrastructure for the internet</h1>
            <p className="hero-subtitle">Millions of businesses of all sizes use Sunny's software and APIs to accept payments, send payouts, and manage their businesses online.</p>
            
            <div className="hero-buttons">
              <a href="/dashboard" className="btn btn-primary">Try Dashboard Demo</a>
              <a href="/contact" className="btn btn-secondary">Contact Sales</a>
            </div>
          </div>
          <div className="payment-visual">
            <div className="credit-card">
              <div className="card-chip"></div>
              <div className="card-logo">
                <span className="logo-text">Sunny</span>
              </div>
              <div className="card-number">•••• •••• •••• 4242</div>
              <div className="card-holder">JOHN DOE</div>
              <div className="card-expiry">09/25</div>
            </div>
            <div className="payment-flow">
              <div className="flow-circle circle-1"></div>
              <div className="flow-line"></div>
              <div className="flow-circle circle-2"></div>
              <div className="flow-line"></div>
              <div className="flow-circle circle-3"></div>
            </div>
            <div className="currency-symbols">
              <div className="currency">$</div>
              <div className="currency">€</div>
              <div className="currency">£</div>
              <div className="currency">¥</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="section-text">
            <h2>Global Scale</h2>
            <p className="subtitle">The backbone for global commerce</p>
            
            <p className="description">
              Sunny makes moving money as easy and programmable as moving data. Our teams are based in offices around the world and we process hundreds of billions of dollars each year for ambitious businesses of all sizes.
            </p>
            
            <div className="stats-container">
              <div className="stat-item">
                <h3>500M+</h3>
                <p>API requests per day, peaking at 13,000 requests a second</p>
              </div>
              <div className="stat-item">
                <h3>99.999%</h3>
                <p>historical uptime for Sunny services</p>
              </div>
              
              <div className="additional-stats">
                <div className="stat-row">
                  <div className="stat">
                    <h4>195+</h4>
                    <p>Countries supported</p>
                  </div>
                  <div className="stat">
                    <h4>135+</h4>
                    <p>Currencies processed</p>
                  </div>
                  <div className="stat">
                    <h4>$10B+</h4>
                    <p>Transactions annually</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="visualization-container">
            <h3>Unified Payment Fabric</h3>
            <p>Our textile-inspired payment network weaves together global financial systems into a seamless experience</p>
            
            {/* The Unified Payment Fabric visualization */}
            <UnifiedPaymentFabric height="400px" />
            
            <div className="fabric-legend">
              <div className="legend-item">
                <span className="legend-color americas"></span>
                <span>Americas</span>
              </div>
              <div className="legend-item">
                <span className="legend-color europe"></span>
                <span>Europe</span>
              </div>
              <div className="legend-item">
                <span className="legend-color asia"></span>
                <span>Asia</span>
              </div>
              <div className="legend-item">
                <span className="legend-color africa"></span>
                <span>Africa</span>
              </div>
              <div className="legend-item">
                <span className="legend-color oceania"></span>
                <span>Oceania</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedPaymentFabricSection;