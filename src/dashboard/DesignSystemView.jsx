'use client'

import { useState } from 'react'
import Link from 'next/link'
import designSystem from '@/data/design-system.json'

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key]
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})
}

const TABS = [
  { key: 'brand', label: 'Brand' },
  { key: 'colors', label: 'Colors' },
  { key: 'typography', label: 'Typography' },
  { key: 'spacing', label: 'Spacing' },
  { key: 'icons', label: 'Icons' },
  { key: 'inputs', label: 'Inputs' },
  { key: 'components', label: 'Components' },
]

/* ── Icon SVG Data ────────────────────────────────────────────── */

const ICON_SET = [
  { name: 'Home', cat: 'Navigation', d: ['M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'] },
  { name: 'Search', cat: 'Navigation', d: ['M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'] },
  { name: 'Arrow Left', cat: 'Navigation', d: ['M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'] },
  { name: 'Arrow Right', cat: 'Navigation', d: ['M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'] },
  { name: 'Chevron Right', cat: 'Navigation', d: ['M8.25 4.5l7.5 7.5-7.5 7.5'] },
  { name: 'Chevron Down', cat: 'Navigation', d: ['M19.5 8.25l-7.5 7.5-7.5-7.5'] },
  { name: 'Close', cat: 'Navigation', d: ['M6 18L18 6M6 6l12 12'] },
  { name: 'Menu', cat: 'Navigation', d: ['M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'] },

  { name: 'Map Pin', cat: 'Travel', d: ['M15 10.5a3 3 0 11-6 0 3 3 0 016 0z', 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'] },
  { name: 'Globe', cat: 'Travel', d: ['M12 21a9 9 0 100-18 9 9 0 000 18z', 'M3.6 9h16.8M3.6 15h16.8', 'M12 3c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9z'] },
  { name: 'Calendar', cat: 'Travel', d: ['M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'] },
  { name: 'Clock', cat: 'Travel', d: ['M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'] },
  { name: 'Plane', cat: 'Travel', d: ['M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'] },
  { name: 'Building', cat: 'Travel', d: ['M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'] },
  { name: 'Map', cat: 'Travel', d: ['M9 6.75V15m0-8.25l-6 2.25v8.25l6-2.25m0-8.25l6 2.25m-6 8.25l6-2.25m0-8.25v8.25m0-8.25l6-2.25v8.25l-6 2.25'] },
  { name: 'Ticket', cat: 'Travel', d: ['M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'] },

  { name: 'Credit Card', cat: 'Commerce', d: ['M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'] },
  { name: 'Tag', cat: 'Commerce', d: ['M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z', 'M6 6h.008v.008H6V6z'] },
  { name: 'Wallet', cat: 'Commerce', d: ['M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110 6h3.75A2.25 2.25 0 0021 13.5V12zm0 0V5.625A2.625 2.625 0 0018.375 3H5.625A2.625 2.625 0 003 5.625v12.75A2.625 2.625 0 005.625 21h12.75A2.625 2.625 0 0021 18.375V12z'] },
  { name: 'Dollar', cat: 'Commerce', d: ['M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'] },
  { name: 'Receipt', cat: 'Commerce', d: ['M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'] },
  { name: 'Gift', cat: 'Commerce', d: ['M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'] },

  { name: 'Heart', cat: 'Actions', d: ['M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'] },
  { name: 'Star', cat: 'Actions', d: ['M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'] },
  { name: 'Bell', cat: 'Actions', d: ['M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'] },
  { name: 'Bookmark', cat: 'Actions', d: ['M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'] },
  { name: 'Share', cat: 'Actions', d: ['M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'] },
  { name: 'Filter', cat: 'Actions', d: ['M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'] },

  { name: 'Chat', cat: 'Communication', d: ['M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'] },
  { name: 'Send', cat: 'Communication', d: ['M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'] },
  { name: 'Mail', cat: 'Communication', d: ['M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'] },
  { name: 'Phone', cat: 'Communication', d: ['M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'] },
  { name: 'Wifi', cat: 'Communication', d: ['M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z'] },
  { name: 'Signal', cat: 'Communication', d: ['M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'] },

  { name: 'User', cat: 'System', d: ['M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'] },
  { name: 'Settings', cat: 'System', d: ['M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'] },
  { name: 'Eye', cat: 'System', d: ['M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'] },
  { name: 'Check', cat: 'System', d: ['M4.5 12.75l6 6 9-13.5'] },
  { name: 'Plus', cat: 'System', d: ['M12 4.5v15m7.5-7.5h-15'] },
  { name: 'Sparkle', cat: 'System', d: ['M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'] },
]

/* ── Tab Content Components ───────────────────────────────────── */

function BrandTab({ brand }) {
  return (
    <div>
      <div className="mb-[20px] p-[24px] rounded-[12px] bg-main/5 border border-main/10">
        <p className="text-[10px] text-main/60 font-medium uppercase tracking-[0.1em] mb-[8px]">
          Fundamental Statement
        </p>
        <p className="text-[18px] text-text-1 font-medium leading-relaxed">
          &ldquo;{brand.statement}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
        <div className="p-[16px] rounded-[10px] bg-bg-2/60 border border-text-2/6">
          <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[10px]">
            Voice & Tone
          </p>
          <div className="flex flex-wrap gap-[6px]">
            {brand.voice.map((v) => (
              <span key={v} className="px-[10px] py-[4px] rounded-full bg-main/12 text-main text-[11px] font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>
        <div className="p-[16px] rounded-[10px] bg-bg-2/60 border border-text-2/6">
          <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[10px]">
            Personality
          </p>
          <div className="flex flex-wrap gap-[6px]">
            {brand.personality.map((p) => (
              <span key={p} className="px-[10px] py-[4px] rounded-full bg-text-2/8 text-secondary text-[11px] font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[12px]">
        <div className="p-[16px] rounded-[10px] bg-bg-2/60 border border-text-2/6">
          <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[6px]">Mascot</p>
          <p className="text-[13px] text-text-1">{brand.mascot}</p>
        </div>
        <div className="p-[16px] rounded-[10px] bg-bg-2/60 border border-text-2/6">
          <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[6px]">Visual Direction</p>
          <p className="text-[13px] text-text-1">{brand.visualDirection}</p>
        </div>
      </div>
    </div>
  )
}

function ColorsTab({ colors }) {
  const [colorMode, setColorMode] = useState('dark')
  const currentColors = colors[colorMode]
  const colorGroups = groupBy(currentColors, 'category')
  const categoryOrder = ['accent', 'surface', 'text']

  return (
    <div>
      <div className="flex items-center gap-[12px] mb-[24px]">
        <div className="flex items-center bg-bg-2 rounded-[8px] p-[3px]">
          {['dark', 'light'].map((mode) => (
            <button
              key={mode}
              onClick={() => setColorMode(mode)}
              className={`px-[12px] py-[5px] rounded-[6px] text-[11px] font-medium transition capitalize ${
                colorMode === mode
                  ? 'bg-card-bg text-text-1 shadow-sm'
                  : 'text-text-2/60 hover:text-text-1'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-text-2/40">{currentColors.length} tokens</span>
      </div>

      {categoryOrder.map((cat) => {
        const items = colorGroups[cat]
        if (!items) return null
        return (
          <div key={cat} className="mb-[28px]">
            <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">{cat}</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[14px]">
              {items.map((c) => (
                <div key={c.token} className="group">
                  <div
                    className="w-full aspect-square rounded-[10px] border border-text-2/8 mb-[8px] transition group-hover:scale-105 group-hover:shadow-lg"
                    style={{ backgroundColor: c.value }}
                  />
                  <p className="text-[11px] text-text-1 font-medium leading-tight">{c.label}</p>
                  <p className="text-[10px] text-text-2/40 font-mono mt-[2px]">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {colors.opacityVariants && (
        <div>
          <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">Opacity Variants</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[14px]">
            {colors.opacityVariants.map((v) => {
              const baseColor = currentColors.find((c) => c.token === v.base)
              if (!baseColor) return null
              return (
                <div key={v.name} className="group">
                  <div
                    className="w-full aspect-square rounded-[10px] border border-text-2/8 mb-[8px] overflow-hidden transition group-hover:scale-105"
                    style={{ backgroundColor: colorMode === 'dark' ? '#181818' : '#ffffff' }}
                  >
                    <div className="w-full h-full" style={{ backgroundColor: baseColor.value, opacity: v.alpha }} />
                  </div>
                  <p className="text-[11px] text-text-1 font-medium leading-tight">{v.name}</p>
                  <p className="text-[10px] text-text-2/40 mt-[2px]">{Math.round(v.alpha * 100)}%</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function TypographyTab({ typography }) {
  const { fonts, rules, scale } = typography

  const WEIGHT_NAMES = { 300: 'Light', 400: 'Regular', 700: 'Bold', 900: 'Black' }
  const FV = { Lato: 'var(--font-lato), sans-serif' }

  return (
    <div>
      {/* ── Font Families ── */}
      <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">
        Font Families
      </p>
      <div className="grid grid-cols-2 gap-[12px] mb-[28px]">
        {fonts.map((f) => (
          <div key={f.name} className="p-[20px] rounded-[12px] bg-bg-2/60 border border-text-2/6">
            <div className="flex items-baseline gap-[10px] mb-[6px]">
              <span
                className="text-[20px] text-text-1"
                style={{ fontFamily: FV[f.name], fontWeight: 600 }}
              >
                {f.name}
              </span>
              <span className="text-[11px] text-main font-medium">{f.role}</span>
            </div>
            <p className="text-[12px] text-text-2 mb-[14px]">{f.usage}</p>
            {/* Weight specimens */}
            <div className="flex flex-col gap-[6px]">
              {f.weights.map((w) => (
                <div key={w} className="flex items-baseline gap-[12px]">
                  <span className="text-[10px] text-text-2/40 font-mono w-[80px] shrink-0">
                    {w} {WEIGHT_NAMES[w]}
                  </span>
                  <span
                    className="text-[15px] text-text-1"
                    style={{ fontFamily: FV[f.name], fontWeight: w }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Rules ── */}
      <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">
        Typography Rules
      </p>
      <div className="grid grid-cols-3 gap-[10px] mb-[28px]">
        {[
          { label: 'Size Range', value: `${rules.minSize} – ${rules.maxSize}` },
          { label: 'Heading Tracking', value: rules.headingTracking },
          { label: 'Small Text Tracking', value: rules.smallTextTracking },
          { label: 'Heading Leading', value: rules.headingLeading },
          { label: 'Body Leading', value: rules.bodyLeading },
        ].map((r) => (
          <div key={r.label} className="p-[14px] rounded-[10px] bg-bg-2/40 border border-text-2/6">
            <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.06em] mb-[4px]">
              {r.label}
            </p>
            <p className="text-[13px] text-text-1">{r.value}</p>
          </div>
        ))}
      </div>

      {/* ── Type Scale ── */}
      <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">
        Type Scale
      </p>
      <div className="rounded-[12px] border border-text-2/6 overflow-hidden mb-[28px]">
        {scale.map((t, idx) => (
          <div
            key={t.token}
            className={`px-[24px] py-[20px] ${
              idx < scale.length - 1 ? 'border-b border-text-2/6' : ''
            } hover:bg-bg-2/40 transition`}
          >
            <p
              className="text-text-1 mb-[10px]"
              style={{
                fontFamily: FV[t.fontFamily],
                fontWeight: t.weight,
                fontSize: t.size,
                lineHeight: t.lineHeight,
                letterSpacing: t.tracking,
                textTransform: t.token === 'overline' ? 'uppercase' : undefined,
              }}
            >
              {t.sampleText}
            </p>
            <div className="flex items-center gap-[8px] flex-wrap">
              <span className="px-[8px] py-[2px] rounded-[5px] bg-main/12 text-main text-[10px] font-mono font-medium">
                .{t.class}
              </span>
              <span className="text-[11px] text-text-2 font-medium">{t.name}</span>
              <span className="text-[11px] text-text-2/40 font-mono">
                {t.fontFamily} {t.weight} · {t.size} / {t.lineHeight} · {t.tracking}
              </span>
              <span className="text-[11px] text-text-2/30 ml-auto">{t.usage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Showcase Cards ── */}
      <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">
        Typography in Context
      </p>
      <div className="grid grid-cols-2 gap-[12px]">

        {/* Card 1 — Flight deal */}
        <div className="p-[20px] rounded-[12px] bg-card-bg border border-text-2/6">
          <p className="type-overline text-green mb-[8px]">Best Deal</p>
          <p className="type-title-1 text-text-1 mb-[4px]">$247</p>
          <p className="type-title-2 text-text-1 mb-[10px]">San Francisco → Tokyo</p>
          <p className="type-body text-text-2 mb-[4px]">Alaska Airlines AS 224 · Nonstop</p>
          <p className="type-body-sm text-text-2/60 mb-[12px]">Departs 11:30 AM · Arrives 3:15 PM+1</p>
          <div className="flex items-center justify-between">
            <p className="type-caption text-text-2/40">Round trip · Feb 15–22</p>
            <span className="type-label text-green px-[8px] py-[3px] rounded-[6px] bg-green/10">Save $83</span>
          </div>
        </div>

        {/* Card 2 — Chat / AI message (Lato-heavy) */}
        <div className="p-[20px] rounded-[12px] bg-card-bg border border-text-2/6">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <div className="w-[28px] h-[28px] rounded-full bg-main/20 flex items-center justify-center">
              <span className="text-[12px] text-main" style={{ fontFamily: FV.Lato, fontWeight: 900 }}>A</span>
            </div>
            <span className="type-title-3 text-text-1">Axel</span>
            <span className="type-caption text-text-2/40 ml-auto">2m ago</span>
          </div>
          <p style={{ fontFamily: FV.Lato, fontWeight: 400, fontSize: '14px', lineHeight: 1.55 }} className="text-text-1 mb-[8px]">
            I found 3 flights under your $300 budget. The best option saves you <span className="text-green" style={{ fontWeight: 700 }}>$83 vs the average price</span> this month.
          </p>
          <p style={{ fontFamily: FV.Lato, fontWeight: 300, fontSize: '13px', lineHeight: 1.5 }} className="text-text-2/70 mb-[12px]">
            Prices typically rise 15% closer to departure. I&apos;d recommend booking within the next 48 hours for the best rate.
          </p>
          <p style={{ fontFamily: FV.Lato, fontWeight: 700, fontSize: '13px', lineHeight: 1.45, letterSpacing: '0.005em' }} className="text-main">
            Want me to hold this fare for you?
          </p>
        </div>

        {/* Card 3 — Booking confirmation (mixed) */}
        <div className="p-[20px] rounded-[12px] bg-card-bg border border-text-2/6">
          <p className="type-overline text-blue mb-[10px]">Confirmation</p>
          <p className="type-title-2 text-text-1 mb-[2px]">Booking confirmed</p>
          <p className="type-body-sm text-text-2 mb-[14px]">Your trip to Tokyo is all set</p>
          <div className="flex flex-col gap-[10px]">
            {[
              ['Confirmation', 'AS82KL'],
              ['Passenger', 'Alex Wang'],
              ['Route', 'SFO → NRT'],
              ['Date', 'Feb 15, 2026'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span style={{ fontFamily: FV.Lato, fontWeight: 300, fontSize: '12px' }} className="text-text-2/60">{label}</span>
                <span style={{ fontFamily: FV.Lato, fontWeight: 700, fontSize: '13px' }} className="text-text-1">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4 — Price history (numbers + captions) */}
        <div className="p-[20px] rounded-[12px] bg-card-bg border border-text-2/6">
          <p className="type-overline text-text-2/50 mb-[10px]">Price History</p>
          <div className="flex items-baseline gap-[8px] mb-[4px]">
            <p className="type-display text-text-1">$247</p>
            <span className="type-label text-green">-25%</span>
          </div>
          <p style={{ fontFamily: FV.Lato, fontWeight: 300, fontSize: '13px' }} className="text-text-2/60 mb-[16px]">
            Current price · lowest in 30 days
          </p>
          {/* Mini bar chart */}
          <div className="flex items-end gap-[3px] h-[48px] mb-[8px]">
            {[65, 78, 90, 72, 85, 95, 88, 60, 45, 38, 42, 35].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-[2px] ${i === 11 ? 'bg-green' : 'bg-text-2/15'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <span style={{ fontFamily: FV.Lato, fontWeight: 300, fontSize: '11px' }} className="text-text-2/30">Dec</span>
            <span style={{ fontFamily: FV.Lato, fontWeight: 300, fontSize: '11px' }} className="text-text-2/30">Jan</span>
            <span style={{ fontFamily: FV.Lato, fontWeight: 400, fontSize: '11px' }} className="text-text-2/50">Feb</span>
          </div>
        </div>

      </div>
    </div>
  )
}

function SpacingTab({ spacing, radii }) {
  return (
    <div className="grid grid-cols-2 gap-[24px]">
      {/* Spacing */}
      <div>
        <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">
          Spacing Scale
        </p>
        <div className="rounded-[12px] border border-text-2/6 overflow-hidden">
          {spacing.map((s, idx) => (
            <div
              key={s.name}
              className={`flex items-center gap-[20px] px-[20px] py-[14px] ${
                idx < spacing.length - 1 ? 'border-b border-text-2/6' : ''
              }`}
            >
              <span className="text-[12px] text-text-2 w-[28px] text-right font-medium">{s.name}</span>
              <div className="flex-1 flex items-center">
                <div
                  className="h-[8px] rounded-full bg-main/60"
                  style={{ width: Math.max(parseInt(s.value) * 4, 8) }}
                />
              </div>
              <span className="text-[11px] text-text-2/40 font-mono w-[36px]">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em] mb-[14px]">
          Border Radius
        </p>
        <div className="flex flex-wrap gap-[20px]">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-[10px]">
              <div
                className="w-[64px] h-[64px] border-[2px] border-text-2/30 bg-bg-2/40"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <p className="text-[12px] text-text-1 font-medium">{r.name}</p>
                <p className="text-[10px] text-text-2/40 font-mono">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IconsTab({ icons }) {
  const iconCategories = [...new Set(ICON_SET.map((i) => i.cat))]

  return (
    <div>
      <p className="text-[11px] text-text-2/40 mb-[24px]">
        {ICON_SET.length} icons &middot; Sourced from {icons.source} &middot; Stroke-based, 24&times;24 viewBox
      </p>

      {iconCategories.map((cat) => {
        const catIcons = ICON_SET.filter((i) => i.cat === cat)
        const catMeta = icons.categories.find((c) => c.name === cat)
        return (
          <div key={cat} className="mb-[28px]">
            <div className="flex items-center gap-[8px] mb-[14px]">
              <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em]">{cat}</p>
              {catMeta && (
                <span className="text-[10px] text-text-2/30">&middot; {catMeta.description}</span>
              )}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-[6px]">
              {catIcons.map((icon) => (
                <div key={icon.name} className="group flex flex-col items-center gap-[8px] py-[10px]">
                  <div className="w-[44px] h-[44px] rounded-[10px] bg-bg-2/80 flex items-center justify-center transition group-hover:bg-text-2/15 group-hover:scale-110">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-text-1"
                    >
                      {icon.d.map((path, i) => (
                        <path key={i} d={path} />
                      ))}
                    </svg>
                  </div>
                  <span className="text-[10px] text-text-2/50 group-hover:text-text-2 transition text-center leading-tight">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Input Components ──────────────────────────────────────────── */

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const CABIN_CLASSES = [
  { code: 'ECO', name: 'Economy', desc: 'Most affordable for everyone' },
  { code: 'PRE', name: 'Premium Economy', desc: 'Extra legroom & comfort' },
  { code: 'BUS', name: 'Business Class', desc: 'Lie-flat seats & lounges' },
  { code: 'FIR', name: 'First Class', desc: 'Ultimate luxury experience' },
]
const BED_TYPES = ['Any', '1 King', '2 Queen']
const AIRPORTS = [
  { code: 'SEA', name: 'Seattle-Tacoma', sub: 'Seattle, WA' },
  { code: 'LAX', name: 'Los Angeles', sub: 'Los Angeles, CA' },
  { code: 'ORD', name: "Chicago O'Hare", sub: 'Chicago, IL' },
  { code: 'JFK', name: 'John F. Kennedy', sub: 'New York, NY' },
  { code: 'DFW', name: 'Dallas/Fort Worth', sub: 'Dallas, TX' },
  { code: 'MIA', name: 'Miami International', sub: 'Miami, FL' },
]
const AIRLINES = [
  { code: 'AS', name: 'Alaska Airline' },
  { code: 'AA', name: 'American Airlines' },
  { code: 'DL', name: 'Delta Airlines' },
  { code: 'WN', name: 'Southwest Airlines' },
  { code: 'UA', name: 'United Airlines' },
  { code: 'JB', name: 'JetBlue Airways' },
]
const SKIP_REASONS = [
  "I don't have booking yet",
  'I want to explore this App first',
  "I didn't understand how Axel works",
  'Is there a mobile app available?',
]

/* Shared bottom-sheet handle */
function SheetHandle() {
  return <div className="w-[47px] h-[3px] rounded-[16px] bg-white/50 mx-auto mb-[20px]" />
}

/* Shared check icon */
function CheckIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className="text-blue shrink-0">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  )
}

/* 1. Text Input + Toggle (Email/Phone) */
function TextInputDemo() {
  const [mode, setMode] = useState('email')
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <div className="flex bg-bg-2 rounded-[8px] p-[3px] mb-[16px]">
        {['email', 'phone'].map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`flex-1 py-[8px] rounded-[6px] text-[12px] font-medium capitalize transition ${mode === m ? 'bg-card-bg text-text-1' : 'text-text-2'}`}>{m}</button>
        ))}
      </div>
      {mode === 'email' ? (
        <input readOnly value="alex.morgan@gmail.com" className="w-full bg-card-bg rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none border border-transparent" />
      ) : (
        <div className="flex items-center bg-card-bg rounded-[8px] px-[12px] py-[10px]">
          <span className="text-[13px] text-text-2 mr-[6px]">+1</span>
          <input readOnly value="your phone number" className="flex-1 bg-transparent text-[13px] text-text-2/40 outline-none" />
        </div>
      )}
    </div>
  )
}

/* 2. OTP Code */
function OTPDemo() {
  const digits = ['4', '2', '8', '1', '', '']
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[16px] font-medium text-text-1 mb-[4px]">Enter verification code</p>
      <p className="text-[12px] text-text-2 mb-[16px]">We sent a 6-digit code to your email</p>
      <div className="flex gap-[8px]">
        {digits.map((d, i) => (
          <div key={i} className={`flex-1 h-[48px] rounded-[8px] flex items-center justify-center text-[20px] font-medium ${d ? 'bg-card-bg text-text-1 border border-transparent' : 'bg-bg-2 text-text-2/30 border border-text-2/10'}`}>
            {d || '\u2022'}
          </div>
        ))}
      </div>
    </div>
  )
}

/* 3. Segmented Control */
function SegmentedControlDemo() {
  const [trip, setTrip] = useState('round')
  const [flex, setFlex] = useState('exact')
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[11px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[8px]">Trip Type</p>
      <div className="flex bg-bg-2 rounded-[30px] p-[3px] mb-[16px]">
        {[['round', 'Round trip'], ['oneway', 'One-way']].map(([k, l]) => (
          <button key={k} onClick={() => setTrip(k)} className={`flex-1 py-[8px] rounded-[30px] text-[13px] font-medium transition ${trip === k ? 'bg-card-bg text-text-1' : 'text-text-2'}`}>{l}</button>
        ))}
      </div>
      <p className="text-[11px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[8px]">Date Flexibility</p>
      <div className="flex bg-bg-2 rounded-[30px] p-[3px]">
        {[['exact', 'Exact Date'], ['1day', '1 day'], ['1week', '1 week']].map(([k, l]) => (
          <button key={k} onClick={() => setFlex(k)} className={`flex-1 py-[8px] rounded-[30px] text-[13px] font-medium transition ${flex === k ? 'bg-card-bg text-text-1' : 'text-text-2'}`}>{l}</button>
        ))}
      </div>
    </div>
  )
}

/* 4. Route Selector (Departure ⇌ Arrival) */
function RouteSelectorDemo() {
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[11px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[8px]">Flight</p>
      <div className="flex items-center bg-card-bg rounded-[30px] overflow-hidden">
        <div className="flex-1 px-[16px] py-[12px]">
          <p className="text-[14px] font-medium text-text-1">Departure</p>
        </div>
        <div className="w-[32px] h-[32px] rounded-full bg-bg-2 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-2">
            <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-9L21 12m0 0l-4.5 4.5M21 12H7.5" />
          </svg>
        </div>
        <div className="flex-1 px-[16px] py-[12px] text-right">
          <p className="text-[14px] font-medium text-text-1">Arrival</p>
        </div>
      </div>
    </div>
  )
}

/* 5. Search List (Airport) */
function SearchListDemo() {
  const [selected, setSelected] = useState('SEA')
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[20px] font-medium text-text-1 mb-[4px]">Departure Airport</p>
      <p className="text-[12px] text-text-2 mb-[12px]">Search or pick a city / airport code</p>
      <div className="flex items-center bg-card-bg rounded-[12px] px-[12px] py-[10px] mb-[10px]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-2 mr-[8px]"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <input readOnly placeholder="Search city or airport code..." className="flex-1 bg-transparent text-[13px] text-text-2/40 outline-none" />
      </div>
      <div className="flex flex-col gap-[4px] max-h-[240px] overflow-hidden">
        {AIRPORTS.map((a) => {
          const sel = selected === a.code
          return (
            <button key={a.code} onClick={() => setSelected(a.code)} className={`flex items-center rounded-[12px] px-[8px] py-[8px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent hover:border-text-2/10'}`}>
              <div className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center text-[12px] font-bold shrink-0 ${sel ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{a.code}</div>
              <div className="flex-1 ml-[10px]">
                <p className="text-[13px] font-medium text-text-1">{a.name}</p>
                <p className="text-[11px] text-text-2 mt-[1px]">{a.sub}</p>
              </div>
              {sel && <CheckIcon />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* 6. Airline Selector */
function AirlineListDemo() {
  const [selected, setSelected] = useState('AS')
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[20px] font-medium text-text-1 mb-[4px]">Select Airline</p>
      <p className="text-[12px] text-text-2 mb-[12px]">Choose your booking source</p>
      <div className="flex items-center bg-card-bg rounded-[12px] px-[12px] py-[10px] mb-[10px]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-2 mr-[8px]"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <input readOnly placeholder="Search your Airline" className="flex-1 bg-transparent text-[13px] text-text-2/40 outline-none" />
      </div>
      <div className="flex flex-col gap-[4px] max-h-[240px] overflow-hidden">
        {AIRLINES.map((a) => {
          const sel = selected === a.code
          return (
            <button key={a.code} onClick={() => setSelected(a.code)} className={`flex items-center rounded-[12px] px-[8px] py-[8px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent hover:border-text-2/10'}`}>
              <div className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center text-[12px] font-bold shrink-0 ${sel ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{a.code}</div>
              <p className="flex-1 ml-[10px] text-[13px] font-medium text-text-1">{a.name}</p>
              {sel && <CheckIcon />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* 7. Date Picker (Calendar) */
function CalendarInput() {
  const [selected, setSelected] = useState(10)
  const daysInMonth = 31
  const startDay = 6
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  const trailing = 7 - (cells.length % 7)
  if (trailing < 7) for (let i = 1; i <= trailing; i++) cells.push(-i)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[18px] font-medium text-text-1 mb-[12px]">Select your departure date</p>
      <div className="flex items-center justify-between px-[4px] mb-[8px]">
        <svg width="8" height="12" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-1"><path d="M8 1L2 7l6 6" /></svg>
        <p className="text-[16px] font-medium text-text-1">March 2026</p>
        <svg width="8" height="12" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-1"><path d="M2 1l6 6-6 6" /></svg>
      </div>
      <div className="flex flex-col gap-[3px]">
        <div className="flex gap-[6px]">
          {DAYS.map((d) => (
            <div key={d} className="flex-1 flex items-center justify-center py-[8px]">
              <span className="text-[12px] font-medium text-text-2">{d}</span>
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex gap-[3px]">
            {week.map((day, di) => {
              if (day === null) return <div key={di} className="flex-1 py-[10px]" />
              const isTrailing = day < 0
              const d = isTrailing ? -day : day
              const isSelected = !isTrailing && d === selected
              return (
                <button key={di} onClick={() => !isTrailing && setSelected(d)} className={`flex-1 flex items-center justify-center py-[10px] rounded-[4px] transition ${isSelected ? 'bg-blue text-bg' : isTrailing ? 'text-text-2/20' : 'bg-bg-2 text-text-1 hover:bg-text-2/15'}`}>
                  <span className="text-[12px] font-medium">{d}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* 8. Passenger Stepper + Cabin Radio */
function StepperSelectInput() {
  const [count, setCount] = useState(2)
  const [cabin, setCabin] = useState('ECO')
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[18px] font-medium text-text-1 mb-[12px]">Passenger Count</p>
      <div className="flex items-center justify-center gap-[14px] mb-[16px]">
        <button onClick={() => setCount((c) => Math.max(1, c - 1))} className="w-[40px] h-[40px] rounded-full bg-bg-2 flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">-</button>
        <span className="text-[28px] font-medium text-text-1 w-[32px] text-center">{count}</span>
        <button onClick={() => setCount((c) => Math.min(9, c + 1))} className="w-[40px] h-[40px] rounded-full bg-bg-2 flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">+</button>
      </div>
      <p className="text-[11px] text-text-2 mb-[8px]">Cabin Class</p>
      <div className="flex flex-col gap-[6px]">
        {CABIN_CLASSES.map((c) => {
          const sel = cabin === c.code
          return (
            <button key={c.code} onClick={() => setCabin(c.code)} className={`flex items-center rounded-[12px] px-[6px] py-[6px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent hover:border-text-2/10'}`}>
              <div className={`w-[36px] h-[36px] rounded-[6px] flex items-center justify-center text-[11px] font-bold shrink-0 ${sel ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{c.code}</div>
              <div className="flex-1 ml-[8px]">
                <p className="text-[13px] font-medium text-text-1">{c.name}</p>
                <p className="text-[10px] text-text-2">{c.desc}</p>
              </div>
              {sel && <CheckIcon />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* 9. Guests + Bed Type */
function GuestsBedDemo() {
  const [guests, setGuests] = useState(2)
  const [bed, setBed] = useState('1 King')
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[18px] font-medium text-text-1 mb-[12px]">Guests</p>
      <div className="flex items-center justify-center gap-[14px] mb-[16px]">
        <button onClick={() => setGuests((c) => Math.max(1, c - 1))} className="w-[40px] h-[40px] rounded-full bg-bg-2 flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">-</button>
        <span className="text-[28px] font-medium text-text-1 w-[32px] text-center">{guests}</span>
        <button onClick={() => setGuests((c) => Math.min(9, c + 1))} className="w-[40px] h-[40px] rounded-full bg-bg-2 flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">+</button>
      </div>
      <p className="text-[14px] font-medium text-text-1 mb-[8px]">Bed Type</p>
      <div className="flex flex-col gap-[6px]">
        {BED_TYPES.map((b) => {
          const sel = bed === b
          return (
            <button key={b} onClick={() => setBed(b)} className={`flex items-center rounded-[12px] px-[12px] py-[10px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent hover:border-text-2/10'}`}>
              <p className="flex-1 text-[13px] font-medium text-text-1">{b}</p>
              {sel && <CheckIcon />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* 10. Number Pad (Booking Price) */
function NumberPadInput() {
  const [value, setValue] = useState('882.00')
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'del']
  function handleKey(k) {
    if (k === 'C') setValue('0.00')
    else if (k === 'del') setValue((v) => v.length > 1 ? v.slice(0, -1) : '0')
    else setValue((v) => v === '0.00' ? k : v + k)
  }
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[18px] font-medium text-text-1">Booking Price and Currency</p>
      <p className="text-[12px] text-text-2 mt-[4px] mb-[12px]">What total price did you pay for this flight?</p>
      <p className="text-center text-[28px] font-medium text-text-1 mb-[12px]">{value}</p>
      <div className="flex items-center bg-card-bg rounded-[12px] px-[6px] py-[6px] mb-[12px]">
        <div className="bg-bg rounded-[6px] px-[8px] py-[10px] text-[13px] font-medium text-text-1">USD</div>
        <div className="flex-1 ml-[8px]">
          <p className="text-[13px] font-medium text-text-1">US Dollar</p>
          <p className="text-[11px] text-text-2">$</p>
        </div>
        <svg width="8" height="12" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-2 mr-[4px]"><path d="M2 1l6 6-6 6" /></svg>
      </div>
      <div className="grid grid-cols-3 gap-[3px]">
        {keys.map((k) => (
          <button key={k} onClick={() => handleKey(k)} className="bg-bg-2 rounded-[4px] py-[12px] flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">
            {k === 'del' ? (
              <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" /></svg>
            ) : k}
          </button>
        ))}
      </div>
    </div>
  )
}

/* 11. Multiple Choice */
function MultipleChoiceDemo() {
  const [picked, setPicked] = useState(null)
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[18px] font-medium text-text-1 mb-[16px]">What is the reason you skip</p>
      <div className="flex flex-col gap-[8px]">
        {SKIP_REASONS.map((r) => (
          <button key={r} onClick={() => setPicked(r)} className={`text-left rounded-[12px] px-[14px] py-[12px] text-[13px] font-medium transition ${picked === r ? 'bg-blue/20 text-text-1 border border-blue/20' : 'bg-card-bg text-text-1 border border-transparent hover:border-text-2/10'}`}>{r}</button>
        ))}
      </div>
    </div>
  )
}

/* 12. Selector Pill variants */
function SelectorPillDemo() {
  const [sel, setSel] = useState(0)
  const variants = [
    { code: 'SEA', name: 'Seattle-Tacoma', sub: 'Seattle, WA', hasCode: true, hasSub: true },
    { code: 'SEA', name: 'Seattle-Tacoma', sub: null, hasCode: true, hasSub: false },
    { code: null, name: 'Seattle-Tacoma', sub: 'Seattle, WA', hasCode: false, hasSub: true },
    { code: null, name: 'Seattle-Tacoma', sub: null, hasCode: false, hasSub: false },
  ]
  return (
    <div className="bg-bg border border-grey rounded-[20px] px-[20px] pt-[16px] pb-[24px] w-[340px]">
      <SheetHandle />
      <p className="text-[14px] font-medium text-text-1 mb-[12px]">Selector Pill Variants</p>
      <div className="flex flex-col gap-[6px]">
        {variants.map((v, i) => {
          const active = sel === i
          return (
            <button key={i} onClick={() => setSel(i)} className={`flex items-center rounded-[12px] px-[8px] py-[8px] transition text-left ${active ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent hover:border-text-2/10'}`}>
              {v.hasCode && <div className={`w-[36px] h-[36px] rounded-[8px] flex items-center justify-center text-[11px] font-bold shrink-0 mr-[8px] ${active ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{v.code}</div>}
              <div className="flex-1">
                <p className="text-[13px] font-medium text-text-1">{v.name}</p>
                {v.hasSub && <p className="text-[10px] text-text-2">{v.sub}</p>}
              </div>
              {active && <CheckIcon />}
            </button>
          )
        })}
      </div>
      <p className="text-[10px] text-text-2/40 mt-[10px]">4 variants: code+sub, code only, sub only, name only</p>
    </div>
  )
}

/* 13. Flight Form — Interactive Phone Frame with Bottom Sheets */

function FormSheet({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative animate-slideUp">{children}</div>
    </div>
  )
}

function FormCalendarSheet({ open, onClose, title, selectedDay, onSelect }) {
  const daysInMonth = 31
  const startDay = 6
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  const trailing = 7 - (cells.length % 7)
  if (trailing < 7) for (let i = 1; i <= trailing; i++) cells.push(-i)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return (
    <FormSheet open={open} onClose={onClose}>
      <div className="bg-bg border-t border-grey rounded-t-[30px] px-[20px] pt-[14px] pb-[28px]">
        <div className="w-[40px] h-[3px] rounded-full bg-white/50 mx-auto mb-[16px]" />
        <p className="text-[18px] font-medium text-text-1 mb-[10px] px-[4px]">{title}</p>
        <div className="flex items-center justify-between px-[4px] mb-[6px]">
          <svg width="8" height="12" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-1"><path d="M8 1L2 7l6 6" /></svg>
          <p className="text-[15px] font-medium text-text-1">March 2026</p>
          <svg width="8" height="12" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-1"><path d="M2 1l6 6-6 6" /></svg>
        </div>
        <div className="flex flex-col gap-[3px]">
          <div className="flex">
            {DAYS.map((d) => <div key={d} className="flex-1 flex items-center justify-center py-[6px]"><span className="text-[11px] font-medium text-text-2">{d}</span></div>)}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex gap-[3px]">
              {week.map((day, di) => {
                if (day === null) return <div key={di} className="flex-1 py-[10px]" />
                const t = day < 0, d = t ? -day : day, sel = !t && d === selectedDay
                return (
                  <button key={di} onClick={() => { if (!t) { onSelect(d); onClose() } }} className={`flex-1 flex items-center justify-center py-[10px] rounded-[4px] transition ${sel ? 'bg-blue text-bg' : t ? 'text-text-2/20' : 'bg-bg-2 text-text-1 hover:bg-text-2/15'}`}>
                    <span className="text-[12px] font-medium">{d}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </FormSheet>
  )
}

function FormAirportSheet({ open, onClose, title, selected, onSelect }) {
  return (
    <FormSheet open={open} onClose={onClose}>
      <div className="bg-bg border-t border-grey rounded-t-[30px] px-[20px] pt-[14px] pb-[28px]">
        <div className="w-[40px] h-[3px] rounded-full bg-white/50 mx-auto mb-[16px]" />
        <p className="text-[18px] font-medium text-text-1 mb-[2px]">{title}</p>
        <p className="text-[12px] text-text-2 mb-[10px]">Search or pick a city / airport code</p>
        <div className="flex items-center bg-card-bg rounded-[12px] px-[10px] py-[8px] mb-[8px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-2 mr-[6px]"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-[12px] text-text-2/40">Search city or airport code...</span>
        </div>
        <div className="flex flex-col gap-[3px] max-h-[260px] overflow-y-auto">
          {AIRPORTS.map((a) => {
            const sel = selected === a.code
            return (
              <button key={a.code} onClick={() => { onSelect(a.code); onClose() }} className={`flex items-center rounded-[10px] px-[6px] py-[6px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent'}`}>
                <div className={`w-[36px] h-[36px] rounded-[6px] flex items-center justify-center text-[11px] font-bold shrink-0 ${sel ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{a.code}</div>
                <div className="flex-1 ml-[8px]">
                  <p className="text-[12px] font-medium text-text-1">{a.name}</p>
                  <p className="text-[10px] text-text-2">{a.sub}</p>
                </div>
                {sel && <CheckIcon />}
              </button>
            )
          })}
        </div>
      </div>
    </FormSheet>
  )
}

function FormAirlineSheet({ open, onClose, selected, onSelect }) {
  return (
    <FormSheet open={open} onClose={onClose}>
      <div className="bg-bg border-t border-grey rounded-t-[30px] px-[20px] pt-[14px] pb-[28px]">
        <div className="w-[40px] h-[3px] rounded-full bg-white/50 mx-auto mb-[16px]" />
        <p className="text-[18px] font-medium text-text-1 mb-[2px]">Select Airline</p>
        <p className="text-[12px] text-text-2 mb-[10px]">Choose your booking source</p>
        <div className="flex items-center bg-card-bg rounded-[12px] px-[10px] py-[8px] mb-[8px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-2 mr-[6px]"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-[12px] text-text-2/40">Search your Airline</span>
        </div>
        <div className="flex flex-col gap-[3px] max-h-[260px] overflow-y-auto">
          {AIRLINES.map((a) => {
            const sel = selected === a.code
            return (
              <button key={a.code} onClick={() => { onSelect(a.code); onClose() }} className={`flex items-center rounded-[10px] px-[6px] py-[6px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent'}`}>
                <div className={`w-[36px] h-[36px] rounded-[6px] flex items-center justify-center text-[11px] font-bold shrink-0 ${sel ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{a.code}</div>
                <p className="flex-1 ml-[8px] text-[12px] font-medium text-text-1">{a.name}</p>
                {sel && <CheckIcon />}
              </button>
            )
          })}
        </div>
      </div>
    </FormSheet>
  )
}

function FormPassengerSheet({ open, onClose, count, setCount, cabin, setCabin }) {
  return (
    <FormSheet open={open} onClose={onClose}>
      <div className="bg-bg border-t border-grey rounded-t-[30px] px-[20px] pt-[14px] pb-[28px]">
        <div className="w-[40px] h-[3px] rounded-full bg-white/50 mx-auto mb-[16px]" />
        <p className="text-[18px] font-medium text-text-1 mb-[12px]">Passenger Count</p>
        <div className="flex items-center justify-center gap-[14px] mb-[16px]">
          <button onClick={() => setCount(c => Math.max(1, c - 1))} className="w-[40px] h-[40px] rounded-full bg-bg-2 flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">-</button>
          <span className="text-[28px] font-medium text-text-1 w-[32px] text-center">{count}</span>
          <button onClick={() => setCount(c => Math.min(9, c + 1))} className="w-[40px] h-[40px] rounded-full bg-bg-2 flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">+</button>
        </div>
        <p className="text-[11px] text-text-2 mb-[8px]">Cabin Class</p>
        <div className="flex flex-col gap-[5px]">
          {CABIN_CLASSES.map((c) => {
            const sel = cabin === c.code
            return (
              <button key={c.code} onClick={() => setCabin(c.code)} className={`flex items-center rounded-[12px] px-[6px] py-[6px] transition text-left ${sel ? 'bg-blue/20 border border-blue/20' : 'bg-card-bg border border-transparent'}`}>
                <div className={`w-[36px] h-[36px] rounded-[6px] flex items-center justify-center text-[11px] font-bold shrink-0 ${sel ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'}`}>{c.code}</div>
                <div className="flex-1 ml-[8px]"><p className="text-[12px] font-medium text-text-1">{c.name}</p><p className="text-[10px] text-text-2">{c.desc}</p></div>
                {sel && <CheckIcon />}
              </button>
            )
          })}
        </div>
        <button onClick={onClose} className="w-full bg-blue text-bg font-medium text-[13px] py-[12px] rounded-[30px] mt-[16px] hover:brightness-110 transition">Done</button>
      </div>
    </FormSheet>
  )
}

function FormNumberPadSheet({ open, onClose, value, setValue }) {
  const keys = ['1','2','3','4','5','6','7','8','9','C','0','del']
  function handleKey(k) {
    if (k === 'C') setValue('0')
    else if (k === 'del') setValue(v => v.length > 1 ? v.slice(0, -1) : '0')
    else setValue(v => v === '0' ? k : v + k)
  }
  return (
    <FormSheet open={open} onClose={onClose}>
      <div className="bg-bg border-t border-grey rounded-t-[30px] px-[20px] pt-[14px] pb-[28px]">
        <div className="w-[40px] h-[3px] rounded-full bg-white/50 mx-auto mb-[16px]" />
        <p className="text-[18px] font-medium text-text-1">Booking Price and Currency</p>
        <p className="text-[12px] text-text-2 mt-[4px] mb-[12px]">What total price did you pay for this flight?</p>
        <p className="text-center text-[28px] font-medium text-text-1 mb-[12px]">{value}<span className="text-text-2">.00</span></p>
        <div className="flex items-center bg-card-bg rounded-[12px] px-[6px] py-[6px] mb-[12px]">
          <div className="bg-bg rounded-[6px] px-[8px] py-[10px] text-[13px] font-medium text-text-1">USD</div>
          <div className="flex-1 ml-[8px]"><p className="text-[12px] font-medium text-text-1">US Dollar</p><p className="text-[10px] text-text-2">$</p></div>
          <svg width="8" height="12" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-2 mr-[4px]"><path d="M2 1l6 6-6 6" /></svg>
        </div>
        <div className="grid grid-cols-3 gap-[3px]">
          {keys.map((k) => (
            <button key={k} onClick={() => handleKey(k)} className="bg-bg-2 rounded-[4px] py-[12px] flex items-center justify-center text-[14px] font-medium text-text-1 hover:bg-text-2/15 transition">
              {k === 'del' ? <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" /></svg> : k}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full bg-green text-bg font-medium text-[13px] py-[12px] rounded-[30px] mt-[14px] hover:brightness-110 transition">Set price</button>
      </div>
    </FormSheet>
  )
}

function FlightFormInteractive() {
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState('')
  const [trip, setTrip] = useState('round')
  const [flex, setFlex] = useState('exact')
  const [departDay, setDepartDay] = useState(null)
  const [returnDay, setReturnDay] = useState(null)
  const [airline, setAirline] = useState('')
  const [pax, setPax] = useState(1)
  const [cabin, setCabin] = useState('ECO')
  const [price, setPrice] = useState('0')
  const [sheet, setSheet] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const cabinLabel = CABIN_CLASSES.find(c => c.code === cabin)?.name || cabin
  const airlineLabel = AIRLINES.find(a => a.code === airline)?.name
  const originCity = AIRPORTS.find(a => a.code === origin)?.name
  const destCity = AIRPORTS.find(a => a.code === dest)?.name
  const valid = origin && dest && departDay

  return (
    <div className="relative w-[393px] h-[852px] rounded-[30px] bg-bg border border-grey overflow-hidden shrink-0">
      {/* Hero */}
      <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-b from-blue/20 via-blue/8 to-transparent" />
      <div className="absolute top-[14px] left-[24px] right-[24px] flex items-center justify-between">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1">9:41</p>
        <div className="flex items-center gap-[4px] text-text-1">
          <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="1" y="6" width="3" height="12" rx="1" opacity=".3"/><rect x="6" y="4" width="3" height="14" rx="1" opacity=".5"/><rect x="11" y="2" width="3" height="16" rx="1" opacity=".7"/><rect x="16" y="0" width="3" height="18" rx="1"/></svg>
          <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {submitted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-[40px]">
          <div className="w-[56px] h-[56px] rounded-full bg-green/20 flex items-center justify-center mb-[16px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <p className="text-[18px] font-medium text-text-1 mb-[6px]">Watch Created</p>
          <p className="text-[13px] text-text-2 text-center">{origin} → {dest} &middot; Mar {departDay}{returnDay ? `–${returnDay}` : ''}</p>
          <p className="text-[12px] text-text-2 text-center mt-[4px]">{pax} pax &middot; {cabinLabel}{price !== '0' ? ` · $${price}` : ''}</p>
          <div className="flex gap-[10px] mt-[24px]">
            <button onClick={() => setSubmitted(false)} className="px-[16px] py-[8px] rounded-[30px] border border-text-2/20 text-[12px] font-medium text-text-1">Edit</button>
            <button onClick={() => { setSubmitted(false); setOrigin(''); setDest(''); setDepartDay(null); setReturnDay(null); setAirline(''); setPax(1); setCabin('ECO'); setPrice('0') }} className="px-[16px] py-[8px] rounded-[30px] bg-main text-bg text-[12px] font-medium">New Watch</button>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute left-[20px] top-[50px] right-[20px]">
            <div className="flex items-center gap-[6px] mb-[2px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-2"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p className="text-[16px] font-medium text-text-1">Axel, watch this flight</p>
            </div>

            {/* Trip type */}
            <div className="flex bg-bg-2 rounded-[30px] p-[3px] mt-[16px] mb-[16px]">
              {[['round', 'Round trip'], ['oneway', 'One-way']].map(([k, l]) => (
                <button key={k} onClick={() => setTrip(k)} className={`flex-1 py-[8px] rounded-[30px] text-[13px] font-medium transition ${trip === k ? 'bg-card-bg text-text-1' : 'text-text-2'}`}>{l}</button>
              ))}
            </div>

            {/* Route */}
            <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Flight</p>
            <div className="flex items-center bg-card-bg rounded-[30px] overflow-hidden mb-[12px]">
              <button onClick={() => setSheet('origin')} className="flex-1 px-[16px] py-[10px] text-left hover:bg-text-2/5 transition">
                <p className={`text-[14px] font-medium ${origin ? 'text-text-1' : 'text-text-2/40'}`}>{origin || 'Departure'}</p>
              </button>
              <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-2"><path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-9L21 12m0 0l-4.5 4.5M21 12H7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <button onClick={() => setSheet('dest')} className="flex-1 px-[16px] py-[10px] text-right hover:bg-text-2/5 transition">
                <p className={`text-[14px] font-medium ${dest ? 'text-text-1' : 'text-text-2/40'}`}>{dest || 'Arrival'}</p>
              </button>
            </div>

            {/* Date flex */}
            <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Date flexibility</p>
            <div className="flex bg-bg-2 rounded-[30px] p-[3px] mb-[12px]">
              {[['exact', 'Exact Date'], ['1day', '1 day'], ['1week', '1 week']].map(([k, l]) => (
                <button key={k} onClick={() => setFlex(k)} className={`flex-1 py-[7px] rounded-[30px] text-[12px] font-medium transition ${flex === k ? 'bg-card-bg text-text-1' : 'text-text-2'}`}>{l}</button>
              ))}
            </div>

            {/* Dates */}
            <div className="flex gap-[8px] mb-[12px]">
              <div className="flex-1">
                <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Departure</p>
                <button onClick={() => setSheet('depart')} className="w-full bg-card-bg rounded-[30px] px-[14px] py-[10px] text-left hover:bg-text-2/5 transition">
                  <p className={`text-[13px] font-medium ${departDay ? 'text-text-1' : 'text-text-2/40'}`}>{departDay ? `Mar ${departDay}, 2026` : 'Pick date'}</p>
                </button>
              </div>
              {trip === 'round' && (
                <div className="flex-1">
                  <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Return</p>
                  <button onClick={() => setSheet('return')} className="w-full bg-card-bg rounded-[30px] px-[14px] py-[10px] text-left hover:bg-text-2/5 transition">
                    <p className={`text-[13px] font-medium ${returnDay ? 'text-text-1' : 'text-text-2/40'}`}>{returnDay ? `Mar ${returnDay}, 2026` : 'Pick date'}</p>
                  </button>
                </div>
              )}
            </div>

            {/* Airline */}
            <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Airline (Optional)</p>
            <button onClick={() => setSheet('airline')} className="w-full bg-card-bg rounded-[30px] px-[14px] py-[10px] text-left mb-[12px] hover:bg-text-2/5 transition">
              <p className={`text-[13px] font-medium ${airlineLabel ? 'text-text-1' : 'text-text-2/40'}`}>{airlineLabel || 'Select your airline'}</p>
            </button>

            {/* Passengers + Cabin */}
            <div className="flex gap-[8px] mb-[12px]">
              <button onClick={() => setSheet('pax')} className="flex-1 text-left">
                <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Passengers</p>
                <div className="bg-card-bg rounded-[30px] px-[14px] py-[10px] hover:bg-text-2/5 transition">
                  <p className="text-[13px] font-medium text-text-1">{pax}</p>
                </div>
              </button>
              <button onClick={() => setSheet('pax')} className="flex-1 text-left">
                <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Cabin</p>
                <div className="bg-card-bg rounded-[30px] px-[14px] py-[10px] hover:bg-text-2/5 transition">
                  <p className="text-[13px] font-medium text-text-1">{cabinLabel}</p>
                </div>
              </button>
            </div>

            {/* Booked Price */}
            <p className="text-[11px] text-text-2/50 font-medium mb-[4px]">Booked Price</p>
            <div className="flex gap-[8px] mb-[16px]">
              <div className="bg-card-bg rounded-[30px] px-[14px] py-[10px]">
                <p className="text-[13px] font-medium text-text-1">USD</p>
              </div>
              <button onClick={() => setSheet('price')} className="flex-1 bg-card-bg rounded-[30px] px-[14px] py-[10px] text-left hover:bg-text-2/5 transition">
                <p className={`text-[13px] font-medium ${price !== '0' ? 'text-text-1' : 'text-text-2/40'}`}>{price !== '0' ? price + '.00' : '0.00'}</p>
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => valid && setSubmitted(true)}
            className={`absolute left-[20px] right-[20px] bottom-[40px] flex items-center justify-center py-[14px] rounded-[30px] transition font-medium text-[14px] gap-[6px] ${valid ? 'bg-grey/80 text-text-1 cursor-pointer hover:brightness-110' : 'bg-text-2/10 text-text-2/30 cursor-not-allowed'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Watch this flight
          </button>

          {/* Home indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1" />

          {/* Sheets */}
          <FormAirportSheet open={sheet === 'origin'} onClose={() => setSheet(null)} title="Departure Airport" selected={origin} onSelect={setOrigin} />
          <FormAirportSheet open={sheet === 'dest'} onClose={() => setSheet(null)} title="Arrival Airport" selected={dest} onSelect={setDest} />
          <FormCalendarSheet open={sheet === 'depart'} onClose={() => setSheet(null)} title="Select your departure date" selectedDay={departDay} onSelect={setDepartDay} />
          <FormCalendarSheet open={sheet === 'return'} onClose={() => setSheet(null)} title="Select your return date" selectedDay={returnDay} onSelect={setReturnDay} />
          <FormAirlineSheet open={sheet === 'airline'} onClose={() => setSheet(null)} selected={airline} onSelect={setAirline} />
          <FormPassengerSheet open={sheet === 'pax'} onClose={() => setSheet(null)} count={pax} setCount={setPax} cabin={cabin} setCabin={setCabin} />
          <FormNumberPadSheet open={sheet === 'price'} onClose={() => setSheet(null)} value={price} setValue={setPrice} />
        </>
      )}
    </div>
  )
}

/* ── Inputs Tab ─────────────────────────────────────────────── */

const INPUT_CATEGORIES = [
  {
    title: 'Text & Auth',
    desc: 'Email/phone input, OTP verification',
    items: [
      { label: 'Text Input + Toggle', render: () => <TextInputDemo /> },
      { label: 'OTP Code', render: () => <OTPDemo /> },
    ],
  },
  {
    title: 'Selection Controls',
    desc: 'Segmented controls, route picker, selector pills',
    items: [
      { label: 'Segmented Control', render: () => <SegmentedControlDemo /> },
      { label: 'Route Selector', render: () => <RouteSelectorDemo /> },
      { label: 'Selector Pill Variants', render: () => <SelectorPillDemo /> },
    ],
  },
  {
    title: 'Search Lists',
    desc: 'Bottom sheet with search and scrollable list',
    items: [
      { label: 'Airport List', render: () => <SearchListDemo /> },
      { label: 'Airline List', render: () => <AirlineListDemo /> },
    ],
  },
  {
    title: 'Steppers & Radio',
    desc: 'Counter stepper with radio options',
    items: [
      { label: 'Passengers + Cabin', render: () => <StepperSelectInput /> },
      { label: 'Guests + Bed Type', render: () => <GuestsBedDemo /> },
    ],
  },
  {
    title: 'Pickers & Pads',
    desc: 'Calendar date picker and number pad entry',
    items: [
      { label: 'Date Picker', render: () => <CalendarInput /> },
      { label: 'Number Pad', render: () => <NumberPadInput /> },
    ],
  },
  {
    title: 'Actions',
    desc: 'Multiple choice bottom sheet',
    items: [
      { label: 'Multiple Choice', render: () => <MultipleChoiceDemo /> },
    ],
  },
]

function InputsTab() {
  return (
    <div>
      <p className="text-[11px] text-text-2/40 mb-[28px]">
        13 input patterns &middot; Bottom sheet style &middot; Sourced from Figma Input page
      </p>

      {/* Interactive Flight Form */}
      <div className="mb-[48px]">
        <div className="flex items-baseline gap-[8px] mb-[16px]">
          <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em]">Flight Form</p>
          <span className="text-[10px] text-text-2/30">&middot; Interactive demo — tap any field to open its input sheet</span>
        </div>
        <div className="flex justify-center">
          <FlightFormInteractive />
        </div>
      </div>

      {/* Input component catalog */}
      {INPUT_CATEGORIES.map((cat) => (
        <div key={cat.title} className="mb-[36px]">
          <div className="flex items-baseline gap-[8px] mb-[16px]">
            <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.1em]">{cat.title}</p>
            <span className="text-[10px] text-text-2/30">&middot; {cat.desc}</span>
          </div>
          <div className="flex flex-wrap gap-[16px]">
            {cat.items.map((item) => (
              <div key={item.label}>
                <p className="text-[10px] text-text-2/40 mb-[8px] text-center">{item.label}</p>
                <div className="transform scale-[0.85] origin-top">
                  {item.render()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ComponentsTab({ components }) {
  return (
    <div className="grid grid-cols-2 gap-[16px]">
      {components.map((comp) => (
        <div
          key={comp.slug}
          className="rounded-[12px] border border-text-2/6 overflow-hidden bg-card-bg/40 hover:border-text-2/15 transition"
        >
          <div className="bg-bg flex items-center justify-center p-[16px] h-[460px] overflow-hidden">
            <div className="rounded-[12px] overflow-hidden bg-bg" style={{ width: 197, height: 426 }}>
              <iframe
                src={`/preview/component/${comp.slug}`}
                className="border-0"
                style={{ width: 393, height: 852, transform: 'scale(0.5)', transformOrigin: 'top left' }}
                title={`${comp.slug} preview`}
              />
            </div>
          </div>
          <div className="p-[16px] border-t border-text-2/6">
            <p className="text-[14px] font-medium text-text-1 mb-[4px]">{comp.name}</p>
            <p className="text-[12px] text-text-2/60 mb-[10px] leading-relaxed">{comp.description}</p>
            <div className="flex gap-[6px]">
              {comp.variants.map((v) => (
                <span key={v} className="px-[8px] py-[2px] rounded-[4px] bg-bg-2 text-[11px] text-text-2 font-medium">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main View ────────────────────────────────────────────────── */

export default function DesignSystemView() {
  const { meta, brand, colors, typography, spacing, radii, icons, components } = designSystem
  const [activeTab, setActiveTab] = useState('brand')

  return (
    <div className="h-screen bg-bg text-text-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-[20px] py-[10px] border-b border-text-2/10 shrink-0">
        <div className="flex items-center gap-[10px]">
          <Link href="/" className="text-[12px] text-text-2/60 hover:text-text-1 transition">
            Dashboard
          </Link>
          <span className="text-text-2/20">/</span>
          <div className="flex items-center gap-[8px]">
            <div className="w-[22px] h-[22px] rounded-[5px] bg-main/20 flex items-center justify-center text-main text-[10px] font-bold">
              A
            </div>
            <h1 className="text-text-1 text-[14px] font-medium">{meta.name} Design System</h1>
            <span className="text-[11px] text-text-2/40">v{meta.version}</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-[20px] pt-[8px] pb-[0px] border-b border-text-2/10 shrink-0">
        <div className="flex items-center gap-[0px]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-[16px] py-[10px] text-[13px] font-medium transition relative ${
                activeTab === tab.key
                  ? 'text-text-1'
                  : 'text-text-2/50 hover:text-text-2'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-[16px] right-[16px] h-[2px] bg-text-1 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <div className={`mx-auto px-[32px] py-[28px] ${activeTab === 'inputs' ? 'max-w-[1200px]' : 'max-w-[960px]'}`}>
          {activeTab === 'brand' && <BrandTab brand={brand} />}
          {activeTab === 'colors' && <ColorsTab colors={colors} />}
          {activeTab === 'typography' && <TypographyTab typography={typography} />}
          {activeTab === 'spacing' && <SpacingTab spacing={spacing} radii={radii} />}
          {activeTab === 'icons' && <IconsTab icons={icons} />}
          {activeTab === 'inputs' && <InputsTab />}
          {activeTab === 'components' && <ComponentsTab components={components} />}
        </div>
      </div>
    </div>
  )
}
