import React, { useState, useEffect } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';

// Step definitions
const TRANSACTION_STEPS = {
  AMOUNT: 0,
  PAYMENT_METHOD: 1,
  CONFIRMATION: 2,
  PROCESSING: 3,
  RESULT: 4
};

const TransactionFlow = ({ onComplete, onCancel, initialData = {} }) => {
  const { sdk } = useSunny();
  
  // Transaction state
  const [currentStep, setCurrentStep] = useState(TRANSACTION_STEPS.AMOUNT);
  const [transactionData, setTransactionData] = useState({
    amount: initialData.amount || '',
    currency: initialData.currency || 'USD',
    description: initialData.description || '',
    recipient: initialData.recipient || null,
    paymentMethod: initialData.paymentMethod || null,
    ...initialData
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [statusPollingInterval, setStatusPollingInterval] = useState(null);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (statusPollingInterval) {
        clearInterval(statusPollingInterval);
      }
    };
  }, [statusPollingInterval]);

  // Navigate to next step
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Update transaction data
  const updateTransactionData = (key, value) => {
    setTransactionData(prev => ({ ...prev, [key]: value }));
  };

  // Start the transaction
  const startTransaction = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create transaction in backend
      const result = await sdk.createTransaction({
        amount: parseFloat(transactionData.amount),
        currency: transactionData.currency,
        paymentMethod: transactionData.paymentMethod.id,
        description: transactionData.description,
        metadata: {
          recipientId: transactionData.recipient?.id,
          recipientType: transactionData.recipient?.type
        }
      });
      
      setTransactionId(result.transactionId);
      setTransactionStatus(result.status);
      
      // Set up polling for transaction status updates
      const interval = setInterval(async () => {
        try {
          const statusResult = await sdk.getTransactionStatus(result.transactionId);
          setTransactionStatus(statusResult.status);
          
          // If transaction is in a final state, stop polling
          if (['COMPLETED', 'FAILED', 'EXPIRED', 'CANCELLED'].includes(statusResult.status)) {
            clearInterval(interval);
            setStatusPollingInterval(null);
            
            // If completed, move to final step
            if (statusResult.status === 'COMPLETED') {
              setCurrentStep(TRANSACTION_STEPS.RESULT);
            }
          }
        } catch (error) {
          console.error('Failed to poll transaction status:', error);
        }
      }, 3000); // Poll every 3 seconds
      
      setStatusPollingInterval(interval);
      nextStep(); // Move to processing step
      
    } catch (error) {
      console.error('Transaction failed:', error);
      setError(error.message || 'Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = [
      { label: 'Amount', step: TRANSACTION_STEPS.AMOUNT },
      { label: 'Payment', step: TRANSACTION_STEPS.PAYMENT_METHOD },
      { label: 'Confirm', step: TRANSACTION_STEPS.CONFIRMATION },
      { label: 'Process', step: TRANSACTION_STEPS.PROCESSING },
      { label: 'Result', step: TRANSACTION_STEPS.RESULT }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between w-full">
          {steps.map((step, index) => {
            const isActive = currentStep === step.step;
            const isCompleted = currentStep > step.step;
            
            return (
              <div key={index} className="flex flex-col items-center relative">
                {/* Connector line before */}
                {index > 0 && (
                  <div 
                    className={`absolute left-0 top-3 h-0.5 w-10 -ml-10 ${
                      isCompleted || (isActive && index > 0) ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
                
                {/* Step circle */}
                <div 
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium 
                    ${isActive 
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-100' 
                      : isCompleted 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {isCompleted ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Step label */}
                <span className={`mt-2 text-xs font-medium ${
                  isActive ? 'text-indigo-600' : isCompleted ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render amount step
  const renderAmountStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{transactionData.currency === 'USD' ? '$' : ''}</span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              name="amount"
              id="amount"
              value={transactionData.amount}
              onChange={(e) => updateTransactionData('amount', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              aria-describedby="amount-currency"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="amount-currency">
                {transactionData.currency}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={transactionData.currency}
            onChange={(e) => updateTransactionData('currency', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="KES">KES - Kenyan Shilling</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={transactionData.description}
            onChange={(e) => updateTransactionData('description', e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Payment for invoice #1234"
          />
        </div>
      </div>
    );
  };

  // Placeholder for payment method step
  // In reality, you would use the PaymentMethodSelector component here
  const renderPaymentMethodStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Choose a Payment Method</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a payment method that's appropriate for this transaction.
          </p>
        </div>
        
        <div className="space-y-4">
          {/* This is just a placeholder - you would normally use your PaymentMethodSelector component */}
          {['UPI', 'Credit Card', 'Pix', 'M-Pesa', 'QR Code'].map((method, index) => (
            <div 
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                transactionData.paymentMethod && transactionData.paymentMethod.name === method
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => updateTransactionData('paymentMethod', { id: method.toLowerCase().replace(' ', '_'), name: method })}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">{method.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{method}</h4>
                  <p className="text-sm text-gray-500">Pay using {method}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render confirmation step
  const renderConfirmationStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Confirm Transaction</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please review the transaction details before proceeding.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="text-sm font-medium">{transactionData.currency} {parseFloat(transactionData.amount).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Payment Method:</span>
            <span className="text-sm font-medium">{transactionData.paymentMethod?.name}</span>
          </div>
          
          {transactionData.description && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Description:</span>
              <span className="text-sm font-medium">{transactionData.description}</span>
            </div>
          )}
          
          {transactionData.recipient && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Recipient:</span>
              <span className="text-sm font-medium">{transactionData.recipient.name}</span>
            </div>
          )}
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render processing step with live updates
  const renderProcessingStep = () => {
    return (
      <div className="space-y-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            

