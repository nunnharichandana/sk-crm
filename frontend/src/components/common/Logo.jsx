import React from 'react';

export const Logo = ({ className = "h-12 w-auto" }) => {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      <img 
        src="/logo.jpg" 
        alt="SK Smart Investments Logo" 
        className="h-12 w-auto object-contain rounded-xl shadow-xs"
        onError={(e) => {
          // Fallback if image fails to load
          e.target.style.display = 'none';
        }}
      />
      <div>
        <span className="text-base font-black text-slate-900 tracking-tight leading-none uppercase block">
          SK SMART INVESTMENTS
        </span>
        <span className="text-[9px] font-extrabold text-[#1E6091] tracking-wider uppercase block mt-1">
          INSURANCE AND INVESTMENTS SPECIALIST
        </span>
      </div>
    </div>
  );
};

export default Logo;
