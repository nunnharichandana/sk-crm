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
  Plus,
  Search,
  CheckCircle2,
  Briefcase,
  User
} from 'lucide-react';

const INITIAL_CUSTOMERS = [
  {
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
  },
  {
    code: 'CUST-1001',
    name: 'Arjun Singhania',
    email: 'arjun.singh@healthcorp.com',
    mobile: '+91 99887 76655',
    whatsapp: '+91 99887 76655',
    dob: '1985-09-20',
    occupation: 'Senior Director',
    pan: 'PQRST5678G',
    aadhaar: 'XXXX-XXXX-4532',
    address: 'Kamakshi Temple Street, Kanchipuram, Tamil Nadu',
    nominee: 'Pooja Singhania (Wife - 100% Allocation)',
    kycStatus: 'VERIFIED'
  },
  {
    code: 'CUST-1002',
    name: 'Deepika Padukone',
    email: 'deepika.p@bollywood.in',
    mobile: '+91 99887 76644',
    whatsapp: '+91 99887 76644',
    dob: '1988-01-05',
    occupation: 'Media & Entertainment',
    pan: 'KLMNO9012H',
    aadhaar: 'XXXX-XXXX-7811',
    address: 'Bypass Highway, Kanchipuram, Tamil Nadu',
    nominee: 'Ranveer Singh (Husband - 100% Allocation)',
    kycStatus: 'VERIFIED'
  },
  {
    code: 'CUST-1003',
    name: 'Rahul Dravid',
    email: 'rahul.d@cricket.in',
    mobile: '+91 98111 22233',
    whatsapp: '+91 98111 22233',
    dob: '1973-01-11',
    occupation: 'Head Coach & Consultant',
    pan: 'VWXYZ3456I',
    aadhaar: 'XXXX-XXXX-1190',
    address: 'Ennaikaran, Kanchipuram, Tamil Nadu',
    nominee: 'Vijeta Pendharkar (Wife - 100% Allocation)',
    kycStatus: 'VERIFIED'
  }
];

export const Customers = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';

  const [customerList, setCustomerList] = useState(INITIAL_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState(INITIAL_CUSTOMERS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [editForm, setEditForm] = useState({ ...selectedCustomer });

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    mobile: '',
    occupation: 'Business / Professional',
    pan: 'ABCDE1234F',
    aadhaar: 'XXXX-XXXX-1234',
    address: 'Kanchipuram, Tamil Nadu',
    nominee: 'Family Nominee (100% Allocation)',
    kycStatus: 'VERIFIED'
  });

  const filteredCustomers = customerList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    setCustomerList(prev => prev.map(c => c.code === editForm.code ? editForm : c));
    setSelectedCustomer({ ...editForm });
    setIsEditing(false);
    alert(`Customer profile for ${editForm.name} updated successfully!`);
  };

  const handleCreateNewCustomer = (e) => {
    e.preventDefault();
    const createdCode = 'CUST-' + Math.floor(1000 + Math.random() * 9000);
    const createdCustomer = {
      code: createdCode,
      ...newCustomer,
      whatsapp: newCustomer.mobile,
      dob: '1992-06-15'
    };

    setCustomerList([createdCustomer, ...customerList]);
    setSelectedCustomer(createdCustomer);
    setShowAddModal(false);
    setNewCustomer({
      name: '',
      email: '',
      mobile: '',
      occupation: 'Business / Professional',
      pan: 'ABCDE1234F',
      aadhaar: 'XXXX-XXXX-1234',
      address: 'Kanchipuram, Tamil Nadu',
      nominee: 'Family Nominee (100% Allocation)',
      kycStatus: 'VERIFIED'
    });
    alert(`New Customer Profile (${createdCode} — ${createdCustomer.name}) created successfully!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <UserCheck className="h-6 w-6 text-[#1E6091]" />
            <span>Customer 360° Directory & Profile Hub</span>
          </h2>
          <p className="text-xs text-slate-500">Manage customer relationship records, KYC compliance vault & policy history</p>
        </div>

        <div className="flex items-center space-x-3">
          {isAdmin && (
            <button 
              onClick={() => {
                setEditForm({ ...selectedCustomer });
                setIsEditing(true);
              }}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs shadow-sm hover:bg-amber-100 transition cursor-pointer"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Active Profile</span>
            </button>
          )}

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Customer Profile</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Customer Directory List (Left) + Customer 360 Detail View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Customer Directory List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Customer Directory ({customerList.length})</h3>
              <span className="badge badge-blue text-[10px] font-bold">Active Records</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, code, phone or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
              />
            </div>

            <div className="max-h-[550px] overflow-y-auto space-y-2 pr-1">
              {filteredCustomers.map((cust) => (
                <div
                  key={cust.code}
                  onClick={() => setSelectedCustomer(cust)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    selectedCustomer.code === cust.code 
                      ? 'border-[#1E6091] bg-brand-50/70 shadow-sm' 
                      : 'border-slate-200/80 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs">{cust.name}</span>
                    <span className="text-[10px] font-mono font-extrabold text-[#1E6091]">{cust.code}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>{cust.mobile}</span>
                    <span className="badge badge-green text-[9px]">{cust.kycStatus}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Customer 360° Profile Details */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Identity Card */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-5">
              <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                <div className="mx-auto h-16 w-16 rounded-full bg-[#1E6091] text-white flex items-center justify-center text-xl font-black shadow">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-base font-bold text-slate-900">{selectedCustomer.name}</h3>
                <span className="badge badge-green text-xs font-bold">KYC {selectedCustomer.kycStatus}</span>
                <p className="text-xs text-slate-500 font-mono font-bold">{selectedCustomer.code}</p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Phone className="h-4 w-4 text-[#1E6091]" />
                  <span className="font-bold">{selectedCustomer.mobile}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700 truncate">
                  <Mail className="h-4 w-4 text-[#1E6091]" />
                  <span className="truncate">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-start space-x-2 text-slate-700">
                  <MapPin className="h-4 w-4 text-[#1E6091] mt-0.5" />
                  <span>{selectedCustomer.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
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

            {/* Right Side: Associated Policies & KYC Compliance */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Associated Policy Portfolio */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <FileText className="h-4.5 w-4.5 text-[#1E6091]" />
                  <span>Associated Policy Portfolio</span>
                </h3>

                <div className="divide-y divide-slate-100">
                  {MOCK_POLICIES.map((pol) => (
                    <div key={pol.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-[#1E6091]">{pol.id}</span>
                          <span className="badge badge-purple text-[10px]">{pol.type}</span>
                        </div>
                        <p className="text-slate-700 font-semibold mt-0.5">{pol.insuranceCompany}</p>
                        <p className="text-[10px] text-slate-400">Valid: {pol.startDate} to {pol.expiryDate}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-slate-900 block">₹ {pol.grossPremium.toLocaleString()}</span>
                        <span className="badge badge-green text-[10px]">{pol.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KYC Compliance Vault & Nominee */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                  <span>KYC Compliance Vault & Nominee</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">PAN Card Copy</p>
                      <p className="text-[10px] text-slate-400">Verified & Approved</p>
                    </div>
                    <span className="badge badge-green text-[10px]">Approved</span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Aadhaar e-KYC</p>
                      <p className="text-[10px] text-slate-400">UIDAI Verified</p>
                    </div>
                    <span className="badge badge-green text-[10px]">Approved</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-50/50 border border-brand-100 text-xs space-y-1">
                  <p className="font-bold text-[#1E6091]">Nominee Details:</p>
                  <p className="text-slate-700 font-semibold">{selectedCustomer.nominee}</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CREATE NEW CUSTOMER PROFILE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <UserCheck className="h-4.5 w-4.5 text-amber-300" />
                <span>Create New Customer Master Profile</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewCustomer} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    type="text" 
                    required 
                    value={newCustomer.mobile}
                    onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })}
                    placeholder="+91 98423 99887"
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
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    placeholder="ramesh@gmail.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Occupation</label>
                  <input 
                    type="text" 
                    required 
                    value={newCustomer.occupation}
                    onChange={(e) => setNewCustomer({ ...newCustomer, occupation: e.target.value })}
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
                    value={newCustomer.pan}
                    onChange={(e) => setNewCustomer({ ...newCustomer, pan: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono font-bold" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aadhaar Number</label>
                  <input 
                    type="text" 
                    required 
                    value={newCustomer.aadhaar}
                    onChange={(e) => setNewCustomer({ ...newCustomer, aadhaar: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono font-bold" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address Location</label>
                <input 
                  type="text" 
                  required 
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nominee Details & Allocation</label>
                <input 
                  type="text" 
                  required 
                  value={newCustomer.nominee}
                  onChange={(e) => setNewCustomer({ ...newCustomer, nominee: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1 cursor-pointer">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Create Customer Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CUSTOMER PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Customer Profile ({editForm.code})</h3>
              <button onClick={() => setIsEditing(false)} className="text-white/80 hover:text-white cursor-pointer">
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
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold" 
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
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
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
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono font-bold" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aadhaar Number</label>
                  <input 
                    type="text" 
                    required 
                    value={editForm.aadhaar}
                    onChange={(e) => setEditForm({ ...editForm, aadhaar: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono font-bold" 
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
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1 cursor-pointer">
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
