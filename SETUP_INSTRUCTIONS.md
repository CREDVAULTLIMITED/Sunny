# Sunny Authentication System - Setup Instructions

## Current Status

✅ **Completed:**
- Global authentication system design and architecture
- Shared package structure (`@sunny/shared-types`, `@sunny/auth`, `@sunny/ui`)
- Marketing site with working sign-in and sign-up pages (standalone implementation)
- Complete documentation and type definitions

⚠️ **Pending:**
- Building and installing shared packages across the monorepo
- Replacing standalone implementations with shared components

## Quick Start (Current Working Solution)

The marketing site now has working authentication pages at:
- `/sign-in` - Sign in page with account type selection
- `/sign-up` - Sign up page with account type-specific forms

These pages are currently implemented as standalone components and demonstrate the final design and functionality.

## Next Steps to Complete Implementation

### 1. Build Shared Packages

First, build all the shared packages in the correct order:

```bash
# Navigate to project root
cd Sunny

# Build packages in dependency order
cd packages/shared-types && npm run build
cd ../ui && npm run build  
cd ../auth && npm run build

# Install dependencies for marketing app
cd ../../apps/marketing && npm install
```

### 2. Replace Standalone Implementations

Once packages are built, replace the current standalone auth pages:

```typescript
// Replace current imports in apps/marketing/src/app/sign-in/page.tsx
import { AuthLayout, SignInForm, SocialAuthButtons } from '@sunny/ui';
import { useAuthRouter, useAuth } from '@sunny/auth';
import { UserAccountType } from '@sunny/shared-types';
```

### 3. Implement Across All Apps

Apply the same pattern to other Sunny applications:

```bash
# For each app, add dependencies:
{
  "dependencies": {
    "@sunny/shared-types": "workspace:*",
    "@sunny/auth": "workspace:*", 
    "@sunny/ui": "workspace:*"
  }
}
```

## Package Dependencies

### Required Dependencies by Package

**`@sunny/shared-types`:**
- `zod` - Schema validation

**`@sunny/ui`:**
- `@sunny/shared-types`
- `react-hook-form` + `@hookform/resolvers` - Form handling
- `framer-motion` - Animations
- `@heroicons/react` - Icons
- `tailwindcss` - Styling

**`@sunny/auth`:**
- `@sunny/shared-types`
- `@sunny/api-client`
- `jose` - JWT handling
- Peer: `next` - Next.js router

## Troubleshooting

### Module Resolution Issues

If you get "Module not found" errors:

1. **Check package builds:**
   ```bash
   cd packages/[package-name]
   npm run build
   ```

2. **Verify package.json exports:**
   Each package should have proper `exports` configuration

3. **Clear cache:**
   ```bash
   rm -rf node_modules/.cache
   npm run dev
   ```

### Import Path Issues

Use the correct import paths:
```typescript
// ✅ Correct
import { AuthLayout } from '@sunny/ui';
import { useAuth } from '@sunny/auth';
import { UserAccountType } from '@sunny/shared-types';

// ❌ Incorrect  
import { AuthLayout } from '@sunny/ui/auth/AuthLayout';
```

## Features Implemented

### 🎨 UI Components
- **AuthLayout** - Responsive authentication page layout
- **SignInForm** - Complete sign-in with MFA support
- **SignUpForm** - Multi-step registration process
- **SocialAuthButtons** - Account type-aware social login

### 🔐 Authentication Logic
- **AuthRouter** - Smart routing based on account type
- **useAuth** - Complete authentication state management
- Session persistence and token refresh
- Cross-domain redirect handling

### 📱 Account Types Supported
- **Individual** → `app.sunnypayments.com`
- **Business** → `business.sunnypayments.com` 
- **Institution** → `institutions.sunnypayments.com`
- **Developer** → `developers.sunnypayments.com`
- **Admin** → `admin.sunnypayments.com`

### 🌐 Social Authentication
- Google, Apple, Microsoft (all users)
- LinkedIn (business users)
- GitHub (developers)

### 🛡️ Security Features
- Multi-factor authentication (SMS, Email, TOTP)
- Password strength validation
- CSRF protection
- Secure session management
- Input validation with Zod schemas

## API Integration

The authentication system is designed to work with these API endpoints:

```typescript
POST /api/auth/signin
POST /api/auth/signup  
POST /api/auth/signout
POST /api/auth/refresh
POST /api/auth/social
POST /api/auth/reset-password
POST /api/auth/mfa/setup
POST /api/auth/mfa/verify
GET  /api/auth/me
```

## URL Structure

Authentication URLs support these parameters:

```
/sign-in?type=business&redirect=https://business.sunnypayments.com/dashboard
/sign-up?type=institution&redirect=https://institutions.sunnypayments.com/onboarding
```

## Testing

Test the current implementation:

1. **Visit sign-in page:** `http://localhost:3000/sign-in`
2. **Try different account types:** Add `?type=business` to URL
3. **Test sign-up flow:** `http://localhost:3000/sign-up`
4. **Verify routing:** Check that account type selection works

## Production Deployment

For production, ensure:

1. **Environment variables** are properly configured
2. **API endpoints** are implemented on the backend
3. **Domain routing** is set up for subdomains
4. **SSL certificates** are configured for all domains
5. **CORS settings** allow cross-domain authentication

## Support

The authentication system includes comprehensive documentation:
- `GLOBAL_AUTHENTICATION_SYSTEM.md` - Complete technical documentation
- `WEBSITE_STRUCTURE_DOCUMENTATION.md` - Full platform structure
- Type definitions with inline documentation
- Component prop interfaces with descriptions

For questions or issues, refer to the detailed documentation or the implementation examples in the marketing app.
