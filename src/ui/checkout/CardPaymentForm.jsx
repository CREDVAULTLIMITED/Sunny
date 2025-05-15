import React, { useState } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

/**
 * Card payment form component
 */
const CardPaymentForm = ({
  amount,
  currency,
  onSuccess,
  onError,
  setLoading,
  customer
}) => {
  const { sdk, loading: sdkLoading, error: sdkError } = useSunny();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    holderName: customer?.name || ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
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
    
    // Card number validation (simple length check)
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 15) {
      newErrors.number = 'Please enter a valid card number';
    }
    
    // Expiry month validation
    if (!cardDetails.expMonth || !/^(0[1-9]|1[0-2])$/.test(cardDetails.expMonth)) {
      newErrors.expMonth = 'Enter a valid month (01-12)';
    }
    
    // Expiry year validation
    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of year
    if (!cardDetails.expYear || 
        !/^\d{2}$/.test(cardDetails.expYear) || 
        parseInt(cardDetails.expYear) < currentYear) {
      newErrors.expYear = 'Enter a valid year';
    }
    
    // CVV validation
    if (!cardDetails.cvv || !/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'Enter a valid CVV';
    }
    
    // Cardholder name validation
    if (!cardDetails.holderName || cardDetails.holderName.trim().length < 3) {
      newErrors.holderName = 'Enter the cardholder name';
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
      const result = await sdk.createPayment({
        amount,
        currency,
        paymentMethod: 'card',
        card: {
          number: cardDetails.number.replace(/\s/g, ''),
          expMonth: cardDetails.expMonth,
          expYear: cardDetails.expYear,
          cvv: cardDetails.cvv,
          holderName: cardDetails.holderName
        },
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone
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

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      number: formattedValue
    }));
    
    if (errors.number) {
      setErrors(prev => ({
        ...prev,
        number: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <Input
          label="Card Number"
          name="number"
          value={cardDetails.number}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          error={errors.number}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Input
          label="Expiry Month"
          name="expMonth"
          value={cardDetails.expMonth}
          onChange={handleInputChange}
          placeholder="MM"
          maxLength="2"
          error={errors.expMonth}
          required
        />
        
        <Input
          label="Expiry Year"
          name="expYear"
          value={cardDetails.expYear}
          onChange={handleInputChange}
          placeholder="YY"
          maxLength="2"
          error={errors.expYear}
          required
        />
        
        <Input
          label="CVV"
          name="cvv"
          type="password"
          value={cardDetails.cvv}
          onChange={handleInputChange}
          placeholder="123"
          maxLength="4"
          error={errors.cvv}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <div className="md:col-span-2">
          <Input
            label="Cardholder Name"
            name="holderName"
            value={cardDetails.holderName}
            onChange={handleInputChange}
            placeholder="John Doe"
            error={errors.holderName}
            required
          />
        </div>
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
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Your payment is secure. We use encryption to protect your data.
        </p>
      </div>
    </form>
  );
};

export default CardPaymentForm;