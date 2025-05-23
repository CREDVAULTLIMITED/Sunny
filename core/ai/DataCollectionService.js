/**
 * Data Collection Service for SunnyAI
 * Implements continuous learning from web sources and user interactions
 */

const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

class DataCollectionService {
    constructor(config) {
        this.config = config;
        this.collectionInterval = null;
        this.datasetPath = path.join(this.config.continuousLearning.dataDirectory, 'dataset.json');
    }

    async initialize() {
        try {
            await this.ensureDirectories();
            await this.loadDataset();
            if (this.config.continuousLearning.enabled) {
                this.startCollection();
            }
            console.log('Data collection service initialized');
        } catch (error) {
            console.error('Failed to initialize data collection:', error);
            throw error;
        }
    }

    async ensureDirectories() {
        const dirs = [
            this.config.continuousLearning.dataDirectory,
            path.join(this.config.continuousLearning.dataDirectory, 'web'),
            path.join(this.config.continuousLearning.dataDirectory, 'user')
        ];

        for (const dir of dirs) {
            await fs.mkdir(dir, { recursive: true });
        }
    }

    async loadDataset() {
        try {
            const data = await fs.readFile(this.datasetPath, 'utf8');
            this.dataset = JSON.parse(data);
        } catch {
            this.dataset = {
                web: [],
                user: [],
                metadata: {
                    lastUpdate: new Date().toISOString(),
                    version: '1.0'
                }
            };
            await this.saveDataset();
        }
    }

    async saveDataset() {
        await fs.writeFile(
            this.datasetPath,
            JSON.stringify(this.dataset, null, 2),
            'utf8'
        );
    }

    startCollection() {
        this.collectionInterval = setInterval(
            () => this.collectData(),
            this.config.continuousLearning.dataCollectionInterval * 1000
        );
    }

    stopCollection() {
        if (this.collectionInterval) {
            clearInterval(this.collectionInterval);
        }
    }

    async collectData() {
        try {
            const webData = await this.collectWebData();
            this.dataset.web.push(...webData);
            
            // Trim dataset if it exceeds max size
            while (this.dataset.web.length > this.config.continuousLearning.maxDatasetSize) {
                this.dataset.web.shift();
            }

            await this.saveDataset();
            console.log(`Collected ${webData.length} new data points`);
        } catch (error) {
            console.error('Error collecting data:', error);
        }
    }

    async collectWebData() {
        const { sources, maxConcurrentRequests, requestDelay } = this.config.continuousLearning.webLearning;
        const data = [];

        // Collect data from each source
        for (let i = 0; i < sources.length; i += maxConcurrentRequests) {
            const batch = sources.slice(i, i + maxConcurrentRequests);
            const promises = batch.map(url => this.fetchUrl(url));
            
            const results = await Promise.all(promises);
            data.push(...results.filter(Boolean));

            // Respect rate limiting
            await new Promise(resolve => setTimeout(resolve, requestDelay));
        }

        return data;
    }

    async fetchUrl(url) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            
            // Extract relevant financial data
            const text = $('body').text().trim();
            const tables = $('table').map((i, el) => {
                return $(el).text().trim();
            }).get();

            return {
                url,
                timestamp: new Date().toISOString(),
                content: {
                    text,
                    tables
                },
                hash: this.hashContent(text)
            };
        } catch (error) {
            console.error(`Error fetching ${url}:`, error.message);
            return null;
        }
    }

    async recordUserInteraction(interaction) {
        this.dataset.user.push({
            ...interaction,
            timestamp: new Date().toISOString()
        });

        while (this.dataset.user.length > this.config.continuousLearning.maxDatasetSize) {
            this.dataset.user.shift();
        }

        await this.saveDataset();
    }

    hashContent(content) {
        return crypto
            .createHash('sha256')
            .update(content)
            .digest('hex');
    }

    getDataset() {
        return this.dataset;
    }
}

module.exports = DataCollectionService;
