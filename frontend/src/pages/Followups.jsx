import React, { useState } from 'react';
import { MOCK_FOLLOWUPS } from '../services/mockDataService';
import { 
  PhoneCall, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Plus, 
  Phone,
  Send,
  AlertCircle
} from 'lucide-react';

export const Followups = () => {
  const [activeTab, setActiveTab] = useState('TODAY'); // TODAY, UPCOMING, MISSED, COMPLETED
  const [followups, setFollowups] = useState(MOCK_FOLLOWUPS);

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

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Follow-up & Reminders Timeline</h2>
          <p className="text-xs text-slate-500">Multi-channel task scheduler and client touchpoints</p>
        </div>

        <button 
          onClick={() => alert("Schedule new follow-up meeting or call reminder")}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0A4DA2] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
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
              <span className={`badge ${
                item.status === 'COMPLETED' ? 'badge-green' : item.status === 'MISSED' ? 'badge-red' : 'badge-amber'
              }`}>
                {item.status}
              </span>
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

    </div>
  );
};
