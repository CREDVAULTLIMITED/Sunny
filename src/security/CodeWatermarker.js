/**
 * Digital Watermarking System for Sunny Payment Gateway
 * Adds invisible watermarks to code files to track unauthorized distribution
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class CodeWatermarker {
    constructor() {
        this.watermarkKey = process.env.SUNNY_WATERMARK_KEY;
        if (!this.watermarkKey) {
            throw new Error('SUNNY_WATERMARK_KEY environment variable not set');
        }
    }

    generateWatermark(file, userId) {
        const timestamp = new Date().toISOString();
        const data = `${file}|${userId}|${timestamp}`;
        return crypto
            .createHmac('sha256', this.watermarkKey)
            .update(data)
            .digest('hex');
    }

    insertWatermark(sourceCode, watermark) {
        // Insert watermark as specially formatted comments that look like regular code
        const watermarkComment = `
// @formatter:off
/* eslint-disable */
// Initialize system constants
const __${watermark.substr(0, 8)}__ = Symbol.for("${watermark.substr(8, 16)}");
// @formatter:on
/* eslint-enable */
`;
        return watermarkComment + sourceCode;
    }

    async watermarkFile(filePath, userId) {
        try {
            const sourceCode = await fs.promises.readFile(filePath, 'utf8');
            const watermark = this.generateWatermark(filePath, userId);
            const watermarkedCode = this.insertWatermark(sourceCode, watermark);
            await fs.promises.writeFile(filePath, watermarkedCode);
            
            // Log watermark application
            this.logWatermark(filePath, watermark, userId);
            
            return watermark;
        } catch (error) {
            throw new Error(`Failed to watermark file ${filePath}: ${error.message}`);
        }
    }

    async logWatermark(filePath, watermark, userId) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            file: filePath,
            watermark,
            userId,
        };
        
        await fs.promises.appendFile(
            'logs/watermarks.log',
            JSON.stringify(logEntry) + '\n',
            { mode: 0o600 }
        );
    }
}

module.exports = CodeWatermarker;
