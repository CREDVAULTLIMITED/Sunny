/**
 * React Hooks for Hyperswitch Integration
 * 
 * Custom hooks for Sunny dashboard components to easily interact with Hyperswitch
 * Provides state management, caching, and real-time updates
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  HyperswitchService,
  PaymentData,
  PaymentResponse,
  RefundData,
  RefundResponse,
  AnalyticsQuery,
  AnalyticsResponse,
  ConnectorInfo,
  hyperswitchService
} from '../services/hyperswitchService';

// Hook state interfaces
interface UsePaymentsState {
  payments: PaymentResponse[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
}

interface UseAnalyticsState {
  data: AnalyticsResponse | null;
  loading: boolean;
  error: string | null;
}

interface UsePaymentState {
  payment: PaymentResponse | null;
  loading: boolean;
  error: string | null;
}

interface UseRealTimeMetricsState {
  metrics: any;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface UseConnectorsState {
  connectors: ConnectorInfo[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook for managing payments list with pagination and filtering
 */
export function usePayments(
  initialFilters: Record<string, string> = {},
  autoRefresh: boolean = false,
  refreshInterval: number = 30000
) {
  const [state, setState] = useState<UsePaymentsState>({
    payments: [],
    loading: true,
    error: null,
    hasMore: false,
    totalCount: 0,
  });

  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({ limit: 20, offset: 0 });

  const fetchPayments = useCallback(async (append: boolean = false) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await hyperswitchService.listPayments(
        pagination.limit,
        append ? pagination.offset : 0,
        filters
      );

      setState(prev => ({
        payments: append ? [...prev.payments, ...response.data] : response.data,
        loading: false,
        error: null,
        hasMore: response.has_more,
        totalCount: response.total_count,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, [pagination.limit, pagination.offset, filters]);

  const loadMore = useCallback(() => {
    if (state.hasMore && !state.loading) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
      fetchPayments(true);
    }
  }, [state.hasMore, state.loading, fetchPayments]);

  const refresh = useCallback(() => {
    setPagination(prev => ({ ...prev, offset: 0 }));
    fetchPayments(false);
  }, [fetchPayments]);

  const updateFilters = useCallback((newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, offset: 0 }));
  }, []);

  useEffect(() => {
    fetchPayments(false);
  }, [filters]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(refresh, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, refresh]);

  return {
    ...state,
    filters,
    pagination,
    updateFilters,
    loadMore,
    refresh,
  };
}

/**
 * Hook for managing a single payment
 */
export function usePayment(paymentId: string | null) {
  const [state, setState] = useState<UsePaymentState>({
    payment: null,
    loading: false,
    error: null,
  });

  const fetchPayment = useCallback(async () => {
    if (!paymentId) {
      setState({ payment: null, loading: false, error: null });
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const payment = await hyperswitchService.getPayment(paymentId);
      setState({ payment, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [paymentId]);

  const createPayment = useCallback(async (paymentData: PaymentData): Promise<PaymentResponse> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const payment = await hyperswitchService.createPayment(paymentData);
      setState({ payment, loading: false, error: null });
      return payment;
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      throw error;
    }
  }, []);

  const confirmPayment = useCallback(async (confirmData: any): Promise<PaymentResponse> => {
    if (!paymentId) throw new Error('No payment ID provided');

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const payment = await hyperswitchService.confirmPayment(paymentId, confirmData);
      setState({ payment, loading: false, error: null });
      return payment;
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      throw error;
    }
  }, [paymentId]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  return {
    ...state,
    fetchPayment,
    createPayment,
    confirmPayment,
  };
}

/**
 * Hook for analytics data with caching
 */
export function useAnalytics(
  query: AnalyticsQuery,
  autoRefresh: boolean = false,
  refreshInterval: number = 60000
) {
  const [state, setState] = useState<UseAnalyticsState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchAnalytics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await hyperswitchService.getAnalytics(query);
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [query]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchAnalytics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchAnalytics]);

  return {
    ...state,
    refetch: fetchAnalytics,
  };
}

/**
 * Hook for real-time metrics with auto-refresh
 */
export function useRealTimeMetrics(refreshInterval: number = 30000) {
  const [state, setState] = useState<UseRealTimeMetricsState>({
    metrics: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchMetrics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const metrics = await hyperswitchService.getRealTimeMetrics();
      setState({
        metrics,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  useEffect(() => {
    const interval = setInterval(fetchMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, fetchMetrics]);

  return {
    ...state,
    refetch: fetchMetrics,
  };
}

/**
 * Hook for managing connectors
 */
export function useConnectors() {
  const [state, setState] = useState<UseConnectorsState>({
    connectors: [],
    loading: true,
    error: null,
  });

  const fetchConnectors = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const connectors = await hyperswitchService.getConnectors();
      setState({ connectors, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, []);

  useEffect(() => {
    fetchConnectors();
  }, [fetchConnectors]);

  return {
    ...state,
    refetch: fetchConnectors,
  };
}

/**
 * Hook for refund operations
 */
export function useRefunds() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRefund = useCallback(async (refundData: RefundData): Promise<RefundResponse> => {
    try {
      setLoading(true);
      setError(null);
      const refund = await hyperswitchService.createRefund(refundData);
      setLoading(false);
      return refund;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  }, []);

  const getRefund = useCallback(async (refundId: string): Promise<RefundResponse> => {
    try {
      setLoading(true);
      setError(null);
      const refund = await hyperswitchService.getRefund(refundId);
      setLoading(false);
      return refund;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  }, []);

  return {
    loading,
    error,
    createRefund,
    getRefund,
  };
}

/**
 * Hook for comprehensive dashboard data
 */
export function useDashboard(
  timeRange: '1h' | '24h' | '7d' | '30d' = '24h',
  autoRefresh: boolean = true,
  refreshInterval: number = 60000
) {
  const [state, setState] = useState<{
    data: any;
    loading: boolean;
    error: string | null;
    lastUpdated: Date | null;
  }>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await hyperswitchService.getDashboardData(timeRange);
      setState({
        data,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, [timeRange]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchDashboardData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchDashboardData]);

  return {
    ...state,
    refetch: fetchDashboardData,
  };
}

/**
 * Hook for system health monitoring
 */
export function useHealthMonitor(checkInterval: number = 30000) {
  const [state, setState] = useState<{
    isHealthy: boolean;
    loading: boolean;
    error: string | null;
    lastChecked: Date | null;
  }>({
    isHealthy: false,
    loading: true,
    error: null,
    lastChecked: null,
  });

  const checkHealth = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const isHealthy = await hyperswitchService.testConnection();
      setState({
        isHealthy,
        loading: false,
        error: null,
        lastChecked: new Date(),
      });
    } catch (error: any) {
      setState({
        isHealthy: false,
        loading: false,
        error: error.message,
        lastChecked: new Date(),
      });
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  useEffect(() => {
    const interval = setInterval(checkHealth, checkInterval);
    return () => clearInterval(interval);
  }, [checkInterval, checkHealth]);

  return {
    ...state,
    checkHealth,
  };
}

/**
 * Custom hook for managing multiple analytics queries with caching
 */
export function useMultipleAnalytics(queries: { key: string; query: AnalyticsQuery }[]) {
  const [state, setState] = useState<Record<string, {
    data: any;
    loading: boolean;
    error: string | null;
  }>>({});

  const fetchAnalytics = useCallback(async () => {
    const newState: typeof state = {};

    // Initialize loading state for all queries
    queries.forEach(({ key }) => {
      newState[key] = {
        data: state[key]?.data || null,
        loading: true,
        error: null,
      };
    });
    setState(newState);

    // Fetch all analytics in parallel
    const results = await Promise.allSettled(
      queries.map(async ({ key, query }) => {
        try {
          const data = await hyperswitchService.getAnalytics(query);
          return { key, data, error: null };
        } catch (error: any) {
          return { key, data: null, error: error.message };
        }
      })
    );

    // Update state with results
    const finalState = { ...newState };
    results.forEach((result, index) => {
      const { key } = queries[index];
      if (result.status === 'fulfilled') {
        finalState[key] = {
          data: result.value.data,
          loading: false,
          error: result.value.error,
        };
      } else {
        finalState[key] = {
          data: null,
          loading: false,
          error: result.reason?.message || 'Unknown error',
        };
      }
    });

    setState(finalState);
  }, [queries, state]);

  useEffect(() => {
    if (queries.length > 0) {
      fetchAnalytics();
    }
  }, [queries.length]);

  return {
    data: state,
    refetch: fetchAnalytics,
  };
}

/**
 * Hook for payment method management
 */
export function usePaymentMethods(customerId?: string, currency?: string, country?: string) {
  const [state, setState] = useState<{
    paymentMethods: any[];
    loading: boolean;
    error: string | null;
  }>({
    paymentMethods: [],
    loading: false,
    error: null,
  });

  const fetchPaymentMethods = useCallback(async () => {
    if (!customerId || !currency || !country) {
      setState({ paymentMethods: [], loading: false, error: null });
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const paymentMethods = await hyperswitchService.getPaymentMethods(
        customerId,
        currency,
        country
      );
      setState({ paymentMethods, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [customerId, currency, country]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  return {
    ...state,
    refetch: fetchPaymentMethods,
  };
}

/**
 * Hook for fraud detection analytics
 */
export function useFraudAnalytics(query: AnalyticsQuery, autoRefresh: boolean = false) {
  const [state, setState] = useState<{
    data: any;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchFraudAnalytics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await hyperswitchService.getFraudAnalytics(query);
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [query]);

  useEffect(() => {
    fetchFraudAnalytics();
  }, [fetchFraudAnalytics]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchFraudAnalytics, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchFraudAnalytics]);

  return {
    ...state,
    refetch: fetchFraudAnalytics,
  };
}

/**
 * Hook for cost observability
 */
export function useCostObservability(query: AnalyticsQuery, autoRefresh: boolean = false) {
  const [state, setState] = useState<{
    data: any;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchCostAnalytics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await hyperswitchService.getCostAnalytics(query);
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [query]);

  useEffect(() => {
    fetchCostAnalytics();
  }, [fetchCostAnalytics]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchCostAnalytics, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchCostAnalytics]);

  return {
    ...state,
    refetch: fetchCostAnalytics,
  };
}

/**
 * Hook for revenue recovery analytics
 */
export function useRevenueRecovery(query: AnalyticsQuery, autoRefresh: boolean = false) {
  const [state, setState] = useState<{
    data: any;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchRevenueRecovery = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await hyperswitchService.getRevenueRecoveryAnalytics(query);
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [query]);

  useEffect(() => {
    fetchRevenueRecovery();
  }, [fetchRevenueRecovery]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchRevenueRecovery, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchRevenueRecovery]);

  return {
    ...state,
    refetch: fetchRevenueRecovery,
  };
}

/**
 * Master hook that provides all Hyperswitch functionality
 */
export function useHyperswitch() {
  const service = useMemo(() => hyperswitchService, []);
  
  return {
    service,
    // Re-export individual hooks for convenience
    usePayments,
    usePayment,
    useAnalytics,
    useRealTimeMetrics,
    useConnectors,
    useRefunds,
    useDashboard,
    useHealthMonitor,
    useFraudAnalytics,
    useCostObservability,
    useRevenueRecovery,
    useMultipleAnalytics,
    usePaymentMethods,
  };
}

export default useHyperswitch;
