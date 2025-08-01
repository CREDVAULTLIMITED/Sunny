#!/usr/bin/env node

/**
 * Test script for Helios local models
 * Verifies that the downloaded DeepSeek models are working
 */

const localDeepSeekService = require('./src/services/localDeepSeekService');

async function testHeliosModels() {
    console.log('🧪 Testing Helios local models with enhanced capabilities...\n');
    
    try {
        // Initialize the service
        console.log('1. Initializing service...');
        await localDeepSeekService.initialize();
        
        // Check status
        console.log('2. Checking service status...');
        const status = await localDeepSeekService.getStatus();
        console.log(JSON.stringify(status, null, 2));
        
        // Test code generation
        console.log('\n3. Testing code generation...');
        const codePrompt = 'Generate a simple React component for a payment form';
        const codeResponse = await localDeepSeekService.generateResponse(codePrompt, 'code');
        console.log('Code Response:');
        console.log(codeResponse.substring(0, 200) + '...');
        
        // Test reasoning with knowledge
        console.log('\n4. Testing enhanced reasoning capabilities...');
        const reasoningPrompt = 'What are the benefits of using local AI models for payment processing?';
        const reasoningResponse = await localDeepSeekService.generateResponse(reasoningPrompt, 'reasoning');
        
        // Test internet capabilities
        console.log('\n5. Testing internet search...');
        const searchQuery = 'latest developments in AI payment processing';
        const searchResults = await localDeepSeekService.searchInternet(searchQuery);
        console.log('Internet Search Results:', JSON.stringify(searchResults, null, 2));
        
        // Test learning system
        console.log('\n6. Testing learning capabilities...');
        const learningAnalysis = await localDeepSeekService.learningManager.analyzeKnowledge('payment processing');
        console.log('Learning Analysis:', JSON.stringify(learningAnalysis, null, 2));
        console.log('Reasoning Response:');
        console.log(reasoningResponse.substring(0, 200) + '...');
        
        console.log('\n✅ All tests completed successfully!');
        console.log('🚀 Your Helios models are ready to use!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

// Run the test
if (require.main === module) {
    testHeliosModels();
}

module.exports = { testHeliosModels };

