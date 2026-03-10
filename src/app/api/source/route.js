import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get('path')

  if (!filePath) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 })
  }

  // Only allow reading from src/ directory
  if (!filePath.startsWith('src/')) {
    return NextResponse.json({ error: 'Path must be within src/' }, { status: 403 })
  }

  // Block dotfiles and node_modules
  if (filePath.includes('..') || filePath.includes('node_modules')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 403 })
  }

  const fullPath = path.join(process.cwd(), filePath)

  try {
    const source = fs.readFileSync(fullPath, 'utf-8')
    return NextResponse.json({ source, path: filePath })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
