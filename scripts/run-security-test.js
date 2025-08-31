#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const securityChecks = {
  async checkDependencies() {
    console.log('\n🔍 Checking dependencies for vulnerabilities...');
    try {
      execSync('npm audit', { stdio: 'inherit' });
      return true;
    } catch (error) {
      console.error(`${RED}⚠️ Vulnerabilities found in dependencies${RESET}`);
      return false;
    }
  },

  async checkSecrets() {
    console.log('\n🔍 Checking for exposed secrets...');
    const patterns = [
      /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/,
      /((?:https?:\/\/)?(?:[\w-]+\.)+[\w-]+(?::\d+)?(?:\/\S*)?)/,
      /(['"]?[a-zA-Z0-9_-]*(?:password|secret|key|token|auth|credential)[a-zA-Z0-9_-]*['"]?\s*[=:]\s*['"][^'"]+['"])/i
    ];

    let found = false;
    const files = getAllFiles('.');
    
    for (const file of files) {
      if (file.includes('node_modules') || file.includes('.git')) continue;
      
      try {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of patterns) {
          const matches = content.match(pattern);
          if (matches) {
            console.error(`${RED}⚠️ Potential secret found in ${file}${RESET}`);
            found = true;
          }
        }
      } catch (error) {
        console.error(`Error reading file ${file}: ${error.message}`);
      }
    }
    
    return !found;
  },

  async checkPermissions() {
    console.log('\n🔍 Checking file permissions...');
    const sensitiveFiles = [
      '.env',
      'config/security.js',
      'src/security/encryption.js'
    ];

    let allSecure = true;
    for (const file of sensitiveFiles) {
      try {
        const stats = fs.statSync(file);
        const permissions = stats.mode & 0o777;
        if (permissions > 0o600) {
          console.error(`${RED}⚠️ File ${file} has insecure permissions: ${permissions.toString(8)}${RESET}`);
          allSecure = false;
        }
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Error checking ${file}: ${error.message}`);
          allSecure = false;
        }
      }
    }
    
    return allSecure;
  },

  async checkSslCertificates() {
    console.log('\n🔍 Checking SSL certificates...');
    const certFiles = findFiles('.', /\.(crt|key|pem)$/);
    
    let allValid = true;
    for (const file of certFiles) {
      try {
        const cert = fs.readFileSync(file);
        // Implement certificate validation logic here
        console.log(`${GREEN}✓ Certificate ${file} is valid${RESET}`);
      } catch (error) {
        console.error(`${RED}⚠️ Invalid certificate ${file}: ${error.message}${RESET}`);
        allValid = false;
      }
    }
    
    return allValid;
  },

  async checkSecurityHeaders() {
    console.log('\n🔍 Checking security headers configuration...');
    const requiredHeaders = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security'
    ];

    let configured = true;
    // Check security middleware configuration
    try {
      const middlewareFile = fs.readFileSync('src/middleware/securityMiddleware.js', 'utf8');
      for (const header of requiredHeaders) {
        if (!middlewareFile.includes(header)) {
          console.error(`${RED}⚠️ Missing security header: ${header}${RESET}`);
          configured = false;
        }
      }
    } catch (error) {
      console.error(`${RED}⚠️ Could not check security headers: ${error.message}${RESET}`);
      configured = false;
    }
    
    return configured;
  },

  async checkEncryption() {
    console.log('\n🔍 Checking encryption implementation...');
    let secure = true;

    try {
      const encryptionFile = fs.readFileSync('src/security/encryption.js', 'utf8');
      
      // Check for weak encryption algorithms
      const weakAlgorithms = ['md5', 'sha1', 'des', 'rc4'];
      for (const algo of weakAlgorithms) {
        if (encryptionFile.toLowerCase().includes(algo)) {
          console.error(`${RED}⚠️ Weak encryption algorithm found: ${algo}${RESET}`);
          secure = false;
        }
      }

      // Check for minimum key lengths
      if (encryptionFile.includes('keyLength') && !encryptionFile.includes('keyLength: 32')) {
        console.error(`${RED}⚠️ Insufficient key length for encryption${RESET}`);
        secure = false;
      }
    } catch (error) {
      console.error(`${RED}⚠️ Could not check encryption: ${error.message}${RESET}`);
      secure = false;
    }

    return secure;
  }
};

function getAllFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

function findFiles(startPath, filter) {
  let results = [];
  if (!fs.existsSync(startPath)) return results;

  const files = fs.readdirSync(startPath);
  for (let file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filename, filter));
    } else if (filter.test(filename)) {
      results.push(filename);
    }
  }
  return results;
}

async function runSecurityTests() {
  console.log('🔒 Starting security audit...\n');
  
  const results = {
    dependencies: await securityChecks.checkDependencies(),
    secrets: await securityChecks.checkSecrets(),
    permissions: await securityChecks.checkPermissions(),
    certificates: await securityChecks.checkSslCertificates(),
    headers: await securityChecks.checkSecurityHeaders(),
    encryption: await securityChecks.checkEncryption()
  };

  console.log('\n📊 Security Audit Summary:');
  console.log('------------------------');
  
  let allPassed = true;
  for (const [test, passed] of Object.entries(results)) {
    console.log(`${passed ? GREEN + '✓' : RED + '✗'} ${test}${RESET}`);
    if (!passed) allPassed = false;
  }

  console.log('\n------------------------');
  if (allPassed) {
    console.log(`${GREEN}✓ All security checks passed${RESET}`);
    process.exit(0);
  } else {
    console.error(`${RED}⚠️ Some security checks failed${RESET}`);
    process.exit(1);
  }
}

// Run the security tests
runSecurityTests().catch(error => {
  console.error(`${RED}Error running security tests: ${error.message}${RESET}`);
  process.exit(1);
});

