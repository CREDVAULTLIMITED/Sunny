import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * QuickStartGuide component
 * Provides a quick start guide for new users
 */
const QuickStartGuide = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Welcome to Sunny',
      description: 'Your all-in-one payment platform for global commerce.',
      content: (
        <div className="welcome-content text-center">
          <div className="welcome-icon mb-4 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Let's get you set up with Sunny in just a few steps. This guide will help you configure your account and start accepting payments quickly.
          </p>
        </div>
      )
    },
    {
      title: 'Set Up Your Business Profile',
      description: 'Complete your business information to get started.',
      content: (
        <div className="business-profile-content">
          <div className="steps-list space-y-4">
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Navigate to Business Settings</h4>
                <p className="text-xs text-gray-600">Go to the Business section in the sidebar menu.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enter Business Details</h4>
                <p className="text-xs text-gray-600">Provide your business name, address, and contact information.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Upload Verification Documents</h4>
                <p className="text-xs text-gray-600">Submit required documents to verify your business identity.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Tip:</span> Having your business registration documents ready will speed up the verification process.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Configure Payment Methods',
      description: 'Choose which payment methods you want to accept.',
      content: (
        <div className="payment-methods-content">
          <div className="steps-list space-y-4">
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Go to Payment Methods</h4>
                <p className="text-xs text-gray-600">Navigate to the Payment Methods section in the sidebar.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Payment Methods</h4>
                <p className="text-xs text-gray-600">Toggle on the payment methods you want to accept (Cards, Mobile Money, Bank Transfers, etc.).</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Configure Settings</h4>
                <p className="text-xs text-gray-600">Set up specific settings for each payment method.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Tip:</span> Start with the payment methods most popular in your target markets.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Set Up Your Bank Account',
      description: 'Connect your bank account to receive payments.',
      content: (
        <div className="bank-account-content">
          <div className="steps-list space-y-4">
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Go to Banking</h4>
                <p className="text-xs text-gray-600">Navigate to the Bank Transfers section in the sidebar.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Add Bank Account</h4>
                <p className="text-xs text-gray-600">Enter your bank account details for receiving settlements.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Verify Account</h4>
                <p className="text-xs text-gray-600">Complete the verification process to ensure secure transfers.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Tip:</span> You can add multiple bank accounts in different currencies for more efficient settlements.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Create Your First Payment Link',
      description: 'Start accepting payments right away with a payment link.',
      content: (
        <div className="payment-link-content">
          <div className="steps-list space-y-4">
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Go to Payment Links</h4>
                <p className="text-xs text-gray-600">Navigate to the Payment Links section.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Create New Link</h4>
                <p className="text-xs text-gray-600">Click on "Create New Link" and enter payment details.</p>
              </div>
            </div>
            
            <div className="step flex">
              <div className="step-number h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Share Your Link</h4>
                <p className="text-xs text-gray-600">Copy and share the generated payment link with your customers.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Tip:</span> Payment links are perfect for social media, email campaigns, or one-time payments.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'You're All Set!',
      description: 'You're ready to start accepting payments with Sunny.',
      content: (
        <div className="completion-content text-center">
          <div className="completion-icon mb-4 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Congratulations! Your Sunny account is now set up and ready to process payments. Explore the dashboard to discover more features and tools to grow your business.
          </p>
          <div className="next-steps mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Next Steps:</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="text-xs bg-white border border-gray-200 rounded-md p-3 text-left hover:bg-gray-50">
                <span className="block font-medium text-gray-900">Explore Analytics</span>
                <span className="text-gray-600">View your payment data</span>
              </button>
              <button className="text-xs bg-white border border-gray-200 rounded-md p-3 text-left hover:bg-gray-50">
                <span className="block font-medium text-gray-900">Set Up Webhooks</span>
                <span className="text-gray-600">For real-time notifications</span>
              </button>
              <button className="text-xs bg-white border border-gray-200 rounded-md p-3 text-left hover:bg-gray-50">
                <span className="block font-medium text-gray-900">Customize Checkout</span>
                <span className="text-gray-600">Brand your payment page</span>
              </button>
              <button className="text-xs bg-white border border-gray-200 rounded-md p-3 text-left hover:bg-gray-50">
                <span className="block font-medium text-gray-900">Invite Team</span>
                <span className="text-gray-600">Add team members</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="quick-start-guide bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full">
      <div className="guide-header bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
        <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
        <p className="text-indigo-100 mt-1">{steps[currentStep].description}</p>
      </div>
      
      <div className="guide-content p-6">
        {steps[currentStep].content}
      </div>
      
      <div className="guide-progress bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
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
          <div className="text-xs text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>
      
      <div className="guide-actions bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between">
        <div>
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Skip
          </button>
          
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

QuickStartGuide.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default QuickStartGuide;