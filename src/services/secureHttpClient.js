const https = require('https');
const crypto = require('crypto');
const { promisify } = require('util');
const { RateLimiter } = require('limiter');

class SecureHttpClient {
    constructor(config = {}) {
        this.config = {
            maxRequestsPerMinute: config.maxRequestsPerMinute || 30,
            maxResponseSize: config.maxResponseSize || 5 * 1024 * 1024, // 5MB
            timeout: config.timeout || 10000, // 10 seconds
            allowedDomains: config.allowedDomains || [],
            requireSigning: config.requireSigning || true
        };

        // Initialize rate limiter
        this.rateLimiter = new RateLimiter({
            tokensPerInterval: this.config.maxRequestsPerMinute,
            interval: 60 * 1000
        });

        // Pre-compile allowed domains regex
        this.allowedDomainsRegex = this.config.allowedDomains.map(
            domain => new RegExp(`^https?://(.*\\.)?${domain.replace(/\./g, '\\.')}`)
        );
    }

    async fetch(url, options = {}) {
        // Wait for rate limiter
        await this.rateLimiter.removeTokens(1);

        // Validate URL
        if (!this.isUrlAllowed(url)) {
            throw new Error('URL not allowed');
        }

        // Sign request if required
        if (this.config.requireSigning) {
            options.headers = {
                ...options.headers,
                'X-Request-Signature': this.signRequest(url, options)
            };
        }

        return new Promise((resolve, reject) => {
            const req = https.request(url, {
                ...options,
                timeout: this.config.timeout
            }, (res) => {
                let data = '';
                let size = 0;

                res.on('data', (chunk) => {
                    size += chunk.length;
                    if (size > this.config.maxResponseSize) {
                        req.destroy();
                        reject(new Error('Response too large'));
                        return;
                    }
                    data += chunk;
                });

                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data
                    });
                });
            });

            req.on('error', reject);
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timed out'));
            });

            if (options.body) {
                req.write(options.body);
            }
            req.end();
        });
    }

    isUrlAllowed(url) {
        try {
            const urlObj = new URL(url);
            return this.allowedDomainsRegex.some(regex => regex.test(urlObj.origin));
        } catch {
            return false;
        }
    }

    signRequest(url, options) {
        const data = `${url}${JSON.stringify(options.body || '')}`;
        return crypto
            .createHmac('sha256', process.env.REQUEST_SIGNING_SECRET || 'default-secret')
            .update(data)
            .digest('hex');
    }
}

module.exports = SecureHttpClient;
