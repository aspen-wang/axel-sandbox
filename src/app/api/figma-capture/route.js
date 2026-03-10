import { NextResponse } from 'next/server'
import { readCaptures, createCapture, updateCapture } from '@/lib/captures'

// GET — list all capture requests (optionally filter by status)
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  let captures = readCaptures()
  if (status) {
    captures = captures.filter((c) => c.status === status)
  }

  return NextResponse.json(captures)
}

// POST — create a new capture request
// Body: { type: 'screen'|'flow'|'dressroom', slug, targetPage, urls?, frameLabel?, baseUrl?, steps? }
export async function POST(request) {
  const body = await request.json()
  const { type, slug, targetPage, baseUrl, frameLabel, steps, figmaDestinationUrl, dimensions } = body

  // Use body urls when provided, otherwise build from type
  let urls = body.urls && body.urls.length > 0 ? body.urls : []
  if (urls.length === 0) {
    const base = baseUrl || 'http://localhost:3000'
    if (type === 'screen') {
      urls = [`${base}/screen/${slug}`]
    } else if (type === 'flow') {
      if (steps && steps.length > 0) {
        urls = steps.map((s) => `${base}/screen/${s}`)
      } else {
        urls = [`${base}/flow/${slug}`]
      }
    } else if (type === 'component') {
      urls = [`${base}/preview/component-export?slugs=${slug}`]
    }
  }

  const capture = createCapture({ type, slug, targetPage, urls, frameLabel, figmaDestinationUrl, dimensions })

  return NextResponse.json(capture)
}

// PUT — update a capture (mark as completed with figmaUrl)
// Body: { id: 'cap_123', status: 'completed', figmaUrl: '...' }
export async function PUT(request) {
  const { id, status, figmaUrl } = await request.json()
  const updated = updateCapture(id, { status, figmaUrl })
  if (!updated) {
    return NextResponse.json({ error: 'Capture not found' }, { status: 404 })
  }
  return NextResponse.json(updated)
}
