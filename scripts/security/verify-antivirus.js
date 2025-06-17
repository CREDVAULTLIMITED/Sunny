#!/usr/bin/env node

/**
 * Antivirus Verification Script
 * Validates antivirus configuration and status
 */

const { execSync } = require('child_process');
const fs = require('fs');

async function verifyAntivirus() {
    console.log('Verifying antivirus protection...');
    
    try {
        // Check ClamAV installation
        checkClamAV();

        // Check virus definitions
        checkVirusDefinitions();

        // Check real-time protection
        checkRealTimeProtection();

        // Verify scan schedule
        verifyScanSchedule();

        console.log('✅ Antivirus verification passed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Antivirus verification failed:', error.message);
        process.exit(1);
    }
}

function checkClamAV() {
    try {
        execSync('which clamscan');
        const version = execSync('clamscan --version').toString();
        if (!version.includes('ClamAV')) {
            throw new Error('ClamAV not properly installed');
        }
    } catch (error) {
        throw new Error('ClamAV not installed');
    }
}

function checkVirusDefinitions() {
    try {
        const freshclam = execSync('freshclam --version').toString();
        const lastUpdate = execSync('stat -c %Y /var/lib/clamav/daily.cvd').toString();
        const now = Date.now() / 1000;
        
        if (now - parseInt(lastUpdate) > 86400) { // 24 hours
            throw new Error('Virus definitions are outdated');
        }
    } catch (error) {
        throw new Error('Unable to verify virus definitions');
    }
}

function checkRealTimeProtection() {
    try {
        const status = execSync('systemctl status clamav-daemon').toString();
        if (!status.includes('active (running)')) {
            throw new Error('Real-time protection is not active');
        }
    } catch (error) {
        throw new Error('Real-time protection is not configured');
    }
}

function verifyScanSchedule() {
    try {
        const crontab = fs.readFileSync('/etc/cron.d/clamav', 'utf8');
        if (!crontab.includes('clamscan')) {
            throw new Error('Regular scanning not scheduled');
        }
    } catch (error) {
        throw new Error('Scan schedule not configured');
    }
}

verifyAntivirus();
