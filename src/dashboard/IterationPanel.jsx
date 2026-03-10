'use client'

import { useState } from 'react'
import VersionCard from './VersionCard'

export default function IterationPanel({ type, slug, name, versions: initialVersions }) {
  const [versions, setVersions] = useState(initialVersions)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveVersion, setSaveVersion] = useState('')

  async function handleIterate() {
    setCreating(true)
    try {
      const res = await fetch('/api/iterations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, slug }),
      })
      if (!res.ok) throw new Error('Failed to create version')
      const data = await res.json()
      setVersions((prev) => [...prev, data.version])
    } catch (e) {
      console.error('Iterate failed:', e)
    } finally {
      setCreating(false)
    }
  }

  async function handleSave() {
    if (!saveVersion) return
    setSaving(true)
    try {
      const res = await fetch('/api/iterations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, slug, saveVersion }),
      })
      if (!res.ok) throw new Error('Failed to save version')
      // Reset to single main version
      setVersions([
        {
          label: 'A',
          isMain: true,
          createdAt: new Date().toISOString(),
          notes: versions.find((v) => v.label === saveVersion)?.notes || '',
        },
      ])
      setSaveVersion('')
    } catch (e) {
      console.error('Save failed:', e)
    } finally {
      setSaving(false)
    }
  }

  function handleNotesChange(label, notes) {
    setVersions((prev) =>
      prev.map((v) => (v.label === label ? { ...v, notes } : v))
    )
  }

  return (
    <div className="bg-card-bg rounded-[12px] p-[16px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[12px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-text-1 text-[14px] font-medium">{name}</p>
        </div>
        <button
          onClick={handleIterate}
          disabled={creating}
          className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-[6px] bg-green/20 text-green text-[11px] font-medium hover:bg-green/30 transition disabled:opacity-50"
        >
          {creating ? (
            <>
              <svg className="animate-spin" width="10" height="10" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 10" />
              </svg>
              Creating...
            </>
          ) : (
            'Iterate +'
          )}
        </button>
      </div>

      {/* Version cards grid */}
      <div className="flex gap-[12px] overflow-x-auto pb-[8px]">
        {versions.map((v) => (
          <VersionCard
            key={v.label}
            version={v}
            type={type}
            slug={slug}
            onNotesChange={handleNotesChange}
          />
        ))}
      </div>

      {/* Save bar — only show when multiple versions exist */}
      {versions.length > 1 && (
        <div className="flex items-center gap-[8px] mt-[12px] pt-[12px] border-t border-text-2/10">
          <span className="text-text-2 text-[12px]">Save version:</span>
          <select
            value={saveVersion}
            onChange={(e) => setSaveVersion(e.target.value)}
            className="bg-bg text-text-1 text-[12px] px-[8px] py-[4px] rounded-[6px] border border-text-2/20 outline-none cursor-pointer"
          >
            <option value="">Select...</option>
            {versions.map((v) => (
              <option key={v.label} value={v.label}>
                {v.label}{v.isMain ? ' (current main)' : ''}
              </option>
            ))}
          </select>
          <span className="text-text-2 text-[12px]">as main</span>
          <button
            onClick={handleSave}
            disabled={!saveVersion || saving}
            className="px-[10px] py-[4px] rounded-[6px] bg-green/20 text-green text-[11px] font-medium hover:bg-green/30 transition disabled:opacity-30"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </div>
  )
}
