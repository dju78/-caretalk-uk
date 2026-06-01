interface Props {
  onDismiss: () => void
}

export default function PrivacyBanner({ onDismiss }: Props) {
  return (
    <div className="bg-amber-50 border-b-2 border-amber-400 px-4 py-4">
      <div className="max-w-3xl mx-auto flex items-start gap-3">
        <span className="text-amber-500 text-2xl mt-0.5 shrink-0">⚠️</span>
        <div className="flex-1">
          <p className="text-amber-900 text-sm font-bold">Privacy Reminder — Please Read</p>
          <p className="text-amber-800 text-sm mt-1 leading-relaxed">
            Do not enter real service-user names, NHS numbers, addresses, phone numbers, or any confidential personal information into this app. Use fictional names or write "the service user" instead.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-amber-600 hover:text-amber-900 font-bold text-xl leading-none mt-0.5 shrink-0"
          aria-label="Dismiss privacy reminder"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
