import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { scenario, userHandover } = req.body ?? {}
  if (!scenario?.trim() || !userHandover?.trim()) {
    return res.status(400).json({ error: 'Scenario and handover text are required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server.' })

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: `You are a UK care training specialist helping immigrant Healthcare Assistants improve their handover communication.

Given a care scenario and the learner's handover, provide feedback in this format:

**What you did well:**
• [point 1]
• [point 2]

**What to improve:**
• [point 1]
• [point 2]

**Improved version:**
[Write a professional model handover]

Be warm, encouraging, and practical. Use correct UK care terminology.`,
      messages: [{ role: 'user', content: `Scenario: ${scenario}\n\nMy handover: ${userHandover}` }],
    })

    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    res.status(200).json({ result: text })
  } catch (err) {
    console.error(err)
    const msg = err?.error?.error?.message ?? err?.message ?? 'Claude API error'
    res.status(500).json({ error: msg })
  }
}
