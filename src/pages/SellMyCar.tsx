import { Link } from 'react-router-dom'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'
import QuoteForm from '@/components/QuoteForm'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'

export default function SellMyCar() {
  useSEO({
    title: 'Sell My Car in Illinois | Cash Offer | Junk Car Cash Now LLC',
    description:
      'Looking to sell your car in Illinois? Junk Car Cash Now LLC provides free quotes for all types of vehicles — running or not, any condition.',
  })

  return (
    <main>
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Sell My Car' }]} />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="font-display font-900 text-5xl sm:text-6xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
                SELL YOUR CAR<br />
                <span className="text-[#F59E0B]">IN ILLINOIS</span>
              </h1>
              <p className="text-lg text-[#7A7672] mb-6">
                Junk Car Cash Now LLC buys cars in any condition throughout Illinois. Whether your vehicle runs or not, has been in an accident, or simply isn't worth repairing — we can provide a free, no-obligation quote.
              </p>
              <p className="text-[#7A7672] mb-8">
                We buy all vehicle types: cars, trucks, SUVs, vans, and minivans. Any make, any model, any year. Old and new alike are considered.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { title: 'Any Condition', desc: 'Running, non-running, damaged, wrecked.' },
                  { title: 'All Vehicle Types', desc: 'Cars, trucks, SUVs, vans.' },
                  { title: 'Free Quotes', desc: 'No obligation. No cost.' },
                  { title: 'Illinois Coverage', desc: 'Multiple Illinois communities.' },
                ].map((item) => (
                  <div key={item.title} className="border border-white/8 p-5">
                    <h3 className="font-display font-700 text-base tracking-wide text-[#F59E0B] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#7A7672]">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {hasPhone() && BUSINESS_PHONE_DISPLAY ? (
                  <a href={telHref()} onClick={() => track('phone_clicked')} className="btn-amber">
                    Call {BUSINESS_PHONE_DISPLAY}
                  </a>
                ) : (
                  <Link to="/get-a-quote/" className="btn-amber">
                    Get My Free Quote
                  </Link>
                )}
                <Link to="/how-it-works/" className="btn-outline">How It Works</Link>
              </div>
            </div>
            <div className="bg-[#111111] border border-white/10 p-8">
              <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-2">
                GET YOUR FREE QUOTE
              </h2>
              <p className="text-xs text-[#7A7672] mb-6">No obligation. Fast response.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
