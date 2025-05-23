import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h2>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Card;
