import { NextRequest, NextResponse } from 'next/server'

// Endpoint placeholder: em produção, aqui entraria uma chamada real
// a uma API de busca (ex: Groq com tool de web search, Tavily, Serper etc.)
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query inválida' }, { status: 400 })
    }

    // Simula um pequeno atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 600))

    return NextResponse.json({
      title: `Resultado da pesquisa: "${query}"`,
      summary: `Este é um resumo simulado sobre "${query}". Em uma versão de produção, este conteúdo seria gerado a partir de uma pesquisa real na web, trazendo fatos, contexto histórico e referências atualizadas sobre o tema.`,
      sources: [
        'wikipedia.org',
        'brasilescola.uol.com.br',
        'todamateria.com.br',
      ],
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar pesquisa' }, { status: 500 })
  }
}
