import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  UserCheck, 
  FileText, 
  Briefcase,
  ShieldAlert, 
  RotateCcw, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  ChevronRight,
  Building2,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const currentRole = user?.role || 'STAFF';

  // Strict Role-Based Enterprise Access Matrix
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF', 'USER'] },
    { label: 'Lead Management', path: '/leads', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF'] },
    { label: 'Follow-ups & Calendar', path: '/followups', icon: PhoneCall, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF'] },
    { label: 'Customer 360', path: '/customers', icon: UserCheck, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER'] },
    { label: 'Investments Register', path: '/investments', icon: Briefcase, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'] },
    { label: 'Policies & Calculator', path: '/policies', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF'] },
    { label: 'Claims Module', path: '/claims', icon: ShieldAlert, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF'] },
    { label: 'Renewals Engine', path: '/renewals', icon: RotateCcw, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER'] },
    { label: 'Staff & Roles Portal', path: '/staff', icon: Award, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'] },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'] },
    { label: 'Admin & Audit Logs', path: '/admin', icon: ShieldCheck, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { label: 'System Settings', path: '/settings', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'TEAM_LEADER', 'STAFF', 'USER'] },
  ];

  const allowedNav = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-68 bg-white border-r border-slate-200 min-h-[calc(100vh-61px)] flex flex-col justify-between py-4 shadow-sm select-none">
      
      {/* Top Branding Section: Gold SK Emblem Logo Header */}
      <div className="space-y-4">
        
        {/* Replacement of Role Navigation text with Gold Emblem Logo */}
        <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <Logo className="h-10 w-auto" />
        </div>

        {/* Branch & Role Banner */}
        <div className="px-4">
          <div className="p-2.5 rounded-xl bg-[#1E6091]/5 border border-[#1E6091]/15 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-[#1E6091]" />
              <span className="text-[11px] font-bold text-slate-800">Kanchipuram HQ</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#1E6091] text-white font-extrabold text-[9px] uppercase tracking-wider">
              {user?.roleDisplayName || currentRole}
            </span>
          </div>
        </div>

        {/* Navigation Menu List */}
        <div className="px-3 space-y-1 pt-1">
          {allowedNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#1E6091] text-white shadow-md font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-amber-300" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

      </div>

      {/* Bottom User Profile Summary Card */}
      <div className="px-4 pt-4 border-t border-slate-100 space-y-2">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} 
            alt="Profile Avatar"
            className="h-9 w-9 rounded-full border-2 border-[#1E6091] object-cover shrink-0" 
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-slate-900 truncate">{user?.name}</p>
            <p className="text-[10px] text-[#1E6091] font-bold truncate">{user?.roleDisplayName}</p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
        </div>

        <div className="text-center text-[10px] text-slate-400 font-medium">
          SK Smart Investments CRM v2026.2
        </div>
      </div>

    </aside>
  );
};
