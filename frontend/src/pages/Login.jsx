import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, UserPlus, X, User } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { loginWithFirebase, registerWithFirebase } = useAuth();

  const [email, setEmail] = useState('admin@sksmartinvestments.com');
  const [password, setPassword] = useState('Password@123');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await loginWithFirebase(email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithFirebase(regName, regEmail, regPassword);
      setShowRegisterModal(false);
      alert(`Account created successfully! Status set to ACTIVE with role USER.`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E6091]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 relative z-10 animate-in fade-in duration-300">
        
        {/* Top Logo */}
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
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {errorMessage}
            </div>
          )}

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
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Register New Account Link */}
        <div className="pt-2 text-center border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowRegisterModal(true)}
            className="text-xs font-bold text-[#1E6091] hover:underline inline-flex items-center space-x-1 cursor-pointer"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>New User? Register Account (POST /users/register)</span>
          </button>
        </div>

      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <UserPlus className="h-4 w-4 text-amber-300" />
                <span>Register Account</span>
              </h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email ID</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="ramesh@sksmartinvestments.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Set account password..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Note: Initial role is assigned as <strong>USER</strong> with status <strong>ACTIVE</strong>. Admin assigns final role.
              </p>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E6091] text-white font-bold shadow"
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
