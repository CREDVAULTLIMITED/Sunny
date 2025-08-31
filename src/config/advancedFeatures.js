/**
 * Advanced payment features configuration
 */

const config = {
    ai: {
        modelPath: '/models/payment-routing-v2',
        minConfidence: 0.85,
        updateInterval: 3600000, // 1 hour
        features: {
            smartRouting: true,
            fraudDetection: true,
            behavioralAnalysis: true
        }
    },
    biometric: {
        matchThreshold: 0.95,
        types: ['fingerprint', 'face', 'voice'],
        updateTemplateThreshold: 0.98,
        maxTemplateAge: 7776000, // 90 days
        features: {
            adaptiveTemplates: true,
            livenessDetection: true,
            multiModalFusion: true
        }
    },
    voice: {
        minConfidence: 0.9,
        maxCommandDuration: 10000, // 10 seconds
        noiseThreshold: -40, // dB
        features: {
            noiseCancellation: true,
            speakerVerification: true,
            naturalLanguageUnderstanding: true
        }
    },
    iot: {
        defaultTransactionLimit: 1000,
        channelTimeout: 3600, // 1 hour
        supportedDeviceTypes: [
            'pos_terminal',
            'smart_register',
            'vending_machine',
            'payment_kiosk',
            'smart_device'
        ],
        security: {
            requireSecureElement: true,
            requireEncryption: true,
            requireSignature: true
        },
        limits: {
            daily: 5000,
            monthly: 50000,
            perTransaction: 1000
        }
    },
    security: {
        riskThreshold: 0.7,
        maxRetries: 3,
        sessionTimeout: 1800, // 30 minutes
        requireMFA: true,
        features: {
            realTimeFraudDetection: true,
            behavioralBiometrics: true,
            deviceFingerprinting: true,
            locationIntelligence: true
        }
    }
};

export default config;
