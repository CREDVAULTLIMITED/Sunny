import { useState, useEffect } from 'react';
import { paymentService } from '../services/paymentService';
import { analyticsService } from '../services/analyticsService';

export const usePayments = (filters = {}) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = await paymentService.getPayments(filters);
        setPayments(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [filters]);

  const downloadReceipt = async (transactionId, format) => {
    try {
      setLoading(true);
      const response = await paymentService.downloadReceipt(transactionId, format);
      
      if (format === 'pdf') {
        // Handle PDF download
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `receipt-${transactionId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Handle HTML view
        const newWindow = window.open('', '_blank');
        newWindow.document.write(response);
        newWindow.document.close();
      }
      setError(null);
    } catch (err) {
      setError('Failed to download receipt');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { payments, loading, error };
};

export const usePaymentMetrics = (timeframe = '30d') => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getDashboardMetrics(timeframe);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [timeframe]);

  return { metrics, loading, error };
};

export const useTransactionVolume = (timeframe = '30d', interval = 'day') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolume = async () => {
      try {
        setLoading(true);
        const result = await analyticsService.getTransactionVolume(timeframe, interval);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolume();
  }, [timeframe, interval]);

  return { data, loading, error };
};

export const useBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const data = await paymentService.getAvailableBalance();
        setBalance(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return { balance, loading, error };
};

export const usePaymentMethodStats = (timeframe = '30d') => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getPaymentMethodDistribution(timeframe);
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timeframe]);

  return { stats, loading, error };
};
