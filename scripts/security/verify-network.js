#!/usr/bin/env node

/**
 * Network Security Verification Script
 * Validates network security configuration for PCI DSS compliance
 */

const NetworkValidator = require('../../src/security/networkValidator');

async function verifyNetwork() {
    console.log('🔒 Starting network security verification...');
    
    try {
        const validator = new NetworkValidator();
        const results = await validator.validateNetworkSecurity();
        
        if (results.secure) {
            console.log('\n✅ Network security verification passed');
            console.log('\nDetails:');
            console.log('- Network Segmentation:', results.details.segmentation.cardholderNetwork);
            console.log('- IDP Status:', results.details.idp.ids, '/', results.details.idp.ips);
            console.log('- Network Monitoring:', results.details.monitoring.traffic);
            console.log('- Wireless Security:', results.details.wireless.encryption);
            process.exit(0);
        } else {
            console.log('\n❌ Network security verification failed');
            console.log('\nFailures:');
            if (!results.details.segmentation.valid) {
                console.log('- Network segmentation is insufficient');
            }
            if (!results.details.idp.active) {
                console.log('- Intrusion detection/prevention is not active');
            }
            if (!results.details.monitoring.enabled) {
                console.log('- Network monitoring is not properly configured');
            }
            if (!results.details.wireless.secure) {
                console.log('- Wireless security does not meet requirements');
            }
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Network verification failed:', error.message);
        process.exit(1);
    }
}

verifyNetwork();
