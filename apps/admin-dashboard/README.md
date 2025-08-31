# Sunny Admin Dashboard

Comprehensive administrative dashboard for platform management, monitoring, and operations.

## Domain
- **Production**: `admin.sunnypayments.com`
- **Development**: `localhost:3004`

## Features
- 🔧 **Platform Management**: System configuration and feature flags
- 👥 **User Management**: User accounts, permissions, and access control
- 📊 **System Monitoring**: Real-time performance and health metrics
- 🇰🇪 **Kenya Operations**: Local compliance monitoring and reporting
- 🛡️ **Security Center**: Fraud detection, security events, audit logs
- 💰 **Financial Operations**: Settlement management, fee configuration

## Key Sections
- `/dashboard` - Platform overview and key metrics
- `/users` - User management and administration
- `/institutions` - Financial institution management
- `/transactions` - Global transaction monitoring
- `/compliance` - Regulatory compliance and reporting
- `/security` - Security monitoring and incident response
- `/system` - System configuration and maintenance
- `/kenya-ops` - Kenya-specific operations and compliance

## Development

```bash
# Start development server
pnpm dev:admin

# Build for production
pnpm build --filter=@sunny/admin-dashboard

# Run tests
pnpm test --filter=@sunny/admin-dashboard
```

## Admin Capabilities
- **Multi-tenant Management**: Manage multiple institutions and businesses
- **Global Compliance**: Monitor compliance across all jurisdictions
- **Kenya HQ Operations**: Special focus on Kenya market and regulations
- **Real-time Monitoring**: Live system health and transaction monitoring
- **Incident Response**: Security incident management and response
- **Feature Management**: Platform feature flags and rollout control
- **Financial Reconciliation**: Global settlement and reconciliation tools
