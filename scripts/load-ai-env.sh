#!/bin/bash

# Load environment variables
set -a
source .env
set +a

# Start Helios
node scripts/start-helios.js
