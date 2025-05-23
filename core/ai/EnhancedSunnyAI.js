/**
 * Enhanced SunnyAI Service
 * Combines TinyLlama, neural network, and continuous learning capabilities
 */

const path = require('path');
const NeuralNetworkService = require('./NeuralNetworkService');
const DataCollectionService = require('./DataCollectionService');
const { MODEL_CONFIG } = require('./config');

class EnhancedSunnyAI {
    constructor() {
        this.config = MODEL_CONFIG;
        this.neuralNetwork = new NeuralNetworkService(this.config);
        this.dataCollector = new DataCollectionService(this.config);
        this.initialized = false;
    }

    async initialize() {
        try {
            await this.neuralNetwork.initialize();
            await this.dataCollector.initialize();
            this.initialized = true;
            console.log('EnhancedSunnyAI initialized successfully');
        } catch (error) {
            console.error('Failed to initialize EnhancedSunnyAI:', error);
            throw error;
        }
    }

    async processQuery(query, context = {}) {
        if (!this.initialized) {
            throw new Error('EnhancedSunnyAI not initialized');
        }

        // Record the interaction
        await this.dataCollector.recordUserInteraction({
            type: 'query',
            query,
            context
        });

        // Get predictions from neural network
        const input = this.preprocessInput(query, context);
        const prediction = await this.neuralNetwork.predict(input);

        // Combine with TinyLlama response
        const llmResponse = await this.getLLMResponse(query, prediction);

        // Record the response
        await this.dataCollector.recordUserInteraction({
            type: 'response',
            query,
            prediction,
            response: llmResponse
        });

        return {
            response: llmResponse,
            confidence: this.calculateConfidence(prediction)
        };
    }

    async getLLMResponse(query, prediction) {
        const response = await fetch(`${this.config.endpoint}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: this.config.baseModel,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a financial AI assistant specialized in Kenyan banking and payments.'
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                temperature: this.config.parameters.temperature,
                max_tokens: this.config.parameters.max_tokens
            })
        });

        const result = await response.json();
        return result.choices[0].message.content;
    }

    preprocessInput(query, context) {
        // Convert query and context to numerical representation
        // This is a simplified version - implement more sophisticated encoding
        const encoded = new Array(this.config.neuralNetwork.inputDim).fill(0);
        
        // Add query features
        const queryChars = query.toLowerCase().split('');
        queryChars.forEach((char, i) => {
            if (i < encoded.length) {
                encoded[i] = char.charCodeAt(0) / 255; // Normalize to 0-1
            }
        });

        // Add context features
        if (context.location) {
            encoded[encoded.length - 3] = 1;
        }
        if (context.language === 'sw') {
            encoded[encoded.length - 2] = 1;
        }
        if (context.isAuthenticated) {
            encoded[encoded.length - 1] = 1;
        }

        return encoded;
    }

    calculateConfidence(prediction) {
        // Calculate confidence score based on prediction values
        const sum = prediction.reduce((a, b) => a + b, 0);
        const mean = sum / prediction.length;
        return Math.min(Math.max(mean, 0), 1);
    }

    async trainOnNewData() {
        const dataset = this.dataCollector.getDataset();
        
        // Prepare training data
        const trainingData = {
            inputs: dataset.user.map(interaction => 
                this.preprocessInput(interaction.query, interaction.context)
            ),
            outputs: dataset.user.map(interaction => 
                this.preprocessInput(interaction.response, {})
            )
        };

        // Train neural network
        if (trainingData.inputs.length > 0) {
            await this.neuralNetwork.train(trainingData);
            console.log('Training completed');
        }
    }

    async shutdown() {
        this.dataCollector.stopCollection();
        await this.neuralNetwork.saveModel();
        console.log('EnhancedSunnyAI shut down successfully');
    }
}

module.exports = EnhancedSunnyAI;
