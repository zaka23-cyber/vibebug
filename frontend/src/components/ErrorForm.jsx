import { useState } from 'react'
import PlatformSelector from './PlatformSelector'

export default function ErrorForm({ onSubmit, loading }) {
  const [platform, setPlatform] = useState('general')
  const [errorText, setErrorText] = useState('')
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!errorText.trim()) return
    onSubmit(platform, errorText, code)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <p className="text-white/50 text-sm mb-3 font-medium uppercase tracking-wider">Platform</p>
        <PlatformSelector selected={platform} onChange={setPlatform} />
      </div>

      <div>
        <label className="block text-white/50 text-sm mb-2 font-medium uppercase tracking-wider">
          Paste your error message
        </label>
        <textarea
          value={errorText}
          onChange={(e) => setErrorText(e.target.value)}
          placeholder="TypeError: Cannot read properties of undefined..."
          required
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 font-mono text-sm resize-y focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
          style={{ minHeight: '120px' }}
        />
      </div>

      {!showCode ? (
        <button
          type="button"
          onClick={() => setShowCode(true)}
          className="self-start text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer"
        >
          + Add code snippet
        </button>
      ) : (
        <div>
          <label className="block text-white/50 text-sm mb-2 font-medium uppercase tracking-wider">
            Paste your code{' '}
            <span className="normal-case text-white/30">(optional)</span>
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste the relevant code here..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 font-mono text-sm resize-y focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
            style={{ minHeight: '100px' }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !errorText.trim()}
        className="self-start px-7 py-3 bg-accent hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm cursor-pointer"
      >
        {loading ? 'Analyzing...' : 'Debug This →'}
      </button>
    </form>
  )
}
