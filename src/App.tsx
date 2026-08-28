/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ConversationDemo } from './components/ConversationDemo';
import { CustomerJourneySection } from './components/CustomerJourneySection';
import { AdditionalServicesSection } from './components/AdditionalServicesSection';
import { TrustSection } from './components/TrustSection';
import { InPersonReviewSection } from './components/InPersonReviewSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { StickyCta } from './components/StickyCta';
import { BookingModal } from './components/BookingModal';
import { CtaOrigin } from './types';
import { trackEvent } from './utils/tracking';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState<CtaOrigin>('hero');
  const [isInPersonReview, setIsInPersonReview] = useState(false);

  useEffect(() => {
    // Initial PageView tracking for Meta Pixel / GA4 / GTM
    trackEvent('PageView', {
      page_title: 'AI Receptionist for Restaurants | Liberty Bell Digital',
      industry: 'restaurant',
      landing_page_url: typeof window !== 'undefined' ? window.location.href : '',
    });
  }, []);

  const handleOpenBooking = (origin: CtaOrigin, inPerson = false) => {
    setModalOrigin(origin);
    setIsInPersonReview(inPerson);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col antialiased pb-16 md:pb-0">
      {/* 1. Minimal Nav */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* 3. Industry-Specific Problem Section */}
        <ProblemSection />

        {/* 4. Liberty Bell / AI Receptionist Solution */}
        <SolutionSection />

        {/* 5. AI Receptionist Conversation Demo */}
        <ConversationDemo onOpenBooking={handleOpenBooking} />

        {/* 6. Customer Journey Section */}
        <CustomerJourneySection />

        {/* 7. Relevant Additional Services & Repeat-Customer Cycle */}
        <AdditionalServicesSection onOpenBooking={handleOpenBooking} />

        {/* 8. Why Liberty Bell / Trust Section */}
        <TrustSection />

        {/* 9. In-Person Review Section */}
        <InPersonReviewSection onOpenBooking={handleOpenBooking} />

        {/* 10. FAQ Section (5 Q&As) */}
        <FaqSection />

        {/* 11. Final CTA Section */}
        <FinalCtaSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Minimal Footer */}
      <footer className="bg-[#FAF8F5] border-t border-[#EAE3DA] py-8 px-4 sm:px-6 text-center text-xs text-[#78716C]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1C1917]">Liberty Bell Digital</span>
            <span>•</span>
            <span>AI Receptionist & Growth Systems for Restaurants</span>
          </div>
          <p>© {new Date().getFullYear()} Liberty Bell Digital. All rights reserved.</p>
        </div>
      </footer>

      {/* 12. Sticky CTA (Mobile bottom persistent bar & desktop subtle bar) */}
      <StickyCta onOpenBooking={handleOpenBooking} />

      {/* 13. Unified Booking Popup Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        origin={modalOrigin}
        isInPersonReview={isInPersonReview}
      />
    </div>
  );
}
