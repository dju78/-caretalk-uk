import { useState } from 'react'

const phrases = [
  {
    situation: 'You notice unexplained bruising on a service user',
    weak: 'I saw a bad bruise on them and it looked like someone hit them.',
    professional:
      'I observed an unexplained bruise on the service user\'s left forearm during personal care this morning. The service user was unable to explain how the injury occurred. I have documented the location, size, and appearance of the bruise accurately in the care notes. I reported the concern immediately to the senior carer and I believe a formal safeguarding referral may be required.',
    why: 'Describe what you saw factually — location, size, colour. Do not accuse anyone. Report and let the safeguarding process decide.',
  },
  {
    situation: 'A service user tells you a staff member shouted at them',
    weak: 'They said someone was nasty to them so I told my manager.',
    professional:
      'The service user disclosed to me that a member of staff raised their voice at them yesterday evening. I listened without interrupting and did not ask leading questions. I reassured the service user that I took their concern seriously and that I was required to report it. I have documented the disclosure in the service user\'s own words as accurately as possible and reported it to the senior carer and manager without delay.',
    why: 'Always record disclosures in the person\'s own words. Do not investigate yourself. Report immediately and document everything.',
  },
  {
    situation: 'You suspect a service user is being financially exploited',
    weak: 'I think someone is taking their money.',
    professional:
      'I have concerns that the service user may be experiencing financial abuse. I have observed that the service user has recently expressed distress after family visits and has mentioned having no money for personal items. I am not making any accusations, but I am reporting my observations to the senior carer so that a formal safeguarding assessment can be initiated if appropriate.',
    why: 'Report observations and concerns — not accusations. Use careful, factual language. Let the safeguarding team investigate.',
  },
  {
    situation: 'A service user appears afraid when a family member visits',
    weak: 'They seem scared of their son so I kept watching.',
    professional:
      'During my shift I observed that the service user became visibly anxious when their family member arrived. The service user appeared reluctant to be alone with the visitor and made a comment which I felt was significant. I ensured the service user felt safe throughout and I have documented my observations in full. I have reported this as a potential safeguarding concern to the senior carer.',
    why: 'Never dismiss a gut feeling. If something feels wrong, document what you saw and heard and report it. You are not expected to investigate alone.',
  },
  {
    situation: 'You find a service user locked in their room',
    weak: 'Their door was locked from the outside which is not right.',
    professional:
      'On arriving at the service user\'s room I found the door had been locked from the outside. The service user was unable to leave independently. I unlocked the door immediately and ensured the service user was safe and unharmed. I reported this to the senior carer as a potential deprivation of liberty and safeguarding concern. The incident has been documented in full and I understand this will require formal review.',
    why: 'Locking a person in their room without proper legal authority may be unlawful under the Deprivation of Liberty Safeguards (DoLS). Always report immediately.',
  },
]

const types = [
  { type: 'Physical Abuse', icon: '🩹', description: 'Hitting, slapping, pushing, restraining, burning, or causing any physical harm to a person.' },
  { type: 'Emotional Abuse', icon: '💬', description: 'Shouting, humiliating, threatening, intimidating, isolating, or psychologically controlling a person.' },
  { type: 'Financial Abuse', icon: '💷', description: 'Stealing money or possessions, misusing a person\'s funds, pressuring someone to change a will, or controlling their finances.' },
  { type: 'Neglect', icon: '🚫', description: 'Failing to provide adequate food, warmth, clothing, medication, or personal care. Can be deliberate or through ignorance.' },
  { type: 'Sexual Abuse', icon: '🔒', description: 'Any unwanted sexual contact, exposure, or behaviour towards a person who has not or cannot give consent.' },
  { type: 'Discriminatory Abuse', icon: '⚖️', description: 'Treating someone unfairly or harmfully because of their race, religion, gender, disability, age, or sexual orientation.' },
  { type: 'Institutional Abuse', icon: '🏥', description: 'Poor care practices or a culture of mistreatment within a care home, hospital, or other care setting that affects multiple people.' },
  { type: 'Self-Neglect', icon: '🙁', description: 'When a person fails to care for their own hygiene, health, or living conditions in a way that threatens their wellbeing.' },
]

export default function SafeguardingLanguage() {
  const [tab, setTab] = useState<'phrases' | 'types'>('phrases')
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">🛡️ Safeguarding Language</h1>
      <p className="text-slate-500 mb-5">
        Learn how to speak and write about safeguarding concerns professionally, factually, and correctly. Good reporting protects service users.
      </p>

      <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-6">
        <p className="text-red-800 text-sm font-bold mb-1">Your legal duty to report</p>
        <p className="text-red-700 text-sm leading-relaxed">
          If you suspect or witness abuse or neglect, you have a legal and moral duty to report it immediately to your senior carer or safeguarding lead. Do not investigate yourself. Do not stay silent. It is always better to report a concern and be wrong than to say nothing and leave someone at risk.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('phrases')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            tab === 'phrases' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Reporting Phrases
        </button>
        <button
          onClick={() => setTab('types')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            tab === 'types' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Types of Abuse
        </button>
      </div>

      {tab === 'phrases' && (
        <div className="space-y-4">
          {phrases.map((p, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="font-medium text-slate-800 text-sm">{p.situation}</span>
                <span className="text-slate-400 shrink-0 text-sm">{expanded === i ? '▲' : '▼'}</span>
              </button>
              {expanded === i && (
                <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-700 mb-1">❌ Avoid saying:</p>
                    <p className="text-red-800 text-sm italic">"{p.weak}"</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-700 mb-1">✅ Professional way to report:</p>
                    <p className="text-green-900 text-sm leading-relaxed">"{p.professional}"</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Why this matters:</p>
                    <p className="text-blue-800 text-sm leading-relaxed">{p.why}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'types' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map(({ type, icon, description }) => (
            <div key={type} className="bg-white border border-slate-200 rounded-xl p-5">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-semibold text-slate-800 mt-2 mb-1">{type}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
