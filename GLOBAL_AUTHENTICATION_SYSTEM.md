# Sunny Payment Gateway - Global Authentication System

## Overview

This document describes the unified authentication system designed for the Sunny Payment Gateway platform. The system provides centralized authentication that works across all subdomains and applications while intelligently routing users to their appropriate dashboards.

## Architecture

### **Centralized Authentication Design**

The authentication system is built around shared packages that can be used across all Sunny applications:

- **`@sunny/shared-types`** - Common TypeScript types and schemas
- **`@sunny/auth`** - Authentication providers, hooks, and routing logic
- **`@sunny/ui`** - Shared UI components including authentication forms

### **Multi-Domain Routing Strategy**

Users are automatically routed to the correct dashboard based on their account type:

| Account Type | Destination Domain |
|-------------|-------------------|
| Individual | `app.sunnypayments.com` |
| Business | `business.sunnypayments.com` |
| Institution | `institutions.sunnypayments.com` |
| Developer | `developers.sunnypayments.com` |
| Admin | `admin.sunnypayments.com` |

## Components

### **1. Type System (`@sunny/shared-types/auth`)**

Comprehensive TypeScript types covering:

- **User Account Types**: Individual, Business, Institution, Developer, Admin
- **Authentication Providers**: Email, Google, Apple, Microsoft, LinkedIn, GitHub
- **MFA Methods**: SMS, Email, TOTP, Biometric, Hardware Token
- **Request/Response Schemas**: Zod-validated forms for all auth operations

```typescript
// Example usage
import { UserAccountType, SignInSchema } from '@sunny/shared-types/auth';

const signInData = SignInSchema.parse({
  email: 'user@example.com',
  password: 'securePassword',
  accountType: UserAccountType.BUSINESS
});
```

### **2. Authentication Components (`@sunny/ui/auth`)**

Pre-built, customizable React components:

#### **AuthLayout**
- Responsive layout for authentication pages
- Consistent branding across all domains
- Back button and footer integration
- Multiple background variants

#### **SignInForm**
- Account type selection (if not pre-determined)
- Email/password authentication
- MFA support (SMS, Email, TOTP)
- Social authentication integration
- Password visibility toggle
- Remember me functionality

#### **SignUpForm**
- Multi-step registration process
- Account type-specific fields
- Password strength indicator
- Terms and privacy agreement
- Conditional form fields based on account type

#### **SocialAuthButtons**
- Account type-aware social providers
- LinkedIn for business users
- GitHub for developers
- Consistent OAuth flow handling

### **3. Authentication Logic (`@sunny/auth`)**

#### **AuthRouter**
- Intelligent routing based on account type
- URL parameter handling (`?type=business&redirect=...`)
- Cross-domain redirect validation
- Authentication state management

#### **useAuth Hook**
- Complete authentication state management
- Persistent session handling
- Token refresh logic
- MFA support
- Social authentication

```typescript
// Example usage
import { useAuth } from '@sunny/auth';

function MyComponent() {
  const { user, signIn, signOut, isLoading } = useAuth();
  
  if (isLoading) return <Spinner />;
  if (!user) return <SignInButton />;
  return <UserDashboard user={user} />;
}
```

## Integration Guide

### **1. Installing Dependencies**

```bash
# In your app's package.json
{
  "dependencies": {
    "@sunny/shared-types": "workspace:*",
    "@sunny/auth": "workspace:*",
    "@sunny/ui": "workspace:*"
  }
}
```

### **2. Basic Setup**

```typescript
// pages/sign-in.tsx
import { AuthLayout, SignInForm, SocialAuthButtons } from '@sunny/ui/auth';
import { useAuth, useAuthRouter } from '@sunny/auth';

export default function SignInPage() {
  const { signIn, socialAuth } = useAuth();
  const { handleAuthSuccess, getDetectedAccountType } = useAuthRouter();

  const handleSignIn = async (data) => {
    const response = await signIn(data);
    if (response.success) {
      handleAuthSuccess(response.user);
    }
    return response;
  };

  return (
    <AuthLayout title="Welcome Back">
      <SignInForm 
        onSubmit={handleSignIn}
        defaultAccountType={getDetectedAccountType()}
      />
      <SocialAuthButtons onSocialAuth={socialAuth} />
    </AuthLayout>
  );
}
```

### **3. Header Integration**

```typescript
// components/Header.tsx
import { buildAuthLink } from '@sunny/auth';
import { UserAccountType } from '@sunny/shared-types/auth';

function Header() {
  const signInUrl = buildAuthLink('signin');
  const businessSignUpUrl = buildAuthLink('signup', {
    accountType: UserAccountType.BUSINESS
  });

  return (
    <header>
      <Link href={signInUrl}>Sign In</Link>
      <Link href={businessSignUpUrl}>Get Started</Link>
    </header>
  );
}
```

### **4. Protected Routes**

```typescript
// Higher-order component for protection
import { withAuthProtection } from '@sunny/auth';
import { UserAccountType } from '@sunny/shared-types/auth';

const AdminDashboard = withAuthProtection(
  AdminDashboardComponent,
  UserAccountType.ADMIN
);

// Or manual protection
function BusinessDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      AuthRouter.redirectToSignIn(UserAccountType.BUSINESS);
    } else if (user.accountType !== UserAccountType.BUSINESS) {
      router.push(AuthRouter.getDestinationUrl(user.accountType));
    }
  }, [user, router]);

  if (!user) return <Loading />;
  return <DashboardContent />;
}
```

## Advanced Features

### **1. Cross-Domain Authentication**

The system supports seamless authentication across all Sunny domains:

```typescript
// From marketing site to business dashboard
const signUpUrl = AuthRouter.buildAuthUrl('signup', 
  UserAccountType.BUSINESS,
  'https://business.sunnypayments.com/onboarding'
);
```

### **2. Multi-Factor Authentication**

Built-in MFA support with multiple methods:

```typescript
const { setupMFA, verifyMFA } = useAuth();

// Setup MFA
await setupMFA({
  method: MFAType.SMS,
  phoneNumber: '+1234567890'
});

// Verify during sign-in
await verifyMFA('123456', MFAType.SMS);
```

### **3. Social Authentication**

Account type-aware social providers:

- **All Users**: Google, Apple, Microsoft
- **Business Users**: LinkedIn (additional)
- **Developers**: GitHub (additional)

### **4. Session Management**

- Automatic token refresh
- Cross-tab synchronization
- Secure storage
- Session expiry handling

## Security Features

### **1. Data Protection**

- End-to-end encryption for sensitive data
- Secure token storage
- CSRF protection
- Rate limiting

### **2. Validation**

- Zod schema validation for all forms
- Type-safe API requests
- Input sanitization
- Password strength requirements

### **3. Compliance**

- GDPR consent management
- Terms of service agreement
- Privacy policy acceptance
- Audit trail logging

## URL Patterns

### **Authentication URLs**

```
# Sign In
/sign-in
/sign-in?type=business
/sign-in?type=business&redirect=https://business.sunnypayments.com/dashboard

# Sign Up
/sign-up
/sign-up?type=institution
/sign-up?type=developer&redirect=https://developers.sunnypayments.com/api-keys
```

### **Redirect Flow**

1. User clicks "Sign In" on `business.sunnypayments.com`
2. Redirected to `/sign-in?type=business&redirect=https://business.sunnypayments.com/dashboard`
3. After successful authentication, user is redirected back to business dashboard
4. If user has wrong account type, they're redirected to their correct dashboard

## Error Handling

### **Common Error Scenarios**

1. **Invalid Credentials**: Show error message, allow retry
2. **Account Type Mismatch**: Redirect to correct dashboard
3. **MFA Required**: Show MFA form with available methods
4. **Session Expired**: Attempt refresh, fallback to sign-in
5. **Network Errors**: Show retry option with exponential backoff

### **Error Messages**

All error messages are user-friendly and actionable:

```typescript
// Example error responses
{
  success: false,
  error: {
    code: 'INVALID_CREDENTIALS',
    message: 'The email or password you entered is incorrect.',
    field: 'password'
  }
}
```

## Performance Optimizations

### **1. Code Splitting**

Components are lazy-loaded to reduce initial bundle size:

```typescript
const SignUpForm = lazy(() => import('@sunny/ui/auth/SignUpForm'));
```

### **2. Caching**

- User session cached in localStorage
- API responses cached appropriately
- Authentication state persisted across page reloads

### **3. Bundle Optimization**

- Tree-shaking for unused components
- Shared dependencies across packages
- Minimal runtime overhead

## Testing Strategy

### **1. Unit Tests**

- All validation schemas
- Authentication hooks
- Routing logic
- Component rendering

### **2. Integration Tests**

- End-to-end authentication flows
- Cross-domain redirects
- MFA workflows
- Social authentication

### **3. Security Tests**

- Input validation
- CSRF protection
- Token security
- Session management

## Migration Guide

### **From Existing Auth Systems**

1. **Install New Packages**: Add shared packages to package.json
2. **Update Components**: Replace existing auth forms
3. **Migrate Storage**: Convert existing session storage
4. **Update Routes**: Use new routing system
5. **Test Thoroughly**: Verify all authentication flows

### **Backward Compatibility**

The new system maintains backward compatibility with existing URLs and can gradually replace the old authentication system.

## Future Enhancements

### **Planned Features**

1. **Biometric Authentication**: WebAuthn/FIDO2 support
2. **Passwordless Login**: Magic links and passkeys
3. **Enterprise SSO**: SAML and OIDC integration
4. **Advanced MFA**: Hardware tokens and risk-based authentication
5. **Mobile SDK**: React Native authentication components

### **Scalability**

The architecture is designed to scale with:

- Additional account types
- New authentication providers
- Enhanced security features
- Regional compliance requirements

## Support and Maintenance

### **Documentation**

- API reference documentation
- Component storybook
- Integration examples
- Troubleshooting guides

### **Monitoring**

- Authentication success/failure rates
- Performance metrics
- Error tracking
- Security event logging

### **Updates**

- Regular security updates
- Feature enhancements
- Bug fixes
- Dependency updates

---

This global authentication system provides a robust, scalable, and user-friendly foundation for the Sunny Payment Gateway platform, ensuring consistent authentication experiences across all applications while maintaining the flexibility to adapt to different user types and requirements.
