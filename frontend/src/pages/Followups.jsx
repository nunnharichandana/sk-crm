import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_FOLLOWUPS } from '../services/mockDataService';
import { 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Plus, 
  Phone,
  Send,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react';

export const Followups = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const [activeTab, setActiveTab] = useState('TODAY'); // TODAY, UPCOMING, MISSED, COMPLETED
  const [followups, setFollowups] = useState(MOCK_FOLLOWUPS);
  const [editingFollowup, setEditingFollowup] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newFollowup, setNewFollowup] = useState({
    customerName: '',
    mobile: '',
    type: 'CALL',
    scheduledTime: '2026-07-27 15:00',
    remarks: '',
    priority: 'HIGH'
  });

  const filterFollowups = () => {
    switch(activeTab) {
      case 'TODAY': return followups.filter(f => f.status === 'PENDING');
      case 'MISSED': return followups.filter(f => f.status === 'MISSED');
      case 'COMPLETED': return followups.filter(f => f.status === 'COMPLETED');
      default: return followups;
    }
  };

  const markComplete = (id) => {
    setFollowups(prev => prev.map(f => f.id === id ? { ...f, status: 'COMPLETED' } : f));
  };

  const handleCreateFollowup = (e) => {
    e.preventDefault();
    const created = {
      id: `FL-${Date.now()}`,
      leadId: 'LD-2026-001',
      ...newFollowup,
      status: 'PENDING'
    };
    setFollowups([created, ...followups]);
    setShowAddModal(false);
    alert(`Followup task scheduled for ${created.customerName}!`);
  };

  const handleUpdateFollowup = (e) => {
    e.preventDefault();
    setFollowups(prev => prev.map(f => f.id === editingFollowup.id ? editingFollowup : f));
    setEditingFollowup(null);
    alert(`Followup updated successfully!`);
  };

  const handleDeleteFollowup = (id) => {
    if (window.confirm(`Delete followup record ${id}?`)) {
      setFollowups(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Follow-up & Reminders Timeline</h2>
          <p className="text-xs text-slate-500">
            {isAdmin ? 'MD Control: Schedule, Edit, Reschedule & Delete Follow-up Touchpoints' : 'Multi-channel task scheduler and client touchpoints'}
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule New Activity</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        {[
          { id: 'TODAY', label: "Today's Schedule", count: 2 },
          { id: 'MISSED', label: 'Missed Follow-ups', count: 1 },
          { id: 'COMPLETED', label: 'Completed Log', count: 1 },
          { id: 'ALL', label: 'All Reminders', count: followups.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 text-xs font-bold transition flex items-center space-x-2 border-b-2 ${
              activeTab === tab.id 
                ? 'border-brand-600 text-brand-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className="badge badge-blue text-[10px]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Grid of Follow-ups Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filterFollowups().map((item) => (
          <div 
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-600 font-bold">
                  {item.type === 'CALL' ? <Phone className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.customerName}</h3>
                  <p className="text-[11px] text-slate-500">{item.mobile}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`badge ${
                  item.status === 'COMPLETED' ? 'badge-green' : item.status === 'MISSED' ? 'badge-red' : 'badge-amber'
                }`}>
                  {item.status}
                </span>

                {isAdmin && (
                  <>
                    <button 
                      onClick={() => setEditingFollowup({ ...item })}
                      className="p-1 rounded-lg bg-amber-50 text-amber-700 font-bold hover:bg-amber-100 transition"
                      title="Edit Followup"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteFollowup(item.id)}
                      className="p-1 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition"
                      title="Delete Followup"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <Clock className="h-3.5 w-3.5 text-brand-500" />
                <span className="font-semibold">{item.scheduledTime}</span>
              </div>
              <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{item.remarks}"
              </p>
            </div>

            {/* Quick Multi-Channel Communication Launcher */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => alert(`Calling ${item.mobile} via SIP Softphone...`)}
                  className="p-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-600 transition"
                  title="Make Direct Phone Call"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => alert(`Opening WhatsApp Chat with ${item.mobile}`)}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                  title="Send WhatsApp Reminder"
                >
                  <Send className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => alert(`Sending Email template to ${item.customerName}`)}
                  className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition"
                  title="Send Email Reminder"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>

              {item.status !== 'COMPLETED' && (
                <button 
                  onClick={() => markComplete(item.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Mark Done</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Followup Modal */}
      {editingFollowup && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Followup Activity ({editingFollowup.customerName})</h3>
              <button onClick={() => setEditingFollowup(null)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateFollowup} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Activity Type</label>
                <select 
                  value={editingFollowup.type}
                  onChange={(e) => setEditingFollowup({ ...editingFollowup, type: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                >
                  <option value="CALL">PHONE CALL</option>
                  <option value="MEETING">IN-PERSON MEETING</option>
                  <option value="WHATSAPP">WHATSAPP</option>
                  <option value="EMAIL">EMAIL</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Scheduled Time</label>
                <input 
                  type="text" 
                  required 
                  value={editingFollowup.scheduledTime}
                  onChange={(e) => setEditingFollowup({ ...editingFollowup, scheduledTime: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select 
                  value={editingFollowup.status}
                  onChange={(e) => setEditingFollowup({ ...editingFollowup, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none font-bold"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="MISSED">MISSED</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Remarks & Notes</label>
                <textarea 
                  rows={3}
                  value={editingFollowup.remarks}
                  onChange={(e) => setEditingFollowup({ ...editingFollowup, remarks: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingFollowup(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow flex items-center space-x-1">
                  <Save className="h-4 w-4" />
                  <span>Update Activity</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Followup Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#1E6091] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Schedule New Client Followup</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFollowup} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Name</label>
                <input 
                  type="text" 
                  required 
                  value={newFollowup.customerName}
                  onChange={(e) => setNewFollowup({ ...newFollowup, customerName: e.target.value })}
                  placeholder="e.g. Rahul Dravid"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input 
                  type="text" 
                  required 
                  value={newFollowup.mobile}
                  onChange={(e) => setNewFollowup({ ...newFollowup, mobile: e.target.value })}
                  placeholder="+91 98111 22233"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type</label>
                  <select 
                    value={newFollowup.type}
                    onChange={(e) => setNewFollowup({ ...newFollowup, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                  >
                    <option value="CALL">PHONE CALL</option>
                    <option value="MEETING">IN-PERSON MEETING</option>
                    <option value="WHATSAPP">WHATSAPP</option>
                    <option value="EMAIL">EMAIL</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scheduled Date & Time</label>
                  <input 
                    type="text" 
                    required 
                    value={newFollowup.scheduledTime}
                    onChange={(e) => setNewFollowup({ ...newFollowup, scheduledTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Remarks & Notes</label>
                <textarea 
                  rows={2}
                  value={newFollowup.remarks}
                  onChange={(e) => setNewFollowup({ ...newFollowup, remarks: e.target.value })}
                  placeholder="e.g. Discussion on maternity benefits."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E6091] text-white text-xs font-bold shadow">Save Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
