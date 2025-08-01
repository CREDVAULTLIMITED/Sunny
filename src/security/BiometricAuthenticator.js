/**
 * Advanced Biometric Authentication System
 */

import { encryptData, decryptData } from './encryption';
import { loadBiometricModel } from '../core/ai/ModelManager';
import config from '../config/config';

class BiometricAuthenticator {
    constructor() {
        this.model = null;
        this.templates = new Map();
        this.initialize();
    }

    async initialize() {
        console.log('🔐 Initializing Biometric Authentication...');
        this.model = await loadBiometricModel('biometric-v2');
        console.log('✅ Biometric Authentication Ready');
    }

    /**
     * Enroll a new biometric template
     */
    async enroll(userId, biometricData) {
        try {
            // Extract features from biometric data
            const features = await this.extractFeatures(biometricData);

            // Generate template
            const template = await this.generateTemplate(features);

            // Encrypt template before storage
            const encryptedTemplate = encryptData(template);

            // Store encrypted template
            await this.storeTemplate(userId, encryptedTemplate);

            return {
                success: true,
                templateId: template.id
            };
        } catch (error) {
            console.error('Biometric enrollment error:', error);
            throw new Error('Failed to enroll biometric template');
        }
    }

    /**
     * Verify biometric authentication attempt
     */
    async verify(userId, biometricData) {
        try {
            // Get stored template
            const encryptedTemplate = await this.getTemplate(userId);
            if (!encryptedTemplate) {
                throw new Error('No template found for user');
            }

            // Decrypt template
            const template = decryptData(encryptedTemplate);

            // Extract features from new biometric data
            const features = await this.extractFeatures(biometricData);

            // Compare features with template
            const matchResult = await this.compareFeatures(features, template);

            // Update template if needed (adaptive biometrics)
            if (matchResult.updateTemplate) {
                await this.updateTemplate(userId, features);
            }

            return {
                success: matchResult.success,
                score: matchResult.score,
                confidence: matchResult.confidence
            };
        } catch (error) {
            console.error('Biometric verification error:', error);
            throw new Error('Failed to verify biometric data');
        }
    }

    /**
     * Extract features from biometric data
     */
    async extractFeatures(biometricData) {
        const { type, data } = biometricData;

        switch (type) {
            case 'fingerprint':
                return this.extractFingerprintFeatures(data);
            case 'face':
                return this.extractFacialFeatures(data);
            case 'voice':
                return this.extractVoiceFeatures(data);
            default:
                throw new Error(`Unsupported biometric type: ${type}`);
        }
    }

    /**
     * Compare biometric features with stored template
     */
    async compareFeatures(features, template) {
        // Use AI model for comparison
        const result = await this.model.compare(features, template);

        return {
            success: result.score >= config.biometric.matchThreshold,
            score: result.score,
            confidence: result.confidence,
            updateTemplate: result.shouldUpdate
        };
    }

    /**
     * Extract fingerprint features
     */
    async extractFingerprintFeatures(data) {
        return await this.model.extractFingerprint(data);
    }

    /**
     * Extract facial features
     */
    async extractFacialFeatures(data) {
        return await this.model.extractFace(data);
    }

    /**
     * Extract voice features
     */
    async extractVoiceFeatures(data) {
        return await this.model.extractVoice(data);
    }

    /**
     * Store encrypted biometric template
     */
    async storeTemplate(userId, encryptedTemplate) {
        // This would store in a secure database in production
        this.templates.set(userId, encryptedTemplate);
    }

    /**
     * Get stored encrypted template
     */
    async getTemplate(userId) {
        // This would fetch from a secure database in production
        return this.templates.get(userId);
    }

    /**
     * Update stored template (adaptive biometrics)
     */
    async updateTemplate(userId, newFeatures) {
        const encryptedTemplate = await this.getTemplate(userId);
        const template = decryptData(encryptedTemplate);

        // Update template with new features
        const updatedTemplate = await this.model.updateTemplate(template, newFeatures);

        // Store updated template
        await this.storeTemplate(userId, encryptData(updatedTemplate));
    }
}

export default new BiometricAuthenticator();
