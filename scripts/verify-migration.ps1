# Verify Migration Results
Write-Host "Verifying Sunny API Migration Results..."
Write-Host "======================================"

# Count files in each service
$services = @("gateway", "core-engine", "auth-service", "kenya-service", "analytics-service", "notification-service", "fraud-detection", "ai-service", "compliance-service")
$packages = @("api-types", "api-utils", "database", "security", "payment-processors", "utils")

Write-Host ""
Write-Host "API Services File Count:"
Write-Host "------------------------"
$totalApiFiles = 0
foreach ($service in $services) {
    $path = "api\$service\src"
    if (Test-Path $path) {
        $fileCount = (Get-ChildItem -Path $path -Recurse -File).Count
        Write-Host "$service : $fileCount files"
        $totalApiFiles += $fileCount
    }
}

Write-Host ""
Write-Host "Shared Packages File Count:"
Write-Host "---------------------------"
$totalPackageFiles = 0
foreach ($package in $packages) {
    $path = "packages\$package\src"
    if (Test-Path $path) {
        $fileCount = (Get-ChildItem -Path $path -Recurse -File).Count
        Write-Host "$package : $fileCount files"
        $totalPackageFiles += $fileCount
    }
}

Write-Host ""
Write-Host "Directory Structure Verification:"
Write-Host "--------------------------------"

# Check if all expected directories exist
$expectedDirs = @(
    "api\gateway\src\client", "api\gateway\src\middleware", "api\gateway\src\routes",
    "api\core-engine\src\gateway", "api\core-engine\src\orchestrator", "api\core-engine\src\constants",
    "api\auth-service\src\services", "api\auth-service\src\sdk", "api\auth-service\src\auth",
    "packages\api-types\src\models", "packages\database\src\mongo", "packages\security\src\encryption"
)

$missingDirs = @()
foreach ($dir in $expectedDirs) {
    if (Test-Path $dir) {
        Write-Host "✓ $dir exists"
    } else {
        Write-Host "✗ $dir missing"
        $missingDirs += $dir
    }
}

Write-Host ""
Write-Host "Migration Summary:"
Write-Host "=================="
Write-Host "Total API service files: $totalApiFiles"
Write-Host "Total shared package files: $totalPackageFiles"
Write-Host "Total migrated files: $($totalApiFiles + $totalPackageFiles)"
Write-Host "Missing directories: $($missingDirs.Count)"

if ($missingDirs.Count -eq 0) {
    Write-Host "✓ Migration completed successfully!"
} else {
    Write-Host "⚠ Migration completed with $($missingDirs.Count) missing directories"
}

Write-Host ""
Write-Host "Next Steps:"
Write-Host "----------"
Write-Host "1. Update import paths in migrated files"
Write-Host "2. Install dependencies in each service/package"
Write-Host "3. Update TypeScript configurations"
Write-Host "4. Test individual services"
Write-Host "5. Set up development environment"
