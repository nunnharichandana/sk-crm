import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { 
  Bell, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  ChevronDown,
  Building2,
  Sparkles
} from 'lucide-react';

export const Header = () => {
  const { user, switchRole, roles, logout } = useAuth();
  const { unreadCount, setIsDrawerOpen } = useNotifications();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#1E6091] text-white shadow-md transition-all">
      <div className="flex items-center justify-between px-6 py-3">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20 shadow-inner">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-extrabold tracking-tight text-white">SK SMART INSURANCE</span>
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-50 border border-white/20">
                  CRM PORTAL
                </span>
              </div>
              <p className="text-xs text-brand-100/90 font-medium">Insurance Brokerage Management</p>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <input 
              type="text"
              placeholder="Search Leads, Policies, Customers or Claim IDs... (Ctrl+K)"
              className="w-full rounded-xl bg-white/10 pl-10 pr-4 py-2 text-sm text-white placeholder-white/70 backdrop-blur-md border border-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
            />
          </div>
        </div>

        {/* Right: Role Switcher, Branch, Notifications & User Menu */}
        <div className="flex items-center space-x-4">
          
          {/* Branch Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-brand-100 border border-white/15">
            <Building2 className="h-3.5 w-3.5 text-brand-200" />
            <span className="font-semibold">{user.branch}</span>
          </div>

          {/* Dynamic Role Switcher (Restricted to 4 Roles: Admin, Manager, Team Leader, Staff) */}
          <div className="relative">
            <button 
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1A759F] hover:bg-brand-500 text-white text-xs font-semibold border border-white/20 shadow-sm transition"
              title="Switch role view for live testing"
            >
              <UserCheck className="h-3.5 w-3.5 text-brand-100" />
              <span>{user.roleDisplayName}</span>
              <ChevronDown className="h-3 w-3 text-brand-200" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <div className="flex items-center space-x-1 text-xs font-bold text-[#1E6091]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Role Switcher</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Switch active role view</p>
                </div>
                <div className="py-1">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        switchRole(r.id);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-brand-50 transition ${user.role === r.id ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'}`}
                    >
                      <span className="font-medium">{r.name}</span>
                      <span className="text-[10px] text-slate-400">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition focus:outline-none"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white ring-2 ring-[#1E6091]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/40 shadow"
              />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                  <span className="mt-1 badge badge-blue text-[10px]">{user.roleDisplayName}</span>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
