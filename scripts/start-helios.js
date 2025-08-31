#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const ora = require('ora');

async function checkEnvironment() {
    const spinner = ora('Checking environment...').start();
    try {
        const requiredEnvVars = [
            'OPENAI_API_KEY',
            'DEEPSEEK_API_KEY',
            'MODEL_PATH',
            'VECTOR_STORE_PATH',
            'REQUEST_SIGNING_SECRET',
            'MAX_REQUESTS_PER_MINUTE',
            'MAX_TOKENS_PER_REQUEST',
            'LEARNING_ENABLED',
            'LEARNING_MODEL_PATH',
            'VECTOR_DB_TYPE',
            'EMBEDDING_MODEL'
        ];
        const missing = requiredEnvVars.filter(v => !process.env[v]);
        if (missing.length) {
            throw new Error(`Missing environment variables: ${missing.join(', ')}`);
        }

        // Validate OpenAI API key format
        if (!process.env.OPENAI_API_KEY.startsWith('sk_')) {
            throw new Error('Invalid OpenAI API key format');
        }

        // Validate DeepSeek API key format
        if (!process.env.DEEPSEEK_API_KEY.startsWith('dsk_')) {
            throw new Error('Invalid DeepSeek API key format');
        }

        spinner.succeed('Environment check passed');
    } catch (error) {
        spinner.fail(`Environment check failed: ${error.message}`);
        process.exit(1);
    }
}

async function verifyDirectories() {
    const spinner = ora('Verifying directories...').start();
    try {
        const dirs = [
            process.env.MODEL_PATH,
            process.env.VECTOR_STORE_PATH,
            process.env.LEARNING_MODEL_PATH,
            path.join(process.env.MODEL_PATH, 'embeddings'),
            path.join(process.env.MODEL_PATH, 'language')
        ];
        
        for (const dir of dirs) {
            await fs.mkdir(dir, { recursive: true, mode: 0o750 });
            // Verify write permissions
            const testFile = path.join(dir, '.write-test');
            await fs.writeFile(testFile, 'test');
            await fs.unlink(testFile);
        }
        
        spinner.succeed('Directory verification passed');
    } catch (error) {
        spinner.fail(`Directory verification failed: ${error.message}`);
        process.exit(1);
    }
}

// Start Helios
async function startHelios() {
    await checkEnvironment();
    await verifyDirectories();
    
    const spinner = ora('Starting Helios AI...').start();
    try {
        // Start the AI service
        const helios = spawn('node', ['src/ai/core/helios.js'], {
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: 'production'
            }
        });

        helios.on('error', (err) => {
            spinner.fail(`Failed to start Helios: ${err.message}`);
            process.exit(1);
        });

        helios.on('exit', (code) => {
            if (code !== 0) {
                spinner.fail(`Helios exited with code ${code}`);
                process.exit(code);
            }
        });

        spinner.succeed('Helios AI started successfully');
    } catch (error) {
        spinner.fail(`Failed to start Helios: ${error.message}`);
        process.exit(1);
    }
}

startHelios().catch(console.error);
