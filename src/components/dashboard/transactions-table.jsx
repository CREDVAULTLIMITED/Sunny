import React from 'react';
import './transactions-table.css';

const TransactionsTable = ({ transactions }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge class based on transaction status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'success':
        return 'status-badge success';
      case 'pending':
        return 'status-badge pending';
      case 'failed':
        return 'status-badge failed';
      default:
        return 'status-badge';
    }
  };

  // Format payment method for display
  const formatPaymentMethod = (method) => {
    return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get payment method icon based on type
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z';
      case 'bank_transfer':
        return 'M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z';
      case 'mobile_money':
        return 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z';
      case 'crypto':
        return 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z';
      case 'apple_pay':
        return 'M17.2 7.73c-.64.27-1.33.42-2.05.42-1.45 0-2.61-.74-3.44-2.23-.83 1.49-1.99 2.23-3.44 2.23-.72 0-1.41-.15-2.05-.42C4.33 8.83 3 10.88 3 13.19 3 16.56 5.54 20 9.5 20c1.46 0 2.5-.5 3.5-1.5 1 1 2.04 1.5 3.5 1.5 3.96 0 6.5-3.44 6.5-6.81 0-2.31-1.33-4.36-5.8-5.46z';
      case 'google_pay':
        return 'M16.51 8.13C15.76 7.55 14.84 7.23 13.7 7.23C11.72 7.23 10.07 8.29 9.31 9.9L12.35 11.9C12.72 10.75 13.42 10.42 14.05 10.42C14.56 10.42 15.04 10.66 15.33 11.02L16.51 8.13ZM8.98 10.15C8.23 10.15 7.63 10.75 7.63 11.5C7.63 12.25 8.23 12.85 8.98 12.85C9.73 12.85 10.33 12.25 10.33 11.5C10.33 10.75 9.73 10.15 8.98 10.15ZM15.52 14.58C14.86 15.84 13.43 16.69 11.72 16.69C9.56 16.69 7.77 15.19 7.33 13.17L4.29 15.17C5.15 17.9 7.95 19.77 11.72 19.77C14.33 19.77 16.67 18.63 18.11 16.69L15.52 14.58Z';
      default:
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z';
    }
  };

  return (
    <div className="transactions-table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="transaction-id">
                  <span className="id-text">{transaction.id}</span>
                </td>
                <td className="customer-name">{transaction.customer.name}</td>
                <td className="transaction-amount">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: transaction.currency
                  }).format(transaction.amount)}
                </td>
                <td className="payment-method">
                  <div className="payment-method-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d={getPaymentMethodIcon(transaction.paymentMethod)} />
                    </svg>
                  </div>
                  <span>{formatPaymentMethod(transaction.paymentMethod)}</span>
                </td>
                <td className="transaction-date">{formatDate(transaction.date)}</td>
                <td className="transaction-status">
                  <span className={getStatusBadgeClass(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-transactions">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;