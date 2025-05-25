import React, { useState, useEffect } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Plus, Settings, RefreshCw, Search } from 'lucide-react';
import './PaymentMethodsPage.css';

const MobileMoneyPage = () => {
  const [mobileMoneyProviders, setMobileMoneyProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMobileMoneyProviders = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        const mockProviders = [
          {
            id: 1,
            name: 'M-Pesa',
            country: 'Kenya',
            status: 'active'
          },
          {
            id: 2,
            name: 'MTN Mobile Money',
            country: 'Ghana',
            status: 'active'
          }
        ];
        setMobileMoneyProviders(mockProviders);
        setError(null);
      } catch (err) {
        setError('Failed to fetch mobile money providers');
        console.error('Error fetching mobile money providers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMobileMoneyProviders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mobile Money Providers</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={16} />
          Add Provider
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search providers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="flex items-center gap-2">
          <RefreshCw size={16} />
          Refresh
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <Settings size={16} />
          Settings
        </Button>
      </div>

      {error && (
        <Card className="mb-4 bg-red-50 border-red-200">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {mobileMoneyProviders.map((provider) => (
            <Card key={provider.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                  <p className="text-gray-600">{provider.country}</p>
                </div>
                <Toggle
                  checked={provider.status === 'active'}
                  onChange={() => {
                    // In a real implementation, this would update the provider's status
                    console.log('Toggle provider status:', provider.id);
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMoneyPage;