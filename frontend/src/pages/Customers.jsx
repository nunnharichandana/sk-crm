import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_POLICIES } from '../services/mockDataService';
import { 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Save,
  X,
  Plus
} from 'lucide-react';

export const Customers = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [selectedCustomer, setSelectedCustomer] = useState({
    code: 'CUST-1004',
    name: 'Neha Agarwal',
    email: 'neha.a@fintech.io',
    mobile: '+91 98444 55566',
    whatsapp: '+91 98444 55566',
    dob: '1990-05-14',
    occupation: 'VP of Finance',
    pan: 'ABCDE1234F',
    aadhaar: 'XXXX-XXXX-8921',
    address: 'Gandhi Road, Kanchipuram, Tamil Nadu - 631501',
    nominee: 'Rajesh Agarwal (Husband - 100% Allocation)',
    kycStatus: 'VERIFIED'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...selectedCustomer });

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    setSelectedCustomer({ ...editForm });
    setIsEditing(false);
    alert("Customer master record updated successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer 360° Profile</h2>
          <p className="text-xs text-slate-500">Comprehensive customer relationship, KYC compliance & policy history</p>
        </div>

        <div className="flex items-center space-x-3">
          {isAdmin && (
            <button 
              onClick={() => {
                setEditForm({ ...selectedCustomer });
                setIsEditing(true);
              }}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs shadow-sm hover:bg-amber-100 transition"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Customer Profile</span>
            </button>
          )}

          <button 
            onClick={() => alert("Add new customer master profile wizard")}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
          >
            <Plus className="h-4 w-4" />
            <span>New Customer Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Identity Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-6">
          <div className="text-center space-y-2 pb-4 border-b border-slate-100">
            <div className="mx-auto h-20 w-20 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center text-brand-700 text-2xl font-black">
              {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{selectedCustomer.name}</h3>
            <span className="badge badge-green text-xs">KYC {selectedCustomer.kycStatus}</span>
            <p className="text-xs text-slate-500 font-mono">{selectedCustomer.code}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center space-x-3 text-slate-700">
              <Phone className="h-4 w-4 text-brand-600" />
              <span>{selectedCustomer.mobile}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-700">
              <Mail className="h-4 w-4 text-brand-600" />
              <span>{selectedCustomer.email}</span>
            </div>
            <div className="flex items-start space-x-3 text-slate-700">
              <MapPin className="h-4 w-4 text-brand-600 mt-0.5" />
              <span>{selectedCustomer.address}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">PAN Card:</span>
              <span className="font-mono font-bold text-slate-800">{selectedCustomer.pan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Aadhaar Card:</span>
              <span className="font-mono font-bold text-slate-800">{selectedCustomer.aadhaar}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Occupation:</span>
              <span className="font-bold text-slate-800">{selectedCustomer.occupation}</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Active Policy History & KYC Documents */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Policies Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-brand-600" />
              <span>Associated Policy Portfolio</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {MOCK_POLICIES.map((pol) => (
                <div key={pol.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-brand-700 text-xs">{pol.id}</span>
                      <span className="badge badge-blue text-[10px]">{pol.type}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{pol.insuranceCompany}</p>
                    <p className="text-[11px] text-slate-400">Valid: {pol.startDate} to {pol.expiryDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 block">₹ {pol.grossPremium.toLocaleString()}</span>
                    <span className="badge badge-green text-[10px]">{pol.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KYC Documents & Family Nominee */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span>KYC Compliance Vault & Nominee</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">PAN Card Copy</p>
                  <p className="text-[10px] text-slate-400">Verified on 2026-01-14</p>
                </div>
                <span className="badge badge-green text-[10px]">Approved</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Aadhaar e-KYC</p>
                  <p className="text-[10px] text-slate-400">UIDAI OTP Verified</p>
                </div>
                <span className="badge badge-green text-[10px]">Approved</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-50/50 border border-brand-100 text-xs space-y-1">
              <p className="font-bold text-brand-700">Nominee Details:</p>
              <p className="text-slate-700">{selectedCustomer.nominee}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Admin Edit Customer Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Admin: Edit Customer Profile ({editForm.code})</h3>
              <button onClick={() => setIsEditing(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    type="text" 
                    required 
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Occupation</label>
                  <input 
                    type="text" 
                    required 
                    value={editForm.occupation}
                    onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">PAN Number</label>
                  <input 
                    type="text" 
                    required 
                    value={editForm.pan}
                    onChange={(e) => setEditForm({ ...editForm, pan: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aadhaar Number</label>
                  <input 
                    type="text" 
                    required 
                    value={editForm.aadhaar}
                    onChange={(e) => setEditForm({ ...editForm, aadhaar: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address Location</label>
                <input 
                  type="text" 
                  required 
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nominee Details & Allocation</label>
                <input 
                  type="text" 
                  required 
                  value={editForm.nominee}
                  onChange={(e) => setEditForm({ ...editForm, nominee: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
