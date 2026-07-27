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

  const formatNameFromEmail = (emailStr) => {
    if (!emailStr || !emailStr.includes('@')) return 'User';
    const prefix = emailStr.split('@')[0];
    return prefix
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const updateUserProfile = (updatedFields) => {
    const updatedUser = {
      ...user,
      ...updatedFields
    };
    setUser(updatedUser);
    localStorage.setItem('crm_active_user', JSON.stringify(updatedUser));

    // Live synchronize MOCK_STAFF array
    const staffIdx = MOCK_STAFF.findIndex(
      s => (updatedUser.email && s.email.toLowerCase() === updatedUser.email.toLowerCase()) || s.id === updatedUser.id
    );
    if (staffIdx !== -1) {
      if (updatedFields.name) MOCK_STAFF[staffIdx].name = updatedFields.name;
      if (updatedFields.email) MOCK_STAFF[staffIdx].email = updatedFields.email;
      if (updatedFields.avatar) MOCK_STAFF[staffIdx].avatar = updatedFields.avatar;
    }
  };

  const loginWithFirebase = async (emailInput, password) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const mockUid = "usr_" + Math.random().toString(36).substring(2, 9);
    const mockToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZpcmViYXNlIn0." + btoa(JSON.stringify({ uid: mockUid, email: cleanEmail })) + ".mockSignature";

    localStorage.setItem('firebaseIdToken', mockToken);
    setIdToken(mockToken);

    const matchedStaff = MOCK_STAFF.find(
      s => s.email.toLowerCase() === cleanEmail || s.employeeId.toLowerCase() === cleanEmail
    );

    const displayName = matchedStaff 
      ? matchedStaff.name 
      : formatNameFromEmail(cleanEmail);

    const roleCode = matchedStaff 
      ? matchedStaff.roleCode 
      : (cleanEmail.includes('admin') ? 'SUPER_ADMIN' : cleanEmail.includes('manager') ? 'MANAGER' : 'EMPLOYEE');

    const roleDisplayName = matchedStaff 
      ? matchedStaff.role 
      : (roleCode === 'SUPER_ADMIN' ? 'Super Admin' : roleCode === 'MANAGER' ? 'Manager' : 'Employee Advisor');

    const activeUser = {
      id: matchedStaff ? matchedStaff.id : 'STF-' + Math.floor(100 + Math.random() * 900),
      employeeId: matchedStaff ? matchedStaff.employeeId : 'EMP-' + Math.floor(100 + Math.random() * 900),
      name: displayName,
      email: cleanEmail,
      role: roleCode,
      roleDisplayName: roleDisplayName,
      branch: matchedStaff ? matchedStaff.branch : 'Kanchipuram HQ',
      avatar: matchedStaff?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      permissions: ['ALL']
    };

    setUser(activeUser);
    localStorage.setItem('crm_active_user', JSON.stringify(activeUser));

    try {
      await registerUserBackend(mockUid, activeUser.name, activeUser.email);
      await checkFirstLoginBackend();
    } catch (e) {
      // Graceful fallback
    }

    return activeUser;
  };

  const registerWithFirebase = async (name, emailInput, password) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const mockUid = "usr_" + Math.random().toString(36).substring(2, 9);
    const mockToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZpcmViYXNlIn0." + btoa(JSON.stringify({ uid: mockUid, email: cleanEmail })) + ".mockSignature";

    localStorage.setItem('firebaseIdToken', mockToken);
    setIdToken(mockToken);

    const newUser = {
      id: 'STF-' + Math.floor(100 + Math.random() * 900),
      employeeId: 'EMP-NEW-' + Math.floor(100 + Math.random() * 900),
      name: name.trim() || formatNameFromEmail(cleanEmail),
      email: cleanEmail,
      role: 'USER',
      roleDisplayName: 'User',
      branch: 'Kanchipuram HQ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      permissions: ['VIEW_DASHBOARD']
    };

    setUser(newUser);
    localStorage.setItem('crm_active_user', JSON.stringify(newUser));

    try {
      await registerUserBackend(mockUid, newUser.name, cleanEmail);
    } catch (e) {
      // Graceful fallback
    }

    return newUser;
  };

  const switchRole = (roleCode) => {
    const matchedRole = MOCK_ROLES.find(r => r.id === roleCode);
    const matchedStaff = MOCK_STAFF.find(s => s.roleCode === roleCode);
    
    const updatedUser = {
      ...user,
      role: roleCode,
      roleDisplayName: matchedRole ? matchedRole.name : roleCode,
      name: matchedStaff ? matchedStaff.name : (matchedRole?.defaultName || user.name),
      email: matchedStaff ? matchedStaff.email : (matchedRole?.email || user.email)
    };
    setUser(updatedUser);
    localStorage.setItem('crm_active_user', JSON.stringify(updatedUser));
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
      updateUserProfile,
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
