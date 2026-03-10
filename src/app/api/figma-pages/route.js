import { NextResponse } from 'next/server'

const FIGMA_FILE_KEY = '9pbBXxSus03lQbq9ErSCmO'

// GET — fetch real pages from Figma REST API
export async function GET() {
  const token = process.env.FIGMA_ACCESS_TOKEN
  if (!token || token === 'your-token-here') {
    return NextResponse.json(
      { error: 'FIGMA_ACCESS_TOKEN not configured in .env.local' },
      { status: 503 }
    )
  }

  try {
    const res = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}?depth=1`,
      {
        headers: { 'X-Figma-Token': token },
        next: { revalidate: 0 }, // no cache
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: `Figma API ${res.status}: ${text}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    const pages = (data.document?.children || [])
      .filter((c) => c.type === 'CANVAS')
      .map((c) => ({ id: c.id, name: c.name }))

    return NextResponse.json(pages)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
