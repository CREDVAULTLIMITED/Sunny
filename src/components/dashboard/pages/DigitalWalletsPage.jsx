import React, { useState } from 'react';
import { Card } from '../layout/Card';
import '../styles/pages/PaymentMethods.css';
import TransactionVolumeChart from '../charts/TransactionVolumeChart';
import SuccessRateChart from '../charts/SuccessRateChart';
import ProcessingTimeChart from '../charts/ProcessingTimeChart';

const walletMethods = [
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    description: 'Seamless payments with Apple devices',
    status: 'active',
    category: 'digital_wallet',
    successRate: 99.2,
    avgProcessingTime: 0.5,
    fee: '2.9%',
    supportedCountries: ['US', 'CA', 'GB', 'EU', 'AU', 'JP', 'SG'],
    icon: 'M3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm10 7a4 4 0 0 0-4 4v2h-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-1v-2a4 4 0 0 0-4-4z'
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    description: 'Fast checkout with Google Pay',
    status: 'active',
    category: 'digital_wallet',
    successRate: 98.9,
    avgProcessingTime: 0.6,
    fee: '2.9%',
    supportedCountries: ['US', 'CA', 'GB', 'EU', 'AU', 'IN', 'JP', 'SG'],
    icon: 'M7 14H5v5h2v-5zm12-7h-2v7h2V7zm-6 3H11v4h2v-4zm-6 4H5v1h2v-1zM19 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H3V4h16v16z'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    status: 'active', 
    category: 'digital_wallet',
    successRate: 99.1,
    avgProcessingTime: 0.8,
    fee: '3.4%',
    supportedCountries: ['US', 'CA', 'GB', 'DE', 'AU', 'IT', 'ES', 'FR'],
    icon: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z'
  }
];

export default function DigitalWalletsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="payment-methods-page">
      <div className="page-header">
        <h1>Digital Wallets</h1>
        <p>Manage digital wallet payment methods and settings</p>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="methods-grid">
          {walletMethods.map(method => (
            <Card key={method.id} className="method-card">
              <div className="method-header">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={method.icon} />
                  </svg>
                </div>
                <div className="method-title">
                  <h3>{method.name}</h3>
                  <span className={`status-badge ${method.status}`}>{method.status}</span>
                </div>
              </div>
              
              <p className="method-description">{method.description}</p>
              
              <div className="method-stats">
                <div className="stat">
                  <label>Success Rate</label>
                  <span>{method.successRate}%</span>
                </div>
                <div className="stat">
                  <label>Processing Time</label>
                  <span>{method.avgProcessingTime}s</span>
                </div>
                <div className="stat">
                  <label>Fee</label>
                  <span>{method.fee}</span>
                </div>
              </div>

              <div className="method-countries">
                <label>Supported Countries</label>
                <div className="country-tags">
                  {method.supportedCountries.slice(0, 3).map(country => (
                    <span key={country} className="country-tag">{country}</span>
                  ))}
                  {method.supportedCountries.length > 3 && (
                    <span className="country-tag more">
                      +{method.supportedCountries.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="method-actions">
                <button className="btn-configure">Configure</button>
                <button className="btn-view-docs">View Docs</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <Card className="settings-card">
          <h2>Global Wallet Settings</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Default Processing Mode</label>
              <select defaultValue="automatic">
                <option value="automatic">Automatic</option>
                <option value="manual">Manual Review</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Transaction Limits</label>
              <input type="number" placeholder="Min amount" />
              <input type="number" placeholder="Max amount" />
            </div>

            <div className="form-group">
              <label>Security</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  Enable 3D Secure when available
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  Require customer authentication
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save">Save Changes</button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="analytics-card">
            <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
            <TransactionVolumeChart />
          </Card>

          <Card className="analytics-card">
            <h3 className="text-lg font-semibold mb-4">Success Rate</h3>
            <SuccessRateChart />
          </Card>

          <Card className="analytics-card">
            <h3 className="text-lg font-semibold mb-4">Processing Time</h3>
            <ProcessingTimeChart />
          </Card>
        </div>
      )}
    </div>
  );
}
