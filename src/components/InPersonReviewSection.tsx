import React from 'react';
import { Store, Eye, ClipboardCheck, ArrowRight, MapPin, CheckCircle } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface InPersonReviewSectionProps {
  onOpenBooking: (origin: CtaOrigin, isInPerson?: boolean) => void;
}

export const InPersonReviewSection: React.FC<InPersonReviewSectionProps> = ({ onOpenBooking }) => {
  const reviewPoints = [
    {
      icon: Eye,
      title: 'Observe Live Peak Volume',
      desc: 'We see firsthand how phone calls, walk-ins, and takeout questions interact with your host stand and dining room floor.',
    },
    {
      icon: ClipboardCheck,
      title: 'Audit Missed Opportunities',
      desc: 'We review where potential table bookings, large catering parties, or takeout tickets are quietly slipping through the cracks.',
    },
    {
      icon: Store,
      title: 'Tailor A Practical Action Plan',
      desc: 'You receive clear, actionable recommendations customized to your restaurant layout, team size, and guest demographic.',
    },
  ];

  const handleReviewClick = () => {
    trackCtaClick('in_person_review', 'Book My Free In-Person Business Review');
    onOpenBooking('in_person_review', true);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F4EFEA] border-y border-[#EAE3DA]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FAF8F5] border border-[#DDD3C7] rounded-3xl p-6 sm:p-10 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Context */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7DE] text-[#A9161C] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                Local On-Site Evaluation
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
                We'll Come To Your Restaurant.
              </h2>

              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Prefer to talk in person? We’ll sit down at your establishment to see how calls, reservations, and customer inquiries currently move through your business during actual operations.
              </p>

              {/* 3 Short Items */}
              <div className="space-y-3.5 pt-2">
                {reviewPoints.map((pt, idx) => {
                  const Icon = pt.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C51F26]/10 text-[#C51F26] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1C1917]">{pt.title}</h4>
                        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  id="in-person-review-cta-btn"
                  onClick={handleReviewClick}
                  className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 bg-[#C51F26] hover:bg-[#A9161C] active:bg-[#8E1217] text-white text-sm sm:text-base font-bold rounded-xl transition-all shadow-md shadow-[#C51F26]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book My Free In-Person Business Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-2 text-xs text-[#78716C]">
                  100% Free • No sales pressure • Available for local dining establishments
                </p>
              </div>
            </div>

            {/* Right Column: Warm Restaurant Review Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E7E0D6] bg-white aspect-4/3 sm:aspect-5/4 lg:aspect-auto lg:h-[380px]">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Restaurant dining area during prep and service"
                  className="w-full h-full object-cover brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-xs p-3.5 rounded-xl border border-[#E7E0D6] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1C1917]">
                    <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                    <span>Direct On-Site Walkthrough</span>
                  </div>
                  <p className="text-[11px] text-[#57534E]">
                    See how automated call reception integrates with your POS, phone system, and host team.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
