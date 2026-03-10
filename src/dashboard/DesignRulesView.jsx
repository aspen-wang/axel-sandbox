'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ── Helpers ─────────────────────────────────────────────────── */

function Section({ title, children }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-[12px] p-[20px]">
      <h2 className="text-[14px] font-semibold text-white mb-[16px]">{title}</h2>
      {children}
    </div>
  )
}

function Label({ children }) {
  return <label className="text-[11px] text-[#666] block mb-[4px]">{children}</label>
}

function Input({ value, onChange, className = '' }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-[#1A1A1A] border border-[#222] rounded-[8px] text-[12px] text-white px-[10px] py-[6px] w-full outline-none focus:border-[#333] transition-colors font-['Lato',sans-serif] ${className}`}
    />
  )
}

function Textarea({ value, onChange, className = '' }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-[#1A1A1A] border border-[#222] rounded-[8px] text-[12px] text-white px-[10px] py-[6px] w-full outline-none focus:border-[#333] transition-colors min-h-[60px] resize-y font-['Lato',sans-serif] ${className}`}
    />
  )
}

function Swatch({ color }) {
  return (
    <div
      className="w-[24px] h-[24px] rounded-full shrink-0 border border-[#333]"
      style={{ backgroundColor: color }}
    />
  )
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed top-[20px] right-[20px] bg-[#1A1A1A] border border-[#333] rounded-[8px] px-[16px] py-[10px] text-[12px] text-white z-50 font-['Lato',sans-serif]">
      {message}
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────────── */

export default function DesignRulesView() {
  const [rules, setRules] = useState(null)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/design-rules')
      .then((r) => r.json())
      .then((data) => { setRules(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function save() {
    const res = await fetch('/api/design-rules', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rules),
    })
    if (res.ok) setToast('Saved')
  }

  async function reset() {
    const res = await fetch('/api/design-rules')
    const data = await res.json()
    setRules(data)
    setToast('Reset to saved values')
  }

  /* Updaters */
  function updateColorRule(idx, field, val) {
    setRules((prev) => {
      const next = { ...prev, colorRules: [...prev.colorRules] }
      next.colorRules[idx] = { ...next.colorRules[idx], [field]: val }
      return next
    })
  }

  function updateSurface(key, val) {
    setRules((prev) => ({ ...prev, surfaces: { ...prev.surfaces, [key]: val } }))
  }

  function updateTextColor(key, val) {
    setRules((prev) => ({ ...prev, textColors: { ...prev.textColors, [key]: val } }))
  }

  function updateTypography(field, val) {
    setRules((prev) => ({ ...prev, typography: { ...prev.typography, [field]: val } }))
  }

  function updateScale(idx, field, val) {
    setRules((prev) => {
      const next = { ...prev, typography: { ...prev.typography, scales: [...prev.typography.scales] } }
      next.typography.scales[idx] = { ...next.typography.scales[idx], [field]: val }
      return next
    })
  }

  function updateComponent(compKey, field, val) {
    setRules((prev) => ({
      ...prev,
      components: { ...prev.components, [compKey]: { ...prev.components[compKey], [field]: val } },
    }))
  }

  function updateAnimation(key, val) {
    setRules((prev) => ({ ...prev, animations: { ...prev.animations, [key]: val } }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[#666] text-[13px] font-['Lato',sans-serif]">Loading...</p>
      </div>
    )
  }

  if (!rules) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[#666] text-[13px] font-['Lato',sans-serif]">Failed to load design rules.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black font-['Lato',sans-serif]">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-sm border-b border-[#222]">
        <div className="max-w-[960px] mx-auto flex items-center justify-between px-[20px] py-[14px]">
          <div className="flex items-center gap-[12px]">
            <Link href="/" className="text-[#666] text-[12px] hover:text-white transition">
              Dashboard
            </Link>
            <span className="text-[#333] text-[12px]">/</span>
            <h1 className="text-white text-[16px] font-semibold">Design Rules</h1>
          </div>
          <div className="flex items-center gap-[8px]">
            <button
              onClick={reset}
              className="bg-transparent border border-[#333] text-[#AAA] rounded-[8px] px-[14px] py-[6px] text-[12px] hover:border-[#555] hover:text-white transition cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={save}
              className="bg-[#0090FF] text-white rounded-[8px] px-[14px] py-[6px] text-[12px] hover:bg-[#0080E6] transition cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[960px] mx-auto px-[20px] py-[24px] flex flex-col gap-[20px]">

        {/* A. Color Rules */}
        <Section title="Color Rules">
          <div className="flex flex-col gap-[16px]">
            {rules.colorRules.map((rule, i) => (
              <div key={rule.id} className="flex gap-[12px]">
                <Swatch color={rule.hex} />
                <div className="flex-1 grid grid-cols-[1fr_1fr] gap-[8px]">
                  <div>
                    <Label>Name</Label>
                    <Input value={rule.name} onChange={(v) => updateColorRule(i, 'name', v)} />
                  </div>
                  <div>
                    <Label>Hex</Label>
                    <Input value={rule.hex} onChange={(v) => updateColorRule(i, 'hex', v)} />
                  </div>
                  <div>
                    <Label>Use for</Label>
                    <Textarea
                      value={rule.usage}
                      onChange={(v) => updateColorRule(i, 'usage', v)}
                      className="text-[#AAA]"
                    />
                  </div>
                  <div>
                    <Label>Never use for</Label>
                    <Textarea
                      value={rule.never}
                      onChange={(v) => updateColorRule(i, 'never', v)}
                      className="text-[#666]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* B. Surface Colors */}
        <Section title="Surface Colors">
          <div className="grid grid-cols-2 gap-[12px]">
            {Object.entries(rules.surfaces).map(([key, val]) => (
              <div key={key} className="flex items-center gap-[8px]">
                <Swatch color={val} />
                <div className="flex-1">
                  <Label>{key}</Label>
                  <Input value={val} onChange={(v) => updateSurface(key, v)} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* C. Text Colors */}
        <Section title="Text Colors">
          <div className="grid grid-cols-2 gap-[12px]">
            {Object.entries(rules.textColors).map(([key, val]) => (
              <div key={key} className="flex items-center gap-[8px]">
                <Swatch color={val} />
                <div className="flex-1">
                  <Label>{key}</Label>
                  <Input value={val} onChange={(v) => updateTextColor(key, v)} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* D. Typography */}
        <Section title="Typography">
          <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
            <div>
              <Label>Font Family</Label>
              <Input value={rules.typography.fontFamily} onChange={(v) => updateTypography('fontFamily', v)} />
            </div>
            <div>
              <Label>Weight Rules</Label>
              <Input value={rules.typography.weights} onChange={(v) => updateTypography('weights', v)} />
            </div>
          </div>

          <h3 className="text-[12px] text-[#666] mb-[8px]">Type Scales</h3>
          <div className="flex flex-col gap-[8px]">
            {rules.typography.scales.map((scale, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_80px_100px] gap-[8px] items-end">
                <div>
                  <Label>Name</Label>
                  <Input value={scale.name} onChange={(v) => updateScale(i, 'name', v)} />
                </div>
                <div>
                  <Label>Size</Label>
                  <Input value={scale.size} onChange={(v) => updateScale(i, 'size', v)} />
                </div>
                <div>
                  <Label>Weight</Label>
                  <Input value={scale.weight} onChange={(v) => updateScale(i, 'weight', v)} />
                </div>
                <div className="flex items-end gap-[6px]">
                  <Swatch color={scale.color} />
                  <div className="flex-1">
                    <Label>Color</Label>
                    <Input value={scale.color} onChange={(v) => updateScale(i, 'color', v)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* E. Components */}
        <Section title="Components">
          <div className="flex flex-col gap-[24px]">

            {/* CTA Button */}
            <div>
              <h3 className="text-[12px] text-[#AAA] mb-[12px]">{rules.components.ctaButton.label}</h3>
              <div className="bg-black rounded-[8px] p-[24px] flex items-center justify-center mb-[12px]">
                <div
                  style={{
                    backgroundColor: rules.components.ctaButton.bgColor,
                    color: rules.components.ctaButton.textColor,
                    borderRadius: rules.components.ctaButton.borderRadius,
                    fontSize: rules.components.ctaButton.fontSize,
                    fontWeight: rules.components.ctaButton.fontWeight,
                    padding: `${rules.components.ctaButton.paddingY} ${rules.components.ctaButton.paddingX}`,
                    fontFamily: 'Lato, system-ui, sans-serif',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  Book Now
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[8px]">
                {['bgColor', 'textColor', 'borderRadius', 'fontSize', 'fontWeight', 'paddingY', 'paddingX'].map((field) => (
                  <div key={field}>
                    <Label>{field}</Label>
                    <Input
                      value={rules.components.ctaButton[field]}
                      onChange={(v) => updateComponent('ctaButton', field, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Option Button */}
            <div>
              <h3 className="text-[12px] text-[#AAA] mb-[12px]">{rules.components.optionButton.label}</h3>
              <div className="bg-black rounded-[8px] p-[24px] flex items-center justify-center mb-[12px]">
                <div
                  style={{
                    backgroundColor: rules.components.optionButton.bgColor,
                    color: rules.components.optionButton.textColor,
                    border: `1px solid ${rules.components.optionButton.borderColor}`,
                    borderRadius: rules.components.optionButton.borderRadius,
                    fontSize: rules.components.optionButton.fontSize,
                    fontWeight: rules.components.optionButton.fontWeight,
                    padding: `${rules.components.optionButton.paddingY} ${rules.components.optionButton.paddingX}`,
                    fontFamily: 'Lato, system-ui, sans-serif',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  Round trip
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[8px]">
                {['bgColor', 'borderColor', 'textColor', 'borderRadius', 'fontSize', 'fontWeight', 'paddingY', 'paddingX'].map((field) => (
                  <div key={field}>
                    <Label>{field}</Label>
                    <Input
                      value={rules.components.optionButton[field]}
                      onChange={(v) => updateComponent('optionButton', field, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Card */}
            <div>
              <h3 className="text-[12px] text-[#AAA] mb-[12px]">{rules.components.card.label}</h3>
              <div className="bg-black rounded-[8px] p-[24px] flex items-center justify-center mb-[12px]">
                <div
                  style={{
                    backgroundColor: rules.components.card.bgColor,
                    border: `1px solid ${rules.components.card.borderColor}`,
                    borderRadius: rules.components.card.borderRadius,
                    padding: rules.components.card.padding,
                    fontFamily: 'Lato, system-ui, sans-serif',
                    width: '240px',
                  }}
                >
                  <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>SFO to JFK</div>
                  <div style={{ fontSize: '12px', color: '#AAA', marginBottom: '8px' }}>Delta -- Nonstop -- 5h 20m</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#4FC660' }}>$249</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[8px]">
                {['bgColor', 'borderColor', 'borderRadius', 'padding'].map((field) => (
                  <div key={field}>
                    <Label>{field}</Label>
                    <Input
                      value={rules.components.card[field]}
                      onChange={(v) => updateComponent('card', field, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Axel Panel */}
            <div>
              <h3 className="text-[12px] text-[#AAA] mb-[12px]">{rules.components.axelPanel.label}</h3>
              <div className="bg-black rounded-[8px] p-[24px] flex items-center justify-center mb-[12px]">
                <div
                  style={{
                    backgroundColor: rules.components.axelPanel.bgColor,
                    borderTop: `1px solid ${rules.components.axelPanel.borderTopColor}`,
                    fontFamily: 'Lato, system-ui, sans-serif',
                    width: '300px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: rules.components.axelPanel.avatarSize,
                      height: rules.components.axelPanel.avatarSize,
                      borderRadius: '50%',
                      backgroundColor: rules.components.axelPanel.accentColor,
                      opacity: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: rules.components.axelPanel.accentColor,
                      marginBottom: '4px',
                    }}>
                      Axel
                    </div>
                    <div
                      style={{
                        width: rules.components.axelPanel.accentWidth,
                        height: '32px',
                        backgroundColor: rules.components.axelPanel.accentColor,
                        borderRadius: '2px',
                        position: 'absolute',
                        marginLeft: '-14px',
                        marginTop: '-4px',
                      }}
                    />
                    <div style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.4' }}>
                      I found 3 flights matching your preferences.
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[8px]">
                {['bgColor', 'borderTopColor', 'accentColor', 'accentWidth', 'avatarSize'].map((field) => (
                  <div key={field}>
                    <Label>{field}</Label>
                    <Input
                      value={rules.components.axelPanel[field]}
                      onChange={(v) => updateComponent('axelPanel', field, v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* F. Animations */}
        <Section title="Animations">
          <div className="grid grid-cols-2 gap-[12px]">
            {Object.entries(rules.animations).map(([key, val]) => (
              <div key={key}>
                <Label>{key}</Label>
                <Input value={val} onChange={(v) => updateAnimation(key, v)} />
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
