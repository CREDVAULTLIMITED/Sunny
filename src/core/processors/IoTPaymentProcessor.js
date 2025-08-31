/**
 * IoT Payment Processor
 * Handles payments initiated from IoT devices
 */

import { validateIoTDevice } from '../security/deviceValidation';
import { EncryptedChannel } from '../security/encryption';
import config from '../config/config';

class IoTPaymentProcessor {
    constructor() {
        this.connectedDevices = new Map();
        this.secureChannels = new Map();
        this.initialize();
    }

    async initialize() {
        console.log('🔌 Initializing IoT Payment Processor...');
        await this.loadTrustedDevices();
        console.log('✅ IoT Payment Processor Ready');
    }

    /**
     * Process payment from an IoT device
     */
    async processIoTPayment(deviceId, paymentData) {
        try {
            // 1. Validate device
            const device = await this.validateDevice(deviceId);
            if (!device.isValid) {
                throw new Error(`Invalid IoT device: ${device.reason}`);
            }

            // 2. Establish secure channel
            const channel = await this.getSecureChannel(deviceId);

            // 3. Decrypt and validate payment data
            const validatedData = await this.validatePaymentData(channel, paymentData);

            // 4. Check device-specific limits
            await this.checkDeviceLimits(deviceId, validatedData.amount);

            // 5. Process payment
            const paymentRequest = {
                ...validatedData,
                paymentMethod: 'iot',
                deviceId,
                metadata: {
                    deviceType: device.type,
                    deviceModel: device.model,
                    deviceLocation: device.location,
                    secureChannel: channel.id
                }
            };

            return await PaymentOrchestrator.processPayment(paymentRequest);
        } catch (error) {
            console.error('IoT payment processing error:', error);
            throw error;
        }
    }

    /**
     * Register a new IoT device
     */
    async registerDevice(deviceInfo) {
        const {
            deviceId,
            deviceType,
            publicKey,
            capabilities,
            location
        } = deviceInfo;

        // Validate device registration request
        if (!this.isValidRegistration(deviceInfo)) {
            throw new Error('Invalid device registration data');
        }

        // Create device profile
        const device = {
            id: deviceId,
            type: deviceType,
            publicKey,
            capabilities,
            location,
            status: 'active',
            registeredAt: new Date(),
            lastSeen: new Date(),
            transactionLimit: config.iot.defaultTransactionLimit
        };

        // Store device info
        await this.storeDeviceInfo(device);

        // Establish initial secure channel
        const channel = await this.establishSecureChannel(deviceId, publicKey);

        return {
            success: true,
            deviceId,
            channelId: channel.id,
            transactionLimit: device.transactionLimit
        };
    }

    /**
     * Validate IoT device
     */
    async validateDevice(deviceId) {
        const device = this.connectedDevices.get(deviceId);
        if (!device) {
            return { isValid: false, reason: 'Device not registered' };
        }

        // Check device status
        if (device.status !== 'active') {
            return { isValid: false, reason: 'Device inactive' };
        }

        // Validate device signature
        const validationResult = await validateIoTDevice(deviceId);
        if (!validationResult.valid) {
            return { isValid: false, reason: validationResult.reason };
        }

        return {
            isValid: true,
            type: device.type,
            model: device.model,
            location: device.location
        };
    }

    /**
     * Get or establish secure channel with device
     */
    async getSecureChannel(deviceId) {
        let channel = this.secureChannels.get(deviceId);
        
        // Create new channel if none exists or current one is expired
        if (!channel || channel.isExpired()) {
            const device = this.connectedDevices.get(deviceId);
            channel = await this.establishSecureChannel(deviceId, device.publicKey);
            this.secureChannels.set(deviceId, channel);
        }

        return channel;
    }

    /**
     * Establish secure channel with device
     */
    async establishSecureChannel(deviceId, publicKey) {
        const channel = new EncryptedChannel(deviceId, publicKey);
        await channel.initialize();
        return channel;
    }

    /**
     * Check device-specific transaction limits
     */
    async checkDeviceLimits(deviceId, amount) {
        const device = this.connectedDevices.get(deviceId);
        
        if (amount > device.transactionLimit) {
            throw new Error(`Amount exceeds device transaction limit of ${device.transactionLimit}`);
        }

        // Check daily/monthly limits here
        const periodLimits = await this.checkPeriodLimits(deviceId);
        if (!periodLimits.allowed) {
            throw new Error(periodLimits.reason);
        }
    }

    /**
     * Load trusted devices from storage
     */
    async loadTrustedDevices() {
        // In production, this would load from a secure database
        // For now, we'll use an in-memory store
        this.connectedDevices = new Map();
    }

    /**
     * Store device information
     */
    async storeDeviceInfo(device) {
        // In production, this would store in a secure database
        this.connectedDevices.set(device.id, device);
    }

    /**
     * Check if device registration data is valid
     */
    isValidRegistration(deviceInfo) {
        return (
            deviceInfo.deviceId &&
            deviceInfo.deviceType &&
            deviceInfo.publicKey &&
            this.isSupportedDeviceType(deviceInfo.deviceType)
        );
    }

    /**
     * Check if device type is supported
     */
    isSupportedDeviceType(type) {
        return config.iot.supportedDeviceTypes.includes(type);
    }

    /**
     * Check period limits (daily/monthly)
     */
    async checkPeriodLimits(deviceId) {
        // This would check against configured daily/monthly limits
        // For now, return allowed
        return { allowed: true };
    }
}

export default new IoTPaymentProcessor();
