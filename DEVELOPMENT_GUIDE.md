# Sunny Payment Gateway - Development Guide

This guide provides detailed information for developers working on the Sunny Payment Gateway project. It covers the development environment setup, architecture overview, coding standards, and best practices.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Architecture Overview](#architecture-overview)
3. [Core Components](#core-components)
4. [Development Workflow](#development-workflow)
5. [Testing Strategy](#testing-strategy)
6. [Debugging Tips](#debugging-tips)
7. [Performance Considerations](#performance-considerations)
8. [Security Guidelines](#security-guidelines)
9. [Documentation Standards](#documentation-standards)
10. [Release Process](#release-process)
11. [Database Setup and Usage](#database-setup-and-usage)

## Development Environment Setup

### Prerequisites

- **Node.js**: v16.x or later
- **npm**: v8.x or later
- **Go**: v1.18 or later (for API gateway development)
- **Rust**: Latest stable release (for core processing development)
- **Docker**: Latest version for containerized development
- **Git**: Latest version for version control

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sunny.git
   cd sunny
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### IDE Configuration

We recommend using Visual Studio Code with the following extensions:
- ESLint
- Prettier
- TypeScript
- Go
- Rust Analyzer
- Docker

Configuration files for VS Code are included in the `.vscode` directory.

## Architecture Overview

Sunny Payment Gateway uses a polyglot architecture with different technologies for different components:

### High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client Apps    │────▶│  API Gateway    │────▶│  Core Payment   │
│  & Websites     │     │  (Go)           │     │  Engine (Rust)  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │                        │
                                ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │                 │     │                 │
                        │  Admin Dashboard│     │  Fraud Detection│
                        │  (React/TS)     │     │  System         │
                        │                 │     │                 │
                        └─────────────────┘     └─────────────────┘
```

### Key Design Principles

1. **Separation of Concerns**: Each component has a clear responsibility
2. **Microservices Architecture**: Independent services that communicate via APIs
3. **Polyglot Implementation**: Using the best technology for each component
4. **Security by Design**: Security built into every layer
5. **Global-First Approach**: Designed for global scale from day one

## Core Components

### Payment Orchestrator

The `PaymentOrchestrator` class in `src/core/PaymentOrchestrator.js` is the central component that coordinates all payment flows. It:

- Routes payments to appropriate processors
- Handles multi-method payment attempts
- Manages split payments
- Processes recurring payments
- Resolves recipient identities

Key methods:
- `processPayment()`: Main entry point for payment processing
- `processMultiMethodPayment()`: Try multiple payment methods in sequence
- `processSplitPayment()`: Split a payment among multiple recipients
- `processRecurringPayment()`: Set up and process recurring payments

### Payment Gateway

The `SunnyPaymentGateway` class in `src/core/SunnyPaymentGateway.js` handles the core payment processing logic. It:

- Validates payment data
- Detects fraud
- Calculates fees
- Processes different payment methods
- Handles instant settlement
- Logs transactions

Key methods:
- `processPayment()`: Process a payment transaction
- `createSubscription()`: Create a subscription for recurring billing
- `processMarketplacePayment()`: Process marketplace payments with splits

### API Gateway

The Go-based API gateway in `src/api-gateway/` handles all API requests. It:

- Authenticates and authorizes requests
- Validates input data
- Routes requests to appropriate services
- Handles rate limiting and DDoS protection
- Provides API versioning

### Admin Dashboard

The React-based admin dashboard in `src/admin-dashboard/` provides the user interface for merchants. It:

- Shows transaction data and analytics
- Provides user and account management
- Offers configuration options
- Displays fraud detection insights
- Enables payment method management

## Development Workflow

### Branching Strategy

We use a simplified GitFlow branching model:

- `main`: Production-ready code
- `development`: Integration branch for features
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `hotfix/*`: Hot fix branches for production issues

### Development Process

1. Create a new branch from `development`:
   ```bash
   git checkout development
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. Push your branch and create a pull request:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. After review and approval, your changes will be merged into `development`

5. Periodically, `development` is merged into `main` for releases

### Code Review Process

All code changes require at least one review before merging. Reviewers should check for:

- Functionality: Does the code work as expected?
- Code quality: Is the code clean, maintainable, and following standards?
- Tests: Are there appropriate tests for the changes?
- Documentation: Is the code and API properly documented?
- Security: Are there any security concerns?
- Performance: Are there any performance implications?

## Testing Strategy

### Types of Tests

1. **Unit Tests**: Test individual functions and classes
   - Located in `tests/unit/`
   - Run with `npm run test:unit`

2. **Integration Tests**: Test interactions between components
   - Located in `tests/integration/`
   - Run with `npm run test:integration`

3. **End-to-End Tests**: Test complete user flows
   - Located in `tests/e2e/`
   - Run with `npm run test:e2e`

4. **Performance Tests**: Test system performance under load
   - Located in `tests/performance/`
   - Run with `npm run test:performance`

### Writing Tests

- Each new feature should have corresponding tests
- Tests should cover both success and failure cases
- Mock external dependencies when appropriate
- Use descriptive test names that explain what is being tested

Example unit test:

```javascript
describe('PaymentOrchestrator', () => {
  describe('processPayment', () => {
    it('should successfully process a valid card payment', async () => {
      // Test setup
      const orchestrator = new PaymentOrchestrator();
      const paymentData = {
        amount: '100.00',
        currency: 'USD',
        paymentMethod: 'card',
        card: { /* card details */ }
      };
      
      // Execute test
      const result = await orchestrator.processPayment(paymentData);
      
      // Assertions
      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
    });
    
    it('should return an error for invalid payment data', async () => {
      // Test setup
      const orchestrator = new PaymentOrchestrator();
      const paymentData = {
        // Missing required fields
      };
      
      // Execute test
      const result = await orchestrator.processPayment(paymentData);
      
      // Assertions
      expect(result.success).toBe(false);
      expect(result.error).toBe('VALIDATION_ERROR');
    });
  });
});
```

## Debugging Tips

### JavaScript/TypeScript Debugging

- Use the VS Code debugger with the provided launch configurations
- Add `debugger` statements in your code for breakpoints
- Use `console.log()` for quick debugging (but remove before committing)
- Check the browser console for client-side errors

### Go Debugging

- Use Delve for debugging Go code
- Add logging with the standard `log` package
- Use `go test -v` for verbose test output

### Rust Debugging

- Use `println!()` macros for quick debugging
- Use the Rust GDB/LLDB debugger integration
- Enable debug symbols with `cargo build --debug`

### Common Issues

1. **API Connection Issues**:
   - Check environment variables for correct API endpoints
   - Verify network connectivity
   - Check for CORS issues in browser console

2. **Authentication Problems**:
   - Verify API keys are correctly set
   - Check token expiration
   - Ensure proper headers are being sent

3. **Payment Processing Failures**:
   - Check validation errors in logs
   - Verify test card numbers are valid
   - Check for fraud detection triggers

## Performance Considerations

### JavaScript/React Performance

- Use React.memo for expensive components
- Implement virtualization for long lists
- Use proper key props for list items
- Avoid unnecessary re-renders
- Use code splitting and lazy loading

### API Performance

- Implement proper caching strategies
- Use pagination for large data sets
- Optimize database queries
- Consider using GraphQL for complex data requirements
- Implement request batching where appropriate

### Payment Processing Performance

- Optimize critical payment paths
- Implement proper connection pooling
- Use appropriate timeouts for external services
- Consider using worker threads for CPU-intensive tasks

## Security Guidelines

### General Security Practices

- Never store sensitive data in code or version control
- Use environment variables for secrets
- Implement proper input validation
- Follow the principle of least privilege
- Keep dependencies updated

### Payment Security

- Always use HTTPS for all communications
- Implement proper tokenization for payment data
- Follow PCI DSS requirements
- Implement fraud detection mechanisms
- Use secure coding practices

### Authentication and Authorization

- Use strong authentication mechanisms
- Implement proper session management
- Use JWT with appropriate expiration
- Implement role-based access control
- Validate permissions for all operations

## Documentation Standards

### Code Documentation

- Use JSDoc for JavaScript/TypeScript
- Use GoDoc for Go code
- Use Rustdoc for Rust code
- Document all public APIs
- Include examples for complex functionality

Example JSDoc:

```javascript
/**
 * Process a payment transaction with support for all payment methods globally
 * 
 * @param {Object} paymentData - Payment information
 * @param {string} paymentData.amount - Amount to charge
 * @param {string} paymentData.currency - Currency code (e.g., USD, EUR)
 * @param {string} paymentData.paymentMethod - Payment method (card, bank_transfer, mobile_money, etc)
 * @param {Object} paymentData.customer - Customer information
 * @param {Object} paymentData.metadata - Additional transaction metadata
 * @param {boolean} paymentData.instantSettlement - Whether to process instant settlement
 * @returns {Promise<Object>} Transaction result
 */
async processPayment(paymentData) {
  // Implementation
}
```

### API Documentation

- Use OpenAPI/Swagger for REST APIs
- Document all endpoints, parameters, and responses
- Include authentication requirements
- Provide example requests and responses
- Document error codes and messages

### Project Documentation

- Keep README.md up to date
- Document architecture decisions
- Provide getting started guides
- Include troubleshooting information
- Document configuration options

## Release Process

### Version Numbering

We use Semantic Versioning (SemVer):
- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward-compatible manner
- PATCH version for backward-compatible bug fixes

### Release Steps

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a release branch from development
4. Run all tests
5. Build production artifacts
6. Create a tag for the version
7. Merge to main
8. Deploy to production
9. Announce the release

### Hotfix Process

1. Create a hotfix branch from main
2. Fix the issue
3. Update version (patch)
4. Run tests
5. Create a tag for the hotfix version
6. Merge to main and development
7. Deploy to production

## Database Setup and Usage

### Dual Database Configuration

The system uses both PostgreSQL and MongoDB. Here's how to work with them:

#### PostgreSQL Setup
1. Configure in `.env`:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=sunny_payments
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_SSL=false
   ```

2. Table initialization:
   ```bash
   npm run db:migrate
   ```

3. Usage pattern:
   - All financial transactions
   - User accounts
   - Merchant data
   - Settlement records

#### MongoDB Setup
1. Configure in `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/sunny_payments_dev
   ```

2. Collection initialization:
   ```bash
   npm run db:seed
   ```

3. Usage pattern:
   - Session management
   - Analytics data
   - Event logging
   - Feature flags

### Best Practices

1. **Data Consistency**
   - Use transactions in PostgreSQL for financial operations
   - Implement retry mechanisms for MongoDB operations
   - Handle cross-database consistency through application logic

2. **Performance Optimization**
   - Use appropriate indexes in both databases
   - Implement connection pooling
   - Cache frequently accessed data

3. **Error Handling**
   - Implement proper fallbacks for database failures
   - Log all database errors with context
   - Use circuit breakers for database operations