import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'
import {
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY,
  hasPhone,
  telHref,
} from '@/config/business'

export default function Contact() {
  useSEO({
    title: `Contact Us | ${BUSINESS_NAME} | Illinois Junk Car Buyers`,
    description: `Contact ${BUSINESS_NAME}. Get a free quote online or call us. Illinois junk car buyers — fast response, no obligation.`,
  })

  return (
    <main>
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
              CONTACT US
            </h1>
            <p className="text-xl text-[#7A7672]">
              Ready to get your free quote? Start online or give us a call — we respond fast.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 ${hasPhone() ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-md'} gap-px bg-white/5 mb-14`}>
            {/* Get My Free Quote */}
            <div className="bg-[#0A0A0A] p-10 flex flex-col gap-4">
              <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase">Online Quote</p>
              <p className="font-display font-800 text-2xl text-[#F0EDE8]">Get My Free Quote</p>
              <p className="text-sm text-[#7A7672]">Fill in your vehicle details and we'll review your request and get back to you fast.</p>
              <Link
                to="/get-a-quote/"
                onClick={() => track('cta_clicked')}
                className="btn-amber mt-auto self-start"
              >
                Get My Free Quote
              </Link>
            </div>

            {/* Call Us — only shown when phone is configured */}
            {hasPhone() && BUSINESS_PHONE_DISPLAY && (
              <div className="bg-[#0A0A0A] p-10 flex flex-col gap-4">
                <p className="font-display text-xs font-700 tracking-[0.3em] text-[#F59E0B] uppercase">Phone</p>
                <p className="font-display font-800 text-2xl text-[#F0EDE8]">{BUSINESS_PHONE_DISPLAY}</p>
                <p className="text-sm text-[#7A7672]">Call us directly for a quick quote over the phone.</p>
                <a
                  href={telHref()}
                  onClick={() => track('phone_clicked')}
                  className="btn-amber mt-auto self-start"
                >
                  Call Us Now
                </a>
              </div>
            )}
          </div>

          {/* Business info (no email shown) */}
          <div className="max-w-xl">
            <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-4">BUSINESS INFORMATION</h2>
            <div className="space-y-3 text-sm text-[#7A7672]">
              <div className="flex gap-3">
                <span className="text-[#F59E0B] font-semibold min-w-[80px]">Business:</span>
                <span>{BUSINESS_NAME}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#F59E0B] font-semibold min-w-[80px]">Service:</span>
                <span>Junk Car Buying — Illinois</span>
              </div>
              {hasPhone() && BUSINESS_PHONE_DISPLAY && (
                <div className="flex gap-3">
                  <span className="text-[#F59E0B] font-semibold min-w-[80px]">Phone:</span>
                  <a href={telHref()} className="hover:text-[#F0EDE8] transition-colors">{BUSINESS_PHONE_DISPLAY}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
