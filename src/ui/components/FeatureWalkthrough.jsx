import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * FeatureWalkthrough component
 * Provides step-by-step guidance for using specific features
 */
const FeatureWalkthrough = ({ feature, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWalkthrough, setShowWalkthrough] = useState(true);
  
  // Check if user has completed this walkthrough before
  useEffect(() => {
    const completedWalkthroughs = JSON.parse(localStorage.getItem('sunny_completed_walkthroughs') || '{}');
    if (completedWalkthroughs[feature]) {
      setShowWalkthrough(false);
      if (onSkip) onSkip();
    }
  }, [feature, onSkip]);
  
  // Get walkthrough steps for the current feature
  const getWalkthroughSteps = () => {
    const walkthroughs = {
      crypto: [
        {
          title: 'Enable Cryptocurrency Payments',
          description: 'First, enable cryptocurrency payments in your account settings.',
          target: '#enable-crypto',
          position: 'bottom'
        },
        {
          title: 'Select Cryptocurrencies',
          description: 'Choose which cryptocurrencies you want to accept.',
          target: '#select-currencies',
          position: 'right'
        },
        {
          title: 'Configure Wallet',
          description: 'Connect your existing wallet or create a new one through Sunny.',
          target: '#configure-wallet',
          position: 'top'
        },
        {
          title: 'Set Conversion Preferences',
          description: 'Choose whether to keep payments in crypto or automatically convert to fiat.',
          target: '#conversion-settings',
          position: 'left'
        },
        {
          title: 'Add to Checkout',
          description: 'Crypto payment option will automatically appear in your checkout flow.',
          target: '#checkout-preview',
          position: 'bottom'
        }
      ],
      mobileMoney: [
        {
          title: 'Enable Mobile Money',
          description: 'Start by enabling mobile money payments in your account.',
          target: '#enable-mobile-money',
          position: 'bottom'
        },
        {
          title: 'Select Providers',
          description: 'Choose which mobile money providers you want to accept.',
          target: '#select-providers',
          position: 'right'
        },
        {
          title: 'Configure Settings',
          description: 'Set up notification preferences and settlement options.',
          target: '#mobile-settings',
          position: 'top'
        },
        {
          title: 'Test Integration',
          description: 'Use test credentials to ensure everything works correctly.',
          target: '#test-mobile',
          position: 'left'
        },
        {
          title: 'Go Live',
          description: 'Switch to production mode and start accepting mobile money payments.',
          target: '#go-live',
          position: 'bottom'
        }
      ],
      bankTransfers: [
        {
          title: 'Enable Bank Transfers',
          description: 'Start by enabling bank transfers in your payment methods.',
          target: '#enable-bank-transfers',
          position: 'bottom'
        },
        {
          title: 'Configure Bank Details',
          description: 'Enter your bank account details for receiving payments.',
          target: '#bank-details',
          position: 'right'
        },
        {
          title: 'Set Up Verification',
          description: 'Configure how you want to verify incoming transfers.',
          target: '#verification-settings',
          position: 'top'
        },
        {
          title: 'Create Payment Instructions',
          description: 'Set up the payment instructions your customers will see.',
          target: '#payment-instructions',
          position: 'left'
        },
        {
          title: 'Test Bank Transfer',
          description: 'Make a test transfer to ensure everything is working correctly.',
          target: '#test-transfer',
          position: 'bottom'
        }
      ]
    };
    
    return walkthroughs[feature] || [];
  };
  
  const steps = getWalkthroughSteps();
  const currentStepData = steps[currentStep];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    // Mark this walkthrough as completed
    const completedWalkthroughs = JSON.parse(localStorage.getItem('sunny_completed_walkthroughs') || '{}');
    completedWalkthroughs[feature] = true;
    localStorage.setItem('sunny_completed_walkthroughs', JSON.stringify(completedWalkthroughs));
    
    setShowWalkthrough(false);
    if (onComplete) onComplete();
  };
  
  const handleSkip = () => {
    setShowWalkthrough(false);
    if (onSkip) onSkip();
  };
  
  if (!showWalkthrough || steps.length === 0) {
    return null;
  }
  
  return (
    <div className="feature-walkthrough-overlay fixed inset-0 z-50 pointer-events-none">
      <div 
        className={`walkthrough-tooltip pointer-events-auto absolute bg-white rounded-lg shadow-xl border border-indigo-100 w-80 p-4 ${currentStepData.position}`}
        style={{
          // Position would be calculated based on target element in a real implementation
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="walkthrough-header mb-3">
          <h3 className="text-lg font-medium text-gray-900">{currentStepData.title}</h3>
          <p className="text-sm text-gray-600">{currentStepData.description}</p>
        </div>
        
        <div className="walkthrough-progress mb-4">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentStep ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="walkthrough-actions flex justify-between">
          <div>
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Previous
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip
            </button>
            
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700"
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureWalkthrough.propTypes = {
  feature: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
  onSkip: PropTypes.func
};

export default FeatureWalkthrough;