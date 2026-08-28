import React from 'react';
import { ArrowRight, PhoneCall, Check, Clock, ShieldCheck } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface FinalCtaSectionProps {
  onOpenBooking: (origin: CtaOrigin) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  const handleFinalCta = () => {
    trackCtaClick('final_cta', 'Book My Free Strategy Call');
    onOpenBooking('final_cta');
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Subtle warm ambient highlight */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C51F26]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#8C6D58]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F5D0D2] text-xs font-bold uppercase tracking-wider">
          <PhoneCall className="w-3.5 h-3.5" />
          Ready For A Quieter Floor & Full Tables?
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Keep Your Team Focused On The Guests In Front Of Them.
        </h2>

        {/* Supporting Line */}
        <p className="text-base sm:text-lg text-[#D6D3D1] max-w-xl mx-auto leading-relaxed">
          We'll show you how your restaurant could handle calls and customer inquiries more efficiently.
        </p>

        {/* Action Button */}
        <div className="pt-3 space-y-3">
          <button
            id="final-cta-button"
            onClick={handleFinalCta}
            className="w-full sm:w-auto min-h-[52px] px-9 py-4 bg-[#C51F26] hover:bg-[#A9161C] active:bg-[#8E1217] text-white text-base sm:text-lg font-extrabold rounded-xl transition-all shadow-lg shadow-[#C51F26]/30 flex items-center justify-center gap-3 mx-auto cursor-pointer"
          >
            <span>Book My Free Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-[#A8A29E] flex items-center justify-center gap-2">
            <span>✓ No risk or obligation</span>
            <span>•</span>
            <span>✓ 15-minute quick strategy review</span>
            <span>•</span>
            <span>✓ Tailored to your menu</span>
          </p>
        </div>

      </div>
    </section>
  );
};
