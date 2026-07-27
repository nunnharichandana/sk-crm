import React from 'react';

export const Logo = ({ className = "h-10 w-auto" }) => {
  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      {/* Clean Monogram Badge */}
      <div className="h-10 w-10 rounded-2xl bg-[#1E6091] text-white flex items-center justify-center font-black text-lg tracking-tighter shadow-md border border-brand-400">
        SK
      </div>
      <div>
        <span className="text-base font-black text-slate-900 tracking-tight leading-none uppercase block">
          SK SMART INVESTMENTS
        </span>
        <span className="text-[9px] font-extrabold text-[#1E6091] tracking-wider uppercase block mt-0.5">
          INSURANCE AND INVESTMENTS SPECIALIST
        </span>
      </div>
    </div>
  );
};

export default Logo;
