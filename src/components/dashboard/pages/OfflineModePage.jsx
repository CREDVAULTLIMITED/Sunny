import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { WifiOffIcon, SyncIcon, DatabaseIcon } from '../icons';

const OfflineModePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const offlineStats = {
    total: { label: 'Total Offline Txns', value: '523' },
    pending: { label: 'Pending Sync', value: '12' },
    synced: { label: 'Synced Today', value: '156' },
    failed: { label: 'Failed Sync', value: '2' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Offline Mode</h1>
          <p className="text-gray-600">Manage offline payment capabilities</p>
        </div>
        <Button variant="primary" leftIcon={<SyncIcon />}>
          Sync Now
        </Button>
      </div>

      <StatsDisplay stats={offlineStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search offline settings..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Offline Capabilities</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Offline Mode</h3>
                  <p className="text-sm text-gray-600">Enable offline payment processing</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Toggle />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Auto-Sync</h3>
                  <p className="text-sm text-gray-600">Automatically sync when online</p>
                </div>
                <Toggle />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Storage Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Local Storage</h3>
                  <p className="text-sm text-gray-600">Configure offline storage limits</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Data Retention</h3>
                  <p className="text-sm text-gray-600">Set offline data retention period</p>
                </div>
                <Button variant="secondary">Set Period</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Transaction Limits</h3>
                  <p className="text-sm text-gray-600">Set offline transaction limits</p>
                </div>
                <Button variant="secondary">Set Limits</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Encryption</h3>
                  <p className="text-sm text-gray-600">Configure offline data encryption</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Sync Rules</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Sync Schedule</h3>
                  <p className="text-sm text-gray-600">Set automatic sync schedule</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Conflict Resolution</h3>
                  <p className="text-sm text-gray-600">Configure sync conflict handling</p>
                </div>
                <Button variant="secondary">Set Rules</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfflineModePage;
