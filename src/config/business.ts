/**
 * Central business configuration.
 *
 * Replace placeholder values here before going live.
 * Every component and page imports from this file — changing
 * a value here updates the entire site automatically.
 */

// ─── Business identity ────────────────────────────────────────────────────────

/**
 * Set the final business name when confirmed.
 * Currently displayed as a generic working title.
 */
export const BUSINESS_NAME = 'Junk Car Cash Now LLC'
export const BUSINESS_NAME_SHORT = 'Junk Car Cash Now'

/**
 * Set to the final verified phone number, e.g. '+17089981730'
 * Set to null to hide all phone CTAs until confirmed.
 */
export const BUSINESS_PHONE: string | null = '+13122440565'

/**
 * Display-formatted phone number shown in UI.
 */
export const BUSINESS_PHONE_DISPLAY: string | null = '+1 (312) 244-0565'

/**
 * WhatsApp number — same format as phone, e.g. '17089981730' (no +)
 * Set to null to hide WhatsApp CTAs.
 */
export const BUSINESS_WHATSAPP: string | null = null

/**
 * Confirmed lead destination email. Do NOT change without authorization.
 */
export const BUSINESS_EMAIL = 'carsjunk81@gmail.com'

export const BUSINESS_SERVICE_STATE = 'Illinois'
export const BUSINESS_SERVICE_STATE_ABBR = 'IL'

/**
 * Set when domain is confirmed and live.
 */
export const BUSINESS_DOMAIN = 'junkcarcashnow.online'

// ─── Google Business Profile ──────────────────────────────────────────────────

/**
 * Set these once the Google Business Profile is verified.
 * Used for "View on Google" and "Leave a Review" links.
 */
export const GOOGLE_PROFILE_URL = ''
export const GOOGLE_REVIEW_URL = ''

// ─── Form / Lead delivery ─────────────────────────────────────────────────────

/**
 * Formspree endpoint for quote form submissions.
 *
 * To activate:
 * 1. Create a free account at https://formspree.io
 * 2. Create a new form and set the destination to BUSINESS_EMAIL
 * 3. Copy the endpoint URL (https://formspree.io/f/YOUR_ID)
 * 4. Paste it below.
 *
 * When empty, the form will display a fallback contact message on submission.
 */
export const FORM_ENDPOINT = 'https://formspree.io/f/mqpajgvy'

/**
 * Lead destination email — always delivered here on successful submission.
 */
export const FORM_LEAD_EMAIL = BUSINESS_EMAIL

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** tel: href. Returns undefined if no phone is configured. */
export function telHref(): string | undefined {
  if (!BUSINESS_PHONE) return undefined
  return `tel:${BUSINESS_PHONE}`
}

/** WhatsApp URL. Returns undefined if no WhatsApp is configured. */
export function whatsappHref(): string | undefined {
  if (!BUSINESS_WHATSAPP) return undefined
  return `https://wa.me/${BUSINESS_WHATSAPP}`
}

/** True only when a real phone number has been configured. */
export function hasPhone(): boolean {
  return !!BUSINESS_PHONE
}

/** True only when WhatsApp has been configured. */
export function hasWhatsApp(): boolean {
  return !!BUSINESS_WHATSAPP
}
