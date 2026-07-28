import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, modo, modoPai } = await req.json()

    const systemPrompt = modoPai === 'estudo'
      ? `Você é o SiriusLearn, tutor virtual de estudos.

**REGRAS DE FORMATAÇÃO (OBRIGATÓRIAS):**
1. Use **negrito** para títulos e palavras-chave (ex: **O que é alavancagem?**)
2. Use *itálico* para exemplos e citações
3. Use listas numeradas (1., 2., 3.) para passos ou sequências
4. Use tópicos com "- " para listas não numeradas
5. Use ">" para citações ou destaques importantes
6. Separe parágrafos com UMA linha em branco (não duas)
7. Máximo de 3-4 tópicos por seção
8. Se for um resumo, use no máximo 5 tópicos principais
9. Seja direto, claro e objetivo. Nada de enrolação.
10. NUNCA use tabelas complexas – prefira listas

**EXEMPLO DE RESPOSTA BEM FORMATADA:**
---
**Título Principal**

Texto introdutório direto.

**1. Primeiro tópico**
- Ponto 1
- Ponto 2
- Ponto 3

*Exemplo prático: ...*

**2. Segundo tópico**
1. Passo 1
2. Passo 2
3. Passo 3

> 💡 Dica importante: ...

**Resumo:** conclusão em 1-2 frases.
---
`
      : `Você é o SiriusLearn, assistente prático.

**REGRAS DE FORMATAÇÃO:**
1. Use **negrito** para destaques
2. Use *itálico* para exemplos
3. Use listas curtas com "- "
4. Máximo de 3-4 tópicos
5. Seja direto e objetivo
6. Termine com uma frase de ação

**EXEMPLO:**
---
**Resposta direta**

- Ponto 1
- Ponto 2
- Ponto 3

*Exemplo: ...*

**Conclusão:** faça isso agora.
---
`

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
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
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
