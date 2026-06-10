export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6 pb-6 border-b border-slate-700">
          <a
            href="https://forms.gle/yUZTxoFqu5x5Z3iGA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-bold text-blue-400 underline hover:text-blue-300 transition-colors"
          >
            📝 Share your feedback on CarePhrase
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1.5 shrink-0">
              <img
                src="/ddl-logo.png"
                alt="Daramola Digital Labs"
                className="h-8 w-8 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">CarePhrase</p>
              <p className="text-slate-400 text-xs">by Daramola Digital Labs</p>
            </div>
          </div>
          <p className="text-slate-500 text-xs text-center sm:text-right max-w-xs leading-relaxed">
            Daramola Digital Labs builds practical, data-driven digital tools that support compliance, financial reporting, research, education, healthcare and community development.
          </p>
        </div>
        <div className="border-t border-slate-700 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-xs">
            © 2026 Daramola Digital Labs. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            CarePhrase · For care workers in the UK · No personal data stored
          </p>
        </div>
      </div>
    </footer>
  )
}
