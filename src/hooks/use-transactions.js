import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * Hook for fetching and managing transaction data
 * @returns {Object} Transaction data and functions to manage it
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch transactions from the API
  const fetchTransactions = async (filters = {}) => {
    setIsLoading(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      // Make API request with token
      const response = await axios.get('/api/transactions', {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setTransactions(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch transactions');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount only if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchTransactions();
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions
  };
}