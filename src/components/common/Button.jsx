import React from 'react';
import './Button.css';

export const Button = ({ 
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled,
  loading,
  onClick,
  className = '',
  ...props
}) => {
  const variantClass = `sunny-button-${variant}`;
  const sizeClass = `sunny-button-${size}`;
  
  return (
    <button
      className={`sunny-button ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="sunny-button-spinner"></span>
      )}
      {icon && !loading && (
        <span className="sunny-button-icon">{icon}</span>
      )}
      <span className="sunny-button-content">{children}</span>
    </button>
  );
};
