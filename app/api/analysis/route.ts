import { NextRequest, NextResponse } from 'next/server'

// Endpoint placeholder compartilhado pelas ferramentas de Análise e Auditoria.
// Em produção, poderia usar a Groq para análise de sentimento/qualidade de texto,
// ou uma lib de contagem de tokens (ex: tiktoken) para a auditoria.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (body.mode === 'audit') {
      const token = String(body.token ?? '')
      const tokensEstimated = Math.max(1, Math.ceil(token.length / 4))
      const isSuspicious = token.length > 2000 || /['"]|--/.test(token)

      return NextResponse.json({
        status: isSuspicious ? 'warning' : 'ok',
        message: isSuspicious
          ? 'Padrão incomum detectado no token. Revise antes de utilizá-lo.'
          : 'Token dentro dos padrões esperados, sem alertas.',
        tokensEstimated,
      })
    }

    const text = String(body.text ?? '')
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length

    return NextResponse.json({
      wordCount,
      readingTimeMinutes: Math.max(1, Math.round(wordCount / 200)),
      summary: `Análise simulada: o texto enviado contém aproximadamente ${wordCount} palavras. Em produção, esta análise incluiria tom, clareza, sugestões de melhoria e principais tópicos abordados.`,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar análise' }, { status: 500 })
  }
}
