const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zxcvbn = require('zxcvbn');

class PCIComplianceValidator {
  constructor() {
    this.requiredSecurityControls = {
      networkSecurity: false,
      dataEncryption: false,
      accessControl: false,
      monitoring: false,
      vulnerabilityManagement: false
    };
  }

  // Requirement 1: Install and maintain a firewall configuration
  async validateFirewallRules() {
    try {
      const execSync = require('child_process').execSync;
      const rules = execSync('iptables -L').toString();
      
      const requiredRules = [
        'DROP.*ALL.*0.0.0.0/0',  // Default deny
        'ACCEPT.*tcp.*dpt:443',   // HTTPS
        'ACCEPT.*tcp.*dpt:80',    // HTTP (for redirect only)
        'DROP.*tcp.*dpt:22'       // Block SSH from public
      ];

      const missingRules = requiredRules.filter(rule => 
        !rules.match(new RegExp(rule, 'i'))
      );

      if (missingRules.length > 0) {
        throw new Error(`Missing required firewall rules: ${missingRules.join(', ')}`);
      }

      this.requiredSecurityControls.networkSecurity = true;
      return true;
    } catch (error) {
      console.error('Firewall validation failed:', error);
      return false;
    }
  }

  // Requirement 2: Do not use vendor-supplied defaults
  async validateSecureConfigurations() {
    try {
      const defaultCredentials = [
        { user: 'admin', pass: 'admin' },
        { user: 'root', pass: 'root' },
        { user: 'user', pass: 'user' }
      ];

      // Check MongoDB
      const mongoClient = await require('mongodb').MongoClient.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      for (const cred of defaultCredentials) {
        try {
          await mongoClient.connect(process.env.MONGODB_URI.replace(
            /(mongodb:\/\/)([^:]+):([^@]+)@/,
            `$1${cred.user}:${cred.pass}@`
          ));
          throw new Error(`Default credential ${cred.user} still works!`);
        } catch (err) {
          if (!err.message.includes('Authentication failed')) {
            throw err;
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Configuration validation failed:', error);
      return false;
    }
  }

  // Requirement 3: Protect stored cardholder data
  validateDataEncryption() {
    try {
      // Verify encryption key strength
      const keyLength = Buffer.from(process.env.ENCRYPTION_KEY, 'base64').length * 8;
      if (keyLength < 256) {
        throw new Error('Encryption key must be at least 256 bits');
      }

      // Test encryption/decryption
      const testData = '4111111111111111'; // Test PAN
      const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(process.env.ENCRYPTION_KEY, 'base64'),
        crypto.randomBytes(12)
      );

      let encrypted = cipher.update(testData, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      // Verify encrypted data format
      if (!encrypted.match(/^[0-9a-f]+$/)) {
        throw new Error('Encryption validation failed');
      }

      this.requiredSecurityControls.dataEncryption = true;
      return true;
    } catch (error) {
      console.error('Data encryption validation failed:', error);
      return false;
    }
  }

  // Requirement 4: Encrypt transmission of cardholder data
  validateSecureTransmission() {
    try {
      const tlsConfig = require('tls').getCurrentCipher();
      
      // Verify TLS version
      if (!tlsConfig || !tlsConfig.version.startsWith('TLSv1.2')) {
        throw new Error('Must use TLS 1.2 or higher');
      }

      // Verify cipher strength
      const weakCiphers = [
        'RC4', 'MD5', 'SHA1', 'DES', '3DES',
        'EXPORT', 'NULL', 'ANON'
      ];

      if (weakCiphers.some(cipher => tlsConfig.name.includes(cipher))) {
        throw new Error('Weak cipher detected');
      }

      return true;
    } catch (error) {
      console.error('Transmission security validation failed:', error);
      return false;
    }
  }

  // Requirement 7: Restrict access to cardholder data
  validateAccessControl() {
    try {
      const rbacConfig = require('../config/rbac.js');
      
      // Verify role definitions
      const requiredRoles = ['admin', 'operator', 'auditor'];
      const missingRoles = requiredRoles.filter(role => 
        !rbacConfig.roles.includes(role)
      );

      if (missingRoles.length > 0) {
        throw new Error(`Missing required roles: ${missingRoles.join(', ')}`);
      }

      // Verify permission assignments
      const requiredPermissions = [
        'VIEW_TRANSACTIONS',
        'PROCESS_PAYMENTS',
        'ISSUE_REFUNDS',
        'VIEW_REPORTS'
      ];

      const missingPermissions = requiredPermissions.filter(perm => 
        !Object.values(rbacConfig.permissions).flat().includes(perm)
      );

      if (missingPermissions.length > 0) {
        throw new Error(`Missing required permissions: ${missingPermissions.join(', ')}`);
      }

      this.requiredSecurityControls.accessControl = true;
      return true;
    } catch (error) {
      console.error('Access control validation failed:', error);
      return false;
    }
  }

  // Requirement 10: Track and monitor all access to network resources
  validateLogging() {
    try {
      const logDir = path.join(__dirname, '../../logs');
      const requiredLogs = [
        'access.log',
        'error.log',
        'audit.log',
        'security.log'
      ];

      // Check log files exist and are being written to
      for (const logFile of requiredLogs) {
        const logPath = path.join(logDir, logFile);
        const stats = fs.statSync(logPath);
        
        // Check if log file was modified in last 24 hours
        const modifiedAgo = Date.now() - stats.mtime.getTime();
        if (modifiedAgo > 24 * 60 * 60 * 1000) {
          throw new Error(`Log file ${logFile} may be stale`);
        }
      }

      this.requiredSecurityControls.monitoring = true;
      return true;
    } catch (error) {
      console.error('Logging validation failed:', error);
      return false;
    }
  }

  // Requirement 11: Regularly test security systems and processes
  async validateSecurityTesting() {
    try {
      const lastScanResults = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../../security/last-scan-results.json'))
      );

      // Check scan recency
      const scanAge = Date.now() - new Date(lastScanResults.timestamp).getTime();
      if (scanAge > 7 * 24 * 60 * 60 * 1000) { // 7 days
        throw new Error('Security scan results are too old');
      }

      // Check for critical vulnerabilities
      if (lastScanResults.critical > 0) {
        throw new Error(`${lastScanResults.critical} critical vulnerabilities found`);
      }

      this.requiredSecurityControls.vulnerabilityManagement = true;
      return true;
    } catch (error) {
      console.error('Security testing validation failed:', error);
      return false;
    }
  }

  // Overall PCI compliance check
  async validatePCICompliance() {
    const results = {
      firewallRules: await this.validateFirewallRules(),
      secureConfigs: await this.validateSecureConfigurations(),
      dataEncryption: this.validateDataEncryption(),
      secureTransmission: this.validateSecureTransmission(),
      accessControl: this.validateAccessControl(),
      logging: this.validateLogging(),
      securityTesting: await this.validateSecurityTesting()
    };

    const compliant = Object.values(results).every(result => result === true);
    const failedChecks = Object.entries(results)
      .filter(([, value]) => value === false)
      .map(([key]) => key);

    return {
      compliant,
      failedChecks,
      results,
      requiredSecurityControls: this.requiredSecurityControls
    };
  }
}

module.exports = new PCIComplianceValidator();
