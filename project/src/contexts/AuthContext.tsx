import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      full_name: email.split('@')[0],
      is_admin: email === 'admin@ecostore.com'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      is_admin: false
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};