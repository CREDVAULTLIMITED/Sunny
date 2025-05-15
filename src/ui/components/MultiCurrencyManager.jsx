import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import '../styles/components/MultiCurrencyManager.css';

/**
 * MultiCurrencyManager component for Sunny Payment Gateway
 * 
 * A component for managing multi-currency settings and exchange rates
 */
const MultiCurrencyManager = ({
  merchantId,
  apiKey,
  className = '',
  onSave,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    baseCurrency: 'USD',
    acceptedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    autoConvert: true,
    displayLocalCurrency: true,
    markupPercentage: 0,
    exchangeRateProvider: 'auto',
    updateFrequency: 'daily',
    settlementCurrencies: ['USD', 'EUR']
  });
  
  const [exchangeRates, setExchangeRates] = useState({});
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  
  // Fetch current settings and exchange rates
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would fetch from an API
        // For this example, we'll use mock data and a delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock available currencies
        setAvailableCurrencies([
          { code: 'USD', name: 'US Dollar', symbol: '$' },
          { code: 'EUR', name: 'Euro', symbol: '€' },
          { code: 'GBP', name: 'British Pound', symbol: '£' },
          { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
          { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
          { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
          { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
          { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
          { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
          { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
          { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
          { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
          { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
          { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
          { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' }
        ]);
        
        // Mock exchange rates
        setExchangeRates({
          USD: 1,
          EUR: 0.85,
          GBP: 0.73,
          CAD: 1.25,
          AUD: 1.35,
          JPY: 110.45,
          CNY: 6.45,
          INR: 74.25,
          BRL: 5.25,
          ZAR: 14.75,
          MXN: 20.15,
          SGD: 1.35,
          NZD: 1.42,
          KES: 108.50,
          NGN: 410.25
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load currency settings');
        console.error('Settings error:', err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [merchantId, apiKey]);
  
  // Handle settings change
  const handleSettingChange = (field, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [field]: value
    }));
  };
  
  // Handle currency toggle
  const handleCurrencyToggle = (currencyCode) => {
    setSettings(prevSettings => {
      const currentCurrencies = [...prevSettings.acceptedCurrencies];
      
      if (currentCurrencies.includes(currencyCode)) {
        // Don't allow removing the base currency
        if (currencyCode === prevSettings.baseCurrency) {
          return prevSettings;
        }
        return {
          ...prevSettings,
          acceptedCurrencies: currentCurrencies.filter(c => c !== currencyCode)
        };
      } else {
        return {
          ...prevSettings,
          acceptedCurrencies: [...currentCurrencies, currencyCode]
        };
      }
    });
  };
  
  // Handle settlement currency toggle
  const handleSettlementCurrencyToggle = (currencyCode) => {
    setSettings(prevSettings => {
      const currentCurrencies = [...prevSettings.settlementCurrencies];
      
      if (currentCurrencies.includes(currencyCode)) {
        // Don't allow removing all settlement currencies
        if (currentCurrencies.length === 1) {
          return prevSettings;
        }
        return {
          ...prevSettings,
          settlementCurrencies: currentCurrencies.filter(c => c !== currencyCode)
        };
      } else {
        return {
          ...prevSettings,
          settlementCurrencies: [...currentCurrencies, currencyCode]
        };
      }
    });
  };
  
  // Handle base currency change
  const handleBaseCurrencyChange = (currencyCode) => {
    setSettings(prevSettings => {
      // Ensure the base currency is also in accepted currencies
      let newAcceptedCurrencies = [...prevSettings.acceptedCurrencies];
      if (!newAcceptedCurrencies.includes(currencyCode)) {
        newAcceptedCurrencies.push(currencyCode);
      }
      
      return {
        ...prevSettings,
        baseCurrency: currencyCode,
        acceptedCurrencies: newAcceptedCurrencies
      };
    });
  };
  
  // Handle save
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      // In a real implementation, this would send to an API
      // For this example, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(settings);
      }
      
      setSaving(false);
    } catch (err) {
      setError('Failed to save currency settings');
      console.error('Save error:', err);
      setSaving(false);
    }
  };
  
  // Format currency for display
  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(amount);
  };
  
  const baseClass = 'sunny-currency-manager';
  const classes = [baseClass, className].filter(Boolean).join(' ');
  
  if (loading) {
    return (
      <div className={`${classes} ${baseClass}--loading`}>
        <div className={`${baseClass}__loader`}>
          <div className={`${baseClass}__loader-spinner`}></div>
          <div className={`${baseClass}__loader-text`}>Loading currency settings...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__header`}>
        <h1 className={`${baseClass}__title`}>Multi-Currency Management</h1>
        <p className={`${baseClass}__description`}>
          Configure which currencies you accept and how they are processed.
        </p>
      </div>
      
      <div className={`${baseClass}__content`}>
        <div className={`${baseClass}__settings-column`}>
          <Card className={`${baseClass}__settings-card`}>
            <h2 className={`${baseClass}__card-title`}>Currency Settings</h2>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>Base Currency</label>
              <select
                className={`${baseClass}__setting-select`}
                value={settings.baseCurrency}
                onChange={(e) => handleBaseCurrencyChange(e.target.value)}
              >
                {availableCurrencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>Auto-Convert Currencies</label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.autoConvert}
                  onChange={(e) => handleSettingChange('autoConvert', e.target.checked)}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>Display Local Currency</label>
              <label className={`${baseClass}__toggle`}>
                <input
                  type="checkbox"
                  checked={settings.displayLocalCurrency}
                  onChange={(e) => handleSettingChange('displayLocalCurrency', e.target.checked)}
                />
                <span className={`${baseClass}__toggle-slider`}></span>
              </label>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>Exchange Rate Markup (%)</label>
              <input
                type="number"
                className={`${baseClass}__setting-input`}
                value={settings.markupPercentage}
                onChange={(e) => handleSettingChange('markupPercentage', parseFloat(e.target.value))}
                min="0"
                max="10"
                step="0.1"
              />
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>Exchange Rate Provider</label>
              <select
                className={`${baseClass}__setting-select`}
                value={settings.exchangeRateProvider}
                onChange={(e) => handleSettingChange('exchangeRateProvider', e.target.value)}
              >
                <option value="auto">Automatic (Best Available)</option>
                <option value="openexchangerates">Open Exchange Rates</option>
                <option value="currencylayer">Currency Layer</option>
                <option value="fixer">Fixer.io</option>
                <option value="manual">Manual (Set Your Own)</option>
              </select>
            </div>
            
            <div className={`${baseClass}__setting`}>
              <label className={`${baseClass}__setting-label`}>Update Frequency</label>
              <select
                className={`${baseClass}__setting-select`}
                value={settings.updateFrequency}
                onChange={(e) => handleSettingChange('updateFrequency', e.target.value)}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="manual">Manual Only</option>
              </select>
            </div>
          </Card>
          
          <Card className={`${baseClass}__settings-card`}>
            <h2 className={`${baseClass}__card-title`}>Settlement Currencies</h2>
            <p className={`${baseClass}__card-description`}>
              Select which currencies you want to settle in. You'll receive funds in these currencies.
            </p>
            
            <div className={`${baseClass}__currency-grid`}>
              {availableCurrencies
                .filter(currency => settings.acceptedCurrencies.includes(currency.code))
                .map(currency => (
                  <div 
                    key={currency.code}
                    className={`${baseClass}__currency-item ${
                      settings.settlementCurrencies.includes(currency.code) ? `${baseClass}__currency-item--selected` : ''
                    }`}
                    onClick={() => handleSettlementCurrencyToggle(currency.code)}
                  >
                    <div className={`${baseClass}__currency-code`}>{currency.code}</div>
                    <div className={`${baseClass}__currency-name`}>{currency.name}</div>
                    {settings.settlementCurrencies.includes(currency.code) && (
                      <div className={`${baseClass}__currency-check`}>✓</div>
                    )}
                  </div>
                ))}
            </div>
          </Card>
        </div>
        
        <div className={`${baseClass}__currencies-column`}>
          <Card className={`${baseClass}__currencies-card`}>
            <h2 className={`${baseClass}__card-title`}>Accepted Currencies</h2>
            <p className={`${baseClass}__card-description`}>
              Select which currencies you want to accept from your customers.
            </p>
            
            <div className={`${baseClass}__search-container`}>
              <input
                type="text"
                className={`${baseClass}__search-input`}
                placeholder="Search currencies..."
              />
            </div>
            
            <div className={`${baseClass}__currency-grid`}>
              {availableCurrencies.map(currency => (
                <div 
                  key={currency.code}
                  className={`${baseClass}__currency-item ${
                    settings.acceptedCurrencies.includes(currency.code) ? `${baseClass}__currency-item--selected` : ''
                  } ${
                    currency.code === settings.baseCurrency ? `${baseClass}__currency-item--base` : ''
                  }`}
                  onClick={() => handleCurrencyToggle(currency.code)}
                >
                  <div className={`${baseClass}__currency-code`}>{currency.code}</div>
                  <div className={`${baseClass}__currency-name`}>{currency.name}</div>
                  {currency.code === settings.baseCurrency && (
                    <div className={`${baseClass}__currency-base-badge`}>Base</div>
                  )}
                  {settings.acceptedCurrencies.includes(currency.code) && currency.code !== settings.baseCurrency && (
                    <div className={`${baseClass}__currency-check`}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          <Card className={`${baseClass}__exchange-rates-card`}>
            <h2 className={`${baseClass}__card-title`}>Current Exchange Rates</h2>
            <p className={`${baseClass}__card-description`}>
              Exchange rates relative to your base currency ({settings.baseCurrency}).
              Last updated: {new Date().toLocaleString()}
            </p>
            
            <div className={`${baseClass}__exchange-rates-list`}>
              {Object.entries(exchangeRates)
                .filter(([code]) => settings.acceptedCurrencies.includes(code) && code !== settings.baseCurrency)
                .map(([code, rate]) => (
                  <div key={code} className={`${baseClass}__exchange-rate-item`}>
                    <div className={`${baseClass}__exchange-rate-currency`}>
                      {code}
                    </div>
                    <div className={`${baseClass}__exchange-rate-value`}>
                      1 {settings.baseCurrency} = {rate.toFixed(4)} {code}
                    </div>
                    <div className={`${baseClass}__exchange-rate-example`}>
                      {formatCurrency(100, settings.baseCurrency)} = {formatCurrency(100 * rate, code)}
                    </div>
                  </div>
                ))}
            </div>
            
            <div className={`${baseClass}__exchange-rates-actions`}>
              <Button variant="tertiary" size="small">
                Update Rates Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className={`${baseClass}__actions`}>
        {error && (
          <div className={`${baseClass}__error`}>
            {error}
          </div>
        )}
        
        <Button
          variant="primary"
          onClick={handleSave}
          loading={saving}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

MultiCurrencyManager.propTypes = {
  merchantId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  className: PropTypes.string,
  onSave: PropTypes.func,
};

export default MultiCurrencyManager;