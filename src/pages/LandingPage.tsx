interface Props {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 flex flex-col">

      {/* Header */}
      <header className="px-4 py-5 flex items-center justify-between max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl p-1.5 shadow-md">
            <img
              src="/ddl-logo.png"
              alt="Daramola Digital Labs"
              className="h-9 w-9 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div>
            <span className="text-white font-bold text-lg leading-none block">CareTalk UK</span>
            <span className="text-blue-200 text-xs leading-none">by Daramola Digital Labs</span>
          </div>
        </div>
        <button
          onClick={onGetStarted}
          className="text-white text-sm border border-white/50 rounded-lg px-4 py-1.5 hover:bg-white/10 transition-colors"
        >
          Get Started
        </button>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="bg-white/10 rounded-full p-5 mb-6">
          <span className="text-5xl">🏥</span>
        </div>
        <h1 className="text-white text-4xl font-bold leading-tight mb-2">
          Speak and Write Like a<br />UK Care Professional
        </h1>
        <p className="text-blue-200 text-sm font-medium mb-4">A product of Daramola Digital Labs</p>
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

      {/* Feature icons */}
      <div className="bg-white/10 py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: '📝', label: 'Care Note Coach' },
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

      {/* About DDL */}
      <div className="bg-white/5 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-white rounded-2xl p-3 shadow-lg shrink-0">
            <img
              src="/ddl-logo.png"
              alt="Daramola Digital Labs"
              className="h-16 w-16 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div>
            <p className="text-white font-semibold mb-1">About Daramola Digital Labs</p>
            <p className="text-blue-200 text-sm leading-relaxed">
              Daramola Digital Labs builds practical, data-driven digital tools that support compliance, financial reporting, research, education, healthcare and community development. Our products combine data analysis, automation and user-centred design to solve real-world problems.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-300 text-center text-xs py-4 px-4">
        © 2026 Daramola Digital Labs. All rights reserved. · CareTalk UK · Mock data only – no personal data stored
      </footer>
    </div>
  )
}
