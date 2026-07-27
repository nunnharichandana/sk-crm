import React, { useState } from 'react';
import { MOCK_BRANCHES } from '../services/mockDataService';
import { Settings as SettingsIcon, Building2, Shield, Bell, Save, Check } from 'lucide-react';

export const Settings = () => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'SK Smart Insurance Services Pvt Ltd',
    gstin: '27AAACS1234F1Z5',
    license: 'IRDAI Broker License No. 784/2021',
    supportEmail: 'support@sksmartinsurance.com',
    supportPhone: '+91 22 6600 1100'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">System Configurations & Corporate Branding</h2>
          <p className="text-xs text-slate-500">Manage IRDAI license compliance details, branch locations & notification channels</p>
        </div>

        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0A4DA2] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          {savedSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{savedSuccess ? 'Settings Saved!' : 'Save System Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Company Identity Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-brand-600" />
            <span>Corporate Master Profile</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Registered Name</label>
              <input 
                type="text" 
                value={companyInfo.name} 
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">IRDAI Brokerage License Number</label>
              <input 
                type="text" 
                value={companyInfo.license} 
                onChange={(e) => setCompanyInfo({ ...companyInfo, license: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                <input 
                  type="email" 
                  value={companyInfo.supportEmail} 
                  onChange={(e) => setCompanyInfo({ ...companyInfo, supportEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Helpline</label>
                <input 
                  type="text" 
                  value={companyInfo.supportPhone} 
                  onChange={(e) => setCompanyInfo({ ...companyInfo, supportPhone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Branch Network List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-emerald-600" />
            <span>Active Branch Offices Network</span>
          </h3>

          <div className="space-y-3">
            {MOCK_BRANCHES.map(b => (
              <div key={b.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-brand-700 block">{b.name} ({b.code})</span>
                  <span className="text-slate-500">{b.city}, {b.state}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 block">{b.staffCount} Staff</span>
                  <span className="badge badge-green text-[10px]">Operational</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
