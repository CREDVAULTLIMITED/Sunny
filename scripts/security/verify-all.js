#!/usr/bin/env node

/**
 * Comprehensive Security Verification Script
 * Runs all PCI DSS compliance checks and generates reports
 */

const PCIDSSValidator = require('../../src/security/PCIDSSValidator');
const ComplianceReporter = require('../../src/security/complianceReporter');
const logger = require('../../src/security/logger');

async function verifyAll() {
    console.log('🔒 Running comprehensive PCI DSS security verification...\n');
    
    try {
        // Run full compliance validation
        const results = await PCIDSSValidator.validateCompliance();
        
        // Generate detailed report
        const reporter = ComplianceReporter;
        const report = await reporter.generateComplianceReport(results);
        
        // Generate executive summary
        const summary = await reporter.generateExecutiveSummary(results);
        
        // Display results
        console.log('📊 PCI DSS Compliance Summary:');
        console.log('------------------------------');
        console.log(`Status: ${summary.status}`);
        console.log(`Compliance Score: ${summary.score}`);
        console.log(`Last Assessment: ${summary.lastAssessment}`);
        
        if (summary.criticalFindings.length > 0) {
            console.log('\n⚠️ Critical Findings:');
            summary.criticalFindings.forEach(finding => {
                console.log(`- ${finding.requirement}: ${finding.impact} impact`);
            });
        }
        
        console.log('\n📝 Next Steps:');
        summary.nextSteps.forEach(step => {
            console.log(`- ${step}`);
        });
        
        // Save detailed report
        const fs = require('fs');
        const path = require('path');
        const reportsDir = path.join(__dirname, '../../reports/security');
        
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
        
        const reportPath = path.join(reportsDir, `pci-compliance-${new Date().toISOString().split('T')[0]}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
        
        if (results.compliant) {
            console.log('\n✅ All security verifications passed');
            process.exit(0);
        } else {
            console.log('\n❌ Some security verifications failed');
            process.exit(1);
        }
    } catch (error) {
        logger.error('Security verification failed', { 
            error: error.message,
            stack: error.stack
        });
        console.error('\n❌ Security verification failed:', error.message);
        process.exit(1);
    }
}

verifyAll();
