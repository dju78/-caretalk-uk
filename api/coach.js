import Anthropic from '@anthropic-ai/sdk'
import { COACH_GUARD } from '../lib/coachGuard.js'

// Secure proxy for the standalone CareTalk UK training widget.
// The API key lives only on the server (Vercel env var) — never in the browser.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { prompt, model, max_tokens } = req.body ?? {}
  if (!prompt?.trim()) return res.status(400).json({ error: 'Prompt is required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server.' })

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: model || 'claude-sonnet-4-20250514',
      max_tokens: max_tokens || 1000,
      system: COACH_GUARD,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    res.status(200).json({ result: text })
  } catch (err) {
    console.error(err)
    const msg = err?.error?.error?.message ?? err?.message ?? 'Claude API error'
    res.status(500).json({ error: msg })
  }
}
