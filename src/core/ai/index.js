/**
 * Sunny Payment Gateway - AI Module Index
 * 
 * Exports all AI-related components
 */

import PaymentRoutingAI from './PaymentRoutingAI';
import EnhancedPaymentRoutingAI from './EnhancedPaymentRoutingAI';
import OllamaService from './OllamaService';
import SunnyAssistant from './SunnyAssistant';
import WebLearningService from './WebLearningService';

// Create and export instances
const ollamaService = new OllamaService();
const sunnyAssistant = new SunnyAssistant();
const webLearningService = new WebLearningService();
const enhancedPaymentRoutingAI = new EnhancedPaymentRoutingAI();

// Schedule periodic learning if in a browser environment
if (typeof window !== 'undefined') {
  // Run initial learning
  webLearningService.runScheduledLearning().catch(console.error);
  
  // Schedule learning every 24 hours
  setInterval(() => {
    webLearningService.runScheduledLearning().catch(console.error);
  }, 24 * 60 * 60 * 1000);
}

export {
  PaymentRoutingAI,
  EnhancedPaymentRoutingAI,
  OllamaService,
  SunnyAssistant,
  WebLearningService,
  ollamaService,
  sunnyAssistant,
  webLearningService,
  enhancedPaymentRoutingAI
};