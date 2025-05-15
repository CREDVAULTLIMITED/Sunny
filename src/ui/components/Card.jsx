import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Card.css';

/**
 * Card component for Sunny Payment Gateway
 * 
 * A versatile card component for displaying content in a contained manner
 */
const Card = ({
  children,
  variant = 'default',
  elevation = 'md',
  className = '',
  header,
  footer,
  onClick,
  ...props
}) => {
  const baseClass = 'sunny-card';
  const variantClass = `${baseClass}--${variant}`;
  const elevationClass = `${baseClass}--elevation-${elevation}`;
  const clickableClass = onClick ? `${baseClass}--clickable` : '';
  
  const classes = [
    baseClass,
    variantClass,
    elevationClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes} 
      onClick={onClick}
      {...props}
    >
      {header && (
        <div className={`${baseClass}__header`}>
          {header}
        </div>
      )}
      
      <div className={`${baseClass}__content`}>
        {children}
      </div>
      
      {footer && (
        <div className={`${baseClass}__footer`}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'flat']),
  elevation: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  onClick: PropTypes.func,
};

export default Card;