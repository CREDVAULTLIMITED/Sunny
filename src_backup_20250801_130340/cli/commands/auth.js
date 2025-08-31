const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const crypto = require('crypto');
const secureConfig = require('../utils/secureConfig');
const securityMonitor = require('../utils/securityMonitor');

const authCommands = {
  async login() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter your CREDVAULT email:',
        validate: input => input.includes('@')
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*'
      },
      {
        type: 'list',
        name: 'role',
        message: 'Select your role:',
        choices: ['developer', 'merchant', 'admin']
      }
    ]);

    const spinner = ora('Authenticating...').start();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated auth

    spinner.succeed('Authentication successful');
    
    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Save session securely
    secureConfig.saveConfig('session', {
      token: sessionToken,
      email: answers.email,
      role: answers.role,
      timestamp: new Date().toISOString()
    });

    console.log(chalk.green('\n✓ Logged in successfully'));
    console.log(chalk.blue(`Welcome back, ${answers.email}`));

    // Perform security check after login
    await this.performSecurityCheck();
  },

  async logout() {
    secureConfig.deleteConfig('session');
    console.log(chalk.green('✓ Logged out successfully'));
  },

  async performSecurityCheck() {
    console.log(chalk.blue('\nPerforming security verification...'));
    
    const report = await securityMonitor.validateEnvironment();
    
    if (report.overallStatus === 'PASSED') {
      console.log(chalk.green('\n✓ Security checks passed'));
    } else {
      console.log(chalk.yellow('\n⚠ Some security checks failed:'));
      report.results.forEach(result => {
        if (!result.passed) {
          console.log(chalk.red(`× ${result.name}: ${result.message}`));
        }
      });
    }
  },

  async verifySession() {
    const session = secureConfig.loadConfig('session');
    if (!session) {
      console.log(chalk.red('× Not logged in. Please run: sunny auth --login'));
      process.exit(1);
    }
    return session;
  }
};

module.exports = authCommands;
