'use client'

import { getFigmaUrl } from '@/dashboard.config'

export default function FigmaLinkButton({ nodeId }) {
  const url = getFigmaUrl(nodeId)
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-bg-2 text-text-2 text-[11px] hover:text-text-1 hover:bg-bg-2/80 transition"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.333 7a2.333 2.333 0 0 1 2.334-2.333h2.333V7A2.333 2.333 0 1 1 2.333 7Z" fill="currentColor" opacity="0.6"/>
        <path d="M4.667 2.333h2.333v4.667H4.667a2.333 2.333 0 0 1 0-4.667Z" fill="currentColor" opacity="0.8"/>
        <path d="M7 2.333h2.333a2.333 2.333 0 0 1 0 4.667H7V2.333Z" fill="currentColor"/>
        <path d="M11.667 4.667a2.333 2.333 0 1 1-4.667 0 2.333 2.333 0 0 1 4.667 0Z" fill="currentColor" opacity="0.6"/>
        <path d="M4.667 9.333h2.333A2.333 2.333 0 1 1 4.667 9.333Z" fill="currentColor" opacity="0.4"/>
      </svg>
      Figma
    </a>
  )
}
