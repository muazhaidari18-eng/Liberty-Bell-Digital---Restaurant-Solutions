export interface LeadFormData {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  businessType: string;
  requestedService: string;
  website: string;
  notes: string;
  landingPageIndustry: string;
  landingPageUrl: string;
  adCampaign: string;
  adSet: string;
  adCreative: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fbclid: string;
  dateCreated: string;
  appointmentStatus: 'Pending' | 'Confirmed';
  selectedDate?: string;
  selectedTime?: string;
  ctaSource: string;
  modalType?: 'strategy_call' | 'in_person_review';
}

export type CtaOrigin =
  | 'nav'
  | 'hero'
  | 'mid_page'
  | 'ai_receptionist'
  | 'conversation_demo'
  | 'in_person_review'
  | 'final_cta'
  | 'sticky_mobile'
  | 'sticky_desktop';
