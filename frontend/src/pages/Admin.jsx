import React, { useState } from 'react';
import { MOCK_AUDIT_LOGS, MOCK_ROLES } from '../services/mockDataService';
import { ShieldCheck, Users, Key, History, Lock, UserPlus, CheckCircle } from 'lucide-react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('USERS'); // USERS, ROLES, AUDIT

  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'superadmin@sksmartinsurance.com', role: 'Super Admin', branch: 'Headquarters', status: 'ACTIVE' },
    { id: 2, name: 'Sunita Sharma', email: 'admin@sksmartinsurance.com', role: 'Administrator', branch: 'Headquarters', status: 'ACTIVE' },
    { id: 3, name: 'Ananya Deshmukh', email: 'bm.mumbai@sksmartinsurance.com', role: 'Branch Manager', branch: 'Mumbai HQ', status: 'ACTIVE' },
    { id: 4, name: 'Priya Nair', email: 'priya.advisor@sksmartinsurance.com', role: 'Insurance Advisor', branch: 'Mumbai HQ', status: 'ACTIVE' },
  ]);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">System Administration & Audit Security</h2>
          <p className="text-xs text-slate-500">Manage system users, access control policies, permissions matrix & audit logs</p>
        </div>

        <button 
          onClick={() => alert("Create new system user modal")}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0A4DA2] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          <UserPlus className="h-4 w-4" />
          <span>Provision New User</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        {[
          { id: 'USERS', label: 'User Accounts Management' },
          { id: 'ROLES', label: 'Roles & Permission Matrix' },
          { id: 'AUDIT', label: 'Security Audit Logs' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
              activeTab === t.id ? 'border-brand-600 text-brand-700 font-extrabold' : 'border-transparent text-slate-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      {activeTab === 'USERS' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Branch Office</th>
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
                  <td className="p-4">{u.branch}</td>
                  <td className="p-4"><span className="badge badge-green">{u.status}</span></td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => alert(`Resetting password & credentials for ${u.name}`)}
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      Reset Credentials
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'ROLES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_ROLES.map(r => (
            <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">{r.name}</h3>
                <span className="badge badge-blue text-[10px]">{r.id}</span>
              </div>
              <p className="text-xs text-slate-500">{r.desc}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>System Default Role</span>
                </span>
                <button onClick={() => alert("Editing permission matrix")} className="text-brand-600 font-bold hover:underline">Edit Permissions</button>
              </div>
            </div>
          ))}
        </div>
      )}

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

    </div>
  );
};
