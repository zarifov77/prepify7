export async function callAI(action, payload) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, payload }),
  })
  if (!res.ok) throw new Error('AI request failed')
  const data = await res.json()
  try {
    return JSON.parse(data.result)
  } catch {
    return data.result
  }
}