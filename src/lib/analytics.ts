type EventName =
  | 'quote_started'
  | 'quote_step_completed'
  | 'quote_submission_attempted'
  | 'quote_submission_success'
  | 'quote_submission_error'
  | 'phone_clicked'
  | 'whatsapp_clicked'
  | 'service_area_clicked'
  | 'service_page_clicked'
  | 'faq_opened'
  | 'cta_clicked'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function track(event: EventName, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}
