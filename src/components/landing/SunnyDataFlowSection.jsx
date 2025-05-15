import React from 'react';
import SunnyDataFlow from '../SunnyDataFlow';

const SunnyDataFlowSection = () => {
  return (
    <section className="data-flow-section">
      <div className="container">
        <div className="data-flow-content">
          <h2>Seamless Global Connectivity</h2>
          <p>
            Our intelligent network processes millions of transactions every day,
            connecting businesses and customers across borders with unparalleled speed and security.
          </p>
          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#24b47e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="#24b47e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#24b47e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Real-time Processing</h3>
              <p>Transactions processed in milliseconds with instant confirmation</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6772e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 8L8 16" stroke="#6772e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8L16 16" stroke="#6772e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Cross-border Payments</h3>
              <p>Seamless international transfers with competitive exchange rates</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Advanced Security</h3>
              <p>Enterprise-grade encryption and fraud prevention systems</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffa94d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#ffa94d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="#ffa94d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="#ffa94d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Routing</h3>
              <p>Intelligent payment routing for optimal success rates</p>
            </div>
          </div>
        </div>
        <div className="data-flow-visualization">
          <SunnyDataFlow height="600px" />
        </div>
      </div>
      
      <style jsx>{`
        .data-flow-section {
          padding: 80px 0;
          background: linear-gradient(180deg, #0a0a0f 0%, #141429 100%);
          color: white;
          overflow: hidden;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        
        .data-flow-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #6772e5, #24b47e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 40px;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 40px;
        }
        
        .feature {
          text-align: left;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .feature-icon {
          margin-bottom: 15px;
          display: inline-block;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
        
        .feature h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: white;
        }
        
        .feature p {
          font-size: 1rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .data-flow-visualization {
          width: 100%;
          height: 600px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          .data-flow-visualization {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default SunnyDataFlowSection;