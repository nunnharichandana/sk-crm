import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_STAFF } from '../services/mockDataService';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@sksmartinvestments.com');
  const [password, setPassword] = useState('Password@123');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    const matchedStaff = MOCK_STAFF.find(
      s => s.email.toLowerCase() === cleanEmail || s.employeeId.toLowerCase() === cleanEmail
    );

    if (matchedStaff) {
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
      login('ADMIN');
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E6091]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 relative z-10 animate-in fade-in duration-300">
        
        {/* Top Logo (Flush at the starting top with zero top padding) */}
        <div className="pt-0">
          <div className="flex items-center space-x-3 select-none justify-center">
            <img 
              src="/logo.jpg" 
              alt="SK Smart Investments Logo" 
              className="h-14 w-auto object-contain rounded-xl shadow-xs"
            />
            <div>
              <span className="text-base font-black text-slate-900 tracking-tight leading-none uppercase block">
                SK SMART INVESTMENTS
              </span>
              <span className="text-[9px] font-extrabold text-[#1E6091] tracking-wider uppercase block mt-1">
                INSURANCE AND INVESTMENTS SPECIALIST
              </span>
            </div>
          </div>
        </div>

        {/* Clean Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs pt-2">
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email ID</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email ID..."
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
                placeholder="Enter your password..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-medium text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#1E6091] hover:bg-brand-700 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer mt-2"
          >
            <span>Sign In to CRM Portal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
