import { Link } from 'react-router-dom'
import Logo from './Logo'
import { track } from '@/lib/analytics'
import {
  BUSINESS_NAME,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  hasPhone,
  hasWhatsApp,
  telHref,
  whatsappHref,
} from '@/config/business'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/6" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="h-10 w-auto mb-5" />
            <p className="text-sm text-[#7A7672] leading-relaxed mb-5">
              {BUSINESS_NAME} buys junk, damaged, wrecked, and non-running vehicles throughout Illinois. Get a free quote today.
            </p>
            <div className="space-y-2">
              {hasPhone() && BUSINESS_PHONE_DISPLAY && (
                <a
                  href={telHref()}
                  onClick={() => track('phone_clicked')}
                  className="flex items-center gap-2 text-[#F59E0B] font-semibold hover:text-[#FCD34D] transition-colors"
                >
                  <PhoneIcon /> {BUSINESS_PHONE_DISPLAY}
                </a>
              )}
              {hasWhatsApp() && (
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_clicked')}
                  className="flex items-center gap-2 text-sm text-[#7A7672] hover:text-[#F0EDE8] transition-colors"
                >
                  <WAIcon /> WhatsApp
                </a>
              )}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-2 text-sm text-[#7A7672] hover:text-[#F0EDE8] transition-colors"
              >
                <MailIcon /> {BUSINESS_EMAIL}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-700 text-xs tracking-widest uppercase text-[#F59E0B] mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Sell My Junk Car', href: '/sell-my-junk-car/' },
                { label: 'Sell My Car', href: '/sell-my-car/' },
                { label: 'What We Buy', href: '/what-we-buy/' },
                { label: 'Junk Cars', href: '/junk-cars/' },
                { label: 'Damaged Cars', href: '/damaged-cars/' },
                { label: 'Wrecked Cars', href: '/wrecked-cars/' },
                { label: 'Non-Running Cars', href: '/non-running-cars/' },
                { label: 'Trucks', href: '/trucks/' },
                { label: 'SUVs', href: '/suvs/' },
                { label: 'Vans', href: '/vans/' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => track('service_page_clicked')}
                    className="text-sm text-[#7A7672] hover:text-[#F0EDE8] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-700 text-xs tracking-widest uppercase text-[#F59E0B] mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'How It Works', href: '/how-it-works/' },
                { label: 'About Us', href: '/about/' },
                { label: 'Service Areas', href: '/service-areas/' },
                { label: 'FAQ', href: '/faq/' },
                { label: 'Contact', href: '/contact/' },
                { label: 'Get a Quote', href: '/get-a-quote/' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[#7A7672] hover:text-[#F0EDE8] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-display font-700 text-xs tracking-widest uppercase text-[#F59E0B] mb-5">
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Chicago, IL', href: '/service-areas/chicago-il/' },
                { label: 'Aurora, IL', href: '/service-areas/aurora-il/' },
                { label: 'Joliet, IL', href: '/service-areas/joliet-il/' },
                { label: 'Naperville, IL', href: '/service-areas/naperville-il/' },
                { label: 'Elgin, IL', href: '/service-areas/elgin-il/' },
                { label: 'Schaumburg, IL', href: '/service-areas/schaumburg-il/' },
                { label: 'Rockford, IL', href: '/service-areas/rockford-il/' },
                { label: 'Evanston, IL', href: '/service-areas/evanston-il/' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => track('service_area_clicked')}
                    className="text-sm text-[#7A7672] hover:text-[#F0EDE8] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/service-areas/" className="text-sm text-[#F59E0B] hover:text-[#FCD34D] transition-colors">
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A4642]">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy/" className="text-xs text-[#4A4642] hover:text-[#7A7672] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms/" className="text-xs text-[#4A4642] hover:text-[#7A7672] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function WAIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
