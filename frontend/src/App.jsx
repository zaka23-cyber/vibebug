import { useState } from 'react'
import ErrorForm from './components/ErrorForm'
import AnalysisResult from './components/AnalysisResult'

const EXAMPLES = [
  {
    platform: 'Lovable',
    error: "TypeError: Cannot read properties of undefined (reading 'map')",
    explanation: "Your app is trying to loop through a list that doesn't exist yet. The data hasn't loaded before the page tries to use it.",
  },
  {
    platform: 'Bolt',
    error: 'FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory',
    explanation: "Your app ran out of memory. It's trying to process too much data at once and crashed.",
  },
  {
    platform: 'General',
    error: 'java.lang.NullPointerException at LoginService.java:47',
    explanation: "Your app tried to use something that doesn't exist. It's like trying to open a door that was never built.",
  },
]

function ExamplesSection() {
  return (
    <div className="mb-6">
      <div className="text-center mb-5">
        <h2 className="text-white font-bold text-lg mb-1">See it in action</h2>
        <p className="text-white/40 text-sm">Real errors, explained in plain English</p>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {EXAMPLES.map(({ platform, error, explanation }) => (
          <div
            key={platform}
            className="flex-shrink-0 bg-white/[0.04] border border-white/8 rounded-xl p-4 hover:border-white/20 transition-colors"
            style={{ minWidth: '280px' }}
          >
            <div className="flex justify-end mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/10">
                {platform}
              </span>
            </div>
            <pre className="text-orange-400/80 text-xs font-mono leading-relaxed whitespace-pre-wrap break-words bg-black/30 rounded-md p-3 mb-3">
              {error}
            </pre>
            <div className="text-center text-white/30 text-base mb-3">→</div>
            <p className="text-white/80 text-sm leading-relaxed">{explanation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [submittedErrorText, setSubmittedErrorText] = useState('')

  async function handleSubmit(platform, errorText, code) {
    setLoading(true)
    setResult(null)
    setError(null)
    setSubmittedErrorText(errorText)

    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: errorText, code, platform }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `Server error: ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Could not reach the backend. Make sure it is running on port 8000.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-[760px] mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl" role="img" aria-label="bug">🐛</span>
            <h1 className="text-4xl font-bold tracking-tight text-white">VibeFix</h1>
          </div>
          <p className="text-white/40 text-base">AI Error Explainer for Vibe Coders</p>
        </header>

        {/* Form card */}
        <div className="bg-white/[0.04] border border-white/8 rounded-xl p-6 mb-6">
          <ErrorForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Examples — only shown before any result */}
        {!result && !loading && <ExamplesSection />}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center gap-3 text-white/50 text-sm py-4">
            <svg className="animate-spin w-4 h-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Analyzing your error...
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-950/40 border border-red-800/50 rounded-lg p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {result && !loading && <AnalysisResult data={result} errorText={submittedErrorText} />}
      </div>
    </div>
  )
}
