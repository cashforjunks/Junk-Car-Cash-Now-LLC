import { Link } from 'react-router-dom'
import { track } from '@/lib/analytics'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL } from '@/config/business'

interface CTASectionProps {
  title?: string
  subtitle?: string
}

export default function CTASection({
  title = 'YOUR JUNK CAR STILL HAS VALUE.',
  subtitle = 'Get a free quote in minutes. No obligation.',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F59E0B] py-16 sm:py-20">
      {/* Subtle crosshatch texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display font-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A0A0A] mb-4">
          {title}
        </h2>
        <p className="text-[#3D3200] text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/get-a-quote/"
            onClick={() => track('cta_clicked')}
            className="inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-[#F0EDE8] font-display font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#1A1A1A] transition-colors"
          >
            Get My Free Quote
          </Link>
          {hasPhone() && BUSINESS_PHONE_DISPLAY ? (
            <a
              href={telHref()}
              onClick={() => track('phone_clicked')}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#0A0A0A] text-[#0A0A0A] font-display font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#0A0A0A]/10 transition-colors"
            >
              Call {BUSINESS_PHONE_DISPLAY}
            </a>
          ) : (
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#0A0A0A] text-[#0A0A0A] font-display font-700 text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#0A0A0A]/10 transition-colors"
            >
              Email Us
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
