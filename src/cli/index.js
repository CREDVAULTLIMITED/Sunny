#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { Command } = require('commander');
const { version } = require('../../package.json');
const terminalCommands = require('./commands/terminal');
const paymentCommands = require('./commands/payment');
const statusCommands = require('./commands/status');
const developerCommands = require('./commands/developer');
const authCommands = require('./commands/auth');
const secureConfig = require('./utils/secureConfig');

// Initialize program
const program = new Command();

// Clear terminal
clear();

// Display Sunny logo
console.log(
  chalk.blue(
    figlet.textSync('Sunny', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  )
);
console.log(chalk.blue('Payment Gateway CLI'));
console.log(chalk.gray('© 2025 CREDVAULT LIMITED. All rights reserved.\n'));

program
  .version(version)
  .description('Sunny Payment Gateway Command Line Interface');

// Initialize secure config
secureConfig.initialize();

// Commands
program
  .command('init')
  .description('Initialize Sunny in your project')
  .action(() => {
    // TODO: Implement project initialization
    console.log('Initializing Sunny...');
  });

program
  .command('terminal')
  .description('Manage POS terminals')
  .option('-l, --list', 'List all terminals')
  .option('-n, --new', 'Register new terminal')
  .option('-d, --deactivate <id>', 'Deactivate a terminal')
  .option('-s, --status <id>', 'Get terminal status')
  .action((options) => {
    if (options.list) return terminalCommands.listTerminals();
    if (options.new) return terminalCommands.registerTerminal();
    if (options.deactivate) return terminalCommands.deactivateTerminal(options.deactivate);
    if (options.status) return terminalCommands.getTerminalStatus(options.status);
    return terminalCommands.listTerminals();
  });

program
  .command('payment')
  .description('Process and manage payments')
  .option('-c, --create', 'Create new payment')
  .option('-l, --list', 'List recent payments')
  .option('-s, --status <id>', 'Check payment status')
  .option('-r, --refund <id>', 'Refund payment')
  .action((options) => {
    if (options.create) return paymentCommands.createPayment();
    if (options.list) return paymentCommands.listPayments();
    if (options.status) return paymentCommands.checkStatus(options.status);
    if (options.refund) return paymentCommands.refundPayment(options.refund);
    return paymentCommands.listPayments();
  });

program
  .command('status')
  .description('Check system status')
  .option('-m, --metrics', 'Show system metrics')
  .option('-l, --logs', 'Show recent logs')
  .option('-w, --webhooks', 'Show webhook status')
  .action((options) => {
    if (options.metrics) return statusCommands.showMetrics();
    if (options.logs) return statusCommands.showLogs();
    if (options.webhooks) return statusCommands.showWebhookStatus();
    return statusCommands.checkSystemStatus();
  });

program
  .command('dev')
  .description('Developer tools and utilities')
  .option('-k, --keys', 'Generate API keys')
  .option('-w, --webhook', 'Setup and test webhooks')
  .option('-p, --playground', 'Interactive API playground')
  .option('-s, --security', 'Run security checks')
  .option('-l, --logs', 'View debug logs')
  .option('-t, --test <type>', 'Run integration tests')
  .action(async (options) => {
    // Verify authentication before proceeding
    const session = await authCommands.verifySession();
    if (!session) {
      console.log(chalk.red('Authentication required. Please run `sunny auth --login` first.'));
      return;
    }

    if (options.keys) return developerCommands.generateApiKeys();
    if (options.webhook) return developerCommands.setupWebhooks();
    if (options.playground) return developerCommands.playWithApi();
    if (options.security) return developerCommands.validateSecurity();
    if (options.logs) return developerCommands.viewLogs();
    if (options.test) return developerCommands.runTests(options.test);
    
    // Show menu if no specific option is selected
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select developer action:',
        choices: [
          { name: 'Generate API Keys', value: 'keys' },
          { name: 'Setup Webhooks', value: 'webhook' },
          { name: 'API Playground', value: 'playground' },
          { name: 'Security Validation', value: 'security' },
          { name: 'View Debug Logs', value: 'logs' },
          { name: 'Run Tests', value: 'test' }
        ]
      }
    ]);

    switch (action) {
      case 'keys':
        return developerCommands.generateApiKeys();
      case 'webhook':
        return developerCommands.setupWebhooks();
      case 'playground':
        return developerCommands.playWithApi();
      case 'security':
        return developerCommands.validateSecurity();
      case 'logs':
        return developerCommands.viewLogs();
      case 'test':
        const { testType } = await inquirer.prompt([
          {
            type: 'list',
            name: 'testType',
            message: 'Select test type:',
            choices: ['integration', 'webhooks', 'security']
          }
        ]);
        return developerCommands.runTests(testType);
    }
  });

program
  .command('auth')
  .description('Authenticate with CREDVAULT')
  .option('-l, --login', 'Login to your account')
  .option('-o, --logout', 'Logout from current session')
  .option('-s, --status', 'Check authentication status')
  .option('-r, --refresh', 'Refresh authentication token')
  .action((options) => {
    if (options.login) return authCommands.login();
    if (options.logout) return authCommands.logout();
    if (options.status) return authCommands.checkStatus();
    if (options.refresh) return authCommands.refreshToken();
    return authCommands.checkStatus();
  });

// Add help and examples
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ sunny init                          # Initialize Sunny in your project');
  console.log('  $ sunny dev --keys                    # Generate new API keys');
  console.log('  $ sunny dev --webhook                 # Setup and test webhooks');
  console.log('  $ sunny dev --playground              # Launch interactive API playground');
  console.log('  $ sunny payment --create              # Create a new payment');
  console.log('  $ sunny status --metrics              # Show system metrics');
  console.log('');
  console.log('Documentation:');
  console.log('  https://docs.sunnypayments.com/cli');
});

// Parse arguments or show help
if (process.argv.length === 2) {
  program.help();
} else {
  program.parse(process.argv);
}
