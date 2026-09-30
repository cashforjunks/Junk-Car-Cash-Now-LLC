import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { track } from '@/lib/analytics'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL } from '@/config/business'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  nav: NavItem[]
}

export default function MobileMenu({ open, onClose, nav }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setExpanded(null)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-[#0F0F0F] border-l border-white/8 flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <Logo className="h-8 w-auto" />
          <button
            onClick={onClose}
            className="p-2 text-[#7A7672] hover:text-[#F0EDE8] transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          {nav.map((item, i) => (
            <div
              key={item.href}
              style={{ animationDelay: `${i * 40}ms` }}
              className={open ? 'fade-up' : ''}
            >
              {item.children ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-base font-semibold text-[#A8A49F] hover:text-[#F0EDE8] hover:bg-white/3 transition-all tracking-wide"
                    onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                    aria-expanded={expanded === item.href}
                  >
                    {item.label}
                    <ChevronIcon expanded={expanded === item.href} />
                  </button>
                  {expanded === item.href && (
                    <div className="bg-white/3 border-t border-b border-white/5">
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="block pl-6 pr-6 py-3 text-sm text-[#F59E0B] hover:text-[#FCD34D] transition-all font-semibold"
                      >
                        View all →
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => { onClose(); track('service_page_clicked') }}
                          className="block pl-10 pr-6 py-3 text-sm text-[#7A7672] hover:text-[#F0EDE8] hover:bg-white/3 transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block px-6 py-4 text-base font-semibold text-[#A8A49F] hover:text-[#F0EDE8] hover:bg-white/3 transition-all tracking-wide border-b border-white/5"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-5 border-t border-white/8 space-y-3 pb-safe">
          <Link
            to="/get-a-quote/"
            onClick={() => { onClose(); track('cta_clicked') }}
            className="btn-amber w-full"
          >
            Get My Free Quote
          </Link>
          {hasPhone() && BUSINESS_PHONE_DISPLAY ? (
            <a
              href={telHref()}
              onClick={() => { onClose(); track('phone_clicked') }}
              className="btn-outline w-full"
            >
              Call {BUSINESS_PHONE_DISPLAY}
            </a>
          ) : (
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              onClick={onClose}
              className="btn-outline w-full"
            >
              Email Us
            </a>
          )}
        </div>
      </div>
    </>
  )
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
