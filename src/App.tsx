import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CareNoteRewriter from './pages/CareNoteRewriter'
import HandoverPractice from './pages/HandoverPractice'
import CareVocabulary from './pages/CareVocabulary'
import InterviewPractice from './pages/InterviewPractice'
import SafeguardingLanguage from './pages/SafeguardingLanguage'
import EmergencyCallPractice from './pages/EmergencyCallPractice'
import PrivacyBanner from './components/PrivacyBanner'
import NavBar from './components/NavBar'
import type { Page } from './types'

function App() {
  const [page, setPage] = useState<Page>('landing')
  const [bannerDismissed, setBannerDismissed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {!bannerDismissed && (
        <PrivacyBanner onDismiss={() => setBannerDismissed(true)} />
      )}
      {page !== 'landing' && (
        <NavBar currentPage={page} onNavigate={setPage} />
      )}
      <main>
        {page === 'landing'      && <LandingPage onGetStarted={() => setPage('dashboard')} />}
        {page === 'dashboard'    && <Dashboard onNavigate={setPage} />}
        {page === 'care-note'    && <CareNoteRewriter />}
        {page === 'handover'     && <HandoverPractice />}
        {page === 'vocabulary'   && <CareVocabulary />}
        {page === 'interview'    && <InterviewPractice />}
        {page === 'safeguarding' && <SafeguardingLanguage />}
        {page === 'emergency'    && <EmergencyCallPractice />}
      </main>
    </div>
  )
}

export default App
