import React, { useState, useEffect } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';

const ACTION_CATEGORIES = {
  PAYMENTS: 'payments',
  TRANSFERS: 'transfers',
  REPORTS: 'reports',
  SETTINGS: 'settings'
};

const QuickActions = ({ onActionSelect, customActions = [] }) => {
  const { sdk } = useSunny();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [frequentContacts, setFrequentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(ACTION_CATEGORIES.PAYMENTS);

  // Load recent transactions and frequent contacts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Get recent transactions
        const transactionsResponse = await sdk.getRecentTransactions({ limit: 5 });
        setRecentTransactions(transactionsResponse.transactions || []);
        
        // Get frequent contacts
        const contactsResponse = await sdk.getFrequentContacts({ limit: 5 });
        setFrequentContacts(contactsResponse.contacts || []);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load quick action data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [sdk]);

  // Handle action click
  const handleActionClick = (action) => {
    if (onActionSelect && typeof onActionSelect === 'function') {
      onActionSelect(action);
    }
  };

  // Define standard quick actions
  const standardActions = {
    [ACTION_CATEGORIES.PAYMENTS]: [
      {
        id: 'new_payment',
        title: 'New Payment',
        description: 'Create a new payment',
        icon: (
          <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        ),
        action: 'NEW_PAYMENT'
      },
      {
        id: 'request_money',
        title: 'Request Money',
        description: 'Request payment from someone',
        icon: (
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        action: 'REQUEST_MONEY'
      },
      {
        id: 'scan_qr',
        title: 'Scan QR Code',
        description: 'Make payment by scanning QR',
        icon: (
          <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        ),
        action: 'SCAN_QR'
      },
      {
        id: 'schedule_payment',
        title: 'Schedule Payment',
        description: 'Set up a future payment',
        icon: (
          <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        action: 'SCHEDULE_PAYMENT'
      }
    ],
    [ACTION_CATEGORIES.TRANSFERS]: [
      {
        id: 'bank_transfer',
        title: 'Bank Transfer',
        description: 'Transfer to bank account',
        icon: (
          <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        ),
        action: 'BANK_TRANSFER'
      },
      {
        id: 'wallet_transfer',
        title: 'Wallet Transfer',
        description: 'Transfer between wallets',
        icon: (
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        ),
        action: 'WALLET_TRANSFER'
      },
      {
        id: 'international_transfer',
        title: 'International',
        description: 'Send money abroad',
        icon: (
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        action: 'INTERNATIONAL_TRANSFER'
      }
    ],
    [ACTION_CATEGORIES.REPORTS]: [
      {
        id: 'export_transactions',
        title: 'Export Transactions',
        description: 'Download transaction history',
        icon: (
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        action: 'EXPORT_TRANSACTIONS'
      },
      {
        id: 'generate_report',
        title: 'Generate Report',
        description: 'Create custom report',
        icon: (
          <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        action: 'GENERATE_REPORT'
      },
      {
        id: 'tax_documents',
        title: 'Tax Documents',
        description: 'Access tax-related documents',
        icon: (
          <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        action: 'TAX_DOCUMENTS'
      }
    ],
    [ACTION_CATEGORIES.SETTINGS]: [
      {
        id: 'payment_methods',
        title: 'Payment Methods',
        description: 'Manage your payment methods',
        icon: (
          <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        ),
        action: 'MANAGE_PAYMENT_METHODS'
      },
      {
        id: 'security',
        title: 'Security',
        description: 'Security and verification settings',
        icon: (
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        action: 'SECURITY_SETTINGS'
      }
    ]
  };

  // Export transactions function
  const handleExportTransactions = (format) => {
    // In a real implementation, this would call the SDK to export transactions
    console.log(`Exporting transactions in ${format} format`);
    sdk.exportTransactions({ format })
      .then(result => {
        // Handle successful export
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank');
        }
      })
      .catch(error => {
        console.error('Export failed:', error);
      });
  };

  // Render category tabs
  const renderCategoryTabs = () => {
    return (
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="actionCategory" className="sr-only">Select a category</label>
          <select
            id="actionCategory"
            name="actionCategory"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value={ACTION_CATEGORIES.PAYMENTS}>Payments</option>
            <option value={ACTION_CATEGORIES.TRANSFERS}>Transfers</option>
            <option value={ACTION_CATEGORIES.REPORTS}>Reports</option>
            <option value={ACTION_CATEGORIES.SETTINGS}>Settings</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {Object.values(ACTION_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeCategory === category
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  };

  // Render quick action cards
  const renderActionCards = () => {
    const actions = [...(standardActions[activeCategory] || []),

