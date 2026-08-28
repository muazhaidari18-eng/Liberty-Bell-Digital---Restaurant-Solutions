import React from 'react';
import { Ear, Wrench, Target, ShieldCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: Ear,
      title: 'We Listen First',
      desc: 'We take the time to understand your restaurant style, table turn times, staffing challenges, takeout volume, and house rules before proposing any system.',
      highlight: 'Deep understanding of your floor flow',
    },
    {
      icon: Wrench,
      title: 'We Build Around You',
      desc: 'No generic one-size-fits-all software. We customize the AI receptionist script, voice tone, reservation rules, and FAQs to match your restaurant’s exact brand.',
      highlight: 'Customized to your menu & hours',
    },
    {
      icon: Target,
      title: 'We Stay Focused On Results',
      desc: 'Our mission is straightforward: ensure zero missed calls, capture more reservations, eliminate staff phone distractions, and give your guests a fast, pleasant experience.',
      highlight: 'Fewer missed calls, happier diners',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            Why Liberty Bell Digital
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            A Practical Partner For Local Restaurant Owners
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            We build simple, dependable systems that work on real Friday nights — without adding complexity to your busy operations.
          </p>
        </div>

        {/* 3 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E0D6] rounded-2xl p-6 shadow-xs hover:border-[#C51F26]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4EFEA] text-[#C51F26] flex items-center justify-center mb-5 font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#F0EBE3] flex items-center gap-2 text-xs font-bold text-[#8C6D58]">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
