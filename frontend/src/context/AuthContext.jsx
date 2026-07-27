import React, { createContext, useContext, useState } from 'react';
import { INITIAL_USER } from '../services/mockDataService';

const AuthContext = createContext();

const ROLE_USER_MAP = {
  'ADMIN': {
    name: 'Prakesh Gajendiran',
    email: 'admin@sksmartinvestments.com',
    roleDisplayName: 'Admin',
    employeeId: 'EMP001'
  },
  'MANAGER': {
    name: 'Karthik',
    email: 'karthik.manager@sksmartinvestments.com',
    roleDisplayName: 'Manager',
    employeeId: 'EMP002'
  },
  'TEAM_LEADER': {
    name: 'Rohan Mehta',
    email: 'tl.health@sksmartinvestments.com',
    roleDisplayName: 'Team Leader',
    employeeId: 'EMP003'
  },
  'STAFF': {
    name: 'Priya Nair',
    email: 'priya.advisor@sksmartinvestments.com',
    roleDisplayName: 'Staff Advisor',
    employeeId: 'EMP004'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);

  const switchRole = (newRole) => {
    const roleDetails = ROLE_USER_MAP[newRole] || ROLE_USER_MAP['STAFF'];
    setUser(prev => ({
      ...prev,
      role: newRole,
      name: roleDetails.name,
      email: roleDetails.email,
      roleDisplayName: roleDetails.roleDisplayName,
      employeeId: roleDetails.employeeId
    }));
  };

  const login = (roleCode, customUser) => {
    if (customUser) {
      setUser(customUser);
    } else {
      switchRole(roleCode || 'ADMIN');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, switchRole, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
