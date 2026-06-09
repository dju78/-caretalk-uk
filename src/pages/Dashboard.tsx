import type { Page } from '../types'

interface Props {
  onNavigate: (page: Page) => void
}

const tools: { icon: string; title: string; description: string; page: Page; color: string }[] = [
  {
    icon: '🎓',
    title: 'Care Note Training Coach',
    description: 'Write your own care note and get coaching feedback — the app never writes it for you.',
    page: 'care-note',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  {
    icon: '🤝',
    title: 'Handover Practice',
    description: 'Practise giving clear, structured care handovers safely and professionally.',
    page: 'handover',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
  },
  {
    icon: '📚',
    title: 'Care Vocabulary',
    description: 'Learn key UK health and social care terms with simple examples.',
    page: 'vocabulary',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
  },
  {
    icon: '💼',
    title: 'Interview Practice',
    description: 'Prepare strong answers for HCA and Support Worker interviews.',
    page: 'interview',
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  },
  {
    icon: '🛡️',
    title: 'Safeguarding Language',
    description: 'Learn how to report safeguarding concerns using factual and professional language.',
    page: 'safeguarding',
    color: 'bg-red-50 border-red-200 hover:bg-red-100',
  },
  {
    icon: '🚨',
    title: 'Emergency Call Practice',
    description: 'Practise clear communication for 999, NHS 111, GP, nurse, or manager calls.',
    page: 'emergency',
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
  },
]

export default function Dashboard({ onNavigate }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Welcome to CarePhrase 👋</h1>
        <p className="text-slate-600 mt-2 leading-relaxed">
          This app supports <strong>Healthcare Assistants, Support Workers, and Nursing Assistants</strong> in communicating professionally and confidently in UK care settings, from writing care notes to speaking up in emergencies.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-amber-500 text-xl shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm leading-relaxed">
          <span className="font-semibold">Privacy reminder: </span>
          Do not enter real service-user names, NHS numbers, addresses, phone numbers, or confidential personal information.
        </p>
      </div>

      <div className="bg-blue-700 rounded-2xl p-5 mb-8 text-white">
        <p className="text-sm font-medium text-blue-200 mb-1">Today's Practice</p>
        <p className="text-lg font-semibold">Get coaching on your own care note</p>
        <p className="text-blue-200 text-sm mt-1">Write a note and receive coaching feedback in just 5 minutes.</p>
        <button
          onClick={() => onNavigate('care-note')}
          className="mt-4 bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
        >
          Start Now →
        </button>
      </div>

      <h2 className="text-base font-semibold text-slate-700 mb-3">Choose a topic to practise</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {tools.map(({ icon, title, description, page, color }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`${color} border rounded-xl p-5 text-left transition-colors`}
          >
            <span className="text-3xl">{icon}</span>
            <h3 className="font-semibold text-slate-800 mt-2 mb-1">{title}</h3>
            <p className="text-slate-500 text-sm">{description}</p>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0">🎓</span>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Care-note training</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Practise writing better care notes through guided scenarios. Learn how to observe clearly, record factually, and escalate appropriately.
            </p>
            <a
              href="/carephrase-training.html"
              className="inline-flex items-center bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-800 transition-colors"
            >
              Start care-note training →
            </a>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-5">
        <p className="text-sm font-semibold text-slate-700 mb-1">Your Progress</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '35%' }} />
          </div>
          <span className="text-slate-600 text-sm font-medium">35%</span>
        </div>
        <p className="text-slate-400 text-xs mt-2">Complete more exercises to build your score.</p>
      </div>
    </div>
  )
}
