'use client';

import { useState } from 'react';
import CheckoutHero from '@/components/checkout/CheckoutHero';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import PaymentMethodsSelector from '@/components/checkout/PaymentMethodsSelector';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutSuccess from '@/components/checkout/CheckoutSuccess';

// Note: Since this is a client component, we can't export metadata directly
// The metadata would need to be handled in a layout.tsx or a server component wrapper

interface CheckoutState {
  currentStep: 'information' | 'payment' | 'confirmation';
  completedSteps: string[];
  selectedPaymentMethod: string;
  isProcessing: boolean;
  orderCompleted: boolean;
}

const sampleOrderItems = [
  {
    id: '1',
    name: 'Sunny Payment Gateway - Business Plan',
    description: 'Monthly subscription for payment processing',
    quantity: 1,
    price: 2999, // $29.99
    type: 'subscription' as const
  },
  {
    id: '2', 
    name: 'Kenya Tax Compliance Add-on',
    description: 'KRA integration and eTIMS support',
    quantity: 1,
    price: 1499, // $14.99
    type: 'service' as const
  }
];

export default function CheckoutPage() {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    currentStep: 'information',
    completedSteps: [],
    selectedPaymentMethod: 'card',
    isProcessing: false,
    orderCompleted: false
  });

  const handleStepComplete = (stepId: string) => {
    setCheckoutState(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps.filter(id => id !== stepId), stepId]
    }));
  };

  const handleStepChange = (stepId: string) => {
    if (stepId === 'information' || stepId === 'payment' || stepId === 'confirmation') {
      setCheckoutState(prev => ({
        ...prev,
        currentStep: stepId as 'information' | 'payment' | 'confirmation'
      }));
    }
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setCheckoutState(prev => ({
      ...prev,
      selectedPaymentMethod: methodId
    }));
  };

  const handleProceedToPayment = () => {
    handleStepComplete('information');
    handleStepChange('payment');
  };

  const handleCompleteOrder = () => {
    setCheckoutState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate payment processing
    setTimeout(() => {
      handleStepComplete('payment');
      setCheckoutState(prev => ({
        ...prev,
        currentStep: 'confirmation',
        isProcessing: false,
        orderCompleted: true
      }));
    }, 3000);
  };

  // If order is completed, show success page
  if (checkoutState.orderCompleted) {
    return <CheckoutSuccess />;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <CheckoutHero />
      
      {/* Progress Indicator */}
      <CheckoutProgress
        currentStep={checkoutState.currentStep}
        completedSteps={checkoutState.completedSteps}
        onStepClick={handleStepChange}
        allowNavigation={true}
      />

      {/* Main Checkout Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Information Step */}
              {checkoutState.currentStep === 'information' && (
                <>
                  <CheckoutForm />
                  <div className="flex justify-end">
                    <button
                      onClick={handleProceedToPayment}
                      className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </>
              )}

              {/* Payment Step */}
              {checkoutState.currentStep === 'payment' && (
                <>
                  <PaymentMethodsSelector
                    selectedMethod={checkoutState.selectedPaymentMethod}
                    onMethodSelect={handlePaymentMethodSelect}
                  />
                  
                  {/* Payment Form based on selected method */}
                  {checkoutState.selectedPaymentMethod === 'card' && (
                    <CheckoutForm />
                  )}
                  
                  {/* Digital Wallet Options */}
                  {checkoutState.selectedPaymentMethod === 'digital-wallet' && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Choose Your Wallet
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['PayPal', 'Apple Pay', 'Google Pay'].map((wallet) => (
                          <button
                            key={wallet}
                            className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          >
                            <div className="text-center">
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-2"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {wallet}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Options */}
                  {checkoutState.selectedPaymentMethod === 'bank' && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Bank Transfer Details
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>Processing Time:</strong> 1-3 business days<br />
                            <strong>Fee:</strong> 1.5% + $0.25<br />
                            You will receive bank transfer instructions via email after confirming this order.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Crypto Payment Options */}
                  {checkoutState.selectedPaymentMethod === 'crypto' && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Cryptocurrency Payment
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { name: 'Bitcoin', symbol: 'BTC', color: 'orange' },
                          { name: 'Ethereum', symbol: 'ETH', color: 'blue' },
                          { name: 'USDC', symbol: 'USDC', color: 'green' }
                        ].map((crypto) => (
                          <button
                            key={crypto.symbol}
                            className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          >
                            <div className="text-center">
                              <div className={`w-12 h-12 bg-${crypto.color}-100 dark:bg-${crypto.color}-900/30 rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                                <span className={`text-${crypto.color}-600 dark:text-${crypto.color}-400 font-bold text-lg`}>
                                  {crypto.symbol.substring(0, 1)}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {crypto.name}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {crypto.symbol}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => handleStepChange('information')}
                      className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Back to Information
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      disabled={checkoutState.isProcessing}
                      className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                        checkoutState.isProcessing
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {checkoutState.isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing...
                        </div>
                      ) : (
                        'Complete Order'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary items={sampleOrderItems} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



