import Link from 'next/link'
import { project } from '@/dashboard.config'

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between py-[10px] px-[20px] border-b border-text-2/10">
      <div className="flex items-center gap-[10px]">
        <div className="w-[22px] h-[22px] rounded-[5px] bg-text-2/10 flex items-center justify-center text-text-2 text-[10px] font-bold">
          A
        </div>
        <h1 className="text-text-1 text-[14px] font-medium leading-normal">{project.name}</h1>
      </div>
      <div className="flex items-center gap-[12px]">
        <Link
          href="/design-system"
          className="text-text-2 text-[11px] hover:text-text-1 transition"
        >
          Design System
        </Link>
        <Link
          href="/design-rules"
          className="text-text-2 text-[11px] hover:text-text-1 transition"
        >
          Design Rules
        </Link>
      </div>
    </header>
  )
}
