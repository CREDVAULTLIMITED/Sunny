import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiBaseUrl;

class PaymentService {
  async getPayments(filters = {}) {
    const response = await axios.get(`${API_URL}/payments`, { params: filters });
    return response.data;
  }

  async getPaymentById(id) {
    const response = await axios.get(`${API_URL}/payments/${id}`);
    return response.data;
  }

  async createPayment(paymentData) {
    const response = await axios.post(`${API_URL}/payments`, paymentData);
    return response.data;
  }

  async refundPayment(paymentId, amount) {
    const response = await axios.post(`${API_URL}/payments/${paymentId}/refund`, { amount });
    return response.data;
  }

  async getPaymentMethods(customerId) {
    const response = await axios.get(`${API_URL}/payment-methods${customerId ? `?customerId=${customerId}` : ''}`);
    return response.data;
  }

  async getBalanceTransactions(filters = {}) {
    const response = await axios.get(`${API_URL}/balance/history`, { params: filters });
    return response.data;
  }

  async getAvailableBalance() {
    const response = await axios.get(`${API_URL}/balance`);
    return response.data;
  }

  async createPayout(amount, currency, destination) {
    const response = await axios.post(`${API_URL}/payouts`, { amount, currency, destination });
    return response.data;
  }

  async getPayoutSchedule() {
    const response = await axios.get(`${API_URL}/payout-schedule`);
    return response.data;
  }

  async updatePayoutSchedule(schedule) {
    const response = await axios.put(`${API_URL}/payout-schedule`, schedule);
    return response.data;
  }

  /**
   * Download payment receipt
   */
  async downloadReceipt(transactionId, format) {
    const response = await axios.get(
      `${API_URL}/receipts/${transactionId}/${format}`,
      {
        responseType: format === 'pdf' ? 'blob' : 'text',
        headers: {
          Accept: format === 'pdf' ? 'application/pdf' : 'text/html'
        }
      }
    );
    return response.data;
  }

  /**
   * Get receipt preview URLs
   */
  async getReceiptUrls(transactionId) {
    const response = await axios.get(`${API_URL}/receipts/${transactionId}/urls`);
    return response.data;
  }

  /**
   * Track payment status
   */
  async trackPayment(transactionId) {
    const response = await axios.get(`${API_URL}/payments/${transactionId}/status`);
    return response.data;
  }

  /**
   * Get payment analytics
   */
  async getPaymentAnalytics(filters = {}) {
    const response = await axios.get(`${API_URL}/analytics/payments`, { params: filters });
    return response.data;
  }

  /**
   * Get supported payment methods for a currency
   */
  async getSupportedPaymentMethods(currency) {
    const response = await axios.get(`${API_URL}/payment-methods/supported`, {
      params: { currency }
    });
    return response.data;
  }

  /**
   * Save payment method for future use
   */
  async savePaymentMethod(paymentMethodData) {
    const response = await axios.post(`${API_URL}/payment-methods`, paymentMethodData);
    return response.data;
  }

  /**
   * Delete saved payment method
   */
  async deletePaymentMethod(paymentMethodId) {
    await axios.delete(`${API_URL}/payment-methods/${paymentMethodId}`);
    return true;
  }

  /**
   * Get exchange rates for cryptocurrency
   */
  async getExchangeRates(cryptoCurrency) {
    const response = await axios.get(`${API_URL}/exchange-rates`, {
      params: { currency: cryptoCurrency }
    });
    return response.data;
  }

  /**
   * Get payment receipt as email
   */
  async emailReceipt(transactionId, email) {
    const response = await axios.post(`${API_URL}/receipts/${transactionId}/email`, {
      email
    });
    return response.data;
  }

  /**
   * Create recurring payment schedule
   */
  async createRecurringPayment(recurringPaymentData) {
    const response = await axios.post(`${API_URL}/recurring-payments`, recurringPaymentData);
    return response.data;
  }

  /**
   * Cancel recurring payment
   */
  async cancelRecurringPayment(recurringPaymentId) {
    await axios.delete(`${API_URL}/recurring-payments/${recurringPaymentId}`);
    return true;
  }
}

export const paymentService = new PaymentService();
