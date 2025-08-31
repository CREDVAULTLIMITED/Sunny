'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = Cookies.get('auth_token');
        if (token) {
          // Verify token validity
          try {
            const decoded = jwtDecode<{ exp: number } & User>(token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
              // Token expired
              Cookies.remove('auth_token');
              setUser(null);
            } else {
              // Set user from token
              setUser({
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role,
                permissions: decoded.permissions || [],
              });
              
              // Set auth header for all requests
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            // Invalid token
            Cookies.remove('auth_token');
            setUser(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token in cookie
      Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict' });
      
      // Set auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user state
      setUser(user);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove token from cookie
    Cookies.remove('auth_token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user state
    setUser(null);
    
    // Redirect to login
    router.push('/login');
  };

  const checkPermission = (permission: string) => {
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.role === 'admin') return true;
    
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login,
      logout,
      checkPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}