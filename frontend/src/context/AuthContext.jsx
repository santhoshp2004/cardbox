import React, { createContext, useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('cardbox_user');
    const token = localStorage.getItem('cardbox_token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        setError(null);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('cardbox_user');
        localStorage.removeItem('cardbox_token');
        setError('Session corrupted. Please login again.');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    try {
      localStorage.setItem('cardbox_user', JSON.stringify(userData));
      localStorage.setItem('cardbox_token', token);
      setUser(userData);
      setError(null);
    } catch (e) {
      console.error('Failed to save auth data:', e);
      setError('Failed to save login information.');
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('cardbox_user');
      localStorage.removeItem('cardbox_token');
      setUser(null);
      setError(null);
    } catch (e) {
      console.error('Failed to clear auth data:', e);
    }
  };

  const updateUser = (userData) => {
    try {
      localStorage.setItem('cardbox_user', JSON.stringify(userData));
      setUser(userData);
      setError(null);
    } catch (e) {
      console.error('Failed to update user:', e);
      setError('Failed to update user information.');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    error,
    clearError,
    isAuthenticated: !!user,
    API_URL: API_CONFIG.BASE_URL,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

