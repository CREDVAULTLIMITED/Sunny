import React, { useState } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

/**
 * Mobile money payment form component
 */
const MobileMoneyForm = ({
  amount,
  currency,
  onSuccess,
  onError,
  setLoading,
  customer
}) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [formData, setFormData] = useState({
    phoneNumber: customer?.phone || '',
    provider: 'mpesa'
  });
  const [errors, setErrors] = useState({});

  const providers = [
    { value: 'mpesa', label: 'M-Pesa' },
    { value: 'airtel', label: 'Airtel Money' },
    { value: 'mtn', label: 'MTN Mobile Money' },
    { value: 'orange', label: 'Orange Money' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Phone number validation (simple check)
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    // Provider validation
    if (!formData.provider) {
      newErrors.provider = 'Please select a provider';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await sdk.processMobileMoney({
        amount,
        currency,
        provider: formData.provider,
        phoneNumber: formData.phoneNumber,
        reference: `INV-${Date.now().toString().substring(7)}`,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: formData.phoneNumber
        }
      });
      
      if (result.success) {
        onSuccess(result);
      } else {
        onError(result);
      }
    } catch (error) {
      onError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Input.Select
          label="Mobile Money Provider"
          name="provider"
          value={formData.provider}
          onChange={handleInputChange}
          options={providers}
          error={errors.provider}
          required
        />
      </div>
      
      <div className="mb-6">
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="e.g. 254712345678"
          error={errors.phoneNumber}
          helper="Enter your phone number with country code (e.g. 254 for Kenya)"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />
      </div>
      
      <div className="mt-8">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={sdkLoading}
          disabled={sdkLoading || sdkError}
        >
          Pay {currency} {amount}
        </Button>
        
        {sdkError && (
          <p className="mt-2 text-sm text-red-600">{sdkError.message}</p>
        )}
      </div>
      
      <div className="mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                You will receive a prompt on your phone to complete the payment. Please enter your PIN when requested.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MobileMoneyForm;