import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * FeatureGuide component for providing contextual help and guidance
 * This component displays interactive help content based on the current section
 */
const FeatureGuide = ({ 
  section, 
  onDismiss,
  showGuide = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(showGuide);
  const [activeStep, setActiveStep] = useState(0);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  // Check local storage on mount to see if user has dismissed this guide before
  useEffect(() => {
    const dismissedGuides = JSON.parse(localStorage.getItem('sunny_dismissed_guides') || '{}');
    if (dismissedGuides[section]) {
      setIsVisible(false);
      setHasSeenGuide(true);
    }
  }, [section]);

  // When section changes, reset the active step and check visibility
  useEffect(() => {
    setActiveStep(0);
    const dismissedGuides = JSON.parse(localStorage.getItem('sunny_dismissed_guides') || '{}');
    setIsVisible(showGuide && !dismissedGuides[section]);
  }, [section, showGuide]);

  const handleDismiss = (dontShowAgain = false) => {
    setIsVisible(false);
    
    if (dontShowAgain) {
      const dismissedGuides = JSON.parse(localStorage.getItem('sunny_dismissed_guides') || '{}');
      dismissedGuides[section] = true;
      localStorage.setItem('sunny_dismissed_guides', JSON.stringify(dismissedGuides));
      setHasSeenGuide(true);
    }
    
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleNextStep = () => {
    const maxSteps = getGuideContent(section).steps.length - 1;
    if (activeStep < maxSteps) {
      setActiveStep(activeStep + 1);
    } else {
      handleDismiss();
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Get guide content based on current section
  const getGuideContent = (section) => {
    const guides = {
      dashboard: {
        title: 'Welcome to Your Dashboard',
        description: 'Your central hub for monitoring payment activity and performance.',
        steps: [
          {
            title: 'Overview',
            content: 'Your dashboard provides a real-time overview of your payment activity, including transaction volume, success rates, and payment methods.',
            image: '/images/dashboard-overview.svg'
          },
          {
            title: 'Key Metrics',
            content: 'Monitor your most important business metrics at a glance, including total transactions, volume, and success rate.',
            image: '/images/dashboard-metrics.svg'
          },
          {
            title: 'Recent Transactions',
            content: 'View your most recent transactions and quickly identify any issues that need attention.',
            image: '/images/dashboard-transactions.svg'
          }
        ]
      },
      transactions: {
        title: 'Transaction Management',
        description: 'View, search, and manage all your payment transactions.',
        steps: [
          {
            title: 'Transaction List',
            content: 'View all your transactions with powerful filtering and search capabilities.',
            image: '/images/transactions-list.svg'
          },
          {
            title: 'Transaction Details',
            content: 'Click on any transaction to view detailed information, including customer data, payment method, and processing history.',
            image: '/images/transaction-details.svg'
          },
          {
            title: 'Actions',
            content: 'Perform actions like refunds, captures, or voids directly from the transaction view.',
            image: '/images/transaction-actions.svg'
          }
        ]
      },
      payments: {
        title: 'Payment Methods',
        description: 'Configure and manage all your payment methods in one place.',
        steps: [
          {
            title: 'Available Methods',
            content: 'Sunny supports a wide range of payment methods including cards, mobile money, bank transfers, and cryptocurrencies.',
            image: '/images/payment-methods.svg'
          },
          {
            title: 'Configuration',
            content: 'Easily enable or disable payment methods and customize settings for each method.',
            image: '/images/payment-config.svg'
          },
          {
            title: 'Smart Routing',
            content: 'Sunny automatically routes payments through the optimal processor based on cost, success rate, and speed.',
            image: '/images/payment-routing.svg'
          }
        ]
      },
      customers: {
        title: 'Customer Management',
        description: 'Manage your customer database and view payment histories.',
        steps: [
          {
            title: 'Customer Profiles',
            content: 'View comprehensive customer profiles with payment preferences and history.',
            image: '/images/customer-profiles.svg'
          },
          {
            title: 'Payment Methods',
            content: 'Securely store customer payment methods for faster checkout experiences.',
            image: '/images/customer-payment-methods.svg'
          },
          {
            title: 'Analytics',
            content: 'Gain insights into customer behavior and preferences to optimize your payment experience.',
            image: '/images/customer-analytics.svg'
          }
        ]
      },
      settings: {
        title: 'Account Settings',
        description: 'Configure your account settings and preferences.',
        steps: [
          {
            title: 'Business Profile',
            content: 'Manage your business information, including legal details and branding.',
            image: '/images/settings-profile.svg'
          },
          {
            title: 'Security',
            content: 'Configure security settings including API keys, webhooks, and authentication methods.',
            image: '/images/settings-security.svg'
          },
          {
            title: 'Notifications',
            content: 'Set up email and webhook notifications for important events.',
            image: '/images/settings-notifications.svg'
          }
        ]
      },
      crypto: {
        title: 'Cryptocurrency Payments',
        description: 'Accept and manage cryptocurrency payments securely.',
        steps: [
          {
            title: 'Supported Cryptocurrencies',
            content: 'Accept payments in Bitcoin, Ethereum, and other major cryptocurrencies with automatic conversion to your preferred currency.',
            image: '/images/crypto-currencies.svg'
          },
          {
            title: 'Wallet Management',
            content: 'Securely manage your crypto wallets and set up automatic conversions to fiat currencies.',
            image: '/images/crypto-wallet.svg'
          },
          {
            title: 'Transaction Flow',
            content: 'Understand how crypto payments flow through the system with blockchain verification and settlement.',
            image: '/images/crypto-flow.svg'
          }
        ]
      },
      banking: {
        title: 'Banking & Transfers',
        description: 'Manage bank accounts and transfers for seamless settlement.',
        steps: [
          {
            title: 'Account Connections',
            content: 'Connect your business bank accounts to receive payments directly.',
            image: '/images/banking-accounts.svg'
          },
          {
            title: 'Settlement Options',
            content: 'Configure how and when funds are transferred to your bank accounts.',
            image: '/images/banking-settlement.svg'
          },
          {
            title: 'Transfer History',
            content: 'View a complete history of all transfers between Sunny and your bank accounts.',
            image: '/images/banking-history.svg'
          }
        ]
      },
      mobileMoney: {
        title: 'Mobile Money',
        description: 'Accept payments through popular mobile money services.',
        steps: [
          {
            title: 'Supported Providers',
            content: 'Connect with major mobile money providers across Africa and Asia, including M-Pesa, MTN, and Airtel.',
            image: '/images/mobile-providers.svg'
          },
          {
            title: 'Integration Flow',
            content: 'Understand how mobile money payments are processed and settled to your account.',
            image: '/images/mobile-flow.svg'
          },
          {
            title: 'Regional Support',
            content: 'View supported regions and currencies for each mobile money provider.',
            image: '/images/mobile-regions.svg'
          }
        ]
      }
    };
    
    return guides[section] || guides.dashboard;
  };

  const guideContent = getGuideContent(section);
  const currentStep = guideContent.steps[activeStep];
  
  if (!isVisible) {
    return hasSeenGuide ? null : (
      <button 
        className="fixed bottom-4 right-4 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-all z-50"
        onClick={() => setIsVisible(true)}
        aria-label="Show guide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className={`feature-guide bg-white rounded-lg shadow-xl overflow-hidden transition-all ${className}`}>
      <div className="feature-guide-header bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{guideContent.title}</h3>
          <p className="text-indigo-100 text-sm">{guideContent.description}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className="text-indigo-100 hover:text-white transition-colors"
            onClick={() => handleDismiss(false)}
            aria-label="Minimize guide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="text-indigo-100 hover:text-white transition-colors"
            onClick={() => handleDismiss(true)}
            aria-label="Close guide and don't show again"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="feature-guide-content p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <div className="bg-indigo-50 rounded-lg p-4 flex items-center justify-center h-48">
              {currentStep.image ? (
                <img 
                  src={currentStep.image} 
                  alt={currentStep.title} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30,40 L70,40 L70,60 L30,60 Z' fill='%23d1d5db'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='8' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="text-indigo-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h4 className="text-lg font-medium text-gray-900 mb-2">{currentStep.title}</h4>
            <p className="text-gray-600 mb-4">{currentStep.content}</p>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex space-x-1">
                {guideContent.steps.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeStep ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                {activeStep > 0 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                <button
                  onClick={handleNextStep}
                  className="px-3 py-1.5 bg-indigo-600 rounded-md text-sm text-white hover:bg-indigo-700 transition-colors"
                >
                  {activeStep < guideContent.steps.length - 1 ? 'Next' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureGuide.propTypes = {
  section: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  showGuide: PropTypes.bool,
  className: PropTypes.string
};

export default FeatureGuide;