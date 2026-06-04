import type { Page } from '../types'

interface Props {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Dashboard', page: 'dashboard' },
  { label: 'Care Notes', page: 'care-note' },
  { label: 'Handover', page: 'handover' },
  { label: 'Vocabulary', page: 'vocabulary' },
  { label: 'Interview', page: 'interview' },
  { label: 'Safeguarding', page: 'safeguarding' },
  { label: 'Emergency', page: 'emergency' },
]

export default function NavBar({ currentPage, onNavigate }: Props) {
  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            src="/ddl-logo.png"
            alt="DDL"
            className="h-7 w-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="text-left">
            <span className="text-white font-bold text-base leading-none block">CareTalk UK</span>
            <span className="text-blue-300 text-xs leading-none">by Daramola Digital Labs</span>
          </div>
        </button>
        <div className="flex flex-wrap gap-1">
          {navItems.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-white text-blue-800'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
