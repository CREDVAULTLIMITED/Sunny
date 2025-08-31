#!/bin/bash

# Create local logging directories with appropriate permissions
echo "Creating logging directories..."
mkdir -p logs/{security,transactions,access,audit}
chmod -R 750 logs

# Initialize environment variables
echo "Setting up security environment variables..."
if [ ! -f .env ]; then
    cat > .env << EOL
# Logging Configuration
LOG_DIR=./logs
LOG_LEVEL=info
ENABLE_FILE_LOGGING=true
ENABLE_CONSOLE_LOGGING=true

# Security Configuration
SECURITY_LOG_PATH=./logs/security
SECURITY_AUDIT_PATH=./logs/audit
NODE_ENV=development
EOL
fi

# Make the script executable
chmod +x scripts/setup-security-env.sh

echo "Security environment setup complete!"
