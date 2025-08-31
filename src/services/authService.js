/**
 * Sunny Payment Gateway - Authentication Service
 * Development version with local storage
 */

import jwtDecode from 'jwt-decode';
import loggingService from './loggingService.js';

// Mock JWT creation (only for development)
const createMockJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    iat: Math.floor(Date.now() / 1000)
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

const authService = {
  async verifyToken(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  async login(email, password, authMethod = 'email') {
    try {
      // For development, check localStorage for registered users
      const users = JSON.parse(localStorage.getItem('sunny_users') || '[]');
      const user = users.find(u => u.email === email);
      
      if (!user || (authMethod === 'email' && user.password !== password)) {
        throw new Error('Invalid email or password');
      }

      // Create mock tokens
      const token = createMockJWT(user);
      const refreshToken = 'mock-refresh-token';
      
      // Store tokens and auth method preference
      sessionStorage.setItem('sunnyAuthToken', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('preferredAuthMethod', authMethod);

      const { password: _, ...userWithoutPassword } = user;
      
      return {
        success: true,
        token,
        user: userWithoutPassword,
        authMethod
      };
    } catch (error) {
      loggingService.error('Login failed', error);
      throw error;
    }
  },

  async register(userData, authMethod = 'email') {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('sunny_users') || '[]');
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Create new user with auth method
      const newUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        country: userData.country,
        authMethod,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('sunny_users', JSON.stringify(users));
      localStorage.setItem('preferredAuthMethod', authMethod);

      // Create tokens
      const token = createMockJWT(newUser);
      const refreshToken = 'mock-refresh-token';
      
      // Store auth data
      sessionStorage.setItem('sunnyAuthToken', token);
      sessionStorage.setItem('refreshToken', refreshToken);

      const { password: _, ...userWithoutPassword } = newUser;
      
      return {
        success: true,
        token,
        user: userWithoutPassword,
        authMethod
      };
    } catch (error) {
      loggingService.error('Registration failed', error);
      throw error;
    }
  },

  async verifyEmail(token) {
    try {
      // For development, just return success
      return {
        success: true,
        message: 'Email verified successfully'
      };
    } catch (error) {
      loggingService.error('Email verification failed', error);
      return {
        success: false,
        message: error.message
      };
    }
  },

  async logout() {
    try {
      // For development, just clear session storage
      sessionStorage.removeItem('sunnyAuthToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      loggingService.error('Logout failed', error);
      throw error;
    }
  },

  async handleSocialAuth(provider, userData) {
    try {
      // Handle social authentication
      const users = JSON.parse(localStorage.getItem('sunny_users') || '[]');
      let user = users.find(u => u.email === userData.email);

      if (!user) {
        // Register new user with social provider
        return this.register({
          ...userData,
          password: Math.random().toString(36) // Generate random password for social auth users
        }, provider);
      } else {
        // Login existing user
        return this.login(userData.email, user.password, provider);
      }
    } catch (error) {
      loggingService.error(`${provider} authentication failed`, error);
      throw error;
    }
  },
};

export default authService;