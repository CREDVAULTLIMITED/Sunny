import React, { useState } from 'react';
import { SunnyProvider } from '../../sdk/SunnyReactSDK.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import PaymentMethodSelector from './PaymentMethodSelector.jsx';
import CardPaymentForm from './CardPaymentForm.jsx';
import MobileMoneyForm from './MobileMoneyForm.jsx';
import QRCodePayment from './QRCodePayment.jsx';
import PaymentSummary from './PaymentSummary.jsx';

/**
 * Modern checkout page component
 */
const CheckoutPage = ({
  apiKey,
  merchantId,
  environment = 'sandbox',
  amount = '100.00',
  currency = 'USD',
  description = 'Payment for products',
  customerEmail = '',
  customerName = '',
  onSuccess,
  onError
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: customerName || '',
    email: customerEmail || '',
    phone: ''
  });

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentStatus(null);
  };

  const handlePaymentSuccess = (result) => {
    setPaymentStatus({
      success: true,
      message: 'Payment successful!',
      data: result
    });
    setLoading(false);
    if (onSuccess) onSuccess(result);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus({
      success: false,
      message: error.message || 'Payment failed',
      data: error
    });
    setLoading(false);
    if (onError) onError(error);
  };

  return (
    <SunnyProvider
      apiKey={apiKey}
      merchantId={merchantId}
      environment={environment}
    >
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <Card.Header>
                <Card.Title>Customer Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerInfoChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={handleCustomerInfoChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <Input
                  label="Phone Number"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerInfoChange}
                  placeholder="+1234567890"
                />
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>
                <Card.Title>Payment Method</Card.Title>
              </Card.Header>
              <Card.Body>
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onChange={handlePaymentMethodChange}
                />
                
                <div className="mt-6">
                  {paymentMethod === 'card' && (
                    <CardPaymentForm
                      amount={amount}
                      currency={currency}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      setLoading={setLoading}
                      customer={customer}
                    />
                  )}
                  
                  {paymentMethod === 'mobile_money' && (
                    <MobileMoneyForm
                      amount={amount}
                      currency={currency}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      setLoading={setLoading}
                      customer={customer}
                    />
                  )}
                  
                  {paymentMethod === 'qr_code' && (
                    <QRCodePayment
                      amount={amount}
                      currency={currency}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <PaymentSummary
              amount={amount}
              currency={currency}
              description={description}
              paymentStatus={paymentStatus}
            />
          </div>
        </div>
      </div>
    </SunnyProvider>
  );
};

export default CheckoutPage;