/**
 * Encryption Configuration
 */

module.exports = {
    algorithm: 'aes-256-gcm',
    keyLength: 256,
    ivLength: 16,
    tagLength: 16,
    saltLength: 64,
    iterations: 100000,
    memory: 64 * 1024 * 1024, // 64MB
    parallelism: 4,
    keyDerivation: 'argon2id',
    masterKeyEncryption: 'rsa-4096',
    storageEncryption: 'aes-256-gcm'
};
