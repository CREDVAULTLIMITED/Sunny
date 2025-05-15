import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * FeatureIntroduction component for providing contextual help
 * Shows an introduction panel for different features in the application
 */
const FeatureIntroduction = ({ 
  section,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if this guide has been dismissed before
  useEffect(() => {
    const dismissedGuides = JSON.parse(localStorage.getItem('sunny_dismissed_guides') || '{}');
    if (dismissedGuides[section]) {
      setIsVisible(false);
    }
  }, [section]);

  const handleDismiss = (dontShowAgain = false) => {
    setIsVisible(false);
    
    if (dontShowAgain) {
      const dismissedGuides = JSON.parse(localStorage.getItem('sunny_dismissed_guides') || '{}');
      dismissedGuides[section] = true;
      localStorage.setItem('sunny_dismissed_guides', JSON.stringify(dismissedGuides));
    }
    
    if (onDismiss) {
      onDismiss();
    }
  };

  // Content for different sections
  const getIntroContent = () => {
    const content = {
      dashboard: {
        title: 'Welcome to Your Dashboard',
        description: 'Your central hub for monitoring payment activity and performance.',
        features: [
          { icon: 'chart', text: 'Monitor real-time transaction metrics' },
          { icon: 'money', text: 'Track payment volumes across methods' },
          { icon: 'alert', text: 'Get alerted about unusual activity' }
        ]
      },
      balances: {
        title: 'Account Balances',
        description: 'Monitor your available funds across all currencies and payment methods.',
        features: [
          { icon: 'money', text: 'Real-time balance updates' },
          { icon: 'currency', text: 'Multi-currency support' },
          { icon: 'transfer', text: 'Easy transfers between accounts' }
        ]
      },
      transactions: {
        title: 'Transaction Management',
        description: 'View, search, and manage all your payment transactions.',
        features: [
          { icon: 'search', text: 'Search and filter transactions' },
          { icon: 'details', text: 'View detailed transaction information' },
          { icon: 'refund', text: 'Process refunds and disputes' }
        ]
      },
      paymentMethods: {
        title: 'Payment Methods',
        description: 'Configure and manage all your payment methods in one place.',
        features: [
          { icon: 'card', text: 'Accept credit and debit cards' },
          { icon: 'mobile', text: 'Enable mobile money payments' },
          { icon: 'bank', text: 'Set up bank transfers' }
        ]
      },
      mobileMoney: {
        title: 'Mobile Money',
        description: 'Accept payments through popular mobile money services.',
        features: [
          { icon: 'mobile', text: 'Support for M-Pesa, MTN, Airtel' },
          { icon: 'globe', text: 'Coverage across Africa and Asia' },
          { icon: 'instant', text: 'Instant payment notifications' }
        ]
      },
      bankTransfers: {
        title: 'Bank Transfers',
        description: 'Process direct bank transfers and wire payments.',
        features: [
          { icon: 'bank', text: 'Support for ACH, SEPA, and wire transfers' },
          { icon: 'globe', text: 'International payment routing' },
          { icon: 'shield', text: 'Secure account verification' }
        ]
      },
      crypto: {
        title: 'Cryptocurrency Payments',
        description: 'Accept and manage cryptocurrency payments securely.',
        features: [
          { icon: 'bitcoin', text: 'Accept major cryptocurrencies' },
          { icon: 'exchange', text: 'Automatic conversion to fiat' },
          { icon: 'security', text: 'Secure blockchain verification' }
        ]
      },
      cards: {
        title: 'Card Payments',
        description: 'Process credit and debit card payments securely.',
        features: [
          { icon: 'card', text: 'Support for all major card networks' },
          { icon: 'security', text: 'PCI-compliant processing' },
          { icon: 'recurring', text: 'Saved cards and recurring billing' }
        ]
      },
      business: {
        title: 'Business Management',
        description: 'Manage your business profile and settings.',
        features: [
          { icon: 'building', text: 'Business profile management' },
          { icon: 'users', text: 'Team member access controls' },
          { icon: 'document', text: 'Business verification documents' }
        ]
      },
      customers: {
        title: 'Customer Management',
        description: 'Manage your customer database and payment methods.',
        features: [
          { icon: 'users', text: 'Customer profiles and history' },
          { icon: 'card', text: 'Saved payment methods' },
          { icon: 'tag', text: 'Customer segmentation and tagging' }
        ]
      },
      globalMarkets: {
        title: 'Global Markets',
        description: 'Expand your business globally with localized payment options.',
        features: [
          { icon: 'globe', text: 'Region-specific payment methods' },
          { icon: 'currency', text: 'Multi-currency processing' },
          { icon: 'translate', text: 'Localized checkout experiences' }
        ]
      },
      reports: {
        title: 'Financial Reports',
        description: 'Access detailed reports and analytics for your business.',
        features: [
          { icon: 'chart', text: 'Transaction and revenue reports' },
          { icon: 'download', text: 'Export data in multiple formats' },
          { icon: 'calendar', text: 'Scheduled report delivery' }
        ]
      },
      settlements: {
        title: 'Settlement Management',
        description: 'Manage how and when funds are settled to your accounts.',
        features: [
          { icon: 'calendar', text: 'Customizable settlement schedules' },
          { icon: 'bank', text: 'Multiple settlement accounts' },
          { icon: 'currency', text: 'Multi-currency settlement options' }
        ]
      },
      compliance: {
        title: 'Compliance & Risk',
        description: 'Tools to help you meet regulatory requirements and manage risk.',
        features: [
          { icon: 'shield', text: 'Fraud prevention tools' },
          { icon: 'document', text: 'Regulatory compliance assistance' },
          { icon: 'alert', text: 'Transaction monitoring and reporting' }
        ]
      },
      settings: {
        title: 'Account Settings',
        description: 'Configure your account settings and preferences.',
        features: [
          { icon: 'user', text: 'User profile management' },
          { icon: 'bell', text: 'Notification preferences' },
          { icon: 'lock', text: 'Security settings' }
        ]
      },
      advancedFeatures: {
        title: 'Advanced Features',
        description: 'Cutting-edge payment technologies for your business.',
        features: [
          { icon: 'star', text: 'Access to beta features' },
          { icon: 'puzzle', text: 'Custom integration options' },
          { icon: 'lightning', text: 'High-performance processing' }
        ]
      },
      gestureFacePay: {
        title: 'Gesture & Face Pay',
        description: 'Next-generation biometric payment solutions.',
        features: [
          { icon: 'face', text: 'Facial recognition payments' },
          { icon: 'hand', text: 'Gesture-based authentication' },
          { icon: 'security', text: 'Advanced biometric security' }
        ]
      },
      offlineMode: {
        title: 'Offline Payment Mode',
        description: 'Accept payments even without internet connectivity.',
        features: [
          { icon: 'wifi-off', text: 'Process payments offline' },
          { icon: 'sync', text: 'Automatic syncing when back online' },
          { icon: 'shield', text: 'Secure offline transaction storage' }
        ]
      },
      multiIdSearch: {
        title: 'Multi-ID Search',
        description: 'Advanced search capabilities across multiple identifiers.',
        features: [
          { icon: 'search', text: 'Search across multiple parameters' },
          { icon: 'fingerprint', text: 'Biometric and ID matching' },
          { icon: 'database', text: 'Cross-reference multiple databases' }
        ]
      },
      developers: {
        title: 'Developer Tools',
        description: 'Resources and tools for integrating with Sunny.',
        features: [
          { icon: 'code', text: 'API documentation and guides' },
          { icon: 'puzzle', text: 'SDKs for multiple platforms' },
          { icon: 'terminal', text: 'Command-line interface tools' }
        ]
      },
      apiKeys: {
        title: 'API Key Management',
        description: 'Create and manage API keys for your integrations.',
        features: [
          { icon: 'key', text: 'Generate and revoke API keys' },
          { icon: 'lock', text: 'Set permissions and access controls' },
          { icon: 'eye', text: 'Monitor API key usage' }
        ]
      },
      webhooks: {
        title: 'Webhook Management',
        description: 'Configure webhooks to receive real-time event notifications.',
        features: [
          { icon: 'bell', text: 'Real-time event notifications' },
          { icon: 'refresh', text: 'Automatic retry mechanisms' },
          { icon: 'list', text: 'Detailed event logs' }
        ]
      },
      apiExplorer: {
        title: 'API Explorer',
        description: 'Interactive tool to test and explore the Sunny API.',
        features: [
          { icon: 'play', text: 'Test API endpoints directly' },
          { icon: 'code', text: 'Generate code snippets' },
          { icon: 'document', text: 'Interactive API documentation' }
        ]
      },
      sdkIntegration: {
        title: 'SDK Integration',
        description: 'Tools and resources for integrating Sunny SDKs.',
        features: [
          { icon: 'puzzle', text: 'SDKs for web, mobile, and server' },
          { icon: 'book', text: 'Comprehensive integration guides' },
          { icon: 'code', text: 'Sample applications and code' }
        ]
      },
      testTools: {
        title: 'Testing Tools',
        description: 'Tools to test your Sunny integration before going live.',
        features: [
          { icon: 'beaker', text: 'Sandbox testing environment' },
          { icon: 'card', text: 'Test card numbers and accounts' },
          { icon: 'check', text: 'Integration validation tools' }
        ]
      },
      usageMetrics: {
        title: 'API Usage Metrics',
        description: 'Monitor and analyze your API usage and performance.',
        features: [
          { icon: 'chart', text: 'API call volume and patterns' },
          { icon: 'clock', text: 'Response time monitoring' },
          { icon: 'alert', text: 'Usage alerts and notifications' }
        ]
      }
    };
    
    return content[section] || content.dashboard;
  };

  // Get the appropriate icon based on the icon name
  const getIcon = (iconName) => {
    const icons = {
      chart: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      money: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      alert: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      search: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      ),
      details: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      refund: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
        </svg>
      ),
      card: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      mobile: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      bank: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8h14a1 1 0 00.496-1.868l-7-4zM3 9a1 1 0 00-1 1v6a1 1 0 001 1h14a1 1 0 001-1v-6a1 1 0 00-1-1H3zm14 2a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-4 0a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-4 0a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-4 0a1 1 0 10-2 0v3a1 1 0 102 0v-3z" clipRule="evenodd" />
        </svg>
      ),
      bitcoin: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2 0a2 2 0 100 4h16a2 2 0 100-4H2z M4 8a1 1 0 100 2h12a1 1 0 100-2H4z M6 15a1 1 0 100 2h8a1 1 0 100-2H6z" />
        </svg>
      ),
      exchange: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      ),
      security: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      transfer: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
        </svg>
      ),
      report: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
        </svg>
      ),
      globe: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      ),
      instant: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    };
    
    return icons[iconName] || icons.chart;
  };

  const content = getIntroContent();
  
  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 border border-indigo-100">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-indigo-900">{content.title}</h3>
            <p className="mt-1 text-sm text-indigo-700">{content.description}</p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDismiss(false)}
              className="text-indigo-400 hover:text-indigo-600 transition-colors"
              aria-label="Minimize"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => handleDismiss(true)}
              className="text-indigo-400 hover:text-indigo-600 transition-colors"
              aria-label="Close and don't show again"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {content.features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center p-3 bg-white rounded-md shadow-sm border border-indigo-50 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                {getIcon(feature.icon)}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-700">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => handleDismiss(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

FeatureIntroduction.propTypes = {
  section: PropTypes.string.isRequired,
  onDismiss: PropTypes.func
};

export default FeatureIntroduction;