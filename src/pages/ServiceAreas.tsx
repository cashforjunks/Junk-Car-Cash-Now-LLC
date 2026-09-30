import { Link } from 'react-router-dom'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import { serviceAreas } from '@/data/serviceAreas'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'

export default function ServiceAreas() {
  useSEO({
    title: 'Illinois Service Areas | Junk Car Cash Now LLC | Free Quote',
    description:
      'Junk Car Cash Now LLC serves Chicago, Aurora, Joliet, Naperville, Elgin, Schaumburg, Rockford, Evanston, and surrounding Illinois communities. Get a free quote.',
  })

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Service Areas' }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
              ILLINOIS<br />
              <span className="text-[#F59E0B]">SERVICE AREAS</span>
            </h1>
            <p className="text-xl text-[#7A7672] leading-relaxed mb-8">
              Junk Car Cash Now LLC serves multiple communities across Illinois. Select your city to see local service information.
            </p>
          </div>
        </div>
      </section>

      {/* Area grid */}
      <section className="pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                to={`/service-areas/${area.slug}/`}
                onClick={() => track('service_area_clicked')}
                className="group bg-[#0A0A0A] p-8 hover:bg-[#111111] transition-all"
              >
                <p className="font-display font-900 text-2xl tracking-wide text-[#F0EDE8] group-hover:text-[#F59E0B] transition-colors mb-1">
                  {area.city}
                </p>
                <p className="text-xs text-[#7A7672] font-semibold tracking-wider uppercase mb-3">
                  {area.state} · {area.county}
                </p>
                <p className="text-sm text-[#4A4642] leading-snug mb-4 line-clamp-2">{area.intro}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {area.vehicles.slice(0, 3).map((v) => (
                    <span key={v} className="text-[10px] px-2 py-0.5 border border-white/10 text-[#7A7672] tracking-wider">
                      {v}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#F59E0B] font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  View service area →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-[#111111] border border-white/8 p-8">
            <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-3">
              DON'T SEE YOUR CITY?
            </h2>
            <p className="text-[#7A7672] mb-6 max-w-2xl">
              Our service area may include communities not listed above, or may be expanding. Contact us to ask about service availability in your specific Illinois location.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/" className="btn-amber">Contact Us</Link>
              {hasPhone() && BUSINESS_PHONE_DISPLAY && (
                <a href={telHref()} onClick={() => track('phone_clicked')} className="btn-outline">
                  Call {BUSINESS_PHONE_DISPLAY}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection title="SERVE YOUR AREA. READY TO SELL?" subtitle="Get a free junk car quote for your Illinois location." />
    </main>
  )
}
