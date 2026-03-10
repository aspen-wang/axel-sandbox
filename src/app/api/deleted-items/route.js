import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { readIterations, writeIterations } from '@/lib/iterations'

const filePath = path.join(process.cwd(), 'src/data/deleted-items.json')
const flowGraphsPath = path.join(process.cwd(), 'src/data/flow-graphs.json')
const configPath = path.join(process.cwd(), 'src/dashboard.config.js')

function read() {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) } catch { return [] }
}

function write(items) {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2) + '\n')
}

function readFlowGraphs() {
  try { return JSON.parse(fs.readFileSync(flowGraphsPath, 'utf-8')) } catch { return {} }
}

function writeFlowGraphs(data) {
  fs.writeFileSync(flowGraphsPath, JSON.stringify(data, null, 2))
}

// Read fileMappings from dashboard.config.js
function getFileMappings() {
  try {
    const content = fs.readFileSync(configPath, 'utf-8')
    const match = content.match(/export const fileMappings\s*=\s*(\{[\s\S]*?\n\})/)
    if (!match) return {}
    // Parse the object — it's simple enough for eval-like extraction
    const obj = {}
    const entries = match[1].matchAll(/'([^']+)':\s*\{\s*dir:\s*'([^']+)',\s*baseName:\s*'([^']+)'\s*\}/g)
    for (const e of entries) {
      obj[e[1]] = { dir: e[2], baseName: e[3] }
    }
    return obj
  } catch { return {} }
}

// Read flows from dashboard.config.js
function getFlows() {
  try {
    const content = fs.readFileSync(configPath, 'utf-8')
    const match = content.match(/export const flows\s*=\s*(\[[\s\S]*?\n\])/)
    if (!match) return []
    // Simple extraction of slug and steps
    const flows = []
    const flowMatches = match[1].matchAll(/slug:\s*'([^']+)'[\s\S]*?steps:\s*\[([^\]]+)\]/g)
    for (const fm of flowMatches) {
      const steps = [...fm[2].matchAll(/'([^']+)'/g)].map((m) => m[1])
      flows.push({ slug: fm[1], steps })
    }
    return flows
  } catch { return [] }
}

// Delete all version files for a given key (e.g. component:trip-card)
function eraseFiles(key, mappings) {
  const mapping = mappings[key]
  if (!mapping) return 0
  const dir = path.join(process.cwd(), mapping.dir)
  if (!fs.existsSync(dir)) return 0
  let count = 0
  const files = fs.readdirSync(dir)
  for (const file of files) {
    // Match BaseName.jsx, BaseName.B.jsx, BaseName.C.jsx, etc.
    if (file === `${mapping.baseName}.jsx` || file.match(new RegExp(`^${mapping.baseName}\\.[A-Z]\\.jsx$`))) {
      fs.unlinkSync(path.join(dir, file))
      count++
    }
  }
  // Also check archive subdirectory
  const archiveDir = path.join(dir, 'archive')
  if (fs.existsSync(archiveDir)) {
    const archiveFiles = fs.readdirSync(archiveDir)
    for (const file of archiveFiles) {
      if (file === `${mapping.baseName}.jsx` || file.match(new RegExp(`^${mapping.baseName}\\.[A-Z]\\.jsx$`))) {
        fs.unlinkSync(path.join(archiveDir, file))
        count++
      }
    }
  }
  return count
}

export async function GET() {
  return NextResponse.json(read())
}

// POST — add items to permanent deletion list (hide only)
export async function POST(request) {
  const { items } = await request.json()
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: 'items array required' }, { status: 400 })
  }
  const existing = read()
  const merged = [...existing]
  for (const item of items) {
    if (!merged.some((e) => e.type === item.type && e.slug === item.slug)) {
      merged.push({ type: item.type, slug: item.slug })
    }
  }
  write(merged)
  return NextResponse.json({ ok: true, count: merged.length })
}

// DELETE — erase items from code (files, iterations, flow-graphs)
export async function DELETE(request) {
  const { items } = await request.json()
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: 'items array required' }, { status: 400 })
  }

  const mappings = getFileMappings()
  const allFlows = getFlows()
  const iterations = readIterations()
  const flowGraphs = readFlowGraphs()
  let filesDeleted = 0

  for (const item of items) {
    const { type, slug } = item

    if (type === 'flow') {
      // Find flow's screens and delete their files
      const flow = allFlows.find((f) => f.slug === slug)
      if (flow) {
        for (const stepSlug of flow.steps) {
          const key = `screen:${stepSlug}`
          filesDeleted += eraseFiles(key, mappings)
          delete iterations[key]
        }
      }
      // Remove from flow-graphs
      delete flowGraphs[slug]
    } else if (type === 'component') {
      const key = `component:${slug}`
      filesDeleted += eraseFiles(key, mappings)
      delete iterations[key]
    } else if (type === 'screen') {
      const key = `screen:${slug}`
      filesDeleted += eraseFiles(key, mappings)
      delete iterations[key]
    }
  }

  writeIterations(iterations)
  writeFlowGraphs(flowGraphs)

  // Keep items in deleted-items.json so they stay hidden from config
  return NextResponse.json({ ok: true, filesDeleted })
}
