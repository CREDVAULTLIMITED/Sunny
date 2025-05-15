import React, { useState, useEffect } from 'react';
import './PaymentMethodsPage.css';

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        // For now, we'll simulate the data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockPaymentMethods = [
          {
            id: 'card',
            name: 'Credit & Debit Cards',
            description: 'Accept Visa, Mastercard, Amex and more',
            status: 'active',
            category: 'standard',
            successRate: 97.5,
            avgProcessingTime: 1.2,
            fee: '2.9% + $0.30',
            supportedCountries: ['US', 'CA', 'GB', 'EU', 'AU', 'IN', 'JP', 'SG'],
            icon: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z'
          },
          {
            id: 'bank_transfer',
            name: 'Bank Transfers',
            description: 'ACH, SEPA, Wire and local bank transfers',
            status: 'active',
            category: 'standard',
            successRate: 99.1,
            avgProcessingTime: 24,
            fee: '0.8% (capped at $5)',
            supportedCountries: ['US', 'CA', 'GB', 'EU', 'AU', 'IN', 'JP', 'SG'],
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
            id: 'crypto',
            name: 'Cryptocurrency',
            description: 'Bitcoin, Ethereum and other major cryptocurrencies',
            status: 'active',
            category: 'advanced',
            successRate: 99.5,
            avgProcessingTime: 10,
            fee: '1%',
            supportedCountries: ['global'],
            icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z'
          },
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
            icon: 'M17.2 7.73c-.64.27-1.33.42-2.05.42-1.45 0-2.61-.74-3.44-2.23-.83 1.49-1.99 2.23-3.44 2.23-.72 0-1.41-.15-2.05-.42C4.33 8.83 3 10.88 3 13.19 3 16.56 5.54 20 9.5 20c1.46 0 2.5-.5 3.5-1.5 1 1 2.04 1.5 3.5 1.5 3.96 0 6.5-3.44 6.5-6.81 0-2.31-1.33-4.36-5.8-5.46z'
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
            icon: 'M16.51 8.13C15.76 7.55 14.84 7.23 13.7 7.23C11.72 7.23 10.07 8.29 9.31 9.9L12.35 11.9C12.72 10.75 13.42 10.42 14.05 10.42C14.56 10.42 15.04 10.66 15.33 11.02L16.51 8.13ZM8.98 10.15C8.23 10.15 7.63 10.75 7.63 11.5C7.63 12.25 8.23 12.85 8.98 12.85C9.73 12.85 10.33 12.25 10.33 11.5C10.33 10.75 9.73 10.15 8.98 10.15ZM15.52 14.58C14.86 15.84 13.43 16.69 11.72 16.69C9.56 16.69 7.77 15.19 7.33 13.17L4.29 15.17C5.15 17.9 7.95 19.77 11.72 19.77C14.33 19.77 16.67 18.63 18.11 16.69L15.52 14.58Z'
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
            icon: 'M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z'
          },
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
            id: 'offline_qr',
            name: 'Offline QR',
            description: 'QR codes that work without internet connection',
            status: 'active',
            category: 'advanced',
            successRate: 97.8,
            avgProcessingTime: 1.5,
            fee: '2.0%',
            supportedCountries: ['global'],
            icon: 'M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2v-2zm0 4h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2v-2z'
          },
          {
            id: 'biometric',
            name: 'Biometric Payments',
            description: 'Authenticate payments with fingerprint or face recognition',
            status: 'beta',
            category: 'advanced',
            successRate: 96.5,
            avgProcessingTime: 0.7,
            fee: '3.0%',
            supportedCountries: ['US', 'CA', 'GB', 'EU', 'AU', 'SG'],
            icon: 'M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z'
          },
          {
            id: 'gesture',
            name: 'Gesture Pay',
            description: 'Pay with hand gestures using device camera',
            status: 'beta',
            category: 'advanced',
            successRate: 94.2,
            avgProcessingTime: 1.2,
            fee: '3.5%',
            supportedCountries: ['US', 'CA', 'GB', 'EU'],
            icon: 'M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z'
          }
        ];
        
        setPaymentMethods(mockPaymentMethods);
        setError(null);
      } catch (err) {
        console.error('Error fetching payment methods:', err);
        setError('Failed to load payment methods. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const filteredMethods = paymentMethods.filter(method => {
    if (activeTab === 'all') return true;
    return method.category === activeTab;
  });

  return (
    <div className="payment-methods-page">
      <div className="page-header">
        <h1>Payment Methods</h1>
        <p className="page-description">
          Configure and manage all payment methods available to your customers
        </p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="method-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Methods
        </button>
        <button 
          className={`tab-button ${activeTab === 'standard' ? 'active' : ''}`}
          onClick={() => setActiveTab('standard')}
        >
          Standard
        </button>
        <button 
          className={`tab-button ${activeTab === 'digital_wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('digital_wallet')}
        >
          Digital Wallets
        </button>
        <button 
          className={`tab-button ${activeTab === 'regional' ? 'active' : ''}`}
          onClick={() => setActiveTab('regional')}
        >
          Regional
        </button>
        <button 
          className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </button>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading payment methods...</p>
        </div>
      ) : (
        <div className="payment-methods-grid">
          {filteredMethods.map(method => (
            <div key={method.id} className="payment-method-card">
              <div className="method-header">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d={method.icon} />
                  </svg>
                </div>
                <div className="method-title">
                  <h3>{method.name}</h3>
                  <span className={`method-status ${method.status}`}>
                    {method.status === 'active' ? 'Active' : 'Beta'}
                  </span>
                </div>
              </div>
              <p className="method-description">{method.description}</p>
              <div className="method-stats">
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">{method.successRate}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg. Time</span>
                  <span className="stat-value">
                    {method.avgProcessingTime < 1 
                      ? `${(method.avgProcessingTime * 1000).toFixed(0)}ms` 
                      : `${method.avgProcessingTime}s`}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Fee</span>
                  <span className="stat-value">{method.fee}</span>
                </div>
              </div>
              <div className="method-countries">
                <span className="countries-label">Available in:</span>
                <div className="country-list">
                  {method.supportedCountries[0] === 'global' ? (
                    <span className="global-badge">Global</span>
                  ) : (
                    method.supportedCountries.slice(0, 5).map(country => (
                      <span key={country} className="country-badge">{country}</span>
                    ))
                  )}
                  {method.supportedCountries.length > 5 && method.supportedCountries[0] !== 'global' && (
                    <span className="country-badge more">+{method.supportedCountries.length - 5}</span>
                  )}
                </div>
              </div>
              <div className="method-actions">
                <button className="configure-button">Configure</button>
                <button className="view-button">View Docs</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsPage;