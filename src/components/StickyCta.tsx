import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowRight, Utensils } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface StickyCtaProps {
  onOpenBooking: (origin: CtaOrigin) => void;
}

export const StickyCta: React.FC<StickyCtaProps> = ({ onOpenBooking }) => {
  const [showDesktopSticky, setShowDesktopSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show desktop bar after user scrolls down past 450px (beyond hero)
      if (window.scrollY > 450) {
        setShowDesktopSticky(true);
      } else {
        setShowDesktopSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileClick = () => {
    trackCtaClick('sticky_mobile', 'Book My Free Strategy Call');
    onOpenBooking('sticky_mobile');
  };

  const handleDesktopClick = () => {
    trackCtaClick('sticky_desktop', 'Book My Free Strategy Call');
    onOpenBooking('sticky_desktop');
  };

  return (
    <>
      {/* MOBILE PERSISTENT BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E7E0D6] p-2.5 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <button
          id="mobile-sticky-cta-btn"
          onClick={handleMobileClick}
          className="w-full min-h-[48px] px-5 py-2.5 bg-[#C51F26] hover:bg-[#A9161C] active:bg-[#8E1217] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Book My Free Strategy Call</span>
        </button>
      </div>

      {/* DESKTOP SUBTLE STICKY TOP/BOTTOM BAR (APPEARS AFTER HERO) */}
      {showDesktopSticky && (
        <aside
          aria-label="Quick appointment scheduling"
          className="hidden md:flex fixed bottom-4 right-6 z-40 bg-[#1C1917]/95 text-white backdrop-blur-md border border-white/15 rounded-2xl p-3 px-5 shadow-2xl items-center gap-4 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#C51F26] text-white flex items-center justify-center">
              <Utensils className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Stop Missing Peak Restaurant Calls</p>
              <p className="text-[10px] text-[#A8A29E]">15-min free review • Tailored to your menu</p>
            </div>
          </div>
          <button
            id="desktop-sticky-cta-btn"
            onClick={handleDesktopClick}
            className="min-h-[38px] px-4 py-1.5 bg-[#C51F26] hover:bg-[#A9161C] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Book My Free Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}
    </>
  );
};
