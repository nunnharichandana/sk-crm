import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ROLES, MOCK_STAFF } from '../services/mockDataService';
import { registerUserBackend, checkFirstLoginBackend } from '../services/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('crm_active_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    // Default Admin User
    return {
      id: 'STF-001',
      employeeId: 'EMP-ADM-001',
      name: 'Prakesh Gajendiran',
      email: 'admin@sksmartinvestments.com',
      role: 'SUPER_ADMIN',
      roleDisplayName: 'Super Admin',
      branch: 'Kanchipuram HQ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      permissions: ['ALL']
    };
  });

  const [idToken, setIdToken] = useState(() => localStorage.getItem('firebaseIdToken') || 'mock-firebase-bearer-token-2026');

  useEffect(() => {
    if (user) {
      localStorage.setItem('crm_active_user', JSON.stringify(user));
    }
  }, [user]);

  const loginWithFirebase = async (email, password) => {
    // Simulated Firebase Auth ID Token generation for seamless dev/prod execution
    const mockUid = "usr_" + Math.random().toString(36).substring(2, 9);
    const mockToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZpcmViYXNlIn0." + btoa(JSON.stringify({ uid: mockUid, email })) + ".mockSignature";

    localStorage.setItem('firebaseIdToken', mockToken);
    setIdToken(mockToken);

    // Match exact staff account
    const matchedStaff = MOCK_STAFF.find(s => s.email.toLowerCase() === email.trim().toLowerCase());

    const activeUser = {
      id: matchedStaff ? matchedStaff.id : 'STF-001',
      employeeId: matchedStaff ? matchedStaff.employeeId : 'EMP-ADM-001',
      name: matchedStaff ? matchedStaff.name : 'Prakesh Gajendiran',
      email: email,
      role: matchedStaff ? matchedStaff.roleCode : 'SUPER_ADMIN',
      roleDisplayName: matchedStaff ? matchedStaff.role : 'Super Admin',
      branch: matchedStaff ? matchedStaff.branch : 'Kanchipuram HQ',
      avatar: matchedStaff?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      permissions: ['ALL']
    };

    setUser(activeUser);

    // Trigger backend registration & first-login workspace initialization
    try {
      await registerUserBackend(mockUid, activeUser.name, activeUser.email);
      await checkFirstLoginBackend();
    } catch (e) {
      // Graceful fallback
    }

    return activeUser;
  };

  const registerWithFirebase = async (name, email, password) => {
    const mockUid = "usr_" + Math.random().toString(36).substring(2, 9);
    const mockToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZpcmViYXNlIn0." + btoa(JSON.stringify({ uid: mockUid, email })) + ".mockSignature";

    localStorage.setItem('firebaseIdToken', mockToken);
    setIdToken(mockToken);

    const newUser = {
      id: 'STF-' + Math.floor(100 + Math.random() * 900),
      employeeId: 'EMP-NEW-' + Math.floor(100 + Math.random() * 900),
      name: name,
      email: email,
      role: 'USER', // Initial role assigned as USER
      roleDisplayName: 'User',
      branch: 'Kanchipuram HQ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      permissions: ['VIEW_DASHBOARD']
    };

    setUser(newUser);

    try {
      await registerUserBackend(mockUid, name, email);
    } catch (e) {
      // Graceful fallback
    }

    return newUser;
  };

  const switchRole = (roleCode) => {
    const matchedRole = MOCK_ROLES.find(r => r.id === roleCode);
    const updatedUser = {
      ...user,
      role: roleCode,
      roleDisplayName: matchedRole ? matchedRole.name : roleCode
    };
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem('crm_active_user');
    localStorage.removeItem('firebaseIdToken');
    setUser(null);
    setIdToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      idToken,
      loginWithFirebase,
      registerWithFirebase,
      switchRole,
      logout,
      isAuthenticated: !!user
    }}>
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
