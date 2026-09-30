import { useState, useCallback, useRef } from 'react'
import { track } from '@/lib/analytics'
import {
  FORM_ENDPOINT,
  FORM_LEAD_EMAIL,
  BUSINESS_EMAIL,
  telHref,
  whatsappHref,
  hasPhone,
  hasWhatsApp,
} from '@/config/business'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormData {
  // Step 1 — Vehicle
  year: string
  make: string
  model: string
  vehicleType: string
  // Step 2 — Condition
  condition: string
  keysAvailable: string
  titleStatus: string
  // Step 3 — Location
  zipCode: string
  city: string
  pickupAddress: string
  accessibility: string
  preferredTime: string
  // Step 4 — Contact
  name: string
  phone: string
  email: string
  preferredContact: string
  whatsappNumber: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

const INITIAL: FormData = {
  year: '',
  make: '',
  model: '',
  vehicleType: '',
  condition: '',
  keysAvailable: '',
  titleStatus: '',
  zipCode: '',
  city: '',
  pickupAddress: '',
  accessibility: '',
  preferredTime: '',
  name: '',
  phone: '',
  email: '',
  preferredContact: 'phone',
  whatsappNumber: '',
  message: '',
}

// ─── Constants ────────────────────────────────────────────────────────────────

const VEHICLE_TYPES = ['Car', 'Truck', 'SUV', 'Van', 'Minivan', 'Motorcycle', 'Other']
const CONDITIONS = [
  'Runs & Drives',
  'Runs but Has Issues',
  "Doesn't Run",
  'Wrecked / Collision',
  'Flood Damaged',
  'Fire Damaged',
  'Missing Parts',
  'Unknown',
]
const TITLE_OPTIONS = ['Clean Title', 'Salvage Title', 'No Title', 'Unsure']
const KEYS_OPTIONS = ['Yes', 'No', 'Unknown']
const CONTACT_OPTIONS = [
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
]
const TIME_OPTIONS = [
  'Morning (8am–12pm)',
  'Afternoon (12pm–5pm)',
  'Evening (5pm–8pm)',
  'Flexible',
]
const ACCESS_OPTIONS = [
  'Driveway / Easy Access',
  'Alley',
  'Parking Lot',
  'Garage',
  'Other / Unknown',
]
const YEARS = Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() - i))

const TOTAL_STEPS = 5

const STEP_LABELS = ['Vehicle', 'Condition', 'Location', 'Contact', 'Review']

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {}
  if (step === 1) {
    if (!data.year) e.year = 'Required'
    if (!data.make.trim()) e.make = 'Required'
    if (!data.model.trim()) e.model = 'Required'
    if (!data.vehicleType) e.vehicleType = 'Select a vehicle type'
  }
  if (step === 2) {
    if (!data.condition) e.condition = 'Select a condition'
  }
  if (step === 3) {
    if (!data.zipCode.trim()) e.zipCode = 'Required'
    else if (!/^\d{5}$/.test(data.zipCode.trim())) e.zipCode = 'Enter a valid 5-digit ZIP'
  }
  if (step === 4) {
    if (!data.name.trim()) e.name = 'Required'
    if (!data.phone.trim()) e.phone = 'Required'
    else if (!/^[\d\s\-\+\(\)]{7,20}$/.test(data.phone.trim())) e.phone = 'Enter a valid phone number'
    if (!data.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = 'Enter a valid email'
    if (data.preferredContact === 'whatsapp' && !data.whatsappNumber.trim())
      e.whatsappNumber = 'Required for WhatsApp contact'
  }
  return e
}

// ─── Submission ───────────────────────────────────────────────────────────────

async function submitForm(data: FormData, hpValue: string): Promise<void> {
  // Honeypot — silently reject bot submissions (read from uncontrolled ref, not state)
  if (hpValue) throw new Error('Submission rejected.')

  // Validate payload sizes
  const maxLen = (val: string, max: number, field: string) => {
    if (val.length > max) throw new Error(`${field} is too long.`)
  }
  maxLen(data.name, 100, 'Name')
  maxLen(data.email, 200, 'Email')
  maxLen(data.phone, 30, 'Phone')
  maxLen(data.message, 1000, 'Message')
  maxLen(data.make, 80, 'Make')
  maxLen(data.model, 80, 'Model')

  const payload = {
    _replyto: data.email,
    _subject: `Junk Car Quote: ${data.year} ${data.make} ${data.model} — ${data.zipCode}`,
    vehicle: `${data.year} ${data.make} ${data.model} (${data.vehicleType})`,
    condition: data.condition,
    keys: data.keysAvailable || 'Not specified',
    title: data.titleStatus || 'Not specified',
    location: [data.pickupAddress, data.city, data.zipCode].filter(Boolean).join(', '),
    accessibility: data.accessibility || 'Not specified',
    preferredPickupTime: data.preferredTime || 'Not specified',
    customerName: data.name,
    customerPhone: data.phone,
    customerEmail: data.email,
    preferredContact: data.preferredContact,
    whatsapp: data.whatsappNumber || 'N/A',
    message: data.message || 'None',
    _destination: FORM_LEAD_EMAIL,
  }

  if (FORM_ENDPOINT) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      if (!res.ok) {
        throw new Error('Submission failed. Please try again or contact us directly.')
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection and try again.')
      }
      throw err
    } finally {
      clearTimeout(timeout)
    }
    return
  }

  // No endpoint configured — use mailto fallback.
  // This is a best-effort fallback; success is assumed if the mailto opens.
  const body = Object.entries(payload)
    .filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  const subject = encodeURIComponent(payload._subject)
  const bodyEnc = encodeURIComponent(body)
  const link = document.createElement('a')
  link.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${bodyEnc}`
  link.click()
  // Short delay so the mail client has time to open before we show success
  await new Promise((r) => setTimeout(r, 400))
}

// ─── Component ────────────────────────────────────────────────────────────────

interface QuoteFormProps {
  compact?: boolean
  onSuccess?: () => void
}

export default function QuoteForm({ compact = false, onSuccess }: QuoteFormProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const topRef = useRef<HTMLDivElement>(null)
  const hpRef = useRef<HTMLInputElement>(null)

  const set = useCallback((field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }, [])

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function nextStep() {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    const next = Math.min(step + 1, TOTAL_STEPS)
    setStep(next)
    track('quote_step_completed', { step })
    scrollTop()
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1))
    setSubmitError('')
    scrollTop()
  }

  function goToStep(n: number) {
    setStep(n)
    setSubmitError('')
    scrollTop()
  }

  async function handleSubmit() {
    setSubmitError('')
    setSubmitting(true)
    track('quote_submission_attempted')

    try {
      await submitForm(data, hpRef.current?.value ?? '')
      setSubmitting(false)
      setSubmitted(true)
      track('quote_submission_success')
      onSuccess?.()
    } catch (err: unknown) {
      setSubmitting(false)
      const message =
        err instanceof Error
          ? err.message
          : 'Submission failed. Please try again or contact us directly.'
      setSubmitError(message)
      track('quote_submission_error')
    }
  }

  if (submitted) return <SuccessState compact={compact} />

  return (
    <div ref={topRef}>
      {/* Progress bar */}
      <div className={compact ? 'mb-3' : 'mb-6'}>
        <div className="flex items-center gap-0.5 mb-2">
          {STEP_LABELS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 transition-all duration-300 ${
                i + 1 <= step ? 'bg-[#F59E0B]' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {STEP_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => i + 1 < step && goToStep(i + 1)}
              disabled={i + 1 >= step}
              className={`text-[10px] font-semibold tracking-widest uppercase transition-colors ${
                i + 1 === step
                  ? 'text-[#F59E0B]'
                  : i + 1 < step
                  ? 'text-[#7A7672] hover:text-[#F0EDE8] cursor-pointer'
                  : 'text-white/20 cursor-default'
              }`}
              aria-label={i + 1 < step ? `Back to step ${i + 1}: ${label}` : label}
            >
              {i + 1 < step ? '✓' : String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Step heading */}
      <p className={`text-xs text-[#7A7672] font-medium tracking-widest uppercase ${compact ? 'mb-3' : 'mb-5'}`}>
        Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step - 1]}
      </p>

      {/* Fields */}
      <div className={compact ? 'space-y-3' : 'space-y-4'}>
        {step === 1 && <Step1 data={data} errors={errors} set={set} compact={compact} />}
        {step === 2 && <Step2 data={data} errors={errors} set={set} compact={compact} />}
        {step === 3 && <Step3 data={data} errors={errors} set={set} compact={compact} />}
        {step === 4 && <Step4 data={data} errors={errors} set={set} compact={compact} />}
        {step === 5 && <Step5Review data={data} goToStep={goToStep} />}
      </div>

      {/* Honeypot — uncontrolled so browser autofill can't trigger false positives */}
      <input
        ref={hpRef}
        type="text"
        name="website"
        defaultValue=""
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, pointerEvents: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="new-password"
      />

      {/* Submission error */}
      {submitError && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 px-4 py-3" role="alert">
          <p className="text-sm text-red-400 mb-2">{submitError}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {hasPhone() && (
              <a href={telHref()} className="text-red-400 underline" onClick={() => track('phone_clicked')}>
                Call us directly
              </a>
            )}
            <a href={`mailto:${BUSINESS_EMAIL}`} className="text-red-400 underline">
              Email us
            </a>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className={`flex gap-3 ${compact ? 'mt-4' : 'mt-6'} ${step === 1 ? 'justify-end' : 'justify-between'}`}>
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            disabled={submitting}
            className="px-4 py-3 text-xs font-semibold text-[#7A7672] hover:text-[#F0EDE8] transition-colors tracking-wider uppercase font-display disabled:opacity-40"
          >
            ← Back
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={nextStep}
            className="btn-amber flex-1 sm:flex-none sm:px-8"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-amber flex-1 sm:flex-none sm:px-8 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-busy={submitting}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <SpinnerIcon /> Submitting…
              </span>
            ) : (
              'Submit My Quote Request'
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Step 1: Vehicle ──────────────────────────────────────────────────────────

function Step1({ data, errors, set, compact }: StepProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="field">
          <label htmlFor="qf-year">Year *</label>
          <select id="qf-year" value={data.year} onChange={(e) => set('year', e.target.value)}>
            <option value="">Select</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.year && <span className="field-error" role="alert">{errors.year}</span>}
        </div>
        <div className="field">
          <label htmlFor="qf-make">Make *</label>
          <input
            id="qf-make"
            type="text"
            placeholder="e.g. Honda"
            value={data.make}
            onChange={(e) => set('make', e.target.value)}
            maxLength={80}
          />
          {errors.make && <span className="field-error" role="alert">{errors.make}</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="field">
          <label htmlFor="qf-model">Model *</label>
          <input
            id="qf-model"
            type="text"
            placeholder="e.g. Civic"
            value={data.model}
            onChange={(e) => set('model', e.target.value)}
            maxLength={80}
          />
          {errors.model && <span className="field-error" role="alert">{errors.model}</span>}
        </div>
        <div className="field">
          <label htmlFor="qf-type">Type *</label>
          <select
            id="qf-type"
            value={data.vehicleType}
            onChange={(e) => set('vehicleType', e.target.value)}
          >
            <option value="">Select</option>
            {VEHICLE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.vehicleType && <span className="field-error" role="alert">{errors.vehicleType}</span>}
        </div>
      </div>
      {!compact && (
        <p className="text-[10px] text-[#4A4642]">All vehicle types and conditions considered.</p>
      )}
    </>
  )
}

// ─── Step 2: Condition ────────────────────────────────────────────────────────

function Step2({ data, errors, set, compact }: StepProps) {
  return (
    <>
      <div className="field">
        <label id="qf-condition-label">Vehicle Condition *</label>
        <div className="grid grid-cols-2 gap-1.5" role="group" aria-labelledby="qf-condition-label">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => set('condition', c)}
              aria-pressed={data.condition === c}
              className={`text-left px-3 py-2 text-xs border transition-all leading-snug ${
                data.condition === c
                  ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F0EDE8]'
                  : 'border-white/8 text-[#7A7672] hover:border-white/18 hover:text-[#F0EDE8]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {errors.condition && <span className="field-error" role="alert">{errors.condition}</span>}
      </div>
      {!compact && (
        <div className="grid grid-cols-2 gap-4">
          <div className="field">
            <label id="qf-keys-label">Keys Available?</label>
            <div className="flex gap-2" role="group" aria-labelledby="qf-keys-label">
              {KEYS_OPTIONS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => set('keysAvailable', k)}
                  aria-pressed={data.keysAvailable === k}
                  className={`flex-1 py-2 text-sm border transition-all ${
                    data.keysAvailable === k
                      ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]'
                      : 'border-white/10 text-[#7A7672] hover:border-white/20'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="qf-title">Title Status</label>
            <select id="qf-title" value={data.titleStatus} onChange={(e) => set('titleStatus', e.target.value)}>
              <option value="">Select</option>
              {TITLE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Step 3: Location ─────────────────────────────────────────────────────────

function Step3({ data, errors, set, compact }: StepProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="field">
          <label htmlFor="qf-zip">ZIP Code *</label>
          <input
            id="qf-zip"
            type="text"
            inputMode="numeric"
            placeholder="60601"
            maxLength={5}
            value={data.zipCode}
            onChange={(e) => set('zipCode', e.target.value.replace(/\D/g, ''))}
          />
          {errors.zipCode && <span className="field-error" role="alert">{errors.zipCode}</span>}
        </div>
        <div className="field">
          <label htmlFor="qf-city">City</label>
          <input
            id="qf-city"
            type="text"
            placeholder="Chicago"
            value={data.city}
            onChange={(e) => set('city', e.target.value)}
            maxLength={80}
          />
        </div>
      </div>
      {!compact && (
        <>
          <div className="field">
            <label htmlFor="qf-address">Pickup Address (optional)</label>
            <input
              id="qf-address"
              type="text"
              placeholder="Street address"
              value={data.pickupAddress}
              onChange={(e) => set('pickupAddress', e.target.value)}
              maxLength={200}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="field">
              <label htmlFor="qf-access">Vehicle Access</label>
              <select id="qf-access" value={data.accessibility} onChange={(e) => set('accessibility', e.target.value)}>
                <option value="">Select</option>
                {ACCESS_OPTIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="qf-time">Preferred Pickup Time</label>
              <select id="qf-time" value={data.preferredTime} onChange={(e) => set('preferredTime', e.target.value)}>
                <option value="">Select</option>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// ─── Step 4: Contact ──────────────────────────────────────────────────────────

function Step4({ data, errors, set, compact }: StepProps) {
  return (
    <>
      <div className="field">
        <label htmlFor="qf-name">Full Name *</label>
        <input
          id="qf-name"
          type="text"
          placeholder="Your full name"
          value={data.name}
          onChange={(e) => set('name', e.target.value)}
          maxLength={100}
          autoComplete="name"
        />
        {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="qf-phone">Phone *</label>
          <input
            id="qf-phone"
            type="tel"
            placeholder="Your phone number"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
            maxLength={30}
            autoComplete="tel"
          />
          {errors.phone && <span className="field-error" role="alert">{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="qf-email">Email *</label>
          <input
            id="qf-email"
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
            maxLength={200}
            autoComplete="email"
          />
          {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
        </div>
      </div>
      <div className="field">
        <label id="qf-contact-label">Preferred Contact Method</label>
        <div className="flex gap-2" role="group" aria-labelledby="qf-contact-label">
          {CONTACT_OPTIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => set('preferredContact', c.value)}
              aria-pressed={data.preferredContact === c.value}
              className={`flex-1 py-2 text-sm border transition-all ${
                data.preferredContact === c.value
                  ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]'
                  : 'border-white/10 text-[#7A7672] hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      {data.preferredContact === 'whatsapp' && (
        <div className="field">
          <label htmlFor="qf-wa">WhatsApp Number *</label>
          <input
            id="qf-wa"
            type="tel"
            placeholder="Your WhatsApp number"
            value={data.whatsappNumber}
            onChange={(e) => set('whatsappNumber', e.target.value)}
            maxLength={30}
          />
          {errors.whatsappNumber && <span className="field-error" role="alert">{errors.whatsappNumber}</span>}
        </div>
      )}
      {!compact && (
        <div className="field">
          <label htmlFor="qf-msg">Additional Notes (optional)</label>
          <textarea
            id="qf-msg"
            rows={3}
            placeholder="Any additional details about your vehicle…"
            value={data.message}
            onChange={(e) => set('message', e.target.value)}
            maxLength={1000}
            className="resize-none"
          />
          <span className="text-[10px] text-[#4A4642] self-end">{data.message.length}/1000</span>
        </div>
      )}
    </>
  )
}

// ─── Step 5: Review ───────────────────────────────────────────────────────────

function Step5Review({ data, goToStep }: { data: FormData; goToStep: (n: number) => void }) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: 'Vehicle', value: `${data.year} ${data.make} ${data.model} (${data.vehicleType})`, step: 1 },
    { label: 'Condition', value: data.condition || '—', step: 2 },
    { label: 'Keys', value: data.keysAvailable || '—', step: 2 },
    { label: 'Title', value: data.titleStatus || '—', step: 2 },
    {
      label: 'Location',
      value: [data.pickupAddress, data.city, data.zipCode].filter(Boolean).join(', ') || '—',
      step: 3,
    },
    { label: 'Accessibility', value: data.accessibility || '—', step: 3 },
    { label: 'Preferred Pickup', value: data.preferredTime || '—', step: 3 },
    { label: 'Name', value: data.name, step: 4 },
    { label: 'Phone', value: data.phone, step: 4 },
    { label: 'Email', value: data.email, step: 4 },
    { label: 'Preferred Contact', value: data.preferredContact, step: 4 },
    ...(data.whatsappNumber ? [{ label: 'WhatsApp', value: data.whatsappNumber, step: 4 }] : []),
    ...(data.message ? [{ label: 'Notes', value: data.message, step: 4 }] : []),
  ]

  return (
    <div>
      <p className="text-sm text-[#7A7672] mb-5 leading-relaxed">
        Review your information before submitting. Click <strong className="text-[#F0EDE8]">Edit</strong> to correct any step.
      </p>
      <div className="divide-y divide-white/6 mb-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between py-3 gap-4">
            <span className="text-xs text-[#7A7672] font-semibold tracking-wide uppercase min-w-[90px] pt-0.5">
              {row.label}
            </span>
            <span className="text-sm text-[#F0EDE8] flex-1 leading-snug break-all">{row.value}</span>
            <button
              type="button"
              onClick={() => goToStep(row.step)}
              className="text-xs text-[#F59E0B] hover:text-[#FCD34D] transition-colors font-semibold tracking-wide uppercase flex-shrink-0"
              aria-label={`Edit ${row.label}`}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 px-4 py-3">
        <p className="text-xs text-[#A8A49F] leading-relaxed">
          Your quote request will be sent to our team at{' '}
          <span className="text-[#F0EDE8]">{FORM_LEAD_EMAIL}</span>. We'll review your vehicle details and respond as soon as possible.
        </p>
      </div>
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({ compact }: { compact: boolean }) {
  return (
    <div className={`text-center ${compact ? 'py-6' : 'py-10'}`} role="status" aria-live="polite">
      <div className="w-14 h-14 bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-display font-800 text-2xl tracking-wide mb-2 text-[#F0EDE8]">
        QUOTE REQUEST RECEIVED
      </h3>
      <p className="text-[#7A7672] text-sm mb-2 max-w-xs mx-auto">
        Your request has been submitted. Our team will review your vehicle details and follow up using your preferred contact method.
      </p>
      <p className="text-[#4A4642] text-xs mb-8">
        You can also reach us directly:
      </p>
      <div className="flex flex-col gap-3">
        {hasPhone() ? (
          <a
            href={telHref()}
            onClick={() => track('phone_clicked')}
            className="btn-amber w-full"
          >
            <PhoneIcon aria-hidden={true} /> Call Us
          </a>
        ) : (
          <a
            href={`mailto:${BUSINESS_EMAIL}`}
            className="btn-amber w-full"
          >
            Email Us
          </a>
        )}
        {hasWhatsApp() && (
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_clicked')}
            className="btn-outline w-full"
          >
            <WhatsAppIcon aria-hidden={true} /> WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Shared types ─────────────────────────────────────────────────────────────

interface StepProps {
  data: FormData
  errors: Errors
  set: (k: keyof FormData, v: string) => void
  compact?: boolean
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function PhoneIcon({ 'aria-hidden': ah }: { 'aria-hidden'?: boolean }) {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden={ah}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function WhatsAppIcon({ 'aria-hidden': ah }: { 'aria-hidden'?: boolean }) {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden={ah}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
