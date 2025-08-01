#!/bin/bash

# CREDVAULT LIMITED Code Protection Enforcement Script
# This script enforces code protection measures for the Sunny Payment Gateway

# Configuration
CONFIG_FILE="config/security/code-protection.json"
LOG_DIR="/var/log/sunny"
AUDIT_LOG="${LOG_DIR}/code-access.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"
chmod 700 "$LOG_DIR"

# Function to log audit events
log_audit() {
    local event="$1"
    local user="$2"
    local details="$3"
    echo "$(date '+%Y-%m-%d %H:%M:%S')|${event}|${user}|${details}" >> "$AUDIT_LOG"
}

# Check for required security environment
if [[ -z "${SUNNY_SECURITY_ENV}" ]]; then
    echo "Error: Security environment not set. Please run setup-security-env.sh first."
    exit 1
fi

# Verify user authentication
if [[ -z "${SUNNY_USER_TOKEN}" ]]; then
    echo "Error: User not authenticated. Please log in first."
    exit 1
fi

# Apply code obfuscation
echo "Applying code obfuscation..."
if ! command -v javascript-obfuscator &> /dev/null; then
    npm install -g javascript-obfuscator
fi

# Obfuscate core files
find src/core -type f -name "*.js" -exec javascript-obfuscator {} --output {} \;
find src/payment-gateway -type f -name "*.js" -exec javascript-obfuscator {} --output {} \;

# Set restrictive permissions
echo "Setting file permissions..."
find src/core src/security src/payment-gateway -type f -exec chmod 600 {} \;
find src/core src/security src/payment-gateway -type d -exec chmod 700 {} \;

# Install git hooks
echo "Installing git hooks..."
cp scripts/security/git-hooks/* .git/hooks/
chmod +x .git/hooks/*

# Set up file monitoring
echo "Setting up file monitoring..."
if ! command -v inotifywait &> /dev/null; then
    sudo apt-get install -y inotify-tools
fi

# Start file monitoring in background
nohup bash -c '
while true; do
    inotifywait -r -e modify,create,delete src/core src/security src/payment-gateway | while read path action file; do
        echo "$(date): $action $path$file" >> /var/log/sunny/file-monitor.log
    done
done' &

echo "Code protection measures applied successfully."
log_audit "PROTECTION_APPLIED" "${USER}" "Code protection measures applied"
