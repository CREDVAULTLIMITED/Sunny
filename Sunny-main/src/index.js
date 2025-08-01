/**
 * Sunny Payment Gateway - Main Entry Point
 * 
 * Exports all components of the Sunny Payment Gateway
 */

// Core components
import SunnyPaymentGateway from './core/SunnyPaymentGateway.js';
import * as Constants from './core/constants.js';
import { calculateFees, calculateConversionFee, calculateRefundFee } from './core/feeCalculator.js';
import { processInstantSettlement, isInstantSettlementAvailable } from './core/instantSettlement.js';

// API components
import SunnyAPI from './api/SunnyAPI.js';
import { validatePaymentData } from './api/validation.js';

// Security components
import { encryptData, decryptData } from './security/encryption.js';
import { detectFraud } from './security/fraudDetection.js';
import { verifyWebhook } from './security/webhookVerification.js';

// Localization components
import { 
  getLocaleSettings, 
  formatCurrency, 
  formatDate, 
  getPaymentMethodName,
  getSupportedLocales 
} from './localization/localeManager.js';

// Analytics components
import { 
  getTransactionSummary, 
  getDailyTransactionData,
  getCustomerInsights,
  getReconciliationData
} from './analytics/dashboardData.js';

// Integrations
import CreditBoostIntegration from './integrations/CreditBoostIntegration.js';

// UI components
import CheckoutUI from './ui/CheckoutUI.js';
import DashboardUI from './ui/DashboardUI.js';

// SDK version
const VERSION = '1.0.0';

// Main Sunny object
const Sunny = {
  // Core payment gateway
  PaymentGateway: SunnyPaymentGateway,
  
  // Constants
  Constants,
  
  // Fee calculation
  calculateFees,
  calculateConversionFee,
  calculateRefundFee,
  
  // Settlement
  processInstantSettlement,
  isInstantSettlementAvailable,
  
  // API
  API: SunnyAPI,
  validatePaymentData,
  
  // Security
  encryptData,
  decryptData,
  detectFraud,
  verifyWebhook,
  
  // Localization
  getLocaleSettings,
  formatCurrency,
  formatDate,
  getPaymentMethodName,
  getSupportedLocales,
  
  // Analytics
  getTransactionSummary,
  getDailyTransactionData,
  getCustomerInsights,
  getReconciliationData,
  
  // Integrations
  CreditBoostIntegration,
  
  // UI
  CheckoutUI,
  DashboardUI,
  
  // Version
  VERSION
};

export default Sunny;

// Named exports for specific components
export {
  SunnyPaymentGateway,
  Constants,
  calculateFees,
  processInstantSettlement,
  SunnyAPI,
  CreditBoostIntegration,
  CheckoutUI,
  DashboardUI,
  VERSION
};