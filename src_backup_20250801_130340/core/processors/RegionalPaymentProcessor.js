/**
 * RegionalPaymentProcessor.js
 * Base class for regional payment method processors
 */

import { validateRegionalPayment } from '../../utils/validation';
import { encryptSensitiveData } from '../../security/encryption';
import config from '../../config/config';

class RegionalPaymentProcessor {
    constructor(region) {
        this.region = region;
        this.supportedMethods = new Map();
        this.processorStatus = new Map();
    }

    /**
     * Register a new payment method for the region
     */
    registerPaymentMethod(method, handler) {
        this.supportedMethods.set(method, handler);
    }

    /**
     * Process a regional payment
     */
    async processPayment(paymentData) {
        const { method, amount, currency } = paymentData;

        // Validate payment method is supported
        if (!this.supportedMethods.has(method)) {
            throw new Error(`Payment method ${method} not supported in ${this.region}`);
        }

        // Get payment handler
        const handler = this.supportedMethods.get(method);

        // Process payment
        const result = await handler.process(paymentData);

        // Record transaction
        await this.recordTransaction({
            ...result,
            region: this.region,
            method,
            timestamp: new Date()
        });

        return result;
    }

    /**
     * Validate regional payment requirements
     */
    async validatePayment(paymentData) {
        return validateRegionalPayment(paymentData, this.region);
    }

    /**
     * Get supported payment methods for region
     */
    getSupportedMethods() {
        return Array.from(this.supportedMethods.keys());
    }

    /**
     * Check processor status
     */
    async checkStatus(method) {
        if (!this.supportedMethods.has(method)) {
            throw new Error(`Payment method ${method} not supported`);
        }
        return this.processorStatus.get(method) || 'unknown';
    }
}

export default RegionalPaymentProcessor;
