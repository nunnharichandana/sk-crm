import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_POLICIES } from '../services/mockDataService';
import { 
  FileText, 
  Download, 
  Plus,
  Search,
  CheckCircle2,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react';

export const Policies = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [policiesList, setPoliciesList] = useState(MOCK_POLICIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);

  // Issue Policy Form State
  const [newPolicy, setNewPolicy] = useState({
    policyNumber: `POL-SK-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: '',
    insuranceCompany: 'Star Health Insurance',
    type: 'Health Insurance',
    sumInsured: 1000000,
    grossPremium: 35000,
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: '2027-07-26'
  });

  const handleIssuePolicy = (e) => {
    e.preventDefault();
    const created = {
      id: newPolicy.policyNumber,
      ...newPolicy,
      sumInsured: parseFloat(newPolicy.sumInsured),
      grossPremium: parseFloat(newPolicy.grossPremium),
      customerCode: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: newPolicy.startDate,
      status: 'ACTIVE',
      staffAssigned: 'Priya Nair',
      branch: 'Kanchipuram Office'
    };
    setPoliciesList([created, ...policiesList]);
    setShowIssueModal(false);
    alert(`Policy ${created.id} issued successfully for ${created.customerName}!`);
  };

  const handleUpdatePolicy = (e) => {
    e.preventDefault();
    setPoliciesList(prev => prev.map(p => p.id === editingPolicy.id ? editingPolicy : p));
    setEditingPolicy(null);
    alert(`Policy details updated successfully for ${editingPolicy.id}!`);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm(`Are you sure you want to delete policy ${id}?`)) {
      setPoliciesList(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredPolicies = policiesList.filter(pol =>
    pol.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pol.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pol.insuranceCompany.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Policy Register & Contract Management</h2>
          <p className="text-xs text-slate-500">
            {isAdmin ? 'Admin Master Control: View, Edit, Issue & Delete Policy Records' : 'Issued policies, active coverage status & policy certificate downloads'}
          </p>
        </div>

        <button 
          onClick={() => setShowIssueModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          <Plus className="h-4 w-4" />
          <span>Issue New Policy</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search Policy Number, Customer Name or Insurance Company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
          />
        </div>
      </div>

      {/* Active Policies Master Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Issued Policy Register</h3>
          <span className="badge badge-blue text-xs">{filteredPolicies.length} Policies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Policy Number</th>
                <th className="p-4">Customer & Company</th>
                <th className="p-4">Sum Insured</th>
                <th className="p-4">Gross Premium</th>
                <th className="p-4">Validity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredPolicies.map((pol) => (
                <tr key={pol.id} className="hover:bg-brand-50/30 transition">
                  <td className="p-4 font-bold text-[#1E6091]">{pol.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{pol.customerName}</span>
                    <span className="text-[10px] text-slate-500">{pol.insuranceCompany}</span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">₹ {pol.sumInsured.toLocaleString()}</td>
                  <td className="p-4 font-bold text-emerald-600">₹ {pol.grossPremium.toLocaleString()}</td>
                  <td className="p-4 text-[11px] text-slate-600">{pol.startDate} to {pol.expiryDate}</td>
                  <td className="p-4">
                    <span className={`badge ${pol.status === 'ACTIVE' ? 'badge-green' : 'badge-amber'}`}>
                      {pol.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => alert(`Downloading official PDF Policy Certificate for ${pol.id}`)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-100 text-brand-700 font-bold transition"
                        title="Download PDF Policy Bond"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>

                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => setEditingPolicy({ ...pol })}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold transition"
                            title="Edit Policy Details (Admin Only)"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeletePolicy(pol.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition"
                            title="Delete Policy Record (Admin Only)"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Edit Policy Modal */}
      {editingPolicy && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Admin: Edit Policy Details ({editingPolicy.id})</h3>
              <button onClick={() => setEditingPolicy(null)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePolicy} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={editingPolicy.customerName}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, customerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Company</label>
                  <input 
                    type="text"
                    required
                    value={editingPolicy.insuranceCompany}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, insuranceCompany: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Policy Type</label>
                  <select 
                    value={editingPolicy.type}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Motor Insurance">Motor Insurance</option>
                    <option value="Mutual Funds & Investments">Mutual Funds & Investments</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sum Insured (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={editingPolicy.sumInsured}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, sumInsured: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gross Premium (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={editingPolicy.grossPremium}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, grossPremium: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input 
                    type="date" 
                    required 
                    value={editingPolicy.expiryDate}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, expiryDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Policy Status</label>
                  <select 
                    value={editingPolicy.status}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PENDING_RENEWAL">PENDING_RENEWAL</option>
                    <option value="EXPIRED">EXPIRED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingPolicy(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Save Policy Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Policy Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Issue New Policy Certificate</h3>
              <button onClick={() => setShowIssueModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleIssuePolicy} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={newPolicy.customerName}
                  onChange={(e) => setNewPolicy({ ...newPolicy, customerName: e.target.value })}
                  placeholder="e.g. Anand Gopal"
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
                    <option value="Star Health Insurance">Star Health Insurance</option>
                    <option value="HDFC ERGO General Insurance">HDFC ERGO</option>
                    <option value="Tata AIG General">Tata AIG</option>
                    <option value="ICICI Prudential Life">ICICI Prudential</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Policy Category</label>
                  <select 
                    value={newPolicy.type}
                    onChange={(e) => setNewPolicy({ ...newPolicy, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Motor Insurance">Motor Insurance</option>
                    <option value="Mutual Funds & Investments">Mutual Funds & Investments</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sum Insured / Investment (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={newPolicy.sumInsured}
                    onChange={(e) => setNewPolicy({ ...newPolicy, sumInsured: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gross Premium / Annual (₹)</label>
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
                <button type="button" onClick={() => setShowIssueModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Confirm Issue Policy</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
