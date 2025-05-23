import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Settings, RefreshCw, Search, Shield, Clock, DollarSign } from 'lucide-react';

const CardsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Mock data for card payment methods
  const cardProviders = [
    {
      id: 'visa',
      name: 'Visa',
      logo: '/assets/images/payment-methods/visa.svg',
      status: 'active',
      description: 'Accept Visa credit and debit cards',
      successRate: 98.7,
      avgProcessingTime: 2.5,
      fee: '2.9% + $0.30',
      features: ['3D Secure', 'Tokenization', 'Recurring Billing', 'Refunds'],
      supportedCountries: ['global']
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: '/assets/images/payment-methods/mastercard.svg',
      status: 'active',
      description: 'Process Mastercard payments globally',
      successRate: 98.5,
      avgProcessingTime: 2.3,
      fee: '2.9% + $0.30',
      features: ['3D Secure', 'One-Click Checkout', 'Fraud Detection', 'Disputes'],
      supportedCountries: ['global']
    },
    {
      id: 'amex',
      name: 'American Express',
      logo: '/assets/images/payment-methods/amex.svg',
      status: 'active',
      description: 'Accept American Express cards',
      successRate: 97.9,
      avgProcessingTime: 3.0,
      fee: '3.5% + $0.30',
      features: ['SafeKey', 'Corporate Cards', 'Membership Rewards', 'Buyer Protection'],
      supportedCountries: ['US', 'CA', 'GB', 'EU', 'JP', 'AU', 'SG']
    },
    {
      id: 'unionpay',
      name: 'UnionPay',
      logo: '/assets/images/payment-methods/unionpay.svg',
      status: 'active',
      description: 'Process UnionPay card transactions',
      successRate: 98.2,
      avgProcessingTime: 2.8,
      fee: '2.7% + $0.30',
      features: ['SMS Verification', 'Quick Pass', 'Mobile Payments'],
      supportedCountries: ['CN', 'HK', 'SG', 'JP', 'KR', 'EU']
    }
  ];

  const filteredProviders = cardProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || 
                          activeFilters.includes(provider.status);
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="cards-page">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Card Payments</h1>
          <p className="mt-2 text-sm text-gray-600">
            Accept credit and debit cards with advanced fraud protection and instant verification
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            icon={<Shield size={16} />}
            onClick={() => {}}
          >
            Security Settings
          </Button>
          <Button
            variant="primary"
            icon={<Settings size={16} />}
            onClick={() => {}}
          >
            Configure Processing
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="stats-overview grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Processing Volume</p>
                  <h3 className="text-lg font-semibold text-gray-900">$1.2M</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Avg. Processing Time</p>
                  <h3 className="text-lg font-semibold text-gray-900">2.6s</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Fraud Rate</p>
                  <h3 className="text-lg font-semibold text-gray-900">0.13%</h3>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search card providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
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
          <p>Loading card providers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <Card key={provider.id} className="payment-method-card">
              <div className="method-header flex justify-between items-start p-6">
                <div className="method-title flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{provider.name}</h3>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {provider.status}
                  </span>
                </div>
                <Toggle checked={provider.status === 'active'} />
              </div>

              <div className="px-6 py-4">
                <p className="text-sm text-gray-500">{provider.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="stat">
                    <span className="stat-label">Success Rate</span>
                    <span className="stat-value">{provider.successRate}%</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Avg. Time</span>
                    <span className="stat-value">{provider.avgProcessingTime}s</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Fee</span>
                    <span className="stat-value">{provider.fee}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">Features:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {provider.features.map(feature => (
                      <span 
                        key={feature}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {provider.supportedCountries[0] === 'global' ? (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700">Available:</span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Global
                    </span>
                  </div>
                ) : (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700">Countries:</span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {provider.supportedCountries.map(country => (
                        <span 
                          key={country}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Settings size={14} />}
                >
                  Configure
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<RefreshCw size={14} />}
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

export default CardsPage;
