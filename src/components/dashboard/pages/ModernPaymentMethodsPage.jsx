import React, { useState } from 'react';
import './ModernPaymentMethodsPage.css';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Plus, Settings, RefreshCw } from 'lucide-react';

const ModernPaymentMethodsPage = () => {
  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      logo: '/assets/images/payment-methods/mpesa.svg',
      status: 'active',
      successRate: '99.2%',
      volume: '$1.2M',
      webhook: 'https://api.sunny.com/webhooks/mpesa',
      stkEnabled: true
    },
    {
      id: 'visa',
      name: 'Visa',
      logo: '/assets/images/payment-methods/visa.svg',
      status: 'active',
      successRate: '98.7%',
      volume: '$2.8M',
      webhook: 'https://api.sunny.com/webhooks/visa',
      threeDSecure: true
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: '/assets/images/payment-methods/mastercard.svg',
      status: 'active',
      successRate: '98.5%',
      volume: '$2.1M',
      webhook: 'https://api.sunny.com/webhooks/mastercard',
      threeDSecure: true
    }
  ];

  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="payment-methods-page">
      <div className="page-header">
        <div>
          <h1>Payment Methods</h1>
          <p className="subtitle">Manage all your payment integrations in one place</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
        >
          Add Payment Method
        </Button>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search payment methods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-chips">
          <button 
            className={`filter-chip ${activeFilters.includes('active') ? 'active' : ''}`}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button 
            className={`filter-chip ${activeFilters.includes('inactive') ? 'active' : ''}`}
            onClick={() => handleFilterChange('inactive')}
          >
            Inactive
          </button>
          <button 
            className={`filter-chip ${activeFilters.includes('card') ? 'active' : ''}`}
            onClick={() => handleFilterChange('card')}
          >
            Card Payments
          </button>
          <button 
            className={`filter-chip ${activeFilters.includes('mobile') ? 'active' : ''}`}
            onClick={() => handleFilterChange('mobile')}
          >
            Mobile Money
          </button>
        </div>
      </div>

      <div className="methods-grid">
        {paymentMethods.map(method => (
          <Card 
            key={method.id}
            hover={true}
            className="method-card"
          >
            <div className="method-header">
              <img src={method.logo} alt={method.name} className="method-logo" />
              <Toggle 
                checked={method.status === 'active'} 
                onChange={() => {}} 
              />
            </div>

            <div className="method-info">
              <h3 className="method-name">{method.name}</h3>
              
              <div className="method-stats">
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">{method.successRate}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Monthly Volume</span>
                  <span className="stat-value">{method.volume}</span>
                </div>
              </div>

              <div className="setup-info">
                <h4>Setup Information</h4>
                <div className="setup-item">
                  <span className="setup-label">Webhook URL</span>
                  <code className="setup-value">{method.webhook}</code>
                </div>
                {method.stkEnabled && (
                  <div className="setup-item">
                    <span className="setup-label">STK Push</span>
                    <span className="setup-value success">Enabled</span>
                  </div>
                )}
                {method.threeDSecure && (
                  <div className="setup-item">
                    <span className="setup-label">3D Secure</span>
                    <span className="setup-value success">Configured</span>
                  </div>
                )}
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModernPaymentMethodsPage;
