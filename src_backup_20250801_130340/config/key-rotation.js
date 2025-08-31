/**
 * Key Rotation Configuration
 */

module.exports = {
    rotationPeriodDays: 30, // Rotate keys every 30 days
    automaticRotation: true,
    keyTypes: ['encryption', 'signing', 'master'],
    backupKeys: true,
    minimumKeyAge: 24 * 60 * 60 * 1000, // 24 hours
    maximumKeyAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    alertBeforeExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
    keyStorage: 'vault',
    hsm: {
        enabled: true,
        provider: 'aws-cloudhsm'
    }
};
