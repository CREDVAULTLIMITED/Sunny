/**
 * Sunny Payment Gateway - API Client
 * TypeScript implementation for communicating with external APIs
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';
import { 
  PaymentData, 
  PaymentResult, 
  CustomerData, 
  SubscriptionData, 
  SubscriptionResult,
  WebhookEvent,
  APIError 
} from '@/lib/types/payment';

export interface APIClientConfig {
  apiKey: string;
  apiSecret: string;
  environment: 'sandbox' | 'production';
  timeout?: number;
  baseUrl?: string;
}

export interface PaginationOptions {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
}

export interface ListResponse<T> {
  data: T[];
  hasMore: boolean;
  totalCount?: number;
}

export class SunnyAPIClient {
  private client: AxiosInstance;
  private config: APIClientConfig;

  constructor(config: APIClientConfig) {
    this.config = {
      timeout: 30000,
      ...config
    };

    const baseUrl = this.config.baseUrl ?? (
      this.config.environment === 'production'
        ? 'https://api.sunnypayments.com/v2'
        : 'https://sandbox.sunnypayments.com/v2'
    );

    this.client = axios.create({
      baseURL: baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Sunny/NextJS/1.0.0'
      }
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor for logging and security
    this.client.interceptors.request.use(
      (request) => {
        // Add timestamp to prevent replay attacks
        request.headers['X-Timestamp'] = Date.now().toString();
        
        // Add request signature for additional security
        if (request.data) {
          const signature = this.generateSignature(JSON.stringify(request.data));
          request.headers['X-Signature'] = signature;
        }

        // Log request (with sensitive data removed)
        const sanitizedRequest = this.sanitizeRequestForLogging(request);
        console.log('API Request:', sanitizedRequest);
        
        return request;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('API Response:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data
        });
        return response;
      },
      (error) => {
        const apiError = this.handleApiError(error);
        console.error('API Error:', apiError);
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Create a payment
   */
  async createPayment(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      const response = await this.client.post<PaymentResult>('/payments', paymentData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Retrieve a payment by ID
   */
  async getPayment(paymentId: string): Promise<PaymentResult> {
    try {
      const response = await this.client.get<PaymentResult>(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * List payments with pagination
   */
  async listPayments(options: PaginationOptions = {}): Promise<ListResponse<PaymentResult>> {
    try {
      const response = await this.client.get<ListResponse<PaymentResult>>('/payments', {
        params: options
      });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Create a refund
   */
  async createRefund(refundData: {
    paymentId: string;
    amount?: number;
    reason?: string;
    metadata?: Record<string, any>;
  }): Promise<PaymentResult> {
    try {
      const response = await this.client.post<PaymentResult>('/refunds', refundData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(customerData: CustomerData): Promise<CustomerData & { id: string }> {
    try {
      const response = await this.client.post<CustomerData & { id: string }>('/customers', customerData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Retrieve a customer by ID
   */
  async getCustomer(customerId: string): Promise<CustomerData & { id: string }> {
    try {
      const response = await this.client.get<CustomerData & { id: string }>(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Update a customer
   */
  async updateCustomer(customerId: string, customerData: Partial<CustomerData>): Promise<CustomerData & { id: string }> {
    try {
      const response = await this.client.put<CustomerData & { id: string }>(`/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Create a subscription
   */
  async createSubscription(subscriptionData: SubscriptionData): Promise<SubscriptionResult> {
    try {
      const response = await this.client.post<SubscriptionResult>('/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<SubscriptionResult> {
    try {
      const response = await this.client.delete<SubscriptionResult>(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Create a payment link
   */
  async createPaymentLink(paymentLinkData: {
    amount: number;
    currency: string;
    description?: string;
    expiresIn?: number;
    successUrl?: string;
    cancelUrl?: string;
    metadata?: Record<string, any>;
  }): Promise<{
    success: boolean;
    url: string;
    expiresAt: string;
    id: string;
  }> {
    try {
      const response = await this.client.post('/payment_links', paymentLinkData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Register a webhook endpoint
   */
  async registerWebhook(webhookData: {
    url: string;
    events: string[];
    description?: string;
  }): Promise<{
    id: string;
    url: string;
    events: string[];
    secret: string;
  }> {
    try {
      const response = await this.client.post('/webhooks', webhookData);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<{
    available: { amount: number; currency: string }[];
    pending: { amount: number; currency: string }[];
  }> {
    try {
      const response = await this.client.get('/balance');
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(options: PaginationOptions & {
    startDate?: string;
    endDate?: string;
    status?: string;
    paymentMethod?: string;
  } = {}): Promise<ListResponse<PaymentResult>> {
    try {
      const response = await this.client.get<ListResponse<PaymentResult>>('/transactions', {
        params: options
      });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhook(payload: string | object, signature: string, secret?: string): boolean {
    const webhookSecret = secret || this.config.apiSecret;
    const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
    
    const expectedSignature = CryptoJS.HmacSHA256(payloadString, webhookSecret).toString();
    
    return signature === expectedSignature;
  }

  /**
   * Generate request signature
   */
  private generateSignature(payload: string): string {
    return CryptoJS.HmacSHA256(payload, this.config.apiSecret).toString();
  }

  /**
   * Sanitize request for logging (remove sensitive data)
   */
  private sanitizeRequestForLogging(request: any): any {
    const sanitized = { ...request };
    
    // Remove sensitive headers
    if (sanitized.headers?.Authorization) {
      sanitized.headers.Authorization = 'Bearer [REDACTED]';
    }
    
    // Remove sensitive data fields
    if (sanitized.data?.card) {
      sanitized.data.card = {
        ...sanitized.data.card,
        number: '[REDACTED]',
        cvc: '[REDACTED]'
      };
    }
    
    if (sanitized.data?.bankAccount) {
      sanitized.data.bankAccount = {
        ...sanitized.data.bankAccount,
        accountNumber: '[REDACTED]',
        routingNumber: '[REDACTED]'
      };
    }

    return {
      method: sanitized.method,
      url: sanitized.url,
      headers: sanitized.headers,
      data: sanitized.data
    };
  }

  /**
   * Handle API errors and convert to standard format
   */
  private handleApiError(error: any): APIError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const responseData = error.response.data;
        return {
          code: responseData?.error?.code || 'api_error',
          message: responseData?.error?.message || error.response.statusText,
          type: responseData?.error?.type || 'api_error',
          param: responseData?.error?.param
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          code: 'network_error',
          message: 'No response received from API',
          type: 'network_error'
        };
      } else {
        // Error in request setup
        return {
          code: 'request_error',
          message: `Error setting up request: ${error.message}`,
          type: 'request_error'
        };
      }
    }

    // Generic error
    return {
      code: 'unknown_error',
      message: error.message || 'An unknown error occurred',
      type: 'unknown_error'
    };
  }

  /**
   * Get API client configuration (without sensitive data)
   */
  getConfig(): Omit<APIClientConfig, 'apiSecret'> {
    return {
      apiKey: this.config.apiKey.substring(0, 8) + '...',
      environment: this.config.environment,
      timeout: this.config.timeout,
      baseUrl: this.client.defaults.baseURL
    };
  }
}

export default SunnyAPIClient;
