import React, { useState, useEffect, useCallback } from 'react';
import { useSunny } from '../../../sdk/SunnyReactSDK.js';

interface Transaction {
  id: string;
  reference: string;
  date: string;
  currency: string;
  amount: number;
  paymentMethod: string;
  status: string;
  customer?: {
    name: string;
    email: string;
  };
  metadata?: Record<string, any>;
  type?: string;
}

interface TransactionFilters {
  status: string;
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  searchQuery: string;
}

const ModernTransactionsPage: React.FC = () => {
  const { sdk } = useSunny();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    status: 'all',
    type: 'all',
    startDate: null,
    endDate: null,
    searchQuery: '',
  });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions with current filters
  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit: 10,
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.type !== 'all' && { type: filters.type }),
        ...(filters.startDate && { startDate: filters.startDate.toISOString() }),
        ...(filters.endDate && { endDate: filters.endDate.toISOString() })
      };

      const data = await sdk.getTransactions(params);
      setTransactions(data.transactions);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [sdk, page, filters]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      pending: 'bg-amber-50 text-amber-700 border-amber-100',
      failed: 'bg-rose-50 text-rose-700 border-rose-100'
    };

    const baseStyle = 'px-3 py-1 text-xs font-medium rounded-full border';
    return (
      <span className={`${baseStyle} ${styles[status.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
        {status}
      </span>
    );
  };

  // Filter section
  const FilterSection = () => (
    <div className="mb-8 bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setFilters({
            status: 'all',
            type: 'all',
            startDate: null,
            endDate: null,
            searchQuery: ''
          })}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="payment">Payment</option>
            <option value="refund">Refund</option>
            <option value="chargeback">Chargeback</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value ? new Date(e.target.value) : null }))}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value ? new Date(e.target.value) : null }))}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // Transaction details modal
  const TransactionModal: React.FC<{ transaction: Transaction | null; onClose: () => void }> = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
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
                  <p className="mt-1 text-sm text-gray-900">
                    {transaction.currency} {transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">
                    <StatusBadge status={transaction.status} />
                  </div>
                </div>
              </div>

              {transaction.customer && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
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
                </div>
              )}

              {transaction.metadata && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                      {JSON.stringify(transaction.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter the transactions based on search query
  const filteredTransactions = transactions.filter(transaction =>
    transaction.reference.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
    transaction.paymentMethod.toLowerCase().includes(filters.searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-900 font-bold">Transactions</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your payment transactions</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button
            onClick={loadTransactions}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <FilterSection />

      {/* Transaction Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center">
              <svg className="animate-spin h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading transactions...
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <button
              onClick={loadTransactions}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Try Again
            </button>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-2">No transactions found</p>
            <p className="text-sm">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{transaction.reference}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {transaction.currency} {transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {transaction.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={transaction.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
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
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {/* Add pagination numbers here if needed */}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
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

      {/* Transaction Details Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
};

export default ModernTransactionsPage;
