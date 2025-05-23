/**
 * Sunny Payment Gateway - Integration Test Runner
 * 
 * Comprehensive test suite for the entire payment system including:
 * - Payment processor integration
 * - AI learning system
 * - Web learning capabilities
 * - Market data integration
 * - Payment routing optimization
 */

import { runPaymentProcessorTests } from './payment-processors-test.js';
import { runAILearningTests } from './ai-learning-test.js';
import { runWebLearningTests } from './web-learning-test.js';
import { runMarketDataTests } from './market-data-test.js';
import { runPaymentRoutingTests } from './payment-routing-test.js';
import { runSecurityTests } from './security-test.js';

// Test configuration
const config = {
  // Run mode can be 'all', 'processors', 'ai', 'web', 'market', 'routing', 'security'
  runMode: process.env.TEST_MODE || 'all',
  
  // Test environment - 'development', 'test', or 'sandbox'
  environment: process.env.TEST_ENV || 'test',
  
  // Logging level - 'silent', 'minimal', 'verbose'
  logLevel: process.env.TEST_LOG_LEVEL || 'minimal',
  
  // Whether to use live APIs or mocks
  useLiveAPIs: process.env.USE_LIVE_APIS === 'true',
  
  // Whether to use real payment processors (WARNING: may incur charges)
  useRealProcessors: process.env.USE_REAL_PROCESSORS === 'true',
  
  // Timeout for individual tests in milliseconds
  testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000', 10),
  
  // Test data directory
  testDataDir: process.env.TEST_DATA_DIR || './test-data'
};

/**
 * Main test runner
 */
async function runTests() {
  console.log('🌞 Starting Sunny Payment Gateway Integration Tests');
  console.log(`Environment: ${config.environment}`);
  console.log(`Log Level: ${config.logLevel}`);
  console.log(`Using Live APIs: ${config.useLiveAPIs ? 'Yes' : 'No'}`);
  console.log(`Using Real Processors: ${config.useRealProcessors ? 'Yes' : 'No'}`);
  console.log('----------------------------------------');
  
  const startTime = Date.now();
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    errors: []
  };
  
  try {
    // Run payment processor tests
    if (config.runMode === 'all' || config.runMode === 'processors') {
      const processorResults = await runPaymentProcessorTests(config);
      mergeResults(results, processorResults);
    }
    
    // Run AI learning tests
    if (config.runMode === 'all' || config.runMode === 'ai') {
      const aiResults = await runAILearningTests(config);
      mergeResults(results, aiResults);
    }
    
    // Run web learning tests
    if (config.runMode === 'all' || config.runMode === 'web') {
      const webResults = await runWebLearningTests(config);
      mergeResults(results, webResults);
    }
    
    // Run market data tests
    if (config.runMode === 'all' || config.runMode === 'market') {
      const marketResults = await runMarketDataTests(config);
      mergeResults(results, marketResults);
    }
    
    // Run payment routing tests
    if (config.runMode === 'all' || config.runMode === 'routing') {
      const routingResults = await runPaymentRoutingTests(config);
      mergeResults(results, routingResults);
    }
    
    // Run security tests
    if (config.runMode === 'all' || config.runMode === 'security') {
      const securityResults = await runSecurityTests(config);
      mergeResults(results, securityResults);
    }
  } catch (error) {
    console.error('Test runner encountered an unhandled error:', error);
    results.errors.push({
      name: 'TestRunnerError',
      message: error.message,
      stack: error.stack
    });
  }
  
  // Print test results
  const duration = (Date.now() - startTime) / 1000;
  console.log('----------------------------------------');
  console.log(`🌞 Sunny Payment Gateway Integration Tests Complete`);
  console.log(`Duration: ${duration.toFixed(2)}s`);
  console.log(`Total Tests: ${results.total}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Skipped: ${results.skipped}`);
  
  if (results.errors.length > 0) {
    console.log('----------------------------------------');
    console.log('Errors:');
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.name}: ${error.message}`);
      if (config.logLevel === 'verbose' && error.stack) {
        console.log(error.stack);
      }
    });
  }
  
  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

/**
 * Merge test results
 * 
 * @param {Object} target - Target results object
 * @param {Object} source - Source results object
 */
function mergeResults(target, source) {
  target.total += source.total;
  target.passed += source.passed;
  target.failed += source.failed;
  target.skipped += source.skipped;
  target.errors = [...target.errors, ...source.errors];
}

// Run the tests
runTests().catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});

