import React from 'react';
import { PhoneCall, HelpCircle, CalendarCheck, UtensilsCrossed, Users2, MessageSquareText, CheckCircle2 } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const benefits = [
    {
      icon: PhoneCall,
      title: 'Answers Calls',
      desc: 'Picks up instantly on the first ring, handling multiple simultaneous calls even during peak Friday & Saturday rush.',
      tag: 'Even during peak hours',
    },
    {
      icon: HelpCircle,
      title: 'Handles FAQs',
      desc: 'Accurately answers questions about daily hours, holiday schedules, valet & parking, dietary restrictions, and corkage fees.',
      tag: 'Hours, location, parking, menu & policies',
    },
    {
      icon: CalendarCheck,
      title: 'Takes Reservation Requests',
      desc: 'Checks your party size parameters, time slots, and records guest preferences without human intervention.',
      tag: 'Direct table capture',
    },
    {
      icon: UtensilsCrossed,
      title: 'Captures Takeout Inquiries',
      desc: 'Directs guests to online ordering links or logs pickup orders cleanly so the kitchen stays organized.',
      tag: 'Seamless takeout routing',
    },
    {
      icon: Users2,
      title: 'Handles Large-Party Questions',
      desc: 'Collects event details, guest counts, and special catering requests, routing priority leads straight to managers.',
      tag: 'Private dining & events',
    },
    {
      icon: MessageSquareText,
      title: 'Sends Follow-Up',
      desc: 'Instantly texts callers confirmed reservation details, directions, parking notes, or menu links via SMS.',
      tag: 'Automated SMS confirmations',
    },
  ];

  return (
    <section id="solution" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            The Liberty Bell Solution
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
            Let The Phone Get Answered Without Pulling Staff Off The Floor.
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            A dedicated AI phone receptionist specifically tuned to your dining concept, menu, and house policies.
          </p>
        </div>

        {/* Benefits Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E0D6] rounded-2xl p-6 shadow-xs hover:border-[#C51F26]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] text-[#C51F26] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#8C6D58] bg-[#FAF8F5] border border-[#E7E0D6] px-2.5 py-1 rounded-full">
                      {b.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Configured specifically for your menu</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
