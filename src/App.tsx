import { useState, useEffect, lazy, Suspense } from 'react'
import ChunkErrorBoundary from '@/components/ChunkErrorBoundary'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { BUSINESS_NAME, BUSINESS_EMAIL, BUSINESS_PHONE, hasPhone } from '@/config/business'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import MobileQuoteSheet from '@/components/MobileQuoteSheet'

// Pages — lazy loaded for code splitting (smaller initial bundle)
const Home = lazy(() => import('@/pages/Home'))
const SellMyJunkCar = lazy(() => import('@/pages/SellMyJunkCar'))
const SellMyCar = lazy(() => import('@/pages/SellMyCar'))
const WhatWeBuy = lazy(() => import('@/pages/WhatWeBuy'))
const JunkCars = lazy(() => import('@/pages/JunkCars'))
const DamagedCars = lazy(() => import('@/pages/DamagedCars'))
const WreckedCars = lazy(() => import('@/pages/WreckedCars'))
const NonRunningCars = lazy(() => import('@/pages/NonRunningCars'))
const Trucks = lazy(() => import('@/pages/Trucks'))
const SUVs = lazy(() => import('@/pages/SUVs'))
const Vans = lazy(() => import('@/pages/Vans'))
const HowItWorks = lazy(() => import('@/pages/HowItWorks'))
const About = lazy(() => import('@/pages/About'))
const ServiceAreas = lazy(() => import('@/pages/ServiceAreas'))
const ServiceAreaCity = lazy(() => import('@/pages/ServiceAreaCity'))
const FAQ = lazy(() => import('@/pages/FAQ'))
const Contact = lazy(() => import('@/pages/Contact'))
const GetAQuote = lazy(() => import('@/pages/GetAQuote'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppLayout() {
  const [quoteSheetOpen, setQuoteSheetOpen] = useState(false)

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1 pb-16 lg:pb-0">
        <ChunkErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell-my-junk-car/" element={<SellMyJunkCar />} />
          <Route path="/sell-my-car/" element={<SellMyCar />} />
          <Route path="/what-we-buy/" element={<WhatWeBuy />} />
          <Route path="/junk-cars/" element={<JunkCars />} />
          <Route path="/damaged-cars/" element={<DamagedCars />} />
          <Route path="/wrecked-cars/" element={<WreckedCars />} />
          <Route path="/non-running-cars/" element={<NonRunningCars />} />
          <Route path="/trucks/" element={<Trucks />} />
          <Route path="/suvs/" element={<SUVs />} />
          <Route path="/vans/" element={<Vans />} />
          <Route path="/how-it-works/" element={<HowItWorks />} />
          <Route path="/about/" element={<About />} />
          <Route path="/service-areas/" element={<ServiceAreas />} />
          <Route path="/service-areas/:slug/" element={<ServiceAreaCity />} />
          <Route path="/faq/" element={<FAQ />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/get-a-quote/" element={<GetAQuote />} />
          <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
          <Route path="/terms/" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </ChunkErrorBoundary>
      </div>
      <Footer />

      {/* Mobile bottom nav */}
      <MobileBottomNav onQuoteOpen={() => setQuoteSheetOpen(true)} />

      {/* Mobile quote sheet */}
      <MobileQuoteSheet open={quoteSheetOpen} onClose={() => setQuoteSheetOpen(false)} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: BUSINESS_NAME,
            description:
              'Junk car buying service in Illinois. We buy junk, damaged, wrecked, and non-running vehicles throughout Illinois.',
            ...(hasPhone() && BUSINESS_PHONE ? { telephone: BUSINESS_PHONE } : {}),
            email: BUSINESS_EMAIL,
            url: typeof window !== 'undefined' ? window.location.origin : '',
            areaServed: {
              '@type': 'State',
              name: 'Illinois',
            },
            sameAs: [],
          }),
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
