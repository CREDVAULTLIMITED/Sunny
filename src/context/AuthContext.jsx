import React, { createContext, useState, useContext, useEffect } from 'react';
import { encryptData, decryptData } from '../security/encryption';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const encryptedToken = sessionStorage.getItem('sunnyAuthToken');
        const encryptedUser = sessionStorage.getItem('user');
        if (encryptedToken && encryptedUser) {
          const token = await decryptData(encryptedToken);
          const userData = JSON.parse(await decryptData(encryptedUser));
          // Verify token expiration
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          if (tokenData.exp * 1000 > Date.now()) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token expired
            logout();
          }
        }
      } catch (e) {
        console.error("Auth check failed", e);
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (token, userData) => {
    try {
      const encryptedToken = await encryptData(token);
      const encryptedUser = await encryptData(JSON.stringify(userData));
      sessionStorage.setItem('sunnyAuthToken', encryptedToken);
      sessionStorage.setItem('user', encryptedUser);
      setIsAuthenticated(true);
      setUser(userData);
    } catch (e) {
      console.error("Login failed", e);
      throw new Error("Failed to store auth data securely");
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('sunnyAuthToken');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  if (loading) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;