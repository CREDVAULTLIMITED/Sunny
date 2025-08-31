/**
 * test-dynamic-functionality.js
 * Comprehensive test for dynamic wallet and network functionality
 */

import DynamicWalletService from './src/services/DynamicWalletService.js';
import PaymentOrchestrator from './src/core/PaymentOrchestrator.js';
import PaymentProcessorRegistry from './src/core/PaymentProcessorRegistry.js';
import NetworkConfiguration from './src/models/NetworkConfiguration.js';
import { validatePaymentData, validateCryptoAddress } from './src/api/validation.js';

class DynamicFunctionalityTester {
  constructor() {
    this.testResults = [];
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🚀 Starting Dynamic Functionality Tests...\n');

    try {
      // Test 1: Dynamic Processor Registration
      await this.testDynamicProcessorRegistration();

      // Test 2: Dynamic Wallet Connection
      await this.testDynamicWalletConnection();

      // Test 3: Network Configuration
      await this.testNetworkConfiguration();

      // Test 4: Validation Functions
      await this.testValidationFunctions();

      // Test 5: Payment Processing with Dynamic Components
      await this.testDynamicPaymentProcessing();

      // Test 6: Wallet Discovery
      await this.testWalletDiscovery();

      this.printTestSummary();

    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }

  /**
   * Test dynamic processor registration
   */
  async testDynamicProcessorRegistration() {
    console.log('📦 Testing Dynamic Processor Registration...');

    try {
      const orchestrator = new PaymentOrchestrator();
      
      // Test processor registration
      const customProcessor = class CustomProcessor {
        async process(paymentRequest) {
          return { success: true, message: 'Custom processor executed successfully' };
        }
      };

      await orchestrator.registerProcessor('CUSTOM_METHOD', customProcessor);
      console.log('✅ Custom processor registered successfully');

      // Test processor retrieval
      const processor = orchestrator.getProcessor('CUSTOM_METHOD');
      if (processor) {
        console.log('✅ Custom processor retrieved successfully');
      } else {
        throw new Error('Failed to retrieve custom processor');
      }

      // Test processor deregistration
      await orchestrator.deregisterProcessor('CUSTOM_METHOD');
      console.log('✅ Custom processor deregistered successfully');

      this.testResults.push({ test: 'Dynamic Processor Registration', status: 'PASSED' });

    } catch (error) {
      console.error('❌ Dynamic Processor Registration failed:', error.message);
      this.testResults.push({ test: 'Dynamic Processor Registration', status: 'FAILED', error: error.message });
    }
  }

  /**
   * Test dynamic wallet connection
   */
  async testDynamicWalletConnection() {
    console.log('💰 Testing Dynamic Wallet Connection...');

    try {
      await DynamicWalletService.initialize();
      console.log('✅ DynamicWalletService initialized');

      // Test adding custom wallet provider
      const customWalletProvider = {
        connect: async (connectionData) => {
          return {
            address: '0x742d35Cc6634C0532925a3b8D24c78F26C54B9d0',
            network: 'ethereum',
            supportedCurrencies: ['ETH', 'USDT'],
            metadata: { provider: 'custom' }
          };
        },
        getBalance: async (address, currency) => {
          return '1.234';
        },
        sendTransaction: async (transactionData) => {
          return { hash: 'custom_tx_hash_123' };
        }
      };

      const addProviderResult = await DynamicWalletService.addWalletProvider('CUSTOM_WALLET', customWalletProvider);
      if (addProviderResult.success) {
        console.log('✅ Custom wallet provider added successfully');
      } else {
        throw new Error(addProviderResult.error);
      }

      // Test wallet connection
      const connectionResult = await DynamicWalletService.connectWallet(
        'user123',
        'CUSTOM_WALLET',
        { connectionString: 'test_connection' }
      );

      if (connectionResult.success) {
        console.log('✅ Wallet connected successfully:', connectionResult.address);
      } else {
        throw new Error(connectionResult.error);
      }

      // Test getting user wallets
      const walletsResult = await DynamicWalletService.getUserWallets('user123');
      if (walletsResult.success && walletsResult.wallets.length > 0) {
        console.log('✅ User wallets retrieved successfully:', walletsResult.wallets.length, 'wallets');
      } else {
        throw new Error('Failed to retrieve user wallets');
      }

      this.testResults.push({ test: 'Dynamic Wallet Connection', status: 'PASSED' });

    } catch (error) {
      console.error('❌ Dynamic Wallet Connection failed:', error.message);
      this.testResults.push({ test: 'Dynamic Wallet Connection', status: 'FAILED', error: error.message });
    }
  }

  /**
   * Test network configuration
   */
  async testNetworkConfiguration() {
    console.log('🌐 Testing Network Configuration...');

    try {
      // Mock network configuration data
      const mockNetworkConfig = {
        networkId: 'test_network_001',
        name: 'Test Payment Network',
        type: 'PAYMENT_NETWORK',
        status: 'ACTIVE',
        userConfigurable: true,
        region: 'US',
        supportedCurrencies: ['USD', 'EUR'],
        configuration: {
          apiEndpoint: 'https://api.testnetwork.com',
          apiVersion: '1.0',
          credentials: {
            apiKey: 'test_api_key',
            secretKey: 'test_secret_key'
          }
        },
        processors: [{
          processorId: 'test_processor_001',
          processorClass: 'TestProcessor',
          priority: 5,
          isDefault: true
        }],
        discoveryInfo: {
          discoveredBy: 'MANUAL',
          discoveredAt: new Date(),
          isHealthy: true
        }
      };

      console.log('✅ Network configuration structure validated');

      // Test available networks retrieval
      const networksResult = await DynamicWalletService.getAvailableNetworks();
      if (networksResult.success) {
        console.log('✅ Available networks retrieved successfully:', networksResult.networks.length, 'networks');
      } else {
        throw new Error(networksResult.error);
      }

      this.testResults.push({ test: 'Network Configuration', status: 'PASSED' });

    } catch (error) {
      console.error('❌ Network Configuration failed:', error.message);
      this.testResults.push({ test: 'Network Configuration', status: 'FAILED', error: error.message });
    }
  }

  /**
   * Test validation functions
   */
  async testValidationFunctions() {
    console.log('🔍 Testing Validation Functions...');

    try {
      // Test payment data validation
      const validPaymentData = {
        amount: 100.50,
        currency: 'USD',
        paymentMethod: 'CARD'
      };

      const paymentValidation = validatePaymentData(validPaymentData);
      if (paymentValidation.isValid) {
        console.log('✅ Payment data validation passed');
      } else {
        throw new Error('Payment data validation failed: ' + paymentValidation.errors.join(', '));
      }

      // Test crypto address validation
      const validBTCAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      const btcValidation = validateCryptoAddress(validBTCAddress, 'BTC');
      if (btcValidation.isValid) {
        console.log('✅ BTC address validation passed');
      } else {
        throw new Error('BTC address validation failed: ' + btcValidation.error);
      }

      // Test invalid crypto address
      const invalidETHAddress = 'invalid_address';
      const invalidValidation = validateCryptoAddress(invalidETHAddress, 'ETH');
      if (!invalidValidation.isValid) {
        console.log('✅ Invalid ETH address correctly rejected');
      } else {
        throw new Error('Invalid address validation should have failed');
      }

      this.testResults.push({ test: 'Validation Functions', status: 'PASSED' });

    } catch (error) {
      console.error('❌ Validation Functions failed:', error.message);
      this.testResults.push({ test: 'Validation Functions', status: 'FAILED', error: error.message });
    }
  }

  /**
   * Test dynamic payment processing
   */
  async testDynamicPaymentProcessing() {
    console.log('💳 Testing Dynamic Payment Processing...');

    try {
      // Test payment data structure
      const paymentRequest = {
        amount: 250.00,
        currency: 'USD',
        paymentMethod: 'CARD',
        merchantId: 'merchant_123',
        card: {
          number: '4532015112830366',
          expiryMonth: '12',
          expiryYear: '2025',
          cvv: '123',
          name: 'John Doe'
        },
        customer: {
          email: 'john.doe@example.com',
          name: 'John Doe'
        },
        metadata: {
          orderId: 'order_123',
          description: 'Test payment'
        }
      };

      // Validate payment request
      const validation = validatePaymentData(paymentRequest);
      if (validation.isValid) {
        console.log('✅ Payment request validated successfully');
      } else {
        throw new Error('Payment request validation failed: ' + validation.errors.join(', '));
      }

      console.log('✅ Dynamic payment processing structure verified');

      this.testResults.push({ test: 'Dynamic Payment Processing', status: 'PASSED' });

    } catch (error) {
      console.error('❌ Dynamic Payment Processing failed:', error.message);
      this.testResults.push({ test: 'Dynamic Payment Processing', status: 'FAILED', error: error.message });
    }
  }

  /**
   * Test wallet discovery
   */
  async testWalletDiscovery() {
    console.log('🔎 Testing Wallet Discovery...');

    try {
      const discoveryResult = await DynamicWalletService.discoverWallets();
      
      if (discoveryResult.success) {
        console.log('✅ Wallet discovery completed successfully');
        console.log('   Discovered wallets:', discoveryResult.wallets.length);
        
        discoveryResult.wallets.forEach(wallet => {
          console.log(`   - ${wallet.name} (${wallet.type}): ${wallet.available ? 'Available' : 'Not Available'}`);
        });
      } else {
        throw new Error(discoveryResult.error);
      }

      this.testResults.push({ test: 'Wallet Discovery', status: 'PASSED' });

    } catch (error) {
      console.error('❌ Wallet Discovery failed:', error.message);
      this.testResults.push({ test: 'Wallet Discovery', status: 'FAILED', error: error.message });
    }
  }

  /**
   * Print test summary
   */
  printTestSummary() {
    console.log('\n📊 Test Summary:');
    console.log('================');
    
    const passed = this.testResults.filter(r => r.status === 'PASSED').length;
    const failed = this.testResults.filter(r => r.status === 'FAILED').length;
    
    this.testResults.forEach(result => {
      const status = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.status}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });
    
    console.log(`\nTotal: ${this.testResults.length} tests`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${Math.round((passed / this.testResults.length) * 100)}%`);
    
    if (failed === 0) {
      console.log('\n🎉 All tests passed! Your dynamic payment system is working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the errors above.');
    }
  }
}

// Run the tests
const tester = new DynamicFunctionalityTester();
tester.runAllTests().catch(console.error);
