import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, Phone, Utensils, AlertCircle } from 'lucide-react';
import { LeadFormData, CtaOrigin } from '../types';
import { getUrlTrackingParams, trackEvent, syncLeadToGoHighLevel } from '../utils/tracking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin: CtaOrigin;
  isInPersonReview?: boolean;
}

const BUSINESS_TYPES = [
  'Casual Dining Restaurant',
  'Fine Dining',
  'Café / Coffee Shop',
  'Pizzeria / Italian',
  'Bar & Grill / Pub',
  'Fast Casual / Takeout',
  'Bakery / Dessert Bar',
  'Food Truck / Ghost Kitchen',
  'Other Food Establishment',
];

const HELP_OPTIONS = [
  'Missing Calls',
  'Getting More Leads',
  'Booking More Appointments',
  'Website',
  'Google Visibility',
  'Advertising',
  'Automated Follow-Up',
  'AI Receptionist',
  'Not Sure Yet',
];

// Generate next 5 business days for step 2 scheduling
function getAvailableDates() {
  const dates = [];
  const today = new Date();
  let dayOffset = 1;

  while (dates.length < 5) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + dayOffset);
    const dayOfWeek = nextDay.getDay();
    // Skip Sunday (0) and Saturday (6) if business days, or keep if restaurant standard
    // Let's offer Mon-Fri + Saturday
    if (dayOfWeek !== 0) {
      const formattedDate = nextDay.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const isoDate = nextDay.toISOString().split('T')[0];
      dates.push({ label: formattedDate, value: isoDate });
    }
    dayOffset++;
  }
  return dates;
}

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '1:00 PM',
  '2:30 PM',
  '4:00 PM',
  '5:30 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  origin,
  isInPersonReview = false,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Business Info, 2: Choose Time, 3: Final Confirmed
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: 'Casual Dining Restaurant',
    requestedService: 'Missing Calls',
    website: '',
    notes: '',
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const availableDates = getAvailableDates();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Set default selected date
      if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0].value);
      }
      trackEvent('ViewContent', {
        content_name: isInPersonReview ? 'InPersonReviewModal' : 'StrategyCallModal',
        origin,
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, origin, isInPersonReview]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Restaurant or business name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.businessType) newErrors.businessType = 'Please select your business type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsSubmitting(true);
    const trackingParams = getUrlTrackingParams();

    const leadPayload: LeadFormData = {
      ...formData,
      landingPageIndustry: 'restaurant',
      landingPageUrl: typeof window !== 'undefined' ? window.location.href : '',
      ...trackingParams,
      dateCreated: new Date().toISOString(),
      appointmentStatus: 'Pending',
      ctaSource: origin,
      modalType: isInPersonReview ? 'in_person_review' : 'strategy_call',
    };

    // Track Lead & Contact Events
    trackEvent('Lead', {
      industry: 'restaurant',
      business_name: formData.businessName,
      source: origin,
    });
    trackEvent('Contact', {
      method: 'modal_form',
      email: formData.email,
      phone: formData.phone,
    });

    // Console-log full GoHighLevel payload
    await syncLeadToGoHighLevel(leadPayload);

    setIsSubmitting(false);
    // Transition to Step 2: Choose a Time
    setStep(2);
  };

  const handleStep2Confirm = async () => {
    if (!selectedDate || !selectedTime) {
      setErrors((prev) => ({ ...prev, timeSlot: 'Please choose a convenient time slot' }));
      return;
    }

    setIsSubmitting(true);
    const trackingParams = getUrlTrackingParams();

    const confirmedPayload: LeadFormData = {
      ...formData,
      landingPageIndustry: 'restaurant',
      landingPageUrl: typeof window !== 'undefined' ? window.location.href : '',
      ...trackingParams,
      dateCreated: new Date().toISOString(),
      appointmentStatus: 'Confirmed',
      selectedDate,
      selectedTime,
      ctaSource: origin,
      modalType: isInPersonReview ? 'in_person_review' : 'strategy_call',
    };

    // Track Schedule & BookedAppointment Events
    trackEvent('Schedule', {
      selected_date: selectedDate,
      selected_time: selectedTime,
    });
    trackEvent('BookedAppointment', {
      appointment_type: isInPersonReview ? 'In-Person Restaurant Review' : 'Strategy Call',
      date: selectedDate,
      time: selectedTime,
    });

    await syncLeadToGoHighLevel(confirmedPayload);

    setIsSubmitting(false);
    setStep(3);
  };

  const modalTitle = isInPersonReview
    ? 'Book Your Free In-Person Business Review'
    : 'Book Your Free Strategy Call';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="booking-modal-container"
        className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E7E1D8] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E7E1D8] bg-[#F4EFEA]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C51F26] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider text-[#A9161C] uppercase">
                Liberty Bell Digital • Restaurants
              </span>
              <div className="flex items-center gap-2 text-xs text-[#785D48] font-medium">
                <span>{step === 1 ? 'Step 1: Business Information' : step === 2 ? 'Step 2: Choose a Time' : 'Confirmed'}</span>
              </div>
            </div>
          </div>
          <button
            id="close-booking-modal-button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE4DC] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* STEP 1: BUSINESS INFORMATION */}
          {step === 1 && (
            <div>
              <div className="mb-5">
                <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-bold text-[#1C1917] leading-tight">
                  {modalTitle}
                </h2>
                <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed">
                  Tell us a little about your business and we'll take a look at where you may be losing calls, leads, bookings, or customers.
                </p>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      First Name <span className="text-[#C51F26]">*</span>
                    </label>
                    <input
                      id="lead-first-name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Marco"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30 ${
                        errors.firstName ? 'border-[#C51F26]' : 'border-[#D6CEC4]'
                      }`}
                    />
                    {errors.firstName && <p className="text-xs text-[#C51F26] mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Last Name <span className="text-[#C51F26]">*</span>
                    </label>
                    <input
                      id="lead-last-name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rossi"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30 ${
                        errors.lastName ? 'border-[#C51F26]' : 'border-[#D6CEC4]'
                      }`}
                    />
                    {errors.lastName && <p className="text-xs text-[#C51F26] mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Restaurant / Business Name <span className="text-[#C51F26]">*</span>
                  </label>
                  <input
                    id="lead-business-name"
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Bella Cucina Trattoria"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30 ${
                      errors.businessName ? 'border-[#C51F26]' : 'border-[#D6CEC4]'
                    }`}
                  />
                  {errors.businessName && <p className="text-xs text-[#C51F26] mt-1">{errors.businessName}</p>}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Phone Number <span className="text-[#C51F26]">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30 ${
                        errors.phone ? 'border-[#C51F26]' : 'border-[#D6CEC4]'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-[#C51F26] mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Email Address <span className="text-[#C51F26]">*</span>
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="owner@yourrestaurant.com"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30 ${
                        errors.email ? 'border-[#C51F26]' : 'border-[#D6CEC4]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-[#C51F26] mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Business Type & Requested Help */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Business Type <span className="text-[#C51F26]">*</span>
                    </label>
                    <select
                      id="lead-business-type"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30"
                    >
                      {BUSINESS_TYPES.map((bt) => (
                        <option key={bt} value={bt}>
                          {bt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      What would you like help with?
                    </label>
                    <select
                      id="lead-requested-service"
                      name="requestedService"
                      value={formData.requestedService}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30"
                    >
                      {HELP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional: Website / Google Business Profile */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Website or Google Business Profile <span className="text-[#78716C] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="lead-website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourrestaurant.com or Google Maps Link"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30"
                  />
                </div>

                {/* Optional: Anything we should know */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Anything we should know about your restaurant? <span className="text-[#78716C] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="lead-notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. We get inundated with calls between 5:30 and 8:00 PM on Thursday through Sunday."
                    className="w-full px-3.5 py-2 bg-white border border-[#D6CEC4] rounded-lg text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C51F26]/30 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="submit-step-1-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] px-6 py-3.5 bg-[#C51F26] hover:bg-[#A9161C] active:bg-[#8E1217] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-[#C51F26]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Saving your details...
                      </span>
                    ) : (
                      <>
                        <span>{isInPersonReview ? 'Continue to Schedule Review' : 'Book My Free Strategy Call'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center text-xs text-[#78716C]">
                    🔒 No obligation • Confidential review tailored for your restaurant
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: CHOOSE A TIME */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-[#EFEAE4] border border-[#DDD5CA] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C51F26] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#1C1917]">
                      Information Saved for {formData.businessName || 'your restaurant'}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                      You're All Set. We've received your information. Choose a time that works for you and we'll talk through your business, what's currently happening, and where Liberty Bell may be able to help.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C51F26]" />
                  Select a Convenient Date
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2.5">
                  {availableDates.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.value);
                        if (errors.timeSlot) {
                          setErrors((prev) => ({ ...prev, timeSlot: '' }));
                        }
                      }}
                      className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedDate === d.value
                          ? 'bg-[#C51F26] text-white border-[#C51F26] shadow-sm'
                          : 'bg-white text-[#1C1917] border-[#D6CEC4] hover:border-[#C51F26]/60'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C51F26]" />
                  Select a Time Slot (EST)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2.5">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setSelectedTime(t);
                        if (errors.timeSlot) {
                          setErrors((prev) => ({ ...prev, timeSlot: '' }));
                        }
                      }}
                      className={`py-2.5 px-3 text-center rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedTime === t
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                          : 'bg-white text-[#1C1917] border-[#D6CEC4] hover:border-[#1C1917]/50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && (
                  <p className="text-xs text-[#C51F26] mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.timeSlot}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleStep2Confirm}
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                  className="w-full min-h-[48px] px-6 py-3.5 bg-[#C51F26] hover:bg-[#A9161C] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-[#C51F26]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    'Confirming Slot...'
                  ) : (
                    <>
                      <span>Confirm {selectedTime ? `for ${selectedTime}` : 'Appointment'}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 text-xs text-[#57534E] hover:text-[#1C1917] underline text-center"
                >
                  I'll pick a time later
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === 3 && (
            <div className="text-center py-6 px-2 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">
                  {selectedTime ? "You're Booked." : "You're All Set."}
                </h3>
                <p className="mt-2 text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
                  {selectedTime ? (
                    <>
                      We'll see you then on <strong className="text-[#1C1917]">{selectedDate}</strong> at{' '}
                      <strong className="text-[#1C1917]">{selectedTime}</strong>. Check your phone (
                      <span className="text-[#1C1917]">{formData.phone}</span>) and email (
                      <span className="text-[#1C1917]">{formData.email}</span>) for confirmation.
                    </>
                  ) : (
                    <>
                      We've received your information. Choose a time that works for you and we'll talk through your
                      business, what's currently happening, and where Liberty Bell may be able to help.
                    </>
                  )}
                </p>
              </div>

              <div className="bg-[#F4EFEA] border border-[#E7E1D8] rounded-xl p-4 text-left text-xs space-y-1.5 text-[#57534E] max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="font-medium text-[#78716C]">Restaurant:</span>
                  <span className="font-semibold text-[#1C1917]">{formData.businessName || 'Bella Cucina Trattoria'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#78716C]">Representative:</span>
                  <span className="font-semibold text-[#1C1917]">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#78716C]">Focus:</span>
                  <span className="font-semibold text-[#1C1917]">{formData.requestedService}</span>
                </div>
                {selectedTime && (
                  <div className="flex justify-between pt-1 border-t border-[#DDD5CA]">
                    <span className="font-medium text-[#78716C]">Appointment:</span>
                    <span className="font-semibold text-[#C51F26]">{selectedDate} @ {selectedTime}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-6 py-2.5 bg-[#1C1917] hover:bg-[#332F2C] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
