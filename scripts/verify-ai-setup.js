const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { createHash } = require('crypto');

async function validateAISetup() {
    console.log('🔍 Validating AI Setup...\n');
    
    // Check environment variables
    const requiredEnvVars = {
        'OPENAI_API_KEY': val => val.startsWith('sk_'),
        'MODEL_PATH': val => path.isAbsolute(val),
        'VECTOR_STORE_PATH': val => path.isAbsolute(val),
        'LEARNING_MODEL_PATH': val => path.isAbsolute(val)
    };

    console.log('📋 Checking environment variables...');
    for (const [key, validator] of Object.entries(requiredEnvVars)) {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        if (!validator(value)) {
            throw new Error(`Invalid value for ${key}`);
        }
        console.log(`✅ ${key} is valid`);
    }

    // Load and validate model config
    console.log('\n📋 Validating model configuration...');
    const configPath = path.join(__dirname, '../src/ai/config/model-config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

    // Validate embedding model settings
    if (!config.models.embedding || !config.models.embedding.dimensions) {
        throw new Error('Invalid embedding model configuration');
    }
    console.log('✅ Embedding model configuration is valid');

    // Validate vector store settings
    if (!config.vectorStore || !config.vectorStore.dimensions === config.models.embedding.dimensions) {
        throw new Error('Vector store dimensions must match embedding dimensions');
    }
    console.log('✅ Vector store configuration is valid');

    // Validate directory structure
    console.log('\n📋 Checking directory structure...');
    const requiredDirs = [
        process.env.MODEL_PATH,
        process.env.VECTOR_STORE_PATH,
        process.env.LEARNING_MODEL_PATH,
        path.join(process.env.MODEL_PATH, 'embeddings'),
        path.join(process.env.MODEL_PATH, 'language')
    ];

    for (const dir of requiredDirs) {
        try {
            await fs.access(dir);
            console.log(`✅ Directory exists: ${dir}`);
        } catch {
            throw new Error(`Required directory does not exist: ${dir}`);
        }
    }

    // Test OpenAI API connection
    console.log('\n📋 Testing OpenAI API connection...');
    try {
        const response = await axios.get('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        if (response.status === 200) {
            console.log('✅ Successfully connected to OpenAI API');
        }
    } catch (error) {
        throw new Error(`Failed to connect to OpenAI API: ${error.message}`);
    }

    console.log('\n✨ AI Setup validation completed successfully!\n');
}

// Run validation
validateAISetup().catch(error => {
    console.error('\n❌ Validation failed:', error.message);
    process.exit(1);
});
