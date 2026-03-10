import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LINK_PATH = path.join(process.cwd(), 'src/data/figma-link.json')

function readLink() {
  try {
    return JSON.parse(fs.readFileSync(LINK_PATH, 'utf-8'))
  } catch {
    return null
  }
}

function writeLink(data) {
  fs.writeFileSync(LINK_PATH, JSON.stringify(data, null, 2) + '\n')
}

// GET — return current figma link
export async function GET() {
  return NextResponse.json(readLink())
}

// POST — save figma link { nickname, url }
export async function POST(req) {
  const body = await req.json()
  const { nickname, url } = body

  if (!nickname?.trim() || !url?.trim()) {
    return NextResponse.json({ error: 'nickname and url required' }, { status: 400 })
  }

  const link = { nickname: nickname.trim(), url: url.trim(), linkedAt: new Date().toISOString() }
  writeLink(link)
  return NextResponse.json(link)
}

// DELETE — unlink
export async function DELETE() {
  writeLink(null)
  return NextResponse.json({ success: true })
}
