import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, icon, trend }) => {
  // Determine trend direction and class
  const trendClass = trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral';
  const trendIcon = trend > 0 ? '↑' : trend < 0 ? '↓' : '→';
  
  // Icon paths based on type
  const getIconPath = (iconType) => {
    switch (iconType) {
      case 'transactions':
        return 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z';
      case 'success-rate':
        return 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
      case 'volume':
        return 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z';
      case 'average':
        return 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z';
      default:
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z';
    }
  };

  return (
    <div className="metric-card">
      <div className="metric-icon">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d={getIconPath(icon)} />
        </svg>
      </div>
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{value}</div>
        {trend !== undefined && (
          <div className={`metric-trend ${trendClass}`}>
            <span className="trend-icon">{trendIcon}</span>
            <span className="trend-value">{Math.abs(trend)}%</span>
            <span className="trend-period">vs. last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;