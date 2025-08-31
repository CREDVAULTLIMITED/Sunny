import React from 'react';
import './TaxRateIndicator.css';

const TaxRateIndicator = ({ country, rate, type }) => {
  return (
    <div className="tax-rate-indicator">
      <div className="rate-header">
        <img 
          src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
          alt={`${country} flag`}
          className="country-flag"
        />
        <div className="country-info">
          <h4>{country}</h4>
          <span className="tax-type">{type}</span>
        </div>
      </div>
      <div className="rate-display">
        <span className="rate-value">{rate}%</span>
        <div className="rate-bar">
          <div 
            className="rate-fill" 
            style={{ width: `${Math.min(rate * 2, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaxRateIndicator;
