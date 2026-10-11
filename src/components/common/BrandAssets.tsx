import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  customUrl?: string;
}

export const SafariLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  customUrl,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const src = customUrl || '/branding/safari-logo.svg';

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <div className={`${sizeMap[size]} shrink-0 rounded-full overflow-hidden bg-white shadow-xs border border-[#E1E8E1] flex items-center justify-center p-0.5`}>
        <img
          src={src}
          alt="Safari Academy Official Emblem"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Elegant inline SVG fallback if file not yet loaded
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.innerHTML = `
                <div class="w-full h-full rounded-full bg-[#123D2B] text-white flex items-center justify-center font-bold text-xs">
                  SA
                </div>
              `;
            }
          }}
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-base text-[#123D2B] tracking-tight">
            Safari Academy
          </span>
          <span className="font-ethiopic text-xs font-semibold text-[#2E8B57]">
            ሳፋሪ አካዳሚ
          </span>
        </div>
      )}
    </div>
  );
};

interface BannerProps {
  className?: string;
  customUrl?: string;
  showMottoBadge?: boolean;
}

export const SafariBanner: React.FC<BannerProps> = ({
  className = '',
  customUrl,
  showMottoBadge = true,
}) => {
  const src = customUrl || '/branding/safari-banner.svg';

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#E1E8E1] bg-[#123D2B] shadow-sm ${className}`}>
      <div className="w-full aspect-[32/10] max-h-72 sm:max-h-80 md:max-h-96 relative overflow-hidden bg-gradient-to-r from-[#0d2a1d] via-[#123D2B] to-[#1a4a34]">
        <img
          src={src}
          alt="Safari Academy Official School Banner"
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
        />
        {/* Subtle bottom lighting scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {showMottoBadge && (
          <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/40 shadow-sm hidden sm:flex items-center gap-3">
            <span className="font-ethiopic text-xs font-bold text-[#123D2B]">
              ልጆችዎ ልጆቻችን ናቸው!
            </span>
            <span className="text-[#94a3b8] text-xs" aria-hidden="true">·</span>
            <span className="text-xs font-medium text-[#2E8B57] italic">
              "Your kids our kids"
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
