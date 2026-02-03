import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'popx_session';
const USERS_KEY = 'popx_users';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize user from stored session
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to parse session', error);
      return null;
    }
  });

  const signup = (userData: User): boolean => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      
      // Check if user already exists
      if (users.some(u => u.email === userData.email)) {
        return false;
      }

      const newUser: User = {
        ...userData,
        avatarUrl: userData.avatarUrl || "/assets/Ellipse114@2x.png",
        bio:
          userData.bio ||
          "Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam",
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Auto login after signup
      setUser(newUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup failed', error);
      return false;
    }
  };

  const login = (email: string, password: string): boolean => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      
      // Update session
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      
      // Update persistent user record
      try {
        const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const newUsers = users.map(u => u.email === prev.email ? updated : u);
        localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
      } catch (error) {
        console.error('Failed to update user record', error);
      }
      
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};