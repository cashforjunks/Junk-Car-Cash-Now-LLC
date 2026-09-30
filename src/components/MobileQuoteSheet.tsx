import { useEffect } from 'react'
import QuoteForm from './QuoteForm'

interface MobileQuoteSheetProps {
  open: boolean
  onClose: () => void
}

export default function MobileQuoteSheet({ open, onClose }: MobileQuoteSheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
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

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-[#111111] border-t border-white/10 rounded-t-2xl bottom-sheet max-h-[92vh] overflow-y-auto ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Get a free quote"
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-white/15 rounded-full" />
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-800 text-2xl tracking-wide text-[#F0EDE8]">
                GET YOUR FREE QUOTE
              </h2>
              <p className="text-sm text-[#7A7672] mt-0.5">No obligation. Fast response.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7A7672] hover:text-[#F0EDE8]"
              aria-label="Close quote form"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <QuoteForm compact onSuccess={onClose} />
        </div>
      </div>
    </>
  )
}
