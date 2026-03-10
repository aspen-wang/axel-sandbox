import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const POOL_PATH = path.join(process.cwd(), 'src/data/capture-pool.json')

function readPool() {
  try {
    return JSON.parse(fs.readFileSync(POOL_PATH, 'utf-8'))
  } catch {
    return { fileKey: null, pages: {} }
  }
}

function writePool(pool) {
  fs.writeFileSync(POOL_PATH, JSON.stringify(pool, null, 2) + '\n')
}

// GET — pool status (available count per page)
export async function GET() {
  const pool = readPool()
  const summary = {}
  let totalAvailable = 0

  for (const [nodeId, page] of Object.entries(pool.pages || {})) {
    const avail = (page.captures || []).filter((c) => c.status === 'available').length
    summary[nodeId] = { name: page.name, available: avail }
    totalAvailable += avail
  }

  return NextResponse.json({
    fileKey: pool.fileKey,
    available: totalAvailable,
    pages: summary,
  })
}

// POST — consume one captureId for a specific page
// Body: { pageNodeId } — the Figma page node ID (e.g. "5208:818")
export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const { pageNodeId } = body

  if (!pageNodeId) {
    return NextResponse.json(
      { error: 'pageNodeId is required' },
      { status: 400 }
    )
  }

  const pool = readPool()
  const page = pool.pages?.[pageNodeId]

  if (!page) {
    return NextResponse.json(
      { error: `No captures for page "${pageNodeId}". Ask Claude to generate more for this page.` },
      { status: 503 }
    )
  }

  const idx = page.captures.findIndex((c) => c.status === 'available')

  if (idx === -1) {
    return NextResponse.json(
      { error: `No captures left for "${page.name}". Ask Claude to generate more.` },
      { status: 503 }
    )
  }

  const capture = page.captures[idx]
  capture.status = 'used'
  capture.usedAt = new Date().toISOString()
  writePool(pool)

  const endpoint = `https://mcp.figma.com/mcp/capture/${capture.id}/submit`

  // Count total remaining
  let totalAvailable = 0
  for (const p of Object.values(pool.pages)) {
    totalAvailable += (p.captures || []).filter((c) => c.status === 'available').length
  }

  return NextResponse.json({
    captureId: capture.id,
    endpoint,
    pageName: page.name,
    remaining: totalAvailable,
  })
}
