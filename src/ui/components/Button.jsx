import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Button.css';

/**
 * Button component for Sunny Payment Gateway
 * 
 * A versatile button component with multiple variants and sizes
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClass = 'sunny-button';
  const variantClass = `${baseClass}--${variant}`;
  const sizeClass = `${baseClass}--${size}`;
  const fullWidthClass = fullWidth ? `${baseClass}--full-width` : '';
  const iconClass = icon ? `${baseClass}--with-icon ${baseClass}--icon-${iconPosition}` : '';
  const loadingClass = loading ? `${baseClass}--loading` : '';
  
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    iconClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className={`${baseClass}__loader`}>
          <span className={`${baseClass}__loader-dot`}></span>
          <span className={`${baseClass}__loader-dot`}></span>
          <span className={`${baseClass}__loader-dot`}></span>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={`${baseClass}__icon ${baseClass}__icon--left`}>
          {icon}
        </span>
      )}
      
      <span className={`${baseClass}__text`}>{children}</span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={`${baseClass}__icon ${baseClass}__icon--right`}>
          {icon}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'outline', 'text', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;