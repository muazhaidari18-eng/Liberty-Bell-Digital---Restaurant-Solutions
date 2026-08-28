import { LeadFormData, CtaOrigin } from '../types';

/**
 * Analytics and Conversion Tracking Module
 * Ready for Meta Pixel (fbq), Google Analytics 4 (gtag), Google Tag Manager (dataLayer),
 * and GoHighLevel webhook sync.
 */

// Helper to safely extract URL query parameters for UTM & ad tracking
export function getUrlTrackingParams(): {
  adCampaign: string;
  adSet: string;
  adCreative: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fbclid: string;
} {
  if (typeof window === 'undefined') {
    return {
      adCampaign: '',
      adSet: '',
      adCreative: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      utmTerm: '',
      fbclid: '',
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    adCampaign: params.get('campaign') || params.get('campaign_id') || '',
    adSet: params.get('adset') || params.get('adset_id') || '',
    adCreative: params.get('creative') || params.get('creative_id') || params.get('ad_id') || '',
    utmSource: params.get('utm_source') || 'meta_ads',
    utmMedium: params.get('utm_medium') || 'paid_social',
    utmCampaign: params.get('utm_campaign') || 'restaurant_ai_receptionist',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    fbclid: params.get('fbclid') || '',
  };
}

export function trackEvent(
  eventName: 'PageView' | 'ViewContent' | 'Lead' | 'Contact' | 'Schedule' | 'BookedAppointment' | 'CtaClick',
  payload?: Record<string, any>
) {
  const timestamp = new Date().toISOString();
  console.groupCollapsed(`📊 [Tracking Event] ${eventName} @ ${timestamp}`);
  console.log('Payload:', payload || {});
  
  // 1. Meta Pixel Hook (window.fbq)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('trackCustom', eventName, payload);
    } catch (err) {
      console.warn('Meta Pixel dispatch error:', err);
    }
  } else {
    console.info('💡 Meta Pixel snippet placeholder: fbq("trackCustom", "' + eventName + '", ...)');
  }

  // 2. Google Analytics 4 Hook (window.gtag)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, payload);
    } catch (err) {
      console.warn('GA4 dispatch error:', err);
    }
  } else {
    console.info('💡 GA4 snippet placeholder: gtag("event", "' + eventName + '", ...)');
  }

  // 3. Google Tag Manager Data Layer Hook (window.dataLayer)
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ...payload,
      timestamp,
    });
  }

  console.groupEnd();
}

export function trackCtaClick(source: CtaOrigin, label: string) {
  trackEvent('CtaClick', {
    cta_source: source,
    cta_label: label,
    industry: 'restaurant',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
}

/**
 * Sync lead data to GoHighLevel CRM
 * In production, this can send a POST request to your GHL webhook endpoint.
 */
export async function syncLeadToGoHighLevel(leadData: LeadFormData): Promise<boolean> {
  console.group('🚀 [CRM Sync] GoHighLevel Lead Payload');
  console.log('Synchronizing customer lead to GoHighLevel CRM with complete data capture:');
  console.table(leadData);
  console.log('Full JSON object format:', JSON.stringify(leadData, null, 2));
  console.info('📌 Ready to wire to: POST https://services.leadconnectorhq.com/hooks/your-ghl-webhook-id');
  console.groupEnd();

  // Simulated slight async network latency for smooth UI confirmation
  await new Promise((resolve) => setTimeout(resolve, 400));
  return true;
}
