import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'destructive']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string
};

export default Button;
