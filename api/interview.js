import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { question, userAnswer } = req.body ?? {}
  if (!question?.trim() || !userAnswer?.trim()) {
    return res.status(400).json({ error: 'Question and answer are required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server.' })

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: `You are a UK care sector interview coach helping immigrant Healthcare Assistants and Support Workers.

Given an interview question and the learner's answer, provide feedback in this format:

**Strengths:**
• [what they did well]

**Suggestions:**
• [specific improvements]

**Stronger version:**
[Write a model answer]

Be warm, encouraging, and specific. Reference UK care values: dignity, safeguarding, person-centred care, duty of care.`,
      messages: [{ role: 'user', content: `Interview question: ${question}\n\nMy answer: ${userAnswer}` }],
    })

    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    res.status(200).json({ result: text })
  } catch (err) {
    console.error(err)
    const msg = err?.error?.error?.message ?? err?.message ?? 'Claude API error'
    res.status(500).json({ error: msg })
  }
}
