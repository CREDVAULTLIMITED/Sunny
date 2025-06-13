import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiBaseUrl;

class AnalyticsService {
  async getDashboardMetrics(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/dashboard`, {
      params: { timeframe }
    });
    return response.data;
  }

  async getTransactionVolume(timeframe = '30d', interval = 'day') {
    const response = await axios.get(`${API_URL}/analytics/transaction-volume`, {
      params: { timeframe, interval }
    });
    return response.data;
  }

  async getPaymentMethodDistribution(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/payment-methods`, {
      params: { timeframe }
    });
    return response.data;
  }

  async getGeographicalDistribution(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/geographical`, {
      params: { timeframe }
    });
    return response.data;
  }

  async getSuccessRates(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/success-rates`, {
      params: { timeframe }
    });
    return response.data;
  }

  async getRevenueMetrics(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/revenue`, {
      params: { timeframe }
    });
    return response.data;
  }

  async getCustomerMetrics(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/customers`, {
      params: { timeframe }
    });
    return response.data;
  }

  async getRiskMetrics(timeframe = '30d') {
    const response = await axios.get(`${API_URL}/analytics/risk`, {
      params: { timeframe }
    });
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();
