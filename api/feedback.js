import Anthropic from '@anthropic-ai/sdk'
import { COACH_GUARD } from '../lib/coachGuard.js'

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
      system: COACH_GUARD,
      messages: [{ role: 'user', content: `The carer wrote this care note:\n\n"${note}"\n\nCoach them on how to improve it. Do not rewrite it.` }],
    })

    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    const coaching = extractJSON(text)
    if (!coaching || !coaching.scores) throw new Error('Could not parse coaching response')

    // clamp scores
    for (const k of ['factual', 'language', 'completeness', 'safeguarding']) {
      coaching.scores[k] = Math.max(1, Math.min(10, Math.round(Number(coaching.scores[k]) || 1)))
    }

    res.status(200).json({ coaching })
  } catch (err) {
    console.error(err)
    const msg = err?.error?.error?.message ?? err?.message ?? 'Claude API error'
    res.status(500).json({ error: msg })
  }
}

function extractJSON(text) {
  if (!text) return null
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1) return null
  try { return JSON.parse(text.slice(start, end + 1)) } catch { return null }
}
