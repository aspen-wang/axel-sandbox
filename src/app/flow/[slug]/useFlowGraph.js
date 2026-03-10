'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export default function useFlowGraph(slug, initialGraph) {
  const [graph, setGraph] = useState(initialGraph || { nodes: [], edges: [] })
  const saveTimer = useRef(null)

  // Debounced save to API
  const scheduleSave = useCallback(
    (data) => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        fetch('/api/flow-graph', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, nodes: data.nodes, edges: data.edges }),
        })
      }, 1000)
    },
    [slug]
  )

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

  function updateNodePosition(nodeId, x, y) {
    setGraph((prev) => {
      const next = {
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, x, y } : n)),
      }
      scheduleSave(next)
      return next
    })
  }

  function addNode(node) {
    setGraph((prev) => {
      const next = { ...prev, nodes: [...prev.nodes, node] }
      scheduleSave(next)
      return next
    })
  }

  function removeNode(nodeId) {
    setGraph((prev) => {
      const next = {
        nodes: prev.nodes.filter((n) => n.id !== nodeId),
        edges: prev.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      }
      scheduleSave(next)
      return next
    })
  }

  function addEdge(edge) {
    setGraph((prev) => {
      // Prevent duplicate edges
      const exists = prev.edges.some(
        (e) => e.source === edge.source && e.target === edge.target
      )
      if (exists) return prev
      const next = { ...prev, edges: [...prev.edges, edge] }
      scheduleSave(next)
      return next
    })
  }

  function removeEdge(edgeId) {
    setGraph((prev) => {
      const next = { ...prev, edges: prev.edges.filter((e) => e.id !== edgeId) }
      scheduleSave(next)
      return next
    })
  }

  function updateNode(nodeId, fields) {
    setGraph((prev) => {
      const next = {
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, ...fields } : n)),
      }
      scheduleSave(next)
      return next
    })
  }

  function updateEdgeLabel(edgeId, label) {
    setGraph((prev) => {
      const next = {
        ...prev,
        edges: prev.edges.map((e) => (e.id === edgeId ? { ...e, label } : e)),
      }
      scheduleSave(next)
      return next
    })
  }

  return {
    graph,
    updateNodePosition,
    addNode,
    removeNode,
    updateNode,
    addEdge,
    removeEdge,
    updateEdgeLabel,
  }
}
