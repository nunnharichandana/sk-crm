import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COMPANY_INFO } from '../services/mockDataService';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Save, 
  Camera, 
  Upload, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export const Settings = () => {
  const { user, updateUserProfile } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [activeTab, setActiveTab] = useState('PROFILE'); // PROFILE, COMPANY, SECURITY

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Prakesh Gajendiran',
    email: user?.email || 'admin@sksmartinvestments.com',
    phone: user?.phone || '+91 98423 11223',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    location: 'Kanchipuram, Tamil Nadu',
    bio: 'Managing Director & Principal Broker at SK SMART INVESTMENTS.'
  });

  // Password Security Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      avatar: profileForm.avatar
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">System Settings & Profile Preferences</h2>
          <p className="text-xs text-slate-500">Update personal profile, avatar, corporate info, security credentials & notifications</p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold animate-in fade-in duration-150">
            <CheckCircle2 className="h-4 w-4" />
            <span>Profile saved successfully!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        {[
          { id: 'PROFILE', label: 'User Profile & Picture', icon: User },
          { id: 'COMPANY', label: 'Company Profile & Licensing', icon: Building2 },
          { id: 'SECURITY', label: 'Password & Security', icon: ShieldCheck }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-3 px-4 text-xs font-bold transition flex items-center space-x-2 border-b-2 ${
                activeTab === t.id ? 'border-brand-600 text-brand-700 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE EDIT & AVATAR UPLOAD */}
      {activeTab === 'PROFILE' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-6 max-w-3xl">
          
          {/* Avatar Picture Section */}
          <div className="flex items-center space-x-6 pb-6 border-b border-slate-100">
            <div className="relative group">
              <img 
                src={profileForm.avatar} 
                alt="Avatar Preview" 
                className="h-24 w-24 rounded-full object-cover border-4 border-[#1E6091] shadow-md"
              />
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#1E6091] text-white cursor-pointer hover:bg-brand-700 transition shadow-lg"
                title="Change Profile Picture"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="hidden" 
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{profileForm.name}</h3>
              <p className="text-xs text-slate-500">{user?.roleDisplayName} • {COMPANY_INFO.location}</p>
              <p className="text-[11px] text-brand-600 font-semibold mt-1">Click the camera icon to upload a custom profile picture</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold text-slate-900" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                <input 
                  type="email" 
                  required 
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                <input 
                  type="text" 
                  required 
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Office Location</label>
                <input 
                  type="text" 
                  readOnly 
                  value={profileForm.location}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-600" 
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Profile Avatar Image URL (Optional Direct Link)</label>
              <input 
                type="text" 
                value={profileForm.avatar}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Professional Bio</label>
              <textarea 
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-2.5 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow flex items-center space-x-2 transition"
              >
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>

        </div>
      )}

      {/* TAB 2: COMPANY INFO */}
      {activeTab === 'COMPANY' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4 max-w-3xl text-xs">
          <h3 className="text-base font-bold text-slate-900">Corporate Details ({COMPANY_INFO.name})</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold text-slate-500 block">Company Name</span>
              <span className="font-extrabold text-slate-900 text-sm">{COMPANY_INFO.name}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 block">Official Tagline</span>
              <span className="font-extrabold text-[#1E6091] text-sm">{COMPANY_INFO.tagline}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <span className="font-bold text-slate-500 block">Managing Director (MD)</span>
              <span className="font-bold text-slate-900">{COMPANY_INFO.mdName}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 block">IRDAI Brokerage License</span>
              <span className="font-mono font-bold text-slate-800">{COMPANY_INFO.irdaLicense}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-500 block">Primary Head Office Location</span>
            <span className="font-bold text-slate-800">{COMPANY_INFO.address}</span>
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD & SECURITY */}
      {activeTab === 'SECURITY' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-4 max-w-md text-xs">
          <h3 className="text-base font-bold text-slate-900">Change Account Password</h3>

          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Password</label>
              <input 
                type="password" 
                required 
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password</label>
              <input 
                type="password" 
                required 
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                required 
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-mono" 
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                type="submit" 
                className="px-5 py-2.5 rounded-xl bg-[#1E6091] text-white font-bold text-xs shadow"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
