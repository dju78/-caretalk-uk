import { useState } from 'react'

const examples = [
  { label: 'Refused food',       text: 'Mary refused food and was angry.' },
  { label: 'Had a fall',         text: 'John fell out of bed this morning.' },
  { label: 'Refused medication', text: 'Client did not take medicine.' },
  { label: 'Seemed confused',    text: 'He was confused and did not know where he was.' },
  { label: 'Upset and crying',   text: 'She was crying and very upset.' },
]

const tips = [
  'Use "the service user" instead of their real name',
  'Say what you observed, not what you assumed',
  'Include the time and what action was taken',
  'State whether it was reported to a senior',
  'Avoid emotional language — stay factual and calm',
]

interface Coaching {
  didWell: string
  missing: string
  language: string
  safeguarding: string
  question: string
  scores: {
    factual: number
    language: number
    completeness: number
    safeguarding: number
  }
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const colour = value >= 7 ? 'bg-green-600' : value < 5 ? 'bg-red-500' : 'bg-blue-600'
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm text-slate-600 w-40 shrink-0">{label}</span>
      <div className="flex-1 bg-slate-200 rounded-full h-2.5">
        <div className={`${colour} h-2.5 rounded-full`} style={{ width: `${value * 10}%` }} />
      </div>
      <span className="text-sm font-semibold text-slate-700 w-10 text-right">{Math.round(value)}/10</span>
    </div>
  )
}

export default function CareNoteCoach() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<Coaching | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCoach() {
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: input }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setResult(data.coaching)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not connect to the coaching service.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">🎓 Care Note Training Coach</h1>

      <div className="bg-blue-700 text-white rounded-xl p-4 mb-3">
        <p className="font-semibold">CareTalk UK does not write the note for you. It trains you to write better notes.</p>
      </div>
      <p className="text-slate-500 mb-6">
        Write your own care note and receive coaching feedback on clarity, professionalism, completeness, and safeguarding awareness.
      </p>

      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-amber-500 text-lg shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm leading-relaxed">
          <span className="font-semibold">Training only: </span>
          CareTalk UK supports learning and reflective practice. Staff must write their own care notes and follow employer policy, care plans, safeguarding procedures, and local reporting requirements.
        </p>
      </div>

      <p className="text-sm font-medium text-slate-600 mb-2">Try an example:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {examples.map(e => (
          <button
            key={e.label}
            onClick={() => { setInput(e.text); setResult(null); setError('') }}
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

      <label htmlFor="careNote" className="block text-sm font-medium text-slate-700 mb-2">
        Write your own care note
      </label>
      <textarea
        id="careNote"
        className="w-full border border-slate-300 rounded-xl p-4 text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        rows={5}
        placeholder="Write your care note here in your own words…"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        onClick={handleCoach}
        disabled={loading || !input.trim()}
        className="mt-3 w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Reviewing your note…' : 'Get coaching feedback'}
      </button>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm font-semibold mb-1">⚠️ Could not get coaching</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Coaching feedback</h2>

            <div className="mb-4">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">What you did well</p>
              <p className="text-slate-700 text-sm">{result.didWell}</p>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Important details missing</p>
              <p className="text-slate-700 text-sm">{result.missing}</p>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Is the language factual and professional?</p>
              <p className="text-slate-700 text-sm">{result.language}</p>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Safeguarding or escalation</p>
              <p className="text-slate-700 text-sm">{result.safeguarding}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Reflective question</p>
              <p className="text-slate-700 text-sm italic">{result.question}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Your scores</h2>
            <ScoreBar label="Factual clarity" value={result.scores.factual} />
            <ScoreBar label="Professional language" value={result.scores.language} />
            <ScoreBar label="Completeness" value={result.scores.completeness} />
            <ScoreBar label="Safeguarding awareness" value={result.scores.safeguarding} />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-600 text-sm">
              This is coaching feedback to help you improve your own note. CareTalk UK does not produce a finished care note. Revise your note in your own words and follow your employer's policy and care plan.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
