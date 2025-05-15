import React from 'react';
import ArtisticGlobalScale from './ArtisticGlobalScale';

const GlobalScale = () => {
  return (
    <section className="global-scale-section">
      <div className="container">
        <h2>Global Scale</h2>
        <p className="subtitle">Connecting businesses across borders with seamless payment processing</p>
        
        <div className="visualization-container">
          <ArtisticGlobalScale />
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">195+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">135+</div>
            <div className="stat-label">Currencies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$10B+</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .global-scale-section {
          padding: 60px 0;
          background: linear-gradient(180deg, #0a0a0f 0%, #141429 100%);
          color: white;
          text-align: center;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        h2 {
          font-size: 3rem;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #6772e5, #24b47e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 40px;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .visualization-container {
          margin-bottom: 40px;
        }
        
        .stats-container {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 20px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }
        
        @media (max-width: 768px) {
          h2 {
            font-size: 2rem;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default GlobalScale;