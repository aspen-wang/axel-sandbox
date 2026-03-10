import { flows } from '@/dashboard.config'
import { notFound } from 'next/navigation'
import { getFlowGraph } from '@/lib/flow-graph'
import { readIterations } from '@/lib/iterations'
import FlowView from './FlowView'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return flows.map((f) => ({ slug: f.slug }))
}

export default function FlowPage({ params, searchParams }) {
  const flow = flows.find((f) => f.slug === params.slug)
  if (!flow) notFound()

  const graph = getFlowGraph(flow.slug)
  const iterations = readIterations()

  return <FlowView flow={flow} initialGraph={graph} initialView={searchParams.view || null} iterations={iterations} />
}
