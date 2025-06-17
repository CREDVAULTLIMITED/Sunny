#!/usr/bin/env node

/**
 * Security Testing Verification Script
 * Validates security testing procedures and results
 */

const fs = require('fs');
const path = require('path');

async function verifySecurityTesting() {
    console.log('Verifying security testing configuration...');
    
    try {
        // Check penetration testing results
        verifyPenTestResults();

        // Check vulnerability scanning
        verifyVulnerabilityScans();

        // Check security testing schedule
        verifyTestingSchedule();

        // Check automated security tests
        verifyAutomatedTests();

        console.log('✅ Security testing verification passed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Security testing verification failed:', error.message);
        process.exit(1);
    }
}

function verifyPenTestResults() {
    const penTestPath = path.join(__dirname, '../../docs/security/pentest-results.json');
    if (!fs.existsSync(penTestPath)) {
        throw new Error('No penetration testing results found');
    }

    const results = require(penTestPath);
    if (new Date(results.lastTest) < new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)) {
        throw new Error('Penetration test results are older than 6 months');
    }

    if (results.criticalFindings > 0 || results.highFindings > 0) {
        throw new Error('Unresolved critical or high security findings');
    }
}

function verifyVulnerabilityScans() {
    const scanPath = path.join(__dirname, '../../docs/security/vulnerability-scan.json');
    if (!fs.existsSync(scanPath)) {
        throw new Error('No vulnerability scan results found');
    }

    const results = require(scanPath);
    if (new Date(results.lastScan) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
        throw new Error('Vulnerability scan results are older than 30 days');
    }

    if (results.criticalVulnerabilities > 0) {
        throw new Error('Unresolved critical vulnerabilities found');
    }
}

function verifyTestingSchedule() {
    const schedulePath = path.join(__dirname, '../../config/security-testing-schedule.json');
    if (!fs.existsSync(schedulePath)) {
        throw new Error('Security testing schedule not configured');
    }

    const schedule = require(schedulePath);
    if (!schedule.automated || !schedule.manual) {
        throw new Error('Incomplete security testing schedule');
    }
}

function verifyAutomatedTests() {
    const testPath = path.join(__dirname, '../../test/security');
    if (!fs.existsSync(testPath)) {
        throw new Error('Security test suite not found');
    }

    const testFiles = fs.readdirSync(testPath);
    const requiredTests = ['encryption.test.js', 'authentication.test.js', 'authorization.test.js'];
    
    for (const test of requiredTests) {
        if (!testFiles.includes(test)) {
            throw new Error(`Required security test ${test} not found`);
        }
    }
}

verifySecurityTesting();
