import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SectionHelp component
 * Provides contextual help for each section of the application
 */
const SectionHelp = ({ section, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get content for the current section
  const getSectionContent = () => {
    const content = {
      dashboard: {
        title: 'Dashboard',
        description: 'Your central hub for monitoring payment activity and performance.',
        tabs: ['overview', 'features', 'tips'],
        content: {
          overview: {
            title: 'Dashboard Overview',
            description: 'The dashboard provides a real-time overview of your payment activity, including transaction volume, success rates, and payment methods.',
            image: '/images/dashboard-overview.svg'
          },
          features: {
            title: 'Key Features',
            items: [
              'Real-time transaction monitoring',
              'Payment method distribution',
              'Success rate tracking',
              'Recent transaction list',
              'Quick access to common actions'
            ]
          },
          tips: {
            title: 'Tips & Tricks',
            items: [
              'Use the date range selector to view data for specific periods',
              'Click on any chart to view detailed information',
              'Set up custom alerts for important metrics',
              'Export dashboard data for reporting'
            ]
          }
        }
      },
      balances: {
        title: 'Balances',
        description: 'Monitor your available funds across all currencies and payment methods.',
        tabs: ['overview', 'features', 'tips'],
        content: {
          overview: {
            title: 'Balances Overview',
            description: 'The balances section shows your available funds across different currencies and payment methods, with real-time updates as transactions occur.',
            image: '/images/balances-overview.svg'
          },
          features: {
            title: 'Key Features',
            items: [
              'Multi-currency balance tracking',
              'Available vs. pending funds',
              'Balance history charts',
              'Currency conversion tools',
              'Low balance alerts'
            ]
          },
          tips: {
            title: 'Tips & Tricks',
            items: [
              'Set up automatic currency conversion for optimal rates',
              'Use the transfer tool to move funds between balances',
              'Export balance history for accounting purposes',
              'Configure minimum balance notifications'
            ]
          }
        }
      },
      transactions: {
        title: 'Transactions',
        description: 'View, search, and manage all your payment transactions.',
        tabs: ['overview', 'features', 'tips'],
        content: {
          overview: {
            title: 'Transactions Overview',
            description: 'The transactions section allows you to view, search, and manage all payment transactions processed through your account.',
            image: '/images/transactions-overview.svg'
          },
          features: {
            title: 'Key Features',
            items: [
              'Advanced search and filtering',
              'Detailed transaction information',
              'Refund and dispute management',
              'Bulk actions for multiple transactions',
              'Transaction export options'
            ]
          },
          tips: {
            title: 'Tips & Tricks',
            items: [
              'Use saved filters for frequently used searches',
              'Set up webhook notifications for transaction events',
              'Check the timeline for transaction status history',
              'Use transaction references for easy reconciliation'
            ]
          }
        }
      },
      paymentMethods: {
        title: 'Payment Methods',
        description: 'Configure and manage all your payment methods in one place.',
        tabs: ['overview', 'features', 'tips'],
        content: {
          overview: {
            title: 'Payment Methods Overview',
            description: 'The payment methods section allows you to enable, configure, and manage all the ways your customers can pay you.',
            image: '/images/payment-methods-overview.svg'
          },
          features: {
            title: 'Key Features',
            items: [
              'Enable/disable payment methods',
              'Configure processing settings',
              'Set payment method priorities',
              'View method-specific performance metrics',
              'Smart routing configuration'
            ]
          },
          tips: {
            title: 'Tips & Tricks',
            items: [
              'Enable local payment methods for international customers',
              'Use A/B testing to optimize payment method display',
              'Configure fallback payment methods for higher success rates',
              'Review performance metrics to identify optimization opportunities'
            ]
          }
        }
      },
      mobileMoney: {
        title: 'Mobile Money',
        description: 'Accept payments through popular mobile money services.',
        tabs: ['overview', 'features', 'tips'],
        content: {
          overview: {
            title: 'Mobile Money Overview',
            description: 'Mobile money allows you to accept payments from customers using services like M-Pesa, MTN Mobile Money, and other popular mobile wallet providers.',
            image: '/images/mobile-money-overview.svg'
          },
          features: {
            title: 'Key Features',
            items: [
              'Support for major mobile money providers',
              'Real-time payment notifications',
              'Automated reconciliation',
              'QR code payment options',
              'Cross-border mobile money transfers'
            ]
          },
          tips: {
            title: 'Tips & Tricks',
            items: [
              'Use dynamic QR codes for variable payment amounts',
              'Enable push notifications for faster checkout',
              'Set up automatic receipt generation',
              'Configure settlement preferences for each provider'
            ]
          }
        }
      }
    };
    
    // Add more sections as needed
    
    return content[section] || content.dashboard;
  };
  
  const sectionContent = getSectionContent();
  const activeContent = sectionContent.content[activeTab];
  
  return (
    <div className="section-help bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="section-help-header bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{sectionContent.title}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close help"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-indigo-100 mt-1">{sectionContent.description}</p>
      </div>
      
      <div className="section-help-tabs border-b border-gray-200">
        <nav className="flex -mb-px">
          {sectionContent.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-4 px-6 font-medium text-sm border-b-2 transition-colors
                ${activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="section-help-content p-6">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="overview-image bg-gray-50 rounded-lg p-4 flex items-center justify-center h-64 border border-gray-200">
              {activeContent.image ? (
                <img 
                  src={activeContent.image} 
                  alt={activeContent.title} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30,40 L70,40 L70,60 L30,60 Z' fill='%23d1d5db'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='8' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'features' && (
          <div className="features-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <ul className="space-y-3">
              {activeContent.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'tips' && (
          <div className="tips-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <ul className="space-y-3">
              {activeContent.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="section-help-footer bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

SectionHelp.propTypes = {
  section: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SectionHelp;