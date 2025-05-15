# Contributing to Sunny Payment Gateway

Thank you for your interest in contributing to the Sunny Payment Gateway project! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Environment Setup](#development-environment-setup)
4. [Branching Strategy](#branching-strategy)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation Guidelines](#documentation-guidelines)
9. [Code Style Guidelines](#code-style-guidelines)
10. [Issue Reporting](#issue-reporting)
11. [Feature Requests](#feature-requests)
12. [Communication Channels](#communication-channels)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Add the original repository as a remote named "upstream"
4. Create a new branch for your feature or bugfix
5. Make your changes
6. Push your branch to your fork
7. Submit a pull request

## Development Environment Setup

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- Go (v1.18 or later) for API gateway development
- Rust (latest stable) for core processing development
- Docker and Docker Compose for local development

### Setup Steps

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

5. For API gateway development:
   ```bash
   cd src/api-gateway
   go mod download
   go run main.go
   ```

6. For Rust core development:
   ```bash
   cd src/core-rust
   cargo build
   cargo test
   ```

## Branching Strategy

We use a simplified GitFlow branching model:

- `main`: Production-ready code
- `development`: Integration branch for features
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `hotfix/*`: Hot fix branches for production issues

Always branch from `development` for new features and bug fixes.

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(payment): add support for UPI payments

This adds support for UPI payments in India, including:
- QR code generation
- VPA validation
- Status checking

Closes #123
```

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Update documentation as necessary
3. Add tests for new functionality
4. Ensure all tests pass
5. Update the CHANGELOG.md if applicable
6. Submit a pull request to the `development` branch
7. Request review from at least one maintainer
8. Address any feedback from reviewers

## Testing Guidelines

- Write unit tests for all new functionality
- Ensure existing tests pass
- Include integration tests for API endpoints
- Test for edge cases and error conditions
- Aim for at least 80% test coverage for new code

### Running Tests

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --testPathPattern=payment

# Check test coverage
npm run test:coverage
```

## Documentation Guidelines

- Update README.md for significant changes
- Document all public APIs with JSDoc comments
- Keep API documentation up to date
- Include examples for complex functionality
- Document configuration options

## Code Style Guidelines

We use ESLint and Prettier to enforce code style:

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

### JavaScript/TypeScript Guidelines

- Use ES6+ features
- Prefer const over let, avoid var
- Use async/await over promises
- Use descriptive variable names
- Add JSDoc comments for functions and classes
- Use TypeScript for new components

### Go Guidelines

- Follow the [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- Use gofmt for formatting
- Handle errors explicitly
- Document exported functions and types

### Rust Guidelines

- Follow the [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/)
- Use Rustfmt for formatting
- Use Clippy for linting
- Prefer Result and Option over unwrap/expect

## Issue Reporting

When reporting issues, please include:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Environment information (OS, browser, etc.)
6. Screenshots if applicable
7. Any relevant logs or error messages

## Feature Requests

Feature requests are welcome! Please include:

1. A clear and descriptive title
2. A detailed description of the proposed feature
3. Any relevant use cases
4. Potential implementation approaches if you have ideas

## Communication Channels

- GitHub Issues: For bug reports and feature requests
- Pull Requests: For code contributions
- Project Discord: For real-time discussion
- Project Mailing List: For announcements and discussions

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).