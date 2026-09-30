import { Link, useLocation } from 'react-router-dom'
import { track } from '@/lib/analytics'
import { hasPhone, telHref } from '@/config/business'

interface MobileBottomNavProps {
  onQuoteOpen: () => void
}

export default function MobileBottomNav({ onQuoteOpen }: MobileBottomNavProps) {
  const location = useLocation()

  function handleQuote() {
    onQuoteOpen()
    track('quote_started')
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0F0F0F]/95 backdrop-blur-sm border-t border-white/8 pb-safe"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-stretch h-16">
        <Link
          to="/"
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-widest uppercase transition-colors ${
            location.pathname === '/' ? 'text-[#F59E0B]' : 'text-[#7A7672]'
          }`}
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          <HomeIcon />
          Home
        </Link>

        <button
          onClick={handleQuote}
          className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#F59E0B] text-[#0A0A0A] text-[10px] font-bold tracking-widest uppercase active:bg-[#D97706] transition-colors"
          aria-label="Get a free quote"
        >
          <QuoteIcon />
          Quote
        </button>

        <Link
          to="/service-areas/"
          onClick={() => track('service_area_clicked')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-widest uppercase transition-colors ${
            location.pathname.startsWith('/service-areas') ? 'text-[#F59E0B]' : 'text-[#7A7672]'
          }`}
          aria-current={location.pathname.startsWith('/service-areas') ? 'page' : undefined}
        >
          <MapIcon />
          Areas
        </Link>

        {hasPhone() ? (
          <a
            href={telHref()}
            onClick={() => track('phone_clicked')}
            className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-[#7A7672] active:text-[#F59E0B] transition-colors"
            aria-label="Call us"
          >
            <PhoneIcon />
            Call
          </a>
        ) : (
          <Link
            to="/contact/"
            className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-widest uppercase transition-colors ${
              location.pathname === '/contact/' ? 'text-[#F59E0B]' : 'text-[#7A7672]'
            }`}
          >
            <MailIcon />
            Contact
          </Link>
        )}
      </div>
    </nav>
  )
}

function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function QuoteIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
