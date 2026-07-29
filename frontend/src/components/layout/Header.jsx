import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  MOCK_ROLES, 
  MOCK_LEADS, 
  MOCK_POLICIES, 
  MOCK_CLAIMS, 
  MOCK_STAFF, 
  MOCK_FOLLOWUPS 
} from '../../services/mockDataService';
import { Logo } from '../common/Logo';
import { 
  Search, 
  ChevronDown, 
  UserCheck, 
  LogOut, 
  User,
  ExternalLink,
  X,
  FileText,
  Briefcase,
  ShieldAlert,
  PhoneCall,
  Award,
  Users,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_INVESTMENTS_LIST = [
  { id: 'INV-2026-001', customerName: 'Arjun Singhania', type: 'SIP', amount: 50000, status: 'ACTIVE' },
  { id: 'INV-2026-002', customerName: 'Deepika Padukone', type: 'MUTUAL_FUND', amount: 500000, status: 'PENDING' },
  { id: 'INV-2026-003', customerName: 'Rahul Dravid', type: 'FIXED_DEPOSIT', amount: 1000000, status: 'APPROVED' },
  { id: 'INV-2026-004', customerName: 'Sania Mirza', type: 'REAL_ESTATE', amount: 4500000, status: 'ACTIVE' }
];

export const Header = () => {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorizedResults, setCategorizedResults] = useState({
    leads: [],
    policies: [],
    claims: [],
    investments: [],
    staff: [],
    followups: [],
    totalCount: 0
  });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchRef = useRef(null);
  const roleRef = useRef(null);
  const profileRef = useRef(null);

  // Universal Search across ENTIRE WEBSITE (8 Modules)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setCategorizedResults({ leads: [], policies: [], claims: [], investments: [], staff: [], followups: [], totalCount: 0 });
      setShowSearchDropdown(false);
      return;
    }

    const term = searchTerm.toLowerCase().trim();

    // 1. Leads
    const matchingLeads = MOCK_LEADS.filter(l => 
      l.customerName.toLowerCase().includes(term) || 
      l.id.toLowerCase().includes(term) ||
      l.mobileNumber.includes(term) ||
      l.insuranceType.toLowerCase().includes(term)
    );

    // 2. Policies
    const matchingPolicies = MOCK_POLICIES.filter(p => 
      p.customerName.toLowerCase().includes(term) || 
      p.id.toLowerCase().includes(term) ||
      p.insuranceCompany.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term)
    );

    // 3. Claims
    const matchingClaims = MOCK_CLAIMS.filter(c => 
      c.customerName.toLowerCase().includes(term) || 
      c.id.toLowerCase().includes(term) ||
      c.policyNumber.toLowerCase().includes(term) ||
      c.hospitalName.toLowerCase().includes(term)
    );

    // 4. Investments
    const matchingInvestments = MOCK_INVESTMENTS_LIST.filter(inv => 
      inv.customerName.toLowerCase().includes(term) || 
      inv.id.toLowerCase().includes(term) ||
      inv.type.toLowerCase().includes(term)
    );

    // 5. Staff Advisors & Employees
    const matchingStaff = MOCK_STAFF.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.employeeId.toLowerCase().includes(term) ||
      s.role.toLowerCase().includes(term)
    );

    // 6. Follow-ups
    const matchingFollowups = MOCK_FOLLOWUPS.filter(f =>
      f.customerName.toLowerCase().includes(term) ||
      f.id.toLowerCase().includes(term) ||
      f.remarks.toLowerCase().includes(term)
    );

    const totalCount = matchingLeads.length + matchingPolicies.length + matchingClaims.length + matchingInvestments.length + matchingStaff.length + matchingFollowups.length;

    setCategorizedResults({
      leads: matchingLeads,
      policies: matchingPolicies,
      claims: matchingClaims,
      investments: matchingInvestments,
      staff: matchingStaff,
      followups: matchingFollowups,
      totalCount
    });

    setShowSearchDropdown(true);
  }, [searchTerm]);

  const handleNavigateToResult = (path) => {
    setShowSearchDropdown(false);
    setSearchTerm('');
    navigate(path);
  };

  // Handle Enter Key press on search input
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { leads, policies, claims, investments, staff, followups } = categorizedResults;

      if (leads.length > 0) {
        handleNavigateToResult(`/leads?search=${encodeURIComponent(searchTerm)}`);
      } else if (policies.length > 0) {
        handleNavigateToResult(`/policies?search=${encodeURIComponent(searchTerm)}`);
      } else if (investments.length > 0) {
        handleNavigateToResult(`/investments?search=${encodeURIComponent(searchTerm)}`);
      } else if (claims.length > 0) {
        handleNavigateToResult(`/claims?search=${encodeURIComponent(searchTerm)}`);
      } else if (staff.length > 0) {
        handleNavigateToResult(`/staff?search=${encodeURIComponent(searchTerm)}`);
      } else if (followups.length > 0) {
        handleNavigateToResult(`/followups?search=${encodeURIComponent(searchTerm)}`);
      } else {
        alert(`No records found across the website for "${searchTerm}".`);
      }
    }
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setShowRoleDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Logo className="h-10 w-auto" />
        </div>

        {/* Center: Universal Website Search Bar */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search across entire website (Leads, Policies, Claims, Staff...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => searchTerm.trim() && setShowSearchDropdown(true)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#1E6091] text-xs transition outline-none font-medium text-slate-800"
            />
            {searchTerm && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setCategorizedResults({ leads: [], policies: [], claims: [], investments: [], staff: [], followups: [], totalCount: 0 });
                  setShowSearchDropdown(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Live Multi-Module Search Results Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150 max-h-[80vh] flex flex-col">
              
              <div className="px-4 py-2.5 bg-[#1E6091] text-white flex items-center justify-between shrink-0">
                <span className="text-[11px] font-extrabold uppercase flex items-center space-x-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>Universal Website Search ({categorizedResults.totalCount} Matches)</span>
                </span>
                <span className="text-[10px] text-blue-100">Click result to open page</span>
              </div>

              <div className="overflow-y-auto divide-y divide-slate-100 p-2 space-y-3">
                
                {categorizedResults.totalCount === 0 && (
                  <div className="p-6 text-center text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">No records found for "{searchTerm}"</p>
                    <p className="text-[11px] text-slate-400">Try searching by Customer Name, Policy #, Lead ID, Hospital, or Staff Name</p>
                  </div>
                )}

                {/* 1. LEADS MATCHES */}
                {categorizedResults.leads.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-3 py-1 bg-brand-50 rounded-lg text-[10px] font-extrabold text-[#1E6091] uppercase flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>Lead Management ({categorizedResults.leads.length})</span>
                    </div>
                    {categorizedResults.leads.map(ld => (
                      <div
                        key={ld.id}
                        onClick={() => handleNavigateToResult(`/leads`)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group border border-transparent hover:border-slate-200"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-[#1E6091]">{ld.customerName} ({ld.id})</span>
                          <span className="text-[10px] text-slate-500">Lead • {ld.insuranceType} • ₹{ld.estimatedPremium.toLocaleString()}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1E6091]" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. POLICIES MATCHES */}
                {categorizedResults.policies.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-3 py-1 bg-emerald-50 rounded-lg text-[10px] font-extrabold text-emerald-700 uppercase flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      <span>Policies Register ({categorizedResults.policies.length})</span>
                    </div>
                    {categorizedResults.policies.map(pol => (
                      <div
                        key={pol.id}
                        onClick={() => handleNavigateToResult(`/policies`)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group border border-transparent hover:border-slate-200"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-emerald-700">{pol.id} — {pol.customerName}</span>
                          <span className="text-[10px] text-slate-500">Policy • {pol.insuranceCompany} • ₹{pol.grossPremium.toLocaleString()}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-700" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. INVESTMENTS MATCHES */}
                {categorizedResults.investments.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-3 py-1 bg-purple-50 rounded-lg text-[10px] font-extrabold text-purple-700 uppercase flex items-center space-x-1">
                      <Briefcase className="h-3 w-3" />
                      <span>Investments Register ({categorizedResults.investments.length})</span>
                    </div>
                    {categorizedResults.investments.map(inv => (
                      <div
                        key={inv.id}
                        onClick={() => handleNavigateToResult(`/investments`)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group border border-transparent hover:border-slate-200"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-purple-700">{inv.id} — {inv.customerName}</span>
                          <span className="text-[10px] text-slate-500">Investment • {inv.type} • ₹{inv.amount.toLocaleString()}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-purple-700" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. CLAIMS MATCHES */}
                {categorizedResults.claims.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-3 py-1 bg-rose-50 rounded-lg text-[10px] font-extrabold text-rose-700 uppercase flex items-center space-x-1">
                      <ShieldAlert className="h-3 w-3" />
                      <span>Claims Module ({categorizedResults.claims.length})</span>
                    </div>
                    {categorizedResults.claims.map(clm => (
                      <div
                        key={clm.id}
                        onClick={() => handleNavigateToResult(`/claims`)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group border border-transparent hover:border-slate-200"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-rose-700">{clm.id} — {clm.customerName}</span>
                          <span className="text-[10px] text-slate-500">Claim • {clm.hospitalName} • Status: {clm.status}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-700" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. STAFF MATCHES */}
                {categorizedResults.staff.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-3 py-1 bg-amber-50 rounded-lg text-[10px] font-extrabold text-amber-700 uppercase flex items-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>Staff Advisors ({categorizedResults.staff.length})</span>
                    </div>
                    {categorizedResults.staff.map(st => (
                      <div
                        key={st.id}
                        onClick={() => handleNavigateToResult(`/staff`)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group border border-transparent hover:border-slate-200"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-amber-700">{st.name} ({st.employeeId})</span>
                          <span className="text-[10px] text-slate-500">Staff • {st.role} • {st.email}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-700" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. FOLLOWUPS MATCHES */}
                {categorizedResults.followups.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-3 py-1 bg-blue-50 rounded-lg text-[10px] font-extrabold text-blue-700 uppercase flex items-center space-x-1">
                      <PhoneCall className="h-3 w-3" />
                      <span>Follow-ups & Calendar ({categorizedResults.followups.length})</span>
                    </div>
                    {categorizedResults.followups.map(fl => (
                      <div
                        key={fl.id}
                        onClick={() => handleNavigateToResult(`/followups`)}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group border border-transparent hover:border-slate-200"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-blue-700">{fl.id} — {fl.customerName}</span>
                          <span className="text-[10px] text-slate-500">Follow-up • {fl.remarks}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-700" />
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Role Switcher & User Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Role Switcher Button */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-brand-50 border border-brand-200 text-[#1E6091] hover:bg-brand-100 transition text-xs font-bold shadow-xs cursor-pointer"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Role: {user?.roleDisplayName || 'Admin'}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
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
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-brand-50 transition flex items-center justify-between cursor-pointer ${
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
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200"
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
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
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
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition flex items-center space-x-2 cursor-pointer font-bold"
                >
                  <User className="h-4 w-4 text-[#1E6091]" />
                  <span>Profile Settings</span>
                </button>

                <button 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition flex items-center space-x-2 font-bold border-t border-slate-100 mt-1 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
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
