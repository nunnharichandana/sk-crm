import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_ANALYTICS, MOCK_LEADS, MOCK_FOLLOWUPS } from '../services/mockDataService';
import { 
  Users, 
  PhoneCall, 
  CheckCircle2, 
  ShieldAlert, 
  RotateCcw, 
  IndianRupee, 
  TrendingUp, 
  Award,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FilePlus,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();

  // KPI Metrics Calculation
  const kpis = [
    { title: "Total Active Leads", value: "1,248", change: "+14.2%", isUp: true, icon: Users, color: "text-brand-600", bg: "bg-brand-50" },
    { title: "Today's Follow-ups", value: "18", change: "4 Pending", isUp: true, icon: PhoneCall, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Policies Issued (MTD)", value: "142", change: "+22.5%", isUp: true, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Pending Renewals", value: "34", change: "Due < 15 days", isUp: false, icon: RotateCcw, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Active Claims", value: "12", change: "2 In Review", isUp: true, icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Monthly Revenue", value: "₹ 48.5 L", change: "+18.4%", isUp: true, icon: IndianRupee, color: "text-brand-600", bg: "bg-brand-50" },
    { title: "Staff Commission", value: "₹ 3.88 L", change: "+12.0%", isUp: true, icon: Award, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Target Achievement", value: "94.2%", change: "Target: 50L", isUp: true, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-[#0A4DA2] to-[#1976D2] p-6 rounded-2xl text-white shadow-card">
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
            CRM Portal • {user.roleDisplayName}
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">Welcome back, {user.name}!</h2>
          <p className="text-xs text-brand-100/90">
            Here is your live performance overview for {user.branch} as of today.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white text-brand-700 font-bold text-xs shadow hover:bg-brand-50 transition">
            <UserPlus className="h-4 w-4" />
            <span>Add New Lead</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-500/80 hover:bg-brand-500 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition">
            <FilePlus className="h-4 w-4" />
            <span>Issue Policy</span>
          </button>
        </div>
      </div>

      {/* Grid of 8 Enterprise KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.bg}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{kpi.value}</span>
                <span className={`inline-flex items-center text-[11px] font-bold ${kpi.isUp ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {kpi.isUp ? <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> : <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Lead & Revenue Growth Area Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Lead Conversion & Revenue Trend</h3>
              <p className="text-xs text-slate-500">Weekly acquisition VS successful policy issuance revenue</p>
            </div>
            <span className="badge badge-blue text-[11px]">Real-time Feed</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DASHBOARD_ANALYTICS.weeklyLeads}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A4DA2" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0A4DA2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1976D2" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                />
                <Area type="monotone" dataKey="newLeads" name="New Leads" stroke="#1976D2" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="converted" name="Policies Converted" stroke="#0A4DA2" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insurance Category Breakdown Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Insurance Portfolio Distribution</h3>
            <p className="text-xs text-slate-500">Breakdown by policy categories</p>
          </div>

          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DASHBOARD_ANALYTICS.insuranceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {DASHBOARD_ANALYTICS.insuranceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {DASHBOARD_ANALYTICS.insuranceDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lower Section: Recent Leads & Today's Follow-up Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* High Priority Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent High Lead Scores</h3>
            <a href="#leads" className="text-xs font-bold text-brand-600 hover:underline">View All Leads →</a>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_LEADS.slice(0, 4).map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between hover:bg-slate-50/60 px-2 rounded-xl transition">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{lead.customerName}</span>
                    <span className="badge badge-blue text-[10px]">{lead.insuranceType}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Assigned to: {lead.assignedStaff} • {lead.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-brand-700">₹ {lead.estimatedPremium.toLocaleString()}</span>
                  <div className="flex items-center justify-end space-x-1 mt-0.5">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Score {lead.leadScore}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Follow-ups Timeline */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Today's Scheduled Follow-ups</h3>
            <a href="#followups" className="text-xs font-bold text-brand-600 hover:underline">Open Calendar →</a>
          </div>

          <div className="space-y-3">
            {MOCK_FOLLOWUPS.map((fl) => (
              <div key={fl.id} className="p-3 rounded-xl border border-slate-200/60 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-brand-50 text-brand-600 font-bold text-xs">
                    {fl.type}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{fl.customerName}</h4>
                    <p className="text-[11px] text-slate-500">{fl.remarks}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700">{fl.scheduledTime.split(' ')[1]}</span>
                  <span className={`block text-[10px] font-bold mt-0.5 ${fl.status === 'COMPLETED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {fl.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
