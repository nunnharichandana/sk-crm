import React, { useState } from 'react';
import { MOCK_POLICIES } from '../services/mockDataService';
import { 
  RotateCcw, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  FileText
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

  const sendEmailNotice = (id) => {
    alert(`Official Email Renewal Notice dispatched for record ${id}! Notification logged in audit trail.`);
    setRenewalList(prev => prev.map(r => r.id === id ? { ...r, remindersSent: r.remindersSent + 1 } : r));
  };

  const processRenewal = (id, policyNumber) => {
    alert(`Policy ${policyNumber} renewed successfully for FY 2026-27! New policy certificate issued.`);
    setRenewalList(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Policy Renewal & Retention Engine</h2>
          <p className="text-xs text-slate-500">Official Email renewal notices & policy retention management for upcoming policy expiries</p>
        </div>

        <button 
          onClick={() => alert("Batch-sending official Email renewal notices to all policies expiring in 30 days...")}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1E6091] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          <Mail className="h-4 w-4" />
          <span>Send Batch Email Notices</span>
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
                <th className="p-4">Estimated Premium</th>
                <th className="p-4">Notices Sent</th>
                <th className="p-4 text-right">Renewal Actions</th>
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
                    <span className="badge badge-purple text-[10px]">{ren.remindersSent} Email Notices</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => sendEmailNotice(ren.id)}
                        className="px-3 py-1.5 rounded-lg bg-brand-50 text-[#1E6091] font-bold hover:bg-brand-100 flex items-center space-x-1"
                        title="Send Email Renewal Notice"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email Notice</span>
                      </button>

                      <button 
                        onClick={() => processRenewal(ren.id, ren.policyNumber)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center space-x-1 shadow"
                        title="Process Policy Renewal"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Renew Policy</span>
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
