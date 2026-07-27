import React, { useState } from 'react';
import { MOCK_BRANCHES } from '../services/mockDataService';
import { BarChart3, Download, FileSpreadsheet, FileText, Calendar, Filter, Sparkles } from 'lucide-react';

export const Reports = () => {
  const [reportType, setReportType] = useState('LEADS_CONVERSION');
  const [branch, setBranch] = useState('ALL');
  const [dateRange, setDateRange] = useState('THIS_MONTH');

  const handleExport = (format) => {
    alert(`Exporting ${reportType} report for Branch: ${branch} in ${format} format. File download starting...`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Enterprise Reports & Export Hub</h2>
          <p className="text-xs text-slate-500">Generate compliance, revenue, commission & branch performance reports</p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleExport('EXCEL')}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-sm hover:bg-slate-50 transition"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#0A4DA2] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
          >
            <FileText className="h-4 w-4" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* Filter Builder Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Report Module Type</label>
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-brand-700 focus:ring-2 focus:ring-brand-600 outline-none"
          >
            <option value="LEADS_CONVERSION">Lead Conversion & Source Analysis</option>
            <option value="REVENUE_COMMISSION">Revenue & Staff Commission Summary</option>
            <option value="POLICY_ISSUANCE">Policy Issuance & Premium Register</option>
            <option value="CLAIMS_SUMMARY">Claims Settlement Ratio Report</option>
            <option value="RENEWAL_EXPIRY">Renewal Expiry Tracker</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Filter Branch</label>
          <select 
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
          >
            <option value="ALL">All Branches Nationwide</option>
            {MOCK_BRANCHES.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Date Period</label>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
          >
            <option value="TODAY">Today</option>
            <option value="THIS_WEEK">This Week</option>
            <option value="THIS_MONTH">This Month (July 2026)</option>
            <option value="THIS_QUARTER">Q3 2026</option>
            <option value="THIS_YEAR">FY 2026-27</option>
          </select>
        </div>
      </div>

      {/* Report Preview Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">Generated Executive Summary Preview</h3>
          <span className="badge badge-green text-xs">Ready for Audit Export</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Total Policy Gross Volume</span>
            <span className="text-sm font-extrabold text-slate-900">₹ 1,38,00,000</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Net Agent Commission</span>
            <span className="text-sm font-extrabold text-emerald-600">₹ 14,80,000</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Conversion Ratio</span>
            <span className="text-sm font-extrabold text-brand-700">38.4%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Claims Settlement Ratio</span>
            <span className="text-sm font-extrabold text-purple-600">97.2%</span>
          </div>
        </div>
      </div>

    </div>
  );
};
