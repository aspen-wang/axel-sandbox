export default function StatusBadge({ status }) {
  return (
    <span className="inline-block px-[8px] py-[2px] rounded-full text-[10px] font-medium leading-normal bg-text-2/10 text-text-2">
      {status}
    </span>
  )
}
