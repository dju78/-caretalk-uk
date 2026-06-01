import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { note } = req.body ?? {}
  if (!note?.trim()) return res.status(400).json({ error: 'Note is required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server.' })

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: `You are a UK care documentation specialist helping immigrant Healthcare Assistants write professional care notes.

Rewrite the user's note using:
- Professional UK care language and terminology
- "The service user" instead of names
- Factual, observation-based language (what was seen, not assumed)
- Proper structure: what was observed → action taken → reported to whom → ongoing monitoring
- Calm, professional tone

Return ONLY the rewritten care note. No explanation, no preamble, no heading.`,
      messages: [{ role: 'user', content: note }],
    })

    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    res.status(200).json({ result: text })
  } catch (err) {
    console.error(err)
    const msg = err?.error?.error?.message ?? err?.message ?? 'Claude API error'
    res.status(500).json({ error: msg })
  }
}
