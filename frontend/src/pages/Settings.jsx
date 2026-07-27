import React, { useState } from 'react';
import { COMPANY_INFO } from '../services/mockDataService';
import { Logo } from '../components/common/Logo';
import { Building2, Save, Check, MapPin, UserCheck, Shield } from 'lucide-react';

export const Settings = () => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: COMPANY_INFO.name,
    tagline: COMPANY_INFO.tagline,
    mdName: COMPANY_INFO.mdName,
    license: COMPANY_INFO.irdaLicense,
    location: COMPANY_INFO.location,
    address: COMPANY_INFO.address,
    supportEmail: COMPANY_INFO.email,
    supportPhone: COMPANY_INFO.phone
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
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Company Master Settings</h2>
          <p className="text-xs text-slate-500">Manage company information, IRDA compliance & office details</p>
        </div>

        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          {savedSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{savedSuccess ? 'Settings Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Company Identity Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-brand-600" />
              <span>Corporate Master Profile</span>
            </h3>
            <Logo size="sm" variant="mark" />
          </div>

          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Registered Name</label>
              <input 
                type="text" 
                value={companyInfo.name} 
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Tagline</label>
              <input 
                type="text" 
                value={companyInfo.tagline} 
                onChange={(e) => setCompanyInfo({ ...companyInfo, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none font-semibold text-brand-700"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Managing Director (MD)</label>
              <input 
                type="text" 
                value={companyInfo.mdName} 
                onChange={(e) => setCompanyInfo({ ...companyInfo, mdName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">IRDA / Government License Number</label>
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
                <label className="block font-bold text-slate-700 mb-1">Support Phone</label>
                <input 
                  type="text" 
                  value={companyInfo.supportPhone} 
                  onChange={(e) => setCompanyInfo({ ...companyInfo, supportPhone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 outline-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Location & Office Info (Kanchipuram, Tamil Nadu) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-amber-500" />
            <span>Kanchipuram Office Headquarters</span>
          </h3>

          <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/40 space-y-2 text-xs">
            <span className="badge badge-amber text-[10px]">Primary Registered Location</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{companyInfo.name}</h4>
            <p className="text-slate-700 leading-relaxed">{companyInfo.address}</p>
            <div className="pt-2 flex items-center space-x-2 text-slate-600 font-semibold">
              <UserCheck className="h-4 w-4 text-brand-600" />
              <span>MD: {companyInfo.mdName}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
