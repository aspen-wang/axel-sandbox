import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/component-versions.json')

function readVersions() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return {}
  }
}

function writeVersions(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// GET — return all component versions
export async function GET() {
  return NextResponse.json(readVersions())
}

// POST — add a new version entry
// Body: { componentKey, version, variant, notes }
export async function POST(request) {
  const { componentKey, version, variant, notes } = await request.json()
  if (!componentKey || !version || !variant) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const data = readVersions()
  if (!data[componentKey]) data[componentKey] = []

  // Check for duplicate version
  if (data[componentKey].some(v => v.version === version)) {
    return NextResponse.json({ error: 'Version already exists' }, { status: 409 })
  }

  const entry = {
    version,
    variant,
    timestamp: new Date().toISOString(),
    notes: notes || '',
  }
  data[componentKey].push(entry)
  writeVersions(data)

  return NextResponse.json(entry)
}

// DELETE — remove a version entry
// Body: { componentKey, version }
export async function DELETE(request) {
  const { componentKey, version } = await request.json()
  if (!componentKey || !version) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const data = readVersions()
  if (!data[componentKey]) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }

  const idx = data[componentKey].findIndex(v => v.version === version)
  if (idx === -1) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 })
  }

  data[componentKey].splice(idx, 1)
  if (data[componentKey].length === 0) delete data[componentKey]
  writeVersions(data)

  return NextResponse.json({ deleted: version, componentKey })
}
