interface Props {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 flex flex-col">

      {/* Sticky header with always-visible training CTA */}
      <header className="sticky top-0 z-40 bg-blue-800/95 backdrop-blur border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between gap-3 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-1.5 shadow-md">
              <img
                src="/ddl-logo.png"
                alt="Daramola Digital Labs"
                className="h-8 w-8 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div>
              <span className="text-white font-bold text-base leading-none block">CarePhrase</span>
              <span className="text-blue-200 text-xs leading-none">by Daramola Digital Labs</span>
            </div>
          </div>
          <a
            href="/care-note-training.html"
            className="bg-white text-blue-800 font-bold text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Start training →
          </a>
        </div>
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
          CarePhrase helps Healthcare Assistants, Support Workers, and Care Assistants communicate confidently in UK care settings.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="/care-note-training.html"
            className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-blue-50 transition-colors"
          >
            Start care-note training →
          </a>
          <button
            onClick={onGetStarted}
            className="text-white font-semibold px-6 py-4 rounded-xl border border-white/50 hover:bg-white/10 transition-colors"
          >
            Explore the app
          </button>
        </div>
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

      {/* How the training works (3 steps) */}
      <div className="bg-white/5 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-xl font-bold mb-6 text-center">How the training works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { n: '1', t: 'Choose a scenario', d: 'Pick a realistic care situation from the library.' },
              { n: '2', t: 'Write your own note', d: 'Record what happened in your own words across four sections.' },
              { n: '3', t: 'Receive coaching feedback', d: 'Get clear feedback and a reflective question — the app never writes the note for you.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="bg-white/10 rounded-xl p-5 text-center">
                <div className="bg-white text-blue-800 font-bold rounded-full h-9 w-9 flex items-center justify-center mx-auto mb-3">{n}</div>
                <p className="text-white font-semibold text-sm mb-1">{t}</p>
                <p className="text-blue-100 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Getting started */}
      <div className="bg-white/5 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-xl font-bold mb-6 text-center">Getting started</h2>
          <ol className="space-y-3 mb-8">
            {[
              'Open the care-note training coach.',
              'Enter a first name or initials so your practice can be tracked — no personal data about service users is ever required.',
              'Choose a scenario from the library, or use free practice.',
              'Write your own note across the four sections: what happened, how it happened, what you did, and whether escalation or safeguarding action was needed.',
              'Receive coaching feedback and a reflective question on each section, then review your scores.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-white text-blue-800 font-bold text-sm rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-blue-100 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <div className="text-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-800 font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-50 transition-colors"
            >
              Start care-note training →
            </button>
          </div>
        </div>
      </div>

      {/* Worked example */}
      <div className="bg-white/10 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-xl font-bold mb-2 text-center">How CarePhrase coaches</h2>
          <p className="text-blue-200 text-sm text-center mb-6">
            It gives feedback — it does not write the note for you.
          </p>
          <div className="bg-white/10 rounded-xl p-5 mb-4">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1">A carer writes</p>
            <p className="text-white text-sm italic">"Mary refused food and was angry."</p>
          </div>
          <div className="bg-white/10 rounded-xl p-5 space-y-3">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1">CarePhrase coaches (it does not rewrite)</p>
            {[
              { label: '✅ Did well', text: 'You recorded that there was a change worth following up.' },
              { label: '⚠️ Missing', text: 'Add the time, what food was offered, what the service user actually said or did, and who you informed.' },
              { label: '🔤 Language', text: '"Angry" is a judgement — describe what you observed instead.' },
              { label: '💭 Reflective question', text: 'Have you recorded only what you observed, without assuming how the person felt?' },
            ].map(({ label, text }) => (
              <div key={label}>
                <p className="text-white text-xs font-semibold">{label}</p>
                <p className="text-blue-100 text-sm">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-200 text-xs text-center mt-4">
            The carer then improves their own note using this feedback. CarePhrase never supplies a finished sentence to copy.
          </p>
        </div>
      </div>

      {/* For supervisors */}
      <div className="bg-white/5 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-xl font-bold mb-4 text-center">For supervisors</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-3">
            CarePhrase may support optional supervisor review features for training oversight during controlled pilots. Any supervisor access should be configured securely and used only in line with the organisation's data protection, confidentiality and workplace policies.
          </p>
          <p className="text-blue-100 text-sm leading-relaxed">
            For real workplace use, supervisor access should use secure authentication, role-based access and organisation-approved data protection controls.
          </p>
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

      {/* Training disclaimer + pilot status */}
      <div className="bg-white/5 px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-blue-100 text-sm leading-relaxed">
            <strong className="text-white">Training only:</strong> CarePhrase supports learning and reflective practice. It is informed by good care-recording practice and UK care-quality expectations, including the need for accurate, complete and timely records. It is not CQC-approved and does not replace employer policy, clinical judgement, safeguarding procedures or professional supervision. Staff must write their own care notes and follow employer policy, care plans, safeguarding procedures and local reporting requirements. See our <a href="/privacy.html" className="underline hover:text-white">Privacy Notice</a>.
          </p>
          <div className="border border-yellow-400/40 bg-yellow-400/10 rounded-xl px-5 py-4">
            <p className="text-yellow-100 text-sm leading-relaxed">
              <strong>Pilot status:</strong> CarePhrase is currently a training and demonstration tool. Organisations should review security, data protection, safeguarding and local policy requirements before using it in a live workplace setting.
            </p>
          </div>
        </div>
      </div>

      {/* Help improve CarePhrase */}
      <div className="bg-white/10 px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white text-xl font-bold mb-2">Help improve CarePhrase</h2>
          <p className="text-blue-100 text-sm leading-relaxed max-w-xl mx-auto mb-5">
            Have you tested the care-note training tool? Please share quick feedback so we can improve the training experience for care workers and supervisors.
          </p>
          <a
            href="https://forms.gle/yUZTxoFqu5x5Z3iGA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-800 font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-50 transition-colors"
          >
            Share feedback
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-300 text-center text-xs py-6 px-4 space-y-2">
        <p>© 2026 Daramola Digital Labs. All rights reserved. · CarePhrase · Mock data only — no personal data stored</p>
        <p className="space-x-4">
          <a href="mailto:dju78@omoyelejd.co.uk" className="underline hover:text-white transition-colors">
            Contact us
          </a>
          <span>·</span>
          <a href="/accessibility.html" className="underline hover:text-white transition-colors">
            Accessibility
          </a>
          <span>·</span>
          <a href="/privacy.html" className="underline hover:text-white transition-colors">
            Privacy
          </a>
        </p>
        <p className="text-blue-400 text-xs">
          CarePhrase is a training coach, not a care-note writer. It is not CQC-approved and does not replace employer policy or professional supervision.
        </p>
      </footer>
    </div>
  )
}