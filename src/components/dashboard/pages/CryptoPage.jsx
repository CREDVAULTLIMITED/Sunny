import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Settings, RefreshCw, Search } from 'lucide-react';

const CryptoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Mock data for crypto payment methods
  const cryptoProviders = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      logo: '/assets/images/payment-methods/bitcoin.svg',
      status: 'active',
      description: 'Accept BTC payments with low fees',
      successRate: 99.8,
      avgProcessingTime: 15, // minutes
      fee: '1%',
      features: ['Lightning Network', 'Multi-sig Wallets', 'Auto Conversion'],
      supportedCountries: ['global']
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      logo: '/assets/images/payment-methods/ethereum.svg',
      status: 'active',
      description: 'ETH and ERC-20 token payments',
      successRate: 99.5,
      avgProcessingTime: 5,
      fee: '1.2%',
      features: ['Smart Contracts', 'Token Payments', 'Gas Optimization'],
      supportedCountries: ['global']
    },
    {
      id: 'usdc',
      name: 'USDC',
      logo: '/assets/images/payment-methods/usdc.svg',
      status: 'active',
      description: 'Stable coin payments with USD parity',
      successRate: 99.9,
      avgProcessingTime: 2,
      fee: '0.8%',
      features: ['Instant Settlement', 'No Volatility', 'Cross-border'],
      supportedCountries: ['global']
    },
    {
      id: 'ripple',
      name: 'Ripple (XRP)',
      logo: '/assets/images/payment-methods/xrp.svg',
      status: 'active',
      description: 'Fast cross-border payments',
      successRate: 99.7,
      avgProcessingTime: 0.1,
      fee: '0.5%',
      features: ['Instant Transfers', 'Low Fees', 'Bank Integration'],
      supportedCountries: ['global']
    }
  ];

  const filteredProviders = cryptoProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || 
                          activeFilters.includes(provider.status);
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="crypto-page">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cryptocurrency Payments</h1>
          <p className="mt-2 text-sm text-gray-600">
            Accept crypto payments globally with automatic conversion and settlement
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Settings size={16} />}
          onClick={() => {}}
        >
          Configure Settlement
        </Button>
      </div>

      <div className="flex justify-between items-center mt-8 mb-6">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search cryptocurrencies..."
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
          <p>Loading cryptocurrency providers...</p>
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
                    <span className="stat-value">
                      {provider.avgProcessingTime < 1 
                        ? `${(provider.avgProcessingTime * 60).toFixed(0)}s` 
                        : `${provider.avgProcessingTime}m`}
                    </span>
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

export default CryptoPage;
