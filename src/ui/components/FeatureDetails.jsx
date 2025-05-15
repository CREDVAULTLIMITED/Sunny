import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * FeatureDetails component
 * Provides detailed information about specific features with a modern, interactive UI
 */
const FeatureDetails = ({ feature, className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Feature content based on the selected feature
  const getFeatureContent = () => {
    const features = {
      crypto: {
        title: 'Cryptocurrency Payments',
        description: 'Accept and manage cryptocurrency payments with automatic conversion to fiat currencies.',
        tabs: ['overview', 'setup', 'currencies', 'security'],
        content: {
          overview: {
            title: 'Crypto Payment Overview',
            description: 'Sunny allows you to accept payments in major cryptocurrencies with seamless conversion to your preferred currency.',
            keyPoints: [
              'Accept Bitcoin, Ethereum, and other major cryptocurrencies',
              'Automatic conversion to your preferred fiat currency',
              'Real-time exchange rates with minimal spread',
              'Secure blockchain verification for all transactions'
            ]
          },
          setup: {
            title: 'Setting Up Crypto Payments',
            description: 'Get started with cryptocurrency payments in just a few steps.',
            steps: [
              {
                title: 'Enable Crypto Payments',
                description: 'Go to Payment Methods and enable cryptocurrency payments.'
              },
              {
                title: 'Configure Conversion Settings',
                description: 'Choose whether to keep payments in crypto or automatically convert to fiat.'
              },
              {
                title: 'Set Up Wallet',
                description: 'Connect your existing wallet or create a new one through Sunny.'
              },
              {
                title: 'Add to Checkout',
                description: 'Crypto payment option will automatically appear in your checkout flow.'
              }
            ]
          },
          currencies: {
            title: 'Supported Cryptocurrencies',
            description: 'Sunny supports a wide range of cryptocurrencies for payment processing.',
            list: [
              { name: 'Bitcoin (BTC)', icon: 'bitcoin' },
              { name: 'Ethereum (ETH)', icon: 'ethereum' },
              { name: 'USD Coin (USDC)', icon: 'usdc' },
              { name: 'Litecoin (LTC)', icon: 'litecoin' },
              { name: 'Bitcoin Cash (BCH)', icon: 'bitcoinCash' },
              { name: 'Ripple (XRP)', icon: 'ripple' }
            ]
          },
          security: {
            title: 'Security Measures',
            description: 'Sunny implements multiple security layers to protect your cryptocurrency transactions.',
            measures: [
              {
                title: 'Blockchain Verification',
                description: 'All transactions are verified on their respective blockchains.'
              },
              {
                title: 'Multi-signature Wallets',
                description: 'Enterprise-grade security with multi-signature requirements.'
              },
              {
                title: 'Cold Storage',
                description: 'Majority of funds are stored in offline cold storage.'
              },
              {
                title: 'Insurance Coverage',
                description: 'Digital assets are covered by insurance against theft and security breaches.'
              }
            ]
          }
        }
      },
      banking: {
        title: 'Banking & Transfers',
        description: 'Manage bank accounts and transfers for seamless settlement.',
        tabs: ['overview', 'accounts', 'transfers', 'reports'],
        content: {
          overview: {
            title: 'Banking Overview',
            description: 'Connect your bank accounts to Sunny for seamless fund transfers and settlements.',
            keyPoints: [
              'Connect multiple bank accounts across different currencies',
              'Automatic or manual settlement options',
              'Real-time transfer notifications',
              'Detailed settlement reports and reconciliation'
            ]
          },
          accounts: {
            title: 'Bank Account Management',
            description: 'Securely connect and manage your business bank accounts.',
            steps: [
              {
                title: 'Add Bank Account',
                description: 'Connect your business bank accounts through our secure portal.'
              },
              {
                title: 'Verify Account',
                description: 'Complete the verification process with micro-deposits or instant verification.'
              },
              {
                title: 'Set as Default',
                description: 'Choose your primary account for settlements.'
              },
              {
                title: 'Configure Routing',
                description: 'Set up rules for routing different payment types to specific accounts.'
              }
            ]
          },
          transfers: {
            title: 'Transfer Options',
            description: 'Customize how and when funds are transferred to your bank accounts.',
            options: [
              {
                title: 'Automatic Daily Settlement',
                description: 'Funds are automatically transferred to your bank account daily.'
              },
              {
                title: 'Weekly Settlement',
                description: 'Funds are settled once per week on your chosen day.'
              },
              {
                title: 'Monthly Settlement',
                description: 'All funds are settled once per month.'
              },
              {
                title: 'Manual Settlement',
                description: 'Initiate transfers manually whenever you want.'
              },
              {
                title: 'Threshold-based Settlement',
                description: 'Funds are transferred automatically when they reach a specified amount.'
              }
            ]
          },
          reports: {
            title: 'Banking Reports',
            description: 'Comprehensive reports for all your banking activities.',
            reportTypes: [
              {
                title: 'Settlement Reports',
                description: 'Detailed reports of all settlements to your bank accounts.'
              },
              {
                title: 'Reconciliation Reports',
                description: 'Match transactions with bank statements for easy reconciliation.'
              },
              {
                title: 'Fee Reports',
                description: 'Breakdown of all fees charged for transfers and currency conversions.'
              },
              {
                title: 'Currency Exchange Reports',
                description: 'Details of all currency exchanges performed during settlements.'
              }
            ]
          }
        }
      },
      mobileMoney: {
        title: 'Mobile Money',
        description: 'Accept payments through popular mobile money services across Africa and Asia.',
        tabs: ['overview', 'providers', 'integration', 'regions'],
        content: {
          overview: {
            title: 'Mobile Money Overview',
            description: 'Tap into the growing mobile money ecosystem across emerging markets.',
            keyPoints: [
              'Connect with major mobile money providers like M-Pesa, MTN, and Airtel',
              'Reach customers in regions with limited banking infrastructure',
              'Instant payment notifications',
              'Seamless integration with your existing checkout flow'
            ]
          },
          providers: {
            title: 'Supported Providers',
            description: 'Sunny integrates with leading mobile money providers worldwide.',
            list: [
              { name: 'M-Pesa', regions: 'Kenya, Tanzania, DRC, Mozambique', icon: 'mpesa' },
              { name: 'MTN Mobile Money', regions: 'Ghana, Uganda, Rwanda', icon: 'mtn' },
              { name: 'Airtel Money', regions: 'Kenya, Uganda, Tanzania, Rwanda', icon: 'airtel' },
              { name: 'Orange Money', regions: 'West Africa, Madagascar', icon: 'orange' },
              { name: 'EcoCash', regions: 'Zimbabwe', icon: 'ecocash' },
              { name: 'GCash', regions: 'Philippines', icon: 'gcash' },
              { name: 'Paytm', regions: 'India', icon: 'paytm' }
            ]
          },
          integration: {
            title: 'Integration Process',
            description: 'Quickly integrate mobile money payments into your platform.',
            steps: [
              {
                title: 'Enable Mobile Money',
                description: 'Activate mobile money in your Sunny dashboard.'
              },
              {
                title: 'Select Providers',
                description: 'Choose which mobile money providers you want to accept.'
              },
              {
                title: 'Configure Settings',
                description: 'Set up notification preferences and settlement options.'
              },
              {
                title: 'Test Integration',
                description: 'Use test credentials to ensure everything works correctly.'
              },
              {
                title: 'Go Live',
                description: 'Switch to production mode and start accepting mobile money payments.'
              }
            ]
          },
          regions: {
            title: 'Regional Coverage',
            description: 'Mobile money coverage across different regions.',
            regions: [
              {
                name: 'East Africa',
                countries: 'Kenya, Tanzania, Uganda, Rwanda',
                providers: 'M-Pesa, Airtel Money, MTN Mobile Money',
                penetration: 'High (>70% of population)'
              },
              {
                name: 'West Africa',
                countries: 'Ghana, Nigeria, Senegal, Côte d\'Ivoire',
                providers: 'MTN Mobile Money, Orange Money, Airtel Money',
                penetration: 'Medium (30-50% of population)'
              },
              {
                name: 'Southern Africa',
                countries: 'South Africa, Zimbabwe, Mozambique',
                providers: 'EcoCash, M-Pesa, MTN Mobile Money',
                penetration: 'Medium (20-40% of population)'
              },
              {
                name: 'South Asia',
                countries: 'India, Bangladesh, Pakistan',
                providers: 'Paytm, bKash, JazzCash',
                penetration: 'Growing (15-30% of population)'
              },
              {
                name: 'Southeast Asia',
                countries: 'Philippines, Indonesia, Vietnam',
                providers: 'GCash, GoPay, Momo',
                penetration: 'Growing (10-25% of population)'
              }
            ]
          }
        }
      }
    };
    
    return features[feature] || features.crypto;
  };
  
  const featureContent = getFeatureContent();
  const activeContent = featureContent.content[activeTab];
  
  return (
    <div className={`feature-details ${className}`}>
      <div className="feature-header mb-6">
        <h2 className="text-xl font-bold text-gray-900">{featureContent.title}</h2>
        <p className="text-gray-600 mt-1">{featureContent.description}</p>
      </div>
      
      <div className="feature-tabs border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {featureContent.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
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
      
      <div className="feature-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="key-points bg-indigo-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-indigo-800 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {activeContent.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'setup' && (
          <div className="setup-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="setup-steps">
              {activeContent.steps.map((step, index) => (
                <div key={index} className="step-item mb-4 flex">
                  <div className="step-number h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="step-content">
                    <h4 className="text-md font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'currencies' && (
          <div className="currencies-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeContent.list.map((currency, index) => (
                <div key={index} className="currency-item bg-white rounded-lg border border-gray-200 p-4 flex items-center">
                  <div className="currency-icon h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    {/* Placeholder for currency icon */}
                    <span className="text-gray-500 font-medium">{currency.icon.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="currency-name text-gray-900 font-medium">{currency.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="security-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="security-measures space-y-4">
              {activeContent.measures.map((measure, index) => (
                <div key={index} className="measure-item bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-1">{measure.title}</h4>
                  <p className="text-sm text-gray-600">{measure.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'accounts' && (
          <div className="accounts-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="setup-steps">
              {activeContent.steps.map((step, index) => (
                <div key={index} className="step-item mb-4 flex">
                  <div className="step-number h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="step-content">
                    <h4 className="text-md font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'transfers' && (
          <div className="transfers-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="transfer-options space-y-4">
              {activeContent.options.map((option, index) => (
                <div key={index} className="option-item bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-1">{option.title}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="reports-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="report-types grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeContent.reportTypes.map((report, index) => (
                <div key={index} className="report-item bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-1">{report.title}</h4>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'providers' && (
          <div className="providers-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="providers-list space-y-4">
              {activeContent.list.map((provider, index) => (
                <div key={index} className="provider-item bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center">
                  <div className="provider-icon h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 mb-2 sm:mb-0">
                    <span className="text-gray-500 font-medium">{provider.icon.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="provider-info">
                    <h4 className="text-md font-medium text-gray-900">{provider.name}</h4>
                    <p className="text-sm text-gray-600">Regions: {provider.regions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'integration' && (
          <div className="integration-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="integration-steps">
              {activeContent.steps.map((step, index) => (
                <div key={index} className="step-item mb-4 flex">
                  <div className="step-number h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="step-content">
                    <h4 className="text-md font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'regions' && (
          <div className="regions-content">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{activeContent.title}</h3>
            <p className="text-gray-600 mb-6">{activeContent.description}</p>
            
            <div className="regions-list space-y-6">
              {activeContent.regions.map((region, index) => (
                <div key={index} className="region-item bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-2">{region.name}</h4>
                  <div className="region-details space-y-1 text-sm">
                    <p><span className="font-medium text-gray-700">Countries:</span> <span className="text-gray-600">{region.countries}</span></p>
                    <p><span className="font-medium text-gray-700">Providers:</span> <span className="text-gray-600">{region.providers}</span></p>
                    <p><span className="font-medium text-gray-700">Penetration:</span> <span className="text-gray-600">{region.penetration}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

FeatureDetails.propTypes = {
  feature: PropTypes.oneOf(['crypto', 'banking', 'mobileMoney']).isRequired,
  className: PropTypes.string
};

export default FeatureDetails;