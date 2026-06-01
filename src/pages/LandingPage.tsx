interface Props {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 flex flex-col">
      <header className="px-4 py-5 flex items-center justify-between max-w-3xl mx-auto w-full">
        <span className="text-white font-bold text-xl tracking-tight">CareTalk UK</span>
        <button
          onClick={onGetStarted}
          className="text-white text-sm border border-white/50 rounded px-4 py-1.5 hover:bg-white/10 transition-colors"
        >
          Get Started
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="bg-white/10 rounded-full p-5 mb-6">
          <span className="text-5xl">🏥</span>
        </div>
        <h1 className="text-white text-4xl font-bold leading-tight mb-4">
          Speak and Write Like a<br />UK Care Professional
        </h1>
        <p className="text-blue-100 text-lg max-w-md mb-8">
          CareTalk UK helps Healthcare Assistants, Support Workers, and Care Assistants communicate confidently in UK care settings.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-blue-50 transition-colors"
        >
          Start Practising Free
        </button>
        <p className="text-blue-200 text-sm mt-4">No account needed · No payment · 100% free</p>
      </div>

      <div className="bg-white/10 py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: '📝', label: 'Care Note Rewriter' },
            { icon: '🤝', label: 'Handover Practice' },
            { icon: '📚', label: 'UK Care Vocabulary' },
            { icon: '💼', label: 'Interview Practice' },
          ].map(({ icon, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="text-white text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-blue-900 text-blue-300 text-center text-xs py-4 px-4">
        CareTalk UK · For immigrant care workers in the UK · Mock data only – no personal data stored
      </footer>
    </div>
  )
}
