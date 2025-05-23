import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, StatsDisplay } from '../common';
import { SearchIcon, FilterIcon, DownloadIcon } from '../icons';

const MultiIdSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchStats = {
    total: { label: 'Total Searches', value: '2,345' },
    uniqueIds: { label: 'Unique IDs', value: '1,567' },
    success: { label: 'Success Rate', value: '98.2%' },
    avgTime: { label: 'Avg. Search Time', value: '0.3s' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Multi-ID Search</h1>
          <p className="text-gray-600">Search across multiple identification methods</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<FilterIcon />}>
            Filters
          </Button>
          <Button variant="primary" leftIcon={<SearchIcon />}>
            New Search
          </Button>
        </div>
      </div>

      <StatsDisplay stats={searchStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by any ID (Phone, Email, Account, Business ID)..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Search Methods</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Phone Number Search</h3>
                  <p className="text-sm text-gray-600">Search by customer phone numbers</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Email Search</h3>
                  <p className="text-sm text-gray-600">Search by customer email addresses</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Business ID Search</h3>
                  <p className="text-sm text-gray-600">Search by business registration numbers</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Advanced Features</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Fuzzy Matching</h3>
                  <p className="text-sm text-gray-600">Enable approximate string matching</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Cross-Reference</h3>
                  <p className="text-sm text-gray-600">Search across multiple databases</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
            <div className="grid gap-4">
              <Button variant="secondary" leftIcon={<DownloadIcon />}>
                Export Search History
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MultiIdSearchPage;
