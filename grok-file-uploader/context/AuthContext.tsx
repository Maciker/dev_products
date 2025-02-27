import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  user: { id: number; username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      router.push('/dashboard');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};