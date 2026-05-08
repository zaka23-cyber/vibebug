export default function SeverityBadge({ severity }) {
  const config = {
    low: { bg: 'bg-green-900/60', text: 'text-green-300', border: 'border-green-700', label: 'Low Severity' },
    medium: { bg: 'bg-amber-900/60', text: 'text-amber-300', border: 'border-amber-700', label: 'Medium Severity' },
    high: { bg: 'bg-red-900/60', text: 'text-red-300', border: 'border-red-700', label: 'High Severity' },
  }

  const s = config[severity?.toLowerCase()] ?? config.medium

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border} uppercase tracking-wide`}
    >
      {s.label}
    </span>
  )
}
