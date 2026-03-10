'use client'

import { useState, useEffect, useRef } from 'react'

const sections = [
  { id: 'brand', label: 'Brand' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radii', label: 'Border Radius' },
  { id: 'icons', label: 'Icons' },
  { id: 'components', label: 'Components' },
]

export default function SectionNav() {
  const [activeId, setActiveId] = useState('brand')
  const observerRef = useRef(null)

  useEffect(() => {
    const callback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length > 0) {
        setActiveId(visible[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    })

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="flex flex-col gap-[2px]">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`text-left px-[12px] py-[8px] rounded-[6px] text-[13px] font-medium transition ${
            activeId === id
              ? 'bg-main/10 text-main'
              : 'text-[#888] hover:text-white hover:bg-[#222]'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
