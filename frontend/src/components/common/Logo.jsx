import React from 'react';

export const Logo = ({ className = "h-11 w-auto", hideText = false, textVariant = "dark" }) => {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      <div className="relative group shrink-0">
        <img 
          src="/sk-logo.png" 
          alt="SK Smart Investments Emblem Logo" 
          className="h-11 w-11 object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback SVG if image is offline
            e.target.onerror = null;
            e.target.src = "/sk-logo.jpg";
          }}
        />
      </div>

      {!hideText && (
        <div className="leading-tight">
          <span className={`text-sm sm:text-base font-black tracking-tight uppercase block ${textVariant === 'light' ? 'text-white' : 'text-slate-900'}`}>
            SK SMART INVESTMENTS
          </span>
          <span className="text-[9px] font-extrabold text-[#1E6091] tracking-widest uppercase block mt-0.5">
            INSURANCE AND INVESTMENTS SPECIALIST
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
