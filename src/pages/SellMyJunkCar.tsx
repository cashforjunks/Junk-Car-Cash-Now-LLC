import { Link } from 'react-router-dom'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'
import QuoteForm from '@/components/QuoteForm'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'

const FAQS = [
  {
    question: 'How do I sell my junk car in Illinois?',
    answer:
      'Request a free quote using our online form or by calling Provide your vehicle\'s year, make, model, condition, and Illinois ZIP code. We\'ll review the information and contact you with an offer. If you accept, we schedule a pickup at your convenience.',
  },
  {
    question: 'What does "junk car" mean?',
    answer:
      "A junk car is typically a vehicle that is no longer practical or economical to repair or operate. This can include old cars with high mileage, vehicles with extensive mechanical issues, accident-damaged vehicles, flood or fire-damaged cars, and vehicles that no longer run.",
  },
  {
    question: 'Do you buy junk cars that run?',
    answer:
      "Yes. A vehicle doesn't need to be non-running to be considered a junk car. If it runs but has significant issues, high mileage, or you simply want to sell it quickly, we can still provide a quote.",
  },
  {
    question: 'What paperwork do I need?',
    answer:
      "Document requirements depend on Illinois law and your specific circumstances. Having a vehicle title is generally helpful. Contact us with your specific situation and we'll discuss what may be needed. We recommend consulting the Illinois Secretary of State's office for official guidance on vehicle title requirements.",
  },
  {
    question: 'How long does the process take?',
    answer:
      'The quote process is quick. Once you submit your information, we review it and respond. If you accept an offer, we work to schedule pickup within a few business days in most Illinois areas.',
  },
]

export default function SellMyJunkCar() {
  useSEO({
    title: 'Sell My Junk Car in Illinois | Free Quote | Junk Car Cash Now LLC',
    description:
      'Ready to sell your junk car in Illinois? Get a free no-obligation quote from Junk Car Cash Now LLC. We buy junk cars in any condition.',
  })

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1687867456549-609df6390375?w=1920&h=1080&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Sell My Junk Car' }]} />
          <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mt-4 mb-4">
            SELL YOUR JUNK CAR<br />
            <span className="text-[#F59E0B]">IN ILLINOIS</span>
          </h1>
          <p className="text-lg text-[#A8A49F] max-w-lg mb-8">
            Junk Car Cash Now LLC buys junk cars throughout Illinois. Get a free no-obligation quote today.
          </p>
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
              <h2 className="font-display font-800 text-3xl sm:text-4xl tracking-wide text-[#F0EDE8] mb-6">
                HOW TO SELL YOUR JUNK CAR
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Request Your Free Quote',
                    desc: "Fill out our quote form with your vehicle's year, make, model, condition, and your Illinois location. Or call us directly at",
                  },
                  {
                    step: '02',
                    title: 'Receive an Offer',
                    desc: "We review your vehicle details and contact you with an offer. No two vehicles are exactly alike — we assess each one individually.",
                  },
                  {
                    step: '03',
                    title: 'Schedule Pickup',
                    desc: "If you accept the offer, we schedule a pickup at your location at a time that's convenient for you.",
                  },
                  {
                    step: '04',
                    title: 'Vehicle Removed',
                    desc: 'We arrive and remove the vehicle. Non-running vehicles can be picked up by flatbed tow truck.',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-6">
                    <span className="font-display font-900 text-4xl text-white/10 leading-none flex-shrink-0 w-10">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="font-display font-700 text-lg tracking-wide text-[#F0EDE8] mb-1">{s.title}</h3>
                      <p className="text-sm text-[#7A7672] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-4">
                  WHAT VEHICLES QUALIFY?
                </h2>
                <p className="text-[#7A7672] leading-relaxed mb-4">
                  We buy all types of junk cars in Illinois — running or not, old or recently damaged. Vehicle types we buy include:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Cars', 'Trucks', 'SUVs', 'Vans', 'Minivans', 'Motorcycles'].map((v) => (
                    <div key={v} className="flex items-center gap-2 text-sm text-[#A8A49F]">
                      <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full flex-shrink-0" />
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-4">
                  CONDITIONS WE ACCEPT
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {['Runs & Drives', 'Has Issues', "Doesn't Run", 'Wrecked', 'Flood Damaged', 'Fire Damaged', 'Missing Parts', 'Unknown'].map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-[#A8A49F]">
                      <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full flex-shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote form */}
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
              { label: 'Damaged Cars', href: '/damaged-cars/' },
              { label: 'Wrecked Cars', href: '/wrecked-cars/' },
              { label: 'Non-Running Cars', href: '/non-running-cars/' },
              { label: 'How It Works', href: '/how-it-works/' },
              { label: 'Service Areas', href: '/service-areas/' },
            ].map((l) => (
              <Link key={l.href} to={l.href} className="text-sm text-[#7A7672] border border-white/10 px-4 py-2 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-900 text-3xl sm:text-4xl tracking-tight text-[#F0EDE8] mb-10">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <CTASection title="READY TO SELL YOUR JUNK CAR?" subtitle="Get a free quote today — no obligation, fast response." />
    </main>
  )
}
