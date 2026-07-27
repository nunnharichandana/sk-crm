import React from 'react';

export const Logo = ({ size = 'md', variant = 'full', className = '' }) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* SK Monogram Vector Symbol with Navy & Orange Orbit Rings */}
      <div className={`relative flex items-center justify-center ${
        isSmall ? 'h-9 w-9' : isLarge ? 'h-16 w-16' : 'h-11 w-11'
      }`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Dark Navy Outer Arc */}
          <path
            d="M 20 50 A 35 35 0 1 1 80 50"
            fill="none"
            stroke="#0F172A"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Vibrant Orange Upper Orbit Arc */}
          <path
            d="M 30 25 A 38 38 0 0 1 90 45"
            fill="none"
            stroke="#EA580C"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Stylized Monogram S (Navy) & K (Orange) */}
          <text
            x="32"
            y="63"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="900"
            fontSize="44"
            fill="#0F172A"
          >
            S
          </text>
          <text
            x="54"
            y="63"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="900"
            fontSize="44"
            fill="#EA580C"
          >
            K
          </text>
        </svg>
      </div>

      {/* Brand Text Header & Subtitle */}
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight leading-none text-[#C5221F] ${
            isSmall ? 'text-sm' : isLarge ? 'text-2xl' : 'text-base'
          }`}>
            SMART <span className="text-[#C5221F]">INVESTMENTS</span>
          </span>
          <span className={`font-bold tracking-wider text-slate-600 uppercase ${
            isSmall ? 'text-[8px] mt-0.5' : isLarge ? 'text-[11px] mt-1' : 'text-[9px] mt-0.5'
          }`}>
            INSURANCE AND INVESTMENTS SPECIALIST
          </span>
        </div>
      )}
    </div>
  );
};
