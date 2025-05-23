import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { WebhookIcon, PlayIcon, PauseIcon } from '../icons';

const WebhooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const webhookStats = {
    total: { label: 'Total Webhooks', value: '12' },
    delivered: { label: 'Delivered Today', value: '1.2K' },
    success: { label: 'Success Rate', value: '99.9%' },
    avgLatency: { label: 'Avg. Latency', value: '245ms' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Webhooks</h1>
          <p className="text-gray-600">Manage your webhook endpoints and notifications</p>
        </div>
        <Button variant="primary" leftIcon={<WebhookIcon />}>
          Add Endpoint
        </Button>
      </div>

      <StatsDisplay stats={webhookStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search webhooks..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Active Endpoints</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Payment Success</h3>
                  <p className="text-sm text-gray-600">https://api.example.com/webhooks/payments</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<PauseIcon />}>
                    Pause
                  </Button>
                  <Button variant="secondary">Edit</Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Dispute Created</h3>
                  <p className="text-sm text-gray-600">https://api.example.com/webhooks/disputes</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" leftIcon={<PauseIcon />}>
                    Pause
                  </Button>
                  <Button variant="secondary">Edit</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Event Types</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Payment Events</h3>
                  <p className="text-sm text-gray-600">Payment success, failure, refund</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Customer Events</h3>
                  <p className="text-sm text-gray-600">Customer created, updated</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Dispute Events</h3>
                  <p className="text-sm text-gray-600">Dispute created, resolved</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Retry Logic</h3>
                  <p className="text-sm text-gray-600">Configure webhook retry attempts</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Rate Limiting</h3>
                  <p className="text-sm text-gray-600">Set rate limits for webhook delivery</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WebhooksPage;
