'use client'

import { useState } from 'react'
import Link from 'next/link'

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const PHONE_W = 393
const PHONE_H = 852
const PHONE_R = 30

export default function VersionCard({ version, type, slug, onNotesChange }) {
  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState(version.notes || '')

  const previewUrl = type === 'screen'
    ? `/preview/screen/${slug}?v=${version.label}`
    : `/preview/component/${slug}?v=${version.label}`

  const editUrl = type === 'screen'
    ? `/screen/${slug}?v=${version.label}`
    : `/component/${slug}?v=${version.label}`

  async function saveNotes() {
    setEditing(false)
    if (notes !== version.notes) {
      onNotesChange?.(version.label, notes)
      await fetch('/api/iterations/notes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, slug, label: version.label, notes }),
      })
    }
  }

  // Screen type: show properly scaled iPhone frame
  const isScreen = type === 'screen'
  const scale = isScreen ? 0.16 : 0.48
  const previewH = isScreen ? PHONE_H * scale + 4 : 140

  return (
    <div className="bg-card-bg rounded-[8px] overflow-hidden flex flex-col min-w-[150px] max-w-[200px]">
      {/* Preview */}
      <div className="relative w-full bg-black overflow-hidden flex items-center justify-center" style={{ height: previewH }}>
        {isScreen ? (
          <div style={{ width: PHONE_W * scale, height: PHONE_H * scale, overflow: 'hidden', borderRadius: PHONE_R * scale }}>
            <iframe
              src={previewUrl}
              className="pointer-events-none border-0"
              style={{
                width: PHONE_W,
                height: PHONE_H,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
              tabIndex={-1}
            />
          </div>
        ) : (
          <iframe
            src={previewUrl}
            className="pointer-events-none border-0"
            style={{
              width: 393,
              height: 300,
              transform: 'scale(0.48)',
              transformOrigin: 'top left',
            }}
            tabIndex={-1}
          />
        )}
      </div>

      {/* Card info */}
      <div className="p-[8px] flex flex-col gap-[4px]">
        <div className="flex items-center justify-between">
          <span className="text-text-1 text-[13px] font-medium">
            {version.label}
            {version.isMain && <span className="text-green text-[10px] ml-[4px]">(main)</span>}
          </span>
          <span className="text-text-2 text-[10px]">{timeAgo(version.createdAt)}</span>
        </div>

        {/* Notes */}
        {editing ? (
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            onKeyDown={(e) => e.key === 'Enter' && saveNotes()}
            autoFocus
            className="bg-bg text-text-2 text-[10px] px-[6px] py-[2px] rounded border border-text-2/20 outline-none focus:border-green/50"
            placeholder="Add notes..."
          />
        ) : (
          <p
            onClick={() => setEditing(true)}
            className="text-text-2 text-[10px] cursor-pointer hover:text-text-1 min-h-[16px]"
          >
            {notes || 'Click to add notes...'}
          </p>
        )}

        {/* Edit link */}
        <Link
          href={editUrl}
          className="text-[10px] text-text-2 hover:text-green transition mt-[2px]"
        >
          Edit &rarr;
        </Link>
      </div>
    </div>
  )
}
