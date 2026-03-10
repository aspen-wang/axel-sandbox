import StatusBadge from './StatusBadge'

export default function ScreenCard({ screen, selected, onSelect, flowNames, componentNames }) {
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
        <p className="text-text-1 text-[12px] font-medium truncate">{screen.name}</p>
        <StatusBadge status={screen.status} />
      </div>
      <p className="text-text-2/40 text-[10px] mt-[4px]">{screen.component}.jsx</p>
      {(flowNames?.length > 0 || componentNames?.length > 0) && (
        <div className="flex flex-wrap items-center gap-x-[6px] gap-y-[2px] mt-[6px]">
          {flowNames?.map((f) => (
            <span key={f} className="text-[9px] text-text-2/50 bg-text-2/6 px-[5px] py-[1px] rounded-[3px]">{f}</span>
          ))}
          {componentNames?.map((c) => (
            <span key={c} className="text-[9px] text-text-2/40 bg-text-2/5 px-[5px] py-[1px] rounded-[3px]">{c}</span>
          ))}
        </div>
      )}
    </button>
  )
}
