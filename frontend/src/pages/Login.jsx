import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@sksmartinsurance.com');
  const [password, setPassword] = useState('Password@123');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  const handleQuickLogin = (roleId, demoEmail) => {
    switchRole(roleId);
    setEmail(demoEmail);
    login(demoEmail, 'Password@123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Graphic elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-premium border border-slate-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden z-10">
        
        {/* Left Info Panel */}
        <div className="bg-[#1E6091] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">SK SMART INSURANCE</h1>
                <p className="text-xs text-brand-100/90 font-medium">Enterprise CRM System</p>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight leading-snug">
                Powering Next-Gen Insurance Operations
              </h2>
              <p className="text-xs text-brand-100/80 leading-relaxed">
                Streamlined portal for Admin, Manager, Team Leader, and Staff Advisors.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {[
                'JWT Secured Authorization',
                'Executive Analytics & Standard Linear Graphs',
                'Automated Renewal & WhatsApp Reminders',
                'Audit Logging & Compliance Ready'
              ].map((feat, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-brand-50">
                  <CheckCircle2 className="h-4 w-4 text-brand-200" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 text-[11px] text-brand-200 border-t border-white/10">
            © 2026 SK Smart Insurance Services. All rights reserved.
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Sign in to CRM</h3>
              <p className="text-xs text-slate-500 mt-1">Select account role or enter employee credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 focus:border-brand-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 focus:border-brand-600 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded text-brand-600 border-slate-300 focus:ring-brand-500" />
                  <span>Remember session</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to official email!"); }} className="text-brand-600 font-bold hover:underline">Forgot password?</a>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <span>Log In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Restricted 4 Role Quick Launch Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Login as:</p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button 
                  onClick={() => handleQuickLogin('ADMIN', 'admin@sksmartinsurance.com')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 font-semibold text-left transition"
                >
                  ⚙️ Admin
                </button>
                <button 
                  onClick={() => handleQuickLogin('MANAGER', 'bm.mumbai@sksmartinsurance.com')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 font-semibold text-left transition"
                >
                  🏢 Manager
                </button>
                <button 
                  onClick={() => handleQuickLogin('TEAM_LEADER', 'tl.health@sksmartinsurance.com')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 font-semibold text-left transition"
                >
                  👥 Team Leader
                </button>
                <button 
                  onClick={() => handleQuickLogin('STAFF', 'priya.advisor@sksmartinsurance.com')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 font-semibold text-left transition"
                >
                  👤 Staff Advisor
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
