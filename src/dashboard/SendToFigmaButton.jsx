'use client'

import { useState, useRef, useEffect } from 'react'

function parseFigmaUrl(url) {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('figma.com')) return null

    // Extract file name from path: /design/:fileKey/:fileName or /file/:fileKey/:fileName
    const parts = u.pathname.split('/').filter(Boolean)
    let fileKey = null
    let fileName = null

    const typeIdx = parts.findIndex((p) => p === 'design' || p === 'file')
    if (typeIdx >= 0 && parts[typeIdx + 1]) {
      fileKey = parts[typeIdx + 1]
      if (parts[typeIdx + 2]) {
        fileName = decodeURIComponent(parts[typeIdx + 2]).replace(/-/g, ' ')
      }
    }

    // Extract node-id
    const nodeId = u.searchParams.get('node-id')

    // Build display name
    let name = fileName || 'Figma page'
    if (nodeId) name += ` (${nodeId})`

    return { fileKey, fileName, nodeId, name }
  } catch {
    return null
  }
}

export default function SendToFigmaButton({ type, slug, steps, className }) {
  const [open, setOpen] = useState(false)
  const [pastedUrl, setPastedUrl] = useState('')
  const [destinations, setDestinations] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [sentName, setSentName] = useState('')
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  // Load saved destinations on mount
  useEffect(() => {
    fetch('/api/figma-destinations')
      .then((r) => r.json())
      .then(setDestinations)
      .catch(() => {})
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Focus input when dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  async function handleSend(url, name) {
    setOpen(false)
    setStatus('loading')
    setSentName(name)

    try {
      // Save destination for future use
      await fetch('/api/figma-destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, name }),
      }).then((r) => r.json()).then(setDestinations)

      // Create capture request
      const body = { type, slug, targetPage: name, figmaDestinationUrl: url }
      if (type === 'flow' && steps) body.steps = steps

      const res = await fetch('/api/figma-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Capture request failed')
      setStatus('success')
      setPastedUrl('')
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  function handlePasteSubmit() {
    const url = pastedUrl.trim()
    if (!url) return
    const parsed = parseFigmaUrl(url)
    if (parsed) {
      handleSend(url, parsed.name)
    } else {
      // Treat as a page name (backwards compat)
      handleSend(url, url)
    }
  }

  async function handleRemoveDestination(e, url) {
    e.stopPropagation()
    await fetch('/api/figma-destinations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    }).then((r) => r.json()).then(setDestinations)
  }

  if (status === 'loading') {
    return (
      <div className={`inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-orange/20 text-orange text-[11px] ${className || ''}`}>
        <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 10" />
        </svg>
        Sending...
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={`inline-flex items-center gap-[6px] ${className || ''}`}>
        <span className="text-green text-[11px]">Queued &rarr; {sentName}</span>
        <button
          onClick={() => { setStatus('idle'); setSentName('') }}
          className="text-text-2 text-[11px] hover:text-text-1"
        >
          Done
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <span className={`text-orange text-[11px] ${className || ''}`}>Export failed</span>
    )
  }

  const sortedDestinations = [...destinations].sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0))

  return (
    <div className={`relative ${className || ''}`} ref={dropdownRef}>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open) }}
        className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-bg-2 text-text-2 text-[11px] hover:text-text-1 hover:bg-bg-2/80 transition"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 9V10H10V9M6 2V7.5M6 7.5L3.5 5M6 7.5L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Send to Figma
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-[4px] bg-card-bg border border-grey rounded-[8px] shadow-lg z-50 min-w-[280px] py-[4px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Paste URL input */}
          <div className="px-[10px] py-[6px]">
            <p className="text-text-2/60 text-[10px] uppercase tracking-wider mb-[4px]">Paste Figma page URL</p>
            <div className="flex gap-[4px]">
              <input
                ref={inputRef}
                type="text"
                value={pastedUrl}
                onChange={(e) => setPastedUrl(e.target.value)}
                placeholder="https://figma.com/design/..."
                className="flex-1 bg-bg text-text-1 text-[12px] px-[8px] py-[5px] rounded-[6px] border border-text-2/20 outline-none focus:border-green/50 placeholder:text-text-2/30"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePasteSubmit()
                }}
                onPaste={(e) => {
                  // Auto-submit on paste after a tick so value updates
                  setTimeout(() => {
                    const val = e.target.value
                    if (val && parseFigmaUrl(val)) {
                      handleSend(val, parseFigmaUrl(val).name)
                    }
                  }, 0)
                }}
              />
              <button
                onClick={handlePasteSubmit}
                disabled={!pastedUrl.trim()}
                className="px-[8px] py-[4px] rounded-[6px] bg-green/20 text-green text-[11px] font-medium hover:bg-green/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>

          {/* Saved destinations */}
          {sortedDestinations.length > 0 && (
            <>
              <div className="border-t border-grey my-[4px]" />
              <p className="px-[10px] py-[2px] text-text-2/60 text-[10px] uppercase tracking-wider">Recent destinations</p>
              {sortedDestinations.map((dest) => (
                <div
                  key={dest.url}
                  className="flex items-center px-[10px] py-[6px] hover:bg-bg-2 transition cursor-pointer group"
                  onClick={() => handleSend(dest.url, dest.name)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-text-1 text-[12px] truncate">{dest.name}</p>
                    <p className="text-text-2/40 text-[10px] truncate">{dest.url}</p>
                  </div>
                  <button
                    onClick={(e) => handleRemoveDestination(e, dest.url)}
                    className="ml-[6px] text-text-2/30 hover:text-red text-[10px] opacity-0 group-hover:opacity-100 transition shrink-0"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
