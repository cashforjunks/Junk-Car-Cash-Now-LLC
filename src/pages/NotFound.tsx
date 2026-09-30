import { Link } from 'react-router-dom'
import { useSEO } from '@/lib/useSEO'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | Junk Car Cash Now LLC',
    description: 'The page you are looking for could not be found.',
    noIndex: true,
  })

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <span className="font-display font-900 text-[10rem] leading-none text-white/5 block mb-4">404</span>
        <h1 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8] mb-4 -mt-12">
          PAGE NOT FOUND
        </h1>
        <p className="text-[#7A7672] mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or was moved. Here are some helpful links:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 max-w-xl mx-auto">
          {[
            { label: 'Home', href: '/' },
            { label: 'Sell My Junk Car', href: '/sell-my-junk-car/' },
            { label: 'What We Buy', href: '/what-we-buy/' },
            { label: 'Service Areas', href: '/service-areas/' },
            { label: 'Get a Quote', href: '/get-a-quote/' },
            { label: 'Contact', href: '/contact/' },
          ].map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm text-[#7A7672] border border-white/10 px-4 py-3 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/" className="btn-amber">
          Go Back Home
        </Link>
      </div>
    </main>
  )
}
