import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Lead Management', path: '/leads', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Follow-ups & Calendar', path: '/followups', icon: PhoneCall, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Customer 360', path: '/customers', icon: UserCheck, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Investments Register', path: '/investments', icon: Briefcase, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Policies & Calculator', path: '/policies', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Claims Module', path: '/claims', icon: ShieldAlert, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Renewals Engine', path: '/renewals', icon: RotateCcw, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'VIEWER'] },
    { label: 'Staff & Roles Portal', path: '/staff', icon: Award, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'] },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3, roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'VIEWER'] },
    { label: 'Admin & Audit Logs', path: '/admin', icon: ShieldCheck, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { label: 'System Settings', path: '/settings', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN'] },
  ];

  const allowedNav = navItems.filter(item => 
    item.roles.includes(user.role) || item.roles.includes('SUPER_ADMIN') || user.role === 'ADMIN'
  );

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-61px)] flex flex-col justify-between py-4 shadow-sm">
      <div className="px-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Main Navigation
        </div>

        {allowedNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-[#1E6091]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-[#1E6091]" />}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Profile Summary Card */}
      <div className="px-4 pt-4 border-t border-slate-100">
        <div className="p-3 rounded-xl bg-brand-50/60 border border-brand-100 flex items-center space-x-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
            <p className="text-[11px] text-[#1E6091] font-semibold truncate">{user.roleDisplayName}</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
        </div>
      </div>
    </aside>
  );
};
