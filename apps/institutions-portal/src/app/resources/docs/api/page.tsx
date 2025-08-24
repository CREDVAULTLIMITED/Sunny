import React from 'react';
import DocsLayout from '../../../../components/resources/docs/DocsLayout';

export default function APIReferencePage() {
  return (
    <DocsLayout showSidebar={true} showBreadcrumbs={true}>
      <div className="max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Reference
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Complete API documentation for integrating Sunny Payments into your institution's systems.
          </p>
        </div>

        {/* API Overview */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              API Overview
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Base URL</h3>
                  <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm">
                    https://api.sunnypayments.com/v2
                  </code>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Authentication</h3>
                  <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm">
                    Bearer Token
                  </code>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Content Type</h3>
                  <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm">
                    application/json
                  </code>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Rate Limits</h3>
                  <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm">
                    1000 req/min
                  </code>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Example
            </h2>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`curl -X POST https://api.sunnypayments.com/v2/payments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "KES",
    "payment_method": "mpesa",
    "customer": {
      "phone": "+254700123456",
      "name": "John Doe"
    },
    "description": "Payment for services"
  }'`}
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Core Endpoints
            </h2>
            <div className="space-y-4">
              {[
                {
                  method: 'POST',
                  endpoint: '/payments',
                  description: 'Create a new payment',
                  status: 'Stable'
                },
                {
                  method: 'GET',
                  endpoint: '/payments/{id}',
                  description: 'Retrieve payment details',
                  status: 'Stable'
                },
                {
                  method: 'POST',
                  endpoint: '/payments/{id}/cancel',
                  description: 'Cancel a payment',
                  status: 'Stable'
                },
                {
                  method: 'POST',
                  endpoint: '/webhooks',
                  description: 'Configure webhooks',
                  status: 'Beta'
                }
              ].map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      endpoint.method === 'GET' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-sm text-gray-900 dark:text-white">
                      {endpoint.endpoint}
                    </code>
                    <span className="text-gray-600 dark:text-gray-300">
                      {endpoint.description}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    endpoint.status === 'Stable'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {endpoint.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Previous</p>
              <a href="/resources/docs/getting-started" className="text-blue-600 dark:text-blue-400 hover:underline">
                ← Getting Started
              </a>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
              <a href="/resources/docs/api/auth" className="text-blue-600 dark:text-blue-400 hover:underline">
                Authentication →
              </a>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
