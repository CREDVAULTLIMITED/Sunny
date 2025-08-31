#!/bin/bash
set -e

# Script to manage isolated model deployment
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo "Error: Docker is not running"
        exit 1
    fi
}

# Function to validate security configuration
check_security() {
    echo "Checking security configuration..."
    
    # Check AppArmor/SELinux
    if command -v getenforce >/dev/null 2>&1; then
        if [ "$(getenforce)" != "Enforcing" ]; then
            echo "Warning: SELinux is not in enforcing mode"
        fi
    fi
    
    # Check system limits
    if [ "$(ulimit -n)" -lt 1024 ]; then
        echo "Warning: File descriptor limit is too low"
    fi
    
    # Check Docker security options
    if ! docker info 2>/dev/null | grep -q "userns"; then
        echo "Warning: User namespace remapping is not enabled"
    fi
}

# Function to setup model directories
setup_directories() {
    echo "Setting up model directories..."
    
    # Create necessary directories with secure permissions
    mkdir -p "${PROJECT_ROOT}/models/helios"
    mkdir -p "${PROJECT_ROOT}/models/deepseek"
    mkdir -p "${PROJECT_ROOT}/docker/production/nginx"
    
    # Set secure permissions
    chmod 700 "${PROJECT_ROOT}/models/helios"
    chmod 700 "${PROJECT_ROOT}/models/deepseek"
}

# Function to deploy models
deploy_models() {
    echo "Deploying isolated models..."
    
    cd "${PROJECT_ROOT}/docker/production"
    
    # Pull latest images
    docker-compose -f docker-compose.model-isolation.yml pull
    
    # Deploy with isolation
    docker-compose -f docker-compose.model-isolation.yml up -d
    
    echo "Waiting for services to start..."
    sleep 10
    
    # Verify deployments
    if ! docker-compose -f docker-compose.model-isolation.yml ps | grep -q "Up"; then
        echo "Error: Some services failed to start"
        docker-compose -f docker-compose.model-isolation.yml logs
        exit 1
    fi
}

# Function to verify isolation
verify_isolation() {
    echo "Verifying model isolation..."
    
    # Check network isolation
    if docker network inspect model-backend | grep -q "model-proxy"; then
        echo "Error: Proxy has access to backend network"
        exit 1
    fi
    
    # Check container isolation
    for container in model-helios model-deepseek; do
        if ! docker inspect "$container" --format '{{.HostConfig.ReadonlyRootfs}}' | grep -q "true"; then
            echo "Error: $container is not running with read-only root filesystem"
            exit 1
        fi
    done
    
    echo "Isolation verification complete"
}

# Main execution
echo "Starting model isolation deployment..."

check_docker
check_security
setup_directories
deploy_models
verify_isolation

echo "Model isolation deployment completed successfully"
