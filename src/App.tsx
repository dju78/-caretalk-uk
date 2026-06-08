import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CareNoteCoach from './pages/CareNoteCoach'
import HandoverPractice from './pages/HandoverPractice'
import CareVocabulary from './pages/CareVocabulary'
import InterviewPractice from './pages/InterviewPractice'
import SafeguardingLanguage from './pages/SafeguardingLanguage'
import EmergencyCallPractice from './pages/EmergencyCallPractice'
import PrivacyBanner from './components/PrivacyBanner'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import type { Page } from './types'

function App() {
  const [page, setPage] = useState<Page>('landing')
  const [bannerDismissed, setBannerDismissed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {!bannerDismissed && (
        <PrivacyBanner onDismiss={() => setBannerDismissed(true)} />
      )}
      {page !== 'landing' && (
        <NavBar currentPage={page} onNavigate={setPage} />
      )}
      <main className="flex-1">
        {page === 'landing'      && <LandingPage onGetStarted={() => setPage('dashboard')} />}
        {page === 'dashboard'    && <Dashboard onNavigate={setPage} />}
        {page === 'care-note'    && <CareNoteCoach />}
        {page === 'handover'     && <HandoverPractice />}
        {page === 'vocabulary'   && <CareVocabulary />}
        {page === 'interview'    && <InterviewPractice />}
        {page === 'safeguarding' && <SafeguardingLanguage />}
        {page === 'emergency'    && <EmergencyCallPractice />}
      </main>
      {page !== 'landing' && <Footer />}
    </div>
  )
}

export default App
