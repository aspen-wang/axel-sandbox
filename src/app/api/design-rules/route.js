import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/design-rules.json')

function read() {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) } catch { return {} }
}

function write(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

export async function GET() {
  return NextResponse.json(read())
}

export async function PUT(request) {
  const data = await request.json()
  write(data)
  return NextResponse.json({ ok: true })
}
