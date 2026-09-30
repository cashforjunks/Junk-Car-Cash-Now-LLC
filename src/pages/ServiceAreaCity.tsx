import { useParams, Link } from 'react-router-dom'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import { getServiceArea, serviceAreas } from '@/data/serviceAreas'
import QuoteForm from '@/components/QuoteForm'
import FAQAccordion from '@/components/FAQAccordion'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import NotFound from './NotFound'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'

export default function ServiceAreaCity() {
  const { slug } = useParams<{ slug: string }>()
  const area = slug ? getServiceArea(slug) : undefined

  useSEO({
    title: area
      ? `Sell Your Junk Car in ${area.city}, IL | Free Quote | Junk Car Cash Now LLC`
      : 'Service Area | Junk Car Cash Now LLC',
    description: area
      ? `Sell your junk car in ${area.city}, Illinois. Free no-obligation quote. We buy junk, damaged, and non-running vehicles in ${area.city}, ${area.state}.`
      : '',
  })

  if (!area) return <NotFound />

  // Nearby areas (exclude current)
  const nearby = serviceAreas.filter((a) => a.slug !== area.slug).slice(0, 4)

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1687867455489-bc2ad036b45a?w=1920&h=1080&fit=crop&auto=format)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Breadcrumb
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Service Areas', href: '/service-areas/' },
              { label: `${area.city}, ${area.state}` },
            ]}
          />
          <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mt-4 mb-4">
            CASH FOR JUNK CARS<br />
            <span className="text-[#F59E0B]">IN {area.city.toUpperCase()}, IL</span>
          </h1>
          <p className="text-lg text-[#A8A49F] max-w-lg mb-8">{area.intro}</p>
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

      {/* Local intro + form */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-800 text-3xl sm:text-4xl tracking-wide text-[#F0EDE8] mb-6">
                JUNK CAR BUYERS IN {area.city.toUpperCase()}, ILLINOIS
              </h2>
              <p className="text-[#7A7672] leading-relaxed mb-5">{area.description}</p>
              <p className="text-[#7A7672] leading-relaxed mb-8">{area.localContext}</p>

              <h3 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-4">
                VEHICLES WE BUY IN {area.city.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {area.vehicles.map((v) => (
                  <div key={v} className="flex items-center gap-2 text-sm text-[#A8A49F]">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full flex-shrink-0" />
                    {v}
                  </div>
                ))}
              </div>

              <h3 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-4">
                HOW IT WORKS IN {area.city.toUpperCase()}
              </h3>
              <div className="space-y-4">
                {[
                  { n: '01', t: 'Request a Free Quote', d: `Fill out our online form with your vehicle details and your ${area.city} location.` },
                  { n: '02', t: 'Receive an Offer', d: 'We review your submission and contact you with an offer.' },
                  { n: '03', t: 'Schedule Pickup', d: `We arrange a convenient pickup time in the ${area.city} area.` },
                  { n: '04', t: 'Vehicle Removed', d: 'We remove the vehicle — non-running vehicles via flatbed tow truck.' },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <span className="font-display font-900 text-2xl text-white/10 leading-none w-8 flex-shrink-0">{s.n}</span>
                    <div>
                      <p className="font-semibold text-[#F0EDE8] text-sm">{s.t}</p>
                      <p className="text-xs text-[#7A7672] mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[#111111] border border-white/10 p-8 sticky top-24">
                <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-1">
                  GET A FREE QUOTE
                </h2>
                <p className="text-sm text-[#7A7672] mb-6">
                  For your vehicle in {area.city}, IL
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {area.faqs.length > 0 && (
        <section className="py-20 bg-[#0D0D0D]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-900 text-3xl sm:text-4xl tracking-tight text-[#F0EDE8] mb-10">
              {area.city.toUpperCase()} — COMMON QUESTIONS
            </h2>
            <FAQAccordion items={area.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
          </div>
        </section>
      )}

      {/* Nearby areas */}
      <section className="py-16 bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-6">
            OTHER ILLINOIS SERVICE AREAS
          </h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map((a) => (
              <Link
                key={a.slug}
                to={`/service-areas/${a.slug}/`}
                onClick={() => track('service_area_clicked')}
                className="text-sm text-[#7A7672] border border-white/10 px-4 py-2 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all"
              >
                {a.city}, {a.state}
              </Link>
            ))}
            <Link
              to="/service-areas/"
              className="text-sm text-[#F59E0B] border border-[#F59E0B]/30 px-4 py-2 hover:bg-[#F59E0B]/10 transition-all"
            >
              View all areas →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`READY TO SELL IN ${area.city.toUpperCase()}?`}
        subtitle={`Get a free junk car quote for your ${area.city}, IL vehicle.`}
      />
    </main>
  )
}
