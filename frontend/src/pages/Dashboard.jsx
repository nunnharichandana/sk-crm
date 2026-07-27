import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_ANALYTICS, MOCK_LEADS, COMPANY_INFO } from '../services/mockDataService';
import { 
  Users, 
  FileCheck, 
  IndianRupee, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  Calendar,
  Download,
  FileSpreadsheet,
  X,
  Sparkles,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PERIOD_DATA = {
  WEEKLY: {
    label: 'Weekly Analysis',
    dateRange: '19 Jul 2026 - 27 Jul 2026',
    growthPct: '+14.2%',
    activeLeads: '341',
    activePolicies: '1,280',
    premiumVolume: '₹ 42.8 L',
    conversionRate: '38.4%',
    chartData: [
      { day: 'Mon', newLeads: 45, converted: 12, revenue: 185000 },
      { day: 'Tue', newLeads: 52, converted: 18, revenue: 240000 },
      { day: 'Wed', newLeads: 61, converted: 22, revenue: 310000 },
      { day: 'Thu', newLeads: 48, converted: 15, revenue: 210000 },
      { day: 'Fri', newLeads: 70, converted: 28, revenue: 420000 },
      { day: 'Sat', newLeads: 38, converted: 14, revenue: 195000 },
      { day: 'Sun', newLeads: 25, converted: 8, revenue: 120000 },
    ]
  },
  MONTHLY: {
    label: 'Monthly Analysis (July 2026)',
    dateRange: '01 Jul 2026 - 27 Jul 2026',
    growthPct: '+28.6%',
    activeLeads: '1,420',
    activePolicies: '4,850',
    premiumVolume: '₹ 1.84 Cr',
    conversionRate: '42.1%',
    chartData: [
      { day: 'Week 1', newLeads: 280, converted: 110, revenue: 1250000 },
      { day: 'Week 2', newLeads: 340, converted: 145, revenue: 1680000 },
      { day: 'Week 3', newLeads: 390, converted: 172, revenue: 1940000 },
      { day: 'Week 4', newLeads: 410, converted: 188, revenue: 2150000 },
    ]
  },
  YEARLY: {
    label: 'Yearly Analysis (FY 2026-27)',
    dateRange: '01 Apr 2026 - 31 Mar 2027',
    growthPct: '+45.8%',
    activeLeads: '15,800',
    activePolicies: '52,400',
    premiumVolume: '₹ 18.50 Cr',
    conversionRate: '48.9%',
    chartData: [
      { day: 'Q1 2026', newLeads: 3200, converted: 1420, revenue: 14500000 },
      { day: 'Q2 2026', newLeads: 3850, converted: 1780, revenue: 18200000 },
      { day: 'Q3 2026 (Est)', newLeads: 4200, converted: 2010, revenue: 21000000 },
      { day: 'Q4 2026 (Est)', newLeads: 4550, converted: 2240, revenue: 24500000 },
    ]
  }
};

export const Dashboard = () => {
  const { user } = useAuth();

  const [selectedPeriod, setSelectedPeriod] = useState('WEEKLY');
  const [customStartDate, setCustomStartDate] = useState('2026-07-01');
  const [customEndDate, setCustomEndDate] = useState('2026-07-27');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showIssuePolicyModal, setShowIssuePolicyModal] = useState(false);

  const currentData = PERIOD_DATA[selectedPeriod];

  const handleDownloadDashboardReport = () => {
    alert(`Downloading complete Dashboard Analytics Report (${currentData.label} for ${currentData.dateRange}) as PDF/Excel...`);
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Welcome Hero Banner (No location badges or navigation lines) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1E6091] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.name || 'Prakesh Gajendiran'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
              Logged in as <strong className="text-white">{user?.roleDisplayName || 'Admin'}</strong> ({user?.email || 'admin@sksmartinvestments.com'}). Real-time policy & revenue metrics engine.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowAddLeadModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white text-[#1E6091] font-bold text-xs shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Lead</span>
            </button>
            <button 
              onClick={handleDownloadDashboardReport}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Date-to-Date Filter Toolbar & Download Actions */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Working Period Selection Pills (Weekly, Monthly, Yearly) */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mr-1">Period Filter:</span>
          {['WEEKLY', 'MONTHLY', 'YEARLY'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                selectedPeriod === period 
                  ? 'bg-[#1E6091] text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Date-to-Date Selector with Calendar Symbol */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
            <Calendar className="h-4 w-4 text-[#1E6091]" />
            <span className="font-bold">{currentData.dateRange}</span>
          </div>

          <span className="badge badge-green text-xs font-bold flex items-center space-x-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>{currentData.growthPct} Growth</span>
          </span>
        </div>

      </div>

      {/* Dynamic KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Active Leads</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">{currentData.activeLeads}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> {currentData.growthPct}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{currentData.label}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Active Policy Count</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FileCheck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">{currentData.activePolicies}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> {currentData.growthPct}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Verified coverage register</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Gross Premium Volume</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <IndianRupee className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">{currentData.premiumVolume}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> {currentData.growthPct}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Collected premium total</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Lead Conversion Rate</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">{currentData.conversionRate}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> {currentData.growthPct}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Conversion performance</p>
          </div>
        </div>

      </div>

      {/* Dynamic Bar Graph & Export Button */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{currentData.label} - Comparative Breakdown</h3>
            <p className="text-xs text-slate-500">Date Range: <strong>{currentData.dateRange}</strong> • Date-to-Date Growth: <strong>{currentData.growthPct}</strong></p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={handleDownloadDashboardReport}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-sm hover:bg-slate-50 transition cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#1E6091]" />
              <span>Download Bar Graph Report</span>
            </button>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData.chartData} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 'bold' }} />
              <Bar dataKey="newLeads" name="New Customer Leads" fill="#1E6091" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar dataKey="converted" name="Converted Policies" fill="#52B69A" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Customer Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("New lead saved successfully!");
              setShowAddLeadModal(false);
            }} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Full Name</label>
                  <input type="text" required placeholder="e.g. Anand Gopal" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input type="text" required placeholder="+91 98423 77889" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Insurance Category</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none">
                    <option value="Health">Health Insurance</option>
                    <option value="Life">Life Insurance</option>
                    <option value="Motor">Motor Insurance</option>
                    <option value="Mutual Funds">Mutual Funds & Investments</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Premium (₹)</label>
                  <input type="number" required placeholder="35000" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddLeadModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white font-bold shadow">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
