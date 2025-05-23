import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, StatsDisplay } from '../common';
import { CodeIcon, PlayIcon, DownloadIcon } from '../icons';

const ApiExplorerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const apiStats = {
    endpoints: { label: 'Total Endpoints', value: '48' },
    requests: { label: 'Test Requests', value: '156' },
    success: { label: 'Success Rate', value: '97.4%' },
    avgLatency: { label: 'Avg. Latency', value: '132ms' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">API Explorer</h1>
          <p className="text-gray-600">Test and explore API endpoints</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<PlayIcon />}>
            Test Request
          </Button>
        </div>
      </div>

      <StatsDisplay stats={apiStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search API endpoints..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Endpoints</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Create Payment</h3>
                  <p className="text-sm text-gray-600">POST /v1/payments</p>
                  <Badge variant="success">200 OK</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<PlayIcon />}>
                    Try It
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">List Payments</h3>
                  <p className="text-sm text-gray-600">GET /v1/payments</p>
                  <Badge variant="success">200 OK</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<PlayIcon />}>
                    Try It
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Customer Endpoints</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Create Customer</h3>
                  <p className="text-sm text-gray-600">POST /v1/customers</p>
                  <Badge variant="success">200 OK</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<PlayIcon />}>
                    Try It
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Update Customer</h3>
                  <p className="text-sm text-gray-600">PUT /v1/customers/:id</p>
                  <Badge variant="success">200 OK</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<CodeIcon />}>
                    View Docs
                  </Button>
                  <Button variant="secondary" leftIcon={<PlayIcon />}>
                    Try It
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Request History</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Recent Requests</h3>
                  <p className="text-sm text-gray-600">View and export request logs</p>
                </div>
                <Button variant="secondary" leftIcon={<DownloadIcon />}>
                  Export Logs
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiExplorerPage;
