import React from 'react';

const PaymentStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      SUCCESS: {
        backgroundColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: '✓',
        label: 'Successful'
      },
      PENDING: {
        backgroundColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: '⌛',
        label: 'Pending'
      },
      FAILED: {
        backgroundColor: 'bg-red-100',
        textColor: 'text-red-800',
        icon: '✕',
        label: 'Failed'
      },
      REFUNDED: {
        backgroundColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        icon: '↺',
        label: 'Refunded'
      },
      CANCELLED: {
        backgroundColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        icon: '⊘',
        label: 'Cancelled'
      },
      EXPIRED: {
        backgroundColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        icon: '⏰',
        label: 'Expired'
      }
    };

    return configs[status] || configs.PENDING;
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full ${config.backgroundColor} ${config.textColor}`}>
      <span className="text-sm mr-1">{config.icon}</span>
      <span className="text-sm font-medium">{config.label}</span>
    </span>
  );
};

export default PaymentStatusBadge;
