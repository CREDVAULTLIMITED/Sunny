import React from 'react';

import BarChart from './BarChart';
import LineChart from './LineChart';

const ChartCard = ({ title, children }) => {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-container">
        {children}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, trend, trendColor }) => {
  const trendClass = trend === 'up' ? 'success' : trend === 'down' ? 'danger' : '';
  const customColor = trendColor ? `text-${trendColor}` : '';

  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-change ${trendClass} ${customColor}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </div>
      )}
    </div>
  );
};

export { BarChart, LineChart, ChartCard, MetricCard };
