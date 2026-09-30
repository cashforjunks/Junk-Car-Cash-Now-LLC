import Breadcrumb from '@/components/Breadcrumb'
import QuoteForm from '@/components/QuoteForm'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import { hasPhone, hasWhatsApp, telHref, whatsappHref, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL } from '@/config/business'

export default function GetAQuote() {
  useSEO({
    title: 'Get a Free Junk Car Quote in Illinois | Junk Car Cash Now LLC',
    description:
      'Request a free junk car quote in Illinois. Fill out our quick form with your vehicle details and Illinois location. No obligation. Junk Car Cash Now LLC.',
  })

  return (
    <main>
      <section className="pt-32 pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Get a Quote' }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
                GET YOUR<br />
                <span className="text-[#F59E0B]">FREE QUOTE</span>
              </h1>
              <p className="text-xl text-[#7A7672] leading-relaxed mb-8">
                Fill out our quick form to request a free, no-obligation quote for your junk car in Illinois.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { n: '01', t: 'Your Vehicle Info', d: 'Year, make, model, type.' },
                  { n: '02', t: 'Vehicle Condition', d: 'Running, wrecked, non-running, damaged.' },
                  { n: '03', t: 'Your Location', d: 'Illinois ZIP code or city.' },
                  { n: '04', t: 'Contact Info', d: 'Name, phone, email.' },
                ].map((s) => (
                  <div key={s.n} className="flex gap-5 items-start">
                    <div className="w-10 h-10 border border-[#F59E0B]/30 bg-[#F59E0B]/5 flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-900 text-sm text-[#F59E0B]">{s.n}</span>
                    </div>
                    <div className="pt-1.5">
                      <p className="font-display font-700 text-base tracking-wide text-[#F0EDE8]">{s.t}</p>
                      <p className="text-sm text-[#7A7672] mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-8">
                <p className="text-sm text-[#7A7672] mb-4">Prefer to reach us directly?</p>
                <div className="flex flex-wrap gap-3">
                  {hasPhone() && BUSINESS_PHONE_DISPLAY && (
                    <a
                      href={telHref()}
                      onClick={() => track('phone_clicked')}
                      className="btn-amber text-sm"
                    >
                      Call {BUSINESS_PHONE_DISPLAY}
                    </a>
                  )}
                  {hasWhatsApp() && (
                    <a
                      href={whatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('whatsapp_clicked')}
                      className="btn-outline text-sm"
                    >
                      WhatsApp
                    </a>
                  )}
                  {!hasPhone() && !hasWhatsApp() && (
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="btn-outline text-sm"
                    >
                      Email Us
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/10 p-8 lg:sticky lg:top-24">
              <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-2">
                QUOTE REQUEST FORM
              </h2>
              <p className="text-xs text-[#7A7672] mb-6">No obligation. Fast response.</p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
