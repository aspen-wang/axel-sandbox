'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import StatusBadge from '@/dashboard/StatusBadge'
import { componentScreenMap, fileMappings } from '@/dashboard.config'

const PHONE_W = 393
const PHONE_H = 852
const PHONE_R = 30

const SIDEBAR_TABS = [
  { key: 'flows', label: 'Flows' },
  { key: 'components', label: 'Components' },
]

function parseFigmaUrl(url) {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('figma.com')) return null
    const parts = u.pathname.split('/').filter(Boolean)
    const typeIdx = parts.findIndex((p) => p === 'design' || p === 'file')
    let fileKey = null, fileName = null
    if (typeIdx >= 0 && parts[typeIdx + 1]) {
      fileKey = parts[typeIdx + 1]
      if (parts[typeIdx + 2]) fileName = decodeURIComponent(parts[typeIdx + 2]).replace(/-/g, ' ')
    }
    const nodeId = u.searchParams.get('node-id')
    return { fileKey, fileName, nodeId, name: fileName || 'Figma page' }
  } catch { return null }
}

function loadDeleted() {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem('axel-deleted-items')) || [] } catch { return [] }
}

export default function DashboardShell({ screens, flows, components, iterations: initialIterations }) {
  const [iterations, setLocalIterations] = useState(initialIterations)
  const [selectedType, setSelectedType] = useState('flow') // 'screen' | 'flow' | 'component'
  const [selectedSlug, setSelectedSlug] = useState(null)
  const [collapsedFlows, setCollapsedFlows] = useState(() => Object.fromEntries(flows.map((f) => [f.slug, true])))
  const [researchCollapsed, setResearchCollapsed] = useState(false)
  const [sidebarTab, setSidebarTab] = useState('sandbox')
  const [flowOverview, setFlowOverview] = useState(false)
  const [screenVersion, setScreenVersion] = useState(null) // null = main (A), or 'B', 'C', etc.

  // Component batch selection
  const [compSelection, setCompSelection] = useState(new Set())
  const [compSelectMode, setCompSelectMode] = useState(false)
  const [exportModalBatch, setExportModalBatch] = useState(null) // { slugs, name }

  // Deleted items — soft deletes in localStorage (trash), permanent in server JSON
  const [deletedItems, setDeletedItems] = useState([]) // trash (restorable)
  const [permanentlyDeleted, setPermanentlyDeleted] = useState([]) // server-persisted
  const [deletedLoaded, setDeletedLoaded] = useState(false)

  // Load from localStorage + server on mount
  useEffect(() => {
    setDeletedItems(loadDeleted())
    fetch('/api/deleted-items').then((r) => r.json()).then((items) => {
      setPermanentlyDeleted(items)
      setDeletedLoaded(true)
    }).catch(() => {
      setDeletedLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (deletedLoaded) localStorage.setItem('axel-deleted-items', JSON.stringify(deletedItems))
  }, [deletedItems, deletedLoaded])

  const isDeleted = (type, slug) =>
    deletedItems.some((d) => d.type === type && d.slug === slug) ||
    permanentlyDeleted.some((d) => d.type === type && d.slug === slug)

  // Delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState(null) // { type, slug, name, isMainVariant?, versions? }

  // Trash bin panel
  const [trashOpen, setTrashOpen] = useState(false)

  function requestDelete(type, slug, name) {
    setDeleteConfirm({ type, slug, name })
  }

  function confirmDelete() {
    if (!deleteConfirm) return
    const { type, slug, name } = deleteConfirm
    setDeletedItems((prev) => [...prev, { type, slug }])

    // Clear selection if the deleted item is currently selected
    let shouldClear = selectedType === type && selectedSlug === slug
    // If deleting a flow, also clear if the selected screen is inside that flow
    if (type === 'flow' && selectedType === 'screen') {
      const flow = flows.find((f) => f.slug === slug)
      if (flow && flow.steps.includes(selectedSlug)) {
        shouldClear = true
      }
    }
    if (shouldClear) setSelectedSlug(null)

    setDeleteConfirm(null)
    showToast(`Deleted "${name}"`, 'success')
  }

  function undoDelete() {
    setDeletedItems((prev) => prev.slice(0, -1))
  }

  function getDeletedName(item) {
    if (item.type === 'flow') return flows.find((f) => f.slug === item.slug)?.name || item.slug
    if (item.type === 'screen') return screens.find((s) => s.slug === item.slug)?.name || item.slug
    if (item.type === 'component') return components.find((c) => c.slug === item.slug)?.name || item.slug
    return item.slug
  }

  function restoreItem(type, slug) {
    setDeletedItems((prev) => prev.filter((d) => !(d.type === type && d.slug === slug)))
  }

  async function deleteVariant(type, slug, label) {
    try {
      const res = await fetch('/api/iterations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, slug, label }),
      })
      const data = await res.json()
      if (data.deleted) {
        showToast(`Deleted variant ${label} of ${slug}`)
        const iterRes = await fetch('/api/iterations')
        const newIterations = await iterRes.json()
        setLocalIterations(newIterations)
      } else {
        showToast(data.error || 'Failed to delete variant', 'error')
      }
    } catch {
      showToast('Failed to delete variant', 'error')
    }
  }

  async function setMainVariant(type, slug, label) {
    try {
      const res = await fetch('/api/iterations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, slug, label }),
      })
      const data = await res.json()
      if (data.ok) {
        showToast(`Set variant ${label} as main`)
        const iterRes = await fetch('/api/iterations')
        const newIterations = await iterRes.json()
        setLocalIterations(newIterations)
      } else {
        showToast(data.error || 'Failed to set main', 'error')
      }
    } catch {
      showToast('Failed to set main', 'error')
    }
  }

  // Delete main variant: promote next variant, then trash the component's old main
  async function deleteMainAndPromote() {
    if (!deleteConfirm) return
    const { type, slug, versions } = deleteConfirm
    // Find next non-main version to promote
    const next = versions?.find((v) => !v.isMain)
    if (next) {
      await setMainVariant(type, slug, next.label)
    }
    // Now delete old main variant (A) — it's been archived by setMainVariant
    setDeleteConfirm(null)
    showToast(`Promoted ${next?.label || 'next'} to main, old main archived`)
  }

  function emptyTrash() {
    // Persist to server so they never come back
    fetch('/api/deleted-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: deletedItems }),
    }).then((r) => r.json()).then(() => {
      // Erase actual files from code
      return fetch('/api/deleted-items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: deletedItems }),
      })
    }).then((r) => r.json()).then((data) => {
      setPermanentlyDeleted((prev) => {
        const merged = [...prev]
        for (const item of deletedItems) {
          if (!merged.some((e) => e.type === item.type && e.slug === item.slug)) merged.push(item)
        }
        return merged
      })
      setDeletedItems([])
      setTrashOpen(false)
      const n = data.filesDeleted || 0
      showToast(`Trash emptied — ${n} file${n !== 1 ? 's' : ''} erased from code`)
    }).catch(() => {
      showToast('Failed to erase items', 'error')
    })
  }

  // Right sidebar state
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [figmaNickname, setFigmaNickname] = useState('')
  const [figmaUrl, setFigmaUrl] = useState('')
  const [figmaLink, setFigmaLink] = useState(null) // { nickname, url, linkedAt }
  const [syncStatus, setSyncStatus] = useState('never') // 'synced' | 'outdated' | 'never'
  const [lastSynced, setLastSynced] = useState(null)
  const [collapsedPanels, setCollapsedPanels] = useState({})

  // Load figma link from disk on mount
  useEffect(() => {
    fetch('/api/figma-link')
      .then((r) => r.json())
      .then((data) => { if (data && data.nickname) setFigmaLink(data) })
      .catch(() => {})
  }, [])

  // Export state
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [exportModalFlow, setExportModalFlow] = useState(null) // null = current selection, or { slug, name, steps }
  const [figmaPages, setFigmaPages] = useState([])
  const [exportTargetPage, setExportTargetPage] = useState('')
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false)
  const [exportStatus, setExportStatus] = useState('never') // 'exported' | 'modified' | 'never'
  const [lastExported, setLastExported] = useState(null)
  const [exporting, setExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(null) // { step, current, total, error }
  const [exportAllVariants, setExportAllVariants] = useState(false)

  // Toast state
  const [toast, setToast] = useState(null) // { message, type: 'success' | 'error', undo?: boolean }

  // Claude Code state
  const [claudePrompt, setClaudePrompt] = useState('')
  const [claudeStatus, setClaudeStatus] = useState('idle') // 'idle' | 'running' | 'done' | 'error'
  const [claudeOutput, setClaudeOutput] = useState('')
  const [iterationCount, setIterationCount] = useState(1) // how many iterations to generate
  const [claudeProgress, setClaudeProgress] = useState(null) // { current, total }

  // Walkthrough copy editor
  const [wtCopy, setWtCopy] = useState(null) // array of { headline, subtext, cta }
  const [wtSaving, setWtSaving] = useState(false)
  const [wtSaved, setWtSaved] = useState(false)
  const wtIframeRef = useRef(null)
  // Undo/redo history — max 7 entries
  const [wtHistory, setWtHistory] = useState([]) // array of copy snapshots
  const [wtHistoryIdx, setWtHistoryIdx] = useState(-1) // pointer into wtHistory

  // Load figma pages (live from Figma API) + pool status
  useEffect(() => {
    fetch('/api/figma-pages')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setFigmaPages(d)
      })
      .catch(() => {})
  }, [])

  const showToast = useCallback((message, type = 'success', undo = false) => {
    setToast({ message, type, undo })
    setTimeout(() => setToast(null), 4000)
  }, [])

  // Load walkthrough copy when walkthrough screen is selected
  const isWalkthrough = selectedType === 'screen' && selectedSlug === 'walkthrough'
  useEffect(() => {
    if (!isWalkthrough) return
    fetch('/api/walkthrough-copy')
      .then((r) => r.json())
      .then((data) => {
        setWtCopy(data)
        setWtHistory([data])
        setWtHistoryIdx(0)
      })
      .catch(() => {})
  }, [isWalkthrough])

  // Listen for inline save confirmations from the walkthrough iframe
  useEffect(() => {
    function onMsg(e) {
      if (e.data?.type === 'wt-copy-saved') {
        setWtCopy(e.data.copy)
        pushWtHistory(e.data.copy)
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  function pushWtHistory(snapshot) {
    setWtHistory((prev) => {
      const trimmed = prev.slice(0, wtHistoryIdx + 1) // drop any redo states
      const next = [...trimmed, snapshot].slice(-7) // keep max 7
      setWtHistoryIdx(next.length - 1)
      return next
    })
  }

  async function saveWtCopy(next, skipHistory = false) {
    setWtSaving(true)
    setWtSaved(false)
    try {
      await fetch('/api/walkthrough-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
      wtIframeRef.current?.contentWindow?.postMessage({ type: 'wt-copy', copy: next }, '*')
      if (!skipHistory) pushWtHistory(next)
      setWtSaved(true)
      setTimeout(() => setWtSaved(false), 2000)
    } finally {
      setWtSaving(false)
    }
  }

  function updateWtField(index, field, value) {
    const next = (wtCopy || []).map((s, i) => i === index ? { ...s, [field]: value } : s)
    setWtCopy(next)
  }

  async function undoWt() {
    if (wtHistoryIdx <= 0) return
    const newIdx = wtHistoryIdx - 1
    setWtHistoryIdx(newIdx)
    const snapshot = wtHistory[newIdx]
    setWtCopy(snapshot)
    await saveWtCopy(snapshot, true)
  }

  async function redoWt() {
    if (wtHistoryIdx >= wtHistory.length - 1) return
    const newIdx = wtHistoryIdx + 1
    setWtHistoryIdx(newIdx)
    const snapshot = wtHistory[newIdx]
    setWtCopy(snapshot)
    await saveWtCopy(snapshot, true)
  }

  // Cmd+Z / Cmd+Shift+Z keyboard shortcuts when walkthrough is open
  useEffect(() => {
    if (!isWalkthrough) return
    function onKey(e) {
      if (!e.metaKey && !e.ctrlKey) return
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undoWt() }
      if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redoWt() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isWalkthrough, wtHistoryIdx, wtHistory])

  async function handleExport() {
    setExporting(true)
    setExportProgress(null)
    try {
      const isFlowExport = !!exportModalFlow
      const isFlowOverviewExport = isFlowExport && flowOverview
      const isVariantExport = exportAllVariants && selectedType === 'component' && !exportModalFlow && !exportModalBatch
      const isBatchExport = !!exportModalBatch || isVariantExport

      const targetPageName = exportTargetPage
      if (!targetPageName) throw new Error('Select a Figma page first')

      // Resolve the page name to its Figma node ID
      const targetPage = figmaPages.find((p) => p.name === targetPageName)
      if (!targetPage) throw new Error('Page not found')
      const pageNodeId = targetPage.id

      const origin = window.location.origin

      // Build the capture URL based on export type
      let captureUrl
      let captureLabel
      let captureDelay = 3000

      if (isBatchExport) {
        const batchSlugs = isVariantExport ? [selectedSlug] : exportModalBatch.slugs
        captureUrl = `${origin}/preview/component-export?slugs=${batchSlugs.join(',')}`
        captureLabel = isVariantExport ? selectedName : `${batchSlugs.length} components`
        captureDelay = 5000
      } else if (isFlowOverviewExport) {
        captureUrl = `${origin}/preview/flow-export/${exportModalFlow.slug}`
        captureLabel = exportModalFlow.name
        captureDelay = 5000
      } else if (isFlowExport) {
        // Individual flow screens — export each one
        captureUrl = null // handled in loop below
        captureLabel = exportModalFlow.name
      } else if (selectedType === 'component') {
        captureUrl = `${origin}/preview/component-export?slugs=${selectedSlug}`
        captureLabel = selectedName
      } else {
        captureUrl = `${origin}/screen/${selectedSlug}`
        captureLabel = selectedName
      }

      // For multi-screen flow exports, capture each screen separately
      const urls = captureUrl ? [captureUrl] : exportModalFlow.steps.map((s) => `${origin}/screen/${s}`)
      const total = urls.length

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i]
        const screenName = total > 1
          ? (screens.find((s) => s.slug === exportModalFlow.steps[i])?.name || exportModalFlow.steps[i])
          : captureLabel

        setExportProgress({ step: 'capturing', current: i + 1, total, screenName })

        // Get a capture ID from the pool
        const poolRes = await fetch('/api/capture-pool', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageNodeId }),
        })
        if (!poolRes.ok) {
          const err = await poolRes.json()
          throw new Error(err.error || 'No capture IDs available — ask Claude to generate more')
        }
        const { captureId, endpoint } = await poolRes.json()

        // Build hash params for the Figma capture script
        const hash = `#figmacapture=${captureId}&figmaendpoint=${encodeURIComponent(endpoint)}&figmadelay=${captureDelay}`

        // Open in a popup — the capture.js script in the layout auto-captures
        const popup = window.open(url + hash, '_blank', 'width=500,height=900,left=100,top=100')

        // Wait for the capture to complete, then close the popup
        await new Promise((r) => setTimeout(r, captureDelay + 3000))
        try { popup?.close() } catch {}

        if (total > 1 && i < urls.length - 1) {
          await new Promise((r) => setTimeout(r, 500))
        }
      }

      setExportProgress({ step: 'done', current: total, total })
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setExportStatus('exported')
      setLastExported(now)

      await new Promise((r) => setTimeout(r, 1500))
      setExportModalOpen(false)
      setExportModalFlow(null)
      setExportModalBatch(null)
      setExportProgress(null)
      if (isBatchExport && !isVariantExport) {
        setCompSelectMode(false)
        setCompSelection(new Set())
      }
      setExportAllVariants(false)
      showToast(
        isVariantExport
          ? `Exported "${selectedName}" (all variants) to Figma`
          : isBatchExport
          ? `Exported ${exportModalBatch.slugs.length} components to Figma`
          : isFlowExport
            ? isFlowOverviewExport
              ? `Exported "${exportModalFlow.name}" flow section to Figma`
              : `Exported "${exportModalFlow.name}" (${exportModalFlow.steps.length} screens) to Figma`
            : `Exported "${selectedName}" to Figma`
      )
    } catch (err) {
      setExportProgress({ step: 'error', error: err.message || 'Export failed' })
    } finally {
      setExporting(false)
    }
  }

  function openExportModal(flowOverride) {
    const flow = flowOverride || null
    setExportModalFlow(flow)
    setExportAllVariants(false)
    setExportModalOpen(true)
  }

  // Resolve current selection to a file path
  function getComponentPath() {
    const key = selectedType === 'component'
      ? `component:${selectedSlug}`
      : `screen:${selectedSlug}`
    const mapping = fileMappings[key]
    if (!mapping) return null
    return `${mapping.dir}/${mapping.baseName}.jsx`
  }

  async function runClaude() {
    const prompt = claudePrompt.trim()
    if (!prompt) return

    const componentPath = getComponentPath()
    const componentName = selectedName
    const count = iterationCount

    setClaudeStatus('running')
    setClaudeOutput('')
    setClaudeProgress(count > 1 ? { current: 0, total: count } : null)

    try {
      if (count <= 1) {
        // Single iteration — same as before
        const res = await fetch('/api/claude', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, componentPath, componentName }),
        })
        const data = await res.json()
        if (data.success) {
          setClaudeStatus('done')
          setClaudeOutput(data.output)
          setClaudePrompt('')
        } else {
          setClaudeStatus('error')
          setClaudeOutput(data.error || 'Unknown error')
        }
      } else {
        // Multiple iterations — create N versions, run Claude on each
        const iterKey = selectedType === 'component' ? `component:${selectedSlug}` : `screen:${selectedSlug}`
        const iterVersions = iterations[iterKey]?.versions || []
        const mainVersion = iterVersions.find((v) => v.isMain)?.label || 'A'
        let allOutput = ''
        let successCount = 0

        for (let i = 0; i < count; i++) {
          setClaudeProgress({ current: i + 1, total: count })

          // Create a new version (copy from main)
          const createRes = await fetch('/api/iterations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: selectedType, slug: selectedSlug, prompt, sourceVersion: mainVersion }),
          })
          const createData = await createRes.json()
          if (!createData.version) {
            allOutput += `[${i + 1}/${count}] Failed to create version\n`
            continue
          }

          const versionLabel = createData.version.label
          // Build the file path for this version
          const basePath = componentPath
          const versionPath = basePath.replace('.jsx', `.${versionLabel}.jsx`)

          allOutput += `[${i + 1}/${count}] Version ${versionLabel}: `

          // Run Claude on this version
          const claudeRes = await fetch('/api/claude', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: `This is version ${versionLabel} (iteration ${i + 1} of ${count}). Create a distinct variation. ${prompt}`,
              componentPath: versionPath,
              componentName: `${componentName} (v${versionLabel})`,
            }),
          })
          const claudeData = await claudeRes.json()
          if (claudeData.success) {
            allOutput += `Done\n`
            successCount++
          } else {
            allOutput += `Error: ${claudeData.error}\n`
          }
          setClaudeOutput(allOutput)
        }

        setClaudeProgress(null)

        // Refresh iterations so new versions appear in UI
        try {
          const iterRes = await fetch('/api/iterations')
          const newIterations = await iterRes.json()
          setLocalIterations(newIterations)
        } catch {}

        if (successCount === count) {
          setClaudeStatus('done')
          setClaudePrompt('')
        } else if (successCount > 0) {
          setClaudeStatus('done')
          allOutput += `\n${successCount}/${count} iterations completed`
          setClaudeOutput(allOutput)
          setClaudePrompt('')
        } else {
          setClaudeStatus('error')
        }
      }
    } catch (err) {
      setClaudeStatus('error')
      setClaudeOutput(err.message)
      setClaudeProgress(null)
    }
  }

  // Build screen-to-flow map
  const screenFlowMap = {} // screenSlug -> flowSlug
  for (const flow of flows) {
    for (const step of flow.steps) {
      screenFlowMap[step] = flow.slug
    }
  }

  // After permanent deletions load, set initial selection or clear if pointing to deleted item
  useEffect(() => {
    if (!deletedLoaded) return
    const allDeletedFlowScreens = new Set(
      flows.filter((f) => isDeleted('flow', f.slug)).flatMap((f) => f.steps)
    )
    const gone = !selectedSlug ||
      (selectedType === 'flow' && isDeleted('flow', selectedSlug)) ||
      (selectedType === 'screen' && (isDeleted('screen', selectedSlug) || allDeletedFlowScreens.has(selectedSlug))) ||
      (selectedType === 'component' && isDeleted('component', selectedSlug))
    if (gone) {
      setSelectedType('screen')
      setSelectedSlug('walkthrough')
      setFlowOverview(false)
    }
  }, [deletedLoaded, permanentlyDeleted]) // eslint-disable-line react-hooks/exhaustive-deps

  // Filter out deleted items
  const visibleFlows = flows.filter((f) => !isDeleted('flow', f.slug))
  // Hide screens that are individually deleted OR belong to a deleted flow
  const deletedFlowScreens = new Set(
    flows.filter((f) => isDeleted('flow', f.slug)).flatMap((f) => f.steps)
  )
  const visibleScreens = screens.filter(
    (s) => !isDeleted('screen', s.slug) && !deletedFlowScreens.has(s.slug)
  )
  const visibleComponents = components.filter((c) => !isDeleted('component', c.slug))

  // Standalone screens (not in any flow)
  const standaloneScreens = visibleScreens.filter((s) => !screenFlowMap[s.slug])

  // Component usage map
  const compUsageMap = {}
  for (const [compSlug, mappings] of Object.entries(componentScreenMap)) {
    compUsageMap[compSlug] = mappings.map((m) => m.screenLabel)
  }

  function toggleFlow(flowSlug) {
    setCollapsedFlows((p) => ({ ...p, [flowSlug]: !p[flowSlug] }))
  }

  function selectScreen(slug) {
    setSelectedType('screen')
    setSelectedSlug(slug)
    setFlowOverview(false)
    setScreenVersion(null)
  }

  function selectFlow(slug) {
    setSelectedType('flow')
    setSelectedSlug(slug)
    setFlowOverview(true)
  }

  function selectComponent(slug) {
    setSelectedType('component')
    setSelectedSlug(slug)
    setFlowOverview(false)
  }

  // Preview URL
  let previewUrl = null
  if (selectedType === 'screen') previewUrl = `/screen/${selectedSlug}${screenVersion ? `?v=${screenVersion}` : ''}`
  else if (selectedType === 'flow') previewUrl = `/flow/${selectedSlug}`
  else if (selectedType === 'component') previewUrl = `/preview/component/${selectedSlug}`

  // Selected item info
  let selectedName = ''
  let selectedMeta = null

  if (selectedType === 'screen') {
    const screen = screens.find((s) => s.slug === selectedSlug)
    selectedName = screen?.name || ''
    if (screen) {
      const flowName = screenFlowMap[screen.slug]
        ? flows.find((f) => f.slug === screenFlowMap[screen.slug])?.name
        : null
      const iterKey = `screen:${screen.slug}`
      const versions = iterations[iterKey]?.versions || []
      selectedMeta = { component: screen.component, flow: flowName, versions, versionCount: versions.length }
    }
  } else if (selectedType === 'flow') {
    const flow = flows.find((f) => f.slug === selectedSlug)
    selectedName = flow?.name || ''
    if (flow) {
      selectedMeta = { stepCount: flow.steps.filter((s) => !s.endsWith('-interactive')).length }
    }
  } else if (selectedType === 'component') {
    const comp = components.find((c) => c.slug === selectedSlug)
    selectedName = comp?.name || ''
    if (comp) {
      const iterKey = `component:${comp.slug}`
      const versions = iterations[iterKey]?.versions || []
      selectedMeta = {
        usedIn: compUsageMap[comp.slug] || [],
        variants: comp.variants || [],
        versionCount: versions.length,
        versions,
      }
    }
  }

  const openUrl = selectedType === 'screen'
    ? `/screen/${selectedSlug}`
    : selectedType === 'flow'
    ? `/flow/${selectedSlug}`
    : `/component/${selectedSlug}`

  const isComponent = selectedType === 'component'

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* ── HEADER ── */}
      <header className="h-[46px] flex items-center px-[16px] border-b border-[#141414] shrink-0 gap-[2px]">
        {/* Logo mark */}
        <div className="w-[28px] h-[28px] rounded-[7px] bg-[#EF508D]/12 flex items-center justify-center text-[#EF508D] text-[11px] shrink-0 mr-[6px]">A</div>
        {/* View tabs */}
        {[
          { key: 'sandbox', label: 'Sandbox' },
          { key: 'flows', label: 'Flows' },
          { key: 'components', label: 'Components' },
          { key: 'ux-audit', label: 'UX Audit' },
          { key: 'planning', label: 'Planning' },
        ].map(({ key, label }, i, arr) => (
          <button
            key={key}
            onClick={() => setSidebarTab(key)}
            className={`px-[12px] h-[32px] rounded-[8px] text-[13px] transition ${
              i === 3 ? 'ml-[8px]' : ''
            } ${
              sidebarTab === key
                ? 'text-white bg-[#1A1A1A]'
                : 'text-[#4A4A4A] hover:text-[#888] hover:bg-[#0D0D0D]'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="flex-1" />
        {deletedItems.length > 0 && (
          <button onClick={() => setTrashOpen(true)} className="flex items-center gap-[5px] text-[#444] text-[12px] hover:text-white transition px-[8px] py-[5px] rounded-[7px] hover:bg-[#111]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4M13.33 4v9.33a1.33 1.33 0 01-1.33 1.34H4a1.33 1.33 0 01-1.33-1.34V4" />
            </svg>
            {deletedItems.length}
          </button>
        )}
        <button
          onClick={() => setRightSidebarOpen((v) => !v)}
          className={`ml-[4px] px-[10px] h-[32px] rounded-[8px] text-[13px] transition ${
            rightSidebarOpen
              ? 'text-white bg-[#1A1A1A]'
              : 'text-[#4A4A4A] hover:text-[#888] hover:bg-[#0D0D0D]'
          }`}
        >
          Tools
        </button>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── FULL-CANVAS VIEWS (no sidebar) ── */}
        {(sidebarTab === 'ux-audit' || sidebarTab === 'planning') && (
          <iframe
            key={sidebarTab}
            src={sidebarTab === 'ux-audit' ? '/screen/competitive-ux' : '/screen/competitive-comparison'}
            className="flex-1 border-0"
            tabIndex={-1}
          />
        )}

        {/* ── LEFT BROWSER PANEL ── */}
        {(sidebarTab === 'sandbox' || sidebarTab === 'flows' || sidebarTab === 'components') && (<>
        <nav className="w-[250px] border-r border-[#141414] bg-[#070707] flex flex-col overflow-hidden shrink-0">
          <div className="flex-1 overflow-y-auto px-[8px] py-[8px] flex flex-col gap-[1px]">

            {/* ── SANDBOX TAB (home = flows view) ── */}
            {(sidebarTab === 'sandbox' || sidebarTab === 'flows') && (
              <>
            {/* Walkthrough — featured */}
            {(() => {
              const isSelected = selectedType === 'screen' && selectedSlug === 'walkthrough'
              return (
                <button
                  onClick={() => selectScreen('walkthrough')}
                  className={`w-full flex items-center gap-[12px] px-[12px] py-[11px] rounded-[8px] text-left transition group ${
                    isSelected ? 'bg-[#161616]' : 'hover:bg-[#0F0F0F]'
                  }`}
                >
                  <div className={`w-[2px] h-[24px] rounded-full shrink-0 transition ${isSelected ? 'bg-[#EF508D]' : 'bg-[#EF508D]/30 group-hover:bg-[#EF508D]/60'}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[14px] transition ${isSelected ? 'text-white' : 'text-[#999] group-hover:text-white'}`}>Walkthrough</div>
                    <div className="text-[11px] text-[#3A3A3A] mt-[1px]">In development</div>
                  </div>
                </button>
              )
            })()}

            {/* Flows section */}
            <div className="mt-[18px]">
              <div className="text-[11px] text-[#333] px-[12px] mb-[4px]">Flows</div>
              {visibleFlows.map((flow) => (
                <div key={flow.slug}>
                  <button
                    onClick={() => toggleFlow(flow.slug)}
                    className="w-full flex items-center gap-[8px] px-[12px] py-[9px] rounded-[8px] hover:bg-[#0F0F0F] transition group"
                  >
                    <svg
                      width="7" height="7" viewBox="0 0 10 10"
                      className={`shrink-0 text-[#333] transition-transform ${collapsedFlows[flow.slug] ? '' : 'rotate-90'}`}
                    >
                      <path d="M3 1.5l4 3.5-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px] text-[#777] flex-1 text-left group-hover:text-[#CCC] transition truncate">{flow.name}</span>
                    <span className="text-[11px] text-[#333] shrink-0">{flow.steps.length}</span>
                  </button>
                  {!collapsedFlows[flow.slug] && (
                    <div className="pl-[12px] flex flex-col gap-[1px] mb-[2px]">
                      {flow.steps.map((stepSlug) => {
                        const screen = visibleScreens.find((s) => s.slug === stepSlug)
                        if (!screen) return null
                        const isSelected = selectedType === 'screen' && selectedSlug === stepSlug
                        return (
                          <button
                            key={stepSlug}
                            onClick={() => selectScreen(stepSlug)}
                            className={`w-full text-left px-[12px] py-[7px] rounded-[7px] text-[13px] transition ${
                              isSelected ? 'text-white bg-[#161616]' : 'text-[#555] hover:text-[#AAA] hover:bg-[#0F0F0F]'
                            }`}
                          >
                            {screen.name}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 min-h-[20px]" />
              </>
            )}

            {/* ── COMPONENTS TAB ── */}
            {sidebarTab === 'components' && (
              <>
            <div className="flex items-center justify-between px-[12px] mb-[4px]">
              <div className="text-[11px] text-[#333]">Components</div>
              <button
                onClick={() => setCompSelectMode((v) => !v)}
                className="text-[11px] text-[#444] hover:text-[#888] transition"
              >
                {compSelectMode ? 'Done' : 'Select'}
              </button>
            </div>
            {visibleComponents.map((comp) => {
              const isSelected = selectedType === 'component' && selectedSlug === comp.slug
              const isChecked = compSelection.has(comp.slug)
              const iterKey = `component:${comp.slug}`
              const verCount = iterations[iterKey]?.versions?.length || 0
              return (
                <button
                  key={comp.slug}
                  onClick={() => {
                    if (compSelectMode) {
                      setCompSelection((prev) => {
                        const next = new Set(prev)
                        if (next.has(comp.slug)) next.delete(comp.slug)
                        else next.add(comp.slug)
                        return next
                      })
                    } else {
                      selectComponent(comp.slug)
                    }
                  }}
                  className={`w-full flex items-center gap-[8px] px-[12px] py-[9px] rounded-[8px] text-left transition ${
                    (compSelectMode ? isChecked : isSelected) ? 'bg-[#161616] text-white' : 'text-[#777] hover:text-[#CCC] hover:bg-[#0F0F0F]'
                  }`}
                >
                  {compSelectMode && (
                    <div className={`w-[14px] h-[14px] rounded-[3px] border shrink-0 flex items-center justify-center ${
                      isChecked ? 'bg-white border-white' : 'border-[#333]'
                    }`}>
                      {isChecked && (
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5.5L4 7.5L8 3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  )}
                  <span className="text-[14px] flex-1 truncate">{comp.name}</span>
                  {verCount > 1 && <span className="text-[11px] text-[#333] shrink-0">{verCount}v</span>}
                </button>
              )
            })}
            {compSelectMode && compSelection.size > 0 && (
              <button
                onClick={() => {
                  const slugs = [...compSelection]
                  const names = slugs.map((s) => components.find((c) => c.slug === s)?.name || s)
                  setExportModalBatch({ slugs, names })
                  setExportModalOpen(true)
                  const compPage = figmaPages.find((p) => p.name === 'Component export')
                  if (compPage) setExportTargetPage(compPage.name)
                }}
                className="w-full mt-[6px] py-[8px] rounded-[8px] bg-[#1A1A1A] text-white text-[12px] hover:bg-[#222] transition flex items-center justify-center gap-[4px]"
              >
                Export Selected ({compSelection.size})
              </button>
            )}

            {/* Research */}
            <div className="mt-[18px]">
              <div className="text-[11px] text-[#333] px-[12px] mb-[4px]">Research</div>
              {[
                { slug: 'competitive-comparison', name: 'Planning' },
                { slug: 'competitive-ux', name: 'UX Audit' },
              ].map(({ slug, name }) => {
                const isSelected = selectedType === 'screen' && selectedSlug === slug
                return (
                  <button
                    key={slug}
                    onClick={() => selectScreen(slug)}
                    className={`w-full text-left px-[12px] py-[9px] rounded-[8px] text-[14px] transition ${
                      isSelected ? 'bg-[#161616] text-white' : 'text-[#777] hover:text-[#CCC] hover:bg-[#0F0F0F]'
                    }`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
            <div className="flex-1 min-h-[20px]" />
              </>
            )}
          </div>

          {/* Export at bottom */}
          <div className="border-t border-[#1A1A1A] p-[12px] flex flex-col gap-[8px] shrink-0">
            {figmaPages.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
                  className="w-full flex items-center justify-between bg-[#0A0A0A] border border-[#1A1A1A] rounded-[8px] px-[10px] py-[8px] text-[12px] hover:border-[#2A2A2A] transition"
                >
                  <span className={exportTargetPage ? 'text-white' : 'text-[#555]'}>{exportTargetPage || 'Select Figma page...'}</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" className={`text-[#555] transition-transform ${pageDropdownOpen ? 'rotate-180' : ''}`}>
                    <path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {pageDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-[4px] bg-[#111] border border-[#222] rounded-[8px] overflow-hidden z-10 max-h-[160px] overflow-y-auto">
                    {figmaPages.map((p) => (
                      <button
                        key={p.id || p.name}
                        onClick={() => { setExportTargetPage(p.name); setPageDropdownOpen(false) }}
                        className={`w-full text-left px-[10px] py-[7px] text-[12px] transition ${exportTargetPage === p.name ? 'text-white bg-white/5' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-[#3A3A3A] px-[2px]">Add FIGMA_ACCESS_TOKEN to .env.local</p>
            )}
            <button
              onClick={() => {
                if (selectedType === 'flow') {
                  const flow = flows.find((f) => f.slug === selectedSlug)
                  openExportModal(flow ? { slug: flow.slug, name: flow.name, steps: flow.steps.filter((s) => !s.endsWith('-interactive')) } : null)
                } else {
                  openExportModal(null)
                }
              }}
              disabled={exporting}
              className="w-full py-[9px] rounded-[9px] bg-[#EF508D] text-white text-[13px] hover:brightness-110 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-[6px]"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 9V10H10V9M6 2V7.5M6 7.5L3.5 5M6 7.5L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export to Figma
            </button>
          </div>
        </nav>

        {/* ── MAIN PREVIEW AREA ── */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Preview header */}
          {selectedSlug && (
            <div className="h-[48px] flex items-center px-[24px] border-b border-[#1A1A1A] shrink-0 gap-[10px]">
              <span className="text-[15px] text-white truncate">{selectedName}</span>
              {selectedType === 'flow' && selectedMeta && (
                <span className="text-[12px] text-[#555]">{selectedMeta.stepCount} screens</span>
              )}
              {selectedType === 'screen' && selectedMeta?.versionCount > 1 && (
                <span className="text-[12px] text-[#555]">{selectedMeta.versionCount} versions</span>
              )}
              <div className="flex-1" />

              {/* Flow view toggle */}
              {selectedType === 'flow' && selectedMeta && (
                <div className="flex items-center bg-[#0A0A0A] border border-[#1A1A1A] rounded-[7px] p-[2px]">
                  <button
                    onClick={() => {
                      const flow = flows.find((f) => f.slug === selectedSlug)
                      if (flow && flow.steps.length > 0) selectScreen(flow.steps[0])
                    }}
                    className={`px-[10px] py-[4px] rounded-[5px] text-[12px] transition ${!flowOverview ? 'bg-[#1A1A1A] text-white' : 'text-[#555] hover:text-[#888]'}`}
                  >
                    Single
                  </button>
                  <button
                    onClick={() => setFlowOverview(true)}
                    className={`px-[10px] py-[4px] rounded-[5px] text-[12px] transition ${flowOverview ? 'bg-[#1A1A1A] text-white' : 'text-[#555] hover:text-[#888]'}`}
                  >
                    Overview
                  </button>
                </div>
              )}

              {/* Version tabs for screens */}
              {selectedType === 'screen' && selectedMeta?.versionCount > 1 && (
                <div className="flex items-center bg-[#0A0A0A] border border-[#1A1A1A] rounded-[7px] p-[2px]">
                  {selectedMeta.versions.map((v) => (
                    <button
                      key={v.label}
                      onClick={() => setScreenVersion(v.label === 'A' ? null : v.label)}
                      className={`px-[10px] py-[4px] rounded-[5px] text-[12px] transition ${
                        (screenVersion || 'A') === v.label ? 'bg-[#1A1A1A] text-white' : 'text-[#555] hover:text-[#888]'
                      }`}
                    >
                      {v.label}
                      {v.isMain && <span className="ml-[2px] text-[9px] text-[#3A3A3A]">·</span>}
                    </button>
                  ))}
                </div>
              )}

              {openUrl && (
                <Link
                  href={openUrl}
                  target={selectedSlug === 'competitive-ux' || selectedSlug === 'competitive-comparison' ? '_blank' : undefined}
                  className="text-[12px] text-[#555] hover:text-white transition px-[10px] py-[5px] rounded-[7px] hover:bg-[#111] border border-transparent hover:border-[#1A1A1A]"
                >
                  Open
                </Link>
              )}
            </div>
          )}

          {/* Preview content */}
          <div className="flex-1 flex items-center justify-center overflow-auto bg-[#060606]">
            {selectedType === 'flow' && flowOverview && selectedSlug ? (
              /* Flow overview */
              <div className="w-full h-full overflow-auto p-[32px]">
                <div className="flex gap-[24px] pb-[12px]">
                  {(() => {
                    const flow = flows.find((f) => f.slug === selectedSlug)
                    if (!flow) return null
                    return flow.steps.map((stepSlug, i) => {
                      const scr = screens.find((s) => s.slug === stepSlug)
                      if (!scr) return null
                      return (
                        <div key={stepSlug} className="shrink-0 flex flex-col items-center">
                          <div className="flex items-center gap-[6px] mb-[10px]">
                            <span className="w-[20px] h-[20px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-[10px] text-[#555]">{i + 1}</span>
                            <span className="text-[12px] text-[#888]">{scr.name}</span>
                          </div>
                          <div className="overflow-hidden shadow-xl" style={{ width: 220, height: 477, borderRadius: 17, background: '#000' }}>
                            <iframe
                              src={`/preview/screen/${stepSlug}`}
                              className="border-0"
                              scrolling="no"
                              style={{ width: PHONE_W, height: PHONE_H, transform: 'scale(0.56)', transformOrigin: 'top left', pointerEvents: 'none' }}
                              tabIndex={-1}
                            />
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            ) : selectedType === 'screen' && isWalkthrough ? (
              /* Walkthrough: phone + copy editor */
              <div className="flex gap-[40px] items-start h-full overflow-auto px-[32px] py-[24px]">
                <div className="shrink-0">
                  <div className="overflow-hidden shadow-2xl" style={{ width: PHONE_W, height: PHONE_H, borderRadius: PHONE_R, background: '#000' }}>
                    <iframe
                      ref={wtIframeRef}
                      key={previewUrl + '?edit=1'}
                      src={previewUrl + '?edit=1'}
                      className="border-0"
                      scrolling="no"
                      style={{ width: PHONE_W, height: PHONE_H, overflow: 'hidden' }}
                      tabIndex={-1}
                    />
                  </div>
                  <p className="text-[11px] text-[#444] text-center mt-[10px]">Double-click text to edit inline</p>
                </div>
                {/* Copy editor */}
                <div className="flex flex-col gap-[4px] min-w-[300px] max-w-[360px] self-start sticky top-0">
                  <div className="flex items-center justify-between mb-[10px]">
                    <span className="text-[12px] text-[#555] uppercase tracking-[0.06em]">Walkthrough Copy</span>
                    <div className="flex items-center gap-[6px]">
                      <button onClick={undoWt} disabled={wtHistoryIdx <= 0} title="Undo (Cmd+Z)"
                        className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center transition disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 7H11a3 3 0 010 6H8" /><path d="M6 4L3 7l3 3" />
                        </svg>
                      </button>
                      <button onClick={redoWt} disabled={wtHistoryIdx >= wtHistory.length - 1} title="Redo (Cmd+Shift+Z)"
                        className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center transition disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 7H5a3 3 0 000 6H8" /><path d="M10 4l3 3-3 3" />
                        </svg>
                      </button>
                      {wtHistory.length > 1 && (
                        <span className="text-[10px] text-[#444]">{wtHistoryIdx + 1}/{wtHistory.length}</span>
                      )}
                      <div className="w-[1px] h-[14px] bg-white/10 mx-[2px]" />
                      <button
                        onClick={() => saveWtCopy(wtCopy)}
                        disabled={wtSaving || !wtCopy}
                        className="px-[12px] py-[5px] rounded-[6px] text-[12px] transition disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ background: wtSaved ? '#4FC660' : '#1A1A1A', color: wtSaved ? '#000' : '#fff' }}
                      >
                        {wtSaving ? 'Saving...' : wtSaved ? 'Saved' : 'Save All'}
                      </button>
                    </div>
                  </div>
                  {!wtCopy ? (
                    <p className="text-[12px] text-[#555]">Loading...</p>
                  ) : wtCopy.map((slide, i) => (
                    <div key={i} className="rounded-[10px] p-[14px] flex flex-col gap-[10px] mb-[4px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-[11px] text-[#444] uppercase tracking-[0.05em]">Slide {i + 1}</span>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[10px] text-[#444] uppercase tracking-[0.05em]">Headline</label>
                        <input type="text" value={slide.headline}
                          onChange={(e) => updateWtField(i, 'headline', e.target.value)}
                          onBlur={() => saveWtCopy(wtCopy)}
                          className="border rounded-[6px] px-[10px] py-[7px] text-[13px] text-white outline-none transition"
                          style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.07)' }}
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[10px] text-[#444] uppercase tracking-[0.05em]">Subtext</label>
                        <textarea value={slide.subtext}
                          onChange={(e) => updateWtField(i, 'subtext', e.target.value)}
                          onBlur={() => saveWtCopy(wtCopy)}
                          rows={2}
                          className="border rounded-[6px] px-[10px] py-[7px] text-[13px] text-[#888] outline-none transition resize-none"
                          style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.07)' }}
                        />
                      </div>
                      {i !== 4 && (
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[10px] text-[#444] uppercase tracking-[0.05em]">Button</label>
                          <input type="text" value={slide.cta || ''}
                            onChange={(e) => updateWtField(i, 'cta', e.target.value)}
                            onBlur={() => saveWtCopy(wtCopy)}
                            className="border rounded-[6px] px-[10px] py-[7px] text-[13px] text-[#aaa] outline-none transition"
                            style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.07)' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : selectedType === 'screen' && selectedMeta?.versionCount > 1 ? (
              /* Versioned screen */
              <div className="flex flex-col items-center gap-[16px]">
                <div className="overflow-hidden shadow-2xl" style={{ width: PHONE_W, height: PHONE_H, borderRadius: PHONE_R, background: '#000' }}>
                  <iframe key={previewUrl} src={previewUrl} className="border-0" scrolling="no"
                    style={{ width: PHONE_W, height: PHONE_H, overflow: 'hidden' }} tabIndex={-1} />
                </div>
                {selectedMeta.versions.find((v) => v.label === (screenVersion || 'A'))?.notes && (
                  <p className="text-[11px] text-[#555] max-w-[300px] text-center">{selectedMeta.versions.find((v) => v.label === (screenVersion || 'A')).notes}</p>
                )}
              </div>
            ) : selectedType === 'screen' ? (
              /* Regular screen */
              <div className="overflow-hidden shadow-2xl" style={{ width: PHONE_W, height: PHONE_H, borderRadius: PHONE_R, background: '#000' }}>
                <iframe key={previewUrl} src={previewUrl} className="border-0" scrolling="no"
                  style={{ width: PHONE_W, height: PHONE_H, overflow: 'hidden' }} tabIndex={-1} />
              </div>
            ) : selectedType === 'component' ? (
              /* Component variants grid */
              <div className="w-full h-full overflow-auto">
                <div className="p-[32px]">
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-[16px]">
                    {(selectedMeta?.versions?.length > 1 ? selectedMeta.versions : [{ label: 'A', isMain: true, notes: '' }]).map((v) => (
                      <div key={v.label} className="flex flex-col bg-[#0D0D0D] border border-[#1A1A1A] rounded-[12px] overflow-hidden hover:border-[#2A2A2A] transition group/card relative">
                        <div className="w-full h-[200px] overflow-hidden bg-black">
                          <iframe src={`/preview/component/${selectedSlug}?v=${v.label}`} className="border-0 w-full h-full pointer-events-none" scrolling="no" tabIndex={-1} />
                        </div>
                        <div className="absolute top-[8px] right-[8px] flex items-center gap-[4px] opacity-0 group-hover/card:opacity-100 transition">
                          {!v.isMain && (
                            <button onClick={() => setMainVariant('component', selectedSlug, v.label)}
                              className="h-[24px] px-[8px] rounded-[6px] bg-black/80 border border-[#333] text-[10px] text-[#888] hover:text-main hover:border-main/40 transition">
                              Set main
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (v.isMain) {
                                const allVersions = selectedMeta?.versions || []
                                if (allVersions.length > 1) {
                                  setDeleteConfirm({ type: 'component', slug: selectedSlug, name: selectedName, isMainVariant: true, versions: allVersions })
                                } else {
                                  requestDelete('component', selectedSlug, selectedName)
                                }
                              } else {
                                deleteVariant('component', selectedSlug, v.label)
                              }
                            }}
                            className="w-[24px] h-[24px] rounded-[6px] bg-black/80 border border-[#333] flex items-center justify-center text-[#555] hover:text-red hover:border-red/40 transition"
                          >
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                              <path d="M12 4L4 12M4 4l8 8" />
                            </svg>
                          </button>
                        </div>
                        <div className="px-[14px] py-[10px] flex items-center justify-between">
                          <div className="flex items-center gap-[6px]">
                            <span className="text-[13px] text-white">{v.label}</span>
                            {v.isMain && <span className="text-[10px] text-[#555] bg-[#1A1A1A] px-[5px] py-[1px] rounded-full">main</span>}
                          </div>
                          {v.notes && <span className="text-[11px] text-[#555] truncate ml-[8px]">{v.notes}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : previewUrl ? (
              <div className="w-full h-full">
                <iframe key={previewUrl} src={previewUrl} className="border-0 w-full h-full" tabIndex={-1} />
              </div>
            ) : (
              <p className="text-[#3A3A3A] text-[14px]">Select an item</p>
            )}
          </div>
        </main>
        </>)} {/* end sandbox/flows/components conditional */}

        {/* ── RIGHT SIDEBAR (Tools) ── */}
        {rightSidebarOpen && (
          <div className="w-[290px] border-l border-[#1A1A1A] shrink-0 flex flex-col overflow-hidden bg-black">
            <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#1A1A1A] shrink-0">
              <span className="text-[14px] text-white">Tools</span>
              <button onClick={() => setRightSidebarOpen(false)} className="text-[#555] hover:text-white transition">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <path d="M12 4L4 12M4 4l8 8" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <PanelSection title="Figma Link" collapsed={collapsedPanels.link} onToggle={() => setCollapsedPanels((p) => ({ ...p, link: !p.link }))}>
                {figmaLink ? (
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[6px]">
                      <div className="w-[6px] h-[6px] rounded-full bg-green shrink-0" />
                      <span className="text-[12px] text-white">{figmaLink.nickname}</span>
                    </div>
                    <a href={figmaLink.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-main hover:underline truncate">{figmaLink.url}</a>
                    <button onClick={async () => { await fetch('/api/figma-link', { method: 'DELETE' }).catch(() => {}); setFigmaLink(null); setFigmaNickname(''); setFigmaUrl('') }}
                      className="text-[11px] text-[#555] hover:text-red self-start transition">Unlink</button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[8px]">
                    <input type="text" value={figmaNickname} onChange={(e) => setFigmaNickname(e.target.value)} placeholder="Nickname"
                      className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[6px] text-[12px] text-white placeholder:text-[#444] outline-none focus:border-[#2A2A2A] transition" />
                    <input type="text" value={figmaUrl} onChange={(e) => setFigmaUrl(e.target.value)} placeholder="Figma URL"
                      className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[6px] text-[12px] text-white placeholder:text-[#444] outline-none focus:border-[#2A2A2A] transition" />
                    <button
                      onClick={async () => {
                        if (figmaNickname.trim() && figmaUrl.trim()) {
                          const res = await fetch('/api/figma-link', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nickname: figmaNickname.trim(), url: figmaUrl.trim() }) })
                          const link = await res.json()
                          if (link.nickname) setFigmaLink(link)
                        }
                      }}
                      disabled={!figmaNickname.trim() || !figmaUrl.trim()}
                      className="w-full py-[6px] rounded-[6px] bg-main text-white text-[12px] hover:brightness-110 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >Link</button>
                  </div>
                )}
              </PanelSection>

              <PanelSection title="Claude Code" collapsed={collapsedPanels.claude} onToggle={() => setCollapsedPanels((p) => ({ ...p, claude: !p.claude }))}>
                <div className="flex flex-col gap-[8px]">
                  {getComponentPath() ? (
                    <div className="flex items-center gap-[6px]">
                      <div className="w-[5px] h-[5px] rounded-full bg-green shrink-0" />
                      <span className="text-[11px] text-[#555] truncate">{getComponentPath()}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-[#444]">Select a screen or component</span>
                  )}
                  <textarea value={claudePrompt} onChange={(e) => setClaudePrompt(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && e.metaKey && claudeStatus !== 'running') { e.preventDefault(); runClaude() } }}
                    placeholder="Describe the change..."
                    rows={3}
                    className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] px-[10px] py-[8px] text-[12px] text-white placeholder:text-[#333] outline-none focus:border-[#2A2A2A] transition resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#555]">Iterations</span>
                    <div className="flex items-center gap-[4px]">
                      <button onClick={() => setIterationCount((c) => Math.max(1, c - 1))} disabled={claudeStatus === 'running' || iterationCount <= 1}
                        className="w-[24px] h-[24px] rounded-[4px] bg-[#0A0A0A] border border-[#1A1A1A] text-[#555] text-[14px] flex items-center justify-center hover:border-[#2A2A2A] hover:text-white transition disabled:opacity-20 disabled:cursor-not-allowed">-</button>
                      <span className="w-[28px] text-center text-[13px] text-white tabular-nums">{iterationCount}</span>
                      <button onClick={() => setIterationCount((c) => Math.min(10, c + 1))} disabled={claudeStatus === 'running' || iterationCount >= 10}
                        className="w-[24px] h-[24px] rounded-[4px] bg-[#0A0A0A] border border-[#1A1A1A] text-[#555] text-[14px] flex items-center justify-center hover:border-[#2A2A2A] hover:text-white transition disabled:opacity-20 disabled:cursor-not-allowed">+</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <button onClick={runClaude} disabled={claudeStatus === 'running' || !claudePrompt.trim() || !getComponentPath()}
                      className="flex-1 py-[7px] rounded-[6px] bg-[#FB7A29] text-white text-[12px] hover:brightness-110 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-[5px]">
                      {claudeStatus === 'running' ? (
                        <><svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 10" /></svg>{claudeProgress ? `${claudeProgress.current}/${claudeProgress.total}` : 'Running...'}</>
                      ) : (
                        <><svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg>{iterationCount > 1 ? `Run ${iterationCount}x` : 'Run'}</>
                      )}
                    </button>
                    <span className={`text-[10px] shrink-0 ${claudeStatus === 'done' ? 'text-green' : claudeStatus === 'error' ? 'text-red' : claudeStatus === 'running' ? 'text-orange' : 'text-[#444]'}`}>
                      {claudeStatus === 'done' ? 'Done' : claudeStatus === 'error' ? 'Error' : claudeStatus === 'running' ? 'Working' : '⌘↵'}
                    </span>
                  </div>
                  {claudeOutput && (
                    <div className="relative">
                      <div className="bg-[#050505] border border-[#1A1A1A] rounded-[6px] p-[10px] max-h-[180px] overflow-y-auto">
                        <pre className="text-[11px] text-[#666] whitespace-pre-wrap break-words leading-[1.5] font-[inherit]">{claudeOutput}</pre>
                      </div>
                      <button onClick={() => setClaudeOutput('')} className="absolute top-[6px] right-[6px] text-[#333] hover:text-[#666] transition">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              </PanelSection>

              <PanelSection title="Export Code" collapsed={collapsedPanels.exportCode} onToggle={() => setCollapsedPanels((p) => ({ ...p, exportCode: !p.exportCode }))}>
                <ExportCodePanel filePath={getComponentPath()} />
              </PanelSection>
            </div>
          </div>
        )}
      </div>

      {/* ── Export Modal ── */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => { setExportModalOpen(false); setExportModalFlow(null); setExportModalBatch(null); setExportAllVariants(false) }}>
          <div className="bg-[#111] border border-[#222] rounded-[12px] w-[400px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#222]">
              <span className="text-[14px] text-white">{exportModalBatch ? 'Export Components' : exportModalFlow ? `Export — ${exportModalFlow.name}` : 'Export to Figma'}</span>
              <button onClick={() => { setExportModalOpen(false); setExportModalFlow(null); setExportModalBatch(null); setExportAllVariants(false) }} className="text-[#555] hover:text-white transition">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8" /></svg>
              </button>
            </div>
            <div className="px-[20px] py-[16px] flex flex-col gap-[12px]">
              <div className="px-[12px] py-[10px] rounded-[8px] bg-[#0a0a0a] border border-[#222]">
                {exportModalBatch ? (
                  <div>
                    <p className="text-[12px] text-[#555] mb-[4px]">{exportModalBatch.slugs.length} components</p>
                    <div className="flex flex-wrap gap-[4px]">
                      {exportModalBatch.names.slice(0, 6).map((name, i) => (
                        <span key={i} className="text-[11px] text-[#555] bg-white/5 px-[6px] py-[2px] rounded-[4px]">{name}</span>
                      ))}
                      {exportModalBatch.names.length > 6 && <span className="text-[11px] text-[#444]">+{exportModalBatch.names.length - 6} more</span>}
                    </div>
                  </div>
                ) : exportModalFlow ? (
                  <div>
                    <p className="text-[12px] text-[#555] mb-[2px]">{exportModalFlow.steps.length} screens</p>
                    <p className="text-[13px] text-white">{exportModalFlow.name}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[12px] text-[#555] mb-[2px]">{selectedType}</p>
                    <p className="text-[13px] text-white">{selectedName}</p>
                  </div>
                )}
              </div>
              {selectedType === 'component' && !exportModalFlow && !exportModalBatch && (() => {
                const iterKey = `component:${selectedSlug}`
                const variantCount = iterations[iterKey]?.versions?.length || 0
                if (variantCount <= 1) return null
                return (
                  <button onClick={() => setExportAllVariants((v) => !v)}
                    className="flex items-center justify-between px-[12px] py-[8px] rounded-[8px] border border-[#222] hover:border-[#333] transition">
                    <span className="text-[12px] text-[#888]">Export all {variantCount} variants</span>
                    <div className={`w-[32px] h-[18px] rounded-full transition-colors relative ${exportAllVariants ? 'bg-green' : 'bg-[#333]'}`}>
                      <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all ${exportAllVariants ? 'left-[16px]' : 'left-[2px]'}`} />
                    </div>
                  </button>
                )
              })()}
              <div>
                <label className="text-[11px] text-[#555] uppercase tracking-[0.06em] mb-[6px] block">Figma page</label>
                {figmaPages.length > 0 ? (
                  <div className="flex flex-col gap-[2px] max-h-[200px] overflow-y-auto rounded-[8px] border border-[#222] p-[4px]">
                    {figmaPages.map((p) => (
                      <button key={p.id || p.name} onClick={() => setExportTargetPage(p.name)}
                        className={`w-full text-left px-[10px] py-[7px] rounded-[6px] text-[13px] transition ${exportTargetPage === p.name ? 'bg-main/10 text-main' : 'text-[#888] hover:text-white hover:bg-white/5'}`}>
                        {p.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-[#444] px-[2px]">Add FIGMA_ACCESS_TOKEN to .env.local</p>
                )}
              </div>
            </div>
            {exportProgress && (
              <div className="px-[20px] py-[12px] border-t border-[#222]">
                <div className="flex items-center gap-[8px] mb-[8px]">
                  {exportProgress.step === 'error' ? (
                    <div className="w-[16px] h-[16px] rounded-full bg-red/20 flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3l4 4M7 3L3 7" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" /></svg></div>
                  ) : exportProgress.step === 'done' ? (
                    <div className="w-[16px] h-[16px] rounded-full bg-green/20 flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 5.5L4 7L7.5 3" stroke="#4fc660" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  ) : (
                    <svg className="animate-spin shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#555" strokeWidth="1.5" /><path d="M12.5 7a5.5 5.5 0 00-5.5-5.5" stroke="#e573b7" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  )}
                  <span className="text-[12px] text-white">
                    {exportProgress.step === 'capturing' && (exportProgress.total > 1 ? `Capturing (${exportProgress.current}/${exportProgress.total})...` : `Capturing...`)}
                    {exportProgress.step === 'done' && `Sent ${exportProgress.current} capture${exportProgress.current > 1 ? 's' : ''} to Figma`}
                    {exportProgress.step === 'error' && exportProgress.error}
                  </span>
                </div>
                {exportProgress.total > 1 && exportProgress.step !== 'error' && (
                  <div className="w-full h-[3px] rounded-full bg-[#222] overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${exportProgress.step === 'done' ? 'bg-green' : 'bg-main'}`}
                      style={{ width: `${(exportProgress.step === 'done' ? exportProgress.current : exportProgress.current - 1) / exportProgress.total * 100}%` }} />
                  </div>
                )}
              </div>
            )}
            <div className="px-[20px] py-[14px] border-t border-[#222] flex items-center justify-between">
              <button onClick={() => { if (!exporting) { setExportModalOpen(false); setExportModalFlow(null); setExportModalBatch(null); setExportProgress(null) } }}
                className={`text-[12px] transition ${exporting ? 'text-[#333] cursor-not-allowed' : 'text-[#555] hover:text-white'}`}>
                {exportProgress?.step === 'error' ? 'Close' : 'Cancel'}
              </button>
              {exportProgress?.step === 'error' ? (
                <button onClick={() => setExportProgress(null)} className="px-[16px] py-[7px] rounded-[6px] bg-[#1A1A1A] text-white text-[12px] hover:bg-[#222] transition">Try Again</button>
              ) : (
                <button onClick={handleExport} disabled={exporting || !exportTargetPage}
                  className="px-[16px] py-[7px] rounded-[6px] bg-main text-white text-[12px] hover:brightness-110 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-[6px]">
                  {exporting ? (
                    <><svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 10" /></svg>Exporting...</>
                  ) : (
                    <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9V10H10V9M6 2V7.5M6 7.5L3.5 5M6 7.5L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {exportModalBatch ? 'Export Sheet' : exportAllVariants ? 'Export All Variants' : exportModalFlow ? `Export ${exportModalFlow.steps.length} Screens` : 'Export'}</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#111] border border-[#222] rounded-[12px] w-[380px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {deleteConfirm.isMainVariant ? (
              <>
                <div className="px-[20px] py-[16px] flex flex-col gap-[8px]">
                  <span className="text-[14px] text-white">This is the main variant</span>
                  <p className="text-[12px] text-[#555]"><span className="text-white">&ldquo;{deleteConfirm.name}&rdquo;</span> is the main variant. What would you like to do?</p>
                </div>
                <div className="px-[20px] py-[12px] border-t border-[#222] flex flex-col gap-[8px]">
                  <button onClick={deleteMainAndPromote} className="w-full py-[8px] rounded-[6px] bg-main/15 text-main text-[12px] hover:bg-main/25 transition">Promote next variant to main</button>
                  <button onClick={confirmDelete} className="w-full py-[8px] rounded-[6px] bg-red/15 text-red text-[12px] hover:bg-red/25 transition">Delete entire component</button>
                  <button onClick={() => setDeleteConfirm(null)} className="w-full py-[6px] text-[12px] text-[#555] hover:text-white transition">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="px-[20px] py-[16px] flex flex-col gap-[8px]">
                  <span className="text-[14px] text-white">Delete {deleteConfirm.type}?</span>
                  <p className="text-[12px] text-[#555]">Delete <span className="text-white">&ldquo;{deleteConfirm.name}&rdquo;</span>? You can restore from trash.</p>
                </div>
                <div className="px-[20px] py-[12px] border-t border-[#222] flex items-center justify-end gap-[8px]">
                  <button onClick={() => setDeleteConfirm(null)} className="px-[14px] py-[6px] rounded-[6px] text-[12px] text-[#555] hover:text-white transition">Cancel</button>
                  <button onClick={confirmDelete} className="px-[14px] py-[6px] rounded-[6px] bg-red/20 text-red text-[12px] hover:bg-red/30 transition">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Trash ── */}
      {trashOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setTrashOpen(false)}>
          <div className="bg-[#111] border border-[#222] rounded-[12px] w-[380px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#222]">
              <span className="text-[14px] text-white">Trash ({deletedItems.length})</span>
              <button onClick={() => setTrashOpen(false)} className="text-[#555] hover:text-white transition">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8" /></svg>
              </button>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              {deletedItems.length === 0 ? (
                <p className="px-[20px] py-[20px] text-[12px] text-[#444] text-center">Trash is empty</p>
              ) : deletedItems.map((item) => (
                <div key={`${item.type}-${item.slug}`} className="flex items-center justify-between px-[20px] py-[8px] border-b border-[#1A1A1A] last:border-0">
                  <div className="flex items-center gap-[8px] min-w-0">
                    <span className="text-[10px] text-[#444] uppercase shrink-0 w-[60px]">{item.type}</span>
                    <span className="text-[12px] text-white truncate">{getDeletedName(item)}</span>
                  </div>
                  <button onClick={() => restoreItem(item.type, item.slug)} className="text-[11px] text-[#555] hover:text-green transition shrink-0 ml-[8px]">Restore</button>
                </div>
              ))}
            </div>
            <div className="px-[20px] py-[12px] border-t border-[#222] flex items-center justify-between">
              <button onClick={() => { setDeletedItems([]); setTrashOpen(false) }} className="text-[11px] text-[#555] hover:text-green transition">Restore all</button>
              <button onClick={emptyTrash} className="px-[14px] py-[6px] rounded-[6px] bg-red/20 text-red text-[12px] hover:bg-red/30 transition">Empty Trash</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 px-[16px] py-[10px] rounded-[8px] shadow-lg text-[13px] flex items-center gap-[8px] ${
          toast.type === 'error' ? 'bg-[#1A0808] border border-red/20 text-red' : 'bg-[#081A08] border border-green/20 text-green'
        }`}>
          <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${toast.type === 'error' ? 'bg-red' : 'bg-green'}`} />
          {toast.message}
          {toast.type !== 'error' && deletedItems.length > 0 && (
            <button onClick={() => { undoDelete(); setToast(null) }} className="text-[11px] text-[#555] hover:text-white underline ml-[4px] transition">Undo</button>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Shared sub-components ── */

function ExportCodePanel({ filePath }) {
  const [source, setSource] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const fetchSource = async () => {
    if (!filePath) return
    setLoading(true)
    try {
      const res = await fetch(`/api/source?path=${encodeURIComponent(filePath)}`)
      const data = await res.json()
      if (data.source) setSource(data.source)
    } catch { /* ignore */ }
    setLoading(false)
  }

  const copyToClipboard = async () => {
    if (!source) return
    await navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Reset when file changes
  useEffect(() => {
    setSource(null)
    setExpanded(false)
    setCopied(false)
  }, [filePath])

  if (!filePath) {
    return (
      <div className="flex items-center gap-[6px]">
        <div className="w-[5px] h-[5px] rounded-full bg-text-2/20 shrink-0" />
        <span className="text-[11px] text-text-2/30">Select a screen or component</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[8px]">
      {/* File path */}
      <div className="flex items-center gap-[6px]">
        <div className="w-[5px] h-[5px] rounded-full bg-green shrink-0" />
        <span className="text-[11px] text-text-2/50 truncate">{filePath}</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-[6px]">
        {!source ? (
          <button
            onClick={fetchSource}
            disabled={loading}
            className="flex-1 py-[6px] rounded-[6px] border border-[#222] text-text-2 text-[12px] hover:border-text-2/30 hover:text-text-1 transition disabled:opacity-30 flex items-center justify-center gap-[5px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 10" />
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2H13V14H3V2H6" />
                  <path d="M6 2C6 1 7 0.5 8 0.5S10 1 10 2V3H6V2Z" />
                </svg>
                Load Source
              </>
            )}
          </button>
        ) : (
          <button
            onClick={copyToClipboard}
            className={`flex-1 py-[6px] rounded-[6px] text-[12px] font-medium transition flex items-center justify-center gap-[5px] ${
              copied
                ? 'bg-green/15 text-green border border-green/20'
                : 'bg-[#222] text-text-1 hover:bg-[#333]'
            }`}
          >
            {copied ? (
              <>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5L6.5 12L13 4" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="5" width="9" height="9" rx="1" />
                  <path d="M11 5V3C11 2.45 10.55 2 10 2H3C2.45 2 2 2.45 2 3V10C2 10.55 2.45 11 3 11H5" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        )}
      </div>

      {/* Source preview */}
      {source && (
        <div className="relative">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] text-text-2/40 hover:text-text-2/70 transition mb-[4px]"
          >
            {expanded ? 'Collapse' : 'Preview'} ({source.split('\n').length} lines)
          </button>
          {expanded && (
            <div className="bg-[#0a0a0a] border border-[#222] rounded-[6px] p-[10px] max-h-[300px] overflow-auto">
              <pre className="text-[11px] text-text-2/70 whitespace-pre-wrap break-words leading-[1.5] font-[inherit]">{source}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PanelSection({ title, count, collapsed, onToggle, children }) {
  return (
    <div className="border-b border-[#222]">
      <button onClick={onToggle} className="w-full flex items-center px-[16px] py-[10px]">
        <svg
          width="10" height="10" viewBox="0 0 10 10"
          className={`shrink-0 mr-[8px] text-text-2/40 transition-transform ${collapsed ? '' : 'rotate-90'}`}
        >
          <path d="M3 1.5l4 3.5-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[12px] text-text-2/60 font-medium">{title}</span>
        {count != null && <span className="text-[11px] text-text-2/25 ml-[6px]">{count}</span>}
      </button>
      {!collapsed && <div className="px-[16px] pb-[14px]">{children}</div>}
    </div>
  )
}
