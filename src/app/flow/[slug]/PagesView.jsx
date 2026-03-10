'use client'

import { screens } from '@/dashboard.config'

export default function PagesView({ flow, graph, screenVersion }) {
  // Order nodes by graph order (left to right by x position)
  const orderedNodes = [...graph.nodes].sort((a, b) => a.x - b.x)

  return (
    <div className="w-full overflow-x-auto px-[24px] py-[16px]">
      <div className="flex gap-[24px]">
        {orderedNodes.map((node, i) => {
          const nodeSlug = node.screenSlug || node.id
          const screen = screens.find((s) => s.slug === nodeSlug)
          const isBuilt = screen && screen.component
          const nodeType = node.type || 'screen'

          return (
            <div key={node.id} className="flex-shrink-0">
              {/* Step badge */}
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className={`w-[20px] h-[20px] rounded-full text-[10px] font-medium flex items-center justify-center ${
                  nodeType === 'decision' ? 'bg-orange/20 text-orange' : 'bg-green/20 text-green'
                }`}>
                  {nodeType === 'decision' ? '?' : i + 1}
                </span>
                <span className="text-text-1 text-[12px] font-medium">{node.label}</span>
              </div>

              {/* Preview card */}
              <div className="w-[200px] h-[434px] rounded-[12px] overflow-hidden bg-bg-2 ring-1 ring-grey">
                {isBuilt ? (
                  <div className="w-full h-full overflow-hidden">
                    <iframe
                      src={`/preview/screen/${nodeSlug}${screenVersion ? `?v=${screenVersion}` : ''}`}
                      className="border-0"
                      style={{
                        width: 393,
                        height: 852,
                        transform: 'scale(0.51)',
                        transformOrigin: 'top left',
                        pointerEvents: 'auto',
                      }}
                      tabIndex={-1}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-[12px] border-2 border-dashed border-grey rounded-[12px]">
                    <p className="text-text-2 text-[12px]">
                      {nodeType === 'stage' ? 'Stage placeholder' : nodeType === 'decision' ? 'Decision node' : 'Not yet built'}
                    </p>
                    {node.description && (
                      <p className="text-text-2/50 text-[10px] px-[12px] text-center">{node.description}</p>
                    )}
                    <button
                      onClick={() => {
                        const prompt = `Build the "${node.label}" screen for the ${flow.slug} flow. Use the same patterns as existing screens in src/projects/axel-one/screens/.`
                        navigator.clipboard.writeText(prompt)
                      }}
                      className="px-[10px] py-[6px] rounded-[6px] bg-bg text-green text-[11px] font-medium hover:bg-green/10 transition"
                    >
                      Generate
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
