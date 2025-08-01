#!/bin/bash

# Production Deployment Script for Sunny Payment Gateway
echo "Starting Sunny Payment Gateway Production Deployment..."

# Environment Setup
export NODE_ENV=production
export ENFORCE_SECURE_CONFIG=true

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
for cmd in docker docker-compose openssl node npm; do
    if ! command_exists "$cmd"; then
        echo "Error: $cmd is required but not installed."
        exit 1
    fi
done

# Directory setup
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT" || exit 1

# Verify SSL certificates
SSL_DIR="docker/production/ssl"
if [ ! -f "${SSL_DIR}/certificate.crt" ] || [ ! -f "${SSL_DIR}/private.key" ]; then
    echo "SSL certificates not found. Running SSL setup..."
    ./scripts/setup-ssl.sh
fi

# Run security checks
echo "Running security audit..."
npm audit
npm run security-test

# Build production assets
echo "Building production assets..."
npm run build

# Database migration
echo "Running database migrations..."
NODE_ENV=production npm run db:migrate

# Start services
echo "Starting production services..."
cd docker/production || exit 1
docker-compose down
docker-compose up -d

# Health check
echo "Performing health check..."
for i in {1..6}; do
    if curl -ks https://localhost/health | grep -q "ok"; then
        echo "Services are healthy!"
        exit 0
    fi
    echo "Waiting for services to be ready... ($i/6)"
    sleep 10
done

echo "Warning: Health check didn't pass. Please check the logs."
exit 1
