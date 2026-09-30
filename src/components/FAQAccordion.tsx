import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-white/6">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-start justify-between gap-4 py-5 text-left group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-[#F0EDE8] group-hover:text-[#F59E0B] transition-colors pr-4 leading-snug">
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/15 text-[#7A7672] transition-transform mt-0.5 ${
                open === i ? 'rotate-45 border-[#F59E0B] text-[#F59E0B]' : ''
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="pb-5 pr-10 text-sm text-[#7A7672] leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
