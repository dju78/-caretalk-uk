import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Mode = 'none' | 'android' | 'ios-safari' | 'ios-other'

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [mode, setMode] = useState<Mode>('none')
  const [dismissed, setDismissed] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const nav = window.navigator as Navigator & { standalone?: boolean }

    // Already installed / running as an installed app — never show.
    const standalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      nav.standalone === true
    if (standalone) return

    const ua = nav.userAgent || ''
    // iPhone/iPod/iPad — plus iPadOS, which reports a Mac UA but has touch.
    const isIos =
      /iphone|ipad|ipod/i.test(ua) ||
      (nav.platform === 'MacIntel' && (nav.maxTouchPoints || 0) > 1)
    // True Safari (not Chrome/Firefox/Edge on iOS, not an in-app webview).
    const isRealSafari = /Safari/i.test(ua) && !/CriOS|FxIOS|EdgiOS|GSA/i.test(ua)
    // Common in-app browsers where Add to Home Screen is unavailable.
    const inAppBrowser = /FBAN|FBAV|Instagram|Line|WhatsApp|Twitter|LinkedIn|Messenger/i.test(ua)

    if (isIos) {
      setMode(isRealSafari && !inAppBrowser ? 'ios-safari' : 'ios-other')
      return
    }

    // Android / desktop Chromium — capture the native install prompt.
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
      setMode('android')
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  async function handleInstall() {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
    setMode('none')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard may be unavailable */ }
  }

  if (dismissed || mode === 'none') return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      <div className="max-w-3xl mx-auto bg-blue-800 text-white rounded-xl shadow-lg p-4 flex items-start gap-3">
        <div className="bg-white rounded-lg p-1 shrink-0">
          <img src="/ddl-logo.png" alt="" className="h-8 w-8 object-contain" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm">Install CarePhrase on your phone</p>

          {mode === 'android' && (
            <>
              <p className="text-blue-200 text-xs mt-0.5">Add it to your home screen to use it like an app, even offline.</p>
              <button
                onClick={handleInstall}
                className="mt-2 bg-white text-blue-800 font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Install app
              </button>
            </>
          )}

          {mode === 'ios-safari' && (
            <p className="text-blue-100 text-xs mt-1 leading-relaxed">
              On iPhone or iPad: tap the <strong>Share</strong> button
              (the square with an arrow at the bottom of Safari), then choose
              <strong> “Add to Home Screen.”</strong>
            </p>
          )}

          {mode === 'ios-other' && (
            <>
              <p className="text-blue-100 text-xs mt-1 leading-relaxed">
                On iPhone or iPad, installing only works in <strong>Safari</strong>.
                Open <strong>www.carephrase.com</strong> in Safari, then tap the
                <strong> Share</strong> button and choose <strong>“Add to Home Screen.”</strong>
              </p>
              <button
                onClick={copyLink}
                className="mt-2 bg-white text-blue-800 font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {copied ? 'Link copied ✓' : 'Copy link for Safari'}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-blue-200 hover:text-white text-lg leading-none shrink-0"
          aria-label="Dismiss install prompt"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
