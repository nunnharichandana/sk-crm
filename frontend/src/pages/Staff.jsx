import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_STAFF } from '../services/mockDataService';
import { 
  Award, 
  Star, 
  UserPlus, 
  Edit, 
  Trash2, 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  X, 
  Save
} from 'lucide-react';

export const Staff = () => {
  const { user, updateUserProfile } = useAuth();
  const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';

  const [staffList, setStaffList] = useState(MOCK_STAFF);
  const [activeTab, setActiveTab] = useState('LEADERBOARD');
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const [editingStaff, setEditingStaff] = useState(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: 'Password@123',
    phone: '',
    role: 'Staff Advisor',
    roleCode: 'STAFF',
    target: 500000,
    branch: 'Kanchipuram Office'
  });

  const togglePasswordVisibility = (id) => {
    setShowPasswordMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateStaff = (e) => {
    e.preventDefault();
    setStaffList(prev => prev.map(s => s.id === editingStaff.id ? editingStaff : s));

    // Update global MOCK_STAFF store
    const idx = MOCK_STAFF.findIndex(s => s.id === editingStaff.id);
    if (idx !== -1) {
      MOCK_STAFF[idx] = { ...editingStaff };
    }

    // Live update active user profile if editing currently logged-in account
    if (user && (user.id === editingStaff.id || user.email.toLowerCase() === editingStaff.email.toLowerCase())) {
      updateUserProfile({
        name: editingStaff.name,
        email: editingStaff.email,
        role: editingStaff.roleCode || user.role,
        roleDisplayName: editingStaff.role
      });
    }

    alert(`Advisor ${editingStaff.name}'s login credentials and details updated successfully! Live Dashboard re-rendered.`);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id, name) => {
    if (window.confirm(`Deactivate and remove staff account for ${name}?`)) {
      setStaffList(prev => prev.filter(s => s.id !== id));
      const idx = MOCK_STAFF.findIndex(s => s.id === id);
      if (idx !== -1) MOCK_STAFF.splice(idx, 1);
    }
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
      rating: 5.0,
      status: 'ACTIVE'
    };
    setStaffList([...staffList, created]);
    MOCK_STAFF.push(created);
    setShowAddStaffModal(false);
    alert(`Staff account & Login Credentials for ${created.name} provisioned successfully!\nEmail: ${created.email}\nPassword: ${created.password}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Staff Management & Credentials Directory</h2>
          <p className="text-xs text-slate-500">
            {isAdmin ? 'Provision staff login accounts, view login credentials & set sales targets' : 'Advisor performance leaderboard & team targets'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {isAdmin && (
            <button 
              onClick={() => setShowAddStaffModal(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>Provision Staff & Login Credentials</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      {isAdmin && (
        <div className="flex items-center space-x-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('LEADERBOARD')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'LEADERBOARD' ? 'border-brand-600 text-brand-700 font-extrabold' : 'border-transparent text-slate-500'
            }`}
          >
            Advisor Leaderboard & Targets
          </button>
          <button
            onClick={() => setActiveTab('VAULT')}
            className={`pb-3 px-4 text-xs font-bold transition flex items-center space-x-2 border-b-2 cursor-pointer ${
              activeTab === 'VAULT' ? 'border-brand-600 text-brand-700 font-extrabold' : 'border-transparent text-slate-500'
            }`}
          >
            <Key className="h-3.5 w-3.5 text-amber-500" />
            <span>Staff Login Credentials Directory</span>
            <span className="badge badge-amber text-[10px]">{staffList.length} Accounts</span>
          </button>
        </div>
      )}

      {/* TAB 1: ADVISOR LEADERBOARD */}
      {activeTab === 'LEADERBOARD' && (
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

                  <div className="flex items-center space-x-1.5">
                    <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span>{staff.rating}</span>
                    </div>

                    {isAdmin && (
                      <>
                        <button 
                          onClick={() => setEditingStaff({ ...staff })}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold transition cursor-pointer"
                          title="Edit Credentials & Target"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteStaff(staff.id, staff.name)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition cursor-pointer"
                          title="Delete Staff Account"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
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
      )}

      {/* TAB 2: STAFF LOGIN CREDENTIALS DIRECTORY */}
      {isAdmin && activeTab === 'VAULT' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Key className="h-5 w-5 text-amber-500" />
                <span>Staff Login Credentials Master Vault</span>
              </h3>
              <p className="text-xs text-slate-500">Managing Director Access Only: View and update employee login emails & passwords</p>
            </div>
            <span className="badge badge-amber text-xs">MD Restricted</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-4">Employee ID / Name</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Login Email</th>
                  <th className="p-4">Login Password</th>
                  <th className="p-4 text-right">Credentials Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {staffList.map((st) => (
                  <tr key={st.id} className="hover:bg-amber-50/20 transition">
                    <td className="p-4">
                      <span className="font-extrabold text-slate-900 block">{st.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{st.employeeId}</span>
                    </td>
                    <td className="p-4">
                      <span className="badge badge-blue">{st.role}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-800 font-semibold">{st.email}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-bold text-slate-800">
                          {showPasswordMap[st.id] ? st.password : '••••••••••••'}
                        </span>
                        <button 
                          onClick={() => togglePasswordVisibility(st.id)}
                          className="text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Show/Hide Password"
                        >
                          {showPasswordMap[st.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => copyToClipboard(`Email: ${st.email}\nPassword: ${st.password}`, st.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-100 text-slate-700 font-bold transition flex items-center space-x-1 cursor-pointer"
                          title="Copy Login Credentials"
                        >
                          {copiedId === st.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedId === st.id ? 'Copied!' : 'Copy Credentials'}</span>
                        </button>

                        <button 
                          onClick={() => setEditingStaff({ ...st })}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold transition cursor-pointer"
                          title="Edit Credentials"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Provision New Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Provision Staff Account & Login Credentials</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Staff Full Name</label>
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
                <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                <select 
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                >
                  <option value="Manager">Manager</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Staff Advisor">Staff Advisor</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Login Email</label>
                <input 
                  type="email" 
                  required 
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="balaji@sksmartinvestments.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Password</label>
                <input 
                  type="text" 
                  required 
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono font-bold" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input 
                    type="text" 
                    required 
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    placeholder="+91 98423 66778"
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
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddStaffModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Provision Account & Credentials</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Credentials & Target Modal */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Staff & Credentials ({editingStaff.name})</h3>
              <button onClick={() => setEditingStaff(null)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStaff} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Staff Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold text-slate-900" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Login Email</label>
                <input 
                  type="email" 
                  required 
                  value={editingStaff.email}
                  onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Login Password</label>
                <input 
                  type="text" 
                  required 
                  value={editingStaff.password}
                  onChange={(e) => setEditingStaff({ ...editingStaff, password: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono font-bold text-slate-900" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                  <select 
                    value={editingStaff.role}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                  >
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
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingStaff(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Update Account & Sync Dashboard</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
