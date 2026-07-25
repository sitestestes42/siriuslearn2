import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, modo, modoPai } = await req.json()

    const systemPrompt = modoPai === 'estudo'
      ? `Você é o SiriusLearn, tutor virtual de estudos. Seja didático, aprofundado e use exemplos.`
      : `Você é o SiriusLearn, assistente prático. Seja direto, útil e use exemplos da vida real.`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        stream: true,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Erro na Groq:', error)
      return NextResponse.json({ error }, { status: response.status })
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Erro no chat:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
