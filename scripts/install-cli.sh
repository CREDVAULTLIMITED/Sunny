#!/usr/bin/env bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Sunny CLI...${NC}"

# Create local bin directory if it doesn't exist
mkdir -p "$HOME/.local/bin"

# Add local bin to PATH if not already there
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
    source "$HOME/.bashrc"
fi

# Create symlink to CLI
echo -e "${BLUE}Creating CLI symlink...${NC}"
chmod +x src/cli/index.js
ln -sf "$(pwd)/src/cli/index.js" "$HOME/.local/bin/sunny"

# Verify installation
if command -v sunny &> /dev/null; then
    echo -e "${GREEN}✓ Sunny CLI installed successfully!${NC}"
    echo -e "${BLUE}You can now use 'sunny' command from anywhere${NC}"
    echo -e "\nTry: sunny --help"
else
    echo -e "${RED}× Installation failed${NC}"
    echo "Please check the error messages above"
    exit 1
fi
