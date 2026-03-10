'use client'

export default function FlowCard({ flow, selected, onSelect, stepNames }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left rounded-[8px] px-[12px] py-[10px] transition cursor-pointer flex flex-col w-full ${
        selected
          ? 'bg-card-bg ring-1 ring-text-1/20'
          : 'ring-1 ring-text-2/8 hover:ring-text-2/20 hover:bg-card-bg/30'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <p className="text-text-1 text-[12px] font-medium truncate">{flow.name}</p>
        <p className="text-text-2/40 text-[10px] shrink-0">{flow.steps.length} steps</p>
      </div>
      {stepNames && stepNames.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-[4px] gap-y-[2px] mt-[6px]">
          {stepNames.map((name, i) => (
            <span key={i} className="text-[9px] text-text-2/40 bg-text-2/5 px-[5px] py-[1px] rounded-[3px]">{name}</span>
          ))}
        </div>
      )}
    </button>
  )
}
