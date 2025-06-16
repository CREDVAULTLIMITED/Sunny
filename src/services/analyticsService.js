import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiBaseUrl;

class AnalyticsService {
  // Get general dashboard metrics
  async getDashboardMetrics(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/dashboard`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }

  // Get payment-specific metrics
  async getPaymentMetrics(filters = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/payments/metrics`, {
        params: filters
      });
      
      return {
        todayVolume: response.data.todayVolume,
        successRate: response.data.successRate,
        revenueData: response.data.revenueTimeline,
        paymentMethods: response.data.methodDistribution,
        avgTicketSize: response.data.averageTransactionAmount,
        processingFees: response.data.processingFees,
        netRevenue: response.data.netRevenue
      };
    } catch (error) {
      console.error('Error fetching payment metrics:', error);
      throw error;
    }
  }

  // Get transaction volume data
  async getTransactionVolume(timeframe = '30d', interval = 'day') {
    try {
      const response = await axios.get(`${API_URL}/analytics/transaction-volume`, {
        params: { timeframe, interval }
      });
      return this.transformTimeseriesData(response.data);
    } catch (error) {
      console.error('Error fetching transaction volume:', error);
      throw error;
    }
  }

  // Get payment method distribution
  async getPaymentMethodDistribution(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/payment-methods`, {
        params: { timeframe }
      });
      return this.transformTimeseriesData(response.data);
    } catch (error) {
      console.error('Error fetching payment method distribution:', error);
      throw error;
    }
  }

  // Get geographical distribution of payments
  async getGeographicalDistribution(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/geographical`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching geographical distribution:', error);
      throw error;
    }
  }

  // Get success rates by payment method
  async getSuccessRates(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/success-rates`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching success rates:', error);
      throw error;
    }
  }

  // Get revenue metrics
  async getRevenueMetrics(timeframe = '30d', granularity = 'day') {
    try {
      const response = await axios.get(`${API_URL}/analytics/revenue`, {
        params: { timeframe, granularity }
      });
      return this.transformTimeseriesData(response.data);
    } catch (error) {
      console.error('Error fetching revenue metrics:', error);
      throw error;
    }
  }

  // Get customer metrics
  async getCustomerMetrics(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/customers`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer metrics:', error);
      throw error;
    }
  }

  // Get risk metrics
  async getRiskMetrics(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/risk`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching risk metrics:', error);
      throw error;
    }
  }

  // Get refund metrics
  async getRefundMetrics(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/refunds`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching refund metrics:', error);
      throw error;
    }
  }

  // Get dispute metrics
  async getDisputeMetrics(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/disputes`, {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dispute metrics:', error);
      throw error;
    }
  }

  // Transform timeseries data into chart-friendly format
  transformTimeseriesData(data) {
    return data.map(item => ({
      date: new Date(item.timestamp),
      ...item.values
    }));
  }
}

export const analyticsService = new AnalyticsService();
