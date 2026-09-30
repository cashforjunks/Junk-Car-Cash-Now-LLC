import { Link } from 'react-router-dom'
import { hasPhone, telHref, BUSINESS_PHONE_DISPLAY } from '@/config/business'
import CTASection from '@/components/CTASection'
import Breadcrumb from '@/components/Breadcrumb'
import { useSEO } from '@/lib/useSEO'
import { track } from '@/lib/analytics'

const VEHICLE_CATEGORIES = [
  {
    title: 'Junk Cars',
    href: '/junk-cars/',
    desc: 'Old, high-mileage, non-running, or simply unwanted cars. If the cost of keeping it exceeds its value, it may qualify as a junk car.',
    img: 'https://images.unsplash.com/photo-1687867455489-bc2ad036b45a?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Damaged Cars',
    href: '/damaged-cars/',
    desc: 'Vehicles with mechanical, structural, or cosmetic damage. Flood damage, fire damage, hail damage — damaged vehicles may still have value.',
    img: 'https://images.unsplash.com/photo-1597328290883-50c5787b7c7e?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Wrecked Cars',
    href: '/wrecked-cars/',
    desc: 'Collision-damaged and totaled vehicles. Even extensively wrecked cars have salvage or parts value. We buy wrecked cars in any state.',
    img: 'https://images.unsplash.com/photo-1713623311317-d3c43a4be4cf?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Non-Running Cars',
    href: '/non-running-cars/',
    desc: "Cars that won't start, have engine problems, or have mechanical failures. Non-running vehicles are among the most common types we buy. Flatbed towing available.",
    img: 'https://images.unsplash.com/photo-1687867452629-a8c337d0e72e?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Trucks',
    href: '/trucks/',
    desc: 'Pickup trucks, work trucks, and commercial trucks in any condition. Running or not, we buy trucks throughout Illinois.',
    img: 'https://images.unsplash.com/photo-1670931814837-72bdaa5e612a?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'SUVs',
    href: '/suvs/',
    desc: 'Sport utility vehicles from any manufacturer. Old, damaged, wrecked, or non-running SUVs — we assess each one individually.',
    img: 'https://images.unsplash.com/photo-1610641018556-030e920d6999?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Vans',
    href: '/vans/',
    desc: 'Minivans, cargo vans, passenger vans — all considered. Condition and age both factor into the offer, not the decision to quote.',
    img: 'https://images.unsplash.com/photo-1687867456092-9717ce223658?w=600&h=400&fit=crop&auto=format',
  },
]

export default function WhatWeBuy() {
  useSEO({
    title: 'What We Buy | Junk Cars, Trucks, SUVs, Vans in Illinois | Junk Car Cash Now LLC',
    description:
      'We buy junk cars, damaged cars, wrecked cars, non-running vehicles, trucks, SUVs, and vans throughout Illinois. Any condition. Get a free quote.',
  })

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'What We Buy' }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[#F0EDE8] mb-6">
              WHAT WE BUY
            </h1>
            <p className="text-xl text-[#7A7672] leading-relaxed">
              We buy junk, damaged, wrecked, and non-running vehicles throughout Illinois. Cars, trucks, SUVs, and vans in any condition.
            </p>
          </div>
        </div>
      </section>

      {/* Vehicle categories */}
      <section className="pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {VEHICLE_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                onClick={() => track('cta_clicked')}
                className="group bg-[#0A0A0A] overflow-hidden hover:bg-[#111111] transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#131313]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-display font-800 text-xl tracking-wide text-[#F0EDE8] mb-2 group-hover:text-[#F59E0B] transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-[#7A7672] leading-relaxed mb-4">{cat.desc}</p>
                  <span className="text-xs text-[#F59E0B] font-semibold tracking-wider uppercase">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Note on eligibility */}
      <section className="py-16 bg-[#0D0D0D] border-y border-white/6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-800 text-2xl sm:text-3xl tracking-wide text-[#F0EDE8] mb-4">
            NOT SURE IF YOUR VEHICLE QUALIFIES?
          </h2>
          <p className="text-[#7A7672] mb-6 max-w-2xl mx-auto">
            Every vehicle is assessed individually. Condition, age, mileage, vehicle type, and location all factor into the offer — not the eligibility. The best way to find out is to request a free quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/get-a-quote/" onClick={() => track('cta_clicked')} className="btn-amber">
              Get My Free Quote
            </Link>
            {hasPhone() && BUSINESS_PHONE_DISPLAY && (
              <a href={telHref()} onClick={() => track('phone_clicked')} className="btn-outline">
                Call {BUSINESS_PHONE_DISPLAY}
              </a>
            )}
          </div>
        </div>
      </section>

      <CTASection title="READY TO GET A QUOTE?" subtitle="Request your free, no-obligation quote today." />
    </main>
  )
}
