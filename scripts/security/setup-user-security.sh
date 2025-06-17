#!/bin/bash

# CREDVAULT LIMITED Security Environment Setup
# This script sets up the security environment for authorized user T756-Tech

# Configuration
WORKSPACE_DIR="/home/sam/Downloads/Sunny-main"
SECURITY_CONFIG_DIR="${WORKSPACE_DIR}/config/security"
LOG_DIR="${WORKSPACE_DIR}/logs/security"
USER_ID="T756-Tech"

# Create necessary directories
mkdir -p "$LOG_DIR"
chmod 700 "$LOG_DIR"

# Generate unique keys
WATERMARK_KEY=$(openssl rand -hex 32)
ACCESS_TOKEN=$(openssl rand -hex 32)

# Set up environment variables
cat > "${WORKSPACE_DIR}/.env.security" << EOF
export SUNNY_AUTHORIZED_USER="${USER_ID}"
export SUNNY_SECURITY_ENV="production"
export SUNNY_USER_TOKEN="${ACCESS_TOKEN}"
export SUNNY_WATERMARK_KEY="${WATERMARK_KEY}"
export SUNNY_COMPANY="CREDVAULT_LIMITED"
export SUNNY_ACCESS_LEVEL="ADMIN"
EOF

# Set restrictive permissions
chmod 600 "${WORKSPACE_DIR}/.env.security"

# Apply file permissions
echo "Applying secure file permissions..."
find "${WORKSPACE_DIR}/src/core" -type f -exec chmod 640 {} \;
find "${WORKSPACE_DIR}/src/security" -type f -exec chmod 600 {} \;
find "${WORKSPACE_DIR}/config/security" -type f -exec chmod 600 {} \;

# Set up Git hooks
mkdir -p "${WORKSPACE_DIR}/.git/hooks"
cat > "${WORKSPACE_DIR}/.git/hooks/pre-commit" << 'EOF'
#!/bin/bash

if [[ -z "${SUNNY_AUTHORIZED_USER}" ]] || [[ "${SUNNY_AUTHORIZED_USER}" != "T756-Tech" ]]; then
    echo "Error: Unauthorized commit attempt. Please set up proper authentication."
    exit 1
fi

# Check for sensitive files
git diff --cached --name-only | while read file; do
    if grep -i "password\|secret\|key\|credential" "$file" > /dev/null 2>&1; then
        echo "Warning: Potential sensitive data in $file"
        exit 1
    fi
done
EOF

chmod +x "${WORKSPACE_DIR}/.git/hooks/pre-commit"

# Create log files
touch "${LOG_DIR}/access.log"
touch "${LOG_DIR}/security-events.log"
chmod 600 "${LOG_DIR}"/*.log

echo "Security environment set up successfully for ${USER_ID}"
echo "Please source the security environment file:"
echo "source ${WORKSPACE_DIR}/.env.security"

# Add company headers to source files
find "${WORKSPACE_DIR}/src" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.py" \) -exec sh -c '
    if ! grep -q "CREDVAULT LIMITED" "$1"; then
        mv "$1" "$1.tmp"
        echo "/**" > "$1"
        echo " * Copyright (c) 2023-2025 CREDVAULT LIMITED" >> "$1"
        echo " * All Rights Reserved." >> "$1"
        echo " * Proprietary and Confidential" >> "$1"
        echo " * Written by ${USER_ID}, $(date +"%Y")" >> "$1"
        echo " */" >> "$1"
        echo "" >> "$1"
        cat "$1.tmp" >> "$1"
        rm "$1.tmp"
    fi
' sh {} \;
