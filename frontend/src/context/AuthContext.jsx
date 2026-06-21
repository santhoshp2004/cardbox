import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('cardbox_user');
    const token = localStorage.getItem('cardbox_token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('cardbox_user');
        localStorage.removeItem('cardbox_token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('cardbox_user', JSON.stringify(userData));
    localStorage.setItem('cardbox_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('cardbox_user');
    localStorage.removeItem('cardbox_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
