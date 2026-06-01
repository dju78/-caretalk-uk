import { useState } from 'react'

const scenarios = [
  {
    id: 1,
    title: 'Service user has collapsed — call 999',
    callType: '999 · Ambulance',
    situation:
      'You walk into a service user\'s room and find them unconscious on the floor. They are not responding. A colleague is with them. You are calling 999.',
    steps: [
      'Call 999 and ask for an ambulance',
      'Stay calm — speak slowly and clearly',
      'Give the full address of the care home, including postcode',
      'Describe exactly what you can see',
      'Follow every instruction the 999 operator gives you',
      'Send a colleague to the entrance to meet the ambulance',
    ],
    modelScript: `"Hello, I need an ambulance please.

My name is [Your Name]. I am a care worker at [Name of Care Home], located at [Full Address, Town, Postcode].

I have found a service user who is unconscious and not responding to voice or touch. They are on the floor of their bedroom. I cannot see any obvious injuries. They are breathing.

A colleague is with them now and I have asked for help from the senior carer.

Please send an ambulance as soon as possible. I will send someone to the front entrance to meet the crew.

Can you tell me what I should do while I wait?"`,
  },
  {
    id: 2,
    title: 'Suspected stroke — call 999',
    callType: '999 · Ambulance',
    situation:
      'A service user suddenly cannot speak clearly, one side of their face has drooped, and they cannot raise one arm. You have carried out the FAST check. You are calling 999.',
    steps: [
      'Call 999 immediately — do not wait',
      'Tell the operator you suspect a stroke',
      'Use FAST: Face drooping, Arm weakness, Speech problems, Time to call',
      'Note the exact time the symptoms started',
      'Do not give the person food or water',
      'Keep the service user calm and still',
    ],
    modelScript: `"Hello, I need an ambulance urgently. I believe a service user is having a stroke.

I am calling from [Name of Care Home], [Full Address, Town, Postcode].

I carried out the FAST check. The service user's face is drooping on the left side, they cannot raise their left arm, and their speech is slurred and confused. Symptoms started at approximately [time] — about [X] minutes ago.

The service user is conscious but very distressed. We have not given them anything to eat or drink.

Please send an ambulance immediately — I understand that time is critical with stroke."`,
  },
  {
    id: 3,
    title: 'Service user has had a fall — call the on-call nurse',
    callType: 'Internal · On-call Nurse',
    situation:
      'A service user has fallen and is on the floor. They appear conscious but are in pain. You have helped make them comfortable and completed initial observations. You are now calling the on-call nurse to report.',
    steps: [
      'Introduce yourself and state where you are calling from',
      'Give the service user\'s room number, not their real name',
      'Describe exactly what happened and when',
      'State what physical assessment you have already done',
      'Say whether the person can move and whether they are in pain',
      'Ask whether you should move them or wait for assessment',
    ],
    modelScript: `"Hello, this is [Your Name], care worker on [Floor/Ward Name].

I am calling to report a fall. The service user in room [X] has been found on the floor at approximately [time].

The service user is conscious and alert. They are complaining of pain in their [left hip/right side — describe what you can see]. I have not attempted to move them. I have completed basic observations — their colour is normal, they are breathing comfortably, and their pulse feels regular.

An incident form is being completed.

Could you please come and assess the service user before we move them? Or could you advise me on what to do while I wait?"`,
  },
  {
    id: 4,
    title: 'Service user deteriorating — call NHS 111',
    callType: 'NHS 111',
    situation:
      'A service user has been unwell for several hours. They have a temperature, seem confused, and have not eaten or drunk much today. It is not an immediate emergency but you are concerned.',
    steps: [
      'Call 111 and describe the symptoms clearly',
      'Give the service user\'s age and relevant medical history if known',
      'State how long they have been unwell',
      'Describe all symptoms — temperature, confusion, eating, drinking',
      'Follow the advice the 111 operator gives',
      'Document the call and any advice given',
    ],
    modelScript: `"Hello, I am calling on behalf of a service user I care for in a residential care home.

My name is [Your Name] and I am calling from [Name of Care Home], [Address, Postcode].

The service user is [approximate age] years old. Over the past [X] hours they have developed a raised temperature of [X]°C, they appear more confused than usual, and they have had very little to eat or drink today. They are conscious but seem quite unwell.

They do not have a GP appointment available today and this does not feel like a 999 emergency, but I am concerned and would like some clinical advice on what to do next.

Can you help me assess whether they need to be seen by a doctor today?"`,
  },
  {
    id: 5,
    title: 'Reporting a fire — call 999',
    callType: '999 · Fire Brigade',
    situation:
      'You can smell smoke coming from a bedroom and can see the fire alarm has activated. Staff are beginning to evacuate residents following the fire evacuation plan. You are calling 999.',
    steps: [
      'Raise the fire alarm first if not already activated',
      'Call 999 and ask for the fire brigade',
      'Give the full address immediately',
      'Begin evacuation following your fire evacuation plan',
      'Do not use the lift during a fire evacuation',
      'Do not re-enter the building for any reason',
    ],
    modelScript: `"Hello, fire brigade please.

There is a fire at [Name of Care Home], [Full Address, Town, Postcode].

We can smell smoke and see signs of fire coming from a first-floor bedroom. The fire alarm has been activated. We are evacuating all residents now following our fire evacuation procedure.

There are approximately [X] residents and [X] staff in the building. Some residents have limited mobility and will require assistance with evacuation.

Please send fire crews to [Name of Care Home], [Address] as quickly as possible. I will send a member of staff to the main entrance to meet you."`,
  },
]

export default function EmergencyCallPractice() {
  const [selected, setSelected] = useState(scenarios[0])
  const [userScript, setUserScript] = useState('')
  const [showModel, setShowModel] = useState(false)

  function handleReset() {
    setUserScript('')
    setShowModel(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">🚨 Emergency Call Practice</h1>
      <p className="text-slate-500 mb-5">
        Practise what to say when making emergency and urgent calls in a UK care setting. Being clear and calm on the phone can save a life.
      </p>

      <div className="bg-red-600 rounded-xl p-4 mb-6 text-white">
        <p className="font-bold text-sm">In a real emergency, always call 999 first. Do not delay.</p>
        <p className="text-red-100 text-sm mt-1">This tool is for practice and training only.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => { setSelected(s); handleReset() }}
            className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
              selected.id === s.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Scenario {s.id}
          </button>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">{selected.callType}</span>
        </div>
        <p className="text-sm font-semibold text-orange-800 mb-1">{selected.title}</p>
        <p className="text-orange-700 text-sm leading-relaxed">{selected.situation}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-semibold text-blue-800 mb-2">Key steps to follow:</p>
        <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
          {selected.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      {!showModel ? (
        <>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Write what you would say on the call:
          </label>
          <textarea
            className="w-full border border-slate-300 rounded-xl p-4 text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows={7}
            placeholder="Write your script here. Include who you are, where you are calling from, what is happening, and what help you need…"
            value={userScript}
            onChange={(e) => setUserScript(e.target.value)}
          />
          <button
            onClick={() => setShowModel(true)}
            disabled={!userScript.trim()}
            className="mt-3 w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            See Model Script
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-slate-700 mb-2">Your script:</p>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{userScript}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-green-800 mb-3">✅ Model Script</p>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.modelScript}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-yellow-800 mb-2">Always include in any emergency call:</p>
            <ul className="text-yellow-700 text-sm space-y-1">
              {[
                'Your name and the care home name',
                'The full address including postcode',
                'What you can see happening right now',
                'How many people are involved',
                'What has already been done',
                'That you will stay on the line if the operator asks you to',
              ].map((tip, i) => (
                <li key={i} className="flex gap-2"><span className="shrink-0">✓</span>{tip}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="w-full border border-slate-300 text-slate-600 font-medium py-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
