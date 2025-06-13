#!/usr/bin/env node

const chalk = require('chalk');
const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const REQUIRED_COMMANDS = [
  'docker',
  'docker-compose',
  'node',
  'npm'
];

const DEPLOYMENT_STAGES = {
  PRE_DEPLOYMENT: 'pre-deployment',
  DEPLOYMENT: 'deployment',
  POST_DEPLOYMENT: 'post-deployment'
};

function validateProductionReadiness() {
  console.log(chalk.cyan('=== Validating Production Readiness ===\n'));

  // Check required commands
  for (const command of REQUIRED_COMMANDS) {
    try {
      execSync(`which ${command}`, { stdio: 'ignore' });
      console.log(chalk.green(`✓ ${command} is available`));
    } catch (error) {
      throw new Error(`${command} is not installed or not in PATH`);
    }
  }

  // Check environment file
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env file not found');
  }
  console.log(chalk.green('✓ Environment file exists'));

  // Check if production setup script passes
  try {
    execSync('node scripts/production-setup.js', { stdio: 'pipe' });
    console.log(chalk.green('✓ Production configuration validated'));
  } catch (error) {
    throw new Error('Production setup validation failed. Run: node scripts/production-setup.js');
  }

  // Check security
  try {
    execSync('node scripts/run-security-test.js', { stdio: 'pipe' });
    console.log(chalk.green('✓ Security checks passed'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Security issues detected - review and address before deployment'));
  }
}

function performPreDeploymentTasks() {
  console.log(chalk.cyan('\n=== Performing Pre-deployment Tasks ===\n'));

  // Create backups directory
  const backupPath = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }

  // Run tests
  console.log('Running production readiness tests...');
  try {
    execSync('npm test -- --testPathPattern=production-readiness --passWithNoTests', { stdio: 'inherit' });
    console.log(chalk.green('✓ Production tests passed'));
  } catch (error) {
    throw new Error('Production tests failed');
  }

  // Clean previous builds
  console.log('Cleaning previous builds...');
  execSync('rm -rf build dist node_modules/.cache', { stdio: 'ignore' });
  console.log(chalk.green('✓ Previous builds cleaned'));
}

function performDeployment() {
  console.log(chalk.cyan('\n=== Performing Deployment ===\n'));

  // Install production dependencies
  console.log('Installing production dependencies...');
  execSync('npm ci --only=production', { stdio: 'inherit' });
  console.log(chalk.green('✓ Production dependencies installed'));

  // Build production assets
  console.log('Building production assets...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log(chalk.green('✓ Production build completed'));

  // Build Docker containers
  console.log('Building Docker containers...');
  execSync('docker-compose -f docker/production/docker-compose.yml build', { stdio: 'inherit' });
  console.log(chalk.green('✓ Docker containers built'));

  // Stop existing containers
  console.log('Stopping existing containers...');
  execSync('docker-compose -f docker/production/docker-compose.yml down', { stdio: 'ignore' });
  console.log(chalk.green('✓ Existing containers stopped'));

  // Start new containers
  console.log('Starting new containers...');
  execSync('docker-compose -f docker/production/docker-compose.yml up -d', { stdio: 'inherit' });
  console.log(chalk.green('✓ New containers started'));
}

function performPostDeploymentTasks() {
  console.log(chalk.cyan('\n=== Performing Post-deployment Tasks ===\n'));

  // Wait for services to start
  console.log('Waiting for services to start...');
  let attempts = 0;
  const maxAttempts = 30;
  
  while (attempts < maxAttempts) {
    try {
      execSync('curl -f http://localhost:3000/api/health', { stdio: 'ignore' });
      break;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error('Services failed to start within timeout');
      }
      execSync('sleep 10'); // Wait 10 seconds
    }
  }
  console.log(chalk.green('✓ Services are running'));

  // Verify health endpoints
  console.log('Verifying health endpoints...');
  try {
    const healthResult = execSync('curl -s http://localhost:3000/api/health').toString();
    const health = JSON.parse(healthResult);
    if (health.status !== 'ok') {
      throw new Error('Health check failed');
    }
    console.log(chalk.green('✓ Health check passed'));
  } catch (error) {
    throw new Error('Health endpoint verification failed');
  }

  // Verify security headers
  console.log('Verifying security headers...');
  try {
    const headers = execSync('curl -I http://localhost:3000/api/health').toString();
    const requiredHeaders = ['x-content-type-options', 'x-frame-options', 'x-xss-protection'];
    
    for (const header of requiredHeaders) {
      if (!headers.toLowerCase().includes(header)) {
        throw new Error(`Missing security header: ${header}`);
      }
    }
    console.log(chalk.green('✓ Security headers verified'));
  } catch (error) {
    throw new Error('Security headers verification failed');
  }
}

function deploy() {
  try {
    console.log(chalk.bold('\n🚀 Starting Production Deployment\n'));

    // Step 1: Validate production readiness
    validateProductionReadiness();

    // Step 2: Pre-deployment tasks
    performPreDeploymentTasks();

    // Step 3: Deployment
    performDeployment();

    // Step 4: Post-deployment tasks
    performPostDeploymentTasks();

    console.log(chalk.green.bold('\n✨ Deployment Completed Successfully!\n'));
    console.log(chalk.blue('🔗 Your application is now running:'));
    console.log(chalk.blue('   • API: http://localhost:3000'));
    console.log(chalk.blue('   • Health: http://localhost:3000/api/health'));
    console.log(chalk.blue('   • Status: http://localhost:3000/api/status'));
    console.log('');
    console.log(chalk.yellow('📋 Next steps:'));
    console.log('1. Configure production SSL certificates');
    console.log('2. Set up production payment processor credentials');
    console.log('3. Configure monitoring and alerting');
    console.log('4. Update DNS to point to production server');
    console.log('5. Run full payment flow tests');
    console.log('');
    console.log(chalk.green('🎉 Your Sunny Payment Gateway is production-ready!'));

  } catch (error) {
    console.error(chalk.red('\n❌ Deployment Failed!\n'));
    console.error(chalk.red(`Error: ${error.message}`));
    console.log(chalk.yellow('\n🔧 Troubleshooting:'));
    console.log('1. Check the error message above');
    console.log('2. Verify all environment variables are set');
    console.log('3. Run security audit: node scripts/run-security-test.js');
    console.log('4. Check Docker containers: docker-compose logs');
    console.log('5. Verify system requirements are met');
    console.log('');
    
    process.exit(1);
  }
}

// Execute deployment
if (require.main === module) {
  deploy();
}

module.exports = { deploy, validateProductionReadiness };
