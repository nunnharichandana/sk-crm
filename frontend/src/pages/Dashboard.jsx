import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_ANALYTICS, MOCK_LEADS, MOCK_STAFF, COMPANY_INFO } from '../services/mockDataService';
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
  ChevronRight,
  PieChart,
  BarChart3
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

// Calculation audit details for percentage popups
const PERCENTAGE_AUDITS = {
  CONVERSION: {
    title: 'Lead Conversion Percentage Audit',
    metricValue: '38.4%',
    formula: 'Conversion Rate = (Total Converted Policies / Total Assigned Leads) × 100',
    numerator: '131 Converted Policies',
    denominator: '341 Total Assigned Leads',
    calculationText: '(131 ÷ 341) × 100 = 38.41%',
    sourceBreakdown: [
      { name: 'Website Inquiries', count: 143, converted: 60, pct: '41.9%' },
      { name: 'Client Referrals', count: 95, converted: 43, pct: '45.2%' },
      { name: 'Social Media Campaigns', count: 61, converted: 18, pct: '29.5%' },
      { name: 'Direct Branch Walk-ins', count: 42, converted: 10, pct: '23.8%' }
    ],
    staffBreakdown: [
      { name: 'Priya Nair', role: 'Staff Advisor', leads: 98, converted: 44, rate: '44.9%', revenue: '₹ 15.2 L' },
      { name: 'Karthik', role: 'Manager', leads: 85, converted: 34, rate: '40.0%', revenue: '₹ 12.8 L' },
      { name: 'Amit Verma', role: 'Staff Advisor', leads: 82, converted: 29, rate: '35.3%', revenue: '₹ 8.6 L' },
      { name: 'Rohan Mehta', role: 'Team Leader', leads: 76, converted: 24, rate: '31.5%', revenue: '₹ 6.2 L' }
    ]
  },
  LEADS: {
    title: 'Total Active Leads Growth Audit',
    metricValue: '341 Leads (+14.2%)',
    formula: 'Growth Rate = [(Current Period Leads - Previous Period Leads) / Previous Period Leads] × 100',
    numerator: '42 New Leads Added This Week',
    denominator: '299 Baseline Active Leads',
    calculationText: '[(341 - 299) ÷ 299] × 100 = +14.04% Net Growth',
    sourceBreakdown: [
      { name: 'Health Insurance Inquiries', count: 143, converted: 60, pct: '42.0%' },
      { name: 'Life & Term Insurance', count: 95, converted: 43, pct: '28.0%' },
      { name: 'Motor & Car Insurance', count: 61, converted: 18, pct: '18.0%' },
      { name: 'Mutual Funds & Investments', count: 42, converted: 10, pct: '12.0%' }
    ],
    staffBreakdown: [
      { name: 'Priya Nair', role: 'Staff Advisor', leads: 98, converted: 44, rate: '28.7%', revenue: '₹ 15.2 L' },
      { name: 'Karthik', role: 'Manager', leads: 85, converted: 34, rate: '24.9%', revenue: '₹ 12.8 L' },
      { name: 'Amit Verma', role: 'Staff Advisor', leads: 82, converted: 29, rate: '24.0%', revenue: '₹ 8.6 L' },
      { name: 'Rohan Mehta', role: 'Team Leader', leads: 76, converted: 24, rate: '22.4%', revenue: '₹ 6.2 L' }
    ]
  },
  POLICIES: {
    title: 'Active Policy Volume & Expiry Audit',
    metricValue: '1,280 Active Policies (+8.5%)',
    formula: 'Active Policy Ratio = (In-Force Active Policies / Total Portfolio Issued) × 100',
    numerator: '1,280 Active In-Force Contracts',
    denominator: '1,320 Total Portfolio Issued',
    calculationText: '(1,280 ÷ 1,320) × 100 = 96.96% In-Force Retention Rate',
    sourceBreakdown: [
      { name: 'Star Health Policies', count: 537, converted: 512, pct: '42.0%' },
      { name: 'HDFC ERGO Policies', count: 358, converted: 345, pct: '28.0%' },
      { name: 'Tata AIG General', count: 230, converted: 220, pct: '18.0%' },
      { name: 'ICICI Prudential Life', count: 155, converted: 148, pct: '12.0%' }
    ],
    staffBreakdown: [
      { name: 'Priya Nair', role: 'Staff Advisor', leads: 380, converted: 365, rate: '96.0%', revenue: '₹ 45.2 L' },
      { name: 'Karthik', role: 'Manager', leads: 320, converted: 310, rate: '96.8%', revenue: '₹ 38.4 L' },
      { name: 'Amit Verma', role: 'Staff Advisor', leads: 300, converted: 292, rate: '97.3%', revenue: '₹ 29.8 L' },
      { name: 'Rohan Mehta', role: 'Team Leader', leads: 280, converted: 273, rate: '97.5%', revenue: '₹ 24.6 L' }
    ]
  },
  PREMIUM: {
    title: 'Gross Premium Revenue Audit',
    metricValue: '₹ 42.8 L (+18.4%)',
    formula: 'Revenue Growth = [(Current Premium Volume - Previous Premium Volume) / Previous Premium Volume] × 100',
    numerator: '₹ 42,80,000 Collected Premium',
    denominator: '₹ 36,15,000 Previous Period Premium',
    calculationText: '[(42.8L - 36.15L) ÷ 36.15L] × 100 = +18.39% Net Revenue Surge',
    sourceBreakdown: [
      { name: 'Health Insurance Premium', count: 180, converted: 180, pct: '₹ 18.0 L' },
      { name: 'Life & Term Premium', count: 120, converted: 120, pct: '₹ 12.0 L' },
      { name: 'Motor & Vehicle Premium', count: 80, converted: 80, pct: '₹ 7.8 L' },
      { name: 'Mutual Funds & SIPs', count: 50, converted: 50, pct: '₹ 5.0 L' }
    ],
    staffBreakdown: [
      { name: 'Priya Nair', role: 'Staff Advisor', leads: 44, converted: 44, rate: '35.5%', revenue: '₹ 15.2 L' },
      { name: 'Karthik', role: 'Manager', leads: 34, converted: 34, rate: '29.9%', revenue: '₹ 12.8 L' },
      { name: 'Amit Verma', role: 'Staff Advisor', leads: 29, converted: 29, rate: '20.1%', revenue: '₹ 8.6 L' },
      { name: 'Rohan Mehta', role: 'Team Leader', leads: 24, converted: 24, rate: '14.5%', revenue: '₹ 6.2 L' }
    ]
  }
};

export const Dashboard = () => {
  const { user } = useAuth();

  const [selectedPeriod, setSelectedPeriod] = useState('WEEKLY');
  const [activeAuditModal, setActiveAuditModal] = useState(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  const currentData = PERIOD_DATA[selectedPeriod];

  const handleDownloadDashboardReport = () => {
    alert(`Downloading complete Dashboard Analytics & Percentage Calculation Report (${currentData.label} for ${currentData.dateRange}) as PDF/Excel...`);
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1E6091] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.name || 'Prakesh Gajendiran'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
              Logged in as <strong className="text-white">{user?.roleDisplayName || 'Admin'}</strong> ({user?.email || 'admin@sksmartinvestments.com'}). Real-time policy & revenue metrics engine. Click any metric card below to audit exact percentage calculations.
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
        
        {/* Working Period Selection Pills */}
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

      {/* Dynamic Interactive KPI Cards Grid (Clickable for Percentage Calculation Audit) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setActiveAuditModal(PERCENTAGE_AUDITS.LEADS)}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3 cursor-pointer group"
          title="Click to view percentage calculation breakdown"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-[#1E6091] transition">Total Active Leads</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-[#1E6091] group-hover:text-white transition">
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
            <p className="text-[11px] text-[#1E6091] font-bold mt-1 flex items-center space-x-1">
              <HelpCircle className="h-3 w-3" />
              <span>Click to view calculation formula</span>
            </p>
          </div>
        </div>

        <div 
          onClick={() => setActiveAuditModal(PERCENTAGE_AUDITS.POLICIES)}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3 cursor-pointer group"
          title="Click to view percentage calculation breakdown"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-emerald-600 transition">Active Policy Count</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
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
            <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center space-x-1">
              <HelpCircle className="h-3 w-3" />
              <span>Click to view in-force retention %</span>
            </p>
          </div>
        </div>

        <div 
          onClick={() => setActiveAuditModal(PERCENTAGE_AUDITS.PREMIUM)}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3 cursor-pointer group"
          title="Click to view percentage calculation breakdown"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider group-hover:text-purple-600 transition">Gross Premium Volume</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
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
            <p className="text-[11px] text-purple-600 font-bold mt-1 flex items-center space-x-1">
              <HelpCircle className="h-3 w-3" />
              <span>Click to view revenue growth %</span>
            </p>
          </div>
        </div>

        <div 
          onClick={() => setActiveAuditModal(PERCENTAGE_AUDITS.CONVERSION)}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-3 cursor-pointer group border-2 border-amber-300"
          title="Click to view exact conversion percentage formula & advisor reports"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">Lead Conversion Rate</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
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
            <p className="text-[11px] text-amber-700 font-bold mt-1 flex items-center space-x-1">
              <Calculator className="h-3 w-3" />
              <span>Click to view calculation report</span>
            </p>
          </div>
        </div>

      </div>

      {/* Dynamic Bar Graph Section */}
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

      {/* Staff Advisor Reports & Conversion Contribution Matrix Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Award className="h-5 w-5 text-brand-600" />
              <span>Staff Advisor Conversion & Revenue Contribution Report</span>
            </h3>
            <p className="text-xs text-slate-500">Individual advisor lead conversions contributing to overall {currentData.conversionRate} conversion percentage</p>
          </div>

          <button 
            onClick={() => setActiveAuditModal(PERCENTAGE_AUDITS.CONVERSION)}
            className="text-xs font-bold text-brand-600 hover:underline flex items-center space-x-1"
          >
            <span>Full Math Calculation</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Staff Advisor Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Assigned Leads</th>
                <th className="p-3">Converted Policies</th>
                <th className="p-3">Individual Conversion %</th>
                <th className="p-3">Gross Premium Revenue</th>
                <th className="p-3 text-right">Calculation Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {PERCENTAGE_AUDITS.CONVERSION.staffBreakdown.map((staff, sIdx) => (
                <tr key={sIdx} className="hover:bg-brand-50/40 transition">
                  <td className="p-3 font-bold text-slate-900">{staff.name}</td>
                  <td className="p-3"><span className="badge badge-blue text-[10px]">{staff.role}</span></td>
                  <td className="p-3 font-bold text-slate-800">{staff.leads} Leads</td>
                  <td className="p-3 font-bold text-emerald-600">{staff.converted} Policies</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                      {staff.rate}
                    </span>
                  </td>
                  <td className="p-3 font-extrabold text-slate-900">{staff.revenue}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => alert(`Advisor ${staff.name} Math Formula:\n(${staff.converted} Converted / ${staff.leads} Assigned Leads) × 100 = ${staff.rate}`)}
                      className="text-xs font-bold text-[#1E6091] hover:underline"
                    >
                      View Formula
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Percentage Calculation Audit Modal */}
      {activeAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-amber-300" />
                <div>
                  <h3 className="font-bold text-sm">{activeAuditModal.title}</h3>
                  <p className="text-[11px] text-blue-100">Exact mathematical derivation & staff report breakdown</p>
                </div>
              </div>
              <button onClick={() => setActiveAuditModal(null)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Formula & Calculation Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-900 text-sm">Derivation Formula:</span>
                  <span className="badge badge-amber text-xs font-black">{activeAuditModal.metricValue}</span>
                </div>
                <p className="font-mono text-slate-800 font-bold bg-white p-2.5 rounded-xl border border-amber-200">
                  {activeAuditModal.formula}
                </p>
                <div className="grid grid-cols-2 gap-3 text-slate-700 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Numerator (Actual Performance):</span>
                    <span className="font-bold text-slate-900">{activeAuditModal.numerator}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Denominator (Total Base):</span>
                    <span className="font-bold text-slate-900">{activeAuditModal.denominator}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-amber-200/80 text-amber-900 font-bold flex justify-between">
                  <span>Exact Result:</span>
                  <span className="font-mono font-black">{activeAuditModal.calculationText}</span>
                </div>
              </div>

              {/* Staff Advisor Contribution Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <Award className="h-4 w-4 text-[#1E6091]" />
                  <span>Staff Advisor Contribution Breakdown</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                      <tr>
                        <th className="p-2.5">Staff Advisor</th>
                        <th className="p-2.5">Leads</th>
                        <th className="p-2.5">Converted</th>
                        <th className="p-2.5">Advisor Rate</th>
                        <th className="p-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {activeAuditModal.staffBreakdown.map((st, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900">{st.name}</td>
                          <td className="p-2.5">{st.leads}</td>
                          <td className="p-2.5 font-bold text-emerald-600">{st.converted}</td>
                          <td className="p-2.5 font-extrabold text-[#1E6091]">{st.rate}</td>
                          <td className="p-2.5 text-right font-extrabold">{st.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category / Source Origin Distribution */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <PieChart className="h-4 w-4 text-purple-600" />
                  <span>Source / Category Origin Distribution</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {activeAuditModal.sourceBreakdown.map((src, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{src.name}</span>
                        <span className="text-[10px] text-slate-500">{src.converted} converted from {src.count}</span>
                      </div>
                      <span className="badge badge-purple text-xs font-extrabold">{src.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setActiveAuditModal(null)}
                  className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow cursor-pointer"
                >
                  Close Audit Report
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

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
