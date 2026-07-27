import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, MOCK_ROLES } from '../services/mockDataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sk_crm_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    localStorage.setItem('sk_crm_user', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {
    // Demo login simulation
    const updatedUser = {
      ...user,
      email: email || user.email,
      lastLogin: new Date().toISOString()
    };
    setUser(updatedUser);
    setIsAuthenticated(true);
    return { success: true, user: updatedUser };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (roleId) => {
    const foundRole = MOCK_ROLES.find(r => r.id === roleId);
    if (foundRole) {
      setUser(prev => ({
        ...prev,
        role: roleId,
        roleDisplayName: foundRole.name
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole, roles: MOCK_ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
