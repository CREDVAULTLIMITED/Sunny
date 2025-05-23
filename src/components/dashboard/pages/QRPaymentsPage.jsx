import React, { useState } from 'react';
import Card from '../../../ui/components/Card';
import Button from '../../../ui/components/Button';
import { QrCode, Download, Settings } from 'lucide-react';

const QRPaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const qrMethods = [
    {
      name: 'Universal EMV QR',
      description: 'EMV compliant QR codes for global interoperability',
      supportedRegions: ['Global'],
      features: ['Static QR', 'Dynamic QR', 'Single/Multiple Payment', 'Auto Reconciliation']
    },
    {
      name: 'WeChat Pay QR',
      description: 'QR code payments through WeChat platform',
      supportedRegions: ['China', 'Southeast Asia'],
      features: ['In-store QR', 'Web QR', 'Mini Program QR']
    },
    {
      name: 'AliPay QR',
      description: 'Alipay QR code payment solution',
      supportedRegions: ['China', 'Southeast Asia'],
      features: ['Dynamic QR', 'Static QR', 'Cross-border']
    },
    {
      name: 'UPI QR (India)',
      description: 'Unified Payments Interface QR codes',
      supportedRegions: ['India'],
      features: ['BharatQR', 'UPI QR', 'Real-time Settlement']
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">QR Code Payments</h1>
        <p className="text-gray-600">Configure and manage QR code payment solutions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outlined"
                className="flex items-center gap-2"
                onClick={() => {/* Generate QR */}}
              >
                <QrCode size={20} />
                Generate QR
              </Button>
              <Button
                variant="outlined"
                className="flex items-center gap-2"
                onClick={() => {/* Download QRs */}}
              >
                <Download size={20} />
                Download QRs
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>QR Stats</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Total Scans Today</div>
                <div className="text-2xl font-bold">1,234</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-2xl font-bold">98.5%</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>Available QR Payment Methods</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="space-y-6">
            {qrMethods.map((method, index) => (
              <div
                key={method.name}
                className={`p-4 rounded-lg border ${
                  index === 0 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-lg mb-2">{method.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {method.supportedRegions.map(region => (
                        <span
                          key={region}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {method.features.map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    className="flex items-center gap-2 h-10"
                  >
                    <Settings size={16} />
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QRPaymentsPage;
