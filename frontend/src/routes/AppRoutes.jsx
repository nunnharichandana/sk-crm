import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Leads } from '../pages/Leads';
import { Followups } from '../pages/Followups';
import { Customers } from '../pages/Customers';
import { Policies } from '../pages/Policies';
import { Investments } from '../pages/Investments';
import { Claims } from '../pages/Claims';
import { Renewals } from '../pages/Renewals';
import { Staff } from '../pages/Staff';
import { Admin } from '../pages/Admin';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const currentRole = user?.role || 'STAFF';
  const isAllowed = allowedRoles.includes(currentRole);

  if (!isAllowed) {
    return (
      <MainLayout>
        <div className="p-8 max-w-lg mx-auto text-center space-y-4 mt-12 bg-white rounded-3xl border border-slate-200 shadow-xl">
          <div className="mx-auto h-16 w-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-500">
            Your logged-in account (<strong>{user?.name}</strong> • <strong>{user?.roleDisplayName || currentRole}</strong>) does not have administrative authorization to view this module. Only <strong>System Admins</strong> or authorized Managers can access this page.
          </p>
          <div className="pt-2">
            <Link to="/dashboard" className="px-5 py-2.5 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow inline-flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to My Dashboard</span>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return <MainLayout>{children}</MainLayout>;
};

export const AppRoutes = () => {
  const ALL_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF', 'USER'];
  const WORKER_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF'];
  const MID_MANAGEMENT_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER'];
  const MANAGEMENT_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'];
  const ADMIN_ONLY_ROLES = ['SUPER_ADMIN', 'ADMIN'];

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={ALL_ROLES}><Dashboard /></RoleProtectedRoute>} />
      <Route path="/leads" element={<RoleProtectedRoute allowedRoles={WORKER_ROLES}><Leads /></RoleProtectedRoute>} />
      <Route path="/followups" element={<RoleProtectedRoute allowedRoles={WORKER_ROLES}><Followups /></RoleProtectedRoute>} />
      <Route path="/customers" element={<RoleProtectedRoute allowedRoles={MID_MANAGEMENT_ROLES}><Customers /></RoleProtectedRoute>} />
      <Route path="/policies" element={<RoleProtectedRoute allowedRoles={WORKER_ROLES}><Policies /></RoleProtectedRoute>} />
      <Route path="/investments" element={<RoleProtectedRoute allowedRoles={MANAGEMENT_ROLES}><Investments /></RoleProtectedRoute>} />
      <Route path="/claims" element={<RoleProtectedRoute allowedRoles={WORKER_ROLES}><Claims /></RoleProtectedRoute>} />
      <Route path="/renewals" element={<RoleProtectedRoute allowedRoles={MID_MANAGEMENT_ROLES}><Renewals /></RoleProtectedRoute>} />
      <Route path="/staff" element={<RoleProtectedRoute allowedRoles={MANAGEMENT_ROLES}><Staff /></RoleProtectedRoute>} />
      <Route path="/reports" element={<RoleProtectedRoute allowedRoles={MANAGEMENT_ROLES}><Reports /></RoleProtectedRoute>} />
      <Route path="/admin" element={<RoleProtectedRoute allowedRoles={ADMIN_ONLY_ROLES}><Admin /></RoleProtectedRoute>} />
      <Route path="/settings" element={<RoleProtectedRoute allowedRoles={ALL_ROLES}><Settings /></RoleProtectedRoute>} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
