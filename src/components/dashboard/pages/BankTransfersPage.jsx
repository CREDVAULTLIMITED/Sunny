import React, { useState, useEffect } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Plus, Settings, RefreshCw, Search } from 'lucide-react';
import './PaymentMethodsPage.css';

const BankTransfersPage = () => {
  const [bankMethods, setBankMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankMethods = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        const mockBankMethods = [
          {
            id: 'ach',
            name: 'ACH Transfer',
            logo: '/assets/images/payment-methods/ach.svg',
            status: 'active',
            description: 'US domestic bank transfers via ACH network',
            successRate: 99.5,
            avgProcessingTime: 24,
            fee: '0.8%',
            supportedCountries: ['US'],
            features: ['Recurring Payments', 'Batch Processing', 'Same-day ACH']
          },
          {
            id: 'sepa',
            name: 'SEPA Transfer',
            logo: '/assets/images/payment-methods/sepa.svg',
            status: 'active',
            description: 'European bank transfers via SEPA network',
            successRate: 99.3,
            avgProcessingTime: 24,
            fee: '0.5%',
            supportedCountries: ['EU'],
            features: ['SEPA Credit', 'SEPA Instant', 'Direct Debit']
          },
          {
            id: 'wire',
            name: 'Wire Transfer',
            logo: '/assets/images/payment-methods/wire.svg',
            status: 'active',
            description: 'International wire transfers via SWIFT',
            successRate: 99.7,
            avgProcessingTime: 48,
            fee: '1.5%',
            supportedCountries: ['global'],
            features: ['SWIFT Payments', 'Real-time Tracking', 'Multi-currency']
          },
          {
            id: 'fps',
            name: 'Faster Payments',
            logo: '/assets/images/payment-methods/fps.svg',
            status: 'active',
            description: 'UK domestic instant bank transfers',
            successRate: 99.6,
            avgProcessingTime: 0.1,
            fee: '0.4%',
            supportedCountries: ['GB'],
            features: ['Instant Settlement', '24/7 Processing', 'Direct Credits']
          },
          {
            id: 'pix',
            name: 'PIX',
            logo: '/assets/images/payment-methods/pix.svg',
            status: 'active',
            description: 'Brazilian instant payment system',
            successRate: 99.4,
            avgProcessingTime: 0.1,
            fee: '0.9%',
            supportedCountries: ['BR'],
            features: ['Instant Transfers', 'QR Code Payments', 'API Integration']
          }
        ];
        
        setBankMethods(mockBankMethods);
        setError(null);
      } catch (err) {
        console.error('Error fetching bank transfer methods:', err);
        setError('Failed to load bank transfer methods. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBankMethods();
  }, []);

  const filteredMethods = bankMethods.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         method.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || 
                         activeFilters.includes(method.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="payment-methods-page">
      <div className="page-header">
        <div>
          <h1>Bank Transfers</h1>
          <p className="page-description">
            Accept bank transfers from customers worldwide with support for local and international payment networks
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
        >
          Add Transfer Method
        </Button>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search transfer methods..."
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
          <button 
            className={`filter-chip ${activeFilters.includes('instant') ? 'active' : ''}`}
            onClick={() => setActiveFilters(prev => 
              prev.includes('instant') 
                ? prev.filter(f => f !== 'instant')
                : [...prev, 'instant']
            )}
          >
            Instant Transfers
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
          <p>Loading bank transfer methods...</p>
        </div>
      ) : (
        <div className="payment-methods-grid">
          {filteredMethods.map(method => (
            <Card key={method.id} className="payment-method-card">
              <div className="method-header">
                <div className="method-title">
                  <h3>{method.name}</h3>
                  <span className={`method-status ${method.status}`}>
                    {method.status}
                  </span>
                </div>
                <Toggle checked={method.status === 'active'} />
              </div>

              <p className="method-description">{method.description}</p>

              <div className="method-stats">
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">{method.successRate}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Processing Time</span>
                  <span className="stat-value">
                    {method.avgProcessingTime < 1 
                      ? `${method.avgProcessingTime * 60}min` 
                      : `${method.avgProcessingTime}h`}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Fee</span>
                  <span className="stat-value">{method.fee}</span>
                </div>
              </div>

              <div className="method-features">
                <span className="features-label">Features:</span>
                <div className="features-list">
                  {method.features.map(feature => (
                    <span key={feature} className="feature-badge">{feature}</span>
                  ))}
                </div>
              </div>

              <div className="method-countries">
                <span className="countries-label">Available in:</span>
                <div className="country-list">
                  {method.supportedCountries[0] === 'global' ? (
                    <span className="global-badge">Global</span>
                  ) : (
                    method.supportedCountries.map(country => (
                      <span key={country} className="country-badge">{country}</span>
                    ))
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

export default BankTransfersPage;
