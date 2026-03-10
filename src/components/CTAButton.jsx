'use client'

export default function CTAButton({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition"
    >
      <p className="font-normal text-[14px] text-text-1 text-center leading-normal shrink-0">
        {label}
      </p>
    </div>
  )
}
