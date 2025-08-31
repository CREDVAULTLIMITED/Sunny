# Environment Configuration Guide
Version 1.0

## Overview
This guide provides detailed instructions for configuring the Sunny Payment Gateway environments, including development, staging, and production setups.

## Environment Files Structure

### Base Configuration (.env.example)
```env
# Application Settings
NODE_ENV=development
APP_NAME=SunnyPaymentGateway
APP_VERSION=1.0.0
PORT=3000
API_VERSION=v1

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sunny_payments
DB_USER=db_user
DB_PASSWORD=strong_password
DB_SSL=true

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRATION=7d

# Payment Provider API Keys
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
PAYPAL_CLIENT_ID=live_client_id
PAYPAL_CLIENT_SECRET=live_client_secret

# Cryptocurrency Settings
CRYPTO_NETWORK=mainnet
CRYPTO_API_KEY=your_crypto_api_key

# Security Settings
ENCRYPTION_KEY=your_encryption_key
ENCRYPTION_IV=your_encryption_iv
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring and Logging
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn
NEW_RELIC_LICENSE_KEY=your_newrelic_key

# SSL/TLS Configuration
SSL_PRIVATE_KEY_PATH=/path/to/private.key
SSL_CERTIFICATE_PATH=/path/to/certificate.crt

# Backup Configuration
BACKUP_ENABLED=true
BACKUP_FREQUENCY=daily
BACKUP_RETENTION_DAYS=30
```

## Environment-Specific Configurations

### Development (.env.development)
```env
NODE_ENV=development
LOG_LEVEL=debug
DB_SSL=false
STRIPE_SECRET_KEY=sk_test_xxx
PAYPAL_CLIENT_ID=test_client_id
CRYPTO_NETWORK=testnet
```

### Staging (.env.staging)
```env
NODE_ENV=staging
LOG_LEVEL=info
DB_SSL=true
STRIPE_SECRET_KEY=sk_test_xxx
PAYPAL_CLIENT_ID=test_client_id
CRYPTO_NETWORK=testnet
```

### Production (.env.production)
```env
NODE_ENV=production
LOG_LEVEL=warn
DB_SSL=true
STRIPE_SECRET_KEY=sk_live_xxx
PAYPAL_CLIENT_ID=live_client_id
CRYPTO_NETWORK=mainnet
```

## Database Configuration

### Dual Database Setup

The system uses both PostgreSQL and MongoDB for different purposes. Here's how to configure them for each environment:

### Development Environment
```env
# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sunny_payments_dev
DB_USER=postgres
DB_PASSWORD=your_dev_password
DB_SSL=false
DB_CONNECTION_POOL_MAX=10

# MongoDB
MONGO_URI=mongodb://localhost:27017/sunny_payments_dev
```

### Staging Environment
```env
# PostgreSQL
DB_HOST=staging-db.sunny.internal
DB_PORT=5432
DB_NAME=sunny_payments_staging
DB_USER=sunny_staging
DB_PASSWORD=strong_staging_password
DB_SSL=true
DB_CONNECTION_POOL_MAX=20

# MongoDB
MONGO_URI=mongodb://sunny_staging:password@staging-mongo.sunny.internal:27017/sunny_payments_staging
```

### Production Environment
```env
# PostgreSQL
DB_HOST=prod-db.sunny.internal
DB_PORT=5432
DB_NAME=sunny_payments_prod
DB_USER=sunny_prod
DB_PASSWORD=very_strong_prod_password
DB_SSL=true
DB_CONNECTION_POOL_MAX=100

# MongoDB
MONGO_URI=mongodb://sunny_prod:password@prod-mongo-0.sunny.internal:27017,prod-mongo-1.sunny.internal:27017/sunny_payments_prod?replicaSet=rs0
```

### Configuration Guidelines

1. **PostgreSQL Settings**
   - Enable SSL in staging and production
   - Use connection pooling appropriate for the environment
   - Set up read replicas in production
   - Configure proper backup schedules

2. **MongoDB Settings**
   - Use replica sets in production
   - Enable authentication in all non-dev environments
   - Configure proper oplog size
   - Set up monitoring and alerts

3. **Security Considerations**
   - Use different credentials for each environment
   - Store credentials in a secure vault
   - Rotate passwords regularly
   - Monitor and audit database access

## Configuration Guidelines

### 1. Security Requirements
- Use strong, unique keys for all environments
- Minimum 32-character length for encryption keys
- Enable SSL in staging and production
- Use secure password generation for database credentials
- Store sensitive values in a secure vault

### 2. Database Configuration
- Use different databases for each environment
- Enable SSL for staging and production
- Set up read replicas for production
- Configure connection pooling

### 3. API Keys Management
- Use test API keys for development and staging
- Rotate production keys regularly
- Store keys in a secure key management service
- Never commit API keys to version control

### 4. Logging and Monitoring
- Configure appropriate log levels per environment
- Set up log rotation and retention policies
- Enable detailed logging in development
- Use structured logging in production

## Implementation Steps

1. **Initial Setup**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Generate secure keys
   node scripts/generate-keys.js
   
   # Validate configuration
   npm run validate-env
   ```

2. **Environment Validation**
   ```bash
   # Test database connection
   npm run test:db
   
   # Verify API keys
   npm run verify:keys
   
   # Check encryption settings
   npm run test:encryption
   ```

3. **Production Deployment**
   ```bash
   # Switch to production mode
   export NODE_ENV=production
   
   # Load production configs
   source .env.production
   
   # Verify production settings
   npm run verify:production
   ```

## Security Considerations

### Sensitive Data
- JWT secrets
- Encryption keys
- API credentials
- Database passwords
- SSL certificates

### Best Practices
1. Use environment-specific secrets
2. Rotate credentials regularly
3. Implement secret versioning
4. Monitor configuration changes
5. Maintain an audit trail

## Troubleshooting

### Common Issues
1. Database connection errors
   - Verify credentials
   - Check SSL settings
   - Confirm network access

2. API authentication failures
   - Validate API keys
   - Check environment mode
   - Verify endpoint URLs

3. Encryption errors
   - Confirm key lengths
   - Verify IV configuration
   - Check algorithm settings

## Monitoring Configuration

### Health Checks
```javascript
{
  "database": "/health/db",
  "redis": "/health/cache",
  "api": "/health/api",
  "payment": "/health/payment"
}
```

### Metrics
```javascript
{
  "response_time": "ms",
  "error_rate": "percentage",
  "transaction_volume": "count"
}
```

## Maintenance Procedures

### Regular Tasks
1. Rotate API keys monthly
2. Update SSL certificates
3. Review log levels
4. Audit environment variables
5. Backup configurations

### Emergency Procedures
1. Key compromise response
2. Configuration rollback
3. Emergency access protocol
4. Disaster recovery steps

## Notes
- Keep this guide updated
- Document all configuration changes
- Regular security reviews
- Maintain change history