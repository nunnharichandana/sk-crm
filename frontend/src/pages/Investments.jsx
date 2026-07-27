import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X,
  FileCheck,
  TrendingUp,
  Download
} from 'lucide-react';

const MOCK_INVESTMENTS = [
  {
    id: 'INV-2026-001',
    customerName: 'Arjun Singhania',
    advisorName: 'Priya Nair',
    type: 'SIP',
    amount: 50000,
    durationMonths: 36,
    interestRate: '14.2%',
    currentValue: 1850000,
    maturityDate: '2029-08-15',
    status: 'ACTIVE',
    createdAt: '2026-07-10'
  },
  {
    id: 'INV-2026-002',
    customerName: 'Deepika Padukone',
    advisorName: 'Karthik',
    type: 'MUTUAL_FUND',
    amount: 500000,
    durationMonths: 60,
    interestRate: '15.5%',
    currentValue: 620000,
    maturityDate: '2031-03-31',
    status: 'PENDING',
    createdAt: '2026-07-20'
  },
  {
    id: 'INV-2026-003',
    customerName: 'Rahul Dravid',
    advisorName: 'Amit Verma',
    type: 'FIXED_DEPOSIT',
    amount: 1000000,
    durationMonths: 24,
    interestRate: '7.8%',
    currentValue: 1078000,
    maturityDate: '2028-06-30',
    status: 'APPROVED',
    createdAt: '2026-07-05'
  },
  {
    id: 'INV-2026-004',
    customerName: 'Sania Mirza',
    advisorName: 'Rohan Mehta',
    type: 'REAL_ESTATE',
    amount: 4500000,
    durationMonths: 120,
    interestRate: '18.0%',
    currentValue: 4800000,
    maturityDate: '2036-12-31',
    status: 'ACTIVE',
    createdAt: '2026-06-15'
  }
];

export const Investments = () => {
  const [investments, setInvestments] = useState(MOCK_INVESTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [advisorName, setAdvisorName] = useState('Priya Nair');
  const [type, setType] = useState('SIP');
  const [amount, setAmount] = useState('');
  const [durationMonths, setDurationMonths] = useState(36);
  const [interestRate, setInterestRate] = useState('12.5%');

  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.advisorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || inv.type === selectedType;
    const matchesStatus = selectedStatus === 'ALL' || inv.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApprove = (id) => {
    setInvestments(prev => prev.map(i => i.id === id ? { ...i, status: 'APPROVED' } : i));
    alert(`Investment ${id} approved successfully by Admin!`);
  };

  const handleCreateInvestment = (e) => {
    e.preventDefault();
    const newInv = {
      id: 'INV-2026-' + Math.floor(100 + Math.random() * 900),
      customerName,
      advisorName,
      type,
      amount: Number(amount),
      durationMonths: Number(durationMonths),
      interestRate,
      currentValue: Number(amount),
      maturityDate: '2029-12-31',
      status: 'PENDING', // Initial status PENDING
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInvestments([newInv, ...investments]);
    setShowAddModal(false);
    alert(`Investment record ${newInv.id} created and set to PENDING approval!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-[#1E6091]" />
            <span>Investment Portfolio Register</span>
          </h2>
          <p className="text-xs text-slate-500">Manage SIP, Mutual Funds, Fixed Deposits, Insurance, Stocks, Bonds, Gold & Real Estate</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Investment Record</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer, ID or advisor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
          />
        </div>

        {/* Type & Status Filters */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold text-slate-600">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="SIP">SIP</option>
              <option value="MUTUAL_FUND">Mutual Fund</option>
              <option value="FIXED_DEPOSIT">Fixed Deposit</option>
              <option value="INSURANCE">Insurance</option>
              <option value="STOCKS">Stocks</option>
              <option value="BONDS">Bonds</option>
              <option value="GOLD">Gold</option>
              <option value="REAL_ESTATE">Real Estate</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <span className="font-bold text-slate-600">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Investment ID / Customer</th>
                <th className="p-4">Advisor</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Est. Return / Interest</th>
                <th className="p-4">Maturity Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredInvestments.map((inv) => (
                <tr key={inv.id} className="hover:bg-brand-50/30 transition">
                  <td className="p-4">
                    <span className="font-extrabold text-[#1E6091] block">{inv.id}</span>
                    <span className="font-bold text-slate-900">{inv.customerName}</span>
                  </td>
                  <td className="p-4 font-semibold">{inv.advisorName}</td>
                  <td className="p-4">
                    <span className="badge badge-purple text-[10px] font-bold">{inv.type}</span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">₹ {inv.amount.toLocaleString()}</td>
                  <td className="p-4 font-bold text-emerald-600">{inv.interestRate} p.a.</td>
                  <td className="p-4 font-semibold text-slate-600">{inv.maturityDate}</td>
                  <td className="p-4">
                    <span className={`badge text-[10px] font-bold ${
                      inv.status === 'ACTIVE' ? 'badge-green' :
                      inv.status === 'APPROVED' ? 'badge-blue' :
                      inv.status === 'PENDING' ? 'badge-amber' : 'badge-purple'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {inv.status === 'PENDING' && (
                      <button
                        onClick={() => handleApprove(inv.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Investment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-amber-300" />
                <span>Create Investment Record</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvestment} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Suresh Raina"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Investment Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="SIP">SIP</option>
                    <option value="MUTUAL_FUND">Mutual Fund</option>
                    <option value="FIXED_DEPOSIT">Fixed Deposit</option>
                    <option value="INSURANCE">Insurance</option>
                    <option value="STOCKS">Stocks</option>
                    <option value="BONDS">Bonds</option>
                    <option value="GOLD">Gold</option>
                    <option value="REAL_ESTATE">Real Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Investment Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Months)</label>
                  <input
                    type="number"
                    required
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Est. Return Rate</label>
                  <input
                    type="text"
                    required
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="14.5%"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E6091] text-white font-bold shadow"
                >
                  Save Investment (Pending Approval)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
