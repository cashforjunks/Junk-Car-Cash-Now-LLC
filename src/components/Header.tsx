import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { track } from '@/lib/analytics'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'

const NAV = [
  { label: 'Sell My Junk Car', href: '/sell-my-junk-car/' },
  {
    label: 'What We Buy',
    href: '/what-we-buy/',
    children: [
      { label: 'Junk Cars', href: '/junk-cars/' },
      { label: 'Damaged Cars', href: '/damaged-cars/' },
      { label: 'Wrecked Cars', href: '/wrecked-cars/' },
      { label: 'Non-Running Cars', href: '/non-running-cars/' },
      { label: 'Trucks', href: '/trucks/' },
      { label: 'SUVs', href: '/suvs/' },
      { label: 'Vans', href: '/vans/' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'FAQ', href: '/faq/' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" aria-label="Junk Car Cash Now LLC — Home">
              <Logo className="h-9 w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              {NAV.map((item) =>
                item.children ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="px-4 py-2 text-sm font-medium text-[#A8A49F] hover:text-[#F0EDE8] transition-colors flex items-center gap-1 tracking-wide"
                    >
                      {item.label}
                      <ChevronDown />
                    </Link>
                    {openDropdown === item.href && (
                      <div className="absolute top-full left-0 pt-2 min-w-[200px] z-50">
                        <div className="bg-[#131313] border border-white/8 py-2 shadow-2xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => track('service_page_clicked')}
                              className="block px-5 py-2.5 text-sm text-[#A8A49F] hover:text-[#F0EDE8] hover:bg-white/5 transition-all"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="px-4 py-2 text-sm font-medium text-[#A8A49F] hover:text-[#F0EDE8] transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {hasPhone() && BUSINESS_PHONE_DISPLAY && (
                <a
                  href={telHref()}
                  onClick={() => track('phone_clicked')}
                  className="text-sm text-[#A8A49F] hover:text-[#F59E0B] transition-colors font-medium tracking-wide"
                >
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              )}
              <Link
                to="/get-a-quote/"
                onClick={() => track('cta_clicked')}
                className="btn-amber text-sm px-5 py-2.5"
              >
                Get My Free Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[#A8A49F] hover:text-[#F0EDE8]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} nav={NAV} />
    </>
  )
}

function ChevronDown() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
