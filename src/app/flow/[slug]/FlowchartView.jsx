'use client'

import { useState, useRef, useCallback } from 'react'
import { screens } from '@/dashboard.config'
import FlowNode, { getNodeDimensions, getAnchorPosition, ANCHORS } from './FlowNode'
import FlowEdge, { DraftEdge } from './FlowEdge'
import FlowToolbar from './FlowToolbar'

const SNAP_RADIUS = 30

export default function FlowchartView({ flow, flowGraph }) {
  const { graph, updateNodePosition, addNode, removeNode, updateNode, addEdge, removeEdge, updateEdgeLabel } = flowGraph
  const [selectedId, setSelectedId] = useState(null)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [assigningNodeId, setAssigningNodeId] = useState(null)
  const [edgeDraft, setEdgeDraft] = useState(null) // { sourceId, sourceAnchor, x, y }
  const [snapTarget, setSnapTarget] = useState(null) // { nodeId, anchor }
  const dragRef = useRef(null)
  const containerRef = useRef(null)

  const placedScreenSlugs = new Set(
    graph.nodes.filter((n) => n.type === 'screen' && n.screenSlug).map((n) => n.screenSlug)
  )
  const unplacedScreens = screens.filter((s) => !placedScreenSlugs.has(s.slug))

  // --- Find nearest anchor for snapping ---
  function findSnapTarget(mx, my, excludeNodeId) {
    let best = null
    let bestDist = SNAP_RADIUS
    for (const node of graph.nodes) {
      if (node.id === excludeNodeId) continue
      for (const anchor of ANCHORS) {
        const pos = getAnchorPosition(node, anchor)
        const d = Math.hypot(mx - pos.x, my - pos.y)
        if (d < bestDist) {
          bestDist = d
          best = { nodeId: node.id, anchor }
        }
      }
    }
    return best
  }

  // --- Anchor drag (edge creation) ---
  const handleAnchorDragStart = useCallback((nodeId, anchor, e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const scrollLeft = containerRef.current.scrollLeft
    const scrollTop = containerRef.current.scrollTop
    const startX = e.clientX - rect.left + scrollLeft
    const startY = e.clientY - rect.top + scrollTop

    setEdgeDraft({ sourceId: nodeId, sourceAnchor: anchor, x: startX, y: startY })
    setSnapTarget(null)

    function onMove(ev) {
      const mx = ev.clientX - rect.left + containerRef.current.scrollLeft
      const my = ev.clientY - rect.top + containerRef.current.scrollTop
      setEdgeDraft((prev) => prev ? { ...prev, x: mx, y: my } : null)
      setSnapTarget(findSnapTarget(mx, my, nodeId))
    }

    function onUp(ev) {
      const mx = ev.clientX - rect.left + containerRef.current.scrollLeft
      const my = ev.clientY - rect.top + containerRef.current.scrollTop
      const snap = findSnapTarget(mx, my, nodeId)
      if (snap) {
        const edgeId = `e_${nodeId}_${anchor}_${snap.nodeId}_${snap.anchor}_${Date.now()}`
        addEdge({
          id: edgeId,
          source: nodeId,
          target: snap.nodeId,
          sourceAnchor: anchor,
          targetAnchor: snap.anchor,
          label: '',
        })
      }
      setEdgeDraft(null)
      setSnapTarget(null)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [graph.nodes, addEdge])

  // --- Node drag ---
  const handlePointerDown = useCallback((nodeId, e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return
    e.preventDefault()
    const node = graph.nodes.find((n) => n.id === nodeId)
    if (!node) return

    const rect = containerRef.current.getBoundingClientRect()
    const scrollLeft = containerRef.current.scrollLeft
    const scrollTop = containerRef.current.scrollTop
    const offsetX = e.clientX - rect.left + scrollLeft - node.x
    const offsetY = e.clientY - rect.top + scrollTop - node.y
    dragRef.current = { nodeId, offsetX, offsetY, moved: false }

    function onMove(ev) {
      if (!dragRef.current) return
      dragRef.current.moved = true
      const x = ev.clientX - rect.left + containerRef.current.scrollLeft - dragRef.current.offsetX
      const y = ev.clientY - rect.top + containerRef.current.scrollTop - dragRef.current.offsetY
      updateNodePosition(dragRef.current.nodeId, Math.max(0, x), Math.max(0, y))
    }

    function onUp() {
      dragRef.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [graph.nodes, updateNodePosition])

  // --- Click ---
  function handleNodeClick(nodeId, e) {
    if (dragRef.current?.moved) return
    setSelectedId(nodeId)
  }

  function handleCanvasClick(e) {
    if (e.target === containerRef.current || e.target.tagName === 'svg') {
      setSelectedId(null)
      setShowAddMenu(false)
      setAssigningNodeId(null)
    }
  }

  // --- Add node ---
  function getNextPosition() {
    const maxX = graph.nodes.reduce((max, n) => Math.max(max, n.x), 0)
    return { x: maxX + 200, y: 150 }
  }

  function handleAddScreen(screen) {
    const pos = getNextPosition()
    addNode({ id: screen.slug, type: 'screen', x: pos.x, y: pos.y, label: screen.name, description: '', screenSlug: screen.slug })
    setShowAddMenu(false)
  }

  function handleAddStage() {
    const pos = getNextPosition()
    addNode({ id: `stage_${Date.now()}`, type: 'stage', x: pos.x, y: pos.y, label: 'New Stage', description: '', screenSlug: null })
    setShowAddMenu(false)
  }

  function handleAddDecision() {
    const pos = getNextPosition()
    addNode({ id: `decision_${Date.now()}`, type: 'decision', x: pos.x, y: pos.y, label: 'Condition?', description: '', screenSlug: null })
    setShowAddMenu(false)
  }

  function handleAddConnector() {
    const pos = getNextPosition()
    addNode({ id: `node_${Date.now()}`, type: 'node', x: pos.x, y: pos.y, label: 'New Node', description: '', screenSlug: null })
    setShowAddMenu(false)
  }

  function handleAssignScreen(nodeId) { setAssigningNodeId(nodeId) }

  function confirmAssignScreen(screen) {
    if (!assigningNodeId) return
    updateNode(assigningNodeId, { type: 'screen', screenSlug: screen.slug, label: screen.name })
    setAssigningNodeId(null)
  }

  // Canvas size
  const canvasWidth = Math.max(1200, ...graph.nodes.map((n) => n.x + getNodeDimensions(n).width + 100))
  const canvasHeight = Math.max(600, ...graph.nodes.map((n) => n.y + getNodeDimensions(n).height + 100))

  const selectedNode = graph.nodes.find((n) => n.id === selectedId)
  const draftSourceNode = edgeDraft ? graph.nodes.find((n) => n.id === edgeDraft.sourceId) : null

  return (
    <div ref={containerRef} className="relative w-full overflow-auto flex-1" onClick={handleCanvasClick}>
      {/* Add Node button */}
      <div className="sticky top-[16px] float-right mr-[24px] z-30">
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="px-[12px] py-[6px] rounded-[8px] bg-bg-2 text-green text-[12px] font-medium hover:bg-green/10 transition"
          >
            Add Node +
          </button>
          {showAddMenu && (
            <div className="absolute top-full right-0 mt-[4px] bg-card-bg border border-grey rounded-[8px] py-[4px] min-w-[180px] shadow-lg">
              <button onClick={handleAddConnector} className="w-full text-left px-[12px] py-[8px] text-[12px] text-text-2 hover:text-text-1 hover:bg-bg-2 transition flex items-center gap-[8px]">
                <span className="text-[14px]">&#9679;</span> Connector
              </button>
              <button onClick={handleAddStage} className="w-full text-left px-[12px] py-[8px] text-[12px] text-text-2 hover:text-text-1 hover:bg-bg-2 transition flex items-center gap-[8px]">
                <span className="text-[14px]">&#9634;</span> Stage
              </button>
              <button onClick={handleAddDecision} className="w-full text-left px-[12px] py-[8px] text-[12px] text-text-2 hover:text-text-1 hover:bg-bg-2 transition flex items-center gap-[8px]">
                <span className="text-[14px]">&#9670;</span> Decision
              </button>
              {unplacedScreens.length > 0 && (
                <>
                  <div className="border-t border-grey my-[4px]" />
                  <p className="px-[12px] py-[4px] text-[10px] text-text-2/50 uppercase tracking-wider">Screens</p>
                  {unplacedScreens.map((s) => (
                    <button key={s.slug} onClick={() => handleAddScreen(s)} className="w-full text-left px-[12px] py-[8px] text-[12px] text-text-2 hover:text-text-1 hover:bg-bg-2 transition">
                      {s.name}
                      {!s.component && <span className="ml-[8px] text-text-2/50 text-[10px]">(unbuilt)</span>}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Assign Screen modal */}
      {assigningNodeId && (
        <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-40 bg-card-bg border border-grey rounded-[12px] py-[8px] min-w-[200px] shadow-lg">
          <p className="px-[12px] py-[4px] text-[11px] text-text-2 font-medium">Assign a screen:</p>
          {unplacedScreens.length === 0 ? (
            <p className="px-[12px] py-[8px] text-[11px] text-text-2/50">No unassigned screens</p>
          ) : (
            unplacedScreens.map((s) => (
              <button key={s.slug} onClick={() => confirmAssignScreen(s)} className="w-full text-left px-[12px] py-[8px] text-[12px] text-text-2 hover:text-text-1 hover:bg-bg-2 transition">
                {s.name}
              </button>
            ))
          )}
          <div className="border-t border-grey mt-[4px] pt-[4px]">
            <button onClick={() => setAssigningNodeId(null)} className="w-full text-left px-[12px] py-[6px] text-[11px] text-text-2/50 hover:text-text-2 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
        {/* SVG for edges */}
        <svg className="absolute inset-0 pointer-events-none" width={canvasWidth} height={canvasHeight}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4fc660" />
            </marker>
          </defs>
          {graph.edges.map((edge) => (
            <FlowEdge
              key={edge.id}
              edge={edge}
              sourceNode={graph.nodes.find((n) => n.id === edge.source)}
              targetNode={graph.nodes.find((n) => n.id === edge.target)}
              onUpdateEdgeLabel={updateEdgeLabel}
              onRemoveEdge={removeEdge}
            />
          ))}
          {/* Draft edge while dragging */}
          {edgeDraft && draftSourceNode && (
            <DraftEdge
              sourceNode={draftSourceNode}
              sourceAnchor={edgeDraft.sourceAnchor}
              mouseX={snapTarget ? getAnchorPosition(graph.nodes.find((n) => n.id === snapTarget.nodeId), snapTarget.anchor).x : edgeDraft.x}
              mouseY={snapTarget ? getAnchorPosition(graph.nodes.find((n) => n.id === snapTarget.nodeId), snapTarget.anchor).y : edgeDraft.y}
            />
          )}
        </svg>

        {/* Nodes */}
        {graph.nodes.map((node) => (
          <FlowNode
            key={node.id}
            node={node}
            isSelected={selectedId === node.id}
            isHovered={snapTarget?.nodeId === node.id || edgeDraft?.sourceId === node.id}
            onPointerDown={(e) => handlePointerDown(node.id, e)}
            onClick={(e) => handleNodeClick(node.id, e)}
            onUpdateNode={updateNode}
            onAssignScreen={handleAssignScreen}
            onAnchorDragStart={handleAnchorDragStart}
            snapTarget={snapTarget}
          />
        ))}
      </div>

      {/* Toolbar */}
      {selectedId && (
        <FlowToolbar
          node={selectedNode}
          onRemove={() => { removeNode(selectedId); setSelectedId(null) }}
          onDeselect={() => setSelectedId(null)}
          onAssignScreen={() => handleAssignScreen(selectedId)}
        />
      )}
    </div>
  )
}
