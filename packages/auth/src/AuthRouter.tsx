'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  UserAccountType, 
  ACCOUNT_TYPE_DESTINATIONS,
  type SignInRequest,
  type SignUpRequest,
  type AuthResponse,
  type User
} from '@sunny/shared-types';

interface AuthRouterProps {
  user?: User | null;
  onAuthSuccess?: (user: User, redirectUrl?: string) => void;
}

export class AuthRouter {
  /**
   * Determines the correct destination URL based on user account type
   */
  static getDestinationUrl(accountType: UserAccountType, customRedirect?: string): string {
    // If there's a custom redirect URL, validate it's from a trusted domain
    if (customRedirect) {
      const trustedDomains = [
        'sunnypayments.com',
        'app.sunnypayments.com',
        'business.sunnypayments.com',
        'institutions.sunnypayments.com',
        'admin.sunnypayments.com',
        'developers.sunnypayments.com'
      ];

      try {
        const url = new URL(customRedirect);
        const domain = url.hostname;
        
        if (trustedDomains.some(trusted => domain === trusted || domain.endsWith(`.${trusted}`))) {
          return customRedirect;
        }
      } catch {
        // Invalid URL, fall back to default
      }
    }

    // Return the default destination for the account type
    return ACCOUNT_TYPE_DESTINATIONS[accountType];
  }

  /**
   * Auto-detect account type from user data
   */
  static detectAccountType(user: User): UserAccountType {
    // Return the user's actual account type - this is determined during registration
    // or by the backend based on user's profile and verification status
    return user.accountType;
  }

  /**
   * Handle successful authentication with automatic routing
   */
  static handleAuthSuccessWithAutoDetection(user: User, customRedirect?: string): void {
    const accountType = AuthRouter.detectAccountType(user);
    const destination = AuthRouter.getDestinationUrl(accountType, customRedirect);
    
    // Check if we're already on the correct domain
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      
      try {
        const targetDomain = new URL(destination).hostname;
        
        // Only redirect if we're not already on the target domain
        if (currentDomain !== targetDomain) {
          window.location.href = destination;
        } else {
          // If we're already on the correct domain, just navigate to the dashboard
          const dashboardPath = customRedirect ? new URL(customRedirect).pathname : '/dashboard';
          window.location.pathname = dashboardPath;
        }
      } catch {
        // Fallback to full redirect if URL parsing fails
        window.location.href = destination;
      }
    }
  }

  /**
   * Constructs the authentication URL with proper parameters
   */
  static buildAuthUrl(
    mode: 'signin' | 'signup',
    accountType?: UserAccountType,
    redirectUrl?: string,
    authDomain: string = 'https://auth.sunnypayments.com'
  ): string {
    const url = new URL(`/${mode}`, authDomain);
    
    if (accountType) {
      url.searchParams.set('type', accountType);
    }
    
    if (redirectUrl) {
      url.searchParams.set('redirect', redirectUrl);
    }

    // Add source information for analytics
    if (typeof window !== 'undefined') {
      const source = window.location.hostname;
      url.searchParams.set('source', source);
    }

    return url.toString();
  }

  /**
   * Handles post-authentication routing
   */
  static handleAuthSuccess(
    user: User,
    customRedirect?: string,
    onSuccess?: (user: User, redirectUrl: string) => void
  ): void {
    const redirectUrl = this.getDestinationUrl(user.accountType, customRedirect);
    
    if (onSuccess) {
      onSuccess(user, redirectUrl);
    } else {
      // Default behavior: redirect to appropriate dashboard
      window.location.href = redirectUrl;
    }
  }

  /**
   * Extracts account type from URL parameters or referrer
   */
  static detectAccountTypeFromParams(searchParams?: URLSearchParams): UserAccountType | undefined {
    // Check URL parameters first
    if (searchParams?.has('type')) {
      const type = searchParams.get('type') as UserAccountType;
      if (Object.values(UserAccountType).includes(type)) {
        return type;
      }
    }

    // Try to detect from referrer
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);
        const hostname = referrerUrl.hostname;

        if (hostname.includes('business.')) return UserAccountType.BUSINESS;
        if (hostname.includes('institutions.')) return UserAccountType.INSTITUTION;
        if (hostname.includes('developers.')) return UserAccountType.DEVELOPER;
        if (hostname.includes('admin.')) return UserAccountType.ADMIN;
        if (hostname.includes('app.')) return UserAccountType.INDIVIDUAL;
      } catch {
        // Invalid referrer URL
      }
    }

    return undefined;
  }

  /**
   * Validates if a user can access a specific dashboard
   */
  static canUserAccessDashboard(user: User, requestedType: UserAccountType): boolean {
    // Admin users can access any dashboard
    if (user.accountType === UserAccountType.ADMIN) {
      return true;
    }

    // Users can only access their own account type dashboard
    return user.accountType === requestedType;
  }

  /**
   * Redirects user to sign-in page with appropriate parameters
   */
  static redirectToSignIn(
    accountType?: UserAccountType,
    redirectUrl?: string,
    authDomain: string = 'https://auth.sunnypayments.com'
  ): void {
    const signInUrl = this.buildAuthUrl('signin', accountType, redirectUrl, authDomain);
    window.location.href = signInUrl;
  }

  /**
   * Redirects user to sign-up page with appropriate parameters
   */
  static redirectToSignUp(
    accountType?: UserAccountType,
    redirectUrl?: string,
    authDomain: string = 'https://auth.sunnypayments.com'
  ): void {
    const signUpUrl = this.buildAuthUrl('signup', accountType, redirectUrl, authDomain);
    window.location.href = signUpUrl;
  }
}

/**
 * React hook for handling authentication routing
 */
export function useAuthRouter(options?: AuthRouterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectToSignIn = (accountType?: UserAccountType, customRedirect?: string) => {
    const redirectUrl = customRedirect || searchParams?.get('redirect') || undefined;
    AuthRouter.redirectToSignIn(accountType, redirectUrl);
  };

  const redirectToSignUp = (accountType?: UserAccountType, customRedirect?: string) => {
    const redirectUrl = customRedirect || searchParams?.get('redirect') || undefined;
    AuthRouter.redirectToSignUp(accountType, redirectUrl);
  };

  const handleAuthSuccess = (user: User) => {
    const customRedirect = searchParams?.get('redirect') || undefined;
    AuthRouter.handleAuthSuccess(user, customRedirect, options?.onAuthSuccess);
  };

  const getDetectedAccountType = () => {
    return AuthRouter.detectAccountTypeFromParams(searchParams);
  };

  // Auto-redirect authenticated users
  useEffect(() => {
    if (options?.user) {
      const redirectUrl = searchParams?.get('redirect') || undefined;
      const destination = AuthRouter.getDestinationUrl(options.user.accountType, redirectUrl);
      
      // Only redirect if we're not already on the correct domain
      if (typeof window !== 'undefined' && !window.location.href.startsWith(destination)) {
        window.location.href = destination;
      }
    }
  }, [options?.user, searchParams]);

  return {
    redirectToSignIn,
    redirectToSignUp,
    handleAuthSuccess,
    getDetectedAccountType,
    buildAuthUrl: AuthRouter.buildAuthUrl,
    getDestinationUrl: AuthRouter.getDestinationUrl
  };
}

/**
 * Authentication URL builder utility
 */
export function buildAuthLink(
  mode: 'signin' | 'signup',
  options?: {
    accountType?: UserAccountType;
    redirectUrl?: string;
    authDomain?: string;
    className?: string;
    children?: React.ReactNode;
  }
) {
  const url = AuthRouter.buildAuthUrl(
    mode,
    options?.accountType,
    options?.redirectUrl,
    options?.authDomain
  );

  return url;
}

/**
 * Higher-order component for protecting routes
 */
export function withAuthProtection<P extends object>(
  Component: React.ComponentType<P>,
  requiredAccountType?: UserAccountType,
  fallbackUrl?: string
) {
  return function ProtectedComponent(props: P) {
    const { user } = props as any; // Assume user is passed as prop
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        // Redirect to sign-in if not authenticated
        const redirectUrl = typeof window !== 'undefined' ? window.location.href : undefined;
        AuthRouter.redirectToSignIn(requiredAccountType, redirectUrl);
        return;
      }

      if (requiredAccountType && !AuthRouter.canUserAccessDashboard(user, requiredAccountType)) {
        // Redirect to appropriate dashboard or fallback URL
        const destination = fallbackUrl || AuthRouter.getDestinationUrl(user.accountType);
        router.push(destination);
        return;
      }
    }, [user, router]);

    // Don't render component if user is not authenticated or authorized
    if (!user || (requiredAccountType && !AuthRouter.canUserAccessDashboard(user, requiredAccountType))) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

export default AuthRouter;
