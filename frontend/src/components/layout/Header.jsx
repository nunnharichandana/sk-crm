import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ROLES, MOCK_LEADS, MOCK_POLICIES, MOCK_CLAIMS } from '../../services/mockDataService';
import { Logo } from '../common/Logo';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  UserCheck, 
  LogOut, 
  User,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchRef = useRef(null);

  // Live Search Logic across Leads, Policies, and Claims
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const term = searchTerm.toLowerCase();

    const matchingLeads = MOCK_LEADS.filter(l => 
      l.customerName.toLowerCase().includes(term) || 
      l.id.toLowerCase().includes(term) ||
      l.mobileNumber.includes(term)
    ).map(l => ({ type: 'LEAD', title: `${l.id} - ${l.customerName}`, sub: `Lead • ${l.insuranceType}`, link: '/leads' }));

    const matchingPolicies = MOCK_POLICIES.filter(p => 
      p.customerName.toLowerCase().includes(term) || 
      p.id.toLowerCase().includes(term)
    ).map(p => ({ type: 'POLICY', title: `${p.id} - ${p.customerName}`, sub: `Policy • ${p.insuranceCompany}`, link: '/policies' }));

    const matchingClaims = MOCK_CLAIMS.filter(c => 
      c.customerName.toLowerCase().includes(term) || 
      c.id.toLowerCase().includes(term)
    ).map(c => ({ type: 'CLAIM', title: `${c.id} - ${c.customerName}`, sub: `Claim • ${c.hospitalName}`, link: '/claims' }));

    const combined = [...matchingLeads, ...matchingPolicies, ...matchingClaims];
    setSearchResults(combined);
    setShowSearchDropdown(true);
  }, [searchTerm]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity Logo (Single clean display) */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Logo className="h-10 w-auto" />
        </div>

        {/* Center: Live Interactive Global Search Bar */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search Customer, Policy #, Lead ID, Mobile or Claim..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim() && setShowSearchDropdown(true)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#1E6091] text-xs transition outline-none font-medium text-slate-800"
            />
          </div>

          {/* Live Search Results Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-slate-600 uppercase">Search Results ({searchResults.length})</span>
                <span className="text-[10px] text-slate-400">Click result to view</span>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <div 
                      key={i}
                      onClick={() => {
                        navigate(res.link);
                        setShowSearchDropdown(false);
                        setSearchTerm('');
                      }}
                      className="p-3 hover:bg-brand-50/50 cursor-pointer transition flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{res.title}</span>
                        <span className="text-[10px] text-slate-500">{res.sub}</span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-brand-600" />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching records found for "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Single Location Badge, Role Switcher & User Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Location Badge (Kanchipuram Office) */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            <MapPin className="h-3.5 w-3.5 text-[#1E6091]" />
            <span>Kanchipuram Office</span>
          </div>

          {/* Quick Role Switcher (Admin, Manager, Team Leader, Staff Advisor) */}
          <div className="relative" onMouseLeave={() => setShowRoleDropdown(false)}>
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              onMouseEnter={() => setShowRoleDropdown(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-[#1E6091] hover:bg-brand-100 transition text-xs font-bold shadow-xs"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Role: {user?.roleDisplayName || 'Admin'}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-1 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Switch Account Role</p>
                </div>
                {MOCK_ROLES.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchRole(r.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-brand-50 transition flex items-center justify-between ${
                      user?.role === r.id ? 'bg-brand-50 text-[#1E6091] font-extrabold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block font-bold">{r.name}</span>
                      <span className="text-[10px] text-slate-400 block">{r.defaultName}</span>
                    </div>
                    {user?.role === r.id && <span className="h-2 w-2 rounded-full bg-[#1E6091]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Menu */}
          <div className="relative" onMouseLeave={() => setShowProfileDropdown(false)}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              onMouseEnter={() => setShowProfileDropdown(true)}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} 
                alt="Profile" 
                className="h-8 w-8 rounded-full border-2 border-[#1E6091] object-cover"
              />
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">{user?.name}</span>
                <span className="text-[10px] text-slate-500 block leading-tight">{user?.roleDisplayName}</span>
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  <span className="mt-1 badge badge-blue text-[10px]">{user?.roleDisplayName}</span>
                </div>

                <button 
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition flex items-center space-x-2"
                >
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  <span>Profile Settings</span>
                </button>

                <button 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition flex items-center space-x-2 font-bold border-t border-slate-100 mt-1"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
