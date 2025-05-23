import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Settings, RefreshCw, Search, Globe, TrendingUp, BarChart, Compass } from 'lucide-react';

const GlobalMarketsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Mock data for global markets
  const markets = [
    {
      id: 'asia_pacific',
      name: 'Asia Pacific',
      status: 'active',
      regions: ['CN', 'JP', 'KR', 'SG', 'AU'],
      transactionVolume: 5200000,
      growth: 28.5,
      localMethods: ['alipay', 'wechat', 'paypay', 'grabpay'],
      currencies: ['CNY', 'JPY', 'KRW', 'SGD', 'AUD'],
      complianceLevel: 'high',
      features: ['Local Processing', 'Smart Routing', '3DS2', 'Regional CDN']
    },
    {
      id: 'europe',
      name: 'Europe',
      status: 'active',
      regions: ['GB', 'DE', 'FR', 'IT', 'ES'],
      transactionVolume: 4800000,
      growth: 22.3,
      localMethods: ['sepa', 'sofort', 'giropay', 'ideal'],
      currencies: ['EUR', 'GBP', 'CHF', 'SEK', 'NOK'],
      complianceLevel: 'high',
      features: ['PSD2 Compliance', 'SEPA Direct', 'Local Acquiring', 'EU Gateway']
    },
    {
      id: 'north_america',
      name: 'North America',
      status: 'active',
      regions: ['US', 'CA', 'MX'],
      transactionVolume: 7500000,
      growth: 18.7,
      localMethods: ['ach', 'interac', 'oxxo', 'real_time_payments'],
      currencies: ['USD', 'CAD', 'MXN'],
      complianceLevel: 'high',
      features: ['ACH Network', 'Card Networks', 'Bank Routing', 'Mexico Hub']
    },
    {
      id: 'latin_america',
      name: 'Latin America',
      status: 'active',
      regions: ['BR', 'AR', 'CL', 'CO', 'PE'],
      transactionVolume: 2100000,
      growth: 35.2,
      localMethods: ['pix', 'boleto', 'pse', 'nequi'],
      currencies: ['BRL', 'ARS', 'CLP', 'COP', 'PEN'],
      complianceLevel: 'medium',
      features: ['PIX Integration', 'Local Processing', 'Cash Networks']
    }
  ];

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.regions.some(region => region.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilters = activeFilters.length === 0 || 
                          activeFilters.includes(market.status);
    return matchesSearch && matchesFilters;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="global-markets-page">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Markets</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage payment operations across different regions and markets
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            icon={<BarChart size={16} />}
            onClick={() => {}}
          >
            Analytics
          </Button>
          <Button
            variant="primary"
            icon={<Globe size={16} />}
            onClick={() => {}}
          >
            New Market
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="stats-overview grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Markets</p>
                  <h3 className="text-lg font-semibold text-gray-900">32</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Global Growth</p>
                  <h3 className="text-lg font-semibold text-gray-900">+24.5%</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Volume</p>
                  <h3 className="text-lg font-semibold text-gray-900">$19.6M</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Compass className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Coverage</p>
                  <h3 className="text-lg font-semibold text-gray-900">180+ Countries</h3>
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
              placeholder="Search markets or regions..."
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
          <p>Loading market data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMarkets.map(market => (
            <Card key={market.id} className="market-card">
              <div className="method-header flex justify-between items-start p-6">
                <div className="market-info">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">{market.name}</h3>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      market.complianceLevel === 'high' ? 'bg-green-100 text-green-800' :
                      market.complianceLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {market.complianceLevel.charAt(0).toUpperCase() + market.complianceLevel.slice(1)} Compliance
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Globe className="h-4 w-4 mr-1" />
                    {market.regions.join(', ')}
                  </div>
                </div>
                <Toggle checked={market.status === 'active'} />
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="stat">
                    <span className="stat-label">Transaction Volume</span>
                    <span className="stat-value">{formatCurrency(market.transactionVolume)}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Growth Rate</span>
                    <span className="stat-value text-green-600">+{market.growth}%</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Currencies</span>
                    <span className="stat-value">{market.currencies.length} Active</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">Local Payment Methods:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {market.localMethods.map(method => (
                      <span 
                        key={method}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">Features:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {market.features.map(feature => (
                      <span 
                        key={feature}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">Supported Currencies:</span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {market.currencies.map(currency => (
                      <span 
                        key={currency}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {currency}
                      </span>
                    ))}
                  </div>
                </div>
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
                  View Analytics
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalMarketsPage;
