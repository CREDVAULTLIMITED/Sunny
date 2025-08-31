import * as react_jsx_runtime from 'react/jsx-runtime';
import { UserAccountType, User, AuthContextType } from '@sunny/shared-types';
export * from '@sunny/shared-types';

interface AuthRouterProps {
    user?: User | null;
    onAuthSuccess?: (user: User, redirectUrl?: string) => void;
}
declare class AuthRouter {
    /**
     * Determines the correct destination URL based on user account type
     */
    static getDestinationUrl(accountType: UserAccountType, customRedirect?: string): string;
    /**
     * Auto-detect account type from user data
     */
    static detectAccountType(user: User): UserAccountType;
    /**
     * Handle successful authentication with automatic routing
     */
    static handleAuthSuccessWithAutoDetection(user: User, customRedirect?: string): void;
    /**
     * Constructs the authentication URL with proper parameters
     */
    static buildAuthUrl(mode: 'signin' | 'signup', accountType?: UserAccountType, redirectUrl?: string, authDomain?: string): string;
    /**
     * Handles post-authentication routing
     */
    static handleAuthSuccess(user: User, customRedirect?: string, onSuccess?: (user: User, redirectUrl: string) => void): void;
    /**
     * Extracts account type from URL parameters or referrer
     */
    static detectAccountTypeFromParams(searchParams?: URLSearchParams): UserAccountType | undefined;
    /**
     * Validates if a user can access a specific dashboard
     */
    static canUserAccessDashboard(user: User, requestedType: UserAccountType): boolean;
    /**
     * Redirects user to sign-in page with appropriate parameters
     */
    static redirectToSignIn(accountType?: UserAccountType, redirectUrl?: string, authDomain?: string): void;
    /**
     * Redirects user to sign-up page with appropriate parameters
     */
    static redirectToSignUp(accountType?: UserAccountType, redirectUrl?: string, authDomain?: string): void;
}
/**
 * React hook for handling authentication routing
 */
declare function useAuthRouter(options?: AuthRouterProps): {
    redirectToSignIn: (accountType?: UserAccountType, customRedirect?: string) => void;
    redirectToSignUp: (accountType?: UserAccountType, customRedirect?: string) => void;
    handleAuthSuccess: (user: User) => void;
    getDetectedAccountType: () => UserAccountType | undefined;
    buildAuthUrl: typeof AuthRouter.buildAuthUrl;
    getDestinationUrl: typeof AuthRouter.getDestinationUrl;
};
/**
 * Authentication URL builder utility
 */
declare function buildAuthLink(mode: 'signin' | 'signup', options?: {
    accountType?: UserAccountType;
    redirectUrl?: string;
    authDomain?: string;
    className?: string;
    children?: React.ReactNode;
}): string;
/**
 * Higher-order component for protecting routes
 */
declare function withAuthProtection<P extends object>(Component: React.ComponentType<P>, requiredAccountType?: UserAccountType, fallbackUrl?: string): (props: P) => react_jsx_runtime.JSX.Element;

/**
 * Main authentication hook
 */
declare function useAuth(): AuthContextType;

export { AuthRouter, buildAuthLink, useAuth, useAuthRouter, withAuthProtection };
