# Sunny Shared Packages Migration Script
Write-Host "Starting Shared Packages Migration..."

# Define shared package migrations
$packageMigrations = @{
    # Models to API Types
    "src\models\Payment.js" = "packages\api-types\src\models\Payment.ts"
    "src\models\User.js" = "packages\api-types\src\models\User.ts"
    "src\models\NetworkConfiguration.js" = "packages\api-types\src\models\NetworkConfiguration.ts"
    
    # Utils to API Utils
    "src\utils\validation.js" = "packages\api-utils\src\validation.js"
    "src\utils\formatters.js" = "packages\api-utils\src\formatters.js"
    "src\utils\crypto.js" = "packages\api-utils\src\crypto.js"
    "src\utils\logger.js" = "packages\api-utils\src\logger.js"
    "src\utils\geoDetection.js" = "packages\api-utils\src\geo\geoDetection.js"
    "src\utils\addressValidation.js" = "packages\api-utils\src\address\addressValidation.js"
    
    # Database files
    "src\utils\mongoConnect.js" = "packages\database\src\mongo\mongoConnect.js"
    "src\utils\databaseManager.js" = "packages\database\src\managers\DatabaseManager.js"
    "src\utils\connectionPool.js" = "packages\database\src\pool\ConnectionPool.js"
    "src\utils\dbSync.js" = "packages\database\src\sync\dbSync.js"
    "src\config\db.js" = "packages\database\src\config\db.js"
    "src\config\database.js" = "packages\database\src\config\database.js"
    "src\config\database-optimization.js" = "packages\database\src\config\database-optimization.js"
    "src\config\mongodb.js" = "packages\database\src\config\mongodb.js"
    
    # Security files
    "src\security\encryption.js" = "packages\security\src\encryption\encryption.js"
    "src\security\keyManagement.js" = "packages\security\src\encryption\keyManagement.js"
    "src\security\systemSecurity.js" = "packages\security\src\services\systemSecurity.js"
    "src\security\networkSecurity.js" = "packages\security\src\services\networkSecurity.js"
    "src\security\databaseSecurity.js" = "packages\security\src\services\databaseSecurity.js"
    "src\security\physicalSecurity.js" = "packages\security\src\services\physicalSecurity.js"
    "src\security\activationSecurity.js" = "packages\security\src\services\activationSecurity.js"
    "src\security\walletEncryption.js" = "packages\security\src\encryption\walletEncryption.js"
    "src\security\requestSigner.js" = "packages\security\src\auth\requestSigner.js"
    "src\security\networkValidator.js" = "packages\security\src\auth\networkValidator.js"
    "src\security\logger.js" = "packages\security\src\services\logger.js"
    "src\security\CodeWatermarker.js" = "packages\security\src\services\CodeWatermarker.js"
    "src\services\SecurityLogger.js" = "packages\security\src\services\SecurityLogger.js"
    "src\services\SecurityHealthCheck.js" = "packages\security\src\services\SecurityHealthCheck.js"
    "src\services\secureHttpClient.js" = "packages\security\src\services\secureHttpClient.js"
    "src\config\security.js" = "packages\security\src\config\security.js"
    "src\config\encryption.js" = "packages\security\src\config\encryption.js"
    "src\config\ssl.js" = "packages\security\src\config\ssl.js"
    "src\config\key-rotation.js" = "packages\security\src\config\key-rotation.js"
    
    # Payment Processors
    "src\config\processors.js" = "packages\payment-processors\src\config\processors.js"
    "src\config\banks.js" = "packages\payment-processors\src\config\banks.js"
    "src\config\currencies.js" = "packages\payment-processors\src\config\currencies.js"
    
    # Utils
    "src\services\loggingService.js" = "packages\utils\src\services\LoggingService.js"
    "src\services\HealthCheckService.js" = "packages\utils\src\services\HealthCheckService.js"
    "src\services\networkDiscoveryService.js" = "packages\utils\src\services\NetworkDiscoveryService.js"
    "src\config\config.js" = "packages\utils\src\config\config.js"
    "src\config\configValidator.js" = "packages\utils\src\config\configValidator.js"
    "src\config\validateConfig.js" = "packages\utils\src\config\validateConfig.js"
    "src\config\cache.js" = "packages\utils\src\config\cache.js"
    "src\config\sentry.js" = "packages\utils\src\config\sentry.js"
    "src\config\infrastructure.js" = "packages\utils\src\config\infrastructure.js"
    "src\config\advancedFeatures.js" = "packages\utils\src\config\advancedFeatures.js"
}

# Create additional package subdirectories
$additionalDirs = @(
    "packages\api-utils\src\geo", "packages\api-utils\src\address",
    "packages\security\src\encryption", "packages\security\src\auth"
)

foreach ($dir in $additionalDirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

# Perform package migrations
Write-Host "Migrating shared package files..."
$successCount = 0
$errorCount = 0

foreach ($source in $packageMigrations.Keys) {
    $destination = $packageMigrations[$source]
    
    if (Test-Path $source) {
        try {
            Copy-Item $source $destination -Force
            Write-Host "SUCCESS: $source -> $destination"
            $successCount++
        }
        catch {
            Write-Host "ERROR: Failed to copy $source : $($_.Exception.Message)"
            $errorCount++
        }
    }
    else {
        Write-Host "WARNING: Source file not found: $source"
    }
}

Write-Host ""
Write-Host "Shared Packages Migration Summary:"
Write-Host "Successfully migrated: $successCount files"
Write-Host "Errors: $errorCount files"
Write-Host ""
Write-Host "Packages migration completed!"
