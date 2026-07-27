import React, { useState } from 'react';
import { MOCK_POLICIES } from '../services/mockDataService';
import { 
  RotateCcw, 
  Send, 
  Mail, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const Renewals = () => {
  const [renewalList, setRenewalList] = useState([
    {
      id: 'REN-881',
      policyNumber: 'POL-STAR-2025-45612',
      customerName: 'Arjun Singhania',
      mobile: '+91 99887 76655',
      company: 'Star Health Insurance',
      dueDate: '2026-08-09',
      estimatedPremium: 24500,
      remindersSent: 2,
      status: 'PENDING_RENEWAL'
    },
    {
      id: 'REN-882',
      policyNumber: 'POL-TATA-2025-11223',
      customerName: 'Deepika Padukone',
      mobile: '+91 99887 76644',
      company: 'Tata AIG General',
      dueDate: '2026-08-31',
      estimatedPremium: 28000,
      remindersSent: 1,
      status: 'UPCOMING'
    }
  ]);

  const sendAutoReminder = (id, channel) => {
    alert(`Triggered ${channel} renewal reminder for record ${id}! Notification logged in audit trail.`);
    setRenewalList(prev => prev.map(r => r.id === id ? { ...r, remindersSent: r.remindersSent + 1 } : r));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Policy Renewal & Retention Engine</h2>
          <p className="text-xs text-slate-500">Automated SMS, WhatsApp & Email reminders for upcoming policy expiries</p>
        </div>

        <button 
          onClick={() => alert("Batch-sending automated WhatsApp renewal reminders to all policies expiring in 30 days...")}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition"
        >
          <Sparkles className="h-4 w-4" />
          <span>Trigger Batch Reminders</span>
        </button>
      </div>

      {/* Renewals Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Policies Expiring in Next 45 Days</h3>
          <span className="badge badge-amber text-xs">{renewalList.length} Due Policies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Policy / Customer</th>
                <th className="p-4">Insurance Company</th>
                <th className="p-4">Renewal Due Date</th>
                <th className="p-4">Estimated Renewal Premium</th>
                <th className="p-4">Reminders Triggered</th>
                <th className="p-4 text-right">Instant Dispatch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {renewalList.map((ren) => (
                <tr key={ren.id} className="hover:bg-brand-50/30 transition">
                  <td className="p-4">
                    <span className="font-extrabold text-brand-700 block">{ren.policyNumber}</span>
                    <span className="font-bold text-slate-900">{ren.customerName} ({ren.mobile})</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{ren.company}</td>
                  <td className="p-4 font-bold text-rose-600 flex items-center space-x-1 mt-2">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{ren.dueDate}</span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">₹ {ren.estimatedPremium.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="badge badge-purple text-[10px]">{ren.remindersSent} Sent</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => sendAutoReminder(ren.id, 'WhatsApp')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 flex items-center space-x-1"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => sendAutoReminder(ren.id, 'SMS')}
                        className="px-2.5 py-1.5 rounded-lg bg-brand-50 text-brand-700 font-bold hover:bg-brand-100 flex items-center space-x-1"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>SMS / Email</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
