'use client'

const DEFAULT_OPTIONS = [
  'Planning Vacation',
  'Any good deal Axel?',
  'Business Trip',
  'Looking into a City',
]

export default function QuickOptionPills({ options = DEFAULT_OPTIONS, onSelect }) {
  return (
    <div className="flex flex-wrap gap-[8px] justify-center">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect?.(opt)}
          className="border border-[#EF508D]/40 rounded-[30px] px-[14px] py-[8px] hover:bg-[#EF508D]/10 transition"
        >
          <span className="font-['Lato',sans-serif] text-[13px] text-[#EF508D] font-medium">{opt}</span>
        </button>
      ))}
    </div>
  )
}
