# Create package.json files for all API services and shared packages
Write-Host "Creating package.json files for API services and packages..."

# API Services package.json files
$apiServices = @{
    "api\gateway" = @{
        name = "@sunny/api-gateway"
        description = "Sunny Payment Gateway - API Gateway Service"
        main = "src/main.ts"
        dependencies = @{
            "express" = "^4.18.2"
            "cors" = "^2.8.5"
            "helmet" = "^7.0.0"
            "express-rate-limit" = "^6.7.0"
            "@sunny/api-types" = "workspace:*"
            "@sunny/api-utils" = "workspace:*"
            "@sunny/security" = "workspace:*"
        }
    }
    "api\core-engine" = @{
        name = "@sunny/core-engine"
        description = "Sunny Payment Gateway - Core Payment Processing Engine"
        main = "src/main.ts"
        dependencies = @{
            "uuid" = "^9.0.0"
            "crypto" = "^1.0.1"
            "@sunny/api-types" = "workspace:*"
            "@sunny/api-utils" = "workspace:*"
            "@sunny/database" = "workspace:*"
            "@sunny/security" = "workspace:*"
            "@sunny/payment-processors" = "workspace:*"
        }
    }
    "api\auth-service" = @{
        name = "@sunny/auth-service"
        description = "Sunny Payment Gateway - Authentication Service"
        main = "src/main.ts"
        dependencies = @{
            "jsonwebtoken" = "^9.0.0"
            "bcrypt" = "^5.1.0"
            "express" = "^4.18.2"
            "@sunny/api-types" = "workspace:*"
            "@sunny/database" = "workspace:*"
            "@sunny/security" = "workspace:*"
        }
    }
    "api\kenya-service" = @{
        name = "@sunny/kenya-service"
        description = "Sunny Payment Gateway - Kenya-specific Services"
        main = "src/main.ts"
        dependencies = @{
            "axios" = "^1.4.0"
            "@sunny/api-types" = "workspace:*"
            "@sunny/api-utils" = "workspace:*"
            "@sunny/database" = "workspace:*"
        }
    }
    "api\analytics-service" = @{
        name = "@sunny/analytics-service"
        description = "Sunny Payment Gateway - Analytics Service"
        main = "src/main.ts"
        dependencies = @{
            "prometheus-api-metrics" = "^3.2.2"
            "datadog-metrics" = "^0.9.3"
            "@sunny/api-types" = "workspace:*"
            "@sunny/database" = "workspace:*"
        }
    }
    "api\notification-service" = @{
        name = "@sunny/notification-service"
        description = "Sunny Payment Gateway - Notification Service"
        main = "src/main.ts"
        dependencies = @{
            "nodemailer" = "^6.9.3"
            "pdfkit" = "^0.13.0"
            "@sunny/api-types" = "workspace:*"
            "@sunny/api-utils" = "workspace:*"
        }
    }
    "api\fraud-detection" = @{
        name = "@sunny/fraud-detection"
        description = "Sunny Payment Gateway - Fraud Detection Service"
        main = "src/main.ts"
        dependencies = @{
            "ml-matrix" = "^6.10.4"
            "@sunny/api-types" = "workspace:*"
            "@sunny/database" = "workspace:*"
            "@sunny/security" = "workspace:*"
        }
    }
    "api\ai-service" = @{
        name = "@sunny/ai-service"
        description = "Sunny Payment Gateway - AI Service"
        main = "src/main.ts"
        dependencies = @{
            "openai" = "^4.0.0"
            "tensorflow" = "^4.8.0"
            "@sunny/api-types" = "workspace:*"
            "@sunny/database" = "workspace:*"
        }
    }
    "api\compliance-service" = @{
        name = "@sunny/compliance-service"
        description = "Sunny Payment Gateway - Compliance Service"
        main = "src/main.ts"
        dependencies = @{
            "@sunny/api-types" = "workspace:*"
            "@sunny/database" = "workspace:*"
            "@sunny/security" = "workspace:*"
        }
    }
}

# Shared packages package.json files
$sharedPackages = @{
    "packages\api-types" = @{
        name = "@sunny/api-types"
        description = "Sunny Payment Gateway - Shared TypeScript Types"
        main = "src/index.ts"
        dependencies = @{}
    }
    "packages\api-utils" = @{
        name = "@sunny/api-utils"
        description = "Sunny Payment Gateway - Shared API Utilities"
        main = "src/index.js"
        dependencies = @{
            "crypto" = "^1.0.1"
            "validator" = "^13.9.0"
        }
    }
    "packages\database" = @{
        name = "@sunny/database"
        description = "Sunny Payment Gateway - Database Layer"
        main = "src/index.js"
        dependencies = @{
            "mongodb" = "^5.6.0"
            "mongoose" = "^7.3.0"
            "redis" = "^4.6.7"
        }
    }
    "packages\security" = @{
        name = "@sunny/security"
        description = "Sunny Payment Gateway - Security Utilities"
        main = "src/index.js"
        dependencies = @{
            "crypto" = "^1.0.1"
            "bcrypt" = "^5.1.0"
            "jsonwebtoken" = "^9.0.0"
        }
    }
    "packages\payment-processors" = @{
        name = "@sunny/payment-processors"
        description = "Sunny Payment Gateway - Payment Processors"
        main = "src/index.js"
        dependencies = @{
            "axios" = "^1.4.0"
            "@sunny/api-types" = "workspace:*"
            "@sunny/security" = "workspace:*"
        }
    }
    "packages\utils" = @{
        name = "@sunny/utils"
        description = "Sunny Payment Gateway - Shared Utilities"
        main = "src/index.js"
        dependencies = @{
            "winston" = "^3.9.0"
            "lodash" = "^4.17.21"
        }
    }
}

# Function to create package.json
function Create-PackageJson($path, $config) {
    $packageJson = @{
        name = $config.name
        version = "1.0.0"
        description = $config.description
        main = $config.main
        scripts = @{
            "build" = "tsc"
            "start" = "node dist/main.js"
            "dev" = "ts-node-dev --respawn --transpile-only src/main.ts"
            "test" = "jest"
        }
        keywords = @("sunny", "payment", "gateway", "fintech")
        author = "Sunny Payments Team"
        license = "MIT"
        dependencies = $config.dependencies
        devDependencies = @{
            "typescript" = "^5.1.3"
            "ts-node-dev" = "^2.0.0"
            "@types/node" = "^20.3.1"
            "jest" = "^29.5.0"
            "@types/jest" = "^29.5.2"
        }
    }
    
    $jsonString = $packageJson | ConvertTo-Json -Depth 10
    $fullPath = Join-Path $path "package.json"
    $jsonString | Out-File -FilePath $fullPath -Encoding UTF8
    Write-Host "Created: $fullPath"
}

# Create package.json for API services
Write-Host "Creating API service package.json files..."
foreach ($service in $apiServices.Keys) {
    Create-PackageJson $service $apiServices[$service]
}

# Create package.json for shared packages
Write-Host "Creating shared package package.json files..."
foreach ($package in $sharedPackages.Keys) {
    Create-PackageJson $package $sharedPackages[$package]
}

Write-Host ""
Write-Host "Package.json files creation completed!"
Write-Host "Total files created: $($apiServices.Count + $sharedPackages.Count)"
