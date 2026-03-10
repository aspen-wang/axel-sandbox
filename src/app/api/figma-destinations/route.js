import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'src/data/figma-destinations.json')

function read() {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

function write(data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

// GET — list saved destinations
export async function GET() {
  return NextResponse.json(read())
}

// POST — save a new destination { url, name }
export async function POST(request) {
  const { url, name } = await request.json()
  if (!url || !name) {
    return NextResponse.json({ error: 'url and name required' }, { status: 400 })
  }

  const destinations = read()
  const existing = destinations.find((d) => d.url === url)
  if (existing) {
    existing.name = name
    existing.lastUsed = Date.now()
  } else {
    destinations.push({ url, name, lastUsed: Date.now() })
  }

  write(destinations)
  return NextResponse.json(destinations)
}

// DELETE — remove a destination by url
export async function DELETE(request) {
  const { url } = await request.json()
  const destinations = read().filter((d) => d.url !== url)
  write(destinations)
  return NextResponse.json(destinations)
}
