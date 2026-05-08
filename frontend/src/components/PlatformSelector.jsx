const PLATFORMS = ['Lovable', 'Bolt', 'v0', 'Cursor', 'General']

export default function PlatformSelector({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORMS.map((p) => {
        const isSelected = selected.toLowerCase() === p.toLowerCase()
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p.toLowerCase())}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
              isSelected
                ? 'bg-accent border-accent text-white'
                : 'bg-transparent border-white/20 text-white/60 hover:border-white/40 hover:text-white/80'
            }`}
          >
            {p}
          </button>
        )
      })}
    </div>
  )
}
