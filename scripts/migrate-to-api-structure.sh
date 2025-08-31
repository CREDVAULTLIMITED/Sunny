#!/bin/bash

# Sunny API Structure Migration Script
# This script migrates files from the current structure to the new API microservices structure

set -e

echo "🚀 Starting Sunny API Structure Migration..."
echo "================================================"

# Create backup of current structure
BACKUP_DIR="src_backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 Creating backup at: $BACKUP_DIR"
cp -r src "$BACKUP_DIR"

# Create base API structure directories
echo "📁 Creating API service directories..."
mkdir -p api/{gateway,core-engine,auth-service,kenya-service,analytics-service,notification-service,fraud-detection,ai-service,compliance-service}/{src,tests,docs}

# Create shared packages directories  
echo "📁 Creating shared package directories..."
mkdir -p packages/{api-types,api-utils,database,security,payment-processors,utils}/{src,tests,docs}

# Create subdirectories for each service
echo "📁 Creating service subdirectories..."

# API Gateway
mkdir -p api/gateway/src/{client,middleware,routes,config,utils}

# Core Engine
mkdir -p api/core-engine/src/{gateway,orchestrator,constants,tax,services,integrations,processors}

# Auth Service
mkdir -p api/auth-service/src/{services,sdk,auth,config,middleware}

# Kenya Service
mkdir -p api/kenya-service/src/{services,utils,tax,integration,kra,mpesa}

# Analytics Service
mkdir -p api/analytics-service/src/{services,analytics,config,monitoring}

# Notification Service
mkdir -p api/notification-service/src/{services,utils,routes,templates}

# Fraud Detection
mkdir -p api/fraud-detection/src/{detection,scoring,rules,monitoring}

# AI Service
mkdir -p api/ai-service/src/{core,deepseek,services,routes,models}

# Compliance Service
mkdir -p api/compliance-service/src/{pci,gdpr,reporting,audit,validators,monitoring}

# Shared Packages subdirectories
mkdir -p packages/api-types/src/{models,interfaces,enums}
mkdir -p packages/api-utils/src/{validation,formatters,crypto,logger,geo,address}
mkdir -p packages/database/src/{mongo,managers,pool,sync,config}
mkdir -p packages/security/src/{encryption,auth,compliance,services,config}
mkdir -p packages/payment-processors/src/{config,processors,validators}
mkdir -p packages/utils/src/{services,config,helpers}

echo "✅ Directory structure created successfully!"
echo ""
echo "📋 Migration Summary:"
echo "- API Services: 9 services created"
echo "- Shared Packages: 6 packages created"
echo "- Backup created at: $BACKUP_DIR"
echo ""
echo "Next: Run individual migration commands for each service"
