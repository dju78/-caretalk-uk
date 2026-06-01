import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

// Manually read .env — works regardless of dotenv version
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim()
  }
}

const API_KEY = process.env.ANTHROPIC_API_KEY
console.log('API key loaded:', API_KEY ? '✅ yes' : '❌ missing')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

function getClient() {
  return new Anthropic({ apiKey: API_KEY })
}

function errorMessage(err) {
  if (err instanceof Anthropic.AuthenticationError) return 'Invalid API key. Check your ANTHROPIC_API_KEY in the .env file.'
  if (err instanceof Anthropic.RateLimitError) return 'Rate limit reached. Please wait a moment and try again.'
  if (err instanceof Anthropic.APIError) return `Anthropic API error ${err.status}: ${err.message}`
  return err?.message ?? 'Unknown error'
}

// Care Note Rewriter
app.post('/api/rewrite', async (req, res) => {
  const { note } = req.body
  if (!note?.trim()) return res.status(400).json({ error: 'Note is required' })
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured. Add your ANTHROPIC_API_KEY to the .env file.' })

  try {
    const response = await getClient().messages.create({
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
    res.json({ result: text })
  } catch (err) {
    console.error('Rewrite error:', err)
    res.status(500).json({ error: errorMessage(err) })
  }
})

// Handover Feedback
app.post('/api/handover', async (req, res) => {
  const { scenario, userHandover } = req.body
  if (!scenario?.trim() || !userHandover?.trim()) return res.status(400).json({ error: 'Scenario and handover required' })
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured.' })

  try {
    const response = await getClient().messages.create({
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
    res.json({ result: text })
  } catch (err) {
    console.error('Handover error:', err)
    res.status(500).json({ error: errorMessage(err) })
  }
})

// Interview Feedback
app.post('/api/interview', async (req, res) => {
  const { question, userAnswer } = req.body
  if (!question?.trim() || !userAnswer?.trim()) return res.status(400).json({ error: 'Question and answer required' })
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured.' })

  try {
    const response = await getClient().messages.create({
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

Be warm, encouraging, and specific. Reference UK care values (dignity, safeguarding, person-centred care, duty of care).`,
      messages: [{ role: 'user', content: `Interview question: ${question}\n\nMy answer: ${userAnswer}` }],
    })

    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    res.json({ result: text })
  } catch (err) {
    console.error('Interview error:', err)
    res.status(500).json({ error: errorMessage(err) })
  }
})

app.listen(PORT, () => {
  console.log(`CareTalk UK API server running on http://localhost:${PORT}`)
})
