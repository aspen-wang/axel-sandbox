'use client'

export default function AxelChatContainer({ message, children, actions }) {
  return (
    <div className="mb-[16px]">
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>

      {message && (
        <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed mb-[12px] max-w-[300px]">
          {message}
        </p>
      )}

      {children && (
        <div className="mb-[12px]">{children}</div>
      )}

      {actions && actions.length > 0 && (
        <div className="flex flex-wrap" style={{ gap: '8px' }}>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className="border border-main rounded-[30px] px-[14px] py-[8px]"
            >
              <p className="text-[12px] font-medium text-main">{action.label}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
