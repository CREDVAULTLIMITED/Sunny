import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * Hook for fetching statistics data
 * @returns {Object} Statistics data and loading state
 */
export function useStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        // Make API request with token
        const response = await axios.get('/api/stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setStats(response.data.data);
          setError(null);
        } else {
          throw new Error(response.data.message || 'Failed to fetch statistics');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch statistics');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if token exists
    const token = localStorage.getItem('token');
    if (token) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { stats, isLoading, error };
}