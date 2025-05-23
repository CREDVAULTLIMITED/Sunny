import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { KeyIcon, EyeIcon, CopyIcon } from '../icons';

const ApiKeysPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const apiStats = {
    total: { label: 'Total API Keys', value: '8' },
    active: { label: 'Active Keys', value: '5' },
    requests: { label: 'Requests Today', value: '23.5K' },
    avgLatency: { label: 'Avg. Latency', value: '89ms' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-gray-600">Manage your API keys and access tokens</p>
        </div>
        <Button variant="primary" leftIcon={<KeyIcon />}>
          Generate New Key
        </Button>
      </div>

      <StatsDisplay stats={apiStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search API keys..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Production Keys</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Live API Key</h3>
                  <p className="text-sm text-gray-600">sk_live_*****</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<EyeIcon />}>
                    Reveal
                  </Button>
                  <Button variant="secondary" leftIcon={<CopyIcon />}>
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Webhook Secret</h3>
                  <p className="text-sm text-gray-600">whsec_*****</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<EyeIcon />}>
                    Reveal
                  </Button>
                  <Button variant="secondary" leftIcon={<CopyIcon />}>
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Test Keys</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Test API Key</h3>
                  <p className="text-sm text-gray-600">sk_test_*****</p>
                  <Badge variant="warning">Test Mode</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<EyeIcon />}>
                    Reveal
                  </Button>
                  <Button variant="secondary" leftIcon={<CopyIcon />}>
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">IP Whitelisting</h3>
                  <p className="text-sm text-gray-600">Restrict API access to specific IPs</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Key Rotation</h3>
                  <p className="text-sm text-gray-600">Automatic key rotation schedule</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Toggle />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeysPage;
