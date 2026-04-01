export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { action, payload } = req.body

  let systemPrompt = null
  let userPrompt = ''

  if (action === 'study-plan') {
    userPrompt = `Create a personalized ${payload.exam.toUpperCase()} study plan.
Exam date: ${payload.examDate}
Weak areas: ${payload.weaknesses.join(', ')}
Daily study hours: ${payload.dailyHours}
Return ONLY valid JSON array (no markdown, no explanation) of:
[{ "week": 1, "title": "...", "focus": "...", "dailyTasks": ["task1", "task2", "task3"] }]
Include 4 weeks total.`
  }

  if (action === 'ielts-writing') {
    systemPrompt = 'You are a certified IELTS examiner with 20+ years of experience. Grade strictly according to the official IELTS band descriptors. Be accurate and specific in your feedback.'
    userPrompt = `Grade this IELTS Task ${payload.task} essay.

Prompt: ${payload.prompt}

Student essay: ${payload.essay}

Return ONLY valid JSON (no markdown, no extra text):
{
  "overall": 7.0,
  "task_achievement": 7.0,
  "coherence_cohesion": 7.0,
  "lexical_resource": 6.5,
  "grammatical_range": 7.0,
  "overall_comment": "One sentence summary",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "errors": ["error 1", "error 2"],
  "ta_comment": "Task achievement comment",
  "cc_comment": "Coherence comment",
  "lr_comment": "Lexical resource comment",
  "gr_comment": "Grammar comment"
}`
  }

  if (!userPrompt) return res.status(400).json({ error: 'Unknown action' })

  try {
    const body = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: userPrompt }],
    }

    if (systemPrompt) body.system = systemPrompt

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic error:', err)
      return res.status(500).json({ error: 'AI request failed' })
    }

    const data = await response.json()
    const text = data.content[0].text.replace(/```json|```/g, '').trim()
    res.json({ result: text })
  } catch (err) {
    console.error('Handler error:', err)
    res.status(500).json({ error: 'Internal error' })
  }
}