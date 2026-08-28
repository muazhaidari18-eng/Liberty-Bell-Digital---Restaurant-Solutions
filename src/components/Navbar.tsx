import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface NavbarProps {
  onOpenBooking: (origin: CtaOrigin) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const handleCtaClick = () => {
    trackCtaClick('nav', 'Book My Free Strategy Call');
    onOpenBooking('nav');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo Left */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#C51F26] text-white flex items-center justify-center font-black text-sm shadow-xs transition-transform group-hover:scale-105">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5v1.07C6.16 6.8 4 9.4 4 12.5V17l-2 2v1h20v-1l-2-2v-4.5c0-3.1-2.16-5.7-5-6.43V5c0-1.66-1.34-3-3-3zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-[#1C1917] tracking-tight leading-none">
              Liberty Bell <span className="text-[#C51F26]">Digital</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#8C6D58] tracking-wider uppercase mt-0.5">
              Restaurant Solutions
            </span>
          </div>
        </a>

        {/* Right navigation links & primary action */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#how-it-works"
            className="hidden md:inline-flex text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#C51F26] transition-colors"
          >
            How It Works
          </a>
          <button
            id="nav-cta-button"
            onClick={handleCtaClick}
            className="min-h-[42px] px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#C51F26] hover:bg-[#A9161C] active:bg-[#8E1217] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm shadow-[#C51F26]/20 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Book My Free Strategy Call</span>
          </button>
        </div>
      </div>
    </header>
  );
};
