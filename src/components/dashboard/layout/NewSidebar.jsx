import React from 'react';
import { Link } from 'react-router-dom';
import './NewSidebar.css';

const NewSidebar = ({ isCollapsed, activeRoute }) => {
  // Group the navigation items by category
  const navigation = [
    // Overview Group
    { name: 'Dashboard', path: '/dashboard', icon: 'grid', group: 'overview' },
    { name: 'Transactions', path: '/dashboard/transactions', icon: 'repeat', group: 'overview' },
    { name: 'Customers', path: '/dashboard/customers', icon: 'users', group: 'overview' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: 'bar-chart', group: 'overview' },
    
    // Card & Digital Wallets
    { name: 'Card Payments', path: '/dashboard/cards', icon: 'credit-card', description: 'Visa, Mastercard, NFC, Apple Pay', group: 'payments' },
    { name: 'Digital Wallets', path: '/dashboard/digital-wallets', icon: 'wallet', description: 'PayPal, Google Pay, Apple Pay', group: 'payments' },
    { name: 'QR Payments', path: '/dashboard/qr-payments', icon: 'qr-code', description: 'Universal QR Code Solutions' },
    
    // Regional & Mobile Payments
    { name: 'Regional Methods', path: '/dashboard/regional-methods', icon: 'globe', description: 'AliPay, WeChat Pay, Pix', group: 'payments' },
    { name: 'Mobile Money', path: '/dashboard/mobile-money', icon: 'phone', description: 'M-Pesa, MTN, Orange Money', group: 'payments' },
    { name: 'Bank Transfers', path: '/dashboard/bank-transfers', icon: 'bank', description: 'UPI, SEPA, ACH', group: 'payments' },
    
    // Advanced Payment Methods
    { name: 'QR Payments', path: '/dashboard/qr-payments', icon: 'qr-code', description: 'Universal QR Code Solutions', group: 'advanced' },
    { name: 'Crypto Payments', path: '/dashboard/crypto', icon: 'bitcoin', description: 'BTC, ETH, USDT', group: 'advanced' },
    { name: 'Biometric Pay', path: '/dashboard/biometric', icon: 'scan-face', description: 'Face & Gesture Payments', group: 'advanced' },
    
    // Financial Management
    { name: 'Balances', path: '/dashboard/balances', icon: 'wallet' },
    { name: 'Settlements', path: '/dashboard/settlements', icon: 'arrow-down-to-line' },
    { name: 'Global Markets', path: '/dashboard/global-markets', icon: 'globe' },
    
    // Security & Compliance
    { name: 'Multi-ID Search', path: '/dashboard/multi-id-search', icon: 'search' },
    { name: 'Compliance', path: '/dashboard/compliance', icon: 'shield' },
    { name: 'Offline Mode', path: '/dashboard/offline-mode', icon: 'wifi-off' },
    
    // Developer Tools
    { name: 'API Keys', path: '/dashboard/api-keys', icon: 'key' },
    { name: 'Webhooks', path: '/dashboard/webhooks', icon: 'webhook' },
    { name: 'API Explorer', path: '/dashboard/api-explorer', icon: 'terminal' },
    { name: 'SDK Integration', path: '/dashboard/sdk-integration', icon: 'code' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'settings' }
  ];

  return (
    <aside className={`new-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/assets/images/sunny-logo.svg" alt="Sunny" className="sidebar-logo" />
          {!isCollapsed && <span className="logo-text">Sunny Payments</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(
          navigation.reduce((groups, item) => {
            const group = item.group || 'other';
            if (!groups[group]) groups[group] = [];
            groups[group].push(item);
            return groups;
          }, {})
        ).map(([groupName, items]) => (
          <div key={groupName} className="nav-group">
            <div className="nav-group-title">
              {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
            </div>
            {items.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${item.path === activeRoute ? 'active' : ''}`}
                title={item.description}
              >
                <i className={`lucide-icon ${item.icon}`} />
                {!isCollapsed && (
                  <div className="nav-item-content">
                    <span className="nav-item-title">{item.name}</span>
                    {item.description && !isCollapsed && (
                      <span className="nav-item-description">{item.description}</span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default NewSidebar;
