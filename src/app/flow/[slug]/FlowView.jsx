'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import useFlowGraph from './useFlowGraph'
import FlowchartView from './FlowchartView'
import PagesView from './PagesView'
import PrototypeView from './PrototypeView'

const VIEWS = ['Flowchart', 'Pages', 'Prototype']

export default function FlowView({ flow, initialGraph, initialView, iterations }) {
  const [view, setView] = useState(
    initialView === 'prototype' ? 'Prototype' : initialView === 'pages' ? 'Pages' : 'Flowchart'
  )
  const [screenVersion, setScreenVersion] = useState(null) // null = main (A)
  const flowGraph = useFlowGraph(flow.slug, initialGraph)

  // Collect versions for the flow's interactive screen (e.g. trip-flow-interactive)
  const flowVersions = useMemo(() => {
    const interactiveSlug = flow.steps.find((s) => s.endsWith('-interactive'))
    if (!interactiveSlug || !iterations) return []
    const iterKey = `screen:${interactiveSlug}`
    return iterations[iterKey]?.versions || []
  }, [flow.steps, iterations])

  // Keyboard shortcuts: 1/2/3 to switch views
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === '1') setView('Flowchart')
      else if (e.key === '2') setView('Pages')
      else if (e.key === '3') setView('Prototype')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prototype renders full-screen, bypassing normal layout
  if (view === 'Prototype') {
    return (
      <PrototypeView
        flow={flow}
        graph={flowGraph.graph}
        onClose={() => setView('Flowchart')}
      />
    )
  }

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-[24px] py-[16px] shrink-0">
        <Link href="/" className="text-text-2 text-[13px] hover:text-text-1 transition">
          &larr; Dashboard
        </Link>
        <div className="flex items-center gap-[12px]">
          <p className="text-text-1 text-[14px] font-medium">{flow.name}</p>
          {/* Version switcher — shown when interactive screen has multiple versions */}
          {flowVersions.length > 1 && (
            <div className="flex items-center bg-[#111] rounded-[6px] p-[2px]">
              {flowVersions.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setScreenVersion(v.label === 'A' ? null : v.label)}
                  className={`px-[10px] py-[3px] rounded-[4px] text-[11px] font-medium transition ${
                    (screenVersion || 'A') === v.label
                      ? 'bg-card-bg text-text-1'
                      : 'text-text-2/40 hover:text-text-1'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* View switcher */}
        <div className="flex items-center bg-bg-2 rounded-[8px] p-[2px]">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-[12px] py-[6px] rounded-[6px] text-[12px] font-medium transition ${
                view === v
                  ? 'bg-card-bg text-text-1'
                  : 'text-text-2 hover:text-text-1'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {view === 'Flowchart' && (
          <FlowchartView flow={flow} flowGraph={flowGraph} />
        )}
        {view === 'Pages' && (
          <PagesView flow={flow} graph={flowGraph.graph} screenVersion={screenVersion} />
        )}
      </div>
    </div>
  )
}
