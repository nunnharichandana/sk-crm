import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  FileCheck, 
  IndianRupee, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  Calendar,
  Download,
  X,
  Calculator,
  HelpCircle,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Building2,
  BellRing
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MONTHLY_INVESTMENT_DATA = [
  { month: 'Jan', amount: 12.5 },
  { month: 'Feb', amount: 14.8 },
  { month: 'Mar', amount: 18.2 },
  { month: 'Apr', amount: 15.0 },
  { month: 'May', amount: 21.4 },
  { month: 'Jun', amount: 24.8 },
  { month: 'Jul', amount: 28.5 },
];

const MONTHLY_INCOME_DATA = [
  { month: 'Jan', income: 2.8, expense: 1.1 },
  { month: 'Feb', income: 3.2, expense: 1.2 },
  { month: 'Mar', income: 4.1, expense: 1.4 },
  { month: 'Apr', income: 3.8, expense: 1.3 },
  { month: 'May', income: 4.9, expense: 1.5 },
  { month: 'Jun', income: 5.4, expense: 1.6 },
  { month: 'Jul', income: 6.2, expense: 1.8 },
];

const BRANCH_PERFORMANCE_DATA = [
  { branch: 'Kanchipuram HQ', volume: 18.5, leads: 341 },
  { branch: 'Chennai Branch', volume: 14.2, leads: 280 },
  { branch: 'Coimbatore Branch', volume: 9.8, leads: 195 },
  { branch: 'Madurai Branch', volume: 7.4, leads: 150 },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1E6091] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.name || 'Prakash Gajendiran'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
              Role: <strong className="text-white">{user?.roleDisplayName || 'Super Admin'}</strong> • Investment Portfolio, Income Stream & Lead Pipeline Overview.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowAddLeadModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white text-[#1E6091] font-bold text-xs shadow-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Lead</span>
            </button>
            <button 
              onClick={() => alert("Downloading complete Investment CRM Business Report (PDF/Excel)...")}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Customers</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600"><Users className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">1,280</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight className="h-3 w-3" /> +8.5%</span>
          </div>
          <p className="text-[11px] text-slate-400">Verified KYC Customer Accounts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Active Leads</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600"><TrendingUp className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">341</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight className="h-3 w-3" /> +14.2%</span>
          </div>
          <p className="text-[11px] text-slate-400">In active lead conversion pipeline</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Investments</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600"><Briefcase className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">₹ 18.5 Cr</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight className="h-3 w-3" /> +24.8%</span>
          </div>
          <p className="text-[11px] text-slate-400">SIP, Mutual Funds, FD, Real Estate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Monthly Income</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600"><IndianRupee className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">₹ 42.8 L</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight className="h-3 w-3" /> +18.4%</span>
          </div>
          <p className="text-[11px] text-slate-400">Commission & brokerage earnings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Pending Tasks</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600"><Clock className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">14</span>
            <span className="text-xs font-bold text-rose-600">Action Needed</span>
          </div>
          <p className="text-[11px] text-slate-400">Assigned employee operational tasks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Today's Follow-ups</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600"><BellRing className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">9</span>
            <span className="text-xs font-bold text-blue-600">Scheduled</span>
          </div>
          <p className="text-[11px] text-slate-400">High-priority customer calls</p>
        </div>

      </div>

      {/* 4 Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Monthly Investment Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Monthly Investment Volume (₹ Cr)</h3>
            <span className="badge badge-blue text-[10px]">Bar Chart</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_INVESTMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip />
                <Bar dataKey="amount" name="Investment (₹ Cr)" fill="#1E6091" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Income vs Expenses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Monthly Income vs Expense Growth</h3>
            <span className="badge badge-green text-[10px]">Line Trend</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_INCOME_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" name="Income (₹ L)" stroke="#52B69A" strokeWidth={3} />
                <Line type="monotone" dataKey="expense" name="Expense (₹ L)" stroke="#E63946" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Branch Performance Comparison */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Branch Performance & Investment Volume</h3>
            <span className="badge badge-purple text-[10px]">Branch Comparison</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BRANCH_PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="branch" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip />
                <Bar dataKey="volume" name="Volume (₹ Cr)" fill="#7209B7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity & Follow-ups Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Recent System Activity & Audit Trail</h3>
            <span className="badge badge-amber text-[10px]">Live Log</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Investment Approved: INV-2026-881</span>
                <span className="text-[10px] text-slate-500">Priya Nair • SIP Mutual Fund ₹ 50,000 / mo</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <Users className="h-4 w-4 text-[#1E6091] mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">New Customer KYC Verified: CUST-904</span>
                <span className="text-[10px] text-slate-500">Ramesh Kumar • PAN & Aadhaar Verified</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <TrendingUp className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Lead Converted to Customer: LD-2026-104</span>
                <span className="text-[10px] text-slate-500">Status set to WON • Real Estate Portfolio</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("New Lead created successfully!");
              setShowAddLeadModal(false);
            }} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                  <input type="text" required placeholder="e.g. Vikram Seth" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input type="text" required placeholder="+91 98400 11223" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Investment Type</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none">
                    <option value="SIP">SIP / Mutual Funds</option>
                    <option value="Fixed Deposit">Fixed Deposit</option>
                    <option value="Insurance">Insurance Policy</option>
                    <option value="Stocks">Stocks & Equity</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Amount (₹)</label>
                  <input type="number" required placeholder="100000" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
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
