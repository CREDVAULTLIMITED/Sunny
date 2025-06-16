/**
 * TaxManager.js
 * Comprehensive tax management system for global payments
 */

import { calculateTaxRate } from '../utils/taxCalculator';
import { detectLocation } from '../utils/geoDetection';
import { validateAddress } from '../utils/addressValidation';

class TaxManager {
    constructor() {
        this.taxRates = new Map();
        this.exemptions = new Map();
        this.reportingQueue = new Map();
        this.registrationThresholds = new Map();
        this.productCategories = new Map();
    }

    /**
     * Calculate tax for a transaction with enhanced location detection
     */
    async calculateTransactionTax(transaction) {
        const {
            amount,
            currency,
            sourceCountry,
            destinationCountry,
            merchantId,
            transactionType,
            customerIp,
            billingAddress,
            shippingAddress,
            productType
        } = transaction;

        // Enhanced location detection
        const detectedLocation = await detectLocation({
            ip: customerIp,
            billingAddress: await validateAddress(billingAddress),
            shippingAddress: await validateAddress(shippingAddress)
        });

        // Get merchant's tax profile with thresholds
        const merchantTaxProfile = await this.getMerchantTaxProfile(merchantId);
        
        // Check registration requirements
        await this.checkRegistrationRequirements(merchantId, detectedLocation.country, amount);

        // Calculate applicable tax rate with product classification
        const taxRate = await calculateTaxRate({
            amount,
            currency,
            sourceCountry,
            destinationCountry: detectedLocation.country,
            merchantProfile: merchantTaxProfile,
            transactionType,
            productType: await this.classifyProduct(productType)
        });

        // Calculate tax amount with precision
        const taxAmount = (amount * taxRate).toFixed(2);

        // Enhanced reporting data
        const taxRecord = {
            transactionId: transaction.id,
            merchantId,
            taxAmount,
            taxRate,
            timestamp: new Date(),
            location: detectedLocation,
            classification: {
                productType: await this.classifyProduct(productType),
                transactionType
            },
            details: {
                sourceCountry,
                destinationCountry: detectedLocation.country,
                currency,
                amount
            }
        };

        // Queue for reporting
        await this.queueForReporting(taxRecord);

        return {
            taxRate,
            taxAmount,
            currency,
            calculationDetails: {
                appliedRules: taxRate.appliedRules,
                exemptions: taxRate.exemptions,
                location: detectedLocation,
                timestamp: new Date()
            }
        };
    }

    /**
     * Check if merchant needs to register for tax in a jurisdiction
     */
    async checkRegistrationRequirements(merchantId, country, amount) {
        const threshold = await this.getRegistrationThreshold(country);
        const currentVolume = await this.getMerchantVolumeInCountry(merchantId, country);
        
        if (currentVolume + amount >= threshold) {
            await this.notifyRegistrationRequired(merchantId, country, threshold);
        }
    }

    /**
     * Classify product for tax purposes
     */
    async classifyProduct(productType) {
        const categories = {
            PHYSICAL: 'physical_goods',
            DIGITAL: 'digital_goods',
            SERVICE: 'services',
            SUBSCRIPTION: 'subscription'
        };

        return this.productCategories.get(productType) || categories[productType] || 'other';
    }

    /**
     * Queue transaction for tax reporting
     */
    async queueForReporting(taxRecord) {
        const reportingPeriod = this.getCurrentReportingPeriod();
        if (!this.reportingQueue.has(reportingPeriod)) {
            this.reportingQueue.set(reportingPeriod, []);
        }
        this.reportingQueue.get(reportingPeriod).push(taxRecord);
    }

    /**
     * Generate tax report for period
     */
    async generateTaxReport(period) {
        const records = this.reportingQueue.get(period) || [];
        const report = {
            period,
            totalTransactions: records.length,
            totalTaxCollected: records.reduce((sum, record) => sum + parseFloat(record.taxAmount), 0),
            breakdown: {
                byCountry: this.groupByCountry(records),
                byMerchant: this.groupByMerchant(records),
                byCurrency: this.groupByCurrency(records)
            },
            generatedAt: new Date(),
            reportId: crypto.randomUUID()
        };

        // Store report
        await this.storeReport(report);
        return report;
    }

    /**
     * Get merchant's tax profile including exemptions and special rates
     */
    async getMerchantTaxProfile(merchantId) {
        // TODO: Implement merchant tax profile retrieval from database
        return {
            id: merchantId,
            taxExemptions: this.exemptions.get(merchantId) || [],
            specialRates: this.taxRates.get(merchantId) || {}
        };
    }

    /**
     * Group records by country for reporting
     */
    groupByCountry(records) {
        return records.reduce((groups, record) => {
            const source = record.details.sourceCountry;
            const destination = record.details.destinationCountry;
            
            if (!groups[source]) groups[source] = { sent: 0, received: 0 };
            if (!groups[destination]) groups[destination] = { sent: 0, received: 0 };
            
            groups[source].sent += parseFloat(record.taxAmount);
            groups[destination].received += parseFloat(record.taxAmount);
            
            return groups;
        }, {});
    }

    /**
     * Group records by merchant for reporting
     */
    groupByMerchant(records) {
        return records.reduce((groups, record) => {
            const { merchantId } = record;
            if (!groups[merchantId]) groups[merchantId] = 0;
            groups[merchantId] += parseFloat(record.taxAmount);
            return groups;
        }, {});
    }

    /**
     * Group records by currency for reporting
     */
    groupByCurrency(records) {
        return records.reduce((groups, record) => {
            const { currency } = record.details;
            if (!groups[currency]) groups[currency] = 0;
            groups[currency] += parseFloat(record.taxAmount);
            return groups;
        }, {});
    }

    /**
     * Store tax report in database
     */
    async storeReport(report) {
        // TODO: Implement report storage in database
        console.log(`Storing tax report ${report.reportId} for period ${report.period}`);
    }

    /**
     * Get current reporting period (e.g., current month)
     */
    getCurrentReportingPeriod() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }
}

const taxManager = new TaxManager();
export default taxManager;
