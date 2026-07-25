import { NextRequest } from 'next/server'
import { buildSystemPrompt } from '@/lib/prompts'
import { ModeCategory, SubMode } from '@/types'

export const runtime = 'edge'

interface GroqRequestBody {
  messages: { role: string; content: string }[]
  category: ModeCategory
  subMode: SubMode
}

// Rota responsável por conversar com a Groq API e transmitir (stream)
// a resposta palavra por palavra de volta para o cliente.
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GroqRequestBody
    const { messages, category, subMode } = body

    if (!messages || !Array.isArray(messages)) {
      return new Response('Corpo da requisição inválido', { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    const apiUrl = process.env.GROQ_API_URL ?? 'https://api.groq.com/openai/v1/chat/completions'
    const model = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile'

    if (!apiKey) {
      return new Response(
        'GROQ_API_KEY não configurada. Adicione sua chave no arquivo .env.local.',
        { status: 500 }
      )
    }

    const systemPrompt = buildSystemPrompt(category ?? 'estudo', subMode ?? 'smart')

    const groqResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
    })

    if (!groqResponse.ok || !groqResponse.body) {
      const errorText = await groqResponse.text()
      return new Response(`Erro ao chamar a Groq API: ${errorText}`, {
        status: groqResponse.status,
      })
    }

    // A Groq responde no formato SSE (Server-Sent Events) compatível com a OpenAI.
    // Aqui fazemos o parsing dos chunks e repassamos apenas o texto puro.
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body!.getReader()
        let buffer = ''

        try {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed.startsWith('data:')) continue

              const data = trimmed.replace(/^data:\s*/, '')
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                const token = parsed.choices?.[0]?.delta?.content
                if (token) {
                  controller.enqueue(encoder.encode(token))
                }
              } catch {
                // linha incompleta ou inválida - ignora
              }
            }
          }
        } catch (err) {
          controller.error(err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    return new Response('Erro interno ao processar a requisição.', { status: 500 })
  }
}
