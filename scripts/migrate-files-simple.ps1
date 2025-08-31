# Sunny API Files Migration Script - Simple Version
Write-Host "Starting Sunny API Files Migration..."

# Create all necessary directories first
Write-Host "Creating directory structure..."

# API Services directories
$apiDirs = @(
    "api\gateway\src\client", "api\gateway\src\middleware", "api\gateway\src\routes", "api\gateway\src\config", "api\gateway\src\utils",
    "api\core-engine\src\gateway", "api\core-engine\src\orchestrator", "api\core-engine\src\constants", "api\core-engine\src\tax", "api\core-engine\src\services", "api\core-engine\src\integrations",
    "api\auth-service\src\services", "api\auth-service\src\sdk", "api\auth-service\src\auth", "api\auth-service\src\config",
    "api\kenya-service\src\services", "api\kenya-service\src\utils", "api\kenya-service\src\tax", "api\kenya-service\src\integration",
    "api\analytics-service\src\services", "api\analytics-service\src\analytics", "api\analytics-service\src\config",
    "api\notification-service\src\services", "api\notification-service\src\utils", "api\notification-service\src\routes",
    "api\fraud-detection\src\detection", "api\fraud-detection\src\scoring",
    "api\ai-service\src\core", "api\ai-service\src\deepseek", "api\ai-service\src\services", "api\ai-service\src\routes",
    "api\compliance-service\src\pci", "api\compliance-service\src\gdpr", "api\compliance-service\src\reporting", "api\compliance-service\src\audit", "api\compliance-service\src\validators", "api\compliance-service\src\monitoring"
)

# Shared packages directories
$packageDirs = @(
    "packages\api-types\src\models", "packages\api-types\src\interfaces",
    "packages\api-utils\src\validation", "packages\api-utils\src\formatters", "packages\api-utils\src\crypto", "packages\api-utils\src\logger", "packages\api-utils\src\geo", "packages\api-utils\src\address",
    "packages\database\src\mongo", "packages\database\src\managers", "packages\database\src\pool", "packages\database\src\sync", "packages\database\src\config",
    "packages\security\src\encryption", "packages\security\src\auth", "packages\security\src\compliance", "packages\security\src\services", "packages\security\src\config",
    "packages\payment-processors\src\config", "packages\payment-processors\src\processors",
    "packages\utils\src\services", "packages\utils\src\config"
)

# Create directories
foreach ($dir in $apiDirs + $packageDirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

Write-Host "Directory structure created!"

# Define file migrations
$migrations = @{
    # API Gateway
    "src\api\SunnyAPI.js" = "api\gateway\src\client\SunnyAPI.js"
    "src\middleware\auth.js" = "api\gateway\src\middleware\auth.js"
    "src\middleware\rateLimiter.js" = "api\gateway\src\middleware\rateLimiter.js"
    "src\middleware\securityHeaders.js" = "api\gateway\src\middleware\securityHeaders.js"
    "src\middleware\securityMiddleware.js" = "api\gateway\src\middleware\securityMiddleware.js"
    "src\middleware\validators.js" = "api\gateway\src\middleware\validators.js"
    "src\routes\health.js" = "api\gateway\src\routes\health.js"
    "src\routes\monitoring.js" = "api\gateway\src\routes\monitoring.js"
    
    # Core Engine
    "src\core\SunnyPaymentGateway.js" = "api\core-engine\src\gateway\SunnyPaymentGateway.js"
    "src\core\PaymentOrchestrator.js" = "api\core-engine\src\orchestrator\PaymentOrchestrator.js"
    "src\core\constants.js" = "api\core-engine\src\constants\index.js"
    "src\core\TaxManager.js" = "api\core-engine\src\tax\TaxManager.js"
    "src\services\paymentService.js" = "api\core-engine\src\services\PaymentService.js"
    "src\services\cryptoPaymentService.js" = "api\core-engine\src\services\CryptoPaymentService.js"
    "src\services\DynamicWalletService.js" = "api\core-engine\src\services\DynamicWalletService.js"
    "src\services\customerService.js" = "api\core-engine\src\services\CustomerService.js"
    "src\services\productService.js" = "api\core-engine\src\services\ProductService.js"
    "src\integrations\CreditBoostIntegration.js" = "api\core-engine\src\integrations\CreditBoostIntegration.js"
    
    # Auth Service
    "src\services\authService.js" = "api\auth-service\src\services\AuthService.js"
    "src\services\authSDK.js" = "api\auth-service\src\sdk\AuthSDK.js"
    "src\security\BiometricAuthenticator.js" = "api\auth-service\src\auth\BiometricAuthenticator.js"
    "src\security\accessControl.js" = "api\auth-service\src\auth\AccessControl.js"
    "src\config\auth.js" = "api\auth-service\src\config\auth.js"
    "src\config\auth-config.js" = "api\auth-service\src\config\auth-config.js"
    "src\config\rbac.js" = "api\auth-service\src\config\rbac.js"
    "src\config\session.js" = "api\auth-service\src\config\session.js"
    
    # Kenya Service
    "src\utils\taxCalculator.js" = "api\kenya-service\src\utils\taxCalculator.js"
    
    # Analytics Service
    "src\services\analyticsService.js" = "api\analytics-service\src\services\AnalyticsService.js"
    "src\services\MonitoringService.js" = "api\analytics-service\src\services\MonitoringService.js"
    "src\config\metrics.js" = "api\analytics-service\src\config\metrics.js"
    "src\config\datadog.js" = "api\analytics-service\src\config\datadog.js"
    
    # Notification Service
    "src\services\ReceiptService.js" = "api\notification-service\src\services\ReceiptService.js"
    "src\utils\notifications.js" = "api\notification-service\src\utils\notifications.js"
    "src\routes\receiptRoutes.js" = "api\notification-service\src\routes\receiptRoutes.js"
    
    # Fraud Detection
    "src\security\enhancedFraudDetection.js" = "api\fraud-detection\src\detection\EnhancedFraudDetection.js"
    "src\security\riskScoringEngine.js" = "api\fraud-detection\src\scoring\RiskScoringEngine.js"
    
    # AI Service
    "src\ai\core\InferenceEngine.js" = "api\ai-service\src\core\InferenceEngine.js"
    "src\ai\core\ModelManager.js" = "api\ai-service\src\core\ModelManager.js"
    "src\ai\deepseek-companion\CompanionModelManager.js" = "api\ai-service\src\deepseek\CompanionModelManager.js"
    "src\services\deepseekCoderService.js" = "api\ai-service\src\services\DeepSeekCoderService.js"
    "src\services\localDeepSeekService.js" = "api\ai-service\src\services\LocalDeepSeekService.js"
    "src\services\learningManager.js" = "api\ai-service\src\services\LearningManager.js"
    "src\routes\aiRoutes.js" = "api\ai-service\src\routes\aiRoutes.js"
    "src\routes\deepseekCoder.js" = "api\ai-service\src\routes\deepseekCoder.js"
    
    # Compliance Service
    "src\security\pci-compliance.js" = "api\compliance-service\src\pci\PCICompliance.js"
    "src\security\gdpr-compliance.js" = "api\compliance-service\src\gdpr\GDPRCompliance.js"
    "src\security\complianceReporter.js" = "api\compliance-service\src\reporting\ComplianceReporter.js"
    "src\security\auditLogs.js" = "api\compliance-service\src\audit\AuditLogs.js"
    "src\security\PCIDSSValidator.js" = "api\compliance-service\src\validators\PCIDSSValidator.js"
    "src\security\ComplianceMonitor.js" = "api\compliance-service\src\monitoring\ComplianceMonitor.js"
}

# Perform migrations
Write-Host "Migrating files..."
$successCount = 0
$errorCount = 0

foreach ($source in $migrations.Keys) {
    $destination = $migrations[$source]
    
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
Write-Host "Migration Summary:"
Write-Host "Successfully migrated: $successCount files"
Write-Host "Errors: $errorCount files"
Write-Host "Total directories created: $($apiDirs.Count + $packageDirs.Count)"
Write-Host ""
Write-Host "Migration completed!"
