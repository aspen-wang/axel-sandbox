import fs from 'fs'
import path from 'path'

const FLOW_GRAPHS_PATH = path.join(process.cwd(), 'src/data/flow-graphs.json')

export function readFlowGraphs() {
  const raw = fs.readFileSync(FLOW_GRAPHS_PATH, 'utf-8')
  return JSON.parse(raw)
}

export function getFlowGraph(slug) {
  const graphs = readFlowGraphs()
  return graphs[slug] || null
}

export function updateFlowGraph(slug, data) {
  const graphs = readFlowGraphs()
  graphs[slug] = data
  fs.writeFileSync(FLOW_GRAPHS_PATH, JSON.stringify(graphs, null, 2))
  return graphs[slug]
}
