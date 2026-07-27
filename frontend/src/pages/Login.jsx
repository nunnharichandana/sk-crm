import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COMPANY_INFO, MOCK_ROLES, MOCK_STAFF } from '../services/mockDataService';
import { Logo } from '../components/common/Logo';
import { Lock, Mail, ArrowRight, MapPin, Key } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@sksmartinvestments.com');
  const [password, setPassword] = useState('Password@123');
  const [selectedRole, setSelectedRole] = useState('ADMIN');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Typed Email & Password Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    
    // Find staff matching typed email or employee ID
    const matchedStaff = MOCK_STAFF.find(
      s => s.email.toLowerCase() === cleanEmail || s.employeeId.toLowerCase() === cleanEmail
    );

    if (matchedStaff) {
      // Log in as exact staff person
      login(matchedStaff.roleCode, {
        id: matchedStaff.id,
        employeeId: matchedStaff.employeeId,
        name: matchedStaff.name,
        email: matchedStaff.email,
        role: matchedStaff.roleCode,
        roleDisplayName: matchedStaff.role,
        branch: matchedStaff.branch,
        avatar: matchedStaff.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        permissions: ['ALL']
      });
    } else {
      // Fallback: Login with selected role
      login(selectedRole);
    }
    navigate('/dashboard');
  };

  const handleQuickRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrorMessage('');
    const matchedRole = MOCK_ROLES.find(r => r.id === roleId);
    if (matchedRole) {
      setEmail(matchedRole.email);
      setPassword(roleId === 'ADMIN' ? 'Password@123' : roleId === 'MANAGER' ? 'Manager@123' : roleId === 'TEAM_LEADER' ? 'Leader@123' : 'Advisor@123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E6091]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 relative z-10 animate-in fade-in duration-300">
        
        {/* Brand Header (Single Clean Display) */}
        <div className="text-center space-y-3">
          <Logo className="h-12 w-auto mx-auto justify-center" />
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
            <MapPin className="h-3 w-3 text-[#1E6091]" />
            <span>{COMPANY_INFO.location}</span>
          </div>
        </div>

        {/* 1-Click Role Switcher */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">1-Click Role Selection</label>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleQuickRoleSelect(r.id)}
                className={`p-2.5 rounded-xl border text-xs text-left transition cursor-pointer ${
                  selectedRole === r.id 
                    ? 'border-[#1E6091] bg-brand-50 text-[#1E6091] font-extrabold shadow-xs' 
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-semibold'
                }`}
              >
                <span className="block font-bold truncate">{r.name}</span>
                <span className="text-[10px] text-slate-400 block truncate">{r.defaultName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Login Email or Employee ID</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sksmartinvestments.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password@123"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-medium text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#1E6091] hover:bg-brand-700 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Sign In to CRM Portal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Credentials Directory Cheat Sheet */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] space-y-1.5">
          <div className="flex items-center space-x-1.5 text-slate-700 font-bold">
            <Key className="h-3.5 w-3.5 text-amber-500" />
            <span>Working Login Accounts:</span>
          </div>
          <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-600 font-mono">
            <div>• <strong>Admin:</strong> admin@sksmartinvestments.com / Password@123</div>
            <div>• <strong>Manager:</strong> karthik.manager@sksmartinvestments.com / Manager@123</div>
            <div>• <strong>Team Leader:</strong> tl.health@sksmartinvestments.com / Leader@123</div>
            <div>• <strong>Staff Advisor:</strong> priya.advisor@sksmartinvestments.com / Advisor@123</div>
          </div>
        </div>

        <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
          Official System • Kanchipuram Office • IRDA License: {COMPANY_INFO.irdaLicense}
        </div>

      </div>

    </div>
  );
};
