import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiBaseUrl;

class CustomerService {
  async getCustomers(filters = {}) {
    const response = await axios.get(`${API_URL}/customers`, { params: filters });
    return response.data;
  }

  async getCustomerById(id) {
    const response = await axios.get(`${API_URL}/customers/${id}`);
    return response.data;
  }

  async createCustomer(customerData) {
    const response = await axios.post(`${API_URL}/customers`, customerData);
    return response.data;
  }

  async updateCustomer(id, customerData) {
    const response = await axios.put(`${API_URL}/customers/${id}`, customerData);
    return response.data;
  }

  async getCustomerPayments(id, filters = {}) {
    const response = await axios.get(`${API_URL}/customers/${id}/payments`, { params: filters });
    return response.data;
  }

  async getCustomerSubscriptions(id) {
    const response = await axios.get(`${API_URL}/customers/${id}/subscriptions`);
    return response.data;
  }

  async getCustomerMetrics(id) {
    const response = await axios.get(`${API_URL}/customers/${id}/metrics`);
    return response.data;
  }
}

export const customerService = new CustomerService();
