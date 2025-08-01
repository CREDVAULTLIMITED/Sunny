/**
 * PaymentProcessorRegistry.js
 * Central registry for all payment processors
 */

import config from '../config/config';
import BankTransferProcessor from './processors/BankTransferProcessor';
import PIXProcessor from './processors/PIXProcessor';
import TaxManager from './TaxManager';
import EnhancedFraudDetection from '../security/EnhancedFraudDetection';

class PaymentProcessorRegistry {
    constructor() {
        this.processors = new Map();
        this.regionalProcessors = new Map();
        this.protocols = new Map();
    }

    async registerProcessor(type, processor) {
        this.processors.set(type, new processor());
    }

    async deregisterProcessor(type) {
        this.processors.delete(type);
    }

    /**
     * Load Protocols from Constants
     */
    loadProtocols() {
        const { PROTOCOLS } = require('./constants');
        PROTOCOLS.forEach(protocol => {
            this.protocols.set(protocol.name, protocol);
        });
    }

    /**
     * Initialize payment processor registry
     */
    async initialize() {
        // Load supported protocols
        this.loadProtocols();

        // Register core payment processors
        this.registerProcessor('BANK_TRANSFER', BankTransferProcessor);

        // Register regional payment processors
        this.registerRegionalProcessor('BR', 'PIX', PIXProcessor);
        
        // Initialize fraud detection
        this.fraudDetection = EnhancedFraudDetection;
        await this.fraudDetection.initialize();

        // Initialize tax management
        this.taxManager = TaxManager;
    }

    /**
     * Register a new payment processor
     */
    registerProcessor(type, processor) {
        this.processors.set(type, processor);
    }

    /**
     * Register a regional payment processor
     */
    registerRegionalProcessor(region, method, processor) {
        if (!this.regionalProcessors.has(region)) {
            this.regionalProcessors.set(region, new Map());
        }
        this.regionalProcessors.get(region).set(method, processor);
    }

    /**
     * Process a payment
     */
    async processPayment(paymentData) {
        const { type, region, method } = paymentData;

        // Perform fraud check
        const fraudCheck = await this.fraudDetection.analyzeTransaction(paymentData);
        if (fraudCheck.isHighRisk) {
            throw new Error('Transaction flagged as high risk');
        }

        // Calculate applicable taxes
        const taxInfo = await this.taxManager.calculateTransactionTax(paymentData);

        // Get appropriate processor
        const processor = this.getProcessor(type, region, method);
        if (!processor) {
            throw new Error('No suitable processor found for payment method');
        }

        // Process payment
        const result = await processor.processPayment({
            ...paymentData,
            taxInfo
        });

        // Handle post-processing
        await this.handlePostProcessing(result);

        return result;
    }

    /**
     * Get appropriate processor for payment method
     */
    getProcessor(type, region, method) {
        // Check for regional processor first
        if (region && method) {
            const regionalProcessors = this.regionalProcessors.get(region);
            if (regionalProcessors?.has(method)) {
                return regionalProcessors.get(method);
            }
        }

        // Fall back to general processor
        return this.processors.get(type);
    }

    /**
     * Handle post-processing tasks
     */
    async handlePostProcessing(result) {
        // Record transaction
        await this.recordTransaction(result);

        // Send notifications
        await this.sendNotifications(result);

        // Update balances
        await this.updateBalances(result);
    }

    /**
     * Get supported payment methods for a region
     */
    getSupportedMethods(region) {
        const methods = new Set();

        // Add general payment methods
        this.processors.forEach((_, type) => methods.add(type));

        // Add regional payment methods
        if (this.regionalProcessors.has(region)) {
            this.regionalProcessors.get(region).forEach((_, method) => methods.add(method));
        }

        return Array.from(methods);
    }

    /**
     * Check processor status
     */
    async checkProcessorStatus(type, region, method) {
        const processor = this.getProcessor(type, region, method);
        if (!processor) {
            throw new Error('Processor not found');
        }
        return processor.checkStatus();
    }
}

export default new PaymentProcessorRegistry();
