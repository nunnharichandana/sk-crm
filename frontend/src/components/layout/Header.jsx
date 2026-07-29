import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ROLES, MOCK_LEADS, MOCK_POLICIES, MOCK_CLAIMS, MOCK_STAFF } from '../../services/mockDataService';
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
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  IndianRupee,
  Building2,
  Calendar
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

  // Full Rich Search Detail Modal State
  const [activeCustomerDetail, setActiveCustomerDetail] = useState(null);

  const searchRef = useRef(null);
  const roleRef = useRef(null);
  const profileRef = useRef(null);

  // Live Multi-Entity Search Logic (Leads, Policies, Claims, Staff)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const term = searchTerm.toLowerCase().trim();

    // Match Leads
    const matchingLeads = MOCK_LEADS.filter(l => 
      l.customerName.toLowerCase().includes(term) || 
      l.id.toLowerCase().includes(term) ||
      l.mobileNumber.includes(term) ||
      l.email.toLowerCase().includes(term) ||
      l.insuranceType.toLowerCase().includes(term)
    );

    // Match Policies
    const matchingPolicies = MOCK_POLICIES.filter(p => 
      p.customerName.toLowerCase().includes(term) || 
      p.id.toLowerCase().includes(term) ||
      p.insuranceCompany.toLowerCase().includes(term)
    );

    // Match Claims
    const matchingClaims = MOCK_CLAIMS.filter(c => 
      c.customerName.toLowerCase().includes(term) || 
      c.id.toLowerCase().includes(term) ||
      c.policyNumber.toLowerCase().includes(term) ||
      c.hospitalName.toLowerCase().includes(term)
    );

    // Build unique search result items
    const combined = [];

    matchingLeads.forEach(l => {
      combined.push({
        id: l.id,
        name: l.customerName,
        type: 'LEAD',
        title: `${l.customerName} (${l.id})`,
        sub: `Lead • ${l.insuranceType} • ₹${l.estimatedPremium.toLocaleString()}`,
        mobile: l.mobileNumber,
        email: l.email,
        city: l.city,
        leadObj: l,
        policiesObj: matchingPolicies.filter(p => p.customerName.toLowerCase() === l.customerName.toLowerCase()),
        claimsObj: matchingClaims.filter(c => c.customerName.toLowerCase() === l.customerName.toLowerCase()),
        link: '/leads'
      });
    });

    matchingPolicies.forEach(p => {
      if (!combined.some(c => c.name.toLowerCase() === p.customerName.toLowerCase())) {
        combined.push({
          id: p.id,
          name: p.customerName,
          type: 'POLICY',
          title: `${p.customerName} (${p.id})`,
          sub: `Policy • ${p.insuranceCompany} • ₹${p.grossPremium.toLocaleString()}`,
          mobile: '+91 98423 11223',
          email: p.customerName.toLowerCase().replace(' ', '.') + '@gmail.com',
          city: 'Kanchipuram',
          leadObj: null,
          policiesObj: [p],
          claimsObj: matchingClaims.filter(c => c.customerName.toLowerCase() === p.customerName.toLowerCase()),
          link: '/policies'
        });
      }
    });

    setSearchResults(combined);
    setShowSearchDropdown(true);
  }, [searchTerm]);

  const openFullCustomerDetail = (item) => {
    setShowSearchDropdown(false);
    setActiveCustomerDetail({
      name: item.name,
      code: item.id,
      mobile: item.mobile || '+91 98423 11223',
      email: item.email || `${item.name.toLowerCase().replace(' ', '.')}@gmail.com`,
      city: item.city || 'Kanchipuram, Tamil Nadu',
      pan: 'ABCDE' + Math.floor(1000 + Math.random() * 9000) + 'F',
      aadhaar: 'XXXX-XXXX-' + Math.floor(1000 + Math.random() * 9000),
      kycStatus: 'VERIFIED',
      advisor: 'Priya Nair',
      leads: item.leadObj ? [item.leadObj] : MOCK_LEADS.filter(l => l.customerName.toLowerCase().includes(item.name.toLowerCase())),
      policies: item.policiesObj && item.policiesObj.length ? item.policiesObj : MOCK_POLICIES.filter(p => p.customerName.toLowerCase().includes(item.name.toLowerCase())),
      claims: item.claimsObj && item.claimsObj.length ? item.claimsObj : MOCK_CLAIMS.filter(c => c.customerName.toLowerCase().includes(item.name.toLowerCase())),
      investments: [
        { id: 'INV-2026-901', type: 'SIP Mutual Fund', amount: 50000, rate: '14.5%', status: 'ACTIVE' },
        { id: 'INV-2026-902', type: 'Fixed Deposit', amount: 200000, rate: '7.8%', status: 'APPROVED' }
      ]
    });
  };

  // Handle Enter Key press on search input
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        openFullCustomerDetail(searchResults[0]);
      } else {
        alert(`No matching records found for "${searchTerm}".`);
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

        {/* Center: Robust Live Interactive Global Search Bar */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search Customer Name, Policy #, Lead ID, Mobile or Claim..."
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
                  setSearchResults([]);
                  setShowSearchDropdown(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Live Search Results Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2.5 bg-[#1E6091] text-white flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase">Search Results ({searchResults.length})</span>
                <span className="text-[10px] text-blue-100">Click result for Full 360° Info</span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <div 
                      key={i}
                      onClick={() => openFullCustomerDetail(res)}
                      className="p-3 hover:bg-brand-50/60 cursor-pointer transition flex items-center justify-between text-xs group"
                    >
                      <div>
                        <span className="font-extrabold text-slate-900 block group-hover:text-[#1E6091] transition">{res.title}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{res.sub}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-brand-50 text-[#1E6091] font-bold text-[10px]">
                        <Eye className="h-3 w-3" />
                        <span>View All Info</span>
                      </div>
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

      {/* FULL COMPREHENSIVE CUSTOMER SEARCH DETAIL MODAL */}
      {activeCustomerDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                  <UserCheck className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">{activeCustomerDetail.name}</h3>
                  <p className="text-xs text-blue-100">Customer Code: {activeCustomerDetail.code} • Kanchipuram Office</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCustomerDetail(null)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs">
              
              {/* Profile Card & KYC Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile & Contact</span>
                  <span className="font-extrabold text-slate-900 flex items-center space-x-1 mt-0.5">
                    <Phone className="h-3.5 w-3.5 text-[#1E6091]" />
                    <span>{activeCustomerDetail.mobile}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</span>
                  <span className="font-bold text-slate-800 flex items-center space-x-1 mt-0.5 truncate">
                    <Mail className="h-3.5 w-3.5 text-[#1E6091]" />
                    <span>{activeCustomerDetail.email}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">KYC Verification Status</span>
                  <span className="badge badge-green font-extrabold flex items-center space-x-1 mt-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{activeCustomerDetail.kycStatus}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">PAN Number</span>
                  <span className="font-mono font-bold text-slate-900">{activeCustomerDetail.pan}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Aadhaar Card #</span>
                  <span className="font-mono font-bold text-slate-900">{activeCustomerDetail.aadhaar}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Advisor</span>
                  <span className="font-bold text-[#1E6091]">{activeCustomerDetail.advisor}</span>
                </div>
              </div>

              {/* SECTION 1: Active Leads */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <FileText className="h-4 w-4 text-[#1E6091]" />
                  <span>Leads & Inquiries ({activeCustomerDetail.leads.length})</span>
                </h4>

                {activeCustomerDetail.leads.length > 0 ? (
                  <div className="space-y-2">
                    {activeCustomerDetail.leads.map((ld, lIdx) => (
                      <div key={lIdx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-[#1E6091] block">{ld.id} — {ld.insuranceType || ld.category}</span>
                          <span className="text-slate-500">Est. Premium: <strong>₹{(ld.estimatedPremium || 35000).toLocaleString()}</strong> • Score: <strong>{ld.leadScore || 85}</strong></span>
                        </div>
                        <span className="badge badge-blue font-bold">{ld.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No active lead inquiries found.</p>
                )}
              </div>

              {/* SECTION 2: Active Policies */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  <span>Policies Portfolio ({activeCustomerDetail.policies.length})</span>
                </h4>

                {activeCustomerDetail.policies.length > 0 ? (
                  <div className="space-y-2">
                    {activeCustomerDetail.policies.map((pol, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/80 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-emerald-800 block">{pol.id} — {pol.insuranceCompany}</span>
                          <span className="text-slate-600">Sum Insured: <strong>₹{pol.sumInsured.toLocaleString()}</strong> • Gross Premium: <strong>₹{pol.grossPremium.toLocaleString()}</strong></span>
                        </div>
                        <span className="badge badge-green font-bold">{pol.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No active insurance policies registered.</p>
                )}
              </div>

              {/* SECTION 3: Claims History */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <ShieldAlert className="h-4 w-4 text-rose-600" />
                  <span>Claims History ({activeCustomerDetail.claims.length})</span>
                </h4>

                {activeCustomerDetail.claims.length > 0 ? (
                  <div className="space-y-2">
                    {activeCustomerDetail.claims.map((clm, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-xl bg-rose-50/40 border border-rose-200/80 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-rose-800 block">{clm.id} (Policy: {clm.policyNumber})</span>
                          <span className="text-slate-600">Claim Amount: <strong>₹{clm.claimAmount.toLocaleString()}</strong> • Hospital: <strong>{clm.hospitalName}</strong></span>
                        </div>
                        <span className="badge badge-purple font-bold">{clm.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No claims history recorded.</p>
                )}
              </div>

              {/* SECTION 4: Investments Portfolio */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                  <span>Investment Assets Portfolio</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  {activeCustomerDetail.investments.map((inv, iIdx) => (
                    <div key={iIdx} className="p-3 rounded-xl bg-purple-50/40 border border-purple-200/80 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-purple-900 block">{inv.id} — {inv.type}</span>
                        <span className="text-slate-600">Amount: <strong>₹{inv.amount.toLocaleString()}</strong> • Est Return: <strong>{inv.rate}</strong></span>
                      </div>
                      <span className="badge badge-purple font-bold">{inv.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">All data synchronized from SK Smart Investments Central Database</span>
                <button
                  onClick={() => setActiveCustomerDetail(null)}
                  className="px-5 py-2 rounded-xl bg-[#1E6091] text-white font-bold cursor-pointer shadow"
                >
                  Close 360° Report
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </header>
  );
};

