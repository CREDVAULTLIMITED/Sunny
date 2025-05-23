import React from 'react';
import PropTypes from 'prop-types';

const MetricCard = ({ label, value, subtext, trend, trendLabel, icon }) => {
  const trendColor = trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600';
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-2">{value}</h3>
          {(trend || trendLabel) && (
            <p className="flex items-center mt-2">
              {trend && (
                <span className={`${trendColor} text-sm font-medium mr-1`}>
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
              )}
              {trendLabel && (
                <span className="text-gray-500 text-sm">{trendLabel}</span>
              )}
            </p>
          )}
          {subtext && (
            <p className="text-sm text-gray-500 mt-1">{subtext}</p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-indigo-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtext: PropTypes.string,
  trend: PropTypes.number,
  trendLabel: PropTypes.string,
  icon: PropTypes.node
};

export default MetricCard;
