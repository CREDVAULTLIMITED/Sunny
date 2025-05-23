import React from 'react';
import PropTypes from 'prop-types';
import './StatsDisplay.css';

const StatsDisplay = ({ title, value, icon: Icon }) => {
  return (
    <div className="stats-display">
      <div className="stats-icon">
        {Icon && <Icon className="icon" />}
      </div>
      <div className="stats-content">
        <h4 className="stats-title">{title}</h4>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};

StatsDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
};

export default StatsDisplay;
