'use client'

export default function SavedPaymentCard({ last4, brand, selected }) {
  return (
    <div className={`bg-[#242424] rounded-[10px] px-[12px] py-[10px] flex items-center ${selected ? 'border border-green/40' : ''}`}>
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mr-[10px] shrink-0"><rect x="0.5" y="0.5" width="23" height="17" rx="2.5" stroke="#989898" /><rect x="0" y="4" width="24" height="4" fill="#474747" /></svg>
      <div className="flex-1"><p className="text-[13px] text-text-1 leading-normal">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; {last4}</p></div>
      <p className="text-[11px] text-text-2 leading-normal ml-[8px]">{brand}</p>
    </div>
  )
}
