import { Link } from 'react-router-dom'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import {
  BUSINESS_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  hasPhone,
  hasWhatsApp,
  telHref,
  whatsappHref,
} from '@/config/business'

export default function About() {
  useSEO({
    title: `About Us | ${BUSINESS_NAME} | Illinois Junk Car Buyers`,
    description: `${BUSINESS_NAME} buys junk, damaged, wrecked, and non-running vehicles throughout Illinois. Learn about our service and how we help Illinois residents sell their junk cars.`,
  })

  return (
    <main>
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-4">
                Who We Are
              </p>
              <h1 className="font-display font-900 text-5xl sm:text-6xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
                CASH FOR JUNK CARS<br />
                <span className="text-[#F59E0B]">ILLINOIS</span>
              </h1>
              <p className="text-[#7A7672] leading-relaxed mb-5">
                {BUSINESS_NAME} is a junk car buying service operating throughout Illinois. We buy junk, damaged, wrecked, flood-damaged, and non-running vehicles of all types — cars, trucks, SUVs, vans, and more.
              </p>
              <p className="text-[#7A7672] leading-relaxed mb-5">
                Our core belief is simple: a vehicle may be old, damaged, wrecked, or non-running — but it may still have value. We help Illinois residents get a quote for vehicles that many people assume are worthless.
              </p>
              <p className="text-[#7A7672] leading-relaxed mb-8">
                Getting a quote from us is free and carries no obligation. We assess every vehicle individually and respond with an offer. The decision to sell is always yours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-a-quote/" onClick={() => track('cta_clicked')} className="btn-amber">
                  Get My Free Quote
                </Link>
                <Link to="/how-it-works/" className="btn-outline">How It Works</Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Free Quotes, No Obligation', desc: 'Requesting a quote costs nothing and commits you to nothing. We assess your vehicle and make an offer — the rest is up to you.' },
                { title: 'Any Vehicle, Any Condition', desc: "We buy cars, trucks, SUVs, and vans in any condition — running or non-running, damaged or wrecked, old or recently failed." },
                { title: 'Illinois Service Area', desc: 'We serve multiple Illinois communities, with a focus on the Chicago metropolitan area and surrounding regions.' },
                { title: 'Clear Communication', desc: "We communicate clearly. We don't make misleading claims about prices, response times, or the process." },
              ].map((item) => (
                <div key={item.title} className="border border-white/8 p-6 hover:border-white/15 transition-all">
                  <h3 className="font-display font-700 text-lg tracking-wide text-[#F0EDE8] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#7A7672] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact block */}
      <section className="py-16 bg-[#0D0D0D] border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 ${hasPhone() || hasWhatsApp() ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 text-center`}>
            {hasPhone() && BUSINESS_PHONE_DISPLAY && (
              <div>
                <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-2">Phone</p>
                <a href={telHref()} onClick={() => track('phone_clicked')} className="font-display font-800 text-2xl text-[#F0EDE8] hover:text-[#F59E0B] transition-colors">
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </div>
            )}
            {hasWhatsApp() && BUSINESS_PHONE_DISPLAY && (
              <div>
                <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-2">WhatsApp</p>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_clicked')} className="font-display font-800 text-2xl text-[#F0EDE8] hover:text-[#F59E0B] transition-colors">
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </div>
            )}
            <div>
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-2">Email</p>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="font-display font-800 text-xl text-[#F0EDE8] hover:text-[#F59E0B] transition-colors break-all">
                {BUSINESS_EMAIL}
              </a>
            </div>
            <div>
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase mb-2">Free Quote</p>
              <Link to="/get-a-quote/" onClick={() => track('cta_clicked')} className="font-display font-800 text-xl text-[#F0EDE8] hover:text-[#F59E0B] transition-colors">
                Online Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
