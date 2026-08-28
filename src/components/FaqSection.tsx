import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const faqs = [
    {
      question: 'Can it answer menu questions?',
      answer:
        'Yes. It is trained on your exact menu, dietary tags (gluten-free, vegan, nut allergies), pricing, signature dishes, and seasonal specials to answer guest inquiries accurately.',
    },
    {
      question: 'Can it take reservations?',
      answer:
        'Yes. It collects guest name, party size, date, and preferred time, checking against your table availability parameters and instantly texting the guest a confirmation.',
    },
    {
      question: "Can it answer when we're closed?",
      answer:
        'Yes, 24/7. When your kitchen or dining room is closed, it continues to take future reservations, answer hours/location questions, and capture catering or event inquiries.',
    },
    {
      question: 'Can calls still reach staff?',
      answer:
        'Absolutely. You can set specific rules to instantly transfer emergency calls, VIP guests, or complex private party inquiries directly to an on-duty manager or host stand.',
    },
    {
      question: 'Can Liberty Bell help us get more customers too?',
      answer:
        'Yes. Beyond call handling, we help restaurants with high-converting websites, Google Maps local visibility, targeted Meta ads, and automated SMS review requests.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            Common Questions From Restaurant Owners
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            Quick answers about how Liberty Bell integrates with your current operations.
          </p>
        </div>

        {/* 5 FAQ Accordion Items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E0D6] rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#1C1917] flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#F4EFEA] text-[#C51F26] text-xs flex items-center justify-center font-extrabold shrink-0">
                      {idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F4EFEA] text-[#57534E] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#C51F26] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#57534E] leading-relaxed border-t border-[#F4EFEA] bg-[#FDFBF7]">
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
