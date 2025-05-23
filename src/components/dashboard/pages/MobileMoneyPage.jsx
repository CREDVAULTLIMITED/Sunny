import React, { useState, useEffect } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Plus, Settings, RefreshCw, Search } from 'lucide-react';
import './PaymentMethodsPage.css';

const MobileMoneyPage = () => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        const mockProviders = [
          {
            id: 'mpesa',
            name: 'M-Pesa',
            logo: '/assets/images/payment-methods/mpesa.svg',
            status: 'active',
            description: 'Leading mobile money service in East Africa',
            successRate: 99.2,
            avgProcessingTime: 0.8,
            fee: '2.5%',
            supportedCountries: ['KE', 'TZ', 'UG', 'RW'],
            features: ['STK Push', 'B2C Transfers', 'Bulk Payments']
          },
          {
            id: 'mtn',
            name: 'MTN Mobile Money',
            logo: '/assets/images/payment-methods/mtn.svg',
            status: 'active',
            description: 'Mobile money for MTN subscribers',
            successRate: 98.7,
            avgProcessingTime: 1.0,
            fee: '2.8%',
            supportedCountries: ['GH', 'UG', 'RW', 'ZA', 'NG'],
            features: ['Direct Debit', 'QR Payments', 'Merchant Payments']
          },
          {
            id: 'airtel',
            name: 'Airtel Money',
            logo: '/assets/images/payment-methods/airtel.svg',
            status: 'active',
            description: 'Airtel\'s mobile money solution',
            successRate: 98.5,
            avgProcessingTime: 0.9,
            fee: '2.7%',
            supportedCountries: ['KE', 'UG', 'TZ', 'RW', 'NG'],
            features: ['Direct Deposits', 'Cross-border Transfers']
          },
          {
            id: 'orange',
            name: 'Orange Money',
            logo: '/assets/images/payment-methods/orange.svg',
            status: 'active',
            description: 'Mobile money for Orange subscribers',
            successRate: 98.1,
            avgProcessingTime: 1.2,
            fee: '3.0%',
            supportedCountries: ['SN', 'CI', 'ML', 'BF', 'CM'],
            features: ['Merchant Payments', 'Bill Payments']
          }
        ];
        
        setProviders(mockProviders);
        setError(null);
      } catch (err) {
        console.error('Error fetching mobile money providers:', err);
        setError('Failed to load mobile money providers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || 
                         activeFilters.includes(provider.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="payment-methods-page">
      <div className="page-header">
        <div>
          <h1>Mobile Money</h1>
          <p className="page-description">
            Accept payments through mobile money providers across Africa and Asia
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
        >
          Add Provider
        </Button>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>
        <div className="filter-chips">
          <button 
            className={`filter-chip ${activeFilters.includes('active') ? 'active' : ''}`}
            onClick={() => setActiveFilters(prev => 
              prev.includes('active') 
                ? prev.filter(f => f !== 'active')
                : [...prev, 'active']
            )}
          >
            Active
          </button>
          <button 
            className={`filter-chip ${activeFilters.includes('inactive') ? 'active' : ''}`}
            onClick={() => setActiveFilters(prev => 
              prev.includes('inactive') 
                ? prev.filter(f => f !== 'inactive')
                : [...prev, 'inactive']
            )}
          >
            Inactive
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading mobile money providers...</p>
        </div>
      ) : (
        <div className="payment-methods-grid">
          {filteredProviders.map(provider => (
            <Card key={provider.id} className="payment-method-card">
              <div className="method-header">
                <div className="method-title">
                  <h3>{provider.name}</h3>
                  <span className={`method-status ${provider.status}`}>
                    {provider.status}
                  </span>
                </div>
                <Toggle checked={provider.status === 'active'} />
              </div>

              <p className="method-description">{provider.description}</p>

              <div className="method-stats">
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">{provider.successRate}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg. Time</span>
                  <span className="stat-value">
                    {provider.avgProcessingTime}s
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Fee</span>
                  <span className="stat-value">{provider.fee}</span>
                </div>
              </div>

              <div className="method-features">
                <span className="features-label">Features:</span>
                <div className="features-list">
                  {provider.features.map(feature => (
                    <span key={feature} className="feature-badge">{feature}</span>
                  ))}
                </div>
              </div>

              <div className="method-countries">
                <span className="countries-label">Available in:</span>
                <div className="country-list">
                  {provider.supportedCountries.slice(0, 5).map(country => (
                    <span key={country} className="country-badge">{country}</span>
                  ))}
                  {provider.supportedCountries.length > 5 && (
                    <span className="country-badge more">
                      +{provider.supportedCountries.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="method-actions">
                <Button
                  variant="secondary"
                  icon={<Settings size={16} />}
                  className="action-button"
                >
                  Configure
                </Button>
                <Button
                  variant="outline"
                  icon={<RefreshCw size={16} />}
                  className="action-button"
                >
                  Test
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMoneyPage;
