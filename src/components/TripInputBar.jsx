'use client'

export default function TripInputBar({ value = '', onChange, onSubmit, placeholder = 'Describe your trip...', buttonLabel = 'Start' }) {
  const hasText = value.length > 0

  return (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-[30px] flex items-center px-[16px] py-[10px]">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#555] font-['Lato',sans-serif]"
        onKeyDown={(e) => e.key === 'Enter' && hasText && onSubmit?.()}
      />
      <button
        onClick={() => hasText && onSubmit?.()}
        className={`ml-[8px] px-[14px] py-[6px] rounded-[30px] text-[13px] font-medium transition ${hasText ? 'bg-[#333] text-white' : 'bg-[#222] text-[#555]'}`}
      >
        {buttonLabel}
      </button>
    </div>
  )
}
