import React from 'react';
import { MOCK_STAFF } from '../services/mockDataService';
import { Award, TrendingUp, IndianRupee, Star, Users, CheckCircle2 } from 'lucide-react';

export const Staff = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Advisor Leaderboard & Staff Performance</h2>
          <p className="text-xs text-slate-500">Sales target tracking, commission payouts, and active lead allocation</p>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_STAFF.map((staff, idx) => {
          const achievementPct = Math.round((staff.achieved / staff.target) * 100);
          return (
            <div key={staff.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-[#0A4DA2] text-white flex items-center justify-center font-bold text-sm shadow">
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{staff.name}</h3>
                    <p className="text-[11px] text-slate-500">{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <span>{staff.rating}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Target Achievement</span>
                  <span className="font-extrabold text-brand-700">{achievementPct}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A4DA2] rounded-full" style={{ width: `${achievementPct}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                  <span>Achieved: ₹{(staff.achieved / 100000).toFixed(2)}L</span>
                  <span>Target: ₹{(staff.target / 100000).toFixed(2)}L</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">Commission Earned</span>
                  <span className="text-xs font-extrabold text-emerald-600">₹ {staff.commissionEarned.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold block">Active Assigned Leads</span>
                  <span className="text-xs font-extrabold text-brand-700">{staff.activeLeads} Leads</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
