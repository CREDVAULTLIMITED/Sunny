/**
 * Neural Network Service for SunnyAI
 * Implements financial data learning and prediction capabilities
 */

const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs').promises;

class NeuralNetworkService {
    constructor(config) {
        this.config = config;
        this.model = null;
        this.initialized = false;
    }

    async initialize() {
        try {
            await this.loadOrCreateModel();
            this.initialized = true;
            console.log('Neural network initialized successfully');
        } catch (error) {
            console.error('Failed to initialize neural network:', error);
            throw error;
        }
    }

    async loadOrCreateModel() {
        const modelPath = path.join(this.config.neuralNetwork.checkpointDir, 'model.json');
        try {
            await fs.access(modelPath);
            this.model = await tf.loadLayersModel(`file://${modelPath}`);
            console.log('Loaded existing model');
        } catch {
            console.log('Creating new model');
            this.model = this.createModel();
            await this.saveModel();
        }
    }

    createModel() {
        const { inputDim, hiddenDim, numLayers } = this.config.neuralNetwork;

        const model = tf.sequential();

        // Input layer
        model.add(tf.layers.dense({
            inputShape: [inputDim],
            units: hiddenDim,
            activation: 'relu'
        }));

        // Hidden layers
        for (let i = 0; i < numLayers; i++) {
            model.add(tf.layers.dense({
                units: hiddenDim,
                activation: 'relu'
            }));
        }

        // Output layer
        model.add(tf.layers.dense({
            units: inputDim,
            activation: 'linear'
        }));

        model.compile({
            optimizer: tf.train.adam(this.config.neuralNetwork.learningRate),
            loss: 'meanSquaredError'
        });

        return model;
    }

    async train(data) {
        if (!this.initialized) {
            throw new Error('Neural network not initialized');
        }

        const { batchSize } = this.config.neuralNetwork;
        
        // Convert data to tensors
        const xs = tf.tensor2d(data.inputs);
        const ys = tf.tensor2d(data.outputs);

        // Train the model
        const result = await this.model.fit(xs, ys, {
            batchSize,
            epochs: 1,
            shuffle: true
        });

        // Cleanup
        xs.dispose();
        ys.dispose();

        return result;
    }

    async predict(input) {
        if (!this.initialized) {
            throw new Error('Neural network not initialized');
        }

        const inputTensor = tf.tensor2d([input]);
        const prediction = this.model.predict(inputTensor);
        const result = await prediction.array();
        
        // Cleanup
        inputTensor.dispose();
        prediction.dispose();

        return result[0];
    }

    async saveModel() {
        const modelPath = `file://${this.config.neuralNetwork.checkpointDir}/model`;
        await this.model.save(modelPath);
        console.log('Model saved successfully');
    }
}

module.exports = NeuralNetworkService;
