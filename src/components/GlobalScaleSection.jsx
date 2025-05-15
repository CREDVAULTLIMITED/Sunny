import React from 'react';
import GlobalScaleVisualization from './GlobalScaleVisualization';

const GlobalScaleSection = () => {
  return (
    <section className="global-scale-section">
      <div className="container">
        <div className="content">
          <h2>Global Scale</h2>
          <p>
            Our platform connects businesses across continents, enabling seamless
            transactions across borders and currencies with unparalleled speed and security.
          </p>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#24b47e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="#24b47e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="#24b47e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Global Coverage</h3>
              <p>Operating in 195+ countries worldwide</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1V23" stroke="#6772e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#6772e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Multi-Currency</h3>
              <p>Support for 135+ currencies</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>High Success Rate</h3>
              <p>99.9% transaction success rate</p>
            </div>
          </div>
        </div>
        <div className="visualization">
          <GlobalScaleVisualization height="500px" />
        </div>
      </div>
      
      <style jsx>{`
        .global-scale-section {
          padding: 80px 0;
          background: linear-gradient(180deg, #0a0a0f 0%, #141429 100%);
          color: white;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        
        .content {
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
        
        .features {
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
        
        .feature {
          text-align: center;
          flex: 1;
        }
        
        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 15px;
        }
        
        .feature h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
        }
        
        .feature p {
          font-size: 1rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .visualization {
          width: 100%;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .features {
            flex-direction: column;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          .visualization {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default GlobalScaleSection;