'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  displayName: string;
  nicename: string;
  roles?: string[];
  capabilities?: Record<string, boolean>;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function WordPressAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      const response = await fetch('/api/auth/wordpress-validate');
      if (response.ok) {
        const data = await response.json();
        console.log('Auth validation response:', data);
        if (data.user) {
          console.log('Setting user with roles:', data.user.roles);
          setUser(data.user);
        }
      } else {
        console.log('Auth validation failed:', response.status);
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await fetch('/api/auth/wordpress-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    console.log('Login successful, user data:', data.user);
    console.log('User roles:', data.user.roles);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/wordpress-logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user state even if API call fails
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isLoading, 
        isAuthenticated: !!user,
        isAdmin: (() => {
          const isAdmin = !!user?.roles?.includes('administrator');
          console.log('isAdmin computed:', isAdmin, 'user roles:', user?.roles);
          return isAdmin;
        })()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within WordPressAuthProvider');
  }
  return context;
}
