import React, { useState } from 'react';
import SunnyTerrain from '../SunnyTerrain';

const SAMPLE_REGIONS = [
  { id: 'us', name: 'United States', value: 85, color: 0x6772e5 },
  { id: 'eu', name: 'Europe', value: 72, color: 0x24b47e },
  { id: 'asia', name: 'Asia Pacific', value: 65, color: 0xff6b6b },
  { id: 'africa', name: 'Africa', value: 45, color: 0xffa94d },
  { id: 'sa', name: 'South America', value: 58, color: 0x9c27b0 },
  { id: 'au', name: 'Australia', value: 62, color: 0x2196f3 },
  { id: 'ca', name: 'Canada', value: 70, color: 0x4caf50 },
  { id: 'me', name: 'Middle East', value: 55, color: 0xff9800 }
];

const SunnyTerrainSection = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <section className="sunny-terrain-section">
      <div className="container">
        <div className="terrain-content">
          <h2>Global Payment Ecosystem</h2>
          <p>
            Our platform connects businesses across continents, creating a unified payment landscape
            that adapts to your needs and grows with your business.
          </p>
          <div className="terrain-stats">
            <div className="stat">
              <h3>195+</h3>
              <p>Countries supported</p>
            </div>
            <div className="stat">
              <h3>135+</h3>
              <p>Currencies processed</p>
            </div>
            <div className="stat">
              <h3>$10B+</h3>
              <p>Transactions annually</p>
            </div>
          </div>
        </div>
        <div className="terrain-visualization">
          <SunnyTerrain 
            data={SAMPLE_REGIONS}
            height="600px"
          />
        </div>
      </div>
      
      <style jsx>{`
        .sunny-terrain-section {
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
        
        .terrain-content {
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
        
        .terrain-stats {
          display: flex;
          justify-content: space-around;
          margin-top: 40px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat h3 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #6772e5;
        }
        
        .stat p {
          font-size: 1rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .terrain-visualization {
          width: 100%;
          height: 600px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .terrain-stats {
            flex-direction: column;
            gap: 20px;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          .terrain-visualization {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default SunnyTerrainSection;