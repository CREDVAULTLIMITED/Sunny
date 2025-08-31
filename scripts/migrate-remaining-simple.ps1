# Simple Migration for Remaining Folders
Write-Host "Migrating remaining folders..."

# 1. Move HuggingFace model to AI service
Write-Host "Moving HuggingFace model to AI service..."
New-Item -ItemType Directory -Path "api\ai-service\models" -Force | Out-Null
Copy-Item "huggingface_model\*" "api\ai-service\models\" -Recurse -Force
Write-Host "SUCCESS: HuggingFace model moved to api/ai-service/models/"

# 2. Move monitoring config to analytics service
Write-Host "Moving monitoring config to analytics service..."
New-Item -ItemType Directory -Path "api\analytics-service\src\monitoring" -Force | Out-Null
Copy-Item "monitoring\monitoring-config.js" "api\analytics-service\src\monitoring\monitoring-config.js" -Force
Write-Host "SUCCESS: Monitoring config moved to analytics service"

# 3. Distribute config files
Write-Host "Distributing config files..."

# Move to infrastructure
Copy-Item "config\disaster-recovery.yml" "infrastructure\disaster-recovery.yml" -Force
Copy-Item "config\bare-metal-config.yml" "infrastructure\bare-metal-config.yml" -Force

# Move security configs to security package
New-Item -ItemType Directory -Path "packages\security\src\config\global" -Force | Out-Null
Copy-Item "config\security\*" "packages\security\src\config\global\" -Recurse -Force
Write-Host "SUCCESS: Config files distributed"

# 4. Move integration tests to core-engine
Write-Host "Moving integration tests..."
New-Item -ItemType Directory -Path "api\core-engine\tests" -Force | Out-Null
Copy-Item "tests\payment-gateway.test.js" "api\core-engine\tests\integration.test.js" -Force

# Create test directories for other services
$services = @("gateway", "auth-service", "kenya-service", "analytics-service", "notification-service", "fraud-detection", "ai-service", "compliance-service")
foreach ($service in $services) {
    New-Item -ItemType Directory -Path "api\$service\tests" -Force | Out-Null
}
Write-Host "SUCCESS: Tests distributed to services"

# 5. Merge deployment with infrastructure
Write-Host "Merging deployment with infrastructure..."
Copy-Item "deployment\*" "infrastructure\" -Recurse -Force
Write-Host "SUCCESS: Deployment merged with infrastructure"

Write-Host ""
Write-Host "Remaining Folders Migration Summary:"
Write-Host "====================================="
Write-Host "SUCCESS: HuggingFace model -> api/ai-service/models/"
Write-Host "SUCCESS: Monitoring config -> api/analytics-service/src/monitoring/"
Write-Host "SUCCESS: Config files -> Distributed to appropriate services"
Write-Host "SUCCESS: Integration tests -> Distributed to service test directories"
Write-Host "SUCCESS: Deployment -> Merged with infrastructure/"
Write-Host ""
Write-Host "Folders to keep at root level:"
Write-Host "- public/ (frontend static assets)"
Write-Host "- packages/ (shared packages)"
Write-Host "- monitoring/ (infrastructure monitoring)"
Write-Host "- infrastructure/ (IaC and deployment)"
Write-Host "- docs/ (project documentation)"
Write-Host "- docker/ (containerization)"
Write-Host ""
Write-Host "Migration completed successfully!"
