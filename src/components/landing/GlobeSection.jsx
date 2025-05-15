import React from 'react';
import UnifiedPaymentFabric from '../UnifiedPaymentFabric';
import './unified-payment-fabric.css';

const GlobeSection = () => {
  return (
    <section className="unified-payment-fabric-section">
      <div className="container">
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

export default GlobeSection;