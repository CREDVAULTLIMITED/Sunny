import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('sunnyAuthToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } catch (e) {
          console.error("Failed to parse user data", e);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = (token, userData) => {
    localStorage.setItem('sunnyAuthToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('sunnyAuthToken');
    localStorage.removeItem('user');
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;