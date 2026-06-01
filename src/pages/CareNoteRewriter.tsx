import { useState } from 'react'

const examples = [
  { label: 'Refused food',     text: 'Mary refused food and was angry.' },
  { label: 'Had a fall',       text: 'John fell out of bed this morning.' },
  { label: 'Refused medication', text: 'Client did not take medicine.' },
  { label: 'Seemed confused',  text: 'He was confused and did not know where he was.' },
  { label: 'Upset and crying', text: 'She was crying and very upset.' },
]

const tips = [
  'Use "the service user" instead of their real name',
  'Say what you observed, not what you assumed',
  'Include the time and what action was taken',
  'State whether it was reported to a senior',
  'Avoid emotional language — stay factual and calm',
]

export default function CareNoteRewriter() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiMode, setAiMode] = useState(true)

  async function handleRewrite() {
    if (!input.trim()) return
    setLoading(true)
    setResult('')
    setError('')

    if (aiMode) {
      try {
        const res = await fetch('/api/rewrite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ note: input }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Server error')
        setResult(data.result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not connect to API server.')
      } finally {
        setLoading(false)
      }
    } else {
      // Mock fallback
      await new Promise(r => setTimeout(r, 900))
      setResult(
        `The service user ${input.trim().replace(/^[A-Z]/, c => c.toLowerCase())} Staff responded promptly and the situation was managed in line with the care plan. The matter has been documented accurately and reported to the senior carer on duty. Monitoring will continue throughout the shift and any further changes will be escalated as appropriate.`
      )
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">📝 Care Note Rewriter</h1>
      <p className="text-slate-500 mb-6">
        Type a simple care note and get a professional version using correct UK care language.
      </p>

      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-amber-500 text-lg shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm leading-relaxed">
          <span className="font-semibold">Privacy: </span>
          Do not use real names or NHS numbers. Write "the service user" or use a made-up name.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-slate-600">Try an example:</p>
        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
          <div
            onClick={() => setAiMode(m => !m)}
            className={`w-9 h-5 rounded-full relative transition-colors ${aiMode ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${aiMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          {aiMode ? 'AI mode on' : 'Mock mode'}
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {examples.map(e => (
          <button
            key={e.label}
            onClick={() => { setInput(e.text); setResult(''); setError('') }}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-semibold text-blue-800 mb-2">Professional care writing tips:</p>
        <ul className="space-y-1">
          {tips.map((tip, i) => (
            <li key={i} className="text-blue-700 text-sm flex gap-2">
              <span className="text-blue-400 shrink-0">✓</span>{tip}
            </li>
          ))}
        </ul>
      </div>

      <textarea
        className="w-full border border-slate-300 rounded-xl p-4 text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        rows={4}
        placeholder='"Mary refused food and was angry."'
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        onClick={handleRewrite}
        disabled={loading || !input.trim()}
        className="mt-3 w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Rewriting with Claude AI…' : 'Rewrite Professionally'}
      </button>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm font-semibold mb-1">⚠️ Could not connect to AI</p>
          <p className="text-red-700 text-sm">{error}</p>
          <p className="text-red-600 text-xs mt-2">Make sure the API server is running: <code className="bg-red-100 px-1 rounded">npm run dev:server</code></p>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-green-800 mb-3">✅ Professional Version</p>
          <p className="text-slate-700 text-sm leading-relaxed">{result}</p>
          <button
            onClick={() => navigator.clipboard?.writeText(result)}
            className="mt-4 text-xs text-green-700 border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors"
          >
            Copy to clipboard
          </button>
        </div>
      )}
    </div>
  )
}
