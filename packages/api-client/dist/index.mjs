// src/auth-client.ts
import axios from "axios";
var AuthClient = class {
  constructor(config, events = {}) {
    this.refreshPromise = null;
    this.events = events;
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 3e4,
      withCredentials: config.withCredentials !== false,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.setupInterceptors();
  }
  /**
   * Setup request/response interceptors
   */
  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await this.refreshToken();
            return this.client(originalRequest);
          } catch (refreshError) {
            this.events.onSessionExpired?.();
            return Promise.reject(refreshError);
          }
        }
        this.events.onAuthError?.(error);
        return Promise.reject(error);
      }
    );
  }
  /**
   * Sign in with email and password
   */
  async signIn(data) {
    try {
      const response = await this.client.post("/auth/signin", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Sign up new user
   */
  async signUp(data) {
    try {
      const response = await this.client.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Social authentication
   */
  async socialAuth(data) {
    try {
      const response = await this.client.post("/auth/social", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Refresh access token
   */
  async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    this.refreshPromise = this.performTokenRefresh();
    try {
      const session = await this.refreshPromise;
      this.refreshPromise = null;
      return session;
    } catch (error) {
      this.refreshPromise = null;
      throw error;
    }
  }
  async performTokenRefresh() {
    try {
      const response = await this.client.post("/auth/refresh");
      if (response.data.success && response.data.session) {
        this.events.onTokenRefresh?.(response.data.session);
        return response.data.session;
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  /**
   * Sign out current session
   */
  async signOut() {
    try {
      await this.client.post("/auth/signout");
    } catch (error) {
      console.warn("Sign out request failed:", error);
    }
  }
  /**
   * Sign out all sessions
   */
  async signOutAll() {
    try {
      await this.client.post("/auth/signout-all");
    } catch (error) {
      console.warn("Sign out all request failed:", error);
    }
  }
  /**
   * Request password reset
   */
  async requestPasswordReset(data) {
    try {
      const response = await this.client.post("/auth/forgot-password", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Confirm password reset
   */
  async confirmPasswordReset(data) {
    try {
      const response = await this.client.post("/auth/reset-password", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Setup MFA
   */
  async setupMFA(data) {
    try {
      const response = await this.client.post("/auth/mfa/setup", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Verify MFA setup
   */
  async verifyMFASetup(code, method) {
    try {
      const response = await this.client.post("/auth/mfa/verify-setup", {
        code,
        method
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Get current user information
   */
  async getCurrentUser() {
    try {
      const response = await this.client.get("/auth/me");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Get user's active sessions
   */
  async getSessions() {
    try {
      const response = await this.client.get("/auth/sessions");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Terminate a specific session
   */
  async terminateSession(sessionId) {
    try {
      const response = await this.client.delete(`/auth/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Check if user is authenticated
   */
  async isAuthenticated() {
    try {
      const result = await this.getCurrentUser();
      return result.success && !!result.user;
    } catch {
      return false;
    }
  }
  /**
   * Validate email format and availability
   */
  async validateEmail(email) {
    try {
      const response = await this.client.post("/auth/validate-email", { email });
      return response.data;
    } catch (error) {
      return { available: false, valid: false };
    }
  }
  /**
   * Get account recovery options
   */
  async getRecoveryOptions(email) {
    try {
      const response = await this.client.post("/auth/recovery-options", { email });
      return response.data;
    } catch (error) {
      return { methods: [], masked: {} };
    }
  }
  /**
   * Send email verification
   */
  async sendEmailVerification() {
    try {
      const response = await this.client.post("/auth/send-email-verification");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Verify email with token
   */
  async verifyEmail(token) {
    try {
      const response = await this.client.post("/auth/verify-email", { token });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Update user profile
   */
  async updateProfile(data) {
    try {
      const response = await this.client.patch("/auth/profile", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await this.client.post("/auth/change-password", {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Enable/disable MFA
   */
  async toggleMFA(enabled, code) {
    try {
      const response = await this.client.post("/auth/mfa/toggle", {
        enabled,
        code
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Get MFA backup codes
   */
  async getMFABackupCodes() {
    try {
      const response = await this.client.get("/auth/mfa/backup-codes");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Generate new MFA backup codes
   */
  async regenerateMFABackupCodes() {
    try {
      const response = await this.client.post("/auth/mfa/regenerate-backup-codes");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Delete user account
   */
  async deleteAccount(password, confirmation) {
    try {
      const response = await this.client.post("/auth/delete-account", {
        password,
        confirmation
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Export user data (GDPR compliance)
   */
  async exportUserData() {
    try {
      const response = await this.client.get("/auth/export-data");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  /**
   * Handle API errors consistently
   */
  handleError(error) {
    if (error.response?.data) {
      return error.response.data;
    }
    if (error.request) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Network error occurred. Please check your connection and try again."
        }
      };
    }
    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: error.message || "An unexpected error occurred"
      }
    };
  }
  /**
   * Set custom headers for requests
   */
  setHeader(name, value) {
    this.client.defaults.headers.common[name] = value;
  }
  /**
   * Remove custom header
   */
  removeHeader(name) {
    delete this.client.defaults.headers.common[name];
  }
  /**
   * Update base URL
   */
  setBaseURL(baseURL) {
    this.client.defaults.baseURL = baseURL;
  }
  /**
   * Get current base URL
   */
  getBaseURL() {
    return this.client.defaults.baseURL;
  }
  /**
   * Update event handlers
   */
  updateEvents(events) {
    this.events = { ...this.events, ...events };
  }
  /**
   * Health check
   */
  async healthCheck() {
    try {
      const response = await this.client.get("/health");
      return response.data;
    } catch (error) {
      return {
        status: "unhealthy",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
};
var authClientInstance = null;
function createAuthClient(config, events) {
  authClientInstance = new AuthClient(config, events);
  return authClientInstance;
}
function getAuthClient() {
  if (!authClientInstance) {
    throw new Error("Auth client not initialized. Call createAuthClient() first.");
  }
  return authClientInstance;
}
export {
  AuthClient,
  createAuthClient,
  getAuthClient
};
