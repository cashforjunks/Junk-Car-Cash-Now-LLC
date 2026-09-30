import { Link } from 'react-router-dom'
import QuoteForm from '@/components/QuoteForm'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'

interface VehicleTypeConfig {
  title: string
  seoTitle: string
  seoDesc: string
  h1: string
  intro: string
  description: string[]
  conditions: string[]
  benefits: string[]
  faqs: { question: string; answer: string }[]
  image: string
  imageAlt: string
  breadcrumbLabel: string
}

export default function VehicleTypePage({
  title,
  seoTitle,
  seoDesc,
  h1,
  intro,
  description,
  conditions,
  benefits,
  faqs,
  image,
  imageAlt,
  breadcrumbLabel,
}: VehicleTypeConfig) {
  useSEO({ title: seoTitle, description: seoDesc })

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pt-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Breadcrumb
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'What We Buy', href: '/what-we-buy/' },
              { label: breadcrumbLabel },
            ]}
          />
          <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mt-4 mb-4">
            {h1}
          </h1>
          <p className="text-lg text-[#A8A49F] max-w-lg mb-8">{intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/get-a-quote/" onClick={() => track('cta_clicked')} className="btn-amber">
              Get My Free Quote
            </Link>
            {hasPhone() && BUSINESS_PHONE_DISPLAY && (
              <a href={telHref()} onClick={() => track('phone_clicked')} className="btn-outline">
                Call {BUSINESS_PHONE_DISPLAY}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              {description.map((para, i) => (
                <p key={i} className="text-[#7A7672] leading-relaxed mb-5">
                  {para}
                </p>
              ))}

              <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mt-10 mb-4">
                CONDITIONS WE ACCEPT
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {conditions.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-sm text-[#A8A49F]">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full flex-shrink-0" />
                    {c}
                  </div>
                ))}
              </div>

              <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mt-10 mb-4">
                WHY SELL TO US
              </h2>
              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#A8A49F]">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[#111111] border border-white/10 p-8 sticky top-24">
                <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-2">
                  GET YOUR FREE QUOTE
                </h2>
                <p className="text-xs text-[#7A7672] mb-6">No obligation. Fast response.</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 bg-[#0D0D0D] border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-6">RELATED SERVICES</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Vehicle Types', href: '/what-we-buy/' },
              { label: 'How It Works', href: '/how-it-works/' },
              { label: 'Service Areas', href: '/service-areas/' },
              { label: 'Sell My Junk Car', href: '/sell-my-junk-car/' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-[#7A7672] border border-white/10 px-4 py-2 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-900 text-3xl sm:text-4xl tracking-tight text-[#F0EDE8] mb-10">
              {title.toUpperCase()} — COMMON QUESTIONS
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </section>
      )}

      <CTASection title={`READY TO SELL YOUR ${title.toUpperCase()}?`} subtitle="Get a free quote — no obligation, fast response." />
    </main>
  )
}
