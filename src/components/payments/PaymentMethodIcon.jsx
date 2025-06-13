import React from 'react';

const PaymentMethodIcon = ({ payment, className = 'w-6 h-6' }) => {
  const getIconPath = () => {
    if (payment.paymentMethodType === 'DIRECT_BANK') {
      return `/assets/logos/banks/${payment.bankName.toLowerCase()}.svg`;
    }
    
    if (payment.paymentMethodType === 'CARD') {
      return `/assets/logos/${payment.card.brand.toLowerCase()}.svg`;
    }
    
    if (payment.paymentMethodType === 'CRYPTO') {
      return `/assets/logos/${payment.currency.toLowerCase()}.svg`;
    }

    const iconMap = {
      DIRECT_BANK: 'bank-transfer.svg',
      PAYPAL: 'paypal.svg',
      APPLEPAY: 'apple-pay.svg',
      GOOGLEPAY: 'google-pay.svg',
      BANKTRANSFER: 'bank-transfer.svg',
      MOBILEMONEY: 'mobile-money.svg'
    };

    return `/assets/logos/${iconMap[payment.paymentMethodType] || 'generic-payment.svg'}`;
  };

  const getIconAlt = () => {
    if (payment.paymentMethodType === 'DIRECT_BANK') {
      return `${payment.bankName} direct payment`;
    }
    
    if (payment.paymentMethodType === 'CARD') {
      return `${payment.card.brand} card`;
    }
    
    if (payment.paymentMethodType === 'CRYPTO') {
      return payment.currency;
    }

    const methodMap = {
      DIRECT_BANK: 'Bank Payment',
      PAYPAL: 'PayPal',
      APPLEPAY: 'Apple Pay',
      GOOGLEPAY: 'Google Pay',
      BANKTRANSFER: 'Bank Transfer',
      MOBILEMONEY: 'Mobile Money'
    };

    return methodMap[payment.paymentMethodType] || 'Payment Method';
  };

  return (
    <img
      src={getIconPath()}
      alt={getIconAlt()}
      className={className}
      onError={(e) => {
        e.target.src = '/assets/logos/generic-payment.svg';
      }}
    />
  );
};

export default PaymentMethodIcon;
