import fs from 'fs'
import path from 'path'

const CAPTURES_PATH = path.join(process.cwd(), 'src/data/captures.json')

export function readCaptures() {
  const raw = fs.readFileSync(CAPTURES_PATH, 'utf-8')
  return JSON.parse(raw)
}

export function writeCaptures(data) {
  fs.writeFileSync(CAPTURES_PATH, JSON.stringify(data, null, 2))
}

export function createCapture({ type, slug, targetPage, urls, frameLabel, figmaDestinationUrl, dimensions }) {
  const captures = readCaptures()
  const capture = {
    id: `cap_${Date.now()}`,
    type,
    slug,
    targetPage,
    urls,
    frameLabel: frameLabel || null,
    figmaDestinationUrl: figmaDestinationUrl || null,
    dimensions: dimensions || null,
    status: 'pending',
    figmaUrl: null,
    createdAt: new Date().toISOString(),
  }
  captures.push(capture)
  writeCaptures(captures)
  return capture
}

export function updateCapture(id, updates) {
  const captures = readCaptures()
  const idx = captures.findIndex((c) => c.id === id)
  if (idx === -1) return null
  captures[idx] = { ...captures[idx], ...updates }
  writeCaptures(captures)
  return captures[idx]
}
