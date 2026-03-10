export default function ComponentCard({ comp, versionCount, selected, onSelect, usedInScreens }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left rounded-[8px] px-[12px] py-[10px] transition cursor-pointer flex flex-col w-full ${
        selected
          ? 'bg-card-bg ring-1 ring-text-1/20'
          : 'ring-1 ring-text-2/8 hover:ring-text-2/20 hover:bg-card-bg/30'
      }`}
    >
      <p className="text-text-1 text-[12px] font-medium truncate">{comp.name}</p>
      <div className="flex items-center gap-[8px] mt-[4px]">
        <p className="text-text-2/40 text-[10px]">
          {comp.variants?.length || 1} variant{(comp.variants?.length || 1) !== 1 ? 's' : ''}
        </p>
        {versionCount > 1 && (
          <p className="text-text-2/50 text-[10px]">{versionCount} versions</p>
        )}
      </div>
      {usedInScreens?.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-[4px] gap-y-[2px] mt-[6px]">
          {usedInScreens.map((s) => (
            <span key={s} className="text-[9px] text-text-2/40 bg-text-2/5 px-[5px] py-[1px] rounded-[3px]">{s}</span>
          ))}
        </div>
      )}
    </button>
  )
}
