import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import QuoteForm from '@/components/QuoteForm'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import { serviceAreas } from '@/data/serviceAreas'
import { faqs } from '@/data/faqs'
import { BUSINESS_NAME, hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1687867455489-bc2ad036b45a?w=1920&h=1080&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1687867456092-9717ce223658?w=1920&h=1080&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1670931814837-72bdaa5e612a?w=1920&h=1080&fit=crop&auto=format',
]

const HERO_ACTS = [
  {
    label: 'ACT 01',
    headline: 'YOUR JUNK CAR\nSTILL HAS VALUE.',
    sub: 'Get a free quote for your junk car in Illinois.',
  },
  {
    label: 'ACT 02',
    headline: 'TELL US ABOUT\nYOUR CAR.',
    sub: 'Year, make, model, vehicle type. Any condition considered.',
  },
  {
    label: 'ACT 03',
    headline: 'RUNS. DOESN\'T RUN.\nWRECKED. WE BUY IT.',
    sub: 'Condition doesn\'t disqualify your vehicle — it informs your offer.',
  },
  {
    label: 'ACT 04',
    headline: 'WHERE IS\nYOUR CAR?',
    sub: 'We serve Chicago and surrounding Illinois communities.',
  },
  {
    label: 'ACT 05',
    headline: 'LET\'S GET\nYOUR QUOTE.',
    sub: 'Your name, phone, email. We\'ll be in touch fast.',
  },
]

const HOW_STEPS = [
  {
    num: '01',
    title: 'Request Your Free Quote',
    desc: 'Fill out our quick quote form with your vehicle details — year, make, model, condition, and ZIP code. Or call us directly.',
  },
  {
    num: '02',
    title: 'Receive Your Offer',
    desc: "We review your vehicle information and contact you with an offer. Every vehicle is assessed individually regardless of condition.",
  },
  {
    num: '03',
    title: 'Schedule Pickup',
    desc: 'If you accept the offer, we schedule a convenient pickup time. Non-running vehicles are picked up via flatbed tow truck.',
  },
  {
    num: '04',
    title: 'Vehicle Removed',
    desc: 'We arrive at the scheduled time and remove the vehicle from your property. The process is designed to be fast and hassle-free.',
  },
]

const VEHICLE_TYPES = [
  { label: 'Junk Cars', href: '/junk-cars/', icon: '🚗' },
  { label: 'Damaged Cars', href: '/damaged-cars/', icon: '💥' },
  { label: 'Wrecked Cars', href: '/wrecked-cars/', icon: '⚠️' },
  { label: 'Non-Running Cars', href: '/non-running-cars/', icon: '🔧' },
  { label: 'Trucks', href: '/trucks/', icon: '🚚' },
  { label: 'SUVs', href: '/suvs/', icon: '🚙' },
  { label: 'Vans', href: '/vans/', icon: '🚐' },
]

const WHY_US = [
  { title: 'Free Quotes', desc: 'No obligation. Request a quote at any time — online, by phone, or on WhatsApp.' },
  { title: 'Any Condition', desc: "Running or not, wrecked, flooded, or missing parts — we evaluate every vehicle individually." },
  { title: 'Illinois-Focused', desc: 'We serve Illinois communities. Local knowledge, local service, local response times.' },
  { title: 'Easy Process', desc: 'Four simple steps: quote, offer, schedule, pickup. Designed to minimize hassle.' },
  { title: 'All Vehicle Types', desc: 'Cars, trucks, SUVs, vans, and more. If it has wheels and once had an engine, we may buy it.' },
  { title: 'Fast Communication', desc: 'We respond quickly to quote requests. Reach us by phone, email, or WhatsApp.' },
]

const HOME_FAQS = faqs.slice(0, 8)

export default function Home() {
  useSEO({
    title: `${BUSINESS_NAME} | Get a Free Quote | Illinois Junk Car Buyers`,
    description:
      'Sell your junk, damaged, wrecked, or non-running car in Illinois. Get a free no-obligation quote. We buy cars, trucks, SUVs, and vans throughout Illinois.',
  })

  const [quoteFormStep, setQuoteFormStep] = useState(0)
  const [currentAct, setCurrentAct] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  // Crossfade background images
  useEffect(() => {
    const id = setInterval(() => setImgIdx((i) => (i + 1) % HERO_IMAGES.length), 6000)
    return () => clearInterval(id)
  }, [])

  // Sync hero acts with scroll
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handler = () => {
      const rect = el.getBoundingClientRect()
      const totalScroll = el.scrollHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / totalScroll)
      const act = Math.min(HERO_ACTS.length - 1, Math.floor(progress * HERO_ACTS.length * 1.1))
      setCurrentAct(act)
      // Sync quote form step (0-indexed = 1-based step)
      setQuoteFormStep(Math.min(3, act))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const act = HERO_ACTS[currentAct]

  return (
    <main>
      {/* ══ MOBILE HERO (< lg) ══════════════════════════════════════════════════ */}
      <section className="lg:hidden relative bg-[#0A0A0A] pt-16 pb-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGES[0]}
            alt="Junk car"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/75 to-[#0A0A0A]/95" />
        </div>

        <div className="relative z-10 px-4 pt-10 pb-4">
          {/* Headline */}
          <p className="font-display text-[10px] font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
            Illinois Junk Car Buyers
          </p>
          <h1 className="font-display font-900 text-4xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-2 whitespace-pre-line">
            {'YOUR JUNK CAR\nSTILL HAS VALUE.'}
          </h1>
          <p className="text-sm text-[#A8A49F] mb-5">
            Free quote — any condition — Illinois.
          </p>

          {/* Call button — shown above the form when phone is configured */}
          {hasPhone() && BUSINESS_PHONE_DISPLAY && (
            <a
              href={telHref()}
              onClick={() => track('phone_clicked')}
              className="btn-amber w-full text-center text-sm py-3 mb-3 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              Call Us — {BUSINESS_PHONE_DISPLAY}
            </a>
          )}

          {/* Quote form card */}
          <div className="bg-[#0F0F0F]/96 border border-white/10 p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-800 text-lg tracking-wide text-[#F0EDE8]">
                  GET YOUR FREE QUOTE
                </h2>
                <p className="text-[11px] text-[#7A7672] tracking-wide">No obligation. Fast response.</p>
              </div>
            </div>
            <QuoteForm compact />
          </div>

          {/* Alternate CTAs */}
          <div className="flex gap-2 mt-4">
            <Link
              to="/get-a-quote/"
              onClick={() => track('cta_clicked')}
              className="flex-1 btn-outline text-sm py-2.5 text-center"
            >
              Full Quote Form
            </Link>
            {hasPhone() && BUSINESS_PHONE_DISPLAY && (
              <a
                href={telHref()}
                onClick={() => track('phone_clicked')}
                className="btn-amber text-sm px-5 py-2.5"
              >
                Call
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ══ DESKTOP HERO (≥ lg) — cinematic scroll ═══════════════════════════════ */}
      <div ref={heroRef} className="hidden lg:block relative" style={{ height: `${HERO_ACTS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Crossfading background images */}
          {HERO_IMAGES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-[2000ms]"
              style={{ opacity: i === imgIdx ? 1 : 0 }}
            >
              <img
                src={src}
                alt="Junk car in industrial setting"
                className="w-full h-full object-cover ken-burns"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/65 to-[#0A0A0A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

          {/* Content — header spacer + vertically centered below it */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* Spacer = fixed header height (80px on lg) */}
            <div className="h-20 flex-shrink-0" />

            {/* Centered zone */}
            <div className="flex-1 flex items-center px-8 xl:px-12">
              <div className="w-full max-w-[840px] mx-auto flex items-center gap-12 xl:gap-16">

                {/* Left: story text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-display text-[11px] font-700 tracking-[0.3em] text-[#F59E0B] uppercase">
                      {act.label}
                    </span>
                    <div className="h-px w-10 bg-[#F59E0B]/40" />
                  </div>
                  <h1
                    key={currentAct}
                    className="font-display font-900 text-5xl xl:text-6xl leading-[0.88] tracking-tight text-[#F0EDE8] mb-5 fade-up whitespace-pre-line"
                  >
                    {act.headline}
                  </h1>
                  <p
                    key={`sub-${currentAct}`}
                    className="text-base text-[#A8A49F] mb-6 fade-up max-w-[320px]"
                    style={{ animationDelay: '100ms' }}
                  >
                    {act.sub}
                  </p>

                  {/* Call button — desktop hero, below the text */}
                  {hasPhone() && BUSINESS_PHONE_DISPLAY && (
                    <a
                      href={telHref()}
                      onClick={() => track('phone_clicked')}
                      className="inline-flex items-center gap-2 btn-amber text-sm px-6 py-3 mb-6"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                      </svg>
                      Call {BUSINESS_PHONE_DISPLAY}
                    </a>
                  )}

                  {currentAct === 0 && (
                    <div className="flex items-center gap-2 text-[#7A7672]">
                      <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll to continue</span>
                    </div>
                  )}
                </div>

                {/* Right: form card — fixed width, scrollable if content overflows viewport */}
                <div className="w-[340px] flex-shrink-0 flex flex-col" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                  <div className="bg-[#0D0D0D]/98 border border-white/12 p-5 shadow-2xl overflow-y-auto flex-1">
                    {/* Card header */}
                    <div className="border-b border-white/8 pb-3 mb-4">
                      <h2 className="font-display font-800 text-base tracking-widest text-[#F0EDE8] uppercase">
                        Get Your Free Quote
                      </h2>
                      <p className="text-[10px] text-[#4A4642] mt-0.5 tracking-wide uppercase">No obligation · Fast response</p>
                    </div>
                    <QuoteForm compact />
                    {/* Footer actions */}
                    <div className="mt-4 pt-3 border-t border-white/8">
                      <Link
                        to="/get-a-quote/"
                        onClick={() => track('cta_clicked')}
                        className="text-[10px] font-semibold tracking-widest uppercase text-[#4A4642] hover:text-[#F59E0B] transition-colors"
                      >
                        Full form →
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
            <div
              className="h-full bg-[#F59E0B] transition-all duration-300"
              style={{ width: `${((currentAct + 1) / HERO_ACTS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-[#F59E0B] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[#0A0A0A]">
            {[
              'Free Quotes, No Obligation',
              'Any Vehicle Condition',
              'Illinois Service Area',
              'Fast Response',
              'Cars · Trucks · SUVs · Vans',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 font-display font-700 text-sm tracking-wide">
                <span className="w-1 h-1 bg-[#0A0A0A]/40 rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── VALUE PROPOSITION ── */}
      <section className="py-20 sm:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-4">
                FROM JUNK TO CASH
              </p>
              <h2 className="font-display font-900 text-5xl sm:text-6xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
                A VEHICLE MAY BE OLD,<br />DAMAGED, OR WRECKED —<br />
                <span className="text-[#F59E0B]">IT MAY STILL HAVE VALUE.</span>
              </h2>
              <p className="text-[#7A7672] leading-relaxed mb-6">
                Junk Car Cash Now LLC buys junk, damaged, wrecked, and non-running vehicles
                throughout Illinois. Whether your car stopped running, was in an accident, suffered flood
                damage, or simply reached the end of its useful life — we can assess its value and
                arrange a pickup.
              </p>
              <p className="text-[#7A7672] leading-relaxed mb-8">
                Getting a quote is free and carries no obligation. Provide your vehicle details and
                location, and we'll be in touch with an offer.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-a-quote/" onClick={() => track('cta_clicked')} className="btn-amber">
                  Get My Free Quote
                </Link>
                <Link to="/how-it-works/" className="btn-outline">
                  How It Works
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden bg-[#131313]">
                <img
                  src="https://images.unsplash.com/photo-1597328290883-50c5787b7c7e?w=800&h=600&fit=crop&auto=format"
                  alt="Damaged car assessed for junk car quote"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Quote overlay */}
              <div className="absolute -bottom-6 -left-6 bg-[#F59E0B] px-6 py-4 max-w-[200px]">
                <p className="font-display font-900 text-3xl text-[#0A0A0A] leading-none">ANY CONDITION</p>
                <p className="text-xs text-[#3D3200] mt-1 font-medium">We buy it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
              Simple Process
            </p>
            <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8]">
              HOW IT WORKS
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {HOW_STEPS.map((step, i) => (
              <div key={step.num} className="relative p-8 border border-white/6 group hover:border-[#F59E0B]/30 transition-all">
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-px w-px h-1/2 -translate-y-1/2 bg-[#F59E0B]/20" />
                )}
                <span className="font-display font-900 text-5xl text-white/6 group-hover:text-[#F59E0B]/15 transition-colors leading-none block mb-4">
                  {step.num}
                </span>
                <h3 className="font-display font-700 text-lg tracking-wide text-[#F0EDE8] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#7A7672] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/how-it-works/" className="btn-outline">
              Learn More About the Process
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUY ── */}
      <section className="py-20 sm:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
                Vehicle Types
              </p>
              <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8]">
                WHAT WE BUY
              </h2>
            </div>
            <Link to="/what-we-buy/" className="text-sm text-[#F59E0B] font-semibold hover:text-[#FCD34D] transition-colors">
              View all vehicle types →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
            {VEHICLE_TYPES.map((vt) => (
              <Link
                key={vt.href}
                to={vt.href}
                onClick={() => track('cta_clicked')}
                className="group bg-[#0A0A0A] p-8 hover:bg-[#131313] transition-all flex flex-col gap-4"
              >
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#F59E0B]/30 transition-all text-2xl">
                  {vt.icon}
                </div>
                <span className="font-display font-700 text-base tracking-wide text-[#A8A49F] group-hover:text-[#F0EDE8] transition-colors">
                  {vt.label}
                </span>
                <span className="text-xs text-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span>
              </Link>
            ))}
            {/* "Other" slot */}
            <Link
              to="/what-we-buy/"
              className="group bg-[#0A0A0A] p-8 hover:bg-[#131313] transition-all flex flex-col gap-4 col-span-2 sm:col-span-1"
            >
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#F59E0B]/30 transition-all text-2xl">
                +
              </div>
              <span className="font-display font-700 text-base tracking-wide text-[#A8A49F] group-hover:text-[#F0EDE8] transition-colors">
                More Vehicles
              </span>
              <span className="text-xs text-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity">
                View all →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── VEHICLE CONDITIONS ── */}
      <section
        className="py-20 sm:py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1687867456549-609df6390375?w=1920&h=800&fit=crop&auto=format)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
              No Condition Disqualifies
            </p>
            <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8] mb-4">
              WE BUY CARS IN ANY CONDITION
            </h2>
            <p className="text-[#7A7672] max-w-xl mx-auto">
              Every vehicle is assessed individually. Condition affects the offer — it doesn't eliminate the possibility of one.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/6">
            {[
              { label: 'Runs & Drives', href: '/sell-my-junk-car/' },
              { label: 'Has Issues', href: '/non-running-cars/' },
              { label: "Doesn't Run", href: '/non-running-cars/' },
              { label: 'Wrecked', href: '/wrecked-cars/' },
              { label: 'Flood Damaged', href: '/damaged-cars/' },
              { label: 'Missing Parts', href: '/damaged-cars/' },
            ].map((c) => (
              <Link
                key={c.label}
                to={c.href}
                className="bg-[#0A0A0A]/80 p-6 text-center hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/30 transition-all group"
              >
                <span className="block font-display font-700 text-sm tracking-wide text-[#A8A49F] group-hover:text-[#F59E0B] transition-colors">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELL YOUR JUNK CAR ── */}
      <section className="py-20 sm:py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden bg-[#131313]">
                <img
                  src="https://images.unsplash.com/photo-1670931814837-72bdaa5e612a?w=800&h=600&fit=crop&auto=format"
                  alt="Car being picked up on a flatbed tow truck in Illinois"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-6 -right-6 hidden lg:block">
                <div className="bg-[#131313] border border-white/8 p-5 w-40">
                  <p className="font-display font-900 text-lg text-[#F0EDE8]">ILLINOIS</p>
                  <p className="font-display font-700 text-xs text-[#F59E0B] tracking-widest mt-1">SERVICE AREA</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-4">
                The Last Ride
              </p>
              <h2 className="font-display font-900 text-4xl sm:text-5xl leading-[0.92] tracking-tight text-[#F0EDE8] mb-6">
                SELL YOUR JUNK CAR IN ILLINOIS
              </h2>
              <p className="text-[#7A7672] leading-relaxed mb-4">
                Whether your vehicle is sitting in a driveway, an alley, a parking lot, or a garage — if
                it's in Illinois and you're ready to sell, we want to hear from you.
              </p>
              <p className="text-[#7A7672] leading-relaxed mb-8">
                We buy junk cars, damaged cars, wrecked cars, flood-damaged cars, non-running vehicles,
                trucks, SUVs, and vans. The quote process is free, fast, and carries no obligation.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Free quote — no obligation',
                  'Any condition, any vehicle type',
                  'Flatbed towing available for non-running vehicles',
                  'Illinois service area',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#A8A49F]">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/sell-my-junk-car/" className="btn-amber">
                Sell My Junk Car
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-20 sm:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
                Illinois Coverage
              </p>
              <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8]">
                SERVICE AREAS
              </h2>
            </div>
            <Link to="/service-areas/" className="text-sm text-[#F59E0B] font-semibold hover:text-[#FCD34D] transition-colors">
              View all service areas →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                to={`/service-areas/${area.slug}/`}
                onClick={() => track('service_area_clicked')}
                className="group bg-[#0A0A0A] p-6 hover:bg-[#131313] transition-all"
              >
                <p className="font-display font-800 text-lg tracking-wide text-[#F0EDE8] group-hover:text-[#F59E0B] transition-colors">
                  {area.city}
                </p>
                <p className="text-xs text-[#7A7672] mt-1 font-semibold tracking-wider uppercase">
                  {area.state} · {area.county}
                </p>
                <p className="text-xs text-[#F59E0B] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Get a quote →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 sm:py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
              Why Us
            </p>
            <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8]">
              WHY CHOOSE CASH FOR JUNK CARS ILLINOIS
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {WHY_US.map((item) => (
              <div key={item.title} className="bg-[#0D0D0D] p-8 hover:bg-[#131313] transition-all group">
                <div className="divider" />
                <h3 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3 group-hover:text-[#F59E0B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#7A7672] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 sm:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
              Customer Reviews
            </p>
            <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8] mb-4">
              WHAT CUSTOMERS SAY
            </h2>
          </div>
          <div className="border border-white/8 p-10 text-center max-w-xl mx-auto">
            <p className="text-[#7A7672] mb-6">
              Customer reviews will be displayed here. We're committed to real reviews from real customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="btn-amber text-sm"
                onClick={(e) => e.preventDefault()}
              >
                Leave a Google Review
              </a>
              <a
                href="#"
                className="btn-outline text-sm"
                onClick={(e) => e.preventDefault()}
              >
                Read Our Google Reviews
              </a>
            </div>
            <p className="text-xs text-[#4A4642] mt-4">
              Google review links will be added once the business profile is verified.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-3">
              Common Questions
            </p>
            <h2 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <FAQAccordion items={HOME_FAQS} />
          <div className="text-center mt-10">
            <Link to="/faq/" className="btn-outline">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <CTASection />
    </main>
  )
}
