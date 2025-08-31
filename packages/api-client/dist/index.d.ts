import { Session, SignInRequest, AuthResponse, SignUpRequest, SocialAuthRequest, PasswordResetRequest, PasswordResetConfirmRequest, MFASetupRequest, MFAType, User } from '@sunny/shared-types';

interface AuthClientConfig {
    baseURL: string;
    timeout?: number;
    withCredentials?: boolean;
}
interface AuthClientEvents {
    onTokenRefresh?: (session: Session) => void;
    onAuthError?: (error: any) => void;
    onSessionExpired?: () => void;
}
declare class AuthClient {
    private client;
    private refreshPromise;
    private events;
    constructor(config: AuthClientConfig, events?: AuthClientEvents);
    /**
     * Setup request/response interceptors
     */
    private setupInterceptors;
    /**
     * Sign in with email and password
     */
    signIn(data: SignInRequest): Promise<AuthResponse>;
    /**
     * Sign up new user
     */
    signUp(data: SignUpRequest): Promise<AuthResponse>;
    /**
     * Social authentication
     */
    socialAuth(data: SocialAuthRequest): Promise<AuthResponse>;
    /**
     * Refresh access token
     */
    refreshToken(): Promise<Session>;
    private performTokenRefresh;
    /**
     * Sign out current session
     */
    signOut(): Promise<void>;
    /**
     * Sign out all sessions
     */
    signOutAll(): Promise<void>;
    /**
     * Request password reset
     */
    requestPasswordReset(data: PasswordResetRequest): Promise<AuthResponse>;
    /**
     * Confirm password reset
     */
    confirmPasswordReset(data: PasswordResetConfirmRequest): Promise<AuthResponse>;
    /**
     * Setup MFA
     */
    setupMFA(data: MFASetupRequest): Promise<AuthResponse>;
    /**
     * Verify MFA setup
     */
    verifyMFASetup(code: string, method: MFAType): Promise<AuthResponse>;
    /**
     * Get current user information
     */
    getCurrentUser(): Promise<{
        success: boolean;
        user?: User;
        error?: any;
    }>;
    /**
     * Get user's active sessions
     */
    getSessions(): Promise<{
        success: boolean;
        sessions?: any[];
        error?: any;
    }>;
    /**
     * Terminate a specific session
     */
    terminateSession(sessionId: string): Promise<{
        success: boolean;
        error?: any;
    }>;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * Validate email format and availability
     */
    validateEmail(email: string): Promise<{
        available: boolean;
        valid: boolean;
        suggestions?: string[];
    }>;
    /**
     * Get account recovery options
     */
    getRecoveryOptions(email: string): Promise<{
        methods: string[];
        masked: {
            email?: string;
            phone?: string;
        };
    }>;
    /**
     * Send email verification
     */
    sendEmailVerification(): Promise<AuthResponse>;
    /**
     * Verify email with token
     */
    verifyEmail(token: string): Promise<AuthResponse>;
    /**
     * Update user profile
     */
    updateProfile(data: Partial<User>): Promise<{
        success: boolean;
        user?: User;
        error?: any;
    }>;
    /**
     * Change password
     */
    changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse>;
    /**
     * Enable/disable MFA
     */
    toggleMFA(enabled: boolean, code?: string): Promise<AuthResponse>;
    /**
     * Get MFA backup codes
     */
    getMFABackupCodes(): Promise<{
        success: boolean;
        codes?: string[];
        error?: any;
    }>;
    /**
     * Generate new MFA backup codes
     */
    regenerateMFABackupCodes(): Promise<{
        success: boolean;
        codes?: string[];
        error?: any;
    }>;
    /**
     * Delete user account
     */
    deleteAccount(password: string, confirmation: string): Promise<AuthResponse>;
    /**
     * Export user data (GDPR compliance)
     */
    exportUserData(): Promise<{
        success: boolean;
        data?: any;
        error?: any;
    }>;
    /**
     * Handle API errors consistently
     */
    private handleError;
    /**
     * Set custom headers for requests
     */
    setHeader(name: string, value: string): void;
    /**
     * Remove custom header
     */
    removeHeader(name: string): void;
    /**
     * Update base URL
     */
    setBaseURL(baseURL: string): void;
    /**
     * Get current base URL
     */
    getBaseURL(): string | undefined;
    /**
     * Update event handlers
     */
    updateEvents(events: Partial<AuthClientEvents>): void;
    /**
     * Health check
     */
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
        services?: any;
    }>;
}
declare function createAuthClient(config: AuthClientConfig, events?: AuthClientEvents): AuthClient;
declare function getAuthClient(): AuthClient;

export { AuthClient, type AuthClientConfig, type AuthClientEvents, createAuthClient, getAuthClient };
