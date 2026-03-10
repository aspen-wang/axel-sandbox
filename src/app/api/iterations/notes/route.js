import { NextResponse } from 'next/server'
import { readIterations, writeIterations } from '@/lib/iterations'

// PATCH — update notes for a version
// Body: { type: 'component'|'screen', slug: 'flight-card', label: 'B', notes: '...' }
export async function PATCH(request) {
  const { type, slug, label, notes } = await request.json()
  const key = `${type}:${slug}`

  const data = readIterations()
  if (!data[key]) {
    return NextResponse.json({ error: 'Unknown item' }, { status: 404 })
  }

  const version = data[key].versions.find((v) => v.label === label)
  if (!version) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 })
  }

  version.notes = notes
  writeIterations(data)

  return NextResponse.json({ updated: true, key, label })
}
