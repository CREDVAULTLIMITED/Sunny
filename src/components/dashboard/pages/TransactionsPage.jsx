<search>366|            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={loadTransactions}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Try Again
            </button>
          </div></search>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2

import React, { useState, useEffect, useCallback } from 'react';
import { useSunny } from '../../../sdk/SunnyReactSDK.js';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} Transaction
 * @property {string} id - Transaction ID
 * @property {string} reference - Reference number
 * @property {string} date - Transaction date
 * @property {string} currency - Currency code
 * @property {number} amount - Transaction amount
 * @property {string} paymentMethod - Payment method used
 * @property {string} status - Transaction status
 * @property {string} [type] - Transaction type (payment, refund, chargeback)
 * @property {Object} [customer] - Customer information
 * @property {Object} [metadata] - Additional transaction metadata
 */

/**
 * Modal component to display transaction details
 * @param {Object} props - Component props
 * @param {Transaction} props.transaction - Transaction data to display
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing the modal
 */
const TransactionDetailModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Reference</p>
              <p className="mt-1 text-sm text-gray-900">{transaction.reference}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="mt-1 text-sm text-gray-900">{new Date(transaction.date).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="mt-1 text-sm text-gray-900">{transaction.currency} {transaction.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Method</p>
              <p className="mt-1 text-sm text-gray-900">{transaction.paymentMethod}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1 text-sm text-gray-900">{transaction.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Transaction Type</p>
              <p className="mt-1 text-sm text-gray-900">{transaction.type || 'Payment'}</p>
            </div>
          </div>
          
          {transaction.customer && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium text-gray-900 mb-2">Customer Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-sm text-gray-900">{transaction.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{transaction.customer.email}</p>
                </div>
              </div>
            </div>
          )}
          
          {transaction.metadata && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium text-gray-900 mb-2">Additional Information</h4>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <pre className="whitespace-pre-wrap">{JSON.stringify(transaction.metadata, null, 2)}</pre>
              </div>
            </div>
          )}
          
          <div className="mt-5 border-t pt-4 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Close
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionDetailModal.propTypes = {
  transaction: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * Date range picker component
 * @param {Object} props - Component props
 * @param {Date} props.startDate - Start date
 * @param {Date} props.endDate - End date
 * @param {Function} props.onStartDateChange - Start date change handler
 * @param {Function} props.onEndDateChange - End date change handler
 */
const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <div>
        <label htmlFor="start-date" className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={(e) => onStartDateChange(new Date(e.target.value))}
          className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
        <input
          type="date"
          id="end-date"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={(e) => onEndDateChange(new Date(e.target.value))}
          className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
};

const TransactionsPage = () => {
  const { sdk } = useSunny();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, [statusFilter, typeFilter, page, startDate, endDate, retryCount]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      setErrorDetails('');
      
      const params = { 
        page,
        limit: 10,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(typeFilter !== 'all' && { type: typeFilter }),
        ...(startDate && { startDate: startDate.toISOString() }),
        ...(endDate && { endDate: endDate.toISOString() })
      };
      
      const data = await sdk.getTransactions(params);
      
      if (!data || !Array.isArray(data.transactions)) {
        throw new Error('Invalid response format from API');
      }
      
      setTransactions(data.transactions);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Transaction loading error:', err);
      setError('Failed to load transactions');
      setErrorDetails(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const exportTransactions = async () => {
    try {
      // Prepare filters for export
      const exportParams = {};
      
      if (statusFilter !== 'all') {
        exportParams.status = statusFilter;
      }
      
      if (typeFilter !== 'all') {
        exportParams.type = typeFilter;
      }
      
      if (startDate) {
        exportParams.startDate = startDate.toISOString();
      }
      
      if (endDate) {
        exportParams.endDate = endDate.toISOString();
      }
      
      // Call SDK export method
      const blob = await sdk.exportTransactions(exportParams);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `transactions-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export transactions');
      setErrorDetails(err.message || 'Unknown error occurred during export');
    }
  };
  
  const viewTransactionDetails = async (transactionId) => {
    try {
      setDetailLoading(true);
      setError(null);
      setErrorDetails('');
      
      const transactionDetails = await sdk.getTransactionDetails(transactionId);
      setSelectedTransaction(transactionDetails);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Transaction detail error:', err);
      setError('Failed to load transaction details');
      setErrorDetails(err.message || 'Unknown error occurred while fetching details');
    } finally {
      setDetailLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const handleRetry = useCallback(() => {
    setRetryCount(prevCount => prevCount + 1);
  }, []);

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-9xl mx-auto">
      {/* Transaction Detail Modal */}
      <TransactionDetailModal 
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Transactions</h1>
          <p className="text-sm text-gray-600">View and manage your payment history</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={exportTransactions}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button
            onClick={loadTransactions}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="payment">Payment</option>
            <option value="refund">Refund</option>
            <option value="chargeback">Chargeback</option>
          </select>
        </div>
        
        {/* Date Range Picker */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search by reference or payment method..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <div className="font-medium">{error}</div>
              {errorDetails && (
                <div className="text-sm mt-1">{errorDetails}</div>
              )}
            </div>
            <button
              onClick={handleRetry}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Try Again
            </button>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-500 mb-4">No transactions found</div>
            <p className="text-sm text-gray-400">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.currency} {transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => viewTransactionDetails(transaction.id)}
                        disabled={detailLoading}
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                      >
                        {detailLoading && selectedTransaction && selectedTransaction.id === transaction.id ? 
                          'Loading...' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{page}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
