import React, { useState } from 'react';
import { Card } from '../layout/Card';
import '../styles/pages/PaymentMethods.css';

const regionalMethods = [
  {
    id: 'alipay',
    name: 'Alipay',
    description: 'Popular payment method in China',
    status: 'active',
    category: 'regional',
    successRate: 99.4,
    avgProcessingTime: 0.4,
    fee: '2.5%',
    supportedCountries: ['CN', 'HK', 'SG', 'JP'],
    icon: 'M7 21h10v-1H7v1zM7 3v1h10V3H7z M17 6H7v12h10V6z M16 11V9h-2v2h-2v2h2v2h2v-2h2v-2h-2z'
  },
  {
    id: 'upi',
    name: 'UPI',
    description: 'Unified Payments Interface for Indian customers',
    status: 'active',
    category: 'regional',
    successRate: 99.3,
    avgProcessingTime: 0.3,
    fee: '1.5%',
    supportedCountries: ['IN'],
    icon: 'M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z'
  },
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    description: 'M-Pesa, MTN, Airtel and other mobile wallets',
    status: 'active',
    category: 'regional',
    successRate: 98.3,
    avgProcessingTime: 0.8,
    fee: '3.5%',
    supportedCountries: ['KE', 'GH', 'TZ', 'UG', 'RW', 'NG', 'ZA'],
    icon: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z'
  },
  {
    id: 'pix',
    name: 'Pix',
    description: 'Instant payment system in Brazil',
    status: 'active',
    category: 'regional',
    successRate: 99.1,
    avgProcessingTime: 0.2,
    fee: '1.0%',
    supportedCountries: ['BR'],
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
  }
];

export default function RegionalMethodsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = {
    all: 'All Regions',
    asia: 'Asia Pacific',
    africa: 'Africa',
    latam: 'Latin America',
    europe: 'Europe'
  };

  const getMethodsByRegion = () => {
    if (selectedRegion === 'all') return regionalMethods;
    
    const regionMapping = {
      asia: ['CN', 'HK', 'SG', 'JP', 'IN'],
      africa: ['KE', 'GH', 'TZ', 'UG', 'RW', 'NG', 'ZA'],
      latam: ['BR', 'MX', 'AR', 'CL', 'CO'],
      europe: ['EU', 'GB', 'DE', 'FR', 'IT', 'ES']
    };

    return regionalMethods.filter(method => 
      method.supportedCountries.some(country => 
        regionMapping[selectedRegion].includes(country)
      )
    );
  };

  return (
    <div className="payment-methods-page">
      <div className="page-header">
        <h1>Regional Payment Methods</h1>
        <p>Manage region-specific payment methods and settings</p>
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
        <>
          <div className="region-selector">
            {Object.entries(regions).map(([key, label]) => (
              <button
                key={key}
                className={`region-btn ${selectedRegion === key ? 'active' : ''}`}
                onClick={() => setSelectedRegion(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="methods-grid">
            {getMethodsByRegion().map(method => (
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
                    {method.supportedCountries.map(country => (
                      <span key={country} className="country-tag">{country}</span>
                    ))}
                  </div>
                </div>

                <div className="method-actions">
                  <button className="btn-configure">Configure</button>
                  <button className="btn-view-docs">View Docs</button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <Card className="settings-card">
          <h2>Regional Settings</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Default Region</label>
              <select defaultValue="auto">
                <option value="auto">Auto-detect</option>
                {Object.entries(regions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Currency Settings</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  Auto-convert to local currency
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  Display prices in both local and base currency
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Compliance</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  Enable regional compliance checks
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  Collect region-specific KYC data
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
        <div className="analytics-grid">
          <Card className="analytics-card">
            <h3>Regional Distribution</h3>
            <div className="chart-placeholder">
              Transaction distribution by region chart will be displayed here
            </div>
          </Card>

          <Card className="analytics-card">
            <h3>Method Usage</h3>
            <div className="chart-placeholder">
              Payment method usage by region chart will be displayed here
            </div>
          </Card>

          <Card className="analytics-card">
            <h3>Success Rates</h3>
            <div className="chart-placeholder">
              Regional success rates chart will be displayed here
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
