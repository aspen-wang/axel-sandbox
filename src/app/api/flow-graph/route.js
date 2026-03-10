import { NextResponse } from 'next/server'
import { getFlowGraph, updateFlowGraph } from '@/lib/flow-graph'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const graph = getFlowGraph(slug)
  if (!graph) {
    return NextResponse.json({ error: 'Flow graph not found' }, { status: 404 })
  }

  return NextResponse.json(graph)
}

export async function PUT(request) {
  const { slug, nodes, edges } = await request.json()

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const updated = updateFlowGraph(slug, { nodes, edges })
  return NextResponse.json(updated)
}
