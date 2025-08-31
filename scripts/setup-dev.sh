#!/bin/bash

# Sunny Payment Gateway - Development Environment Setup
# Script to set up local development environment

set -euo pipefail

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local tools=("docker" "docker-compose" "node" "npm")
    for tool in "${tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            print_error "$tool is required but not installed"
            exit 1
        fi
    done
    
    print_status "All prerequisites met"
}

# Setup environment files
setup_env_files() {
    print_status "Setting up environment files..."
    
    # Copy environment templates
    if [[ ! -f .env ]]; then
        cp .env.example .env
        print_status "Created .env file from template"
    fi
    
    # Generate secrets
    if ! grep -q "GENERATED" .env; then
        echo "# GENERATED SECRETS" >> .env
        echo "JWT_SECRET=$(openssl rand -hex 32)" >> .env
        echo "ENCRYPTION_KEY=$(openssl rand -hex 16)" >> .env
        echo "REDIS_PASSWORD=$(openssl rand -hex 16)" >> .env
        echo "POSTGRES_PASSWORD=$(openssl rand -hex 16)" >> .env
        print_status "Generated secure secrets"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install API service dependencies
    for service in api/*/; do
        if [[ -f "$service/package.json" ]]; then
            print_status "Installing dependencies for $(basename "$service")"
            (cd "$service" && npm install)
        fi
    done
    
    # Install package dependencies
    for package in packages/*/; do
        if [[ -f "$package/package.json" ]]; then
            print_status "Installing dependencies for $(basename "$package")"
            (cd "$package" && npm install)
        fi
    done
}

# Start services
start_services() {
    print_status "Starting development services..."
    
    # Start infrastructure services
    docker-compose -f infrastructure/docker/docker-compose.yml up -d postgres redis clickhouse
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 10
    
    # Run database migrations
    print_status "Running database migrations..."
    # Add migration commands here
    
    print_status "Development environment is ready!"
    print_status "API Gateway will be available at: http://localhost:8080"
    print_status "Documentation will be available at: http://localhost:8080/docs"
}

# Main function
main() {
    echo "🚀 Setting up Sunny Payment Gateway development environment..."
    
    check_prerequisites
    setup_env_files
    install_dependencies
    start_services
    
    echo "✅ Development environment setup complete!"
}

main "$@"
