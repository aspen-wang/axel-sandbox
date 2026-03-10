'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SendToFigmaButton from '@/dashboard/SendToFigmaButton'
import { variantData, fileNames, getSampleProps } from '@/lib/component-variants'

function loadVersioned(slug, version) {
  const baseName = fileNames[slug]
  return dynamic(
    () => import(`@/components/${baseName}.${version}`).catch(() => ({
      default: () => <div className="text-text-2 text-center p-4">Version {version} not found</div>,
    })),
    { ssr: false }
  )
}

export default function ComponentView({ comp, version }) {
  const [activeVariant, setActiveVariant] = useState(comp.variants[0])
  const isVersioned = version && version !== 'A'

  // For versioned view, show the versioned component with sample props
  if (isVersioned) {
    const VersionedComponent = loadVersioned(comp.slug, version)
    const props = getSampleProps(comp.slug)
    const isCTA = comp.slug === 'cta-button'

    return (
      <div className="min-h-screen bg-black flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-[24px] py-[8px] bg-bg-2/50">
          <Link href="/" className="text-text-2 text-[12px] hover:text-text-1 transition">
            &larr; Dashboard
          </Link>
          <span className="text-orange text-[12px] font-medium">
            {comp.name} &mdash; version {version}
          </span>
          <SendToFigmaButton type="component" slug={comp.slug} />
        </div>
        <div className="flex-1 flex items-center justify-center pb-[48px]">
          <div className={isCTA ? 'relative w-[393px] h-[100px]' : 'w-[393px] font-[\'Inter\',sans-serif]'}>
            <VersionedComponent {...props} />
          </div>
        </div>
      </div>
    )
  }

  // Default variant view
  const renderMap = variantData[comp.slug]
  const renderFn = renderMap?.[activeVariant]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[600px] flex items-center justify-between px-[24px] py-[16px]">
        <Link href="/" className="text-text-2 text-[13px] hover:text-text-1 transition">
          &larr; Dashboard
        </Link>
        <p className="text-text-1 text-[14px] font-medium">{comp.name}</p>
        <SendToFigmaButton type="dressroom" slug={comp.slug} />
      </div>

      {/* Variant switcher */}
      <div className="flex items-center gap-[8px] mb-[32px]">
        {comp.variants.map((v) => (
          <button
            key={v}
            onClick={() => setActiveVariant(v)}
            className={`px-[12px] py-[4px] rounded-full text-[12px] font-medium transition ${
              v === activeVariant
                ? 'bg-green/20 text-green'
                : 'bg-bg-2 text-text-2 hover:text-text-1'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Component preview */}
      <div className="flex-1 flex items-center justify-center pb-[48px]">
        <div className="w-[393px] font-['Inter',sans-serif]">
          {renderFn ? renderFn() : (
            <p className="text-text-2 text-[13px] text-center">No preview for this variant</p>
          )}
        </div>
      </div>
    </div>
  )
}
