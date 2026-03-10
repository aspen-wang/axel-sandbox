import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'src/data/combinations.json')

function readCombinations() {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
  } catch {
    return []
  }
}

function writeCombinations(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2) + '\n')
}

export async function GET() {
  return NextResponse.json(readCombinations())
}

export async function POST(req) {
  const { name, variants } = await req.json()
  if (!name || !variants) {
    return NextResponse.json({ error: 'name and variants required' }, { status: 400 })
  }

  const combos = readCombinations()
  const newCombo = {
    id: `combo_${Date.now()}`,
    name,
    variants,
    createdAt: new Date().toISOString(),
  }
  combos.push(newCombo)
  writeCombinations(combos)

  return NextResponse.json(newCombo)
}

// PUT — save/update the "current" auto-saved variants (persists across refresh)
export async function PUT(req) {
  const { variants } = await req.json()
  if (!variants) {
    return NextResponse.json({ error: 'variants required' }, { status: 400 })
  }

  const combos = readCombinations()
  const idx = combos.findIndex((c) => c.id === '__current__')
  const entry = {
    id: '__current__',
    name: '__current__',
    variants,
    createdAt: new Date().toISOString(),
  }
  if (idx >= 0) {
    combos[idx] = entry
  } else {
    combos.unshift(entry)
  }
  writeCombinations(combos)

  return NextResponse.json({ ok: true })
}

export async function DELETE(req) {
  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 })
  }

  let combos = readCombinations()
  combos = combos.filter((c) => c.id !== id)
  writeCombinations(combos)

  return NextResponse.json({ ok: true })
}
