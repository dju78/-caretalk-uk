import { useState } from 'react'

const terms = [
  {
    word: 'Safeguarding',
    category: 'Legal & Ethics',
    definition: 'Protecting people\'s health, wellbeing, and rights so they can live free from harm, abuse, and neglect.',
    example: 'If you notice unexplained bruising on a service user, you have a duty to report it as a safeguarding concern to your senior immediately.',
    useInWork: 'Use this word when reporting suspected abuse or neglect.',
  },
  {
    word: 'Duty of Care',
    category: 'Legal & Ethics',
    definition: 'Your legal and moral responsibility to keep service users safe and to act in their best interests at all times.',
    example: 'Your duty of care means you must report a wet floor immediately so that a service user does not slip and fall.',
    useInWork: 'Use this phrase when explaining why you reported a risk or concern.',
  },
  {
    word: 'Dignity',
    category: 'Person-Centred Care',
    definition: 'Treating service users with respect, courtesy, and compassion — recognising their worth and individuality at all times.',
    example: 'Always knock before entering a service user\'s room and cover them with a towel during personal care to protect their dignity.',
    useInWork: 'Use this word when explaining how you provide personal care respectfully.',
  },
  {
    word: 'Confidentiality',
    category: 'Legal & Ethics',
    definition: 'Keeping personal information about service users private and only sharing it with authorised people on a need-to-know basis.',
    example: 'Do not discuss a service user\'s medical condition with their neighbours or friends, even if they ask you directly.',
    useInWork: 'Use this word when explaining why you cannot share information with someone.',
  },
  {
    word: 'Mental Capacity',
    category: 'Legal & Ethics',
    definition: 'A person\'s ability to make their own decisions. Under the Mental Capacity Act 2005, capacity must always be assumed unless formally assessed otherwise.',
    example: 'Before assisting with personal care, check that the service user understands what you are going to do and has given their consent.',
    useInWork: 'Use this term when discussing whether a service user can make decisions for themselves.',
  },
  {
    word: 'MAR Chart',
    category: 'Medication',
    definition: 'Medication Administration Record. A document used to record what medication a service user has been given and when.',
    example: 'Always sign the MAR chart immediately after giving medication — never sign in advance or leave it blank.',
    useInWork: 'Use this term when recording or reporting medication given or refused.',
  },
  {
    word: 'Escalation',
    category: 'Communication',
    definition: 'Reporting a concern, incident, or change in a service user\'s condition to a more senior member of staff or appropriate professional.',
    example: 'If a service user\'s breathing suddenly changes, escalate immediately to the senior carer or call 999 if it is an emergency.',
    useInWork: 'Use this word when explaining that you reported something to a senior or another professional.',
  },
  {
    word: 'Hoisting',
    category: 'Moving & Handling',
    definition: 'Using a mechanical hoist to safely lift or transfer a service user who cannot support their own weight.',
    example: 'Always check the hoist sling for damage before use and ensure two trained staff members are present when hoisting a service user.',
    useInWork: 'Use this term when documenting or explaining how a service user was moved or transferred.',
  },
  {
    word: 'Repositioning',
    category: 'Moving & Handling',
    definition: 'Regularly changing a service user\'s position in bed or in a chair to prevent pressure sores and maintain healthy circulation.',
    example: 'The service user is at risk of pressure ulcers and must be repositioned at least every two hours. This must be recorded in the care notes each time.',
    useInWork: 'Use this term when documenting pressure area care in care notes.',
  },
  {
    word: 'Person-Centred Care',
    category: 'Person-Centred Care',
    definition: 'Providing care that is tailored to the individual\'s specific needs, wishes, preferences, and values — treating them as a whole person, not just a set of needs.',
    example: 'Ask the service user what time they prefer to get up, how they like their tea, and what they enjoy doing — this is person-centred care in practice.',
    useInWork: 'Use this term in interviews and care documentation to show you put the service user first.',
  },
  {
    word: 'Risk Assessment',
    category: 'Safety',
    definition: 'A formal process of identifying potential hazards and deciding how to reduce or remove them to keep service users and staff safe.',
    example: 'A falls risk assessment should be completed for any service user who is unsteady on their feet or has previously had a fall.',
    useInWork: 'Use this term when explaining safety checks or reporting potential hazards.',
  },
  {
    word: 'Care Plan',
    category: 'Documentation',
    definition: 'A written document that records a service user\'s needs, goals, preferences, and how their care should be delivered. It must be followed, updated regularly, and read at the start of each shift.',
    example: 'Always read the service user\'s care plan before starting your shift so you understand their current needs, preferences, and any recent changes.',
    useInWork: 'Refer to the care plan whenever you are unsure how to support a service user.',
  },
  {
    word: 'Fluid Balance',
    category: 'Health Monitoring',
    definition: 'A record of how much fluid a service user drinks (input) and how much they pass through urine or other means (output). Used to monitor hydration and kidney function.',
    example: 'The service user has been drinking very little today. Please continue recording their fluid intake on the fluid balance chart and inform the nurse if intake remains low.',
    useInWork: 'Use this term when recording drinks or reporting concerns about dehydration.',
  },
  {
    word: 'Pressure Ulcer',
    category: 'Health Monitoring',
    definition: 'A wound caused by prolonged pressure on the skin, usually over bony areas such as the heels, hips, or tailbone. Also called a pressure sore or bedsore.',
    example: 'The service user has a Grade 2 pressure ulcer on their left heel. A wound care plan is in place and the district nurse reviews it weekly.',
    useInWork: 'Use this term when documenting or reporting skin concerns during personal care.',
  },
]

const categories = ['All', ...Array.from(new Set(terms.map((t) => t.category)))]

export default function CareVocabulary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = terms.filter((t) => {
    const matchSearch =
      t.word.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || t.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">📚 Care Vocabulary</h1>
      <p className="text-slate-500 mb-6">
        Learn key words and phrases used every day in UK health and social care settings. Tap any term to see a full definition, example, and how to use it at work.
      </p>

      <input
        type="text"
        placeholder="Search a word or phrase…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              category === cat
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((term) => (
          <div key={term.word} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between"
              onClick={() => setExpanded(expanded === term.word ? null : term.word)}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-800">{term.word}</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                  {term.category}
                </span>
              </div>
              <span className="text-slate-400 text-sm ml-3 shrink-0">{expanded === term.word ? '▲' : '▼'}</span>
            </button>
            {expanded === term.word && (
              <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
                <p className="text-slate-700 text-sm leading-relaxed">{term.definition}</p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-semibold text-blue-700 mb-1">Example in practice:</p>
                  <p className="text-blue-800 text-sm italic leading-relaxed">"{term.example}"</p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">How to use it at work:</p>
                  <p className="text-green-800 text-sm">{term.useInWork}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-8">No terms found. Try a different search.</p>
        )}
      </div>
    </div>
  )
}
