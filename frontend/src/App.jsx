import { useState } from 'react'
import ErrorForm from './components/ErrorForm'
import AnalysisResult from './components/AnalysisResult'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(platform, errorText, code) {
    setLoading(true)
    setResult(null)
    setError(null)

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
        {result && !loading && <AnalysisResult data={result} />}
      </div>
    </div>
  )
}
