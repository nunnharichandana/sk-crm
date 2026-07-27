import React, { useState } from 'react';
import { MOCK_POLICIES } from '../services/mockDataService';
import { 
  Calculator, 
  FileText, 
  CheckCircle, 
  Download, 
  Shield, 
  Sparkles,
  Zap,
  Plus
} from 'lucide-react';

export const Policies = () => {
  // Premium Calculator State
  const [calcType, setCalcType] = useState('HEALTH'); // HEALTH, MOTOR, LIFE
  const [sumInsured, setSumInsured] = useState(1000000);
  const [age, setAge] = useState(32);
  const [members, setMembers] = useState(2);
  const [calculatedQuote, setCalculatedQuote] = useState(null);

  const calculatePremium = () => {
    let baseRate = 0;
    if (calcType === 'HEALTH') baseRate = (sumInsured * 0.025) + (age * 150) + (members * 2000);
    else if (calcType === 'MOTOR') baseRate = (sumInsured * 0.032);
    else baseRate = (sumInsured * 0.008) + (age * 200);

    const gst = baseRate * 0.18;
    const gross = baseRate + gst;
    const commission = baseRate * 0.15;

    setCalculatedQuote({
      net: Math.round(baseRate),
      gst: Math.round(gst),
      gross: Math.round(gross),
      commission: Math.round(commission)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Policy Management & Instant Premium Calculator</h2>
          <p className="text-xs text-slate-500">Calculate instant quotations, issue policies & manage active contracts</p>
        </div>

        <button 
          onClick={() => alert("Launching Policy Issuance Wizard...")}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0A4DA2] hover:bg-brand-700 text-white font-bold text-xs shadow transition"
        >
          <Plus className="h-4 w-4" />
          <span>Issue New Policy</span>
        </button>
      </div>

      {/* Premium Calculator Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900">Instant Insurance Premium Calculator</h3>
          </div>
          <span className="badge badge-blue text-xs">Live Actuarial Rate Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Category</label>
            <select 
              value={calcType}
              onChange={(e) => setCalcType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-brand-700 focus:ring-2 focus:ring-brand-600 outline-none"
            >
              <option value="HEALTH">Health & Family Floater</option>
              <option value="MOTOR">Private Motor Comprehensive</option>
              <option value="LIFE">Term Life Cover</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sum Insured (₹)</label>
            <select 
              value={sumInsured}
              onChange={(e) => setSumInsured(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-brand-600 outline-none"
            >
              <option value={500000}>₹ 5 Lakhs</option>
              <option value={1000000}>₹ 10 Lakhs</option>
              <option value={2500000}>₹ 25 Lakhs</option>
              <option value={5000000}>₹ 50 Lakhs</option>
              <option value={10000000}>₹ 1 Crore</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Insured Age</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-600 outline-none"
            />
          </div>
        </div>

        <button 
          onClick={calculatePremium}
          className="w-full py-3 bg-[#0A4DA2] hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2"
        >
          <Zap className="h-4 w-4" />
          <span>Compute Premium Quote</span>
        </button>

        {calculatedQuote && (
          <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">Net Premium</span>
              <span className="text-sm font-extrabold text-slate-800">₹ {calculatedQuote.net.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">GST (18%)</span>
              <span className="text-sm font-extrabold text-slate-800">₹ {calculatedQuote.gst.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">Total Payable</span>
              <span className="text-base font-extrabold text-brand-700">₹ {calculatedQuote.gross.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-semibold">Agent Commission</span>
              <span className="text-sm font-extrabold text-emerald-600">₹ {calculatedQuote.commission.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Active Policies Master Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Issued Policy Register</h3>
          <span className="badge badge-blue text-xs">{MOCK_POLICIES.length} Active Policies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Policy Number</th>
                <th className="p-4">Customer & Company</th>
                <th className="p-4">Sum Insured</th>
                <th className="p-4">Gross Premium</th>
                <th className="p-4">Validity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {MOCK_POLICIES.map((pol) => (
                <tr key={pol.id} className="hover:bg-brand-50/30 transition">
                  <td className="p-4 font-bold text-brand-700">{pol.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{pol.customerName}</span>
                    <span className="text-[10px] text-slate-500">{pol.insuranceCompany}</span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">₹ {pol.sumInsured.toLocaleString()}</td>
                  <td className="p-4 font-bold text-emerald-600">₹ {pol.grossPremium.toLocaleString()}</td>
                  <td className="p-4 text-[11px] text-slate-600">{pol.startDate} to {pol.expiryDate}</td>
                  <td className="p-4">
                    <span className={`badge ${pol.status === 'ACTIVE' ? 'badge-green' : 'badge-amber'}`}>
                      {pol.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => alert(`Simulating PDF Download for Policy Certificate ${pol.id}`)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-100 text-brand-700 font-bold transition"
                      title="Download PDF Policy Bond"
                    >
                      <Download className="h-4 w-4" />
                    </button>
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
