'use client'

import { useState, useRef, useEffect } from 'react'
import { getNodeDimensions, getAnchorPosition } from './FlowNode'

function getControlOffset(anchor, dist) {
  const d = Math.max(40, dist * 0.35)
  switch (anchor) {
    case 'top': return { x: 0, y: -d }
    case 'right': return { x: d, y: 0 }
    case 'bottom': return { x: 0, y: d }
    case 'left': return { x: -d, y: 0 }
  }
}

function buildPath(sx, sy, sAnchor, tx, ty, tAnchor) {
  const dist = Math.hypot(tx - sx, ty - sy)
  const sc = getControlOffset(sAnchor, dist)
  const tc = getControlOffset(tAnchor, dist)
  return `M ${sx} ${sy} C ${sx + sc.x} ${sy + sc.y}, ${tx + tc.x} ${ty + tc.y}, ${tx} ${ty}`
}

export function DraftEdge({ sourceNode, sourceAnchor, mouseX, mouseY }) {
  if (!sourceNode) return null
  const src = getAnchorPosition(sourceNode, sourceAnchor)
  const dist = Math.hypot(mouseX - src.x, mouseY - src.y)
  const sc = getControlOffset(sourceAnchor, dist)

  // For draft edge, guess target anchor based on direction
  const dx = mouseX - src.x
  const dy = mouseY - src.y
  let guessAnchor = 'left'
  if (Math.abs(dx) > Math.abs(dy)) {
    guessAnchor = dx > 0 ? 'left' : 'right'
  } else {
    guessAnchor = dy > 0 ? 'top' : 'bottom'
  }
  const tc = getControlOffset(guessAnchor, dist)

  const pathD = `M ${src.x} ${src.y} C ${src.x + sc.x} ${src.y + sc.y}, ${mouseX + tc.x} ${mouseY + tc.y}, ${mouseX} ${mouseY}`

  return (
    <path
      d={pathD}
      fill="none"
      stroke="#4fc660"
      strokeWidth={2}
      strokeDasharray="6 4"
      opacity={0.7}
    />
  )
}

export default function FlowEdge({ edge, sourceNode, targetNode, onUpdateEdgeLabel, onRemoveEdge }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(edge.label || '')
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  if (!sourceNode || !targetNode) return null

  const sAnchor = edge.sourceAnchor || 'right'
  const tAnchor = edge.targetAnchor || 'left'
  const src = getAnchorPosition(sourceNode, sAnchor)
  const tgt = getAnchorPosition(targetNode, tAnchor)
  const pathD = buildPath(src.x, src.y, sAnchor, tgt.x, tgt.y, tAnchor)

  // Midpoint for label
  const mx = (src.x + tgt.x) / 2
  const my = (src.y + tgt.y) / 2

  function commit() {
    setEditing(false)
    if (onUpdateEdgeLabel && draft !== (edge.label || '')) {
      onUpdateEdgeLabel(edge.id, draft)
    }
  }

  function startEdit(e) {
    e.stopPropagation()
    setDraft(edge.label || '')
    setEditing(true)
  }

  return (
    <g>
      {/* Invisible fat path for easier interaction */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
        onClick={(e) => e.stopPropagation()}
      />
      <path
        d={pathD}
        fill="none"
        stroke="#4fc660"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
      />
      <foreignObject x={mx - 60} y={my - 14} width={120} height={28} style={{ pointerEvents: 'auto' }}>
        <div className="flex items-center justify-center gap-[4px]">
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                if (e.key === 'Escape') { setDraft(edge.label || ''); setEditing(false) }
              }}
              className="bg-card-bg border border-green/40 rounded-[4px] px-[6px] py-[1px] text-text-1 text-[10px] outline-none text-center w-[80px]"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            />
          ) : edge.label ? (
            <>
              <span
                onDoubleClick={startEdit}
                className="bg-bg px-[6px] py-[2px] rounded-[4px] text-text-2 text-[10px] whitespace-nowrap cursor-default"
              >
                {edge.label}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveEdge?.(edge.id) }}
                className="bg-bg rounded-full w-[16px] h-[16px] flex items-center justify-center text-text-2/50 hover:text-red hover:bg-red/10 transition text-[10px]"
              >
                &times;
              </button>
            </>
          ) : (
            <>
              <span
                onClick={startEdit}
                onDoubleClick={startEdit}
                className="bg-bg-2 px-[6px] py-[1px] rounded-[4px] text-text-2/40 text-[10px] cursor-pointer hover:text-text-2 hover:bg-bg transition"
              >
                +
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveEdge?.(edge.id) }}
                className="bg-bg rounded-full w-[16px] h-[16px] flex items-center justify-center text-text-2/30 hover:text-red hover:bg-red/10 transition text-[10px]"
              >
                &times;
              </button>
            </>
          )}
        </div>
      </foreignObject>
    </g>
  )
}
