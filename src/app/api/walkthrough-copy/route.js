import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'src/data/walkthrough-copy.json')

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    fs.writeFileSync(FILE, JSON.stringify(body, null, 2))
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
