import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { SettlementsIcon, FilterIcon, DownloadIcon } from '../icons';

const SettlementsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const settlementStats = {
    total: { label: 'Total Settlements', value: '₦15.2M' },
    pending: { label: 'Pending', value: '₦2.1M' },
    completed: { label: 'Completed Today', value: '₦8.7M' },
    failed: { label: 'Failed', value: '₦450K' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settlements</h1>
          <p className="text-gray-600">Manage and track all settlement transactions</p>
        </div>
        <Button variant="primary" leftIcon={<DownloadIcon />}>
          Download Report
        </Button>
      </div>

      <StatsDisplay stats={settlementStats} />

      <div className="flex gap-4 my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search settlements..."
        />
        <div className="flex gap-2">
          <Button leftIcon={<FilterIcon />} variant="outline">
            Filter
          </Button>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3"
          >
            <option value="all">All Settlements</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Auto-Settlement Rules</h3>
              <p className="text-sm text-gray-600">Configure automatic settlement schedules</p>
            </div>
            <Toggle />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Settlement Accounts</h3>
              <p className="text-sm text-gray-600">Manage your settlement bank accounts</p>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Multi-Currency Settlement</h3>
              <p className="text-sm text-gray-600">Set up settlements in different currencies</p>
              <Badge variant="feature">Premium</Badge>
            </div>
            <Button variant="secondary">Enable</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettlementsPage;
