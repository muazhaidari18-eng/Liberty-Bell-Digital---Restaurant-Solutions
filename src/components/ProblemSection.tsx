import React from 'react';
import { Flame, CalendarX2, ShoppingBag, PhoneMissed } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Flame,
      title: 'Dinner Rush',
      desc: 'Your front-of-house team is running food, seating guests, and managing the floor. Every ring creates friction.',
      detail: 'Team is serving guests',
    },
    {
      icon: CalendarX2,
      title: 'Reservation Requests',
      desc: 'Guests calling for tonight’s table want an immediate answer. Put on hold for two minutes, they hang up.',
      detail: 'Customers want an immediate answer',
    },
    {
      icon: ShoppingBag,
      title: 'Takeout Questions',
      desc: 'Inquiries about dietary options, preparation times, and pickup status compete with active dining room orders.',
      detail: 'Compete with in-person orders',
    },
    {
      icon: PhoneMissed,
      title: 'Missed Calls',
      desc: 'When nobody answers, hungry patrons do not leave voicemails — they simply call the restaurant down the street.',
      detail: 'Customers choose another restaurant',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F4EFEA] border-y border-[#EAE3DA]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            The Core Restaurant Problem
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
            The Busiest Time In Your Restaurant Is Usually The Worst Time To Answer Calls.
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            When tickets are piling up and tables are turning, your staff cannot afford to be trapped on the phone.
          </p>
        </div>

        {/* 4 Small Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E7E0D6] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C51F26]/10 text-[#C51F26] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mb-1.5">
                    {prob.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE3DA] text-[11px] font-bold text-[#8C6D58] uppercase tracking-wide">
                  {prob.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Caption */}
        <div className="mt-8 text-center">
          <p className="inline-block px-5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD3C7] text-xs sm:text-sm font-bold text-[#1C1917] shadow-xs">
            "A ringing phone should represent opportunity — not another interruption."
          </p>
        </div>

      </div>
    </section>
  );
};
