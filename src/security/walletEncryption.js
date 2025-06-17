const crypto = require('crypto');
const { Buffer } = require('buffer');
const logger = require('../utils/logger');

class WalletEncryption {
    constructor() {
        this.algorithm = 'aes-256-gcm';
        this.keyLength = 32;
        this.ivLength = 16;
        this.saltLength = 64;
        this.tagLength = 16;
    }

    async encryptWallet(walletData) {
        try {
            const salt = crypto.randomBytes(this.saltLength);
            const iv = crypto.randomBytes(this.ivLength);
            
            // Derive key using PBKDF2
            const key = crypto.pbkdf2Sync(
                process.env.CRYPTO_ENCRYPTION_KEY,
                salt,
                100000, // High iteration count for security
                this.keyLength,
                'sha512'
            );

            const cipher = crypto.createCipheriv(this.algorithm, key, iv);
            
            const encrypted = Buffer.concat([
                cipher.update(JSON.stringify(walletData), 'utf8'),
                cipher.final()
            ]);

            const tag = cipher.getAuthTag();

            // Combine all components
            return Buffer.concat([
                salt,
                iv,
                tag,
                encrypted
            ]).toString('base64');
        } catch (error) {
            logger.error('Wallet encryption failed:', error);
            throw new Error('Encryption failed');
        }
    }

    async decryptWallet(encryptedData) {
        try {
            const data = Buffer.from(encryptedData, 'base64');
            
            // Extract components
            const salt = data.slice(0, this.saltLength);
            const iv = data.slice(this.saltLength, this.saltLength + this.ivLength);
            const tag = data.slice(this.saltLength + this.ivLength, this.saltLength + this.ivLength + this.tagLength);
            const encrypted = data.slice(this.saltLength + this.ivLength + this.tagLength);

            // Derive the same key
            const key = crypto.pbkdf2Sync(
                process.env.CRYPTO_ENCRYPTION_KEY,
                salt,
                100000,
                this.keyLength,
                'sha512'
            );

            const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
            decipher.setAuthTag(tag);

            const decrypted = Buffer.concat([
                decipher.update(encrypted),
                decipher.final()
            ]);

            return JSON.parse(decrypted.toString('utf8'));
        } catch (error) {
            logger.error('Wallet decryption failed:', error);
            throw new Error('Decryption failed');
        }
    }
}

module.exports = new WalletEncryption();
