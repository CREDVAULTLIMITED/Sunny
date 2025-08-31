/**
 * Voice Payment Processor
 */

import { SpeechToText } from '../ai/SpeechToText';
import { NaturalLanguageProcessor } from '../ai/NLP';
import { BiometricAuthenticator } from '../security/BiometricAuthenticator';
import { PaymentIntentBuilder } from './PaymentIntentBuilder';
import config from '../config/config';

class VoicePaymentProcessor {
    constructor() {
        this.speechToText = new SpeechToText();
        this.nlp = new NaturalLanguageProcessor();
        this.biometricAuth = BiometricAuthenticator;
        this.initialize();
    }

    async initialize() {
        console.log('🎤 Initializing Voice Payment Processor...');
        await this.speechToText.initialize();
        await this.nlp.initialize();
        console.log('✅ Voice Payment Processor Ready');
    }

    /**
     * Process a voice payment request
     */
    async processVoicePayment(voiceData, userId) {
        try {
            // 1. Voice authentication
            const authResult = await this.biometricAuth.verify(userId, {
                type: 'voice',
                data: voiceData
            });

            if (!authResult.success) {
                throw new Error('Voice authentication failed');
            }

            // 2. Convert speech to text
            const text = await this.speechToText.convert(voiceData);

            // 3. Extract payment intent from text
            const paymentIntent = await this.extractPaymentIntent(text);

            // 4. Confirm with user
            await this.confirmPaymentIntent(paymentIntent, userId);

            // 5. Process payment
            return await this.processPayment(paymentIntent, userId);

        } catch (error) {
            console.error('Voice payment processing error:', error);
            throw error;
        }
    }

    /**
     * Extract payment intent from voice command
     */
    async extractPaymentIntent(text) {
        // Use NLP to understand the payment intent
        const intent = await this.nlp.extractIntent(text);

        if (intent.confidence < config.voice.minConfidence) {
            throw new Error('Could not understand payment intent clearly');
        }

        return new PaymentIntentBuilder()
            .setAmount(intent.amount)
            .setCurrency(intent.currency)
            .setRecipient(intent.recipient)
            .setDescription(intent.description)
            .build();
    }

    /**
     * Confirm payment intent with user
     */
    async confirmPaymentIntent(paymentIntent, userId) {
        // In a real implementation, this would interact with the user
        // through voice or other means to confirm the payment details
        return {
            confirmed: true,
            confirmedAt: new Date()
        };
    }

    /**
     * Process the payment after confirmation
     */
    async processPayment(paymentIntent, userId) {
        // Convert voice payment intent to standard payment request
        const paymentRequest = {
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            paymentMethod: 'voice',
            userId,
            metadata: {
                voiceAuthenticated: true,
                intentConfidence: paymentIntent.confidence,
                originalCommand: paymentIntent.originalText
            }
        };

        // Use standard payment processing
        return await PaymentOrchestrator.processPayment(paymentRequest);
    }

    /**
     * Get supported voice commands
     */
    getSupportedCommands() {
        return [
            'pay {amount} to {recipient}',
            'send {amount} to {recipient}',
            'transfer {amount} to {recipient}',
            'pay {recipient} {amount} for {description}'
        ];
    }

    /**
     * Check if voice payments are available for user
     */
    async isAvailableForUser(userId) {
        // Check if user has completed voice enrollment
        const hasVoiceTemplate = await this.biometricAuth.getTemplate(userId);
        
        // Check if user's device supports voice input
        const deviceCapabilities = await this.checkDeviceCapabilities(userId);

        return {
            available: hasVoiceTemplate && deviceCapabilities.supportsVoice,
            reasons: !hasVoiceTemplate ? ['Voice enrollment required'] : [],
            deviceSupported: deviceCapabilities.supportsVoice
        };
    }

    /**
     * Check device capabilities
     */
    async checkDeviceCapabilities(userId) {
        // This would check the user's device capabilities in production
        return {
            supportsVoice: true,
            supportsNoise: true,
            microphoneAccess: true
        };
    }
}

export default new VoicePaymentProcessor();
