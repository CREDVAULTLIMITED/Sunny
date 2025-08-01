import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiBaseUrl;

class ProductService {
  async getProducts(filters = {}) {
    const response = await axios.get(`${API_URL}/products`, { params: filters });
    return response.data;
  }

  async getProductById(id) {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }

  async createProduct(productData) {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  }

  async updateProduct(id, productData) {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    return response.data;
  }

  async archiveProduct(id) {
    const response = await axios.post(`${API_URL}/products/${id}/archive`);
    return response.data;
  }

  async getProductMetrics(id) {
    const response = await axios.get(`${API_URL}/products/${id}/metrics`);
    return response.data;
  }

  async getProductPricing(id) {
    const response = await axios.get(`${API_URL}/products/${id}/pricing`);
    return response.data;
  }

  async updateProductPricing(id, pricingData) {
    const response = await axios.put(`${API_URL}/products/${id}/pricing`, pricingData);
    return response.data;
  }
}

export const productService = new ProductService();
