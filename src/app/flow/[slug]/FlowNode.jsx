'use client'

import { useState, useRef, useEffect } from 'react'
import { screens } from '@/dashboard.config'

const PHONE_W = 393
const PHONE_H = 852
const SCALE = 0.3
const SCREEN_W = Math.round(PHONE_W * SCALE)
const SCREEN_H = Math.round(PHONE_H * SCALE)
const SCREEN_R = Math.round(30 * SCALE)
const DECISION_SIZE = 100
const STAGE_W = 160
const STAGE_H = 120
const NODE_W = 140
const NODE_H = 40

const ANCHORS = ['top', 'right', 'bottom', 'left']

function getAnchorOffset(anchor, w, h) {
  switch (anchor) {
    case 'top': return { x: w / 2, y: 0 }
    case 'right': return { x: w, y: h / 2 }
    case 'bottom': return { x: w / 2, y: h }
    case 'left': return { x: 0, y: h / 2 }
  }
}

function AnchorDots({ width, height, nodeId, onAnchorDragStart, snapTarget }) {
  return ANCHORS.map((anchor) => {
    const off = getAnchorOffset(anchor, width, height)
    const isSnap = snapTarget?.nodeId === nodeId && snapTarget?.anchor === anchor
    const size = isSnap ? 14 : 10
    return (
      <div
        key={anchor}
        onPointerDown={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onAnchorDragStart?.(nodeId, anchor, e)
        }}
        className={`absolute rounded-full z-20 transition-all duration-100 ${
          isSnap
            ? 'bg-green shadow-[0_0_8px_rgba(79,198,96,0.6)]'
            : 'bg-green/70 hover:bg-green hover:scale-125'
        }`}
        style={{
          left: off.x - size / 2,
          top: off.y - size / 2,
          width: size,
          height: size,
          cursor: 'crosshair',
        }}
      />
    )
  })
}

function InlineEdit({ value, onSave, className, placeholder }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  function commit() {
    setEditing(false)
    if (draft.trim() !== value) onSave(draft.trim())
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') { setDraft(value); setEditing(false) }
        }}
        className={`bg-transparent border border-green/40 rounded-[4px] px-[4px] py-[1px] outline-none text-center w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      />
    )
  }

  return (
    <span
      onDoubleClick={(e) => { e.stopPropagation(); setDraft(value); setEditing(true) }}
      className={`cursor-default ${className} ${!value && placeholder ? 'text-text-2/40 italic' : ''}`}
    >
      {value || placeholder || ''}
    </span>
  )
}

function ScreenNode({ node, isSelected, onPointerDown, onClick, onUpdateNode, onAnchorDragStart, snapTarget, isHovered }) {
  const screenSlug = node.screenSlug || node.id
  const screen = screens.find((s) => s.slug === screenSlug)
  const isBuilt = screen && screen.component

  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      className="absolute cursor-grab active:cursor-grabbing select-none group/node"
      style={{ transform: `translate(${node.x}px, ${node.y}px)`, width: SCREEN_W }}
    >
      {/* Phone frame — IS the node */}
      <div
        className={`relative overflow-hidden transition-shadow ${
          isSelected ? 'shadow-[0_0_0_2px_#4fc660]' : 'shadow-[0_0_0_1px_rgba(71,71,71,0.5)]'
        }`}
        style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: SCREEN_R }}
      >
        {isBuilt ? (
          <iframe
            src={`/preview/screen/${screenSlug}`}
            className="pointer-events-none border-0"
            scrolling="no"
            style={{
              width: PHONE_W,
              height: PHONE_H,
              transform: `scale(${SCALE})`,
              transformOrigin: 'top left',
            }}
            tabIndex={-1}
          />
        ) : (
          <div className="w-full h-full bg-bg-2 flex flex-col items-center justify-center gap-[6px]">
            <p className="text-text-2/50 text-[10px]">Not built</p>
          </div>
        )}

        {/* Label overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-[8px] pb-[6px] pt-[20px]">
          <InlineEdit
            value={node.label}
            onSave={(val) => onUpdateNode(node.id, { label: val })}
            className="text-white text-[10px] font-medium drop-shadow"
            placeholder="Label..."
          />
        </div>
      </div>

      {/* Anchor dots — visible on hover or when being snapped to */}
      <div className={`${isHovered || isSelected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-100'} transition-opacity`}>
        <AnchorDots
          width={SCREEN_W}
          height={SCREEN_H}
          nodeId={node.id}
          onAnchorDragStart={onAnchorDragStart}
          snapTarget={snapTarget}
        />
      </div>
    </div>
  )
}

function StageNode({ node, isSelected, onPointerDown, onClick, onUpdateNode, onAssignScreen, onAnchorDragStart, snapTarget, isHovered }) {
  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      className="absolute cursor-grab active:cursor-grabbing select-none group/node"
      style={{ transform: `translate(${node.x}px, ${node.y}px)`, width: STAGE_W }}
    >
      <div
        className={`relative w-full rounded-[10px] border-2 border-dashed bg-bg-2 flex flex-col items-center justify-center gap-[6px] px-[10px] py-[12px] transition-colors ${
          isSelected ? 'border-green' : 'border-grey'
        }`}
        style={{ height: STAGE_H }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-2/40">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <InlineEdit
          value={node.label}
          onSave={(val) => onUpdateNode(node.id, { label: val })}
          className="text-text-1 text-[11px] font-medium"
          placeholder="Stage name..."
        />
        <button
          onClick={(e) => { e.stopPropagation(); onAssignScreen(node.id) }}
          className="px-[6px] py-[2px] rounded-[4px] bg-bg text-green text-[9px] font-medium hover:bg-green/10 transition"
        >
          Assign Screen
        </button>
      </div>

      <div className={`${isHovered || isSelected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-100'} transition-opacity`}>
        <AnchorDots
          width={STAGE_W}
          height={STAGE_H}
          nodeId={node.id}
          onAnchorDragStart={onAnchorDragStart}
          snapTarget={snapTarget}
        />
      </div>
    </div>
  )
}

function DecisionNode({ node, isSelected, onPointerDown, onClick, onUpdateNode, onAnchorDragStart, snapTarget, isHovered }) {
  const outerSize = DECISION_SIZE + 30
  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      className="absolute cursor-grab active:cursor-grabbing select-none group/node"
      style={{ transform: `translate(${node.x}px, ${node.y}px)`, width: outerSize }}
    >
      <div className="relative flex items-center justify-center" style={{ height: outerSize }}>
        <div
          className={`flex items-center justify-center bg-bg-2 border-2 transition-colors ${
            isSelected ? 'border-green' : 'border-grey'
          }`}
          style={{ width: DECISION_SIZE, height: DECISION_SIZE, transform: 'rotate(45deg)', borderRadius: 6 }}
        >
          <div style={{ transform: 'rotate(-45deg)' }} className="text-center px-[4px]">
            <InlineEdit
              value={node.label}
              onSave={(val) => onUpdateNode(node.id, { label: val })}
              className="text-text-1 text-[10px] font-medium"
              placeholder="Condition?"
            />
          </div>
        </div>
      </div>

      <div className={`${isHovered || isSelected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-100'} transition-opacity`}>
        <AnchorDots
          width={outerSize}
          height={outerSize}
          nodeId={node.id}
          onAnchorDragStart={onAnchorDragStart}
          snapTarget={snapTarget}
        />
      </div>
    </div>
  )
}

function ConnectorNode({ node, isSelected, onPointerDown, onClick, onUpdateNode, onAnchorDragStart, snapTarget, isHovered }) {
  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{ transform: `translate(${node.x}px, ${node.y}px)`, width: NODE_W }}
    >
      <div
        className={`relative w-full rounded-full flex items-center justify-center transition-colors ${
          isSelected ? 'bg-card-bg ring-2 ring-green' : 'bg-card-bg ring-1 ring-grey'
        }`}
        style={{ height: NODE_H }}
      >
        <InlineEdit
          value={node.label}
          onSave={(val) => onUpdateNode(node.id, { label: val })}
          className="text-text-1 text-[11px] font-medium"
          placeholder="Label..."
        />

        {/* Always-visible left dot */}
        <div
          onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); onAnchorDragStart?.(node.id, 'left', e) }}
          className={`absolute rounded-full z-20 transition-all duration-100 ${
            snapTarget?.nodeId === node.id && snapTarget?.anchor === 'left'
              ? 'bg-green shadow-[0_0_8px_rgba(79,198,96,0.6)] w-[14px] h-[14px]'
              : 'bg-green w-[10px] h-[10px] hover:scale-125'
          }`}
          style={{ left: -5, top: NODE_H / 2 - (snapTarget?.nodeId === node.id && snapTarget?.anchor === 'left' ? 7 : 5), cursor: 'crosshair' }}
        />
        {/* Always-visible right dot */}
        <div
          onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); onAnchorDragStart?.(node.id, 'right', e) }}
          className={`absolute rounded-full z-20 transition-all duration-100 ${
            snapTarget?.nodeId === node.id && snapTarget?.anchor === 'right'
              ? 'bg-green shadow-[0_0_8px_rgba(79,198,96,0.6)] w-[14px] h-[14px]'
              : 'bg-green w-[10px] h-[10px] hover:scale-125'
          }`}
          style={{ right: -5, top: NODE_H / 2 - (snapTarget?.nodeId === node.id && snapTarget?.anchor === 'right' ? 7 : 5), cursor: 'crosshair' }}
        />
        {/* Top dot — only on hover */}
        <div className={`${isHovered || isSelected ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          <div
            onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); onAnchorDragStart?.(node.id, 'top', e) }}
            className={`absolute rounded-full z-20 transition-all duration-100 ${
              snapTarget?.nodeId === node.id && snapTarget?.anchor === 'top'
                ? 'bg-green shadow-[0_0_8px_rgba(79,198,96,0.6)] w-[14px] h-[14px]'
                : 'bg-green/70 w-[10px] h-[10px] hover:bg-green hover:scale-125'
            }`}
            style={{ left: NODE_W / 2 - 5, top: -5, cursor: 'crosshair' }}
          />
          <div
            onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); onAnchorDragStart?.(node.id, 'bottom', e) }}
            className={`absolute rounded-full z-20 transition-all duration-100 ${
              snapTarget?.nodeId === node.id && snapTarget?.anchor === 'bottom'
                ? 'bg-green shadow-[0_0_8px_rgba(79,198,96,0.6)] w-[14px] h-[14px]'
                : 'bg-green/70 w-[10px] h-[10px] hover:bg-green hover:scale-125'
            }`}
            style={{ left: NODE_W / 2 - 5, bottom: -5, cursor: 'crosshair' }}
          />
        </div>
      </div>
    </div>
  )
}

export default function FlowNode(props) {
  const type = props.node.type || 'screen'
  if (type === 'node') return <ConnectorNode {...props} />
  if (type === 'decision') return <DecisionNode {...props} />
  if (type === 'stage') return <StageNode {...props} />
  return <ScreenNode {...props} />
}

// Dimensions for edge/anchor calculations
export function getNodeDimensions(node) {
  const type = node.type || 'screen'
  if (type === 'node') return { width: NODE_W, height: NODE_H }
  if (type === 'decision') return { width: DECISION_SIZE + 30, height: DECISION_SIZE + 30 }
  if (type === 'stage') return { width: STAGE_W, height: STAGE_H }
  return { width: SCREEN_W, height: SCREEN_H }
}

export function getAnchorPosition(node, anchor) {
  const dim = getNodeDimensions(node)
  const off = getAnchorOffset(anchor, dim.width, dim.height)
  return { x: node.x + off.x, y: node.y + off.y }
}

export { SCREEN_W, SCREEN_H, STAGE_W, STAGE_H, DECISION_SIZE, NODE_W, NODE_H, ANCHORS }
