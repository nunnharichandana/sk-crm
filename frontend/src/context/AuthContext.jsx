import React, { createContext, useContext, useState } from 'react';
import { INITIAL_USER } from '../services/mockDataService';

const AuthContext = createContext();

const ROLE_USER_MAP = {
  'ADMIN': {
    name: 'Prakash Gajendran',
    email: 'admin@sksmartinvestments.com',
    roleDisplayName: 'Admin',
    employeeId: 'EMP001'
  },
  'MANAGER': {
    name: 'Ramesh K.',
    email: 'manager.kanchipuram@sksmartinvestments.com',
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
    setUser({
      ...user,
      role: newRole,
      name: roleDetails.name,
      email: roleDetails.email,
      roleDisplayName: roleDetails.roleDisplayName,
      employeeId: roleDetails.employeeId
    });
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, switchRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
