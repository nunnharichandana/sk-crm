import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_STAFF } from '../services/mockDataService';
import { Award, TrendingUp, IndianRupee, Star, Users, CheckCircle2, Edit, UserPlus, X, Save } from 'lucide-react';

export const Staff = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [staffList, setStaffList] = useState(MOCK_STAFF);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Staff Advisor',
    email: '',
    target: 500000,
    branch: 'Kanchipuram Office'
  });

  const handleUpdateStaff = (e) => {
    e.preventDefault();
    setStaffList(prev => prev.map(s => s.id === editingStaff.id ? editingStaff : s));
    setEditingStaff(null);
    alert(`Advisor ${editingStaff.name}'s target and details updated successfully!`);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const created = {
      id: staffList.length + 10,
      employeeId: `EMP00${staffList.length + 1}`,
      ...newStaff,
      target: parseFloat(newStaff.target),
      achieved: 0,
      commissionEarned: 0,
      activeLeads: 0,
      rating: 5.0
    };
    setStaffList([...staffList, created]);
    setShowAddStaffModal(false);
    alert(`New Staff Advisor ${created.name} provisioned successfully!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Advisor Leaderboard & Staff Performance</h2>
          <p className="text-xs text-slate-500">Sales target tracking, commission payouts, and active lead allocation</p>
        </div>

        {isAdmin && (
          <button 
            onClick={() => setShowAddStaffModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
          >
            <UserPlus className="h-4 w-4" />
            <span>Provision New Staff</span>
          </button>
        )}
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staffList.map((staff, idx) => {
          const achievementPct = staff.target > 0 ? Math.round((staff.achieved / staff.target) * 100) : 0;
          return (
            <div key={staff.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-4 relative">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-[#1E6091] text-white flex items-center justify-center font-bold text-sm shadow">
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{staff.name}</h3>
                    <p className="text-[11px] text-slate-500">{staff.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{staff.rating}</span>
                  </div>

                  {isAdmin && (
                    <button 
                      onClick={() => setEditingStaff({ ...staff })}
                      className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold transition"
                      title="Edit Advisor Target & Role (Admin)"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Target Achievement</span>
                  <span className="font-extrabold text-brand-700">{achievementPct}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E6091] rounded-full" style={{ width: `${Math.min(achievementPct, 100)}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                  <span>Achieved: ₹{(staff.achieved / 100000).toFixed(2)}L</span>
                  <span>Target: ₹{(staff.target / 100000).toFixed(2)}L</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">Commission Earned</span>
                  <span className="text-xs font-extrabold text-emerald-600">₹ {staff.commissionEarned.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">Active Assigned Leads</span>
                  <span className="text-xs font-extrabold text-brand-700">{staff.activeLeads} Leads</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Admin Edit Staff Modal */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Admin: Edit Advisor Details ({editingStaff.name})</h3>
              <button onClick={() => setEditingStaff(null)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStaff} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Staff Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                <select 
                  value={editingStaff.role}
                  onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                >
                  <option value="Managing Director">Managing Director</option>
                  <option value="Manager">Manager</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Staff Advisor">Staff Advisor</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sales Target (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={editingStaff.target}
                  onChange={(e) => setEditingStaff({ ...editingStaff, target: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold text-brand-700" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingStaff(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Save Advisor Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Provision New Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Provision New Staff Advisor</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g. Balaji Raman"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="balaji@sksmartinvestments.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sales Target (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={newStaff.target}
                  onChange={(e) => setNewStaff({ ...newStaff, target: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddStaffModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Provision Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
