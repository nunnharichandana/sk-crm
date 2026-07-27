import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LEADS, MOCK_STAFF } from '../services/mockDataService';
import { 
  UserPlus, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  Send,
  UserCheck,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react';

export const Leads = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [leadsList, setLeadsList] = useState(MOCK_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    customerName: '',
    mobileNumber: '',
    email: '',
    insuranceType: 'Health Insurance',
    estimatedPremium: '',
    assignedStaff: 'Priya Nair',
    city: 'Kanchipuram',
    priority: 'HIGH'
  });

  const statuses = [
    'ALL', 'NEW', 'CONTACTED', 'INTERESTED', 'FOLLOW_UP', 
    'DOCUMENTS_PENDING', 'QUOTATION_SENT', 'NEGOTIATION', 
    'PAYMENT_PENDING', 'POLICY_ISSUED', 'LOST', 'REJECTED'
  ];

  const handleCreateLead = (e) => {
    e.preventDefault();
    const created = {
      id: `LD-2026-00${leadsList.length + 1}`,
      ...newLead,
      estimatedPremium: parseFloat(newLead.estimatedPremium) || 25000,
      leadSource: 'PORTAL_MANUAL',
      company: 'HDFC ERGO',
      assignedManager: 'Prakash Gajendran',
      branch: 'Kanchipuram Office',
      status: 'NEW',
      leadScore: 75,
      createdDate: new Date().toISOString().split('T')[0],
      notes: 'New manual entry from CRM dashboard.'
    };
    setLeadsList([created, ...leadsList]);
    setShowAddModal(false);
  };

  const handleUpdateLead = (e) => {
    e.preventDefault();
    setLeadsList(prev => prev.map(l => l.id === editingLead.id ? editingLead : l));
    setEditingLead(null);
    alert(`Lead details updated successfully for ${editingLead.id}!`);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm(`Are you sure you want to delete lead record ${id}?`)) {
      setLeadsList(prev => prev.filter(l => l.id !== id));
    }
  };

  const filteredLeads = leadsList.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.mobileNumber.includes(searchTerm) ||
                          lead.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Lead Lifecycle Management</h2>
          <p className="text-xs text-slate-500">
            {isAdmin ? 'Admin Master Control: View, Edit, Score, Transfer & Delete Leads' : 'Track, score, transfer and convert insurance prospects'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => alert("Exporting all leads to sk_leads_export.xlsx")}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-sm hover:bg-slate-50 transition"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
          >
            <UserPlus className="h-4 w-4" />
            <span>Create New Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by Lead ID, Customer Name or Mobile number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">Status Filter:</span>
          </div>

        </div>

        {/* Scrollable Status Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide transition whitespace-nowrap ${
                selectedStatus === st 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Lead ID / Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Insurance & Premium</th>
                <th className="p-4">Assigned Staff</th>
                <th className="p-4">Score / Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-brand-50/40 transition">
                  <td className="p-4">
                    <span className="font-extrabold text-brand-700 block">{lead.id}</span>
                    <span className="text-[10px] text-slate-400">{lead.createdDate}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{lead.customerName}</span>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{lead.mobileNumber}</span>
                      <span>•</span>
                      <span>{lead.city}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="badge badge-blue text-[10px]">{lead.insuranceType}</span>
                    <span className="font-bold text-slate-900 block mt-1">₹ {lead.estimatedPremium.toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-3.5 w-3.5 text-brand-600" />
                      <div>
                        <span className="font-bold text-slate-800 block">{lead.assignedStaff}</span>
                        <span className="text-[10px] text-slate-400">Kanchipuram</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold text-[11px] border border-emerald-200">
                        {lead.leadScore}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        lead.priority === 'URGENT' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.priority}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="badge badge-blue">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        onClick={() => setShowTransferModal(lead)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-100 text-slate-600 hover:text-brand-700 transition"
                        title="Transfer Lead"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => alert(`Initiating quick WhatsApp follow-up link for ${lead.customerName}`)}
                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold transition"
                        title="WhatsApp Reminder"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>

                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => setEditingLead({ ...lead })}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold transition"
                            title="Edit Lead Details (Admin Only)"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition"
                            title="Delete Lead Record (Admin Only)"
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

      {/* Admin Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Admin: Edit Lead ({editingLead.id})</h3>
              <button onClick={() => setEditingLead(null)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={editingLead.customerName}
                    onChange={(e) => setEditingLead({ ...editingLead, customerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    type="text" 
                    required 
                    value={editingLead.mobileNumber}
                    onChange={(e) => setEditingLead({ ...editingLead, mobileNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Type</label>
                  <select 
                    value={editingLead.insuranceType}
                    onChange={(e) => setEditingLead({ ...editingLead, insuranceType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Motor Insurance">Motor Insurance</option>
                    <option value="Mutual Funds & Investments">Mutual Funds & Investments</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Premium (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={editingLead.estimatedPremium}
                    onChange={(e) => setEditingLead({ ...editingLead, estimatedPremium: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Staff</label>
                  <select 
                    value={editingLead.assignedStaff}
                    onChange={(e) => setEditingLead({ ...editingLead, assignedStaff: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                  >
                    {MOCK_STAFF.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select 
                    value={editingLead.status}
                    onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                  >
                    {statuses.filter(s => s !== 'ALL').map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingLead(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Save Lead Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Customer Lead</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newLead.customerName}
                    onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    type="text" 
                    required 
                    value={newLead.mobileNumber}
                    onChange={(e) => setNewLead({ ...newLead, mobileNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Type</label>
                  <select 
                    value={newLead.insuranceType}
                    onChange={(e) => setNewLead({ ...newLead, insuranceType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Motor Insurance">Motor Insurance</option>
                    <option value="Mutual Funds & Investments">Mutual Funds & Investments</option>
                  </select>
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
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold hover:bg-brand-700 shadow"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Lead Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Transfer Lead {showTransferModal.id}</h3>
            <p className="text-xs text-slate-500">Re-assign {showTransferModal.customerName} to another staff advisor</p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Target Staff</label>
              <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none">
                {MOCK_STAFF.map(st => (
                  <option key={st.id} value={st.name}>{st.name} ({st.role})</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button onClick={() => setShowTransferModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">Cancel</button>
              <button 
                onClick={() => {
                  alert(`Lead ${showTransferModal.id} successfully transferred!`);
                  setShowTransferModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
