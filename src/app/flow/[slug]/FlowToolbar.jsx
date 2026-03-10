'use client'

export default function FlowToolbar({ node, onRemove, onDeselect, onAssignScreen }) {
  const nodeType = node?.type || 'screen'

  return (
    <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-[8px] bg-card-bg border border-grey rounded-[12px] px-[16px] py-[10px] shadow-lg">
      <span className="px-[8px] py-[4px] rounded-[4px] bg-bg-2 text-text-2/60 text-[10px] uppercase tracking-wider">
        {nodeType}
      </span>

      {nodeType === 'stage' && (
        <button
          onClick={onAssignScreen}
          className="px-[12px] py-[6px] rounded-[6px] text-[12px] font-medium bg-bg-2 text-green hover:bg-green/10 transition"
        >
          Assign Screen
        </button>
      )}

      <button
        onClick={onRemove}
        className="px-[12px] py-[6px] rounded-[6px] text-[12px] font-medium bg-bg-2 text-red hover:bg-red/10 transition"
      >
        Remove
      </button>
      <button
        onClick={onDeselect}
        className="px-[12px] py-[6px] rounded-[6px] text-[12px] font-medium bg-bg-2 text-text-2 hover:text-text-1 transition"
      >
        Deselect
      </button>
    </div>
  )
}
