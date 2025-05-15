import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/components/PaymentMethodSelector.css';

/**
 * PaymentMethodSelector component for Sunny Payment Gateway
 * 
 * A smart component that displays relevant payment methods based on user location and preferences
 */
const PaymentMethodSelector = ({
  availableMethods = [],
  selectedMethod = null,
  onMethodSelect,
  userCountry = null,
  userCurrency = null,
  className = '',
  showIcons = true,
  showLabels = true,
  size = 'medium',
  ...props
}) => {
  const [sortedMethods, setSortedMethods] = useState([]);
  const [selected, setSelected] = useState(selectedMethod);
  
  // Sort payment methods based on relevance to user's location and preferences
  useEffect(() => {
    if (availableMethods.length === 0) return;
    
    // Clone the available methods to avoid mutating props
    let methods = [...availableMethods];
    
    // Sort methods based on country relevance
    if (userCountry) {
      methods = sortMethodsByCountryRelevance(methods, userCountry);
    }
    
    // Sort methods based on currency support
    if (userCurrency) {
      methods = sortMethodsByCurrencySupport(methods, userCurrency);
    }
    
    setSortedMethods(methods);
    
    // If no method is selected, select the first one
    if (!selected && methods.length > 0) {
      setSelected(methods[0].id);
      if (onMethodSelect) {
        onMethodSelect(methods[0].id);
      }
    }
  }, [availableMethods, userCountry, userCurrency, selected, onMethodSelect]);
  
  // Handle method selection
  const handleMethodSelect = (methodId) => {
    setSelected(methodId);
    if (onMethodSelect) {
      onMethodSelect(methodId);
    }
  };
  
  // Sort methods by country relevance
  const sortMethodsByCountryRelevance = (methods, country) => {
    return methods.sort((a, b) => {
      // If method is specific to the user's country, prioritize it
      const aRelevance = a.preferredCountries?.includes(country) ? 1 : 0;
      const bRelevance = b.preferredCountries?.includes(country) ? 1 : 0;
      
      return bRelevance - aRelevance;
    });
  };
  
  // Sort methods by currency support
  const sortMethodsByCurrencySupport = (methods, currency) => {
    return methods.sort((a, b) => {
      // If method supports the user's currency, prioritize it
      const aSupports = a.supportedCurrencies?.includes(currency) ? 1 : 0;
      const bSupports = b.supportedCurrencies?.includes(currency) ? 1 : 0;
      
      return bSupports - aSupports;
    });
  };
  
  const baseClass = 'sunny-payment-method-selector';
  const sizeClass = `${baseClass}--${size}`;
  const classes = [baseClass, sizeClass, className].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__methods`}>
        {sortedMethods.map((method) => (
          <Card
            key={method.id}
            variant="outlined"
            elevation={selected === method.id ? 'md' : 'none'}
            className={`${baseClass}__method ${selected === method.id ? `${baseClass}__method--selected` : ''}`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className={`${baseClass}__method-content`}>
              {showIcons && method.icon && (
                <div className={`${baseClass}__method-icon`}>
                  <img src={method.icon} alt={method.name} />
                </div>
              )}
              
              {showLabels && (
                <div className={`${baseClass}__method-details`}>
                  <div className={`${baseClass}__method-name`}>{method.name}</div>
                  {method.description && (
                    <div className={`${baseClass}__method-description`}>{method.description}</div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

PaymentMethodSelector.propTypes = {
  availableMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string,
      preferredCountries: PropTypes.arrayOf(PropTypes.string),
      supportedCurrencies: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  selectedMethod: PropTypes.string,
  onMethodSelect: PropTypes.func,
  userCountry: PropTypes.string,
  userCurrency: PropTypes.string,
  className: PropTypes.string,
  showIcons: PropTypes.bool,
  showLabels: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default PaymentMethodSelector;