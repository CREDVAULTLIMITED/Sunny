const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');
const axios = require('axios');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

class ApiPlayground {
  constructor() {
    this.baseUrl = process.env.SUNNY_API_URL || 'https://api.sunnypayments.com';
    this.historyFile = path.join(process.env.HOME, '.sunny', 'api_history.json');
    this.endpoints = {
      payments: {
        create: { 
          method: 'POST',
          path: '/v1/payments',
          description: 'Create a new payment',
          example: {
            amount: 2000,
            currency: 'usd',
            payment_method: 'pm_card_visa',
            description: 'Test payment'
          }
        },
        list: { 
          method: 'GET',
          path: '/v1/payments',
          description: 'List all payments',
          params: {
            limit: '10',
            starting_after: 'payment_id',
            ending_before: 'payment_id'
          }
        },
        retrieve: { 
          method: 'GET',
          path: '/v1/payments/:id',
          description: 'Retrieve a specific payment'
        },
        update: { 
          method: 'PATCH',
          path: '/v1/payments/:id',
          description: 'Update a payment',
          example: {
            description: 'Updated payment description'
          }
        },
        cancel: { 
          method: 'POST',
          path: '/v1/payments/:id/cancel',
          description: 'Cancel a payment'
        }
      },
      customers: {
        create: { 
          method: 'POST',
          path: '/v1/customers',
          description: 'Create a new customer',
          example: {
            email: 'customer@example.com',
            name: 'Jenny Rosen',
            phone: '+1234567890'
          }
        },
        list: { 
          method: 'GET',
          path: '/v1/customers',
          description: 'List all customers',
          params: {
            limit: '10',
            email: 'customer@example.com'
          }
        },
        retrieve: { 
          method: 'GET',
          path: '/v1/customers/:id',
          description: 'Retrieve a specific customer'
        },
        update: { 
          method: 'PATCH',
          path: '/v1/customers/:id',
          description: 'Update a customer',
          example: {
            name: 'Jenny Smith',
            metadata: {
              order_id: '123'
            }
          }
        },
        delete: { 
          method: 'DELETE',
          path: '/v1/customers/:id',
          description: 'Delete a customer'
        }
      },
      terminals: {
        create: { 
          method: 'POST',
          path: '/v1/terminals',
          description: 'Register a new terminal',
          example: {
            name: 'Store Terminal 1',
            location: 'Main Street Store'
          }
        },
        list: { 
          method: 'GET',
          path: '/v1/terminals',
          description: 'List all terminals',
          params: {
            status: 'active',
            limit: '10'
          }
        },
        update: { 
          method: 'PATCH',
          path: '/v1/terminals/:id',
          description: 'Update a terminal',
          example: {
            name: 'Updated Terminal Name',
            metadata: {
              store_id: 'store_123'
            }
          }
        },
        delete: { 
          method: 'DELETE',
          path: '/v1/terminals/:id',
          description: 'Delete a terminal'
        }
      }
    };
  }

  async start() {
    console.log(boxen(
      chalk.blue('Welcome to Sunny API Playground!\n\n') +
      chalk.yellow('Test API endpoints interactively and see responses in real-time.\n') +
      chalk.gray('Tip: Use arrow keys to navigate, Enter to select'),
      { padding: 1, margin: 1, borderColor: 'blue', title: 'API PLAYGROUND' }
    ));

    while (true) {
      const { category } = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'Select API category:',
          choices: [...Object.keys(this.endpoints), new inquirer.Separator(), 'View History', 'exit']
        }
      ]);

      if (category === 'exit') break;
      if (category === 'View History') {
        await this.viewHistory();
        continue;
      }

      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select action:',
          choices: Object.entries(this.endpoints[category]).map(([key, value]) => ({
            name: `${value.method} ${value.path} - ${value.description}`,
            value: key
          }))
        }
      ]);

      await this.executeRequest(category, action);
    }
  }

  async executeRequest(category, action) {
    const endpoint = this.endpoints[category][action];
    let path = endpoint.path;
    let queryParams = new URLSearchParams();

    // Handle path parameters
    if (path.includes(':')) {
      const { id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter ID:',
          validate: input => input.length > 0
        }
      ]);
      path = path.replace(/:id/, id);
    }

    // Handle query parameters for GET requests
    if (endpoint.method === 'GET' && endpoint.params) {
      const { params } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'params',
          message: 'Select query parameters to include:',
          choices: Object.entries(endpoint.params).map(([key, defaultValue]) => ({
            name: `${key} (default: ${defaultValue})`,
            value: key
          }))
        }
      ]);

      for (const param of params) {
        const { value } = await inquirer.prompt([
          {
            type: 'input',
            name: 'value',
            message: `Enter value for ${param}:`,
            default: endpoint.params[param]
          }
        ]);
        queryParams.append(param, value);
      }
    }

    // Handle request body for POST/PATCH
    let data = {};
    if (['POST', 'PATCH'].includes(endpoint.method)) {
      if (endpoint.example) {
        const { useExample } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'useExample',
            message: 'Would you like to use the example payload as a template?',
            default: true
          }
        ]);

        if (useExample) {
          const { rawData } = await inquirer.prompt([
            {
              type: 'editor',
              name: 'rawData',
              message: 'Edit the request payload:',
              default: JSON.stringify(endpoint.example, null, 2),
              validate: input => {
                try {
                  JSON.parse(input);
                  return true;
                } catch (e) {
                  return 'Invalid JSON';
                }
              }
            }
          ]);
          data = JSON.parse(rawData);
        }
      }

      if (!Object.keys(data).length) {
        const { rawData } = await inquirer.prompt([
          {
            type: 'editor',
            name: 'rawData',
            message: 'Enter request payload (JSON):',
            validate: input => {
              try {
                JSON.parse(input);
                return true;
              } catch (e) {
                return 'Invalid JSON';
              }
            }
          }
        ]);
        data = JSON.parse(rawData);
      }
    }

    const spinner = ora('Making API request...').start();

    try {
      const url = `${this.baseUrl}${path}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await axios({
        method: endpoint.method.toLowerCase(),
        url,
        data: Object.keys(data).length ? data : undefined,
        headers: {
          'Authorization': `Bearer ${process.env.SUNNY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      spinner.succeed('Request successful');
      
      // Display response
      console.log(boxen(
        chalk.green('Response:\n\n') +
        chalk.white(JSON.stringify(response.data, null, 2)),
        { padding: 1, borderColor: 'green' }
      ));

      // Save to history
      this.saveToHistory(category, action, {
        timestamp: new Date().toISOString(),
        request: {
          method: endpoint.method,
          url,
          data: Object.keys(data).length ? data : undefined
        },
        response: response.data
      });

    } catch (error) {
      spinner.fail('Request failed');
      
      const errorMessage = error.response?.data || {
        error: {
          type: 'api_error',
          message: error.message
        }
      };

      console.log(boxen(
        chalk.red('Error:\n\n') +
        chalk.white(JSON.stringify(errorMessage, null, 2)),
        { padding: 1, borderColor: 'red' }
      ));

      // Save failed request to history
      this.saveToHistory(category, action, {
        timestamp: new Date().toISOString(),
        request: {
          method: endpoint.method,
          path,
          data: Object.keys(data).length ? data : undefined
        },
        error: errorMessage
      });
    }

    // Ask if user wants to make another request
    const { again } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'again',
        message: 'Would you like to make another request?',
        default: true
      }
    ]);

    if (again) {
      await this.start();
    }
  }

  saveToHistory(category, action, data) {
    const historyDir = path.dirname(this.historyFile);
    if (!fs.existsSync(historyDir)) {
      fs.mkdirSync(historyDir, { recursive: true, mode: 0o700 });
    }

    let history = [];
    if (fs.existsSync(this.historyFile)) {
      history = JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
    }

    history.unshift({
      id: `req_${Date.now()}`,
      category,
      action,
      ...data
    });

    // Keep only last 50 requests
    history = history.slice(0, 50);

    fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2), { mode: 0o600 });
  }

  async viewHistory() {
    if (!fs.existsSync(this.historyFile)) {
      console.log(chalk.yellow('No request history found.'));
      return;
    }

    const history = JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
    
    if (history.length === 0) {
      console.log(chalk.yellow('No request history found.'));
      return;
    }

    const { request } = await inquirer.prompt([
      {
        type: 'list',
        name: 'request',
        message: 'Select a request to view:',
        choices: history.map(item => ({
          name: `[${item.timestamp}] ${item.request.method} ${item.request.url}`,
          value: item
        }))
      }
    ]);

    console.log(boxen(
      chalk.blue('Request Details:\n\n') +
      chalk.white(JSON.stringify(request, null, 2)),
      { padding: 1, borderColor: 'blue' }
    ));

    const { replay } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'replay',
        message: 'Would you like to replay this request?',
        default: false
      }
    ]);

    if (replay) {
      await this.executeRequest(request.category, request.action);
    }
  }
}

module.exports = new ApiPlayground();
