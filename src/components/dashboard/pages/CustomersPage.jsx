import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Toggle } from '../../common/Toggle';
import { Settings, RefreshCw, Search, UserPlus, Filter, Download } from 'lucide-react';

const CustomersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  // Mock data for customers
  const customers = [
    {
      id: 'cust_001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'active',
      totalSpent: 12500.00,
      lastTransaction: '2025-05-20',
      paymentMethods: ['visa', 'paypal'],
      location: 'US',
      riskScore: 'low',
      segments: ['high-value', 'frequent-buyer']
    },
    {
      id: 'cust_002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'active',
      totalSpent: 8750.50,
      lastTransaction: '2025-05-21',
      paymentMethods: ['mastercard', 'apple_pay'],
      location: 'CA',
      riskScore: 'low',
      segments: ['new-customer']
    },
    {
      id: 'cust_003',
      name: 'Michael Chen',
      email: 'mchen@example.com',
      status: 'active',
      totalSpent: 25000.00,
      lastTransaction: '2025-05-22',
      paymentMethods: ['unionpay', 'alipay', 'wechat'],
      location: 'CN',
      riskScore: 'low',
      segments: ['high-value', 'international']
    },
    {
      id: 'cust_004',
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      status: 'inactive',
      totalSpent: 3200.75,
      lastTransaction: '2025-04-15',
      paymentMethods: ['visa'],
      location: 'GB',
      riskScore: 'medium',
      segments: ['churned']
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || 
                          activeFilters.includes(customer.status);
    return matchesSearch && matchesFilters;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and analyze your customer base
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            icon={<Download size={16} />}
            onClick={() => {}}
          >
            Export Data
          </Button>
          <Button
            variant="primary"
            icon={<UserPlus size={16} />}
            onClick={() => {}}
          >
            Add Customer
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="stats-overview grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <UserPlus className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Customers</p>
                  <h3 className="text-lg font-semibold text-gray-900">1,234</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Today</p>
                  <h3 className="text-lg font-semibold text-gray-900">126</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Retention Rate</p>
                  <h3 className="text-lg font-semibold text-gray-900">85%</h3>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Filter className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Avg. Value</p>
                  <h3 className="text-lg font-semibold text-gray-900">$850</h3>
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
              placeholder="Search customers..."
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
          <p>Loading customers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredCustomers.map(customer => (
            <Card key={customer.id} className="customer-card">
              <div className="method-header flex justify-between items-start p-6">
                <div className="customer-info flex items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-lg mr-4">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <Toggle checked={customer.status === 'active'} />
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="stat">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">{formatCurrency(customer.totalSpent)}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Last Transaction</span>
                    <span className="stat-value">{customer.lastTransaction}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Location</span>
                    <span className="stat-value">{customer.location}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Risk Score</span>
                    <span className={`stat-value ${
                      customer.riskScore === 'low' ? 'text-green-600' :
                      customer.riskScore === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {customer.riskScore.charAt(0).toUpperCase() + customer.riskScore.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">Payment Methods:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {customer.paymentMethods.map(method => (
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
                  <span className="text-sm font-medium text-gray-700">Segments:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {customer.segments.map(segment => (
                      <span 
                        key={segment}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
                  Manage
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<RefreshCw size={14} />}
                >
                  View Activity
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
