import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'

export default function Terms() {
  useSEO({
    title: 'Terms of Service | Junk Car Cash Now LLC',
    description: 'Terms of service for Junk Car Cash Now LLC.',
  })

  return (
    <main>
      <section className="pt-32 pb-24 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
          <h1 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8] mt-6 mb-8">
            TERMS OF SERVICE
          </h1>
          <div className="space-y-8 text-[#7A7672] leading-relaxed">
            <p className="text-sm text-[#4A4642]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">1. Acceptance of Terms</h2>
              <p>By using this website, you agree to these Terms of Service. If you do not agree, do not use this website.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">2. Nature of Service</h2>
              <p>Junk Car Cash Now LLC provides a junk car quote and vehicle buying service operating in Illinois. Submitting a quote request through this website is a request for information and an offer evaluation. It does not constitute a binding sale or contract.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">3. Quote Requests</h2>
              <p>Quotes provided are based on the information you supply. Inaccurate or incomplete information may result in a different offer upon vehicle inspection. All quotes are non-binding until both parties agree to a final sale.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">4. Vehicle Ownership</h2>
              <p>By selling a vehicle, you represent that you are the legal owner of the vehicle or are legally authorized to sell it. Vehicle sales in Illinois are governed by Illinois law, including title and documentation requirements established by the Illinois Secretary of State.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">5. Accuracy of Information</h2>
              <p>We make reasonable efforts to ensure the information on this website is accurate and up to date. However, we make no warranty about the accuracy or completeness of the content. Service areas, processes, and offer criteria may change.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">6. Limitation of Liability</h2>
              <p>Junk Car Cash Now LLC is not liable for any damages arising from your use of this website or from the quote and vehicle purchase process beyond what is expressly agreed in a signed transaction.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">7. Contact</h2>
              <div className="space-y-1">
                <p>Junk Car Cash Now LLC</p>
                <p>Email: <a href="mailto:carsjunk81@gmail.com" className="text-[#F59E0B] hover:text-[#FCD34D]">carsjunk81@gmail.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
