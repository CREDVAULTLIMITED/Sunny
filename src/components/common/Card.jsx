import React from 'react';
import './Card.css';

export const Card = ({ 
  children, 
  title, 
  subtitle,
  action,
  className = '',
  hover = false 
}) => {
  return (
    <div className={`sunny-card ${hover ? 'hover' : ''} ${className}`}>
      {(title || action) && (
        <div className="sunny-card-header">
          <div className="sunny-card-titles">
            {title && <h3 className="sunny-card-title">{title}</h3>}
            {subtitle && <p className="sunny-card-subtitle">{subtitle}</p>}
          </div>
          {action && (
            <div className="sunny-card-action">
              {action}
            </div>
          )}
        </div>
      )}
      <div className="sunny-card-content">
        {children}
      </div>
    </div>
  );
};
