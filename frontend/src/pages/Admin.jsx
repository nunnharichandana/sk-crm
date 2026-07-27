import React, { useState } from 'react';
import { MOCK_AUDIT_LOGS, MOCK_ROLES, INITIAL_COMPANIES, COMPANY_INFO } from '../services/mockDataService';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  UserPlus, 
  FileText,
  Save,
  X,
  Phone,
  Mail
} from 'lucide-react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('COMPANIES'); // COMPANIES, USERS, AUDIT

  // Insurance Companies & Products Master State
  const [companiesList, setCompaniesList] = useState(INITIAL_COMPANIES);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);

  const [newCompany, setNewCompany] = useState({
    name: '',
    code: '',
    supportEmail: '',
    tollFree: ''
  });

  const [newProductName, setNewProductName] = useState('');

  // User Accounts State
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Prakash Gajendran', email: 'prakash.md@sksmartinvestments.com', role: 'Managing Director (MD)', location: 'Kanchipuram Office', status: 'ACTIVE' },
    { id: 2, name: 'Manager', email: 'manager.kanchipuram@sksmartinvestments.com', role: 'Manager', location: 'Kanchipuram Office', status: 'ACTIVE' },
    { id: 3, name: 'Priya Nair', email: 'priya.advisor@sksmartinvestments.com', role: 'Staff Advisor', location: 'Kanchipuram Office', status: 'ACTIVE' },
    { id: 4, name: 'Amit Verma', email: 'amit.advisor@sksmartinvestments.com', role: 'Staff Advisor', location: 'Kanchipuram Office', status: 'ACTIVE' },
  ]);

  // Company Master Actions
  const handleCreateCompany = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      ...newCompany,
      code: newCompany.name.toUpperCase().replace(/\s+/g, '_'),
      products: []
    };
    setCompaniesList([...companiesList, created]);
    setShowAddCompanyModal(false);
    setNewCompany({ name: '', code: '', supportEmail: '', tollFree: '' });
    alert(`New Insurance Company "${created.name}" added to master directory!`);
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    setCompaniesList(prev => prev.map(c => c.id === editingCompany.id ? editingCompany : c));
    setEditingCompany(null);
    alert(`Insurance Company details updated for ${editingCompany.name}!`);
  };

  const handleDeleteCompany = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from insurance providers directory?`)) {
      setCompaniesList(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleAddProduct = (companyId) => {
    if (!newProductName.trim()) return;
    setCompaniesList(prev => prev.map(c => {
      if (c.id === companyId) {
        return { ...c, products: [...c.products, newProductName.trim()] };
      }
      return c;
    }));
    setShowAddProductModal(null);
    setNewProductName('');
    alert(`Policy Product added to company repository!`);
  };

  const handleRemoveProduct = (companyId, productName) => {
    if (window.confirm(`Remove policy product "${productName}"?`)) {
      setCompaniesList(prev => prev.map(c => {
        if (c.id === companyId) {
          return { ...c, products: c.products.filter(p => p !== productName) };
        }
        return c;
      }));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Managing Director (MD) Master Control Panel</h2>
          <p className="text-xs text-slate-500">
            MD: <strong>{COMPANY_INFO.mdName}</strong> • Manage master insurance companies, policy products, users & audit logs
          </p>
        </div>

        {activeTab === 'COMPANIES' && (
          <button 
            onClick={() => setShowAddCompanyModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add Insurance Company</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        {[
          { id: 'COMPANIES', label: 'Master Insurance Companies & Products' },
          { id: 'USERS', label: 'User Account Provisioning' },
          { id: 'AUDIT', label: 'Security Audit Logs' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
              activeTab === t.id ? 'border-brand-600 text-brand-700 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. MASTER INSURANCE COMPANIES & POLICY PRODUCTS */}
      {activeTab === 'COMPANIES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companiesList.map((comp) => (
            <div key={comp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-4">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900">{comp.name}</h3>
                  <span className="badge badge-blue text-[10px] mt-1">{comp.code}</span>
                </div>
                
                <div className="flex items-center space-x-1.5">
                  <button 
                    onClick={() => setEditingCompany({ ...comp })}
                    className="p-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold hover:bg-amber-100 transition"
                    title="Edit Company Details"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCompany(comp.id, comp.name)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition"
                    title="Remove Company"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3.5 w-3.5 text-brand-600" />
                  <span className="truncate">{comp.supportEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-brand-600" />
                  <span>{comp.tollFree}</span>
                </div>
              </div>

              {/* Products under Company */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Associated Policy Products ({comp.products.length}):</span>
                  <button 
                    onClick={() => setShowAddProductModal(comp.id)}
                    className="text-[11px] font-bold text-brand-600 hover:underline flex items-center space-x-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {comp.products.map((prod, pIdx) => (
                    <div key={pIdx} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{prod}</span>
                      <button 
                        onClick={() => handleRemoveProduct(comp.id, prod)}
                        className="text-rose-500 hover:text-rose-700"
                        title="Remove Product"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 2. USER ACCOUNTS MANAGEMENT */}
      {activeTab === 'USERS' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Office Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {usersList.map(u => (
                <tr key={u.id} className="hover:bg-brand-50/30 transition">
                  <td className="p-4 font-bold text-slate-900">{u.name}</td>
                  <td className="p-4 text-slate-600">{u.email}</td>
                  <td className="p-4"><span className="badge badge-blue">{u.role}</span></td>
                  <td className="p-4">{u.location}</td>
                  <td className="p-4"><span className="badge badge-green">{u.status}</span></td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => alert(`Resetting credentials for ${u.name}`)}
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. AUDIT LOGS */}
      {activeTab === 'AUDIT' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Module</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {MOCK_AUDIT_LOGS.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-500">{a.timestamp}</td>
                  <td className="p-4 font-bold text-slate-900">{a.user}</td>
                  <td className="p-4"><span className="badge badge-purple">{a.action}</span></td>
                  <td className="p-4">{a.module}</td>
                  <td className="p-4 font-mono text-[11px] text-slate-500">{a.ip}</td>
                  <td className="p-4 text-slate-600">{a.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Company Modal */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add New Insurance Company</h3>
              <button onClick={() => setShowAddCompanyModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="e.g. Care Health Insurance"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                <input 
                  type="email" 
                  required 
                  value={newCompany.supportEmail}
                  onChange={(e) => setNewCompany({ ...newCompany, supportEmail: e.target.value })}
                  placeholder="support@careinsurance.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Claim Toll-Free Phone</label>
                <input 
                  type="text" 
                  required 
                  value={newCompany.tollFree}
                  onChange={(e) => setNewCompany({ ...newCompany, tollFree: e.target.value })}
                  placeholder="1800-102-4488"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddCompanyModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Save Company</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Company Modal */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Insurance Company Details</h3>
              <button onClick={() => setEditingCompany(null)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCompany} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  required 
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                <input 
                  type="email" 
                  required 
                  value={editingCompany.supportEmail}
                  onChange={(e) => setEditingCompany({ ...editingCompany, supportEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Toll-Free Phone</label>
                <input 
                  type="text" 
                  required 
                  value={editingCompany.tollFree}
                  onChange={(e) => setEditingCompany({ ...editingCompany, tollFree: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingCompany(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Update Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm p-6 space-y-4 animate-in fade-in duration-150">
            <h3 className="font-bold text-sm text-slate-900">Add New Policy Product</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
              <input 
                type="text" 
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="e.g. Optima Secure Health"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button onClick={() => setShowAddProductModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">Cancel</button>
              <button 
                onClick={() => handleAddProduct(showAddProductModal)}
                className="px-4 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
