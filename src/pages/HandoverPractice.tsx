import { useState, useRef } from 'react'

const scenarios = [
  {
    id: 1,
    title: 'Service user had a fall',
    context:
      'During your morning shift, a service user was found on the floor beside their bed at 07:15. No injuries were found. They were helped back to bed safely. You completed an incident form and told the senior carer.',
    keyPoints: [
      'State the exact time of the fall',
      'Confirm whether injuries were found',
      'State what action was taken',
      'Confirm the incident was reported and documented',
      'Advise the next shift to monitor closely',
    ],
    modelAnswer:
      'At approximately 07:15 this morning, the service user was found on the floor beside their bed. Staff responded immediately. A physical assessment was carried out — no injuries or visible harm were noted. The service user was assisted back to bed safely and appeared settled afterwards. An incident form has been completed and the matter has been reported to the senior carer. The family have been informed in line with the care plan. Please continue to monitor the service user closely throughout your shift and escalate immediately if you notice any changes in mobility, pain, or confusion.',
  },
  {
    id: 2,
    title: 'Service user refused medication',
    context:
      'A service user refused their prescribed medication twice during your shift — at 08:00 and again at 13:00. They gave no reason. You recorded both refusals on the MAR chart and reported to the senior carer.',
    keyPoints: [
      'State the times of the refusals',
      'Note that no reason was given',
      'Confirm it was recorded on the MAR chart',
      'State it was reported to the senior carer',
      'Ask the next shift to try again and monitor',
    ],
    modelAnswer:
      'The service user declined their prescribed medication on two occasions today — at 08:00 and again at 13:00. No reason was provided on either occasion. Staff approached calmly and reassurance was offered. Both refusals have been recorded on the MAR chart and reported to the senior carer. The prescribing professional has been notified. Please attempt to administer the medication again at the next scheduled time. If the service user continues to refuse, please escalate to the nurse or prescriber immediately.',
  },
  {
    id: 3,
    title: 'Service user has reduced appetite',
    context:
      'A service user has eaten very little over the past two days. Today they only had a few spoons of soup and refused their evening meal. They have been drinking small amounts of water. You are handing over to the night shift.',
    keyPoints: [
      'Describe how long the poor appetite has lasted',
      'State exactly what was eaten and drunk today',
      'Note whether they refused or just left food',
      'Mention whether the senior carer was informed',
      'Ask the night shift to monitor fluid intake',
    ],
    modelAnswer:
      'The service user\'s appetite has been significantly reduced over the past two days. Today they managed only a small amount of soup at lunchtime and declined their evening meal entirely. Fluid intake has been minimal — approximately two cups of water throughout the day. Staff encouraged eating and offered alternative foods, but the service user declined. The senior carer has been informed and the concern has been documented in the care notes. Please continue to encourage small amounts of food and fluid throughout the night shift, record all intake on the food and fluid chart, and escalate to the on-call nurse if there is further deterioration.',
  },
  {
    id: 4,
    title: 'Service user appears confused',
    context:
      'During your afternoon shift, a service user who is normally alert and oriented appeared confused. They did not recognise their room and asked repeatedly for their family. This is not their normal behaviour. You reported it to the senior carer.',
    keyPoints: [
      'Describe exactly what you observed',
      'State that this is a change from their normal behaviour',
      'Confirm the senior carer was informed',
      'Note whether any physical observations were taken',
      'Ask the next shift to continue monitoring',
    ],
    modelAnswer:
      'During the afternoon shift, the service user presented with increased confusion, which is not in keeping with their usual baseline. They were unable to recognise their bedroom and repeatedly asked for family members. Staff provided calm reassurance and reorientation support throughout. Basic observations were recorded and there were no other physical concerns noted at this time. The change in presentation was reported to the senior carer, who has reviewed the service user. This has been documented in the care notes. Please continue to monitor closely throughout your shift. If confusion worsens, the service user becomes agitated, or observations change, please escalate to the on-call nurse immediately.',
  },
]

export default function HandoverPractice() {
  const [selected, setSelected] = useState(scenarios[0])
  const [userInput, setUserInput] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [aiFeedback, setAiFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const feedbackRef = useRef<HTMLDivElement>(null)

  function handleReset() {
    setUserInput('')
    setShowFeedback(false)
    setAiFeedback('')
    setError('')
  }

  async function handleSubmit() {
    if (!userInput.trim()) return
    setLoading(true)
    setShowFeedback(true)
    setAiFeedback('')
    setError('')
    try {
      const res = await fetch('http://localhost:3001/api/handover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: selected.context, userHandover: userInput }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setAiFeedback(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not connect to API server.')
    } finally {
      setLoading(false)
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">🤝 Handover Practice</h1>
      <p className="text-slate-500 mb-6">
        Read each care scenario, write your handover, then compare it to a professional model answer. Good handovers keep service users safe.
      </p>

      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-amber-500 text-lg shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm">
          <span className="font-semibold">Privacy: </span>
          Use "the service user" — do not use real names or personal details.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => { setSelected(s); handleReset() }}
            className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
              selected.id === s.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Scenario {s.id}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
        <p className="text-sm font-semibold text-blue-800 mb-2">{selected.title}</p>
        <p className="text-blue-700 text-sm leading-relaxed">{selected.context}</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
        <p className="text-xs font-semibold text-slate-600 mb-2">Key points to cover:</p>
        <ul className="space-y-1">
          {selected.keyPoints.map((point, i) => (
            <li key={i} className="text-slate-600 text-xs flex gap-2">
              <span className="text-slate-400 shrink-0">•</span>{point}
            </li>
          ))}
        </ul>
      </div>

      {!showFeedback ? (
        <>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Write your handover below:
          </label>
          <textarea
            className="w-full border border-slate-300 rounded-xl p-4 text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows={6}
            placeholder="Write your handover here using professional UK care language…"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="mt-3 w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit &amp; Get AI Feedback
          </button>
        </>
      ) : (
        <div className="space-y-4" ref={feedbackRef}>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-slate-700 mb-2">Your handover:</p>
            <p className="text-slate-600 text-sm leading-relaxed">{userInput}</p>
          </div>

          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
              <p className="text-blue-700 text-sm">Claude is reviewing your handover…</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800 text-sm font-semibold mb-1">⚠️ Could not connect to AI</p>
              <p className="text-red-700 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">Run <code className="bg-red-100 px-1 rounded">npm run dev:server</code> in a separate terminal.</p>
            </div>
          )}

          {aiFeedback && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-3">✅ AI Feedback from Claude</p>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{aiFeedback}</div>
            </div>
          )}

          {!loading && !aiFeedback && !error && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-3">✅ Model Answer</p>
              <p className="text-slate-700 text-sm leading-relaxed">{selected.modelAnswer}</p>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full border border-slate-300 text-slate-600 font-medium py-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
