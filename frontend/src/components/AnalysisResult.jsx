import { useState } from 'react'
import SeverityBadge from './SeverityBadge'

function Card({ borderColor, title, children }) {
  return (
    <div
      className="bg-white/[0.04] rounded-lg p-5 border border-white/8"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  )
}

export default function AnalysisResult({ data, errorText }) {
  const [copied, setCopied] = useState(false)

  function copyPrompt() {
    navigator.clipboard.writeText(data.prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <SeverityBadge severity={data.severity} />
        <span className="text-white/30 text-sm">Analysis complete</span>
      </div>

      {/* Side-by-side: Raw Error + Plain English */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="bg-white/[0.04] rounded-lg p-5 border border-white/8"
          style={{ borderLeft: '4px solid #f97316' }}
        >
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Your Error</p>
          <div
            className="overflow-y-auto text-orange-300/90 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words"
            style={{ maxHeight: '300px' }}
          >
            {errorText}
          </div>
        </div>

        <div
          className="bg-white/[0.04] rounded-lg p-5 border border-white/8"
          style={{ borderLeft: '4px solid #7c3aed' }}
        >
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">What This Means</p>
          <p className="text-white/85 text-sm leading-relaxed mb-4">{data.what}</p>
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Why It Happened</p>
          <p className="text-white/75 text-sm leading-relaxed">{data.why}</p>
        </div>
      </div>

      <Card borderColor="#22c55e" title="How To Fix It">
        <ol className="flex flex-col gap-2">
          {data.fix.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-white/85 leading-relaxed">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-900/60 text-green-300 text-xs flex items-center justify-center font-bold mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card borderColor="#7c3aed" title="Ready-to-Paste Prompt">
        <div className="relative">
          <pre className="text-white/80 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words bg-black/30 rounded-md p-4 pr-24">
            {data.prompt}
          </pre>
          <button
            onClick={copyPrompt}
            className="absolute top-3 right-3 px-3 py-1.5 bg-accent/80 hover:bg-accent text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            {copied ? 'Copied ✓' : 'Copy Prompt'}
          </button>
        </div>
      </Card>
    </div>
  )
}
