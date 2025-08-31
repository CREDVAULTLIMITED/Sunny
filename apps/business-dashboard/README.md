# Sunny Business Dashboard

Comprehensive business dashboard for merchants, SMEs, and enterprises managing payment processing and business operations.

## Domain
- **Production**: `business.sunnypayments.com`
- **Development**: `localhost:3002`

## Features
- 💼 **Business Analytics**: Revenue, transactions, customer insights
- 🇰🇪 **KRA Integration**: Direct eTIMS connection, automated tax reporting
- 📊 **Real-time Reporting**: Live transaction monitoring and analytics
- 👥 **Customer Management**: Customer profiles, payment history
- 🔗 **API Integration**: Payment gateway integration and management
- 💳 **Multi-Payment Methods**: Cards, M-Pesa, bank transfers, crypto

## Key Sections
- `/dashboard` - Business overview and KPIs
- `/transactions` - Transaction management and reconciliation
- `/customers` - Customer database and insights
- `/analytics` - Business intelligence and reporting
- `/integrations` - API keys and webhook management
- `/tax-compliance` - KRA reporting and tax management
- `/settings` - Business profile and configurations

## Development

```bash
# Start development server
pnpm dev:business

# Build for production
pnpm build --filter=@sunny/business-dashboard

# Run tests
pnpm test --filter=@sunny/business-dashboard
```

## Kenya Business Features
- **KRA eTIMS Integration**: Direct connection to Kenya Revenue Authority
- **M-Pesa Business**: Till numbers, paybill management
- **VAT Calculations**: Automated VAT computation and reporting
- **Digital Service Tax**: Automated DST calculations for digital services
- **Kenya Business Registration**: Integration with business registration systems
- **Local Payment Methods**: Airtel Money, T-Kash, PesaLink support
