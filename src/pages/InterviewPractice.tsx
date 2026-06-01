import { useState } from 'react'

const questions = [
  {
    id: 1,
    question: 'Why do you want to work in care?',
    role: 'HCA / Support Worker / Care Assistant',
    tips: [
      'Show genuine passion for helping people — not just the salary',
      'Mention values such as compassion, dignity, and respect',
      'You can draw on personal experience, such as caring for a family member',
      'Keep your answer professional and focused on the service user',
    ],
    modelAnswer:
      'I want to work in care because I am genuinely passionate about supporting people to live with dignity and independence. I have always been a patient, compassionate person and I find real fulfilment in making a positive difference to someone\'s day. I understand that many of the people I will support may be vulnerable or going through a difficult time, and I want to be someone they can trust and rely on. I am committed to delivering person-centred care that respects each individual\'s preferences, values, and cultural background.',
  },
  {
    id: 2,
    question: 'Tell me about a time you dealt with a difficult situation.',
    role: 'All roles',
    tips: [
      'Use the STAR method: Situation, Task, Action, Result',
      'Focus on what YOU did, not the whole team',
      'Choose a realistic example from care, home life, or a previous job',
      'End with what you learned or how it improved your practice',
    ],
    modelAnswer:
      'In a previous role, I was supporting a service user who became distressed during personal care and asked me to stop. I remained calm, stepped back immediately, and reassured the service user that I respected their wishes. I explained what I was doing and why, and asked if there was anything I could change to make them more comfortable. I then informed the senior carer and we reviewed the care plan together to ensure we were reflecting the service user\'s preferences. After that, we updated the approach to personal care, which significantly improved the service user\'s experience. I learned that listening carefully and never rushing care is one of the most important things a care worker can do.',
  },
  {
    id: 3,
    question: 'What does safeguarding mean to you?',
    role: 'All roles',
    tips: [
      'Show you understand both the legal duty and the moral responsibility',
      'Mention recognising AND reporting concerns',
      'Name different types of abuse: physical, emotional, financial, neglect',
      'Be clear you would always report — even if it involved a colleague',
    ],
    modelAnswer:
      'Safeguarding means protecting vulnerable people from harm, abuse, and neglect. It is not just a procedure — it is a fundamental part of my duty of care as a care worker. I understand that abuse can take many forms, including physical, emotional, financial, sexual, and neglect. I know that if I ever witnessed or suspected any form of abuse, I have a legal and moral duty to report it immediately to the senior carer or designated safeguarding lead, and to document everything accurately using factual language. I would never ignore a concern or stay silent, even if it involved a colleague, because the safety and wellbeing of the service user must always come first.',
  },
  {
    id: 4,
    question: 'How do you maintain dignity and respect during personal care?',
    role: 'HCA / Care Assistant',
    tips: [
      'Mention consent and communication before and during care',
      'Talk about privacy — closing doors, using towels and covers',
      'Speak TO the person, not over them or about them',
      'Mention cultural or personal preferences where relevant',
    ],
    modelAnswer:
      'Maintaining dignity during personal care is something I take very seriously. Before I begin, I always explain exactly what I am going to do and ask for the service user\'s consent. I close the door and curtains to ensure privacy. I use towels and covers to keep the person warm and modest throughout. I talk to the service user continuously — asking how they are, checking the water temperature, and making sure they are comfortable. I follow the service user\'s individual preferences, including any cultural or personal wishes about how they like to be cared for. I never rush personal care, and I treat every person with the same respect and dignity I would want for a member of my own family.',
  },
  {
    id: 5,
    question: 'What would you do if a service user refused their medication?',
    role: 'HCA / Support Worker',
    tips: [
      'Make clear you would respect their right to refuse',
      'Mention recording the refusal on the MAR chart',
      'Say you would report it to a senior immediately',
      'Never say you would force or pressure the person',
    ],
    modelAnswer:
      'If a service user refused their medication, I would remain calm and respectful at all times. I would not apply any pressure or force — every person has the right to refuse treatment under the Mental Capacity Act. I would try to understand why they were refusing. For example, perhaps the medication tastes unpleasant, they are anxious, or they have not understood what it is for. I would document the refusal clearly on the MAR chart and report the situation to the senior carer or nurse immediately. I would continue to monitor the service user and offer the medication again at the next scheduled time if appropriate. If the refusal continued, I would ensure it was escalated to the prescribing professional as a matter of priority.',
  },
  {
    id: 6,
    question: 'How do you communicate with families and relatives?',
    role: 'All roles',
    tips: [
      'Mention being respectful, warm, and professional',
      'Talk about confidentiality — only sharing appropriate information',
      'Say you would involve the senior carer if unsure what to share',
      'Show empathy — families can be worried and emotional',
    ],
    modelAnswer:
      'I believe that communicating well with families is a very important part of providing good care. I always speak to families with warmth, respect, and professionalism. I listen carefully to their concerns and acknowledge their feelings, as I understand that having a loved one in care can be difficult. At the same time, I am mindful of my duty of confidentiality. I would only share information about a service user with family members where this is permitted under the care plan and where the service user has given their consent. If a family member asks me something I am unsure about, I would never guess — I would involve the senior carer to ensure the right information is shared in the right way.',
  },
]

export default function InterviewPractice() {
  const [selected, setSelected] = useState(questions[0])
  const [userAnswer, setUserAnswer] = useState('')
  const [showModel, setShowModel] = useState(false)
  const [aiFeedback, setAiFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleReset() {
    setUserAnswer('')
    setShowModel(false)
    setAiFeedback('')
    setError('')
  }

  async function handleSubmit() {
    if (!userAnswer.trim()) return
    setShowModel(true)
    setLoading(true)
    setAiFeedback('')
    setError('')
    try {
      const res = await fetch('http://localhost:3001/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: selected.question, userAnswer }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setAiFeedback(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not connect to API server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">💼 Interview Practice</h1>
      <p className="text-slate-500 mb-6">
        Practise answering common interview questions for Healthcare Assistant, Support Worker, and Care Assistant roles in the UK. Write your answer, then compare it to a model response.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => { setSelected(q); handleReset() }}
            className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
              selected.id === q.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Q{q.id}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
        <p className="text-xs font-medium text-blue-500 mb-1">{selected.role}</p>
        <p className="text-blue-900 font-semibold text-base leading-snug">"{selected.question}"</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-semibold text-yellow-800 mb-2">Tips before you answer:</p>
        <ul className="text-yellow-700 text-sm space-y-1">
          {selected.tips.map((tip, i) => (
            <li key={i} className="flex gap-2"><span className="shrink-0">•</span>{tip}</li>
          ))}
        </ul>
      </div>

      {!showModel ? (
        <>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Write your answer in full sentences:
          </label>
          <textarea
            className="w-full border border-slate-300 rounded-xl p-4 text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows={6}
            placeholder="Write your answer as you would speak it in a real interview…"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="mt-3 w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Get AI Feedback &amp; Model Answer
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-slate-700 mb-2">Your answer:</p>
            <p className="text-slate-600 text-sm leading-relaxed">{userAnswer}</p>
          </div>

          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
              <p className="text-blue-700 text-sm">Claude is reviewing your answer…</p>
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

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-700 mb-1">Remember:</p>
            <p className="text-slate-600 text-sm">There is no single perfect answer. Interviewers want to see that you are honest, caring, and that you put the service user first. Speak clearly, use examples, and always link your answer back to the person you are caring for.</p>
          </div>

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
