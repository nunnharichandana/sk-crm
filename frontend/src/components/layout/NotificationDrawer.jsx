import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { X, CheckCheck, Bell, ShieldAlert, PhoneCall, FileText } from 'lucide-react';

export const NotificationDrawer = () => {
  const { notifications, isDrawerOpen, setIsDrawerOpen, markAllAsRead } = useNotifications();

  if (!isDrawerOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'LEAD': return <FileText className="h-4 w-4 text-brand-600" />;
      case 'FOLLOWUP': return <PhoneCall className="h-4 w-4 text-amber-600" />;
      case 'POLICY': return <CheckCheck className="h-4 w-4 text-emerald-600" />;
      case 'RENEWAL': return <ShieldAlert className="h-4 w-4 text-rose-600" />;
      default: return <Bell className="h-4 w-4 text-brand-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A4DA2] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <h3 className="text-base font-bold">Notifications Center</h3>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Live Alerts & Updates</span>
            <button 
              onClick={markAllAsRead}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 transition"
            >
              Mark all as read
            </button>
          </div>

          {notifications.map((n) => (
            <div 
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.read ? 'bg-slate-50/60 border-slate-100 text-slate-600' : 'bg-brand-50/40 border-brand-200/80 text-slate-900 font-medium'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 p-2 rounded-lg bg-white shadow-sm border border-slate-200/60">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{n.title}</p>
                    <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow transition"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
