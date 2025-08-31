# Sunny Payment Gateway - Client Codebase Structure

## Overview
This document outlines the recommended client codebase structure for the Sunny Payment Gateway platform, optimized for deployment across multiple domains while maintaining code reusability and consistency.

## Domain Architecture

### **Production Domains**
```
sunnypayments.com/               # Marketing website + integrated services
├── app.sunnypayments.com/       # User dashboard
├── business.sunnypayments.com/  # Business dashboard  
├── institutions.sunnypayments.com/ # Institution portal
├── admin.sunnypayments.com/     # Admin dashboard
└── developers.sunnypayments.com/ # Developer portal
```

### **Integrated Services (No Separate Domains)**
- Help Center → `sunnypayments.com/help`
- Status Page → `sunnypayments.com/status`  
- Blog → `sunnypayments.com/blog`
- Documentation → `sunnypayments.com/docs`
- Support → `sunnypayments.com/support`

## Recommended Codebase Structure

```
sunny-platform/
├── apps/                           # Application-specific code
│   ├── marketing/                  # Main marketing website
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (marketing)/    # Marketing pages
│   │   │   │   ├── help/           # Help center
│   │   │   │   ├── status/         # Status page
│   │   │   │   ├── blog/           # Blog
│   │   │   │   ├── docs/           # Documentation
│   │   │   │   └── support/        # Support
│   │   │   ├── components/
│   │   │   │   ├── marketing/      # Marketing components
│   │   │   │   ├── help/           # Help components
│   │   │   │   ├── status/         # Status components
│   │   │   │   └── blog/           # Blog components
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── user-dashboard/             # User dashboard app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/      # Main dashboard
│   │   │   │   ├── transactions/   # Transaction management
│   │   │   │   ├── payments/       # Payment methods
│   │   │   │   └── settings/       # User settings
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── business-dashboard/         # Business dashboard app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/      # Business dashboard
│   │   │   │   ├── analytics/      # Business analytics
│   │   │   │   ├── customers/      # Customer management
│   │   │   │   └── integrations/   # API integrations
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── institutions-portal/        # Institution portal app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/      # Institution dashboard
│   │   │   │   ├── compliance/     # Compliance tools
│   │   │   │   ├── white-label/    # White-label solutions
│   │   │   │   └── reporting/      # Regulatory reporting
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   ├── admin-dashboard/            # Admin dashboard app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/      # Admin overview
│   │   │   │   ├── users/          # User management
│   │   │   │   ├── system/         # System configuration
│   │   │   │   └── monitoring/     # System monitoring
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   └── developer-portal/           # Developer portal app
│       ├── src/
│       │   ├── app/
│       │   │   ├── docs/           # API documentation
│       │   │   ├── tools/          # Developer tools
│       │   │   ├── examples/       # Code examples
│       │   │   └── community/      # Developer community
│       │   ├── components/
│       │   └── lib/
│       ├── package.json
│       └── next.config.js
│
├── packages/                       # Shared packages
│   ├── ui/                        # Shared UI components
│   │   ├── src/
│   │   │   ├── components/        # Reusable components
│   │   │   │   ├── forms/         # Form components
│   │   │   │   ├── layout/        # Layout components
│   │   │   │   ├── navigation/    # Navigation components
│   │   │   │   ├── charts/        # Chart components
│   │   │   │   └── feedback/      # Feedback components
│   │   │   ├── styles/            # Global styles
│   │   │   └── utils/             # UI utilities
│   │   ├── package.json
│   │   └── tailwind.config.js
│   │
│   ├── kenya-tax/                 # Kenya tax compliance
│   │   ├── src/
│   │   │   ├── components/        # Kenya tax components
│   │   │   ├── types/             # Kenya tax types
│   │   │   ├── utils/             # Kenya tax utilities
│   │   │   └── constants/         # Kenya tax constants
│   │   └── package.json
│   │
│   ├── shared-types/              # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── api/               # API types
│   │   │   ├── user/              # User types
│   │   │   ├── payment/           # Payment types
│   │   │   └── common/            # Common types
│   │   └── package.json
│   │
│   ├── api-client/                # Shared API client
│   │   ├── src/
│   │   │   ├── clients/           # API clients
│   │   │   ├── hooks/             # React hooks
│   │   │   ├── utils/             # API utilities
│   │   │   └── types/             # API types
│   │   └── package.json
│   │
│   ├── auth/                      # Shared authentication
│   │   ├── src/
│   │   │   ├── providers/         # Auth providers
│   │   │   ├── hooks/             # Auth hooks
│   │   │   ├── utils/             # Auth utilities
│   │   │   └── types/             # Auth types
│   │   └── package.json
│   │
│   └── utils/                     # Shared utilities
│       ├── src/
│       │   ├── date/              # Date utilities
│       │   ├── currency/          # Currency utilities
│       │   ├── validation/        # Validation utilities
│       │   └── formatting/        # Formatting utilities
│       └── package.json
│
├── tools/                         # Build and development tools
│   ├── eslint-config/             # Shared ESLint config
│   ├── tsconfig/                  # Shared TypeScript config
│   └── build-scripts/             # Build scripts
│
├── deployment/                    # Deployment configurations
│   ├── docker/                    # Docker configurations
│   │   ├── marketing.Dockerfile
│   │   ├── user-dashboard.Dockerfile
│   │   ├── business-dashboard.Dockerfile
│   │   ├── institutions-portal.Dockerfile
│   │   ├── admin-dashboard.Dockerfile
│   │   └── developer-portal.Dockerfile
│   │
│   ├── kubernetes/                # Kubernetes manifests
│   │   ├── marketing/
│   │   ├── user-dashboard/
│   │   ├── business-dashboard/
│   │   ├── institutions-portal/
│   │   ├── admin-dashboard/
│   │   └── developer-portal/
│   │
│   └── terraform/                 # Infrastructure as code
│       ├── domains/
│       ├── cdn/
│       └── certificates/
│
├── package.json                   # Root package.json (workspace)
├── turbo.json                     # Turborepo configuration
├── pnpm-workspace.yaml           # PNPM workspace configuration
└── README.md                      # Root documentation
```

## Technology Stack

### **Monorepo Management**
- **Turborepo**: Build system and task runner
- **PNPM Workspaces**: Package management
- **Changesets**: Version management and publishing

### **Frontend Framework**
- **Next.js 15**: All applications
- **React 19**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling system

### **Shared Libraries**
- **@sunny/ui**: Shared UI components
- **@sunny/kenya-tax**: Kenya tax compliance
- **@sunny/shared-types**: TypeScript types
- **@sunny/api-client**: API integration
- **@sunny/auth**: Authentication
- **@sunny/utils**: Utilities

## Deployment Strategy

### **Domain Mapping**
```yaml
# Deployment configuration
domains:
  marketing:
    domain: sunnypayments.com
    app: apps/marketing
    routes:
      - /
      - /help/*
      - /status/*
      - /blog/*
      - /docs/*
      - /support/*
  
  user-dashboard:
    domain: app.sunnypayments.com
    app: apps/user-dashboard
  
  business-dashboard:
    domain: business.sunnypayments.com
    app: apps/business-dashboard
  
  institutions-portal:
    domain: institutions.sunnypayments.com
    app: apps/institutions-portal
  
  admin-dashboard:
    domain: admin.sunnypayments.com
    app: apps/admin-dashboard
  
  developer-portal:
    domain: developers.sunnypayments.com
    app: apps/developer-portal
```

### **Build & Deployment**
```json
{
  "scripts": {
    "build": "turbo run build",
    "build:marketing": "turbo run build --filter=marketing",
    "build:dashboards": "turbo run build --filter=*dashboard*",
    "deploy:all": "turbo run deploy",
    "deploy:marketing": "turbo run deploy --filter=marketing",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  }
}
```

## Benefits of This Structure

### **Code Reusability**
- Shared UI components across all applications
- Common business logic in packages
- Consistent styling and theming
- Shared TypeScript types

### **Development Efficiency**
- Single repository for all client code
- Shared development tools and configurations
- Consistent build and deployment processes
- Easy cross-application refactoring

### **Deployment Flexibility**
- Independent deployment of each application
- Shared package updates propagate automatically
- Easy scaling of individual applications
- Domain-specific optimizations

### **Maintenance Benefits**
- Centralized dependency management
- Consistent code quality standards
- Shared documentation and tooling
- Simplified CI/CD pipelines

## Migration Path

### **Phase 1: Setup Monorepo**
1. Initialize Turborepo structure
2. Set up shared packages
3. Configure build tools

### **Phase 2: Marketing Website**
1. Migrate current sunny-nextjs
2. Integrate help, status, blog services
3. Implement Kenya tax compliance

### **Phase 3: Dashboard Applications**
1. Create user dashboard
2. Create business dashboard
3. Create institution portal

### **Phase 4: Admin & Developer Portals**
1. Migrate admin dashboard
2. Create developer portal
3. Implement API documentation

### **Phase 5: Optimization**
1. Performance optimization
2. SEO improvements
3. Analytics integration

## Kenya-Specific Considerations

### **Localization Package**
```
packages/kenya-localization/
├── src/
│   ├── currency/          # KES formatting
│   ├── dates/             # Kenya date formats
│   ├── tax/               # KRA tax rules
│   └── translations/      # Swahili translations
```

### **KRA Integration Package**
```
packages/kra-integration/
├── src/
│   ├── api/               # KRA API clients
│   ├── types/             # KRA data types
│   ├── validation/        # PIN validation
│   └── reporting/         # Tax reporting
```

This structure provides a scalable foundation for the Sunny platform while maintaining the Kenya-first approach and enabling efficient development and deployment across multiple domains.
