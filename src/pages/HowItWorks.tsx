import { Link } from 'react-router-dom'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import FAQAccordion from '@/components/FAQAccordion'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'

const STEPS = [
  {
    num: '01',
    title: 'Request Your Free Quote',
    desc: "Fill out our online quote form with your vehicle's year, make, model, condition, and your Illinois ZIP code or city. You can also call us at or reach us via WhatsApp. Requesting a quote is completely free and carries no obligation.",
    tip: 'Have your vehicle details ready: year, make, model, approximate condition, and location.',
  },
  {
    num: '02',
    title: 'We Review Your Vehicle',
    desc: "We review the information you've provided. Every vehicle is assessed individually — condition, age, vehicle type, and your location all factor into the evaluation. We may contact you for additional details if needed.",
    tip: "The more accurate the information you provide, the more accurate our response can be.",
  },
  {
    num: '03',
    title: 'Receive an Offer',
    desc: "After reviewing your vehicle details, we contact you with an offer. We'll reach out via your preferred contact method — phone, email, or WhatsApp. You're free to accept or decline.",
    tip: "There's no pressure. Take the time you need to decide.",
  },
  {
    num: '04',
    title: 'Schedule Pickup',
    desc: "If you accept the offer, we schedule a pickup time that works for you. We serve multiple Illinois communities and work to find a pickup time that fits your schedule.",
    tip: 'Let us know about any access considerations — alley, garage, parking lot, etc.',
  },
  {
    num: '05',
    title: 'We Remove the Vehicle',
    desc: "On pickup day, we arrive at the scheduled time and remove the vehicle from your property. Non-running vehicles are picked up via flatbed tow truck. We handle the heavy lifting.",
    tip: 'Make sure the vehicle is accessible at the agreed pickup time.',
  },
]

const FAQS = [
  {
    question: 'How long does the entire process take?',
    answer:
      'The quote request process is fast — typically just a few minutes to fill out the form. Response timing depends on volume, but we aim to respond quickly. Once an offer is accepted, we work to schedule pickup within a few business days in most Illinois areas.',
  },
  {
    question: 'Do I need to be present at pickup?',
    answer:
      "Someone should be available to confirm the vehicle and complete any necessary handoff steps. Contact us when scheduling to discuss your specific situation.",
  },
  {
    question: 'What if my car is in a difficult location?',
    answer:
      "Let us know about access challenges when you request your quote — alley access, parking structures, storage lots, etc. We'll plan accordingly.",
  },
  {
    question: 'Can I change my mind after accepting an offer?',
    answer:
      "Contact us as soon as possible if you need to cancel or reschedule. Decisions you made before completing the process can typically be adjusted if you contact us in time.",
  },
]

export default function HowItWorks() {
  useSEO({
    title: 'How It Works | Selling a Junk Car in Illinois | Junk Car Cash Now LLC',
    description:
      'Learn how to sell your junk car in Illinois. Simple 5-step process: request a quote, receive an offer, schedule pickup. Junk Car Cash Now LLC.',
  })

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'How It Works' }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
              HOW IT<br />
              <span className="text-[#F59E0B]">WORKS</span>
            </h1>
            <p className="text-xl text-[#7A7672] leading-relaxed">
              Selling your junk car in Illinois is a simple, five-step process. Here's what to expect from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex gap-8 pb-16 last:pb-0">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[1.375rem] top-12 bottom-0 w-px bg-white/8" />
                )}
                {/* Number badge */}
                <div className="flex-shrink-0 w-11 h-11 border border-[#F59E0B]/40 flex items-center justify-center bg-[#F59E0B]/5 relative z-10">
                  <span className="font-display font-900 text-sm text-[#F59E0B]">{step.num}</span>
                </div>
                <div className="flex-1 pt-1.5">
                  <h2 className="font-display font-800 text-2xl sm:text-3xl tracking-wide text-[#F0EDE8] mb-4">
                    {step.title}
                  </h2>
                  <p className="text-[#7A7672] leading-relaxed mb-4">{step.desc}</p>
                  <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 px-4 py-3">
                    <p className="text-sm text-[#A8A49F]">
                      <span className="text-[#F59E0B] font-semibold">Tip: </span>
                      {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link to="/get-a-quote/" onClick={() => track('cta_clicked')} className="btn-amber">
              Start: Get My Free Quote
            </Link>
            <Link to="/sell-my-junk-car/" className="btn-outline">
              Sell My Junk Car
            </Link>
          </div>
        </div>
      </section>

      {/* What to prepare */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-800 text-3xl sm:text-4xl tracking-wide text-[#F0EDE8] mb-6">
                WHAT TO HAVE READY
              </h2>
              <p className="text-[#7A7672] mb-6">
                Having this information available when you request a quote helps us provide a more accurate response:
              </p>
              <div className="space-y-3">
                {[
                  'Vehicle year, make, and model',
                  "General condition (runs, doesn't run, wrecked, etc.)",
                  'Your Illinois city or ZIP code',
                  'Whether keys are available',
                  'Title status (if known)',
                  'Your preferred contact method',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#A8A49F]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display font-800 text-3xl sm:text-4xl tracking-wide text-[#F0EDE8] mb-6">
                TITLE & DOCUMENTATION
              </h2>
              <p className="text-[#7A7672] leading-relaxed mb-4">
                Vehicle title requirements for sales in Illinois are governed by Illinois law. Having a title is generally helpful for the process.
              </p>
              <p className="text-[#7A7672] leading-relaxed mb-4">
                If you don't have a title, contact us with your specific situation and we can discuss available options. We recommend consulting the Illinois Secretary of State's office for official guidance on vehicle title and documentation requirements.
              </p>
              <a
                href="https://www.ilsos.gov/departments/vehicles/title_reg/home.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#F59E0B] hover:text-[#FCD34D] transition-colors"
              >
                Illinois Secretary of State — Vehicle Titles →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-900 text-3xl sm:text-4xl tracking-tight text-[#F0EDE8] mb-10">
            PROCESS QUESTIONS
          </h2>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <CTASection title="READY TO GET STARTED?" subtitle="Request your free quote — it takes just a few minutes." />
    </main>
  )
}
