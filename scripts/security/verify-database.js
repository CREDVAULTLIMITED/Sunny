#!/usr/bin/env node

/**
 * Database Security Verification Script
 * Validates database security configuration for PCI DSS compliance
 */

const DatabaseSecurityValidator = require('../../src/security/databaseSecurity');

async function verifyDatabase() {
    console.log('🔒 Starting database security verification...');
    
    try {
        const validator = new DatabaseSecurityValidator();
        const results = await validator.checkDatabaseSecurity();
        
        if (results.secure) {
            console.log('\n✅ Database security verification passed');
            console.log('\nDetails:');
            console.log('- Encryption:', results.encryption.algorithm);
            console.log('- Access Control:', results.access.rolesConfigured ? 'Configured' : 'Not Configured');
            console.log('- Audit Logging:', results.audit.retention);
            
            const backup = await validator.validateBackupSecurity();
            const queries = await validator.validateQuerySecurity();
            
            console.log('- Backup Security:', backup.secure ? 'Secure' : 'Insecure');
            console.log('- Query Security:', queries.secure ? 'Secure' : 'Insecure');
            process.exit(0);
        } else {
            console.log('\n❌ Database security verification failed');
            console.log('\nFailures:');
            if (!results.encryption.enabled) {
                console.log('- Database encryption is not properly configured');
            }
            if (!results.access.restricted) {
                console.log('- Database access controls are insufficient');
            }
            if (!results.audit.enabled) {
                console.log('- Database audit logging is not properly configured');
            }
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Database verification failed:', error.message);
        process.exit(1);
    }
}

verifyDatabase();
