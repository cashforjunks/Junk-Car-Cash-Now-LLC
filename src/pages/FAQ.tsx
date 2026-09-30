import { Link } from 'react-router-dom'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import FAQAccordion from '@/components/FAQAccordion'
import { useSEO } from '@/lib/useSEO'
import { faqs } from '@/data/faqs'

const CATEGORIES = [...new Set(faqs.map((f) => f.category))]

export default function FAQ() {
  useSEO({
    title: 'FAQ | Selling a Junk Car in Illinois | Junk Car Cash Now LLC',
    description:
      'Frequently asked questions about selling a junk car in Illinois. Learn about the quote process, vehicle eligibility, pickup, title requirements, and service areas.',
  })

  return (
    <main>
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
              FREQUENTLY ASKED<br />
              <span className="text-[#F59E0B]">QUESTIONS</span>
            </h1>
            <p className="text-xl text-[#7A7672]">
              Answers to common questions about selling a junk car in Illinois, the quote process, vehicle eligibility, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {CATEGORIES.map((category) => (
            <div key={category} className="mb-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="divider" />
                <h2 className="font-display font-800 text-2xl sm:text-3xl tracking-wide text-[#F0EDE8]">
                  {category.toUpperCase()}
                </h2>
              </div>
              <FAQAccordion items={faqs.filter((f) => f.category === category)} />
            </div>
          ))}

          <div className="mt-10 bg-[#111111] border border-white/8 p-8 text-center">
            <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8] mb-3">
              HAVE A DIFFERENT QUESTION?
            </h2>
            <p className="text-[#7A7672] mb-6">
              Contact us directly by phone, WhatsApp, or through our contact form.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact/" className="btn-amber">Contact Us</Link>
              <Link to="/contact/" className="btn-outline">Contact Form</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 bg-[#0D0D0D] border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-700 text-lg tracking-wide text-[#F0EDE8] mb-5">RELATED PAGES</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'How It Works', href: '/how-it-works/' },
              { label: 'What We Buy', href: '/what-we-buy/' },
              { label: 'Sell My Junk Car', href: '/sell-my-junk-car/' },
              { label: 'Service Areas', href: '/service-areas/' },
              { label: 'Get a Quote', href: '/get-a-quote/' },
            ].map((l) => (
              <Link key={l.href} to={l.href} className="text-sm text-[#7A7672] border border-white/10 px-4 py-2 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
