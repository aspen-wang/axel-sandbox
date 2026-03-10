import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import {
  readIterations,
  writeIterations,
  getFilePath,
  getArchiveDir,
  nextLabel,
} from '@/lib/iterations'

// GET — return all iterations
export async function GET() {
  const data = readIterations()
  return NextResponse.json(data)
}

// POST — create a new version
// Body: { type: 'component'|'screen', slug: 'flight-card', prompt?: string, sourceVersion?: string }
export async function POST(request) {
  const { type, slug, prompt, sourceVersion } = await request.json()
  const key = `${type}:${slug}`

  const data = readIterations()
  if (!data[key]) {
    return NextResponse.json({ error: 'Unknown item' }, { status: 404 })
  }

  const versions = data[key].versions
  const label = nextLabel(versions)

  // Copy from the source version (default to A/main)
  const source = sourceVersion || 'A'
  const sourceFilePath = getFilePath(key, source)
  const newFilePath = getFilePath(key, label)

  if (!fs.existsSync(sourceFilePath)) {
    // Fallback to main if source doesn't exist
    const mainFilePath = getFilePath(key, 'A')
    if (!fs.existsSync(mainFilePath)) {
      return NextResponse.json({ error: 'Source file not found' }, { status: 404 })
    }
    const content = fs.readFileSync(mainFilePath, 'utf-8')
    fs.writeFileSync(newFilePath, content)
  } else {
    const content = fs.readFileSync(sourceFilePath, 'utf-8')
    fs.writeFileSync(newFilePath, content)
  }

  // Add version entry with prompt as notes
  const newVersion = {
    label,
    isMain: false,
    createdAt: new Date().toISOString(),
    notes: prompt || '',
    sourceVersion: source,
  }
  data[key].versions.push(newVersion)
  writeIterations(data)

  return NextResponse.json({ version: newVersion, key })
}

// DELETE — delete a specific version
// Body: { type: 'component'|'screen', slug: 'flight-card', label: 'C' }
export async function DELETE(request) {
  const { type, slug, label } = await request.json()
  const key = `${type}:${slug}`

  if (label === 'A') {
    return NextResponse.json({ error: 'Cannot delete main version' }, { status: 400 })
  }

  const data = readIterations()
  if (!data[key]) {
    return NextResponse.json({ error: 'Unknown item' }, { status: 404 })
  }

  const versions = data[key].versions
  const idx = versions.findIndex((v) => v.label === label)
  if (idx === -1) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 })
  }

  // Delete or archive the file
  const filePath = getFilePath(key, label)
  if (fs.existsSync(filePath)) {
    const archiveDir = getArchiveDir(key)
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true })
    }
    const basename = path.basename(filePath)
    fs.renameSync(filePath, path.join(archiveDir, basename))
  }

  // Remove from iterations
  data[key].versions.splice(idx, 1)
  writeIterations(data)

  return NextResponse.json({ deleted: label, key })
}

// PUT — save a version as main (and archive others)
// Body: { type: 'component'|'screen', slug: 'flight-card', saveVersion: 'C' }
export async function PUT(request) {
  const { type, slug, saveVersion } = await request.json()
  const key = `${type}:${slug}`

  const data = readIterations()
  if (!data[key]) {
    return NextResponse.json({ error: 'Unknown item' }, { status: 404 })
  }

  const versions = data[key].versions
  const targetVersion = versions.find((v) => v.label === saveVersion)
  if (!targetVersion) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 })
  }

  const mainFilePath = getFilePath(key, 'A')
  const archiveDir = getArchiveDir(key)

  // Ensure archive directory exists
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true })
  }

  // If saving a non-A version, copy it to main
  if (saveVersion !== 'A') {
    const versionFilePath = getFilePath(key, saveVersion)
    const versionContent = fs.readFileSync(versionFilePath, 'utf-8')
    fs.writeFileSync(mainFilePath, versionContent)
  }

  // Move all non-main version files to archive
  for (const v of versions) {
    if (v.label === 'A') continue
    const vFilePath = getFilePath(key, v.label)
    if (fs.existsSync(vFilePath)) {
      const basename = path.basename(vFilePath)
      const archivePath = path.join(archiveDir, basename)
      fs.renameSync(vFilePath, archivePath)
    }
  }

  // Reset versions to just the main
  data[key].versions = [
    {
      label: 'A',
      isMain: true,
      createdAt: new Date().toISOString(),
      notes: targetVersion.notes || '',
    },
  ]
  writeIterations(data)

  return NextResponse.json({ saved: saveVersion, key })
}

// PATCH — set a version as main (swap isMain flag only, no file changes)
// Body: { type, slug, label }
export async function PATCH(request) {
  const { type, slug, label } = await request.json()
  const key = `${type}:${slug}`

  const data = readIterations()
  if (!data[key]) {
    return NextResponse.json({ error: 'Unknown item' }, { status: 404 })
  }

  const versions = data[key].versions
  const target = versions.find((v) => v.label === label)
  if (!target) {
    return NextResponse.json({ error: 'Version not found' }, { status: 404 })
  }

  // Swap isMain: unset all, set target
  for (const v of versions) {
    v.isMain = v.label === label
  }
  writeIterations(data)

  return NextResponse.json({ ok: true, main: label, key })
}
