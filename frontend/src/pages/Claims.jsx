import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_CLAIMS } from '../services/mockDataService';
import { 
  ShieldAlert, 
  Plus, 
  Upload,
  Edit,
  Trash2,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';

export const Claims = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [claimsList, setClaimsList] = useState(MOCK_CLAIMS);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);

  const [newClaim, setNewClaim] = useState({
    policyNumber: 'POL-HDFC-2026-78901',
    customerName: 'Neha Agarwal',
    claimAmount: '',
    incidentDate: '2026-07-20',
    hospitalName: 'Kanchipuram Government Hospital'
  });

  const handleRegisterClaim = (e) => {
    e.preventDefault();
    const created = {
      id: `CLM-2026-0${claimsList.length + 95}`,
      ...newClaim,
      claimAmount: parseFloat(newClaim.claimAmount) || 50000,
      settledAmount: 0,
      intimationDate: new Date().toISOString().split('T')[0],
      insuranceCompany: 'HDFC ERGO',
      status: 'SUBMITTED',
      assignedStaff: 'Priya Nair'
    };
    setClaimsList([created, ...claimsList]);
    setShowClaimModal(false);
    alert(`Claim intimation ${created.id} registered!`);
  };

  const handleUpdateClaim = (e) => {
    e.preventDefault();
    setClaimsList(prev => prev.map(c => c.id === editingClaim.id ? editingClaim : c));
    setEditingClaim(null);
    alert(`Claim ${editingClaim.id} updated successfully! Settlement status saved.`);
  };

  const handleDeleteClaim = (id) => {
    if (window.confirm(`Delete claim intimation ${id}?`)) {
      setClaimsList(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Claims Settlement & Intimation Portal</h2>
          <p className="text-xs text-slate-500">
            {isAdmin ? 'MD Control: Register, Edit, Approve, Settle or Reject Claims Intimations' : 'Register new claims, track hospital/workshop intimations & approval workflows'}
          </p>
        </div>

        <button 
          onClick={() => setShowClaimModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          <Plus className="h-4 w-4" />
          <span>Register New Claim</span>
        </button>
      </div>

      {/* Claims List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Active Claims Queue</h3>
          <span className="badge badge-rose text-xs">{claimsList.length} Intimations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Claim ID / Intimation Date</th>
                <th className="p-4">Policy & Customer</th>
                <th className="p-4">Hospital / Workshop</th>
                <th className="p-4">Claim Amount</th>
                <th className="p-4">Settled Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {claimsList.map((cl) => (
                <tr key={cl.id} className="hover:bg-brand-50/30 transition">
                  <td className="p-4">
                    <span className="font-extrabold text-rose-700 block">{cl.id}</span>
                    <span className="text-[10px] text-slate-400">{cl.intimationDate}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{cl.customerName}</span>
                    <span className="text-[10px] text-brand-600 font-bold">{cl.policyNumber}</span>
                  </td>
                  <td className="p-4 text-xs font-semibold text-slate-700">{cl.hospitalName}</td>
                  <td className="p-4 font-extrabold text-slate-900">₹ {cl.claimAmount.toLocaleString()}</td>
                  <td className="p-4 font-extrabold text-emerald-600">₹ {cl.settledAmount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`badge ${cl.status === 'SETTLED' ? 'badge-green' : 'badge-amber'}`}>
                      {cl.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        onClick={() => alert(`Reviewing claim documents for ${cl.id}`)}
                        className="px-2.5 py-1.5 rounded-lg bg-brand-50 text-brand-700 font-bold hover:bg-brand-100 transition"
                      >
                        Review
                      </button>

                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => setEditingClaim({ ...cl })}
                            className="p-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold hover:bg-amber-100 transition"
                            title="Edit Claim & Settlement (MD)"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClaim(cl.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition"
                            title="Delete Claim"
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

      {/* Admin Edit Claim Modal */}
      {editingClaim && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">MD Control: Edit Claim Settlement ({editingClaim.id})</h3>
              <button onClick={() => setEditingClaim(null)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateClaim} className="p-6 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={editingClaim.customerName}
                    onChange={(e) => setEditingClaim({ ...editingClaim, customerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital / Workshop</label>
                  <input 
                    type="text" 
                    required 
                    value={editingClaim.hospitalName}
                    onChange={(e) => setEditingClaim({ ...editingClaim, hospitalName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Claim Amount Intimated (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={editingClaim.claimAmount}
                    onChange={(e) => setEditingClaim({ ...editingClaim, claimAmount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Settled Amount Approved (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={editingClaim.settledAmount}
                    onChange={(e) => setEditingClaim({ ...editingClaim, settledAmount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold text-emerald-600" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Settlement Workflow Status</label>
                <select 
                  value={editingClaim.status}
                  onChange={(e) => setEditingClaim({ ...editingClaim, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="UNDER_INVESTIGATION">UNDER_INVESTIGATION</option>
                  <option value="DOCUMENTS_REQUIRED">DOCUMENTS_REQUIRED</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="SETTLED">SETTLED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingClaim(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Update Claim Settlement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claim Registration Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Register New Insurance Claim</h3>
              <button onClick={() => setShowClaimModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterClaim} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Policy Number</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-brand-700 focus:ring-2 focus:ring-brand-600 outline-none">
                  <option value="POL-HDFC-2026-78901">POL-HDFC-2026-78901 (Neha Agarwal - HDFC ERGO)</option>
                  <option value="POL-STAR-2025-45612">POL-STAR-2025-45612 (Arjun Singhania - Star Health)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Claim Intimation Amount (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={newClaim.claimAmount}
                    onChange={(e) => setNewClaim({ ...newClaim, claimAmount: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Incident Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newClaim.incidentDate}
                    onChange={(e) => setNewClaim({ ...newClaim, incidentDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hospital / Workshop Name</label>
                <input 
                  type="text" 
                  required 
                  value={newClaim.hospitalName}
                  onChange={(e) => setNewClaim({ ...newClaim, hospitalName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
                <Upload className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-600 font-bold block">Upload Medical Discharge Summary / Repair Estimate</span>
                <span className="text-[10px] text-slate-400">PDF, PNG, JPG up to 10MB</span>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowClaimModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Submit Claim Intimation</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
