import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COMPANY_INFO, MOCK_ROLES } from '../services/mockDataService';
import { Logo } from '../components/common/Logo';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, MapPin } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@sksmartinvestments.com');
  const [password, setPassword] = useState('Password@123');
  const [selectedRole, setSelectedRole] = useState('ADMIN');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate('/dashboard');
  };

  const handleQuickRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const matchedRole = MOCK_ROLES.find(r => r.id === roleId);
    if (matchedRole) {
      setEmail(matchedRole.email);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Dynamic Mild Blue Background Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E6091]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 relative z-10 animate-in fade-in duration-300">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Logo className="h-12 w-auto mx-auto" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-2">
            {COMPANY_INFO.name}
          </h2>
          <p className="text-xs font-bold text-[#1E6091] uppercase tracking-wider">
            {COMPANY_INFO.tagline}
          </p>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
            <MapPin className="h-3 w-3 text-[#1E6091]" />
            <span>{COMPANY_INFO.location}</span>
          </div>
        </div>

        {/* Quick Role Switch Buttons */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Select Account Portal Role</label>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleQuickRoleSelect(r.id)}
                className={`p-2.5 rounded-xl border text-xs text-left transition ${
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
          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-medium"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#1E6091] hover:bg-brand-700 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center space-x-2"
          >
            <span>Sign In to CRM Portal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
          Official System • Kanchipuram Office • IRDA License: {COMPANY_INFO.irdaLicense}
        </div>

      </div>

    </div>
  );
};
