# Sunny Institutions Portal

Enterprise portal for banks, SACCOs, MFIs, and other financial institutions to manage white-label payment solutions and compliance.

## Domain
- **Production**: `institutions.sunnypayments.com`
- **Development**: `localhost:3003`

## Features
- 🏦 **Institution Management**: Multi-institution support and administration
- 🎨 **White-label Solutions**: Branded payment interfaces and mobile apps
- 📋 **Regulatory Compliance**: CBK compliance, KBA integration, AML/CFT tools
- 🇰🇪 **Kenya Financial Services**: RTGS, EFT, mobile banking integration
- 📊 **Risk Management**: Advanced fraud detection and risk scoring
- 💼 **Corporate Banking**: Bulk payments, payroll, supplier payments

## Key Sections
- `/dashboard` - Institution overview and metrics
- `/white-label` - Branding and customization tools
- `/compliance` - CBK reporting and regulatory tools
- `/customers` - End-customer management and KYC
- `/transactions` - Institutional transaction monitoring
- `/risk-management` - Fraud detection and risk assessment
- `/reporting` - Regulatory and business reporting
- `/integrations` - Core banking system integrations

## Development

```bash
# Start development server
pnpm dev:institutions

# Build for production
pnpm build --filter=@sunny/institutions-portal

# Run tests
pnpm test --filter=@sunny/institutions-portal
```

## Kenya Financial Institution Features
- **CBK Compliance**: Central Bank of Kenya regulatory reporting
- **RTGS Integration**: Real-time gross settlement system connectivity
- **Mobile Banking**: M-Pesa, Airtel Money institutional accounts
- **SACCO Integration**: Savings and credit cooperative tools
- **Microfinance**: MFI-specific features and compliance
- **KBA Integration**: Kenya Bankers Association standards
- **Deposit Protection**: KDIC (Kenya Deposit Insurance Corporation) integration
