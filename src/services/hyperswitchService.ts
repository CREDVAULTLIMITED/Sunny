/**
 * Hyperswitch Service
 * 
 * TypeScript service for Sunny dashboards to interact with Hyperswitch data
 * Provides a clean interface for payment operations, analytics, and monitoring
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface HyperswitchConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
}

export interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentMethodType?: string;
  customer?: Customer;
  billing?: Address;
  shipping?: Address;
  description?: string;
  metadata?: Record<string, any>;
  returnUrl?: string;
  webhookUrl?: string;
  captureMethod?: 'automatic' | 'manual';
  confirm?: 'automatic' | 'manual';
  authenticationType?: string;
}

export interface Customer {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
}

export interface PaymentResponse {
  payment_id: string;
  status: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_method_type?: string;
  customer?: Customer;
  description?: string;
  metadata?: Record<string, any>;
  created: string;
  last_modified: string;
  client_secret?: string;
  next_action?: NextAction;
  error_message?: string;
  error_code?: string;
}

export interface NextAction {
  type: string;
  redirect_to_url?: string;
  data?: any;
}

export interface RefundData {
  payment_id: string;
  amount?: number;
  reason?: string;
  metadata?: Record<string, any>;
}

export interface RefundResponse {
  refund_id: string;
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  reason?: string;
  metadata?: Record<string, any>;
  created: string;
  last_modified: string;
}

export interface PaymentListResponse {
  data: PaymentResponse[];
  total_count: number;
  has_more: boolean;
}

export interface AnalyticsQuery {
  startDate: string;
  endDate: string;
  granularity: 'hour' | 'day' | 'week' | 'month';
  currency?: string;
  paymentMethod?: string;
  connector?: string;
}

export interface AnalyticsResponse {
  total_amount: number;
  total_count: number;
  success_rate: number;
  average_amount: number;
  data: Array<{
    timestamp: string;
    amount: number;
    count: number;
    success_count: number;
    failure_count: number;
  }>;
}

export interface ConnectorInfo {
  connector_name: string;
  merchant_connector_id: string;
  connector_type: string;
  status: 'active' | 'inactive';
  payment_methods_enabled: string[];
  created_at: string;
  last_modified: string;
}

export class HyperswitchService {
  private client: AxiosInstance;
  private config: HyperswitchConfig;

  constructor(config: HyperswitchConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': config.apiKey,
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (request) => {
        console.log('Hyperswitch Request:', {
          method: request.method?.toUpperCase(),
          url: request.url,
          data: this.sanitizeLogData(request.data),
        });
        return request;
      },
      (error) => {
        console.error('Hyperswitch Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.log('Hyperswitch Response:', {
          status: response.status,
          url: response.config.url,
          data: this.sanitizeLogData(response.data),
        });
        return response;
      },
      (error) => {
        console.error('Hyperswitch Response Error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          url: error.config?.url,
        });
        return Promise.reject(error);
      }
    );
  }

  private sanitizeLogData(data: any): any {
    if (!data) return data;
    
    // Create a deep copy to avoid modifying original data
    const sanitized = JSON.parse(JSON.stringify(data));
    
    // Remove sensitive fields for logging
    if (sanitized.card?.number) {
      sanitized.card.number = '****-****-****-' + sanitized.card.number.slice(-4);
    }
    if (sanitized.card?.cvc) {
      sanitized.card.cvc = '***';
    }
    if (sanitized.bank_account?.account_number) {
      sanitized.bank_account.account_number = '****' + sanitized.bank_account.account_number.slice(-4);
    }
    
    return sanitized;
  }

  /**
   * Create a new payment
   */
  async createPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response: AxiosResponse<PaymentResponse> = await this.client.post(
        '/payments',
        paymentData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get payment details
   */
  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response: AxiosResponse<PaymentResponse> = await this.client.get(
        `/payments/${paymentId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * List payments with optional filters
   */
  async listPayments(
    limit: number = 20,
    offset: number = 0,
    filters: Record<string, string> = {}
  ): Promise<PaymentListResponse> {
    try {
      const params = {
        limit: limit.toString(),
        offset: offset.toString(),
        ...filters,
      };

      const response: AxiosResponse<PaymentListResponse> = await this.client.get(
        '/payments',
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to list payments: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Confirm a payment
   */
  async confirmPayment(paymentId: string, confirmData: any): Promise<PaymentResponse> {
    try {
      const response: AxiosResponse<PaymentResponse> = await this.client.post(
        `/payments/${paymentId}/confirm`,
        confirmData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to confirm payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Create a refund
   */
  async createRefund(refundData: RefundData): Promise<RefundResponse> {
    try {
      const response: AxiosResponse<RefundResponse> = await this.client.post(
        '/refunds',
        refundData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create refund: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get refund details
   */
  async getRefund(refundId: string): Promise<RefundResponse> {
    try {
      const response: AxiosResponse<RefundResponse> = await this.client.get(
        `/refunds/${refundId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get refund: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(customerData: Customer): Promise<Customer> {
    try {
      const response: AxiosResponse<Customer> = await this.client.post(
        '/customers',
        customerData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create customer: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get customer details
   */
  async getCustomer(customerId: string): Promise<Customer> {
    try {
      const response: AxiosResponse<Customer> = await this.client.get(
        `/customers/${customerId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get customer: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get available payment methods for a customer
   */
  async getPaymentMethods(
    customerId: string,
    currency: string,
    country: string
  ): Promise<any> {
    try {
      const response = await this.client.get('/account/payment_methods', {
        params: {
          customer_id: customerId,
          currency,
          country,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get payment methods: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get configured payment connectors
   */
  async getConnectors(): Promise<ConnectorInfo[]> {
    try {
      const response: AxiosResponse<ConnectorInfo[]> = await this.client.get(
        '/account/connectors'
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get connectors: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get payment analytics
   */
  async getAnalytics(query: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const response: AxiosResponse<AnalyticsResponse> = await this.client.get(
        '/analytics/payments',
        {
          params: {
            start_date: query.startDate,
            end_date: query.endDate,
            granularity: query.granularity,
            currency: query.currency,
            payment_method: query.paymentMethod,
            connector: query.connector,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get revenue recovery analytics
   */
  async getRevenueRecoveryAnalytics(query: AnalyticsQuery): Promise<any> {
    try {
      const response = await this.client.get('/analytics/revenue-recovery', {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
          granularity: query.granularity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get revenue recovery analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get cost observability data
   */
  async getCostAnalytics(query: AnalyticsQuery): Promise<any> {
    try {
      const response = await this.client.get('/analytics/cost-observability', {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
          granularity: query.granularity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get cost analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get connector performance metrics
   */
  async getConnectorPerformance(connectorName?: string): Promise<any> {
    try {
      const params = connectorName ? { connector: connectorName } : {};
      const response = await this.client.get('/analytics/connector-performance', {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get connector performance: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get routing analytics
   */
  async getRoutingAnalytics(query: AnalyticsQuery): Promise<any> {
    try {
      const response = await this.client.get('/analytics/routing', {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
          granularity: query.granularity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get routing analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get fraud detection analytics
   */
  async getFraudAnalytics(query: AnalyticsQuery): Promise<any> {
    try {
      const response = await this.client.get('/analytics/fraud-check', {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
          granularity: query.granularity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get fraud analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get system health status
   */
  async getHealthStatus(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await this.client.get('/health');
      return {
        status: response.status === 200 ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      throw new Error(`Health check failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get real-time payment metrics for dashboard
   */
  async getRealTimeMetrics(): Promise<{
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    totalAmount: number;
    averageAmount: number;
    successRate: number;
    topPaymentMethods: Array<{ method: string; count: number; percentage: number }>;
    topCurrencies: Array<{ currency: string; amount: number; percentage: number }>;
    connectorPerformance: Array<{ connector: string; successRate: number; totalAmount: number }>;
  }> {
    try {
      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours

      const [paymentsResponse, analyticsResponse, connectorsResponse] = await Promise.all([
        this.listPayments(1000, 0, { 
          created_gte: startDate,
          created_lte: endDate 
        }),
        this.getAnalytics({
          startDate: startDate,
          endDate: endDate,
          granularity: 'hour'
        }),
        this.getConnectorPerformance()
      ]);

      const payments = paymentsResponse.data;
      const successfulPayments = payments.filter(p => p.status === 'succeeded' || p.status === 'completed');
      const failedPayments = payments.filter(p => p.status === 'failed' || p.status === 'cancelled');

      // Calculate payment method statistics
      const paymentMethodCounts = payments.reduce((acc, payment) => {
        acc[payment.payment_method] = (acc[payment.payment_method] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPaymentMethods = Object.entries(paymentMethodCounts)
        .map(([method, count]) => ({
          method,
          count,
          percentage: (count / payments.length) * 100
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Calculate currency statistics
      const currencyAmounts = payments.reduce((acc, payment) => {
        acc[payment.currency] = (acc[payment.currency] || 0) + payment.amount;
        return acc;
      }, {} as Record<string, number>);

      const totalAmount = Object.values(currencyAmounts).reduce((sum, amount) => sum + amount, 0);
      const topCurrencies = Object.entries(currencyAmounts)
        .map(([currency, amount]) => ({
          currency,
          amount,
          percentage: (amount / totalAmount) * 100
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      return {
        totalPayments: payments.length,
        successfulPayments: successfulPayments.length,
        failedPayments: failedPayments.length,
        totalAmount: totalAmount,
        averageAmount: payments.length > 0 ? totalAmount / payments.length : 0,
        successRate: payments.length > 0 ? (successfulPayments.length / payments.length) * 100 : 0,
        topPaymentMethods,
        topCurrencies,
        connectorPerformance: connectorsResponse || []
      };
    } catch (error: any) {
      throw new Error(`Failed to get real-time metrics: ${error.message}`);
    }
  }

  /**
   * Get settlement analytics
   */
  async getSettlementAnalytics(query: AnalyticsQuery): Promise<any> {
    try {
      const response = await this.client.get('/analytics/settlements', {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
          granularity: query.granularity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get settlement analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get dispute analytics
   */
  async getDisputeAnalytics(query: AnalyticsQuery): Promise<any> {
    try {
      const response = await this.client.get('/analytics/disputes', {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
          granularity: query.granularity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get dispute analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get webhook delivery status
   */
  async getWebhookAnalytics(): Promise<any> {
    try {
      const response = await this.client.get('/analytics/webhooks');
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get webhook analytics: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Test Hyperswitch connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.getHealthStatus();
      return true;
    } catch (error) {
      console.error('Hyperswitch connection test failed:', error);
      return false;
    }
  }

  /**
   * Get comprehensive dashboard data for Sunny's internal operations
   */
  async getDashboardData(timeRange: '1h' | '24h' | '7d' | '30d' = '24h'): Promise<{
    overview: any;
    payments: any;
    connectors: any;
    fraud: any;
    revenue: any;
    costs: any;
  }> {
    try {
      const endDate = new Date().toISOString();
      const startDate = this.getStartDateForRange(timeRange);
      const granularity = this.getGranularityForRange(timeRange);

      const query: AnalyticsQuery = {
        startDate,
        endDate,
        granularity,
      };

      const [
        realTimeMetrics,
        analytics,
        connectorPerformance,
        fraudAnalytics,
        revenueRecovery,
        costAnalytics,
      ] = await Promise.all([
        this.getRealTimeMetrics(),
        this.getAnalytics(query),
        this.getConnectorPerformance(),
        this.getFraudAnalytics(query),
        this.getRevenueRecoveryAnalytics(query),
        this.getCostAnalytics(query),
      ]);

      return {
        overview: realTimeMetrics,
        payments: analytics,
        connectors: connectorPerformance,
        fraud: fraudAnalytics,
        revenue: revenueRecovery,
        costs: costAnalytics,
      };
    } catch (error: any) {
      throw new Error(`Failed to get dashboard data: ${error.message}`);
    }
  }

  private getStartDateForRange(range: string): string {
    const now = new Date();
    switch (range) {
      case '1h':
        return new Date(now.getTime() - 60 * 60 * 1000).toISOString();
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    }
  }

  private getGranularityForRange(range: string): 'hour' | 'day' | 'week' | 'month' {
    switch (range) {
      case '1h':
        return 'hour';
      case '24h':
        return 'hour';
      case '7d':
        return 'day';
      case '30d':
        return 'day';
      default:
        return 'hour';
    }
  }
}

// Factory function to create HyperswitchService instance
export const createHyperswitchService = (config?: Partial<HyperswitchConfig>): HyperswitchService => {
  const defaultConfig: HyperswitchConfig = {
    baseUrl: process.env.NEXT_PUBLIC_HYPERSWITCH_BASE_URL || 'http://localhost:8080',
    apiKey: process.env.NEXT_PUBLIC_HYPERSWITCH_API_KEY || '',
    timeout: 30000,
  };

  return new HyperswitchService({ ...defaultConfig, ...config });
};

// Export singleton instance for convenience
export const hyperswitchService = createHyperswitchService();

export default HyperswitchService;
