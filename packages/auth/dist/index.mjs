// src/AuthRouter.tsx
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UserAccountType,
  ACCOUNT_TYPE_DESTINATIONS
} from "@sunny/shared-types";
import { jsx } from "react/jsx-runtime";
var AuthRouter = class _AuthRouter {
  /**
   * Determines the correct destination URL based on user account type
   */
  static getDestinationUrl(accountType, customRedirect) {
    if (customRedirect) {
      const trustedDomains = [
        "sunnypayments.com",
        "app.sunnypayments.com",
        "business.sunnypayments.com",
        "institutions.sunnypayments.com",
        "admin.sunnypayments.com",
        "developers.sunnypayments.com"
      ];
      try {
        const url = new URL(customRedirect);
        const domain = url.hostname;
        if (trustedDomains.some((trusted) => domain === trusted || domain.endsWith(`.${trusted}`))) {
          return customRedirect;
        }
      } catch {
      }
    }
    return ACCOUNT_TYPE_DESTINATIONS[accountType];
  }
  /**
   * Auto-detect account type from user data
   */
  static detectAccountType(user) {
    return user.accountType;
  }
  /**
   * Handle successful authentication with automatic routing
   */
  static handleAuthSuccessWithAutoDetection(user, customRedirect) {
    const accountType = _AuthRouter.detectAccountType(user);
    const destination = _AuthRouter.getDestinationUrl(accountType, customRedirect);
    if (typeof window !== "undefined") {
      const currentDomain = window.location.hostname;
      try {
        const targetDomain = new URL(destination).hostname;
        if (currentDomain !== targetDomain) {
          window.location.href = destination;
        } else {
          const dashboardPath = customRedirect ? new URL(customRedirect).pathname : "/dashboard";
          window.location.pathname = dashboardPath;
        }
      } catch {
        window.location.href = destination;
      }
    }
  }
  /**
   * Constructs the authentication URL with proper parameters
   */
  static buildAuthUrl(mode, accountType, redirectUrl, authDomain = "https://auth.sunnypayments.com") {
    const url = new URL(`/${mode}`, authDomain);
    if (accountType) {
      url.searchParams.set("type", accountType);
    }
    if (redirectUrl) {
      url.searchParams.set("redirect", redirectUrl);
    }
    if (typeof window !== "undefined") {
      const source = window.location.hostname;
      url.searchParams.set("source", source);
    }
    return url.toString();
  }
  /**
   * Handles post-authentication routing
   */
  static handleAuthSuccess(user, customRedirect, onSuccess) {
    const redirectUrl = this.getDestinationUrl(user.accountType, customRedirect);
    if (onSuccess) {
      onSuccess(user, redirectUrl);
    } else {
      window.location.href = redirectUrl;
    }
  }
  /**
   * Extracts account type from URL parameters or referrer
   */
  static detectAccountTypeFromParams(searchParams) {
    if (searchParams?.has("type")) {
      const type = searchParams.get("type");
      if (Object.values(UserAccountType).includes(type)) {
        return type;
      }
    }
    if (typeof window !== "undefined" && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);
        const hostname = referrerUrl.hostname;
        if (hostname.includes("business.")) return UserAccountType.BUSINESS;
        if (hostname.includes("institutions.")) return UserAccountType.INSTITUTION;
        if (hostname.includes("developers.")) return UserAccountType.DEVELOPER;
        if (hostname.includes("admin.")) return UserAccountType.ADMIN;
        if (hostname.includes("app.")) return UserAccountType.INDIVIDUAL;
      } catch {
      }
    }
    return void 0;
  }
  /**
   * Validates if a user can access a specific dashboard
   */
  static canUserAccessDashboard(user, requestedType) {
    if (user.accountType === UserAccountType.ADMIN) {
      return true;
    }
    return user.accountType === requestedType;
  }
  /**
   * Redirects user to sign-in page with appropriate parameters
   */
  static redirectToSignIn(accountType, redirectUrl, authDomain = "https://auth.sunnypayments.com") {
    const signInUrl = this.buildAuthUrl("signin", accountType, redirectUrl, authDomain);
    window.location.href = signInUrl;
  }
  /**
   * Redirects user to sign-up page with appropriate parameters
   */
  static redirectToSignUp(accountType, redirectUrl, authDomain = "https://auth.sunnypayments.com") {
    const signUpUrl = this.buildAuthUrl("signup", accountType, redirectUrl, authDomain);
    window.location.href = signUpUrl;
  }
};
function useAuthRouter(options) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToSignIn = (accountType, customRedirect) => {
    const redirectUrl = customRedirect || searchParams?.get("redirect") || void 0;
    AuthRouter.redirectToSignIn(accountType, redirectUrl);
  };
  const redirectToSignUp = (accountType, customRedirect) => {
    const redirectUrl = customRedirect || searchParams?.get("redirect") || void 0;
    AuthRouter.redirectToSignUp(accountType, redirectUrl);
  };
  const handleAuthSuccess = (user) => {
    const customRedirect = searchParams?.get("redirect") || void 0;
    AuthRouter.handleAuthSuccess(user, customRedirect, options?.onAuthSuccess);
  };
  const getDetectedAccountType = () => {
    return AuthRouter.detectAccountTypeFromParams(searchParams);
  };
  useEffect(() => {
    if (options?.user) {
      const redirectUrl = searchParams?.get("redirect") || void 0;
      const destination = AuthRouter.getDestinationUrl(options.user.accountType, redirectUrl);
      if (typeof window !== "undefined" && !window.location.href.startsWith(destination)) {
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
function buildAuthLink(mode, options) {
  const url = AuthRouter.buildAuthUrl(
    mode,
    options?.accountType,
    options?.redirectUrl,
    options?.authDomain
  );
  return url;
}
function withAuthProtection(Component, requiredAccountType, fallbackUrl) {
  return function ProtectedComponent(props) {
    const { user } = props;
    const router = useRouter();
    useEffect(() => {
      if (!user) {
        const redirectUrl = typeof window !== "undefined" ? window.location.href : void 0;
        AuthRouter.redirectToSignIn(requiredAccountType, redirectUrl);
        return;
      }
      if (requiredAccountType && !AuthRouter.canUserAccessDashboard(user, requiredAccountType)) {
        const destination = fallbackUrl || AuthRouter.getDestinationUrl(user.accountType);
        router.push(destination);
        return;
      }
    }, [user, router]);
    if (!user || requiredAccountType && !AuthRouter.canUserAccessDashboard(user, requiredAccountType)) {
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-green-600" }) });
    }
    return /* @__PURE__ */ jsx(Component, { ...props });
  };
}
var AuthRouter_default = AuthRouter;

// src/hooks/useAuth.ts
import { useState, useEffect as useEffect2, useCallback } from "react";
var STORAGE_KEYS = {
  ACCESS_TOKEN: "sunny_access_token",
  REFRESH_TOKEN: "sunny_refresh_token",
  USER: "sunny_user",
  SESSION: "sunny_session"
};
var API_ENDPOINTS = {
  SIGN_IN: "/api/auth/signin",
  SIGN_UP: "/api/auth/signup",
  SIGN_OUT: "/api/auth/signout",
  REFRESH: "/api/auth/refresh",
  SOCIAL_AUTH: "/api/auth/social",
  RESET_PASSWORD: "/api/auth/reset-password",
  CONFIRM_RESET: "/api/auth/confirm-reset",
  SETUP_MFA: "/api/auth/mfa/setup",
  VERIFY_MFA: "/api/auth/mfa/verify",
  ME: "/api/auth/me"
};
var AuthService = class {
  constructor(baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.sunnypayments.com") {
    this.baseUrl = baseUrl;
  }
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getStoredToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...token && { Authorization: `Bearer ${token}` },
        ...options.headers
      },
      ...options
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
  getStoredToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
  setTokens(accessToken, refreshToken) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }
  clearTokens() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
  async signIn(data) {
    const response = await this.makeRequest(API_ENDPOINTS.SIGN_IN, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user, response.session);
    }
    return response;
  }
  async signUp(data) {
    const response = await this.makeRequest(API_ENDPOINTS.SIGN_UP, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user, response.session);
    }
    return response;
  }
  async signOut() {
    try {
      await this.makeRequest(API_ENDPOINTS.SIGN_OUT, {
        method: "POST"
      });
    } catch (error) {
      console.error("Sign out request failed:", error);
    } finally {
      this.clearTokens();
    }
  }
  async socialAuth(data) {
    const response = await this.makeRequest(API_ENDPOINTS.SOCIAL_AUTH, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user, response.session);
    }
    return response;
  }
  async resetPassword(data) {
    return await this.makeRequest(API_ENDPOINTS.RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async confirmPasswordReset(data) {
    return await this.makeRequest(API_ENDPOINTS.CONFIRM_RESET, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async setupMFA(data) {
    return await this.makeRequest(API_ENDPOINTS.SETUP_MFA, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async verifyMFA(code, method) {
    return await this.makeRequest(API_ENDPOINTS.VERIFY_MFA, {
      method: "POST",
      body: JSON.stringify({ code, method })
    });
  }
  async refreshSession() {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) : null;
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await this.makeRequest(API_ENDPOINTS.REFRESH, {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    });
    if (response.success && response.session) {
      this.setTokens(response.session.accessToken, response.session.refreshToken);
      this.storeUserSession(response.user, response.session);
    }
    return response;
  }
  async getCurrentUser() {
    try {
      const response = await this.makeRequest(API_ENDPOINTS.ME);
      return response.user;
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  }
  storeUserSession(user, session) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }
  getStoredUser() {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
  getStoredSession() {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
};
var authService = new AuthService();
function useAuth() {
  const [state, setState] = useState({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false
  });
  useEffect2(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = authService.getStoredUser();
        const storedSession = authService.getStoredSession();
        if (storedUser && storedSession) {
          const now = /* @__PURE__ */ new Date();
          const expiresAt = new Date(storedSession.expiresAt);
          if (expiresAt > now) {
            setState({
              user: storedUser,
              session: storedSession,
              isLoading: false,
              isAuthenticated: true
            });
            return;
          } else {
            try {
              const response = await authService.refreshSession();
              if (response.success && response.user && response.session) {
                setState({
                  user: response.user,
                  session: response.session,
                  isLoading: false,
                  isAuthenticated: true
                });
                return;
              }
            } catch (error) {
              console.error("Session refresh failed:", error);
            }
          }
        }
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false
        });
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setState({
          user: null,
          session: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };
    initializeAuth();
  }, []);
  const signIn = useCallback(async (data) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.signIn(data);
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
      return response;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);
  const signUp = useCallback(async (data) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.signUp(data);
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
      return response;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);
  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.signOut();
    } finally {
      setState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  }, []);
  const socialAuth = useCallback(async (data) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.socialAuth(data);
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
      return response;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);
  const resetPassword = useCallback(async (data) => {
    return await authService.resetPassword(data);
  }, []);
  const confirmPasswordReset = useCallback(async (data) => {
    return await authService.confirmPasswordReset(data);
  }, []);
  const setupMFA = useCallback(async (data) => {
    return await authService.setupMFA(data);
  }, []);
  const verifyMFA = useCallback(async (code, method) => {
    return await authService.verifyMFA(code, method);
  }, []);
  const refreshSession = useCallback(async () => {
    try {
      const response = await authService.refreshSession();
      if (response.success && response.user && response.session) {
        setState({
          user: response.user,
          session: response.session,
          isLoading: false,
          isAuthenticated: true
        });
      }
      return response;
    } catch (error) {
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
    refreshSession
  };
}

// src/index.ts
export * from "@sunny/shared-types";
export {
  AuthRouter_default as AuthRouter,
  buildAuthLink,
  useAuth,
  useAuthRouter,
  withAuthProtection
};
