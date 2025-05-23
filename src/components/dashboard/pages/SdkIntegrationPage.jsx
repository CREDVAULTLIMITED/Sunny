import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, StatsDisplay } from '../common';
import { CodeIcon, DownloadIcon, BookIcon } from '../icons';

const SdkIntegrationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sdkStats = {
    sdks: { label: 'Available SDKs', value: '8' },
    downloads: { label: 'Downloads', value: '25.6K' },
    version: { label: 'Latest Version', value: '2.4.0' },
    clients: { label: 'Active Clients', value: '892' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">SDK Integration</h1>
          <p className="text-gray-600">Integrate Sunny Payment Gateway into your applications</p>
        </div>
        <Button variant="primary" leftIcon={<BookIcon />}>
          View Documentation
        </Button>
      </div>

      <StatsDisplay stats={sdkStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search SDKs and integrations..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Official SDKs</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">JavaScript/Node.js</h3>
                  <p className="text-sm text-gray-600">npm install @sunny-payments/sdk</p>
                  <Badge variant="success">v2.4.0</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Python</h3>
                  <p className="text-sm text-gray-600">pip install sunny-payments</p>
                  <Badge variant="success">v2.4.0</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Java</h3>
                  <p className="text-sm text-gray-600">Maven/Gradle dependency</p>
                  <Badge variant="success">v2.4.0</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Integration Guides</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Quick Start Guide</h3>
                  <p className="text-sm text-gray-600">Get started in 5 minutes</p>
                </div>
                <Button variant="secondary" leftIcon={<BookIcon />}>
                  View Guide
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Mobile Integration</h3>
                  <p className="text-sm text-gray-600">iOS and Android guides</p>
                </div>
                <Button variant="secondary" leftIcon={<BookIcon />}>
                  View Guide
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Server Integration</h3>
                  <p className="text-sm text-gray-600">Backend implementation guides</p>
                </div>
                <Button variant="secondary" leftIcon={<BookIcon />}>
                  View Guide
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Sample Projects</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">E-commerce Integration</h3>
                  <p className="text-sm text-gray-600">Sample online store integration</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Code
                  </Button>
                  <Button variant="secondary" leftIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Subscription Management</h3>
                  <p className="text-sm text-gray-600">Recurring payments example</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Code
                  </Button>
                  <Button variant="secondary" leftIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SdkIntegrationPage;
