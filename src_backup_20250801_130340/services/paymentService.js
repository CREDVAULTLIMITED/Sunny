import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiBaseUrl;

class PaymentService {
  // Get all payments with filters
  async getPayments(filters = {}) {
    try {
      const response = await axios.get(`${API_URL}/payments`, { 
        params: {
          ...filters,
          includes: ['customer', 'paymentMethod', 'riskAssessment']  // Include related data
        }
      });
      return this.transformPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  // Transform API response into format needed by the UI
  transformPaymentData(data) {
    return data.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      paymentMethod: this.formatPaymentMethod(payment.paymentMethod),
      methodType: payment.paymentMethod.type,
      customerName: payment.customer.name,
      customerEmail: payment.customer.email,
      date: payment.createdAt,
      riskScore: payment.riskAssessment?.score || 0
    }));
  }

  // Format payment method display
  formatPaymentMethod(method) {
    switch (method.type) {
      case 'card':
        return `${method.brand} •••• ${method.last4}`;
      case 'bank_transfer':
        return `${method.bankName} •••• ${method.last4}`;
      case 'crypto':
        return `${method.currency.toUpperCase()} Wallet`;
      case 'wallet':
        return `${method.provider} Wallet`;
      default:
        return 'Other';
    }
  }

  // Get a single payment by ID
  async getPaymentById(id) {
    const response = await axios.get(`${API_URL}/payments/${id}`);
    return response.data;
  }

  // Create a new payment
  async createPayment(paymentData) {
    try {
      const response = await axios.post(`${API_URL}/payments`, {
        ...paymentData,
        idempotencyKey: this.generateIdempotencyKey()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  // Process a refund
  async refundPayment(paymentId, amount, reason) {
    try {
      const response = await axios.post(`${API_URL}/payments/${paymentId}/refund`, { 
        amount, 
        reason,
        idempotencyKey: this.generateIdempotencyKey()
      });
      return response.data;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  // Get payment methods for a customer
  async getPaymentMethods(customerId) {
    try {
      const response = await axios.get(
        `${API_URL}/payment-methods${customerId ? `?customerId=${customerId}` : ''}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  // Get balance transactions
  async getBalanceTransactions(filters = {}) {
    try {
      const response = await axios.get(`${API_URL}/balance/history`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching balance transactions:', error);
      throw error;
    }
  }

  // Get current balance
  async getAvailableBalance() {
    try {
      const response = await axios.get(`${API_URL}/balance`);
      return response.data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  // Create a payout
  async createPayout(amount, currency, destination) {
    try {
      const response = await axios.post(`${API_URL}/payouts`, {
        amount,
        currency,
        destination,
        idempotencyKey: this.generateIdempotencyKey()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payout:', error);
      throw error;
    }
  }

  // Get payout schedule
  async getPayoutSchedule() {
    try {
      const response = await axios.get(`${API_URL}/payout-schedule`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payout schedule:', error);
      throw error;
    }
  }

  // Update payout schedule
  async updatePayoutSchedule(schedule) {
    try {
      const response = await axios.put(`${API_URL}/payout-schedule`, schedule);
      return response.data;
    } catch (error) {
      console.error('Error updating payout schedule:', error);
      throw error;
    }
  }

  // Download payment receipt
  async downloadReceipt(transactionId, format = 'pdf') {
    try {
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
    } catch (error) {
      console.error('Error downloading receipt:', error);
      throw error;
    }
  }

  // Get receipt preview URLs
  async getReceiptUrls(transactionId) {
    try {
      const response = await axios.get(`${API_URL}/receipts/${transactionId}/urls`);
      return response.data;
    } catch (error) {
      console.error('Error fetching receipt URLs:', error);
      throw error;
    }
  }

  // Track payment status
  async trackPayment(transactionId) {
    try {
      const response = await axios.get(`${API_URL}/payments/${transactionId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error tracking payment:', error);
      throw error;
    }
  }

  // Get payment analytics
  async getPaymentAnalytics(filters = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/payments`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment analytics:', error);
      throw error;
    }
  }

  // Export payments to CSV
  async exportPayments(payments) {
    try {
      const csvContent = this.convertToCSV(payments);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `payments_${new Date().toISOString()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting payments:', error);
      throw error;
    }
  }

  // Convert payments data to CSV format
  convertToCSV(payments) {
    const header = [
      'Payment ID',
      'Amount',
      'Currency',
      'Status',
      'Payment Method',
      'Customer Name',
      'Customer Email',
      'Date',
      'Risk Score'
    ];
    
    const rows = payments.map(payment => [
      payment.id,
      payment.amount,
      payment.currency,
      payment.status,
      payment.paymentMethod,
      payment.customerName,
      payment.customerEmail,
      new Date(payment.date).toLocaleString(),
      payment.riskScore
    ]);

    return [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }

  // Generate a unique idempotency key
  generateIdempotencyKey() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get supported payment methods for a currency
  async getSupportedPaymentMethods(currency) {
    try {
      const response = await axios.get(`${API_URL}/payment-methods/supported`, {
        params: { currency }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching supported payment methods:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
