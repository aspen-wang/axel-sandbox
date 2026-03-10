'use client'

export default function StepProgress({ steps = [], current = 0, completed = [] }) {
  return (
    <div className="h-[44px] w-full px-[16px] flex items-center">
      {steps.map((step, i) => {
        const isCompleted = completed.includes(i)
        const isActive = i === current
        const isFuture = !isCompleted && !isActive

        return (
          <div key={i} className="flex items-center flex-1 last:flex-initial">
            {/* Step node */}
            <div className="flex flex-col items-center">
              <span className="text-[12px] leading-none mb-[4px]">{step.emoji}</span>
              {isCompleted ? (
                <div className="w-[8px] h-[8px] rounded-full bg-green flex items-center justify-center">
                  <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div
                  className="w-[8px] h-[8px] rounded-full"
                  style={{ backgroundColor: isActive ? '#EF508D' : '#474747' }}
                />
              )}
              <span
                className={`text-[10px] mt-[2px] leading-none whitespace-nowrap ${
                  isCompleted
                    ? 'text-green'
                    : isActive
                    ? 'text-text-1'
                    : 'text-text-2/40'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div
                className="h-[2px] flex-1 mx-[4px] mt-[-10px]"
                style={{
                  backgroundColor: isCompleted
                    ? '#4FC660'
                    : isActive
                    ? '#EF508D'
                    : '#333',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
