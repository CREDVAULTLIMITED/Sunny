'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  type User,
  type Session,
  type SignInRequest,
  type SignUpRequest,
  type SocialAuthRequest,
  type PasswordResetRequest,
  type PasswordResetConfirmRequest,
  type MFASetupRequest,
  type AuthResponse,
  type AuthContextType,
  MFAType
} from '@sunny/shared-types';

// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'sunny_access_token',
  REFRESH_TOKEN: 'sunny_refresh_token',
  USER: 'sunny_user',
  SESSION: 'sunny_session'
} as const;

// API endpoints (these would be configured per environment)
const API_ENDPOINTS = {
  SIGN_IN: '/api/auth/signin',
  SIGN_UP: '/api/auth/signup',
  SIGN_OUT: '/api/auth/signout',
  REFRESH: '/api/auth/refresh',
  SOCIAL_AUTH: '/api/auth/social',
  RESET_PASSWORD: '/api/auth/reset-password',
  CONFIRM_RESET: '/api/auth/confirm-reset',
  SETUP_MFA: '/api/auth/mfa/setup',
  VERIFY_MFA: '/api/auth/mfa/verify',
  ME: '/api/auth/me'
} as const;

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Authentication service for making API calls
 */
class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://api.sunnypayments.com') {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getStoredToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  private setTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }

  private clearTokens(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  async signIn(data: SignInRequest): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>(API_ENDPOINTS.SIGN_IN, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user!, response.session);
    }

    return response;
  }

  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>(API_ENDPOINTS.SIGN_UP, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user!, response.session);
    }

    return response;
  }

  async signOut(): Promise<void> {
    try {
      await this.makeRequest(API_ENDPOINTS.SIGN_OUT, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Sign out request failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  async socialAuth(data: SocialAuthRequest): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>(API_ENDPOINTS.SOCIAL_AUTH, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user!, response.session);
    }

    return response;
  }

  async resetPassword(data: PasswordResetRequest): Promise<AuthResponse> {
    return await this.makeRequest<AuthResponse>(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async confirmPasswordReset(data: PasswordResetConfirmRequest): Promise<AuthResponse> {
    return await this.makeRequest<AuthResponse>(API_ENDPOINTS.CONFIRM_RESET, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async setupMFA(data: MFASetupRequest): Promise<AuthResponse> {
    return await this.makeRequest<AuthResponse>(API_ENDPOINTS.SETUP_MFA, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyMFA(code: string, method: MFAType): Promise<AuthResponse> {
    return await this.makeRequest<AuthResponse>(API_ENDPOINTS.VERIFY_MFA, {
      method: 'POST',
      body: JSON.stringify({ code, method }),
    });
  }

  async refreshSession(): Promise<AuthResponse> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
      : null;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.makeRequest<AuthResponse>(API_ENDPOINTS.REFRESH, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user!, response.session);
    }

    return response;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.makeRequest<{ user: User }>(API_ENDPOINTS.ME);
      return response.user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  private storeUserSession(user: User, session: Session): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  getStoredSession(): Session | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}

// Global auth service instance
const authService = new AuthService();

/**
 * Main authentication hook
 */
export function useAuth(): AuthContextType {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = authService.getStoredUser();
        const storedSession = authService.getStoredSession();

        if (storedUser && storedSession) {
          // Check if session is still valid
          const now = new Date();
          const expiresAt = new Date(storedSession.expiresAt);

          if (expiresAt > now) {
            setState({
              user: storedUser,
              session: storedSession,
              isLoading: false,
              isAuthenticated: true,
            });
            return;
          } else {
            // Try to refresh the session
            try {
              const response = await authService.refreshSession();
              if (response.success && response.user && response.session) {
                setState({
                  user: response.user,
                  session: response.session,
                  isLoading: false,
                  isAuthenticated: true,
                });
                return;
              }
            } catch (error) {
              console.error('Session refresh failed:', error);
            }
          }
        }

        // No valid session found
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        });
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const signIn = useCallback(async (data: SignInRequest): Promise<AuthResponse> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.signIn(data);
      
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
      
      return response;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signUp = useCallback(async (data: SignUpRequest): Promise<AuthResponse> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.signUp(data);
      
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
      
      return response;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.signOut();
    } finally {
      setState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const socialAuth = useCallback(async (data: SocialAuthRequest): Promise<AuthResponse> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.socialAuth(data);
      
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
      
      return response;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (data: PasswordResetRequest): Promise<AuthResponse> => {
    return await authService.resetPassword(data);
  }, []);

  const confirmPasswordReset = useCallback(async (data: PasswordResetConfirmRequest): Promise<AuthResponse> => {
    return await authService.confirmPasswordReset(data);
  }, []);

  const setupMFA = useCallback(async (data: MFASetupRequest): Promise<AuthResponse> => {
    return await authService.setupMFA(data);
  }, []);

  const verifyMFA = useCallback(async (code: string, method: MFAType): Promise<AuthResponse> => {
    return await authService.verifyMFA(code, method);
  }, []);

  const refreshSession = useCallback(async (): Promise<AuthResponse> => {
    try {
      const response = await authService.refreshSession();
      
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true,
        });
      }
      
      return response;
    } catch (error) {
      // If refresh fails, sign out the user
      await signOut();
      throw error;
    }
  }, [signOut]);

  return {
    user: state.user,
    session: state.session,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    signIn,
    signUp,
    signOut,
    socialAuth,
    resetPassword,
    confirmPasswordReset,
    setupMFA,
    verifyMFA,
    refreshSession,
  };
}

export default useAuth;
