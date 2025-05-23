import React from 'react';
import './StatsDisplay.css';

const StatsDisplay = ({ stats }) => {
  return (
    <div className="stats-display">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <h4>{stat.label}</h4>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;
