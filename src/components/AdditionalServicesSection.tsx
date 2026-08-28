import React from 'react';
import { Globe, MapPin, Megaphone, Star, RefreshCw, ArrowRight } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface AdditionalServicesSectionProps {
  onOpenBooking: (origin: CtaOrigin) => void;
}

export const AdditionalServicesSection: React.FC<AdditionalServicesSectionProps> = ({ onOpenBooking }) => {
  const services = [
    {
      icon: Globe,
      title: 'Restaurant Website',
      desc: 'Mobile-first dining sites showcasing real-time menus, operating hours, direct reservation widgets, online ordering links, private events, and location maps.',
    },
    {
      icon: MapPin,
      title: 'Local Google Visibility',
      desc: 'Optimize your Google Business Profile, local 3-pack map rankings, photos, and dish tags so nearby hungry diners find you first on Google Maps.',
    },
    {
      icon: Megaphone,
      title: 'Meta Advertising',
      desc: 'Targeted local Facebook & Instagram ad campaigns featuring weekend specials, seasonal menus, happy hours, and new signature dishes to nearby food lovers.',
    },
    {
      icon: Star,
      title: 'Review Automation',
      desc: 'Automatically invite happy dining guests via SMS to share 5-star Google & Yelp feedback right after their meal, boosting your reputation on autopilot.',
    },
    {
      icon: RefreshCw,
      title: 'Customer Follow-Up',
      desc: 'Re-engage past guests with automated birthday perks, holiday tasting menu announcements, and slow-night dining incentives that drive repeat covers.',
    },
  ];

  const repeatCycle = [
    { label: 'Reservation', desc: 'Captured by AI' },
    { label: 'Visit', desc: 'Seamless dining' },
    { label: 'Follow-Up', desc: 'Automated text' },
    { label: 'Review', desc: '5-star feedback' },
    { label: 'Promotion', desc: 'VIP offer' },
    { label: 'Return Visit', desc: 'Loyal regular' },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F4EFEA] border-y border-[#EAE3DA]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            Tailored For Food & Hospitality
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
            Industry-Specific Solutions To Grow Your Restaurant
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            We only offer services engineered to solve the specific bottlenecks of restaurants, cafés, and takeout spots.
          </p>
        </div>

        {/* 5 Additional Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E7E0D6] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C51F26]/10 text-[#C51F26] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE3DA]">
                  <span className="text-[11px] font-bold text-[#8C6D58] uppercase">
                    Food & Dining Focus
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quick Consultation Highlight Card */}
          <div className="bg-[#1C1917] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5D0D2]">
                Custom Restaurant Plan
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                Need Help Identifying Your Biggest Bottleneck?
              </h3>
              <p className="text-xs sm:text-sm text-[#D6D3D1] leading-relaxed">
                During our free strategy call, we'll review your call volume, online profile, and customer capture process.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/15">
              <button
                onClick={() => {
                  trackCtaClick('mid_page', 'Book My Free Strategy Call');
                  onOpenBooking('mid_page');
                }}
                className="w-full py-2.5 px-4 bg-[#C51F26] hover:bg-[#A9161C] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book My Free Strategy Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Repeat-Customer Mini-Section */}
        <div className="bg-[#FAF8F5] border border-[#DDD3C7] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
              Long-Term Dining Loyalty
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] tracking-tight">
              More Than Calls. Build More Repeat Customers.
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Turning a first-time caller into a weekly regular by linking every step of the dining cycle.
            </p>
          </div>

          {/* Flow Cycle: Reservation → Visit → Follow-Up → Review → Promotion → Return Visit */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {repeatCycle.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E7E0D6] rounded-xl p-3 text-center flex flex-col justify-center items-center shadow-2xs"
              >
                <span className="text-xs font-extrabold text-[#1C1917]">
                  {item.label}
                </span>
                <span className="text-[10px] text-[#8C6D58] font-medium mt-0.5">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Section Caption */}
          <p className="text-center text-xs sm:text-sm font-semibold text-[#57534E] mt-6 max-w-xl mx-auto">
            "Liberty Bell can help connect the entire customer journey instead of treating every interaction separately."
          </p>
        </div>

      </div>
    </section>
  );
};
