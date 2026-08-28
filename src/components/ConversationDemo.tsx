import React, { useState } from 'react';
import { Bot, User, CheckCircle, MessageSquare, Sparkles, RefreshCw, Smartphone } from 'lucide-react';
import { CtaOrigin } from '../types';
import { trackCtaClick } from '../utils/tracking';

interface ConversationDemoProps {
  onOpenBooking: (origin: CtaOrigin) => void;
}

export const ConversationDemo: React.FC<ConversationDemoProps> = ({ onOpenBooking }) => {
  const [activeOption, setActiveOption] = useState<'7:15 PM' | '6:45 PM' | '7:45 PM'>('7:15 PM');

  return (
    <section id="demo" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F4EFEA] border-y border-[#EAE3DA]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9161C]">
            Live Interaction Example
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            How The AI Receptionist Handles A Peak-Hour Call
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto">
            Natural, fast, and polite. It knows your table inventory, timings, and policies without hesitating.
          </p>
        </div>

        {/* Conversation Mock Card */}
        <div className="bg-[#FAF8F5] border border-[#E7E0D6] rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
          
          {/* Top Audio / Call Header */}
          <div className="bg-[#1C1917] text-white px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C51F26] flex items-center justify-center text-xs font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">Liberty Bell AI Voice Receptionist</p>
                <p className="text-[11px] text-[#A8A29E] mt-0.5">Caller: Michael (Guest)</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold bg-[#22C55E]/20 text-[#4ADE80] px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-ping"></span>
              Live Audio Call
            </div>
          </div>

          {/* Transcript Area */}
          <div className="p-5 sm:p-6 space-y-4 text-sm">
            
            {/* Step 1: Customer */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5E0D8] text-[#57534E] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#E7E0D6] p-3.5 rounded-2xl rounded-tl-xs shadow-2xs max-w-[85%] text-[#1C1917]">
                <p className="text-xs font-bold text-[#78716C] mb-1">Customer</p>
                <p className="leading-relaxed">"Hi, do you have a table for four around 7 tonight?"</p>
              </div>
            </div>

            {/* Step 2: AI Response */}
            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-[#C51F26] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#1C1917] text-white p-3.5 rounded-2xl rounded-tr-xs shadow-2xs max-w-[85%] text-left">
                <p className="text-xs font-bold text-[#F5D0D2] mb-1">AI Receptionist</p>
                <p className="leading-relaxed">
                  "I can help with that. Let me check your available reservation times for a party of four."
                </p>

                {/* Availability Options Badges */}
                <div className="mt-3 pt-2.5 border-t border-white/15 space-y-1.5">
                  <p className="text-[11px] text-[#D6D3D1] font-medium">Available Openings Found:</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(['6:45 PM', '7:15 PM', '7:45 PM'] as const).map((time) => (
                      <button
                        key={time}
                        onClick={() => setActiveOption(time)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeOption === time
                            ? 'bg-[#C51F26] text-white ring-2 ring-white/50'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {time} {activeOption === time ? '✓ Selected' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Customer Confirms */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5E0D8] text-[#57534E] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#E7E0D6] p-3.5 rounded-2xl rounded-tl-xs shadow-2xs max-w-[85%] text-[#1C1917]">
                <p className="text-xs font-bold text-[#78716C] mb-1">Customer</p>
                <p className="leading-relaxed">"{activeOption} works."</p>
              </div>
            </div>

            {/* Step 4: Booked-Status Card */}
            <div className="pt-2">
              <div className="bg-[#E7F7ED] border border-[#B7E7CA] rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-sm font-bold text-[#14532D]">
                    Reservation Request Confirmed — SMS confirmation sent.
                  </h4>
                  <p className="text-xs text-[#166534]">
                    Table for 4 tonight @ {activeOption}. Added to your reservation log & guest notified instantly.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer note inside demo */}
          <div className="bg-[#F0EBE3] px-5 py-3 border-t border-[#E7E0D6] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#57534E]">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#8C6D58]" />
              Works on standard phone lines or existing VoIP systems
            </span>
            <button
              onClick={() => {
                trackCtaClick('conversation_demo', 'Book My Free Strategy Call');
                onOpenBooking('conversation_demo');
              }}
              className="text-xs font-bold text-[#C51F26] hover:underline cursor-pointer"
            >
              See how it works for your menu →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
