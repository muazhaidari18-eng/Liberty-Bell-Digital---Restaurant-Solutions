import React from 'react';
import { ArrowRight, PhoneIncoming, Sparkles, Check, Clock, Users, ShieldCheck } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface HeroSectionProps {
  onOpenBooking: (origin: CtaOrigin) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const handleHeroCta = () => {
    trackCtaClick('hero', 'Book My Free Strategy Call');
    onOpenBooking('hero');
  };

  return (
    <section id="hero" className="relative pt-6 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Subtle warm background accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3ECE4]/80 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Primary Conversion */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE7DE] border border-[#DDD3C7] text-[#A9161C] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C51F26] animate-pulse"></span>
              AI Receptionist for Restaurants
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1917] tracking-tight leading-[1.12]">
              Dinner Rush. Full House.{' '}
              <span className="text-[#C51F26] block sm:inline">The Phone Is Still Ringing.</span>
            </h1>

            {/* 2-3 sentence Subhead */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
              Your staff should be taking care of the guests in front of them — not constantly running away from the floor to answer the phone. Liberty Bell helps restaurants handle incoming calls, answer common questions, capture reservations and follow up with customers automatically.
            </p>

            {/* CTA + Microtext */}
            <div className="pt-2 space-y-2.5">
              <button
                id="hero-cta-button"
                onClick={handleHeroCta}
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 bg-[#C51F26] hover:bg-[#A9161C] active:bg-[#8E1217] text-white text-base font-bold rounded-xl transition-all shadow-md shadow-[#C51F26]/25 hover:shadow-lg hover:shadow-[#C51F26]/30 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Book My Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs sm:text-sm text-[#78716C] font-medium flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                Free business review • Built around your restaurant.
              </p>
            </div>

            {/* Key trust bullets */}
            <div className="pt-4 border-t border-[#EAE3DA] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#57534E]">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C51F26] shrink-0" />
                <span>Zero staff interruptions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C51F26] shrink-0" />
                <span>24/7 reservation capture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C51F26] shrink-0" />
                <span>Instant SMS follow-up</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual with Incoming-Call UI Overlay */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E7E0D6] bg-[#1C1917]/5 aspect-4/3 sm:aspect-5/4 lg:aspect-auto lg:h-[460px]">
              {/* Restaurant Photography with warm ambient lighting */}
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Busy, warm-lit restaurant during dinner service"
                className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
                loading="eager"
              />

              {/* Dark subtle gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>

              {/* Floating Realistic Incoming-Call UI Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#FAF8F5]/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-2xl text-left">
                
                {/* Caller Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE3DA]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#C51F26] text-white flex items-center justify-center shadow-xs">
                      <PhoneIncoming className="w-4 h-4 animate-bounce" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                        <span>Incoming Call: Sarah M.</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/15 text-[#16A34A]">Live</span>
                      </div>
                      <p className="text-[11px] text-[#78716C]">Friday 7:14 PM • Peak Service</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#8C6D58] bg-[#EFE7DE] px-2 py-0.5 rounded-full">
                    Liberty Bell AI
                  </span>
                </div>

                {/* Micro Live Dialogue */}
                <div className="mt-3 space-y-2 text-xs">
                  {/* Customer line */}
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E5E0D8] text-[#57534E] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      G
                    </span>
                    <div className="bg-[#EFEAE4] text-[#1C1917] px-3 py-1.5 rounded-xl rounded-tl-xs font-medium">
                      "Hi, do you have a table for 4 tonight around 7:30?"
                    </div>
                  </div>

                  {/* AI Response line */}
                  <div className="flex items-start gap-2 flex-row-reverse">
                    <span className="w-5 h-5 rounded-full bg-[#C51F26] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      AI
                    </span>
                    <div className="bg-[#1C1917] text-white px-3 py-1.5 rounded-xl rounded-tr-xs font-medium text-right shadow-xs">
                      <span className="text-[#F5D0D2] font-semibold">Checking availability...</span> I have 7:15 PM or 7:45 PM open!
                    </div>
                  </div>
                </div>

                {/* Instant status indicator */}
                <div className="mt-3 pt-2.5 border-t border-[#EAE3DA] flex items-center justify-between text-[11px] text-[#57534E]">
                  <span className="flex items-center gap-1 font-medium text-[#16A34A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                    Host stand uninterrupted
                  </span>
                  <span className="text-[#8C6D58] font-semibold">Auto SMS Sent ✓</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
