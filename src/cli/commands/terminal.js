const inquirer = require('inquirer');
const chalk = require('chalk');

const terminalCommands = {
  async activateTerminal() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'terminalId',
        message: 'Enter terminal ID:',
        validate: (input) => input.length > 0
      },
      {
        type: 'input',
        name: 'activationCode',
        message: 'Enter activation code:',
        validate: (input) => input.length === 6
      }
    ]);

    console.log(chalk.green('\nActivating terminal...'));
    // Here would be API call to activate terminal
  },

  async listTerminals() {
    console.log(chalk.blue('\nFetching terminals...'));
    // Here would be API call to list terminals
  },

  async updateTerminal() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'terminalId',
        message: 'Enter terminal ID:',
        validate: (input) => input.length > 0
      },
      {
        type: 'list',
        name: 'action',
        message: 'Select action:',
        choices: ['Update Software', 'Reset Terminal', 'Configure Settings']
      }
    ]);

    console.log(chalk.yellow(`\nExecuting ${answers.action}...`));
    // Here would be API call to update terminal
  }
};

module.exports = terminalCommands;
