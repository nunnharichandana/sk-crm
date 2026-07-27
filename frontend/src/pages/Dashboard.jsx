import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  Send,
  X,
  Zap,
  Phone
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Modal States for Dashboard Buttons
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showIssuePolicyModal, setShowIssuePolicyModal] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    customerName: '',
    mobileNumber: '',
    insuranceType: 'Health Insurance',
    estimatedPremium: 30000,
  });

  // Policy Form State
  const [newPolicy, setNewPolicy] = useState({
    customerName: 'Rahul Dravid',
    insuranceCompany: 'Star Health Insurance',
    sumInsured: 1000000,
    grossPremium: 35000,
  });

  const handleAddLeadSubmit = (e) => {
    e.preventDefault();
    alert(`Lead for ${newLead.customerName} successfully created! Added to Lead Registry.`);
    setShowAddLeadModal(false);
  };

  const handleIssuePolicySubmit = (e) => {
    e.preventDefault();
    alert(`Policy successfully issued for ${newPolicy.customerName}! Generated POL-SK-2026-${Math.floor(10000 + Math.random() * 90000)}.`);
    setShowIssuePolicyModal(false);
  };

  // 8 Enterprise KPI Cards
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
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-[#1E6091] to-[#1A759F] p-6 rounded-2xl text-white shadow-card">
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
            CRM Portal • {user.roleDisplayName} View
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">Welcome back, {user.name}!</h2>
          <p className="text-xs text-brand-100/90">
            Live operational dashboard for {user.branch}.
          </p>
        </div>

        {/* Header Action Buttons (Fully Working Modals) */}
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button 
            onClick={() => setShowAddLeadModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#1E6091] font-bold text-xs shadow hover:bg-brand-50 transition"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add New Lead</span>
          </button>
          <button 
            onClick={() => setShowIssuePolicyModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1A759F] hover:bg-brand-500 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition"
          >
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

      {/* Standard Straight-Line Linear Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Standard Linear Grid Graph (No Wave Form) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Lead Acquisition & Policy Conversion Graph</h3>
              <p className="text-xs text-slate-500">Standard linear trend tracking for new leads VS converted policies</p>
            </div>
            <span className="badge badge-blue text-[11px]">Standard Linear Grid</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DASHBOARD_ANALYTICS.weeklyLeads}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#E2E8F0" />
                <XAxis dataKey="day" tickLine={true} axisLine={true} tick={{ fontSize: 12, fill: '#475569' }} />
                <YAxis tickLine={true} axisLine={true} tick={{ fontSize: 12, fill: '#475569' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} 
                />
                <Legend verticalAlign="top" height={36} />
                {/* Standard Straight Line Graph (type="linear") */}
                <Line 
                  type="linear" 
                  dataKey="newLeads" 
                  name="New Leads Received" 
                  stroke="#1E6091" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#1E6091' }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="linear" 
                  dataKey="converted" 
                  name="Policies Converted" 
                  stroke="#52B69A" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#52B69A' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insurance Category Breakdown Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Insurance Portfolio Distribution</h3>
            <p className="text-xs text-slate-500">Policy volume by insurance type</p>
          </div>

          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DASHBOARD_ANALYTICS.insuranceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={3}
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
            <button 
              onClick={() => navigate('/leads')}
              className="text-xs font-bold text-brand-600 hover:underline flex items-center space-x-1"
            >
              <span>View All Leads →</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_LEADS.slice(0, 4).map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between hover:bg-slate-50/60 px-2 rounded-xl transition">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{lead.customerName}</span>
                    <span className="badge badge-blue text-[10px]">{lead.insuranceType}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Assigned: {lead.assignedStaff} • {lead.city}</p>
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
            <button 
              onClick={() => navigate('/followups')}
              className="text-xs font-bold text-brand-600 hover:underline flex items-center space-x-1"
            >
              <span>Open Calendar →</span>
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_FOLLOWUPS.map((fl) => (
              <div key={fl.id} className="p-3 rounded-xl border border-slate-200/60 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-brand-50 text-brand-600 font-bold text-xs">
                    {fl.type === 'CALL' ? <Phone className="h-4 w-4" /> : <Send className="h-4 w-4" />}
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

      {/* Add Lead Modal (Triggered by Dashboard Button) */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Customer Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={newLead.customerName}
                  onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    type="text" 
                    required 
                    value={newLead.mobileNumber}
                    onChange={(e) => setNewLead({ ...newLead, mobileNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Category</label>
                  <select 
                    value={newLead.insuranceType}
                    onChange={(e) => setNewLead({ ...newLead, insuranceType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Motor Insurance">Motor Insurance</option>
                    <option value="Corporate Fire">Corporate Fire</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Premium (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={newLead.estimatedPremium}
                  onChange={(e) => setNewLead({ ...newLead, estimatedPremium: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddLeadModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Policy Modal (Triggered by Dashboard Button) */}
      {showIssuePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Issue New Policy Certificate</h3>
              <button onClick={() => setShowIssuePolicyModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleIssuePolicySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Customer</label>
                <input 
                  type="text" 
                  required 
                  value={newPolicy.customerName}
                  onChange={(e) => setNewPolicy({ ...newPolicy, customerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Company</label>
                  <select 
                    value={newPolicy.insuranceCompany}
                    onChange={(e) => setNewPolicy({ ...newPolicy, insuranceCompany: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="HDFC ERGO General Insurance">HDFC ERGO</option>
                    <option value="Star Health Insurance">Star Health</option>
                    <option value="Tata AIG General">Tata AIG</option>
                    <option value="ICICI Prudential Life">ICICI Prudential</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gross Premium (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={newPolicy.grossPremium}
                    onChange={(e) => setNewPolicy({ ...newPolicy, grossPremium: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowIssuePolicyModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Confirm Policy Issuance</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
