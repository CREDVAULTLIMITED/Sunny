import React from 'react';
import UnifiedPaymentFabric from './UnifiedPaymentFabric.jsx';

/**
 * Enhanced Global Coverage Section with Unified Payment Fabric visualization
 * This component combines the text content with the textile-inspired payment visualization
 */
const GlobalCoverageSection = () => {
  return (
    <section className="global-coverage" id="global-coverage">
      <div className="container">
        <div className="section-title">
          <h2>Global Scale</h2>
          <p>The backbone for global commerce</p>
        </div>
        
        <div className="global-scale-description">
          <p>
            Sunny makes moving money as easy and programmable as moving data. Our teams are based in offices around the world and we process hundreds of billions of dollars each year for ambitious businesses of all sizes.
          </p>
        </div>
        
        <div className="global-coverage-content">
          {/* Left side: Key stats */}
          <div className="global-stats">
            <div className="stat-item">
              <span className="stat-number">500M+</span>
              <span className="stat-label">API requests per day, peaking at 13,000 requests a second</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.999%</span>
              <span className="stat-label">historical uptime for Sunny services</span>
            </div>
            <div className="additional-stats">
              <div className="stat-row">
                <div className="stat-item">
                  <span className="stat-number">190+</span>
                  <span className="stat-label">Countries</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">135+</span>
                  <span className="stat-label">Currencies</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">300+</span>
                  <span className="stat-label">Payment Methods</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Unified Payment Fabric visualization */}
          <div className="payment-fabric-container">
            <h3>Unified Payment Fabric</h3>
            <p>Our textile-inspired payment network weaves together global financial systems into a seamless experience</p>
            
            {/* The actual visualization component */}
            <UnifiedPaymentFabric height="400px" />
            
            <div className="fabric-legend">
              <div className="legend-item">
                <span className="legend-color legend-americas"></span>
                <span className="legend-label">Americas</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-europe"></span>
                <span className="legend-label">Europe</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-asia"></span>
                <span className="legend-label">Asia</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-africa"></span>
                <span className="legend-label">Africa</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-oceania"></span>
                <span className="legend-label">Oceania</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCoverageSection;