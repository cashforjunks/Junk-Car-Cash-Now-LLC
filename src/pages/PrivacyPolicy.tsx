import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Junk Car Cash Now LLC',
    description: 'Privacy policy for Junk Car Cash Now LLC.',
  })

  return (
    <main>
      <section className="pt-32 pb-24 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
          <h1 className="font-display font-900 text-4xl sm:text-5xl tracking-tight text-[#F0EDE8] mt-6 mb-8">
            PRIVACY POLICY
          </h1>
          <div className="prose-custom space-y-8 text-[#7A7672] leading-relaxed">
            <p className="text-sm text-[#4A4642]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">1. Information We Collect</h2>
              <p>When you submit a quote request through our website, we collect the information you provide, which may include your name, phone number, email address, vehicle information, and location (ZIP code or city). This information is used solely to evaluate your quote request and contact you in response.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">2. How We Use Your Information</h2>
              <p>We use the information you provide to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Evaluate and respond to your junk car quote request</li>
                <li>Contact you via your preferred contact method</li>
                <li>Schedule a vehicle pickup if you accept an offer</li>
              </ul>
              <p className="mt-3">We do not sell, trade, or transfer your personal information to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">3. Data Security</h2>
              <p>We take reasonable precautions to protect the information you share with us. However, no method of transmission over the internet is completely secure. We recommend that you do not submit sensitive personal or financial information beyond what is necessary to request a quote.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">4. Cookies and Analytics</h2>
              <p>This website may use cookies or similar technologies for analytics purposes to understand how visitors use the site. This information is used in aggregate form and does not personally identify you. You can disable cookies in your browser settings.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">5. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites, including the Illinois Secretary of State's office and Google. We are not responsible for the privacy practices of those sites.</p>
            </section>

            <section>
              <h2 className="font-display font-700 text-xl tracking-wide text-[#F0EDE8] mb-3">6. Contact Us</h2>
              <p>If you have questions about this privacy policy, contact us at:</p>
              <div className="mt-3 space-y-1">
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
