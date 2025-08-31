# Sunny User Dashboard

Personal dashboard for individual users managing their payments, transactions, and account settings.

## Domain
- **Production**: `app.sunnypayments.com`
- **Development**: `localhost:3001`

## Features
- 💳 **Payment Management**: Send, receive, and manage payments
- 📊 **Transaction History**: Comprehensive transaction tracking
- 🇰🇪 **Kenya Tax Tools**: Personal tax calculations and receipts
- 📱 **M-Pesa Integration**: Seamless mobile money transactions
- 🔒 **Security Settings**: Two-factor authentication, device management
- 💰 **Multi-Currency**: KES, USD, EUR support with real-time conversion

## Key Sections
- `/dashboard` - Overview and quick actions
- `/transactions` - Transaction history and details
- `/payments` - Send and receive payments
- `/settings` - Account and security settings
- `/tax-receipts` - Kenya tax receipts and compliance
- `/support` - Help and customer support

## Development

```bash
# Start development server
pnpm dev:user

# Build for production
pnpm build --filter=@sunny/user-dashboard

# Run tests
pnpm test --filter=@sunny/user-dashboard
```

## Kenya-Specific Features
- KRA PIN validation
- M-Pesa transaction management
- Kenya tax receipt generation
- KES currency prioritization
- Local payment method preferences
