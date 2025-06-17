#!/usr/bin/env node

const axios = require('axios');
const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SecurityPenetrationTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.results = {
      vulnerabilities: [],
      passed: [],
      timestamp: new Date().toISOString()
    };
  }

  async runAllTests() {
    console.log('Starting security penetration testing...\n');

    // SSL/TLS Tests
    await this.testSSLConfiguration();

    // Authentication Tests
    await this.testAuthenticationEndpoints();

    // Input Validation Tests
    await this.testInputValidation();

    // Access Control Tests
    await this.testAccessControl();

    // API Security Tests
    await this.testAPIEndpoints();

    // Database Security Tests
    await this.testDatabaseSecurity();

    // Network Security Tests
    await this.testNetworkSecurity();

    // Save results
    this.saveResults();

    return this.results;
  }

  async testSSLConfiguration() {
    console.log('Testing SSL/TLS configuration...');
    
    try {
      // Test SSL version and cipher suites
      const sslScan = execSync(`openssl s_client -connect ${new URL(this.baseUrl).host}:443 -tls1_2`).toString();
      
      if (sslScan.includes('Protocol  : TLSv1.2') || sslScan.includes('Protocol  : TLSv1.3')) {
        this.results.passed.push('SSL: Modern TLS version in use');
      } else {
        this.results.vulnerabilities.push({
          severity: 'HIGH',
          title: 'Outdated SSL/TLS Version',
          description: 'Server is not using TLS 1.2 or higher'
        });
      }

      // Check for weak ciphers
      const weakCiphers = ['RC4', 'MD5', 'SHA1', 'DES', '3DES'];
      for (const cipher of weakCiphers) {
        if (sslScan.includes(cipher)) {
          this.results.vulnerabilities.push({
            severity: 'HIGH',
            title: 'Weak Cipher Suite',
            description: `Server supports weak cipher: ${cipher}`
          });
        }
      }
    } catch (error) {
      this.results.vulnerabilities.push({
        severity: 'CRITICAL',
        title: 'SSL Test Failed',
        description: error.message
      });
    }
  }

  async testAuthenticationEndpoints() {
    console.log('Testing authentication endpoints...');
    
    const tests = [
      // Test login rate limiting
      async () => {
        const failures = [];
        for (let i = 0; i < 10; i++) {
          try {
            await axios.post(`${this.baseUrl}/api/auth/login`, {
              email: 'test@example.com',
              password: 'wrong'
            });
          } catch (error) {
            if (error.response?.status === 429) {
              this.results.passed.push('Auth: Rate limiting working');
              return;
            }
          }
        }
        this.results.vulnerabilities.push({
          severity: 'HIGH',
          title: 'Missing Rate Limiting',
          description: 'No rate limiting detected on login endpoint'
        });
      },

      // Test password policies
      async () => {
        try {
          await axios.post(`${this.baseUrl}/api/auth/register`, {
            email: 'test@example.com',
            password: 'weak'
          });
          this.results.vulnerabilities.push({
            severity: 'MEDIUM',
            title: 'Weak Password Policy',
            description: 'System accepts weak passwords'
          });
        } catch (error) {
          if (error.response?.status === 400) {
            this.results.passed.push('Auth: Strong password policy enforced');
          }
        }
      }
    ];

    await Promise.all(tests.map(test => test()));
  }

  async testInputValidation() {
    console.log('Testing input validation...');

    const testCases = [
      // SQL Injection
      {
        endpoint: '/api/users',
        payload: { username: "' OR '1'='1" },
        description: 'SQL Injection'
      },
      // XSS
      {
        endpoint: '/api/messages',
        payload: { content: '<script>alert(1)</script>' },
        description: 'Cross-Site Scripting'
      },
      // CSRF
      {
        endpoint: '/api/payments',
        headers: { 'X-CSRF-Token': 'fake' },
        description: 'CSRF Protection'
      }
    ];

    for (const test of testCases) {
      try {
        await axios.post(`${this.baseUrl}${test.endpoint}`, test.payload, {
          headers: test.headers,
          validateStatus: () => true
        });
        
        this.results.vulnerabilities.push({
          severity: 'HIGH',
          title: `Missing ${test.description} Protection`,
          description: `Endpoint ${test.endpoint} may be vulnerable to ${test.description}`
        });
      } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 403) {
          this.results.passed.push(`Security: ${test.description} protection working`);
        }
      }
    }
  }

  async testAccessControl() {
    console.log('Testing access control...');

    const restrictedEndpoints = [
      '/api/admin/users',
      '/api/admin/settings',
      '/api/payments/all'
    ];

    for (const endpoint of restrictedEndpoints) {
      try {
        await axios.get(`${this.baseUrl}${endpoint}`, {
          validateStatus: () => true
        });
        
        this.results.vulnerabilities.push({
          severity: 'CRITICAL',
          title: 'Missing Access Control',
          description: `Endpoint ${endpoint} accessible without authentication`
        });
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.results.passed.push(`Access Control: ${endpoint} properly protected`);
        }
      }
    }
  }

  async testAPIEndpoints() {
    console.log('Testing API security...');

    // Test API rate limiting
    const requests = Array(20).fill().map(() => 
      axios.get(`${this.baseUrl}/api/health`, {
        validateStatus: () => true
      })
    );

    const responses = await Promise.all(requests);
    const rateLimited = responses.some(r => r.status === 429);

    if (!rateLimited) {
      this.results.vulnerabilities.push({
        severity: 'MEDIUM',
        title: 'Missing API Rate Limiting',
        description: 'API endpoints do not implement rate limiting'
      });
    } else {
      this.results.passed.push('API: Rate limiting implemented');
    }

    // Test security headers
    const response = await axios.get(`${this.baseUrl}/api/health`);
    const requiredHeaders = [
      'X-Frame-Options',
      'X-Content-Type-Options',
      'X-XSS-Protection',
      'Content-Security-Policy'
    ];

    const missingHeaders = requiredHeaders.filter(
      header => !response.headers[header.toLowerCase()]
    );

    if (missingHeaders.length > 0) {
      this.results.vulnerabilities.push({
        severity: 'MEDIUM',
        title: 'Missing Security Headers',
        description: `Missing headers: ${missingHeaders.join(', ')}`
      });
    } else {
      this.results.passed.push('API: All security headers present');
    }
  }

  async testDatabaseSecurity() {
    console.log('Testing database security...');

    // Test MongoDB injection
    const injectionTests = [
      { username: { $ne: null } },
      { $where: 'sleep(1000)' }
    ];

    for (const payload of injectionTests) {
      try {
        await axios.post(`${this.baseUrl}/api/users/search`, payload);
        this.results.vulnerabilities.push({
          severity: 'CRITICAL',
          title: 'NoSQL Injection Vulnerability',
          description: 'Database queries vulnerable to NoSQL injection'
        });
      } catch (error) {
        if (error.response?.status === 400) {
          this.results.passed.push('Database: NoSQL injection protection working');
        }
      }
    }
  }

  async testNetworkSecurity() {
    console.log('Testing network security...');

    // Port scanning
    const commonPorts = [21, 22, 23, 25, 53, 80, 443, 3306, 27017];
    
    for (const port of commonPorts) {
      try {
        const socket = require('net').createConnection(port, new URL(this.baseUrl).hostname);
        socket.on('connect', () => {
          this.results.vulnerabilities.push({
            severity: 'HIGH',
            title: 'Open Port Detected',
            description: `Port ${port} is open and accessible`
          });
          socket.destroy();
        });
      } catch (error) {
        // Port is closed (good)
        this.results.passed.push(`Network: Port ${port} properly secured`);
      }
    }
  }

  saveResults() {
    const resultsDir = path.join(__dirname, '../../security/scan-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const resultsPath = path.join(resultsDir, `scan-${Date.now()}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));

    // Update latest results
    fs.writeFileSync(
      path.join(__dirname, '../../security/last-scan-results.json'),
      JSON.stringify(this.results, null, 2)
    );

    console.log(`\nScan results saved to ${resultsPath}`);
    
    // Print summary
    console.log('\nScan Summary:');
    console.log('-'.repeat(50));
    console.log(`Vulnerabilities found: ${this.results.vulnerabilities.length}`);
    console.log(`Tests passed: ${this.results.passed.length}`);
    
    if (this.results.vulnerabilities.length > 0) {
      console.log('\nVulnerabilities by severity:');
      const bySeverity = this.results.vulnerabilities.reduce((acc, curr) => {
        acc[curr.severity] = (acc[curr.severity] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(bySeverity).forEach(([severity, count]) => {
        console.log(`${severity}: ${count}`);
      });
    }
  }
}

// Run if called directly
if (require.main === module) {
  const baseUrl = process.env.TEST_URL || 'https://api.sunnypayments.com';
  const tester = new SecurityPenetrationTester(baseUrl);
  tester.runAllTests().catch(console.error);
}

module.exports = SecurityPenetrationTester;
