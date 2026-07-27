import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_ANALYTICS, MOCK_LEADS, COMPANY_INFO } from '../services/mockDataService';
import { 
  Users, 
  FileCheck, 
  IndianRupee, 
  Award, 
  TrendingUp, 
  Plus, 
  Phone, 
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Building2,
  CheckCircle2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showIssuePolicyModal, setShowIssuePolicyModal] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Dynamic Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1E6091] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold">
              <Building2 className="h-3.5 w-3.5" />
              <span>{COMPANY_INFO.name} • {COMPANY_INFO.location}</span>
            </div>
            {/* DYNAMIC LOGGED-IN PERSON NAME GREETING */}
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.name || 'Prakesh Gajendiran'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
              Logged in as <strong className="text-white">{user?.roleDisplayName || 'Admin'}</strong> ({user?.email || 'admin@sksmartinvestments.com'}). Your Kanchipuram CRM portal is live with active lead & policy pipelines.
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
              onClick={() => setShowIssuePolicyModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-brand-700 text-white border border-brand-500/30 font-bold text-xs shadow-lg hover:bg-brand-800 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileCheck className="h-4 w-4" />
              <span>Issue Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
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
              <span className="text-2xl font-black text-slate-900">341</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +14.2%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">45 leads added this week in Kanchipuram</p>
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
              <span className="text-2xl font-black text-slate-900">1,280</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +8.5%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">₹ 1.38 Cr total active coverage</p>
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
              <span className="text-2xl font-black text-slate-900">₹ 42.8 L</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +18.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Month-to-date collected premium</p>
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
              <span className="text-2xl font-black text-slate-900">38.4%</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +3.1%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Top performing advisor: Priya Nair</p>
          </div>
        </div>

      </div>

      {/* Clean Bar Graph Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Weekly Lead & Converted Policies Bar Analysis</h3>
            <p className="text-xs text-slate-500">Comparative weekly bar breakdown of new customer leads vs converted policies</p>
          </div>
          <span className="badge badge-blue text-xs">Standard Bar Chart</span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DASHBOARD_ANALYTICS.weeklyLeads} barGap={6}>
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

      {/* Issue Policy Modal */}
      {showIssuePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Issue New Policy Certificate</h3>
              <button onClick={() => setShowIssuePolicyModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Policy issued successfully!");
              setShowIssuePolicyModal(false);
            }} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Full Name</label>
                <input type="text" required placeholder="e.g. Neha Agarwal" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Insurance Provider</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none">
                    <option value="Star Health">Star Health Insurance</option>
                    <option value="HDFC ERGO">HDFC ERGO</option>
                    <option value="Tata AIG">Tata AIG General</option>
                    <option value="ICICI Prudential">ICICI Prudential</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gross Premium (₹)</label>
                  <input type="number" required placeholder="42000" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowIssuePolicyModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white font-bold shadow">Confirm Issue Policy</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
