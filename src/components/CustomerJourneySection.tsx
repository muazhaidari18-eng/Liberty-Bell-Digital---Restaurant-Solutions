import React from 'react';
import { PhoneIncoming, Bot, Utensils, Database, MessageSquare, ChevronRight } from 'lucide-react';

export const CustomerJourneySection: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: PhoneIncoming,
      title: 'Customer Calls',
      desc: 'Guest dials your regular restaurant phone number during or outside business hours.',
    },
    {
      number: '2',
      icon: Bot,
      title: 'AI Receptionist Answers',
      desc: 'Greets callers immediately without delay or hold music, using your restaurant name and tone.',
    },
    {
      number: '3',
      icon: Utensils,
      title: 'Question or Reservation Handled',
      desc: 'Answers menu/parking FAQs or checks party size, date, and available time slots.',
    },
    {
      number: '4',
      icon: Database,
      title: 'Information Captured',
      desc: 'Guest name, contact number, party count, and special requests logged automatically.',
    },
    {
      number: '5',
      icon: MessageSquare,
      title: 'Confirmation Sent',
      desc: 'Caller receives instant SMS confirmation with address, parking, and reservation details.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            Simple Automated Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            The Flow When A Call Comes In
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto">
            From the first ring to the booked table, everything happens seamlessly behind the scenes.
          </p>
        </div>

        {/* 5-Step Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white border border-[#E7E0D6] rounded-2xl p-5 shadow-xs flex flex-col justify-between"
              >
                {/* Step badge & icon */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#C51F26] text-white text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F4EFEA] text-[#8C6D58] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#1C1917] mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector on desktop (except last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#DDD3C7] text-[#8C6D58] items-center justify-center shadow-xs">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary note */}
        <div className="mt-8 text-center text-xs text-[#78716C]">
          ✨ No extra tablet or hardware required — syncs directly with your existing setup.
        </div>

      </div>
    </section>
  );
};
